"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";

const NeonModal = ({ isOpen, onClose }) => {
  const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modal = {
    hidden: { opacity: 0, scale: 0.85, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.85,
      y: 50,
      transition: { duration: 0.25 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4 sm:px-6"
        >
          <motion.div
            variants={modal}
            className="relative w-full max-w-md sm:max-w-lg p-6 sm:p-8 rounded-2xl border border-pink-500 bg-gradient-to-br from-black via-zinc-900 to-neutral-900 backdrop-blur-xl shadow-[0_0_40px_10px_rgba(255,105,180,0.4)]"
          >
            {/* Glowing spinning aura */}
            <div className="absolute -inset-[6px] z-[-1] rounded-2xl animate-spin-slow bg-gradient-to-r from-yellow-400 via-pink-500 to-orange-400 opacity-30 blur-[60px]" />


            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-orange-400 mb-4 tracking-tight drop-shadow-[0_0_10px_rgba(255,105,180,0.7)]">
              You've Run Out of Credits
            </h2>

            {/* Description */}
            <p className="text-center text-pink-200 mb-6 text-sm sm:text-base leading-relaxed">
              Your credit balance is empty. Upgrade your plan to unlock more video generations and unleash your creativity.
            </p>

            {/* CTA Button */}
            <button
              onClick={onClose}
              className="w-full py-3 sm:py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 shadow-[0_0_25px_rgba(255,105,180,0.8)] hover:shadow-[0_0_40px_rgba(255,105,180,1)] transition-all duration-300 text-base sm:text-lg tracking-wide cursor-pointer"
            >
              Got it!
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NeonModal;
