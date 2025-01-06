"use client";

import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppContext } from "@/app/providers";

const Output: FC = () => {
  const {output} = useAppContext();
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Output</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="min-h-[calc(100vh-24rem)] bg-muted/30 rounded-lg p-4">
          <p className="text-muted-foreground">{output}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Output;
