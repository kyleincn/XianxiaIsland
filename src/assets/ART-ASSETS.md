# 美术资产初稿

这批资源从 `priority-art-draft-01.png` 的方向拆分并重绘，已处理为透明 PNG，可直接接入 Web 原型。

## Character

- `characters/character-sheet.png`：角色整张动作设定
- `characters/character-hero.png`：主展示角色
- `characters/character-front.png`：正面站立
- `characters/character-walk-side.png`：侧向行走姿态
- `characters/character-back.png`：背面站立
- `characters/character-idle-v2.png`：升级待机动作，主场景静止状态
- `characters/character-walk-right-v2.png`：升级行走动作，主场景移动状态
- `characters/character-cast-v2.png`：升级交互/施法动作
- `characters/character-sword-ride-v2.png`：升级御剑飞行动作

## Swords

- `swords/sword-sheet.png`：六把飞剑整张设定
- `swords/sword-jade-cyan.png`
- `swords/sword-antique-gold.png`
- `swords/sword-crimson-thunder.png`
- `swords/sword-violet-void.png`
- `swords/sword-ice-blue.png`
- `swords/sword-white-gold.png`
- `sword-effects/sword-trail-cyan-v1.png`：青白飞剑拖尾
- `sword-effects/sword-trail-crimson-v1.png`：赤雷飞剑拖尾
- `sword-effects/sword-trail-violet-v1.png`：玄紫虚空飞剑拖尾
- `sword-effects/sword-forge-platform-v1.png`：飞剑锻造/强化展示底座

## Islands

- `islands/main-island.png`：主岛透明 PNG
- `islands/island-spirit-garden-v1.png`：灵草园子岛，采集/种植/灵草入口
- `islands/island-sword-forge-v1.png`：剑炉台子岛，飞剑锻造/强化入口
- `islands/island-moon-spring-v1.png`：月泉子岛，修行/恢复/水系秘境入口

## Buildings

- `buildings/building-cloud-pavilion-v1.png`：云中亭建筑，可作为主岛交互点

## Backgrounds

- `backgrounds/star-dome-background.png`：星穹云海背景

## Effects

- `effects/cloud-mist-overlay.png`：云海/云雾前景叠层透明 PNG
- `effects/teleport-portal.png`：传送门透明 PNG
- `effects/portal-active-v1.png`：激活态传送门，带星云旋涡和符文碎片

## Items

- `items/backpack-icons-sheet.png`：背包图标整张设定
- `items/item-*.png`：12 个单独背包道具图标
- `items/frames/item-frame-common-v1.png`：普通品质背包框
- `items/frames/item-frame-rare-v1.png`：稀有品质背包框
- `items/frames/item-frame-super-rare-v1.png`：珍稀品质背包框
- `items/frames/item-frame-legendary-v1.png`：传说品质背包框

## Friends

- `friends/friend-avatars-sheet.png`：好友头像整张设定
- `friends/friend-*.png`：8 个单独好友头像

## UI

- `ui/ui-decorations-sheet.png`：UI 装饰整张设定
- `ui/ui-*.png`：标题牌、分隔线、角花、徽章、按钮装饰、边框和云纹等单独装饰件
- `ui/system/ui-panel-frame-v1.png`：系统面板/弹窗框
- `ui/system/ui-progress-cultivation-v1.png`：修行/熟练度进度条框
- `ui/system/ui-tab-selected-v1.png`：底部导航选中态底纹
- `ui/system/ui-button-primary-v1.png`：主按钮底纹
- `ui/system/ui-toast-frame-v1.png`：提示/通知条底纹

## Audio

- `audio/cloud-stardome-01.mp3`：背景音乐「云雾星穹」版本一
- `audio/cloud-stardome-02.mp3`：背景音乐「云雾星穹」版本二

## React 接入

```ts
import { artAssets } from "./assets/artAssets";
```

示例：

```tsx
<img src={artAssets.character.hero} alt="角色" />
<img src={artAssets.character.idleV2} alt="待机动作" />
<img src={artAssets.character.walkRightV2} alt="行走动作" />
<img src={artAssets.swords.jadeCyan} alt="青冥剑" />
<img src={artAssets.swords.trails.cyan} alt="青白剑气拖尾" />
<img src={artAssets.swords.forgePlatform} alt="飞剑锻造台" />
<img src={artAssets.islands.main} alt="仙侠岛主岛" />
<img src={artAssets.islands.spiritGarden} alt="灵草园" />
<img src={artAssets.buildings.cloudPavilion} alt="云中亭" />
<img src={artAssets.backgrounds.starDome} alt="星穹背景" />
<img src={artAssets.effects.teleportPortal} alt="传送门" />
<img src={artAssets.effects.portalActive} alt="激活态传送门" />
<img src={artAssets.items.starSpiritStone} alt="星砂灵石" />
<img src={artAssets.items.frames.legendary} alt="传说品质框" />
<img src={artAssets.friends.swordMaster} alt="好友头像" />
<img src={artAssets.ui.titlePlaque} alt="" />
<img src={artAssets.ui.system.panelFrame} alt="系统面板框" />
<img src={artAssets.ui.system.progressCultivation} alt="修行进度条" />
<audio src={artAssets.audio.cloudStardome01} loop />
```

## Raw 源图

`raw/` 目录保留了 chroma-key 源图，便于后续重新去背景或重裁切。
