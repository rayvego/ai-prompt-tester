"use server";

import CultureBotCommunity from "@/models/CultureBotCommunity";
import connectToDatabase from "../connectDB";
import { logger } from "../logger";
import OpenAI from "openai";

export const runPrompt = async ({communityName, model, messageHistory, inclusion, temperature, prompt}: runPromptProps) => {
  try {
    // Find the community
    await connectToDatabase();
    
    const community = await CultureBotCommunity.findOne({communityName}).populate("messages").populate({ path: "cultureBook", select: "spectrum core_values" });
    
    // messageHistory is one of "last-week", "last-month", "full"
    let messages = community.messages;
    
    if (messageHistory === "last-week") {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      
      // @ts-ignore
      messages = messages.filter((message) => message.createdAt > lastWeek);
    } else if (messageHistory === "last-month") {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      
      // @ts-ignore
      messages = messages.filter((message) => message.createdAt > lastMonth);
    } else if (messageHistory === "last-100") {
      messages = messages.slice(-100);
    } else if (messageHistory === "last-500") {
      messages = messages.slice(-500);
    } else if (messageHistory === "last-1000") {
      messages = messages.slice(-1000);
    }
    
    
    // Get the spectrum and values
    const spectrum = community.cultureBook.spectrum;
    const values = community.cultureBook.core_values;
    
    // const test = `
    //       ${prompt}
          
    //       ---
          
    //       Here is the chat history: ${messages}
          
    //       ${
    //         inclusion === "spectrum"
    //           ? `Here is the spectrum: ${spectrum}`
    //           : inclusion === "values"
    //           ? `Here are the values: ${JSON.stringify(Object.fromEntries(values))}`
    //           : inclusion === "all"
    //           ? `Here is the spectrum and the values: ${spectrum} ${JSON.stringify(Object.fromEntries(values))}`
    //           : ""
    //       }
    //       `;
    
    // logger.info(`Messages: ${messages.length}`);
    // logger.info(`Spectrum: ${spectrum}`);
    // logger.info(`Values: ${JSON.stringify(values[0])}`);
    // logger.info(`Prompt: ${test}`);
    
    const response = executePrompt({communityName, model, messages, inclusion, temperature, prompt, spectrum, values});
    
    return response;
  } catch (error) {
    logger.error(`Failed to run prompt: ${error}`);
  }
}

export const executePrompt = async ({communityName, model, messages, inclusion, temperature, prompt, spectrum, values}: executePromptProps) => {
  const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
  });
  
  try {
    const completion = await openai.chat.completions.create({
      model: model,
      temperature: temperature,
      messages: [
        {
          role: "system",
          content: `
          ${prompt}
          
          ---
          
          Here is the chat history: ${messages}
          
          ${
            inclusion === "spectrum"
              ? `Here is the spectrum: ${spectrum}`
              : inclusion === "values"
              ? `Here are the values: ${JSON.stringify(Object.fromEntries(values))}`
              : inclusion === "all"
              ? `Here is the spectrum and the values: ${spectrum} ${JSON.stringify(Object.fromEntries(values))}`
              : ""
          }
          `,
        },
      ],
    });
    
    console.log(completion);
    let response = completion.choices[0].message.content?.replace("```json", "").replace("```", "");
    
    response = JSON.parse(response!);
    console.log(response)
    
    return JSON.stringify(response, null, 2);
  } catch (error) {
    logger.error(`Failed to execute prompt: ${error}`);
  }
}

export const getValuesAndSpectrum = async () => {
  try {
    
  } catch (error) {
    
  }
}

export const getCommunityNames = async () => {
  try {
    await connectToDatabase();
    
    const communities = await CultureBotCommunity.find({}).select("communityName");
    const communityNames = communities.map((community) => community.communityName);
    
    return communityNames;    
  } catch (error) {
    logger.error(`Failed to get all community names: ${error}`);
  }
}