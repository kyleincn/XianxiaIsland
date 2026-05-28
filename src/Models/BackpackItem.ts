import { artAssets } from "../assets/artAssets";

export type ItemType = "货币" | "材料" | "符咒" | "丹药" | "装扮" | "生态" | "秘宝" | "灵材" | "功法";

export type BackpackItem = {
  id: string;
  name: string;
  type: ItemType;
  count: number;
  color: string;
  art: string;
  description: string;
  rarity: "普通" | "稀有" | "珍稀" | "传说";
};

export const backpackItems: BackpackItem[] = [
  { id: "star-spirit-stone", name: "星砂灵石", type: "货币", count: 1280, color: "#72f7ff", art: artAssets.items.starSpiritStone, description: "星穹飞剑生态通用货币", rarity: "普通" },
  { id: "jade-herb", name: "清心灵草", type: "材料", count: 36, color: "#68d8c1", art: artAssets.items.jadeHerb, description: "炼丹基础材料", rarity: "普通" },
  { id: "sword-talisman", name: "御剑符", type: "符咒", count: 12, color: "#f3c969", art: artAssets.items.swordTalisman, description: "可提升飞剑速度", rarity: "稀有" },
  { id: "golden-pill", name: "归元丹", type: "丹药", count: 9, color: "#e85d75", art: artAssets.items.goldenPill, description: "快速恢复灵力", rarity: "珍稀" },
  { id: "cloud-cloak", name: "云纹披帛", type: "装扮", count: 1, color: "#b38cff", art: artAssets.items.cloudCloak, description: "仙侠岛限定装扮", rarity: "传说" },
  { id: "star-dome-key", name: "星穹密钥", type: "生态", count: 3, color: "#4f8cff", art: artAssets.items.starDomeKey, description: "星穹飞剑生态通行证", rarity: "珍稀" },
  { id: "portal-shard", name: "传送晶片", type: "秘宝", count: 5, color: "#4f8cff", art: artAssets.items.portalShard, description: "可在岛屿间快速传送", rarity: "稀有" },
  { id: "frost-pearl", name: "月魄珠", type: "灵材", count: 18, color: "#b6c8ff", art: artAssets.items.frostPearl, description: "水系灵根修炼材料", rarity: "普通" },
  { id: "sword-scroll", name: "剑诀卷轴", type: "功法", count: 2, color: "#f3c969", art: artAssets.items.swordScroll, description: "记载飞剑技法的古卷", rarity: "珍稀" }
];

export const itemTypeColors: Record<ItemType, string> = {
  "货币": "#72f7ff",
  "材料": "#68d8c1",
  "符咒": "#f3c969",
  "丹药": "#e85d75",
  "装扮": "#b38cff",
  "生态": "#4f8cff",
  "秘宝": "#4f8cff",
  "灵材": "#b6c8ff",
  "功法": "#f3c969"
};

export const rarityLabels: Record<BackpackItem["rarity"], string> = {
  "普通": "N",
  "稀有": "R",
  "珍稀": "SR",
  "传说": "SSR"
};