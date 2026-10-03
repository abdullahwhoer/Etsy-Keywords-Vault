"use client";

import React, { useState } from "react";
import {
  X,
  Layers,
  FolderKanban,
  Star,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Box,
  Globe,
} from "lucide-react";
import { useKeywords } from "@/hooks/useKeywords";
import {
  KeywordPriority,
  KeywordType,
  ProductType,
  KeywordLanguage,
} from "@/types/keyword";

export function BulkEditModal() {
  const {
    bulkActionModal,
    closeBulkActionModal,
    handleExecuteBulkAction,
    selectedKeywordIds,
    collections,
  } = useKeywords();

  const [priorityVal, setPriorityVal] = useState<KeywordPriority>("Normal");
  const [typeVal, setTypeVal] = useState<KeywordType>("Evergreen");
  const [productTypeVal, setProductTypeVal] = useState<ProductType>("Digital");
  const [languageVal, setLanguageVal] = useState<KeywordLanguage>("English");
  const [collectionVal, setCollectionVal] = useState<string>("");

  if (!bulkActionModal) return null;

  const count = selectedKeywordIds.size;

  const handleConfirm = () => {
    switch (bulkActionModal) {
      case "delete":
        handleExecuteBulkAction("delete", null);
        break;
      case "priority":
        handleExecuteBulkAction("priority", priorityVal);
        break;
      case "type":
        handleExecuteBulkAction("type", typeVal);
        break;
      case "productType":
        handleExecuteBulkAction("productType", productTypeVal);
        break;
      case "language":
        handleExecuteBulkAction("language", languageVal);
        break;
      case "collection":
        handleExecuteBulkAction("collection", collectionVal);
        break;
      case "favorite-add":
        handleExecuteBulkAction("favorite-add", true);
        break;
      case "favorite-remove":
        handleExecuteBulkAction("favorite-remove", false);
        break;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-xs">
      <div
        className="relative w-full max-w-md my-auto sm:my-8 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl p-6 transition-all animate-in fade-in zoom-in-95"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {bulkActionModal === "delete" && "Delete Selected Keywords?"}
              {bulkActionModal === "priority" && "Change Priority"}
              {bulkActionModal === "type" && "Change Niche Classification"}
              {bulkActionModal === "productType" && "Change Product Fulfillment Type"}
              {bulkActionModal === "language" && "Change Language"}
              {bulkActionModal === "collection" && "Assign to Collection"}
              {bulkActionModal === "favorite-add" && "Add to Favorites"}
              {bulkActionModal === "favorite-remove" && "Remove from Favorites"}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Applying change to <strong className="text-slate-700 dark:text-slate-200">{count} selected keywords</strong>.
            </p>
          </div>
          <button
            onClick={closeBulkActionModal}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Inputs based on Action */}
        <div className="py-4 space-y-3">
          {bulkActionModal === "delete" && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex items-start gap-2.5 text-xs text-rose-800 dark:text-rose-300">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>
                Are you sure you want to delete these {count} keywords? This action cannot be undone.
              </span>
            </div>
          )}

          {bulkActionModal === "productType" && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5 text-cyan-500" />
                Select Product Fulfillment Type
              </label>
              <select
                value={productTypeVal}
                onChange={(e) => setProductTypeVal(e.target.value as ProductType)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="Digital">⚡ Digital Product</option>
                <option value="Physical">📦 Physical Product</option>
              </select>
            </div>
          )}

          {bulkActionModal === "language" && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-500" />
                Select Language
              </label>
              <select
                value={languageVal}
                onChange={(e) => setLanguageVal(e.target.value as KeywordLanguage)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="English">🇺🇸 English</option>
                <option value="German">🇩🇪 German</option>
                <option value="Spanish">🇪🇸 Spanish</option>
                <option value="Italian">🇮🇹 Italian</option>
                <option value="French">🇫🇷 French</option>
              </select>
            </div>
          )}

          {bulkActionModal === "priority" && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Select New Priority
              </label>
              <select
                value={priorityVal}
                onChange={(e) => setPriorityVal(e.target.value as KeywordPriority)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="Normal">Normal (Neutral)</option>
                <option value="Fair">Fair (Moderate)</option>
                <option value="Excellent">Excellent (High Potential)</option>
              </select>
            </div>
          )}

          {bulkActionModal === "type" && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Select New Classification
              </label>
              <select
                value={typeVal}
                onChange={(e) => setTypeVal(e.target.value as KeywordType)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="Evergreen">Evergreen (Year-round demand)</option>
                <option value="Seasonal">Seasonal (Holiday/event spikes)</option>
                <option value="Copyright">Copyright (IP Caution)</option>
              </select>
            </div>
          )}

          {bulkActionModal === "collection" && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Select Collection
              </label>
              <select
                value={collectionVal}
                onChange={(e) => setCollectionVal(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="">-- Remove from Collection (Uncategorized) --</option>
                {collections.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.icon || "📁"} {col.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {bulkActionModal === "favorite-add" && (
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Star and bookmark all {count} selected keywords as favorites.
            </p>
          )}

          {bulkActionModal === "favorite-remove" && (
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Remove star favorite bookmark from all {count} selected keywords.
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={closeBulkActionModal}
            className="px-4 py-2 text-xs md:text-sm font-medium rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg text-white transition-all shadow-xs ${
              bulkActionModal === "delete"
                ? "bg-rose-600 hover:bg-rose-700"
                : "bg-blue-600 hover:bg-blue-700 shadow-blue-500/20"
            }`}
          >
            {bulkActionModal === "delete" ? "Delete Keywords" : "Apply Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
