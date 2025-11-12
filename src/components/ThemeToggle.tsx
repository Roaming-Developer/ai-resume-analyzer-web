"use client";

import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Sync with system preference on mount if no stored preference
    const syncWithSystem = () => {
      if (typeof window === "undefined") return;
      
      const stored = localStorage.getItem("ai-resume-analyzer-storage");
      if (!stored) {
        // First time - use system preference
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (systemDark) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } else {
        // Apply stored preference
        if (isDarkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    };

    syncWithSystem();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem("ai-resume-analyzer-storage");
      // Only auto-sync if user hasn't manually set a preference
      if (!stored) {
        if (e.matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [isDarkMode]);

  useEffect(() => {
    // Update theme when isDarkMode changes
    if (mounted) {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [isDarkMode, mounted]);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Toggle theme">
        <Moon className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleDarkMode}
      aria-label="Toggle theme"
      className="hover:bg-accent transition-colors"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}

