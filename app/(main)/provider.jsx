"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import React, { useEffect } from "react";
import { AppSidebar } from "./_components/AppSidebar";
import AppHeader from "./_components/AppHeader";
import { useAuthContext } from "../ClientSideProvider";
import { useRouter } from "next/navigation";


const DashboardProvider = ({ children }) => {

  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(()=>{
    user&&isAuthenticated();
  },[user]);

  const isAuthenticated = () => {
    if(!user){
        router.replace('/');
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <AppHeader />
        {children}
      </div>
    </SidebarProvider>
  );
};

export default DashboardProvider;
