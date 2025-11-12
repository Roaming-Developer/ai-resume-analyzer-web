"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  score: number;
  suggestions: string;
  className?: string;
}

export function ResultCard({ score, suggestions, className }: ResultCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreVariant = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className={cn("border-2 shadow-lg bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          ATS Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Overall Match</span>
            <div className="flex items-center gap-2">
              <span className={`text-4xl font-bold ${getScoreColor(score)} transition-all duration-300`}>
                {score}
              </span>
              <span className={`text-xl font-semibold ${getScoreColor(score)}`}>%</span>
            </div>
          </div>
          <div className="relative">
            <Progress value={score} className="h-4 rounded-full" />
            <div className={`absolute inset-0 h-4 rounded-full ${getScoreVariant(score)} opacity-20 blur-sm`} />
          </div>
        </div>

        {suggestions && (
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-yellow-400/20 to-yellow-600/20">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
              </div>
              <h3 className="text-sm font-semibold">AI Suggestions</h3>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                {suggestions}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

