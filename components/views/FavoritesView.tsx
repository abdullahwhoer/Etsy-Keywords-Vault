"use client";

import React from "react";
import { Plus, Star } from "lucide-react";
import { useKeywords } from "@/hooks/useKeywords";
import { KeywordTable } from "@/components/KeywordTable";
import { KeywordCard } from "@/components/KeywordCard";
import { EmptyState } from "@/components/EmptyState";
import { SortDropdown } from "@/components/SortDropdown";
import { FilterChips } from "@/components/FilterChips";
import { ProductTypeToggle } from "@/components/ProductTypeToggle";
import { ModeToggle } from "@/components/ModeToggle";

export function FavoritesView() {
  const {
    filteredKeywords,
    searchQuery,
    openAddModal,
    isLoaded,
    stats,
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

  const hasNoFavorites = stats.favorites === 0;
  const isSearchEmpty = filteredKeywords.length === 0 && searchQuery.trim() !== "";

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Favorite Keywords
            </h1>
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              {stats.favorites}
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
            Your shortlisted high-potential Etsy keywords for upcoming product listings.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <ModeToggle />
          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs shadow-blue-500/20 hover:shadow-md transition-all self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Keyword
          </button>
        </div>
      </div>

      {/* Controls row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
          Shortlisted Opportunities
        </span>

        <div className="flex items-center gap-2 flex-wrap">
          {isProMode && <ProductTypeToggle />}
          <SortDropdown />
        </div>
      </div>

      <FilterChips />

      {/* Content Area */}
      {hasNoFavorites ? (
        <EmptyState type="no-favorites" />
      ) : isSearchEmpty ? (
        <EmptyState type="no-search-results" />
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <KeywordTable keywords={filteredKeywords} />
          </div>

          {/* Mobile Cards View */}
          <div className="md:hidden space-y-3">
            {filteredKeywords.map((kw) => (
              <KeywordCard key={kw.id} keyword={kw} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
