/* ==========================================================================
   Ledyvas — generador de las páginas de Guías (SEO), 5 idiomas
   node build-guias.js
   - ES: guias.html + guia-*.html en la raíz
   - EN/IT/FR/PT: en/guides.html + en/guide-*.html, etc.
   El header/nav/footer de cada idioma se EXTRAE de una página existente
   (SOURCE) para que coincida exacto con el sitio. Para agregar una guía:
   sumá una familia a FAMILIES y su contenido a cada locale de ARTICLES.
   ========================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");

// -------- helpers de extracción --------
function extractBoilerplate(sourceFile, resourcesH4) {
  const html = fs.readFileSync(sourceFile, "utf8");
  const topStart = html.indexOf('<div class="cookie-consent-banner"');
  const mainStart = html.indexOf("<main");
  if (topStart < 0 || mainStart < 0) throw new Error("sin boilerplate superior en " + sourceFile);
  const top = html.slice(topStart, mainStart).replace(/\s+$/, "") + "\n";

  const footStart = html.indexOf('<footer class="site-footer">');
  const footEnd = html.indexOf("</footer>");
  if (footStart < 0 || footEnd < 0) throw new Error("sin footer en " + sourceFile);
  const bottom = html.slice(footStart, footEnd + "</footer>".length) + "\n";

  const anchor = `<h4>${resourcesH4}</h4>\n        <ul>\n`;
  return { top, bottom, resourcesAnchor: anchor };
}

const GA_HEAD = `<!-- Google tag (gtag.js) con Consent Mode v2 -->
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': (typeof localStorage !== 'undefined' && localStorage.getItem('ledyvas-cookie-consent') === 'accepted') ? 'granted' : 'denied'
  });
</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-DYMN29KT3X"></script>
<script>
  gtag("js", new Date());
  gtag("config", "G-DYMN29KT3X");
</script>`;

const GUIDE_CSS = `<style>
  .guia-main { padding-top: 48px; }
  .guia-wrap { max-width: 760px; margin: 0 auto; padding: 0 20px 80px; }
  .guia-crumbs { font-size: 13px; color: var(--gray-500, #6b7280); margin-bottom: 18px; }
  .guia-crumbs a { color: inherit; }
  .guia-main h1 { font-size: clamp(1.8rem, 4.5vw, 2.6rem); line-height: 1.15; margin: 0 0 14px; }
  .guia-lede { font-size: 1.15rem; line-height: 1.6; color: var(--gray-700, #374151); margin: 0 0 8px; }
  .guia-body { font-size: 1.03rem; line-height: 1.72; }
  .guia-body h2 { font-size: 1.4rem; margin: 40px 0 12px; }
  .guia-body h3 { font-size: 1.1rem; margin: 26px 0 8px; }
  .guia-body p { margin: 0 0 16px; }
  .guia-body ul, .guia-body ol { margin: 0 0 18px; padding-left: 22px; }
  .guia-body li { margin-bottom: 8px; }
  .guia-body strong { color: var(--navy, #0B1F3A); }
  .guia-cta { background: var(--soft, #eef2fb); border: 1px solid var(--gray-200, #e5e7eb); border-radius: 14px; padding: 26px 28px; margin: 40px 0 12px; }
  .guia-cta h3 { margin: 0 0 8px; font-size: 1.15rem; }
  .guia-cta p { margin: 0 0 16px; color: var(--gray-700, #374151); }
  .guia-cta .btn { margin-right: 10px; }
  .guia-related { border-top: 1px solid var(--gray-200, #e5e7eb); margin-top: 44px; padding-top: 22px; }
  .guia-related h2 { font-size: 1.1rem; margin: 0 0 10px; }
  .guia-related a { display: block; margin-bottom: 6px; }
  .guias-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 30px; }
  .guia-card { background: #fff; border: 1px solid var(--gray-200, #e5e7eb); border-radius: 14px; padding: 24px; display: flex; flex-direction: column; }
  .guia-card h3 { margin: 0 0 8px; font-size: 1.12rem; }
  .guia-card p { margin: 0 0 16px; color: var(--gray-600, #4b5563); font-size: 0.96rem; flex: 1; }
</style>`;

// -------- config de idiomas --------
const LOCALES = {
  es: { dir: "",    hl: "es", source: "sectores.html", sectoresPage: "sectores.html",       resH4: "Recursos",   guiaWord: "Guías",  indexSlug: "guias.html",  ctaH: "Probá Ledyvas gratis", ctaP: "Instalá Ledyvas en tu PC con Windows y usalo sin límite de tiempo en modo prueba. Sin tarjeta, sin compromiso.", ctaBtn1: "Descargar la prueba", ctaBtn2: "Ver precios", dl: "descargas.html", pr: "precios.html", home: "index.html", crumbHome: "Inicio", readMore: "Seguí leyendo", indexH1: "Guías de gestión", indexLede: "Cómo llevar las compras, el inventario y los costos de un negocio de verdad, sin planillas que no cuadran.", indexTitle: "Guías de gestión para negocios y establecimientos | Ledyvas", indexDesc: "Guías prácticas sobre software de gestión para restaurantes, catering, comercios y operadores de excursiones turísticas: compras, inventario, costos y reportes.", readGuide: "Leer la guía" },
  en: { dir: "en/", hl: "en", source: "en/software.html", sectoresPage: "industries.html",    resH4: "Resources",  guiaWord: "Guides", indexSlug: "guides.html", ctaH: "Try Ledyvas for free", ctaP: "Install Ledyvas on your Windows PC and use it with no time limit in trial mode. No card, no commitment.", ctaBtn1: "Download the trial", ctaBtn2: "See pricing", dl: "download.html", pr: "pricing.html", home: "index.html", crumbHome: "Home", readMore: "Keep reading", indexH1: "Management guides", indexLede: "How to run the purchasing, inventory and costs of a real business, without spreadsheets that never add up.", indexTitle: "Management software guides for restaurants, catering and shops | Ledyvas", indexDesc: "Practical guides on management software for restaurants, catering, shops and tour operators: purchasing, inventory, costs and reports.", readGuide: "Read the guide" },
  it: { dir: "it/", hl: "it", source: "it/software.html", sectoresPage: "settori.html",    resH4: "Risorse",    guiaWord: "Guide",  indexSlug: "guide.html",  ctaH: "Prova Ledyvas gratis", ctaP: "Installa Ledyvas sul tuo PC Windows e usalo senza limiti di tempo in modalità prova. Senza carta, senza impegno.", ctaBtn1: "Scarica la prova", ctaBtn2: "Vedi i prezzi", dl: "download.html", pr: "prezzi.html", home: "index.html", crumbHome: "Home", readMore: "Continua a leggere", indexH1: "Guide alla gestione", indexLede: "Come gestire acquisti, magazzino e costi di un'attività vera, senza fogli di calcolo che non tornano.", indexTitle: "Guide al software gestionale per ristoranti, catering e negozi | Ledyvas", indexDesc: "Guide pratiche sul software gestionale per ristoranti, catering, negozi e tour operator: acquisti, magazzino, costi e report.", readGuide: "Leggi la guida" },
  fr: { dir: "fr/", hl: "fr", source: "fr/logiciel.html", sectoresPage: "secteurs.html",   resH4: "Ressources", guiaWord: "Guides", indexSlug: "guides.html", ctaH: "Essayez Ledyvas gratuitement", ctaP: "Installez Ledyvas sur votre PC Windows et utilisez-le sans limite de temps en mode essai. Sans carte, sans engagement.", ctaBtn1: "Télécharger l'essai", ctaBtn2: "Voir les tarifs", dl: "telechargements.html", pr: "tarifs.html", home: "index.html", crumbHome: "Accueil", readMore: "À lire ensuite", indexH1: "Guides de gestion", indexLede: "Comment gérer les achats, le stock et les coûts d'une entreprise réelle, sans tableurs qui ne tombent jamais juste.", indexTitle: "Guides logiciel de gestion pour restaurants, traiteurs et commerces | Ledyvas", indexDesc: "Guides pratiques sur le logiciel de gestion pour restaurants, traiteurs, commerces et organisateurs d'excursions : achats, stock, coûts et rapports.", readGuide: "Lire le guide" },
  pt: { dir: "pt/", hl: "pt", source: "pt/software.html", sectoresPage: "setores.html",    resH4: "Recursos",   guiaWord: "Guias",  indexSlug: "guias.html",  ctaH: "Experimente o Ledyvas grátis", ctaP: "Instale o Ledyvas no seu PC com Windows e use sem limite de tempo em modo de teste. Sem cartão, sem compromisso.", ctaBtn1: "Baixar o teste", ctaBtn2: "Ver preços", dl: "downloads.html", pr: "precos.html", home: "index.html", crumbHome: "Início", readMore: "Continue lendo", indexH1: "Guias de gestão", indexLede: "Como gerir compras, stock e custos de um negócio de verdade, sem planilhas que nunca fecham.", indexTitle: "Guias de software de gestão para restaurantes, catering e comércios | Ledyvas", indexDesc: "Guias práticos sobre software de gestão para restaurantes, catering, comércios e operadores de excursões: compras, stock, custos e relatórios.", readGuide: "Ler o guia" }
};

// -------- familias de guías (para hreflang y cross-links) --------
const FAMILIES = ["establecimientos", "restaurantes", "excursiones"];
const SLUGS = {
  establecimientos: { es: "guia-software-establecimientos.html", en: "en/guide-business-management-software.html", it: "it/guida-software-gestionale-aziendale.html", fr: "fr/guide-logiciel-gestion-entreprise.html", pt: "pt/guia-software-gestao-empresarial.html" },
  restaurantes:     { es: "guia-software-restaurantes.html",     en: "en/guide-restaurant-management-software.html", it: "it/guida-software-gestione-ristoranti.html", fr: "fr/guide-logiciel-restaurant.html", pt: "pt/guia-software-gestao-restaurantes.html" },
  excursiones:      { es: "guia-software-excursiones-turisticas.html", en: "en/guide-tour-operator-software.html", it: "it/guida-software-tour-operator.html", fr: "fr/guide-logiciel-excursions-touristiques.html", pt: "pt/guia-software-excursoes-turisticas.html" }
};
const INDEX_SLUG = { es: "guias.html", en: "en/guides.html", it: "it/guide.html", fr: "fr/guides.html", pt: "pt/guias.html" };

// -------- contenido por idioma --------
const ARTICLES = require("./guias-contenido.js");

// -------- render --------
function hreflangs(map) {
  return ["es", "en", "it", "fr", "pt"]
    .map((l) => `<link rel="alternate" hreflang="${l}" href="https://ledyvas.com/${map[l]}">`)
    .concat([`<link rel="alternate" hreflang="x-default" href="https://ledyvas.com/${map.es}">`])
    .join("\n");
}

function buildLocale(lc) {
  const L = LOCALES[lc];
  const bp = extractBoilerplate(L.source, L.resH4);
  // inyectar link de Guías en Recursos
  const guiaLi = `          <li><a href="${path.basename(L.indexSlug)}">${L.guiaWord}</a></li>\n`;
  const bottom = bp.bottom.replace(bp.resourcesAnchor, bp.resourcesAnchor + guiaLi);

  function page({ slugMap, eyebrow, title, description, h1, lede, body, related }) {
    const slug = slugMap[lc];
    const bn = path.basename(slug);
    return `<!doctype html>
<html lang="${L.hl}">
<head>
${GA_HEAD}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="icon" href="/assets/img/favicon.png">
<link rel="canonical" href="https://ledyvas.com/${slug}">
${hreflangs(slugMap)}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/style.css">
${GUIDE_CSS}
</head>
<body>

${bp.top}

<main class="guia-main">
  <div class="guia-wrap">
    <p class="guia-crumbs"><a href="${L.home}">${L.crumbHome}</a> &rsaquo; <a href="${path.basename(L.indexSlug)}">${L.guiaWord}</a> &rsaquo; ${eyebrow}</p>
    <h1>${h1}</h1>
    <p class="guia-lede">${lede}</p>
    <article class="guia-body">
${body}
      <div class="guia-cta">
        <h3>${L.ctaH}</h3>
        <p>${L.ctaP}</p>
        <a href="${L.dl}" class="btn btn-primary">${L.ctaBtn1}</a>
        <a href="${L.pr}" class="btn btn-outline">${L.ctaBtn2}</a>
      </div>
    </article>
    <div class="guia-related">
      <h2>${L.readMore}</h2>
${related}
    </div>
  </div>
</main>

${bottom}
<script src="/assets/js/main.js"></script>
</body>
</html>
`;
  }

  // artículos
  const arts = ARTICLES[lc];
  FAMILIES.forEach((fam) => {
    const a = arts[fam];
    const related = FAMILIES.filter((f) => f !== fam)
      .map((f) => `      <a href="${path.basename(SLUGS[f][lc])}">${arts[f].h1}</a>`)
      .concat([`      <a href="${L.sectoresPage}">${arts._sectores}</a>`])
      .join("\n");
    const html = page({ slugMap: SLUGS[fam], eyebrow: a.eyebrow, title: a.title, description: a.description, h1: a.h1, lede: a.lede, body: a.body, related });
    fs.writeFileSync(SLUGS[fam][lc], html);
    console.log("  " + SLUGS[fam][lc]);
  });

  // índice
  const cards = FAMILIES.map((fam) => {
    const a = arts[fam];
    return `      <div class="guia-card">
        <h3><a href="${path.basename(SLUGS[fam][lc])}">${a.h1}</a></h3>
        <p>${a.lede}</p>
        <a href="${path.basename(SLUGS[fam][lc])}" class="btn btn-outline">${L.readGuide}</a>
      </div>`;
  }).join("\n");

  const idx = `<!doctype html>
<html lang="${L.hl}">
<head>
${GA_HEAD}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${L.indexTitle}</title>
<meta name="description" content="${L.indexDesc}">
<link rel="icon" href="/assets/img/favicon.png">
<link rel="canonical" href="https://ledyvas.com/${INDEX_SLUG[lc]}">
${hreflangs(INDEX_SLUG)}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/style.css">
${GUIDE_CSS}
</head>
<body>

${bp.top}

<main class="guia-main">
  <div class="guia-wrap" style="max-width:900px">
    <p class="guia-crumbs"><a href="${L.home}">${L.crumbHome}</a> &rsaquo; ${L.guiaWord}</p>
    <h1>${L.indexH1}</h1>
    <p class="guia-lede">${L.indexLede}</p>
    <div class="guias-grid">
${cards}
    </div>
  </div>
</main>

${bottom}
<script src="/assets/js/main.js"></script>
</body>
</html>
`;
  fs.writeFileSync(INDEX_SLUG[lc], idx);
  console.log("  " + INDEX_SLUG[lc]);
}

["es", "en", "it", "fr", "pt"].forEach((lc) => {
  console.log("== " + lc + " ==");
  buildLocale(lc);
});
console.log("\nListo. No olvidar: reenviar sitemap.xml en Search Console.");
