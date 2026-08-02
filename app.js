const STORAGE_KEY = "kyokai-resonance-demo-v1";
const rarityRank = { R: 1, SR: 2, SSR: 3, UR: 4 };

const commanders = [
  { id: "touma", name: "トウマ", title: "街路の斥候", rarity: "R", role: "偵察", tactic: "先読み", symbol: "➤", attack: 104, defense: 82, command: 58, colors: ["#1fc9ff", "#2948d5"] },
  { id: "mina", name: "ミナ", title: "境界の衛士", rarity: "R", role: "防御", tactic: "防壁展開", symbol: "◆", attack: 88, defense: 112, command: 62, colors: ["#31c5f4", "#3945ad"] },
  { id: "isami", name: "イサミ", title: "火花の整備士", rarity: "R", role: "補給", tactic: "現地修復", symbol: "⚙", attack: 96, defense: 90, command: 72, colors: ["#ff644d", "#7825ba"] },
  { id: "ren", name: "レン", title: "蒼雷の遊撃手", rarity: "SR", role: "攻撃", tactic: "連鎖射撃", symbol: "ϟ", attack: 132, defense: 91, command: 76, colors: ["#5536e8", "#e02ed3"] },
  { id: "sana", name: "サナ", title: "紫煙の調律師", rarity: "SR", role: "支援", tactic: "共振増幅", symbol: "⌁", attack: 112, defense: 108, command: 84, colors: ["#bd2be8", "#461ca3"] },
  { id: "ten", name: "テン", title: "黒鋼の盾役", rarity: "SR", role: "防御", tactic: "反射障壁", symbol: "⬢", attack: 102, defense: 142, command: 82, colors: ["#562c8a", "#181526"] },
  { id: "kanade", name: "カナデ", title: "星砕きの奏者", rarity: "SSR", role: "攻撃", tactic: "星霜連爆", symbol: "✦", attack: 168, defense: 118, command: 96, colors: ["#ffba24", "#f124a8"] },
  { id: "riku", name: "リク", title: "玻璃の疾風", rarity: "SSR", role: "遊撃", tactic: "残響突破", symbol: "≋", attack: 154, defense: 124, command: 100, colors: ["#21e8ef", "#7c36e8"] },
  { id: "setsuna", name: "セツナ", title: "常夜の守護者", rarity: "SSR", role: "防御", tactic: "不壊結界", symbol: "☾", attack: 132, defense: 176, command: 106, colors: ["#334dd8", "#d625b5"] },
  { id: "kohaku", name: "コハク", title: "界紋を拓く者", rarity: "UR", role: "万能", tactic: "万象展開", symbol: "界", attack: 196, defense: 164, command: 124, colors: ["#19e6ff", "#f126cf", "#ffd53d"], art: "assets/ur-exorcist.png" }
];

const missions = [
  { title: "ネオン街の追跡者", enemy: "路地裏の自律兵", stamina: 6, recommended: 420, enemyTroops: 42, enemyAttack: 118, enemyDefense: 96, reward: 800 },
  { title: "雨上がりの高架線", enemy: "潜伏する狙撃群", stamina: 8, recommended: 540, enemyTroops: 52, enemyAttack: 142, enemyDefense: 112, reward: 920 },
  { title: "境界門、再起動", enemy: "門衛機グラウゼロ", stamina: 10, recommended: 680, enemyTroops: 68, enemyAttack: 164, enemyDefense: 148, reward: 1040 }
];

const defaultState = () => ({
  crystals: 4500,
  coins: 12800,
  stamina: 48,
  pity: 72,
  troops: 72,
  owned: { ren: { shards: 0 } },
  demoFirstTen: true,
  settings: { sound: true, haptic: true, reduceFlash: false, instant: false }
});

