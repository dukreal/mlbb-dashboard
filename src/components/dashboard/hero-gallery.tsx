"use client";

import React, { useState, useMemo } from "react";
import { MLBBHero } from "@/types/hero";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroDetails } from "./hero-details";

interface HeroGalleryProps {
  heroes: MLBBHero[];
}

const ROLES = [
  "All",
  "Tank",
  "Fighter",
  "Assassin",
  "Mage",
  "Marksman",
  "Support",
];

export function HeroGallery({ heroes }: HeroGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedHero, setSelectedHero] = useState<MLBBHero | null>(null);
  const filteredHeroes = useMemo(() => {
    return heroes.filter((hero) => {
      const matchesSearch = hero.hero_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesRole =
        selectedRole === "All" || hero.all_roles.includes(selectedRole);
      return matchesSearch && matchesRole;
    });
  }, [searchQuery, selectedRole, heroes]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* 
        The h-[calc(100vh-180px)] gives the gallery a fixed height 
        so it can scroll internally. 180px accounts for your header.
      */}

      {/* FIXED TOP: Search & Filter (Doesn't scroll) */}
      <div className="shrink-0 pb-4 bg-black">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Search hero..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-zinc-900/50 border-zinc-700 text-white h-9 text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 justify-center">
            {ROLES.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${
                  selectedRole === role
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-zinc-900 text-zinc-500 hover:bg-zinc-800"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SCROLLABLE AREA: Hero Icon Grid */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar scroll-smooth">
        <motion.div
          layout
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3 pb-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredHeroes.map((hero) => (
              <motion.div
                key={hero.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedHero(hero)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-zinc-800 bg-zinc-900 transition-all duration-300 group-hover:border-blue-500">
                  <img
                    src={hero.iconUrl}
                    alt={hero.hero_name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/80 to-transparent pt-4 pb-1 px-1">
                    <p className="text-[10px] font-black text-center text-white uppercase tracking-tighter truncate">
                      {hero.hero_name}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredHeroes.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-zinc-800 rounded-2xl text-zinc-500 italic">
            No heroes found
          </div>
        )}
      </div>

      <HeroDetails
        hero={selectedHero}
        isOpen={!!selectedHero}
        onClose={() => setSelectedHero(null)}
      />
    </div>
  );
}
