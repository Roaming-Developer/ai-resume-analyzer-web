"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadBox } from "@/components/UploadBox";
import { JDInput } from "@/components/JDInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2, ArrowLeft, Trophy } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import Link from "next/link";
import { useApiKeyError } from "@/hooks/useApiKeyError";
import { ApiKeyModal } from "@/components/ApiKeyModal";

export default function ComparePage() {
  const router = useRouter();
  const [resume1, setResume1] = useState<File | null>(null);
  const [resume2, setResume2] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isComparing, setIsComparing] = useState(false);
  const [comparison, setComparison] = useState<{
    resume_1_score: number;
    resume_2_score: number;
    better_resume: "resume_1" | "resume_2";
    analysis_summary: string;
  } | null>(null);
  const { showApiKeyModal, setShowApiKeyModal, errorType, errorMessage, handleError } = useApiKeyError();

  const handleCompare = async () => {
    if (!resume1 || !resume2) {
      toast.error("Please upload both resumes");
      return;
    }

    if (!jobDescription.trim()) {
      toast.error("Please enter a job description");
      return;
    }

    setIsComparing(true);
    try {
      const result = await api.compare(resume1, resume2, jobDescription);
      setComparison(result);
      toast.success("Comparison completed!");
    } catch (error) {
      // Check if it's an API key/quota error
      if (!handleError(error)) {
        toast.error(
          error instanceof Error ? error.message : "Failed to compare resumes"
        );
      }
    } finally {
      setIsComparing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <>
      <ApiKeyModal
        open={showApiKeyModal}
        onOpenChange={setShowApiKeyModal}
        errorType={errorType}
        errorMessage={errorMessage}
      />
      <div className="container mx-auto min-h-screen px-4 py-12">
        <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Compare Resumes</h1>
            <p className="text-muted-foreground mt-2">
              See which resume performs better for a job description
            </p>
          </div>
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>

        {/* Upload Forms */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Resume 1</h2>
            <UploadBox
              onFileSelect={(file) => setResume1(file)}
              accept=".pdf"
              maxSize={10}
            />
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Resume 2</h2>
            <UploadBox
              onFileSelect={(file) => setResume2(file)}
              accept=".pdf"
              maxSize={10}
            />
          </Card>
        </div>

        {/* Job Description */}
        <Card className="p-6">
          <JDInput
            value={jobDescription}
            onChange={setJobDescription}
            placeholder="Paste the job description here..."
          />
        </Card>

        {/* Compare Button */}
        <Button
          onClick={handleCompare}
          disabled={isComparing || !resume1 || !resume2 || !jobDescription.trim()}
          className="w-full"
          size="lg"
        >
          {isComparing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Comparing...
            </>
          ) : (
            "Compare Resumes"
          )}
        </Button>

        {/* Comparison Results */}
        {comparison && (
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Resume 1</CardTitle>
                  {comparison.better_resume === "resume_1" && (
                    <Trophy className="h-6 w-6 text-yellow-500" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">ATS Score</span>
                    <span
                      className={`text-2xl font-bold ${getScoreColor(comparison.resume_1_score)}`}
                    >
                      {comparison.resume_1_score}%
                    </span>
                  </div>
                  <Progress value={comparison.resume_1_score} className="h-3" />
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Resume 2</CardTitle>
                  {comparison.better_resume === "resume_2" && (
                    <Trophy className="h-6 w-6 text-yellow-500" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">ATS Score</span>
                    <span
                      className={`text-2xl font-bold ${getScoreColor(comparison.resume_2_score)}`}
                    >
                      {comparison.resume_2_score}%
                    </span>
                  </div>
                  <Progress value={comparison.resume_2_score} className="h-3" />
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 p-6">
              <CardHeader>
                <CardTitle>Analysis Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {comparison.analysis_summary}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
        </div>
      </div>
    </>
  );
}

