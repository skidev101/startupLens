import React from "react";
import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";

const Navbar = async () => {
  const session = await auth();
  console.log("current user session:", session);
  console.log("current user session id:", session?.user?.id);

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
                <span>Create</span>
              </Link>

              <form
                action={async () => {
                  "use server";
                  signOut({ redirectTo: "/"});
                }}
              >
                <button type="submit" className="hover:cursor-pointer">Logout</button>
              </form>

              <Link href={`/user/${session?.user?.id}`}>
              <img src={`${session?.user?.image}`} alt="profile" className="w-[40px] h-[40px] rounded-full hover:scale-103 transition-all duration-200"/>
                {/* <span>{session?.user?.name}</span> */}
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit" className="hover:cursor-pointer">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
