export type Panel = "island" | "avatar" | "swords" | "backpack" | "friends" | "cultivation" | "story";

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

export type ContentBlock = {
  type: "image" | "text" | "dialog";
  content: string;
  imageUrl?: string;
};

export type Chapter = {
  id: string;
  title: string;
  content: ContentBlock[];
  audioUrl?: string;
  duration: number;
};

export type Story = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  chapters: Chapter[];
};

export type ReadingProgress = {
  chapterId: string;
  progress: number;
  completed: boolean;
  lastReadAt: string;
};
