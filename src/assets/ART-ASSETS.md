# 美术资产初稿

这批资源从 `priority-art-draft-01.png` 的方向拆分并重绘，已处理为透明 PNG，可直接接入 Web 原型。

## Character

- `characters/character-sheet.png`：角色整张动作设定
- `characters/character-hero.png`：主展示角色
- `characters/character-front.png`：正面站立
- `characters/character-walk-side.png`：侧向行走姿态
- `characters/character-back.png`：背面站立

## Swords

- `swords/sword-sheet.png`：六把飞剑整张设定
- `swords/sword-jade-cyan.png`
- `swords/sword-antique-gold.png`
- `swords/sword-crimson-thunder.png`
- `swords/sword-violet-void.png`
- `swords/sword-ice-blue.png`
- `swords/sword-white-gold.png`

## Islands

- `islands/main-island.png`：主岛透明 PNG

## Backgrounds

- `backgrounds/star-dome-background.png`：星穹云海背景

## Effects

- `effects/cloud-mist-overlay.png`：云海/云雾前景叠层透明 PNG
- `effects/teleport-portal.png`：传送门透明 PNG

## Items

- `items/backpack-icons-sheet.png`：背包图标整张设定
- `items/item-*.png`：12 个单独背包道具图标

## Friends

- `friends/friend-avatars-sheet.png`：好友头像整张设定
- `friends/friend-*.png`：8 个单独好友头像

## UI

- `ui/ui-decorations-sheet.png`：UI 装饰整张设定
- `ui/ui-*.png`：标题牌、分隔线、角花、徽章、按钮装饰、边框和云纹等单独装饰件

## React 接入

```ts
import { artAssets } from "./assets/artAssets";
```

示例：

```tsx
<img src={artAssets.character.hero} alt="角色" />
<img src={artAssets.swords.jadeCyan} alt="青冥剑" />
<img src={artAssets.islands.main} alt="仙侠岛主岛" />
<img src={artAssets.backgrounds.starDome} alt="星穹背景" />
<img src={artAssets.effects.teleportPortal} alt="传送门" />
<img src={artAssets.items.starSpiritStone} alt="星砂灵石" />
<img src={artAssets.friends.swordMaster} alt="好友头像" />
<img src={artAssets.ui.titlePlaque} alt="" />
```

## Raw 源图

`raw/` 目录保留了 chroma-key 源图，便于后续重新去背景或重裁切。
