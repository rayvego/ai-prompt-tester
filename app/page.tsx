import ConfigSection from "@/components/ConfigSection";
import Hero from "@/components/Hero";
import Output from "@/components/Output";
import PromptEditor from "@/components/PromptEditor";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6">
      <Hero />
      <ConfigSection />
      
      <div className="prompt-grid">
        <PromptEditor />
        <div className="output-grid">
          <Output />
        </div>
      </div>
    </div>
  );
}
