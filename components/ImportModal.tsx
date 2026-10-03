"use client";

import React, { useEffect } from "react";
import {
  X,
  Upload,
  FileSpreadsheet,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  FolderKanban,
  Copy,
} from "lucide-react";
import { useKeywords } from "@/hooks/useKeywords";
import { formatNumber } from "@/lib/utils";

export function ImportModal() {
  const {
    importPreviewData,
    closeImportModal,
    handleConfirmImport,
  } = useKeywords();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && importPreviewData) {
        closeImportModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [importPreviewData, closeImportModal]);

  if (!importPreviewData) return null;

  const {
    sourceType,
    filename,
    totalRows,
    validKeywords,
    invalidRowsCount,
    duplicateKeywords,
    collectionsFound,
  } = importPreviewData;

  const validCount = validKeywords.length;
  const dupCount = duplicateKeywords.length;
  const colCount = collectionsFound.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-xs">
      <div
        className="relative w-full max-w-lg my-auto sm:my-8 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl p-6 transition-all animate-in fade-in zoom-in-95"
        role="dialog"
        aria-modal="true"
        aria-labelledby="import-preview-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
              {sourceType === "csv" ? (
                <FileSpreadsheet className="w-5 h-5" />
              ) : (
                <FileCode className="w-5 h-5" />
              )}
            </div>
            <div>
              <h2
                id="import-preview-title"
                className="text-base font-bold text-slate-900 dark:text-white"
              >
                Import Preview
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-xs">
                {filename}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeImportModal}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Preview Summary Grid */}
        <div className="py-4 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* Valid */}
            <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 text-center">
              <span className="text-[10px] font-semibold uppercase text-emerald-600 dark:text-emerald-400">
                New Valid
              </span>
              <div className="text-lg font-bold text-emerald-700 dark:text-emerald-300 mt-0.5">
                {validCount}
              </div>
            </div>

            {/* Duplicates */}
            <div className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 text-center">
              <span className="text-[10px] font-semibold uppercase text-amber-600 dark:text-amber-400">
                Duplicates
              </span>
              <div className="text-lg font-bold text-amber-700 dark:text-amber-300 mt-0.5">
                {dupCount}
              </div>
            </div>

            {/* Collections */}
            <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-800/40 text-center">
              <span className="text-[10px] font-semibold uppercase text-blue-600 dark:text-blue-400">
                Collections
              </span>
              <div className="text-lg font-bold text-blue-700 dark:text-blue-300 mt-0.5">
                {colCount}
              </div>
            </div>

            {/* Invalid */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-center">
              <span className="text-[10px] font-semibold uppercase text-slate-400">
                Invalid
              </span>
              <div className="text-lg font-bold text-slate-700 dark:text-slate-300 mt-0.5">
                {invalidRowsCount}
              </div>
            </div>
          </div>

          {/* Sample preview keywords list */}
          {validCount > 0 && (
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                Preview Keywords (First few):
              </span>
              <div className="max-h-32 overflow-y-auto space-y-1 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-xs">
                {validKeywords.slice(0, 5).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-slate-700 dark:text-slate-300"
                  >
                    <span className="font-medium truncate">{item.keyword}</span>
                    <span className="text-[11px] text-slate-400 shrink-0 ml-2">
                      Vol: {formatNumber(item.searchVolume)} • Comp:{" "}
                      {formatNumber(item.competition)}
                    </span>
                  </div>
                ))}
                {validCount > 5 && (
                  <div className="text-[10px] text-slate-400 italic pt-1">
                    ...and {validCount - 5} more keywords
                  </div>
                )}
              </div>
            </div>
          )}

          {dupCount > 0 && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                {dupCount} keywords in this file already match existing entries in your vault.
                Choose whether to skip or import duplicates.
              </span>
            </div>
          )}

          {validCount === 0 && dupCount === 0 && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300">
              No valid keywords were found in this file. Please ensure the CSV has column headers or the JSON structure matches the backup format.
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={closeImportModal}
            className="w-full sm:w-auto px-4 py-2 text-xs font-medium rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Cancel
          </button>

          {validCount + dupCount > 0 && (
            <>
              {dupCount > 0 && (
                <button
                  type="button"
                  onClick={() => handleConfirmImport(false)}
                  className="w-full sm:w-auto px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-xs"
                >
                  Skip Duplicates ({validCount} items)
                </button>
              )}

              <button
                type="button"
                onClick={() => handleConfirmImport(true)}
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-xs shadow-blue-500/20 transition-all"
              >
                {dupCount > 0
                  ? `Import All (${validCount + dupCount} items)`
                  : `Import ${validCount} Keywords`}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
