import { getMLBBHeroes } from "@/lib/hero-loader";
import { HeroGallery } from "@/components/dashboard/hero-gallery";
import { EtherealShadow } from "@/components/ui/etheral-shadow"; // Renamed from 'Component' for clarity

export default function Home() {
  const heroes = getMLBBHeroes();

  return (
    // We use "relative" here so the background can be "absolute" inside it
    <main className="h-screen bg-zinc-950 flex flex-col overflow-hidden relative">
      
      {/* 1. DYNAMIC BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-90">
        <EtherealShadow
          color="rgba(30, 58, 138, 0.5)" 
          animation={{ scale: 80, speed: 90 }}
          noise={{ opacity: 0.1, scale: 1.5 }}
          sizing="fill"
        />
      </div>

      {/* 2. DASHBOARD CONTENT LAYER */}
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col relative z-10 p-6 md:p-8">
        <header className="mb-6 shrink-0">
          <h1 className="text-4xl font-black italic uppercase text-blue-500 tracking-tighter leading-none drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            MLBB Arsenal
          </h1>
          <p className="text-zinc-500 font-medium text-sm mt-1 uppercase tracking-widest">
            Database v2.1
          </p>
        </header>

        <div className="flex-1 min-h-0">
          <HeroGallery heroes={heroes} />
        </div>
      </div>
    </main>
  );
}