"use client";

import { motion } from "framer-motion";
import { MLBBHero } from "@/types/hero";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HeroCardProps {
  hero: MLBBHero;
}

export function HeroCard({ hero }: HeroCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="h-full"
    >
      <Card className="relative overflow-hidden bg-zinc-900 border-zinc-800 group cursor-pointer">
        {/* Hero Portrait/Icon Container */}
        <div className="relative aspect-4/5 overflow-hidden">
          <img
            src={hero.portraitUrl || hero.iconUrl}
            alt={hero.hero_name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent opacity-90" />
          
          {/* Info Overlay */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-lg font-black text-white leading-tight uppercase italic">
              {hero.hero_name}
            </h3>
            <div className="flex gap-1 mt-1">
              <Badge variant="secondary" className="text-[9px] bg-blue-600/20 text-blue-400 border-none px-1.5 py-0">
                {hero.main_role}
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}