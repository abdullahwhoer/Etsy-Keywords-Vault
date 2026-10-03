import { Keyword, KeywordStats } from "@/types/keyword";
import {
  SEARCH_VOLUME_THRESHOLDS,
  COMPETITION_THRESHOLDS,
  calculateOpportunity,
} from "@/config/thresholds";

export function calculateKeywordStats(keywords: Keyword[]): KeywordStats {
  const totalKeywords = keywords.length;
  const favorites = keywords.filter((k) => k.favorite).length;

  // High Volume: >= 800 (Strong or Excellent)
  const highVolume = keywords.filter(
    (k) => k.searchVolume >= SEARCH_VOLUME_THRESHOLDS.STRONG.min
  ).length;

  // Low Competition: < 5000
  const lowCompetition = keywords.filter(
    (k) => k.competition < 5000
  ).length;

  // Digital vs Physical count
  const digitalCount = keywords.filter((k) => k.productType === "Digital").length;
  const physicalCount = keywords.filter((k) => k.productType === "Physical").length;

  // Excellent Opportunity (Ratio >= 2.0)
  const excellentOpportunity = keywords.filter((k) => {
    const opp = calculateOpportunity(k.searchVolume, k.competition);
    return opp.label === "Excellent";
  }).length;

  // Evergreen & Seasonal
  const evergreen = keywords.filter((k) => k.type === "Evergreen").length;
  const seasonal = keywords.filter((k) => k.type === "Seasonal").length;

  return {
    totalKeywords,
    favorites,
    highVolume,
    lowCompetition,
    digitalCount,
    physicalCount,
    excellentOpportunity,
    evergreen,
    seasonal,
  };
}
