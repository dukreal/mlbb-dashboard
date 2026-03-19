"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MLBBHero } from "@/types/hero";
import { Input } from "@/components/ui/input";
import { HeroDetails } from "./hero-details";
import { EtherealShadow } from "@/components/ui/etheral-shadow";

// MATERIAL UI ICONS
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface HeroGalleryProps {
  heroes: MLBBHero[];
}

const ROLES = ["All", "Tank", "Fighter", "Assassin", "Mage", "Marksman", "Support"];

export function HeroGallery({ heroes }: HeroGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedHero, setSelectedHero] = useState<MLBBHero | null>(null);
  
  // State for mobile dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredHeroes = useMemo(() => {
    return heroes.filter((hero) => {
      const matchesSearch = hero.hero_name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = selectedRole === "All" || hero.all_roles.includes(selectedRole);
      return matchesSearch && matchesRole;
    });
  }, [searchQuery, selectedRole, heroes]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-black font-sans antialiased">
      
      {/* 1. BACKGROUND LAYER */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <EtherealShadow 
          color="rgba(59, 130, 246, 0.25)" 
          animation={{ scale: 50, speed: 80 }}
          noise={{ opacity: 0.1, scale: 0.5 }}
          className="h-full w-full"
        />
        {/* Subtle overlay to keep text readable */}
        <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black opacity-60" />
      </div>

      {/* 2. UI LAYER - Symmetrical padding to ensure scrollbar visibility */}
      <div className="relative z-10 flex h-full flex-col bg-transparent px-8 pt-6 pb-6 md:px-12 md:pt-10 md:pb-10 lg:px-16 lg:pt-12 lg:pb-12">
        
        {/* HEADER AREA */}
        <header className="mb-8 shrink-0 space-y-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-900 pb-5 gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic leading-none">
                Hero Roster
              </h1>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-[0.3em]">
                By: Duk
              </p>
            </div>

            {/* --- RESPONSIVE FILTERS --- */}
            
            {/* MOBILE DROPDOWN (Visible only on small screens) */}
            <div className="relative md:hidden w-full">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between px-5 py-3 bg-zinc-900/60 border-2 border-zinc-800 rounded-xl text-white text-sm font-bold uppercase tracking-widest shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <FilterListIcon sx={{ fontSize: 18 }} />
                  <span>Role: {selectedRole}</span>
                </div>
                <KeyboardArrowDownIcon 
                  className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 z-100 bg-zinc-900 border-2 border-zinc-800 rounded-xl overflow-hidden shadow-2xl"
                  >
                    {ROLES.map((role) => (
                      <button
                        key={role}
                        onClick={() => {
                          setSelectedRole(role);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-5 py-4 text-sm font-bold uppercase tracking-widest transition-colors ${
                          selectedRole === role 
                            ? "bg-white text-black" 
                            : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* DESKTOP BUTTONS (Hidden on mobile) */}
            <div className="hidden md:flex flex-wrap gap-2">
              {ROLES.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`px-5 py-2 text-sm font-bold transition-all rounded-lg border-2 ${
                    selectedRole === role
                      ? "bg-white text-black border-white shadow-lg"
                      : "bg-zinc-900/40 text-zinc-400 border-zinc-800 hover:border-zinc-500 hover:text-white"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="relative w-full max-w-[320px]">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" sx={{ fontSize: 20 }} />
            <Input
              placeholder="Search heroes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 border-zinc-800 bg-zinc-900/50 pl-10 text-sm text-zinc-200 focus:border-zinc-600 rounded-lg"
            />
          </div>
        </header>

        {/* 3. SCROLLABLE GALLERY */}
        <div className="relative flex-1 overflow-hidden flex flex-col bg-transparent">
          <div className="custom-scrollbar overflow-y-auto pr-4 h-full bg-transparent">
            <motion.div 
              layout
              className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-11 gap-x-5 gap-y-12"
            >
              <AnimatePresence mode="popLayout">
                {filteredHeroes.map((hero) => (
                  <motion.div
                    key={hero.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedHero(hero)}
                    className="group cursor-pointer flex flex-col items-center"
                  >
                    {/* ICON: Large w-24 size */}
                    <div className="relative w-24 h-24 mb-4 rounded-2xl border-2 border-zinc-900 bg-zinc-900/60 transition-all duration-300 group-hover:border-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] overflow-hidden shrink-0">
                      <img
                        src={hero.iconUrl}
                        alt={hero.hero_name}
                        className="h-full w-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                      />
                    </div>
                    
                    {/* TEXT: Name (text-base) and Role (text-[11px]) */}
                    <div className="text-center w-full space-y-1">
                      <h2 className="text-base font-bold text-white leading-tight truncate px-1 uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                        {hero.hero_name}
                      </h2>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-600 group-hover:text-zinc-300 transition-colors">
                        {hero.main_role}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* SPACER: Enough height for text to clear edge without excessive gap */}
            <div className="h-16 w-full shrink-0 bg-transparent" />
          </div>
        </div>
      </div>

      {/* 4. DETAIL VIEW OVERLAY */}
      <HeroDetails
        hero={selectedHero}
        isOpen={!!selectedHero}
        onClose={() => setSelectedHero(null)}
      />
    </div>
  );
}