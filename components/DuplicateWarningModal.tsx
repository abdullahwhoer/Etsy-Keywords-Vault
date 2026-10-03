"use client";

import React, { useEffect } from "react";
import { AlertCircle, Eye, RefreshCw, PlusCircle, X } from "lucide-react";
import { useKeywords } from "@/hooks/useKeywords";

export function DuplicateWarningModal() {
  const {
    duplicateWarning,
    closeDuplicateWarning,
    confirmSaveAnyway,
    confirmUpdateExisting,
    confirmViewExisting,
  } = useKeywords();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && duplicateWarning) {
        closeDuplicateWarning();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [duplicateWarning, closeDuplicateWarning]);

  if (!duplicateWarning) return null;

  const { pendingData, existingKeyword } = duplicateWarning;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-xs">
      <div
        className="relative w-full max-w-lg my-auto sm:my-8 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl p-6 transition-all animate-in fade-in zoom-in-95"
        role="dialog"
        aria-modal="true"
        aria-labelledby="duplicate-warning-title"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h3
                id="duplicate-warning-title"
                className="text-base font-bold text-slate-900 dark:text-white"
              >
                This keyword already exists.
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                A matching keyword was found in your vault with normalized text.
              </p>
            </div>
          </div>
          <button
            onClick={closeDuplicateWarning}
            aria-label="Close dialog"
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Comparison card */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
            <span className="font-semibold text-slate-400 uppercase text-[10px]">
              Existing Record
            </span>
            <div className="font-bold text-slate-900 dark:text-white mt-1 break-words">
              {existingKeyword.keyword}
            </div>
            <div className="text-slate-500 mt-1">
              Vol: {existingKeyword.searchVolume.toLocaleString()} • Comp:{" "}
              {existingKeyword.competition.toLocaleString()}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-800/60">
            <span className="font-semibold text-blue-500 uppercase text-[10px]">
              New Entered Values
            </span>
            <div className="font-bold text-slate-900 dark:text-white mt-1 break-words">
              {pendingData.keyword}
            </div>
            <div className="text-slate-500 mt-1">
              Vol: {pendingData.searchVolume.toLocaleString()} • Comp:{" "}
              {pendingData.competition.toLocaleString()}
            </div>
          </div>
        </div>

        {/* 4 Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-end">
          <button
            type="button"
            onClick={closeDuplicateWarning}
            className="px-3.5 py-2 text-xs font-medium rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors order-last sm:order-first"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={confirmViewExisting}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-xs"
          >
            <Eye className="w-3.5 h-3.5" />
            View Existing
          </button>

          <button
            type="button"
            onClick={confirmUpdateExisting}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs shadow-blue-500/20 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Update Existing
          </button>

          <button
            type="button"
            onClick={confirmSaveAnyway}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Save Anyway
          </button>
        </div>
      </div>
    </div>
  );
}
