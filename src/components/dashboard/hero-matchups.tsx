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
  if (!data || data.length === 0) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        {type === "counter" ? (
          <Target className="text-white" size={22} strokeWidth={2.5} />
        ) : (
          <Users className="text-white" size={22} strokeWidth={2.5} />
        )}
        <h3 className="text-2xl font-bold text-white tracking-tight leading-none italic uppercase">
          {title}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {data.map((entry) => {
          const score = entry.increase_win_rate !== null 
            ? `${entry.increase_win_rate.toFixed(2)}%` 
            : "0.00%";

          return (
            <div
              key={entry.heroid}
              className="flex items-center justify-between p-3 rounded-[1.5rem] bg-zinc-900/20 border border-zinc-800/40"
            >
              <div className="flex items-center gap-5">
                <span className="text-[11px] font-black text-zinc-600 w-5 text-center">
                  #{entry.rank}
                </span>
                
                {/* ICON: Now using the URL from heroes_icon_url.json */}
                <div className="w-14 h-14 rounded-2xl bg-zinc-800 overflow-hidden border border-transparent shadow-xl shrink-0">
                  <img
                    src={entry.iconUrl || "/placeholder-hero.png"}
                    alt={entry.hero_name}
                    className="w-full h-full object-cover select-none"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    draggable={false}
                  />
                </div>

                <span className="text-lg font-bold text-zinc-100 tracking-tight uppercase italic">
                  {entry.hero_name}
                </span>
              </div>

              <div className="text-right flex flex-col items-end px-2">
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
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-1">
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