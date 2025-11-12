"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface RewriteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobDescription: string;
  initialText?: string;
  onRewriteComplete?: (improvedText: string) => void;
}

export function RewriteModal({
  open,
  onOpenChange,
  jobDescription,
  initialText = "",
  onRewriteComplete,
}: RewriteModalProps) {
  const [sectionText, setSectionText] = useState(initialText);
  const [improvedText, setImprovedText] = useState("");
  const [reasoning, setReasoning] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRewrite = async () => {
    if (!sectionText.trim()) {
      toast.error("Please enter text to rewrite");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.rewrite(sectionText, jobDescription);
      setImprovedText(response.improved_text);
      setReasoning(response.reasoning);
      toast.success("Text rewritten successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to rewrite text"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(improvedText);
    toast.success("Copied to clipboard!");
  };

  const handleUse = () => {
    if (onRewriteComplete && improvedText) {
      onRewriteComplete(improvedText);
      onOpenChange(false);
      setSectionText("");
      setImprovedText("");
      setReasoning("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Rewrite Summary</DialogTitle>
          <DialogDescription>
            Enter the section you want to rewrite to better match the job
            description.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="section-text">Original Text</Label>
            <Textarea
              id="section-text"
              value={sectionText}
              onChange={(e) => setSectionText(e.target.value)}
              placeholder="Paste the section you want to improve..."
              rows={6}
            />
          </div>

          <Button
            onClick={handleRewrite}
            disabled={isLoading || !sectionText.trim()}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Rewriting...
              </>
            ) : (
              "Rewrite with AI"
            )}
          </Button>

          {improvedText && (
            <div className="space-y-4 rounded-lg border p-4">
              <div className="space-y-2">
                <Label>Improved Text</Label>
                <Textarea
                  value={improvedText}
                  readOnly
                  rows={6}
                  className="bg-muted"
                />
              </div>

              {reasoning && (
                <div className="space-y-2">
                  <Label>Reasoning</Label>
                  <p className="text-sm text-muted-foreground">{reasoning}</p>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" onClick={handleCopy} className="flex-1">
                  Copy
                </Button>
                <Button onClick={handleUse} className="flex-1">
                  Use This Text
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

