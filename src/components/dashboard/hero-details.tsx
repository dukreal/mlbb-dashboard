"use client";

import React, { useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MLBBHero } from "@/types/hero";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ExpLaneIcon, 
  GoldLaneIcon, 
  JungleLaneIcon, 
  MidLaneIcon, 
  RoamLaneIcon 
} from "@/components/ui/icons/LaneIcons";

// LUCIDE ICONS (As Approved)
import { 
  ArrowLeft,
  Cross,          // Health Points
  HeartPlus,      // HP Regeneration
  Droplet,        // Mana Capacity
  FlaskRound,     // Mana Regeneration
  Sword,          // Physical Attack
  Shield,         // Physical Defense
  WandSparkles,   // Magic Power
  ShieldHalf,     // Magic Defense
  ChevronsUp,     // Movement Speed
  BowArrow,       // Attack Speed
  Repeat,         // Attack Speed Ratio
  Hourglass,      // Cooldown
  Zap,            // Cost
  Map as MapIcon  // Fallback Lane
} from "lucide-react";

interface HeroDetailsProps {
  hero: MLBBHero | null;
  isOpen: boolean;
  onClose: () => void;
}

// Helper to determine the correct lane icon
const getLaneIcon = (lane: string) => {
  const l = lane?.toLowerCase() || "";
  if (l.includes("exp")) return ExpLaneIcon;
  if (l.includes("gold")) return GoldLaneIcon;
  if (l.includes("jungle")) return JungleLaneIcon;
  if (l.includes("mid")) return MidLaneIcon;
  if (l.includes("roam")) return RoamLaneIcon;
  return MapIcon;
};

