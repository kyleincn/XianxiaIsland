import characterBack from "./characters/character-back.png";
import characterFront from "./characters/character-front.png";
import characterHero from "./characters/character-hero.png";
import characterSheet from "./characters/character-sheet.png";
import characterWalkSide from "./characters/character-walk-side.png";
import starDomeBackground from "./backgrounds/star-dome-background.png";
import cloudMistOverlay from "./effects/cloud-mist-overlay.png";
import teleportPortal from "./effects/teleport-portal.png";
import friendAvatarsSheet from "./friends/friend-avatars-sheet.png";
import friendCloudFairy from "./friends/friend-cloud-fairy.png";
import friendFrostGirl from "./friends/friend-frost-girl.png";
import friendGuildHost from "./friends/friend-guild-host.png";
import friendHerbAlchemist from "./friends/friend-herb-alchemist.png";
import friendMartialEmperor from "./friends/friend-martial-emperor.png";
import friendSwordMaster from "./friends/friend-sword-master.png";
import friendTalismanBoy from "./friends/friend-talisman-boy.png";
import friendVoidCultivator from "./friends/friend-void-cultivator.png";
import backpackIconsSheet from "./items/backpack-icons-sheet.png";
import itemCloudCloak from "./items/item-cloud-cloak.png";
import itemFrostPearl from "./items/item-frost-pearl.png";
import itemGoldToken from "./items/item-gold-token.png";
import itemGoldenPill from "./items/item-golden-pill.png";
import itemJadeGourd from "./items/item-jade-gourd.png";
import itemJadeHerb from "./items/item-jade-herb.png";
import itemPortalShard from "./items/item-portal-shard.png";
import itemStarDomeKey from "./items/item-star-dome-key.png";
import itemStarSpiritStone from "./items/item-star-spirit-stone.png";
import itemSwordScroll from "./items/item-sword-scroll.png";
import itemSwordTalisman from "./items/item-sword-talisman.png";
import itemThunderBead from "./items/item-thunder-bead.png";
import mainIsland from "./islands/main-island.png";
import swordAntiqueGold from "./swords/sword-antique-gold.png";
import swordCrimsonThunder from "./swords/sword-crimson-thunder.png";
import swordIceBlue from "./swords/sword-ice-blue.png";
import swordJadeCyan from "./swords/sword-jade-cyan.png";
import swordSheet from "./swords/sword-sheet.png";
import swordVioletVoid from "./swords/sword-violet-void.png";
import swordWhiteGold from "./swords/sword-white-gold.png";
import uiBorderStrip from "./ui/ui-border-strip.png";
import uiButtonOrnament from "./ui/ui-button-ornament.png";
import uiCloudFlourish from "./ui/ui-cloud-flourish.png";
import uiCornerLeft from "./ui/ui-corner-left.png";
import uiCornerMid from "./ui/ui-corner-mid.png";
import uiCornerRight from "./ui/ui-corner-right.png";
import uiCultivationMedallion from "./ui/ui-cultivation-medallion.png";
import uiDecorationsSheet from "./ui/ui-decorations-sheet.png";
import uiGoldBorderStrip from "./ui/ui-gold-border-strip.png";
import uiNotificationSeal from "./ui/ui-notification-seal.png";
import uiSectionDivider from "./ui/ui-section-divider.png";
import uiSwordBadge from "./ui/ui-sword-badge.png";
import uiTitlePlaque from "./ui/ui-title-plaque.png";

export const artAssets = {
  character: {
    sheet: characterSheet,
    hero: characterHero,
    front: characterFront,
    walkSide: characterWalkSide,
    back: characterBack
  },
  swords: {
    sheet: swordSheet,
    jadeCyan: swordJadeCyan,
    antiqueGold: swordAntiqueGold,
    crimsonThunder: swordCrimsonThunder,
    violetVoid: swordVioletVoid,
    iceBlue: swordIceBlue,
    whiteGold: swordWhiteGold
  },
  islands: {
    main: mainIsland
  },
  backgrounds: {
    starDome: starDomeBackground
  },
  effects: {
    cloudMist: cloudMistOverlay,
    teleportPortal
  },
  items: {
    sheet: backpackIconsSheet,
    starSpiritStone: itemStarSpiritStone,
    jadeHerb: itemJadeHerb,
    swordTalisman: itemSwordTalisman,
    goldenPill: itemGoldenPill,
    cloudCloak: itemCloudCloak,
    starDomeKey: itemStarDomeKey,
    portalShard: itemPortalShard,
    goldToken: itemGoldToken,
    jadeGourd: itemJadeGourd,
    thunderBead: itemThunderBead,
    frostPearl: itemFrostPearl,
    swordScroll: itemSwordScroll
  },
  friends: {
    sheet: friendAvatarsSheet,
    swordMaster: friendSwordMaster,
    cloudFairy: friendCloudFairy,
    talismanBoy: friendTalismanBoy,
    martialEmperor: friendMartialEmperor,
    herbAlchemist: friendHerbAlchemist,
    voidCultivator: friendVoidCultivator,
    frostGirl: friendFrostGirl,
    guildHost: friendGuildHost
  },
  ui: {
    sheet: uiDecorationsSheet,
    titlePlaque: uiTitlePlaque,
    sectionDivider: uiSectionDivider,
    cornerLeft: uiCornerLeft,
    cornerMid: uiCornerMid,
    cornerRight: uiCornerRight,
    swordBadge: uiSwordBadge,
    cultivationMedallion: uiCultivationMedallion,
    notificationSeal: uiNotificationSeal,
    buttonOrnament: uiButtonOrnament,
    borderStrip: uiBorderStrip,
    goldBorderStrip: uiGoldBorderStrip,
    cloudFlourish: uiCloudFlourish
  }
} as const;
