import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Metadata: FC = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Metadata</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Tokens Used</p>
            <p className="text-lg font-medium">0</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Response Time</p>
            <p className="text-lg font-medium">0ms</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Model</p>
            <p className="text-lg font-medium">4o-mini</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Metadata;
