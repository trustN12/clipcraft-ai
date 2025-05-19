"use client";

import { useAuthContext } from "@/app/ClientSideProvider";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { RefreshCcw, VideoIcon } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const VideoList = () => {
  const [videolist, setVideolist] = useState([]);

  const convex = useConvex();
  const { user } = useAuthContext();

  useEffect(() => {
    user && GetUserVideoList();
  }, [user]);

  const GetUserVideoList = async () => {
    // Fetch All user videos
    const result = await convex.query(api.videoData.getUserVideos, {
      uid: user?._id,
    });
    //  console.log(result);
    setVideolist(result);
    const isPendingVideo = result?.find((item) => item.status == "pending");
    isPendingVideo && GetPendingVideoStatus(isPendingVideo);
  };

  const GetPendingVideoStatus = (pendingVideo) => {
    const intervalId = setInterval(async () => {
      // GET VIDEO DATA BY ID
      const result = await convex.query(api.videoData.getVideoById, {
        videoId: pendingVideo?._id,
      });

      if(result?.status=='completed'){
        clearInterval(intervalId);
        console.log("video generated successfully");
        GetUserVideoList();
      }
      console.log("Still Generating...")
    }, 7000);
  };

  return (
    <div>
      {videolist?.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 gap-5 p-5 border border-dashed rounded-xl py-20">
          <Image src={"/logo.png"} alt="logo" width={100} height={100} />
          <h2 className="text-gray-500 text-lg">
            You don't have any videos yet. Create a new video!
          </h2>
          <Link href={"/create-video"}>
            <Button className="w-full cursor-pointer px-5 py-2  text-sm sm:text-base font-medium text-white bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 rounded-xl shadow-[0_4px_20px_rgba(255,150,50,0.3)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_4px_30px_rgba(255,180,100,0.5)]">
              Create Now <VideoIcon />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-7 mt-10 cursor-pointer">
          {videolist?.map((video, index) => (
            <div
              className="relative hover:border-orange-500 hover:shadow-[0_0_10px_#ff9900,0_0_20px_#ff1493] rounded-xl"
              key={index}
            >
              {video?.status === "completed" ? (
                <Image
                  src={video?.images[0]}
                  alt={video?.title}
                  width={500}
                  height={500}
                  className="w-full object-cover rounded-xl aspect-[2/3]"
                />
              ) : (
                <div className="aspect-[2/3] w-full p-5 rounded-xl bg-slate-900 flex items-center justify-center gap-2">
                  <RefreshCcw className="animate-spin" />
                  <h2>Generating...</h2>
                </div>
              )}
              <div className="absolute bottom-2.5 p-5 w-full bg-black/50">
                <h2 className="font-bold tracking-wide text-xl bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_#ff9900aa]">
                  {video?.title.toUpperCase()}
                </h2>
                <h2 className="text-sm text-gray-300">
                  {moment(video?._creationTime).fromNow()}
                </h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoList;
