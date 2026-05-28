# 仙侠岛 · 产品需求文档（PRD）

> 文档版本：v1.0
> 更新日期：2026-05-27
> 状态：**开发中**

---

## 1. 产品概述

### 1.1 一句话描述

一款以仙侠世界观为载体的岛屿探索类 iOS App，玩家以 Q 版角色在云海浮岛上自由漫游、展示状态，后续叠加运动跳绳等玩法。

### 1.2 背景与动机

- 蛋仔派对证明了"岛屿漫游 + 可视化运动数据"的结合在国内市场有强吸引力
- 灵动岛（Dynamic Island）为运动数据实时透传提供了原生能力
- 当前阶段：先做**岛屿展示层**，验证交互体验，运动玩法后置

### 1.3 核心价值

- 提供沉浸式的仙侠风漫游体验
- 通过灵动岛将运动数据（跳绳次数等）实时展示在 iPhone 顶部
- 角色换装与个性化展示

---

## 2. 目标用户

| 维度 | 描述 |
|------|------|
| 核心用户 | 16-30 岁，对仙侠/Cosplay/二次元文化感兴趣的年轻人 |
| 次要用户 | 跳绳/运动打卡爱好者 |
| 使用场景 | 通勤间隙、碎片时间休闲、社交展示 |

---

## 3. 产品路线图

### Phase 1 — 方案设计 ✅
- 确定技术选型（SwiftUI + SpriteKit）
- 确定视觉风格（云海浮岛）
- 输出项目结构与里程碑规划

### Phase 2 — 岛屿基础 ✅
- SpriteKit 场景加载，仙侠风背景（星空 + 云海粒子）
- Q 版角色站立/行走动画
- 虚拟摇杆控制
- **里程碑：角色能在岛上走**

### Phase 3 — 岛屿丰富化 🚧 待开发
- 静态建筑、NPC 节点
- 传送门交互光效
- 云雾层次感、瀑布粒子
- 仙鹤飞行路径动画
- **里程碑：岛屿有仙侠氛围**

### Phase 4 — 换装 + 导航 🚧 待开发
- 换装页面 UI，角色皮肤切换
- 底部 Tab 完整导航
- 背包、好友列表 UI 占位
- **里程碑：App 完整导航可操作**

### Phase 5 — 灵动岛集成 🚧 待开发
- ActivityKit Live Activity 配置
- 运动数据模拟写入灵动岛
- 角色状态实时透传
- **里程碑：灵动岛数据透传**

### Phase 6 — 跳绳游戏 🚧 待开发
- 跳绳计数逻辑（传感器/Camera）
- 节奏闯关模式
- 运动数据与岛屿状态联动
- **里程碑：运动游戏闭环**

---

## 4. 功能规格

### 4.1 岛屿漫游（Phase 2 & 3）

#### 场景构成

| 元素 | 说明 |
|------|------|
| 背景层 | 星空粒子 + 闪烁动画 |
| 云海层 | 底部云雾粒子，缓慢飘动 |
| 浮岛层 | 主岛 + 3-4 个子浮岛，带悬浮动画 |
| 建筑层 | 亭子、楼阁等古风建筑 |
| 交互层 | 传送门（光效旋转动画） |
| 特效层 | 瀑布、仙鹤飞过 |

#### 角色控制
- 虚拟摇杆：左下角，按住拖动控制方向
- 8 方向移动，角色随方向旋转
- 行走时跳跃步动画，停止后恢复呼吸动画

#### 相机
- 相机跟随角色居中
- 场景可平移，边界限制在岛屿范围内

### 4.2 角色换装（Phase 4）

#### 换装维度
- **肤色**：6 种可选
- **衣服**：6 种颜色
- **点缀色**：6 种可选（影响披风、装饰物）
- **昵称**：可编辑

#### 换装预览
- 实时预览当前换装效果
- 换装后数据持久化（UserDefaults）

### 4.3 灵动岛（Phase 5）

#### 显示状态

| 场景 | 灵动岛内容 |
|------|-----------|
| 岛屿漫游 | 岛屿名 + 角色昵称 |
| 静止 | 运动数据（跳绳次数 / 今日时长） |
| 换装中 | 当前穿戴皮肤 icon |

#### 技术方案
- ActivityKit Live Activity
- Widget Extension（独立 target）
- App 在前台时更新状态

### 4.4 底部导航（Phase 4）

