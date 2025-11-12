import html2pdf from "html2pdf.js";
import type { ResultResponse } from "./api";

export async function exportToPDF(
  result: ResultResponse,
  elementId: string = "export-content"
) {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("Export content element not found");
  }

  const opt = {
    margin: [10, 10, 10, 10],
    filename: `resume-analysis-${result.result_id}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  try {
    await html2pdf().set(opt).from(element).save();
    return true;
  } catch (error) {
    console.error("PDF export error:", error);
    throw error;
  }
}

export function generateExportHTML(result: ResultResponse): string {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "#22c55e";
    if (score >= 60) return "#eab308";
    return "#ef4444";
  };

  return `
    <div id="export-content" style="font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #1f2937; margin-bottom: 10px;">AI Resume Analyzer</h1>
        <p style="color: #6b7280; font-size: 14px;">Analysis Report</p>
      </div>

      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
        <h2 style="color: #1f2937; margin-bottom: 15px; font-size: 18px;">ATS Score</h2>
        <div style="display: flex; align-items: center; gap: 20px;">
          <div style="font-size: 48px; font-weight: bold; color: ${getScoreColor(result.score)};">
            ${result.score}%
          </div>
          <div style="flex: 1; background: #e5e7eb; height: 20px; border-radius: 10px; overflow: hidden;">
            <div style="background: ${getScoreColor(result.score)}; height: 100%; width: ${result.score}%;"></div>
          </div>
        </div>
      </div>

      ${result.matched_keywords.length > 0 ? `
        <div style="margin-bottom: 30px;">
          <h2 style="color: #1f2937; margin-bottom: 15px; font-size: 18px;">Matched Keywords (${result.matched_keywords.length})</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${result.matched_keywords.map(keyword => `
              <span style="background: #22c55e; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px;">${keyword}</span>
            `).join("")}
          </div>
        </div>
      ` : ""}

      ${result.missing_keywords.length > 0 ? `
        <div style="margin-bottom: 30px;">
          <h2 style="color: #1f2937; margin-bottom: 15px; font-size: 18px;">Missing Keywords (${result.missing_keywords.length})</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${result.missing_keywords.map(keyword => `
              <span style="background: #ef4444; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px;">${keyword}</span>
            `).join("")}
          </div>
        </div>
      ` : ""}

      ${result.suggestions ? `
        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px; margin-bottom: 30px;">
          <h2 style="color: #1f2937; margin-bottom: 10px; font-size: 18px;">AI Suggestions</h2>
          <p style="color: #374151; line-height: 1.6; white-space: pre-wrap;">${result.suggestions}</p>
        </div>
      ` : ""}

      <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
        <p>Made with ❤️ by Akash and AI maybe</p>
        <p style="margin-top: 8px;">
          <a href="https://github.com/akashprasher" style="color: #6366f1; text-decoration: none;">GitHub</a> • 
          <a href="https://akashprasher.com" style="color: #6366f1; text-decoration: none; margin-left: 4px;">Website</a>
        </p>
        <p style="margin-top: 8px; font-size: 11px;">Result ID: ${result.result_id}</p>
      </div>
    </div>
  `;
}

