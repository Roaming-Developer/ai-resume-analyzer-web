"use client";

import { useCallback, useState } from "react";
import { Upload, File, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "./ui/card";

interface UploadBoxProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
}

export function UploadBox({
  onFileSelect,
  accept = ".pdf",
  maxSize = 10,
  className,
}: UploadBoxProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return false;
    }
    if (accept && !file.name.toLowerCase().endsWith(accept.replace(".", ""))) {
      setError(`Only ${accept} files are allowed`);
      return false;
    }
    setError(null);
    return true;
  };

  const handleFile = useCallback(
    (file: File) => {
      if (validateFile(file)) {
        setFile(file);
        onFileSelect(file);
      }
    },
    [onFileSelect, maxSize, accept]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        handleFile(droppedFile);
      }
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    setError(null);
  };

  return (
    <div className={cn("w-full", className)}>
      <Card
        className={cn(
          "relative border-2 border-dashed transition-all duration-300",
          isDragging
            ? "border-primary bg-gradient-to-br from-primary/10 to-purple-500/10 scale-[1.02] shadow-lg"
            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/50",
          error && "border-destructive bg-destructive/5"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="flex cursor-pointer flex-col items-center justify-center p-8"
        >
          {file ? (
            <div className="flex w-full items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20">
                  <File className="h-6 w-6 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeFile();
                }}
                className="rounded-full p-1.5 hover:bg-destructive/10 transition-colors"
              >
                <X className="h-4 w-4 text-destructive" />
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4 relative">
                <Upload className="h-12 w-12 text-muted-foreground animate-bounce" />
                <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full" />
              </div>
              <p className="mb-2 text-sm font-medium">
                Drag & drop your resume here
              </p>
              <p className="text-xs text-muted-foreground">
                or click to browse (Max {maxSize}MB)
              </p>
            </>
          )}
        </label>
      </Card>
      {error && (
        <p className="mt-2 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}

