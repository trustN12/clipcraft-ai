"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const captions = [
  {
    name: "Youtuber",
    style:
      "text-yellow-400 text-2xl font-extrabold uppercase tracking-[0.1em]  drop-shadow-[0_0_10px_#ff6a00] animate-pulse",
  },
  {
    name: "Glitch",
    style:
      "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-fuchsia-500 text-3xl font-extrabold uppercase tracking-wide drop-shadow-[0_0_8px_#ff00c8] animate-glitch",
  },
  {
    name: "Neon",
    style:
      "text-transparent text-4xl font-bold uppercase bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 drop-shadow-[0_0_12px_#ff00c8] hover:animate-pulse",
  },
  {
    name: "Fire",
    style:
      "text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500 text-3xl font-extrabold uppercase tracking-widest drop-shadow-[0_0_15px_#ff7f00] animate-fire",
  },
  {
    name: "Cinematic",
    style:
      "text-white text-2xl font-black tracking-[0.1em] uppercase bg-opacity-10 drop-shadow-[0_0_10px_#ffffff] animate-cinema hover:bg-black/40",
  },
  {
    name: "FinalCut",
    style:
      "text-transparent text-3xl font-bold bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 drop-shadow-[0_0_10px_#22d3ee] animate-glow",
  },
  {
    name: "VFX",
    style:
      "text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500 text-2xl font-semibold tracking-wide drop-shadow-[0_0_8px_#8b5cf6] animate-glitch",
  },
  {
    name: "Trailer",
    style:
      "text-white text-2xl font-extrabold uppercase tracking-widest bg-black/20 border border-white/20 drop-shadow-[0_0_12px_#ffffff70]",
  },
  {
    name: "Motivational",
    style:
      "text-transparent text-2xl font-bold bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500 drop-shadow-[0_0_8px_#ff6ec7] hover:animate-pulse",
  },
  {
    name: "Retro",
    style:
      "text-transparent text-4xl font-extrabold bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 drop-shadow-[0_0_15px_#ff007b] animate-glitch",
  },
  {
    name: "Cyberpunk",
    style:
      "text-transparent text-3xl font-semibold bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 drop-shadow-[0_0_10px_#4c00d1] animate-pulse",
  },
  {
    name: "Pulse",
    style:
      "text-transparent text-3xl font-bold bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 drop-shadow-[0_0_15px_#ff00ff] hover:animate-pulse",
  },
];

const Captions = ({ onHandleInputChangeMethod }) => {
  const [selectStyle, setSelectStyle] = useState(null);

  return (
    <div className="mt-20 px-4 max-w-6xl mx-auto">
      <motion.h2
        className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-orange-500 drop-shadow-[0_0_10px_#ff00c8] text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🎬 Video Caption Selection
      </motion.h2>

      <p className="text-sm text-center text-gray-400 mt-1 mb-5 drop-shadow-[0_0_3px_#ff00c8]">
        Choose your preferred caption style
      </p>

      <motion.div
        className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-6 md:gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.05 } },
        }}
      >
        {captions.map((caption, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className={`cursor-pointer p-4 rounded-lg transition-all duration-300 border-2 overflow-hidden will-change-transform ${
              selectStyle === caption.name
                ? "border-pink-500 bg-white/10 animate-pulse"
                : "border-transparent hover:border-orange-400"
            }`}
            onClick={() => {
              setSelectStyle(caption.name);
              onHandleInputChangeMethod({
                fieldName: "caption",
                fieldValue: caption,
              });
            }}
          >
            <h2 className={`${caption.style} text-center`}>{caption.name}</h2>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Captions;
