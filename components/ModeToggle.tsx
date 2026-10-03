"use client";

import React from "react";
import { Sparkles, Zap } from "lucide-react";
import { useKeywords } from "@/hooks/useKeywords";
import { cn } from "@/lib/utils";

interface ModeToggleProps {
  className?: string;
  fullWidthOnMobile?: boolean;
}

export function ModeToggle({ className, fullWidthOnMobile = false }: ModeToggleProps) {
  const { isProMode, setIsProMode } = useKeywords();

  return (
    <div
      className={cn(
        "inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-zinc-800/90 border border-slate-200/80 dark:border-zinc-700/80 shadow-2xs select-none",
        fullWidthOnMobile && "w-full sm:w-auto",
        className
      )}
      role="group"
      aria-label="Mode switcher"
    >
      <button
        type="button"
        onClick={() => setIsProMode(false)}
        title="Basic Mode: Fast & minimal (Volume, Competition & Opportunity only)"
        className={cn(
          "px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer",
          fullWidthOnMobile && "flex-1 sm:flex-initial",
          !isProMode
            ? "bg-white dark:bg-zinc-900 text-slate-900 dark:text-white shadow-xs ring-1 ring-black/5 dark:ring-white/10"
            : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
        )}
      >
        <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
        <span>Basic<span className="hidden xs:inline"> Mode</span></span>
      </button>

      <button
        type="button"
        onClick={() => setIsProMode(true)}
        title="Pro Mode: Full analytics (Product Type, Language, Priority, Classification & Collections)"
        className={cn(
          "px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer",
          fullWidthOnMobile && "flex-1 sm:flex-initial",
          isProMode
            ? "bg-blue-600 text-white shadow-xs shadow-blue-500/20 ring-1 ring-blue-500/30 font-bold"
            : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
        )}
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300 shrink-0" />
        <span>Pro<span className="hidden xs:inline"> Mode</span></span>
      </button>
    </div>
  );
}
