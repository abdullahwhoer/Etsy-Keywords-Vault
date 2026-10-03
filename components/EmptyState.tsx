"use client";

import React from "react";
import { Plus, SearchX, Vault, Sparkles } from "lucide-react";
import { useKeywords } from "@/hooks/useKeywords";

interface EmptyStateProps {
  type: "empty-vault" | "no-search-results" | "no-favorites";
}

export function EmptyState({ type }: EmptyStateProps) {
  const { openAddModal, setSearchQuery, handleResetSampleData } = useKeywords();

  if (type === "no-search-results") {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-4">
          <SearchX className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          No keywords found.
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1 mb-5">
          We couldn&apos;t find any keywords matching your current search query. Try typing different terms.
        </p>
        <button
          type="button"
          onClick={() => setSearchQuery("")}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
        >
          Clear Search Filter
        </button>
      </div>
    );
  }

  if (type === "no-favorites") {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          No favorite keywords yet.
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1 mb-5">
          Click the star icon next to any keyword in your vault to bookmark it here for quick access.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/15 to-indigo-500/15 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 shadow-inner">
        <Vault className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
        Your keyword vault is empty.
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mt-1 mb-6">
        Start organizing your Etsy keyword research. Track high volume search terms, monitor competition, and prioritize your listings.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs md:text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-xs shadow-blue-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          + Add Your First Keyword
        </button>

        <button
          type="button"
          onClick={handleResetSampleData}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs md:text-sm font-medium rounded-lg text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
        >
          Load Starter Keywords
        </button>
      </div>
    </div>
  );
}
