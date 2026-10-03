"use client";

import React, { useEffect } from "react";
import {
  X,
  SlidersHorizontal,
  Star,
  TrendingUp,
  ShieldCheck,
  FolderKanban,
  Box,
  Globe,
  Tag,
} from "lucide-react";
import { useKeywords } from "@/hooks/useKeywords";
import {
  VolumeFilterOption,
  CompetitionFilterOption,
  PriorityFilterOption,
  KeywordTypeFilterOption,
  ProductTypeFilterOption,
  LanguageFilterOption,
} from "@/types/keyword";
import { cn } from "@/lib/utils";

export function FilterDrawer() {
  const {
    isFilterDrawerOpen,
    closeFilterDrawer,
    filters,
    setFilterField,
    resetFilters,
    activeFilterCount,
    collections,
  } = useKeywords();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFilterDrawerOpen) {
        closeFilterDrawer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFilterDrawerOpen, closeFilterDrawer]);

  if (!isFilterDrawerOpen) return null;

  const volumeOptions: { value: VolumeFilterOption; label: string }[] = [
    { value: "all", label: "All Volumes" },
    { value: "1000+", label: "1000+ (Excellent)" },
    { value: "800-999", label: "800–999 (Strong)" },
    { value: "400-799", label: "400–799 (Moderate)" },
    { value: "0-399", label: "0–399 (Low)" },
  ];

  const competitionOptions: { value: CompetitionFilterOption; label: string }[] = [
    { value: "all", label: "All Competition" },
    { value: "0-4999", label: "< 5,000 (Low)" },
    { value: "5000-8000", label: "5,000–8,000 (Moderate)" },
    { value: "8000+", label: "> 8,000 (High)" },
  ];

  const productTypeOptions: { value: ProductTypeFilterOption; label: string }[] = [
    { value: "all", label: "All Product Types" },
    { value: "Digital", label: "Digital" },
    { value: "Physical", label: "Physical" },
  ];

  const languageOptions: { value: LanguageFilterOption; label: string; flag: string }[] = [
    { value: "all", label: "All Languages", flag: "🌐" },
    { value: "German", label: "German", flag: "🇩🇪" },
    { value: "Spanish", label: "Spanish", flag: "🇪🇸" },
    { value: "Italian", label: "Italian", flag: "🇮🇹" },
    { value: "French", label: "French", flag: "🇫🇷" },
  ];

  const priorityOptions: { value: PriorityFilterOption; label: string }[] = [
    { value: "all", label: "All Priorities" },
    { value: "Normal", label: "Normal" },
    { value: "Fair", label: "Fair" },
    { value: "Excellent", label: "Excellent" },
  ];

  const typeOptions: { value: KeywordTypeFilterOption; label: string }[] = [
    { value: "all", label: "All Classifications" },
    { value: "Evergreen", label: "Evergreen" },
    { value: "Seasonal", label: "Seasonal" },
    { value: "Copyright", label: "Copyright" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={closeFilterDrawer}
      />

      {/* Drawer Panel */}
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col z-10 animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-drawer-title"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="filter-drawer-title"
                className="text-base font-bold text-slate-900 dark:text-white"
              >
                Advanced Filters
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {activeFilterCount > 0
                  ? `${activeFilterCount} active ${activeFilterCount === 1 ? "filter" : "filters"}`
                  : "Filter keywords by multiple criteria"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline px-2 py-1"
              >
                Reset All
              </button>
            )}
            <button
              type="button"
              onClick={closeFilterDrawer}
              aria-label="Close filters"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 p-5 space-y-6 overflow-y-auto">
          {/* Product Type (Digital / Physical) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5 text-blue-500" />
              Product Type
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {productTypeOptions.map((opt) => {
                const isSelected = filters.productType === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFilterField("productType", opt.value)}
                    className={cn(
                      "px-3 py-2 text-xs font-medium rounded-lg border text-center transition-all",
                      isSelected
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-400 font-semibold ring-1 ring-blue-400/30"
                        : "bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Language Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-500" />
              Language
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {languageOptions.map((opt) => {
                const isSelected = filters.language === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFilterField("language", opt.value)}
                    className={cn(
                      "px-3 py-2 text-xs font-medium rounded-lg border text-left flex items-center gap-1.5 transition-all",
                      isSelected
                        ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-400 font-semibold ring-1 ring-indigo-400/30"
                        : "bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    )}
                  >
                    <span>{opt.flag}</span>
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Volume */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
              Search Volume
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {volumeOptions.map((opt) => {
                const isSelected = filters.volumeRange === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFilterField("volumeRange", opt.value)}
                    className={cn(
                      "px-3 py-2 text-xs font-medium rounded-lg border text-left transition-all",
                      isSelected
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-400 font-semibold ring-1 ring-blue-400/30"
                        : "bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Competition */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
              Competition
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {competitionOptions.map((opt) => {
                const isSelected = filters.competitionRange === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFilterField("competitionRange", opt.value)}
                    className={cn(
                      "px-3 py-2 text-xs font-medium rounded-lg border text-left transition-all",
                      isSelected
                        ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-400 font-semibold ring-1 ring-indigo-400/30"
                        : "bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Priority
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {priorityOptions.map((opt) => {
                const isSelected = filters.priority === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFilterField("priority", opt.value)}
                    className={cn(
                      "px-3 py-2 text-xs font-medium rounded-lg border text-left transition-all",
                      isSelected
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-400 font-semibold ring-1 ring-blue-400/30"
                        : "bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Classification */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-blue-500" />
              Niche Classification
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {typeOptions.map((opt) => {
                const isSelected = filters.type === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFilterField("type", opt.value)}
                    className={cn(
                      "px-3 py-2 text-xs font-medium rounded-lg border text-left transition-all",
                      isSelected
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-400 font-semibold ring-1 ring-blue-400/30"
                        : "bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Favorites Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Favorites
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFilterField("favoritesOnly", false)}
                className={cn(
                  "flex-1 px-3 py-2 text-xs font-medium rounded-lg border text-center transition-all",
                  !filters.favoritesOnly
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-400 font-semibold"
                    : "bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800"
                )}
              >
                All Keywords
              </button>
              <button
                type="button"
                onClick={() => setFilterField("favoritesOnly", true)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border text-center transition-all",
                  filters.favoritesOnly
                    ? "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-400 font-semibold ring-1 ring-amber-400/30"
                    : "bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800"
                )}
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                Favorites Only
              </button>
            </div>
          </div>

          {/* Collection Filter */}
          {collections.length > 0 && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FolderKanban className="w-3.5 h-3.5 text-blue-500" />
                Collection
              </label>
              <select
                value={filters.collection}
                onChange={(e) => setFilterField("collection", e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white"
              >
                <option value="all">All Collections</option>
                {collections.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.icon || "📁"} {col.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={resetFilters}
            className="px-4 py-2.5 text-xs font-medium rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            Reset Filters
          </button>
          <button
            type="button"
            onClick={closeFilterDrawer}
            className="px-5 py-2.5 text-xs font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-xs shadow-blue-500/20 transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
