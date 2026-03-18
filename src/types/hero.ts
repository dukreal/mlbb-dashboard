export interface HeroRatings {
  durability: string;
  offense: string;
  control_effects: string;
  difficulty: string;
}

export interface BaseStats {
  hp: string;
  hp_regen: string;
  physical_attack: string;
  physical_defense: string;
  magic_defense: string;
  magic_power: string;
  mana: string;
  mana_regen: string;
  attack_speed: string;
  attack_speed_ratio: string;
  movement_speed: string;
}

export interface HeroSkill {
  type: string;
  attributes: Record<string, string[]>;
  max_levels: number;
}

// MAKE SURE THIS HAS "export" BEFORE IT
export interface HeroData {
  id: string;
  key: number;
  hero_name: string;
  main_role: string;
  all_roles: string[];
  main_lane: string;
  ratings: HeroRatings;
  base_stats: BaseStats;
  skills: HeroSkill[];
}

// MAKE SURE THIS HAS "export" BEFORE IT
export interface MLBBHero extends HeroData {
  portraitUrl: string;
  iconUrl: string;
}