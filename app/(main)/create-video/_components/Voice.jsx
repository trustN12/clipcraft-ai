"use client";

import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const voiceOptions = [
  { value: "hm_psi", name: "🇮🇳 Psi (Male)" },
  { value: "aura-zeus-en", name: "🇺🇸 Zeus (Male)" },
  { value: "ff_siwis", name: "🇫🇷 Siwis (Female)" },
  { value: "af_jessica", name: "🇺🇸 Jessica (Female)" },
  { value: "am_eric", name: "🇺🇸 Eric (Male)" },
  { value: "bm_george", name: "🇬🇧 George (Male)" },
  { value: "bf_isabella", name: "🚺 Isabella (Female)" },
  { value: "bf_emma", name: "🚺 Emma (Female)" },
  { value: "hm_omega", name: "🇮🇳 Omega (Male)" },
  { value: "am_adam", name: "🇺🇸 Adam (Male)" },
  { value: "aura-angus-en", name: "🇮🇪 Angus (Male)" },
  { value: "am_onyx", name: "🇺🇸 Onyx (Male)" },
];

const Voice = ({ onHandleInputChangeMethod }) => {
  const [selectedVoice, setSelectedVoice] = useState();

  return (
    <div className="mt-20">
      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-orange-500 drop-shadow-[0_0_10px_#ff00c8] text-center">
        🎙️ Video Voice Selection
      </h2>
      <p className="text-sm text-center text-gray-400 mt-1 mb-5 drop-shadow-[0_0_3px_#ff00c8]">
        Choose your desired AI voice style
      </p>

      <ScrollArea className="h-[300px] w-full cursor-pointer border-[0.5px] border-dashed border-fuchsia-500  p-2 rounded-lg">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
          {voiceOptions.map((voice, index) => {
            const isSelected = selectedVoice === voice.value;
            return (
              <div
                key={index}
                onClick={() => {
                  setSelectedVoice(voice.value);
                  onHandleInputChangeMethod({
                    fieldName: "voiceStyle",
                    fieldValue: voice.value,
                  });
                }}
                className={`group relative h-24 flex items-center justify-center rounded-xl px-4 py-4 cursor-pointer transition-all duration-300 ease-in-out backdrop-blur-md
              bg-gradient-to-br from-[#1a1a1a]/50 to-[#2a2a2a]/70 border text-center
              ${
                isSelected
                  ? "border-2 border-orange-400 shadow-[0_0_20px_#ff6ec7,0_0_40px_#ffa500]"
                  : "border hover:shadow-[0_0_12px_#ff00c8]"
              }`}
              >
                <p
                  className={`text-sm font-semibold uppercase tracking-wide transition-all duration-200
                bg-clip-text text-orange-400
                group-hover:scale-105 group-hover:drop-shadow-[0_0_10px_#ff00c8]
                ${isSelected ? "drop-shadow-[0_0_8px_#ff6ec7]" : ""}
              `}
                >
                  {voice.name}
                </p>

                {isSelected && (
                  <div className="absolute -top-2 -right-2 bg-orange-500 text-black text-xs px-2 py-0.5 rounded-full shadow-lg animate-pulse">
                    ✔
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Voice;
