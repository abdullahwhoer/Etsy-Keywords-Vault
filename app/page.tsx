"use client";

import React, { useState } from "react";
import { useKeywords } from "@/hooks/useKeywords";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { DashboardView } from "@/components/views/DashboardView";
import { AllKeywordsView } from "@/components/views/AllKeywordsView";
import { FavoritesView } from "@/components/views/FavoritesView";
import { CheckingKeywordsView } from "@/components/views/CheckingKeywordsView";
import { CollectionsView } from "@/components/views/CollectionsView";
import { SettingsView } from "@/components/views/SettingsView";
import { KeywordModal } from "@/components/KeywordModal";
import { DeleteConfirmModal } from "@/components/DeleteConfirmModal";
import { ToastContainer } from "@/components/ui/Toast";
import { FilterDrawer } from "@/components/FilterDrawer";
import { KeywordDetailDrawer } from "@/components/KeywordDetailDrawer";
import { DuplicateWarningModal } from "@/components/DuplicateWarningModal";
import { BulkActionsToolbar } from "@/components/BulkActionsToolbar";
import { BulkEditModal } from "@/components/BulkEditModal";
import { CollectionModal } from "@/components/CollectionModal";
import { ImportModal } from "@/components/ImportModal";
import { MobileBottomNav } from "@/components/MobileBottomNav";

export default function Home() {
  const { activeTab } = useKeywords();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-black text-slate-900 dark:text-white flex">
      {/* Sidebar */}
      <Sidebar
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isSidebarCollapsed ? "md:pl-[72px]" : "md:pl-64"
        }`}
      >
        {/* Top Header */}
        <Header onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)} />

        {/* View Router */}
        <main className="flex-1 p-3.5 sm:p-6 md:p-8 max-w-7xl w-full mx-auto pb-28 md:pb-16">
          {activeTab === "dashboard" && <DashboardView />}
          {activeTab === "all" && <AllKeywordsView />}
          {activeTab === "checking-keywords" && <CheckingKeywordsView />}
          {activeTab === "favorites" && <FavoritesView />}
          {activeTab === "collections" && <CollectionsView />}
          {activeTab === "settings" && <SettingsView />}
        </main>
      </div>

      {/* Mobile Bottom Navigation Dock */}
      <MobileBottomNav />

      {/* Bulk Actions Floating Toolbar */}
      <BulkActionsToolbar />

      {/* Global Drawers, Modals & Notifications */}
      <FilterDrawer />
      <KeywordDetailDrawer />
      <KeywordModal />
      <DeleteConfirmModal />
      <DuplicateWarningModal />
      <CollectionModal />
      <BulkEditModal />
      <ImportModal />
      <ToastContainer />
    </div>
  );
}
