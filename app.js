const STORAGE_KEY = "kyokai-resonance-demo-v1";
const rarityRank = { R: 1, SR: 2, SSR: 3, UR: 4 };

const commanders = [
  { id: "touma", name: "トウマ", title: "街路の斥候", rarity: "R", role: "偵察", symbol: "➤", attack: 96, defense: 78, command: 18, colors: ["#1fc9ff", "#2948d5"], skill: { name: "先読み射線", detail: "弱点を捉える精密射撃" }, passive: { name: "雨路適応", stat: "attack", detail: "自身の攻撃を常時強化" } },
  { id: "mina", name: "ミナ", title: "境界の衛士", rarity: "R", role: "防御", symbol: "◆", attack: 82, defense: 108, command: 20, colors: ["#31c5f4", "#3945ad"], skill: { name: "境界防壁", detail: "防壁越しの反撃を展開" }, passive: { name: "護衛陣形", stat: "defense", detail: "自身の防御を常時強化" } },
  { id: "isami", name: "イサミ", title: "火花の整備士", rarity: "R", role: "補給", symbol: "⚙", attack: 90, defense: 88, command: 19, colors: ["#ff644d", "#7825ba"], skill: { name: "応急再装填", detail: "即席弾薬で一斉支援" }, passive: { name: "現地整備", stat: "both", detail: "自身の攻撃と防御を強化" } },
  { id: "ren", name: "レン", title: "蒼雷の遊撃手", rarity: "SR", role: "攻撃", symbol: "ϟ", attack: 128, defense: 88, command: 22, colors: ["#ff304f", "#7d27e8", "#19cfff"], art: "assets/commander-ren-v2.png", skill: { name: "蒼雷連鎖", detail: "雷撃を隣接目標へ連鎖" }, passive: { name: "雷導加速", stat: "attack", detail: "自身の攻撃を常時強化" } },
  { id: "sana", name: "サナ", title: "翠環の調律師", rarity: "SR", role: "支援", symbol: "⌁", attack: 106, defense: 104, command: 21, colors: ["#ff5870", "#8e2de2", "#ffd91a", "#13cfff"], art: "assets/commander-sana-v2.png", skill: { name: "翠環共振", detail: "共鳴波で部隊を援護" }, passive: { name: "循環触媒", stat: "both", detail: "自身の攻撃と防御を強化" } },
  { id: "ten", name: "テン", title: "黒鋼の盾役", rarity: "SR", role: "防御", symbol: "⬢", attack: 102, defense: 142, command: 22, colors: ["#562c8a", "#181526"], skill: { name: "黒鋼反射", detail: "障壁で衝撃を反射" }, passive: { name: "不動心", stat: "defense", detail: "自身の防御を常時強化" } },
  { id: "kanade", name: "カナデ", title: "星砕きの奏者", rarity: "SSR", role: "攻撃", symbol: "✦", attack: 168, defense: 118, command: 25, colors: ["#ffba24", "#f3299b"], skill: { name: "星霜連爆", detail: "音律弾を連続起爆" }, passive: { name: "高揚旋律", stat: "attack", detail: "自身の攻撃を常時強化" } },
  { id: "riku", name: "リク", title: "玻璃の疾風", rarity: "SSR", role: "遊撃", symbol: "≋", attack: 154, defense: 124, command: 26, colors: ["#21e8ef", "#7c36e8"], skill: { name: "残響突破", detail: "残像と共に防衛線を突破" }, passive: { name: "疾風装填", stat: "attack", detail: "自身の攻撃を常時強化" } },
  { id: "setsuna", name: "セツナ", title: "常夜の守護者", rarity: "SSR", role: "防御", symbol: "☾", attack: 132, defense: 176, command: 27, colors: ["#334dd8", "#d625b5"], skill: { name: "常夜結界", detail: "夜色の結界で敵を封鎖" }, passive: { name: "守護誓約", stat: "defense", detail: "自身の防御を常時強化" } },
  { id: "kohaku", name: "コハク", title: "界紋を拓く者", rarity: "UR", role: "万能", symbol: "界", attack: 196, defense: 164, command: 30, colors: ["#19e6ff", "#f126cf", "#ffd53d"], art: "assets/ur-exorcist.png", skill: { name: "万象展開", detail: "界紋を開き全域を制圧" }, passive: { name: "界紋共鳴", stat: "both", detail: "自身の攻撃と防御を強化" } }
];

const missions = [
  { stage: "1-1", zone: "NEON MARKET / RAIN", title: "ネオン街の追跡者", enemy: "裂界猟犬", description: "市場へ侵入した追跡機を排除せよ", stamina: 6, recommended: 760, enemyTroops: 58, enemyAttack: 390, enemyDefense: 320, reward: 800, art: "assets/enemy-rift-hound-v1.png", drops: { ore: 2, hide: 1 } },
  { stage: "1-2", zone: "INDUSTRIAL / NIGHT", title: "雨上がりの高架線", enemy: "猟犬機・強襲型", description: "輸送路を塞ぐ機械獣を追跡せよ", stamina: 8, recommended: 880, enemyTroops: 70, enemyAttack: 455, enemyDefense: 380, reward: 980, art: "assets/enemy-rift-hound-v1.png", drops: { fiber: 2, core: 1 } },
  { stage: "1-3", zone: "BORDER GATE", title: "境界門、再起動", enemy: "門衛猟犬アルファ", description: "門衛機の暴走信号を遮断せよ", stamina: 10, recommended: 1020, enemyTroops: 84, enemyAttack: 525, enemyDefense: 450, reward: 1200, art: "assets/enemy-rift-hound-v1.png", drops: { core: 2, hide: 2 } }
];

const materials = {
  ore: { name: "境鉄鉱", icon: "⬡", color: "#19e6ff" },
  fiber: { name: "霊脈繊維", icon: "≋", color: "#f126cf" },
  core: { name: "共鳴核", icon: "◆", color: "#ffd53d" },
  hide: { name: "機獣外皮", icon: "◈", color: "#5fffb0" }
};

const expeditions = [
  { id: "neon", code: "E-01 / CITY", name: "ネオン市場跡", detail: "雨に沈む露店街の残骸を捜索", drops: { ore: [2, 4], core: [0, 1] }, background: "radial-gradient(circle at 85% 30%,rgba(25,230,255,.35),transparent 28%),linear-gradient(135deg,#25104b,#081a31)" },
  { id: "greenhouse", code: "E-02 / RUINS", name: "翠環培養区", detail: "植物に覆われた旧研究所を採集", drops: { fiber: [2, 4], hide: [1, 2] }, background: "radial-gradient(circle at 85% 30%,rgba(95,255,176,.3),transparent 28%),linear-gradient(135deg,#153625,#122043)" },
  { id: "rift", code: "E-03 / BORDER", name: "境界断層", detail: "高危険度の亀裂周辺で希少素材を回収", drops: { core: [1, 3], ore: [1, 2], hide: [0, 1] }, background: "radial-gradient(circle at 85% 30%,rgba(241,38,207,.35),transparent 28%),linear-gradient(135deg,#3a102d,#181038)" }
];

const recipes = [
  { id: "arcRifle", slot: "weapon", name: "雷紋式アークライフル", type: "武器", icon: "⌁", effect: "対象キャラの攻撃 +42 / Lv", max: 5, costs: { ore: 6, core: 3 }, coins: 800 },
  { id: "borderCoat", slot: "armor", name: "境界織りの外套", type: "防具", icon: "♢", effect: "対象キャラの防御 +46 / Lv", max: 5, costs: { fiber: 5, hide: 4 }, coins: 700 },
  { id: "resonanceSigil", slot: "accessory", name: "五連共鳴紋章", type: "装飾", icon: "✦", effect: "対象キャラの攻防 +25 / Lv", max: 5, costs: { core: 5, fiber: 3 }, coins: 1000 }
];

const raidBoss = {
  name: "境界喰らい・ゴライアス",
  maxHp: 1000000,
  initialHp: 782400,
  attack: 690,
  defense: 540,
  art: "assets/enemy-goliath-v1.png",
  parts: {
    mask: { name: "白磁面", icon: "◉", maxHp: 1250, effect: "破壊後：ボス攻撃 -15%", reward: { fiber: 3, hide: 2 } },
    core: { name: "境界核", icon: "◆", maxHp: 1550, effect: "破壊後：味方与ダメージ +18%", reward: { core: 3, ore: 2 } }
  }
};

const raidRewardTiers = [
  { id: "r1", damage: 1200, name: "参加報酬", crystals: 100, coins: 1200, materials: { ore: 2 } },
  { id: "r2", damage: 3200, name: "貢献報酬", crystals: 150, coins: 2200, materials: { core: 2, fiber: 2 } },
  { id: "r3", damage: 6500, name: "上位貢献報酬", crystals: 250, coins: 4000, materials: { core: 3, hide: 3 } }
];

const arenaOpponents = [
  { id: "kasumi", name: "霞坂ユノ", guild: "霞境旅団", rating: 940, level: 1, skillLevel: 1, passiveLevel: 1, gearLevel: 0, team: ["ren", "sana", "touma", "mina", "isami"] },
  { id: "kurogane", name: "黒鉄ジン", guild: "夜光防衛線", rating: 1080, level: 3, skillLevel: 2, passiveLevel: 2, gearLevel: 1, team: ["sana", "ten", "riku", "mina", "touma"] },
  { id: "hoshiyomi", name: "星詠ミオ", guild: "天蓋観測局", rating: 1240, level: 6, skillLevel: 3, passiveLevel: 3, gearLevel: 2, team: ["kohaku", "kanade", "setsuna", "riku", "sana"] }
];

const dailyTasks = [
  { id: "mission", activity: "mission", code: "D-01", name: "任務を1回完了", detail: "いずれかの通常任務に勝利", goal: 1, icon: "⌖", reward: { crystals: 60 } },
  { id: "expedition", activity: "expedition", code: "D-02", name: "素材探索を1回実行", detail: "任意の探索地から素材を回収", goal: 1, icon: "⚒", reward: { coins: 800, materials: { ore: 2 } } },
  { id: "raid", activity: "raid", code: "D-03", name: "レイドへ1回参加", detail: "ゴライアスへ累積ダメージを同期", goal: 1, icon: "◉", reward: { crystals: 80 } },
  { id: "arena", activity: "arena", code: "D-04", name: "アリーナで1回対戦", detail: "勝敗を問わず5対5オート戦へ参加", goal: 1, icon: "冠", reward: { coins: 1200 } }
];

const loginRewards = [
  { label: "◆50", reward: { crystals: 50 } },
  { label: "●800", reward: { coins: 800 } },
  { label: "⬡3", reward: { materials: { ore: 3 } } },
  { label: "◆80", reward: { crystals: 80 } },
  { label: "≋3", reward: { materials: { fiber: 3 } } },
  { label: "●1,500", reward: { coins: 1500 } },
  { label: "◆200", reward: { crystals: 200, materials: { core: 2 } } }
];

const guildMembers = [
  { name: "白鷺ユラ", role: "団長", power: 4230, contribution: 430, commander: "kohaku" },
  { name: "黒鉄ジン", role: "副団長", power: 3660, contribution: 345, commander: "sana" },
  { name: "霞坂ユノ", role: "精鋭", power: 3180, contribution: 290, commander: "ren" },
  { name: "星詠ミオ", role: "参謀", power: 2950, contribution: 238, commander: "kanade" },
  { name: "雨森カイ", role: "団員", power: 2410, contribution: 174, commander: "touma" },
  { name: "灯里ナギ", role: "団員", power: 2260, contribution: 126, commander: "mina" }
];

const guildMissions = [
  { id: "guild-mission", activity: "mission", code: "G-01 / CITY", name: "共同制圧任務", detail: "団員全員で通常任務を40回完了", goal: 40, base: 39, unit: "回", reward: { crystals: 120 } },
  { id: "guild-raid", activity: "raid", code: "G-02 / RAID", name: "巨大境界反応", detail: "団員全員でレイドへ50万ダメージ", goal: 500000, base: 498000, unit: "DMG", reward: { coins: 2000, materials: { core: 3 } } },
  { id: "guild-arena", activity: "arena", code: "G-03 / ARENA", name: "境界防衛演習", detail: "団員全員でアリーナを50戦", goal: 50, base: 49, unit: "戦", reward: { crystals: 150 } }
];

const guildRewardTiers = [
  { id: "guild-c1", points: 50, name: "協力報酬 I", reward: { coins: 1200, materials: { ore: 2 } } },
  { id: "guild-c2", points: 150, name: "協力報酬 II", reward: { crystals: 120, materials: { fiber: 3 } } },
  { id: "guild-c3", points: 300, name: "協力報酬 III", reward: { crystals: 220, materials: { core: 3 } } }
];

