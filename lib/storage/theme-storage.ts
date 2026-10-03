import { ThemeMode } from "@/types/theme";

const THEME_KEY = "etsy-keyword-vault-theme";

export function getStoredTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";
  try {
    const saved = localStorage.getItem(THEME_KEY) as ThemeMode;
    if (saved === "light" || saved === "dark" || saved === "system") {
      return saved;
    }
  } catch (err) {
    console.error("Failed to read theme from localStorage", err);
  }
  return "light";
}

export function saveStoredTheme(mode: ThemeMode): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(THEME_KEY, mode);
  } catch (err) {
    console.error("Failed to save theme to localStorage", err);
  }
}
