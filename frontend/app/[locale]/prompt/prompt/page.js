import { PromptCard } from "@/app/[locale]/components/Prompt/PromptCard";
import React from "react";

const prompt = () => {
  return (
    <div className="bg-gradient-to-r from-violet-200 to-pink-200 w-screen h-screen flex  justify-center items-center">
      <PromptCard
        prompt="prompt1"
        link="/prompt/second-prompt"
        skip="/site-builder/second-prompt"
      />
    </div>
  );
};

export default prompt;
