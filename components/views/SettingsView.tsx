"use client";

import React, { useState, useRef } from "react";
import {
  Settings,
  Sun,
  Moon,
  Laptop,
  Database,
  RotateCcw,
  Trash2,
  Check,
  ShieldCheck,
  Download,
  Upload,
  FileSpreadsheet,
  FileCode,
  HardDrive,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useKeywords } from "@/hooks/useKeywords";
import { ThemeMode } from "@/types/theme";
import { STORAGE_KEY } from "@/lib/storage/keyword-storage";
import { formatDate } from "@/lib/utils";
import { parseCsvKeywords, parseJsonBackupFile } from "@/lib/import-export";

export function SettingsView() {
  const { theme, setTheme } = useTheme();
  const {
    keywords,
    collections,
    lastBackupTimestamp,
    handleExportAllJson,
    handleExportAllCsv,
    setImportPreviewData,
    handleResetSampleData,
    handleClearAll,
  } = useKeywords();

  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const themeOptions: { mode: ThemeMode; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      mode: "light",
      label: "Light Mode",
      desc: "Clean high-contrast theme for bright environments",
      icon: <Sun className="w-5 h-5 text-amber-500" />,
    },
    {
      mode: "dark",
      label: "Dark Mode",
      desc: "Sleek low-glare dark theme for long research sessions",
      icon: <Moon className="w-5 h-5 text-blue-400" />,
    },
    {
      mode: "system",
      label: "System Preference",
      desc: "Automatically sync with your operating system settings",
      icon: <Laptop className="w-5 h-5 text-indigo-500" />,
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      if (file.name.endsWith(".json")) {
        const preview = parseJsonBackupFile(text, file.name, keywords);
        setImportPreviewData(preview);
      } else {
        const preview = parseCsvKeywords(text, file.name, keywords);
        setImportPreviewData(preview);
      }
    };

    reader.readAsText(file);
    e.target.value = ""; // Reset file input
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Vault Settings & Backup Center
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your interface theme, export JSON/CSV data backups, and import research files.
        </p>
      </div>

      {/* Backup & Data Center (Requirement 10) */}
      <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Backup & Data Center
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Your data is stored locally in this browser. Export a backup before clearing browser data or moving to another device.
            </p>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 self-start sm:self-auto">
            <Calendar className="w-3.5 h-3.5 text-blue-500" />
            <span>
              Last Backup:{" "}
              <strong>{lastBackupTimestamp ? formatDate(lastBackupTimestamp) : "Never"}</strong>
            </span>
          </div>
        </div>

        {/* Data Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">
              Total Saved Keywords
            </span>
            <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              {keywords.length} records
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">
              Total Collections
            </span>
            <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              {collections.length} folders
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">
              Storage Health
            </span>
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> 100% Client Offline
            </div>
          </div>
        </div>

        {/* Export & Import Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          {/* Export JSON */}
          <button
            type="button"
            onClick={handleExportAllJson}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-xs shadow-blue-500/20 transition-all"
          >
            <FileCode className="w-4 h-4" />
            Export JSON Backup
          </button>

          {/* Export CSV */}
          <button
            type="button"
            onClick={handleExportAllCsv}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors shadow-xs"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
            Export CSV
          </button>

          {/* Import File Button */}
          <div className="w-full sm:w-auto">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".json,.csv"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors shadow-xs"
            >
              <Upload className="w-4 h-4 text-purple-500" />
              Import Backup (JSON/CSV)
            </button>
          </div>
        </div>
      </section>

      {/* Appearance & Theme Section */}
      <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Appearance
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Choose how Etsy Keyword Vault looks to you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {themeOptions.map((opt) => {
            const isSelected = theme === opt.mode;
            return (
              <button
                key={opt.mode}
                type="button"
                onClick={() => setTheme(opt.mode)}
                className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 ring-2 ring-blue-500/20"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 shadow-xs">
                    {opt.icon}
                  </div>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {opt.label}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {opt.desc}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Danger Zone (Requirement 11) */}
      <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-950/60 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Reset or permanently remove all locally stored keyword data.
          </p>
        </div>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleResetSampleData}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-medium border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200 transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-blue-500" />
            Reset to Starter Dataset
          </button>

          {showClearConfirm ? (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="px-3 py-2 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  handleClearAll();
                  setShowClearConfirm(false);
                }}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg text-white bg-rose-600 hover:bg-rose-700"
              >
                Yes, Permanently Clear All Keywords
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-medium border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 hover:bg-rose-100/60 dark:hover:bg-rose-950/40 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear All Keywords
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
