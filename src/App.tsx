import {
  Backpack,
  BarChart3,
  BookOpen,
  Cloud,
  Home,
  Music,
  Pause,
  Palette,
  Play,
  Settings2,
  Shield,
  Sparkles,
  Swords,
  Users
} from "lucide-react";
import { PointerEvent, useEffect, useMemo, useRef, useState } from "react";
import { artAssets } from "./assets/artAssets";
import { backpackItems, rarityLabels, type BackpackItem } from "./Models/BackpackItem";
import { stories } from "./data/stories";
import type { AvatarState, IslandId, IslandMeta, Panel, Position, Sword } from "./types";

const islands: IslandMeta[] = [
  { id: "home", name: "仙侠岛", description: "主岛屿，角色展示与飞剑养成的核心区域" },
  { id: "lingcao", name: "灵草园", description: "灵草丰茂，适合采集炼丹材料" },
  { id: "swordStage", name: "剑炉台", description: "飞剑锻造圣地，可提升飞剑熟练度" },
  { id: "xingque", name: "月泉", description: "月华凝成的修行泉，适合恢复灵力与闭关" }
];

const STORAGE_KEY = "xianxia-island-web-state";

const panels: Array<{ id: Panel; label: string; icon: typeof Home }> = [
  { id: "island", label: "仙侠岛", icon: Home },
  { id: "avatar", label: "换装", icon: Palette },
  { id: "swords", label: "飞剑库", icon: Swords },
  { id: "backpack", label: "背包", icon: Backpack },
  { id: "story", label: "故事", icon: BookOpen },
  { id: "friends", label: "好友", icon: Users },
  { id: "cultivation", label: "修行", icon: BarChart3 }
];

const defaultAvatar: AvatarState = {
  nickname: "青岚",
  robe: "#68d8c1",
  skin: "#f5ddc8",
  hair: "#151929",
  accent: "#e85d75",
  aura: "#62f4ff"
};

const swords: Sword[] = [
  { id: "starlight", name: "星河照影", rarity: "天阶", element: "星", color: "#72f7ff", trait: "飞行速度 +18%", power: 92 },
  { id: "jade", name: "青玉流光", rarity: "地阶", element: "木", color: "#68d8c1", trait: "灵力恢复 +12%", power: 78 },
  { id: "ember", name: "朱雀离火", rarity: "天阶", element: "火", color: "#ff6b7d", trait: "爆发伤害 +16%", power: 88 },
  { id: "moon", name: "月魄寒霜", rarity: "玄阶", element: "水", color: "#b6c8ff", trait: "护盾强度 +10%", power: 71 },
  { id: "gold", name: "金阙镇岳", rarity: "地阶", element: "金", color: "#f3c969", trait: "稳定性 +15%", power: 82 },
  { id: "void", name: "玄穹无相", rarity: "仙阶", element: "空", color: "#b38cff", trait: "传送冷却 -20%", power: 96 }
];

const swordArtById: Record<string, string> = {
  starlight: artAssets.swords.jadeCyan,
  jade: artAssets.swords.whiteGold,
  ember: artAssets.swords.crimsonThunder,
  moon: artAssets.swords.iceBlue,
  gold: artAssets.swords.antiqueGold,
  void: artAssets.swords.violetVoid
};

const swordTrailById: Record<string, string> = {
  starlight: artAssets.swords.trails.cyan,
  jade: artAssets.swords.trails.cyan,
  ember: artAssets.swords.trails.crimson,
  moon: artAssets.swords.trails.cyan,
  gold: artAssets.swords.trails.crimson,
  void: artAssets.swords.trails.violet
};

const itemFrameByRarity: Record<BackpackItem["rarity"], string> = {
  "普通": artAssets.items.frames.common,
  "稀有": artAssets.items.frames.rare,
  "珍稀": artAssets.items.frames.superRare,
  "传说": artAssets.items.frames.legendary
};

