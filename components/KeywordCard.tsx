"use client";

import React, { useState } from "react";
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
  CopyPlus,
  Eye,
  FolderKanban,
  Box,
  Globe,
} from "lucide-react";
import { Keyword } from "@/types/keyword";
import { useKeywords } from "@/hooks/useKeywords";
import { formatNumber } from "@/lib/utils";
import {
  getSearchVolumeLevel,
  getCompetitionLevel,
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
    handleDuplicateKeyword,
    selectedKeywordIds,
    toggleSelectKeyword,
    collections,
    isProMode,
  } = useKeywords();
  const [copied, setCopied] = useState(false);

  const isSelected = selectedKeywordIds.has(keyword.id);
  const volLevel = getSearchVolumeLevel(keyword.searchVolume);
  const compLevel = getCompetitionLevel(keyword.competition);
  const priorityInfo = PRIORITY_CONFIG[keyword.priority] || PRIORITY_CONFIG.Normal;
  const typeInfo = KEYWORD_TYPE_CONFIG[keyword.type] || KEYWORD_TYPE_CONFIG.Evergreen;
  const productType = keyword.productType || "Digital";
  const productTypeInfo = PRODUCT_TYPE_CONFIG[productType];
  const lang = keyword.language || "English";
  const langInfo = LANGUAGE_CONFIG[lang];

  const collectionName = keyword.collectionId
    ? collections.find((c) => c.id === keyword.collectionId)?.name || keyword.collectionId
    : null;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(keyword.keyword);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      onClick={() => openDetailDrawer(keyword)}
      className={`p-4 rounded-xl border shadow-xs space-y-3 cursor-pointer transition-colors ${
        isSelected
          ? "bg-blue-50/70 dark:bg-blue-950/40 border-blue-400 dark:border-blue-700"
          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-500/40"
      }`}
    >
      {/* Top row: Checkbox, Star, Product Type & Language, Keyword title, Actions */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2.5 flex-1 min-w-0">
          {/* Checkbox */}
          <div
            className="pt-1"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="checkbox"
              aria-label={`Select ${keyword.keyword}`}
              checked={isSelected}
              onChange={() => toggleSelectKeyword(keyword.id)}
              className="w-4 h-4 rounded-sm text-blue-600 border-slate-300 dark:border-slate-700 focus:ring-blue-500 cursor-pointer"
            />
          </div>

          {/* Star */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleToggleFavorite(keyword.id);
            }}
            aria-label={keyword.favorite ? "Unfavorite" : "Favorite"}
            className="p-1 -ml-1 text-slate-400 hover:text-amber-500 transition-colors shrink-0"
          >
            <Star
              className={`w-5 h-5 ${
                keyword.favorite
                  ? "text-amber-500 fill-amber-500"
                  : "text-slate-300 dark:text-slate-600"
              }`}
            />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Product Type & Language Badges in Pro Mode */}
              {isProMode && (
                <>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${productTypeInfo.badgeClass}`}
                  >
                    <span>{productTypeInfo.icon}</span>
                    {productTypeInfo.label}
                  </span>

                  {/* Language Badge if NOT English */}
                  {lang !== "English" && langInfo && (
                    <span
                      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold border ${langInfo.badgeClass}`}
                      title={`Language: ${langInfo.name}`}
                    >
                      <span>{langInfo.flag}</span>
                      <span>{langInfo.name}</span>
                    </span>
                  )}

                  {collectionName && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-blue-600 dark:text-blue-400">
                      <FolderKanban className="w-3 h-3" />
                      {collectionName}
                    </span>
                  )}
                </>
              )}
            </div>

            <div className="flex items-center gap-1.5 flex-wrap mt-1">
              <span className="font-semibold text-slate-900 dark:text-white text-base leading-snug break-words">
                {keyword.keyword}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy keyword"
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {keyword.notes && (
              <div className="flex items-center gap-1 mt-1 text-xs text-slate-500 dark:text-slate-400">
                <FileText className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                <p className="line-clamp-1">{keyword.notes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div
          className="flex items-center gap-1 shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => handleDuplicateKeyword(keyword.id)}
            title="Duplicate"
            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <CopyPlus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => openEditModal(keyword)}
            title="Edit"
            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => openDeleteConfirm(keyword)}
            title="Delete"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3 Metrics Row */}
      <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-100 dark:border-slate-800/80">
        {/* Search Volume */}
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
          <div className="text-[9px] font-semibold text-slate-400 uppercase">
            Volume
          </div>
          <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
            {formatNumber(keyword.searchVolume)}
          </div>
          <div className={`text-[9px] font-medium mt-0.5 truncate ${volLevel.textClass}`}>
            {volLevel.label.replace(" Volume", "")}
          </div>
        </div>

        {/* Competition */}
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
          <div className="text-[9px] font-semibold text-slate-400 uppercase">
            Competition
          </div>
          <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
            {formatNumber(keyword.competition)}
          </div>
          <div className={`text-[9px] font-medium mt-0.5 truncate ${compLevel.textClass}`}>
            {compLevel.label.replace(" Competition", "")}
          </div>
        </div>

        {/* Opportunity */}
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
          <div className="text-[9px] font-semibold text-slate-400 uppercase">
            Opportunity
          </div>
          <div className="mt-0.5">
            <OpportunityBadge
              searchVolume={keyword.searchVolume}
              competition={keyword.competition}
              size="sm"
            />
          </div>
        </div>
      </div>

      {/* Badges Row - Only in Pro Mode */}
      {isProMode && (
        <div className="flex items-center gap-2 pt-1 flex-wrap">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${priorityInfo.badgeClass}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${priorityInfo.dotClass}`} />
            {priorityInfo.label}
          </span>

          {keyword.type === "Copyright" ? (
            <Tooltip content={typeInfo.tooltip}>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border cursor-help ${typeInfo.badgeClass}`}
              >
                <AlertTriangle className="w-3 h-3 text-purple-600" />
                {typeInfo.label}
              </span>
            </Tooltip>
          ) : (
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${typeInfo.badgeClass}`}
            >
              {keyword.type === "Seasonal" && <Sparkles className="w-3 h-3 text-blue-500" />}
              {keyword.type === "Evergreen" && <Layers className="w-3 h-3 text-emerald-500" />}
              {typeInfo.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
