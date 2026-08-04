const STORAGE_KEY = "kyokai-resonance-demo-v1";
const STAMINA_RECOVERY_MS = 5 * 60 * 1000;
const rarityRank = { R: 1, SR: 2, SSR: 3, UR: 4 };

const commanders = [
  { id: "touma", name: "トウマ", title: "街路の斥候", rarity: "R", role: "偵察", symbol: "➤", attack: 96, defense: 78, command: 18, colors: ["#1fc9ff", "#2948d5"], skill: { name: "先読み射線", detail: "弱点を捉える精密射撃" }, passive: { name: "雨路適応", stat: "attack", detail: "自身の攻撃を常時強化" } },
  { id: "mina", name: "ミナ", title: "境界の衛士", rarity: "R", role: "防御", symbol: "◆", attack: 82, defense: 108, command: 20, colors: ["#31c5f4", "#3945ad"], skill: { name: "境界防壁", detail: "防壁越しの反撃を展開" }, passive: { name: "護衛陣形", stat: "defense", detail: "自身の防御を常時強化" } },
  { id: "isami", name: "イサミ", title: "火花の整備士", rarity: "R", role: "補給", symbol: "⚙", attack: 90, defense: 88, command: 19, colors: ["#ff644d", "#7825ba"], skill: { name: "応急再装填", detail: "即席弾薬で一斉支援" }, passive: { name: "現地整備", stat: "both", detail: "自身の攻撃と防御を強化" } },
  { id: "ren", name: "レン", title: "蒼雷の遊撃手", rarity: "SR", role: "攻撃", symbol: "ϟ", attack: 128, defense: 88, command: 22, colors: ["#ff304f", "#7d27e8", "#19cfff"], art: "assets/commander-ren-v3.png", skill: { name: "蒼雷連鎖", detail: "雷撃を隣接目標へ連鎖" }, passive: { name: "雷導加速", stat: "attack", detail: "自身の攻撃を常時強化" } },
  { id: "sana", name: "サナ", title: "翠環の調律師", rarity: "SR", role: "支援", symbol: "⌁", attack: 106, defense: 104, command: 21, colors: ["#ff5870", "#8e2de2", "#ffd91a", "#13cfff"], art: "assets/commander-sana-v3.png", skill: { name: "翠環共振", detail: "共鳴波で部隊を援護" }, passive: { name: "循環触媒", stat: "both", detail: "自身の攻撃と防御を強化" } },
  { id: "ten", name: "テン", title: "黒鋼の盾役", rarity: "SR", role: "防御", symbol: "⬢", attack: 102, defense: 142, command: 22, colors: ["#562c8a", "#181526"], skill: { name: "黒鋼反射", detail: "障壁で衝撃を反射" }, passive: { name: "不動心", stat: "defense", detail: "自身の防御を常時強化" } },
  { id: "kanade", name: "カナデ", title: "星砕きの奏者", rarity: "SSR", role: "攻撃", symbol: "✦", attack: 168, defense: 118, command: 25, colors: ["#ffba24", "#f3299b"], skill: { name: "星霜連爆", detail: "音律弾を連続起爆" }, passive: { name: "高揚旋律", stat: "attack", detail: "自身の攻撃を常時強化" } },
  { id: "riku", name: "リク", title: "玻璃の疾風", rarity: "SSR", role: "遊撃", symbol: "≋", attack: 154, defense: 124, command: 26, colors: ["#21e8ef", "#7c36e8"], skill: { name: "残響突破", detail: "残像と共に防衛線を突破" }, passive: { name: "疾風装填", stat: "attack", detail: "自身の攻撃を常時強化" } },
  { id: "setsuna", name: "セツナ", title: "常夜の守護者", rarity: "SSR", role: "防御", symbol: "☾", attack: 132, defense: 176, command: 27, colors: ["#334dd8", "#d625b5"], skill: { name: "常夜結界", detail: "夜色の結界で敵を封鎖" }, passive: { name: "守護誓約", stat: "defense", detail: "自身の防御を常時強化" } },
  { id: "ao", name: "アオ", title: "蒼雷の修験槍", rarity: "SSR", role: "遊撃", symbol: "槍", attack: 174, defense: 138, command: 27, colors: ["#19cfff", "#263ccf", "#d7ff27", "#f126cf"], art: "assets/char-ao-v2.png", skill: { name: "雷禅一閃", detail: "帯電した薙刀で防衛線を貫く" }, passive: { name: "導雷歩法", stat: "attack", detail: "自身の攻撃を常時強化" } },
  { id: "suzune", name: "スズネ", title: "祭電の信号手", rarity: "SSR", role: "攻撃", symbol: "銃", attack: 181, defense: 116, command: 25, colors: ["#ff7a22", "#19e6ff", "#f126cf", "#ffd53d"], art: "assets/char-suzune-v2.png", skill: { name: "祝砲レゾナンス", detail: "祭礼弾で標的信号を連続射抜く" }, passive: { name: "照準共鳴", stat: "attack", detail: "自身の攻撃を常時強化" } },
  { id: "matoi", name: "マトイ", title: "紅符の砕界士", rarity: "SSR", role: "攻撃", symbol: "槌", attack: 188, defense: 121, command: 26, colors: ["#ff3057", "#f126cf", "#6e25d9", "#19e6ff"], art: "assets/commander-matoi-v1.png", skill: { name: "砕界・紅符墜", detail: "大型符槌で敵陣と防壁を同時に粉砕" }, passive: { name: "破砕共鳴", stat: "attack", detail: "自身の攻撃を常時強化" } },
  { id: "ibuki", name: "イブキ", title: "白環の城塞守", rarity: "SSR", role: "防御", symbol: "盾", attack: 137, defense: 186, command: 28, colors: ["#f6f3ff", "#17cfe3", "#6847df", "#f126cf"], art: "assets/commander-ibuki-v1.png", skill: { name: "白環城塞", detail: "円環障壁を展開し部隊の損耗を抑制" }, passive: { name: "守域拡張", stat: "defense", detail: "自身の防御を常時強化" } },
  { id: "tsuzuri", name: "ツヅリ", title: "彩紋の結界師", rarity: "SR", role: "支援", symbol: "扇", attack: 112, defense: 136, command: 24, colors: ["#16d7d0", "#f126cf", "#ffd53d", "#23103e"], art: "assets/char-tsuzuri-v2.png", skill: { name: "彩界扇陣", detail: "色彩結界で五人の共鳴を保護" }, passive: { name: "護符編纂", stat: "both", detail: "自身の攻撃と防御を強化" } },
  { id: "kohaku", name: "コハク", title: "界紋を拓く者", rarity: "UR", role: "万能", symbol: "界", attack: 196, defense: 164, command: 30, colors: ["#19e6ff", "#f126cf", "#ffd53d"], art: "assets/commander-kohaku-v2.png", skill: { name: "万象展開", detail: "界紋を開き全域を制圧" }, passive: { name: "界紋共鳴", stat: "both", detail: "自身の攻撃と防御を強化" } },
  { id: "kagari", name: "カガリ", title: "紅界の鬼舞", rarity: "UR", role: "攻撃", symbol: "鬼", attack: 208, defense: 152, command: 31, colors: ["#ff304f", "#f126cf", "#19e6ff", "#ffd53d"], art: "assets/char-kagari-v2.png", skill: { name: "紅蓮界断", detail: "鬼面の界刀で全戦線を切り開く" }, passive: { name: "鬼舞共鳴", stat: "attack", detail: "自身の攻撃を大きく強化" } },
  { id: "shion", name: "シオン", title: "紫電の界斬姫", rarity: "UR", role: "攻撃", symbol: "閃", attack: 224, defense: 148, command: 32, colors: ["#7d35ff", "#f126cf", "#19e6ff", "#ffd53d"], art: "assets/commander-shion-v1.png", skill: { name: "紫電天衝", detail: "境界を裂く大剣へ紫雷を収束し一刀で薙ぎ払う" }, passive: { name: "雷華連唱", stat: "attack", detail: "連続共鳴で自身の攻撃を大きく強化" } },
  { id: "hotaru", name: "ホタル", title: "星灯の祈導師", rarity: "SSR", role: "支援", symbol: "灯", attack: 149, defense: 165, command: 29, colors: ["#ff7069", "#19d9e6", "#ffd53d", "#f126cf"], art: "assets/commander-hotaru-v1.png", skill: { name: "星灯再生陣", detail: "星灯端末を展開し五人の共鳴と戦線を立て直す" }, passive: { name: "灯脈循環", stat: "both", detail: "星灯の循環で自身の攻撃と防御を強化" } },
  { id: "gendo", name: "ゲンドウ", title: "黒鉄の城壁", rarity: "SR", role: "防御", symbol: "壁", attack: 103, defense: 151, command: 25, colors: ["#181b25", "#19e6ff", "#ff7024", "#f126cf"], art: "assets/commander-gendo-v1.png", skill: { name: "不動境壁", detail: "黒鉄の大盾を固定し衝撃を正面から受け止める" }, passive: { name: "鉄心増幅", stat: "defense", detail: "揺るがぬ鉄心で自身の防御を常時強化" } },
  { id: "nagi", name: "ナギ", title: "影縫いの符術士", rarity: "R", role: "妨害", symbol: "縫", attack: 100, defense: 86, command: 21, colors: ["#b8f21f", "#11141d", "#19d9e6", "#f126cf"], art: "assets/commander-nagi-v1.png", skill: { name: "影縛封陣", detail: "符を打ち込み敵の進路と共鳴回路を同時に縫い止める" }, passive: { name: "裏路観測", stat: "attack", detail: "死角の観測で自身の攻撃を常時強化" } }
];

const missions = [
  { id: "m1-1", chapter: 1, stage: "1-1", zone: "NEON MARKET / RAIN", title: "ネオン街の追跡者", enemy: "裂界猟犬", description: "市場へ侵入した追跡機を排除せよ", stamina: 5, recommended: 760, enemyTroops: 58, enemyAttack: 390, enemyDefense: 320, reward: 800, art: "assets/enemy-rift-hound-v1.png", drops: { ore: 2, hide: 1 }, firstReward: { crystals: 80, materials: { ore: 2 } } },
  { id: "m1-2", chapter: 1, stage: "1-2", zone: "INDUSTRIAL / NIGHT", title: "雨上がりの高架線", enemy: "晶刃機プリズムマンティス", description: "高架線へ降下した晶刃追跡機を停止せよ", stamina: 6, recommended: 880, enemyTroops: 70, enemyAttack: 455, enemyDefense: 380, reward: 980, art: "assets/enemy-prism-mantis-v1.png", drops: { fiber: 2, core: 1 }, firstReward: { crystals: 90, materials: { fiber: 2 } } },
  { id: "m1-3", chapter: 1, stage: "1-3", zone: "BORDER GATE", title: "境界門、再起動", enemy: "門衛猟犬アルファ", description: "門衛機の暴走信号を遮断せよ", stamina: 7, recommended: 1020, enemyTroops: 84, enemyAttack: 525, enemyDefense: 450, reward: 1200, art: "assets/enemy-rift-hound-v1.png", drops: { core: 2, hide: 2 }, firstReward: { crystals: 120, materials: { core: 2 } } },
  { id: "m2-1", chapter: 2, stage: "2-1", zone: "GREEN LAB / RUINS", title: "翠環研究棟", enemy: "培養殻ウォード", description: "閉鎖研究棟で増殖する装甲殻を停止", stamina: 7, recommended: 1120, enemyTroops: 88, enemyAttack: 555, enemyDefense: 475, reward: 1350, art: "assets/enemy-ward-v1.png", drops: { fiber: 3, hide: 2 }, firstReward: { crystals: 130, coins: 1200 } },
  { id: "m2-2", chapter: 2, stage: "2-2", zone: "PORCELAIN BRIDGE", title: "白磁橋の重力波", enemy: "白磁重力鰩グラヴィレイ", description: "橋梁を歪める浮遊重力核を突破せよ", stamina: 8, recommended: 1240, enemyTroops: 96, enemyAttack: 610, enemyDefense: 520, reward: 1500, art: "assets/enemy-gravity-ray-v1.png", drops: { ore: 3, core: 2 }, firstReward: { crystals: 140, materials: { core: 2 } } },
  { id: "m2-3", chapter: 2, stage: "2-3", zone: "MECH HANGAR", title: "未成体ゴライアス", enemy: "ゴライアス未成体", description: "起動前の巨大境界機を鎮圧せよ", stamina: 9, recommended: 1380, enemyTroops: 108, enemyAttack: 675, enemyDefense: 570, reward: 1800, art: "assets/enemy-goliath-v1.png", drops: { core: 3, hide: 3 }, firstReward: { crystals: 180, materials: { core: 3 } } },
  { id: "m3-1", chapter: 3, stage: "3-1", zone: "FESTIVAL AFTERGLOW", title: "祭路に残る九尾", enemy: "夜神楽の残響", description: "祭礼跡に残る自律信号を回収せよ", stamina: 8, recommended: 1460, enemyTroops: 112, enemyAttack: 710, enemyDefense: 600, reward: 1950, art: "assets/enemy-festival-echo-v1.png", drops: { fiber: 3, ore: 3 }, firstReward: { crystals: 180, coins: 1800 } },
  { id: "m3-2", chapter: 3, stage: "3-2", zone: "NINE-TAIL COORDINATE", title: "九尾座標の迷宮", enemy: "ヨルカグラ分体", description: "書き換えられた街路座標を復元せよ", stamina: 9, recommended: 1580, enemyTroops: 122, enemyAttack: 760, enemyDefense: 645, reward: 2200, art: "assets/enemy-festival-echo-v1.png", drops: { core: 3, fiber: 3 }, firstReward: { crystals: 220, materials: { core: 3 } } },
  { id: "m3-3", chapter: 3, stage: "3-3", zone: "DAWN BOUNDARY", title: "朝焼けの境界", enemy: "祭禍核・最終残響", description: "五人の共鳴で境界の夜を終わらせる", stamina: 10, recommended: 1720, enemyTroops: 134, enemyAttack: 825, enemyDefense: 700, reward: 2600, art: "assets/event-yorukagura-v1.png", drops: { core: 4, hide: 3 }, firstReward: { crystals: 300, materials: { core: 4 } } },
  { id: "m4-1", chapter: 4, stage: "4-1", zone: "SEALED ARCHIVE", title: "閉ざされた記録灯", enemy: "記録灯機アーカイヴ", description: "封印記録庫を巡回する自律灯機を解除せよ", stamina: 10, recommended: 1840, enemyTroops: 142, enemyAttack: 885, enemyDefense: 750, reward: 3000, art: "assets/enemy-archive-lantern-v1.png", drops: { fiber: 4, ore: 3 }, firstReward: { crystals: 320, materials: { fiber: 4 } } },
  { id: "m4-2", chapter: 4, stage: "4-2", zone: "MIRROR CORRIDOR", title: "鏡層回廊の番人", enemy: "鏡鎧武者ミラージュ", description: "反射座標を守る空洞の鏡鎧を打ち破れ", stamina: 11, recommended: 1980, enemyTroops: 154, enemyAttack: 950, enemyDefense: 815, reward: 3400, art: "assets/enemy-mirror-armor-v1.png", drops: { core: 4, hide: 4 }, firstReward: { crystals: 360, coins: 3000 } },
  { id: "m4-3", chapter: 4, stage: "4-3", zone: "ZERO BOUNDARY", title: "零境に眠る熾天核", enemy: "境界熾天核セラフ", description: "全座標を初期化する六翼の中枢核を鎮圧せよ", stamina: 12, recommended: 2160, enemyTroops: 168, enemyAttack: 1020, enemyDefense: 880, reward: 4000, art: "assets/enemy-boundary-seraph-v1.png", drops: { core: 5, ore: 4 }, firstReward: { crystals: 450, materials: { core: 5 } } }
];

