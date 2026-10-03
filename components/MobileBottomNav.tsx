"use client";

import React from "react";
import {
  LayoutDashboard,
  KeyRound,
  FileEdit,
  Star,
  FolderKanban,
  Plus,
} from "lucide-react";
import { useKeywords } from "@/hooks/useKeywords";
import { ActiveNavTab } from "@/types/keyword";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const { activeTab, setActiveTab, stats, openAddModal } = useKeywords();

  const navItems: {
    id: ActiveNavTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    count?: number;
  }[] = [
    {
      id: "dashboard",
      label: "Vault",
      icon: LayoutDashboard,
    },
    {
      id: "all",
      label: "Keywords",
      icon: KeyRound,
      count: stats.totalKeywords,
    },
    {
      id: "checking-keywords",
      label: "Notepad",
      icon: FileEdit,
    },
    {
      id: "favorites",
      label: "Favorites",
      icon: Star,
      count: stats.favorites,
    },
    {
      id: "collections",
      label: "Folders",
      icon: FolderKanban,
    },
  ];

  return (
    <nav
      aria-label="Mobile navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-lg border-t border-slate-200/90 dark:border-zinc-800/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.4)] px-2 py-1.5 safe-area-pb"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 min-w-[54px]",
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100"
              )}
            >
              <div className="relative">
                <Icon
                  className={cn(
                    "w-5 h-5 transition-transform duration-200",
                    isActive ? "scale-110" : "scale-100"
                  )}
                />
                {typeof item.count === "number" && item.count > 0 && (
                  <span className="absolute -top-1.5 -right-2 px-1 min-w-[14px] h-3.5 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                    {item.count > 99 ? "99+" : item.count}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight leading-none">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0.5 w-4 h-0.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              )}
            </button>
          );
        })}

        {/* Quick Add Floating Trigger on Mobile */}
        <button
          type="button"
          onClick={openAddModal}
          aria-label="Add keyword"
          className="flex flex-col items-center justify-center p-2 rounded-xl bg-blue-600 active:bg-blue-700 text-white shadow-md shadow-blue-500/30 transition-transform active:scale-95"
        >
          <Plus className="w-5 h-5" />
          <span className="sr-only">Add Keyword</span>
        </button>
      </div>
    </nav>
  );
}
