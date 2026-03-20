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
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";

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
          // FIX: Changed bg-black to bg-black/60 + blur to see through to the master background
          className="fixed inset-0 z-150 bg-black/60 backdrop-blur-xl h-screen w-screen overflow-hidden flex flex-col antialiased font-sans"
        >
          {/* NAVIGATION */}
          <nav className="relative z-170 shrink-0 px-8 py-6 bg-transparent">
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

          <div className="relative z-160 flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar bg-transparent">
            <div className="max-w-325 mx-auto px-8 pt-10 pb-32">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                {/* LEFT: PORTRAIT - Fixed the double-motion.div error here */}
                <div className="lg:col-span-5 relative aspect-3/4 rounded-2xl overflow-hidden bg-zinc-900/20 shadow-2xl">
                  <img
                    src={hero.portraitUrl}
                    alt={hero.hero_name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* RIGHT: DATA COLUMN */}
                <div className="lg:col-span-7 flex flex-col pt-4">
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
                        label="Control"
                        value={hero.ratings.control_effects}
                      />
                      <RatingRow
                        label="Difficulty"
                        value={hero.ratings.difficulty}
                      />
                    </div>
                  </section>

                  <section>
                    <h2 className="text-base font-black text-white mb-10 tracking-widest uppercase border-l-4 border-white pl-5 leading-none">
                      Base Statistics
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-10 pl-6">
                      <StatBox
                        label="Health"
                        value={hero.base_stats.hp}
                        icon={<FavoriteIcon />}
                      />
                      <StatBox
                        label="Mana"
                        value={hero.base_stats.mana}
                        icon={<BoltIcon />}
                      />
                      <StatBox
                        label="Phys Atk"
                        value={hero.base_stats.physical_attack}
                        icon={<FlashOnIcon />}
                      />
                      <StatBox
                        label="Phys Def"
                        value={hero.base_stats.physical_defense}
                        icon={<SecurityIcon />}
                      />
                      <StatBox
                        label="Magic Def"
                        value={hero.base_stats.magic_defense}
                        icon={<SecurityIcon />}
                      />
                      <StatBox
                        label="Move Speed"
                        value={hero.base_stats.movement_speed}
                        icon={<SpeedIcon />}
                      />
                    </div>
                  </section>
                </div>
              </div>

              {/* ABILITIES */}
              {/* ABILITIES SECTION */}
              <section className="mt-40 space-y-16 bg-transparent">
                {/* Section Header */}
                <div className="flex items-center gap-6">
                  <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic">
                    Abilities
                  </h2>
                  <div className="h-px flex-1 bg-zinc-800/50" />
                </div>

                <div className="grid grid-cols-1 gap-10">
                  {hero.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row gap-10 p-10 rounded-[3rem] bg-zinc-900/10 border border-zinc-800/50 backdrop-blur-md group hover:border-zinc-500/50 transition-all"
                    >
                      {/* LEFT SIDE: CIRCULAR SKILL ICON */}
                      <div className="flex flex-col items-center gap-4 shrink-0 w-28 md:w-32">
                        <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-zinc-800 group-hover:border-white transition-all bg-zinc-900 shadow-2xl">
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* 2. UPDATED BADGE: Added h-auto, whitespace-normal, and leading-tight */}
                        <Badge
                          variant="outline"
                          className="text-[9px] border-zinc-800 text-zinc-500 uppercase tracking-widest px-3 py-1.5 text-center h-auto whitespace-normal leading-tight flex justify-center"
                        >
                          {skill.type}
                        </Badge>
                      </div>

                      {/* RIGHT SIDE: SKILL CONTENT */}
                      <div className="flex-1 space-y-6">
                        {/* Header: Name + Cooldown/Mana */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-900 pb-5 gap-4">
                          <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                            {skill.name}
                          </h3>

                          <div className="flex gap-4">
                            {/* Cooldown Display (Skips if "null") */}
                            {skill.cooldown && skill.cooldown !== "null" && (
                              <div className="flex items-center gap-1.5 text-zinc-400">
                                <AccessTimeIcon sx={{ fontSize: 14 }} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">
                                  {skill.cooldown}s
                                </span>
                              </div>
                            )}

                            {/* Mana Cost Display (Skips if "null") */}
                            {skill.manacost && skill.manacost !== "null" && (
                              <div className="flex items-center gap-1.5 text-zinc-400">
                                <LocalActivityIcon sx={{ fontSize: 14 }} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">
                                  {skill.manacost}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Description Text */}
                        <p className="text-base leading-relaxed text-zinc-300 max-w-4xl font-medium">
                          {skill.description}
                        </p>

                        {/* Dynamic Attributes Grid (Damage, Scaling, etc.) */}
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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
        {React.cloneElement(icon, { sx: { fontSize: 22 } })}
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-2">
          {label}
        </span>
        <span className="text-2xl font-black text-white tracking-tighter leading-none">
          {value}
        </span>
      </div>
    </div>
  );
}
