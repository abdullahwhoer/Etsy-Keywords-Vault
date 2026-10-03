import {
  KeywordPriority,
  KeywordType,
  ProductType,
  KeywordLanguage,
  OpportunityRating,
} from "@/types/keyword";

export interface VolumeThreshold {
  min: number;
  max: number | null;
  label: string;
  badgeClass: string;
  dotClass: string;
  textClass: string;
}

export interface CompetitionThreshold {
  min: number;
  max: number | null;
  label: string;
  badgeClass: string;
  dotClass: string;
  textClass: string;
}

export const SEARCH_VOLUME_THRESHOLDS = {
  EXCELLENT: {
    min: 1000,
    max: null,
    label: "Excellent",
    badgeClass: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
    dotClass: "bg-emerald-600 dark:bg-emerald-400",
    textClass: "text-emerald-700 dark:text-emerald-300",
  },
  STRONG: {
    min: 800,
    max: 999,
    label: "Strong",
    badgeClass: "bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/20",
    dotClass: "bg-teal-500 dark:bg-teal-400",
    textClass: "text-teal-700 dark:text-teal-300",
  },
  MODERATE: {
    min: 400,
    max: 799,
    label: "Moderate",
    badgeClass: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
    dotClass: "bg-amber-500 dark:bg-amber-400",
    textClass: "text-amber-700 dark:text-amber-300",
  },
  LOW: {
    min: 0,
    max: 399,
    label: "Low",
    badgeClass: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20",
    dotClass: "bg-rose-500 dark:bg-rose-400",
    textClass: "text-rose-700 dark:text-rose-300",
  },
} as const;

/**
 * Competition thresholds:
 * < 5000: Low (Green)
 * 5000 - 8000: Moderate (Orange)
 * > 8000: High (Red)
 */
export const COMPETITION_THRESHOLDS = {
  LOW: {
    min: 0,
    max: 4999,
    label: "Low",
    badgeClass: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
    dotClass: "bg-emerald-600 dark:bg-emerald-400",
    textClass: "text-emerald-700 dark:text-emerald-300",
  },
  MODERATE: {
    min: 5000,
    max: 8000,
    label: "Moderate",
    badgeClass: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
    dotClass: "bg-amber-500 dark:bg-amber-400",
    textClass: "text-amber-700 dark:text-amber-300",
  },
  HIGH: {
    min: 8001,
    max: null,
    label: "High",
    badgeClass: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20",
    dotClass: "bg-rose-500 dark:bg-rose-400",
    textClass: "text-rose-700 dark:text-rose-300",
  },
} as const;

export function getSearchVolumeLevel(volume: number) {
  if (volume >= 1000) return SEARCH_VOLUME_THRESHOLDS.EXCELLENT;
  if (volume >= 800) return SEARCH_VOLUME_THRESHOLDS.STRONG;
  if (volume >= 400) return SEARCH_VOLUME_THRESHOLDS.MODERATE;
  return SEARCH_VOLUME_THRESHOLDS.LOW;
}

export function getCompetitionLevel(competition: number) {
  if (competition < 5000) return COMPETITION_THRESHOLDS.LOW;
  if (competition <= 8000) return COMPETITION_THRESHOLDS.MODERATE;
  return COMPETITION_THRESHOLDS.HIGH;
}

export const PRIORITY_CONFIG: Record<
  KeywordPriority,
  { label: string; badgeClass: string; dotClass: string }
> = {
  Normal: {
    label: "Normal",
    badgeClass: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20",
    dotClass: "bg-slate-400",
  },
  Fair: {
    label: "Fair",
    badgeClass: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
    dotClass: "bg-amber-500",
  },
  Excellent: {
    label: "Excellent",
    badgeClass: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
    dotClass: "bg-emerald-500",
  },
};

export const KEYWORD_TYPE_CONFIG: Record<
  KeywordType,
  { label: string; badgeClass: string; tooltip: string }
