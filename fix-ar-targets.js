// Apunta el selector AR de las páginas de otros idiomas a la página /ar/ equivalente cuando existe. Idempotente.
const fs = require("fs"), path = require("path");
const AR_PAGES = ["index","software","solutions","industries","pricing","download","contact","company","ultimate",
 "customer-portal","documentation","eula","privacy","refund-policy","terms","help-zoho-books","guides",
 "guide-business-management-software","guide-restaurant-management-software","guide-tour-operator-software","user-manual","professional-manual"];
let changed=0;
for (const d of [".","en","it","fr","pt"]) for (const f of fs.readdirSync(d)) {
  if (!f.endsWith(".html")) continue;
  const p=path.join(d,f); let h=fs.readFileSync(p,"utf8");
  if(!h.includes("flag-arab-league")) continue;
  let enHref = d==="en" ? "/en/"+f : ((h.match(/<a href="(\/en\/[^"]+)"><span class="fi fi-gb"><\/span> EN<\/a>/)||[])[1]);
  if(!enHref) continue;
  const base=enHref.replace(/^\/en\//,"").replace(/\.html$/,"");
  if(!AR_PAGES.includes(base)||base==="index") continue;
  const target=`/ar/${base}.html`;
  const nh=h.replace(/<a href="\/ar\/index\.html"([^>]*)>(<img class="ar-flag")/g,`<a href="${target}"$1>$2`);
  if(nh!==h){fs.writeFileSync(p,nh);changed++;}
}
console.log("actualizadas",changed);
