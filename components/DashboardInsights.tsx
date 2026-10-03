"use client";

import React from "react";
import {
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Layers,
  Calendar,
  KeyRound,
} from "lucide-react";
import { useKeywords } from "@/hooks/useKeywords";
import { formatNumber } from "@/lib/utils";

export function DashboardInsights() {
  const { stats, setFilterField, openFilterDrawer, setActiveTab } = useKeywords();

  const insights = [
    {
      id: "total",
      label: "Total Keywords",
      value: formatNumber(stats.totalKeywords),
      desc: "In active vault",
      icon: <KeyRound className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
      bg: "bg-blue-500/10 dark:bg-blue-500/15",
      border: "border-blue-500/20",
      onClick: () => setActiveTab("all"),
    },
    {
      id: "excellent-opportunity",
      label: "Excellent Opportunity",
      value: formatNumber(stats.excellentOpportunity),
      desc: "Ratio ≥ 2.0 (High ROI)",
      icon: <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
      border: "border-emerald-500/20",
      onClick: () => setActiveTab("all"),
    },
    {
      id: "high-volume",
      label: "High Search Volume",
      value: formatNumber(stats.highVolume),
      desc: "Volume ≥ 800/mo",
      icon: <TrendingUp className="w-4 h-4 text-teal-600 dark:text-teal-400" />,
      bg: "bg-teal-500/10 dark:bg-teal-500/15",
      border: "border-teal-500/20",
      onClick: () => {
        setFilterField("volumeRange", "1000+");
        setActiveTab("all");
      },
    },
    {
      id: "low-competition",
      label: "Low Competition",
      value: formatNumber(stats.lowCompetition),
      desc: "Under 5,000 listings",
      icon: <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
      bg: "bg-indigo-500/10 dark:bg-indigo-500/15",
      border: "border-indigo-500/20",
      onClick: () => {
        setFilterField("competitionRange", "0-4999");
        setActiveTab("all");
      },
    },
    {
      id: "evergreen",
      label: "Evergreen",
      value: formatNumber(stats.evergreen),
      desc: "Year-round demand",
      icon: <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
      border: "border-emerald-500/20",
      onClick: () => {
        setFilterField("type", "Evergreen");
        setActiveTab("all");
      },
    },
    {
      id: "seasonal",
      label: "Seasonal",
      value: formatNumber(stats.seasonal),
      desc: "Holiday & event spikes",
      icon: <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
      bg: "bg-blue-500/10 dark:bg-blue-500/15",
      border: "border-blue-500/20",
      onClick: () => {
        setFilterField("type", "Seasonal");
        setActiveTab("all");
      },
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Vault Analytics & Opportunity Matrix
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {insights.map((item) => (
          <div
            key={item.id}
            onClick={item.onClick}
            className={`p-3.5 rounded-xl bg-white dark:bg-slate-900 border ${item.border} shadow-xs hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer group`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate">
                {item.label}
              </span>
              <div className={`p-1.5 rounded-lg ${item.bg}`}>
                {item.icon}
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {item.value}
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 truncate">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
