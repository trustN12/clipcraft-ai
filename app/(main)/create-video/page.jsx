"use client";

import React, { useState, useEffect } from "react";
import Topic from "./_components/Topic";
import VideoStyle from "./_components/VideoStyle";
import Voice from "./_components/Voice";
import Captions from "./_components/Captions";
import { Button } from "@/components/ui/button";
import { Loader2Icon, WandSparklesIcon } from "lucide-react";
import Preview from "./_components/Preview";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuthContext } from "@/app/ClientSideProvider";
import { toast } from "sonner";

const CreateVideo = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const CreateInitialVideoRecord = useMutation(api.videoData.createVideoData);

  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);

  const onHandleInputChangeMethod = ({ fieldName, fieldValue }) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const GenerateVideo = async () => {
    if (
      !formData?.topic ||
      !formData?.script ||
      !formData?.videoStyle ||
      !formData?.caption ||
      !formData?.voiceStyle
    ) {
      toast.error("Please complete all fields before generating the video.");
      return;
    }

    try {
      setLoading(true);

      // Create initial record in Convex
      const resp = await CreateInitialVideoRecord({
        title: formData.title,
        topic: formData.topic,
        script: formData.script,
        videoStyle: formData.videoStyle,
        caption: formData.caption,
        voice: formData.voiceStyle,
        uid: user?._id,
        createdBy: user?.email,
        credits: user?.credits,
      });

      console.log("Convex Record ID:", resp);
      toast.success("Video created successfully!");

      // Call Inngest API to trigger background processing
      const result = await axios.post("/api/generate-video-data", {
        ...formData,
        recordId: resp, // ✅ Safe to use here
      });

      console.log("Inngest API Response:", result);
    } catch (error) {
      console.error("Video creation failed:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
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
          <Button
            onClick={GenerateVideo}
            disabled={loading}
            className="w-full cursor-pointer mt-6 text-sm sm:text-base font-medium text-white bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-xl shadow-[0_4px_20px_rgba(255,150,50,0.3)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_4px_30px_rgba(255,180,100,0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2Icon className="animate-spin mr-2 h-5 w-5" />
            ) : (
              <WandSparklesIcon className="mr-2 h-5 w-5" />
            )}
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
