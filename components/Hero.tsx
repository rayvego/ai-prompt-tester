import { FC } from "react";

const Hero: FC = () => {
  return (
    <div className="py-8 px-4 text-center">
      <h1 className="text-3xl font-bold tracking-tight">AI Prompt Tester</h1>
      <p className="mt-2 text-muted-foreground">
        Test and analyze your AI prompts with different configurations and see the results in real-time.
      </p>
    </div>
  );
};

export default Hero;