let state = loadState();
let toastTimer;
let summonTimers = [];
let activeSummonResults = [];
let activeSummonPityBefore = 0;
let particleFrame;
let battleRun = null;
let audioContext;

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!parsed || typeof parsed !== "object") return defaultState();
    return {
      ...defaultState(),
      ...parsed,
      owned: parsed.owned || { ren: { shards: 0 } },
      settings: { ...defaultState().settings, ...(parsed.settings || {}) }
    };
  } catch {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function formatNumber(value) {
  return new Intl.NumberFormat("ja-JP").format(value);
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function navigateTo(screenName) {
  document.querySelectorAll(".screen").forEach(screen => screen.classList.toggle("active", screen.id === `${screenName}-screen`));
  document.querySelectorAll(".bottom-nav button").forEach(button => button.classList.toggle("active", button.dataset.screen === screenName));
  const screen = document.querySelector(`#${screenName}-screen`);
  document.querySelector("#screen-title").textContent = screen?.dataset.title || "境界共鳴";
  if (screen) screen.scrollTop = 0;
  if (screenName === "units") renderUnits();
  playUISound();
}

function updateUI() {
  document.querySelector("#stamina-value").textContent = `${state.stamina}/60`;
  document.querySelector("#crystal-value").textContent = formatNumber(state.crystals);
  document.querySelector("#coin-value").textContent = formatNumber(state.coins);
  const pityRemaining = Math.max(0, 80 - state.pity);
  document.querySelector("#pity-remaining").textContent = pityRemaining;
  document.querySelector("#pity-bar").style.width = `${Math.min(100, state.pity / 80 * 100)}%`;
  document.querySelector("#troop-summary").textContent = state.troops;
  document.querySelector("#squad-commander-name").textContent = state.owned.kohaku ? "コハク" : "レン";
  const power = getSquadPower();
  document.querySelector("#home-power").textContent = power;
  document.querySelector("#squad-power").textContent = power;
  document.querySelector("#sound-toggle").checked = state.settings.sound;
  document.querySelector("#haptic-toggle").checked = state.settings.haptic;
  document.querySelector("#flash-toggle").checked = state.settings.reduceFlash;
  document.querySelector("#instant-toggle").checked = state.settings.instant;
  document.body.classList.toggle("reduced-flash", state.settings.reduceFlash);
  renderUnits();
}

function getSquadPower() {
  const active = state.owned.kohaku ? getCommander("kohaku") : getCommander("ren");
  return active.attack + active.defense + Math.round(state.troops * 3.55);
}

function getCommander(id) {
  return commanders.find(item => item.id === id);
}

function poolFor(rarity) {
  return commanders.filter(item => item.rarity === rarity);
}

function randomFrom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function rollRarity() {
  if (state.pity >= 79) return "UR";
  const softBonus = state.pity >= 60 ? (state.pity - 59) * 0.05 : 0;
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
    let rarity = guaranteeDemoUR && index === count - 1 ? "UR" : rollRarity();
    state.pity = rarity === "UR" ? 0 : state.pity + 1;
    results.push({ commander: randomFrom(poolFor(rarity)) });
  }
  if (count === 10 && !results.some(result => rarityRank[result.commander.rarity] >= rarityRank.SR)) {
    results[9] = { commander: randomFrom(poolFor("SR")) };
  }
  if (guaranteeDemoUR) state.demoFirstTen = false;

  const alreadySeen = new Set(Object.keys(state.owned));
  for (const result of results) {
    const id = result.commander.id;
    result.isNew = !alreadySeen.has(id);
    result.shards = 0;
    if (result.isNew) {
      state.owned[id] = { shards: 0 };
      alreadySeen.add(id);
    } else {
      result.shards = { R: 5, SR: 10, SSR: 30, UR: 80 }[result.commander.rarity];
      state.owned[id] = state.owned[id] || { shards: 0 };
      state.owned[id].shards += result.shards;
    }
  }
  return results;
}

async function performDraw(count) {
  const cost = count === 10 ? 1500 : 150;
  if (state.crystals < cost) {
    showToast("共鳴石が不足しています");
    return;
  }
  document.querySelectorAll("#draw-ten,#draw-one").forEach(button => button.disabled = true);
  const pityBefore = state.pity;
  state.crystals -= cost;
  const results = makeDraw(count);
  saveState();
  updateUI();
  startSummon(results, pityBefore);
  setTimeout(() => document.querySelectorAll("#draw-ten,#draw-one").forEach(button => button.disabled = false), 650);
}

function highestResult(results) {
  return [...results].sort((a, b) => rarityRank[b.commander.rarity] - rarityRank[a.commander.rarity])[0];
}

function clearSummonTimers() {
  summonTimers.forEach(timer => clearTimeout(timer));
  summonTimers = [];
}

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
    playRevealSound(highestResult(results).commander.rarity);
    vibrate(highestResult(results).commander.rarity === "UR" ? [70, 45, 120] : [50]);
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
  const grid = document.querySelector("#result-grid");
  grid.innerHTML = activeSummonResults.map(result => resultCardMarkup(result)).join("");
  document.querySelector("#result-pity").textContent = `天井 ${pityBefore} → ${state.pity}`;
  stopParticles();
}

