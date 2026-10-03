"use client";

import React from "react";
import {
  LayoutDashboard,
  KeyRound,
  FileEdit,
  Star,
  FolderKanban,
  Settings,
  Vault,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  UserCheck,
  Sparkles,
} from "lucide-react";
import { useKeywords } from "@/hooks/useKeywords";
import { ActiveNavTab } from "@/types/keyword";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function Sidebar({
  isOpenMobile,
  onCloseMobile,
  isCollapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const { activeTab, setActiveTab, stats, collections } = useKeywords();

  const navItems: {
    id: ActiveNavTab;
    label: string;
    icon: React.ReactNode;
    count?: number;
  }[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      id: "all",
      label: "All Keywords",
      icon: <KeyRound className="w-5 h-5" />,
      count: stats.totalKeywords,
    },
    {
      id: "checking-keywords",
      label: "Checking Keywords",
      icon: <FileEdit className="w-5 h-5 text-blue-500 dark:text-blue-400" />,
    },
    {
      id: "favorites",
      label: "Favorites",
      icon: <Star className="w-5 h-5 text-amber-500 dark:text-amber-400" />,
      count: stats.favorites,
    },
    {
      id: "collections",
      label: "Collections",
      icon: <FolderKanban className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />,
      count: collections.length,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5 text-slate-400" />,
    },
  ];

  const handleNavClick = (tabId: ActiveNavTab) => {
    setActiveTab(tabId);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs md:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-white dark:bg-black border-r border-slate-200 dark:border-zinc-800 transition-all duration-300 md:translate-x-0 select-none",
          isCollapsed ? "w-[72px]" : "w-64",
          isOpenMobile ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Brand Header */}
        <div
          className={cn(
            "flex items-center justify-between h-16 px-4 border-b border-slate-200 dark:border-zinc-800 shrink-0",
            isCollapsed && "px-2 justify-center"
          )}
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-xs shrink-0">
              <Vault className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <div className="truncate">
                <h1 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white leading-tight truncate">
                  Etsy Keyword Vault
                </h1>
                <p className="text-[10px] font-medium text-slate-500 dark:text-zinc-400 truncate">
                  Research & Analytics
                </p>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle (when expanded) */}
          {onToggleCollapse && !isOpenMobile && !isCollapsed && (
            <button
              type="button"
              onClick={onToggleCollapse}
              title="Collapse sidebar"
              className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          )}

          {/* Mobile close button */}
          <button
            onClick={onCloseMobile}
            aria-label="Close sidebar"
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Collapsed Expand Toggle (when in mini mode) */}
        {isCollapsed && onToggleCollapse && (
          <div className="hidden md:flex items-center justify-center py-2 shrink-0 border-b border-slate-100 dark:border-zinc-800/60">
            <button
              type="button"
              onClick={onToggleCollapse}
              title="Expand sidebar"
              className="p-2 rounded-xl text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <PanelLeftOpen className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Navigation List */}
        <div className="flex-1 px-2.5 py-3 space-y-1 overflow-y-auto overflow-x-hidden">
          {!isCollapsed && (
            <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
              Workspace
            </div>
          )}

          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <div key={item.id} className="w-full flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    title={isCollapsed ? item.label : undefined}
                    className={cn(
                      "flex items-center rounded-xl transition-all text-left group",
                      isCollapsed
                        ? "w-11 h-11 justify-center p-0"
                        : "w-full gap-3 px-3 py-2.5 text-sm font-medium",
                      isActive
                        ? "bg-blue-50 text-blue-700 dark:bg-zinc-800 dark:text-blue-400 font-semibold shadow-xs ring-1 ring-blue-500/20 dark:ring-blue-400/20"
                        : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-900"
                    )}
                  >
                    <span
                      className={cn(
                        "shrink-0 transition-colors",
                        isActive
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-slate-400 dark:text-zinc-400 group-hover:text-slate-700 dark:group-hover:text-zinc-200"
                      )}
                    >
                      {item.icon}
                    </span>

                    {!isCollapsed && (
                      <div className="flex-1 flex items-center justify-between min-w-0">
                        <span className="truncate">{item.label}</span>
                        {typeof item.count === "number" && (
                          <span
                            className={cn(
                              "px-2 py-0.5 text-xs rounded-full font-medium transition-colors ml-2",
                              isActive
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                                : "bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-400"
                            )}
                          >
                            {item.count}
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom User Signature Profile */}
        <div className="p-2.5 border-t border-slate-200 dark:border-zinc-800 shrink-0 bg-slate-50/50 dark:bg-zinc-950">
          {isCollapsed ? (
            <div className="flex justify-center" title="Abdullah Saqib (Pro Seller)">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-xs ring-2 ring-blue-500/20 dark:ring-blue-400/20">
                <UserCheck className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-black" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-2xs">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-xs shrink-0">
                <UserCheck className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-black" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    Abdullah Saqib
                  </span>
                  <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />
                </div>
                <div className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Etsy Vault Pro
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
