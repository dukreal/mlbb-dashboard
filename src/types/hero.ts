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

export interface HeroSkillTag {
  name: string;
  color: string;
}

export interface HeroSkill {
  type: string;
  skillname: string;    // Matches your improved JSON
  skillicon: string;    // Matches your improved JSON
  skilldesc: string;    // Matches your improved JSON
  skilltag: string[];   // Array of strings (e.g. ["Buff", "AoE"])
  attributes: Record<string, string[]>;
  max_levels: number;
}

/** 
 * NEW: The missing exported members for Matchups
 */
export interface MatchupEntry {
  heroid: number;
  hero_name: string;
  hero_win_rate: number | null;
  increase_win_rate: number | null;
  rank: number;
  iconUrl?: string; // Hydrated by hero-loader.ts
}

export interface HeroMatchups {
  hero_id: number;
  hero_name: string;
  hero_key: string;
  best_counters: MatchupEntry[];
  best_teammates: MatchupEntry[];
}

export interface HeroData {
  id: string;
  key: number;
  hero_id: number;
  hero_name: string;
  icon: string;
  portrait: string;
  main_role: string;
  all_roles: string[];
  main_lane: string;
  lanes: string[];
  speciality: string[];
  ratings: HeroRatings;
  base_stats: BaseStats;
  skills: HeroSkill[];
}

export interface MLBBHero extends HeroData {
  // These provide compatibility for existing components
  portraitUrl: string;
  iconUrl: string;
  matchups?: {
    counters: MatchupEntry[];
    teammates: MatchupEntry[];
  };
}