// Genera /ar/*.html (sitio en árabe, RTL) a partir de las páginas /en/ y ar-translations.js.
// Uso: node build-ar.js   (re-ejecutable: sobrescribe ar/*.html)
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const T = require("./ar-translations.js");
const PAGES = ["index", "software", "solutions", "industries", "pricing", "download", "contact", "company", "ultimate",
  "customer-portal", "documentation", "eula", "privacy", "refund-policy", "terms", "help-zoho-books",
  "guides", "guide-business-management-software", "guide-restaurant-management-software", "guide-tour-operator-software",
  "user-manual", "professional-manual"];
const LEGAL = ["eula", "privacy", "refund-policy", "terms"];
const LEGAL_NOTE = '<p style="background:#FFF8E6;border:1px solid #E8D39A;border-radius:8px;padding:12px 16px;margin:0 0 24px;font-size:14px;line-height:1.7;color:#5A4A1B;">هذه الترجمة العربية مقدَّمة للتيسير فقط وليست ملزمة قانونيًا؛ وفي حال وجود أي تعارض تسود <a href="/en/' + "@@PAGE@@" + '.html">النسخة الإنجليزية</a>.</p>';
const OUT = path.join(ROOT, "ar");
fs.mkdirSync(OUT, { recursive: true });

const dict = Object.assign({}, T.main, T.boiler);
const missing = new Set();

function translateText(str) {
  const key = str.replace(/\s+/g, " ").trim();
  if (!key || !/[A-Za-z]/.test(key)) return str;
  if (dict[key] !== undefined) {
    const lead = str.match(/^\s*/)[0];
    const trail = str.match(/\s*$/)[0];
    return lead + dict[key] + trail;
  }
  return str;
}

function translateHtml(html) {
  // nodos de texto
  html = html.replace(/>([^<>]+)</g, (m, s) => ">" + translateText(s) + "<");
  // atributos
  html = html.replace(/\b(alt|aria-label|title|placeholder)="([^"]*)"/g, (m, a, v) => {
    const k = v.trim();
    return dict[k] !== undefined ? `${a}="${dict[k]}"` : m;
  });
  return html;
}

function esc(s) { return s.replace(/"/g, "&quot;"); }

function langLinks(html) {
  // hrefs de las otras lenguas tomados del dropdown de la página EN
  const dd = html.match(/<div class="lang-dropdown-menu">([\s\S]*?)<\/div>/);
  const links = {};
  if (dd) {
    const re = /<a href="([^"]+)"><span class="fi fi-(\w+)"><\/span> (\w+)<\/a>/g;
    let m;
    while ((m = re.exec(dd[1]))) links[m[3]] = m[1];
  }
  return links;
}

const FLAG = '<img class="ar-flag" src="/assets/img/flag-arab-league.svg" alt="" width="20" height="14">';

for (const page of PAGES) {
  const src = fs.readFileSync(path.join(ROOT, "en", page + ".html"), "utf8");
  const meta = T.metas[page];
  const other = langLinks(src);
  other.EN = `/en/${page}.html`;
  const order = ["ES", "IT", "EN", "FR", "PT"];
  const flagCode = { ES: "es", IT: "it", EN: "gb", FR: "fr", PT: "pt" };

  let html = src;

  // 1) traducción de textos y atributos (todo el documento)
  html = translateHtml(html);

  // 2) <html>
  html = html.replace('<html lang="en">', '<html lang="ar" dir="rtl">');

  // 3) meta
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${meta.t}</title>`);
  html = html.replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(meta.d)}$2`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(meta.t)}$2`);
  html = html.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(meta.d)}$2`);
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(meta.t)}$2`);
  html = html.replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(meta.d)}$2`);
  html = html.replace(/(<meta property="og:locale" content=")[^"]*(")/, `$1ar$2`);
  const url = page === "index" ? "https://ledyvas.com/ar/" : `https://ledyvas.com/ar/${page}.html`;
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
  html = html.replace(/("url": ")https:\/\/ledyvas\.com\/en\/[^"]*(")/g, `$1${url}$2`);
  html = html.replace(/("description": ")[^"]*(")/g, `$1${meta.d.replace(/"/g, "'")}$2`);

  // 4) fuente árabe
  html = html.replace(
    '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flag-icons',
    '<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700;800&display=swap" rel="stylesheet">\n<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flag-icons'
  );

  // 5) selector de idioma (dropdown + overlay)
  const menu = order.filter(l => l !== "AR").map(l =>
    `    <a href="${other[l] || "/index.html"}"><span class="fi fi-${flagCode[l]}"></span> ${l}</a>`).join("\n");
  const dropdown = `<div class="lang-dropdown">
      <button class="lang-dropdown-toggle" data-lang-toggle type="button" aria-haspopup="true" aria-expanded="false">${FLAG} AR<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="6 9 12 15 18 9"/></svg></button>
      <div class="lang-dropdown-menu">
${menu}
      </div>
    </div>`;
  html = html.replace(/<div class="lang-dropdown">[\s\S]*?<\/div>\s*<\/div>/, dropdown);
  const sw = order.map(l => `          <a href="${other[l] || "/index.html"}" class="btn" style="padding:8px 14px;font-size:13px;border:1px solid rgba(255,255,255,0.22);color:rgba(255,255,255,0.75);"><span class="fi fi-${flagCode[l]}"></span> ${l}</a>`).join("\n")
    + `\n          <button class="active">${FLAG} AR</button>`;
  html = html.replace(/(<div class="lang-switch">)[\s\S]*?(<\/div>)/, `$1\n${sw}\n        $2`);

  // 6) enlaces relativos: si no existe la página en /ar/, apunta a la versión /en/
  html = html.replace(/href="([^"#:/][^"#:]*?)(#[^"]*)?"/g, (m, file, hash) => {
    if (file.startsWith("..")) return m;
    const base = file.split("?")[0].replace(/\.html$/, "");
    if (PAGES.includes(base)) return m;
    return `href="/en/${file}${hash || ""}"`;
  });

  // 6b) nota de traducción de cortesía en páginas legales
  if (LEGAL.includes(page)) {
    html = html.replace(/(<main[^>]*>)/, "$1" + LEGAL_NOTE.replace("@@PAGE@@", page));
  }

  // 7) flechas "→" restantes
  html = html.replace(/→/g, "←");

  const outName = path.join(OUT, page + ".html");
  fs.writeFileSync(outName, html);

  // control: textos en inglés sin traducir dentro de <main>
  const mainPart = (html.match(/<main[^>]*>[\s\S]*?<\/main>/) || [""])[0];
  const re = />([^<>]+)</g; let x;
  while ((x = re.exec(mainPart))) {
    const s = x[1].replace(/\s+/g, " ").trim();
    if (s && /[A-Za-z]{4,}/.test(s) && !/[؀-ۿ]/.test(s)) missing.add(`${page}: ${s.slice(0, 80)}`);
  }
}

console.log("Páginas generadas:", PAGES.length);
if (missing.size) { console.log("Textos sin traducir (revisar):"); [...missing].forEach(s => console.log(" -", s)); }
