"use server";

import { auth, signIn, signOut } from "@/auth";
import { parseServerActionResponse } from "./utils";
import { writeClient } from "@/sanity/lib/write-client";
import { client } from "@/sanity/lib/client";
import { STARTUPS_VIEWS_QUERY } from "@/sanity/lib/queries";
import slugify from "slugify";


export async function handleSignIn() {
    await signIn("github");
}

export async function handleSignOut() {
    await signOut({ redirectTo: "/" });
}

export async function createPitch(
    state: any,
    form: FormData,
    pitch: string
) {
    const session = await auth();

    if (!session) {
        return parseServerActionResponse({
            error: "Not Signed in",
            status: "ERROR",
        });
    }

    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== "pitch")
    );

    const slug = slugify(title as string, { lower: true, strict: true });

    try {
        const startup = {
            title,
            description,
            category,
            image: link,
            slug: {
                _type: slug,
                current: slug,
            },
            author: {
                _type: "reference",
                _ref: session?.id,
            },
            pitch,
        };

        const result = await writeClient.create({
            _type: "startup",
            ...startup,
        });

        return parseServerActionResponse({
            ...result,
            error: "",
            status: "SUCCESS",
        });
    } catch (err) {
        console.log("error creating pitch:", err);
        return parseServerActionResponse({
            error: JSON.stringify(err),
            status: "ERROR",
        });
    }
};


export async function getAndIncrementViews(id: string) {
    try {
        // Fetch current views
        const { views } = await client
            .withConfig({ useCdn: false })
            .fetch(STARTUPS_VIEWS_QUERY, { id });

        const currentViews = views || 0;

        // Increment views
        await writeClient
            .patch(id)
            .set({ views: currentViews + 1 })
            .commit();

        return { success: true, views: currentViews };
    } catch (error) {
        console.error("Failed to update views:", error);
        return { success: false, views: 0 };
    }
}