function resultCardMarkup(result) {
  const commander = result.commander;
  const art = commander.art
    ? `<img src="${commander.art}" alt="">`
    : `<span>${commander.symbol}</span>`;
  return `<article class="result-card" style="--rarity-color:${commander.colors[0]};--result-gradient:linear-gradient(145deg,${commander.colors.join(",")})">
    <div class="result-art">${art}</div><span class="rarity ${commander.rarity.toLowerCase()}">${commander.rarity}</span>
    <div class="result-info"><strong>${commander.name}</strong><small>${result.isNew ? "NEW" : `記憶片 +${result.shards}`}</small></div>
  </article>`;
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

function renderUnits() {
  const owned = Object.keys(state.owned).map(getCommander).filter(Boolean).sort((a, b) => rarityRank[b.rarity] - rarityRank[a.rarity]);
  document.querySelector("#unit-count").textContent = `${owned.length} / ${commanders.length}`;
  document.querySelector("#unit-list").innerHTML = owned.map(commander => {
    const art = commander.art ? `<img src="${commander.art}" alt="">` : `<span>${commander.symbol}</span>`;
    const shards = state.owned[commander.id]?.shards || 0;
    return `<article class="unit-card glass-card"><div class="unit-art" style="background:linear-gradient(145deg,${commander.colors.join(",")})">${art}</div><div class="unit-copy"><span><i class="rarity ${commander.rarity.toLowerCase()}">${commander.rarity}</i>${commander.id === "kohaku" || (!state.owned.kohaku && commander.id === "ren") ? "<em>編成中</em>" : ""}</span><strong>${commander.title} ${commander.name}</strong><small>${commander.role} / 記憶片 ${shards}</small></div><div class="unit-stats"><small>攻撃</small><b>${commander.attack}</b><small>防御</small><b>${commander.defense}</b></div></article>`;
  }).join("");
}

function startBattle(missionIndex) {
  const mission = missions[missionIndex];
  if (state.stamina < mission.stamina) return showToast("スタミナが不足しています");
  if (state.troops <= 0) return showToast("兵を補充してから出撃してください");

  const report = simulateBattle(mission);
  state.stamina -= mission.stamina;
  state.troops = report.allyRemaining;
  state.coins += report.reward;
  saveState();
  updateUI();

  const overlay = document.querySelector("#battle-overlay");
  overlay.classList.add("active");
  overlay.setAttribute("aria-hidden", "false");
  document.querySelector("#battle-title").textContent = mission.title;
  document.querySelector("#battle-ally-name").textContent = state.owned.kohaku ? "コハク" : "レン";
  document.querySelector("#enemy-name").textContent = mission.enemy;
  document.querySelector("#battle-log").innerHTML = "";
  document.querySelector("#battle-result").classList.add("hidden");
  document.querySelector("#battle-skip").classList.remove("hidden");
  updateBattleBars(report.allyStart, report.allyStart, report.enemyStart, report.enemyStart);
  battleRun = { report, index: 0, timer: null };
  appendNextBattleLog();
}

function simulateBattle(mission) {
  const commander = state.owned.kohaku ? getCommander("kohaku") : getCommander("ren");
  let ally = state.troops;
  let enemy = mission.enemyTroops;
  const allyStart = ally;
  const enemyStart = enemy;
  const logs = [];
  let round = 0;

  while (round < 10 && ally > 0 && enemy > 0) {
    round += 1;
    const allyPower = commander.attack + ally * 2.2;
    const damage = Math.max(15, Math.floor((allyPower - mission.enemyDefense * .42) * (.94 + Math.random() * .12)));
    const critical = Math.random() < .16;
    const allyDamage = critical ? Math.floor(damage * 1.5) : damage;
    const enemyLoss = Math.min(enemy, Math.max(1, Math.floor(allyDamage * .8 / 9)));
    enemy -= enemyLoss;
    logs.push({ round, actor: commander.name, text: `${mission.enemy}へ${allyDamage}損害。兵${enemyLoss}名が離脱。${critical ? " 会心！" : ""}`, critical, ally, enemy });
    if (enemy <= 0) break;

    const enemyPower = mission.enemyAttack + enemy * 1.8;
    const counterDamage = Math.max(12, Math.floor((enemyPower - commander.defense * .42) * (.94 + Math.random() * .12)));
    const allyLoss = Math.min(ally, Math.max(1, Math.floor(counterDamage * .8 / 9)));
    ally -= allyLoss;
    logs.push({ round, actor: mission.enemy, text: `${commander.name}隊へ${counterDamage}損害。兵${allyLoss}名が離脱。`, critical: false, ally, enemy });
  }

  const won = enemy <= 0 || (ally / allyStart >= enemy / enemyStart);
  logs.push({ round, actor: "SYSTEM", text: won ? "敵部隊が撤退。任務完了。" : "味方部隊が撤退。再編成が必要です。", critical: false, ally, enemy });
  return { mission, logs, won, rounds: round, allyStart, enemyStart, allyRemaining: Math.max(0, ally), enemyRemaining: Math.max(0, enemy), casualties: allyStart - Math.max(0, ally), reward: won ? mission.reward : 120 };
}

function appendNextBattleLog() {
  if (!battleRun) return;
  const { report } = battleRun;
  if (battleRun.index >= report.logs.length) return finishBattleDisplay();
  const log = report.logs[battleRun.index];
  const logElement = document.createElement("div");
  logElement.className = `log-entry${log.critical ? " critical" : ""}`;
  logElement.innerHTML = `<b>${log.actor === "SYSTEM" ? "END" : `R${log.round}`}</b><span><strong>${log.actor}</strong><small>${log.text}</small></span>`;
  document.querySelector("#battle-log").append(logElement);
  document.querySelector("#battle-log").scrollTop = document.querySelector("#battle-log").scrollHeight;
  updateBattleBars(log.ally, report.allyStart, log.enemy, report.enemyStart);
  if (log.critical) {
    playImpactSound();
    vibrate([25]);
  }
  battleRun.index += 1;
  battleRun.timer = setTimeout(appendNextBattleLog, 420);
}

function showAllBattleLogs() {
  if (!battleRun) return;
  clearTimeout(battleRun.timer);
  while (battleRun.index < battleRun.report.logs.length) {
    const log = battleRun.report.logs[battleRun.index];
    const logElement = document.createElement("div");
    logElement.className = `log-entry${log.critical ? " critical" : ""}`;
    logElement.innerHTML = `<b>${log.actor === "SYSTEM" ? "END" : `R${log.round}`}</b><span><strong>${log.actor}</strong><small>${log.text}</small></span>`;
    document.querySelector("#battle-log").append(logElement);
    battleRun.index += 1;
  }
  updateBattleBars(battleRun.report.allyRemaining, battleRun.report.allyStart, battleRun.report.enemyRemaining, battleRun.report.enemyStart);
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
  document.querySelector("#battle-result-meta").textContent = `損耗 ${report.casualties}名・獲得 ${report.reward}コイン`;
  const capacity = getActiveCapacity();
  const missing = Math.max(0, capacity - state.troops);
  const button = document.querySelector("#replenish-button");
  button.textContent = missing > 0 ? `兵を補充（${formatNumber(missing * 12)}コイン）` : "兵力は最大です";
  button.disabled = missing === 0;
  playBattleResultSound(report.won);
}

function getActiveCapacity() {
  return state.owned.kohaku ? getCommander("kohaku").command : getCommander("ren").command;
}

function replenishTroops() {
  const missing = Math.max(0, getActiveCapacity() - state.troops);
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
    content.innerHTML = `<div class="dialog-body"><h2>提供割合</h2><div class="rate-row"><span class="rarity ur">UR</span><b>0.5%</b></div><div class="rate-row"><span class="rarity ssr">SSR</span><b>4.5%</b></div><div class="rate-row"><span class="rarity sr">SR</span><b>20.0%</b></div><div class="rate-row"><span class="rarity r">R</span><b>75.0%</b></div><p>同レアリティ内は原則均等です。これは体験用のクライアント抽選であり、本番ではサーバーで結果を確定します。</p></div>`;
  } else {
    content.innerHTML = `<div class="dialog-body"><h2>天井・重複</h2><ul><li>10連はSR以上1体確定</li><li>61回目からUR確率が段階上昇</li><li>80回目までにUR確定</li><li>UR獲得でカウンターをリセット</li><li>重複は記憶片へ自動変換</li></ul></div>`;
  }
  document.querySelector("#info-dialog").showModal();
}

