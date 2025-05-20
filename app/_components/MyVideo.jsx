"use client";

import React, { useEffect } from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const MyVideo = ({ videoData, setDurationInFrame }) => {
  const captions = videoData?.captionJson;
  const { fps } = useVideoConfig();
  const imageList = videoData?.images;
  const frame = useCurrentFrame();

  // useEffect(() => {
  //   videoData && getDurationFrame();
  // }, [videoData]);

  // const getDurationFrame = () => {
  //   const totalDuration = captions[captions?.length - 1]?.end * fps;
  //   setDurationInFrame(totalDuration);
  //   return totalDuration;
  // };

  useEffect(() => {
    if (videoData) {
      const totalDuration = getDurationFrame();
      setDurationInFrame(totalDuration); // Move this here
    }
  }, [videoData]);

  const getDurationFrame = () => {
    return captions[captions?.length - 1]?.end * fps;
  };

  const getCurrentCaption = () => {
    const currentTime = frame / 30;
    const currentCaption = captions?.find(
      (item) => currentTime >= item?.start && currentTime <= item?.end
    );

    return currentCaption ? currentCaption?.word : "";
  };

  return (
    <div>
      <AbsoluteFill>
        {imageList?.map((item, index) => {
          const startTime = (index * getDurationFrame()) / imageList?.length;
          const duration = getDurationFrame();
          // const scale = (index) =>
          //   interpolate(
          //     frame,
          //     [startTime, startTime + duration / 2, startTime + duration],
          //     index % 2 == 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
          //     { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          //   );

          const scale = (index) => {
            const zoomIn = index % 2 === 0; // alternate direction
            const maxScale = 1.5; // more cinematic than 1.8
            const minScale = 1.0;

            const easedScale = interpolate(
              frame,
              [startTime, startTime + duration / 2, startTime + duration],
              zoomIn
                ? [minScale, maxScale, minScale]
                : [maxScale, minScale, maxScale],
              {
                extrapolateLeft: "identity",
                extrapolateRight: "identity",
              }
            );

            return easedScale;
          };

          return (
            <Sequence key={index} from={startTime} durationInFrames={duration}>
              <AbsoluteFill>
                <Img
                  src={item}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: `scale(${scale(index)})`,
                    transition: "transform 0.8s ease-in-out",
                    filter: "brightness(0.95) contrast(1.05) saturate(1.2)",
                    borderRadius: "1.5rem", // Optional: for cinematic rounded corners
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                    filter:
                      "brightness(0.95) contrast(1.05) saturate(1.2) blur(0.2px)",
                  }}
                />
              </AbsoluteFill>
            </Sequence>
          );
        })}
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          width: "100%",
          bottom: 60,
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "none", // prevent interaction blocking
          padding: "0 1rem",
        }}
      >
        <h2
          className={`${videoData?.caption?.style}`}
          style={{ margin: 0, fontSize: "3rem" }}
        >
          {getCurrentCaption()}
        </h2>
      </AbsoluteFill>
      {videoData?.audioUrl && (
        <Audio
          src={videoData?.audioUrl}
          // crossOrigin="anonymous" // Set crossOrigin attribute
        />
      )}
    </div>
  );
};
export default MyVideo;
