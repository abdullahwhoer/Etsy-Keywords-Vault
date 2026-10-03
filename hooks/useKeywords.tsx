"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import {
  Keyword,
  KeywordFormData,
  Collection,
  CollectionFormData,
  KeywordStats,
  ActiveNavTab,
  FilterState,
  SortOption,
  KeywordPriority,
  KeywordType,
  ProductType,
  KeywordLanguage,
  BulkActionType,
  ImportPreviewData,
} from "@/types/keyword";
import * as storage from "@/lib/storage/keyword-storage";
import { calculateKeywordStats } from "@/lib/metrics/stats-calculator";
import {
  calculateOpportunity,
} from "@/config/thresholds";
import {
  exportKeywordsToCsv,
  generateJsonBackup,
  downloadFile,
} from "@/lib/import-export";

interface ToastState {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

interface DuplicateWarningState {
  pendingData: KeywordFormData;
  existingKeyword: Keyword;
  isEditingId?: string;
}

interface KeywordContextType {
  keywords: Keyword[];
  collections: Collection[];
  isLoaded: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: ActiveNavTab;
  setActiveTab: (tab: ActiveNavTab) => void;
  stats: KeywordStats;
  filteredKeywords: Keyword[];
  lastBackupTimestamp: string | null;

  // Pro Mode vs Simple Mode
  isProMode: boolean;
  setIsProMode: (val: boolean) => void;
  toggleProMode: () => void;

  // Single Keyword CRUD
  handleAddKeyword: (data: KeywordFormData, allowDuplicate?: boolean) => Keyword | null;
  handleUpdateKeyword: (id: string, data: Partial<KeywordFormData>) => Keyword | null;
  handleDeleteKeyword: (id: string) => boolean;
  handleDuplicateKeyword: (id: string) => Keyword | null;
  handleToggleFavorite: (id: string) => void;
  handleQuickProductTypeChange: (id: string, productType: ProductType) => void;
  handleResetSampleData: () => void;
  handleClearAll: () => void;

  // Collection CRUD
  handleAddCollection: (data: CollectionFormData) => Collection;
  handleUpdateCollection: (id: string, data: Partial<CollectionFormData>) => Collection | null;
  handleDeleteCollection: (id: string, unassignKeywords?: boolean) => boolean;

  // Bulk Selection & Actions
  selectedKeywordIds: Set<string>;
  toggleSelectKeyword: (id: string) => void;
  selectAllFilteredKeywords: () => void;
  deselectAllKeywords: () => void;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  bulkActionModal: BulkActionType | null;
  openBulkActionModal: (type: BulkActionType) => void;
  closeBulkActionModal: () => void;
  handleExecuteBulkAction: (type: BulkActionType, value: unknown) => void;
  handleExportSelectedCsv: () => void;
  handleExportSelectedJson: () => void;

  // Import / Export / Backup
  handleExportAllCsv: () => void;
  handleExportAllJson: () => void;
  importPreviewData: ImportPreviewData | null;
  setImportPreviewData: (data: ImportPreviewData | null) => void;
  closeImportModal: () => void;
  handleConfirmImport: (includeDuplicates: boolean) => void;

