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
  Tag,
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

interface KeywordTableProps {
  keywords: Keyword[];
}

export function KeywordTable({ keywords }: KeywordTableProps) {
  const {
    handleToggleFavorite,
    openEditModal,
    openDeleteConfirm,
    openDetailDrawer,
    handleDuplicateKeyword,
    selectedKeywordIds,
    toggleSelectKeyword,
    selectAllFilteredKeywords,
    deselectAllKeywords,
    isAllSelected,
    isIndeterminate,
    collections,
    isProMode,
  } = useKeywords();

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const collectionNameMap = collections.reduce((acc, c) => {
    acc[c.id] = c.name;
    return acc;
  }, {} as Record<string, string>);

  const handleCopy = (e: React.MouseEvent, keyword: Keyword) => {
    e.stopPropagation();
    navigator.clipboard.writeText(keyword.keyword);
    setCopiedId(keyword.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 1800);
  };

  const handleHeaderCheckboxChange = () => {
    if (isAllSelected) {
      deselectAllKeywords();
    } else {
      selectAllFilteredKeywords();
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
      <table className="w-full text-left text-sm border-collapse">
        {/* Table Header */}
        <thead>
          <tr className="border-b border-slate-200 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-800/40 text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
            {/* Bulk Selection Checkbox */}
            <th scope="col" className="py-3.5 pl-4 pr-1 w-10 text-center">
              <input
                type="checkbox"
                aria-label="Select all keywords"
                checked={isAllSelected}
                ref={(input) => {
                  if (input) input.indeterminate = isIndeterminate;
                }}
                onChange={handleHeaderCheckboxChange}
                className="w-4 h-4 rounded-sm text-blue-600 border-slate-300 dark:border-zinc-700 focus:ring-blue-500 cursor-pointer"
              />
            </th>

            {/* Favorite */}
            <th scope="col" className="py-3.5 px-2 w-8 text-center">
              <span className="sr-only">Favorite</span>
            </th>

            {/* Keyword Title & Badges */}
            <th scope="col" className="py-3.5 px-4 min-w-[200px]">
              Keyword
            </th>

            {/* Metrics */}
            <th scope="col" className="py-3.5 px-3 min-w-[120px]">
              Search Volume
            </th>
            <th scope="col" className="py-3.5 px-3 min-w-[120px]">
              Competition
            </th>
            <th scope="col" className="py-3.5 px-3 min-w-[130px]">
              Opportunity
            </th>

            {/* Metadata Badges - Shown in Pro Mode */}
            {isProMode && (
              <>
                <th scope="col" className="py-3.5 px-3 min-w-[110px]">
                  Product Type
                </th>
                <th scope="col" className="py-3.5 px-3 min-w-[100px]">
                  Priority
                </th>
                <th scope="col" className="py-3.5 px-3 min-w-[110px]">
                  Classification
                </th>
              </>
            )}

            {/* Actions */}
            <th scope="col" className="py-3.5 pr-4 pl-2 text-right min-w-[110px]">
              Actions
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800/80 text-slate-700 dark:text-slate-200">
          {keywords.map((kw) => {
            const isSelected = selectedKeywordIds.has(kw.id);
            const volLevel = getSearchVolumeLevel(kw.searchVolume);
            const compLevel = getCompetitionLevel(kw.competition);
            const priorityInfo = PRIORITY_CONFIG[kw.priority] || PRIORITY_CONFIG.Normal;
            const typeInfo = KEYWORD_TYPE_CONFIG[kw.type] || KEYWORD_TYPE_CONFIG.Evergreen;
            const productType = kw.productType || "Digital";
            const productTypeInfo = PRODUCT_TYPE_CONFIG[productType];
            const lang = kw.language || "English";
            const langInfo = LANGUAGE_CONFIG[lang];
            const collectionName = kw.collectionId ? collectionNameMap[kw.collectionId] || kw.collectionId : null;

            return (
              <tr
                key={kw.id}
                onClick={() => openDetailDrawer(kw)}
                className={`group transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-blue-50/70 dark:bg-blue-950/40"
                    : "hover:bg-slate-50/80 dark:hover:bg-slate-800/50"
                }`}
              >
                {/* Row Checkbox */}
                <td
                  className="py-3.5 pl-4 pr-1 text-center align-middle"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    aria-label={`Select ${kw.keyword}`}
                    checked={isSelected}
                    onChange={() => toggleSelectKeyword(kw.id)}
                    className="w-4 h-4 rounded-sm text-blue-600 border-slate-300 dark:border-slate-700 focus:ring-blue-500 cursor-pointer"
                  />
                </td>

                {/* Favorite Star */}
                <td
                  className="py-3.5 px-2 text-center align-middle"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => handleToggleFavorite(kw.id)}
                    aria-label={kw.favorite ? "Unfavorite keyword" : "Favorite keyword"}
                    className="p-1 rounded-md text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                  >
                    <Star
                      className={`w-4 h-4 transition-transform active:scale-125 ${
                        kw.favorite
                          ? "text-amber-500 fill-amber-500"
                          : "text-slate-300 dark:text-slate-600 hover:text-amber-400"
                      }`}
                    />
                  </button>
                </td>

                {/* Keyword Text & Notes & Language Tag */}
                <td className="py-3.5 px-4 align-middle">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-900 dark:text-slate-100 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {kw.keyword}
                      </span>

                      {/* Display language badge ONLY if not English */}
                      {lang !== "English" && langInfo && (
                        <span
                          className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold border ${langInfo.badgeClass}`}
                          title={`Language: ${langInfo.name}`}
                        >
                          <span>{langInfo.flag}</span>
                          <span>{langInfo.name}</span>
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={(e) => handleCopy(e, kw)}
                        title="Copy keyword"
                        aria-label={`Copy ${kw.keyword}`}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-opacity"
                      >
                        {copiedId === kw.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {collectionName && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-blue-600 dark:text-blue-400">
                          <FolderKanban className="w-3 h-3" />
                          {collectionName}
                        </span>
                      )}

                      {kw.notes && (
                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-1 max-w-xs">
                          <FileText className="w-3 h-3 shrink-0 text-slate-400" />
                          <span className="truncate">{kw.notes}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </td>

                {/* Search Volume */}
                <td className="py-3.5 px-3 align-middle">
                  <div className="flex flex-col items-start gap-1">
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      {formatNumber(kw.searchVolume)}
                      <span className="text-[11px] font-normal text-slate-500 dark:text-slate-400 ml-1">
                        /mo
                      </span>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium border ${volLevel.badgeClass}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${volLevel.dotClass}`} />
                      {volLevel.label}
                    </span>
                  </div>
                </td>

                {/* Competition */}
                <td className="py-3.5 px-3 align-middle">
                  <div className="flex flex-col items-start gap-1">
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      {formatNumber(kw.competition)}
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium border ${compLevel.badgeClass}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${compLevel.dotClass}`} />
                      {compLevel.label}
                    </span>
                  </div>
                </td>

                {/* Opportunity Score */}
                <td className="py-3.5 px-3 align-middle">
                  <OpportunityBadge
                    searchVolume={kw.searchVolume}
                    competition={kw.competition}
                    showScoreBar={true}
                    size="sm"
                  />
                </td>

                {/* Pro Mode Columns */}
                {isProMode && (
                  <>
                    {/* Product Type (Digital / Physical) */}
                    <td className="py-3.5 px-3 align-middle">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${productTypeInfo.badgeClass}`}
                      >
                        <span>{productTypeInfo.icon}</span>
                        {productTypeInfo.label}
                      </span>
                    </td>

                    {/* Priority */}
                    <td className="py-3.5 px-3 align-middle">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${priorityInfo.badgeClass}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${priorityInfo.dotClass}`} />
                        {priorityInfo.label}
                      </span>
                    </td>

                    {/* Niche Classification */}
                    <td className="py-3.5 px-3 align-middle">
                      {kw.type === "Copyright" ? (
                        <Tooltip content={typeInfo.tooltip}>
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border cursor-help ${typeInfo.badgeClass}`}
                          >
                            <AlertTriangle className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                            {typeInfo.label}
                          </span>
                        </Tooltip>
                      ) : (
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${typeInfo.badgeClass}`}
                        >
                          {kw.type === "Seasonal" && <Sparkles className="w-3 h-3 text-blue-500" />}
                          {kw.type === "Evergreen" && <Layers className="w-3 h-3 text-emerald-500" />}
                          {typeInfo.label}
                        </span>
                      )}
                    </td>
                  </>
                )}

                {/* Actions */}
                <td
                  className="py-3.5 pr-4 pl-2 text-right align-middle"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => openDetailDrawer(kw)}
                      title="View Details"
                      aria-label={`View details for ${kw.keyword}`}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDuplicateKeyword(kw.id)}
                      title="Duplicate keyword"
                      aria-label={`Duplicate ${kw.keyword}`}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <CopyPlus className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditModal(kw)}
                      title="Edit keyword"
                      aria-label={`Edit ${kw.keyword}`}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => openDeleteConfirm(kw)}
                      title="Delete keyword"
                      aria-label={`Delete ${kw.keyword}`}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
