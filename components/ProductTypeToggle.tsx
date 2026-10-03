"use client";

import React from "react";
import { useKeywords } from "@/hooks/useKeywords";
import { ProductTypeFilterOption } from "@/types/keyword";

export function ProductTypeToggle() {
  const { filters, setFilterField } = useKeywords();

  const options: { value: ProductTypeFilterOption; label: string; icon: string }[] = [
    { value: "all", label: "All", icon: "" },
    { value: "Digital", label: "Digital", icon: "⚡" },
    { value: "Physical", label: "Physical", icon: "📦" },
  ];

  return (
    <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
      {options.map((opt) => {
        const isSelected = filters.productType === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setFilterField("productType", opt.value)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              isSelected
                ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs ring-1 ring-black/5 dark:ring-white/10"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            {opt.icon && <span>{opt.icon}</span>}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