  // Filter & Sort State
  filters: FilterState;
  setFilterField: <K extends keyof FilterState>(field: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  activeFilterCount: number;
  sortOption: SortOption;
  setSortOption: (sort: SortOption) => void;

  // Drawer / Modal States
  isFilterDrawerOpen: boolean;
  openFilterDrawer: () => void;
  closeFilterDrawer: () => void;

  isAddModalOpen: boolean;
  openAddModal: () => void;
  closeAddModal: () => void;
  editingKeyword: Keyword | null;
  openEditModal: (keyword: Keyword) => void;
  closeEditModal: () => void;

  isCollectionModalOpen: boolean;
  editingCollection: Collection | null;
  openCreateCollectionModal: () => void;
  openEditCollectionModal: (col: Collection) => void;
  closeCollectionModal: () => void;

  selectedDetailKeyword: Keyword | null;
  openDetailDrawer: (keyword: Keyword) => void;
  closeDetailDrawer: () => void;

  deletingKeyword: Keyword | null;
  openDeleteConfirm: (keyword: Keyword) => void;
  closeDeleteConfirm: () => void;
  confirmDelete: () => void;

  // Duplicate Warning Modal
  duplicateWarning: DuplicateWarningState | null;
  closeDuplicateWarning: () => void;
  confirmSaveAnyway: () => void;
  confirmUpdateExisting: () => void;
  confirmViewExisting: () => void;

  // Toast notifications
  toast: ToastState | null;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  hideToast: () => void;
}

const KeywordContext = createContext<KeywordContextType | undefined>(undefined);

export function KeywordProvider({ children }: { children: React.ReactNode }) {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<ActiveNavTab>("dashboard");
  const [toast, setToast] = useState<ToastState | null>(null);
  const [lastBackupTimestamp, setLastBackupTimestamp] = useState<string | null>(null);
  const [isProMode, setIsProModeState] = useState<boolean>(true);

  // Filters & Sort State with persistence
  const [filters, setFiltersState] = useState<FilterState>(storage.DEFAULT_FILTERS);
  const [sortOption, setSortOptionState] = useState<SortOption>(storage.DEFAULT_SORT);

  // Bulk Selection
  const [selectedKeywordIds, setSelectedKeywordIds] = useState<Set<string>>(new Set());
  const [bulkActionModal, setBulkActionModal] = useState<BulkActionType | null>(null);

  // Import preview state
  const [importPreviewData, setImportPreviewData] = useState<ImportPreviewData | null>(null);

  // Modal / Drawer states
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingKeyword, setEditingKeyword] = useState<Keyword | null>(null);

  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);

  const [selectedDetailKeyword, setSelectedDetailKeyword] = useState<Keyword | null>(null);
  const [deletingKeyword, setDeletingKeyword] = useState<Keyword | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState<DuplicateWarningState | null>(null);

  // Load on mount
  useEffect(() => {
    const loadedKeywords = storage.getKeywords();
    const loadedCollections = storage.getCollections();
    const loadedFilters = storage.getStoredFilters();
    const loadedSort = storage.getStoredSort();
    const backupTime = storage.getLastBackupTimestamp();

    if (typeof window !== "undefined") {
      const storedProMode = localStorage.getItem("etsy-vault-pro-mode");
      if (storedProMode !== null) {
        setIsProModeState(storedProMode === "true");
      }
    }

    setKeywords(loadedKeywords);
    setCollections(loadedCollections);
    setFiltersState(loadedFilters);
    setSortOptionState(loadedSort);
    setLastBackupTimestamp(backupTime);
    setIsLoaded(true);
  }, []);

  const setIsProMode = useCallback((val: boolean) => {
    setIsProModeState(val);
    if (typeof window !== "undefined") {
      localStorage.setItem("etsy-vault-pro-mode", String(val));
    }
  }, []);

