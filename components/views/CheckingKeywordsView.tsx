"use client";

import React, { useState, useEffect } from "react";
import {
  FileEdit,
  Copy,
  Check,
  Trash2,
  PlusCircle,
  Save,
  Info,
} from "lucide-react";
import { useKeywords } from "@/hooks/useKeywords";

const NOTEPAD_STORAGE_KEY = "etsy-keyword-vault-checking-notepad";

export function CheckingKeywordsView() {
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const { handleAddKeyword, showToast } = useKeywords();

  // Load saved notepad on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(NOTEPAD_STORAGE_KEY);
      if (saved) {
        setContent(saved);
      }
    }
  }, []);

  // Save on edit
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setContent(val);
    if (typeof window !== "undefined") {
      localStorage.setItem(NOTEPAD_STORAGE_KEY, val);
      setLastSaved(new Date().toLocaleTimeString());
    }
  };

  const handleCopyAll = () => {
    if (!content.trim()) return;
    navigator.clipboard.writeText(content);
    setCopied(true);
    showToast("Copied notepad content to clipboard.", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    if (!content.trim()) return;
    if (window.confirm("Clear all notes in the Checking Keywords notepad?")) {
      setContent("");
      if (typeof window !== "undefined") {
        localStorage.removeItem(NOTEPAD_STORAGE_KEY);
      }
      showToast("Notepad cleared.", "info");
    }
  };

  // Quick extract lines into vault
  const handleQuickAddToVault = () => {
    const lines = content
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0 && !l.startsWith("#"));

    if (lines.length === 0) {
      showToast("No keywords found to add. Type one keyword per line.", "error");
      return;
    }

    let addedCount = 0;
    lines.forEach((kw) => {
      handleAddKeyword(
        {
          keyword: kw,
          searchVolume: 0,
          competition: 0,
          priority: "Normal",
          type: "Evergreen",
          productType: "Digital",
          favorite: false,
          notes: "Drafted from Checking Keywords notepad",
        },
        true
      );
      addedCount++;
    });

    showToast(`Added ${addedCount} keywords from notepad into your vault!`, "success");
  };

  // Metrics
  const linesCount = content
    .split("\n")
    .filter((l) => l.trim().length > 0).length;
  const wordsCount = content
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const charsCount = content.length;

  return (
    <div className="space-y-5 sm:space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <FileEdit className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 dark:text-blue-400" />
              <span>Checking Keywords</span>
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20">
              Auto-saved
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-0.5 sm:mt-1">
            Scratchpad for brainstorming, temporary research, keyword lists, and listing title drafts.
          </p>
        </div>

        {/* Top actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleQuickAddToVault}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs shadow-blue-500/20 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 shrink-0" />
            <span>Add Lines to Vault</span>
          </button>

          <button
            type="button"
            onClick={handleCopyAll}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-200 rounded-xl transition-colors shadow-2xs cursor-pointer"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span>Copy</span>
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Notepad Card */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs overflow-hidden flex flex-col">
        {/* Editor Toolbar */}
        <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 px-3.5 sm:px-4 py-2 bg-slate-50 dark:bg-zinc-800/60 border-b border-slate-200/80 dark:border-zinc-800 text-xs text-slate-500 dark:text-zinc-400">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-[11px] sm:text-xs">
            <span className="font-bold text-slate-700 dark:text-zinc-300">
              {linesCount} {linesCount === 1 ? "Line" : "Lines"}
            </span>
            <span>•</span>
            <span>{wordsCount} Words</span>
            <span>•</span>
            <span>{charsCount} Chars</span>
          </div>

          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-emerald-600 dark:text-emerald-400 font-medium self-end xs:self-auto">
            <Save className="w-3.5 h-3.5" />
            <span>Saved {lastSaved ? `(${lastSaved})` : "locally"}</span>
          </div>
        </div>

        {/* Text Area */}
        <textarea
          value={content}
          onChange={handleChange}
          placeholder="Paste or write your raw keywords, tag ideas, notes, or listing drafts here...
e.g.
custom leather wallet
minimalist gold necklace
boho aesthetic wall art
printable wedding invitation
halloween party mug"
          rows={16}
          className="w-full p-4 sm:p-5 text-sm sm:text-base font-mono bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-hidden resize-y min-h-[280px] sm:min-h-[380px] leading-relaxed"
        />
      </div>

      {/* Context Tips */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/50 flex items-start gap-2.5 text-xs text-slate-700 dark:text-zinc-300">
        <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-900 dark:text-white">
            Quick Notepad Tip:
          </span>
          <p className="mt-0.5 text-slate-600 dark:text-zinc-400 leading-relaxed">
            You can paste lists of keywords from Etsy search bar autosuggest, eRank, or Marmalead here.
            Click <strong>&ldquo;Add Lines to Vault&rdquo;</strong> to automatically convert every line into a keyword entry in your vault.
          </p>
        </div>
      </div>
    </div>
  );
}
