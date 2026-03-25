import heroesDataRaw from "@/data/heroes_data.json";
import matchupDataRaw from "@/data/hero_matchups.json";
import iconDataRaw from "@/data/heroes_icon_url.json"; // Keep this for matchup icon lookups
import { HeroData, MLBBHero, HeroMatchups, MatchupEntry } from "@/types/hero";

export function getMLBBHeroes(): MLBBHero[] {
  // 1. Load the main heroes and filter out the placeholder
  const heroes = (heroesDataRaw as unknown as HeroData[]).filter(
    (h) => h.id !== "none"
  );

  // 2. Load matchup data
  const matchups = (matchupDataRaw as unknown as HeroMatchups[]) || [];

  // 3. Create a lookup map specifically for the Matchup entries
  // (Matchup icons still need to be looked up by name from the icons JSON)
  const icons = iconDataRaw as { name: string; icon_url: string }[];
  const iconLookupMap = new Map(icons.map((i) => [i.name, i.icon_url]));

  return heroes.map((hero) => {
    // 4. Find the matching matchup data by hero.key (which is the numeric ID)
    const matchupMatch = matchups.find((m) => m.hero_id === hero.key);

    // 5. Helper function to attach icons to matchup entries (Counters/Teammates)
    const enrichMatchups = (entries: MatchupEntry[]) =>
      entries.map((entry) => ({
        ...entry,
        iconUrl: iconLookupMap.get(entry.hero_name) || "", 
      }));

    return {
      ...hero,
      // Mapping new JSON field names to the component's expected property names
      portraitUrl: hero.portrait,
      iconUrl: hero.icon,

      // Attach the enriched matchup data
      matchups: matchupMatch
        ? {
            counters: enrichMatchups(matchupMatch.best_counters),
            teammates: enrichMatchups(matchupMatch.best_teammates),
          }
        : undefined,
    };
  });
}