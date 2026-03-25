"use client";

import React, { memo } from "react";
import { MatchupEntry } from "@/types/hero";
import { Target, Users, TrendingUp } from "lucide-react";

interface MatchupSectionProps {
  title: string;
  data: MatchupEntry[];
  type: "counter" | "teammate";
}

export const MatchupSection = memo(({ title, data, type }: MatchupSectionProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="py-10 text-center border-2 border-dashed border-zinc-800 rounded-[2rem]">
        <p className="text-zinc-500 font-medium italic text-sm">No matchup data available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3">
        {type === "counter" ? (
          <Target className="text-white" size={22} strokeWidth={2.5} />
        ) : (
          <Users className="text-white" size={22} strokeWidth={2.5} />
        )}
        <h3 className="text-2xl font-bold text-white tracking-tight leading-none">
          {title}
        </h3>
      </div>

      {/* MATCHUP LIST */}
      <div className="grid grid-cols-1 gap-4">
        {data.map((entry) => {
          // FORMATTING LOGIC: Convert 2.9188 to 2.92%
          const score = entry.increase_win_rate !== null 
            ? `${entry.increase_win_rate.toFixed(2)}%` 
            : "0.00%";

          return (
            <div
              key={entry.heroid}
              className="flex items-center justify-between p-4 rounded-[1.5rem] bg-zinc-900/20 border border-zinc-800/40"
            >
              <div className="flex items-center gap-5">
                {/* RANK */}
                <span className="text-[11px] font-black text-zinc-600 w-5 text-center">
                  #{entry.rank}
                </span>
                
                {/* HERO ICON - Added no-referrer to fix missing image issue */}
                <div className="w-14 h-14 rounded-2xl bg-zinc-800 overflow-hidden border border-transparent shadow-xl shrink-0">
                  <img
                    src={`https://akmweb.youngjoygame.com/web/svnres/img/mlbb/homepage/100_${entry.heroid}.png`}
                    alt={entry.hero_name}
                    className="w-full h-full object-cover select-none"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    draggable={false}
                  />
                </div>

                {/* NAME */}
                <span className="text-lg font-bold text-zinc-100 tracking-tight">
                  {entry.hero_name}
                </span>
              </div>

              {/* SCORE DISPLAY (INCREASE WIN RATE) */}
              <div className="text-right flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <TrendingUp 
                    size={18} 
                    className={type === "counter" ? "text-green-400" : "text-blue-400"} 
                    strokeWidth={3}
                  />
                  <span className={`text-xl font-black ${type === "counter" ? "text-green-400" : "text-blue-400"} tabular-nums`}>
                    {score}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">
                  Advantage Score
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

MatchupSection.displayName = "MatchupSection";