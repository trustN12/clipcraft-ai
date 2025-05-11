"use client";

import Image from "next/image";
import React, { useState } from "react";

const options = [
  { name: "Realistic", image: "/Realistic.jpg" },
  { name: "Ghibli", image: "/Ghibli.jpg" },
  { name: "Comic", image: "/Comic.jpg" },
  { name: "Watercolor", image: "/Watercolor.jpg" },
  { name: "GTA", image: "/GTA.jpg" },
  { name: "Anime", image: "/Anime.jpg" },
];

const VideoStyle = ({ onHandleInputChangeMethod }) => {
  const [selectStyle, setSelectStyle] = useState();

  return (
    <div className="mt-20">
      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-orange-400 drop-shadow-[0_0_10px_#ff00c8] text-center">
      🎞️ Video Style Selection
      </h2>
      <p className="text-sm text-center text-gray-400 mt-1 mb-5 drop-shadow-[0_0_3px_#ff00c8]">Select video style</p>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mt-3">
        {options.map((option, index) => (
          <div
            key={index}
            className="group transition duration-300 ease-in-out"
            onClick={() => {
              setSelectStyle(option.name);
              onHandleInputChangeMethod({
                fieldName: "videoStyle",
                fieldValue: option.name,
              });
            }}
          >
            <Image
              src={option.image}
              alt={option.name}
              width={500}
              height={120}
              className={`object-cover cursor-pointer h-[90px] lg:h-[130px] xl:h-[180px] rounded-xl p-1 
                         transition-all duration-300 
                         border-2 border-transparent 
                         group-hover:border-orange-500 
                         group-hover:shadow-[0_0_10px_#ff9900,0_0_20px_#ff1493] 
                         ${option.name === selectStyle ? "border-orange-500 shadow-[0_0_10px_#ff9900,0_0_20px_#ff1493] animate-pulse" : ""}`}
            />
            <p
              className={`text-center mt-2 text-sm font-semibold uppercase tracking-wide bg-gradient-to-r from-orange-700 via-pink-300 to-orange-400 text-transparent bg-clip-text drop-shadow-[0_0_6px_#ff00c8] `}
            >
              {option.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoStyle;
