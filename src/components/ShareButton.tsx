"use client";

import { Button } from "./ui/button";
import { Share2, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ShareButtonProps {
  resultId: string;
  className?: string;
}

export function ShareButton({ resultId, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/result/${resultId}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Shareable link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleShare}
      className={className}
    >
      {copied ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Copied!
        </>
      ) : (
        <>
          <Share2 className="mr-2 h-4 w-4" />
          Copy Shareable Link
        </>
      )}
    </Button>
  );
}

