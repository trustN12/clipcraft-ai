"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Authentication from "./Authentication";
import { useAuthContext } from "../ClientSideProvider";
import Link from "next/link";

const Header = () => {
  const { user } = useAuthContext();

  return (
    <div className="p-4 flex items-center justify-between">
      <Image
        src={"/logo.png"}
        alt="clipcraft-logo-image"
        width={200}
        height={200}
        priority
      />
      {!user ? (
        <Authentication>
          <Button className="cursor-pointer">Get Started</Button>
        </Authentication>
      ) : (
        <div className="flex items-center gap-5 px-6 py-3 bg-gradient-to-br from-white/10 via-white/5 to-white/0 border border-white/10 rounded-2xl backdrop-blur-xl shadow-[0_0_30px_rgba(255,255,255,0.1)] transition duration-300 hover:shadow-[0_0_40px_rgba(255,165,0,0.2)]">
          <Link href="/dashboard">
            <button className="relative px-6 py-2 text-white font-semibold rounded-xl bg-gradient-to-tr from-orange-500 via-orange-400 to-yellow-300 shadow-[0_5px_20px_rgba(255,100,0,0.3)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,150,50,0.6)] hover:scale-[1.03]">
              Dashboard
              <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 hover:opacity-10 transition duration-300" />
            </button>
          </Link>

          <div className="w-12 h-12 rounded-full border-[3px] border-orange-500 shadow-[0_0_20px_rgba(255,165,0,0.4)] overflow-hidden transition duration-300 hover:shadow-[0_0_30px_rgba(255,150,50,0.5)]">
            <Image
              src={user?.photoURL}
              alt="user-profile-image"
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
