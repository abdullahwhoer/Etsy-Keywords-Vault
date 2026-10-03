import {
  Keyword,
  KeywordFormData,
  Collection,
  ExportJsonPayload,
  ImportPreviewData,
  KeywordPriority,
  KeywordType,
  ProductType,
  KeywordLanguage,
} from "@/types/keyword";
import { normalizeKeyword, formatDate } from "@/lib/utils";
import { calculateOpportunity } from "@/config/thresholds";

export function downloadFile(content: string, filename: string, mimeType: string): void {
  if (typeof window === "undefined") return;
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * CSV field quote escaper
 */
function escapeCsvCell(val: string | number | boolean | null | undefined): string {
  if (val === null || val === undefined) return "";
  const str = String(val);
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Generate CSV string from keywords
 */
export function exportKeywordsToCsv(
  keywords: Keyword[],
  collections: Collection[] = []
): string {
  const collectionNameMap = collections.reduce((acc, c) => {
    acc[c.id] = c.name;
    return acc;
  }, {} as Record<string, string>);

  const headers = [
    "Keyword",
    "Search Volume",
    "Competition",
    "Opportunity Score",
    "Product Type",
    "Language",
    "Priority",
    "Niche Classification",
    "Collection",
    "Notes",
    "Favorite",
    "Created",
    "Updated",
  ];

  const rows = keywords.map((kw) => {
    const opp = calculateOpportunity(kw.searchVolume, kw.competition);
    const collectionName = kw.collectionId
      ? collectionNameMap[kw.collectionId] || kw.collectionId
      : "";

    return [
      escapeCsvCell(kw.keyword),
      escapeCsvCell(kw.searchVolume),
      escapeCsvCell(kw.competition),
      escapeCsvCell(`${opp.formattedRatio} (${opp.label})`),
      escapeCsvCell(kw.productType || "Digital"),
      escapeCsvCell(kw.language || "English"),
      escapeCsvCell(kw.priority),
      escapeCsvCell(kw.type),
      escapeCsvCell(collectionName),
      escapeCsvCell(kw.notes || ""),
      escapeCsvCell(kw.favorite ? "Yes" : "No"),
      escapeCsvCell(kw.createdAt),
      escapeCsvCell(kw.updatedAt),
    ].join(",");
  });

  return [headers.join(","), ...rows].join("\r\n");
}

/**
 * Generate JSON backup payload
 */
export function generateJsonBackup(
  keywords: Keyword[],
  collections: Collection[],
  theme: string = "light"
): string {
  const payload: ExportJsonPayload = {
    app: "Etsy Keyword Vault",
    version: 2,
    exportedAt: new Date().toISOString(),
    keywords,
    collections,
    theme,
    metadata: {
      totalKeywords: keywords.length,
      totalCollections: collections.length,
      exportDevice: typeof navigator !== "undefined" ? navigator.userAgent : "Web",
    },
  };

  return JSON.stringify(payload, null, 2);
}

/**
 * Robust CSV line splitter handling quoted commas and escapes
 */
function parseCsvRows(text: string): string[][] {
  const lines: string[][] = [];
  const cleanText = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  
  let currentCell = "";
  let currentRow: string[] = [];
  let insideQuotes = false;

  for (let i = 0; i < cleanText.length; i++) {
    const char = cleanText[i];
    const nextChar = cleanText[i + 1];

    if (insideQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          currentCell += '"';
          i++; // Skip escaped quote
        } else {
          insideQuotes = false;
        }
      } else {
        currentCell += char;
      }
    } else {
      if (char === '"') {
        insideQuotes = true;
      } else if (char === ",") {
        currentRow.push(currentCell.trim());
        currentCell = "";
      } else if (char === "\n") {
        currentRow.push(currentCell.trim());
        if (currentRow.some((cell) => cell.length > 0)) {
          lines.push(currentRow);
        }
        currentRow = [];
        currentCell = "";
      } else {
        currentCell += char;
      }
    }
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    if (currentRow.some((cell) => cell.length > 0)) {
      lines.push(currentRow);
    }
  }

  return lines;
}

/**
 * Parse and validate CSV data with duplicate detection
 */
