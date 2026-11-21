const $ = id => document.getElementById(id);
let settings = { priceMode: "exclusive" };
let currentData = null;

const inr = value => value == null || !Number.isFinite(Number(value)) ? "—" :
  "₹" + Number(value).toLocaleString("en-IN", {minimumFractionDigits: 0, maximumFractionDigits: 2});

function setNotice(message, type="info") {
  $("notice").textContent = message;
  $("notice").style.color = type === "error" ? "#b91c1c" : "#475569";
  $("notice").style.borderColor = "transparent";
  $("notice").style.background = "transparent";
}
function selectedPrice(item) {
  if (!item) return null;
  return settings.priceMode === "exclusive"
    ? (item.basePricePerGram ?? item.base_price_per_gram ?? item.pricePerGram)
    : (item.finalPricePerGram ?? item.pricePerGram ?? item.final_price_per_gram);
}
function obsValue(observations, instrumentId) {
  const item = (observations || []).find(x => x.instrument_id === instrumentId);
  return item && item.status !== "missing" ? item.value : null;
}
function displayed(value) {
  if (value == null) return null;
  // Snapdata benchmark rates are ex-GST; inclusive view adds estimated 3% GST.
  return settings.priceMode === "inclusive" ? Number(value) * 1.03 : Number(value);
}
function render() {
  $("inclBtn").classList.toggle("active", settings.priceMode === "inclusive");
  $("exclBtn").classList.toggle("active", settings.priceMode === "exclusive");
  if (!currentData) return;

  const goldObs = currentData.gold?.observations || [];
  const silverObs = currentData.silver?.observations || [];
  const g24 = obsValue(goldObs, "XAU.24K.INR.G");
  const g22 = obsValue(goldObs, "XAU.22K.INR.G");
  const g18 = obsValue(goldObs, "XAU.18K.INR.G");
  const silverKg = obsValue(silverObs, "XAG.INR.KG");

  $("gold24").textContent = inr(displayed(g24 == null ? null : Number(g24) * 10));
  $("gold22").textContent = inr(displayed(g22 == null ? null : Number(g22) * 10));
  $("gold18").textContent = inr(displayed(g18 == null ? null : Number(g18) * 10));
  const silverGram = silverKg == null ? null : Number(silverKg) / 1000;
  $("silverKg").textContent = inr(displayed(silverKg));
  $("silverGram").textContent = inr(displayed(silverGram));
  $("silver10").textContent = inr(displayed(silverGram == null ? null : silverGram * 10));

  const dates = [...goldObs, ...silverObs].map(x => x.date).filter(Boolean).sort();
  const rateDate = dates.at(-1);
  $("updatedAt").textContent = rateDate
    ? new Date(rateDate + "T12:00:00+05:30").toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})
    : "Date unavailable";
  const missing = g24 == null || g22 == null || g18 == null || silverKg == null;
  $("statusLabel") && ($("statusLabel").textContent = missing ? "Partial data" : "Rates loaded");
  setNotice(`India-wide IBJA benchmark · ${settings.priceMode === "inclusive" ? "Estimated 3% GST included" : "GST not included"} · Making charges not included.`);
}
async function loadRates() {
  $("refreshBtn").disabled = true; $("refreshIcon").textContent = "…";
  setNotice("Getting the latest India-wide rates…");
  try {
    const [goldRes, silverRes] = await Promise.all([
      fetch("https://snapdata.dev/api/v1/gold/in/latest.json", {cache:"no-cache"}),
      fetch("https://snapdata.dev/api/v1/silver/in/latest.json", {cache:"no-cache"})
    ]);
    if (!goldRes.ok || !silverRes.ok) throw new Error("The rate service is temporarily unavailable");
    const [gold, silver] = await Promise.all([goldRes.json(), silverRes.json()]);
    currentData = {gold, silver, savedAt:Date.now()};
    await chrome.storage.local.set({cachedRates:currentData});
    render();
  } catch (e) {
    $("statusLabel") && ($("statusLabel").textContent = "Could not update");
    const saved = await chrome.storage.local.get("cachedRates");
    if (saved.cachedRates) {
      currentData = saved.cachedRates;
      render();
      setNotice("Showing your last saved rates. Couldn't update just now—try again shortly.", "error");
    } else {
      setNotice("Rates couldn't load. Check your internet connection and try again.", "error");
      $("updatedAt").textContent = "Unavailable";
    }
  } finally {
    $("refreshBtn").disabled = false; $("refreshIcon").textContent = "↻";
  }
}
async function loadSettings() {
  const saved = await chrome.storage.local.get(["settings","cachedRates"]);
  settings = {...settings, ...(saved.settings || {})};
  if (settings.apiKey || settings.backendUrl) {
    delete settings.apiKey;
    delete settings.backendUrl;
    await chrome.storage.local.set({settings});
  }
  currentData = saved.cachedRates || null;
  render();
  if (currentData) { render(); setNotice("Showing your last saved rates while checking for an update…"); }
  await loadRates();
}
$("settingsBtn").onclick = () => chrome.runtime.openOptionsPage();
$("refreshBtn").onclick = loadRates;
$("inclBtn").onclick = async () => { settings.priceMode="inclusive"; await chrome.storage.local.set({settings}); render(); };
$("exclBtn").onclick = async () => { settings.priceMode="exclusive"; await chrome.storage.local.set({settings}); render(); };
loadSettings();

function showTab(which) {
  const gold = which === "gold";
  $("goldView").classList.toggle("hidden", !gold);
  $("silverView").classList.toggle("hidden", gold);
  $("goldTab").classList.toggle("active", gold);
  $("silverTab").classList.toggle("active", !gold);
  $("goldTab").setAttribute("aria-pressed", String(gold));
  $("silverTab").setAttribute("aria-pressed", String(!gold));
  chrome.storage.local.set({activeTab: which});
}
$("goldTab").onclick = () => showTab("gold");
$("silverTab").onclick = () => showTab("silver");
(async()=>{const {activeTab="gold"}=await chrome.storage.local.get("activeTab");showTab(activeTab);})();