"use client";

import React from "react";
import {
  Sparkles,
  Zap,
  Target,
  Compass,
  Lightbulb,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Box,
  Globe,
  Tag,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";
import { useKeywords } from "@/hooks/useKeywords";

export function EtsyVaultGuide() {
  const { openAddModal, setActiveTab } = useKeywords();

  const strategies = [
    {
      title: "1. High Opportunity Ratio",
      badge: "Formula: Vol ÷ Comp",
      badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      description:
        "Focus on keywords with high search demand (≥ 800/mo) and competition under 5,000 listings. A ratio over 2.0 indicates an untapped, high-conversion niche.",
      icon: <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      highlight: "Aim for Ratio ≥ 2.0",
    },
    {
      title: "2. Digital vs Physical Separation",
      badge: "Product Type",
      badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      description:
        "Etsy algorithms index digital downloads differently from physical goods. Tag your printable planners, SVG cut files, and templates with 'Digital' to track specific conversion rates.",
      icon: <Box className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      highlight: "⚡ Digital vs 📦 Physical",
    },
    {
      title: "3. 13 Tags Multi-Word Strategy",
      badge: "Etsy SEO Core",
      badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
      description:
        "Always use all 13 tags on every listing. Use 2-3 word long-tail phrases instead of single broad keywords like 'mug' or 'planner' to capture targeted high-intent shoppers.",
      icon: <Tag className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      highlight: "Use All 13 Multi-Word Tags",
    },
    {
      title: "4. Multi-Language International Reach",
      badge: "Global Sales",
      badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      description:
        "Expand into German 🇩🇪, Spanish 🇪🇸, French 🇫🇷, and Italian 🇮🇹 markets by drafting localized keywords. European buyers frequently search in their native languages with lower competition.",
      icon: <Globe className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      highlight: "🇩🇪 🇪🇸 🇫🇷 🇮🇹 Regional Tags",
    },
  ];

  return (
    <section className="pt-6 space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-500/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Etsy Keyword Vault — Strategy & Optimization Guide
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-0.5">
              Essential Etsy SEO principles, ranking triggers, and keyword optimization tactics.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Banner Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        {/* Background glow effects */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>Master Your Etsy Listing Algorithm</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
            Discover Untapped Keyword Niches &amp; Boost Listing Visibility
          </h3>

          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
            Your Etsy Keyword Vault helps you organize research, compute real-time Opportunity Ratios, and separate Digital products from Physical listings. Save high-potential search terms to rank on Page 1.
          </p>

          <div className="flex items-center gap-3 pt-2 flex-wrap">
            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 active:bg-slate-200 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 text-blue-600" />
              Add New Keyword
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("checking-keywords")}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-white/15 hover:bg-white/20 active:bg-white/25 rounded-xl border border-white/20 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              Open Checking Scratchpad
            </button>
          </div>
        </div>
      </div>

      {/* 4 Strategy Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {strategies.map((strat, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-3 group hover:border-blue-500/30"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700/60 group-hover:scale-105 transition-transform">
                  {strat.icon}
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${strat.badgeColor}`}>
                  {strat.badge}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {strat.title}
              </h4>

              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                {strat.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-zinc-300">
              <span className="text-[11px] text-blue-600 dark:text-blue-400">
                {strat.highlight}
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