export function parseCsvKeywords(
  csvText: string,
  filename: string,
  existingKeywords: Keyword[]
): ImportPreviewData {
  const rows = parseCsvRows(csvText);
  if (rows.length === 0) {
    return {
      sourceType: "csv",
      filename,
      totalRows: 0,
      validKeywords: [],
      invalidRowsCount: 0,
      duplicateKeywords: [],
      collectionsFound: [],
      rawParsedCount: 0,
    };
  }

  // Header row index detection
  const headerRow = rows[0].map((h) => h.toLowerCase().trim().replace(/[\s_-]+/g, ""));
  const findColIndex = (...candidates: string[]) => {
    return headerRow.findIndex((h) => candidates.some((c) => h.includes(c)));
  };

  const kwIdx = findColIndex("keyword", "term", "phrase", "query", "name");
  const volIdx = findColIndex("searchvolume", "volume", "searches", "search");
  const compIdx = findColIndex("competition", "comp", "results", "competitors");
  const prioIdx = findColIndex("priority", "importance");
  const typeIdx = findColIndex("type", "category", "classification", "niche");
  const productTypeIdx = findColIndex("producttype", "fulfillment", "format");
  const langIdx = findColIndex("language", "lang", "locale");
  const colIdx = findColIndex("collection", "folder", "group");
  const notesIdx = findColIndex("notes", "note", "comment", "strategy", "description");
  const favIdx = findColIndex("favorite", "fav", "starred");

  const validKeywords: KeywordFormData[] = [];
  const duplicateKeywords: KeywordFormData[] = [];
  let invalidRowsCount = 0;
  const collectionsSet = new Set<string>();

  // Process data rows starting from index 1
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (row.length === 0 || (row.length === 1 && !row[0])) continue;

    const rawKw = kwIdx !== -1 && row[kwIdx] ? row[kwIdx] : row[0];
    if (!rawKw || !rawKw.trim()) {
      invalidRowsCount++;
      continue;
    }

    const keywordText = rawKw.trim();

    // Volume parsing
    let searchVolume = 0;
    if (volIdx !== -1 && row[volIdx]) {
      const parsed = parseInt(row[volIdx].replace(/[^\d]/g, ""), 10);
      if (!isNaN(parsed) && parsed >= 0) searchVolume = parsed;
    }

    // Competition parsing
    let competition = 0;
    if (compIdx !== -1 && row[compIdx]) {
      const parsed = parseInt(row[compIdx].replace(/[^\d]/g, ""), 10);
      if (!isNaN(parsed) && parsed >= 0) competition = parsed;
    }

    // Priority parsing
    let priority: KeywordPriority = "Normal";
    if (prioIdx !== -1 && row[prioIdx]) {
      const val = row[prioIdx].toLowerCase();
      if (val.includes("excel")) priority = "Excellent";
      else if (val.includes("fair") || val.includes("med")) priority = "Fair";
      else priority = "Normal";
    }

    // Type parsing
    let type: KeywordType = "Evergreen";
    if (typeIdx !== -1 && row[typeIdx]) {
      const val = row[typeIdx].toLowerCase();
      if (val.includes("copy") || val.includes("trade") || val.includes("ip")) type = "Copyright";
      else if (val.includes("seas") || val.includes("holi")) type = "Seasonal";
      else type = "Evergreen";
    }

    // Product Type parsing (Digital default)
    let productType: ProductType = "Digital";
    if (productTypeIdx !== -1 && row[productTypeIdx]) {
      const val = row[productTypeIdx].toLowerCase();
      if (val.includes("phys")) productType = "Physical";
      else productType = "Digital";
    }

    // Language parsing (English default)
    let language: KeywordLanguage = "English";
    if (langIdx !== -1 && row[langIdx]) {
      const val = row[langIdx].toLowerCase();
      if (val.includes("ger") || val.includes("de")) language = "German";
      else if (val.includes("span") || val.includes("es")) language = "Spanish";
      else if (val.includes("ital") || val.includes("it")) language = "Italian";
      else if (val.includes("fren") || val.includes("fr")) language = "French";
      else language = "English";
    }

    // Collection parsing
    let collectionId: string | undefined;
    if (colIdx !== -1 && row[colIdx] && row[colIdx].trim()) {
      collectionId = row[colIdx].trim();
      collectionsSet.add(collectionId);
    }

    // Notes
    let notes: string | undefined;
    if (notesIdx !== -1 && row[notesIdx] && row[notesIdx].trim()) {
      notes = row[notesIdx].trim();
    }

    // Favorite
    let favorite = false;
    if (favIdx !== -1 && row[favIdx]) {
      const val = row[favIdx].toLowerCase();
      favorite = val === "yes" || val === "true" || val === "1" || val === "starred";
    }

    const itemData: KeywordFormData = {
      keyword: keywordText,
      searchVolume,
      competition,
      priority,
      type,
      productType,
      language,
      collectionId,
      notes,
      favorite,
    };

    // Duplicate Check
    const normalized = normalizeKeyword(keywordText);
    const isDup =
      existingKeywords.some((k) => normalizeKeyword(k.keyword) === normalized) ||
      validKeywords.some((k) => normalizeKeyword(k.keyword) === normalized);

    if (isDup) {
      duplicateKeywords.push(itemData);
    } else {
      validKeywords.push(itemData);
    }
  }

  const collectionsFound: Collection[] = Array.from(collectionsSet).map((name) => ({
    id: `col-${name.toLowerCase().replace(/\s+/g, "-")}`,
    name,
    description: `Imported with ${filename}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  return {
    sourceType: "csv",
    filename,
    totalRows: rows.length - 1,
    validKeywords,
    invalidRowsCount,
    duplicateKeywords,
    collectionsFound,
    rawParsedCount: validKeywords.length + duplicateKeywords.length,
  };
}

/**
 * Parse and validate JSON backup
 */
export function parseJsonBackupFile(
  jsonText: string,
  filename: string,
  existingKeywords: Keyword[]
): ImportPreviewData {
  try {
    const parsed = JSON.parse(jsonText);
    const rawKeywords = Array.isArray(parsed.keywords)
      ? parsed.keywords
      : Array.isArray(parsed)
      ? parsed
      : [];

    const rawCollections = Array.isArray(parsed.collections) ? parsed.collections : [];

    const validKeywords: KeywordFormData[] = [];
    const duplicateKeywords: KeywordFormData[] = [];
    let invalidRowsCount = 0;

    rawKeywords.forEach((k: Record<string, unknown>) => {
      if (!k || typeof k.keyword !== "string" || !k.keyword.trim()) {
        invalidRowsCount++;
        return;
      }

      const itemData: KeywordFormData = {
        keyword: String(k.keyword).trim(),
        searchVolume: typeof k.searchVolume === "number" && k.searchVolume >= 0 ? k.searchVolume : 0,
        competition: typeof k.competition === "number" && k.competition >= 0 ? k.competition : 0,
        priority:
          k.priority === "Excellent" || k.priority === "Fair" || k.priority === "Normal"
            ? k.priority
            : "Normal",
        type:
          k.type === "Copyright" || k.type === "Seasonal" || k.type === "Evergreen"
            ? k.type
            : "Evergreen",
        productType: k.productType === "Physical" ? "Physical" : "Digital",
        language:
          k.language === "German" ||
          k.language === "Spanish" ||
          k.language === "Italian" ||
          k.language === "French"
            ? k.language
            : "English",
        collectionId: typeof k.collectionId === "string" ? k.collectionId : undefined,
        notes: typeof k.notes === "string" ? k.notes : undefined,
        favorite: Boolean(k.favorite),
      };

      const normalized = normalizeKeyword(itemData.keyword);
      const isDup =
        existingKeywords.some((ex) => normalizeKeyword(ex.keyword) === normalized) ||
        validKeywords.some((v) => normalizeKeyword(v.keyword) === normalized);

      if (isDup) {
        duplicateKeywords.push(itemData);
      } else {
        validKeywords.push(itemData);
      }
    });

    const collectionsFound: Collection[] = rawCollections.map((c: Record<string, unknown>, idx: number) => ({
      id: typeof c.id === "string" ? c.id : `col-imported-${idx}-${Date.now()}`,
      name: typeof c.name === "string" ? c.name : `Collection ${idx + 1}`,
      description: typeof c.description === "string" ? c.description : undefined,
      icon: typeof c.icon === "string" ? c.icon : undefined,
      createdAt: typeof c.createdAt === "string" ? c.createdAt : new Date().toISOString(),
      updatedAt: typeof c.updatedAt === "string" ? c.updatedAt : new Date().toISOString(),
    }));

    return {
      sourceType: "json",
      filename,
      totalRows: rawKeywords.length,
      validKeywords,
      invalidRowsCount,
      duplicateKeywords,
      collectionsFound,
      rawParsedCount: validKeywords.length + duplicateKeywords.length,
    };
  } catch (err) {
    console.error("Failed to parse JSON backup:", err);
    return {
      sourceType: "json",
      filename,
      totalRows: 0,
      validKeywords: [],
      invalidRowsCount: 1,
      duplicateKeywords: [],
      collectionsFound: [],
      rawParsedCount: 0,
    };
  }
}
