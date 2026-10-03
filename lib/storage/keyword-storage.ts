import {
  Keyword,
  KeywordFormData,
  Collection,
  CollectionFormData,
  FilterState,
  SortOption,
} from "@/types/keyword";
import { normalizeKeyword } from "@/lib/utils";

export const STORAGE_KEY = "etsy-keyword-vault-v1";
export const COLLECTIONS_STORAGE_KEY = "etsy-keyword-vault-collections-v1";
export const THEME_STORAGE_KEY = "etsy-keyword-vault-theme";
export const FILTER_STORAGE_KEY = "etsy-keyword-vault-filters-v1";
export const SORT_STORAGE_KEY = "etsy-keyword-vault-sort-v1";
export const BACKUP_TIMESTAMP_KEY = "etsy-keyword-vault-last-backup";

export const DEFAULT_FILTERS: FilterState = {
  volumeRange: "all",
  competitionRange: "all",
  priority: "all",
  type: "all",
  productType: "all",
  language: "all",
  favoritesOnly: false,
  collection: "all",
};

export const DEFAULT_SORT: SortOption = "newest";

export const SAMPLE_COLLECTIONS: Collection[] = [
  {
    id: "col-gifts-stationery",
    name: "Gifts & Stationery",
    description: "Personalized leather goods, journals, and celebratory gifts.",
    icon: "🎁",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
  {
    id: "col-seasonal-holidays",
    name: "Halloween & Fall",
    description: "Autumn aesthetic, pumpkin graphics, ceramics and spooky season tags.",
    icon: "🎃",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
  },
  {
    id: "col-jewelry",
    name: "Fine Jewelry & Rings",
    description: "Minimalist solid gold, stacking rings, and dainty jewelry tags.",
    icon: "✨",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
  },
  {
    id: "col-digital-downloads",
    name: "Digital Templates & PNGs",
    description: "Printable party games, woodcraft vector templates, and digital downloads.",
    icon: "📁",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
];

export const SAMPLE_KEYWORDS: Keyword[] = [
  {
    id: "kw-seed-1",
    keyword: "custom leather journal",
    searchVolume: 1450,
    competition: 3200,
    priority: "Excellent",
    type: "Evergreen",
    productType: "Physical",
    language: "English",
    collectionId: "col-gifts-stationery",
    notes: "High converting niche for personalized wedding and graduation gifts. High margins.",
    favorite: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    id: "kw-seed-2",
    keyword: "halloween pumpkin mug",
    searchVolume: 920,
    competition: 5400,
    priority: "Fair",
    type: "Seasonal",
    productType: "Physical",
    language: "English",
    collectionId: "col-seasonal-holidays",
    notes: "Spikes from August to late October. Good for ceramics and 3D printed items.",
    favorite: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: "kw-seed-3",
    keyword: "anime inspired desk mat",
    searchVolume: 1200,
    competition: 9200,
    priority: "Fair",
    type: "Copyright",
    productType: "Physical",
    language: "English",
    notes: "High volume but check IP/trademark policies carefully before listing.",
    favorite: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: "kw-seed-4",
    keyword: "minimalist gold ring 14k",
    searchVolume: 850,
    competition: 2800,
    priority: "Excellent",
    type: "Evergreen",
    productType: "Physical",
    language: "English",
    collectionId: "col-jewelry",
    notes: "Very high intent buyers, low competition on dainty stacking bands.",
    favorite: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "kw-seed-5",
    keyword: "printable bridal shower games",
    searchVolume: 620,
    competition: 6100,
    priority: "Normal",
    type: "Seasonal",
    productType: "Digital",
    language: "English",
    collectionId: "col-digital-downloads",
    notes: "Digital download format. Sells best Spring/Summer wedding season.",
    favorite: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: "kw-seed-6",
    keyword: "wood carving template pdf",
    searchVolume: 240,
    competition: 1500,
    priority: "Normal",
    type: "Evergreen",
    productType: "Digital",
    language: "English",
    collectionId: "col-digital-downloads",
    notes: "Ultra niche micro-community. Low volume but near zero competition.",
    favorite: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
  {
    id: "kw-seed-7",
    keyword: "geburtstagskarte digital zum ausdrucken",
    searchVolume: 890,
    competition: 2200,
    priority: "Excellent",
    type: "Evergreen",
    productType: "Digital",
    language: "German",
    collectionId: "col-digital-downloads",
    notes: "German printable birthday card market with strong European buyers.",
    favorite: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
];

function isClient(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getKeywords(): Keyword[] {
  if (!isClient()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveKeywords(SAMPLE_KEYWORDS);
      return SAMPLE_KEYWORDS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => {
        if (!item.productType) {
          item.productType = "Digital";
        }
        if (!item.language) {
          item.language = "English";
        }
        return item;
      });
    }
    return [];
  } catch (err) {
    console.error("Failed to parse keywords from localStorage:", err);
    return [];
  }
}

export function saveKeywords(keywords: Keyword[]): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keywords));
  } catch (err) {
    console.error("Failed to save keywords to localStorage:", err);
  }
}

