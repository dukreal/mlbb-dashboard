"use client";

import React, { useState, useMemo, useTransition, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MLBBHero } from "@/types/hero";
import { Input } from "@/components/ui/input";
import { HeroDetails } from "./hero-details";

// ICONS
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

/**
 * 1. MEMOIZED HERO ITEM
 * Prevents re-rendering icons that haven't changed.
 */
const HeroItem = memo(({ hero, onClick }: { hero: MLBBHero; onClick: (hero: MLBBHero) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      onClick={() => onClick(hero)}
      className="group cursor-pointer flex flex-col items-center"
    >
      <div className="relative w-24 h-24 mb-4 rounded-2xl border-2 border-zinc-900 bg-zinc-900/60 transition-all group-hover:border-white overflow-hidden shrink-0 shadow-xl">
        <img
          src={hero.iconUrl || "/placeholder-hero.png"}
          alt={hero.hero_name}
          className="h-full w-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500 select-none"
          loading="lazy"
          draggable={false}
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="text-center w-full space-y-1">
        <h2 className="text-base font-bold text-white leading-tight truncate px-1 uppercase tracking-tight group-hover:text-blue-400 transition-colors">
          {hero.hero_name}
        </h2>
        <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-600 group-hover:text-zinc-300 transition-colors">
          {hero.main_role}
        </p>
      </div>
    </motion.div>
  );
});
HeroItem.displayName = "HeroItem";

const ROLES = ["All", "Tank", "Fighter", "Assassin", "Mage", "Marksman", "Support"];

export function HeroGallery({ heroes }: { heroes: MLBBHero[] }) {
  // FAST STATE: For the input field itself
  const [searchTerm, setSearchTerm] = useState("");
  // DEFERRED STATE: For the actual filtering logic
  const [activeSearch, setActiveSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedHero, setSelectedHero] = useState<MLBBHero | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [isPending, startTransition] = useTransition();

  // Handle Search Change with Transition
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value); // Update input field instantly

    // Move the heavy filtering work to a transition
    startTransition(() => {
      setActiveSearch(value);
    });
  };

  // 2. OPTIMIZED FILTERING LOGIC
  const filteredHeroes = useMemo(() => {
    const normalizedQuery = activeSearch.toLowerCase().trim();
    
    return heroes.filter((hero) => {
      if (hero.id === "none") return false;
      
      const matchesSearch = normalizedQuery === "" || 
        hero.hero_name.toLowerCase().includes(normalizedQuery);
      
      const matchesRole = selectedRole === "All" || 
        hero.all_roles.includes(selectedRole);
        
      return matchesSearch && matchesRole;
    });
  }, [activeSearch, selectedRole, heroes]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-transparent font-sans antialiased px-8 pt-6 pb-6 md:px-12 md:pt-10 md:pb-10 lg:px-16 lg:pt-12 lg:pb-12 flex flex-col">
      
      <header className="mb-8 shrink-0 space-y-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-900 pb-5 gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic leading-none">Hero Roster</h1>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-[0.3em]">By: Duk</p>
          </div>

          {/* DESKTOP FILTERS (Simplified to keep UI light) */}
          <div className="hidden md:flex flex-wrap gap-2">
            {ROLES.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-5 py-2 text-sm font-bold transition-all rounded-lg border-2 ${
                  selectedRole === role ? "bg-white text-black border-white shadow-lg" : "bg-zinc-900/40 text-zinc-400 border-zinc-800 hover:border-zinc-500"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* SEARCH BOX with Loading Indicator */}
        <div className="relative w-full max-w-[320px]">
          <SearchIcon className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isPending ? 'text-blue-500' : 'text-zinc-500'}`} sx={{ fontSize: 20 }} />
          <Input
            placeholder="Search heroes..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="h-10 border-zinc-800 bg-zinc-900/50 pl-10 text-sm text-zinc-200 focus:border-zinc-600 rounded-lg"
          />
          {isPending && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
               <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </header>

      {/* 3. GRID SECTION */}
      <div className="relative flex-1 overflow-hidden flex flex-col">
        <div className={`custom-scrollbar overflow-y-auto pr-4 h-full transition-opacity duration-300 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-11 gap-x-5 gap-y-12">
            <AnimatePresence mode="popLayout">
              {filteredHeroes.map((hero) => (
                <HeroItem 
                  key={hero.id} 
                  hero={hero} 
                  onClick={setSelectedHero} 
                />
              ))}
            </AnimatePresence>
          </div>
          <div className="h-16 w-full shrink-0" />
        </div>
      </div>

      <HeroDetails hero={selectedHero} isOpen={!!selectedHero} onClose={() => setSelectedHero(null)} />
    </div>
  );
}