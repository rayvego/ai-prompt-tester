"use client";

import { FC, useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useAppContext } from "@/app/providers";
import { getCommunityNames } from "@/lib/actions/ai.actions";

const ConfigSection: FC = () => {
  const { configOptions, setConfigOptions } = useAppContext();
  const [communities, setCommunities] = useState<string[]>([]);
  
  const getCommunities = async () => {
    const response = await getCommunityNames();
    
    // @ts-ignore
    setCommunities(response);
  }
  
  useEffect(() => {
    getCommunities();
  }, []);

  const handleConfigChange = (key: keyof typeof configOptions, value: any) => {
    setConfigOptions({
      ...configOptions,
      [key]: value,
    });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 bg-muted/50 rounded-lg mb-6">
      {/* Community Selection */}
      <div className="space-y-2">
        <Label>Community</Label>
        <Select value={configOptions.community} onValueChange={(value) => handleConfigChange("community", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select community" />
          </SelectTrigger>
          <SelectContent>
            {!communities.length && <SelectItem value="loading">Loading...</SelectItem>}
            {communities.map((community) => (
              <SelectItem key={community} value={community}>
                {community}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Messages to Include */}
      <div className="space-y-2">
        <Label>Messages to include</Label>
        <Select
          value={configOptions.messageHistory}
          onValueChange={(value) => handleConfigChange("messageHistory", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last-100">Last 100</SelectItem>
            <SelectItem value="last-500">Last 500</SelectItem>
            <SelectItem value="last-1000">Last 1000</SelectItem>
            <SelectItem value="last-week">Last Week</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="full">Full</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Include in Prompt */}
      <div className="space-y-2">
        <Label>Include in prompt</Label>
        <Select value={configOptions.inclusion} onValueChange={(value) => handleConfigChange("inclusion", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select inclusion" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="spectrum">Spectrum</SelectItem>
            <SelectItem value="values">Values</SelectItem>
            <SelectItem value="all">All</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Model Selection */}
      <div className="space-y-2">
        <Label>Model</Label>
        <Select value={configOptions.model} onValueChange={(value) => handleConfigChange("model", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
            <SelectItem value="gpt-4o">gpt-4o</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Temperature Slider */}
      <div className="space-y-2 col-span-2">
        <Label>Temperature</Label>
        <Slider
          value={[configOptions.temperature]} // Bind to the temperature value
          onValueChange={(value) => handleConfigChange("temperature", value[0])} // Update temperature in context
          max={1}
          step={0.1}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ConfigSection;
