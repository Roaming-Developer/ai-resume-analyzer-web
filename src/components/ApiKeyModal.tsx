"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AlertCircle, Key, ExternalLink } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface ApiKeyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  errorType?: "authentication_error" | "rate_limit_error" | "api_error" | "unknown_error";
  errorMessage?: string;
}

export function ApiKeyModal({
  open,
  onOpenChange,
  errorType,
  errorMessage,
}: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setApiKey: setStoreApiKey, setOpenAIHealthStatus } = useAppStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      toast.error("Please enter an API key");
      return;
    }

    setIsLoading(true);
    try {
      const health = await api.checkOpenAIHealth(apiKey.trim());
      
      if (health.status === "healthy") {
        setStoreApiKey(apiKey.trim());
        setOpenAIHealthStatus("healthy");
        toast.success("API key validated successfully!");
        onOpenChange(false);
        setApiKey("");
      } else {
        setOpenAIHealthStatus("error");
        toast.error(health.message || "Invalid API key");
      }
    } catch (error) {
      setOpenAIHealthStatus("error");
      toast.error(
        error instanceof Error ? error.message : "Failed to validate API key"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessage = () => {
    if (errorType === "authentication_error") {
      return "Invalid API key. Please enter a valid OpenAI API key.";
    }
    if (errorType === "rate_limit_error") {
      return "API quota exceeded. Please check your OpenAI account or use a different API key.";
    }
    if (errorMessage) {
      return errorMessage;
    }
    return "Please enter your OpenAI API key to continue.";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            OpenAI API Key Required
          </DialogTitle>
          <DialogDescription>
            {errorType === "rate_limit_error"
              ? "The backend API quota has been exceeded. Please provide your own OpenAI API key to continue using the service."
              : "Enter your OpenAI API key to analyze resumes. Your key is stored locally and only sent to the backend for processing."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {(errorType || errorMessage) && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
              <p className="text-sm text-destructive">{getErrorMessage()}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="api-key">OpenAI API Key</Label>
            <Input
              id="api-key"
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              Your API key is stored locally and never shared with third parties.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Button type="submit" disabled={isLoading || !apiKey.trim()} className="w-full">
              {isLoading ? "Validating..." : "Save & Continue"}
            </Button>
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 justify-center"
            >
              Get your API key from OpenAI
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