const materials = {
  ore: { name: "境鉄鉱", icon: "⬡", color: "#19e6ff", art: "assets/material-border-ore-v1.png" },
  fiber: { name: "霊脈繊維", icon: "≋", color: "#f126cf", art: "assets/material-spirit-fiber-v1.png" },
  core: { name: "共鳴核", icon: "◆", color: "#ffd53d", art: "assets/material-resonance-core-v1.png" },
  hide: { name: "機獣外皮", icon: "◈", color: "#5fffb0", art: "assets/material-mech-hide-v1.png" }
};

const expeditions = [
  { id: "neon", code: "E-01 / CITY", name: "ネオン市場跡", detail: "雨に沈む露店街の残骸を捜索", drops: { ore: [2, 4], core: [0, 1] }, background: "radial-gradient(circle at 85% 30%,rgba(25,230,255,.35),transparent 28%),linear-gradient(135deg,#25104b,#081a31)" },
  { id: "greenhouse", code: "E-02 / RUINS", name: "翠環培養区", detail: "植物に覆われた旧研究所を採集", drops: { fiber: [2, 4], hide: [1, 2] }, background: "radial-gradient(circle at 85% 30%,rgba(95,255,176,.3),transparent 28%),linear-gradient(135deg,#153625,#122043)" },
  { id: "rift", code: "E-03 / BORDER", name: "境界断層", detail: "高危険度の亀裂周辺で希少素材を回収", drops: { core: [1, 3], ore: [1, 2], hide: [0, 1] }, background: "radial-gradient(circle at 85% 30%,rgba(241,38,207,.35),transparent 28%),linear-gradient(135deg,#3a102d,#181038)" }
];

