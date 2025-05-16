import axios from "axios";
import { inngest } from "./client";
import { createClient } from "@deepgram/sdk";
import { generateImageScript } from "@/configs/AiModel";

const ImagePromptScript = `Generate Image prompt of {style} style with all details for each scene for 40 seconds video : script: {script}
- Just Give specifing image prompt depends on the story line
- Do not give camera angle image prompt
- Follow the following Schema and return JSON data (Max 5-7 Images)
- [
    {
      imagePrompt:'',
      sceneContent: '<Script Content>'
    }
]`;

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

const BASE_URL = "https://aigurulab.tech";
export const GenerateVideoData = inngest.createFunction(
  { id: "generate-video-data" },
  { event: "generate-video-data" },
  async ({ event, step }) => {
    const { script, topic, title, caption, videoStyle, voice } = event?.data;

    // generate audio
    const generateAudioFile = await step.run("GenerateAudioFile", async () => {
      // const result = await axios.post(
      //   BASE_URL + "/api/text-to-speech",
      //   {
      //     input: script,
      //     voice: voice,
      //   },
      //   {
      //     headers: {
      //       "x-api-key": process.env.NEXT_PUBLIC_AIGURULAB_API_KEY, // Your API Key
      //       "Content-Type": "application/json", // Content Type
      //     },
      //   }
      // );
      // console.log(result.data.audio); //Output Result: Audio Mp3 Url
      // return result.data.audio;

      return "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/audio%2F1747086060958.mp3?alt=media&token=c62e7fe9-61bd-454f-a23b-1221e16e2aab";
    });

    // generate captions
    const generateCaptions = await step.run("GenerateCaptions", async () => {
      const deepgram = createClient(process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY);
      const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
        {
          url: generateAudioFile,
        },
        {
          model: "nova",
        }
      );

      return result.results?.channels[0]?.alternatives[0]?.words;
    });

    // generate image prompt scripts
    const generateImagePrompts = await step.run(
      "GenerateImagePrompt",
      async () => {
        const FINAL_PROMPT = ImagePromptScript.replace(
          "{style}",
          videoStyle
        ).replace("{script}", script);
        console.log("Final prompt:", FINAL_PROMPT); // Log the final prompt for debugging
        const result = await generateImageScript(FINAL_PROMPT); // Pass the full prompt
        console.log("Response from generateImageScript:", result); // Log the response
        return result; // Return the result
      }
    );

    // generate images using ai model
    const generateImages = await step.run("GenerateImages", async () => {
      let images = [];
      images = await Promise.all(
        generateImagePrompts.map(async (element) => {
          const result = await axios.post(
            BASE_URL + "/api/generate-image",
            {
              width: 1024,
              height: 1024,
              input: element?.imagePrompt,
              model: "sdxl", //'flux'
              aspectRatio: "1:1", //Applicable to Flux model only
            },
            {
              headers: {
                "x-api-key": process.env.NEXT_PUBLIC_AIGURULAB_API_KEY, // Your API Key
                "Content-Type": "application/json", // Content Type
              },
            }
          );
          console.log(result.data.image); //Output Result: Base 64 Image
          return result.data.image;
        })
      );

      return images;
    });

    //save all data to convex database

    // return generateAudioFile;
    // return generateCaptions;
    // return generateImagePrompts;
    return generateImages;
  }
);

// const generateImagePrompts = await step.run("GenerateImagePrompt", async () => {
//   const FINAL_PROMPT = ImagePromptScript.replace('{style}', videoStyle).replace('{script}', script);
//    const result = await generateImageScript.sendMessage(FINAL_PROMPT);
//    const resp = JSON.parse(result.response.text());

//    return resp;
// });
