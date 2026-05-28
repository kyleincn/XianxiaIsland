# 仙侠岛美术资产库生产计划

> 更新日期：2026-05-28
> 当前阶段：Web/PWA 优先，批量生成资产库

## 目标

将现有初稿素材扩展为一套可复用的 Web/PWA 美术资产库，优先支撑主场景探索、角色展示、飞剑养成、背包、好友和修行页面。

## 统一风格

- 题材：Q 版仙侠、云海浮岛、星穹飞剑
- 画风：精致手游感、圆润外形、清晰轮廓、半厚涂质感
- 色彩：夜空深色、仙紫、古纸金、中国红、灵草绿、飞剑蓝
- 输出：PNG，主体尽量居中，保留透明或可抠图背景版本
- 禁止：写实恐怖、重金属暗黑、过度复杂纹理、不可读文字、水印

## 资产批次

### Batch 01：岛屿探索核心

| 文件建议名 | 类型 | 用途 | 状态 |
|------------|------|------|------|
| `islands/island-spirit-garden-v1.png` | 子岛 | 灵草/种植/采集入口 | 已生成 |
| `islands/island-sword-forge-v1.png` | 子岛 | 飞剑锻造/强化入口 | 已生成 |
| `islands/island-moon-spring-v1.png` | 子岛 | 修行/恢复/水系秘境入口 | 已生成 |
| `buildings/building-cloud-pavilion-v1.png` | 建筑 | 主岛可点击建筑 | 已生成 |
| `effects/portal-active-v1.png` | 特效 | 传送门激活态 | 已生成 |

### Batch 01 生成记录

- 生成方式：内置 `image_gen`，每个资产独立提示词。
- 透明处理：先生成纯色 `#ff00ff` 色键背景，再用 `remove_chroma_key.py` 输出 alpha PNG。
- 原始图保存：`raw/batch-01/*-raw.png`
- 成品保存：`islands/`、`buildings/`、`effects/`
- 备注：`portal-active-v1.png` 中心为偏深星云旋涡，可作为虚空传送门 v1；如果主场景需要更轻盈，可追加明亮版 v2。

### Batch 02：角色动作升级

| 文件建议名 | 类型 | 用途 | 状态 |
|------------|------|------|------|
| `characters/character-idle-v2.png` | 角色动作 | 主场景静止待机 | 已生成 |
| `characters/character-walk-right-v2.png` | 角色动作 | 主场景移动/行走 | 已生成 |
| `characters/character-cast-v2.png` | 角色动作 | NPC/建筑交互、施法反馈 | 已生成 |
| `characters/character-sword-ride-v2.png` | 角色动作 | 御剑飞行、传送/移动强化 | 已生成 |

### Batch 02 生成记录

- 生成方式：内置 `image_gen`，使用现有 `character-hero.png` 的身份风格作为约束。
- 透明处理：色键图使用 `#ff00ff` 抠图；御剑图因生成结果为黑底，使用边缘黑色抠图后入库。
- 原始图保存：`raw/batch-02-character-upgrade/*-raw.png`
- 成品保存：`characters/character-*-v2.png`
- 接入状态：主场景静止使用 `idleV2`，移动使用 `walkRightV2`；换装页展示四个动作缩略图。

### Batch 03：飞剑与背包资产系列

| 文件建议名 | 类型 | 用途 | 状态 |
|------------|------|------|------|
| `sword-effects/sword-trail-cyan-v1.png` | 飞剑特效 | 木/水/星系飞剑拖尾 | 已生成 |
| `sword-effects/sword-trail-crimson-v1.png` | 飞剑特效 | 火/金系飞剑拖尾 | 已生成 |
| `sword-effects/sword-trail-violet-v1.png` | 飞剑特效 | 空/虚空系飞剑拖尾 | 已生成 |
| `sword-effects/sword-forge-platform-v1.png` | 飞剑展示 | 飞剑库锻造/强化展示底座 | 已生成 |
| `items/frames/item-frame-common-v1.png` | 背包框 | 普通品质道具卡 | 已生成 |
| `items/frames/item-frame-rare-v1.png` | 背包框 | 稀有品质道具卡 | 已生成 |
| `items/frames/item-frame-super-rare-v1.png` | 背包框 | 珍稀品质道具卡 | 已生成 |
| `items/frames/item-frame-legendary-v1.png` | 背包框 | 传说品质道具卡 | 已生成 |

### Batch 03 生成记录

- 生成方式：内置 `image_gen`，飞剑特效、锻造底座和四档背包品质框分别生成。
- 透明处理：统一使用 `#ff00ff` 色键背景，再用 `remove_chroma_key.py` 输出 alpha PNG。
- 原始图保存：`raw/batch-03-swords-backpack/*-raw.png`
- 成品保存：`sword-effects/`、`items/frames/`
- 接入状态：飞剑库卡片叠加对应拖尾，飞剑库顶部展示锻造台；背包卡片按稀有度叠加 N/R/SR/SSR 品质框。

### Batch 04：NPC 与好友

| 文件建议名 | 类型 | 用途 | 状态 |
|------------|------|------|------|
| `npcs/npc-sword-master-v1.png` | NPC | 飞剑导师 | 待生成 |
| `npcs/npc-herb-alchemist-v1.png` | NPC | 灵草炼丹师 | 待生成 |
| `npcs/npc-cloud-guide-v1.png` | NPC | 新手引导/岛屿导览 | 待生成 |
| `npcs/npc-moon-cultivator-v1.png` | NPC | 修行任务 | 待生成 |

### Batch 05：UI 材料系统化

| 文件建议名 | 类型 | 用途 | 状态 |
|------------|------|------|------|
| `ui/system/ui-panel-frame-v1.png` | UI | 弹窗/侧栏/信息面板框 | 已生成 |
| `ui/system/ui-progress-cultivation-v1.png` | UI | 修行/灵力/熟练度进度条 | 已生成 |
| `ui/system/ui-tab-selected-v1.png` | UI | 底部导航选中态 | 已生成 |
| `ui/system/ui-button-primary-v1.png` | UI | 主按钮/好友操作按钮 | 已生成 |
| `ui/system/ui-toast-frame-v1.png` | UI | 提示框/通知条/说明框 | 已生成 |

### Batch 05 生成记录

- 生成方式：内置 `image_gen`，按 UI 功能件单独生成。
- 透明处理：统一使用 `#ff00ff` 色键背景，再用 `remove_chroma_key.py` 输出 alpha PNG。
- 原始图保存：`raw/batch-04-ui-system/*-raw.png`
- 成品保存：`ui/system/`
- 接入状态：底部导航选中态、修行进度条、好友按钮、提示框和侧栏面板已接入程序样式。

## 接入规则

1. 新资产进入对应目录后，在 `artAssets.ts` 中统一导出。
2. 重要资产在 `ART-ASSETS.md` 中登记用途、状态和接入示例。
3. 同一资产迭代使用 `-v1`、`-v2` 后缀，不覆盖已接入版本。
4. 原始生成图或抠图前版本放入 `raw/`，最终可用图放入业务目录。
