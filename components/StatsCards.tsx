"use client";

import React from "react";
import {
  KeyRound,
  Star,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { useKeywords } from "@/hooks/useKeywords";
import { formatNumber } from "@/lib/utils";

export function StatsCards() {
  const { stats, setActiveTab } = useKeywords();

  const cards = [
    {
      id: "total",
      label: "Total Keywords",
      value: formatNumber(stats.totalKeywords),
      subtext: "Saved in vault",
      icon: <KeyRound className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />,
      iconBg: "bg-blue-500/10 dark:bg-blue-500/15",
      borderColor: "hover:border-blue-500/40 active:border-blue-500",
      onClick: () => setActiveTab("all"),
    },
    {
      id: "favorites",
      label: "Favorites",
      value: formatNumber(stats.favorites),
      subtext: "Starred opportunities",
      icon: <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 fill-amber-500/20" />,
      iconBg: "bg-amber-500/10 dark:bg-amber-500/15",
      borderColor: "hover:border-amber-500/40 active:border-amber-500",
      onClick: () => setActiveTab("favorites"),
    },
    {
      id: "high-volume",
      label: "High Volume",
      value: formatNumber(stats.highVolume),
      subtext: "Volume ≥ 800/mo",
      icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />,
      iconBg: "bg-emerald-500/10 dark:bg-emerald-500/15",
      borderColor: "hover:border-emerald-500/40 active:border-emerald-500",
      onClick: () => setActiveTab("all"),
    },
    {
      id: "low-competition",
      label: "Low Comp",
      mobileLabel: "Low Comp",
      fullLabel: "Low Competition",
      value: formatNumber(stats.lowCompetition),
      subtext: "< 5,000 listings",
      icon: <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />,
      iconBg: "bg-indigo-500/10 dark:bg-indigo-500/15",
      borderColor: "hover:border-indigo-500/40 active:border-indigo-500",
      onClick: () => setActiveTab("all"),
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
      {cards.map((card) => (
        <div
          key={card.id}
          onClick={card.onClick}
          className={`p-3.5 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-2xs hover:shadow-md active:scale-[0.98] transition-all duration-200 cursor-pointer ${card.borderColor} group flex flex-col justify-between`}
        >
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 truncate">
              <span className="sm:hidden">{card.mobileLabel || card.label}</span>
              <span className="hidden sm:inline">{card.fullLabel || card.label}</span>
            </span>
            <div className={`p-1.5 sm:p-2 rounded-xl ${card.iconBg} shrink-0 transition-transform group-hover:scale-105`}>
              {card.icon}
            </div>
          </div>

          <div className="mt-0.5 sm:mt-1">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {card.value}
            </div>
            <p className="mt-0.5 text-[10px] sm:text-xs text-slate-500 dark:text-zinc-400 truncate">
              {card.subtext}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
