"use client";

import React from "react";
import { Plus, ArrowRight, Sparkles, SlidersHorizontal } from "lucide-react";
import { useKeywords } from "@/hooks/useKeywords";
import { StatsCards } from "@/components/StatsCards";
import { KeywordTable } from "@/components/KeywordTable";
import { KeywordCard } from "@/components/KeywordCard";
import { EmptyState } from "@/components/EmptyState";
import { FilterChips } from "@/components/FilterChips";
import { SortDropdown } from "@/components/SortDropdown";
import { ProductTypeToggle } from "@/components/ProductTypeToggle";
import { EtsyVaultGuide } from "@/components/EtsyVaultGuide";
import { ModeToggle } from "@/components/ModeToggle";

export function DashboardView() {
  const {
    keywords,
    filteredKeywords,
    searchQuery,
    openAddModal,
    setActiveTab,
    isLoaded,
    openFilterDrawer,
    activeFilterCount,
    isProMode,
  } = useKeywords();

  if (!isLoaded) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 bg-slate-200 dark:bg-zinc-800 rounded-lg w-1/3" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-slate-200 dark:bg-zinc-800 rounded-xl" />
          ))}
        </div>
        <div className="h-64 bg-slate-200 dark:bg-zinc-800 rounded-xl" />
      </div>
    );
  }

  const isVaultEmpty = keywords.length === 0;
  const isSearchEmpty =
    filteredKeywords.length === 0 && (searchQuery.trim() !== "" || activeFilterCount > 0);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              My Keyword Vault
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              <Sparkles className="w-3 h-3" /> Live Vault
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
            Organize, filter, and prioritize your Etsy keyword opportunities.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <ModeToggle />
          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs shadow-blue-500/20 hover:shadow-md transition-all self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Keyword
          </button>
        </div>
      </div>

      {/* Dynamic Statistics Cards */}
      <StatsCards />

      {/* Keywords Catalog & Controls Section */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {searchQuery.trim() || activeFilterCount > 0
                ? "Filtered Opportunities"
                : "Recent Keywords"}
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
              {filteredKeywords.length}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Quick Product Type Toggle Switch (All | Digital | Physical) in Pro Mode */}
            {isProMode && <ProductTypeToggle />}

            {/* Filter Drawer Trigger Button */}
            <button
              type="button"
              onClick={openFilterDrawer}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-colors shadow-xs ${
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
            <SortDropdown />

            {!isVaultEmpty && !searchQuery && activeFilterCount === 0 && (
              <button
                onClick={() => setActiveTab("all")}
                className="hidden md:inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline ml-2"
              >
                View All
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Chips */}
        <FilterChips />

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
            <div className="md:hidden space-y-3">
              {filteredKeywords.map((kw) => (
                <KeywordCard key={kw.id} keyword={kw} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Etsy Vault Intro & Strategy Guide Section at Bottom */}
      <EtsyVaultGuide />
    </div>
  );
}
