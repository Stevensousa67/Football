import { AlertCircle } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ErrorDisplayProps {
  title?: string;
  message?: string;
}

export default function ErrorDisplay({ 
  title = "Something went wrong", 
  message = "Failed to load content. Please try again later." 
}: ErrorDisplayProps) {
  return (
    <Card className="w-full max-w-md mx-auto border-destructive/50 bg-destructive/5">
      <CardHeader>
        <div className="flex flex-col items-center gap-2 text-destructive mb-2 text-center">
            <AlertCircle className="h-8 w-8" />
            <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription className="text-center text-destructive/90 font-medium">
          {message}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
