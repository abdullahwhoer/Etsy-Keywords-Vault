"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowUpDown, Check, ChevronDown } from "lucide-react";
import { useKeywords } from "@/hooks/useKeywords";
import { SortOption } from "@/types/keyword";
import { cn } from "@/lib/utils";

export function SortDropdown() {
  const { sortOption, setSortOption } = useKeywords();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options: { value: SortOption; label: string }[] = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "alpha-asc", label: "Keyword A–Z" },
    { value: "alpha-desc", label: "Keyword Z–A" },
    { value: "volume-desc", label: "Search Volume High → Low" },
    { value: "volume-asc", label: "Search Volume Low → High" },
    { value: "competition-desc", label: "Competition High → Low" },
    { value: "competition-asc", label: "Competition Low → High" },
    { value: "opportunity-desc", label: "Opportunity High → Low" },
  ];

  const currentLabel =
    options.find((opt) => opt.value === sortOption)?.label || "Sort By";

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Sort keywords"
        className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 shadow-xs transition-colors"
      >
        <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
        <span className="hidden sm:inline text-slate-500 font-normal">Sort:</span>
        <span className="truncate max-w-[150px]">{currentLabel}</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-xl bg-white dark:bg-slate-900 p-1.5 shadow-xl ring-1 ring-black/5 dark:ring-white/10 border border-slate-200 dark:border-slate-800 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2.5 py-1">
            Sort Keywords By
          </div>
          <div className="space-y-0.5 max-h-72 overflow-y-auto">
            {options.map((opt) => {
              const isSelected = sortOption === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setSortOption(opt.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-2.5 py-2 text-xs font-medium rounded-lg transition-colors text-left",
                    isSelected
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 font-semibold"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
