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
    <header className="w-full px-4 md:px-8 py-4 bg-transparent backdrop-blur-xl z-50">
      <div className="mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link href="/" aria-label="Go to homepage">
            <Image
              src="/logo.png"
              alt="ClipCraft Logo"
              width={170}
              height={170}
              priority
            />
          </Link>
        </div>

        {/* Right: Auth Buttons or User Profile */}
        <div className="flex items-center gap-2">
          {/* When user is not logged in */}
          {!user ? (
            <Authentication>
              <Button className="px-5 py-2 text-sm sm:text-base font-medium text-white bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 rounded-xl shadow-[0_4px_20px_rgba(255,150,50,0.3)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_4px_30px_rgba(255,180,100,0.5)]">
                Get Started
              </Button>
            </Authentication>
          ) : (
            <div className="flex flex-row items-center justify-between gap-2">
              {/* Dashboard Button */}
              <Link href="/dashboard">
                <button className="relative px-4 py-2 text-sm font-semibold text-white rounded-xl bg-gradient-to-tr from-orange-500 via-orange-400 to-yellow-300 shadow-[0_5px_15px_rgba(255,150,50,0.3)] transition hover:shadow-[0_0_25px_rgba(255,170,80,0.5)] hover:scale-[1.03] whitespace-nowrap">
                  Dashboard
                  <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 hover:opacity-10 transition duration-300" />
                </button>
              </Link>

              {/* Avatar Container */}
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-orange-400 overflow-hidden shadow-[0_0_15px_rgba(255,150,50,0.3)] transition hover:shadow-[0_0_25px_rgba(255,180,100,0.4)]">
                <Image
                  src={user?.photoURL}
                  alt="User Profile"
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
