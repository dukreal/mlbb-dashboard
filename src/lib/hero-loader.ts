import heroesDataRaw from "@/data/heroes_data.json";
import portraitDataRaw from "@/data/hero_portrait_url.json";
import iconDataRaw from "@/data/heroes_icon_url.json";
import { HeroData, MLBBHero } from "@/types/hero";

export function getMLBBHeroes(): MLBBHero[] {
  // We treat the main JSON as an array of our HeroData type
  const heroes = heroesDataRaw as unknown as HeroData[];
  
  // These are the asset arrays from your JSON snippets
  const portraits = portraitDataRaw as { name: string; icon_url: string }[];
  const icons = iconDataRaw as { name: string; icon_url: string }[];

  return heroes.map((hero) => {
    // We find the matching image by comparing the "hero_name" to the "name" in asset files
    const portraitMatch = portraits.find(p => p.name === hero.hero_name);
    const iconMatch = icons.find(i => i.name === hero.hero_name);

    return {
      ...hero,
      // If found, use the url. If not, use an empty string.
      portraitUrl: portraitMatch?.icon_url || "",
      iconUrl: iconMatch?.icon_url || "",
    };
  });
}