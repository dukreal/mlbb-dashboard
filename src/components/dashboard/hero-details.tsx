"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MLBBHero } from "@/types/hero";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SvgIconProps } from "@mui/material";

// ICONS
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SecurityIcon from "@mui/icons-material/Security";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import SpeedIcon from "@mui/icons-material/Speed";
import BoltIcon from "@mui/icons-material/Bolt";
import ReplayIcon from "@mui/icons-material/Replay";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import MapIcon from "@mui/icons-material/Map";

interface HeroDetailsProps {
  hero: MLBBHero | null;
  isOpen: boolean;
  onClose: () => void;
}

export function HeroDetails({ hero, isOpen, onClose }: HeroDetailsProps) {
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
          className="fixed inset-0 z-150 bg-black h-screen overflow-y-auto overflow-x-hidden antialiased font-sans"
        >
          {/* NAVIGATION - Transparent and Ghost Button Fix */}
          <nav className="absolute top-0 left-0 w-full z-160 px-8 py-6 bg-transparent">
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-zinc-500 hover:text-white hover:bg-transparent transition-all p-0 group"
            >
              <ArrowBackIcon className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
              <span className="text-[10px] font-black tracking-widest uppercase italic">
                Close File
              </span>
            </Button>
          </nav>

          <div className="max-w-325 mx-auto px-8 pt-24 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              {/* LEFT: HERO IMAGE */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="lg:col-span-5 relative aspect-3/4 rounded-2xl overflow-hidden border border-transparent bg-zinc-900/10"
              >
                <img
                  src={hero.portraitUrl}
                  alt={hero.hero_name}
                  className="w-full h-full object-contain"
                />
              </motion.div>

              {/* RIGHT: DATA COLUMN */}
              <div className="lg:col-span-7 flex flex-col">
                <header className="mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md text-black font-black text-[9px] uppercase tracking-tighter">
                      <MapIcon sx={{ fontSize: 12 }} />
                      {hero.main_lane}
                    </div>
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
                  <h1 className="text-8xl font-black text-white tracking-tighter leading-[0.85] uppercase italic">
                    {hero.hero_name}
                  </h1>
                </header>

                {/* PERFORMANCE */}
                <section className="mb-14">
                  <h2 className="text-base font-black text-white mb-8 tracking-widest uppercase border-l-4 border-white pl-5 leading-none">
                    Hero Performance
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 pl-6">
                    <RatingRow
                      label="Durability"
                      value={hero.ratings.durability}
                    />
                    <RatingRow label="Offense" value={hero.ratings.offense} />
                    <RatingRow
                      label="Control Effects"
                      value={hero.ratings.control_effects}
                    />
                    <RatingRow
                      label="Difficulty"
                      value={hero.ratings.difficulty}
                    />
                  </div>
                </section>

                {/* STATISTICS */}
                <section>
                  <h2 className="text-base font-black text-white mb-10 tracking-widest uppercase border-l-4 border-white pl-5 leading-none">
                    Base Statistics
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-10 pl-6">
                    <StatBox
                      label="Health Points"
                      value={hero.base_stats.hp}
                      icon={<FavoriteIcon />}
                    />
                    <StatBox
                      label="HP Regeneration"
                      value={hero.base_stats.hp_regen}
                      icon={<ReplayIcon />}
                    />
                    <StatBox
                      label="Mana Capacity"
                      value={hero.base_stats.mana}
                      icon={<BoltIcon />}
                    />
                    <StatBox
                      label="Mana Regen"
                      value={hero.base_stats.mana_regen}
                      icon={<ReplayIcon />}
                    />
                    <StatBox
                      label="Physical Attack"
                      value={hero.base_stats.physical_attack}
                      icon={<FlashOnIcon />}
                    />
                    <StatBox
                      label="Physical Defense"
                      value={hero.base_stats.physical_defense}
                      icon={<SecurityIcon />}
                    />
                    <StatBox
                      label="Magic Power"
                      value={hero.base_stats.magic_power}
                      icon={<AutoFixHighIcon />}
                    />
                    <StatBox
                      label="Magic Defense"
                      value={hero.base_stats.magic_defense}
                      icon={<SecurityIcon />}
                    />
                    <StatBox
                      label="Movement Speed"
                      value={hero.base_stats.movement_speed}
                      icon={<SpeedIcon />}
                    />
                    <StatBox
                      label="Attack Speed"
                      value={hero.base_stats.attack_speed}
                      icon={<FlashOnIcon />}
                    />
                    <StatBox
                      label="Atk Speed Ratio"
                      value={hero.base_stats.attack_speed_ratio}
                      icon={<WorkspacePremiumIcon />}
                    />
                  </div>
                </section>
              </div>
            </div>

            {/* ABILITIES SECTION - Updated with Icons and Descriptions */}
            <section className="mt-32 space-y-16 pb-20">
              <div className="flex items-center gap-6">
                <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic">
                  Abilities
                </h2>
                <div className="h-px flex-1 bg-zinc-900" />
              </div>

              <div className="grid grid-cols-1 gap-10">
                {hero.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row gap-10 p-10 rounded-[2.5rem] bg-zinc-900/10 border border-zinc-900/50 backdrop-blur-sm group hover:border-zinc-700 transition-all"
                  >
                    {/* SKILL ICON & TYPE */}
                    <div className="flex flex-col items-center gap-4 shrink-0">
                      {/* Changed rounded-2xl to rounded-full */}
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-zinc-800 group-hover:border-white transition-all shadow-2xl bg-zinc-900">
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />

                        {/* Adjusted the indicator badge to be a circle (rounded-full) */}
                        <div className="absolute top-1 right-1 bg-black/90 w-7 h-7 flex items-center justify-center text-[10px] font-black text-white rounded-full border border-zinc-800 shadow-lg">
                          {index === 0 ? "P" : `S${index}`}
                        </div>
                      </div>

                      <Badge
                        variant="outline"
                        className="text-[9px] border-zinc-800 text-zinc-500 uppercase tracking-widest px-3"
                      >
                        {skill.type}
                      </Badge>
                    </div>
                    {/* SKILL DETAILS */}
                    <div className="flex-1 space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-900 pb-4 gap-4">
                        <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                          {skill.name}
                        </h3>
                        {skill.max_levels > 0 && (
                          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
                            Max Level: {skill.max_levels}
                          </span>
                        )}
                      </div>

                      {/* DESCRIPTION */}
                      <p className="text-base leading-relaxed text-zinc-300 max-w-4xl">
                        {skill.description}
                      </p>

                      {/* DYNAMIC ATTRIBUTES GRID */}
                      {Object.keys(skill.attributes).length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6 pt-4">
                          {Object.entries(skill.attributes).map(
                            ([key, values]) => (
                              <div
                                key={key}
                                className="space-y-1.5 border-l-2 border-zinc-800 pl-4"
                              >
                                <p className="text-[10px] font-black uppercase text-zinc-500 tracking-wider">
                                  {key.replace(/_/g, " ")}
                                </p>
                                <p className="text-sm font-bold text-white tracking-tight leading-none">
                                  {values.join(" / ")}
                                </p>
                              </div>
                            ),
                          )}
                        </div>
                      )}
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

/** HELPER COMPONENTS (RatingRow, StatBox) **/
function RatingRow({ label, value }: { label: string; value: string }) {
  const score = parseInt(value);
  return (
    <div className="space-y-3.5">
      <div className="flex justify-between items-center px-0.5">
        <span className="text-[11px] font-black uppercase text-zinc-500 tracking-widest">
          {label}
        </span>
        <span className="text-base font-black text-white">
          {score}
          <span className="text-zinc-800 font-normal text-xs ml-1">/ 10</span>
        </span>
      </div>
      <div className="flex gap-2">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-sm transition-all duration-700 ${i < score ? "bg-white shadow-[0_0_12px_rgba(255,255,255,0.2)]" : "bg-zinc-900"}`}
          />
        ))}
      </div>
    </div>
  );
}

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
      <div className="text-white mt-1 shrink-0 opacity-80">
        {React.cloneElement(icon, { sx: { fontSize: 20 } })}
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-2">
          {label}
        </span>
        <span className="text-xl font-bold text-white tracking-tight leading-none">
          {value}
        </span>
      </div>
    </div>
  );
}
