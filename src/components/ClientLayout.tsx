"use client";

import { Toaster } from "sonner";
import { ThemeToggle } from "./ThemeToggle";
import { ConsoleEasterEgg } from "./ConsoleEasterEgg";
import { UIEasterEgg } from "./UIEasterEgg";
import { BackendHealthCheck } from "./BackendHealthCheck";
import { Footer } from "./Footer";
import { Github } from "lucide-react";
import Link from "next/link";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ConsoleEasterEgg />
      <UIEasterEgg />
      <BackendHealthCheck />
      <nav className="border-b sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            className="text-xl font-bold bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer select-none active:scale-95"
            aria-label="AI Resume Analyzer"
          >
            AI Resume Analyzer
          </button>
          <div className="flex items-center gap-3">
            <Link
              href="https://github.com/Roaming-Developer/ai-resume-analyzer-web"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="View on GitHub"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>
      <div className="flex flex-col min-h-screen">
        {children}
        <Footer />
      </div>
      <Toaster position="top-right" richColors />
    </>
  );
}

