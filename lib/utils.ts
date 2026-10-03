import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num === null || num === undefined || isNaN(num)) return "0";
  return new Intl.NumberFormat("en-US").format(num);
}

export function formatDate(dateString: string): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Normalizes keyword for accurate duplicate detection.
 * Lowercases, trims whitespace, and collapses multi-spaces.
 * e.g. "  Vintage   Wall   Art  " -> "vintage wall art"
 */
export function normalizeKeyword(str: string): string {
  if (!str) return "";
  return str.toLowerCase().trim().replace(/\s+/g, " ");
}
