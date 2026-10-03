"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Star,
  Layers,
  Sparkles,
  AlertTriangle,
  Info,
  Box,
  Globe,
  Tag,
  Zap,
} from "lucide-react";
import {
  Keyword,
  KeywordFormData,
  KeywordPriority,
  KeywordType,
  ProductType,
  KeywordLanguage,
} from "@/types/keyword";
import { useKeywords } from "@/hooks/useKeywords";
import {
  getSearchVolumeLevel,
  getCompetitionLevel,
  calculateOpportunity,
  LANGUAGE_CONFIG,
} from "@/config/thresholds";
import { OpportunityBadge } from "./OpportunityBadge";

export function KeywordModal() {
  const {
    isAddModalOpen,
    editingKeyword,
    closeAddModal,
    closeEditModal,
    handleAddKeyword,
    handleUpdateKeyword,
    collections,
    isProMode,
  } = useKeywords();

  const isEditing = !!editingKeyword;

  // Form states
  const [keyword, setKeyword] = useState("");
  const [searchVolume, setSearchVolume] = useState<string>("");
  const [competition, setCompetition] = useState<string>("");
  const [priority, setPriority] = useState<KeywordPriority>("Normal");
  const [type, setType] = useState<KeywordType>("Evergreen");
  const [productType, setProductType] = useState<ProductType>("Digital");
  const [language, setLanguage] = useState<KeywordLanguage>("English");
  const [notes, setNotes] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [collectionId, setCollectionId] = useState("");

  // Validation errors
  const [errors, setErrors] = useState<{
    keyword?: string;
    searchVolume?: string;
    competition?: string;
  }>({});

  // Reset or populate fields on open
  useEffect(() => {
    if (editingKeyword) {
      setKeyword(editingKeyword.keyword);
      setSearchVolume(String(editingKeyword.searchVolume));
      setCompetition(String(editingKeyword.competition));
      setPriority(editingKeyword.priority);
      setType(editingKeyword.type);
      setProductType(editingKeyword.productType || "Digital");
      setLanguage(editingKeyword.language || "English");
      setNotes(editingKeyword.notes || "");
      setFavorite(editingKeyword.favorite);
      setCollectionId(editingKeyword.collectionId || "");
    } else {
      setKeyword("");
      setSearchVolume("");
      setCompetition("");
      setPriority("Normal");
      setType("Evergreen");
      setProductType("Digital");
      setLanguage("English");
      setNotes("");
      setFavorite(false);
      setCollectionId("");
    }
    setErrors({});
  }, [editingKeyword, isAddModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isAddModalOpen) {
        if (isEditing) closeEditModal();
        else closeAddModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAddModalOpen, isEditing, closeAddModal, closeEditModal]);

  if (!isAddModalOpen) return null;

  const handleClose = () => {
    if (isEditing) closeEditModal();
    else closeAddModal();
  };

  const validate = (): boolean => {
    const newErrors: {
      keyword?: string;
      searchVolume?: string;
      competition?: string;
    } = {};

    if (!keyword.trim()) {
      newErrors.keyword = "Keyword is required.";
    }

    if (searchVolume !== "") {
      const volNum = Number(searchVolume);
      if (isNaN(volNum) || volNum < 0) {
        newErrors.searchVolume = "Search volume must be a valid number ≥ 0.";
      }
    }

    if (competition !== "") {
      const compNum = Number(competition);
      if (isNaN(compNum) || compNum < 0) {
        newErrors.competition = "Competition must be a valid number ≥ 0.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const parsedVol = searchVolume.trim() === "" ? 0 : Math.floor(Number(searchVolume));
    const parsedComp = competition.trim() === "" ? 0 : Math.floor(Number(competition));

    const formData: KeywordFormData = {
      keyword: keyword.trim(),
      searchVolume: Math.max(0, parsedVol),
      competition: Math.max(0, parsedComp),
      priority: isProMode ? priority : "Normal",
      type: isProMode ? type : "Evergreen",
      productType: isProMode ? productType : "Digital",
      language: isProMode ? language : "English",
      notes: isProMode && notes.trim() ? notes.trim() : undefined,
      favorite,
      collectionId: isProMode && collectionId.trim() ? collectionId.trim() : undefined,
    };

    if (isEditing && editingKeyword) {
      const res = handleUpdateKeyword(editingKeyword.id, formData);
      if (res) closeEditModal();
    } else {
      const res = handleAddKeyword(formData);
      if (res) closeAddModal();
    }
  };

  // Preview indicators
  const parsedVol = Number(searchVolume);
  const volLevel = !isNaN(parsedVol) && searchVolume.trim() !== "" ? getSearchVolumeLevel(parsedVol) : null;
  const parsedComp = Number(competition);
  const compLevel = !isNaN(parsedComp) && competition.trim() !== "" ? getCompetitionLevel(parsedComp) : null;
  const showOpp = !isNaN(parsedVol) && !isNaN(parsedComp) && searchVolume.trim() !== "" && competition.trim() !== "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-xs">
      <div
        className="relative w-full max-w-xl my-auto rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl flex flex-col max-h-[92vh] transition-all duration-200 animate-in fade-in zoom-in-95"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Header - Fixed at Top */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-zinc-800 shrink-0 bg-slate-50/50 dark:bg-zinc-900/50 rounded-t-2xl">
          <div>
            <div className="flex items-center gap-2">
              <h2
                id="modal-title"
                className="text-lg font-bold text-slate-900 dark:text-white"
              >
                {isEditing ? "Edit Keyword" : "Add Keyword"}
              </h2>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  isProMode
                    ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                }`}
              >
                {isProMode ? "Pro Mode" : "Basic Mode"}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              {isProMode
                ? "Save Etsy keyword opportunity with full attributes and niche analysis."
                : "Save keyword with search volume and competition metrics."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Form Body */}
        <form id="keyword-modal-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Keyword Input */}
          <div>
            <label
              htmlFor="keyword-input"
              className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5"
            >
              Keyword <span className="text-rose-500">*</span>
            </label>
            <input
              id="keyword-input"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g. digital wedding planner"
              autoFocus
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-zinc-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 transition-all ${
                errors.keyword
                  ? "border-rose-500 focus:ring-rose-500/30"
                  : "border-slate-200 dark:border-zinc-700 focus:border-blue-500 focus:ring-blue-500/20"
              }`}
            />
            {errors.keyword && (
              <p className="mt-1 text-xs text-rose-500 font-medium">
                {errors.keyword}
              </p>
            )}
          </div>

          {/* Search Volume & Competition Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Search Volume */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="volume-input"
                  className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 uppercase tracking-wider"
                >
                  Search Volume {isProMode && <span className="text-slate-400 font-normal text-[11px]">(Optional)</span>}
                </label>
                {volLevel && (
                  <span
                    className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${volLevel.badgeClass}`}
                  >
                    {volLevel.label}
                  </span>
                )}
              </div>
              <input
                id="volume-input"
                type="number"
                min="0"
                step="1"
                value={searchVolume}
                onChange={(e) => setSearchVolume(e.target.value)}
                placeholder="e.g. 1200 (or leave 0)"
                className={`w-full px-3.5 py-2 text-sm rounded-xl border bg-white dark:bg-zinc-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 transition-all ${
                  errors.searchVolume
                    ? "border-rose-500 focus:ring-rose-500/30"
                    : "border-slate-200 dark:border-zinc-700 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
              />
              {errors.searchVolume && (
                <p className="mt-1 text-xs text-rose-500 font-medium">
                  {errors.searchVolume}
                </p>
              )}
            </div>

            {/* Competition */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="competition-input"
                  className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 uppercase tracking-wider"
                >
                  Competition {isProMode && <span className="text-slate-400 font-normal text-[11px]">(Optional)</span>}
                </label>
                {compLevel && (
                  <span
                    className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${compLevel.badgeClass}`}
                  >
                    {compLevel.label}
                  </span>
                )}
              </div>
              <input
                id="competition-input"
                type="number"
                min="0"
                step="1"
                value={competition}
                onChange={(e) => setCompetition(e.target.value)}
                placeholder="e.g. 3500 (or leave 0)"
                className={`w-full px-3.5 py-2 text-sm rounded-xl border bg-white dark:bg-zinc-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 transition-all ${
                  errors.competition
                    ? "border-rose-500 focus:ring-rose-500/30"
                    : "border-slate-200 dark:border-zinc-700 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
              />
              {errors.competition && (
                <p className="mt-1 text-xs text-rose-500 font-medium">
                  {errors.competition}
                </p>
              )}
            </div>
          </div>

          {/* Opportunity Score Live Indicator */}
          {showOpp && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200/80 dark:border-zinc-700 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600 dark:text-zinc-300">
                Opportunity Score:
              </span>
              <OpportunityBadge
                searchVolume={parsedVol}
                competition={parsedComp}
                showScoreBar={true}
                size="sm"
              />
            </div>
          )}

          {/* ADVANCED / PRO MODE FIELDS */}
          {isProMode && (
            <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-zinc-800 animate-in fade-in duration-200">
              {/* Product Type (Digital vs Physical) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Box className="w-3.5 h-3.5 text-blue-500" />
                  Product Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setProductType("Digital")}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border flex items-center justify-center gap-2 transition-all ${
                      productType === "Digital"
                        ? "bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-700 dark:text-blue-300 ring-1 ring-blue-500/30 shadow-xs"
                        : "bg-white dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-400 hover:border-slate-300"
                    }`}
                  >
                    <span>⚡ Digital Product</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setProductType("Physical")}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border flex items-center justify-center gap-2 transition-all ${
                      productType === "Physical"
                        ? "bg-amber-50 dark:bg-amber-950/60 border-amber-500 text-amber-700 dark:text-amber-300 ring-1 ring-amber-500/30 shadow-xs"
                        : "bg-white dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-400 hover:border-slate-300"
                    }`}
                  >
                    <span>📦 Physical Product</span>
                  </button>
                </div>
              </div>

              {/* Language, Priority & Type Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Language */}
                <div>
                  <label
                    htmlFor="language-select"
                    className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5 flex items-center gap-1"
                  >
                    <Globe className="w-3 h-3 text-indigo-500" />
                    Language
                  </label>
                  <select
                    id="language-select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as KeywordLanguage)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                  >
                    <option value="English">🇬🇧 English</option>
                    <option value="German">🇩🇪 German</option>
                    <option value="Spanish">🇪🇸 Spanish</option>
                    <option value="Italian">🇮🇹 Italian</option>
                    <option value="French">🇫🇷 French</option>
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label
                    htmlFor="priority-select"
                    className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5"
                  >
                    Priority
                  </label>
                  <select
                    id="priority-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as KeywordPriority)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                  >
                    <option value="Normal">Normal</option>
                    <option value="Fair">Fair</option>
                    <option value="Excellent">Excellent</option>
                  </select>
                </div>

                {/* Keyword Type */}
                <div>
                  <label
                    htmlFor="type-select"
                    className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5 flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3 text-blue-500" />
                    Classification
                  </label>
                  <select
                    id="type-select"
                    value={type}
                    onChange={(e) => setType(e.target.value as KeywordType)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                  >
                    <option value="Evergreen">Evergreen</option>
                    <option value="Seasonal">Seasonal</option>
                    <option value="Copyright">Copyright</option>
                  </select>
                </div>
              </div>

              {/* Copyright Warning banner if type is Copyright */}
              {type === "Copyright" && (
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-start gap-2.5 text-xs text-purple-800 dark:text-purple-300">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-purple-600 dark:text-purple-400 mt-0.5" />
                  <span>
                    <strong>Copyright classification:</strong> User-defined classification. This does not determine legal copyright status.
                  </span>
                </div>
              )}

              {/* Collection Selector */}
              <div>
                <label
                  htmlFor="collection-select"
                  className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5"
                >
                  Collection / Category
                </label>
                <select
                  id="collection-select"
                  value={collectionId}
                  onChange={(e) => setCollectionId(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:border-blue-500"
                >
                  <option value="">-- No Collection (Uncategorized) --</option>
                  {collections.map((col) => (
                    <option key={col.id} value={col.id}>
                      {col.icon || "📁"} {col.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Notes */}
              <div>
                <label
                  htmlFor="notes-input"
                  className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5"
                >
                  Notes & Strategy (Optional)
                </label>
                <textarea
                  id="notes-input"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. High buyer intent for personalized gifts."
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white placeholder-slate-400"
                />
              </div>
            </div>
          )}

          {/* Favorite Toggle */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={favorite}
                onChange={(e) => setFavorite(e.target.checked)}
                className="sr-only"
              />
              <div
                className={`p-1.5 rounded-lg border transition-colors flex items-center gap-1.5 text-xs font-medium ${
                  favorite
                    ? "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                    : "bg-slate-50 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border-slate-200 dark:border-zinc-700"
                }`}
              >
                <Star
                  className={`w-4 h-4 ${
                    favorite
                      ? "text-amber-500 fill-amber-500"
                      : "text-slate-400"
                  }`}
                />
                <span>{favorite ? "Starred Favorite" : "Mark as Favorite"}</span>
              </div>
            </label>
          </div>
        </form>

        {/* Modal Actions - Fixed at Bottom */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-slate-200 dark:border-zinc-800 shrink-0 bg-slate-50/50 dark:bg-zinc-900/50 rounded-b-2xl">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-xs md:text-sm font-medium rounded-xl text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="keyword-modal-form"
            className="px-5 py-2 text-xs md:text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-xs shadow-blue-500/20 transition-all cursor-pointer"
          >
            {isEditing ? "Save Changes" : "Save Keyword"}
          </button>
        </div>
      </div>
    </div>
  );
}
