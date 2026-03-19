"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MLBBHero } from "@/types/hero";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// MATERIAL UI ICONS (Forced to White)
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SecurityIcon from '@mui/icons-material/Security';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import SpeedIcon from '@mui/icons-material/Speed';
import PsychologyIcon from '@mui/icons-material/Psychology';
import BoltIcon from '@mui/icons-material/Bolt';
import ReplayIcon from '@mui/icons-material/Replay';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

interface HeroDetailsProps {
  hero: MLBBHero | null;
  isOpen: boolean;
  onClose: () => void;
}

export function HeroDetails({ hero, isOpen, onClose }: HeroDetailsProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!hero) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed inset-0 z-100 bg-zinc-950 h-screen overflow-y-auto antialiased font-sans text-zinc-300"
        >
          {/* STICKY HEADER */}
          <nav className="sticky top-0 z-110 flex items-center justify-between px-6 py-4 border-b border-zinc-900 bg-zinc-950/90 backdrop-blur-md">
            <Button 
              variant="ghost" 
              onClick={onClose} 
              className="text-white hover:bg-zinc-800 font-medium text-sm transition-colors"
            >
              <ArrowBackIcon className="mr-2 h-4 w-4 text-white" />
              BACK TO ROSTER
            </Button>
            <div className="text-right">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                {hero.main_lane} Lane
              </span>
            </div>
          </nav>

          <div className="max-w-6xl mx-auto px-6 py-10 md:py-16">
            {/* MAIN GRID CONTAINER */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              
              {/* LEFT COLUMN: HERO PORTRAIT */}
              <div className="space-y-6">
                <div className="relative aspect-4/5 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900">
                  <img 
                    src={hero.portraitUrl} 
                    alt={hero.hero_name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="space-y-3">
                    <div className="flex gap-2">
                        {hero.all_roles.map(role => (
                        <Badge key={role} variant="secondary" className="bg-zinc-800 text-zinc-300 border-zinc-700 font-medium px-2 py-0.5 text-[12px]">
                            {role}
                        </Badge>
                        ))}
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-100 uppercase">
                        {hero.hero_name}
                    </h1>
                </div>
              </div>

              {/* RIGHT COLUMN: PERFORMANCE & BASE STATS (GROUPED) */}
              <div className="flex flex-col gap-12">
                
                {/* 1. HERO PERFORMANCE (RATINGS) - AT THE TOP */}
                <section className="space-y-6">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-zinc-100 uppercase tracking-tight">Hero Performance</h2>
                    <p className="text-sm text-zinc-500">Official attribute ratings on a scale of 1-10.</p>
                  </div>
                  <div className="space-y-5 bg-zinc-900/20 p-6 rounded-2xl border border-zinc-900">
                    <RatingRow label="Durability" value={hero.ratings.durability} />
                    <RatingRow label="Offense" value={hero.ratings.offense} />
                    <RatingRow label="Control Effects" value={hero.ratings.control_effects} />
                    <RatingRow label="Difficulty" value={hero.ratings.difficulty} />
                  </div>
                </section>

                {/* 2. BASE STATISTICS - DIRECTLY BELOW PERFORMANCE */}
                <section className="space-y-6">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-zinc-100 uppercase tracking-tight">Base Statistics</h2>
                    <p className="text-sm text-zinc-500">Starting attributes for {hero.hero_name}.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 bg-zinc-900/20 p-6 rounded-2xl border border-zinc-900">
                    <StatLine label="Health Points" value={hero.base_stats.hp} icon={<FavoriteIcon className="text-white scale-75" />} />
                    <StatLine label="HP Regeneration" value={hero.base_stats.hp_regen} icon={<ReplayIcon className="text-white scale-75" />} />
                    <StatLine label="Mana Capacity" value={hero.base_stats.mana} icon={<BoltIcon className="text-white scale-75" />} />
                    <StatLine label="Mana Regeneration" value={hero.base_stats.mana_regen} icon={<ReplayIcon className="text-white scale-75" />} />
                    <StatLine label="Physical Attack" value={hero.base_stats.physical_attack} icon={<FlashOnIcon className="text-white scale-75" />} />
                    <StatLine label="Physical Defense" value={hero.base_stats.physical_defense} icon={<SecurityIcon className="text-white scale-75" />} />
                    <StatLine label="Magic Power" value={hero.base_stats.magic_power} icon={<AutoFixHighIcon className="text-white scale-75" />} />
                    <StatLine label="Magic Defense" value={hero.base_stats.magic_defense} icon={<SecurityIcon className="text-white scale-75" />} />
                    <StatLine label="Movement Speed" value={hero.base_stats.movement_speed} icon={<SpeedIcon className="text-white scale-75" />} />
                    <StatLine label="Attack Speed" value={hero.base_stats.attack_speed} icon={<FlashOnIcon className="text-white scale-75" />} />
                    <StatLine label="Atk Speed Ratio" value={hero.base_stats.attack_speed_ratio} icon={<WorkspacePremiumIcon className="text-white scale-75" />} />
                  </div>
                </section>
              </div>
            </div>

            {/* ABILITIES SECTION (Full width below the grid) */}
            <section className="mt-20 space-y-10 pb-20 border-t border-zinc-900 pt-16">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-zinc-100 uppercase tracking-tight">Abilities & Skills</h2>
                <p className="text-zinc-500 text-base">Comprehensive breakdown of active and passive skills.</p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {hero.skills.map((skill, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-8 p-8 rounded-2xl bg-zinc-900/10 border border-zinc-900">
                    <div className="flex flex-col items-center gap-3 shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center font-bold text-xl">
                        {index === 0 ? "P" : index}
                      </div>
                      <Badge variant="outline" className="text-[10px] text-zinc-500 border-zinc-800 uppercase tracking-widest">
                        {skill.type.split(' ')[0]}
                      </Badge>
                    </div>

                    <div className="flex-1 space-y-6">
                      <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
                        <h3 className="text-lg font-bold text-zinc-200 uppercase tracking-tight">{skill.type}</h3>
                        <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Max Lvl: {skill.max_levels}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                        {Object.entries(skill.attributes).length > 0 ? (
                          Object.entries(skill.attributes).map(([key, values]) => (
                            <div key={key} className="space-y-1">
                              <p className="text-[11px] font-bold uppercase text-zinc-500 tracking-wider">
                                {key.replace(/_/g, ' ')}
                              </p>
                              <p className="text-base font-medium text-zinc-300 leading-relaxed">
                                {values.join(" / ")}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-zinc-600 italic">Static ability - no level-based scaling.</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** HELPER: Ratings Component **/
function RatingRow({ label, value }: { label: string, value: string }) {
  const score = parseInt(value);
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-zinc-400">{label}</span>
        <span className="text-base font-bold text-zinc-100">{score}<span className="text-zinc-600 font-normal">/10</span></span>
      </div>
      <div className="flex gap-1.5">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 flex-1 rounded-full ${i < score ? "bg-white" : "bg-zinc-800"}`}
          />
        ))}
      </div>
    </div>
  );
}

/** HELPER: StatLine Component **/
function StatLine({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-zinc-900 last:border-0">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-5 h-5 rounded bg-zinc-800 text-white">
          {icon}
        </div>
        <span className="text-sm font-medium text-zinc-500">
          {label}
        </span>
      </div>
      <span className="text-base font-semibold text-zinc-200 tabular-nums">
        {value}
      </span>
    </div>
  );
}