const guildContributionPoints = { mission: 25, expedition: 15, raid: 60, arena: 35, craft: 15, upgrade: 10 };

const starterTeam = ["ren", "sana", "touma", "mina", "isami"];
const starterOwned = Object.fromEntries(starterTeam.map(id => [id, { shards: 0 }]));
const newProgress = () => ({ level: 1, skillLevel: 1, passiveLevel: 1 });
const newEquipment = () => ({ weapon: 0, armor: 0, accessory: 0 });
const newRaidParts = () => Object.fromEntries(Object.entries(raidBoss.parts).map(([id, part]) => [id, { hp: part.maxHp, broken: false }]));
const localDayKey = (date = new Date()) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
const newRaidState = () => ({ attempts: 3, resetDay: localDayKey(), bossHp: raidBoss.initialHp, personalDamage: 0, lastDamage: 0, runs: 0, target: "core", parts: newRaidParts(), claimedRewards: [] });
const newArenaState = () => ({ tickets: 5, resetDay: localDayKey(), rating: 1000, wins: 0, losses: 0, streak: 0, bestStreak: 0, history: [] });
const newDailyCounters = () => Object.fromEntries(dailyTasks.map(task => [task.activity, 0]));
const newDailyState = () => ({ resetDay: localDayKey(), counters: newDailyCounters(), claimed: [], allClaimed: false, loginLastDay: "", loginStreak: 0 });
const localWeekKey = (date = new Date()) => {
  const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  return localDayKey(monday);
};
const newGuildActions = () => ({ mission: 0, expedition: 0, raid: 0, arena: 0, craft: 0, upgrade: 0 });
const newGuildState = () => ({ weekKey: localWeekKey(), contribution: 0, totalContribution: 0, actions: newGuildActions(), claimedMissions: [], claimedRewards: [], cheerDay: "", lastActivity: "" });

const defaultState = () => ({
  schema: 7,
  crystals: 4500,
  coins: 12800,
  stamina: 48,
  pity: 72,
  troops: 100,
  owned: Object.fromEntries(starterTeam.map(id => [id, { shards: 0 }])),
  team: [...starterTeam],
  materials: { ore: 4, fiber: 3, core: 2, hide: 2 },
  progression: Object.fromEntries(starterTeam.map(id => [id, newProgress()])),
  equipment: Object.fromEntries(starterTeam.map(id => [id, newEquipment()])),
  raid: newRaidState(),
  arena: newArenaState(),
  player: { level: 7, xp: 85 },
  daily: newDailyState(),
  guild: newGuildState(),
  expeditions: 0,
  demoFirstTen: true,
  settings: { sound: true, haptic: true, reduceFlash: false, instant: false }
});

let state = loadState();
let activeSlot = 0;
let workshopUnitId = state.team[0];
let toastTimer;
let summonTimers = [];
let activeSummonResults = [];
let activeSummonPityBefore = 0;
let particleFrame;
let battleRun = null;
let audioSystem = null;
let soundPreviewTimer = [];

function loadState() {
  const defaults = defaultState();
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!parsed || typeof parsed !== "object") return defaults;
    const owned = { ...starterOwned, ...(parsed.owned || {}) };
    const proposedTeam = Array.isArray(parsed.team) ? parsed.team.filter(id => owned[id] && getCommander(id)) : [];
    const team = [...new Set([...proposedTeam, ...starterTeam])].slice(0, 5);
    const progression = { ...(parsed.progression || {}) };
    const equipment = { ...(parsed.equipment || {}) };
    Object.keys(owned).forEach(id => {
      progression[id] = { ...newProgress(), ...(progression[id] || {}) };
      equipment[id] = { ...newEquipment(), ...(equipment[id] || {}) };
    });
    if (!parsed.equipment && parsed.gear && team[0]) {
      equipment[team[0]] = {
        weapon: Number(parsed.gear.arcRifle) || 0,
        armor: Number(parsed.gear.borderCoat) || 0,
        accessory: Number(parsed.gear.resonanceSigil) || 0
      };
    }
    const parsedRaid = parsed.raid || {};
    const raid = {
      ...defaults.raid,
      ...parsedRaid,
      parts: Object.fromEntries(Object.keys(raidBoss.parts).map(id => [id, { ...defaults.raid.parts[id], ...(parsedRaid.parts?.[id] || {}) }])),
      claimedRewards: Array.isArray(parsedRaid.claimedRewards) ? parsedRaid.claimedRewards : []
    };
    if (raid.resetDay !== localDayKey()) {
      raid.attempts = 3;
      raid.resetDay = localDayKey();
    }
    raid.attempts = Math.max(0, Math.min(3, Number(raid.attempts) || 0));
    const restoredBossHp = Number(raid.bossHp);
    raid.bossHp = Number.isFinite(restoredBossHp) ? Math.max(0, Math.min(raidBoss.maxHp, restoredBossHp)) : raidBoss.initialHp;
    const parsedArena = parsed.arena || {};
    const arena = {
      ...defaults.arena,
      ...parsedArena,
      history: Array.isArray(parsedArena.history) ? parsedArena.history.slice(0, 10) : []
    };
    if (arena.resetDay !== localDayKey()) {
      arena.tickets = 5;
      arena.resetDay = localDayKey();
    }
    arena.tickets = Math.max(0, Math.min(5, Number(arena.tickets) || 0));
    arena.rating = Math.max(0, Number(arena.rating) || defaults.arena.rating);
    const parsedDaily = parsed.daily || {};
    const daily = {
      ...defaults.daily,
      ...parsedDaily,
      counters: { ...defaults.daily.counters, ...(parsedDaily.counters || {}) },
      claimed: Array.isArray(parsedDaily.claimed) ? parsedDaily.claimed : []
    };
    if (daily.resetDay !== localDayKey()) {
      daily.resetDay = localDayKey();
      daily.counters = newDailyCounters();
      daily.claimed = [];
      daily.allClaimed = false;
    }
    const player = { ...defaults.player, ...(parsed.player || {}) };
    player.level = Math.max(1, Number(player.level) || defaults.player.level);
    player.xp = Math.max(0, Number(player.xp) || 0);
    const parsedGuild = parsed.guild || {};
    const guild = {
      ...defaults.guild,
      ...parsedGuild,
      actions: { ...defaults.guild.actions, ...(parsedGuild.actions || {}) },
      claimedMissions: Array.isArray(parsedGuild.claimedMissions) ? parsedGuild.claimedMissions : [],
      claimedRewards: Array.isArray(parsedGuild.claimedRewards) ? parsedGuild.claimedRewards : []
    };
    if (guild.weekKey !== localWeekKey()) {
      guild.weekKey = localWeekKey();
      guild.contribution = 0;
      guild.actions = newGuildActions();
      guild.claimedMissions = [];
      guild.claimedRewards = [];
      guild.lastActivity = "";
    }
    guild.contribution = Math.max(0, Number(guild.contribution) || 0);
    guild.totalContribution = Math.max(0, Number(guild.totalContribution) || 0);
    const restored = {
      ...defaults,
      ...parsed,
      schema: 7,
      owned,
      team,
      materials: { ...defaults.materials, ...(parsed.materials || {}) },
      progression,
      equipment,
      raid,
      arena,
      player,
      daily,
      guild,
      settings: { ...defaults.settings, ...(parsed.settings || {}) }
    };
    const restoredTroops = Number(restored.troops);
    restored.troops = Math.min(Number.isFinite(restoredTroops) ? Math.max(0, restoredTroops) : defaults.troops, getTeamCapacity(restored));
    return restored;
  } catch {
    return defaults;
  }
}

function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function getCommander(id) { return commanders.find(item => item.id === id); }
function getTeam(currentState = state) { return currentState.team.map(getCommander).filter(Boolean); }
function randomFrom(list) { return list[Math.floor(Math.random() * list.length)]; }
function randomInt(min, max) { return Math.floor(min + Math.random() * (max - min + 1)); }
function formatNumber(value) { return new Intl.NumberFormat("ja-JP").format(value); }

function playerXpTarget(level = state.player.level) { return 150 + level * 30; }

function ensureDailyReset() {
  if (state.daily.resetDay === localDayKey()) return false;
  state.daily.resetDay = localDayKey();
  state.daily.counters = newDailyCounters();
  state.daily.claimed = [];
  state.daily.allClaimed = false;
  return true;
}

function ensureGuildReset() {
  if (state.guild.weekKey === localWeekKey()) return false;
  state.guild.weekKey = localWeekKey();
  state.guild.contribution = 0;
  state.guild.actions = newGuildActions();
  state.guild.claimedMissions = [];
  state.guild.claimedRewards = [];
  state.guild.lastActivity = "";
  return true;
}

function grantPlayerXp(amount) {
  state.player.xp += amount;
  let levels = 0;
  while (state.player.xp >= playerXpTarget()) {
    state.player.xp -= playerXpTarget();
    state.player.level += 1;
    state.crystals += 80;
    levels += 1;
  }
  return levels;
}

function recordDailyActivity(activity, xp) {
  ensureDailyReset();
  const task = dailyTasks.find(item => item.activity === activity);
  if (task) state.daily.counters[activity] = Math.min(task.goal, (Number(state.daily.counters[activity]) || 0) + 1);
  return grantPlayerXp(xp);
}

function recordGuildActivity(activity, value = 1) {
  ensureGuildReset();
  if (!(activity in guildContributionPoints)) return 0;
  state.guild.actions[activity] = (Number(state.guild.actions[activity]) || 0) + value;
  const points = guildContributionPoints[activity];
  state.guild.contribution += points;
  state.guild.totalContribution += points;
  const labels = { mission: "通常任務を完了", expedition: "素材探索を完了", raid: "レイドダメージを同期", arena: "アリーナへ参加", craft: "個別装備を生成", upgrade: "キャラ育成を実行" };
  state.guild.lastActivity = `${labels[activity]} / +${points}貢献`;
  return points;
}

function applyReward(reward) {
  state.crystals += reward.crystals || 0;
  state.coins += reward.coins || 0;
  Object.entries(reward.materials || {}).forEach(([key, amount]) => state.materials[key] += amount);
}

function rewardText(reward) {
  const parts = [];
  if (reward.crystals) parts.push(`◆${formatNumber(reward.crystals)}`);
  if (reward.coins) parts.push(`●${formatNumber(reward.coins)}`);
  Object.entries(reward.materials || {}).forEach(([key, amount]) => parts.push(`${materials[key].icon}${amount}`));
  return parts.join("　");
}

function localDayDistance(fromKey, toKey = localDayKey()) {
  if (!fromKey) return Infinity;
  const from = new Date(`${fromKey}T00:00:00`);
  const to = new Date(`${toKey}T00:00:00`);
  return Math.round((to - from) / 86400000);
}

function loginRewardIndex() {
  if (state.daily.loginLastDay === localDayKey()) return Math.max(0, (state.daily.loginStreak - 1) % loginRewards.length);
  return localDayDistance(state.daily.loginLastDay) === 1 ? state.daily.loginStreak % loginRewards.length : 0;
}

function claimLoginReward() {
  if (state.daily.loginLastDay === localDayKey()) return showToast("本日のログイン補給は受取済みです");
  const consecutive = localDayDistance(state.daily.loginLastDay) === 1;
  state.daily.loginStreak = consecutive ? state.daily.loginStreak + 1 : 1;
  state.daily.loginLastDay = localDayKey();
  const reward = loginRewards[(state.daily.loginStreak - 1) % loginRewards.length];
  applyReward(reward.reward);
  const levels = grantPlayerXp(15);
  saveState();
  updateUI();
  playCraftSound();
  vibrate([20, 30, 60]);
  showToast(`DAY ${((state.daily.loginStreak - 1) % 7) + 1} 補給：${rewardText(reward.reward)}${levels ? ` / PLAYER Lv.${state.player.level}` : ""}`);
}

function claimDailyTask(id) {
  const task = dailyTasks.find(item => item.id === id);
  if (!task || state.daily.claimed.includes(id) || (state.daily.counters[task.activity] || 0) < task.goal) return;
  state.daily.claimed.push(id);
  applyReward(task.reward);
  saveState();
  updateUI();
  playEquipSound();
  vibrate(25);
  showToast(`${task.name}：${rewardText(task.reward)}`);
}

