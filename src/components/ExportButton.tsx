"use client";

import { Button } from "./ui/button";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { exportToPDF, generateExportHTML } from "@/lib/pdfExport";
import type { ResultResponse } from "@/lib/api";

interface ExportButtonProps {
  result: ResultResponse;
  className?: string;
}

export function ExportButton({ result, className }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Create a temporary div with the export content
      const exportHTML = generateExportHTML(result);
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = exportHTML;
      tempDiv.id = "export-content";
      tempDiv.style.position = "absolute";
      tempDiv.style.left = "-9999px";
      document.body.appendChild(tempDiv);

      await exportToPDF(result, "export-content");

      document.body.removeChild(tempDiv);
      toast.success("Report exported successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to export report"
      );
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleExport}
      disabled={isExporting}
      className={className}
    >
      {isExporting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Exporting...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Export Report (PDF)
        </>
      )}
    </Button>
  );
}

