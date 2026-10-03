"use client";

import React, { useEffect } from "react";
import {
  X,
  Star,
  Copy,
  Check,
  Edit2,
  CopyPlus,
  Trash2,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  Layers,
  AlertTriangle,
  FolderKanban,
  Calendar,
  Clock,
  HelpCircle,
  Box,
  Globe,
  Tag,
} from "lucide-react";
import { useKeywords } from "@/hooks/useKeywords";
import {
  getSearchVolumeLevel,
  getCompetitionLevel,
  calculateOpportunity,
  PRIORITY_CONFIG,
  KEYWORD_TYPE_CONFIG,
  PRODUCT_TYPE_CONFIG,
  LANGUAGE_CONFIG,
  OPPORTUNITY_TOOLTIP,
} from "@/config/thresholds";
import { formatNumber, formatDate } from "@/lib/utils";
import { Tooltip } from "@/components/ui/Tooltip";
import { ProductType } from "@/types/keyword";

export function KeywordDetailDrawer() {
  const {
    selectedDetailKeyword,
    closeDetailDrawer,
    handleToggleFavorite,
    openEditModal,
    openDeleteConfirm,
    handleDuplicateKeyword,
    handleQuickProductTypeChange,
    handleUpdateKeyword,
    collections,
  } = useKeywords();

  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedDetailKeyword) {
        closeDetailDrawer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedDetailKeyword, closeDetailDrawer]);

  if (!selectedDetailKeyword) return null;

  const kw = selectedDetailKeyword;
  const volLevel = getSearchVolumeLevel(kw.searchVolume);
  const compLevel = getCompetitionLevel(kw.competition);
  const opp = calculateOpportunity(kw.searchVolume, kw.competition);
  const priorityInfo = PRIORITY_CONFIG[kw.priority] || PRIORITY_CONFIG.Normal;
  const typeInfo = KEYWORD_TYPE_CONFIG[kw.type] || KEYWORD_TYPE_CONFIG.Evergreen;
  const productType = kw.productType || "Digital";
  const productTypeInfo = PRODUCT_TYPE_CONFIG[productType];
  const lang = kw.language || "English";
  const langInfo = LANGUAGE_CONFIG[lang];

  const handleCopy = () => {
    navigator.clipboard.writeText(kw.keyword);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={closeDetailDrawer}
      />

      {/* Drawer Panel */}
      <div
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col z-10 animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="keyword-detail-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
          <div className="space-y-1.5 flex-1 pr-4 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => handleToggleFavorite(kw.id)}
                aria-label={kw.favorite ? "Unfavorite" : "Favorite"}
                className="p-1 -ml-1 text-slate-400 hover:text-amber-500 transition-colors"
              >
                <Star
                  className={`w-5 h-5 ${
                    kw.favorite
                      ? "text-amber-500 fill-amber-500"
                      : "text-slate-300 dark:text-slate-600"
                  }`}
                />
              </button>

              {/* Product Type Badge */}
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${productTypeInfo.badgeClass}`}
              >
                <span>{productTypeInfo.icon}</span>
                {productTypeInfo.label}
              </span>

              {/* Non-English Language Badge if applicable */}
              {lang !== "English" && langInfo && (
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${langInfo.badgeClass}`}
                >
                  <span>{langInfo.flag}</span>
                  {langInfo.name}
                </span>
              )}
            </div>

            <h2
              id="keyword-detail-title"
              className="text-xl font-bold tracking-tight text-slate-900 dark:text-white break-words"
            >
              {kw.keyword}
            </h2>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleCopy}
              title="Copy keyword"
              aria-label="Copy keyword"
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
            <button
              type="button"
              onClick={closeDetailDrawer}
              aria-label="Close drawer"
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Keyword Health Summary Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/60 dark:from-slate-800/40 dark:to-slate-800/20 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Keyword Health Metrics
              </span>
              <Tooltip content={OPPORTUNITY_TOOLTIP}>
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-help">
                  <HelpCircle className="w-3.5 h-3.5" />
                  Metric Info
                </span>
              </Tooltip>
            </div>

            {/* 3 Metrics Cards */}
            <div className="grid grid-cols-3 gap-2 text-center">
              {/* Volume */}
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase">
                  Volume
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                  {formatNumber(kw.searchVolume)}
                </div>
                <div className={`text-[10px] font-medium mt-1 ${volLevel.textClass}`}>
                  {volLevel.label.replace(" Volume", "")}
                </div>
              </div>

              {/* Competition */}
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase">
                  Competition
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                  {formatNumber(kw.competition)}
                </div>
                <div className={`text-[10px] font-medium mt-1 ${compLevel.textClass}`}>
                  {compLevel.label.replace(" Competition", "")}
                </div>
              </div>

              {/* Opportunity Ratio */}
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase">
                  Opportunity
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                  {opp.formattedRatio}
                </div>
                <div className={`text-[10px] font-medium mt-1 ${opp.textClass}`}>
                  {opp.label}
                </div>
              </div>
            </div>

            {/* Visual Health Ratio Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
                <span>Opportunity Potential</span>
                <span className="font-bold">{opp.label} ({opp.score}/100)</span>
              </div>
              <div className="w-full bg-slate-200/80 dark:bg-slate-700/80 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    opp.label === "Excellent"
                      ? "bg-emerald-500"
                      : opp.label === "Fair"
                      ? "bg-amber-500"
                      : "bg-slate-400"
                  }`}
                  style={{ width: `${opp.score}%` }}
                />
              </div>
            </div>
          </div>

          {/* Classification & Attributes */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Attributes & Classification
            </h3>

            {/* Quick Product Type Toggle Selector */}
            <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5 text-blue-500" />
                Product Fulfillment Type
              </span>
              <div className="grid grid-cols-2 gap-2 pt-1">
                {(["Digital", "Physical"] as ProductType[]).map((pt) => {
                  const isCurrent = productType === pt;
                  return (
                    <button
                      key={pt}
                      type="button"
                      onClick={() => handleQuickProductTypeChange(kw.id, pt)}
                      className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all flex items-center justify-center gap-1.5 ${
                        isCurrent
                          ? pt === "Digital"
                            ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                            : "bg-amber-600 text-white border-amber-600 shadow-xs"
                          : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <span>{pt === "Digital" ? "⚡ Digital" : "📦 Physical"}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Language */}
              <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
                <span className="text-[11px] font-semibold text-slate-400 uppercase flex items-center gap-1">
                  <Globe className="w-3 h-3 text-indigo-500" />
                  Language
                </span>
                <div className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white">
                  <span>{langInfo?.flag || "🌐"}</span>
                  <span>{lang}</span>
                </div>
              </div>

              {/* Priority */}
              <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">
                  Priority
                </span>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${priorityInfo.badgeClass}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${priorityInfo.dotClass}`} />
                    {priorityInfo.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Keyword Type / Niche */}
            <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span className="text-[11px] font-semibold text-slate-400 uppercase flex items-center gap-1">
                <Tag className="w-3 h-3 text-blue-500" />
                Niche Classification
              </span>
              <div className="mt-1.5 flex items-center gap-1.5">
                {kw.type === "Copyright" ? (
                  <Tooltip content={typeInfo.tooltip}>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border cursor-help ${typeInfo.badgeClass}`}
                    >
                      <AlertTriangle className="w-3 h-3" />
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
              </div>
            </div>

            {/* Collection tag / assignment */}
            <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase flex items-center gap-1">
                <FolderKanban className="w-3 h-3 text-blue-500" />
                Collection Folder
              </span>
              <div className="flex items-center gap-2">
                <select
                  value={kw.collectionId || ""}
                  onChange={(e) => handleUpdateKeyword(kw.id, { collectionId: e.target.value || undefined })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="">-- No Collection (Uncategorized) --</option>
                  {collections.map((col) => (
                    <option key={col.id} value={col.id}>
                      {col.icon || "📁"} {col.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Notes & Strategy */}
            <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase">
                Notes & Strategy
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                {kw.notes || "No notes entered for this keyword."}
              </p>
            </div>

            {/* Timestamps */}
            <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 pt-2 px-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Created: {formatDate(kw.createdAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Updated: {formatDate(kw.updatedAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                closeDetailDrawer();
                openEditModal(kw);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-colors shadow-xs"
            >
              <Edit2 className="w-3.5 h-3.5" />
              Edit
            </button>

            <button
              type="button"
              onClick={() => handleDuplicateKeyword(kw.id)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-colors shadow-xs"
            >
              <CopyPlus className="w-3.5 h-3.5 text-blue-500" />
              Duplicate
            </button>
          </div>

          <button
            type="button"
            onClick={() => openDeleteConfirm(kw)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
