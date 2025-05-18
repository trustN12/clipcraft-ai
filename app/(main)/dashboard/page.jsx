"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/ClientSideProvider";
import toast from "react-hot-toast";
import VideoList from "./_components/VideoList";

export default function DashboardPage() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      // toast.error("Please sign in"); // Trigger toast here inside useEffect
      router.push("/"); // Redirect to home if not signed in
    }
  }, [user, router]); // Add router to the dependencies

  if (!user) {
    return null; // If no user, prevent rendering the dashboard content
  }

  return (
    <div className="">
      <h1 className="text-3xl">
        <span className="text-orange-100 drop-shadow-[0_0_2px_#ff9900aa]">
          Welcome
        </span>
        ,{" "}
        <span className="text-4xl font-extrabold bg-gradient-to-r from-orange-400 via-yellow-400 to-pink-500 bg-clip-text text-transparent tracking-tight drop-shadow-[0_0_8px_#ff9900aa]">
          {user?.name &&
            user.name.split(" ")[0].charAt(0).toUpperCase() +
              user.name.split(" ")[0].slice(1).toLowerCase()}
        </span>
      </h1>

      <div className="mt-7">
        <h2 className="font-bold text-xl">Your Videos</h2>
        <VideoList />
      </div>
    </div>
  );
}
