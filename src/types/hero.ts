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

// NEW: Interface for the skill mechanics (BUFF, CC, AoE, etc.)
export interface HeroSkillTag {
  name: string;
  color: string;
}

export interface HeroSkill {
  type: string;
  attributes: Record<string, string[]>;
  max_levels: number;
  name: string;
  description: string;
  cooldown: string;
  manacost: string;
  icon: string;
  tags?: HeroSkillTag[]; // ADDED: Matches your new JSON data
}

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

export interface MLBBHero extends HeroData {
  portraitUrl: string;
  iconUrl: string;
}