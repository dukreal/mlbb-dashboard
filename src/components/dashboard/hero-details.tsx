"use client";

import React from "react";
import { MLBBHero, BaseStats } from "@/types/hero";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Activity, Zap, Info } from "lucide-react";

interface HeroDetailsProps {
  hero: MLBBHero | null;
  isOpen: boolean;
  onClose: () => void;
}

const STAT_CONFIG: { label: string; key: keyof BaseStats }[] = [
  { label: "HP", key: "hp" },
  { label: "HP Regen", key: "hp_regen" },
  { label: "Phys Atk", key: "physical_attack" },
  { label: "Phys Def", key: "physical_defense" },
  { label: "Mag Power", key: "magic_power" },
  { label: "Mag Def", key: "magic_defense" },
  { label: "Mana", key: "mana" },
  { label: "Mana Regen", key: "mana_regen" },
  { label: "Atk Speed", key: "attack_speed" },
  { label: "Atk Ratio", key: "attack_speed_ratio" },
  { label: "Move Spd", key: "movement_speed" },
];

export function HeroDetails({ hero, isOpen, onClose }: HeroDetailsProps) {
  if (!hero) return null;

  const getAttributeRange = (attr: string[]) => {
    if (!attr || attr.length === 0) return "0";
    if (attr.length === 1) return attr[0];
    return `${attr[0]} — ${attr[attr.length - 1]}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] md:max-w-6xl bg-zinc-950 border-zinc-900 p-0 overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row-reverse h-full max-h-[90vh] md:max-h-[85vh]">
          
          {/* RIGHT COLUMN: Hero Splash */}
          <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden bg-zinc-900 border-l border-zinc-900 shrink-0">
            <motion.img
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              src={hero.portraitUrl || hero.iconUrl}
              alt={hero.hero_name}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16">
              <span className="text-zinc-400 font-bold text-sm uppercase tracking-[0.5em] mb-3 block">
                {hero.main_lane}
              </span>
              <DialogTitle className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white leading-[0.8]">
                {hero.hero_name}
              </DialogTitle>
            </div>
          </div>

          {/* LEFT COLUMN: Data Section (BIG & READABLE) */}
          <div className="w-full md:w-1/2 p-10 md:p-16 overflow-y-auto custom-scrollbar bg-zinc-950 flex flex-col gap-16">
            
            {/* 1. HERO RATINGS */}
            <section className="space-y-10">
              <div className="flex items-center gap-3 border-b border-zinc-900 pb-5">
                <Info className="w-6 h-6 text-zinc-100" />
                <h3 className="text-xl font-bold uppercase tracking-widest text-white">
                  Hero Performance
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-10">
                <RatingRow label="Durability" value={hero.ratings.durability} />
                <RatingRow label="Offense" value={hero.ratings.offense} />
                <RatingRow label="Control Effects" value={hero.ratings.control_effects} />
                <RatingRow label="Difficulty" value={hero.ratings.difficulty} />
              </div>
            </section>

            {/* 2. BASE STATISTICS */}
            <section className="space-y-10">
              <div className="flex items-center gap-3 border-b border-zinc-900 pb-5">
                <Activity className="w-6 h-6 text-zinc-100" />
                <h3 className="text-xl font-bold uppercase tracking-widest text-white">
                  Base Statistics
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                {STAT_CONFIG.map((stat) => (
                  <div key={stat.key} className="flex justify-between items-center py-2 border-b border-zinc-900/50">
                    <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</span>
                    <span className="text-xl font-mono font-black text-white">
                      {hero.base_stats[stat.key]}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. ABILITIES */}
            <section className="space-y-10 pb-8">
              <div className="flex items-center gap-3 border-b border-zinc-900 pb-5">
                <Zap className="w-6 h-6 text-zinc-100" />
                <h3 className="text-xl font-bold uppercase tracking-widest text-white">
                  Abilities
                </h3>
              </div>
              <div className="flex flex-col gap-12">
                {hero.skills.map((skill, idx) => (
                  <div key={idx} className="space-y-6">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-black text-white bg-zinc-800 px-4 py-1.5 rounded uppercase tracking-tighter">
                        {skill.type}
                      </span>
                      <div className="h-0.5 flex-1 bg-zinc-900" />
                    </div>

                    <div className="grid grid-cols-1 gap-4 pl-4">
                      {Object.entries(skill.attributes).map(([key, values]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-base text-zinc-400 font-medium">{key}</span>
                          <span className="text-lg text-white font-bold tracking-tight">{getAttributeRange(values)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** 
 * BIG UI COMPONENTS
 */

function RatingRow({ label, value }: { label: string; value: string }) {
  const percent = (parseInt(value) / 10) * 100;
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <span className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">{label}</span>
        <span className="text-3xl font-black text-white leading-none tracking-tighter">{value}<span className="text-lg text-zinc-700">/10</span></span>
      </div>
      <div className="h-2.5 w-full bg-zinc-900 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white transition-all duration-700 ease-out" 
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}