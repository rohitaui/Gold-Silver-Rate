const $=id=>document.getElementById(id);
(async()=>{
  const {settings={}}=await chrome.storage.local.get("settings");
  $("mode").value=settings.priceMode||"exclusive";
})();
$("save").onclick=async()=>{
  const {settings={}}=await chrome.storage.local.get("settings");
  await chrome.storage.local.set({settings:{priceMode:$("mode").value}});
  $("status").textContent="Changes saved";
  setTimeout(()=>$("status").textContent="",2500);
};