import Image from "next/image";
import React from "react";
import { options } from "./VideoStyle";
import { motion } from "framer-motion";

const Preview = ({ formData }) => {
  const selectVideoStyle =
    formData && options.find((item) => item?.name === formData?.videoStyle);

  const hasImage = !!selectVideoStyle?.image;

  return (
    <div className="pb-8">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-fuchsia-700 via-orange-200 to-orange-500 drop-shadow-[0_0_15px_rgba(255,0,255,0.4)] mb-2"
      >
        Preview
      </motion.h2>

      <div
        className={`relative overflow-hidden rounded-xl border border-white/10 mb-8 transition-shadow duration-500 ${
          hasImage ? "shadow-[0_0_10px_#ff9900,0_0_20px_#ff1493]" : ""
        }`}
      >
        {hasImage ? (
          <Image
            src={selectVideoStyle.image}
            alt={selectVideoStyle.name || "Preview"}
            width={1000}
            height={300}
            className="w-full h-[60vh] object-cover"
          />
        ) : (
          <div className="w-full text-sm h-[70vh] flex items-center justify-center shadow-none rounded-xl border-2 border-dashed text-gray-400 bg-gradient-to-br from-black via-gray-900 to-black/80">
            Please select a video style to load the preview
          </div>
        )}

        {/* Cinematic Overlay */}
        {hasImage && formData?.caption && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/[1%] backdrop-blur-md px-6 py-3 rounded-xl shadow-[0_0_20px_#ff00ff55] max-w-xl w-[90%] text-center"
            >
              <h2
                className={`text-lg sm:text-2xl md:text-3xl font-extrabold ${
                  formData.caption.style || ""
                }`}
              >
                {formData.caption.name}
              </h2>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Preview;
