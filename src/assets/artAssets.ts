import characterBack from "./characters/character-back.png";
import characterFront from "./characters/character-front.png";
import characterHero from "./characters/character-hero.png";
import characterIdleV2 from "./characters/character-idle-v2.png";
import characterSheet from "./characters/character-sheet.png";
import characterCastV2 from "./characters/character-cast-v2.png";
import characterSwordRideV2 from "./characters/character-sword-ride-v2.png";
import characterWalkSide from "./characters/character-walk-side.png";
import characterWalkRightV2 from "./characters/character-walk-right-v2.png";
import cloudStardome01 from "./audio/cloud-stardome-01.mp3";
import cloudStardome02 from "./audio/cloud-stardome-02.mp3";
import buildingCloudPavilion from "./buildings/building-cloud-pavilion-v1.png";
import starDomeBackground from "./backgrounds/star-dome-background.png";
import cloudMistOverlay from "./effects/cloud-mist-overlay.png";
import portalActive from "./effects/portal-active-v1.png";
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
import itemFrameCommon from "./items/frames/item-frame-common-v1.png";
import itemFrameLegendary from "./items/frames/item-frame-legendary-v1.png";
import itemFrameRare from "./items/frames/item-frame-rare-v1.png";
import itemFrameSuperRare from "./items/frames/item-frame-super-rare-v1.png";
import islandMoonSpring from "./islands/island-moon-spring-v1.png";
import islandSpiritGarden from "./islands/island-spirit-garden-v1.png";
import islandSwordForge from "./islands/island-sword-forge-v1.png";
import swordForgePlatform from "./sword-effects/sword-forge-platform-v1.png";
import mainIsland from "./islands/main-island.png";
import swordAntiqueGold from "./swords/sword-antique-gold.png";
import swordCrimsonThunder from "./swords/sword-crimson-thunder.png";
import swordIceBlue from "./swords/sword-ice-blue.png";
import swordJadeCyan from "./swords/sword-jade-cyan.png";
import swordSheet from "./swords/sword-sheet.png";
import swordTrailCrimson from "./sword-effects/sword-trail-crimson-v1.png";
import swordTrailCyan from "./sword-effects/sword-trail-cyan-v1.png";
import swordTrailViolet from "./sword-effects/sword-trail-violet-v1.png";
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
import uiButtonPrimary from "./ui/system/ui-button-primary-v1.png";
import uiPanelFrame from "./ui/system/ui-panel-frame-v1.png";
import uiProgressCultivation from "./ui/system/ui-progress-cultivation-v1.png";
import uiTabSelected from "./ui/system/ui-tab-selected-v1.png";
import uiToastFrame from "./ui/system/ui-toast-frame-v1.png";

export const artAssets = {
  audio: {
    cloudStardome01,
    cloudStardome02
  },
  character: {
    sheet: characterSheet,
    hero: characterHero,
    idleV2: characterIdleV2,
    front: characterFront,
    walkSide: characterWalkSide,
    walkRightV2: characterWalkRightV2,
    castV2: characterCastV2,
    swordRideV2: characterSwordRideV2,
    back: characterBack
  },
  swords: {
    sheet: swordSheet,
    jadeCyan: swordJadeCyan,
    antiqueGold: swordAntiqueGold,
    crimsonThunder: swordCrimsonThunder,
    violetVoid: swordVioletVoid,
    iceBlue: swordIceBlue,
    whiteGold: swordWhiteGold,
    trails: {
      cyan: swordTrailCyan,
      crimson: swordTrailCrimson,
      violet: swordTrailViolet
    },
    forgePlatform: swordForgePlatform
  },
  islands: {
    main: mainIsland,
    spiritGarden: islandSpiritGarden,
    swordForge: islandSwordForge,
    moonSpring: islandMoonSpring
  },
  buildings: {
    cloudPavilion: buildingCloudPavilion
  },
  backgrounds: {
    starDome: starDomeBackground
  },
  effects: {
    cloudMist: cloudMistOverlay,
    teleportPortal,
    portalActive
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
    swordScroll: itemSwordScroll,
    frames: {
      common: itemFrameCommon,
      rare: itemFrameRare,
      superRare: itemFrameSuperRare,
      legendary: itemFrameLegendary
    }
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
    cloudFlourish: uiCloudFlourish,
    system: {
      panelFrame: uiPanelFrame,
      progressCultivation: uiProgressCultivation,
      tabSelected: uiTabSelected,
      buttonPrimary: uiButtonPrimary,
      toastFrame: uiToastFrame
    }
  }
} as const;
