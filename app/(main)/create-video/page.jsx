"use client";

import React, { useState, useEffect } from "react";
import Topic from "./_components/Topic";
import VideoStyle from "./_components/VideoStyle";
import Voice from "./_components/Voice";
import Captions from "./_components/Captions";
import { Button } from "@/components/ui/button";
import { WandSparklesIcon } from "lucide-react";
import Preview from "./_components/Preview";

const CreateVideo = () => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);

  const onHandleInputChangeMethod = ({ fieldName, fieldValue }) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  return (
    <div>
      <h2 className="text-3xl">Create New Video</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-7">
        <div className="col-span-2 p-7 border rounded-xl h-[73vh] overflow-auto">
          {/* Topic */}
          <Topic onHandleInputChangeMethod={onHandleInputChangeMethod} />
          {/* Style */}
          <VideoStyle onHandleInputChangeMethod={onHandleInputChangeMethod} />
          {/* Voice */}
          <Voice onHandleInputChangeMethod={onHandleInputChangeMethod} />
          {/* Captions */}
          <Captions onHandleInputChangeMethod={onHandleInputChangeMethod} />
          {/* Button */}
          <Button className='mt-5 w-full className="w-full cursor-pointer text-sm sm:text-base font-medium text-white bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 rounded-xl shadow-[0_4px_20px_rgba(255,150,50,0.3)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_4px_30px_rgba(255,180,100,0.5)] hover:font-semibold disabled:opacity-70 disabled:cursor-not-allowed"'>
            <WandSparklesIcon />
            Create Video
          </Button>
        </div>
        <div className="div">
          <Preview formData={formData} />
        </div>
      </div>
    </div>
  );
};

export default CreateVideo;
