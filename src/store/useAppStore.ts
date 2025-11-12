import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ResultResponse } from "@/lib/api";

interface AppState {
  lastAnalysis: ResultResponse | null;
  setLastAnalysis: (analysis: ResultResponse) => void;
  clearLastAnalysis: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  apiKey: string | null;
  setApiKey: (key: string | null) => void;
  openAIHealthStatus: "healthy" | "error" | "unknown" | null;
  setOpenAIHealthStatus: (
    status: "healthy" | "error" | "unknown" | null
  ) => void;
}

// Get system preference
const getSystemTheme = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => {
      // Initialize with system preference if no stored value
      const initializeTheme = () => {
        if (typeof window === "undefined") return false;
        const stored = localStorage.getItem("ai-resume-analyzer-storage");
        if (!stored) {
          // First time - use system preference
          return getSystemTheme();
        }
        try {
          const parsed = JSON.parse(stored);
          return parsed.state?.isDarkMode ?? getSystemTheme();
        } catch {
          return getSystemTheme();
        }
      };

      const initialDarkMode = initializeTheme();

      return {
        lastAnalysis: null,
        setLastAnalysis: (analysis) => set({ lastAnalysis: analysis }),
        clearLastAnalysis: () => set({ lastAnalysis: null }),
        isDarkMode: initialDarkMode,
        toggleDarkMode: () =>
          set((state) => {
            const newDarkMode = !state.isDarkMode;
            if (newDarkMode) {
              document.documentElement.classList.add("dark");
            } else {
              document.documentElement.classList.remove("dark");
            }
            return { isDarkMode: newDarkMode };
          }),
        apiKey: null,
        setApiKey: (key) => set({ apiKey: key }),
        openAIHealthStatus: null,
        setOpenAIHealthStatus: (status) => set({ openAIHealthStatus: status }),
      };
    },
    {
      name: "ai-resume-analyzer-storage",
      partialize: (state) => ({
        lastAnalysis: state.lastAnalysis,
        isDarkMode: state.isDarkMode,
        apiKey: state.apiKey,
      }),
      onRehydrateStorage: () => (state) => {
        // Sync with system preference on first load if no stored preference
        if (state && typeof window !== "undefined") {
          const systemDark = getSystemTheme();
          if (state.isDarkMode !== systemDark) {
            // Apply theme immediately
            if (systemDark) {
              document.documentElement.classList.add("dark");
            } else {
              document.documentElement.classList.remove("dark");
            }
          }
        }
      },
    }
  )
);
