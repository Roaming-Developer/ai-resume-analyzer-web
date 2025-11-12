"use client";

import { useState } from "react";

export function useApiKeyError() {
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [errorType, setErrorType] = useState<
    | "authentication_error"
    | "rate_limit_error"
    | "api_error"
    | "unknown_error"
    | undefined
  >();
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleError = (error: Error | unknown) => {
    const errorMsg = error instanceof Error ? error.message : String(error);

    if (
      errorMsg.includes("API key") ||
      errorMsg.includes("authentication") ||
      errorMsg.includes("Invalid API key")
    ) {
      setErrorType("authentication_error");
      setShowApiKeyModal(true);
      return true;
    }

    if (
      errorMsg.includes("quota") ||
      errorMsg.includes("rate limit") ||
      errorMsg.includes("quota exceeded")
    ) {
      setErrorType("rate_limit_error");
      setErrorMessage(errorMsg);
      setShowApiKeyModal(true);
      return true;
    }

    return false;
  };

  return {
    showApiKeyModal,
    setShowApiKeyModal,
    errorType,
    errorMessage,
    handleError,
  };
}
