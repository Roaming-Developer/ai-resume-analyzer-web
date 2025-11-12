"use client";

import { Toaster } from "sonner";
import { ThemeToggle } from "./ThemeToggle";
import { ConsoleEasterEgg } from "./ConsoleEasterEgg";
import { UIEasterEgg } from "./UIEasterEgg";
import { Footer } from "./Footer";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ConsoleEasterEgg />
      <UIEasterEgg />
      <nav className="border-b sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            className="text-xl font-bold bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer select-none active:scale-95"
            aria-label="AI Resume Analyzer"
          >
            AI Resume Analyzer
          </button>
          <ThemeToggle />
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

