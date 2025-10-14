import { z } from "zod";

export const formSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Title must be at least 3 characters" })
        .max(40, { message: "Title cannot exceed 40 characters" }),
    description: z
        .string()
        .min(20, { message: "Description must be at least 20 characters" })
        .max(500, { message: "Description cannot exceed 500 characters" }),
    category: z
        .string()
        .min(3, { message: "Category must be at least 3 characters" })
        .max(20, { message: "Category cannot exceed 20 characters" }),
    link: z
        .string()
        .refine(
            (url) => {
                try {
                    new URL(url);
                    return true;
                } catch {
                    return false;
                }
            },
            { message: "Please enter a valid URL" }
        )
        .refine(
            async (url) => {
                try {
                    const res = await fetch(url, { method: "HEAD" });
                    const contentType = res.headers.get("content-type");

                    return contentType?.startsWith("image/") ?? false;
                } catch {
                    return false;
                }
            },
            { message: "Invalid Image" }
        ),
    pitch: z
        .string()
        .min(20, { message: "Pitch must be at least 20 characters" }),
});
