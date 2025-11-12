"use client";

import { useEffect } from "react";

export function ConsoleEasterEgg() {
  useEffect(() => {
    // Only show in browser (not SSR)
    if (typeof window === "undefined") return;

    // Check if console is available and user is likely a recruiter/dev
    const isDevToolsOpen = () => {
      const widthThreshold = 160;
      return (
        window.outerWidth - window.innerWidth > widthThreshold ||
        window.outerHeight - window.innerHeight > widthThreshold
      );
    };

    // Create a styled console message
    const showEasterEgg = () => {
      const styles = [
        "color: #6366f1",
        "font-size: 16px",
        "font-weight: bold",
        "padding: 10px",
      ].join(";");

      const styles2 = [
        "color: #8b5cf6",
        "font-size: 14px",
        "padding: 5px",
      ].join(";");

      const styles3 = [
        "color: #10b981",
        "font-size: 12px",
        "font-style: italic",
      ].join(";");

      console.log("%c👋 Hey there!", styles);
      console.log("%cNice attention to detail! 👀", styles2);
      console.log(
        "%cIf you're checking performance or inspecting the code, you're exactly the kind of detail-oriented person we'd love to work with!",
        styles3
      );
      console.log(
        "%cMade with ❤️ by Akash and AI",
        "color: #ec4899; font-size: 12px;"
      );
      console.log(
        "%c🔗 GitHub: github.com/akashprasher | 🌐 Website: akashprasher.com",
        "color: #8b5cf6; font-size: 11px;"
      );
      console.log(
        "%cTech Stack: Next.js 16 • TypeScript • Tailwind CSS • Zustand • Axios",
        "color: #6b7280; font-size: 11px; font-style: italic;"
      );
      console.log(
        "%c💡 Tip: Check out the GitHub repo for the full codebase!",
        "color: #f59e0b; font-size: 11px;"
      );
      console.log(
        "%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        "color: #374151; font-size: 10px;"
      );
    };

    // Show immediately
    showEasterEgg();

    // Also show when dev tools are opened (with a delay to catch it)
    const checkDevTools = () => {
      if (isDevToolsOpen()) {
        // Small delay to ensure console is ready
        setTimeout(() => {
          console.log(
            "%c🔍 DevTools detected! You're definitely checking performance. Impressive!",
            "color: #3b82f6; font-size: 13px; font-weight: bold;"
          );
        }, 500);
      }
    };

    // Check periodically (but not too aggressively)
    const devToolsCheckInterval = setInterval(checkDevTools, 2000);

    // Cleanup
    return () => {
      if (devToolsCheckInterval) {
        clearInterval(devToolsCheckInterval);
      }
    };
  }, []);

  return null;
}