  const toggleProMode = useCallback(() => {
    setIsProModeState((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("etsy-vault-pro-mode", String(next));
      }
      return next;
    });
  }, []);

  const showToast = useCallback(
    (message: string, type: "success" | "error" | "info" = "success") => {
      const id = Date.now();
      setToast({ id, message, type });
    },
    []
  );

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Save filter state to storage on change
  const setFilterField = useCallback(
    <K extends keyof FilterState>(field: K, value: FilterState[K]) => {
      setFiltersState((prev) => {
        const next = { ...prev, [field]: value };
        storage.saveStoredFilters(next);
        return next;
      });
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFiltersState(storage.DEFAULT_FILTERS);
    storage.saveStoredFilters(storage.DEFAULT_FILTERS);
    showToast("Filters reset to default.", "info");
  }, [showToast]);

  const setSortOption = useCallback(
    (sort: SortOption) => {
      setSortOptionState(sort);
      storage.saveStoredSort(sort);
    },
    []
  );

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.volumeRange !== "all") count++;
    if (filters.competitionRange !== "all") count++;
    if (filters.priority !== "all") count++;
    if (filters.type !== "all") count++;
    if (filters.productType !== "all") count++;
    if (filters.language !== "all") count++;
    if (filters.favoritesOnly) count++;
    if (filters.collection !== "all") count++;
    return count;
  }, [filters]);

  const stats = useMemo(() => calculateKeywordStats(keywords), [keywords]);

  // Filter & Sort Pipeline
  const filteredKeywords = useMemo(() => {
    let list = [...keywords];

    if (activeTab === "favorites") {
      list = list.filter((k) => k.favorite);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (k) =>
          k.keyword.toLowerCase().includes(q) ||
          (k.notes && k.notes.toLowerCase().includes(q)) ||
          k.type.toLowerCase().includes(q) ||
          k.priority.toLowerCase().includes(q) ||
          (k.productType && k.productType.toLowerCase().includes(q)) ||
          (k.language && k.language.toLowerCase().includes(q)) ||
          (k.collectionId && k.collectionId.toLowerCase().includes(q))
      );
    }

    if (filters.volumeRange !== "all") {
      if (filters.volumeRange === "1000+") {
        list = list.filter((k) => k.searchVolume >= 1000);
      } else if (filters.volumeRange === "800-999") {
        list = list.filter((k) => k.searchVolume >= 800 && k.searchVolume <= 999);
      } else if (filters.volumeRange === "400-799") {
        list = list.filter((k) => k.searchVolume >= 400 && k.searchVolume <= 799);
      } else if (filters.volumeRange === "0-399") {
        list = list.filter((k) => k.searchVolume >= 0 && k.searchVolume <= 399);
      }
    }

    if (filters.competitionRange !== "all") {
      if (filters.competitionRange === "0-4999") {
        list = list.filter((k) => k.competition < 5000);
      } else if (filters.competitionRange === "5000-8000") {
        list = list.filter((k) => k.competition >= 5000 && k.competition <= 8000);
      } else if (filters.competitionRange === "8000+") {
        list = list.filter((k) => k.competition > 8000);
      }
    }

    if (filters.priority !== "all") {
      list = list.filter((k) => k.priority === filters.priority);
    }

    if (filters.type !== "all") {
      list = list.filter((k) => k.type === filters.type);
    }

    if (filters.productType !== "all") {
      list = list.filter((k) => k.productType === filters.productType);
    }

    if (filters.language !== "all") {
      list = list.filter((k) => k.language === filters.language);
    }

    if (filters.favoritesOnly) {
      list = list.filter((k) => k.favorite);
    }

    if (filters.collection !== "all") {
      list = list.filter(
        (k) =>
          k.collectionId === filters.collection ||
          (k.collectionId &&
            collections.find((c) => c.id === k.collectionId)?.name.toLowerCase() ===
              filters.collection.toLowerCase())
      );
    }

    list.sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "alpha-asc":
          return a.keyword.localeCompare(b.keyword);
        case "alpha-desc":
          return b.keyword.localeCompare(a.keyword);
        case "volume-desc":
          return b.searchVolume - a.searchVolume;
        case "volume-asc":
          return a.searchVolume - b.searchVolume;
        case "competition-desc":
          return b.competition - a.competition;
        case "competition-asc":
          return a.competition - b.competition;
        case "opportunity-desc": {
          const oppA = calculateOpportunity(a.searchVolume, a.competition).ratio;
          const oppB = calculateOpportunity(b.searchVolume, b.competition).ratio;
          return oppB - oppA;
        }
        default:
          return 0;
      }
    });

    return list;
  }, [keywords, collections, activeTab, searchQuery, filters, sortOption]);

  // Bulk Selection Helpers
  const toggleSelectKeyword = useCallback((id: string) => {
    setSelectedKeywordIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectAllFilteredKeywords = useCallback(() => {
    const allIds = new Set(filteredKeywords.map((k) => k.id));
    setSelectedKeywordIds(allIds);
  }, [filteredKeywords]);

  const deselectAllKeywords = useCallback(() => {
    setSelectedKeywordIds(new Set());
  }, []);

  const isAllSelected =
    filteredKeywords.length > 0 &&
    filteredKeywords.every((k) => selectedKeywordIds.has(k.id));

  const isIndeterminate =
    selectedKeywordIds.size > 0 &&
    !isAllSelected &&
    filteredKeywords.some((k) => selectedKeywordIds.has(k.id));

  // Single Keyword CRUD
  const handleAddKeyword = useCallback(
    (data: KeywordFormData, allowDuplicate: boolean = false): Keyword | null => {
      if (!allowDuplicate) {
        const existing = storage.findDuplicateKeyword(data.keyword);
        if (existing) {
          setDuplicateWarning({
            pendingData: data,
            existingKeyword: existing,
          });
          return null;
        }
      }

      const newKeyword = storage.addKeyword(data);
      setKeywords(storage.getKeywords());
      showToast("Keyword saved successfully.", "success");
      return newKeyword;
    },
    [showToast]
  );

  const handleUpdateKeyword = useCallback(
    (id: string, data: Partial<KeywordFormData>): Keyword | null => {
      if (data.keyword) {
        const existing = storage.findDuplicateKeyword(data.keyword, id);
        if (existing) {
          setDuplicateWarning({
            pendingData: {
              keyword: data.keyword,
              searchVolume: data.searchVolume ?? 0,
              competition: data.competition ?? 0,
              priority: data.priority ?? "Normal",
              type: data.type ?? "Evergreen",
              productType: data.productType ?? "Digital",
              language: data.language ?? "English",
              favorite: data.favorite ?? false,
              notes: data.notes,
              collectionId: data.collectionId,
            },
            existingKeyword: existing,
            isEditingId: id,
          });
          return null;
        }
      }

      const updated = storage.updateKeyword(id, data);
      if (updated) {
        setKeywords(storage.getKeywords());
        if (selectedDetailKeyword && selectedDetailKeyword.id === id) {
          setSelectedDetailKeyword(updated);
        }
        showToast("Keyword updated successfully.", "success");
      }
      return updated;
    },
    [showToast, selectedDetailKeyword]
  );

  const handleDeleteKeyword = useCallback(
    (id: string): boolean => {
      const success = storage.deleteKeyword(id);
      if (success) {
        setKeywords(storage.getKeywords());
        setSelectedKeywordIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        if (selectedDetailKeyword && selectedDetailKeyword.id === id) {
          setSelectedDetailKeyword(null);
        }
        showToast("Keyword deleted.", "info");
      }
      return success;
    },
    [showToast, selectedDetailKeyword]
  );

  const handleDuplicateKeyword = useCallback(
    (id: string): Keyword | null => {
      const copy = storage.duplicateKeyword(id);
      if (copy) {
        setKeywords(storage.getKeywords());
        showToast(`Duplicated keyword: "${copy.keyword}"`, "success");
      }
      return copy;
    },
    [showToast]
  );

  const handleToggleFavorite = useCallback(
    (id: string) => {
      const updated = storage.toggleFavorite(id);
      if (updated) {
        setKeywords(storage.getKeywords());
        if (selectedDetailKeyword && selectedDetailKeyword.id === id) {
          setSelectedDetailKeyword(updated);
        }
        showToast(
          updated.favorite ? "Added to favorites." : "Removed from favorites.",
          "info"
        );
      }
    },
    [showToast, selectedDetailKeyword]
  );

  const handleQuickProductTypeChange = useCallback(
    (id: string, productType: ProductType) => {
      const updated = storage.updateKeyword(id, { productType });
      if (updated) {
        setKeywords(storage.getKeywords());
        if (selectedDetailKeyword && selectedDetailKeyword.id === id) {
          setSelectedDetailKeyword(updated);
        }
        showToast(`Product type updated to "${productType}".`, "success");
      }
    },
    [showToast, selectedDetailKeyword]
  );

  // Collections CRUD
  const handleAddCollection = useCallback(
    (data: CollectionFormData): Collection => {
      const created = storage.addCollection(data);
      setCollections(storage.getCollections());
      showToast(`Collection "${created.name}" created.`, "success");
      return created;
    },
    [showToast]
  );

  const handleUpdateCollection = useCallback(
    (id: string, data: Partial<CollectionFormData>): Collection | null => {
      const updated = storage.updateCollection(id, data);
      if (updated) {
        setCollections(storage.getCollections());
        showToast(`Collection "${updated.name}" updated.`, "success");
      }
      return updated;
    },
    [showToast]
  );

  const handleDeleteCollection = useCallback(
    (id: string, unassignKeywords: boolean = true): boolean => {
      const success = storage.deleteCollection(id, unassignKeywords);
      if (success) {
        setCollections(storage.getCollections());
        setKeywords(storage.getKeywords());
        showToast("Collection deleted.", "info");
      }
      return success;
    },
    [showToast]
  );

  // Bulk Actions
  const openBulkActionModal = useCallback((type: BulkActionType) => {
    setBulkActionModal(type);
  }, []);

  const closeBulkActionModal = useCallback(() => {
    setBulkActionModal(null);
  }, []);

  const handleExecuteBulkAction = useCallback(
    (type: BulkActionType, value: unknown) => {
      const ids = Array.from(selectedKeywordIds);
      if (ids.length === 0) return;

      if (type === "delete") {
        const count = storage.bulkDeleteKeywords(ids);
        setKeywords(storage.getKeywords());
        setSelectedKeywordIds(new Set());
        showToast(`Deleted ${count} keywords.`, "info");
      } else if (type === "priority") {
        const count = storage.bulkUpdateKeywords(ids, {
          priority: value as KeywordPriority,
        });
        setKeywords(storage.getKeywords());
        setSelectedKeywordIds(new Set());
        showToast(`Updated priority for ${count} keywords.`, "success");
      } else if (type === "type") {
        const count = storage.bulkUpdateKeywords(ids, {
          type: value as KeywordType,
        });
        setKeywords(storage.getKeywords());
        setSelectedKeywordIds(new Set());
        showToast(`Updated niche classification for ${count} keywords.`, "success");
      } else if (type === "productType") {
        const count = storage.bulkUpdateKeywords(ids, {
          productType: value as ProductType,
        });
        setKeywords(storage.getKeywords());
        setSelectedKeywordIds(new Set());
        showToast(`Updated product type to "${value}" for ${count} keywords.`, "success");
      } else if (type === "language") {
        const count = storage.bulkUpdateKeywords(ids, {
          language: value as KeywordLanguage,
        });
        setKeywords(storage.getKeywords());
        setSelectedKeywordIds(new Set());
        showToast(`Updated language to "${value}" for ${count} keywords.`, "success");
      } else if (type === "collection") {
        const count = storage.bulkUpdateKeywords(ids, {
          collectionId: (value as string) || undefined,
        });
        setKeywords(storage.getKeywords());
        setSelectedKeywordIds(new Set());
        showToast(`Updated collection for ${count} keywords.`, "success");
      } else if (type === "favorite-add") {
        const count = storage.bulkUpdateKeywords(ids, { favorite: true });
        setKeywords(storage.getKeywords());
        setSelectedKeywordIds(new Set());
        showToast(`Added ${count} keywords to favorites.`, "success");
      } else if (type === "favorite-remove") {
        const count = storage.bulkUpdateKeywords(ids, { favorite: false });
        setKeywords(storage.getKeywords());
        setSelectedKeywordIds(new Set());
        showToast(`Removed ${count} keywords from favorites.`, "info");
      }

      setBulkActionModal(null);
    },
    [selectedKeywordIds, showToast]
  );

  // Export Selected
  const handleExportSelectedCsv = useCallback(() => {
    const selectedList = keywords.filter((k) => selectedKeywordIds.has(k.id));
    if (selectedList.length === 0) return;

    const csvContent = exportKeywordsToCsv(selectedList, collections);
    const dateStr = new Date().toISOString().split("T")[0];
    downloadFile(csvContent, `etsy-keywords-selected-${dateStr}.csv`, "text/csv;charset=utf-8;");
    showToast(`Exported ${selectedList.length} keywords to CSV.`, "success");
  }, [keywords, selectedKeywordIds, collections, showToast]);

  const handleExportSelectedJson = useCallback(() => {
    const selectedList = keywords.filter((k) => selectedKeywordIds.has(k.id));
    if (selectedList.length === 0) return;

    const jsonContent = generateJsonBackup(selectedList, collections);
    const dateStr = new Date().toISOString().split("T")[0];
    downloadFile(
      jsonContent,
      `etsy-keywords-selected-${dateStr}.json`,
      "application/json;charset=utf-8;"
    );
    showToast(`Exported ${selectedList.length} keywords to JSON.`, "success");
  }, [keywords, selectedKeywordIds, collections, showToast]);

  // Export All
  const handleExportAllCsv = useCallback(() => {
    if (keywords.length === 0) {
      showToast("No keywords to export.", "info");
      return;
    }
    const csvContent = exportKeywordsToCsv(keywords, collections);
    const dateStr = new Date().toISOString().split("T")[0];
    downloadFile(csvContent, `etsy-keyword-vault-all-${dateStr}.csv`, "text/csv;charset=utf-8;");
    const backupTime = storage.recordBackupTimestamp();
    setLastBackupTimestamp(backupTime);
    showToast(`Exported ${keywords.length} keywords to CSV.`, "success");
  }, [keywords, collections, showToast]);

  const handleExportAllJson = useCallback(() => {
    if (keywords.length === 0 && collections.length === 0) {
      showToast("Vault is empty.", "info");
      return;
    }
    const jsonContent = generateJsonBackup(keywords, collections);
    const dateStr = new Date().toISOString().split("T")[0];
    downloadFile(
      jsonContent,
      `etsy-keyword-vault-backup-${dateStr}.json`,
      "application/json;charset=utf-8;"
    );
    const backupTime = storage.recordBackupTimestamp();
    setLastBackupTimestamp(backupTime);
    showToast(`Exported complete vault JSON backup.`, "success");
  }, [keywords, collections, showToast]);

  // Import Confirmation
  const closeImportModal = useCallback(() => {
    setImportPreviewData(null);
  }, []);

  const handleConfirmImport = useCallback(
    (includeDuplicates: boolean) => {
      if (!importPreviewData) return;

      const itemsToImport = includeDuplicates
        ? [...importPreviewData.validKeywords, ...importPreviewData.duplicateKeywords]
        : importPreviewData.validKeywords;

      const importedKws = storage.importBatchKeywords(itemsToImport);
      const importedCols = storage.importBatchCollections(
        importPreviewData.collectionsFound
      );

      setKeywords(storage.getKeywords());
      setCollections(storage.getCollections());
      setImportPreviewData(null);

      showToast(
        `Successfully imported ${importedKws} keywords and ${importedCols} collections.`,
        "success"
      );
    },
    [importPreviewData, showToast]
  );

  const handleResetSampleData = useCallback(() => {
    const samples = storage.resetToSampleData();
    setKeywords(samples.keywords);
    setCollections(samples.collections);
    setSelectedKeywordIds(new Set());
    showToast("Reset to sample keyword vault & collections.", "success");
  }, [showToast]);

  const handleClearAll = useCallback(() => {
    const empty = storage.clearAllKeywords();
    setKeywords(empty);
    setSelectedKeywordIds(new Set());
    setSelectedDetailKeyword(null);
    showToast("Cleared all keywords.", "info");
  }, [showToast]);

  // Drawer / Modal triggers
  const openFilterDrawer = useCallback(() => setIsFilterDrawerOpen(true), []);
  const closeFilterDrawer = useCallback(() => setIsFilterDrawerOpen(false), []);

  const openAddModal = useCallback(() => {
    setEditingKeyword(null);
    setIsAddModalOpen(true);
  }, []);
  const closeAddModal = useCallback(() => setIsAddModalOpen(false), []);

  const openEditModal = useCallback((keyword: Keyword) => {
    setEditingKeyword(keyword);
    setIsAddModalOpen(true);
  }, []);
  const closeEditModal = useCallback(() => {
    setEditingKeyword(null);
    setIsAddModalOpen(false);
  }, []);

  const openCreateCollectionModal = useCallback(() => {
    setEditingCollection(null);
    setIsCollectionModalOpen(true);
  }, []);

  const openEditCollectionModal = useCallback((col: Collection) => {
    setEditingCollection(col);
    setIsCollectionModalOpen(true);
  }, []);

  const closeCollectionModal = useCallback(() => {
    setEditingCollection(null);
    setIsCollectionModalOpen(false);
  }, []);

  const openDetailDrawer = useCallback((keyword: Keyword) => {
    setSelectedDetailKeyword(keyword);
  }, []);
  const closeDetailDrawer = useCallback(() => {
    setSelectedDetailKeyword(null);
  }, []);

  const openDeleteConfirm = useCallback((keyword: Keyword) => {
    setDeletingKeyword(keyword);
  }, []);
  const closeDeleteConfirm = useCallback(() => {
    setDeletingKeyword(null);
  }, []);

  const confirmDelete = useCallback(() => {
    if (deletingKeyword) {
      handleDeleteKeyword(deletingKeyword.id);
      setDeletingKeyword(null);
    }
  }, [deletingKeyword, handleDeleteKeyword]);

  // Duplicate Warning Handlers
  const closeDuplicateWarning = useCallback(() => {
    setDuplicateWarning(null);
  }, []);

  const confirmSaveAnyway = useCallback(() => {
    if (duplicateWarning) {
      if (duplicateWarning.isEditingId) {
        storage.updateKeyword(duplicateWarning.isEditingId, duplicateWarning.pendingData);
        setKeywords(storage.getKeywords());
        showToast("Keyword updated successfully.", "success");
      } else {
        storage.addKeyword(duplicateWarning.pendingData);
        setKeywords(storage.getKeywords());
        showToast("Keyword saved successfully.", "success");
      }
      setDuplicateWarning(null);
      setIsAddModalOpen(false);
    }
  }, [duplicateWarning, showToast]);

  const confirmUpdateExisting = useCallback(() => {
    if (duplicateWarning) {
      const existingId = duplicateWarning.existingKeyword.id;
      storage.updateKeyword(existingId, duplicateWarning.pendingData);
      setKeywords(storage.getKeywords());
      showToast(
        `Updated existing keyword: "${duplicateWarning.existingKeyword.keyword}"`,
        "success"
      );
      setDuplicateWarning(null);
      setIsAddModalOpen(false);
    }
  }, [duplicateWarning, showToast]);

  const confirmViewExisting = useCallback(() => {
    if (duplicateWarning) {
      setSelectedDetailKeyword(duplicateWarning.existingKeyword);
      setDuplicateWarning(null);
      setIsAddModalOpen(false);
    }
  }, [duplicateWarning]);

  return (
    <KeywordContext.Provider
      value={{
        keywords,
        collections,
        isLoaded,
        searchQuery,
        setSearchQuery,
        activeTab,
        setActiveTab,
        stats,
        filteredKeywords,
        lastBackupTimestamp,

        isProMode,
        setIsProMode,
        toggleProMode,

        handleAddKeyword,
        handleUpdateKeyword,
        handleDeleteKeyword,
        handleDuplicateKeyword,
        handleToggleFavorite,
        handleQuickProductTypeChange,
        handleResetSampleData,
        handleClearAll,

        handleAddCollection,
        handleUpdateCollection,
        handleDeleteCollection,

        selectedKeywordIds,
        toggleSelectKeyword,
        selectAllFilteredKeywords,
        deselectAllKeywords,
        isAllSelected,
        isIndeterminate,
        bulkActionModal,
        openBulkActionModal,
        closeBulkActionModal,
        handleExecuteBulkAction,
        handleExportSelectedCsv,
        handleExportSelectedJson,

        handleExportAllCsv,
        handleExportAllJson,
        importPreviewData,
        setImportPreviewData,
        closeImportModal,
        handleConfirmImport,

        filters,
        setFilterField,
        resetFilters,
        activeFilterCount,
        sortOption,
        setSortOption,

        isFilterDrawerOpen,
        openFilterDrawer,
        closeFilterDrawer,

        isAddModalOpen,
        openAddModal,
        closeAddModal,
        editingKeyword,
        openEditModal,
        closeEditModal,

        isCollectionModalOpen,
        editingCollection,
        openCreateCollectionModal,
        openEditCollectionModal,
        closeCollectionModal,

        selectedDetailKeyword,
        openDetailDrawer,
        closeDetailDrawer,

        deletingKeyword,
        openDeleteConfirm,
        closeDeleteConfirm,
        confirmDelete,

        duplicateWarning,
        closeDuplicateWarning,
        confirmSaveAnyway,
        confirmUpdateExisting,
        confirmViewExisting,

        toast,
        showToast,
        hideToast,
      }}
    >
      {children}
    </KeywordContext.Provider>
  );
}

export function useKeywords() {
  const context = useContext(KeywordContext);
  if (!context) {
    throw new Error("useKeywords must be used within a KeywordProvider");
  }
  return context;
}
