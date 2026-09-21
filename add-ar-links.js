// Agrega el idioma árabe al selector (dropdown + overlay) de las páginas existentes. Idempotente.
const fs = require("fs"), path = require("path");
const AR_PAGES = ["index", "software", "solutions", "industries", "pricing", "download", "contact", "company", "ultimate"];
const FLAG = '<img class="ar-flag" src="/assets/img/flag-arab-league.svg" alt="" width="20" height="14">';
const dirs = [".", "en", "it", "fr", "pt"];
let changed = 0, skipped = 0, nopat = [];
for (const d of dirs) {
  for (const f of fs.readdirSync(d)) {
    if (!f.endsWith(".html")) continue;
    const p = path.join(d, f);
    let h = fs.readFileSync(p, "utf8");
    if (!h.includes("lang-dropdown-menu")) continue;
    if (h.includes("flag-arab-league")) { skipped++; continue; }
    // destino AR: el equivalente EN de esta página
    let enHref = d === "en" ? "/en/" + f : ((h.match(/<a href="(\/en\/[^"]+)"><span class="fi fi-gb"><\/span> EN<\/a>/) || [])[1]);
    const base = enHref ? enHref.replace(/^\/en\//, "").replace(/\.html$/, "") : "index";
    const target = AR_PAGES.includes(base) ? `/ar/${base}.html` : "/ar/index.html";
    // dropdown: añadir antes del cierre del menú
    const before = h;
    h = h.replace(/(<div class="lang-dropdown-menu">[\s\S]*?)(\s*<\/div>)/, `$1\n    <a href="${target}">${FLAG} AR</a>$2`);
    // overlay: añadir después del último enlace/botón de idioma dentro de .lang-switch
    const sw = h.match(/<div class="lang-switch">([\s\S]*?)<\/div>/);
    if (sw) {
      const style = (sw[1].match(/<a [^>]*class="btn"[^>]*style="([^"]+)"/) || [])[1] || "padding:8px 14px;font-size:13px;border:1px solid rgba(255,255,255,0.22);color:rgba(255,255,255,0.75);";
      h = h.replace(/(<div class="lang-switch">[\s\S]*?)(\s*<\/div>)/, `$1\n          <a href="${target}" class="btn" style="${style}">${FLAG} AR</a>$2`);
    }
    if (h === before) { nopat.push(p); continue; }
    fs.writeFileSync(p, h); changed++;
  }
}
console.log("actualizadas:", changed, "| ya tenían:", skipped, "| sin patrón:", nopat.length, nopat.slice(0, 5));
