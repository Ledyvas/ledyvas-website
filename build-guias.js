/* ==========================================================================
   Ledyvas — generador de las páginas de Guías (SEO)
   node build-guias.js   -> escribe guias.html + guia-*.html en la raíz.
   Para agregar una guía nueva: sumá un objeto a ARTICLES y volvé a correr.
   ========================================================================== */
"use strict";
const fs = require("fs");

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

const HEADER = `<div class="cookie-consent-banner" id="cookie-consent-banner" hidden>
  <div class="cookie-consent-inner">
    <p>Usamos cookies para entender cómo se usa este sitio (Google Analytics). Podés aceptar o rechazar este seguimiento. <a href="privacidad.html">Más información</a></p>
    <div class="cookie-consent-actions">
      <button type="button" id="cookie-consent-reject" class="btn btn-outline">Rechazar</button>
      <button type="button" id="cookie-consent-accept" class="btn btn-primary">Aceptar</button>
    </div>
  </div>
</div>

<header class="site-header">
  <div class="container header-inner">
    <a href="index.html" class="brand"><img src="assets/img/logo-icon.png" alt="Ledyvas"></a>
    <nav class="nav-horizontal">
      <a href="index.html">Inicio</a>
      <a href="software.html">Software</a>
      <a href="soluciones.html">Soluciones</a>
      <a href="sectores.html">Sectores</a>
      <a href="precios.html">Precios</a>
      <a href="descargas.html">Descargas</a>
      <a href="empresa.html">Empresa</a>
      <a href="contacto.html">Contacto</a>
    </nav>
    <div class="header-actions">
      <a href="precios.html" class="btn btn-outline">Comprar ahora</a>
      <a href="descargas.html" class="btn btn-primary">Prueba gratuita</a>
    </div>
    <button class="hamburger" data-nav-toggle aria-label="Abrir menú"><span></span><span></span><span></span></button>
  </div>
</header>

<div class="nav-overlay">
  <div class="nav-overlay-top">
    <a href="index.html" class="brand"><img src="assets/img/logo-icon.png" alt="Ledyvas"></a>
    <button class="hamburger" data-nav-toggle aria-label="Cerrar menú"><span></span><span></span><span></span></button>
  </div>
  <div class="nav-overlay-body">
    <nav class="nav-links">
      <a href="index.html">Inicio <small>01</small></a>
      <a href="software.html">Software <small>02</small></a>
      <a href="soluciones.html">Soluciones <small>03</small></a>
      <a href="sectores.html">Sectores <small>04</small></a>
      <a href="precios.html">Precios <small>05</small></a>
      <a href="descargas.html">Descargas <small>06</small></a>
      <a href="empresa.html">Empresa <small>07</small></a>
      <a href="contacto.html">Contacto <small>08</small></a>
    </nav>
    <div class="nav-side">
      <div>
        <div class="nav-side-title">Empieza ahora</div>
        <a href="descargas.html" class="btn btn-gold btn-block">Descargar Ledyvas</a>
        <div style="height:10px"></div>
        <a href="precios.html" class="btn btn-outline-light btn-block">Comprar ahora</a>
      </div>
      <div>
        <div class="nav-side-title">Contacto</div>
        <div class="nav-contact">
          <a href="mailto:info@ledyvas.com">info@ledyvas.com</a>
          <span>Respuesta en 48 horas laborables</span>
        </div>
      </div>
    </div>
  </div>
</div>`;

