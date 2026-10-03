"use client";

import React, { useState } from "react";
import {
  FolderKanban,
  Plus,
  Edit2,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { useKeywords } from "@/hooks/useKeywords";
import { Collection } from "@/types/keyword";
import { formatDate } from "@/lib/utils";

export function CollectionsView() {
  const {
    collections,
    keywords,
    openCreateCollectionModal,
    openEditCollectionModal,
    handleDeleteCollection,
    setFilterField,
    setActiveTab,
  } = useKeywords();

  const [deletingCol, setDeletingCol] = useState<Collection | null>(null);

  // Map collectionId -> keyword count
  const collectionCounts = keywords.reduce((acc, kw) => {
    if (kw.collectionId) {
      acc[kw.collectionId] = (acc[kw.collectionId] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const unassignedCount = keywords.filter((k) => !k.collectionId).length;

  const handleFilterCollection = (collectionId: string) => {
    setFilterField("collection", collectionId);
    setActiveTab("all");
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Collections
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20">
              {collections.length} {collections.length === 1 ? "Folder" : "Folders"}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-0.5 sm:mt-1">
            Group, organize, and manage themed Etsy keyword folders for product lines and campaigns.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateCollectionModal}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs shadow-blue-500/20 hover:shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create Collection</span>
        </button>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {collections.map((col) => {
          const count = collectionCounts[col.id] || 0;
          return (
            <div
              key={col.id}
              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200/50 dark:border-blue-900/40 flex items-center justify-center text-xl shadow-2xs shrink-0">
                      {col.icon || "📁"}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                        {col.name}
                      </h3>
                      <span className="text-[11px] text-slate-400 dark:text-zinc-500 block truncate">
                        Created {formatDate(col.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-0.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => openEditCollectionModal(col)}
                      title="Edit Collection"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-zinc-800"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeletingCol(col)}
                      title="Delete Collection"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-zinc-800"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-2.5 line-clamp-2 leading-relaxed">
                  {col.description || "No description provided for this collection."}
                </p>
              </div>

              {/* Bottom footer with count & view button */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                  {count} {count === 1 ? "Keyword" : "Keywords"}
                </span>

                <button
                  type="button"
                  onClick={() => handleFilterCollection(col.id)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  <span>View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}

        {/* Uncategorized Card */}
        {unassignedCount > 0 && (
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-zinc-900/50 border border-dashed border-slate-300 dark:border-zinc-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-slate-200/60 dark:bg-zinc-800 flex items-center justify-center text-slate-500 shrink-0">
                  <FolderKanban className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-700 dark:text-zinc-300">
                    Uncategorized Keywords
                  </h3>
                  <span className="text-[11px] text-slate-400 dark:text-zinc-500">
                    Keywords without a folder
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-2.5 leading-relaxed">
                Keywords that haven&apos;t been assigned to a specific campaign or collection yet.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-zinc-800/80 flex items-center justify-between">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-200/80 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                {unassignedCount} Keywords
              </span>

              <button
                type="button"
                onClick={() => {
                  setFilterField("collection", "");
                  setActiveTab("all");
                }}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                <span>View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Collection Confirm Modal */}
      {deletingCol && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl p-5 sm:p-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Delete Collection &ldquo;{deletingCol.name}&rdquo;?
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-2 leading-relaxed">
              Keywords assigned to this collection will remain in your vault as uncategorized.
            </p>

            <div className="mt-5 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeletingCol(null)}
                className="px-4 py-2 text-xs font-medium rounded-xl text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDeleteCollection(deletingCol.id, true);
                  setDeletingCol(null);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-xl text-white bg-rose-600 hover:bg-rose-700 cursor-pointer"
              >
                Delete Collection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
