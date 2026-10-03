"use client";

import React, { useState, useEffect } from "react";
import { X, FolderKanban, Sparkles } from "lucide-react";
import { useKeywords } from "@/hooks/useKeywords";
import { CollectionFormData } from "@/types/keyword";

const SUGGESTED_ICONS = ["📁", "🎁", "✨", "🎃", "💍", "🖼️", "👕", "☕", "🧵", "🎨", "📦", "🏷️"];

export function CollectionModal() {
  const {
    isCollectionModalOpen,
    editingCollection,
    closeCollectionModal,
    handleAddCollection,
    handleUpdateCollection,
  } = useKeywords();

  const isEditing = !!editingCollection;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("📁");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingCollection) {
      setName(editingCollection.name);
      setDescription(editingCollection.description || "");
      setIcon(editingCollection.icon || "📁");
    } else {
      setName("");
      setDescription("");
      setIcon("📁");
    }
    setError("");
  }, [editingCollection, isCollectionModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCollectionModalOpen) {
        closeCollectionModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCollectionModalOpen, closeCollectionModal]);

  if (!isCollectionModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Collection name is required.");
      return;
    }

    const data: CollectionFormData = {
      name: name.trim(),
      description: description.trim() || undefined,
      icon,
    };

    if (isEditing && editingCollection) {
      handleUpdateCollection(editingCollection.id, data);
    } else {
      handleAddCollection(data);
    }
    closeCollectionModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-xs">
      <div
        className="relative w-full max-w-md my-auto sm:my-8 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl p-6 transition-all animate-in fade-in zoom-in-95"
        role="dialog"
        aria-modal="true"
        aria-labelledby="collection-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <FolderKanban className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="collection-modal-title"
                className="text-base font-bold text-slate-900 dark:text-white"
              >
                {isEditing ? "Edit Collection" : "Create Collection"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Group and organize related keywords into shop folders.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeCollectionModal}
            aria-label="Close modal"
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {/* Icon picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Folder Icon
            </label>
            <div className="flex items-center gap-1.5 flex-wrap">
              {SUGGESTED_ICONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-base transition-transform ${
                    icon === emoji
                      ? "bg-blue-100 dark:bg-blue-900/60 ring-2 ring-blue-500 scale-110"
                      : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label
              htmlFor="collection-name"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
            >
              Collection Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="collection-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              placeholder="e.g. Wall Art, Halloween PNG, Resume Templates"
              autoFocus
              className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 ${
                error
                  ? "border-rose-500 focus:ring-rose-500/20"
                  : "border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500/20"
              }`}
            />
            {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="collection-desc"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
            >
              Description (Optional)
            </label>
            <textarea
              id="collection-desc"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Keywords related to printable boho wall art & posters."
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={closeCollectionModal}
              className="px-4 py-2 text-xs md:text-sm font-medium rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs md:text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-xs shadow-blue-500/20 transition-all"
            >
              {isEditing ? "Save Changes" : "Create Collection"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
