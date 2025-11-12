import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Resume Analyzer by Akash Prasher",
  description:
    "Get instant feedback on how well your resume matches a job description. Analyze ATS compatibility, keywords, and receive AI-powered suggestions.",
  keywords: [
    "resume analyzer",
    "ATS score",
    "resume checker",
    "job application",
    "resume optimization",
    "AI resume",
  ],
  authors: [{ name: "Akash Prasher" }],
  openGraph: {
    title: "AI Resume Analyzer by Akash Prasher",
    description:
      "Get instant feedback on how well your resume matches a job description",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Resume Analyzer by Akash Prasher",
    description:
      "Get instant feedback on how well your resume matches a job description",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
