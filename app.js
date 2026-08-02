const STORAGE_KEY = "kyokai-resonance-demo-v1";
const rarityRank = { R: 1, SR: 2, SSR: 3, UR: 4 };

const commanders = [
  { id: "touma", name: "トウマ", title: "街路の斥候", rarity: "R", role: "偵察", tactic: "先読み", symbol: "➤", attack: 96, defense: 78, command: 18, colors: ["#1fc9ff", "#2948d5"] },
  { id: "mina", name: "ミナ", title: "境界の衛士", rarity: "R", role: "防御", tactic: "防壁展開", symbol: "◆", attack: 82, defense: 108, command: 20, colors: ["#31c5f4", "#3945ad"] },
  { id: "isami", name: "イサミ", title: "火花の整備士", rarity: "R", role: "補給", tactic: "現地修復", symbol: "⚙", attack: 90, defense: 88, command: 19, colors: ["#ff644d", "#7825ba"] },
  { id: "ren", name: "レン", title: "蒼雷の遊撃手", rarity: "SR", role: "攻撃", tactic: "連鎖射撃", symbol: "ϟ", attack: 128, defense: 88, command: 22, colors: ["#5536e8", "#e02ed3"], art: "assets/commander-ren-v1.png" },
  { id: "sana", name: "サナ", title: "翠環の調律師", rarity: "SR", role: "支援", tactic: "共振増幅", symbol: "⌁", attack: 106, defense: 104, command: 21, colors: ["#00d6a1", "#ff7a2d", "#6734cf"], art: "assets/commander-sana-v1.png" },
  { id: "ten", name: "テン", title: "黒鋼の盾役", rarity: "SR", role: "防御", tactic: "反射障壁", symbol: "⬢", attack: 102, defense: 142, command: 22, colors: ["#562c8a", "#181526"] },
  { id: "kanade", name: "カナデ", title: "星砕きの奏者", rarity: "SSR", role: "攻撃", tactic: "星霜連爆", symbol: "✦", attack: 168, defense: 118, command: 25, colors: ["#ffba24", "#f3299b"] },
  { id: "riku", name: "リク", title: "玻璃の疾風", rarity: "SSR", role: "遊撃", tactic: "残響突破", symbol: "≋", attack: 154, defense: 124, command: 26, colors: ["#21e8ef", "#7c36e8"] },
  { id: "setsuna", name: "セツナ", title: "常夜の守護者", rarity: "SSR", role: "防御", tactic: "不壊結界", symbol: "☾", attack: 132, defense: 176, command: 27, colors: ["#334dd8", "#d625b5"] },
  { id: "kohaku", name: "コハク", title: "界紋を拓く者", rarity: "UR", role: "万能", tactic: "万象展開", symbol: "界", attack: 196, defense: 164, command: 30, colors: ["#19e6ff", "#f126cf", "#ffd53d"], art: "assets/ur-exorcist.png" }
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
  { id: "arcRifle", name: "雷紋式アークライフル", type: "武器", icon: "⌁", effect: "部隊攻撃 +42 / Lv", max: 5, costs: { ore: 6, core: 3 }, coins: 800 },
  { id: "borderCoat", name: "境界織りの外套", type: "防具", icon: "♢", effect: "部隊防御 +46 / Lv", max: 5, costs: { fiber: 5, hide: 4 }, coins: 700 },
  { id: "resonanceSigil", name: "五連共鳴紋章", type: "装飾", icon: "✦", effect: "攻防 +25 / Lv", max: 5, costs: { core: 5, fiber: 3 }, coins: 1000 }
];

const starterTeam = ["ren", "sana", "touma", "mina", "isami"];
const starterOwned = Object.fromEntries(starterTeam.map(id => [id, { shards: 0 }]));