function resetDemo() {
  state = defaultState();
  saveState();
  updateUI();
  showToast("デモ状態を初期化しました");
}

function getAudioContext() {
  if (!state.settings.sound) return null;
  audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
  if (audioContext.state === "suspended") audioContext.resume();
  return audioContext;
}

function tone(frequency, duration, volume = .08, endFrequency = null, type = "sine", delay = 0) {
  const context = getAudioContext();
  if (!context) return;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const start = context.currentTime + delay;
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  if (endFrequency) oscillator.frequency.exponentialRampToValueAtTime(endFrequency, start + duration);
  gain.gain.setValueAtTime(.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + Math.min(.04, duration / 4));
  gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + .03);
}

function playUISound() { tone(540, .06, .025, 720, "sine"); }
function playIgnitionSound() { tone(72, 1.35, .12, 135, "sawtooth"); tone(420, 1.45, .04, 1280, "sine", .05); }
function playRevealSound(rarity) {
  const base = { R: 180, SR: 150, SSR: 110, UR: 66 }[rarity];
  tone(base, .7, rarity === "UR" ? .2 : .1, rarity === "UR" ? 980 : 460, "sawtooth");
  if (rarityRank[rarity] >= rarityRank.SSR) [523, 659, 784].forEach((freq, index) => tone(freq, 1.2, .05, null, "sine", .08 + index * .06));
}
function playImpactSound() { tone(110, .16, .05, 70, "square"); }
function playBattleResultSound(won) { if (won) [392, 494, 587].forEach((freq, index) => tone(freq, .55, .04, null, "sine", index * .12)); else tone(150, .6, .06, 72, "sawtooth"); }
function vibrate(pattern) { if (state.settings.haptic && navigator.vibrate) navigator.vibrate(pattern); }

