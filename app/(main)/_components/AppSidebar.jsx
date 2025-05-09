"use client";

import React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  GemIcon,
  LayoutDashboardIcon,
  LogOut,
  LucideVideo,
  SearchIcon,
  Shield,
  VideoIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "@/configs/firebaseConfig";
import { useAuthContext } from "@/app/ClientSideProvider";

const options = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Create Video",
    url: "/dashboard/create-video",
    icon: LucideVideo,
  },
  {
    title: "Explore",
    url: "/dashboard/explore-clipcraft-ai",
    icon: SearchIcon,
  },
  {
    title: "Upgrade",
    url: "/dashboard/billing",
    icon: Shield,
  },
];

export function AppSidebar() {
  const path = usePathname();
  const router = useRouter();
  const { user } = useAuthContext();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully!");
      router.push("/"); // or wherever your login/homepage is
    } catch (error) {
      toast.error("Failed to sign out. Try again.");
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div>
          <div className="flex w-full mt-4 justify-center">
            <Link href="/" aria-label="Go to homepage">
              <Image
                src="/logo.png"
                alt="ClipCraft Logo"
                width={170}
                height={170}
              />
            </Link>
          </div>

          <h2 className="text-center text-lg mt-3 text-gray-500">
            AI Short Video Generator
          </h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="mx-5 mt-16">
              <Button className="w-full cursor-pointer px-5 py-2  text-sm sm:text-base font-medium text-white bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 rounded-xl shadow-[0_4px_20px_rgba(255,150,50,0.3)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_4px_30px_rgba(255,180,100,0.5)]">
                Create Now <VideoIcon />
              </Button>
            </div>

            {/* all the menu items */}

            <SidebarMenu className="mt-8">
              {options.map((item, index) => (
                <SidebarMenuItem key={index} className="mt-3 mx-5">
                  <SidebarMenuButton
                    isActive={path == item.url}
                    className="p-5 rounded-2xl"
                  >
                    <Link
                      href={item.url}
                      className="flex items-center gap-4 p-3"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {user && (
          <div className="p-5 border-[1px] border-orange-400 rounded-2xl mb-5 bg-black ">
            <div className="flex items-center justify-between">
              <GemIcon />
              <h2 className="text-gray-500">{user?.credits} Credits Left</h2>
            </div>
            <Button className="mt-3 w-full cursor-pointer px-5 py-2  text-sm sm:text-base font-medium text-white bg-gradient-to-r from-orange-400 via-pink-500 to-orange-400  rounded-xl shadow-[0_2px_7px_rgba(255,150,50,0.3)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_4px_30px_rgba(255,180,100,0.5)]">
              Buy Credits
            </Button>
          </div>
        )}
      </SidebarFooter>
      <SidebarFooter>
        <div className="flex items-center p-5">
          <Button
            onClick={handleSignOut}
            className=" w-full cursor-pointer px-5 py-2 text-sm sm:text-base font-medium rounded-xl bg-orange-100 hover:bg-black hover:text-white"
          >
            Sign out <LogOut />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
