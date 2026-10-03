"use client";

import React from "react";
import { Plus, SlidersHorizontal } from "lucide-react";
import { useKeywords } from "@/hooks/useKeywords";
import { KeywordTable } from "@/components/KeywordTable";
import { KeywordCard } from "@/components/KeywordCard";
import { EmptyState } from "@/components/EmptyState";
import { FilterChips } from "@/components/FilterChips";
import { SortDropdown } from "@/components/SortDropdown";
import { ProductTypeToggle } from "@/components/ProductTypeToggle";
import { ModeToggle } from "@/components/ModeToggle";

export function AllKeywordsView() {
  const {
    keywords,
    filteredKeywords,
    searchQuery,
    openAddModal,
    isLoaded,
    openFilterDrawer,
    activeFilterCount,
    isProMode,
  } = useKeywords();

  if (!isLoaded) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 bg-slate-200 dark:bg-zinc-800 rounded-lg w-1/3" />
        <div className="h-64 bg-slate-200 dark:bg-zinc-800 rounded-xl" />
      </div>
    );
  }

  const isVaultEmpty = keywords.length === 0;
  const isSearchEmpty =
    filteredKeywords.length === 0 && (searchQuery.trim() !== "" || activeFilterCount > 0);

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              All Keywords
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
              {filteredKeywords.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-0.5 sm:mt-1">
            Browse, filter, sort, and inspect all Etsy keywords saved in your local vault.
          </p>
        </div>

        {/* Add Keyword Button & Mode Toggle */}
        <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 sm:gap-2.5">
          <ModeToggle fullWidthOnMobile={true} />
          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs shadow-blue-500/20 hover:shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Keyword</span>
          </button>
        </div>
      </div>

      {/* Table Controls Row */}
      <div className="flex flex-col gap-2.5 sm:gap-3 pt-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
            Vault Catalog
          </span>
          <span className="sm:hidden text-xs text-slate-500 dark:text-zinc-400">
            {filteredKeywords.length} results
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar flex-wrap sm:flex-nowrap">
          {/* Quick Product Type Toggle Switch in Pro Mode */}
          {isProMode && (
            <div className="shrink-0">
              <ProductTypeToggle />
            </div>
          )}

          {/* Filter Drawer Trigger Button */}
          <button
            type="button"
            onClick={openFilterDrawer}
            className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-colors shadow-2xs ${
              activeFilterCount > 0
                ? "bg-blue-50 dark:bg-zinc-800 border-blue-400 text-blue-700 dark:text-blue-300 font-bold"
                : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="shrink-0">
            <SortDropdown />
          </div>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <FilterChips />

      {/* Content Area */}
      {isVaultEmpty ? (
        <EmptyState type="empty-vault" />
      ) : isSearchEmpty ? (
        <EmptyState type="no-search-results" />
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <KeywordTable keywords={filteredKeywords} />
          </div>

          {/* Mobile Cards View */}
          <div className="md:hidden space-y-2.5">
            {filteredKeywords.map((kw) => (
              <KeywordCard key={kw.id} keyword={kw} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
