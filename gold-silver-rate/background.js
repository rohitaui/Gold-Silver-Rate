chrome.runtime.onInstalled.addListener(async () => {
  const {settings} = await chrome.storage.local.get("settings");
  if (!settings) await chrome.storage.local.set({settings:{priceMode:"exclusive"}});
  chrome.alarms.create("daily-rates-refresh", {periodInMinutes: 1440});
});
chrome.alarms.onAlarm.addListener(async alarm => {
  if (alarm.name !== "daily-rates-refresh") return;
  try {
    const [g,s]=await Promise.all([
      fetch("https://snapdata.dev/api/v1/gold/in/latest.json",{cache:"no-cache"}),
      fetch("https://snapdata.dev/api/v1/silver/in/latest.json",{cache:"no-cache"})
    ]);
    if (!g.ok || !s.ok) return;
    const [gold,silver]=await Promise.all([g.json(),s.json()]);
    await chrome.storage.local.set({cachedRates:{gold,silver,savedAt:Date.now()}});
  } catch (_) { /* retain last successful rates */ }
});