const recipes = [
  { id: "arcRifle", slot: "weapon", name: "雷紋式アークライフル", type: "武器", icon: "⌁", art: "assets/item-arc-rifle-v1.png", effect: "対象キャラの攻撃 +42 / Lv", max: 5, costs: { ore: 6, core: 3 }, coins: 800 },
  { id: "borderCoat", slot: "armor", name: "境界織りの外套", type: "防具", icon: "♢", art: "assets/item-border-coat-v1.png", effect: "対象キャラの防御 +46 / Lv", max: 5, costs: { fiber: 5, hide: 4 }, coins: 700 },
  { id: "resonanceSigil", slot: "accessory", name: "五連共鳴紋章", type: "装飾", icon: "✦", art: "assets/item-resonance-sigil-v1.png", effect: "対象キャラの攻防 +25 / Lv", max: 5, costs: { core: 5, fiber: 3 }, coins: 1000 }
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
  { id: "hoshiyomi", name: "星詠ミオ", guild: "天蓋観測局", rating: 1240, level: 6, skillLevel: 3, passiveLevel: 3, gearLevel: 2, team: ["kohaku", "kanade", "setsuna", "riku", "sana"] },
  { id: "shiden", name: "紫藤レイカ", guild: "天雷境界局", rating: 1420, level: 8, skillLevel: 4, passiveLevel: 4, gearLevel: 2, team: ["shion", "hotaru", "gendo", "nagi", "kagari"] }
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

const guildChatSeed = [
  { id: "seed-yura", author: "白鷺ユラ", role: "団長", commander: "kohaku", message: "今夜21時、ゴライアス救援へ。参加できる人は共鳴を！", time: "20:10" },
  { id: "seed-jin", author: "黒鉄ジン", role: "副団長", commander: "sana", message: "境界核を優先指定済み。素材が足りない人は共同補給をどうぞ。", time: "19:42" },
  { id: "seed-kai", author: "雨森カイ", role: "団員", commander: "touma", message: "ネオン市場跡を探索中です！", time: "19:18" }
];

const guildQuickMessages = [
  { icon: "◉", text: "レイド行きます！" },
  { icon: "⚒", text: "素材集め中です" },
  { icon: "♟", text: "編成を更新しました" },
  { icon: "✓", text: "お疲れさま！" }
];

const guildRaidMembers = [
  { name: "白鷺ユラ", role: "団長", commander: "kohaku", damage: 18240 },
  { name: "黒鉄ジン", role: "副団長", commander: "sana", damage: 14680 },
  { name: "霞坂ユノ", role: "精鋭", commander: "ren", damage: 11320 },
  { name: "星詠ミオ", role: "参謀", commander: "kanade", damage: 8940 }
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

const eventSeasonId = "night-festival-01";
const eventBossArt = "assets/event-yorukagura-v1.png";
const eventStories = [
  { id: "story-1", episode: "EPISODE 01", title: "消えた祭灯", summary: "境界祭の灯りが一斉に沈黙する。", reward: { crystals: 10 }, body: ["年に一度、境界の内と外を結ぶ『共鳴祭』。開祭の鐘が鳴った瞬間、ネオン街の祭灯がすべて黒く染まった。", "レンたち第零遊撃隊は、雨の参道に残された九つの巨大な足跡を追う。"] },
  { id: "story-2", episode: "EPISODE 02", title: "九尾機、巡行", summary: "白磁の獣が祭路を境界へ変えていく。", reward: { crystals: 10 }, body: ["祭路の上空に現れたのは、旧時代の祭礼機構『ヨルカグラ』。九本の尾が現実座標を書き換え、街そのものを巨大な祭壇へ変えていた。", "サナは中央のシアン核に人の祈りが取り込まれていることを見抜く。破壊だけでは、祭に集った記憶まで失われてしまう。"] },
  { id: "story-3", episode: "FINAL EPISODE", title: "夜神楽を終わらせて", summary: "五人の共鳴で祭禍機の核を解放する。", reward: { crystals: 20 }, body: ["コハクが界紋を開き、五人の共鳴を一本の光へ束ねる。狙うのは機体ではなく、暴走した祭礼命令だけ。", "夜明けと共に白磁の九尾は静止し、奪われた灯りが街へ戻る。境界祭は、今度こそ人々自身の手で再開された。"] }
];

const eventStages = [
  { id: "event-1", stage: "E-1", zone: "FESTIVAL / RAIN", title: "灯消えの参道", enemy: "祭灯の影", description: "黒く染まった祭灯群を鎮める", stamina: 6, recommended: 760, enemyTroops: 50, enemyAttack: 360, enemyDefense: 300, reward: 650, token: 35, points: 120, art: eventBossArt, drops: {} },
  { id: "event-2", stage: "E-2", zone: "TORII DISTRICT", title: "九尾機の巡行", enemy: "ヨルカグラ分体", description: "祭路を侵食する白磁装甲を突破", stamina: 8, recommended: 900, enemyTroops: 66, enemyAttack: 435, enemyDefense: 365, reward: 900, token: 50, points: 190, art: eventBossArt, drops: {} },
  { id: "event-3", stage: "E-3", zone: "BOUNDARY ALTAR", title: "祭禍機ヨルカグラ", enemy: "祭禍機ヨルカグラ", description: "五人の共鳴で祭礼命令を停止せよ", stamina: 10, recommended: 1040, enemyTroops: 82, enemyAttack: 510, enemyDefense: 435, reward: 1300, token: 75, points: 290, art: eventBossArt, drops: {} }
];

const eventPointRewards = [
  { id: "event-p1", points: 100, name: "祭灯の記録 I", reward: { crystals: 50 } },
  { id: "event-p2", points: 300, name: "祭灯の記録 II", reward: { coins: 1200, materials: { ore: 2 } } },
  { id: "event-p3", points: 600, name: "祭灯の記録 III", reward: { crystals: 120, materials: { fiber: 3 } } },
  { id: "event-p4", points: 1000, name: "夜神楽の証", reward: { crystals: 220, materials: { core: 3 } } }
];

const eventExchangeItems = [
  { id: "event-coins", name: "コイン×1,000", icon: "●", cost: 30, stock: 3, reward: { coins: 1000 } },
  { id: "event-materials", name: "祭路素材セット", icon: "⚒", cost: 40, stock: 3, reward: { materials: { ore: 2, fiber: 2 } } },
  { id: "event-stamina", name: "共鳴活性剤 ϟ10", icon: "ϟ", cost: 50, stock: 2, reward: { stamina: 10 } },
  { id: "event-core", name: "共鳴核×3", icon: "◆", cost: 90, stock: 1, reward: { materials: { core: 3 } } }
];

const eventRaidBoss = {
  name: "祭禍機ヨルカグラ",
  maxHp: 650000,
  initialHp: 518400,
  attack: 735,
  defense: 575,
  art: eventBossArt,
  parts: {
    tails: { name: "九尾封輪", icon: "九", maxHp: 1450, effect: "破壊後：ボス攻撃 -18%", reward: { tokens: 35, points: 80, materials: { fiber: 2 } } },
    mask: { name: "白磁神楽面", icon: "面", maxHp: 1650, effect: "破壊後：味方与ダメージ +20%", reward: { tokens: 40, points: 100, materials: { ore: 2 } } },
    core: { name: "祈願共鳴核", icon: "核", maxHp: 1950, effect: "破壊後：祭札ボーナス +25", reward: { tokens: 50, points: 130, materials: { core: 2 } } }
  }
};

const eventRaidRewardTiers = [
  { id: "event-r1", damage: 1200, name: "共闘参加報酬", reward: { crystals: 60, coins: 800 } },
  { id: "event-r2", damage: 3600, name: "祭禍迎撃報酬", reward: { crystals: 110, materials: { ore: 2, fiber: 2 } } },
  { id: "event-r3", damage: 6800, name: "夜神楽鎮圧報酬", reward: { crystals: 180, materials: { core: 3 } } }
];

const eventRaidMembers = [
  { name: "白鷺ユラ", role: "団長", commander: "kohaku", damage: 9840 },
  { name: "黒鉄ジン", role: "副団長", commander: "sana", damage: 7420 },
  { name: "霞坂ユノ", role: "精鋭", commander: "ren", damage: 5280 }
];

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
const newGuildState = () => ({ weekKey: localWeekKey(), contribution: 0, totalContribution: 0, actions: newGuildActions(), claimedMissions: [], claimedRewards: [], cheerDay: "", supplyDay: "", rescueDay: "", rescueDamage: 0, chat: [], lastActivity: "" });
const newEventRaidParts = () => Object.fromEntries(Object.entries(eventRaidBoss.parts).map(([id, part]) => [id, { hp: part.maxHp, broken: false }]));
const newEventRaidState = () => ({ attempts: 3, resetDay: localDayKey(), bossHp: eventRaidBoss.initialHp, personalDamage: 0, lastDamage: 0, runs: 0, target: "tails", parts: newEventRaidParts(), claimedRewards: [], supportDay: "", supportDamage: 0 });
const newEventState = () => ({ seasonId: eventSeasonId, points: 0, tokens: 0, clears: {}, claimedRewards: [], exchange: {}, storyRead: [], raid: newEventRaidState() });
const createPlayerId = () => `BR-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
const newProfileState = () => ({ id: createPlayerId(), name: "境界局長", createdAt: Date.now() });
const newCampaignState = () => ({ unlocked: 1, clears: {}, firstRewards: [] });
const newLifetimeState = () => ({ battles: 0, missionWins: 0, raidRuns: 0, arenaWins: 0, draws: 0 });

const defaultState = () => ({
  schema: 14,
  crystals: 4500,
  coins: 12800,
  stamina: 60,
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
  event: newEventState(),
  campaign: newCampaignState(),
  profile: newProfileState(),
  lifetime: newLifetimeState(),
  staminaUpdatedAt: Date.now(),
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
let battleSoundPreviewTimer = [];

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
      claimedRewards: Array.isArray(parsedGuild.claimedRewards) ? parsedGuild.claimedRewards : [],
      chat: Array.isArray(parsedGuild.chat) ? parsedGuild.chat.slice(0, 6) : []
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
    const parsedEvent = parsed.event || {};
    const parsedEventRaid = parsedEvent.raid || {};
    const eventRaid = {
      ...defaults.event.raid,
      ...parsedEventRaid,
      parts: Object.fromEntries(Object.keys(eventRaidBoss.parts).map(id => [id, { ...defaults.event.raid.parts[id], ...(parsedEventRaid.parts?.[id] || {}) }])),
      claimedRewards: Array.isArray(parsedEventRaid.claimedRewards) ? parsedEventRaid.claimedRewards : []
    };
    if (eventRaid.resetDay !== localDayKey()) {
      eventRaid.attempts = 3;
      eventRaid.resetDay = localDayKey();
    }
    eventRaid.attempts = Math.max(0, Math.min(3, Number(eventRaid.attempts) || 0));
    const restoredEventBossHp = Number(eventRaid.bossHp);
    eventRaid.bossHp = Number.isFinite(restoredEventBossHp) ? Math.max(0, Math.min(eventRaidBoss.maxHp, restoredEventBossHp)) : eventRaidBoss.initialHp;
    eventRaid.personalDamage = Math.max(0, Number(eventRaid.personalDamage) || 0);
    eventRaid.lastDamage = Math.max(0, Number(eventRaid.lastDamage) || 0);
    let event = {
      ...defaults.event,
      ...parsedEvent,
      clears: { ...defaults.event.clears, ...(parsedEvent.clears || {}) },
      exchange: { ...defaults.event.exchange, ...(parsedEvent.exchange || {}) },
      claimedRewards: Array.isArray(parsedEvent.claimedRewards) ? parsedEvent.claimedRewards : [],
      storyRead: Array.isArray(parsedEvent.storyRead) ? parsedEvent.storyRead : [],
      raid: eventRaid
    };
    if (event.seasonId !== eventSeasonId) event = newEventState();
    event.points = Math.max(0, Number(event.points) || 0);
    event.tokens = Math.max(0, Number(event.tokens) || 0);
    const parsedCampaign = parsed.campaign || {};
    const campaign = {
      ...defaults.campaign,
      ...parsedCampaign,
      clears: { ...defaults.campaign.clears, ...(parsedCampaign.clears || {}) },
      firstRewards: Array.isArray(parsedCampaign.firstRewards) ? parsedCampaign.firstRewards : []
    };
    const inferredUnlock = missions.reduce((highest, mission, index) => campaign.clears[mission.id] ? Math.max(highest, index + 2) : highest, 1);
    campaign.unlocked = Math.max(1, Math.min(missions.length, Math.max(Number(campaign.unlocked) || 1, inferredUnlock)));
    const profile = { ...defaults.profile, ...(parsed.profile || {}) };
    profile.name = String(profile.name || defaults.profile.name).trim().slice(0, 16) || defaults.profile.name;
    profile.id = String(profile.id || defaults.profile.id).slice(0, 16);
    const lifetime = { ...defaults.lifetime, ...(parsed.lifetime || {}) };
    Object.keys(defaults.lifetime).forEach(key => lifetime[key] = Math.max(0, Number(lifetime[key]) || 0));
    const restored = {
      ...defaults,
      ...parsed,
      schema: 14,
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
      event,
      campaign,
      profile,
      lifetime,
      staminaUpdatedAt: Number(parsed.staminaUpdatedAt) || Date.now(),
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
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]); }

function applyStaminaRecovery() {
  const now = Date.now();
  if (!Number.isFinite(state.staminaUpdatedAt)) state.staminaUpdatedAt = now;
  if (state.stamina >= 60) {
    state.stamina = 60;
    state.staminaUpdatedAt = now;
    return false;
  }
  const recovered = Math.floor((now - state.staminaUpdatedAt) / STAMINA_RECOVERY_MS);
  if (recovered <= 0) return false;
  state.stamina = Math.min(60, state.stamina + recovered);
  state.staminaUpdatedAt += recovered * STAMINA_RECOVERY_MS;
  if (state.stamina >= 60) state.staminaUpdatedAt = now;
  return true;
}

function staminaClockText() {
  if (state.stamina >= 60) return "MAX";
  const remaining = Math.max(0, STAMINA_RECOVERY_MS - (Date.now() - state.staminaUpdatedAt));
  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateStaminaClock() {
  if (applyStaminaRecovery()) {
    saveState();
    updateUI();
    return;
  }
  const clock = document.querySelector("#stamina-timer");
  if (clock) clock.textContent = staminaClockText();
}

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

function ensureEventRaidReset() {
  if (state.event.raid.resetDay === localDayKey()) return false;
  state.event.raid.resetDay = localDayKey();
  state.event.raid.attempts = 3;
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
  if (reward.stamina) {
    state.stamina = Math.min(60, state.stamina + reward.stamina);
    state.staminaUpdatedAt = Date.now();
  }
  Object.entries(reward.materials || {}).forEach(([key, amount]) => state.materials[key] += amount);
}

function rewardText(reward) {
  const parts = [];
  if (reward.crystals) parts.push(`◆${formatNumber(reward.crystals)}`);
  if (reward.coins) parts.push(`●${formatNumber(reward.coins)}`);
  if (reward.stamina) parts.push(`ϟ${formatNumber(reward.stamina)}`);
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

function claimGuildSupply() {
  if (state.guild.supplyDay === localDayKey()) return showToast("本日の共同補給は受取済みです");
  const reward = { coins: 500, materials: { ore: 1, fiber: 1 } };
  state.guild.supplyDay = localDayKey();
  state.guild.lastActivity = "共同補給を受領 / 境鉄鉱・霊脈繊維";
  applyReward(reward);
  const levels = grantPlayerXp(5);
  saveState();
  updateUI();
  playCraftSound();
  vibrate([20, 25, 45]);
  showToast(`共同補給：${rewardText(reward)}${levels ? ` / PLAYER Lv.${state.player.level}` : ""}`);
}

function sendGuildMessage(message) {
  const input = document.querySelector("#guild-chat-input");
  const text = String(message ?? input.value).trim().slice(0, 40);
  if (!text) return showToast("メッセージを入力してください");
  const now = new Date();
  state.guild.chat.unshift({ id: `player-${Date.now()}`, author: state.profile.name, role: "YOU", commander: state.team[0], message: text, time: `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}` });
  state.guild.chat = state.guild.chat.slice(0, 6);
  input.value = "";
  saveState();
  renderGuild();
  playUISound();
  vibrate(15);
  showToast("ギルドチャットへ送信しました");
}

function requestRaidRescue() {
  if (state.guild.rescueDay === localDayKey()) return showToast("本日の救援要請は送信済みです");
  if (state.raid.bossHp <= 0) return showToast("ゴライアスは鎮圧済みです");
  const assistDamage = Math.min(2400, state.raid.bossHp);
  state.guild.rescueDay = localDayKey();
  state.guild.rescueDamage = assistDamage;
  state.raid.bossHp -= assistDamage;
  state.guild.actions.raid = (Number(state.guild.actions.raid) || 0) + assistDamage;
  state.guild.contribution += 10;
  state.guild.totalContribution += 10;
  state.guild.lastActivity = `団員3名のレイド救援 / ${formatNumber(assistDamage)}ダメージ・+10貢献`;
  const levels = grantPlayerXp(5);
  saveState();
  updateUI();
  playRevealSound("SR");
  vibrate([20, 30, 55]);
  showToast(`救援到着：${formatNumber(assistDamage)}ダメージ${levels ? ` / PLAYER Lv.${state.player.level}` : ""}`);
}

function getUnitProgress(id, currentState = state) {
  return { ...newProgress(), ...(currentState.progression[id] || {}) };
}

function getUnitEquipment(id, currentState = state) {
  return { ...newEquipment(), ...(currentState.equipment[id] || {}) };
}

function scaleStatsForLevel(baseAttack, baseDefense, level) {
  const step = Math.max(0, Math.min(49, Number(level) - 1));
  const baseTotal = baseAttack + baseDefense;
  const baseGain = Math.max(1, Math.round(baseTotal * .025));
  const accelerationGain = Math.max(1, Math.round(baseTotal * .004));
  const completedBands = Math.floor(step / 4);
  const remainder = step % 4;
  const accelerationSteps = 4 * completedBands * (completedBands - 1) / 2 + completedBands * remainder;
  const grownTotal = baseTotal + step * baseGain + accelerationSteps * accelerationGain;
  const attack = Math.round(grownTotal * baseAttack / baseTotal);
  return { attack, defense: grownTotal - attack };
}

function getUnitStats(id, currentState = state) {
  const commander = getCommander(id);
  const progress = getUnitProgress(id, currentState);
  const equipment = getUnitEquipment(id, currentState);
  let { attack, defense } = scaleStatsForLevel(commander.attack, commander.defense, progress.level);
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
    let { attack, defense } = scaleStatsForLevel(commander.attack, commander.defense, opponent.level);
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
  if (screenName === "event") renderEvent();
  playUISound();
}

function updateUI() {
  const dailyReset = ensureDailyReset();
  const guildReset = ensureGuildReset();
  const eventRaidReset = ensureEventRaidReset();
  const staminaRecovered = applyStaminaRecovery();
  if (dailyReset || guildReset || eventRaidReset || staminaRecovered) saveState();
  const stats = getSquadStats();
  state.troops = Math.min(state.troops, stats.capacity);
  document.querySelector("#stamina-value").textContent = `${state.stamina}/60`;
  document.querySelector("#stamina-timer").textContent = staminaClockText();
  document.querySelector("#crystal-value").textContent = formatNumber(state.crystals);
  document.querySelector("#coin-value").textContent = formatNumber(state.coins);
  document.querySelector("#pity-remaining").textContent = Math.max(0, 80 - state.pity);
  document.querySelector("#pity-bar").style.width = `${Math.min(100, state.pity / 80 * 100)}%`;
  document.querySelector("#troop-summary").textContent = `${state.troops} / ${stats.capacity}`;
  document.querySelector("#home-power").textContent = formatNumber(stats.power);
  document.querySelector("#home-profile-name").textContent = state.profile.name;
  document.querySelector("#squad-power").textContent = formatNumber(stats.power);
  document.querySelector("#player-level").textContent = String(state.player.level).padStart(2, "0");
  document.querySelector("#home-xp-bar").style.width = `${Math.min(100, state.player.xp / playerXpTarget() * 100)}%`;
  document.querySelector("#home-xp-text").textContent = `${formatNumber(state.player.xp)} / ${formatNumber(playerXpTarget())}`;
  const dailyComplete = dailyTasks.filter(task => (state.daily.counters[task.activity] || 0) >= task.goal).length;
  document.querySelector("#home-daily-progress").textContent = `${dailyComplete} / ${dailyTasks.length}`;
  document.querySelector("#home-login-state").textContent = state.daily.loginLastDay === localDayKey() ? "補給受取済" : "補給受取可";
  document.querySelector("#home-guild-contribution").textContent = `${formatNumber(state.guild.contribution)} 貢献`;
  document.querySelector("#home-event-points").textContent = `${formatNumber(state.event.points)} PT`;
  document.querySelector("#sound-toggle").checked = state.settings.sound;
  document.querySelector("#haptic-toggle").checked = state.settings.haptic;
  document.querySelector("#flash-toggle").checked = state.settings.reduceFlash;
  document.querySelector("#instant-toggle").checked = state.settings.instant;
  document.body.classList.toggle("reduced-flash", state.settings.reduceFlash);
  document.querySelector("#mission-team-mini").innerHTML = miniTeamMarkup();
  const clearCount = missions.filter(mission => (state.campaign.clears[mission.id] || 0) > 0).length;
  const nextMission = missions[Math.min(state.campaign.unlocked - 1, missions.length - 1)];
  document.querySelector("#home-next-mission").textContent = clearCount === missions.length ? "境界踏破 完了" : `${nextMission.stage} ${nextMission.title}`;
  document.querySelector("#home-campaign-progress").textContent = `${clearCount} / ${missions.length} CLEAR`;
  renderProfile();
  renderArtTestGallery();
  renderMissions();
  renderRaid();
  renderArena();
  renderDaily();
  renderGuild();
  renderEvent();
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
  const supply = document.querySelector("#guild-supply");
  const supplied = state.guild.supplyDay === localDayKey();
  supply.disabled = supplied;
  supply.innerHTML = supplied ? `<span>本日の共同補給 受取済み</span><b>✓</b>` : `<span>共同補給を受け取る</span><b>●500　⬡1　≋1</b>`;
  document.querySelector("#guild-supply-note").textContent = supplied ? "次回補給 00:00" : "団員の探索成果が到着しています";
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
  const player = { name: state.profile.name, role: "YOU", power: getArenaPlayerStats().power, contribution: state.guild.contribution, commander: state.team[0], isPlayer: true };
  const ranking = [...guildMembers, player].sort((a, b) => b.contribution - a.contribution);
  document.querySelector("#guild-ranking").innerHTML = ranking.map((member, index) => `<article class="guild-member${member.isPlayer ? " player" : ""}"><strong>${index + 1}</strong><div class="guild-member-avatar">${guildAvatarMarkup(member.commander)}</div><span><small>${member.role}${member.isPlayer ? " / CURRENT" : ""}</small><b>${escapeHtml(member.name)}</b><em>戦力 ${formatNumber(member.power)}</em></span><div><small>WEEKLY</small><b>${formatNumber(member.contribution)}</b></div></article>`).join("");
  const personalFeed = state.guild.lastActivity || "共同任務へ参加すると、ここに活動が表示されます";
  document.querySelector("#guild-feed").innerHTML = `<div class="guild-feed-row player"><i>NOW</i><span><b>${escapeHtml(state.profile.name)}</b><small>${personalFeed}</small></span></div><div class="guild-feed-row"><i>12分</i><span><b>白鷺ユラ</b><small>ゴライアスの境界核を破壊 / +60貢献</small></span></div><div class="guild-feed-row"><i>28分</i><span><b>雨森カイ</b><small>共同制圧任務へ参加 / +25貢献</small></span></div>`;
  const messages = [...state.guild.chat, ...guildChatSeed].slice(0, 8);
  document.querySelector("#guild-chat-list").innerHTML = messages.map(message => `<article class="guild-chat-message${message.role === "YOU" ? " player" : ""}"><div class="guild-chat-avatar">${guildAvatarMarkup(message.commander)}</div><div><span><b>${escapeHtml(message.author)}</b><small>${escapeHtml(message.role)} / ${escapeHtml(message.time)}</small></span><p>${escapeHtml(message.message)}</p></div></article>`).join("");
  document.querySelector("#guild-quick-messages").innerHTML = guildQuickMessages.map(item => `<button type="button" data-guild-quick="${escapeHtml(item.text)}"><i>${item.icon}</i><span>${escapeHtml(item.text)}</span></button>`).join("");
}

function getEventRaidPhase(hp = state.event.raid.bossHp) {
  const rate = hp / eventRaidBoss.maxHp;
  if (rate > .66) return { code: "PHASE 1", name: "祭礼起動", attackRate: 1 };
  if (rate > .33) return { code: "PHASE 2", name: "九尾展開", attackRate: 1.1 };
  return { code: "FINAL PHASE", name: "祈願核暴走", attackRate: 1.22 };
}

function eventRaidPartRewardText(reward) {
  const parts = [`祭札${reward.tokens}`, `+${reward.points} PT`];
  Object.entries(reward.materials || {}).forEach(([key, amount]) => parts.push(`${materials[key].icon}${amount}`));
  return parts.join("　");
}

function renderEvent() {
  const root = document.querySelector("#event-screen");
  if (!root) return;
  const maxPoints = eventPointRewards.at(-1).points;
  document.querySelector("#event-points").textContent = formatNumber(state.event.points);
  document.querySelector("#event-tokens").textContent = formatNumber(state.event.tokens);
  document.querySelector("#event-point-bar").style.width = `${Math.min(100, state.event.points / maxPoints * 100)}%`;
  document.querySelector("#event-story-list").innerHTML = eventStories.map((story, index) => {
    const read = state.event.storyRead.includes(story.id);
    return `<button type="button" class="event-story${read ? " read" : ""}" data-event-story="${story.id}"><i>${String(index + 1).padStart(2, "0")}</i><span><small>${story.episode}</small><b>${story.title}</b><em>${story.summary}</em></span><strong>${read ? "読了" : rewardText(story.reward)}</strong></button>`;
  }).join("");
  document.querySelector("#event-stage-list").innerHTML = eventStages.map((stage, index) => `<article class="event-stage glass-card"><div class="event-stage-art"><img src="${stage.art}" alt="${stage.enemy}"><b>${stage.stage}</b></div><div><small>${stage.zone}</small><h3>${stage.title}</h3><p>${stage.description}</p><span><i>推奨 ${stage.recommended}</i><i>ϟ${stage.stamina}</i><i>祭札 ${stage.token}</i></span><em>クリア ${state.event.clears[stage.id] || 0}回 / +${stage.points} PT</em></div><button type="button" data-event-stage="${index}" ${state.stamina < stage.stamina || state.troops <= 0 ? "disabled" : ""}><small>AUTO</small><b>出撃</b></button></article>`).join("");
  document.querySelector("#event-point-rewards").innerHTML = eventPointRewards.map(tier => {
    const current = Math.min(tier.points, state.event.points);
    const claimed = state.event.claimedRewards.includes(tier.id);
    const ready = current >= tier.points && !claimed;
    return `<article class="event-point-reward${ready ? " ready" : ""}${claimed ? " claimed" : ""}"><div><small>${formatNumber(tier.points)} PT</small><b>${tier.name}</b><span>${rewardText(tier.reward)}</span><u><i style="width:${current / tier.points * 100}%"></i></u></div><button type="button" data-event-reward="${tier.id}" ${ready ? "" : "disabled"}>${claimed ? "受取済" : ready ? "受取" : `${formatNumber(current)}/${formatNumber(tier.points)}`}</button></article>`;
  }).join("");
  document.querySelector("#event-exchange-list").innerHTML = eventExchangeItems.map(item => {
    const used = Number(state.event.exchange[item.id]) || 0;
    const remaining = Math.max(0, item.stock - used);
    const ready = remaining > 0 && state.event.tokens >= item.cost;
    return `<article class="event-exchange-item"><i>${item.icon}</i><div><small>残り ${remaining} / ${item.stock}</small><b>${item.name}</b><span>祭札 ${item.cost}</span></div><button type="button" data-event-exchange="${item.id}" ${ready ? "" : "disabled"}>${remaining ? "交換" : "完売"}</button></article>`;
  }).join("");
  const raid = state.event.raid;
  const phase = getEventRaidPhase();
  document.querySelector("#event-raid-boss-hp").textContent = `${formatNumber(raid.bossHp)} / ${formatNumber(eventRaidBoss.maxHp)}`;
  document.querySelector("#event-raid-boss-bar").style.width = `${Math.max(0, raid.bossHp / eventRaidBoss.maxHp * 100)}%`;
  document.querySelector("#event-raid-phase").textContent = `${phase.code} / ${phase.name}`;
  document.querySelector("#event-raid-attempts").textContent = `${raid.attempts} / 3`;
  document.querySelector("#event-raid-participants").textContent = formatNumber(8742 + raid.runs * 13);
  document.querySelector("#event-raid-damage").textContent = formatNumber(raid.personalDamage);
  document.querySelector("#event-raid-last").textContent = raid.lastDamage ? `前回 +${formatNumber(raid.lastDamage)}` : "未参加";
  document.querySelector("#event-raid-runs").textContent = `${raid.runs} 回`;
  document.querySelector("#event-raid-party").innerHTML = miniTeamMarkup();
  document.querySelector("#event-raid-part-list").innerHTML = Object.entries(eventRaidBoss.parts).map(([id, part]) => {
    const status = raid.parts[id];
    const active = raid.target === id && !status.broken;
    const rate = Math.max(0, status.hp / part.maxHp * 100);
    return `<button type="button" class="event-raid-part${active ? " active" : ""}${status.broken ? " broken" : ""}" data-event-raid-target="${id}" ${status.broken ? "disabled" : ""}><i>${part.icon}</i><span><small>${status.broken ? "BREAK" : active ? "AUTO TARGET" : "TARGET"}</small><b>${part.name}</b><em>${part.effect}</em><u><s style="width:${rate}%"></s></u></span><strong>${status.broken ? "破壊済" : `${formatNumber(status.hp)} / ${formatNumber(part.maxHp)}`}</strong></button>`;
  }).join("");
  document.querySelector("#event-raid-reward-list").innerHTML = eventRaidRewardTiers.map(tier => {
    const current = Math.min(tier.damage, raid.personalDamage);
    const claimed = raid.claimedRewards.includes(tier.id);
    const ready = current >= tier.damage && !claimed;
    return `<article class="event-raid-reward${ready ? " ready" : ""}${claimed ? " claimed" : ""}"><div><small>TOTAL ${formatNumber(tier.damage)} DMG</small><b>${tier.name}</b><span>${rewardText(tier.reward)}</span><u><i style="width:${current / tier.damage * 100}%"></i></u></div><button type="button" data-event-raid-reward="${tier.id}" ${ready ? "" : "disabled"}>${claimed ? "受取済" : ready ? "受取" : `${formatNumber(current)}/${formatNumber(tier.damage)}`}</button></article>`;
  }).join("");
  const raidPlayer = { name: state.profile.name, role: "YOU", commander: state.team[0], damage: raid.personalDamage, isPlayer: true };
  const ranking = [...eventRaidMembers, raidPlayer].sort((a, b) => b.damage - a.damage);
  document.querySelector("#event-raid-ranking").innerHTML = ranking.map((member, index) => `<article class="event-raid-rank${member.isPlayer ? " player" : ""}"><strong>${index + 1}</strong><div class="guild-member-avatar">${guildAvatarMarkup(member.commander)}</div><span><small>${member.role}${member.isPlayer ? " / CURRENT" : ""}</small><b>${escapeHtml(member.name)}</b></span><div><small>DAMAGE</small><b>${formatNumber(member.damage)}</b></div></article>`).join("");
  const start = document.querySelector("#event-raid-start");
  start.disabled = raid.attempts <= 0 || raid.bossHp <= 0 || state.troops <= 0;
  start.innerHTML = raid.bossHp <= 0 ? `<span>祭禍鎮圧完了</span><b>✓</b>` : raid.attempts <= 0 ? `<span>本日の共鳴終了</span><b>0 / 3</b>` : `<span>5人オートで共鳴</span><b>挑戦 ${raid.attempts}</b>`;
  const supported = raid.supportDay === localDayKey();
  const support = document.querySelector("#event-raid-support");
  support.disabled = supported || raid.bossHp <= 0;
  support.innerHTML = raid.bossHp <= 0 ? `<span>支援不要・鎮圧済み</span><b>✓</b>` : supported ? `<span>団員支援 到着済み</span><b>-${formatNumber(raid.supportDamage)} HP</b>` : `<span>団員3名へ支援要請</span><b>1日1回</b>`;
  document.querySelector("#event-raid-support-note").textContent = supported ? "白鷺ユラ・黒鉄ジン・霞坂ユノが共鳴" : "支援で全体HPを減少 / 個人ダメージには非加算";
}

function showEventStory(id) {
  const story = eventStories.find(item => item.id === id);
  if (!story) return;
  const firstRead = !state.event.storyRead.includes(id);
  if (firstRead) {
    state.event.storyRead.push(id);
    applyReward(story.reward);
    grantPlayerXp(5);
    saveState();
    updateUI();
  }
  document.querySelector("#dialog-content").innerHTML = `<div class="dialog-body event-story-dialog"><small>${story.episode}</small><h2>${story.title}</h2>${story.body.map(paragraph => `<p>${paragraph}</p>`).join("")}<div><span>${firstRead ? "初回読了報酬" : "READ COMPLETE"}</span><b>${firstRead ? rewardText(story.reward) : "✓ 読了済み"}</b></div></div>`;
  document.querySelector("#info-dialog").showModal();
  playUISound();
  if (firstRead) showToast(`${story.title}：${rewardText(story.reward)}`);
}

function claimEventPointReward(id) {
  const tier = eventPointRewards.find(item => item.id === id);
  if (!tier || state.event.points < tier.points || state.event.claimedRewards.includes(id)) return;
  state.event.claimedRewards.push(id);
  applyReward(tier.reward);
  saveState();
  updateUI();
  playRevealSound("SSR");
  vibrate([20, 30, 65]);
  showToast(`${tier.name}：${rewardText(tier.reward)}`);
}

function exchangeEventItem(id) {
  const item = eventExchangeItems.find(entry => entry.id === id);
  if (!item) return;
  const used = Number(state.event.exchange[id]) || 0;
  if (used >= item.stock || state.event.tokens < item.cost) return;
  state.event.tokens -= item.cost;
  state.event.exchange[id] = used + 1;
  applyReward(item.reward);
  saveState();
  updateUI();
  playCraftSound();
  vibrate([20, 25, 45]);
  showToast(`${item.name}を交換しました`);
}

function selectEventRaidTarget(id) {
  if (!eventRaidBoss.parts[id] || state.event.raid.parts[id].broken) return;
  state.event.raid.target = id;
  saveState();
  renderEvent();
  playUISound();
  showToast(`${eventRaidBoss.parts[id].name}を優先攻撃します`);
}

function claimEventRaidReward(id) {
  const tier = eventRaidRewardTiers.find(item => item.id === id);
  if (!tier || state.event.raid.personalDamage < tier.damage || state.event.raid.claimedRewards.includes(id)) return;
  state.event.raid.claimedRewards.push(id);
  applyReward(tier.reward);
  saveState();
  updateUI();
  playRevealSound("SSR");
  vibrate([20, 35, 65]);
  showToast(`${tier.name}：${rewardText(tier.reward)}`);
}

function requestEventRaidSupport() {
  const raid = state.event.raid;
  if (raid.supportDay === localDayKey()) return showToast("本日の団員支援は到着済みです");
  if (raid.bossHp <= 0) return showToast("ヨルカグラは鎮圧済みです");
  const damage = Math.min(raid.bossHp, 8600);
  raid.bossHp -= damage;
  raid.supportDay = localDayKey();
  raid.supportDamage = damage;
  state.event.points += 50;
  state.event.tokens += 20;
  recordGuildActivity("raid", damage);
  grantPlayerXp(10);
  saveState();
  updateUI();
  playRevealSound("SR");
  vibrate([20, 30, 50]);
  showToast(`団員支援 -${formatNumber(damage)} HP / 祭札+20 / +50 PT`);
}

function renderProfile() {
  const stats = getSquadStats();
  const clearCount = missions.filter(mission => (state.campaign.clears[mission.id] || 0) > 0).length;
  document.querySelector("#profile-player-id").textContent = state.profile.id;
  document.querySelector("#profile-player-name").textContent = state.profile.name;
  document.querySelector("#profile-player-level").textContent = state.player.level;
  document.querySelector("#profile-player-power").textContent = formatNumber(stats.power);
  document.querySelector("#profile-owned-count").textContent = `${Object.keys(state.owned).length} / ${commanders.length}`;
  document.querySelector("#profile-mission-count").textContent = `${clearCount} / ${missions.length}`;
  document.querySelector("#profile-battle-count").textContent = formatNumber(state.lifetime.battles);
  document.querySelector("#profile-draw-count").textContent = formatNumber(state.lifetime.draws);
  const input = document.querySelector("#profile-name-input");
  if (document.activeElement !== input) input.value = state.profile.name;
}

function renderArtTestGallery() {
  const root = document.querySelector("#art-test-gallery");
  if (!root) return;
  root.innerHTML = ["shion", "hotaru", "gendo", "nagi", "kohaku", "ren", "sana", "kagari", "ao", "suzune", "tsuzuri", "matoi", "ibuki"].map(id => {
    const commander = getCommander(id);
    return `<button type="button" class="art-test-card" data-art-preview="${id}"><span><img loading="lazy" src="${commander.art}" alt="${commander.name} 全身イラスト"></span><small>${commander.rarity} / ${commander.role}</small><strong>${commander.name}</strong><em>${commander.title}</em></button>`;
  }).join("");
}

function showArtPreview(id) {
  const commander = getCommander(id);
  if (!commander) return;
  const unit = getUnitStats(id);
  document.querySelector("#dialog-content").innerHTML = `<div class="art-preview-dialog"><img src="${commander.art}" alt="${commander.name} 全身イラスト"><div><span class="rarity ${commander.rarity.toLowerCase()}">${commander.rarity}</span><small>${commander.role}</small><h2>${commander.title}<br>${commander.name}</h2><p>${commander.skill.name} Lv.${unit.skillLevel}<br>${commander.skill.detail}</p><p>${commander.passive.name} Lv.${unit.passiveLevel}<br>${commander.passive.detail}</p><em>攻撃 ${unit.attack} / 防御 ${unit.defense}</em></div></div>`;
  document.querySelector("#info-dialog").showModal();
}

function getEnemyArchive() {
  return [...new Map(missions.map(mission => [mission.art, mission])).values()];
}

function showEnemyPreview(index) {
  const mission = getEnemyArchive()[index];
  if (!mission) return;
  document.querySelector("#dialog-content").innerHTML = `<div class="enemy-preview-dialog"><img src="${mission.art}" alt="${mission.enemy}"><div><span>ENEMY ARCHIVE / CH.${mission.chapter}</span><small>${mission.zone}</small><h2>${mission.enemy}</h2><p>${mission.description}</p><em>初出任務 ${mission.stage}「${mission.title}」</em><b>攻撃 ${formatNumber(mission.enemyAttack)} / 防御 ${formatNumber(mission.enemyDefense)}</b></div></div>`;
  document.querySelector("#info-dialog").showModal();
}

function renderMissions() {
  const clearCount = missions.filter(mission => (state.campaign.clears[mission.id] || 0) > 0).length;
  const nextMission = missions[Math.min(state.campaign.unlocked - 1, missions.length - 1)];
  document.querySelector("#campaign-progress-text").textContent = `${clearCount} / ${missions.length} CLEAR`;
  document.querySelector("#campaign-progress-bar").style.width = `${clearCount / missions.length * 100}%`;
  document.querySelector("#campaign-chapter").textContent = `CHAPTER ${String(nextMission.chapter).padStart(2, "0")}`;
  document.querySelector("#mission-list").innerHTML = missions.map((mission, index) => {
    const locked = index >= state.campaign.unlocked;
    const clears = Number(state.campaign.clears[mission.id]) || 0;
    const firstClaimed = state.campaign.firstRewards.includes(mission.id);
    const dropNames = Object.keys(mission.drops).map(key => materials[key].name).join("・");
    const firstReward = firstClaimed ? "初回報酬 受取済" : `初回 ${rewardText(mission.firstReward)}`;
    return `<article class="mission-card vivid-card has-image${locked ? " locked" : ""}${clears ? " cleared" : ""}">
      <div class="mission-thumb"><img loading="lazy" src="${mission.art}" alt="${mission.enemy}"><b>${mission.stage}</b>${locked ? "<i>LOCK</i>" : clears ? "<i>CLEAR</i>" : ""}</div>
      <div class="mission-body"><div class="mission-main"><span>CH.${mission.chapter} / ${mission.zone}</span><h3>${mission.title}</h3><p>${mission.description}</p><div class="mission-drops"><i>推奨 ${mission.recommended}</i><i>ϟ ${mission.stamina}</i><i>${dropNames}</i><i class="first-reward">${firstReward}</i>${clears ? `<i>${clears}回踏破</i>` : ""}</div></div><button type="button" class="sortie-button" data-mission="${index}" ${locked ? "disabled" : ""}>${locked ? "封鎖" : "出撃"}</button></div>
    </article>`;
  }).join("");
  const archiveRoot = document.querySelector("#enemy-archive-grid");
  if (archiveRoot) archiveRoot.innerHTML = getEnemyArchive().map((mission, index) => `<button type="button" class="enemy-archive-card" data-enemy-preview="${index}"><span><img loading="lazy" src="${mission.art}" alt="${mission.enemy}"><i>CH.${mission.chapter}</i></span><small>${mission.zone}</small><strong>${mission.enemy}</strong><em>${mission.stage} ${mission.title}</em></button>`).join("");
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
  const rescued = state.guild.rescueDay === localDayKey();
  const rescue = document.querySelector("#raid-rescue");
  rescue.disabled = rescued || raid.bossHp <= 0;
  rescue.innerHTML = raid.bossHp <= 0 ? `<span>救援不要・鎮圧済み</span><b>✓</b>` : rescued ? `<span>救援到着済み</span><b>-${formatNumber(state.guild.rescueDamage)} HP</b>` : `<span>ギルドへ救援要請</span><b>1日1回</b>`;
  document.querySelector("#raid-rescue-status").textContent = rescued ? "白鷺ユラ・黒鉄ジン・霞坂ユノが応答" : "団員3名が待機中 / 個人ダメージには加算されません";
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
  const raidPlayer = { name: state.profile.name, role: "YOU", commander: state.team[0], damage: raid.personalDamage, isPlayer: true };
  const raidRanking = [...guildRaidMembers, raidPlayer].sort((a, b) => b.damage - a.damage);
  document.querySelector("#raid-guild-ranking").innerHTML = raidRanking.map((member, index) => `<article class="raid-guild-rank${member.isPlayer ? " player" : ""}"><strong>${index + 1}</strong><div class="guild-member-avatar">${guildAvatarMarkup(member.commander)}</div><span><small>${member.role}${member.isPlayer ? " / CURRENT" : ""}</small><b>${escapeHtml(member.name)}</b></span><div><small>DAMAGE</small><b>${formatNumber(member.damage)}</b></div></article>`).join("");
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
    return `<article class="unit-card glass-card${inTeam ? " in-team" : ""}" data-unit="${commander.id}"><div class="unit-art" style="background:linear-gradient(145deg,${commander.colors.join(",")})">${art}<button type="button" data-open-training="${commander.id}" aria-label="${commander.name}を育成">Lv.${unit.level} 育成›</button></div><div class="unit-copy"><span><i class="rarity ${commander.rarity.toLowerCase()}">${commander.rarity}</i>${inTeam ? `<em class="formation-tag">編成中 ${state.team.indexOf(commander.id) + 1}</em>` : ""}</span><strong>${commander.title} ${commander.name}</strong><small>${commander.role} / 記憶片 ${state.owned[commander.id]?.shards || 0}</small><div class="unit-abilities"><button type="button" data-ability-detail="skill" data-commander="${commander.id}">S${unit.skillLevel} ${commander.skill.name}</button><button type="button" data-ability-detail="passive" data-commander="${commander.id}">P${unit.passiveLevel} ${commander.passive.name}</button><i>装 ${unit.equipment.weapon}/${unit.equipment.armor}/${unit.equipment.accessory}</i></div></div><div class="unit-stats"><small>攻撃</small><b>${unit.attack}</b><small>防御</small><b>${unit.defense}</b></div></article>`;
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

function materialIconMarkup(key, alt = "") {
  const material = materials[key];
  return `<img src="${material.art}" alt="${alt}" loading="lazy">`;
}

function costMarkup(cost) {
  return `${Object.entries(cost.materials).map(([key, amount]) => `<i class="${state.materials[key] >= amount ? "ready" : ""}">${materialIconMarkup(key)}<span>${state.materials[key]}/${amount}</span></i>`).join("")}<i class="${state.coins >= cost.coins ? "ready" : ""}">● ${formatNumber(cost.coins)}</i>`;
}

function getRecipeUpgradeCost(recipe, currentLevel) {
  return {
    materials: Object.fromEntries(Object.entries(recipe.costs).map(([key, amount]) => [key, amount + Math.ceil(amount * currentLevel * .45)])),
    coins: Math.round(recipe.coins * (1 + currentLevel * .6))
  };
}

function projectedLevelGain(id) {
  const progress = getUnitProgress(id);
  const current = getUnitStats(id);
  if (progress.level >= 50) return { current: current.attack + current.defense, next: current.attack + current.defense, gain: 0 };
  const previewState = { ...state, progression: { ...state.progression, [id]: { ...progress, level: progress.level + 1 } } };
  const next = getUnitStats(id, previewState);
  return { current: current.attack + current.defense, next: next.attack + next.defense, gain: next.attack + next.defense - current.attack - current.defense };
}

function renderGrowthRow(kind, eyebrow, title, detail, current, cost) {
  const maxed = current >= cost.max;
  const payable = canPay(cost);
  const gain = kind === "level" ? projectedLevelGain(workshopUnitId) : null;
  const detailControl = kind === "level"
    ? `<span class="growth-gain">${maxed ? "最大Lv到達" : `次回 戦力 +${formatNumber(gain.gain)} / ${formatNumber(gain.next)}`}</span>`
    : `<button type="button" class="growth-info" data-ability-detail="${kind}" data-commander="${workshopUnitId}">効果を確認</button>`;
  return `<article class="growth-row${payable ? " payable" : " needs-material"}"><div class="growth-level"><small>${eyebrow}</small><b>Lv.${current}</b><i>/ ${cost.max}</i></div><div class="growth-copy"><div class="growth-title"><h3>${title}</h3>${detailControl}</div><p>${detail}</p><div class="recipe-cost">${costMarkup(cost)}</div></div><button type="button" class="upgrade-button" data-upgrade="${kind}" ${maxed ? "disabled" : ""}>${maxed ? "MAX" : kind === "level" ? "Lv.UP" : "強化"}</button></article>`;
}

function renderWorkshop() {
  if (!state.owned[workshopUnitId]) workshopUnitId = state.team[0] || Object.keys(state.owned)[0];
  const commander = getCommander(workshopUnitId);
  const progress = getUnitProgress(workshopUnitId);
  const equipment = getUnitEquipment(workshopUnitId);
  document.querySelector("#workshop-unit-label").textContent = commander.name;
  document.querySelector("#material-wallet").innerHTML = Object.entries(materials).map(([key, material]) => `<div class="material-item" style="--material:${material.color}"><i>${materialIconMarkup(key)}</i><span><small>${material.name}</small></span><b>${state.materials[key]}</b></div>`).join("");
  document.querySelector("#workshop-unit-tabs").innerHTML = Object.keys(state.owned).map(getCommander).filter(Boolean).sort((a, b) => rarityRank[b.rarity] - rarityRank[a.rarity]).map(unit => `<button type="button" class="workshop-unit-chip${unit.id === workshopUnitId ? " active" : ""}" data-workshop-unit="${unit.id}">${unit.art ? `<img src="${unit.art}" alt="">` : `<i style="background:linear-gradient(145deg,${unit.colors.join(",")})">${unit.symbol}</i>`}<span><b>${unit.name}</b><small>Lv.${getUnitProgress(unit.id).level}</small></span></button>`).join("");
  document.querySelector("#training-panel").innerHTML = `<div class="training-hero"><div class="training-portrait" style="background:linear-gradient(145deg,${commander.colors.join(",")})">${commander.art ? `<img src="${commander.art}" alt="${commander.name}">` : `<i>${commander.symbol}</i>`}</div><div><span class="rarity ${commander.rarity.toLowerCase()}">${commander.rarity}</span><h3>${commander.title}<br>${commander.name}</h3><p>${commander.role} / Lvが高いほど成長量アップ</p></div><b>戦力 ${formatNumber(getUnitStats(commander.id).attack + getUnitStats(commander.id).defense)}</b></div>${renderGrowthRow("level", "CHARACTER", "キャラクターLv", "攻撃・防御の伸び幅がLvごとに加速", progress.level, getUpgradeCost("level", progress))}${renderGrowthRow("skill", "ACTIVE SKILL", commander.skill.name, commander.skill.detail, progress.skillLevel, getUpgradeCost("skill", progress))}${renderGrowthRow("passive", "PASSIVE SKILL", commander.passive.name, commander.passive.detail, progress.passiveLevel, getUpgradeCost("passive", progress))}`;
  document.querySelector("#expedition-list").innerHTML = expeditions.map((expedition, index) => `<article class="expedition-card" style="--expedition-bg:${expedition.background}"><small>${expedition.code}</small><h3>${expedition.name}</h3><p>${expedition.detail}</p><div class="drop-chips">${Object.keys(expedition.drops).map(key => `<i>${materialIconMarkup(key)}<span>${materials[key].name}</span></i>`).join("")}</div><button type="button" data-expedition="${index}" ${state.stamina < 3 ? "disabled" : ""}>探索 ϟ3</button></article>`).join("");
  document.querySelector("#recipe-list").innerHTML = recipes.map(recipe => {
    const level = equipment[recipe.slot];
    const maxed = level >= recipe.max;
    const upgradeCost = getRecipeUpgradeCost(recipe, level);
    const materialReady = Object.entries(upgradeCost.materials).every(([key, amount]) => state.materials[key] >= amount);
    const ready = !maxed && materialReady && state.coins >= upgradeCost.coins;
    const costs = Object.entries(upgradeCost.materials).map(([key, amount]) => `<i class="${state.materials[key] >= amount ? "ready" : ""}">${materialIconMarkup(key)}<span>${state.materials[key]}/${amount}</span></i>`).join("");
    return `<article class="recipe-card${ready ? " ready" : ""}${maxed ? " maxed" : ""}" data-recipe-preview="${recipe.id}"><div class="recipe-icon"><img src="${recipe.art}" alt="${recipe.name}" loading="lazy"></div><div class="recipe-copy"><small>${recipe.type.toUpperCase()}</small><h3>${recipe.name} <b>Lv.${level}</b></h3><p>${recipe.effect}</p><div class="recipe-cost">${costs}<i class="${state.coins >= upgradeCost.coins ? "ready" : ""}">● ${formatNumber(upgradeCost.coins)}</i></div></div><button type="button" data-recipe-preview="${recipe.id}">${maxed ? "MAX" : "確認"}</button></article>`;
  }).join("");
}

function openTraining(id) {
  if (!state.owned[id]) return;
  const dialog = document.querySelector("#info-dialog");
  if (dialog.open) dialog.close();
  workshopUnitId = id;
  navigateTo("workshop");
  renderWorkshop();
}

function showAbilityDetail(commanderId, kind) {
  const commander = getCommander(commanderId);
  if (!commander || !state.owned[commanderId]) return;
  const unit = getUnitStats(commanderId);
  const active = kind === "skill";
  const ability = active ? commander.skill : commander.passive;
  const level = active ? unit.skillLevel : unit.passiveLevel;
  const cost = getUpgradeCost(active ? "skill" : "passive", getUnitProgress(commanderId));
  const statLabel = commander.passive.stat === "both" ? "攻撃・防御" : commander.passive.stat === "attack" ? "攻撃" : "防御";
  const currentEffect = active ? `スキル威力 +${(level - 1) * 6}%` : `${statLabel} +${(2 + (level - 1) * 1.2).toFixed(1)}%`;
  const nextEffect = level >= cost.max ? "最大Lv到達" : active ? `次Lv：スキル威力 +${level * 6}%` : `次Lv：${statLabel} +${(2 + level * 1.2).toFixed(1)}%`;
  const dialog = document.querySelector("#info-dialog");
  if (dialog.open) dialog.close();
  document.querySelector("#dialog-content").innerHTML = `<div class="ability-dialog"><div class="ability-dialog-head">${commander.art ? `<img src="${commander.art}" alt="${commander.name}">` : `<i style="background:linear-gradient(145deg,${commander.colors.join(",")})">${commander.symbol}</i>`}<span><small>${active ? "ACTIVE SKILL" : "PASSIVE SKILL"}</small><h2>${ability.name}</h2><em>${commander.name} / Lv.${level}</em></span></div><p>${ability.detail}</p><div class="ability-effect"><span><small>現在の効果</small><strong>${currentEffect}</strong></span><b>→</b><span><small>強化後</small><strong>${nextEffect}</strong></span></div><div class="ability-cost"><small>次回強化素材</small><div class="recipe-cost">${level >= cost.max ? "<i class=\"ready\">MAX</i>" : costMarkup(cost)}</div></div><button type="button" class="primary-button" data-open-training="${commanderId}">このキャラを育成</button></div>`;
  dialog.showModal();
}

function showRecipeConfirmation(id) {
  const recipe = recipes.find(item => item.id === id);
  const commander = getCommander(workshopUnitId);
  const equipment = getUnitEquipment(workshopUnitId);
  if (!recipe || !commander) return;
  const level = equipment[recipe.slot];
  const maxed = level >= recipe.max;
  const upgradeCost = getRecipeUpgradeCost(recipe, level);
  const materialRows = Object.entries(upgradeCost.materials).map(([key, amount]) => {
    const enough = state.materials[key] >= amount;
    return `<div class="craft-material-row ${enough ? "ready" : "missing"}"><i style="--material:${materials[key].color}">${materialIconMarkup(key)}</i><span><small>${materials[key].name}</small><b>所持 ${state.materials[key]} / 必要 ${amount}</b></span><strong>${enough ? "OK" : `不足 ${amount - state.materials[key]}`}</strong></div>`;
  }).join("");
  const coinReady = state.coins >= upgradeCost.coins;
  const canCraft = !maxed && coinReady && Object.entries(upgradeCost.materials).every(([key, amount]) => state.materials[key] >= amount);
  const dialog = document.querySelector("#info-dialog");
  if (dialog.open) dialog.close();
  document.querySelector("#dialog-content").innerHTML = `<div class="craft-confirm-dialog"><div class="craft-confirm-head"><img src="${recipe.art}" alt="${recipe.name}"><span><small>PERSONAL GEAR / ${recipe.type}</small><h2>${recipe.name}</h2><p>${commander.name}専用装備　Lv.${level} → ${Math.min(recipe.max, level + 1)}</p><em>${recipe.effect}</em></span></div><div class="craft-material-list"><b>必要な資材</b>${materialRows}<div class="craft-material-row ${coinReady ? "ready" : "missing"}"><i class="coin-material">●</i><span><small>生成費用</small><b>所持 ${formatNumber(state.coins)} / 必要 ${formatNumber(upgradeCost.coins)}</b></span><strong>${coinReady ? "OK" : `不足 ${formatNumber(upgradeCost.coins - state.coins)}`}</strong></div></div><div class="craft-confirm-actions"><button type="button" class="secondary-button" data-dialog-close>戻る</button><button type="button" class="primary-button" data-confirm-recipe="${recipe.id}" ${canCraft ? "" : "disabled"}>${maxed ? "最大強化済み" : canCraft ? "この内容で生成" : "素材不足"}</button></div></div>`;
  dialog.showModal();
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
  if (!recipe || equipment[recipe.slot] >= recipe.max) return false;
  const upgradeCost = getRecipeUpgradeCost(recipe, equipment[recipe.slot]);
  const canCraft = Object.entries(upgradeCost.materials).every(([key, amount]) => state.materials[key] >= amount) && state.coins >= upgradeCost.coins;
  if (!canCraft) { showToast("生成素材が不足しています"); return false; }
  Object.entries(upgradeCost.materials).forEach(([key, amount]) => state.materials[key] -= amount);
  state.coins -= upgradeCost.coins;
  state.equipment[workshopUnitId] ||= newEquipment();
  state.equipment[workshopUnitId][recipe.slot] += 1;
  const levels = grantPlayerXp(10);
  recordGuildActivity("craft");
  saveState();
  updateUI();
  playCraftSound();
  vibrate([25, 30, 65]);
  showToast(`${getCommander(workshopUnitId).name}：${recipe.name} Lv.${state.equipment[workshopUnitId][recipe.slot]}${levels ? ` / PLAYER Lv.${state.player.level}` : ""}`);
  const dialog = document.querySelector("#info-dialog");
  if (dialog.open) dialog.close();
  return true;
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
  if (!canPay(cost)) {
    const missing = Object.entries(cost.materials).filter(([material, amount]) => state.materials[material] < amount).map(([material, amount]) => `${materials[material].name}×${amount - state.materials[material]}`);
    if (state.coins < cost.coins) missing.push(`コイン×${formatNumber(cost.coins - state.coins)}`);
    return showToast(`不足：${missing.join(" / ")}`);
  }
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
  state.lifetime.draws += count;
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
  const raidMode = report.mode === "raid" || report.mode === "event-raid";
  overlay.classList.add("active");
  overlay.setAttribute("aria-hidden", "false");
  document.querySelector("#battle-title").textContent = title;
  document.querySelector("#enemy-name").textContent = enemyName;
  document.querySelector("#battle-enemy-image").src = art;
  document.querySelector("#battle-enemy-image").alt = enemyName;
  document.querySelector("#battle-team-mini").innerHTML = getSquadStats().members.map(member => `<span>${member.art ? `<img src="${member.art}" alt="">` : `<i style="background:linear-gradient(145deg,${member.colors.join(",")})">${member.symbol}</i>`}<b>${member.name}<small> S${member.skillLevel}</small></b></span>`).join("");
  document.querySelector("#ally-bar-label").textContent = report.mode === "arena" ? "自軍耐久" : raidMode ? "部隊兵力" : "味方兵力";
  document.querySelector("#enemy-bar-label").textContent = report.mode === "arena" ? "相手耐久" : raidMode ? "BOSS HP" : "敵兵力";
  document.querySelector("#battle-log").innerHTML = "";
  document.querySelector("#battle-result").classList.add("hidden");
  document.querySelector("#replenish-button").classList.toggle("hidden", report.mode === "arena");
  document.querySelector("#battle-skip").classList.remove("hidden");
  updateBattleBars(report.allyStart, report.allyStart, report.enemyStart, report.enemyStart, report.mode);
  battleRun = { report, index: 0, timer: null };
  playSortieSound();
  pulseBattle("sortie-pulse");
  appendNextBattleLog();
}

function startBattle(missionIndex) {
  const mission = missions[missionIndex];
  if (!mission || missionIndex >= state.campaign.unlocked) return showToast("前の任務をクリアすると解放されます");
  if (state.stamina < mission.stamina) return showToast("スタミナが不足しています");
  if (state.troops <= 0) return showToast("兵を補充してから出撃してください");
  const report = simulateBattle(mission);
  state.stamina -= mission.stamina;
  state.staminaUpdatedAt = Date.now();
  state.troops = report.allyRemaining;
  state.coins += report.reward;
  state.lifetime.battles += 1;
  if (report.won) {
    Object.entries(mission.drops).forEach(([key, amount]) => state.materials[key] += amount);
    state.campaign.clears[mission.id] = (Number(state.campaign.clears[mission.id]) || 0) + 1;
    state.campaign.unlocked = Math.max(state.campaign.unlocked, Math.min(missions.length, missionIndex + 2));
    state.lifetime.missionWins += 1;
    if (!state.campaign.firstRewards.includes(mission.id)) {
      state.campaign.firstRewards.push(mission.id);
      applyReward(mission.firstReward);
      report.firstClear = rewardText(mission.firstReward);
    }
  }
  report.levelsGained = recordDailyActivity(report.won ? "mission" : "", report.won ? 25 : 8);
  if (report.won) recordGuildActivity("mission");
  report.playerLevel = state.player.level;
  saveState();
  updateUI();
  openBattleReport(report, mission.title, mission.enemy, mission.art);
}

function startEventBattle(stageIndex) {
  const stage = eventStages[stageIndex];
  if (!stage) return;
  if (state.stamina < stage.stamina) return showToast("スタミナが不足しています");
  if (state.troops <= 0) return showToast("兵を補充してから出撃してください");
  const report = simulateBattle(stage);
  report.mode = "event";
  report.eventStage = stage;
  state.stamina -= stage.stamina;
  state.staminaUpdatedAt = Date.now();
  state.lifetime.battles += 1;
  state.troops = report.allyRemaining;
  state.coins += report.reward;
  if (report.won) {
    state.event.points += stage.points;
    state.event.tokens += stage.token;
    state.event.clears[stage.id] = (Number(state.event.clears[stage.id]) || 0) + 1;
    report.eventPoints = stage.points;
    report.eventTokens = stage.token;
    state.lifetime.missionWins += 1;
  }
  report.levelsGained = recordDailyActivity(report.won ? "mission" : "", report.won ? 25 : 8);
  if (report.won) recordGuildActivity("mission");
  report.playerLevel = state.player.level;
  saveState();
  updateUI();
  openBattleReport(report, `限定任務 ${stage.title}`, stage.enemy, stage.art);
}

function simulateEventRaid() {
  const stats = getSquadStats();
  const raid = state.event.raid;
  let ally = state.troops;
  let enemy = raid.bossHp;
  const allyStart = ally;
  const enemyStart = enemy;
  const parts = Object.fromEntries(Object.entries(raid.parts).map(([id, value]) => [id, { ...value }]));
  let targetId = parts[raid.target] && !parts[raid.target].broken ? raid.target : Object.keys(parts).find(id => !parts[id].broken);
  const newBreaks = [];
  let currentPhase = getEventRaidPhase(enemy);
  const logs = [{ round: 0, actor: "PASSIVE", text: `${stats.members.map(member => `${member.name}「${member.passive.name}」Lv.${member.passiveLevel}`).join(" / ")}。優先部位：${targetId ? eventRaidBoss.parts[targetId].name : "本体"} / ${currentPhase.name}`, critical: false, ally, enemy }];
  const supportRate = Math.min(.3, stats.members.filter(member => member.role === "支援" || member.role === "防御").reduce((sum, member) => sum + .026 + member.passiveLevel * .006, 0));
  let totalDamage = 0;
  let round = 0;
  while (round < 10 && ally > 0 && enemy > 0) {
    round += 1;
    const commander = stats.members[(round - 1) % stats.members.length];
    const roleBonus = commander.role === "攻撃" || commander.role === "遊撃" ? 1.18 : commander.role === "万能" ? 1.1 : 1;
    const skillBonus = 1 + (commander.skillLevel - 1) * .065;
    const maskBonus = parts.mask.broken ? 1.2 : 1;
    const critical = Math.random() < (.15 + rarityRank[commander.rarity] * .025);
    const raw = Math.max(110, (stats.attack * 1.38 + ally * 3.2 - eventRaidBoss.defense * .23) * .25 * roleBonus * skillBonus * maskBonus);
    const damage = Math.min(enemy, Math.floor(raw * (.93 + Math.random() * .17) * (critical ? 1.58 : 1)));
    enemy -= damage;
    totalDamage += damage;
    const targetName = targetId ? eventRaidBoss.parts[targetId].name : "本体";
    logs.push({ round, actor: commander.name, text: `${commander.skill.name} Lv.${commander.skillLevel}。${targetName}へ${formatNumber(damage)}ダメージ。${critical ? "祭礼共鳴！" : ""}`, critical, ally, enemy });
    if (targetId && !parts[targetId].broken) {
      const partDamage = Math.min(parts[targetId].hp, Math.max(1, Math.floor(damage * .74)));
      parts[targetId].hp -= partDamage;
      if (parts[targetId].hp <= 0) {
        parts[targetId].hp = 0;
        parts[targetId].broken = true;
        newBreaks.push(targetId);
        logs.push({ round, actor: "BREAK", text: `${eventRaidBoss.parts[targetId].name}を破壊。${eventRaidBoss.parts[targetId].effect}`, critical: true, ally, enemy });
        targetId = Object.keys(parts).find(id => !parts[id].broken);
      }
    }
    const nextPhase = getEventRaidPhase(enemy);
    if (nextPhase.code !== currentPhase.code) {
      currentPhase = nextPhase;
      logs.push({ round, actor: "PHASE", text: `${currentPhase.code}「${currentPhase.name}」へ移行。祭禍出力が上昇。`, critical: true, ally, enemy });
    }
    if (enemy <= 0) break;
    const tailsRate = parts.tails.broken ? .82 : 1;
    const counter = Math.max(26, Math.floor((eventRaidBoss.attack * tailsRate * currentPhase.attackRate - stats.defense * .35) * (.9 + Math.random() * .2) * .15 * (1 - supportRate)));
    const allyLoss = Math.min(ally, Math.max(1, Math.floor(counter / 11)));
    ally -= allyLoss;
    logs.push({ round, actor: eventRaidBoss.name, text: `夜神楽衝${formatNumber(counter)}ダメージ。味方兵力-${allyLoss}。`, critical: false, ally, enemy });
  }
  const won = enemy <= 0;
  logs.push({ round, actor: "SYSTEM", text: won ? "祈願共鳴核の停止を確認。ヨルカグラ鎮圧完了。" : `共鳴限界へ到達。累積${formatNumber(totalDamage)}ダメージを同期。`, critical: false, ally, enemy });
  const reward = 520 + Math.floor(totalDamage * .42);
  const eventTokens = 24 + Math.floor(totalDamage / 550) + (parts.core.broken ? 25 : 0);
  const eventPoints = 120 + Math.floor(totalDamage / 18);
  return { mode: "event-raid", logs, won, rounds: round, allyStart, enemyStart, allyRemaining: Math.max(0, ally), enemyRemaining: Math.max(0, enemy), casualties: allyStart - Math.max(0, ally), damage: totalDamage, reward, eventTokens, eventPoints, parts, newBreaks };
}

function startEventRaidBattle() {
  const raid = state.event.raid;
  if (raid.attempts <= 0) return showToast("本日のイベントレイド挑戦回数を使い切りました");
  if (raid.bossHp <= 0) return showToast("ヨルカグラは鎮圧済みです");
  if (state.troops <= 0) return showToast("兵を補充してから共鳴してください");
  const report = simulateEventRaid();
  state.lifetime.battles += 1;
  state.lifetime.raidRuns += 1;
  raid.attempts -= 1;
  raid.bossHp = report.enemyRemaining;
  raid.personalDamage += report.damage;
  raid.lastDamage = report.damage;
  raid.runs += 1;
  raid.parts = report.parts;
  raid.target = Object.keys(report.parts).find(id => !report.parts[id].broken) || raid.target;
  state.troops = report.allyRemaining;
  state.coins += report.reward;
  state.event.tokens += report.eventTokens;
  state.event.points += report.eventPoints;
  report.newBreaks.forEach(id => {
    const reward = eventRaidBoss.parts[id].reward;
    state.event.tokens += reward.tokens;
    state.event.points += reward.points;
    report.eventTokens += reward.tokens;
    report.eventPoints += reward.points;
    applyReward({ materials: reward.materials });
  });
  report.levelsGained = recordDailyActivity("raid", 40);
  recordGuildActivity("raid", report.damage);
  report.playerLevel = state.player.level;
  saveState();
  updateUI();
  openBattleReport(report, "夜神楽共鳴戦", eventRaidBoss.name, eventRaidBoss.art);
  playRevealSound("UR");
  vibrate([30, 35, 70]);
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
  state.lifetime.battles += 1;
  state.lifetime.raidRuns += 1;
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
  state.lifetime.battles += 1;
  state.arena.tickets -= 1;
  state.arena.rating = Math.max(0, state.arena.rating + report.ratingDelta);
  report.ratingAfter = state.arena.rating;
  if (report.won) {
    state.lifetime.arenaWins += 1;
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

function appendLogElement(log, silent = false) {
  const element = document.createElement("div");
  element.className = `log-entry${log.critical ? " critical" : ""}${log.actor === "BREAK" ? " break" : ""}${log.actor === "PHASE" ? " phase" : ""}`;
  element.innerHTML = `<b>${log.actor === "SYSTEM" ? "END" : log.actor === "PASSIVE" ? "PASS" : log.actor === "BREAK" ? "BRK" : log.actor === "PHASE" ? "PHS" : `R${log.round}`}</b><span><strong>${log.actor === "PASSIVE" ? "パッシブ共鳴" : log.actor === "BREAK" ? "部位破壊" : log.actor === "PHASE" ? "段階移行" : log.actor}</strong><small>${log.text}</small></span>`;
  const container = document.querySelector("#battle-log");
  container.append(element);
  container.scrollTop = container.scrollHeight;
  updateBattleBars(log.ally, battleRun.report.allyStart, log.enemy, battleRun.report.enemyStart);
  if (silent) return;
  if (log.actor === "PASSIVE") {
    playPassiveSound();
    pulseBattle("passive-pulse");
  } else if (log.actor === "BREAK") {
    playBreakSound();
    pulseBattle("break-pulse");
    vibrate([28, 25, 62]);
  } else if (log.actor === "PHASE") {
    playPhaseSound();
    pulseBattle("phase-pulse");
  } else if (log.actor !== "SYSTEM" && log.critical) {
    playCriticalSound();
    pulseBattle("critical-pulse");
    vibrate([20, 18, 45]);
  } else if (log.actor !== "SYSTEM") {
    const enemyAction = /反撃|重圧|耐久-|損耗|衝撃/.test(log.text);
    playBattleHitSound(enemyAction, log.round);
    pulseBattle(enemyAction ? "enemy-hit-pulse" : "hit-pulse");
  }
}

function pulseBattle(className) {
  const overlay = document.querySelector("#battle-overlay");
  const effects = ["sortie-pulse", "hit-pulse", "enemy-hit-pulse", "critical-pulse", "break-pulse", "passive-pulse", "phase-pulse", "victory-pulse"];
  overlay.classList.remove(...effects);
  void overlay.offsetWidth;
  overlay.classList.add(className);
  setTimeout(() => overlay.classList.remove(className), className === "victory-pulse" ? 900 : 420);
}

function showAllBattleLogs() {
  if (!battleRun) return;
  clearTimeout(battleRun.timer);
  while (battleRun.index < battleRun.report.logs.length) {
    appendLogElement(battleRun.report.logs[battleRun.index], true);
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
  } else if (report.mode === "event-raid") {
    document.querySelector("#battle-result-icon").textContent = "祭";
    document.querySelector("#battle-result-title").textContent = report.won ? "ヨルカグラ鎮圧" : "共鳴ダメージ同期";
    const breaks = report.newBreaks.length ? ` / 部位破壊 ${report.newBreaks.map(id => eventRaidBoss.parts[id].name).join("・")}` : "";
    document.querySelector("#battle-result-meta").textContent = `与ダメージ ${formatNumber(report.damage)} / 損耗 ${report.casualties}名 / 祭札 +${report.eventTokens} / +${report.eventPoints} PT${breaks}${growth}`;
  } else if (report.mode === "event") {
    document.querySelector("#battle-result-icon").textContent = report.won ? "祭" : "!";
    document.querySelector("#battle-result-title").textContent = report.won ? "イベント任務完了" : "部隊撤退";
    const eventReward = report.won ? ` / 祭札 +${report.eventTokens} / EVENT +${report.eventPoints} PT` : "";
    document.querySelector("#battle-result-meta").textContent = `損耗 ${report.casualties}名 / ${formatNumber(report.reward)}コイン${eventReward}${growth}`;
  } else {
    document.querySelector("#battle-result-icon").textContent = report.won ? "✓" : "!";
    document.querySelector("#battle-result-title").textContent = report.won ? "任務完了" : "部隊撤退";
    const drops = report.won ? ` / ${Object.entries(report.mission.drops).map(([key, amount]) => `${materials[key].name}×${amount}`).join("・")}` : "";
    const firstClear = report.firstClear ? ` / 初回報酬 ${report.firstClear}` : "";
    document.querySelector("#battle-result-meta").textContent = `損耗 ${report.casualties}名 / ${formatNumber(report.reward)}コイン${drops}${firstClear}${growth}`;
  }
  const missing = Math.max(0, getTeamCapacity() - state.troops);
  const button = document.querySelector("#replenish-button");
  if (report.mode !== "arena") {
    button.textContent = missing > 0 ? `兵を補充（${formatNumber(missing * 12)}コイン）` : "兵力は最大です";
    button.disabled = missing === 0;
  }
  const success = report.mode === "raid" || report.mode === "event-raid" || report.won;
  playBattleResultSound(success);
  pulseBattle(success ? "victory-pulse" : "enemy-hit-pulse");
  if (success && (report.firstClear || report.reward || report.eventTokens)) setTimeout(playRewardSound, 520);
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
  overlay.className = "full-overlay battle-overlay";
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

function saveProfileName() {
  const input = document.querySelector("#profile-name-input");
  const name = input.value.trim().slice(0, 16);
  if (!name) return showToast("プレイヤー名を入力してください");
  state.profile.name = name;
  saveState();
  updateUI();
  showToast(`プレイヤー名を「${name}」に変更しました`);
}

function encodeSaveCode(payload = state) {
  const bytes = new TextEncoder().encode(JSON.stringify(payload));
  let binary = "";
  bytes.forEach(byte => binary += String.fromCharCode(byte));
  return btoa(binary);
}

function decodeSaveCode(code) {
  const binary = atob(code.replace(/\s/g, ""));
  const bytes = Uint8Array.from(binary, character => character.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

async function copySaveCode() {
  const textarea = document.querySelector("#save-code");
  textarea.value = encodeSaveCode();
  textarea.focus();
  textarea.select();
  try {
    await navigator.clipboard.writeText(textarea.value);
  } catch {
    document.execCommand("copy");
  }
  showToast("現在のセーブコードをコピーしました");
}

function loadSaveCode() {
  const textarea = document.querySelector("#save-code");
  try {
    const imported = decodeSaveCode(textarea.value.trim());
    if (!imported || typeof imported !== "object" || !Array.isArray(imported.team) || !imported.owned) throw new Error("invalid save");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(imported));
    state = loadState();
    activeSlot = 0;
    workshopUnitId = state.team[0];
    saveState();
    updateUI();
    navigateTo("home");
    showToast("セーブデータを読み込みました");
  } catch {
    showToast("セーブコードを確認してください");
  }
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
  [1240, 1560, 1980, 2480].forEach((frequency, index) => tone(frequency, .13, .018, frequency * 1.25, "sine", .18 + index * .19, index % 2 ? .65 : -.65));
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
    [1046, 1318, 1568, 2093].forEach((frequency, index) => tone(frequency, .72, .022, null, "sine", .25 + index * .11, [-.7, .7, -.3, .3][index]));
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

function playSortieSound() {
  noiseSweep(.46, .045, 260, 4200, 0, -.25);
  tone(82, .5, .075, 164, "sawtooth", 0, .1);
  [294, 392, 587].forEach((frequency, index) => tone(frequency, .3, .028, frequency * 1.35, "triangle", .08 + index * .09, [-.55, 0, .55][index]));
}

function playPassiveSound() {
  [523, 659, 784].forEach((frequency, index) => tone(frequency, .28, .025, frequency * 1.12, "sine", index * .045, [-.4, 0, .4][index]));
}

function playBattleHitSound(enemyAction = false, round = 1) {
  const variation = Number(round || 1) % 3;
  const pan = enemyAction ? .42 : -.42;
  noiseSweep(.09, .03, enemyAction ? 1200 : 2200, 150, 0, pan);
  tone(enemyAction ? 96 + variation * 8 : 145 + variation * 14, .13, .04, 58, enemyAction ? "sawtooth" : "square", 0, pan);
  tone(enemyAction ? 360 : 620, .08, .018, enemyAction ? 220 : 920, "triangle", .018, -pan);
}

function playCriticalSound() {
  noiseSweep(.24, .09, 6400, 110, 0, -.15);
  tone(72, .42, .13, 38, "sine");
  tone(172, .2, .07, 68, "square", 0, .35);
  [880, 1174, 1568].forEach((frequency, index) => tone(frequency, .23, .026, frequency * 1.18, "triangle", .04 + index * .045, [-.65, 0, .65][index]));
}

function playBreakSound() {
  noiseSweep(.34, .1, 5200, 90);
  tone(58, .55, .15, 31, "sawtooth");
  [1680, 2380, 3180, 4160].forEach((frequency, index) => tone(frequency, .18, .02, frequency * .62, "triangle", .03 + index * .035, index % 2 ? .62 : -.62));
}

function playPhaseSound() {
  noiseSweep(.65, .045, 280, 6200);
  [196, 247, 330, 494].forEach((frequency, index) => tone(frequency, .62, .032, frequency * 1.5, "sine", index * .075, [-.5, -.15, .2, .55][index]));
}

function playRewardSound() {
  [784, 988, 1175, 1568, 1976].forEach((frequency, index) => tone(frequency, .46, .026, null, index % 2 ? "triangle" : "sine", index * .065, [-.6, -.25, 0, .25, .6][index]));
}

function playBattleResultSound(won) {
  if (won) {
    tone(65, .9, .075, 130, "sine");
    noiseSweep(.5, .034, 340, 6200, 0, .15);
    [392, 494, 587, 784, 988].forEach((frequency, index) => tone(frequency, .7, .038, null, index % 2 ? "triangle" : "sine", .04 + index * .095, index % 2 ? .4 : -.4));
  } else {
    noiseSweep(.42, .04, 900, 120);
    tone(150, .7, .075, 62, "sawtooth");
    tone(110, .55, .045, 48, "triangle", .2);
  }
}

function previewBattleSound() {
  const button = document.querySelector("#battle-sound-preview");
  if (!state.settings.sound) {
    state.settings.sound = true;
    saveState();
    updateUI();
    showToast("サウンドをONにしました");
  }
  battleSoundPreviewTimer.forEach(clearTimeout);
  button.classList.add("playing");
  button.querySelector(":scope > b").textContent = "•••";
  playSortieSound();
  battleSoundPreviewTimer = [
    setTimeout(() => playBattleHitSound(false, 1), 520),
    setTimeout(() => { playCriticalSound(); vibrate([20, 16, 42]); }, 830),
    setTimeout(playBreakSound, 1260),
    setTimeout(playBattleResultSound, 1700, true),
    setTimeout(playRewardSound, 2220),
    setTimeout(() => { button.classList.remove("playing"); button.querySelector(":scope > b").textContent = "▶"; }, 3000)
  ];
}
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
  const artPreview = event.target.closest("[data-art-preview]");
  if (artPreview) return showArtPreview(artPreview.dataset.artPreview);
  const enemyPreview = event.target.closest("[data-enemy-preview]");
  if (enemyPreview) return showEnemyPreview(Number(enemyPreview.dataset.enemyPreview));
  const slot = event.target.closest("[data-slot]");
  if (slot) return selectTeamSlot(Number(slot.dataset.slot));
  const abilityDetail = event.target.closest("[data-ability-detail]");
  if (abilityDetail) return showAbilityDetail(abilityDetail.dataset.commander, abilityDetail.dataset.abilityDetail);
  const trainingLink = event.target.closest("[data-open-training]");
  if (trainingLink) return openTraining(trainingLink.dataset.openTraining);
  const unit = event.target.closest("[data-unit]");
  if (unit) return assignCommander(unit.dataset.unit);
  const workshopUnit = event.target.closest("[data-workshop-unit]");
  if (workshopUnit) return selectWorkshopUnit(workshopUnit.dataset.workshopUnit);
  const upgrade = event.target.closest("[data-upgrade]");
  if (upgrade) return upgradeUnit(upgrade.dataset.upgrade);
  const expedition = event.target.closest("[data-expedition]");
  if (expedition) return runExpedition(Number(expedition.dataset.expedition));
  const recipePreview = event.target.closest("[data-recipe-preview]");
  if (recipePreview) return showRecipeConfirmation(recipePreview.dataset.recipePreview);
  const recipeConfirm = event.target.closest("[data-confirm-recipe]");
  if (recipeConfirm) return craftGear(recipeConfirm.dataset.confirmRecipe);
  const dialogClose = event.target.closest("[data-dialog-close]");
  if (dialogClose) return document.querySelector("#info-dialog").close();
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
  const guildQuick = event.target.closest("[data-guild-quick]");
  if (guildQuick) return sendGuildMessage(guildQuick.dataset.guildQuick);
  const eventRaidTarget = event.target.closest("[data-event-raid-target]");
  if (eventRaidTarget) return selectEventRaidTarget(eventRaidTarget.dataset.eventRaidTarget);
  const eventRaidReward = event.target.closest("[data-event-raid-reward]");
  if (eventRaidReward) return claimEventRaidReward(eventRaidReward.dataset.eventRaidReward);
  const eventStage = event.target.closest("[data-event-stage]");
  if (eventStage) return startEventBattle(Number(eventStage.dataset.eventStage));
  const eventStory = event.target.closest("[data-event-story]");
  if (eventStory) return showEventStory(eventStory.dataset.eventStory);
  const eventReward = event.target.closest("[data-event-reward]");
  if (eventReward) return claimEventPointReward(eventReward.dataset.eventReward);
  const eventExchange = event.target.closest("[data-event-exchange]");
  if (eventExchange) return exchangeEventItem(eventExchange.dataset.eventExchange);
  const dialogButton = event.target.closest("[data-dialog]");
  if (dialogButton) return showInfoDialog(dialogButton.dataset.dialog);
});

document.addEventListener("keydown", event => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const unit = event.target.matches?.(".unit-card[data-unit]") ? event.target : null;
  const recipe = event.target.matches?.(".recipe-card[data-recipe-preview]") ? event.target : null;
  if (unit) { event.preventDefault(); assignCommander(unit.dataset.unit); }
  if (recipe) { event.preventDefault(); showRecipeConfirmation(recipe.dataset.recipePreview); }
});

document.querySelector("#draw-ten").addEventListener("click", () => performDraw(10));
document.querySelector("#draw-one").addEventListener("click", () => performDraw(1));
document.querySelector("#sound-preview").addEventListener("click", previewGachaSound);
document.querySelector("#battle-sound-preview").addEventListener("click", previewBattleSound);
document.querySelector("#summon-skip").addEventListener("click", () => showSummonResults());
document.querySelector("#summon-hero").addEventListener("click", () => showSummonResults());
document.querySelector("#summon-close").addEventListener("click", closeSummon);
document.querySelector("#battle-skip").addEventListener("click", showAllBattleLogs);
document.querySelector("#battle-close").addEventListener("click", closeBattle);
document.querySelector("#raid-start").addEventListener("click", startRaidBattle);
document.querySelector("#raid-rescue").addEventListener("click", requestRaidRescue);
document.querySelector("#event-raid-start").addEventListener("click", startEventRaidBattle);
document.querySelector("#event-raid-support").addEventListener("click", requestEventRaidSupport);
document.querySelector("#daily-login-claim").addEventListener("click", claimLoginReward);
document.querySelector("#daily-all-claim").addEventListener("click", claimDailyAll);
document.querySelector("#guild-cheer").addEventListener("click", cheerGuild);
document.querySelector("#guild-supply").addEventListener("click", claimGuildSupply);
document.querySelector("#guild-chat-form").addEventListener("submit", event => { event.preventDefault(); sendGuildMessage(); });
document.querySelector("#replenish-button").addEventListener("click", replenishTroops);
document.querySelector(".dialog-close").addEventListener("click", () => document.querySelector("#info-dialog").close());
document.querySelector("#reset-demo").addEventListener("click", resetDemo);
document.querySelector("#profile-name-save").addEventListener("click", saveProfileName);
document.querySelector("#save-code-copy").addEventListener("click", copySaveCode);
document.querySelector("#save-code-load").addEventListener("click", loadSaveCode);

[["sound-toggle", "sound"], ["haptic-toggle", "haptic"], ["flash-toggle", "reduceFlash"], ["instant-toggle", "instant"]].forEach(([id, key]) => {
  document.querySelector(`#${id}`).addEventListener("change", event => {
    state.settings[key] = event.target.checked;
    saveState();
    updateUI();
  });
});

updateUI();
setInterval(updateStaminaClock, 1000);
