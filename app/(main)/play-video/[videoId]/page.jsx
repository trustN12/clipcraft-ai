"use client";

import React, { useEffect, useState } from "react";
import RemotionPlayer from "../_components/RemotionPlayer";
import VideoInfo from "../_components/VideoInfo";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSearchParams } from "next/navigation";

const PlayVideo = () => {
  const searchParams = useSearchParams();
  const videoId = searchParams.get("id");
  const convex = useConvex();

  const [videoData, setVideoData] = useState();

  useEffect(() => {
    videoId && getVideoDataById();
  }, [videoId]);

  const getVideoDataById = async () => {
    const result = await convex.query(api.videoData.getVideoById, {
      videoId: videoId,
    });
    // console.log(result);
    setVideoData(result);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="div">
        {/* REMOTION PLAYER */}
        <RemotionPlayer videoData={videoData} />
      </div>
      <div className="div">
        {/* VIDEO INFORMATION */}
        <VideoInfo />
      </div>
    </div>
  );
};

export default PlayVideo;
