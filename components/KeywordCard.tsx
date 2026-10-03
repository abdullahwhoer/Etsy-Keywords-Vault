"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Star,
  Edit2,
  Trash2,
  Copy,
  Check,
  FileText,
  AlertTriangle,
  Sparkles,
  Layers,
  FolderKanban,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  Box,
  Globe,
  Tag,
  ExternalLink,
} from "lucide-react";
import { Keyword } from "@/types/keyword";
import { useKeywords } from "@/hooks/useKeywords";
import { formatNumber, cn } from "@/lib/utils";
import {
  getSearchVolumeLevel,
  getCompetitionLevel,
  calculateOpportunity,
  PRIORITY_CONFIG,
  KEYWORD_TYPE_CONFIG,
  PRODUCT_TYPE_CONFIG,
  LANGUAGE_CONFIG,
} from "@/config/thresholds";
import { Tooltip } from "@/components/ui/Tooltip";
import { OpportunityBadge } from "@/components/OpportunityBadge";

interface KeywordCardProps {
  keyword: Keyword;
}

export function KeywordCard({ keyword }: KeywordCardProps) {
  const {
    handleToggleFavorite,
    openEditModal,
    openDeleteConfirm,
    openDetailDrawer,
    selectedKeywordIds,
    toggleSelectKeyword,
    collections,
    isProMode,
  } = useKeywords();

  const [copied, setCopied] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Long press timer ref for selection
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPressTriggeredRef = useRef(false);

  const isSelected = selectedKeywordIds.has(keyword.id);
  const isSelectionMode = selectedKeywordIds.size > 0;

  const volLevel = getSearchVolumeLevel(keyword.searchVolume);
  const compLevel = getCompetitionLevel(keyword.competition);
  const opp = calculateOpportunity(keyword.searchVolume, keyword.competition);
  const priorityInfo = PRIORITY_CONFIG[keyword.priority] || PRIORITY_CONFIG.Normal;
  const typeInfo = KEYWORD_TYPE_CONFIG[keyword.type] || KEYWORD_TYPE_CONFIG.Evergreen;
  const productType = keyword.productType || "Digital";
  const productTypeInfo = PRODUCT_TYPE_CONFIG[productType];
  const lang = keyword.language || "English";
  const langInfo = LANGUAGE_CONFIG[lang];

  const collectionName = keyword.collectionId
    ? collections.find((c) => c.id === keyword.collectionId)?.name || keyword.collectionId
    : null;

  // Close 3-dots menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  // Copy to clipboard
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(keyword.keyword);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // Long press selection handlers
  const startLongPress = () => {
    isLongPressTriggeredRef.current = false;
    longPressTimerRef.current = setTimeout(() => {
      isLongPressTriggeredRef.current = true;
      toggleSelectKeyword(keyword.id);
      if (navigator.vibrate) navigator.vibrate(40);
    }, 700); // 700ms long press
  };

  const cancelLongPress = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handleCardClick = () => {
    if (isLongPressTriggeredRef.current) {
      isLongPressTriggeredRef.current = false;
      return;
    }
    if (isSelectionMode) {
      toggleSelectKeyword(keyword.id);
    } else {
      setIsExpanded((prev) => !prev);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseDown={startLongPress}
      onMouseUp={cancelLongPress}
      onMouseLeave={cancelLongPress}
      onTouchStart={startLongPress}
      onTouchEnd={cancelLongPress}
      onTouchMove={cancelLongPress}
      className={cn(
        "relative p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 select-none cursor-pointer",
        isSelected
          ? "bg-blue-50/90 dark:bg-blue-950/40 border-blue-500 dark:border-blue-500 ring-2 ring-blue-500/20 shadow-xs"
          : "bg-white dark:bg-zinc-900 border-slate-200/90 dark:border-zinc-800 hover:border-blue-500/40 shadow-2xs"
      )}
    >
      {/* Top Header: Selection Indicator + Keyword Title + Copy Icon + 3-Dots Menu */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          {/* Active Selection Check Badge */}
          {isSelected && (
            <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs animate-in zoom-in-75 mt-0.5">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">


              {/* Keyword Title */}
              <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-snug break-words">
                {keyword.keyword}
              </span>
            </div>

            {/* Quick Collection Tag if assigned */}
            {collectionName && !isExpanded && (
              <div className="flex items-center gap-1 text-[10px] font-medium text-blue-600 dark:text-blue-400 mt-1 truncate">
                <FolderKanban className="w-3 h-3 shrink-0" />
                <span className="truncate">{collectionName}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Action Icons: Copy + 3-Dots Menu */}
        <div
          className="flex items-center gap-1 shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            title={copied ? "Copied!" : "Copy Keyword"}
            aria-label="Copy keyword"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>

          {/* 3-Dots More Options Menu */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="More keyword options"
              className={cn(
                "p-1.5 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors",
                isMenuOpen && "bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-white"
              )}
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {/* Dropdown Popover */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-44 origin-top-right rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-1.5 shadow-xl ring-1 ring-black/5 dark:ring-white/10 z-50 animate-in fade-in zoom-in-95 duration-100">
                {/* 1. Star / Favorite */}
                <button
                  type="button"
                  onClick={() => {
                    handleToggleFavorite(keyword.id);
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <Star
                    className={cn(
                      "w-4 h-4",
                      keyword.favorite
                        ? "text-amber-500 fill-amber-500"
                        : "text-slate-400"
                    )}
                  />
                  <span>{keyword.favorite ? "Unfavorite" : "Star as Favorite"}</span>
                </button>

                {/* 2. Edit Keyword */}
                <button
                  type="button"
                  onClick={() => {
                    openEditModal(keyword);
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <Edit2 className="w-4 h-4 text-blue-500" />
                  <span>Edit Keyword</span>
                </button>

                {/* 3. Delete Keyword */}
                <button
                  type="button"
                  onClick={() => {
                    openDeleteConfirm(keyword);
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Keyword</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2 Main Metrics Row: Volume & Competition */}
      <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-slate-100 dark:border-zinc-800/80">
        {/* Search Volume */}
        <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800">
          <div className="text-[10px] font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
            Search Volume
          </div>
          <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">
            {formatNumber(keyword.searchVolume)}
            <span className="text-[10px] font-normal text-slate-500 dark:text-zinc-400 ml-1">
              /mo
            </span>
          </div>
          <div className={cn("text-[10px] font-semibold mt-0.5 truncate", volLevel.textClass)}>
            {volLevel.label.replace(" Volume", "")}
          </div>
        </div>

        {/* Competition */}
        <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800">
          <div className="text-[10px] font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
            Competition
          </div>
          <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">
            {formatNumber(keyword.competition)}
          </div>
          <div className={cn("text-[10px] font-semibold mt-0.5 truncate", compLevel.textClass)}>
            {compLevel.label.replace(" Competition", "")}
          </div>
        </div>
      </div>

      {/* Compact Opportunity Pill in Collapsed View (Zero overflow) */}
      {!isExpanded && (
        <div className="flex items-center justify-between gap-2 pt-2 text-xs">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400 shrink-0">
              Opportunity:
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border truncate",
                opp.badgeClass
              )}
            >
              <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", opp.dotClass)} />
              <span>{opp.formattedRatio}</span>
              <span className="font-normal opacity-90 truncate">({opp.label})</span>
            </span>
          </div>

          {/* Long press hint if not selected */}
          {!isSelected && !isSelectionMode && (
            <span className="text-[9px] text-slate-400 dark:text-zinc-500 hidden xs:inline">
              Hold to select
            </span>
          )}
        </div>
      )}

      {/* EXPANDED SECTION (Shown when V / Chevron is clicked) */}
      {isExpanded && (
        <div
          className="pt-3 mt-2 border-t border-slate-100 dark:border-zinc-800 space-y-3 animate-in fade-in slide-in-from-top-1 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Full Opportunity Matrix & Score Bar */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/80 dark:border-zinc-700/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 dark:text-zinc-300">
                Opportunity Score Matrix
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border",
                  opp.badgeClass
                )}
              >
                <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", opp.dotClass)} />
                <span>{opp.formattedRatio} Ratio ({opp.label})</span>
              </span>
            </div>

            {/* Score Progress Bar */}
            <div className="w-full bg-slate-200 dark:bg-zinc-700 rounded-full h-2 overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-300",
                  opp.label === "Excellent" && "bg-emerald-500",
                  opp.label === "Fair" && "bg-amber-500",
                  opp.label === "Normal" && "bg-slate-400"
                )}
                style={{ width: `${opp.score}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-500 dark:text-zinc-400">
              {opp.label === "Excellent"
                ? "🔥 High search demand with manageable competition. Strong opportunity to rank."
                : opp.label === "Fair"
                ? "⚡ Moderate demand and competition. Good supplementary keyword opportunity."
                : "⚠️ Competitive or low-volume niche. Focus on long-tail variations."}
            </p>
          </div>

          {/* Pro Mode Attributes Grid */}
          {isProMode && (
            <div className="grid grid-cols-2 gap-2 text-xs">
              {/* Product Type */}
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-100 dark:border-zinc-800">
                <div className="text-[9px] font-semibold text-slate-400 uppercase">
                  Product Type
                </div>
                <div className="mt-1">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border",
                      productTypeInfo.badgeClass
                    )}
                  >
                    <span>{productTypeInfo.icon}</span>
                    <span>{productTypeInfo.label}</span>
                  </span>
                </div>
              </div>

              {/* Classification */}
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-100 dark:border-zinc-800">
                <div className="text-[9px] font-semibold text-slate-400 uppercase">
                  Classification
                </div>
                <div className="mt-1">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border",
                      typeInfo.badgeClass
                    )}
                  >
                    {keyword.type === "Copyright" ? (
                      <AlertTriangle className="w-3 h-3 text-purple-600" />
                    ) : keyword.type === "Seasonal" ? (
                      <Sparkles className="w-3 h-3 text-blue-500" />
                    ) : (
                      <Layers className="w-3 h-3 text-emerald-500" />
                    )}
                    <span>{typeInfo.label}</span>
                  </span>
                </div>
              </div>

              {/* Priority */}
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-100 dark:border-zinc-800">
                <div className="text-[9px] font-semibold text-slate-400 uppercase">
                  Priority
                </div>
                <div className="mt-1">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border",
                      priorityInfo.badgeClass
                    )}
                  >
                    <span className={cn("w-1.5 h-1.5 rounded-full", priorityInfo.dotClass)} />
                    <span>{priorityInfo.label}</span>
                  </span>
                </div>
              </div>

              {/* Language */}
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-100 dark:border-zinc-800">
                <div className="text-[9px] font-semibold text-slate-400 uppercase">
                  Language
                </div>
                <div className="mt-1">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-700 dark:text-zinc-200">
                    <span>{langInfo?.flag || "🇬🇧"}</span>
                    <span>{lang}</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Folder / Collection info */}
          {collectionName && (
            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-zinc-300 p-2 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
              <FolderKanban className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>Collection: <strong>{collectionName}</strong></span>
            </div>
          )}

          {/* Strategy Notes */}
          {keyword.notes && (
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-100 dark:border-zinc-800 text-xs">
              <div className="text-[10px] font-semibold text-slate-400 uppercase mb-1 flex items-center gap-1">
                <FileText className="w-3 h-3 text-slate-400" />
                <span>Notes & Strategy</span>
              </div>
              <p className="text-slate-700 dark:text-zinc-300 leading-relaxed">
                {keyword.notes}
              </p>
            </div>
          )}

          {/* Button to open full detail drawer */}
          <button
            type="button"
            onClick={() => openDetailDrawer(keyword)}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-950/70 border border-blue-200/60 dark:border-blue-900/50 transition-colors"
          >
            <span>Open Full Drawer</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Expand / Collapse Toggle Bar (The "V" Icon) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded((prev) => !prev);
        }}
        aria-label={isExpanded ? "Collapse card details" : "Expand card details"}
        className="w-full flex items-center justify-center gap-1 pt-2 mt-1 text-[11px] font-semibold text-slate-400 dark:text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
      >
        <span>{isExpanded ? "Hide Details" : "View Details & Matrix"}</span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-200",
            isExpanded && "rotate-180 text-blue-600 dark:text-blue-400"
          )}
        />
      </button>
    </div>
  );
}