function startParticles(colors) {
  stopParticles();
  const canvas = document.querySelector("#particle-canvas");
  const context = canvas.getContext("2d");
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;
  const particles = Array.from({ length: state.settings.reduceFlash ? 28 : 58 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: (1 + Math.random() * 4) * ratio,
    speed: (.3 + Math.random() * 1.3) * ratio,
    drift: -.6 + Math.random() * 1.2,
    color: randomFrom(colors)
  }));
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

document.querySelectorAll(".bottom-nav button[data-screen]").forEach(button => button.addEventListener("click", () => navigateTo(button.dataset.screen)));
document.querySelectorAll("[data-screen-target]").forEach(button => button.addEventListener("click", () => navigateTo(button.dataset.screenTarget)));
document.querySelector("#draw-ten").addEventListener("click", () => performDraw(10));
document.querySelector("#draw-one").addEventListener("click", () => performDraw(1));
document.querySelector("#summon-skip").addEventListener("click", () => showSummonResults());
document.querySelector("#summon-hero").addEventListener("click", () => showSummonResults());
document.querySelector("#summon-close").addEventListener("click", closeSummon);
document.querySelectorAll("[data-mission]").forEach(button => button.addEventListener("click", () => startBattle(Number(button.dataset.mission))));
document.querySelector("#battle-skip").addEventListener("click", showAllBattleLogs);
document.querySelector("#battle-close").addEventListener("click", closeBattle);
document.querySelector("#replenish-button").addEventListener("click", replenishTroops);
document.querySelectorAll("[data-dialog]").forEach(button => button.addEventListener("click", () => showInfoDialog(button.dataset.dialog)));
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
