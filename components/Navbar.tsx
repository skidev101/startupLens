import React from "react";
import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { handleSignIn, handleSignOut } from "@/lib/actions";
import { BadgePlus, LogOut } from "lucide-react";

const Navbar = async () => {
    const session = await auth();
    console.log("current user session:", session);
    console.log("current user session id:", session?.id);

    return (
        <header className="px-5 py-3 bg-white text-black shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={90} height={20} />
                </Link>

                <div className="flex items-center gap-5 text-block">
                    {session && session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span className="max-sm:hidden">Create</span>
                                <BadgePlus className="size-6 sm:hidden text-red-500" />
                            </Link>

                            <form action={handleSignOut}>
                                <button
                                    type="submit"
                                    className="hover:cursor-pointer"
                                >
                                    <span className="max-sm:hidden">
                                        Logout
                                    </span>
                                    <LogOut className="size-6 sm:hidden text-red-500" />
                                </button>
                            </form>

                            <Link href={`/user/${session?.id}`}>
                                <Image
                                    src={
                                        session?.user?.image ||
                                        "/default-avatar.webp"
                                    }
                                    alt="profile"
                                    className="rounded-full hover:scale-103 transition-all duration-200"
                                    width={40}
                                    height={40}
                                />
                                {/* <span>{session?.user?.name}</span> */}
                            </Link>
                        </>
                    ) : (
                        <form action={handleSignIn}>
                            <button
                                type="submit"
                                className="flex items-center gap-1 px-2 py-1 border-3 border-black hover:cursor-pointer hover:bg-purple-200 active:scale-95 rounded-md shadow-sm"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="16"
                                    height="16"
                                    role="img"
                                    aria-labelledby="githubTitle"
                                    fill="currentColor"
                                >
                                    <title id="githubTitle">GitHub</title>
                                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.11.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.082-.73.082-.73 1.205.084 1.84 1.238 1.84 1.238 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.22-.124-.303-.536-1.527.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.649.243 2.873.12 3.176.77.839 1.235 1.91 1.235 3.22 0 4.61-2.804 5.623-5.476 5.92.43.372.814 1.102.814 2.222 0 1.605-.015 2.896-.015 3.286 0 .32.217.694.825.576C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z" />
                                </svg>

                                <span className="font-bold text-sm">Login</span>
                            </button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
