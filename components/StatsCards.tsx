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
      subtext: "Saved in your vault",
      icon: <KeyRound className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      iconBg: "bg-blue-500/10 dark:bg-blue-500/15",
      borderColor: "hover:border-blue-500/30",
      onClick: () => setActiveTab("all"),
    },
    {
      id: "favorites",
      label: "Favorites",
      value: formatNumber(stats.favorites),
      subtext: "Starred for quick access",
      icon: <Star className="w-5 h-5 text-amber-600 dark:text-amber-400 fill-amber-500/20" />,
      iconBg: "bg-amber-500/10 dark:bg-amber-500/15",
      borderColor: "hover:border-amber-500/30",
      onClick: () => setActiveTab("favorites"),
    },
    {
      id: "high-volume",
      label: "High Volume",
      value: formatNumber(stats.highVolume),
      subtext: "Search volume ≥ 800/mo",
      icon: <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      iconBg: "bg-emerald-500/10 dark:bg-emerald-500/15",
      borderColor: "hover:border-emerald-500/30",
      onClick: () => setActiveTab("all"),
    },
    {
      id: "low-competition",
      label: "Low Competition",
      value: formatNumber(stats.lowCompetition),
      subtext: "Competition < 5,000 listings",
      icon: <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      iconBg: "bg-indigo-500/10 dark:bg-indigo-500/15",
      borderColor: "hover:border-indigo-500/30",
      onClick: () => setActiveTab("all"),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.id}
          onClick={card.onClick}
          className={`p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer ${card.borderColor} group`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {card.label}
            </span>
            <div className={`p-2 rounded-lg ${card.iconBg} transition-transform group-hover:scale-105`}>
              {card.icon}
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {card.value}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {card.subtext}
          </p>
        </div>
      ))}
    </div>
  );
}