const FOOTER = `<footer class="site-footer">
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        <a href="index.html" class="brand"><img src="assets/img/logo-icon.png" alt="Ledyvas"></a>
        <p>Software de gestión empresarial todo en uno. Compras, ventas, inventario, producción y reportes desde una única plataforma.</p>
        <a href="https://www.instagram.com/ledyvas/" target="_blank" rel="noopener" class="footer-social-link" aria-label="Ledyvas en Instagram">Instagram</a>
        <a href="https://www.linkedin.com/company/ledyvas/" target="_blank" rel="noopener" class="footer-social-link">LinkedIn</a>
      </div>
      <div class="footer-col">
        <h4>Producto</h4>
        <ul>
          <li><a href="software.html">Software</a></li>
          <li><a href="soluciones.html">Soluciones</a></li>
          <li><a href="sectores.html">Sectores</a></li>
          <li><a href="precios.html">Precios</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Empresa</h4>
        <ul>
          <li><a href="empresa.html">Sobre nosotros</a></li>
          <li><a href="empresa.html#fundador">Fundador</a></li>
          <li><a href="empresa.html#opiniones">Opiniones</a></li>
          <li><a href="empresa.html#faq">Preguntas frecuentes</a></li>
          <li><a href="contacto.html">Contacto</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Recursos</h4>
        <ul>
          <li><a href="guias.html">Guías</a></li>
          <li><a href="descargas.html">Descargas</a></li>
          <li><a href="documentacion.html">Documentación</a></li>
          <li><a href="portal-cliente.html">Portal del cliente</a></li>
          <li><a href="distribuidores.html">Programa de socios</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contacto</h4>
        <ul>
          <li><a href="mailto:info@ledyvas.com">info@ledyvas.com</a></li>
          <li><span style="font-size:14px;">Respuesta en 48h laborables</span></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Ledyvas. Todos los derechos reservados.</span>
      <div class="footer-legal">
        <a href="privacidad.html">Política de privacidad</a>
        <a href="terminos.html">Términos y condiciones</a>
        <a href="eula.html">Licencia de uso (EULA)</a>
        <a href="cookies.html">Política de cookies</a>
        <a href="reembolsos.html">Política de reembolsos</a>
      </div>
    </div>
  </div>
</footer>

<script src="assets/js/main.js"></script>`;

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
  .guia-cta {
    background: var(--soft, #eef2fb); border: 1px solid var(--gray-200, #e5e7eb);
    border-radius: 14px; padding: 26px 28px; margin: 40px 0 12px;
  }
  .guia-cta h3 { margin: 0 0 8px; font-size: 1.15rem; }
  .guia-cta p { margin: 0 0 16px; color: var(--gray-700, #374151); }
  .guia-cta .btn { margin-right: 10px; }
  .guia-related { border-top: 1px solid var(--gray-200, #e5e7eb); margin-top: 44px; padding-top: 22px; }
  .guia-related h2 { font-size: 1.1rem; margin: 0 0 10px; }
  .guia-related a { display: block; margin-bottom: 6px; }
  .guias-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 30px; }
  .guia-card {
    background: #fff; border: 1px solid var(--gray-200, #e5e7eb); border-radius: 14px;
    padding: 24px; display: flex; flex-direction: column;
  }
  .guia-card h3 { margin: 0 0 8px; font-size: 1.12rem; }
  .guia-card p { margin: 0 0 16px; color: var(--gray-600, #4b5563); font-size: 0.96rem; flex: 1; }
</style>`;

function page({ slug, title, description, eyebrow, h1, lede, body, related }) {
  return `<!doctype html>
<html lang="es">
<head>
${GA_HEAD}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="icon" href="assets/img/favicon.png">
<link rel="canonical" href="https://ledyvas.com/${slug}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
${GUIDE_CSS}
</head>
<body>

${HEADER}

<main class="guia-main">
  <div class="guia-wrap">
    <p class="guia-crumbs"><a href="index.html">Inicio</a> › <a href="guias.html">Guías</a> › ${eyebrow}</p>
    <h1>${h1}</h1>
    <p class="guia-lede">${lede}</p>
    <article class="guia-body">
${body}
      <div class="guia-cta">
        <h3>Probá Ledyvas gratis</h3>
        <p>Instalá Ledyvas en tu PC con Windows y usalo sin límite de tiempo en modo prueba. Sin tarjeta, sin compromiso.</p>
        <a href="descargas.html" class="btn btn-primary">Descargar la prueba</a>
        <a href="precios.html" class="btn btn-outline">Ver precios</a>
      </div>
    </article>
    <div class="guia-related">
      <h2>Seguí leyendo</h2>
${related}
    </div>
  </div>
</main>

${FOOTER}
</body>
</html>
`;
}

// --------------------------------------------------------------------------
const ARTICLES = [
  {
    slug: "guia-software-establecimientos.html",
    eyebrow: "Software para establecimientos",
    title: "Software para establecimientos: cómo elegir el sistema de gestión de tu negocio | Ledyvas",
    description: "Qué es un software de gestión para establecimientos, cuándo lo necesitás y cómo elegirlo: compras, inventario, ventas, caja y reportes en una sola plataforma.",
    h1: "Software para establecimientos: qué es y cómo elegirlo",
    lede: "Un software de gestión para establecimientos reúne compras, inventario, ventas, caja y reportes de tu local en un solo lugar. Esta guía te ayuda a entender qué debe hacer y a no equivocarte al elegir.",
    body: `
      <h2>Qué es un software de gestión para establecimientos</h2>
      <p>Es el sistema que centraliza la operación diaria de un local comercial —un restaurante, una tienda, un salón, un minimarket, una excursión turística— en una única plataforma. En vez de tener el stock en un cuaderno, las compras en el WhatsApp del proveedor y las ventas en la memoria del dueño, todo queda registrado y conectado: cuando entra una compra, sube el inventario; cuando hay una venta, baja; y al final del día sabés cuánto compraste, cuánto vendiste y cuánto te quedó.</p>

      <h2>Señales de que tu establecimiento ya lo necesita</h2>
      <ul>
        <li>El Excel de inventario nunca coincide con lo que hay en la estantería.</li>
        <li>Comprás "a ojo": a veces te sobra mercadería que se vence, a veces te falta justo lo que más se vende.</li>
        <li>No sabés, al cerrar el día, si ganaste o perdiste plata.</li>
        <li>Sospechás de robo hormiga pero no tenés cómo demostrarlo.</li>
        <li>Cada vez que se enferma la persona de confianza, la operación se frena porque "solo ella sabe".</li>
        <li>Tu contador te pide los números y tardás días en armarlos.</li>
      </ul>

      <h2>Qué tiene que hacer un buen software para establecimientos</h2>
      <p>Antes de mirar precios, chequeá que el sistema cubra estos puntos:</p>
      <ul>
        <li><strong>Compras y proveedores:</strong> registrar cada compra con su proveedor, su fecha y su costo, y que eso actualice el stock automáticamente.</li>
        <li><strong>Inventario en tiempo real:</strong> saber en cualquier momento cuánto hay de cada producto, con alertas de stock bajo.</li>
        <li><strong>Ventas y caja:</strong> registrar lo que sale y llevar el movimiento de caja del día.</li>
        <li><strong>Costos y margen:</strong> ver el costo real de lo que vendés y el margen que te deja, no solo la facturación.</li>
        <li><strong>Cierre diario:</strong> un reporte de cada día con lo comprado, lo vendido, lo que quedó y las diferencias del conteo físico.</li>
        <li><strong>Multiusuario con permisos:</strong> que cada empleado vea solo lo suyo y quede registrado quién hizo cada movimiento.</li>
        <li><strong>Que funcione sin depender de internet permanente:</strong> si se cae la conexión, la caja no puede parar.</li>
        <li><strong>Que puedas sacar tus datos:</strong> exportar a Excel y a tu software contable cuando quieras.</li>
      </ul>

      <h2>Errores comunes al elegir</h2>
      <ol>
        <li><strong>Elegir solo por el precio.</strong> El más barato suele ser el que más tiempo te hace perder configurándolo.</li>
        <li><strong>Sistemas que necesitan un consultor para arrancar.</strong> Si no lo podés poner en marcha vos con la operación real en una semana, algo está mal.</li>
        <li><strong>Mensualidad que crece.</strong> Empezás pagando poco y a los seis meses el plan que necesitás cuesta el triple.</li>
        <li><strong>Que no exporte tus datos.</strong> Si mañana querés cambiar de sistema y no podés llevarte la información, quedás atrapado.</li>
      </ol>

      <h2>Cómo lo resuelve Ledyvas</h2>
      <p>Ledyvas es un software de gestión para establecimientos que se instala en tu PC con Windows y funciona sin depender de una conexión permanente. Cubre compras, proveedores, productos, inventario, ventas, caja, producción y reportes, con usuarios y permisos. La base de datos es tuya y está cifrada.</p>
      <p>Se paga <strong>una sola vez</strong> —no hay mensualidad— y exporta los datos ordenados a <strong>QuickBooks, Alegra, Zoho Books, Odoo y Xero</strong>, así tu contador recibe todo limpio. Tiene un modo opcional para operadores de excursiones turísticas (cálculo por PAX, combustible de flotas, margen por destino) que se puede apagar si tenés un comercio común.</p>
      <p>Podés <a href="descargas.html">descargar la prueba gratis</a> y usarla sin límite de tiempo con tus datos reales antes de decidir.</p>
    `,
    related: `      <a href="guia-software-restaurantes.html">Software de gestión para restaurantes: control de compras, inventario y costos</a>
      <a href="guia-software-excursiones-turisticas.html">Software para excursiones y operadores turísticos</a>
      <a href="sectores.html">Ledyvas por sector: Food Service, Retail, Beauty y más</a>`
  },
  {
    slug: "guia-software-restaurantes.html",
    eyebrow: "Software para restaurantes",
    title: "Software de gestión para restaurantes: control de compras, inventario y costos | Ledyvas",
    description: "Guía práctica de software para restaurantes: recetas y food cost, control de inventario de insumos, cierre de día, mermas y margen por plato.",
    h1: "Software de gestión para restaurantes: guía práctica",
    lede: "En un restaurante, la plata no se pierde en la caja: se pierde en la cocina. Esta guía explica qué controla un software de gestión para restaurantes y cómo te ayuda a saber tu costo real.",
    body: `
      <h2>El problema real de un restaurante sin sistema</h2>
      <p>Un restaurante puede facturar mucho y ganar poco. El motivo casi siempre es el mismo: el <strong>food cost</strong> —lo que cuestan los insumos de cada plato— se lleva a ojo. Se compra de más y se vence; se compra de menos y falta en el peor momento; los insumos se van en mermas, en porciones mal medidas o en robo, y nadie lo ve porque no hay contra qué comparar. Al cierre del mes el dueño mira el banco y no entiende por qué no cuadra.</p>

      <h2>Qué controla un buen software para restaurantes</h2>
      <ul>
        <li><strong>Compras a proveedores:</strong> cada compra de insumos con su costo, que actualiza el inventario.</li>
        <li><strong>Recetas y escandallo:</strong> la lista de insumos de cada plato y su costo calculado.</li>
        <li><strong>Producción:</strong> cuando cocinás un lote (una salsa, un pan, una masa), descuenta los ingredientes y suma el producto terminado.</li>
        <li><strong>Inventario de insumos:</strong> stock real de cada ingrediente, en tiempo real.</li>
        <li><strong>Ventas y caja:</strong> lo que sale por el salón y el movimiento de caja del turno.</li>
        <li><strong>Cierre de día:</strong> el conteo físico contra el teórico, para ver la merma real.</li>
        <li><strong>Combustible y reparto</strong>, si hacés delivery propio con vehículos.</li>
      </ul>

      <h2>Recetas y food cost: el corazón del sistema</h2>
      <p>La clave de un software de restaurante es la receta. Cargás una vez qué lleva cada plato —200 g de carne, 50 g de queso, un pan— y el sistema calcula su costo con los precios de compra actuales. Cuando vendés ese plato, descuenta esos insumos del inventario. Así, sin contar a mano, sabés:</p>
      <ul>
        <li>Cuánto te cuesta cada plato y qué margen te deja.</li>
        <li>Qué platos te hacen ganar y cuáles vendés casi sin ganancia.</li>
        <li>Cuánto insumo deberías tener según lo que vendiste (el "teórico").</li>
      </ul>

      <h2>El cierre de día: dónde aparece la merma</h2>
      <p>Al final del turno hacés un conteo físico rápido de los insumos críticos. El sistema ya sabe cuánto deberías tener (lo que compraste menos lo que vendiste). La diferencia entre el conteo real y el teórico es tu <strong>merma</strong>: rotura, porciones mal servidas, regalos no registrados o robo. Verlo todos los días, aunque sea de tres o cuatro insumos, cambia la operación.</p>

      <h2>Varios locales</h2>
      <p>Si tenés más de un local o una franquicia, el sistema debería dejarte ver cada uno por separado y también consolidado, sin tener que sumar Excel a mano.</p>

      <h2>Cómo lo hace Ledyvas</h2>
      <p>Ledyvas para restaurantes cubre compras, proveedores, recetas, producción, inventario de insumos, ventas, caja, control de combustible y cierre diario, con usuarios y permisos. Se instala en Windows, funciona sin depender de internet permanente y se paga una sola vez. Exporta a QuickBooks, Alegra, Zoho Books, Odoo y Xero, así el contador recibe todo ordenado.</p>
      <p>Tiene además un modo para operadores de excursiones —donde la comida y la bebida se calculan por PAX del día— que se puede activar o dejar apagado. <a href="descargas.html">Descargá la prueba gratis</a> y probalo con la carta y los proveedores reales de tu restaurante.</p>
    `,
    related: `      <a href="guia-software-establecimientos.html">Software para establecimientos: cómo elegir el sistema de gestión de tu negocio</a>
      <a href="guia-software-excursiones-turisticas.html">Software para excursiones y operadores turísticos</a>
      <a href="sectores.html">Ledyvas por sector: Food Service, Retail, Beauty y más</a>`
  },
  {
    slug: "guia-software-excursiones-turisticas.html",
    eyebrow: "Software para excursiones turísticas",
    title: "Software para excursiones y operadores turísticos: control de PAX, insumos y flotas | Ledyvas",
    description: "Software para operadores de excursiones: cálculo de compras por PAX y por destino, inventario de embarcaciones, control de combustible por unidad y margen por excursión.",
    h1: "Software para operadores de excursiones turísticas",
    lede: "Un operador de excursiones no gestiona como una tienda: todo se mueve por los PAX del día. Esta guía explica qué necesita un software pensado para ese negocio.",
    body: `
      <h2>Por qué un operador de excursiones necesita otro tipo de software</h2>
      <p>En una excursión, la comida, la bebida, los desechables y hasta el combustible de las lanchas y los buses se calculan <strong>por pasajero y por destino</strong>. Si mañana salen 120 PAX repartidos entre cuatro playas, cada playa necesita una cantidad distinta de cada insumo, y comprarla bien es la diferencia entre ganar y regalar el margen. Un software de tienda común no sabe hacer ese cálculo.</p>

      <h2>Qué tiene que resolver</h2>
      <ul>
        <li><strong>Fórmula por PAX y por destino:</strong> definir cuánto de cada insumo lleva cada persona en cada destino, y que el sistema calcule la compra del día con solo cargar los PAX.</li>
        <li><strong>Compra asistida:</strong> a partir de esa fórmula, una propuesta de compra que podés ajustar antes de confirmar.</li>
        <li><strong>Inventario del centro logístico y de las embarcaciones:</strong> lo que sale hacia cada destino y lo que vuelve.</li>
        <li><strong>Control de combustible por unidad:</strong> despacho a cada lancha o bus, devolución de lo que no se usó y consumo real por equipo.</li>
        <li><strong>Devoluciones:</strong> lo que un destino no consumió y vuelve, para comprar menos al día siguiente.</li>
        <li><strong>Margen por destino y consolidado de flotas:</strong> saber qué excursión y qué unidad dejan ganancia.</li>
      </ul>

      <h2>El cálculo por PAX, explicado</h2>
      <p>Cargás una vez la "fórmula": por ejemplo, 0,3 litros de bebida y 1 sándwich por persona en la Playa A, y valores distintos en la Playa B. Cada mañana ingresás los PAX de cada destino y el sistema te dice exactamente cuánto comprar de cada cosa, restando lo que ya tenés en inventario y lo que quedó de devoluciones. Comprás lo justo.</p>

      <h2>Combustible y flotas</h2>
      <p>El combustible de una flota de lanchas o buses es uno de los costos que más se escapa. El sistema registra el despacho a cada unidad, la devolución de lo que sobró y el consumo neto, y lo consolida por semana y por empresa. Sirve también para auditar y hasta para vender combustible a terceros con trazabilidad.</p>

      <h2>Margen por destino</h2>
      <p>Al cruzar lo que se despachó a cada destino con lo que se vendió allí, sabés el costo, la venta y el margen de cada excursión —y el costo por PAX—, no un promedio general.</p>

      <h2>Cómo lo hace Ledyvas</h2>
      <p>Ledyvas tiene un <strong>modo turismo</strong> con todo esto: fórmula por PAX y por destino, compra asistida, centro logístico, control de combustible por vehículo o embarcación, devoluciones, margen por destino y consolidado de flotas. Se activa desde la configuración; si además tenés un restaurante o una tienda, esas funciones conviven en el mismo sistema.</p>
      <p>Se instala en Windows, se paga una sola vez y exporta a QuickBooks, Alegra, Zoho Books, Odoo y Xero. <a href="descargas.html">Descargá la prueba gratis</a> y armá la fórmula de tus destinos reales.</p>
    `,
    related: `      <a href="guia-software-restaurantes.html">Software de gestión para restaurantes: control de compras, inventario y costos</a>
      <a href="guia-software-establecimientos.html">Software para establecimientos: cómo elegir el sistema de gestión de tu negocio</a>
      <a href="sectores.html">Ledyvas por sector: Food Service, Retail, Beauty y más</a>`
  }
];

// --- escribir las guías ---
ARTICLES.forEach((a) => {
  fs.writeFileSync(a.slug, page(a));
  console.log("escrito " + a.slug);
});

// --- índice guias.html ---
const cards = ARTICLES.map((a) => `      <div class="guia-card">
        <h3><a href="${a.slug}">${a.h1}</a></h3>
        <p>${a.lede}</p>
        <a href="${a.slug}" class="btn btn-outline">Leer la guía</a>
      </div>`).join("\n");

const indexHtml = `<!doctype html>
<html lang="es">
<head>
${GA_HEAD}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Guías de gestión para negocios y establecimientos | Ledyvas</title>
<meta name="description" content="Guías prácticas sobre software de gestión para restaurantes, comercios y operadores de excursiones turísticas: compras, inventario, costos y reportes.">
<link rel="icon" href="assets/img/favicon.png">
<link rel="canonical" href="https://ledyvas.com/guias.html">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
${GUIDE_CSS}
</head>
<body>

${HEADER}

<main class="guia-main">
  <div class="guia-wrap" style="max-width:900px">
    <p class="guia-crumbs"><a href="index.html">Inicio</a> › Guías</p>
    <h1>Guías de gestión</h1>
    <p class="guia-lede">Cómo llevar las compras, el inventario y los costos de un negocio de verdad, sin planillas que no cuadran.</p>
    <div class="guias-grid">
${cards}
    </div>
  </div>
</main>

${FOOTER}
</body>
</html>
`;
fs.writeFileSync("guias.html", indexHtml);
console.log("escrito guias.html");
