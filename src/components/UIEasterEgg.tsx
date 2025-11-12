"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, X, Github, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

export function UIEasterEgg() {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const clickCountRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleLogoClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if click is on the logo/title
      if (target.closest('button[aria-label="AI Resume Analyzer"]') || 
          target.textContent?.includes("AI Resume Analyzer")) {
        clickCountRef.current += 1;
        
        // Clear existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        // Reset count after 2 seconds if not reached 3
        timeoutRef.current = setTimeout(() => {
          clickCountRef.current = 0;
        }, 2000);
        
        // Show easter egg after 3 clicks
        if (clickCountRef.current >= 3) {
          setShowEasterEgg(true);
          setIsVisible(true);
          clickCountRef.current = 0;
        }
      }
    };

    document.addEventListener("click", handleLogoClick);
    return () => {
      document.removeEventListener("click", handleLogoClick);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!showEasterEgg) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={() => {
        setIsVisible(false);
        setTimeout(() => setShowEasterEgg(false), 500);
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <Card
        className="relative z-10 max-w-md w-full p-8 border-2 shadow-2xl bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 animate-in zoom-in-95 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => setShowEasterEgg(false), 500);
          }}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <Sparkles className="h-16 w-16 text-primary animate-pulse" />
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
            </div>
          </div>

          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            🎉 You found the easter egg!
          </h2>

          <p className="text-muted-foreground">
            Nice attention to detail! 👀
          </p>

          <p className="text-sm text-muted-foreground">
            If you're checking performance or inspecting the code, you're exactly the kind of detail-oriented person we'd love to work with!
          </p>

          <div className="pt-4 space-y-3">
            <p className="text-sm font-semibold">Made with ❤️ by Akash and AI</p>
            <div className="flex gap-4 justify-center">
              <a
                href="https://github.com/akashprasher"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-accent transition-colors"
              >
                <Github className="h-4 w-4" />
                <span className="text-sm">GitHub</span>
              </a>
              <a
                href="https://akashprasher.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-accent transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="text-sm">Website</span>
              </a>
            </div>
          </div>

          <p className="text-xs text-muted-foreground pt-4">
            Tech Stack: Next.js 16 • TypeScript • Tailwind CSS • Zustand • Axios
          </p>
        </div>
      </Card>
    </div>
  );
}

