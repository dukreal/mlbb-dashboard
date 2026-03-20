"use client";

import { getMLBBHeroes } from "@/lib/hero-loader";
import { HeroGallery } from "@/components/dashboard/hero-gallery";
import { EtherealShadow } from "@/components/ui/etheral-shadow";

export default function DashboardPage() {
  const heroes = getMLBBHeroes();

  return (
    <main className="relative h-screen w-full bg-black overflow-hidden flex flex-col">
      {/* MASTER BACKGROUND LAYER */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <EtherealShadow 
          color="rgba(59, 130, 246, 0.5)" 
          animation={{ scale: 50, speed: 60 }} 
          noise={{ opacity: 0.1, scale: 0.5 }}
          className="h-full w-full"
        />
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10 h-full w-full">
        <HeroGallery heroes={heroes} />
      </div>
    </main>
  );
}