> = {
  Copyright: {
    label: "Copyright",
    badgeClass: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20",
    tooltip: "User-defined classification. This does not determine legal copyright or trademark status.",
  },
  Seasonal: {
    label: "Seasonal",
    badgeClass: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
    tooltip: "Keywords that peak during specific holidays, seasons, or events.",
  },
  Evergreen: {
    label: "Evergreen",
    badgeClass: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
    tooltip: "Keywords with consistent year-round search demand.",
  },
};

export const PRODUCT_TYPE_CONFIG: Record<
  ProductType,
  { label: string; badgeClass: string; icon: string }
> = {
  Digital: {
    label: "Digital",
    badgeClass: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20",
    icon: "💻",
  },
  Physical: {
    label: "Physical",
    badgeClass: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
    icon: "📦",
  },
};

export const LANGUAGE_CONFIG: Record<
  KeywordLanguage,
  { label: string; name: string; code: string; flag: string; badgeClass: string }
> = {
  English: {
    label: "English",
    name: "English",
    code: "EN",
    flag: "🇬🇧",
    badgeClass: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20",
  },
  German: {
    label: "German",
    name: "German",
    code: "DE",
    flag: "🇩🇪",
    badgeClass: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
  },
  Spanish: {
    label: "Spanish",
    name: "Spanish",
    code: "ES",
    flag: "🇪🇸",
    badgeClass: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20",
  },
  Italian: {
    label: "Italian",
    name: "Italian",
    code: "IT",
    flag: "🇮🇹",
    badgeClass: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
  },
  French: {
    label: "French",
    name: "French",
    code: "FR",
    flag: "🇫🇷",
    badgeClass: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
  },
};

export const OPPORTUNITY_THRESHOLDS = {
  EXCELLENT: {
    minRatio: 2.0,
    label: "Excellent" as const,
    badgeClass: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
    dotClass: "bg-emerald-600 dark:bg-emerald-400",
    textClass: "text-emerald-700 dark:text-emerald-300",
  },
  FAIR: {
    minRatio: 0.8,
    label: "Fair" as const,
    badgeClass: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
    dotClass: "bg-amber-500 dark:bg-amber-400",
    textClass: "text-amber-700 dark:text-amber-300",
  },
  NORMAL: {
    minRatio: 0,
    label: "Normal" as const,
    badgeClass: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20",
    dotClass: "bg-slate-400",
    textClass: "text-slate-700 dark:text-slate-300",
  },
} as const;

export const OPPORTUNITY_TOOLTIP =
  "Calculated from your entered search volume and competition values. This is not official Etsy data.";

export function calculateOpportunity(
  volume: number,
  competition: number
): OpportunityRating {
  const safeVolume = Math.max(0, volume || 0);
  const safeCompetition = Math.max(1, competition || 0);
  const ratio = safeVolume / safeCompetition;

  const score = Math.min(100, Math.round((ratio / (ratio + 1.5)) * 100));

  let threshold: (typeof OPPORTUNITY_THRESHOLDS)[keyof typeof OPPORTUNITY_THRESHOLDS];
  if (ratio >= OPPORTUNITY_THRESHOLDS.EXCELLENT.minRatio) {
    threshold = OPPORTUNITY_THRESHOLDS.EXCELLENT;
  } else if (ratio >= OPPORTUNITY_THRESHOLDS.FAIR.minRatio) {
    threshold = OPPORTUNITY_THRESHOLDS.FAIR;
  } else {
    threshold = OPPORTUNITY_THRESHOLDS.NORMAL;
  }

  return {
    ratio,
    formattedRatio: ratio >= 10 ? ratio.toFixed(1) : ratio.toFixed(2),
    score,
    label: threshold.label,
    badgeClass: threshold.badgeClass,
    dotClass: threshold.dotClass,
    textClass: threshold.textClass,
  };
}
