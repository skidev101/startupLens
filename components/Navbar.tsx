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
                                    <span className="max-sm:hidden">Logout</span>
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
                                className="hover:cursor-pointer"
                            >
                                Login
                            </button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