const stageIslands: Array<{ meta: IslandMeta; art: string; position: "left" | "right" | "top" }> = [
  { meta: islands[1], art: artAssets.islands.spiritGarden, position: "left" },
  { meta: islands[2], art: artAssets.islands.swordForge, position: "right" },
  { meta: islands[3], art: artAssets.islands.moonSpring, position: "top" }
];

const backgroundTracks = [
  { id: "cloud-stardome-01", name: "云雾星穹 一", src: artAssets.audio.cloudStardome01 },
  { id: "cloud-stardome-02", name: "云雾星穹 二", src: artAssets.audio.cloudStardome02 }
];

const colorSets = {
  robe: ["#68d8c1", "#7b5ea7", "#f3c969", "#e85d75", "#f5e6c8", "#4f8cff"],
  skin: ["#f5ddc8", "#e9b887", "#c8865e", "#8f553c", "#ffe3d2", "#d6b08f"],
  hair: ["#151929", "#3d2b1f", "#5b3f8f", "#f5e6c8", "#6b2c3a", "#24435c"],
  accent: ["#e85d75", "#f3c969", "#68d8c1", "#b38cff", "#4f8cff", "#f5e6c8"]
};

const friends = [
  { name: "太白真人", realm: "金丹后期", online: true, island: "星瀑峰", avatar: artAssets.friends.swordMaster },
  { name: "青云仙子", realm: "筑基圆满", online: true, island: "灵草屿", avatar: artAssets.friends.cloudFairy },
  { name: "玄天武帝", realm: "元婴初期", online: false, island: "镇岳台", avatar: artAssets.friends.martialEmperor },
  { name: "灵虚子", realm: "金丹初期", online: true, island: "云门渡", avatar: artAssets.friends.herbAlchemist },
  { name: "玄幽影", realm: "金丹中期", online: false, island: "无相阁", avatar: artAssets.friends.voidCultivator },
  { name: "月霜璃", realm: "筑基后期", online: true, island: "寒月台", avatar: artAssets.friends.frostGirl }
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function loadState(): { avatar: AvatarState; swordId: string } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { avatar: defaultAvatar, swordId: swords[0].id };
    const parsed = JSON.parse(raw) as Partial<{ avatar: AvatarState; swordId: string }>;
    return {
      avatar: { ...defaultAvatar, ...parsed.avatar },
      swordId: parsed.swordId && swords.some((sword) => sword.id === parsed.swordId) ? parsed.swordId : swords[0].id
    };
  } catch {
    return { avatar: defaultAvatar, swordId: swords[0].id };
  }
}