export function getCollections(): Collection[] {
  if (!isClient()) return [];
  try {
    const raw = localStorage.getItem(COLLECTIONS_STORAGE_KEY);
    if (!raw) {
      saveCollections(SAMPLE_COLLECTIONS);
      return SAMPLE_COLLECTIONS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (err) {
    console.error("Failed to parse collections from localStorage:", err);
    return [];
  }
}

export function saveCollections(collections: Collection[]): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(COLLECTIONS_STORAGE_KEY, JSON.stringify(collections));
  } catch (err) {
    console.error("Failed to save collections to localStorage:", err);
  }
}

export function addCollection(data: CollectionFormData): Collection {
  const current = getCollections();
  const now = new Date().toISOString();
  const newCol: Collection = {
    ...data,
    id: `col-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: now,
    updatedAt: now,
  };

  const updated = [...current, newCol];
  saveCollections(updated);
  return newCol;
}

export function updateCollection(
  id: string,
  data: Partial<CollectionFormData>
): Collection | null {
  const current = getCollections();
  const index = current.findIndex((c) => c.id === id);
  if (index === -1) return null;

  const updatedCol: Collection = {
    ...current[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  const updated = [...current];
  updated[index] = updatedCol;
  saveCollections(updated);
  return updatedCol;
}

export function deleteCollection(id: string, unassignKeywords: boolean = true): boolean {
  const current = getCollections();
  const filtered = current.filter((c) => c.id !== id);
  if (filtered.length === current.length) return false;
  saveCollections(filtered);

  if (unassignKeywords) {
    const kws = getKeywords();
    let hasChanges = false;
    const updatedKws = kws.map((k) => {
      if (k.collectionId === id) {
        hasChanges = true;
        return { ...k, collectionId: undefined, updatedAt: new Date().toISOString() };
      }
      return k;
    });
    if (hasChanges) {
      saveKeywords(updatedKws);
    }
  }

  return true;
}

export function findDuplicateKeyword(
  keywordText: string,
  excludeId?: string
): Keyword | null {
  const normalized = normalizeKeyword(keywordText);
  if (!normalized) return null;

  const current = getKeywords();
  return (
    current.find(
      (k) =>
        k.id !== excludeId && normalizeKeyword(k.keyword) === normalized
    ) || null
  );
}

export function addKeyword(data: KeywordFormData): Keyword {
  const current = getKeywords();
  const now = new Date().toISOString();
  const newKeyword: Keyword = {
    ...data,
    productType: data.productType || "Digital",
    language: data.language || "English",
    id: `kw-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
    createdAt: now,
    updatedAt: now,
  };

  const updated = [newKeyword, ...current];
  saveKeywords(updated);
  return newKeyword;
}

