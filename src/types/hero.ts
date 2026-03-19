export interface HeroSkill {
  type: string;
  attributes: Record<string, string[]>;
  max_levels: number;
  name: string;
  icon: string;
  description: string; 
}

export interface HeroData {
  id: string;
  key: number;
  hero_name: string;
  main_role: string;
  all_roles: string[];
  main_lane: string;
  ratings: {
    durability: string;
    offense: string;
    control_effects: string;
    difficulty: string;
  };
  base_stats: {
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
  };
  skills: HeroSkill[];
}

export interface MLBBHero extends HeroData {
  portraitUrl: string;
  iconUrl: string;
}