"use client";

import React, { useEffect } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { useKeywords } from "@/hooks/useKeywords";

export function DeleteConfirmModal() {
  const { deletingKeyword, closeDeleteConfirm, confirmDelete } = useKeywords();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && deletingKeyword) {
        closeDeleteConfirm();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [deletingKeyword, closeDeleteConfirm]);

  if (!deletingKeyword) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-xs">
      <div
        className="relative w-full max-w-md my-auto sm:my-8 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl p-6 transition-all animate-in fade-in zoom-in-95"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3
                id="delete-dialog-title"
                className="text-base font-bold text-slate-900 dark:text-white"
              >
                Delete this keyword?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                This action cannot be undone.
              </p>
            </div>
          </div>
          <button
            onClick={closeDeleteConfirm}
            aria-label="Close dialog"
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-sm">
          <div className="font-semibold text-slate-900 dark:text-white break-words">
            &ldquo;{deletingKeyword.keyword}&rdquo;
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Volume: {deletingKeyword.searchVolume.toLocaleString()} • Competition:{" "}
            {deletingKeyword.competition.toLocaleString()}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={closeDeleteConfirm}
            className="px-4 py-2 text-xs md:text-sm font-medium rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirmDelete}
            className="px-4 py-2 text-xs md:text-sm font-semibold rounded-lg text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 shadow-xs shadow-rose-500/20 transition-colors focus:outline-hidden focus:ring-2 focus:ring-rose-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
