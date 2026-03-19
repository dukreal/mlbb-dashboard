"use client";

import { getMLBBHeroes } from "@/lib/hero-loader";
import { HeroGallery } from "@/components/dashboard/hero-gallery";

export default function DashboardPage() {
  // Load your merged JSON data
  const heroes = getMLBBHeroes();

  return (
    <main className="h-screen bg-black text-white p-6 overflow-hidden flex flex-col">
      {/* HeroGallery handles everything else: Search, Filter, and the Detail View */}
      <div className="flex-1 overflow-hidden">
        <HeroGallery heroes={heroes} />
      </div>
    </main>
  );
}