"use client";

import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";

interface JDInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function JDInput({
  value,
  onChange,
  placeholder = "Paste the job description here...",
  className,
}: JDInputProps) {
  return (
    <div className={cn("w-full space-y-2", className)}>
      <Label htmlFor="job-description">Job Description</Label>
      <Textarea
        id="job-description"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={8}
        className="resize-none"
      />
      <p className="text-xs text-muted-foreground">
        {value.length} characters
      </p>
    </div>
  );
}

