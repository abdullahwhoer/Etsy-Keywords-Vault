export type KeywordPriority = "Normal" | "Fair" | "Excellent";

export type KeywordType = "Copyright" | "Seasonal" | "Evergreen";

export type ProductType = "Digital" | "Physical";

export type KeywordLanguage = "English" | "German" | "Spanish" | "Italian" | "French";

export interface Keyword {
  id: string;
  keyword: string;
  searchVolume: number;
  competition: number;
  priority: KeywordPriority;
  type: KeywordType;
  productType: ProductType;
  language?: KeywordLanguage;
  collectionId?: string;
  notes?: string;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export type KeywordFormData = Omit<Keyword, "id" | "createdAt" | "updatedAt">;

export interface Collection {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export type CollectionFormData = Omit<Collection, "id" | "createdAt" | "updatedAt">;

export type KeywordStatus =
  | "Idea"
  | "Researching"
  | "High Potential"
  | "Design Created"
  | "Listing Created"
  | "Published"
  | "Rejected";

export interface KeywordStats {
  totalKeywords: number;
  favorites: number;
  highVolume: number;
  lowCompetition: number;
  digitalCount: number;
  physicalCount: number;
  evergreen: number;
  seasonal: number;
  excellentOpportunity: number;
}

export type ActiveNavTab =
  | "dashboard"
  | "all"
  | "checking-keywords"
  | "favorites"
  | "collections"
  | "settings";

export type VolumeFilterOption = "all" | "1000+" | "800-999" | "400-799" | "0-399";
export type CompetitionFilterOption = "all" | "0-4999" | "5000-8000" | "8000+";
export type PriorityFilterOption = "all" | KeywordPriority;
export type KeywordTypeFilterOption = "all" | KeywordType;
export type ProductTypeFilterOption = "all" | ProductType;
export type LanguageFilterOption = "all" | KeywordLanguage;

export interface FilterState {
  volumeRange: VolumeFilterOption;
  competitionRange: CompetitionFilterOption;
  priority: PriorityFilterOption;
  type: KeywordTypeFilterOption;
  productType: ProductTypeFilterOption;
  language: LanguageFilterOption;
  favoritesOnly: boolean;
  collection: string;
}

export type SortOption =
  | "newest"
  | "oldest"
  | "alpha-asc"
  | "alpha-desc"
  | "volume-desc"
  | "volume-asc"
  | "competition-desc"
  | "competition-asc"
  | "opportunity-desc";

export interface OpportunityRating {
  ratio: number;
  formattedRatio: string;
  score: number;
  label: "Excellent" | "Fair" | "Normal";
  badgeClass: string;
  dotClass: string;
  textClass: string;
}

export type BulkActionType =
  | "delete"
  | "collection"
  | "priority"
  | "type"
  | "productType"
  | "language"
  | "favorite-add"
  | "favorite-remove";

export interface ImportPreviewData {
  sourceType: "json" | "csv";
  filename: string;
  totalRows: number;
  validKeywords: KeywordFormData[];
  invalidRowsCount: number;
  duplicateKeywords: KeywordFormData[];
  collectionsFound: Collection[];
  rawParsedCount: number;
}

export interface ExportJsonPayload {
  app: string;
  version: number;
  exportedAt: string;
  keywords: Keyword[];
  collections: Collection[];
  filters?: FilterState;
  theme?: string;
  metadata?: {
    totalKeywords: number;
    totalCollections: number;
    exportDevice: string;
  };
}
