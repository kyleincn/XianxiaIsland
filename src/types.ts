export type Panel = "island" | "avatar" | "swords" | "backpack" | "friends" | "cultivation";

export type IslandId = "home" | "lingcao" | "swordStage" | "xingque";

export type IslandMeta = {
  id: IslandId;
  name: string;
  description: string;
};

export type AvatarState = {
  nickname: string;
  robe: string;
  skin: string;
  hair: string;
  accent: string;
  aura: string;
};

export type Sword = {
  id: string;
  name: string;
  rarity: string;
  element: string;
  color: string;
  trait: string;
  power: number;
};

export type Position = {
  x: number;
  y: number;
};
