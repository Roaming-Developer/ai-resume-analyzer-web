"use client";

import { useEffect, useState } from "react";
import { api, setApiKeyGetter } from "@/lib/api";
import { toast } from "sonner";
import { useAppStore } from "@/store/useAppStore";
import { ApiKeyModal } from "./ApiKeyModal";

export function BackendHealthCheck() {
  const { apiKey, setOpenAIHealthStatus, setApiKey } = useAppStore();
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [errorType, setErrorType] = useState<
    | "authentication_error"
    | "rate_limit_error"
    | "api_error"
    | "unknown_error"
    | undefined
  >();
  const [errorMessage, setErrorMessage] = useState<string>();

  // Register API key getter for API client
  useEffect(() => {
    setApiKeyGetter(() => useAppStore.getState().apiKey);
  }, []);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        // First check basic backend health
        const basicHealth = await api.health();
        if (basicHealth.status === "ok" || basicHealth.status === "healthy") {
          // Then check OpenAI health
          try {
            const openAIHealth = await api.checkOpenAIHealth(
              apiKey || undefined
            );

            if (openAIHealth.status === "healthy") {
              setOpenAIHealthStatus("healthy");
              toast.success("Backend is healthy and ready!", {
                duration: 3000,
              });
            } else {
              setOpenAIHealthStatus("error");
              // Show modal based on error type
              if (openAIHealth.error_type === "authentication_error") {
                setErrorType("authentication_error");
                setShowApiKeyModal(true);
              } else if (openAIHealth.error_type === "rate_limit_error") {
                setErrorType("rate_limit_error");
                setErrorMessage(openAIHealth.message);
                setShowApiKeyModal(true);
              } else {
                toast.error(openAIHealth.message || "OpenAI API error", {
                  duration: 5000,
                });
              }
            }
          } catch (openAIError: any) {
            // Check if it's an authentication or quota error
            const errorMsg = openAIError?.message || "";
            if (
              errorMsg.includes("API key") ||
              errorMsg.includes("authentication")
            ) {
              setErrorType("authentication_error");
              setShowApiKeyModal(true);
            } else if (
              errorMsg.includes("quota") ||
              errorMsg.includes("rate limit")
            ) {
              setErrorType("rate_limit_error");
              setErrorMessage(errorMsg);
              setShowApiKeyModal(true);
            } else {
              // Backend might not have OpenAI configured, that's okay
              console.warn("OpenAI health check failed:", openAIError);
            }
          }
        }
      } catch (error) {
        // Silently fail - don't show error toast on initial load
        // Backend might not be running in development
        console.warn("Backend health check failed:", error);
      }
    };

    // Small delay to avoid blocking initial render
    const timeoutId = setTimeout(checkHealth, 1000);

    return () => clearTimeout(timeoutId);
  }, [apiKey, setOpenAIHealthStatus]);

  return (
    <ApiKeyModal
      open={showApiKeyModal}
      onOpenChange={setShowApiKeyModal}
      errorType={errorType}
      errorMessage={errorMessage}
    />
  );
}