| Tab | 功能 |
|-----|------|
| 岛屿 | 主场景（默认） |
| 换装 | 角色换装 UI |
| 背包 | 道具展示（占位 UI） |
| 好友 | 好友列表（占位 UI） |
| 设置 | 音乐/音效开关、运动数据展示 |

### 4.5 跳绳游戏（Phase 6）

#### 核心玩法
- 使用 iPhone 陀螺仪检测跳绳动作
- 记录连续跳绳次数
- 显示今日累计数据

#### 游戏模式
- **自由模式**：随意跳，记录数量
- **目标模式**：设定目标次数，倒计时挑战
- **节奏模式**：跟随节拍器跳，漏拍扣分

#### 运动数据
- 跳绳次数
- 运动时长
- 消耗卡路里估算

---

## 5. UI/UX 设计规范

### 5.1 色彩体系

| 用途 | 色值 | 说明 |
|------|------|------|
| 主色 | `#7B5EA7` | 紫蓝，仙侠感 |
| 辅色 | `#F5E6C8` | 古纸金，用于文字和高亮 |
| 点缀 | `#E85D75` | 中国红，用于按钮和强调 |
| 背景 | `#1A1A2E` | 夜空深色 |
| 云海 | `#F5E6C8` 半透明 | 云雾效果 |

### 5.2 字体

- 系统字体 SF Pro Display
- 中文圆润无衬线感
- 标题：24pt Bold
- 正文：15-16pt Regular
- 标签：10-12pt Medium

### 5.3 图标

- 圆润线性图标
- 圆角 12pt
- 选中态：中国红 `#E85D75`
- 未选中：古纸金半透明 `#F5E6C8` 50%

### 5.4 间距规范

| 元素 | 间距 |
|------|------|
| 页面边距 | 20pt |
| 卡片间距 | 16pt |
| Tab 内间距 | 8pt |
| 组件内边距 | 12-16pt |

### 5.5 动效规范

| 动效 | 时长 | 曲线 |
|------|------|------|
| Tab 切换 | 300ms | spring(0.7) |
| 摇杆回弹 | 150ms | spring |
| 角色呼吸 | 2400ms | ease-in-out 循环 |
| 浮岛悬浮 | 5000ms | ease-in-out 循环 |
| 传送门旋转 | 4000ms | linear 循环 |

---

## 6. 技术规格

### 6.1 技术栈

| 层 | 技术 | 说明 |
|----|------|------|
| UI 框架 | SwiftUI | 页面结构、导航、换装 UI |
| 游戏引擎 | SpriteKit | 岛屿场景、角色精灵、物理 |
| 集成方式 | SpriteView | SwiftUI 内嵌 SpriteKit 场景 |
| 灵动岛 | ActivityKit | Live Activity Widget Extension |
| 持久化 | UserDefaults | 配置和换装数据 |
| 包管理 | Swift Package Manager | 无外部依赖 |
| 最低 iOS | 18.6 | 支持灵动岛 |

### 6.2 项目结构

```
XianxiaIsland/
├── App/
│   ├── XianxiaIslandApp.swift      # App 入口
│   ├── ContentView.swift          # 主视图 + TabView
│   ├── AppState.swift             # 全局状态
│   └── Info.plist
├── Scenes/
│   ├── Island/
│   │   ├── IslandScene.swift      # SpriteKit 场景（核心）
│   │   ├── IslandView.swift       # SwiftUI 容器
│   │   └── VirtualJoystick.swift  # 虚拟摇杆
│   ├── Avatar/
│   │   └── AvatarView.swift       # 换装页
│   ├── Backpack/
│   │   └── BackpackView.swift     # 背包（占位）
│   ├── Friends/
│   │   └── FriendsView.swift      # 好友（占位）
│   └── Settings/
│       └── SettingsView.swift      # 设置页
├── Models/
│   ├── Avatar.swift               # 角色模型
│   ├── Island.swift               # 岛屿模型
│   └── MotionData.swift           # 运动数据模型
├── Components/
│   └── TabBar.swift               # 自定义底部 TabBar
├── Resources/
│   ├── Assets.xcassets/
│   └── Audio/
└── project.yml                    # XcodeGen 配置

XianxiaIslandWidgets/              # Widget Extension（Phase 5）
├── XianxiaIslandWidgetsBundle.swift
└── XianxiaIslandLiveActivity.swift
```

### 6.3 数据模型