export function updateKeyword(
  id: string,
  data: Partial<KeywordFormData>
): Keyword | null {
  const current = getKeywords();
  const index = current.findIndex((k) => k.id === id);
  if (index === -1) return null;

  const updatedItem: Keyword = {
    ...current[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  const updatedList = [...current];
  updatedList[index] = updatedItem;
  saveKeywords(updatedList);
  return updatedItem;
}

export function duplicateKeyword(id: string): Keyword | null {
  const current = getKeywords();
  const target = current.find((k) => k.id === id);
  if (!target) return null;

  const duplicatedData: KeywordFormData = {
    keyword: `${target.keyword} (Copy)`,
    searchVolume: target.searchVolume,
    competition: target.competition,
    priority: target.priority,
    type: target.type,
    productType: target.productType || "Digital",
    language: target.language || "English",
    collectionId: target.collectionId,
    notes: target.notes,
    favorite: target.favorite,
  };

  return addKeyword(duplicatedData);
}

export function deleteKeyword(id: string): boolean {
  const current = getKeywords();
  const filtered = current.filter((k) => k.id !== id);
  if (filtered.length === current.length) return false;
  saveKeywords(filtered);
  return true;
}

export function toggleFavorite(id: string): Keyword | null {
  const current = getKeywords();
  const index = current.findIndex((k) => k.id === id);
  if (index === -1) return null;

  const item = current[index];
  const updatedItem: Keyword = {
    ...item,
    favorite: !item.favorite,
    updatedAt: new Date().toISOString(),
  };

  const updatedList = [...current];
  updatedList[index] = updatedItem;
  saveKeywords(updatedList);
  return updatedItem;
}

export function bulkDeleteKeywords(ids: string[]): number {
  if (ids.length === 0) return 0;
  const current = getKeywords();
  const idSet = new Set(ids);
  const filtered = current.filter((k) => !idSet.has(k.id));
  const removedCount = current.length - filtered.length;
  if (removedCount > 0) {
    saveKeywords(filtered);
  }
  return removedCount;
}

export function bulkUpdateKeywords(
  ids: string[],
  patch: Partial<KeywordFormData>
): number {
  if (ids.length === 0) return 0;
  const current = getKeywords();
  const idSet = new Set(ids);
  const now = new Date().toISOString();
  let updatedCount = 0;

  const updated = current.map((k) => {
    if (idSet.has(k.id)) {
      updatedCount++;
      return {
        ...k,
        ...patch,
        updatedAt: now,
      };
    }
    return k;
  });

  if (updatedCount > 0) {
    saveKeywords(updated);
  }
  return updatedCount;
}

export function importBatchKeywords(newKeywords: KeywordFormData[]): number {
  if (newKeywords.length === 0) return 0;
  const current = getKeywords();
  const now = new Date().toISOString();

  const toAdd: Keyword[] = newKeywords.map((data, idx) => ({
    ...data,
    productType: data.productType || "Digital",
    language: data.language || "English",
    id: `kw-imported-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: now,
    updatedAt: now,
  }));

  const merged = [...toAdd, ...current];
  saveKeywords(merged);
  return toAdd.length;
}

export function importBatchCollections(newCollections: Collection[]): number {
  if (newCollections.length === 0) return 0;
  const current = getCollections();
  const existingNames = new Set(current.map((c) => c.name.toLowerCase()));
  const toAdd = newCollections.filter((c) => !existingNames.has(c.name.toLowerCase()));

  if (toAdd.length > 0) {
    saveCollections([...current, ...toAdd]);
  }
  return toAdd.length;
}

export function resetToSampleData(): { keywords: Keyword[]; collections: Collection[] } {
  saveKeywords(SAMPLE_KEYWORDS);
  saveCollections(SAMPLE_COLLECTIONS);
  return {
    keywords: SAMPLE_KEYWORDS,
    collections: SAMPLE_COLLECTIONS,
  };
}

export function clearAllKeywords(): Keyword[] {
  saveKeywords([]);
  return [];
}

export function recordBackupTimestamp(): string {
  const timestamp = new Date().toISOString();
  if (isClient()) {
    localStorage.setItem(BACKUP_TIMESTAMP_KEY, timestamp);
  }
  return timestamp;
}

export function getLastBackupTimestamp(): string | null {
  if (!isClient()) return null;
  return localStorage.getItem(BACKUP_TIMESTAMP_KEY);
}

export function getStoredFilters(): FilterState {
  if (!isClient()) return DEFAULT_FILTERS;
  try {
    const raw = localStorage.getItem(FILTER_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_FILTERS, ...parsed };
    }
  } catch (err) {
    console.error("Failed to read filters from localStorage:", err);
  }
  return DEFAULT_FILTERS;
}

export function saveStoredFilters(filters: FilterState): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(filters));
  } catch (err) {
    console.error("Failed to save filters to localStorage:", err);
  }
}

export function getStoredSort(): SortOption {
  if (!isClient()) return DEFAULT_SORT;
  try {
    const raw = localStorage.getItem(SORT_STORAGE_KEY) as SortOption;
    if (raw) return raw;
  } catch (err) {
    console.error("Failed to read sort option from localStorage:", err);
  }
  return DEFAULT_SORT;
}

export function saveStoredSort(sort: SortOption): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(SORT_STORAGE_KEY, sort);
  } catch (err) {
    console.error("Failed to save sort option to localStorage:", err);
  }
}
