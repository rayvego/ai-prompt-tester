"use client";

import { defaultPrompt } from "@/lib/constants";
import React, { ReactNode, createContext, useContext, useState } from "react";

// Create a Context for the app
const AppContext = createContext({
  configOptions: {
    community: "",
    messageHistory: "",
    inclusion: "",
    model: "",
    temperature: 0,
  },
  setConfigOptions: (configOptions: any) => {},
  textareaInput: "",
  setTextareaInput: (textareaInput: string) => {},
  output: "",
  setOutput: (output: string) => {},
});

// Custom Hook to use the AppContext
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Shared state: config options, textarea input, and output
  const [configOptions, setConfigOptions] = useState({
    community: "",
    messageHistory: "",
    inclusion: "",
    model: "",
    temperature: 0.5,
  });
  const [textareaInput, setTextareaInput] = useState(defaultPrompt);
  const [output, setOutput] = useState("Output will appear here...");

  return (
    <AppContext.Provider
      value={{
        configOptions,
        setConfigOptions,
        textareaInput,
        setTextareaInput,
        output,
        setOutput,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};