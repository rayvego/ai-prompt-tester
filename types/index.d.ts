declare type runPromptProps = {
  communityName: string,
  model: string,
  messageHistory: string,
  inclusion: string,
  temperature: number,
  prompt: string,
}

declare type executePromptProps = {
  communityName: string;
  model: string;
  messages: any;
  inclusion: string;
  temperature: number;
  prompt: string;
  spectrum: any;
  values: any;
};