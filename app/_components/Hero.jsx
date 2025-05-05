"use client";

import React from "react";
import { motion } from "framer-motion";
import { useAuthContext } from "../ClientSideProvider";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Hero = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  const handleCreateClick = () => {
    if (user) {
      router.push("/dashboard/create-video");
    } else {
      toast.error("Please sign in first!");
    }
  };

  return (
    <div className="overflow-hidden px-6 mt-40 flex flex-col items-center justify-center">
      {/* Gradient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-orange-500 opacity-30 rounded-full blur-[120px] top-[-5%] left-[-10%]" />
        <div className="absolute w-72 h-72 bg-orange-400 opacity-20 rounded-full blur-[100px] bottom-[10%] right-[-5%]" />
      </div>

      {/* Hero Content */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-center text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#F3492F] via-[#FA912D] to-white"
      >
        AI Video Magic—From Text, Images, and Voice
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="mt-6 max-w-2xl text-center text-lg text-gray-500"
      >
        Auto-captioned, story-ready videos crafted in seconds. Perfect for
        creators, marketers, and media pros.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 2 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-10 flex flex-col sm:flex-row items-center gap-5"
      >
        {/* Primary CTA */}
        <button
          onClick={handleCreateClick}
          className="group cursor-pointer relative px-7 py-2 bg-orange-500 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          <span className="relative z-10">Create Now</span>
          <span className="absolute inset-0 bg-orange-600 opacity-0 group-hover:opacity-100 transition duration-300" />
        </button>

        {/* Secondary CTA */}
        <button className="relative cursor-pointer px-7 py-2 text-white font-medium rounded-lg border border-white/20 backdrop-blur-md bg-white/5 hover:bg-white/10 hover:border-orange-400 transition-all duration-300">
          Explore Now
        </button>
      </motion.div>
    </div>
  );
};

export default Hero;
