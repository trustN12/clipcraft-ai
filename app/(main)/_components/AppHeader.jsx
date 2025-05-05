"use client";
import { useAuthContext } from "@/app/ClientSideProvider";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import React from "react";

const AppHeader = () => {
  const { user } = useAuthContext();

  const profileImage = user?.pictureURL || "/user.png"; // fallback to user.png

  return (
    <div className="p-4 flex justify-between items-center">
      <SidebarTrigger className="cursor-pointer" />
      <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-orange-400 overflow-hidden shadow-[0_0_15px_rgba(255,150,50,0.3)] transition hover:shadow-[0_0_25px_rgba(255,180,100,0.4)]">
        <Image
          src={profileImage}
          alt="User Profile"
          width={64}
          height={64}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default AppHeader;
