"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MLBBHero } from "@/types/hero";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SvgIconProps } from "@mui/material";
import { EtherealShadow } from "@/components/ui/etheral-shadow";

// MATERIAL UI ICONS
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SecurityIcon from "@mui/icons-material/Security";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import SpeedIcon from "@mui/icons-material/Speed";
import BoltIcon from "@mui/icons-material/Bolt";
import ReplayIcon from "@mui/icons-material/Replay";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

interface HeroDetailsProps {
  hero: MLBBHero | null;
  isOpen: boolean;
  onClose: () => void;
}

export function HeroDetails({ hero, isOpen, onClose }: HeroDetailsProps) {
  // Prevent browser scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  if (!hero) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-200 bg-black h-screen w-screen overflow-hidden flex flex-col font-sans antialiased"
        >
          {/* 1. BACKGROUND LAYER: Ethereal Shadow */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <EtherealShadow
              color="rgba(59, 130, 246, 0.15)" // Subtle blue aura
              animation={{ scale: 80, speed: 80 }}
              noise={{ opacity: 0.08, scale: 0.5 }}
              className="h-full w-full"
            />
          </div>

          {/* 2. STICKY TOP NAV */}
          <nav className="relative z-220 shrink-0 flex items-center px-8 py-6 bg-black/60 backdrop-blur-md border-b border-zinc-900/50">
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-zinc-400 hover:text-white transition-colors p-0"
            >
              <ArrowBackIcon className="mr-2 h-5 w-5" />
              <span className="text-xs font-black tracking-widest uppercase italic">
                Close File
              </span>
            </Button>
          </nav>

          {/* 3. SCROLLABLE CONTENT AREA */}
          <div className="relative z-210 flex-1 overflow-y-auto custom-scrollbar">
            <div className="max-w-325 mx-auto px-8 pt-12 pb-32">
              {/* HEADER SECTION */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-20">
                {/* PORTRAIT */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="lg:col-span-5 relative aspect-4/5 rounded-[2.5rem] overflow-hidden border border-transparent bg-zinc-900/10 shadow-2xl"
                >
                  <img
                    src={hero.portraitUrl}
                    alt={hero.hero_name}
                    className="w-full h-full object-contain"
                  />
                </motion.div>

                {/* IDENTITY & RATINGS */}
                <div className="lg:col-span-7 flex flex-col pt-4">
                  <header className="mb-12">
                    <Badge className="bg-zinc-800 text-zinc-400 border-none mb-4 px-4 py-1.5 text-[11px] uppercase tracking-widest font-black">
                      {hero.main_role} / {hero.main_lane}
                    </Badge>
                    <h1 className="text-8xl font-black text-white tracking-tighter leading-none italic uppercase">
                      {hero.hero_name}
                    </h1>
                  </header>

                  <section className="mb-14">
                    <h2 className="text-xl font-black text-white mb-10 tracking-tight uppercase border-l-4 border-white pl-6 leading-none">
                      Hero Performance
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 pl-7">
                      <RatingRow
                        label="Durability"
                        value={hero.ratings.durability}
                      />
                      <RatingRow label="Offense" value={hero.ratings.offense} />
                      <RatingRow
                        label="Control"
                        value={hero.ratings.control_effects}
                      />
                      <RatingRow
                        label="Difficulty"
                        value={hero.ratings.difficulty}
                      />
                    </div>
                  </section>

                  {/* BASE STATISTICS GRID */}
                  <section>
                    <h2 className="text-xl font-black text-white mb-10 tracking-tight uppercase border-l-4 border-white pl-6 leading-none">
                      Base Statistics
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-12 pl-7">
                      <StatBox
                        label="Health"
                        value={hero.base_stats.hp}
                        icon={<FavoriteIcon />}
                      />
                      <StatBox
                        label="HP Regen"
                        value={hero.base_stats.hp_regen}
                        icon={<ReplayIcon />}
                      />
                      <StatBox
                        label="Mana Cap"
                        value={hero.base_stats.mana}
                        icon={<BoltIcon />}
                      />
                      <StatBox
                        label="Mana Reg"
                        value={hero.base_stats.mana_regen}
                        icon={<ReplayIcon />}
                      />
                      <StatBox
                        label="Phy Atk"
                        value={hero.base_stats.physical_attack}
                        icon={<FlashOnIcon />}
                      />
                      <StatBox
                        label="Phy Def"
                        value={hero.base_stats.physical_defense}
                        icon={<SecurityIcon />}
                      />
                      <StatBox
                        label="Mag Pwr"
                        value={hero.base_stats.magic_power}
                        icon={<AutoFixHighIcon />}
                      />
                      <StatBox
                        label="Mag Def"
                        value={hero.base_stats.magic_defense}
                        icon={<SecurityIcon />}
                      />
                      <StatBox
                        label="Speed"
                        value={hero.base_stats.movement_speed}
                        icon={<SpeedIcon />}
                      />
                    </div>
                  </section>
                </div>
              </div>

              {/* ABILITIES SECTION */}
              <section className="space-y-16 mt-32">
                <div className="flex items-center gap-8">
                  <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic">
                    Abilities
                  </h2>
                  <div className="h-px flex-1 bg-zinc-900" />
                </div>
                <div className="grid grid-cols-1 gap-10">
                  {hero.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row gap-12 p-12 rounded-[3rem] bg-zinc-900/10 border border-zinc-800/50 backdrop-blur-sm"
                    >
                      <div className="w-20 h-20 rounded-2xl bg-white text-black flex items-center justify-center font-black text-4xl shrink-0 shadow-2xl">
                        {index === 0 ? "P" : index}
                      </div>
                      <div className="flex-1 space-y-8">
                        <div className="flex justify-between items-center border-b border-zinc-800 pb-6">
                          <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">
                            {skill.type}
                          </h3>
                          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                            Max Lv. {skill.max_levels}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10">
                          {Object.entries(skill.attributes).map(
                            ([key, values]) => (
                              <div key={key} className="space-y-2">
                                <p className="text-xs font-black uppercase text-zinc-500 tracking-widest">
                                  {key.replace(/_/g, " ")}
                                </p>
                                <p className="text-xl font-bold text-zinc-200">
                                  {values.join(" / ")}
                                </p>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** HELPER: RATING ROW **/
function RatingRow({ label, value }: { label: string; value: string }) {
  const score = parseInt(value);
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase text-zinc-500 tracking-widest">
          {label}
        </span>
        <span className="text-lg font-black text-white">
          {score}
          <span className="text-zinc-700 font-normal text-xs ml-1">/ 10</span>
        </span>
      </div>
      <div className="flex gap-2">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-all duration-700 ${
              i < score
                ? "bg-white shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                : "bg-zinc-900"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/** HELPER: STAT BOX **/
function StatBox({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactElement<SvgIconProps>;
}) {
  return (
    <div className="flex items-start gap-5 group">
      <div className="text-white mt-1 shrink-0">
        {React.cloneElement(icon, { sx: { fontSize: 24 } })}
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 leading-none">
          {label}
        </span>
        <span className="text-2xl font-black text-white tracking-tighter leading-none">
          {value}
        </span>
      </div>
    </div>
  );
}
