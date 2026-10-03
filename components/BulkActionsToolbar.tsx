"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Trash2,
  FolderKanban,
  Star,
  StarOff,
  Download,
  CheckCircle2,
  FileSpreadsheet,
  FileCode,
  Tag,
  Box,
  Globe,
} from "lucide-react";
import { useKeywords } from "@/hooks/useKeywords";

export function BulkActionsToolbar() {
  const {
    selectedKeywordIds,
    deselectAllKeywords,
    openBulkActionModal,
    handleExportSelectedCsv,
    handleExportSelectedJson,
  } = useKeywords();

  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) {
        setIsExportMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (selectedKeywordIds.size === 0) return null;

  const count = selectedKeywordIds.size;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-4xl animate-in slide-in-from-bottom-8 fade-in duration-200">
      <div className="flex items-center justify-between gap-2 p-2.5 sm:p-3 rounded-2xl bg-slate-900/95 dark:bg-slate-800/95 text-white shadow-2xl border border-slate-700/80 backdrop-blur-md">
        {/* Left: Selection Counter & Clear */}
        <div className="flex items-center gap-2 pl-2">
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
            {count}
          </span>
          <span className="text-xs sm:text-sm font-semibold tracking-tight hidden sm:inline">
            {count === 1 ? "1 keyword selected" : `${count} keywords selected`}
          </span>
          <button
            type="button"
            onClick={deselectAllKeywords}
            title="Deselect all"
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Actions Button Group */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
          {/* Add/Move to Collection */}
          <button
            type="button"
            onClick={() => openBulkActionModal("collection")}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <FolderKanban className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden md:inline">Collection</span>
          </button>

          {/* Change Product Type (Digital / Physical) */}
          <button
            type="button"
            onClick={() => openBulkActionModal("productType")}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <Box className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Product Type</span>
          </button>

          {/* Change Language */}
          <button
            type="button"
            onClick={() => openBulkActionModal("language")}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden md:inline">Language</span>
          </button>

          {/* Change Priority */}
          <button
            type="button"
            onClick={() => openBulkActionModal("priority")}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <Tag className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Priority</span>
          </button>

          {/* Change Niche Type */}
          <button
            type="button"
            onClick={() => openBulkActionModal("type")}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <span className="text-purple-400 text-xs font-bold">#</span>
            <span className="hidden md:inline">Niche</span>
          </button>

          {/* Add to Favorites */}
          <button
            type="button"
            onClick={() => openBulkActionModal("favorite-add")}
            title="Add selected to favorites"
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          </button>

          {/* Export Dropdown */}
          <div className="relative" ref={exportRef}>
            <button
              type="button"
              onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Export</span>
            </button>

            {isExportMenuOpen && (
              <div className="absolute right-0 bottom-full mb-2 w-48 rounded-xl bg-slate-900 border border-slate-700 p-1.5 shadow-2xl text-slate-200 z-50">
                <button
                  type="button"
                  onClick={() => {
                    handleExportSelectedCsv();
                    setIsExportMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg hover:bg-slate-800 text-left"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  Export Selected as CSV
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleExportSelectedJson();
                    setIsExportMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg hover:bg-slate-800 text-left"
                >
                  <FileCode className="w-4 h-4 text-blue-400" />
                  Export Selected as JSON
                </button>
              </div>
            )}
          </div>

          <div className="h-4 w-px bg-slate-700 mx-0.5" />

          {/* Delete Button */}
          <button
            type="button"
            onClick={() => openBulkActionModal("delete")}
            title="Delete selected"
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-semibold bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline ml-1">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
