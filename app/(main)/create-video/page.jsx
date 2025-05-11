"use client";

import React, { useState, useEffect } from "react";
import Topic from "./_components/Topic";
import VideoStyle from "./_components/VideoStyle";
import Voice from "./_components/Voice";
import Captions from "./_components/Captions";

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
      <div className="grid grid-cols-1 md:grid-cols-3 mt-8">
        <div className="col-span-2 p-7 border rounded-xl h-[73vh] overflow-auto">
          {/* Topic */}
          <Topic onHandleInputChangeMethod={onHandleInputChangeMethod} />
          {/* Style */}
          <VideoStyle onHandleInputChangeMethod={onHandleInputChangeMethod} />
          {/* Voice */}
          <Voice onHandleInputChangeMethod={onHandleInputChangeMethod} />
          {/* Captions */}
          <Captions onHandleInputChangeMethod={onHandleInputChangeMethod} />
        </div>
        <div className="div"></div>
      </div>
    </div>
  );
};

export default CreateVideo;
