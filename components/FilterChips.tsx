"use client";

import React from "react";
import { X, RotateCcw } from "lucide-react";
import { useKeywords } from "@/hooks/useKeywords";
import { LANGUAGE_CONFIG } from "@/config/thresholds";

export function FilterChips() {
  const { filters, setFilterField, resetFilters, activeFilterCount, collections } = useKeywords();

  if (activeFilterCount === 0) return null;

  const collectionName =
    filters.collection !== "all"
      ? collections.find((c) => c.id === filters.collection)?.name || filters.collection
      : "";

  return (
    <div className="flex items-center gap-2 flex-wrap pt-1 pb-2">
      <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[10px]">
        Active Filters:
      </span>

      {/* Product Type Filter Chip (Digital / Physical) */}
      {filters.productType !== "all" && (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
          <span>Type: {filters.productType}</span>
          <button
            type="button"
            onClick={() => setFilterField("productType", "all")}
            aria-label="Remove product type filter"
            className="p-0.5 rounded-full hover:bg-blue-200/50 dark:hover:bg-blue-800/50"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {/* Language Filter Chip */}
      {filters.language !== "all" && (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
          <span>
            {LANGUAGE_CONFIG[filters.language]?.flag} Language: {filters.language}
          </span>
          <button
            type="button"
            onClick={() => setFilterField("language", "all")}
            aria-label="Remove language filter"
            className="p-0.5 rounded-full hover:bg-indigo-200/50 dark:hover:bg-indigo-800/50"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {/* Volume Filter Chip */}
      {filters.volumeRange !== "all" && (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          <span>Volume: {filters.volumeRange}</span>
          <button
            type="button"
            onClick={() => setFilterField("volumeRange", "all")}
            aria-label="Remove volume filter"
            className="p-0.5 rounded-full hover:bg-emerald-200/50 dark:hover:bg-emerald-800/50"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {/* Competition Filter Chip */}
      {filters.competitionRange !== "all" && (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
          <span>
            Competition:{" "}
            {filters.competitionRange === "0-4999"
              ? "< 5K (Low)"
              : filters.competitionRange === "5000-8000"
              ? "5K–8K (Moderate)"
              : "> 8K (High)"}
          </span>
          <button
            type="button"
            onClick={() => setFilterField("competitionRange", "all")}
            aria-label="Remove competition filter"
            className="p-0.5 rounded-full hover:bg-amber-200/50 dark:hover:bg-amber-800/50"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {/* Priority Filter Chip */}
      {filters.priority !== "all" && (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
          <span>Priority: {filters.priority}</span>
          <button
            type="button"
            onClick={() => setFilterField("priority", "all")}
            aria-label="Remove priority filter"
            className="p-0.5 rounded-full hover:bg-purple-200/50 dark:hover:bg-purple-800/50"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {/* Type Filter Chip */}
      {filters.type !== "all" && (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
          <span>Niche: {filters.type}</span>
          <button
            type="button"
            onClick={() => setFilterField("type", "all")}
            aria-label="Remove type filter"
            className="p-0.5 rounded-full hover:bg-cyan-200/50 dark:hover:bg-cyan-800/50"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {/* Favorites Filter Chip */}
      {filters.favoritesOnly && (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
          <span>Favorites Only</span>
          <button
            type="button"
            onClick={() => setFilterField("favoritesOnly", false)}
            aria-label="Remove favorites filter"
            className="p-0.5 rounded-full hover:bg-amber-200/50 dark:hover:bg-amber-800/50"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {/* Collection Filter Chip */}
      {filters.collection !== "all" && (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700">
          <span>Collection: {collectionName}</span>
          <button
            type="button"
            onClick={() => setFilterField("collection", "all")}
            aria-label="Remove collection filter"
            className="p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {/* Clear All Button */}
      <button
        type="button"
        onClick={resetFilters}
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
      >
        <RotateCcw className="w-3 h-3" />
        Clear All
      </button>
    </div>
  );
}
