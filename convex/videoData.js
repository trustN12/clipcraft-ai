import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createVideoData = mutation({
  args: {
    title: v.string(),
    topic: v.string(),
    script: v.string(),
    videoStyle: v.string(),
    caption: v.any(),
    voice: v.string(),
    uid: v.id("users"),
    createdBy: v.string(),
    credits: v.number(),
  },

  handler: async (ctx, args) => {
    // Retrieve the current user data to get the current credits
    const user = await ctx.db.get(args.uid);
    console.log("Current User Credits Before Deduction:", user.credits);
    // Check if the user has enough credits to create a video
    if (user.credits <= 0) {
      throw new Error("Insufficient credits to create a video.");
    }

    // Insert the video data
    const result = await ctx.db.insert("videoData", {
      title: args.title,
      topic: args.topic,
      script: args.script,
      videoStyle: args.videoStyle,
      caption: args.caption,
      voice: args.voice,
      uid: args.uid,
      createdBy: args.createdBy,
      status: "pending",
      credits: args.credits,
    });

    // Deduct one credit from the user
    await ctx.db.patch(args.uid, {
      credits: user.credits - 1, // Deducting one credit from the current credits
    });
    // Log the updated credits
    const updatedUser = await ctx.db.get(args.uid);
    console.log("Updated User Credits After Deduction:", updatedUser.credits);
    return result;
  },
});

export const updateVideoRecord = mutation({
  args: {
    recordId: v.id("videoData"),
    audioUrl: v.string(),
    images: v.any(),
    captionJson: v.any(),
  },

  handler: async (ctx, args) => {
    const result = ctx.db.patch(args.recordId, {
      audioUrl: args.audioUrl,
      captionJson: args.captionJson,
      images: args.images,
      status: "completed",
    });

    return result;
  },
});

export const getUserVideos = query({
  args: {
    uid: v.id("users"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("videoData")
      .filter((q) => q.eq(q.field("uid"), args.uid))
      .order("desc")
      .collect();

    return result;
  },
});

export const getVideoById = query({
  args: {
    videoId: v.id("videoData"),
  },
  handler: async(ctx,args)=>{
    const result = await ctx.db.get(args.videoId);
    return result;
  }
});
