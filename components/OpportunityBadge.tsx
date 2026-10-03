"use client";

import React from "react";
import { Sparkles, HelpCircle } from "lucide-react";
import { calculateOpportunity, OPPORTUNITY_TOOLTIP } from "@/config/thresholds";
import { Tooltip } from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils";

interface OpportunityBadgeProps {
  searchVolume: number;
  competition: number;
  showScoreBar?: boolean;
  size?: "sm" | "md" | "lg";
}

export function OpportunityBadge({
  searchVolume,
  competition,
  showScoreBar = false,
  size = "md",
}: OpportunityBadgeProps) {
  const opp = calculateOpportunity(searchVolume, competition);

  return (
    <div className="flex flex-col items-start gap-1">
      <div className="flex items-center gap-1.5">
        <Tooltip content={OPPORTUNITY_TOOLTIP}>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full font-medium border transition-colors cursor-help",
              opp.badgeClass,
              size === "sm" && "px-2 py-0.5 text-[10px]",
              size === "md" && "px-2.5 py-0.5 text-xs",
              size === "lg" && "px-3 py-1 text-sm font-semibold"
            )}
          >
            <span className={cn("rounded-full shrink-0", opp.dotClass, size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2")} />
            <span className="font-bold">{opp.formattedRatio}</span>
            <span className="opacity-90 font-normal">({opp.label})</span>
            <HelpCircle className="w-3 h-3 opacity-60 ml-0.5" />
          </span>
        </Tooltip>
      </div>

      {showScoreBar && (
        <div className="w-full max-w-[120px] bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-300",
              opp.label === "Excellent" && "bg-emerald-500",
              opp.label === "Fair" && "bg-amber-500",
              opp.label === "Normal" && "bg-slate-400"
            )}
            style={{ width: `${opp.score}%` }}
          />
        </div>
      )}
    </div>
  );
}
