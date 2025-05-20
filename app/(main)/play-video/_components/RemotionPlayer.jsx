"use client";

import React, { useState } from "react";
import { Player } from "@remotion/player";
import MyVideo from "@/app/_components/MyVideo";

const RemotionPlayer = ({ videoData }) => {

const [durationInFrame, setDurationInFrame] = useState(100);

  return (
    <div>
      <Player
        component={MyVideo}
        acknowledgeRemotionLicense={true}
        // durationInFrames={Number(durationInFrame.toFixed(0)) + 100}
        durationInFrames={Number((durationInFrame ?? 100).toFixed(0)) + 100}
        compositionWidth={720}
        compositionHeight={1280}
        fps={30}
        controls
        style={{
          width:'30vw',
          height:'70vh'
        }}
        inputProps={{
          videoData: videoData,
          setDurationInFrame:(framevalue)=>setDurationInFrame(framevalue)
        }}
      />
    </div>
  );
};

export default RemotionPlayer;
