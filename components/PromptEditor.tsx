"use client";

import { FC, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppContext } from "@/app/providers";
import { Button } from "./ui/button";
import { runPrompt } from "@/lib/actions/ai.actions";

const PromptEditor: FC = () => {
  const { textareaInput, setTextareaInput, configOptions, setOutput } = useAppContext(); 
  const [loading, setLoading] = useState(false);
  
  const handleRun = async () => {
    setLoading(true);
    const response = await runPrompt({
      communityName: configOptions.community,
      model: configOptions.model,
      messageHistory: configOptions.messageHistory,
      inclusion: configOptions.inclusion,
      temperature: configOptions.temperature,
      prompt: textareaInput,
    });
    setLoading(false);
    
    setOutput(response!);
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row justify-between items-center py-2">
        <CardTitle>Prompt</CardTitle>
        <Button onClick={handleRun} disabled={loading}>Run</Button>
      </CardHeader>
      <CardContent>
        <Textarea
          value={textareaInput}
          onChange={(e) => setTextareaInput(e.target.value)}
          placeholder="Enter your prompt here..."
          className="min-h-[calc(100vh-20rem)] resize-none"
        />
      </CardContent>
    </Card>
  );
};

export default PromptEditor;
