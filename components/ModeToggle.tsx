"use client";

import React from "react";
import { Sparkles, Zap } from "lucide-react";
import { useKeywords } from "@/hooks/useKeywords";

export function ModeToggle() {
  const { isProMode, setIsProMode } = useKeywords();

  return (
    <div
      className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200/80 dark:border-zinc-700 shadow-2xs select-none"
      role="group"
      aria-label="Mode switcher"
    >
      <button
        type="button"
        onClick={() => setIsProMode(false)}
        title="Basic Mode: Fast & minimal (Volume, Competition & Opportunity only)"
        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
          !isProMode
            ? "bg-white dark:bg-zinc-900 text-slate-900 dark:text-white shadow-xs ring-1 ring-black/5 dark:ring-white/10"
            : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
        }`}
      >
        <Zap className="w-3.5 h-3.5 text-amber-500" />
        <span>Basic Mode</span>
      </button>

      <button
        type="button"
        onClick={() => setIsProMode(true)}
        title="Pro Mode: Full analytics (Product Type, Language, Priority, Classification & Collections)"
        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
          isProMode
            ? "bg-blue-600 text-white shadow-xs shadow-blue-500/20 ring-1 ring-blue-500/30 font-bold"
            : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
        }`}
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
        <span>Pro Mode</span>
      </button>
    </div>
  );
}