function claimDailyAll() {
  const complete = dailyTasks.every(task => (state.daily.counters[task.activity] || 0) >= task.goal);
  if (!complete || state.daily.allClaimed) return;
  const reward = { crystals: 150, materials: { core: 2 } };
  state.daily.allClaimed = true;
  applyReward(reward);
  const levels = grantPlayerXp(40);
  saveState();
  updateUI();
  playRevealSound("SSR");
  vibrate([25, 35, 80]);
  showToast(`全作戦達成：${rewardText(reward)}${levels ? ` / PLAYER Lv.${state.player.level}` : ""}`);
}

function guildMissionProgress(mission) {
  return Math.min(mission.goal, mission.base + (Number(state.guild.actions[mission.activity]) || 0));
}

function claimGuildMission(id) {
  const mission = guildMissions.find(item => item.id === id);
  if (!mission || state.guild.claimedMissions.includes(id) || guildMissionProgress(mission) < mission.goal) return;
  state.guild.claimedMissions.push(id);
  applyReward(mission.reward);
  saveState();
  updateUI();
  playRevealSound("SSR");
  vibrate([25, 30, 70]);
  showToast(`${mission.name}：${rewardText(mission.reward)}`);
}

function claimGuildReward(id) {
  const tier = guildRewardTiers.find(item => item.id === id);
  if (!tier || state.guild.claimedRewards.includes(id) || state.guild.contribution < tier.points) return;
  state.guild.claimedRewards.push(id);
  applyReward(tier.reward);
  saveState();
  updateUI();
  playEquipSound();
  vibrate(30);
  showToast(`${tier.name}：${rewardText(tier.reward)}`);
}

function cheerGuild() {
  if (state.guild.cheerDay === localDayKey()) return showToast("本日の応援は送信済みです");
  state.guild.cheerDay = localDayKey();
  state.guild.contribution += 20;
  state.guild.totalContribution += 20;
  state.guild.lastActivity = "団員へ共鳴応援を送信 / +20貢献";
  const levels = grantPlayerXp(5);
  saveState();
  updateUI();
  playGatherSound();
  vibrate([15, 25, 45]);
  showToast(`応援を送りました：+20貢献${levels ? ` / PLAYER Lv.${state.player.level}` : ""}`);
}

function getUnitProgress(id, currentState = state) {
  return { ...newProgress(), ...(currentState.progression[id] || {}) };
}

function getUnitEquipment(id, currentState = state) {
  return { ...newEquipment(), ...(currentState.equipment[id] || {}) };
}

function getUnitStats(id, currentState = state) {
  const commander = getCommander(id);
  const progress = getUnitProgress(id, currentState);
  const equipment = getUnitEquipment(id, currentState);
  const levelRate = 1 + (progress.level - 1) * .035;
  let attack = Math.round(commander.attack * levelRate);
  let defense = Math.round(commander.defense * levelRate);
  const passiveRate = .02 + (progress.passiveLevel - 1) * .012;
  if (commander.passive.stat === "attack" || commander.passive.stat === "both") attack += Math.round(commander.attack * passiveRate);
  if (commander.passive.stat === "defense" || commander.passive.stat === "both") defense += Math.round(commander.defense * passiveRate);
  const gear = {
    attack: equipment.weapon * 42 + equipment.accessory * 25,
    defense: equipment.armor * 46 + equipment.accessory * 25
  };
  return { ...commander, ...progress, equipment, gear, attack: attack + gear.attack, defense: defense + gear.defense };
}

function getGearBonus(currentState = state) {
  const members = currentState.team.map(id => getUnitStats(id, currentState)).filter(Boolean);
  return {
    attack: members.reduce((sum, member) => sum + member.gear.attack, 0),
    defense: members.reduce((sum, member) => sum + member.gear.defense, 0)
  };
}

function getTeamCapacity(currentState = state) {
  return currentState.team.map(getCommander).filter(Boolean).reduce((sum, unit) => sum + unit.command, 0);
}

function getSquadStats(currentState = state) {
  const team = getTeam(currentState);
  const members = currentState.team.map(id => getUnitStats(id, currentState)).filter(Boolean);
  const gear = getGearBonus(currentState);
  const attack = members.reduce((sum, unit) => sum + unit.attack, 0);
  const defense = members.reduce((sum, unit) => sum + unit.defense, 0);
  const power = attack + defense + Math.round(currentState.troops * 2.2);
  return { team, members, attack, defense, power, capacity: getTeamCapacity(currentState), gear };
}

function getArenaPlayerStats() {
  const stats = getSquadStats();
  return { ...stats, power: stats.attack + stats.defense + Math.round(stats.capacity * 2.2) };
}

function getArenaOpponentStats(opponent) {
  const members = opponent.team.map(id => getCommander(id)).filter(Boolean).map(commander => {
    const levelRate = 1 + (opponent.level - 1) * .035;
    let attack = Math.round(commander.attack * levelRate);
    let defense = Math.round(commander.defense * levelRate);
    const passiveRate = .02 + (opponent.passiveLevel - 1) * .012;
    if (commander.passive.stat === "attack" || commander.passive.stat === "both") attack += Math.round(commander.attack * passiveRate);
    if (commander.passive.stat === "defense" || commander.passive.stat === "both") defense += Math.round(commander.defense * passiveRate);
    return {
      ...commander,
      level: opponent.level,
      skillLevel: opponent.skillLevel,
      passiveLevel: opponent.passiveLevel,
      attack: attack + opponent.gearLevel * 67,
      defense: defense + opponent.gearLevel * 71
    };
  });
  const attack = members.reduce((sum, member) => sum + member.attack, 0);
  const defense = members.reduce((sum, member) => sum + member.defense, 0);
  const capacity = members.reduce((sum, member) => sum + member.command, 0);
  return { members, attack, defense, capacity, power: attack + defense + Math.round(capacity * 2.2) };
}

