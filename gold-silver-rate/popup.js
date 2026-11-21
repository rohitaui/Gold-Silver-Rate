const $ = id => document.getElementById(id);

let settings = { priceMode: "exclusive" };
let currentData = null;
let activeTab = "gold";
let activeRange = "7d";
const historyCache = {};

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


function chartValue(o){
  if(!o || o.value==null || o.status==="missing" || o.status==="not_backfilled" || o.status==="estimated" || o.is_trading_day===false || o.filled_from) return null;
  const n=Number(o.value); if(!Number.isFinite(n)) return null;
  return activeTab==="gold" ? n*10 : n/100;
}
function shortDate(s){const [y,m,d]=s.split("-").map(Number);return new Date(y,m-1,d).toLocaleDateString("en-IN",{day:"numeric",month:"short"});}
function renderHistory(observations){
  const id=activeTab==="gold"?"XAU.24K.INR.G":"XAG.INR.KG";
  $("historySubtitle").textContent=activeTab==="gold"?"24K Gold · per 10 grams":"Silver · per 10 grams";
  let rows=(observations||[]).filter(o=>o.instrument_id===id).sort((a,b)=>a.date.localeCompare(b.date));
  if(rows.length && activeRange!=="1y"){
    const latestDate=new Date(rows[rows.length-1].date+"T12:00:00");
    const days=activeRange==="7d"?7:30;
    const cutoff=new Date(latestDate);cutoff.setDate(cutoff.getDate()-(days-1));
    const cutoffKey=cutoff.toISOString().slice(0,10);
    rows=rows.filter(o=>o.date>=cutoffKey);
  }
  const pts=rows.map(o=>({date:o.date,value:chartValue(o)}));
  const valid=pts.filter(p=>p.value!=null);
  if(!valid.length){
    $("historyLatest").textContent="—";
    $("historyChange").textContent="No published prices";
    $("historyChange").className="";
    $("historyCoverage").textContent="No directly observed sessions in this range";
    $("historyChart").innerHTML='<div class="history-empty">No published historical prices for this period.</div>';
    return;
  }
  const first=valid[0],last=valid[valid.length-1],delta=last.value-first.value,pct=first.value?delta/first.value*100:0;
  $("historyLatest").textContent=inr(displayed(last.value));
  $("historyChange").textContent=(delta>=0?"+":"")+inr(displayed(delta))+" ("+(pct>=0?"+":"")+pct.toFixed(2)+"%)";
  $("historyChange").className=delta>0?"positive":delta<0?"negative":"";
  $("historyCoverage").textContent=valid.length===1?shortDate(first.date):shortDate(first.date)+" – "+shortDate(last.date)+" · "+valid.length+" sessions";
  const W=500,H=104,T=7,B=20,L=49,R=7,min=Math.min(...valid.map(p=>p.value)),max=Math.max(...valid.map(p=>p.value)),pad=(max-min)*.14||Math.max(max*.004,1),lo=min-pad,hi=max+pad;
  const x=i=>L+i/Math.max(pts.length-1,1)*(W-L-R),y=v=>T+(1-(v-lo)/(hi-lo))*(H-T-B);
  let segs=[],seg=[];pts.forEach((p,i)=>{if(p.value==null){if(seg.length)segs.push(seg);seg=[];}else seg.push({...p,x:x(i),y:y(p.value)});});if(seg.length)segs.push(seg);
  const paths=segs.map(a=>a.map((p,i)=>(i?"L":"M")+p.x.toFixed(1)+","+p.y.toFixed(1)).join(" "));
  const lastSeg=segs[segs.length-1],dot=lastSeg[lastSeg.length-1];
  const area=lastSeg.length>1?lastSeg.map((p,i)=>(i?"L":"M")+p.x.toFixed(1)+","+p.y.toFixed(1)).join(" ")+` L ${dot.x} ${H-B} L ${lastSeg[0].x} ${H-B} Z`:"";
  const labels=[pts[0],pts[Math.floor((pts.length-1)/2)],pts[pts.length-1]].filter(Boolean);
  const yLabels=[0,.5,1].map(t=>({y:T+t*(H-T-B),v:hi-t*(hi-lo)}));
  $("historyChart").innerHTML=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="Historical price chart">
    <defs><linearGradient id="historyFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#3B82F6" stop-opacity=".17"/><stop offset="1" stop-color="#3B82F6" stop-opacity="0"/></linearGradient></defs>
    ${yLabels.map(a=>`<line class="chart-grid" x1="${L}" x2="${W}" y1="${a.y}" y2="${a.y}"/><text class="chart-y-label" x="0" y="${a.y+3}">${Math.round(a.v).toLocaleString("en-IN")}</text>`).join("")}
    ${area?`<path class="chart-area" d="${area}"/>`:""}${paths.map(d=>`<path class="chart-line" d="${d}"/>`).join("")}
    <circle class="chart-dot" cx="${dot.x}" cy="${dot.y}" r="3.5"/>
    ${labels.map((p,i)=>`<text class="chart-label" x="${i===0?L:i===1?W/2:W-R}" y="${H-2}" text-anchor="${i===0?"start":i===1?"middle":"end"}">${shortDate(p.date)}</text>`).join("")}
  </svg>`;
}
async function loadHistory(force=false){
  const key=activeTab+":"+activeRange;
  $("historyChart").innerHTML='<div class="history-loading">Loading price history…</div>';
  if(historyCache[key]&&!force){renderHistory(historyCache[key]);return;}
  const ds=activeTab==="gold"?"gold":"silver";
  const selectors=activeRange==="7d"?["7d","30d"]:activeRange==="30d"?["30d"]:["1y","all","30d"];
  let lastError=null;
  for(const selector of selectors){
    try{
      const url=`https://snapdata.dev/api/v1/${ds}/in/series/${selector}.json`;
      const res=await fetch(url,{cache:"no-store"});
      if(!res.ok)throw new Error(`HTTP ${res.status} for series/${selector}`);
      const data=await res.json();
      if(!Array.isArray(data.observations))throw new Error(data.error?.hint||data.error?.message||"Unexpected history response");
      const rows=data.observations.filter(o=>o.instrument_id===(activeTab==="gold"?"XAU.24K.INR.G":"XAG.INR.KG"));
      if(!rows.length)throw new Error("The history response contains no matching metal observations");
      historyCache[key]=data.observations;
      renderHistory(historyCache[key]);
      if(selector!==selectors[0] && activeRange==="1y") $("historyCoverage").textContent+=" · available source history only";
      return;
    }catch(e){lastError=e;console.warn("Price history selector failed:",selector,e);}
  }
  $("historyLatest").textContent="—";
  $("historyChange").textContent="History unavailable";
  $("historyChange").className="";
  $("historyCoverage").textContent=lastError?.message||"Daily history feed";
  $("historyChart").innerHTML='<div class="history-empty">Could not retrieve published history. Check your connection and retry.</div>';
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
    await loadHistory(true);
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
  const saved = await chrome.storage.local.get(["settings","cachedRates","activeTab"]);
  settings = {...settings, ...(saved.settings || {})};
  if (settings.apiKey || settings.backendUrl) {
    delete settings.apiKey;
    delete settings.backendUrl;
    await chrome.storage.local.set({settings});
  }
  currentData = saved.cachedRates || null;
  activeTab = saved.activeTab || "gold";
  render();
  await loadHistory();
  if (currentData) { render(); setNotice("Showing your last saved rates while checking for an update…"); }
  await loadRates();
}
$("settingsBtn").onclick = () => chrome.runtime.openOptionsPage();
$("refreshBtn").onclick = loadRates;
$("inclBtn").onclick = async () => { settings.priceMode="inclusive"; await chrome.storage.local.set({settings}); render(); if(historyCache[activeTab+":"+activeRange]) renderHistory(historyCache[activeTab+":"+activeRange]); };
$("exclBtn").onclick = async () => { settings.priceMode="exclusive"; await chrome.storage.local.set({settings}); render(); if(historyCache[activeTab+":"+activeRange]) renderHistory(historyCache[activeTab+":"+activeRange]); };
document.querySelectorAll(".history-range").forEach(button=>button.addEventListener("click",()=>{
  activeRange=button.dataset.range;
  document.querySelectorAll(".history-range").forEach(b=>{const on=b===button;b.classList.toggle("active",on);b.setAttribute("aria-pressed",String(on));});
  loadHistory();
}));
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
  if ($("historyChart")) loadHistory();
}
$("goldTab").onclick = () => showTab("gold");
$("silverTab").onclick = () => showTab("silver");
(async()=>{const {activeTab="gold"}=await chrome.storage.local.get("activeTab");showTab(activeTab);})();