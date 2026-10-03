import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/hooks/useTheme";
import { KeywordProvider } from "@/hooks/useKeywords";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Etsy Keyword Vault - Research & Keyword Notebook",
  description:
    "Ultra-fast local Etsy keyword research notebook and organization vault. Track search volume, competition, priority, and niche classifications.",
  keywords: [
    "Etsy SEO",
    "Etsy Keywords",
    "Keyword Vault",
    "Etsy Research",
    "Etsy Tags",
    "Etsy Analytics",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-500/20 selection:text-blue-600 dark:selection:text-blue-400`}
      >
        <ThemeProvider>
          <KeywordProvider>{children}</KeywordProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