function getArenaTier(rating = state.arena.rating) {
  if (rating >= 1500) return { name: "MASTER", label: "マスター", className: "master" };
  if (rating >= 1300) return { name: "PLATINUM", label: "プラチナ", className: "platinum" };
  if (rating >= 1150) return { name: "GOLD", label: "ゴールド", className: "gold" };
  if (rating >= 1000) return { name: "SILVER", label: "シルバー", className: "silver" };
  return { name: "BRONZE", label: "ブロンズ", className: "bronze" };
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function navigateTo(screenName) {
  document.querySelectorAll(".screen").forEach(screen => screen.classList.toggle("active", screen.id === `${screenName}-screen`));
  document.querySelectorAll(".bottom-nav button").forEach(button => button.classList.toggle("active", button.dataset.screen === screenName));
  const screen = document.querySelector(`#${screenName}-screen`);
  document.querySelector("#screen-title").textContent = screen?.dataset.title || "境界共鳴";
  if (screen) screen.scrollTop = 0;
  if (screenName === "units") renderFormation();
  if (screenName === "workshop") renderWorkshop();
  if (screenName === "raid") renderRaid();
  if (screenName === "arena") renderArena();
  if (screenName === "daily") renderDaily();
  if (screenName === "guild") renderGuild();
  playUISound();
}

function updateUI() {
  const dailyReset = ensureDailyReset();
  const guildReset = ensureGuildReset();
  if (dailyReset || guildReset) saveState();
  const stats = getSquadStats();
  state.troops = Math.min(state.troops, stats.capacity);
  document.querySelector("#stamina-value").textContent = `${state.stamina}/60`;
  document.querySelector("#crystal-value").textContent = formatNumber(state.crystals);
  document.querySelector("#coin-value").textContent = formatNumber(state.coins);
  document.querySelector("#pity-remaining").textContent = Math.max(0, 80 - state.pity);
  document.querySelector("#pity-bar").style.width = `${Math.min(100, state.pity / 80 * 100)}%`;
  document.querySelector("#troop-summary").textContent = `${state.troops} / ${stats.capacity}`;
  document.querySelector("#home-power").textContent = formatNumber(stats.power);
  document.querySelector("#squad-power").textContent = formatNumber(stats.power);
  document.querySelector("#player-level").textContent = String(state.player.level).padStart(2, "0");
  document.querySelector("#home-xp-bar").style.width = `${Math.min(100, state.player.xp / playerXpTarget() * 100)}%`;
  document.querySelector("#home-xp-text").textContent = `${formatNumber(state.player.xp)} / ${formatNumber(playerXpTarget())}`;
  const dailyComplete = dailyTasks.filter(task => (state.daily.counters[task.activity] || 0) >= task.goal).length;
  document.querySelector("#home-daily-progress").textContent = `${dailyComplete} / ${dailyTasks.length}`;
  document.querySelector("#home-login-state").textContent = state.daily.loginLastDay === localDayKey() ? "補給受取済" : "補給受取可";
  document.querySelector("#home-guild-contribution").textContent = `${formatNumber(state.guild.contribution)} 貢献`;
  document.querySelector("#sound-toggle").checked = state.settings.sound;
  document.querySelector("#haptic-toggle").checked = state.settings.haptic;
  document.querySelector("#flash-toggle").checked = state.settings.reduceFlash;
  document.querySelector("#instant-toggle").checked = state.settings.instant;
  document.body.classList.toggle("reduced-flash", state.settings.reduceFlash);
  document.querySelector("#mission-team-mini").innerHTML = miniTeamMarkup();
  renderMissions();
  renderRaid();
  renderArena();
  renderDaily();
  renderGuild();
  renderFormation();
  renderWorkshop();
}

function artMarkup(commander, className = "") {
  return commander.art
    ? `<img class="${className}" src="${commander.art}" alt="${commander.name}">`
    : `<span class="${className} slot-symbol" style="background:linear-gradient(145deg,${commander.colors.join(",")})">${commander.symbol}</span>`;
}

function miniTeamMarkup(teamIds = state.team) {
  return teamIds.map(getCommander).filter(Boolean).map(commander => commander.art
    ? `<img src="${commander.art}" alt="${commander.name}">`
    : `<span class="mini-symbol" style="background:linear-gradient(145deg,${commander.colors.join(",")})">${commander.symbol}</span>`).join("");
}

function renderArena() {
  const root = document.querySelector("#arena-screen");
  if (!root) return;
  const arena = state.arena;
  const tier = getArenaTier();
  const playerStats = getArenaPlayerStats();
  document.querySelector("#arena-tier").className = `arena-emblem ${tier.className}`;
  document.querySelector("#arena-tier-code").textContent = tier.name;
  document.querySelector("#arena-tier-label").textContent = `${tier.label}級`;
  document.querySelector("#arena-rating").textContent = formatNumber(arena.rating);
  document.querySelector("#arena-tickets").textContent = `${arena.tickets} / 5`;
  document.querySelector("#arena-record").textContent = `${arena.wins}勝 ${arena.losses}敗`;
  document.querySelector("#arena-streak").textContent = `${arena.streak} 連勝`;
  document.querySelector("#arena-power").textContent = formatNumber(playerStats.power);
  document.querySelector("#arena-party-mini").innerHTML = miniTeamMarkup();
  document.querySelector("#arena-opponent-list").innerHTML = arenaOpponents.map(opponent => {
    const stats = getArenaOpponentStats(opponent);
    const leader = stats.members[0];
    const powerRatio = stats.power / Math.max(1, playerStats.power);
    const match = powerRatio > 1.15 ? "強敵" : powerRatio < .88 ? "優勢" : "互角";
    const art = leader.art
      ? `<img src="${leader.art}" alt="${leader.name}">`
      : `<i style="background:linear-gradient(145deg,${leader.colors.join(",")})">${leader.symbol}</i>`;
    return `<article class="arena-opponent glass-card">
      <div class="arena-opponent-art">${art}<span>Lv.${opponent.level}</span></div>
      <div class="arena-opponent-main"><small>${opponent.guild}</small><h3>${opponent.name}</h3><div class="arena-opponent-meta"><span>RATE <b>${formatNumber(opponent.rating)}</b></span><span>戦力 <b>${formatNumber(stats.power)}</b></span><em class="${match === "強敵" ? "hard" : match === "優勢" ? "easy" : ""}">${match}</em></div><div class="mini-team">${miniTeamMarkup(opponent.team)}</div></div>
      <button type="button" data-arena-opponent="${opponent.id}" ${arena.tickets <= 0 ? "disabled" : ""}><span>AUTO</span><b>挑戦</b></button>
    </article>`;
  }).join("");
  const history = arena.history.slice(0, 5);
  document.querySelector("#arena-history").innerHTML = history.length ? history.map(item => `<div class="arena-history-row ${item.won ? "win" : "loss"}"><b>${item.won ? "WIN" : "LOSE"}</b><span><strong>${item.opponent}</strong><small>${item.date || "模擬戦"}</small></span><em>${item.delta > 0 ? "+" : ""}${item.delta}</em></div>`).join("") : `<div class="arena-empty"><b>NO MATCHES</b><span>最初の対戦相手を選んでください</span></div>`;
}

function renderDaily() {
  const root = document.querySelector("#daily-screen");
  if (!root) return;
  const claimedLogin = state.daily.loginLastDay === localDayKey();
  const rewardIndex = loginRewardIndex();
  const cycleProgress = claimedLogin ? (state.daily.loginStreak - 1) % 7 : Math.max(0, rewardIndex - 1);
  document.querySelector("#daily-player-level").textContent = `Lv.${state.player.level}`;
  document.querySelector("#daily-player-xp").textContent = `${formatNumber(state.player.xp)} / ${formatNumber(playerXpTarget())}`;
  document.querySelector("#daily-player-xp-bar").style.width = `${Math.min(100, state.player.xp / playerXpTarget() * 100)}%`;
  document.querySelector("#daily-login-streak").textContent = `${state.daily.loginStreak}日継続`;
  document.querySelector("#login-calendar").innerHTML = loginRewards.map((item, index) => {
    const active = index === rewardIndex;
    const complete = claimedLogin ? index <= cycleProgress : index < rewardIndex;
    return `<div class="login-day${active ? " active" : ""}${complete ? " complete" : ""}"><small>DAY ${index + 1}</small><b>${item.label}</b><i>${complete ? "✓" : index === 6 ? "BONUS" : ""}</i></div>`;
  }).join("");
  const loginButton = document.querySelector("#daily-login-claim");
  loginButton.disabled = claimedLogin;
  loginButton.innerHTML = claimedLogin ? `<span>本日の補給は受取済み</span><b>✓</b>` : `<span>ログイン補給を受け取る</span><b>${loginRewards[rewardIndex].label}</b>`;
  document.querySelector("#daily-task-list").innerHTML = dailyTasks.map(task => {
    const current = Math.min(task.goal, state.daily.counters[task.activity] || 0);
    const ready = current >= task.goal;
    const claimed = state.daily.claimed.includes(task.id);
    return `<article class="daily-task glass-card${ready ? " ready" : ""}${claimed ? " claimed" : ""}"><i>${task.icon}</i><div><small>${task.code}</small><h3>${task.name}</h3><p>${task.detail}</p><u><s style="width:${current / task.goal * 100}%"></s></u><em>${current} / ${task.goal}</em></div><button type="button" data-daily-claim="${task.id}" ${ready && !claimed ? "" : "disabled"}><span>${claimed ? "受取済" : ready ? "受取" : "進行中"}</span><b>${rewardText(task.reward)}</b></button></article>`;
  }).join("");
  const completeCount = dailyTasks.filter(task => (state.daily.counters[task.activity] || 0) >= task.goal).length;
  document.querySelector("#daily-complete-count").textContent = `${completeCount} / ${dailyTasks.length}`;
  document.querySelector("#daily-complete-bar").style.width = `${completeCount / dailyTasks.length * 100}%`;
  const allButton = document.querySelector("#daily-all-claim");
  allButton.disabled = completeCount < dailyTasks.length || state.daily.allClaimed;
  allButton.innerHTML = state.daily.allClaimed ? `<span>全達成報酬 受取済み</span><b>✓</b>` : `<span>全達成報酬</span><b>◆150　◆核2</b>`;
}

function guildWeekLabel() {
  const [year, month, day] = state.guild.weekKey.split("-").map(Number);
  const end = new Date(year, month - 1, day + 6);
  return `${month}/${day} - ${end.getMonth() + 1}/${end.getDate()}`;
}

function guildAvatarMarkup(id) {
  const commander = getCommander(id) || getCommander("touma");
  return commander.art ? `<img src="${commander.art}" alt="${commander.name}">` : `<i style="background:linear-gradient(145deg,${commander.colors.join(",")})">${commander.symbol}</i>`;
}

function renderGuild() {
  const root = document.querySelector("#guild-screen");
  if (!root) return;
  const maxPoints = guildRewardTiers.at(-1).points;
  document.querySelector("#guild-week-label").textContent = guildWeekLabel();
  document.querySelector("#guild-contribution").textContent = formatNumber(state.guild.contribution);
  document.querySelector("#guild-total-contribution").textContent = formatNumber(state.guild.totalContribution);
  document.querySelector("#guild-contribution-bar").style.width = `${Math.min(100, state.guild.contribution / maxPoints * 100)}%`;
  document.querySelector("#guild-party-mini").innerHTML = miniTeamMarkup();
  const cheer = document.querySelector("#guild-cheer");
  const cheered = state.guild.cheerDay === localDayKey();
  cheer.disabled = cheered;
  cheer.innerHTML = cheered ? `<span>本日の応援済み</span><b>✓</b>` : `<span>団員へ応援を送る</span><b>+20</b>`;
  document.querySelector("#guild-reward-list").innerHTML = guildRewardTiers.map(tier => {
    const current = Math.min(tier.points, state.guild.contribution);
    const claimed = state.guild.claimedRewards.includes(tier.id);
    const ready = current >= tier.points && !claimed;
    return `<article class="guild-reward${ready ? " ready" : ""}${claimed ? " claimed" : ""}"><div><small>${formatNumber(tier.points)} PT</small><b>${tier.name}</b><span>${rewardText(tier.reward)}</span><u><i style="width:${current / tier.points * 100}%"></i></u></div><button type="button" data-guild-reward="${tier.id}" ${ready ? "" : "disabled"}>${claimed ? "受取済" : ready ? "受取" : `${formatNumber(current)}/${formatNumber(tier.points)}`}</button></article>`;
  }).join("");
  document.querySelector("#guild-mission-list").innerHTML = guildMissions.map(mission => {
    const current = guildMissionProgress(mission);
    const claimed = state.guild.claimedMissions.includes(mission.id);
    const ready = current >= mission.goal && !claimed;
    return `<article class="guild-mission glass-card${ready ? " ready" : ""}${claimed ? " claimed" : ""}"><div class="guild-mission-code"><small>${mission.code}</small><b>${mission.activity === "raid" ? "◉" : mission.activity === "arena" ? "冠" : "⌖"}</b></div><div><h3>${mission.name}</h3><p>${mission.detail}</p><u><i style="width:${current / mission.goal * 100}%"></i></u><em>${formatNumber(current)} / ${formatNumber(mission.goal)} ${mission.unit}</em><span>${rewardText(mission.reward)}</span></div><button type="button" data-guild-mission="${mission.id}" ${ready ? "" : "disabled"}>${claimed ? "受取済" : ready ? "受取" : "進行中"}</button></article>`;
  }).join("");
  const player = { name: "境界局長", role: "YOU", power: getArenaPlayerStats().power, contribution: state.guild.contribution, commander: state.team[0], isPlayer: true };
  const ranking = [...guildMembers, player].sort((a, b) => b.contribution - a.contribution);
  document.querySelector("#guild-ranking").innerHTML = ranking.map((member, index) => `<article class="guild-member${member.isPlayer ? " player" : ""}"><strong>${index + 1}</strong><div class="guild-member-avatar">${guildAvatarMarkup(member.commander)}</div><span><small>${member.role}${member.isPlayer ? " / CURRENT" : ""}</small><b>${member.name}</b><em>戦力 ${formatNumber(member.power)}</em></span><div><small>WEEKLY</small><b>${formatNumber(member.contribution)}</b></div></article>`).join("");
  const personalFeed = state.guild.lastActivity || "共同任務へ参加すると、ここに活動が表示されます";
  document.querySelector("#guild-feed").innerHTML = `<div class="guild-feed-row player"><i>NOW</i><span><b>境界局長</b><small>${personalFeed}</small></span></div><div class="guild-feed-row"><i>12分</i><span><b>白鷺ユラ</b><small>ゴライアスの境界核を破壊 / +60貢献</small></span></div><div class="guild-feed-row"><i>28分</i><span><b>雨森カイ</b><small>共同制圧任務へ参加 / +25貢献</small></span></div>`;
}

function renderMissions() {
  document.querySelector("#mission-list").innerHTML = missions.map((mission, index) => {
    const dropNames = Object.keys(mission.drops).map(key => materials[key].name).join("・");
    return `<article class="mission-card vivid-card has-image">
      <div class="mission-thumb"><img src="${mission.art}" alt="${mission.enemy}"><b>${mission.stage}</b></div>
      <div class="mission-body"><div class="mission-main"><span>${mission.zone}</span><h3>${mission.title}</h3><p>${mission.description}</p><div class="mission-drops"><i>推奨 ${mission.recommended}</i><i>ϟ ${mission.stamina}</i><i>${dropNames}</i></div></div><button type="button" class="sortie-button" data-mission="${index}">出撃</button></div>
    </article>`;
  }).join("");
}

function raidRewardSummary(tier) {
  const materialText = Object.entries(tier.materials).map(([key, amount]) => `${materials[key].icon}${amount}`).join(" ");
  return `◆${tier.crystals}　●${formatNumber(tier.coins)}　${materialText}`;
}

function renderRaid() {
  const raid = state.raid;
  const hpRate = Math.max(0, raid.bossHp / raidBoss.maxHp * 100);
  document.querySelector("#raid-boss-hp").textContent = `${formatNumber(raid.bossHp)} / ${formatNumber(raidBoss.maxHp)}`;
  document.querySelector("#raid-boss-bar").style.width = `${hpRate}%`;
  document.querySelector("#raid-attempts").textContent = `${raid.attempts} / 3`;
  document.querySelector("#raid-participants").textContent = formatNumber(12480 + raid.runs * 17);
  document.querySelector("#raid-personal-damage").textContent = formatNumber(raid.personalDamage);
  document.querySelector("#raid-last-damage").textContent = raid.lastDamage ? `前回 +${formatNumber(raid.lastDamage)}` : "未参加";
  document.querySelector("#raid-run-count").textContent = `${raid.runs} 回`;
  document.querySelector("#raid-party-mini").innerHTML = miniTeamMarkup();
  document.querySelector("#raid-part-list").innerHTML = Object.entries(raidBoss.parts).map(([id, part]) => {
    const status = raid.parts[id];
    const active = raid.target === id && !status.broken;
    const rate = Math.max(0, status.hp / part.maxHp * 100);
    return `<button type="button" class="raid-part${active ? " active" : ""}${status.broken ? " broken" : ""}" data-raid-target="${id}" ${status.broken ? "disabled" : ""}><i>${part.icon}</i><span><small>${status.broken ? "BREAK" : active ? "AUTO TARGET" : "TARGET"}</small><b>${part.name}</b><em>${part.effect}</em><u><s style="width:${rate}%"></s></u></span><strong>${status.broken ? "破壊済" : `${formatNumber(status.hp)} / ${formatNumber(part.maxHp)}`}</strong></button>`;
  }).join("");
  document.querySelector("#raid-reward-list").innerHTML = raidRewardTiers.map(tier => {
    const claimed = raid.claimedRewards.includes(tier.id);
    const ready = raid.personalDamage >= tier.damage && !claimed;
    return `<article class="raid-reward${ready ? " ready" : ""}"><div><small>TOTAL ${formatNumber(tier.damage)}</small><b>${tier.name}</b><span>${raidRewardSummary(tier)}</span></div><button type="button" data-raid-reward="${tier.id}" ${ready ? "" : "disabled"}>${claimed ? "受取済" : ready ? "受取" : "未達成"}</button></article>`;
  }).join("");
  const start = document.querySelector("#raid-start");
  const disabled = raid.attempts <= 0 || raid.bossHp <= 0 || state.troops <= 0;
  start.disabled = disabled;
  start.innerHTML = raid.bossHp <= 0 ? `<span>鎮圧完了</span><b>✓</b>` : raid.attempts <= 0 ? `<span>本日の挑戦終了</span><b>0 / 3</b>` : `<span>5人オートで出撃</span><b>参加証 ${raid.attempts}</b>`;
}

function selectRaidTarget(id) {
  if (!raidBoss.parts[id] || state.raid.parts[id].broken) return;
  state.raid.target = id;
  saveState();
  renderRaid();
  playUISound();
  showToast(`${raidBoss.parts[id].name}を優先攻撃します`);
}

function claimRaidReward(id) {
  const tier = raidRewardTiers.find(item => item.id === id);
  if (!tier || state.raid.personalDamage < tier.damage || state.raid.claimedRewards.includes(id)) return;
  state.raid.claimedRewards.push(id);
  state.crystals += tier.crystals;
  state.coins += tier.coins;
  Object.entries(tier.materials).forEach(([key, amount]) => state.materials[key] += amount);
  saveState();
  updateUI();
  playCraftSound();
  vibrate([20, 35, 65]);
  showToast(`${tier.name}を受け取りました`);
}

function renderFormation() {
  const stats = getSquadStats();
  document.querySelector("#unit-count").textContent = `${Object.keys(state.owned).length} / ${commanders.length}`;
  document.querySelector("#formation-power").textContent = formatNumber(stats.power);
  document.querySelector("#team-slots").innerHTML = state.team.map((id, index) => {
    const commander = getCommander(id);
    return `<button class="team-slot${index === activeSlot ? " active" : ""}" type="button" data-slot="${index}" aria-label="編成枠${index + 1} ${commander.name}">${artMarkup(commander)}<span class="slot-number">${index + 1}</span><strong>${commander.name}</strong></button>`;
  }).join("");
  const owned = Object.keys(state.owned).map(getCommander).filter(Boolean).sort((a, b) => rarityRank[b.rarity] - rarityRank[a.rarity] || b.attack - a.attack);
  document.querySelector("#unit-list").innerHTML = owned.map(commander => {
    const inTeam = state.team.includes(commander.id);
    const unit = getUnitStats(commander.id);
    const art = commander.art ? `<img src="${commander.art}" alt="">` : `<span>${commander.symbol}</span>`;
    return `<button class="unit-card glass-card${inTeam ? " in-team" : ""}" type="button" data-unit="${commander.id}"><div class="unit-art" style="background:linear-gradient(145deg,${commander.colors.join(",")})">${art}<b>Lv.${unit.level}</b></div><div class="unit-copy"><span><i class="rarity ${commander.rarity.toLowerCase()}">${commander.rarity}</i>${inTeam ? `<em class="formation-tag">編成中 ${state.team.indexOf(commander.id) + 1}</em>` : ""}</span><strong>${commander.title} ${commander.name}</strong><small>${commander.role} / 記憶片 ${state.owned[commander.id]?.shards || 0}</small><div class="unit-abilities"><i>S${unit.skillLevel} ${commander.skill.name}</i><i>P${unit.passiveLevel} ${commander.passive.name}</i><i>装 ${unit.equipment.weapon}/${unit.equipment.armor}/${unit.equipment.accessory}</i></div></div><div class="unit-stats"><small>攻撃</small><b>${unit.attack}</b><small>防御</small><b>${unit.defense}</b></div></button>`;
  }).join("");
}

function selectTeamSlot(index) {
  activeSlot = index;
  renderFormation();
  showToast(`編成枠${index + 1}を選択中`);
}

function assignCommander(id) {
  const existingIndex = state.team.indexOf(id);
  if (existingIndex === activeSlot) return showToast(`${getCommander(id).name}はこの枠に編成済みです`);
  const currentId = state.team[activeSlot];
  if (existingIndex >= 0) state.team[existingIndex] = currentId;
  state.team[activeSlot] = id;
  activeSlot = (activeSlot + 1) % 5;
  state.troops = Math.min(state.troops, getTeamCapacity());
  saveState();
  updateUI();
  playEquipSound();
  vibrate(20);
  showToast(`${getCommander(id).name}を編成しました`);
}

function getUpgradeCost(kind, progress) {
  if (kind === "level") return { materials: { ore: 2 + Math.floor(progress.level / 5), fiber: 1 + Math.floor(progress.level / 8) }, coins: 200 + progress.level * 70, max: 50 };
  if (kind === "skill") return { materials: { core: 1 + Math.floor(progress.skillLevel / 3), ore: 2 + Math.floor(progress.skillLevel / 4) }, coins: 350 + progress.skillLevel * 150, max: 10 };
  return { materials: { core: 1 + Math.floor(progress.passiveLevel / 3), hide: 2 + Math.floor(progress.passiveLevel / 4) }, coins: 400 + progress.passiveLevel * 160, max: 10 };
}

function canPay(cost) {
  return state.coins >= cost.coins && Object.entries(cost.materials).every(([key, amount]) => state.materials[key] >= amount);
}

function costMarkup(cost) {
  return `${Object.entries(cost.materials).map(([key, amount]) => `<i class="${state.materials[key] >= amount ? "ready" : ""}">${materials[key].icon} ${state.materials[key]}/${amount}</i>`).join("")}<i class="${state.coins >= cost.coins ? "ready" : ""}">● ${formatNumber(cost.coins)}</i>`;
}

function renderGrowthRow(kind, eyebrow, title, detail, current, cost) {
  const maxed = current >= cost.max;
  return `<article class="growth-row"><div class="growth-level"><small>${eyebrow}</small><b>Lv.${current}</b><i>/ ${cost.max}</i></div><div class="growth-copy"><h3>${title}</h3><p>${detail}</p><div class="recipe-cost">${costMarkup(cost)}</div></div><button type="button" data-upgrade="${kind}" ${!maxed && canPay(cost) ? "" : "disabled"}>${maxed ? "MAX" : "強化"}</button></article>`;
}

function renderWorkshop() {
  if (!state.owned[workshopUnitId]) workshopUnitId = state.team[0] || Object.keys(state.owned)[0];
  const commander = getCommander(workshopUnitId);
  const progress = getUnitProgress(workshopUnitId);
  const equipment = getUnitEquipment(workshopUnitId);
  document.querySelector("#workshop-unit-label").textContent = commander.name;
  document.querySelector("#material-wallet").innerHTML = Object.entries(materials).map(([key, material]) => `<div class="material-item" style="--material:${material.color}"><i>${material.icon}</i><span><small>${material.name}</small></span><b>${state.materials[key]}</b></div>`).join("");
  document.querySelector("#workshop-unit-tabs").innerHTML = Object.keys(state.owned).map(getCommander).filter(Boolean).sort((a, b) => rarityRank[b.rarity] - rarityRank[a.rarity]).map(unit => `<button type="button" class="workshop-unit-chip${unit.id === workshopUnitId ? " active" : ""}" data-workshop-unit="${unit.id}">${unit.art ? `<img src="${unit.art}" alt="">` : `<i style="background:linear-gradient(145deg,${unit.colors.join(",")})">${unit.symbol}</i>`}<span><b>${unit.name}</b><small>Lv.${getUnitProgress(unit.id).level}</small></span></button>`).join("");
  document.querySelector("#training-panel").innerHTML = `<div class="training-hero"><div class="training-portrait" style="background:linear-gradient(145deg,${commander.colors.join(",")})">${commander.art ? `<img src="${commander.art}" alt="${commander.name}">` : `<i>${commander.symbol}</i>`}</div><div><span class="rarity ${commander.rarity.toLowerCase()}">${commander.rarity}</span><h3>${commander.title}<br>${commander.name}</h3><p>${commander.role} / 個別育成</p></div><b>戦力 ${formatNumber(getUnitStats(commander.id).attack + getUnitStats(commander.id).defense)}</b></div>${renderGrowthRow("level", "CHARACTER", "キャラクターLv", "基礎攻撃・防御を上昇", progress.level, getUpgradeCost("level", progress))}${renderGrowthRow("skill", "ACTIVE SKILL", commander.skill.name, commander.skill.detail, progress.skillLevel, getUpgradeCost("skill", progress))}${renderGrowthRow("passive", "PASSIVE SKILL", commander.passive.name, commander.passive.detail, progress.passiveLevel, getUpgradeCost("passive", progress))}`;
  document.querySelector("#expedition-list").innerHTML = expeditions.map((expedition, index) => `<article class="expedition-card" style="--expedition-bg:${expedition.background}"><small>${expedition.code}</small><h3>${expedition.name}</h3><p>${expedition.detail}</p><div class="drop-chips">${Object.keys(expedition.drops).map(key => `<i>${materials[key].icon} ${materials[key].name}</i>`).join("")}</div><button type="button" data-expedition="${index}" ${state.stamina < 3 ? "disabled" : ""}>探索 ϟ3</button></article>`).join("");
  document.querySelector("#recipe-list").innerHTML = recipes.map(recipe => {
    const level = equipment[recipe.slot];
    const maxed = level >= recipe.max;
    const materialReady = Object.entries(recipe.costs).every(([key, amount]) => state.materials[key] >= amount);
    const ready = !maxed && materialReady && state.coins >= recipe.coins;
    const costs = Object.entries(recipe.costs).map(([key, amount]) => `<i class="${state.materials[key] >= amount ? "ready" : ""}">${materials[key].icon} ${state.materials[key]}/${amount}</i>`).join("");
    return `<article class="recipe-card"><div class="recipe-icon">${recipe.icon}</div><div class="recipe-copy"><small>${recipe.type.toUpperCase()}</small><h3>${recipe.name} <b>Lv.${level}</b></h3><p>${recipe.effect}</p><div class="recipe-cost">${costs}<i class="${state.coins >= recipe.coins ? "ready" : ""}">● ${formatNumber(recipe.coins)}</i></div></div><button type="button" data-recipe="${recipe.id}" ${ready ? "" : "disabled"}>${maxed ? "MAX" : "生成"}</button></article>`;
  }).join("");
}

function runExpedition(index) {
  const expedition = expeditions[index];
  if (!expedition || state.stamina < 3) return showToast("スタミナが不足しています");
  state.stamina -= 3;
  const rewards = [];
  Object.entries(expedition.drops).forEach(([key, range]) => {
    const amount = randomInt(range[0], range[1]);
    if (amount > 0) {
      state.materials[key] += amount;
      rewards.push(`${materials[key].name}×${amount}`);
    }
  });
  state.expeditions += 1;
  const levels = recordDailyActivity("expedition", 12);
  recordGuildActivity("expedition");
  saveState();
  updateUI();
  playGatherSound();
  vibrate([15, 25, 25]);
  showToast(`${expedition.name}: ${rewards.join(" / ")}${levels ? ` / PLAYER Lv.${state.player.level}` : ""}`);
}

function craftGear(id) {
  const recipe = recipes.find(item => item.id === id);
  const equipment = getUnitEquipment(workshopUnitId);
  if (!recipe || equipment[recipe.slot] >= recipe.max) return;
  const canCraft = Object.entries(recipe.costs).every(([key, amount]) => state.materials[key] >= amount) && state.coins >= recipe.coins;
  if (!canCraft) return showToast("生成素材が不足しています");
  Object.entries(recipe.costs).forEach(([key, amount]) => state.materials[key] -= amount);
  state.coins -= recipe.coins;
  state.equipment[workshopUnitId] ||= newEquipment();
  state.equipment[workshopUnitId][recipe.slot] += 1;
  const levels = grantPlayerXp(10);
  recordGuildActivity("craft");
  saveState();
  updateUI();
  playCraftSound();
  vibrate([25, 30, 65]);
  showToast(`${getCommander(workshopUnitId).name}：${recipe.name} Lv.${state.equipment[workshopUnitId][recipe.slot]}${levels ? ` / PLAYER Lv.${state.player.level}` : ""}`);
}

function selectWorkshopUnit(id) {
  if (!state.owned[id]) return;
  workshopUnitId = id;
  renderWorkshop();
  playUISound();
}

function upgradeUnit(kind) {
  const progress = getUnitProgress(workshopUnitId);
  const cost = getUpgradeCost(kind, progress);
  const key = kind === "level" ? "level" : `${kind}Level`;
  if (progress[key] >= cost.max) return;
  if (!canPay(cost)) return showToast("強化素材が不足しています");
  Object.entries(cost.materials).forEach(([material, amount]) => state.materials[material] -= amount);
  state.coins -= cost.coins;
  state.progression[workshopUnitId] ||= newProgress();
  state.progression[workshopUnitId][key] += 1;
  const levels = grantPlayerXp(10);
  recordGuildActivity("upgrade");
  saveState();
  updateUI();
  playCraftSound();
  vibrate([20, 25, 45]);
  const label = kind === "level" ? "キャラクターLv" : kind === "skill" ? getCommander(workshopUnitId).skill.name : getCommander(workshopUnitId).passive.name;
  showToast(`${getCommander(workshopUnitId).name}：${label} Lv.${state.progression[workshopUnitId][key]}${levels ? ` / PLAYER Lv.${state.player.level}` : ""}`);
}

function poolFor(rarity) { return commanders.filter(item => item.rarity === rarity); }
function rollRarity() {
  if (state.pity >= 79) return "UR";
  const softBonus = state.pity >= 60 ? (state.pity - 59) * .05 : 0;
  const urChance = Math.min(.95, .005 + softBonus);
  const roll = Math.random();
  if (roll < urChance) return "UR";
  const normalized = (roll - urChance) / (1 - urChance);
  if (normalized < .7538) return "R";
  if (normalized < .9548) return "SR";
  return "SSR";
}

function makeDraw(count) {
  const results = [];
  const guaranteeDemoUR = count === 10 && state.demoFirstTen;
  for (let index = 0; index < count; index += 1) {
    const rarity = guaranteeDemoUR && index === count - 1 ? "UR" : rollRarity();
    state.pity = rarity === "UR" ? 0 : state.pity + 1;
    results.push({ commander: randomFrom(poolFor(rarity)) });
  }
  if (count === 10 && !results.some(result => rarityRank[result.commander.rarity] >= rarityRank.SR)) results[9] = { commander: randomFrom(poolFor("SR")) };
  if (guaranteeDemoUR) state.demoFirstTen = false;
  const alreadySeen = new Set(Object.keys(state.owned));
  results.forEach(result => {
    const id = result.commander.id;
    result.isNew = !alreadySeen.has(id);
    result.shards = 0;
    if (result.isNew) {
      state.owned[id] = { shards: 0 };
      state.progression[id] = newProgress();
      state.equipment[id] = newEquipment();
      alreadySeen.add(id);
    } else {
      result.shards = { R: 5, SR: 10, SSR: 30, UR: 80 }[result.commander.rarity];
      state.owned[id] ||= { shards: 0 };
      state.owned[id].shards += result.shards;
    }
  });
  return results;
}

function performDraw(count) {
  const cost = count === 10 ? 1500 : 150;
  if (state.crystals < cost) return showToast("共鳴石が不足しています");
  document.querySelectorAll("#draw-ten,#draw-one").forEach(button => button.disabled = true);
  const pityBefore = state.pity;
  state.crystals -= cost;
  const results = makeDraw(count);
  saveState();
  updateUI();
  startSummon(results, pityBefore);
  setTimeout(() => document.querySelectorAll("#draw-ten,#draw-one").forEach(button => button.disabled = false), 650);
}

function highestResult(results) { return [...results].sort((a, b) => rarityRank[b.commander.rarity] - rarityRank[a.commander.rarity])[0]; }
function clearSummonTimers() { summonTimers.forEach(clearTimeout); summonTimers = []; }
function showSummonStage(stageId) {
  ["summon-charge", "summon-break", "summon-hero", "summon-results"].forEach(id => document.querySelector(`#${id}`).classList.toggle("hidden", id !== stageId));
  document.querySelector("#summon-skip").classList.toggle("hidden", stageId === "summon-results");
}

function startSummon(results, pityBefore) {
  activeSummonResults = results;
  activeSummonPityBefore = pityBefore;
  const overlay = document.querySelector("#summon-overlay");
  overlay.classList.add("active");
  overlay.setAttribute("aria-hidden", "false");
  document.body.classList.remove("flash");
  showSummonStage("summon-charge");
  startParticles(highestResult(results).commander.colors);
  playIgnitionSound();
  vibrate([20, 35, 35, 45, 55]);
  if (state.settings.instant) {
    summonTimers.push(setTimeout(() => showSummonResults(pityBefore), 120));
    return;
  }
  summonTimers.push(setTimeout(() => {
    showSummonStage("summon-break");
    if (!state.settings.reduceFlash) document.body.classList.add("flash");
    const rarity = highestResult(results).commander.rarity;
    playRevealSound(rarity);
    vibrate(rarity === "UR" ? [70, 45, 120] : [50]);
  }, 1350));
  summonTimers.push(setTimeout(() => showHeroResult(results), 2050));
}

function showHeroResult(results) {
  const result = highestResult(results);
  const commander = result.commander;
  showSummonStage("summon-hero");
  document.querySelector("#hero-result-image").src = commander.art || symbolArtData(commander);
  document.querySelector("#hero-result-image").alt = `${commander.rarity}指揮官 ${commander.name}`;
  const rarity = document.querySelector("#hero-rarity");
  rarity.className = `rarity ${commander.rarity.toLowerCase()}`;
  rarity.textContent = commander.rarity;
  document.querySelector("#hero-new").classList.toggle("hidden", !result.isNew);
  document.querySelector("#hero-name").textContent = `${commander.title} ${commander.name}`;
  document.querySelector("#hero-tactic").textContent = commander.skill.name;
}

function showSummonResults(pityBefore = activeSummonPityBefore) {
  clearSummonTimers();
  showSummonStage("summon-results");
  document.querySelector("#result-grid").innerHTML = activeSummonResults.map(resultCardMarkup).join("");
  document.querySelector("#result-pity").textContent = `天井 ${pityBefore} → ${state.pity}`;
  stopParticles();
}

function resultCardMarkup(result) {
  const commander = result.commander;
  const art = commander.art ? `<img src="${commander.art}" alt="">` : `<span>${commander.symbol}</span>`;
  return `<article class="result-card" style="--rarity-color:${commander.colors[0]};--result-gradient:linear-gradient(145deg,${commander.colors.join(",")})"><div class="result-art">${art}</div><span class="rarity ${commander.rarity.toLowerCase()}">${commander.rarity}</span><div class="result-info"><strong>${commander.name}</strong><small>${result.isNew ? "NEW" : `記憶片 +${result.shards}`}</small></div></article>`;
}

function closeSummon() {
  clearSummonTimers();
  stopParticles();
  const overlay = document.querySelector("#summon-overlay");
  overlay.classList.remove("active");
  overlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("flash");
  updateUI();
}

function symbolArtData(commander) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="${commander.colors[0]}"/><stop offset="1" stop-color="${commander.colors.at(-1)}"/></linearGradient></defs><rect width="600" height="900" fill="#0b0615"/><circle cx="300" cy="380" r="250" fill="url(#g)" opacity=".42"/><path d="M300 80L530 300 470 710 300 830 130 710 70 300Z" fill="none" stroke="url(#g)" stroke-width="15"/><text x="300" y="500" fill="white" font-size="210" font-family="sans-serif" font-weight="900" text-anchor="middle">${commander.symbol}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function openBattleReport(report, title, enemyName, art) {
  const overlay = document.querySelector("#battle-overlay");
  overlay.classList.add("active");
  overlay.setAttribute("aria-hidden", "false");
  document.querySelector("#battle-title").textContent = title;
  document.querySelector("#enemy-name").textContent = enemyName;
  document.querySelector("#battle-enemy-image").src = art;
  document.querySelector("#battle-enemy-image").alt = enemyName;
  document.querySelector("#battle-team-mini").innerHTML = getSquadStats().members.map(member => `<span>${member.art ? `<img src="${member.art}" alt="">` : `<i style="background:linear-gradient(145deg,${member.colors.join(",")})">${member.symbol}</i>`}<b>${member.name}<small> S${member.skillLevel}</small></b></span>`).join("");
  document.querySelector("#ally-bar-label").textContent = report.mode === "arena" ? "自軍耐久" : report.mode === "raid" ? "部隊兵力" : "味方兵力";
  document.querySelector("#enemy-bar-label").textContent = report.mode === "arena" ? "相手耐久" : report.mode === "raid" ? "BOSS HP" : "敵兵力";
  document.querySelector("#battle-log").innerHTML = "";
  document.querySelector("#battle-result").classList.add("hidden");
  document.querySelector("#replenish-button").classList.toggle("hidden", report.mode === "arena");
  document.querySelector("#battle-skip").classList.remove("hidden");
  updateBattleBars(report.allyStart, report.allyStart, report.enemyStart, report.enemyStart, report.mode);
  battleRun = { report, index: 0, timer: null };
  appendNextBattleLog();
}

function startBattle(missionIndex) {
  const mission = missions[missionIndex];
  if (state.stamina < mission.stamina) return showToast("スタミナが不足しています");
  if (state.troops <= 0) return showToast("兵を補充してから出撃してください");
  const report = simulateBattle(mission);
  state.stamina -= mission.stamina;
  state.troops = report.allyRemaining;
  state.coins += report.reward;
  if (report.won) Object.entries(mission.drops).forEach(([key, amount]) => state.materials[key] += amount);
  report.levelsGained = recordDailyActivity(report.won ? "mission" : "", report.won ? 25 : 8);
  if (report.won) recordGuildActivity("mission");
  report.playerLevel = state.player.level;
  saveState();
  updateUI();
  openBattleReport(report, mission.title, mission.enemy, mission.art);
}

function simulateBattle(mission) {
  const stats = getSquadStats();
  let ally = state.troops;
  let enemy = mission.enemyTroops;
  const allyStart = ally;
  const enemyStart = enemy;
  const logs = [{ round: 0, actor: "PASSIVE", text: stats.members.map(member => `${member.name}「${member.passive.name}」Lv.${member.passiveLevel}`).join(" / "), critical: false, ally, enemy }];
  let round = 0;
  while (round < 12 && ally > 0 && enemy > 0) {
    round += 1;
    const commander = stats.members[(round - 1) % stats.members.length];
    const roleBonus = commander.role === "攻撃" || commander.role === "遊撃" ? 1.14 : 1;
    const skillBonus = 1 + (commander.skillLevel - 1) * .06;
    const critical = Math.random() < (.12 + rarityRank[commander.rarity] * .025);
    const raw = Math.max(30, (stats.attack + ally * 2.4 - mission.enemyDefense * .48) * .18 * roleBonus * skillBonus);
    const damage = Math.floor(raw * (.92 + Math.random() * .16) * (critical ? 1.55 : 1));
    const enemyLoss = Math.min(enemy, Math.max(2, Math.floor(damage / 10)));
    enemy -= enemyLoss;
    logs.push({ round, actor: commander.name, text: `${commander.skill.name} Lv.${commander.skillLevel}。${mission.enemy}へ${damage}ダメージ、敵兵力-${enemyLoss}。${critical ? "会心共鳴！" : ""}`, critical, ally, enemy });
    if (enemy <= 0) break;
    const mitigation = stats.defense * .28;
    const counter = Math.max(18, Math.floor((mission.enemyAttack + enemy * 1.7 - mitigation) * (.9 + Math.random() * .18) * .14));
    const allyLoss = Math.min(ally, Math.max(1, Math.floor(counter / 9)));
    ally -= allyLoss;
    logs.push({ round, actor: mission.enemy, text: `反撃${counter}ダメージ。味方兵力-${allyLoss}。`, critical: false, ally, enemy });
  }
  const won = enemy <= 0 || (ally / allyStart > enemy / enemyStart);
  logs.push({ round, actor: "SYSTEM", text: won ? "敵信号の停止を確認。任務完了。" : "味方部隊が撤退。再編成が必要です。", critical: false, ally, enemy });
  return { mode: "mission", mission, logs, won, rounds: round, allyStart, enemyStart, allyRemaining: Math.max(0, ally), enemyRemaining: Math.max(0, enemy), casualties: allyStart - Math.max(0, ally), reward: won ? mission.reward : 120 };
}

function simulateRaid() {
  const stats = getSquadStats();
  let ally = state.troops;
  let enemy = state.raid.bossHp;
  const allyStart = ally;
  const enemyStart = enemy;
  const parts = Object.fromEntries(Object.entries(state.raid.parts).map(([id, value]) => [id, { ...value }]));
  let targetId = parts[state.raid.target] && !parts[state.raid.target].broken ? state.raid.target : Object.keys(parts).find(id => !parts[id].broken);
  const newBreaks = [];
  const logs = [{ round: 0, actor: "PASSIVE", text: `${stats.members.map(member => `${member.name}「${member.passive.name}」Lv.${member.passiveLevel}`).join(" / ")}。優先部位：${targetId ? raidBoss.parts[targetId].name : "本体"}`, critical: false, ally, enemy }];
  const supportRate = Math.min(.28, stats.members.filter(member => member.role === "支援" || member.role === "防御").reduce((sum, member) => sum + .025 + member.passiveLevel * .006, 0));
  let totalDamage = 0;
  let round = 0;
  while (round < 10 && ally > 0 && enemy > 0) {
    round += 1;
    const commander = stats.members[(round - 1) % stats.members.length];
    const roleBonus = commander.role === "攻撃" || commander.role === "遊撃" ? 1.16 : commander.role === "万能" ? 1.1 : 1;
    const skillBonus = 1 + (commander.skillLevel - 1) * .06;
    const coreBonus = parts.core.broken ? 1.18 : 1;
    const critical = Math.random() < (.14 + rarityRank[commander.rarity] * .025);
    const raw = Math.max(95, (stats.attack * 1.32 + ally * 3.1 - raidBoss.defense * .24) * .24 * roleBonus * skillBonus * coreBonus);
    const damage = Math.min(enemy, Math.floor(raw * (.92 + Math.random() * .18) * (critical ? 1.55 : 1)));
    enemy -= damage;
    totalDamage += damage;
    const targetName = targetId ? raidBoss.parts[targetId].name : "本体";
    logs.push({ round, actor: commander.name, text: `${commander.skill.name} Lv.${commander.skillLevel}。${targetName}へ${formatNumber(damage)}ダメージ。${critical ? "会心共鳴！" : ""}`, critical, ally, enemy });
    if (targetId && !parts[targetId].broken) {
      const partDamage = Math.min(parts[targetId].hp, Math.max(1, Math.floor(damage * .72)));
      parts[targetId].hp -= partDamage;
      if (parts[targetId].hp <= 0) {
        parts[targetId].hp = 0;
        parts[targetId].broken = true;
        newBreaks.push(targetId);
        logs.push({ round, actor: "BREAK", text: `${raidBoss.parts[targetId].name}を破壊。${raidBoss.parts[targetId].effect}`, critical: true, ally, enemy });
        targetId = Object.keys(parts).find(id => !parts[id].broken);
      }
    }
    if (enemy <= 0) break;
    const maskRate = parts.mask.broken ? .85 : 1;
    const counter = Math.max(24, Math.floor((raidBoss.attack * maskRate - stats.defense * .34) * (.9 + Math.random() * .2) * .15 * (1 - supportRate)));
    const allyLoss = Math.min(ally, Math.max(1, Math.floor(counter / 11)));
    ally -= allyLoss;
    logs.push({ round, actor: raidBoss.name, text: `重力衝${formatNumber(counter)}ダメージ。味方兵力-${allyLoss}。`, critical: false, ally, enemy });
  }
  const won = enemy <= 0;
  logs.push({ round, actor: "SYSTEM", text: won ? "全体HPの消失を確認。ゴライアス鎮圧完了。" : `共鳴限界へ到達。累積${formatNumber(totalDamage)}ダメージを同期。`, critical: false, ally, enemy });
  const reward = 400 + Math.floor(totalDamage * .38);
  return { mode: "raid", logs, won, rounds: round, allyStart, enemyStart, allyRemaining: Math.max(0, ally), enemyRemaining: Math.max(0, enemy), casualties: allyStart - Math.max(0, ally), damage: totalDamage, reward, parts, newBreaks };
}

function startRaidBattle() {
  if (state.raid.attempts <= 0) return showToast("本日の挑戦回数を使い切りました");
  if (state.raid.bossHp <= 0) return showToast("ゴライアスは鎮圧済みです");
  if (state.troops <= 0) return showToast("兵を補充してから出撃してください");
  const report = simulateRaid();
  state.raid.attempts -= 1;
  state.raid.bossHp = report.enemyRemaining;
  state.raid.personalDamage += report.damage;
  state.raid.lastDamage = report.damage;
  state.raid.runs += 1;
  state.raid.parts = report.parts;
  state.raid.target = Object.keys(report.parts).find(id => !report.parts[id].broken) || state.raid.target;
  state.troops = report.allyRemaining;
  state.coins += report.reward;
  report.newBreaks.forEach(id => Object.entries(raidBoss.parts[id].reward).forEach(([key, amount]) => state.materials[key] += amount));
  report.levelsGained = recordDailyActivity("raid", 35);
  recordGuildActivity("raid", report.damage);
  report.playerLevel = state.player.level;
  saveState();
  updateUI();
  openBattleReport(report, "共鳴限界戦", raidBoss.name, raidBoss.art);
  playRevealSound("SSR");
  vibrate([30, 35, 60]);
}

function arenaRatingDelta(won, opponentRating) {
  const gap = opponentRating - state.arena.rating;
  if (won) return Math.max(12, Math.min(30, 18 + Math.round(gap / 60)));
  return -Math.max(7, Math.min(20, 14 - Math.round(gap / 90)));
}

function simulateArena(opponent) {
  const player = getArenaPlayerStats();
  const rival = getArenaOpponentStats(opponent);
  let ally = player.capacity;
  let enemy = rival.capacity;
  const allyStart = ally;
  const enemyStart = enemy;
  const logs = [{ round: 0, actor: "PASSIVE", text: `両隊の常時効果を同期。${player.members.map(member => `${member.name}「${member.passive.name}」Lv.${member.passiveLevel}`).join(" / ")}`, critical: false, ally, enemy }];
  let round = 0;
  while (round < 12 && ally > 0 && enemy > 0) {
    round += 1;
    const commander = player.members[(round - 1) % player.members.length];
    const roleBonus = commander.role === "攻撃" || commander.role === "遊撃" ? 1.14 : commander.role === "万能" ? 1.1 : 1;
    const skillBonus = 1 + (commander.skillLevel - 1) * .06;
    const critical = Math.random() < (.11 + rarityRank[commander.rarity] * .025);
    const raw = Math.max(24, (player.attack + ally * 2.2 - rival.defense * .42) * .18 * roleBonus * skillBonus);
    const damage = Math.max(2, Math.floor(raw * (.92 + Math.random() * .16) * (critical ? 1.5 : 1) / 9));
    enemy -= Math.min(enemy, damage);
    logs.push({ round, actor: commander.name, text: `${commander.skill.name} Lv.${commander.skillLevel}。相手陣形の耐久-${damage}。${critical ? "会心共鳴！" : ""}`, critical, ally, enemy });
    if (enemy <= 0) break;
    const rivalCommander = rival.members[(round - 1) % rival.members.length];
    const rivalRoleBonus = rivalCommander.role === "攻撃" || rivalCommander.role === "遊撃" ? 1.14 : rivalCommander.role === "万能" ? 1.1 : 1;
    const rivalSkillBonus = 1 + (rivalCommander.skillLevel - 1) * .06;
    const rivalCritical = Math.random() < (.1 + rarityRank[rivalCommander.rarity] * .022);
    const counterRaw = Math.max(24, (rival.attack + enemy * 2.2 - player.defense * .42) * .18 * rivalRoleBonus * rivalSkillBonus);
    const counter = Math.max(2, Math.floor(counterRaw * (.92 + Math.random() * .16) * (rivalCritical ? 1.5 : 1) / 9));
    ally -= Math.min(ally, counter);
    logs.push({ round, actor: rivalCommander.name, text: `${rivalCommander.skill.name} Lv.${rivalCommander.skillLevel}。自軍陣形の耐久-${counter}。${rivalCritical ? "会心共鳴！" : ""}`, critical: rivalCritical, ally, enemy });
  }
  const won = enemy <= 0 || (ally > 0 && ally / allyStart >= enemy / enemyStart);
  const ratingDelta = arenaRatingDelta(won, opponent.rating);
  const reward = won ? 900 : 250;
  logs.push({ round, actor: "SYSTEM", text: won ? `${opponent.name}の防衛データを突破。レート上昇を確認。` : "自軍耐久が規定値を下回りました。防衛データを再解析します。", critical: false, ally: Math.max(0, ally), enemy: Math.max(0, enemy) });
  return { mode: "arena", opponent, logs, won, rounds: round, allyStart, enemyStart, allyRemaining: Math.max(0, ally), enemyRemaining: Math.max(0, enemy), casualties: 0, ratingDelta, ratingBefore: state.arena.rating, reward };
}

function startArenaBattle(opponentId) {
  const opponent = arenaOpponents.find(item => item.id === opponentId);
  if (!opponent) return;
  if (state.arena.tickets <= 0) return showToast("本日のアリーナ挑戦回数を使い切りました");
  const report = simulateArena(opponent);
  state.arena.tickets -= 1;
  state.arena.rating = Math.max(0, state.arena.rating + report.ratingDelta);
  report.ratingAfter = state.arena.rating;
  if (report.won) {
    state.arena.wins += 1;
    state.arena.streak += 1;
    state.arena.bestStreak = Math.max(state.arena.bestStreak, state.arena.streak);
  } else {
    state.arena.losses += 1;
    state.arena.streak = 0;
  }
  state.arena.history.unshift({ opponent: opponent.name, won: report.won, delta: report.ratingDelta, date: new Intl.DateTimeFormat("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date()) });
  state.arena.history = state.arena.history.slice(0, 10);
  state.coins += report.reward;
  report.levelsGained = recordDailyActivity("arena", 25);
  recordGuildActivity("arena");
  report.playerLevel = state.player.level;
  saveState();
  updateUI();
  const leader = getCommander(opponent.team[0]);
  openBattleReport(report, "境界アリーナ", opponent.name, leader.art || symbolArtData(leader));
  playRevealSound(report.won ? "SSR" : "SR");
  vibrate(report.won ? [25, 30, 70] : [35]);
}

function appendNextBattleLog() {
  if (!battleRun) return;
  const { report } = battleRun;
  if (battleRun.index >= report.logs.length) return finishBattleDisplay();
  appendLogElement(report.logs[battleRun.index]);
  battleRun.index += 1;
  battleRun.timer = setTimeout(appendNextBattleLog, 390);
}

function appendLogElement(log) {
  const element = document.createElement("div");
  element.className = `log-entry${log.critical ? " critical" : ""}${log.actor === "BREAK" ? " break" : ""}`;
  element.innerHTML = `<b>${log.actor === "SYSTEM" ? "END" : log.actor === "PASSIVE" ? "PASS" : log.actor === "BREAK" ? "BRK" : `R${log.round}`}</b><span><strong>${log.actor === "PASSIVE" ? "パッシブ共鳴" : log.actor === "BREAK" ? "部位破壊" : log.actor}</strong><small>${log.text}</small></span>`;
  const container = document.querySelector("#battle-log");
  container.append(element);
  container.scrollTop = container.scrollHeight;
  updateBattleBars(log.ally, battleRun.report.allyStart, log.enemy, battleRun.report.enemyStart);
  if (log.critical) { playImpactSound(); vibrate(25); }
}

function showAllBattleLogs() {
  if (!battleRun) return;
  clearTimeout(battleRun.timer);
  while (battleRun.index < battleRun.report.logs.length) {
    appendLogElement(battleRun.report.logs[battleRun.index]);
    battleRun.index += 1;
  }
  finishBattleDisplay();
}

function updateBattleBars(ally, allyStart, enemy, enemyStart, mode = battleRun?.report?.mode) {
  document.querySelector("#ally-troop-text").textContent = `${formatNumber(ally)} / ${formatNumber(allyStart)}`;
  document.querySelector("#enemy-troop-text").textContent = `${formatNumber(enemy)} / ${formatNumber(enemyStart)}`;
  document.querySelector("#ally-troop-bar").style.width = `${Math.max(0, ally / allyStart * 100)}%`;
  document.querySelector("#enemy-troop-bar").style.width = `${Math.max(0, enemy / enemyStart * 100)}%`;
}

function finishBattleDisplay() {
  if (!battleRun) return;
  clearTimeout(battleRun.timer);
  const report = battleRun.report;
  const growth = report.levelsGained ? ` / PLAYER Lv.${report.playerLevel} UP` : "";
  document.querySelector("#battle-skip").classList.add("hidden");
  document.querySelector("#battle-result").classList.remove("hidden");
  if (report.mode === "arena") {
    document.querySelector("#battle-result-icon").textContent = report.won ? "✓" : "×";
    document.querySelector("#battle-result-title").textContent = report.won ? "ARENA WIN" : "ARENA LOSE";
    document.querySelector("#battle-result-meta").textContent = `RATE ${formatNumber(report.ratingBefore)} → ${formatNumber(report.ratingAfter)}（${report.ratingDelta > 0 ? "+" : ""}${report.ratingDelta}） / ${formatNumber(report.reward)}コイン${growth}`;
  } else if (report.mode === "raid") {
    document.querySelector("#battle-result-icon").textContent = report.won ? "✓" : "界";
    document.querySelector("#battle-result-title").textContent = report.won ? "レイド鎮圧" : "共鳴同期完了";
    const breaks = report.newBreaks.length ? ` / 部位破壊 ${report.newBreaks.map(id => raidBoss.parts[id].name).join("・")}` : "";
    document.querySelector("#battle-result-meta").textContent = `与ダメージ ${formatNumber(report.damage)} / 損耗 ${report.casualties}名 / ${formatNumber(report.reward)}コイン${breaks}${growth}`;
  } else {
    document.querySelector("#battle-result-icon").textContent = report.won ? "✓" : "!";
    document.querySelector("#battle-result-title").textContent = report.won ? "任務完了" : "部隊撤退";
    const drops = report.won ? ` / ${Object.entries(report.mission.drops).map(([key, amount]) => `${materials[key].name}×${amount}`).join("・")}` : "";
    document.querySelector("#battle-result-meta").textContent = `損耗 ${report.casualties}名 / ${formatNumber(report.reward)}コイン${drops}${growth}`;
  }
  const missing = Math.max(0, getTeamCapacity() - state.troops);
  const button = document.querySelector("#replenish-button");
  if (report.mode !== "arena") {
    button.textContent = missing > 0 ? `兵を補充（${formatNumber(missing * 12)}コイン）` : "兵力は最大です";
    button.disabled = missing === 0;
  }
  playBattleResultSound(report.mode === "raid" || report.won);
}

function replenishTroops() {
  const missing = Math.max(0, getTeamCapacity() - state.troops);
  const cost = missing * 12;
  if (!missing) return;
  if (state.coins < cost) return showToast("補充に必要なコインが不足しています");
  state.coins -= cost;
  state.troops += missing;
  saveState();
  updateUI();
  document.querySelector("#replenish-button").textContent = "補充完了";
  document.querySelector("#replenish-button").disabled = true;
  showToast(`${missing}名を補充しました`);
}

function closeBattle() {
  if (battleRun) clearTimeout(battleRun.timer);
  battleRun = null;
  const overlay = document.querySelector("#battle-overlay");
  overlay.classList.remove("active");
  overlay.setAttribute("aria-hidden", "true");
}

function showInfoDialog(type) {
  const content = document.querySelector("#dialog-content");
  if (type === "rates") {
    content.innerHTML = `<div class="dialog-body"><h2>提供割合</h2><div class="rate-row"><span class="rarity ur">UR</span><b>0.5%</b></div><div class="rate-row"><span class="rarity ssr">SSR</span><b>4.5%</b></div><div class="rate-row"><span class="rarity sr">SR</span><b>20.0%</b></div><div class="rate-row"><span class="rarity r">R</span><b>75.0%</b></div><p>同レアリティ内は原則均等。実運用ではサーバー側抽選とストア規約に沿った表示・履歴管理を行います。</p></div>`;
  } else {
    content.innerHTML = `<div class="dialog-body"><h2>天井・重複</h2><ul><li>10連はSR以上1体確定</li><li>61回目からUR確率が段階上昇</li><li>80回目までにUR確定</li><li>UR獲得でカウンターをリセット</li><li>重複は記憶片へ自動変換</li></ul></div>`;
  }
  document.querySelector("#info-dialog").showModal();
}

function resetDemo() {
  state = defaultState();
  activeSlot = 0;
  workshopUnitId = state.team[0];
  saveState();
  updateUI();
  showToast("デモ状態を初期化しました");
}

function getAudioContext() {
  if (!state.settings.sound) return null;
  if (!audioSystem) {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const compressor = context.createDynamicsCompressor();
    compressor.threshold.value = -18;
    compressor.knee.value = 16;
    compressor.ratio.value = 7;
    compressor.attack.value = .003;
    compressor.release.value = .28;
    const master = context.createGain();
    master.gain.value = .72;
    compressor.connect(master).connect(context.destination);
    audioSystem = { context, compressor, master };
  }
  if (audioSystem.context.state === "suspended") audioSystem.context.resume();
  return audioSystem.context;
}

function routeAudio(node, pan = 0) {
  if (!audioSystem) return;
  if (audioSystem.context.createStereoPanner) {
    const panner = audioSystem.context.createStereoPanner();
    panner.pan.value = pan;
    node.connect(panner).connect(audioSystem.compressor);
  } else node.connect(audioSystem.compressor);
}

function tone(frequency, duration, volume = .06, endFrequency = null, type = "sine", delay = 0, pan = 0) {
  const context = getAudioContext();
  if (!context) return;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const start = context.currentTime + delay;
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(Math.max(1, frequency), start);
  if (endFrequency) oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), start + duration);
  gain.gain.setValueAtTime(.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + Math.min(.025, duration / 4));
  gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
  oscillator.connect(gain);
  routeAudio(gain, pan);
  oscillator.start(start);
  oscillator.stop(start + duration + .04);
}

function noiseSweep(duration, volume, fromFrequency, toFrequency, delay = 0, pan = 0) {
  const context = getAudioContext();
  if (!context) return;
  const length = Math.ceil(context.sampleRate * duration);
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let index = 0; index < length; index += 1) {
    const white = Math.random() * 2 - 1;
    last = last * .72 + white * .28;
    data[index] = last;
  }
  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  const start = context.currentTime + delay;
  source.buffer = buffer;
  filter.type = "bandpass";
  filter.Q.value = 1.4;
  filter.frequency.setValueAtTime(fromFrequency, start);
  filter.frequency.exponentialRampToValueAtTime(toFrequency, start + duration);
  gain.gain.setValueAtTime(.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + Math.min(.05, duration / 3));
  gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
  source.connect(filter).connect(gain);
  routeAudio(gain, pan);
  source.start(start);
}

function playUISound() { tone(560, .055, .025, 760, "sine"); }
function playEquipSound() { tone(310, .12, .035, 620, "triangle"); tone(930, .18, .025, null, "sine", .08); }
function playGatherSound() { noiseSweep(.25, .035, 450, 2600); tone(440, .3, .035, 880, "triangle", .08); }
function playCraftSound() { noiseSweep(.18, .08, 2800, 300); tone(82, .32, .1, 48, "sine"); [523, 659, 784].forEach((frequency, index) => tone(frequency, .55, .04, null, "sine", .08 + index * .05, index - 1)); }

function playIgnitionSound() {
  noiseSweep(1.02, .065, 240, 7600, 0, -.2);
  tone(46, 1.02, .14, 92, "sawtooth", 0, .05);
  tone(180, .22, .035, 520, "triangle", .12, -.55);
  tone(230, .24, .04, 720, "triangle", .42, .55);
  tone(310, .28, .045, 1180, "triangle", .72, -.15);
  tone(980, .18, .025, 1480, "sine", .9, .4);
}

function playRevealSound(rarity) {
  const weight = { R: .65, SR: .8, SSR: 1, UR: 1.25 }[rarity];
  noiseSweep(.2, .15 * weight, 6500, 180, 0, 0);
  tone(82, .48, .17 * weight, 36, "sine");
  tone(190, .16, .07 * weight, 82, "square", 0, -.15);
  tone(1320, .42, .035 * weight, 420, "triangle", .02, .4);
  if (rarityRank[rarity] >= rarityRank.SSR) [261.63, 329.63, 392, 523.25].forEach((frequency, index) => {
    tone(frequency, .95, .045 * weight, null, "sine", .08 + index * .075, [-.7, -.2, .25, .7][index]);
    tone(frequency * 2, .48, .018 * weight, null, "triangle", .14 + index * .075, [.6, .2, -.2, -.6][index]);
  });
  if (rarity === "UR") {
    tone(65.4, 1.2, .1, 130.8, "sine", .2);
    noiseSweep(.8, .026, 1800, 9800, .25, .25);
  }
}

function previewGachaSound() {
  const button = document.querySelector("#sound-preview");
  if (!state.settings.sound) {
    state.settings.sound = true;
    saveState();
    updateUI();
    showToast("サウンドをONにしました");
  }
  soundPreviewTimer.forEach(clearTimeout);
  button.classList.add("playing");
  button.querySelector(":scope > b").textContent = "•••";
  playIgnitionSound();
  soundPreviewTimer = [
    setTimeout(() => { playRevealSound("UR"); vibrate([55, 35, 95]); }, 1300),
    setTimeout(() => { button.classList.remove("playing"); button.querySelector(":scope > b").textContent = "▶"; }, 2700)
  ];
}

function playImpactSound() { noiseSweep(.12, .045, 1800, 120); tone(110, .18, .05, 60, "square"); }
function playBattleResultSound(won) { if (won) [392, 494, 587, 784].forEach((frequency, index) => tone(frequency, .58, .035, null, "sine", index * .1, index % 2 ? .3 : -.3)); else tone(150, .6, .06, 72, "sawtooth"); }
function vibrate(pattern) { if (state.settings.haptic && navigator.vibrate) navigator.vibrate(pattern); }

function startParticles(colors) {
  stopParticles();
  const canvas = document.querySelector("#particle-canvas");
  const context = canvas.getContext("2d");
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;
  const particles = Array.from({ length: state.settings.reduceFlash ? 30 : 64 }, () => ({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: (1 + Math.random() * 4) * ratio, speed: (.3 + Math.random() * 1.4) * ratio, drift: -.7 + Math.random() * 1.4, color: randomFrom(colors) }));
  const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
      particle.y -= particle.speed;
      particle.x += particle.drift;
      if (particle.y < -10) { particle.y = canvas.height + 10; particle.x = Math.random() * canvas.width; }
      context.globalAlpha = .35 + Math.random() * .45;
      context.fillStyle = particle.color;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      context.fill();
    });
    particleFrame = requestAnimationFrame(draw);
  };
  draw();
}

