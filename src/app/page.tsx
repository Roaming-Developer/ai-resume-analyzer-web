"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadBox } from "@/components/UploadBox";
import { JDInput } from "@/components/JDInput";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import { api } from "@/lib/api";
import { useAppStore } from "@/store/useAppStore";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { setLastAnalysis } = useAppStore();

  const handleAnalyze = async () => {
    if (!resumeFile) {
      toast.error("Please upload your resume");
      return;
    }

    if (!jobDescription.trim()) {
      toast.error("Please enter a job description");
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await api.analyze(resumeFile, jobDescription);
      setLastAnalysis(result);
      toast.success("Analysis completed successfully!");
      router.push(`/result/${result.result_id}`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to analyze resume"
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto min-h-screen px-4 py-12">
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="relative">
              <Sparkles className="h-10 w-10 text-primary animate-pulse" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
              AI Resume Analyzer
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get instant feedback on how well your resume matches a job
            description. Powered by AI to help you land your dream job.
          </p>
        </div>

        {/* Main Form */}
        <Card className="p-8 space-y-6 border-2 shadow-xl bg-card/50 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Upload Your Resume
            </h2>
            <UploadBox
              onFileSelect={(file) => setResumeFile(file)}
              accept=".pdf"
              maxSize={10}
            />
          </div>

          <JDInput
            value={jobDescription}
            onChange={setJobDescription}
            placeholder="Paste the job description here..."
          />

          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !resumeFile || !jobDescription.trim()}
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Analyze Resume
              </>
            )}
          </Button>
        </Card>

        {/* Features */}
        <div className="grid gap-6 md:grid-cols-3 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          <Card className="p-6 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-105 group">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="font-semibold mb-2 text-lg">ATS Score</h3>
            <p className="text-sm text-muted-foreground">
              Get a comprehensive ATS compatibility score to understand your resume's performance
            </p>
          </Card>
          <Card className="p-6 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-105 group">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="font-semibold mb-2 text-lg">Keyword Analysis</h3>
            <p className="text-sm text-muted-foreground">
              See which keywords match and which are missing from your resume
            </p>
          </Card>
          <Card className="p-6 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-105 group">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="font-semibold mb-2 text-lg">AI Suggestions</h3>
            <p className="text-sm text-muted-foreground">
              Receive personalized improvement recommendations powered by AI
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
