"use client";

import React, { useState } from "react";
import axios from "axios"; // added missing import
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CircleCheck, CopyIcon, Loader2Icon, Zap } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const suggestions = [
  "Historic Stories",
  "Universe & Galaxies",
  "Kids Stories",
  "Love Stories",
  "Space Mysteries",
  "Adventure",
  "Fantasy",
  "Educational Stories",
  "Horror Stories",
  "Mythological Tales",
  "Science Fiction",
  "Comedy Skits",
  "Inspirational Biographies",
  "Animal Stories",
  "Detective Stories",
  "War Stories",
  "Fairy Tales",
  "Superhero Stories",
  "Magic & Wizards",
  "Environmental Tales",
  "Time Travel Stories",
  "Robot & AI Stories",
  "Underwater Adventures",
  "Post-Apocalyptic Stories",
  "Treasure Hunt Tales",
  "Friendship Stories",
];

// Animation variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -40, scale: 0.95 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14,
    },
  },
};

const Topic = ({ onHandleInputChangeMethod }) => {
  const [selectTopic, setSelectedTopic] = useState();
  const [generatedScripts, setGeneratedScripts] = useState(null); // State to hold generated scripts
  const [loading, setLoading] = useState(false);

  const generateScript = async () => {
    if (!selectTopic) {
      toast.error("Please select a topic");
      return;
    }
    setLoading(true);
    try {
      const result = await axios.post("/api/generate-script", {
        topic: selectTopic,
      });
      setGeneratedScripts(result.data?.scripts);
      toast.success("Your Script is ready! Scroll down to see.");
      // ✅ Success toast
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div>
      <h2 className="mb-2">Project Title</h2>
      <Input
        placeholder="Enter project title"
        onChange={(event) =>
          onHandleInputChangeMethod({
            fieldName: "title",
            fieldValue: event?.target.value,
          })
        }
      />

      <div className="mt-5">
        <h2>Video Topic</h2>
        <p className="text-sm text-gray-500">Select topic for your video</p>

        <Tabs defaultValue="suggestion" className="w-full mt-3">
          <TabsList>
            <TabsTrigger value="suggestion" className="cursor-pointer">
              Suggestions
            </TabsTrigger>
            <TabsTrigger value="your_topic" className="cursor-pointer">
              Custom Prompt
            </TabsTrigger>
          </TabsList>
          <TabsContent value="suggestion">
            <div>
              {suggestions.map((suggestion, index) => (
                <Button
                  className={`cursor-pointer m-[5px] ${
                    suggestion === selectTopic
                      ? "text-orange-700 font-semibold bg-primary"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedTopic(suggestion);
                    onHandleInputChangeMethod({
                      fieldName: "topic",
                      fieldValue: suggestion,
                    });
                  }}
                  variant="ghost"
                  key={index}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="your_topic">
            <div className="mt-2">
              <h2>Your Custom Prompt</h2>
              <Textarea
                className="mt-1"
                placeholder="Enter your prompt over here"
                onChange={(event) =>
                  onHandleInputChangeMethod({
                    fieldName: "topic",
                    fieldValue: event.target.value,
                  })
                }
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Display Generated Scripts */}

      {generatedScripts?.length > 0 && (
  <motion.div
    className="mt-7 space-y-4"
    variants={containerVariants}
    initial="hidden"
    animate="show"
  >
    <motion.h3
      className="text-lg font-semibold text-white"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      ✨ Select Your Script:
    </motion.h3>

    {generatedScripts.map((script, index) => (
      <motion.div
        key={index}
        className={`p-4 rounded-xl border text-sm text-gray-300 bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a] border-[#333] shadow-md relative ${
          selectTopic === index ? "bg-orange-600 border-orange-700" : ""
        }`} // Apply the active class for selected script
        variants={itemVariants}
        whileHover={{
          scale: 1.03,
          boxShadow:
            "0 0 15px rgba(255, 150, 50, 0.4), 0 0 30px rgba(255, 100, 150, 0.2)",
          borderColor: "#ff944d",
        }}
        whileTap={{ scale: 0.97 }}
      >
        <button
          onClick={() => {
            setSelectedTopic(index); // Now selects the script on click
            onHandleInputChangeMethod({
              fieldName: "script",
              fieldValue: script.content,
            });
            toast.success("Script selected successfully!"); 
          }}
          className="absolute cursor-pointer bottom-2 right-2 text-gray-400 hover:text-white transition"
          title="Copy"
        >
          <CircleCheck size={22} className="animate-pulse text-orange-500" />
        </button>
        <p className="whitespace-pre-wrap">{script.content}</p>
      </motion.div>
    ))}
  </motion.div>
)}


      {/* Generate Button */}
      <motion.div
        className="rounded-xl mt-7"
        whileHover={{
          scale: 1.01,
          boxShadow: "0px 4px 30px rgba(255, 180, 100, 0.5)",
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={generateScript}
          disabled={loading} // 🔥 Important: this activates the disabled styles
          className="w-full cursor-pointer text-sm sm:text-base font-medium text-white bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 rounded-xl shadow-[0_4px_20px_rgba(255,150,50,0.3)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_4px_30px_rgba(255,180,100,0.5)] hover:font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2Icon className="animate-spin mr-2 inline-block" />
          ) : (
            <Zap className="animate-pulse mr-2 inline-block" />
          )}
          {generatedScripts ? "Re-generate" : "Generate Script"}
        </Button>
      </motion.div>
    </div>
  );
};

export default Topic;