function stopParticles() {
  cancelAnimationFrame(particleFrame);
  const canvas = document.querySelector("#particle-canvas");
  canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
}

document.addEventListener("click", event => {
  const screenNav = event.target.closest(".bottom-nav button[data-screen]");
  if (screenNav) return navigateTo(screenNav.dataset.screen);
  const targetNav = event.target.closest("[data-screen-target]");
  if (targetNav) return navigateTo(targetNav.dataset.screenTarget);
  const mission = event.target.closest("[data-mission]");
  if (mission) return startBattle(Number(mission.dataset.mission));
  const slot = event.target.closest("[data-slot]");
  if (slot) return selectTeamSlot(Number(slot.dataset.slot));
  const unit = event.target.closest("[data-unit]");
  if (unit) return assignCommander(unit.dataset.unit);
  const workshopUnit = event.target.closest("[data-workshop-unit]");
  if (workshopUnit) return selectWorkshopUnit(workshopUnit.dataset.workshopUnit);
  const upgrade = event.target.closest("[data-upgrade]");
  if (upgrade) return upgradeUnit(upgrade.dataset.upgrade);
  const expedition = event.target.closest("[data-expedition]");
  if (expedition) return runExpedition(Number(expedition.dataset.expedition));
  const recipe = event.target.closest("[data-recipe]");
  if (recipe) return craftGear(recipe.dataset.recipe);
  const raidTarget = event.target.closest("[data-raid-target]");
  if (raidTarget) return selectRaidTarget(raidTarget.dataset.raidTarget);
  const raidReward = event.target.closest("[data-raid-reward]");
  if (raidReward) return claimRaidReward(raidReward.dataset.raidReward);
  const arenaOpponent = event.target.closest("[data-arena-opponent]");
  if (arenaOpponent) return startArenaBattle(arenaOpponent.dataset.arenaOpponent);
  const dailyClaim = event.target.closest("[data-daily-claim]");
  if (dailyClaim) return claimDailyTask(dailyClaim.dataset.dailyClaim);
  const guildMission = event.target.closest("[data-guild-mission]");
  if (guildMission) return claimGuildMission(guildMission.dataset.guildMission);
  const guildReward = event.target.closest("[data-guild-reward]");
  if (guildReward) return claimGuildReward(guildReward.dataset.guildReward);
  const dialogButton = event.target.closest("[data-dialog]");
  if (dialogButton) return showInfoDialog(dialogButton.dataset.dialog);
});

