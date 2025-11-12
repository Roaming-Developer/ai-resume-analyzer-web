"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";

interface KeywordCloudProps {
  matchedKeywords: string[];
  missingKeywords: string[];
  className?: string;
}

export function KeywordCloud({
  matchedKeywords,
  missingKeywords,
  className,
}: KeywordCloudProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Keywords Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {matchedKeywords.length > 0 && (
          <div>
            <div className="mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <h3 className="text-sm font-semibold">
                Matched Keywords ({matchedKeywords.length})
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {matchedKeywords.map((keyword, index) => (
                <Badge key={index} variant="success">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {missingKeywords.length > 0 && (
          <div>
            <div className="mb-3 flex items-center gap-2">
              <XCircle className="h-5 w-5 text-destructive" />
              <h3 className="text-sm font-semibold">
                Missing Keywords ({missingKeywords.length})
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {missingKeywords.map((keyword, index) => (
                <Badge key={index} variant="outline">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {matchedKeywords.length === 0 && missingKeywords.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No keywords data available
          </p>
        )}
      </CardContent>
    </Card>
  );
}