```swift
// 角色
struct Avatar: Codable {
    let id: UUID
    var nickname: String
    var skin: SkinConfig
}

// 换装配置
struct SkinConfig: Codable {
    var hairColor: String   // 头发色
    var bodyColor: String   // 衣服色
    var accentColor: String // 点缀色
}

// 运动数据
struct MotionData: Codable {
    var jumpCount: Int = 0
    var totalMinutes: Int = 0
    var todayCalories: Double = 0
}
```

### 6.4 性能目标

| 指标 | 目标值 |
|------|--------|
| 帧率 | 稳定 60fps |
| 启动时间 | < 2s |
| 内存占用 | < 150MB |

---

## 7. 已实现功能清单（Phase 2 截止）

| 功能 | 状态 | 文件 |
|------|------|------|
| App 入口 + 深色主题 | ✅ 完成 | `XianxiaIslandApp.swift` |
| 主 Tab 导航 | ✅ 完成 | `ContentView.swift` |
| 云海浮岛场景 | ✅ 完成 | `IslandScene.swift` |
| 星空背景 | ✅ 完成 | `IslandScene.swift` |
| 云海粒子效果 | ✅ 完成 | `IslandScene.swift` |
| 浮岛悬浮动画 | ✅ 完成 | `IslandScene.swift` |
| 亭子建筑 | ✅ 完成 | `IslandScene.swift` |
| 楼阁建筑 | ✅ 完成 | `IslandScene.swift` |
| 仙鹤飞行 | ✅ 完成 | `IslandScene.swift` |
| Q 版角色精灵 | ✅ 完成 | `IslandScene.swift` |
| 角色呼吸/行走动画 | ✅ 完成 | `IslandScene.swift` |
| 虚拟摇杆控制 | ✅ 完成 | `VirtualJoystick.swift` |
| 角色跟随相机 | ✅ 完成 | `IslandScene.swift` |
| 换装页面 UI | ✅ 完成 | `AvatarView.swift` |
| 换装预览 | ✅ 完成 | `AvatarView.swift` |
| 背包页面 | ✅ 完成 | `BackpackView.swift` |
| 好友列表 | ✅ 完成 | `FriendsView.swift` |
| 设置页面 | ✅ 完成 | `SettingsView.swift` |

---

## 8. 待开发功能

### Phase 3 — 岛屿丰富化
- [ ] NPC 节点（可对话仙侠角色）
- [ ] 传送门交互（进入其他岛屿）
- [ ] 瀑布粒子系统
- [ ] 更多云雾层次
- [ ] 背景音乐播放

### Phase 4 — 换装 + 导航
- [ ] 皮肤数据持久化（UserDefaults）
- [ ] 换装同步到 SpriteKit 角色外观
- [ ] 背包道具实际功能
- [ ] 好友列表实际数据

### Phase 5 — 灵动岛集成
- [ ] Widget Extension 创建
- [ ] Live Activity 配置
- [ ] 运动数据写入灵动岛
- [ ] 前后台状态同步

### Phase 6 — 跳绳游戏
- [ ] 陀螺仪跳绳检测
- [ ] 计数逻辑
- [ ] 目标/节奏模式
- [ ] 运动数据与岛屿联动

---

## 9. 里程碑与交付

| 里程碑 | 交付物 | 预计状态 |
|--------|--------|----------|
| M1 | Xcode 项目 + 岛屿漫游基础 | ✅ 已完成 |
| M2 | 岛屿丰富化 | 🚧 待开发 |
| M3 | 完整导航 + 换装 | 🚧 待开发 |
| M4 | 灵动岛集成 | 🚧 待开发 |
| M5 | 跳绳游戏闭环 | 🚧 待开发 |

---

## 10. 风险与依赖

| 风险 | 影响 | 缓解方案 |
|------|------|----------|
| SpriteKit 性能瓶颈 | 高帧率场景卡顿 | 后期考虑 SceneKit 或 Unity |
| 灵动岛 API 限制 | 展示内容受限 | 参考 Apple ActivityKit 文档 |
| 陀螺仪精度 | 跳绳检测不准 | 预留手动输入模式 |
| 美术资源缺失 | 色块占位不美观 | Phase 3 后接入设计师资源 |

---

## 11. 附录

### A. 色彩色值参考

```swift
// 主色：紫蓝 #7B5EA7
// 辅色：古纸金 #F5E6C8
// 点缀：中国红 #E85D75
// 背景：夜空深色 #1A1A2E
```

### B. 参考产品

- **蛋仔派对**（网易）：岛屿漫游 + 社交 + 游戏
- **天天跳绳**：运动计数 + 数据展示
- **原神**：仙侠风场景表现力

### C. 联系人

- 产品/开发：Kyle
