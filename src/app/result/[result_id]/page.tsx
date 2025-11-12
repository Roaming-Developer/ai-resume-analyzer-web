"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ResultCard } from "@/components/ResultCard";
import { KeywordCloud } from "@/components/KeywordCloud";
import { ShareButton } from "@/components/ShareButton";
import { ExportButton } from "@/components/ExportButton";
import { RewriteModal } from "@/components/RewriteModal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { FileEdit, ArrowLeft, GitCompare } from "lucide-react";
import { api, type ResultResponse } from "@/lib/api";
import { useAppStore } from "@/store/useAppStore";
import { toast } from "sonner";
import Link from "next/link";

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const resultId = params.result_id as string;
  const [result, setResult] = useState<ResultResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rewriteModalOpen, setRewriteModalOpen] = useState(false);
  const { lastAnalysis } = useAppStore();

  useEffect(() => {
    const fetchResult = async () => {
      setIsLoading(true);
      try {
        // Try to use cached result if it matches
        if (lastAnalysis && lastAnalysis.result_id === resultId) {
          setResult(lastAnalysis);
          setIsLoading(false);
          return;
        }

        const data = await api.getResult(resultId);
        setResult(data);
        useAppStore.getState().setLastAnalysis(data);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to load result"
        );
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    if (resultId) {
      fetchResult();
    }
  }, [resultId, router, lastAnalysis]);

  if (isLoading) {
    return (
      <div className="container mx-auto min-h-screen px-4 py-12">
        <div className="mx-auto max-w-4xl space-y-6">
          <Skeleton className="h-10 w-64" />
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="container mx-auto min-h-screen px-4 py-12">
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">Result not found</p>
          <Button onClick={() => router.push("/")} className="mt-4">
            Go Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-screen px-4 py-12">
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between animate-in fade-in slide-in-from-top-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="gap-2 hover:bg-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <Link href="/compare">
            <Button variant="outline" className="gap-2 hover:bg-accent transition-colors">
              <GitCompare className="h-4 w-4" />
              Compare Resumes
            </Button>
          </Link>
        </div>

        {/* Results Grid */}
        <div className="grid gap-6 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <ResultCard score={result.score} suggestions={result.suggestions} />
          <KeywordCloud
            matchedKeywords={result.matched_keywords}
            missingKeywords={result.missing_keywords}
          />
        </div>

        {/* Action Buttons */}
        <Card className="p-6 border-2 shadow-lg bg-card/50 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          <div className="flex flex-wrap gap-4">
            <ShareButton resultId={result.result_id} />
            <ExportButton result={result} />
            <Button
              variant="outline"
              onClick={() => setRewriteModalOpen(true)}
              className="gap-2 hover:bg-accent transition-colors"
            >
              <FileEdit className="h-4 w-4" />
              Rewrite My Summary
            </Button>
          </div>
        </Card>

        {/* Rewrite Modal */}
        <RewriteModal
          open={rewriteModalOpen}
          onOpenChange={setRewriteModalOpen}
          jobDescription=""
          initialText=""
          onRewriteComplete={(text) => {
            toast.success("Text rewritten! You can copy and use it.");
          }}
        />
      </div>
    </div>
  );
}