const defaultState = () => ({
  schema: 2,
  crystals: 4500,
  coins: 12800,
  stamina: 48,
  pity: 72,
  troops: 100,
  owned: Object.fromEntries(starterTeam.map(id => [id, { shards: 0 }])),
  team: [...starterTeam],
  materials: { ore: 4, fiber: 3, core: 2, hide: 2 },
  gear: { arcRifle: 0, borderCoat: 0, resonanceSigil: 0 },
  expeditions: 0,
  demoFirstTen: true,
  settings: { sound: true, haptic: true, reduceFlash: false, instant: false }
});

let state = loadState();
let activeSlot = 0;
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
    const restored = {
      ...defaults,
      ...parsed,
      schema: 2,
      owned,
      team,
      materials: { ...defaults.materials, ...(parsed.materials || {}) },
      gear: { ...defaults.gear, ...(parsed.gear || {}) },
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

function getGearBonus(currentState = state) {
  return {
    attack: currentState.gear.arcRifle * 42 + currentState.gear.resonanceSigil * 25,
    defense: currentState.gear.borderCoat * 46 + currentState.gear.resonanceSigil * 25
  };
}

function getTeamCapacity(currentState = state) {
  return currentState.team.map(getCommander).filter(Boolean).reduce((sum, unit) => sum + unit.command, 0);
}

function getSquadStats(currentState = state) {
  const team = getTeam(currentState);
  const gear = getGearBonus(currentState);
  const attack = team.reduce((sum, unit) => sum + unit.attack, 0) + gear.attack;
  const defense = team.reduce((sum, unit) => sum + unit.defense, 0) + gear.defense;
  const power = attack + defense + Math.round(currentState.troops * 2.2);
  return { team, attack, defense, power, capacity: getTeamCapacity(currentState), gear };
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
  playUISound();
}

function updateUI() {
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
  document.querySelector("#sound-toggle").checked = state.settings.sound;
  document.querySelector("#haptic-toggle").checked = state.settings.haptic;
  document.querySelector("#flash-toggle").checked = state.settings.reduceFlash;
  document.querySelector("#instant-toggle").checked = state.settings.instant;
  document.body.classList.toggle("reduced-flash", state.settings.reduceFlash);
  document.querySelector("#mission-team-mini").innerHTML = miniTeamMarkup();
  renderMissions();
  renderFormation();
  renderWorkshop();
}

function artMarkup(commander, className = "") {
  return commander.art
    ? `<img class="${className}" src="${commander.art}" alt="${commander.name}">`
    : `<span class="${className} slot-symbol" style="background:linear-gradient(145deg,${commander.colors.join(",")})">${commander.symbol}</span>`;
}

function miniTeamMarkup() {
  return getTeam().map(commander => commander.art
    ? `<img src="${commander.art}" alt="${commander.name}">`
    : `<span class="mini-symbol" style="background:linear-gradient(145deg,${commander.colors.join(",")})">${commander.symbol}</span>`).join("");
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
    const art = commander.art ? `<img src="${commander.art}" alt="">` : `<span>${commander.symbol}</span>`;
    return `<button class="unit-card glass-card${inTeam ? " in-team" : ""}" type="button" data-unit="${commander.id}"><div class="unit-art" style="background:linear-gradient(145deg,${commander.colors.join(",")})">${art}</div><div class="unit-copy"><span><i class="rarity ${commander.rarity.toLowerCase()}">${commander.rarity}</i>${inTeam ? `<em class="formation-tag">編成中 ${state.team.indexOf(commander.id) + 1}</em>` : ""}</span><strong>${commander.title} ${commander.name}</strong><small>${commander.role} / ${commander.tactic} / 記憶片 ${state.owned[commander.id]?.shards || 0}</small></div><div class="unit-stats"><small>攻撃</small><b>${commander.attack}</b><small>防御</small><b>${commander.defense}</b></div></button>`;
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

function renderWorkshop() {
  document.querySelector("#gear-total-level").textContent = Object.values(state.gear).reduce((sum, value) => sum + value, 0);
  document.querySelector("#material-wallet").innerHTML = Object.entries(materials).map(([key, material]) => `<div class="material-item" style="--material:${material.color}"><i>${material.icon}</i><span><small>${material.name}</small></span><b>${state.materials[key]}</b></div>`).join("");
  document.querySelector("#expedition-list").innerHTML = expeditions.map((expedition, index) => `<article class="expedition-card" style="--expedition-bg:${expedition.background}"><small>${expedition.code}</small><h3>${expedition.name}</h3><p>${expedition.detail}</p><div class="drop-chips">${Object.keys(expedition.drops).map(key => `<i>${materials[key].icon} ${materials[key].name}</i>`).join("")}</div><button type="button" data-expedition="${index}" ${state.stamina < 3 ? "disabled" : ""}>探索 ϟ3</button></article>`).join("");
  document.querySelector("#recipe-list").innerHTML = recipes.map(recipe => {
    const level = state.gear[recipe.id];
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
  saveState();
  updateUI();
  playGatherSound();
  vibrate([15, 25, 25]);
  showToast(`${expedition.name}: ${rewards.join(" / ")}`);
}

function craftGear(id) {
  const recipe = recipes.find(item => item.id === id);
  if (!recipe || state.gear[id] >= recipe.max) return;
  const canCraft = Object.entries(recipe.costs).every(([key, amount]) => state.materials[key] >= amount) && state.coins >= recipe.coins;
  if (!canCraft) return showToast("生成素材が不足しています");
  Object.entries(recipe.costs).forEach(([key, amount]) => state.materials[key] -= amount);
  state.coins -= recipe.coins;
  state.gear[id] += 1;
  saveState();
  updateUI();
  playCraftSound();
  vibrate([25, 30, 65]);
  showToast(`${recipe.name} Lv.${state.gear[id]}を生成・装備しました`);
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
  document.querySelector("#hero-tactic").textContent = commander.tactic;
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

function startBattle(missionIndex) {
  const mission = missions[missionIndex];
  if (state.stamina < mission.stamina) return showToast("スタミナが不足しています");
  if (state.troops <= 0) return showToast("兵を補充してから出撃してください");
  const report = simulateBattle(mission);
  state.stamina -= mission.stamina;
  state.troops = report.allyRemaining;
  state.coins += report.reward;
  if (report.won) Object.entries(mission.drops).forEach(([key, amount]) => state.materials[key] += amount);
  saveState();
  updateUI();
  const overlay = document.querySelector("#battle-overlay");
  overlay.classList.add("active");
  overlay.setAttribute("aria-hidden", "false");
  document.querySelector("#battle-title").textContent = mission.title;
  document.querySelector("#enemy-name").textContent = mission.enemy;
  document.querySelector("#battle-enemy-image").src = mission.art;
  document.querySelector("#battle-enemy-image").alt = mission.enemy;
  document.querySelector("#battle-team-mini").innerHTML = getTeam().map(commander => `<span>${commander.art ? `<img src="${commander.art}" alt="">` : `<i style="background:linear-gradient(145deg,${commander.colors.join(",")})">${commander.symbol}</i>`}<b>${commander.name}</b></span>`).join("");
  document.querySelector("#battle-log").innerHTML = "";
  document.querySelector("#battle-result").classList.add("hidden");
  document.querySelector("#battle-skip").classList.remove("hidden");
  updateBattleBars(report.allyStart, report.allyStart, report.enemyStart, report.enemyStart);
  battleRun = { report, index: 0, timer: null };
  appendNextBattleLog();
}

function simulateBattle(mission) {
  const stats = getSquadStats();
  let ally = state.troops;
  let enemy = mission.enemyTroops;
  const allyStart = ally;
  const enemyStart = enemy;
  const logs = [];
  let round = 0;
  while (round < 12 && ally > 0 && enemy > 0) {
    round += 1;
    const commander = stats.team[(round - 1) % stats.team.length];
    const roleBonus = commander.role === "攻撃" || commander.role === "遊撃" ? 1.14 : 1;
    const critical = Math.random() < (.12 + rarityRank[commander.rarity] * .025);
    const raw = Math.max(30, (stats.attack + ally * 2.4 - mission.enemyDefense * .48) * .18 * roleBonus);
    const damage = Math.floor(raw * (.92 + Math.random() * .16) * (critical ? 1.55 : 1));
    const enemyLoss = Math.min(enemy, Math.max(2, Math.floor(damage / 10)));
    enemy -= enemyLoss;
    logs.push({ round, actor: commander.name, text: `${commander.tactic}。${mission.enemy}へ${damage}ダメージ、敵兵力-${enemyLoss}。${critical ? "会心共鳴！" : ""}`, critical, ally, enemy });
    if (enemy <= 0) break;
    const mitigation = stats.defense * .28;
    const counter = Math.max(18, Math.floor((mission.enemyAttack + enemy * 1.7 - mitigation) * (.9 + Math.random() * .18) * .14));
    const allyLoss = Math.min(ally, Math.max(1, Math.floor(counter / 9)));
    ally -= allyLoss;
    logs.push({ round, actor: mission.enemy, text: `反撃${counter}ダメージ。味方兵力-${allyLoss}。`, critical: false, ally, enemy });
  }
  const won = enemy <= 0 || (ally / allyStart > enemy / enemyStart);
  logs.push({ round, actor: "SYSTEM", text: won ? "敵信号の停止を確認。任務完了。" : "味方部隊が撤退。再編成が必要です。", critical: false, ally, enemy });
  return { mission, logs, won, rounds: round, allyStart, enemyStart, allyRemaining: Math.max(0, ally), enemyRemaining: Math.max(0, enemy), casualties: allyStart - Math.max(0, ally), reward: won ? mission.reward : 120 };
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
  element.className = `log-entry${log.critical ? " critical" : ""}`;
  element.innerHTML = `<b>${log.actor === "SYSTEM" ? "END" : `R${log.round}`}</b><span><strong>${log.actor}</strong><small>${log.text}</small></span>`;
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

function updateBattleBars(ally, allyStart, enemy, enemyStart) {
  document.querySelector("#ally-troop-text").textContent = `${ally} / ${allyStart}`;
  document.querySelector("#enemy-troop-text").textContent = `${enemy} / ${enemyStart}`;
  document.querySelector("#ally-troop-bar").style.width = `${Math.max(0, ally / allyStart * 100)}%`;
  document.querySelector("#enemy-troop-bar").style.width = `${Math.max(0, enemy / enemyStart * 100)}%`;
}

function finishBattleDisplay() {
  if (!battleRun) return;
  clearTimeout(battleRun.timer);
  const report = battleRun.report;
  document.querySelector("#battle-skip").classList.add("hidden");
  document.querySelector("#battle-result").classList.remove("hidden");
  document.querySelector("#battle-result-icon").textContent = report.won ? "✓" : "!";
  document.querySelector("#battle-result-title").textContent = report.won ? "任務完了" : "部隊撤退";
  const drops = report.won ? ` / ${Object.entries(report.mission.drops).map(([key, amount]) => `${materials[key].name}×${amount}`).join("・")}` : "";
  document.querySelector("#battle-result-meta").textContent = `損耗 ${report.casualties}名 / ${formatNumber(report.reward)}コイン${drops}`;
  const missing = Math.max(0, getTeamCapacity() - state.troops);
  const button = document.querySelector("#replenish-button");
  button.textContent = missing > 0 ? `兵を補充（${formatNumber(missing * 12)}コイン）` : "兵力は最大です";
  button.disabled = missing === 0;
  playBattleResultSound(report.won);
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
  const expedition = event.target.closest("[data-expedition]");
  if (expedition) return runExpedition(Number(expedition.dataset.expedition));
  const recipe = event.target.closest("[data-recipe]");
  if (recipe) return craftGear(recipe.dataset.recipe);
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
