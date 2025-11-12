"use client";

import { Github, ExternalLink, Heart, Sparkles } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t mt-auto bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
            <span>by</span>
            <span className="font-semibold text-foreground">Akash</span>
            <span>and</span>
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="italic">AI</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/akashprasher"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </Link>
            <Link
              href="https://akashprasher.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Website</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