document.querySelector("#draw-ten").addEventListener("click", () => performDraw(10));
document.querySelector("#draw-one").addEventListener("click", () => performDraw(1));
document.querySelector("#sound-preview").addEventListener("click", previewGachaSound);
document.querySelector("#summon-skip").addEventListener("click", () => showSummonResults());
document.querySelector("#summon-hero").addEventListener("click", () => showSummonResults());
document.querySelector("#summon-close").addEventListener("click", closeSummon);
document.querySelector("#battle-skip").addEventListener("click", showAllBattleLogs);
document.querySelector("#battle-close").addEventListener("click", closeBattle);
document.querySelector("#raid-start").addEventListener("click", startRaidBattle);
document.querySelector("#daily-login-claim").addEventListener("click", claimLoginReward);
document.querySelector("#daily-all-claim").addEventListener("click", claimDailyAll);
document.querySelector("#guild-cheer").addEventListener("click", cheerGuild);
document.querySelector("#replenish-button").addEventListener("click", replenishTroops);
document.querySelector(".dialog-close").addEventListener("click", () => document.querySelector("#info-dialog").close());
document.querySelector("#reset-demo").addEventListener("click", resetDemo);

[["sound-toggle", "sound"], ["haptic-toggle", "haptic"], ["flash-toggle", "reduceFlash"], ["instant-toggle", "instant"]].forEach(([id, key]) => {
  document.querySelector(`#${id}`).addEventListener("change", event => {
    state.settings[key] = event.target.checked;
    saveState();
    updateUI();
  });
});

updateUI();