export function HeroDetails({ hero, isOpen, onClose }: HeroDetailsProps) {
  // Prevent browser scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!hero || hero.id === "none") return null;

  const LaneIcon = getLaneIcon(hero.main_lane);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // bg-black/40 and backdrop-blur allows the page.tsx background to stay seamless
          className="fixed inset-0 z-150 bg-black/40 backdrop-blur-md h-screen w-screen overflow-hidden flex flex-col antialiased font-sans"
        >
          {/* 1. NAVIGATION - Transparent background */}
          <nav className="relative z-170 shrink-0 px-8 py-6 bg-transparent">
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-zinc-500 hover:text-white hover:bg-transparent transition-all p-0 group"
            >
              <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
              <span className="text-[10px] font-black tracking-widest uppercase italic">
                Close File
              </span>
            </Button>
          </nav>

          {/* 2. SCROLLABLE CONTENT AREA */}
          <div className="relative z-160 flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar bg-transparent">
            <div className="max-w-325 mx-auto px-8 pt-10 pb-32">
              
              {/* TOP SECTION: IMAGE AND STATS */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-20">
                
                {/* LEFT: HERO IMAGE (No visible border, contained scale) */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="lg:col-span-5 relative aspect-3/4 rounded-2xl overflow-hidden border border-transparent bg-zinc-900/10 shadow-2xl"
                >
                  <img
                    src={hero.portraitUrl}
                    alt={hero.hero_name}
                    className="w-full h-full object-contain"
                  />
                </motion.div>

                {/* RIGHT: DATA COLUMN */}
                <div className="lg:col-span-7 flex flex-col pt-4">
                  <header className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                      {/* Custom Lane Badge */}
                      <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md text-black font-black text-[9px] uppercase tracking-tighter shadow-xl">
                        <LaneIcon size={12} strokeWidth={3} />
                        {hero.main_lane}
                      </div>
                      {/* Roles Display */}
                      <div className="flex gap-1.5">
                        {hero.all_roles.map((role, idx) => (
                          <span
                            key={role}
                            className={`text-[11px] font-black uppercase tracking-widest ${idx === 0 ? "text-blue-500" : "text-zinc-500"}`}
                          >
                            {role}
                            {idx < hero.all_roles.length - 1 ? " /" : ""}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* Hero Name: High emphasis sentence case italic */}
                    <h1 className="text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.85] uppercase italic">
                      {hero.hero_name}
                    </h1>
                  </header>

                  {/* HERO PERFORMANCE (RATINGS) */}
                  <section className="mb-14">
                    <h2 className="text-base font-black text-white mb-8 tracking-widest uppercase border-l-4 border-white pl-5 leading-none">
                      Hero Performance
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 pl-6">
                      <RatingRow label="Durability" value={hero.ratings.durability} />
                      <RatingRow label="Offense" value={hero.ratings.offense} />
                      <RatingRow label="Control Effects" value={hero.ratings.control_effects} />
                      <RatingRow label="Difficulty" value={hero.ratings.difficulty} />
                    </div>
                  </section>

                  {/* BASE STATISTICS (11 Stats Grid) */}
                  <section>
                    <h2 className="text-base font-black text-white mb-10 tracking-widest uppercase border-l-4 border-white pl-5 leading-none">
                      Base Statistics
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-12 pl-7">
                      <StatBox label="Health Points" value={hero.base_stats.hp} icon={Cross} />
                      <StatBox label="HP Regeneration" value={hero.base_stats.hp_regen} icon={HeartPlus} />
                      <StatBox label="Movement Speed" value={hero.base_stats.movement_speed} icon={ChevronsUp} />

                      <StatBox label="Mana Capacity" value={hero.base_stats.mana} icon={Droplet} />
                      <StatBox label="Mana Regeneration" value={hero.base_stats.mana_regen} icon={FlaskRound} />
                      <StatBox label="Magic Power" value={hero.base_stats.magic_power} icon={WandSparkles} />

                      <StatBox label="Physical Attack" value={hero.base_stats.physical_attack} icon={Sword} />
                      <StatBox label="Attack Speed" value={hero.base_stats.attack_speed} icon={BowArrow} />
                      <StatBox label="Atk Speed Ratio" value={hero.base_stats.attack_speed_ratio} icon={Repeat} />

                      <StatBox label="Physical Defense" value={hero.base_stats.physical_defense} icon={Shield} />
                      <StatBox label="Magic Defense" value={hero.base_stats.magic_defense} icon={ShieldHalf} />

                      <div className="hidden sm:block opacity-0" aria-hidden="true" />
                    </div>
                  </section>
                </div>
              </div>

              {/* ABILITIES SECTION */}
              <section className="mt-40 space-y-16">
                <div className="flex items-center gap-6">
                  <h2 className="text-4xl font-bold text-white tracking-tight">
                    Abilities
                  </h2>
                  <div className="h-px flex-1 bg-zinc-800/50" />
                </div>

                <div className="grid grid-cols-1 gap-10">
                  {hero.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row gap-8 lg:gap-12 p-8 lg:p-10 rounded-[2.5rem] bg-zinc-900/10 border border-zinc-800/40 backdrop-blur-md group hover:border-zinc-500/30 transition-all"
                    >
                      {/* LEFT: CIRCULAR ICON AND BADGE */}
                      <div className="flex flex-col items-center gap-5 shrink-0 w-28 lg:w-32">
                        <div className="relative w-24 h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-2 border-zinc-800 group-hover:border-white transition-all bg-zinc-900 shadow-xl">
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <Badge
                          variant="outline"
                          className="text-[11px] lg:text-xs font-bold border-zinc-700 text-zinc-400 px-3 py-2 rounded-xl w-full flex items-center justify-center text-center h-auto min-h-9 whitespace-normal leading-tight bg-zinc-900/30"
                        >
                          {skill.type.toLowerCase().split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                        </Badge>
                      </div>

                      {/* RIGHT: DESCRIPTION AND DYNAMIC ATTRIBUTES */}
                      <div className="flex-1 space-y-6">
                        <div className="flex flex-col gap-3 border-b border-zinc-800/50 pb-5">
                          <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                            {skill.name}
                          </h3>
                          <div className="flex flex-wrap gap-5">
                            {skill.cooldown && skill.cooldown !== "null" && (
                              <div className="flex items-center gap-1.5 text-zinc-500">
                                <Hourglass size={16} />
                                <span className="text-xs font-semibold uppercase tracking-wider">Cooldown: {skill.cooldown}s</span>
                              </div>
                            )}
                            {skill.manacost && skill.manacost !== "null" && (
                              <div className="flex items-center gap-1.5 text-zinc-500">
                                <Zap size={16} />
                                <span className="text-xs font-semibold uppercase tracking-wider">Cost: {skill.manacost}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="text-base lg:text-lg leading-[1.65] text-zinc-300 max-w-4xl font-normal">
                          {skill.description}
                        </p>

                        {Object.keys(skill.attributes).length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6 pt-4">
                            {Object.entries(skill.attributes).map(([key, values]) => (
                              <div key={key} className="space-y-1.5 border-l-2 border-zinc-800 pl-4">
                                <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">{key.replace(/_/g, " ")}</p>
                                <p className="text-sm lg:text-base font-bold text-white tracking-tight">{values.join(" / ")}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* FOOTER: Liquipedia TOS Attribution */}
              <footer className="mt-40 py-10 text-center opacity-30">
                <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] leading-relaxed">
                  Data and Icons provided by <a href="https://liquipedia.net/mobilelegends/" target="_blank" className="underline">Liquipedia</a>.
                  <br />
                  Mobile Legends: Bang Bang is a trademark of Moonton Games.
                </p>
              </footer>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** COMPONENT: RATING ROW **/
const RatingRow = memo(({ label, value }: { label: string; value: string }) => {
  const score = parseInt(value);
  return (
    <div className="space-y-3.5">
      <div className="flex justify-between items-end px-0.5">
        <span className="text-[11px] font-black uppercase text-zinc-400 tracking-widest">{label}</span>
        <div className="flex items-baseline">
          <span className="text-xl font-black text-white leading-none">{score}</span>
          <span className="text-sm font-medium text-zinc-500 ml-1.5 tracking-tighter">/ 10</span>
        </div>
      </div>
      <div className="flex gap-2">
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-sm transition-all duration-700 ${i < score ? "bg-white shadow-[0_0_12px_rgba(255,255,255,0.2)]" : "bg-zinc-800/50"}`} />
        ))}
      </div>
    </div>
  );
});
RatingRow.displayName = "RatingRow";

/** COMPONENT: STAT BOX (Lucide Component Pattern) **/
const StatBox = memo(({ label, value, icon: Icon }: { label: string; value: string; icon: any }) => {
  return (
    <div className="flex items-start gap-5 group">
      <div className="text-white mt-1 shrink-0 opacity-80">
        <Icon size={24} strokeWidth={2.5} />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-2">{label}</span>
        <span className="text-xl font-bold text-white tracking-tight leading-none">{value}</span>
      </div>
    </div>
  );
});
StatBox.displayName = "StatBox";