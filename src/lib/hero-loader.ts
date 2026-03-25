import heroesDataRaw from "@/data/heroes_data.json";
import portraitDataRaw from "@/data/hero_portrait_url.json";
import iconDataRaw from "@/data/heroes_icon_url.json";
import matchupDataRaw from "@/data/hero_matchups.json";
import { HeroData, MLBBHero, HeroMatchups, MatchupEntry } from "@/types/hero";

export function getMLBBHeroes(): MLBBHero[] {
  const heroes = (heroesDataRaw as unknown as HeroData[]).filter(h => h.id !== "none");
  const portraits = portraitDataRaw as { name: string; icon_url: string }[];
  const icons = iconDataRaw as { name: string; icon_url: string }[];
  const matchups = matchupDataRaw as unknown as HeroMatchups[];

  // Create a fast lookup map for icons: { "Miya": "https://..." }
  const iconMap = new Map(icons.map(i => [i.name, i.icon_url]));

  return heroes.map((hero) => {
    const portraitMatch = portraits.find((p) => p.name === hero.hero_name);
    const iconMatch = icons.find((i) => i.name === hero.hero_name);
    const matchupMatch = matchups.find((m) => m.hero_id === hero.key);

    // Function to attach icons to matchup entries
    const enrichMatchups = (entries: MatchupEntry[]) => 
      entries.map(entry => ({
        ...entry,
        iconUrl: iconMap.get(entry.hero_name) || "" // Link icon from heroes_icon_url.json
      }));

    return {
      ...hero,
      portraitUrl: portraitMatch?.icon_url || "",
      iconUrl: iconMatch?.icon_url || "",
      matchups: matchupMatch ? {
        counters: enrichMatchups(matchupMatch.best_counters),
        teammates: enrichMatchups(matchupMatch.best_teammates),
      } : undefined,
    };
  });
}