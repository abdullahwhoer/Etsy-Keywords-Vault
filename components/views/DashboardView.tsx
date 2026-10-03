"use client";

import React from "react";
import { Plus, ArrowRight, Sparkles, SlidersHorizontal, ShieldCheck, Zap } from "lucide-react";
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
    stats,
  } = useKeywords();

  if (!isLoaded) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-28 bg-slate-200 dark:bg-zinc-800 rounded-2xl w-full" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-slate-200 dark:bg-zinc-800 rounded-xl" />
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
    <div className="space-y-5 sm:space-y-8">
      {/* Premium SaaS Hero Card - Optimized for Mobile & Desktop */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-zinc-800 bg-gradient-to-br from-white via-slate-50/80 to-blue-50/40 dark:from-zinc-900 dark:via-zinc-900/95 dark:to-blue-950/20 p-4 sm:p-6 shadow-xs">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-4">
          {/* Top Meta Pill Row */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Vault Active • 100% Offline Safe</span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium text-slate-500 dark:text-zinc-400 bg-white/80 dark:bg-zinc-800/80 border border-slate-200/60 dark:border-zinc-700/60">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Etsy Rank & Vault Intelligence</span>
            </div>
          </div>

          {/* Heading & Subtitle */}
          <div>
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              My Keyword Vault
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              Organize, filter, and prioritize your high-conversion Etsy keyword opportunities.
            </p>
          </div>

          {/* Actions & Mode Switcher Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1 border-t border-slate-200/60 dark:border-zinc-800/80">
            {/* Mode Switcher */}
            <div className="w-full sm:w-auto">
              <ModeToggle fullWidthOnMobile={true} />
            </div>

            {/* Add Keyword Button */}
            <button
              type="button"
              onClick={openAddModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 active:scale-[0.98] rounded-xl shadow-xs shadow-blue-500/20 hover:shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 shrink-0" />
              <span>Add Keyword</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Statistics Cards - 2x2 on Mobile */}
      <StatsCards />

      {/* Keywords Catalog & Controls Section */}
      <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
        {/* Header and Control Bar */}
        <div className="flex flex-col gap-2.5 sm:gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {searchQuery.trim() || activeFilterCount > 0
                  ? "Filtered Opportunities"
                  : "Recent Keywords"}
              </h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                {filteredKeywords.length}
              </span>
            </div>

            {!isVaultEmpty && !searchQuery && activeFilterCount === 0 && (
              <button
                onClick={() => setActiveTab("all")}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Action and Filter Controls Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar flex-wrap sm:flex-nowrap">
            {/* Quick Product Type Toggle Switch (All | Digital | Physical) in Pro Mode */}
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

        {/* Filter Chips */}
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

      {/* Etsy Vault Intro & Strategy Guide Section at Bottom */}
      <EtsyVaultGuide />
    </div>
  );
}
