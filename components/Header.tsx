"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Settings,
  Menu,
  X,
  Vault,
  Sparkles,
  Command,
} from "lucide-react";
import { useKeywords } from "@/hooks/useKeywords";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  onOpenMobileSidebar: () => void;
}

export function Header({ onOpenMobileSidebar }: HeaderProps) {
  const { searchQuery, setSearchQuery, openAddModal, setActiveTab } = useKeywords();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-black/90 backdrop-blur-md transition-colors">
      <div className="flex items-center justify-between h-14 sm:h-16 px-3 sm:px-6 md:px-8">
        {/* Left: Mobile Menu + Mobile Brand / Desktop Search */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          {/* Mobile Sidebar Hamburger */}
          <button
            type="button"
            onClick={onOpenMobileSidebar}
            aria-label="Open sidebar navigation"
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Mobile Brand Logo & Name (visible on mobile only) */}
          <div className="flex items-center gap-2 md:hidden min-w-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-xs shrink-0">
              <Vault className="w-4 h-4" />
            </div>
            <div className="truncate">
              <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white block truncate leading-tight">
                Etsy Vault
              </span>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5" /> Research
              </span>
            </div>
          </div>

          {/* Desktop Global Search Bar */}
          <div className="hidden md:block relative w-full max-w-md lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 dark:text-zinc-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search keyword ideas, tags, notes..."
              className="w-full pl-9 pr-8 py-2 text-sm bg-slate-100/70 dark:bg-zinc-900/90 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 border border-slate-200/80 dark:border-zinc-800 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search query"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            ) : null}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 ml-2">
          {/* Mobile Search Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileSearchOpen((prev) => !prev)}
            aria-label="Toggle mobile search"
            className={`md:hidden p-2 rounded-xl transition-colors ${
              isMobileSearchOpen || searchQuery
                ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400"
                : "text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Theme Mode Toggle */}
          <ThemeToggle />

          {/* Desktop Add Keyword Button */}
          <button
            type="button"
            onClick={openAddModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs md:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs shadow-blue-500/20 hover:shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Keyword</span>
          </button>

          {/* Settings Button */}
          <button
            type="button"
            onClick={() => setActiveTab("settings")}
            aria-label="Vault Settings"
            className="p-2 rounded-xl text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Expandable Search Bar Drawer */}
      {isMobileSearchOpen && (
        <div className="md:hidden px-3 py-2.5 border-t border-slate-200/80 dark:border-zinc-800 bg-slate-50/90 dark:bg-zinc-900/90 animate-in slide-in-from-top-2 duration-150">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search keywords, volume, tags..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-white dark:bg-zinc-800 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-200 dark:border-zinc-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/40"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