export default function App() {
  const persisted = useMemo(loadState, []);
  const [activePanel, setActivePanel] = useState<Panel>("island");
  const [activeIslandId, setActiveIslandId] = useState<IslandId>("home");
  const [avatar, setAvatar] = useState<AvatarState>(persisted.avatar);
  const [equippedSwordId, setEquippedSwordId] = useState(persisted.swordId);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [joystick, setJoystick] = useState<Position>({ x: 0, y: 0 });
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  const [isReadingStory, setIsReadingStory] = useState(false);
  const keysRef = useRef(new Set<string>());
  const joystickRef = useRef<Position>({ x: 0, y: 0 });
  const lastFrameRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isMovingRef = useRef(false);

  const equippedSword = swords.find((sword) => sword.id === equippedSwordId) ?? swords[0];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ avatar, swordId: equippedSwordId }));
  }, [avatar, equippedSwordId]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.42;
    audio.loop = true;
    if (!isMusicPlaying) {
      audio.pause();
      return;
    }
    void audio.play().catch(() => setIsMusicPlaying(false));
  }, [isMusicPlaying, trackIndex]);

  const toggleMusic = () => {
    setIsMusicPlaying((playing) => !playing);
  };

  const switchTrack = () => {
    setTrackIndex((current) => (current + 1) % backgroundTracks.length);
    setIsMusicPlaying(true);
  };

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(event.key)) {
        event.preventDefault();
        keysRef.current.add(event.key.toLowerCase());
      }
    };
    const up = (event: KeyboardEvent) => keysRef.current.delete(event.key.toLowerCase());
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    const tick = (time: number) => {
      const last = lastFrameRef.current ?? time;
      const delta = Math.min(32, time - last) / 16.67;
      lastFrameRef.current = time;
      const keys = keysRef.current;
      let dx = joystickRef.current.x;
      let dy = joystickRef.current.y;

      if (keys.has("arrowleft") || keys.has("a")) dx -= 1;
      if (keys.has("arrowright") || keys.has("d")) dx += 1;
      if (keys.has("arrowup") || keys.has("w")) dy -= 1;
      if (keys.has("arrowdown") || keys.has("s")) dy += 1;

      const distance = Math.hypot(dx, dy);
      if ((distance > 0.01) !== isMovingRef.current) {
        isMovingRef.current = distance > 0.01;
        setIsMoving(distance > 0.01);
      }
      if (distance > 0.01) {
        const speed = 3.2 * delta;
        const nx = dx / distance;
        const ny = dy / distance;
        setPosition((current) => ({
          x: clamp(current.x + nx * speed, -34, 34),
          y: clamp(current.y + ny * speed, -24, 24)
        }));
      }

      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const updateAvatar = (key: keyof AvatarState, value: string) => {
    setAvatar((current) => ({ ...current, [key]: value }));
  };

  const handleJoystick = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    const raw = { x: event.clientX - center.x, y: event.clientY - center.y };
    const length = Math.hypot(raw.x, raw.y);
    const radius = 42;
    const scale = length > radius ? radius / length : 1;
    const next = { x: raw.x * scale, y: raw.y * scale };
    setJoystick(next);
    joystickRef.current = { x: next.x / radius, y: next.y / radius };
  };

  const releaseJoystick = () => {
    setJoystick({ x: 0, y: 0 });
    joystickRef.current = { x: 0, y: 0 };
  };

  return (
    <div
      className="app"
      style={
        {
          "--robe": avatar.robe,
          "--skin": avatar.skin,
          "--hair": avatar.hair,
          "--accent": avatar.accent,
          "--aura": avatar.aura,
          "--sword": equippedSword.color,
          "--ui-panel-frame": `url(${artAssets.ui.system.panelFrame})`,
          "--ui-progress-frame": `url(${artAssets.ui.system.progressCultivation})`,
          "--ui-tab-selected": `url(${artAssets.ui.system.tabSelected})`,
          "--ui-button-primary": `url(${artAssets.ui.system.buttonPrimary})`,
          "--ui-toast-frame": `url(${artAssets.ui.system.toastFrame})`
        } as React.CSSProperties
      }
    >
      <StarField />
      <audio ref={audioRef} src={backgroundTracks[trackIndex].src} preload="metadata" />
      <header className="topbar">
        <div className="brand">
          <div className="brandMark">
            <Swords size={20} />
          </div>
          <div>
            <strong>星穹飞剑 · 仙侠岛</strong>
            <span>星穹飞剑生态</span>
          </div>
        </div>
        <div className="statusPills">
          <span>境界：筑基圆满</span>
          <span>当前飞剑：{equippedSword.name}</span>
          <span>今日修行 42 分钟</span>
        </div>
        <div className="credit">
          <span>Credits</span>
          <strong>Leon Li — Junior Developer</strong>
        </div>
        <div className="musicControls" aria-label="背景音乐">
          <button onClick={toggleMusic} type="button" aria-label={isMusicPlaying ? "暂停背景音乐" : "播放背景音乐"}>
            {isMusicPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button onClick={switchTrack} type="button" aria-label="切换背景音乐">
            <Music size={16} />
            <span>{backgroundTracks[trackIndex].name}</span>
          </button>
        </div>
      </header>

      <main className="layout">
        <section className={`stageShell ${isReadingStory ? "showingStory" : ""}`} aria-label="仙侠岛主场景">
          {isReadingStory && stories[0].chapters.find(ch => ch.id === activeChapterId) && (
            <StoryReaderOverlay
              chapter={stories[0].chapters.find(ch => ch.id === activeChapterId)!}
              onClose={() => {
                setActiveChapterId(null);
                setIsReadingStory(false);
              }}
            />
          )}
          {!isReadingStory && (
            <>
              <img className="stageBackgroundArt" src={artAssets.backgrounds.starDome} alt="" aria-hidden="true" />
              <IslandStage
                avatar={avatar}
                sword={equippedSword}
                position={position}
                isMoving={isMoving}
                activeIslandId={activeIslandId}
                onPortalClick={(island) => setActiveIslandId(island.id)}
              />
              <img className="cloudMistOverlay" src={artAssets.effects.cloudMist} alt="" aria-hidden="true" />
              <div className="sceneHud">
                <div>
                  <span>当前岛屿</span>
                  <strong>{islands.find(i => i.id === activeIslandId)?.name ?? "仙侠岛"}</strong>
                </div>
                <div>
                  <span>灵力</span>
                  <strong>86%</strong>
                </div>
                <div>
                  <span>飞剑熟练度</span>
                  <strong>{equippedSword.power}</strong>
                </div>
              </div>
              <div
                className="joystick"
                onPointerDown={(event) => {
                  event.currentTarget.setPointerCapture(event.pointerId);
                  handleJoystick(event);
                }}
                onPointerMove={(event) => {
                  if (event.currentTarget.hasPointerCapture(event.pointerId)) handleJoystick(event);
                }}
                onPointerUp={releaseJoystick}
                onPointerCancel={releaseJoystick}
                aria-label="虚拟摇杆"
              >
                <div className="joystickKnob" style={{ transform: `translate(${joystick.x}px, ${joystick.y}px)` }} />
              </div>
            </>
          )}
        </section>

        <aside className="panel">
          <img className="panelPlaque" src={artAssets.ui.titlePlaque} alt="" aria-hidden="true" />
          <PanelHeader activePanel={activePanel} />
          {activePanel === "island" && <IslandPanel avatar={avatar} sword={equippedSword} activeIsland={islands.find(i => i.id === activeIslandId) ?? islands[0]} />}
          {activePanel === "avatar" && <AvatarPanel avatar={avatar} updateAvatar={updateAvatar} />}
          {activePanel === "swords" && (
            <SwordPanel equippedSwordId={equippedSwordId} equipSword={setEquippedSwordId} />
          )}
          {activePanel === "backpack" && <BackpackPanel />}
          {activePanel === "story" && (
            <StoryPanel
              story={stories[0]}
              activeChapterId={activeChapterId}
              onChapterOpen={(id) => {
                setActiveChapterId(id);
                setIsReadingStory(true);
              }}
              onChapterClose={() => {
                setActiveChapterId(null);
                setIsReadingStory(false);
              }}
            />
          )}
          {activePanel === "friends" && <FriendsPanel />}
          {activePanel === "cultivation" && <CultivationPanel sword={equippedSword} />}
        </aside>
      </main>

      <nav className="bottomNav" aria-label="主导航">
        <img className="navOrnament" src={artAssets.ui.goldBorderStrip} alt="" aria-hidden="true" />
        {panels.map((panel) => {
          const Icon = panel.icon;
          return (
            <button
              key={panel.id}
              className={activePanel === panel.id ? "active" : ""}
              onClick={() => setActivePanel(panel.id)}
              type="button"
            >
              <Icon size={20} />
              <span>{panel.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function StarField() {
  return (
    <div className="stars" aria-hidden="true">
      {Array.from({ length: 46 }).map((_, index) => (
        <i key={index} style={{ "--i": index } as React.CSSProperties} />
      ))}
    </div>
  );
}

function IslandStage({
  avatar,
  sword,
  position,
  isMoving,
  activeIslandId,
  onPortalClick
}: {
  avatar: AvatarState;
  sword: Sword;
  position: Position;
  isMoving: boolean;
  activeIslandId: IslandId;
  onPortalClick: (island: IslandMeta) => void;
}) {
  return (
    <div className="stage">
      <div className="cloudLayer cloudA" />
      <div className="cloudLayer cloudB" />
      {stageIslands.map((island) => (
        <button
          key={island.meta.id}
          className={`remoteIsland ${island.position}${activeIslandId === island.meta.id ? " active" : ""}`}
          onClick={() => onPortalClick(island.meta)}
          type="button"
          aria-label={`前往${island.meta.name}`}
        >
          <img src={island.art} alt="" aria-hidden="true" />
          <span>{island.meta.name}</span>
        </button>
      ))}
      <div className="mainIslandArt">
        <img src={artAssets.islands.main} alt="仙侠岛主岛" />
        <img className="cloudPavilionAsset" src={artAssets.buildings.cloudPavilion} alt="" aria-hidden="true" />
      </div>
      <img
        className="portalAsset"
        src={artAssets.effects.portalActive}
        alt="星穹传送门"
        onClick={() => onPortalClick(islands[1])}
        role="button"
        tabIndex={0}
        aria-label="点击传送"
      />
      <AvatarSprite avatar={avatar} sword={sword} position={position} isMoving={isMoving} />
      <div className="crane" />
    </div>
  );
}

function AvatarSprite({ avatar, sword, position, isMoving }: { avatar: AvatarState; sword: Sword; position: Position; isMoving: boolean }) {
  const characterArt = isMoving ? artAssets.character.walkRightV2 : artAssets.character.idleV2;

  return (
    <div className={`avatarWrap ${isMoving ? "moving" : ""}`} style={{ transform: `translate(calc(-50% + ${position.x}vw), calc(-50% + ${position.y}vh))` }}>
      <div className="swordOrbit">
        <img className="flyingSwordAsset primary" src={swordArtById[sword.id]} alt={sword.name} title={sword.name} />
        <img className="flyingSwordAsset secondary" src={artAssets.swords.iceBlue} alt="" aria-hidden="true" />
      </div>
      <div className="avatarGlow" />
      <img className="avatarAsset" src={characterArt} alt={`${avatar.nickname} 的角色`} />
      <div className="nameplate">{avatar.nickname}</div>
    </div>
  );
}

function PanelHeader({ activePanel }: { activePanel: Panel }) {
  const meta = panels.find((panel) => panel.id === activePanel) ?? panels[0];
  const Icon = meta.icon;
  return (
    <div className="panelHeader">
      <img className="panelDivider" src={artAssets.ui.sectionDivider} alt="" aria-hidden="true" />
      <Icon size={22} />
      <div>
        <span>当前模块</span>
        <strong>{meta.label}</strong>
      </div>
    </div>
  );
}

function IslandPanel({ avatar, sword, activeIsland }: { avatar: AvatarState; sword: Sword; activeIsland: IslandMeta }) {
  return (
    <div className="panelStack">
      <InfoCard icon={<Home />} title="当前岛屿" value={activeIsland.name} detail={activeIsland.description} />
      <InfoCard icon={<Shield />} title="角色身份" value={avatar.nickname} detail="星穹飞剑生态账号已绑定" />
      <InfoCard icon={<Swords />} title="当前飞剑" value={sword.name} detail={`${sword.rarity} · ${sword.element}系 · ${sword.trait}`} />
      <div className="hintBox">点击岛屿或传送门可切换岛屿。支持 WASD、方向键或左下角摇杆移动角色。</div>
    </div>
  );
}

function AvatarPanel({
  avatar,
  updateAvatar
}: {
  avatar: AvatarState;
  updateAvatar: (key: keyof AvatarState, value: string) => void;
}) {
  return (
    <div className="panelStack">
      <label className="field">
        <span>昵称</span>
        <input value={avatar.nickname} maxLength={8} onChange={(event) => updateAvatar("nickname", event.target.value)} />
      </label>
      <ColorSection title="衣袍" colors={colorSets.robe} value={avatar.robe} onChange={(value) => updateAvatar("robe", value)} />
      <ColorSection title="肤色" colors={colorSets.skin} value={avatar.skin} onChange={(value) => updateAvatar("skin", value)} />
      <ColorSection title="发色" colors={colorSets.hair} value={avatar.hair} onChange={(value) => updateAvatar("hair", value)} />
      <ColorSection title="点缀" colors={colorSets.accent} value={avatar.accent} onChange={(value) => updateAvatar("accent", value)} />
      <ColorSection title="剑气" colors={colorSets.robe} value={avatar.aura} onChange={(value) => updateAvatar("aura", value)} />
      <div className="characterActionGrid" aria-label="角色动作资产">
        <img src={artAssets.character.idleV2} alt="待机动作" />
        <img src={artAssets.character.walkRightV2} alt="行走动作" />
        <img src={artAssets.character.castV2} alt="施法动作" />
        <img src={artAssets.character.swordRideV2} alt="御剑动作" />
      </div>
    </div>
  );
}

function ColorSection({
  title,
  colors,
  value,
  onChange
}: {
  title: string;
  colors: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="colorSection">
      <div className="sectionTitle">{title}</div>
      <div className="swatches">
        {colors.map((color) => (
          <button
            key={color}
            className={value === color ? "selected" : ""}
            style={{ background: color }}
            onClick={() => onChange(color)}
            type="button"
            aria-label={`${title} ${color}`}
          />
        ))}
      </div>
    </div>
  );
}

function SwordPanel({
  equippedSwordId,
  equipSword
}: {
  equippedSwordId: string;
  equipSword: (id: string) => void;
}) {
  return (
    <div className="panelStack">
      <div className="swordForgeShowcase">
        <img src={artAssets.swords.forgePlatform} alt="" aria-hidden="true" />
        <div>
          <span>飞剑锻造台</span>
          <strong>御剑资产系列</strong>
        </div>
      </div>
      <div className="cardGrid swordGrid">
        {swords.map((sword) => (
          <button
            key={sword.id}
            className={`swordCard ${equippedSwordId === sword.id ? "equipped" : ""}`}
            onClick={() => equipSword(sword.id)}
            type="button"
          >
            <span className="swordIcon" style={{ "--sword-card": sword.color } as React.CSSProperties}>
              <img className="swordTrailAsset" src={swordTrailById[sword.id]} alt="" aria-hidden="true" />
              <img className="swordBladeAsset" src={swordArtById[sword.id]} alt="" aria-hidden="true" />
            </span>
            <strong>{sword.name}</strong>
            <small>{sword.rarity} · {sword.element}系</small>
            <div className="power">
              <span style={{ width: `${sword.power}%` }} />
            </div>
            <em>{equippedSwordId === sword.id ? "已装备" : sword.trait}</em>
          </button>
        ))}
      </div>
    </div>
  );
}

function BackpackPanel() {
  return (
    <div className="cardGrid">
      {backpackItems.map((item) => (
        <div key={item.name} className={`itemCard rarity-${rarityLabels[item.rarity].toLowerCase()}`}>
          <img className="itemFrameAsset" src={itemFrameByRarity[item.rarity]} alt="" aria-hidden="true" />
          <span className="itemIcon" style={{ "--item": item.color } as React.CSSProperties}>
            <img src={item.art} alt="" aria-hidden="true" />
          </span>
          <strong>{item.name}</strong>
          <small>{item.type}</small>
          <b>{rarityLabels[item.rarity]}</b>
          <em>x{item.count}</em>
        </div>
      ))}
    </div>
  );
}

function FriendsPanel() {
  return (
    <div className="panelStack">
      {friends.map((friend) => (
        <div className="friendRow" key={friend.name}>
          <div className="friendAvatar">
            <img src={friend.avatar} alt="" aria-hidden="true" />
          </div>
          <div>
            <strong>{friend.name}</strong>
            <span>{friend.realm} · {friend.island}</span>
          </div>
          <button type="button">{friend.online ? "拜访" : "留言"}</button>
        </div>
      ))}
    </div>
  );
}

function CultivationPanel({ sword }: { sword: Sword }) {
  return (
    <div className="panelStack">
      <Metric label="今日修行" value="42 分钟" progress={70} />
      <Metric label="灵力储备" value="86%" progress={86} />
      <Metric label="飞剑熟练度" value={`${sword.power}/100`} progress={sword.power} />
      <Metric label="跳绳模拟" value="328 次" progress={58} />
      <div className="ecosystemCard">
        <Sparkles size={22} />
        <strong>生态联动建议</strong>
        <p>运动数据可转化为灵力，灵力用于飞剑养成、岛屿装饰和好友拜访激励。</p>
      </div>
    </div>
  );
}

function Metric({ label, value, progress }: { label: string; value: string; progress: number }) {
  return (
    <div className="metric">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="progress">
        <span style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function StoryReaderOverlay({
  chapter,
  onClose
}: {
  chapter: typeof stories[0]["chapters"][0];
  onClose: () => void;
}) {
  return (
    <div className="storyReaderOverlay">
      <div className="storyReaderHeader">
        <button className="backBtn" onClick={onClose} type="button">
          ← 返回
        </button>
        <span>{chapter.title}</span>
        <span className="storyDuration">{chapter.duration}分钟</span>
      </div>
      <div className="storyContent">
        {chapter.content.map((block, index) => {
          if (block.type === "text") {
            return <p key={index} className="storyText">{block.content}</p>;
          }
          if (block.type === "dialog") {
            return (
              <div key={index} className="storyDialog">
                <span className="dialogBubble">{block.content}</span>
              </div>
            );
          }
          if (block.type === "image") {
            return (
              <div key={index} className="storyImageBlock">
                {block.imageUrl ? (
                  <img src={block.imageUrl} alt={block.content || "故事插图"} />
                ) : (
                  <div className="storyImagePlaceholder">
                    <span>插图区域</span>
                  </div>
                )}
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="storyAudioPlayer">
        <button type="button" className="playBtn">▶</button>
        <div className="audioProgress">
          <div className="audioProgressBar" style={{ width: "30%" }} />
        </div>
        <span className="audioTime">1:12 / {chapter.duration}:00</span>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  value,
  detail
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="infoCard">
      <div className="infoIcon">{icon}</div>
      <div>
        <span>{title}</span>
        <strong>{value}</strong>
        <small>{detail}</small>
      </div>
    </div>
  );
}

function StoryPanel({
  story,
  activeChapterId,
  onChapterOpen,
  onChapterClose
}: {
  story: typeof stories[0];
  activeChapterId: string | null;
  onChapterOpen: (id: string) => void;
  onChapterClose: () => void;
}) {
  const activeChapter = story.chapters.find((ch) => ch.id === activeChapterId);

  if (activeChapter) {
    return (
      <div className="panelStack">
        <div className="storyHero">
          <div className="storyCover">
            <span className="storyCoverIcon">📖</span>
          </div>
          <div className="storyMeta">
            <strong>{story.title}</strong>
            <span>{story.description}</span>
          </div>
        </div>
        <div className="chapterList">
          {story.chapters.map((chapter) => (
            <button
              key={chapter.id}
              className={`chapterCard ${activeChapterId === chapter.id ? "active" : ""}`}
              onClick={() => onChapterOpen(chapter.id)}
              type="button"
            >
              <span className="chapterNum">{chapter.title.split("·")[0]}</span>
              <span className="chapterTitle">{chapter.title.split("·")[1] ?? chapter.title}</span>
              <span className="chapterDuration">{chapter.duration}分钟</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="panelStack">
      <div className="storyHero">
        <div className="storyCover">
          <span className="storyCoverIcon">📖</span>
        </div>
        <div className="storyMeta">
          <strong>{story.title}</strong>
          <span>{story.description}</span>
        </div>
      </div>
      <div className="chapterList">
        {story.chapters.map((chapter) => (
          <button
            key={chapter.id}
            className="chapterCard"
            onClick={() => onChapterOpen(chapter.id)}
            type="button"
          >
            <span className="chapterNum">{chapter.title.split("·")[0]}</span>
            <span className="chapterTitle">{chapter.title.split("·")[1] ?? chapter.title}</span>
            <span className="chapterDuration">{chapter.duration}分钟</span>
          </button>
        ))}
      </div>
    </div>
  );
}
