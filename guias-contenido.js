/* Contenido de las guías, 5 idiomas. Usado por build-guias.js.
   La palabra "catering" está presente a propósito en las 3 guías (es un
   subsector HORECA y un término de búsqueda real). */
"use strict";

module.exports = {

  // ======================= ESPAÑOL =======================
  es: {
    _sectores: "Ledyvas por sector: Food Service, Retail, Beauty y más",

    establecimientos: {
      eyebrow: "Software para establecimientos",
      title: "Software para establecimientos: cómo elegir el sistema de gestión de su negocio | Ledyvas",
      description: "Qué es un software de gestión para establecimientos, cuándo lo necesita y cómo elegirlo: compras, inventario, ventas, caja y reportes para restaurantes, catering y comercios.",
      h1: "Software para establecimientos: qué es y cómo elegirlo",
      lede: "Un software de gestión para establecimientos reúne compras, inventario, ventas, caja y reportes de su local en un solo lugar. Esta guía le ayuda a entender qué debe hacer y a no equivocarse al elegir.",
      body: `
      <h2>Qué es un software de gestión para establecimientos</h2>
      <p>Es el sistema que centraliza la operación diaria de un local comercial —un restaurante, una tienda, un salón, un minimarket, una empresa de catering, una excursión turística— en una única plataforma. En vez de tener el stock en un cuaderno, las compras en el WhatsApp del proveedor y las ventas en la memoria del dueño, todo queda registrado y conectado: cuando entra una compra, sube el inventario; cuando hay una venta, baja; y al final del día sabe cuánto compró, cuánto vendió y cuánto le quedó.</p>

      <h2>Señales de que su establecimiento ya lo necesita</h2>
      <ul>
        <li>El Excel de inventario nunca coincide con lo que hay en la estantería.</li>
        <li>Compra "a ojo": a veces le sobra mercadería que se vence, a veces le falta justo lo que más se vende.</li>
        <li>No sabe, al cerrar el día, si ganó o perdió dinero.</li>
        <li>Sospecha de robo hormiga pero no tiene cómo demostrarlo.</li>
        <li>Cada vez que se enferma la persona de confianza, la operación se frena porque "solo ella sabe".</li>
        <li>Su contador le pide los números y tarda días en armarlos.</li>
      </ul>

      <h2>Qué tiene que hacer un buen software para establecimientos</h2>
      <p>Antes de mirar precios, chequeá que el sistema cubra estos puntos:</p>
      <ul>
        <li><strong>Compras y proveedores:</strong> registrar cada compra con su proveedor, su fecha y su costo, y que eso actualice el stock automáticamente.</li>
        <li><strong>Inventario en tiempo real:</strong> saber en cualquier momento cuánto hay de cada producto, con alertas de stock bajo.</li>
        <li><strong>Ventas y caja:</strong> registrar lo que sale y llevar el movimiento de caja del día.</li>
        <li><strong>Costos y margen:</strong> ver el costo real de lo que vende y el margen que le deja, no solo la facturación.</li>
        <li><strong>Cierre diario:</strong> un reporte de cada día con lo comprado, lo vendido, lo que quedó y las diferencias del conteo físico.</li>
        <li><strong>Multiusuario con permisos:</strong> que cada empleado vea solo lo suyo y quede registrado quién hizo cada movimiento.</li>
        <li><strong>Que funcione sin depender de internet permanente:</strong> si se cae la conexión, la caja no puede parar.</li>
        <li><strong>Que pueda sacar sus datos:</strong> exportar a Excel y a su software contable cuando quiera.</li>
      </ul>

      <h2>Errores comunes al elegir</h2>
      <ol>
        <li><strong>Elegir solo por el precio.</strong> El más barato suele ser el que más tiempo le hace perder configurándolo.</li>
        <li><strong>Sistemas que necesitan un consultor para arrancar.</strong> Si no lo puede poner en marcha usted con la operación real en una semana, algo está mal.</li>
        <li><strong>Mensualidad que crece.</strong> Empieza pagando poco y a los seis meses el plan que necesita cuesta el triple.</li>
        <li><strong>Que no exporte sus datos.</strong> Si mañana quiere cambiar de sistema y no puede llevarte la información, queda atrapado.</li>
      </ol>

      <h2>Cómo lo resuelve Ledyvas</h2>
      <p>Ledyvas es un software de gestión para establecimientos que se instala en su PC con Windows y funciona sin depender de una conexión permanente. Cubre compras, proveedores, productos, inventario, ventas, caja, producción y reportes, con usuarios y permisos. La base de datos es suya y está cifrada.</p>
      <p>Se paga <strong>una sola vez</strong> —no hay mensualidad— y exporta los datos ordenados a <strong>QuickBooks, Alegra, Zoho Books, Odoo y Xero</strong>, así su contador recibe todo limpio. Sirve para restaurantes, bares, cafeterías, catering, tiendas y salones, y tiene un modo opcional para operadores de excursiones turísticas (cálculo por PAX, combustible de flotas, margen por destino) que se puede apagar.</p>
      <p>Puede <a href="descargas.html">descargar la prueba gratis</a> y usarla sin límite de tiempo con sus datos reales antes de decidir.</p>
    `
    },

    restaurantes: {
      eyebrow: "Software para restaurantes",
      title: "Software de gestión para restaurantes y catering: compras, inventario y costos | Ledyvas",
      description: "Guía práctica de software para restaurantes, bares, cafeterías y empresas de catering: recetas y food cost, inventario de insumos, cierre de día, mermas y margen por plato.",
      h1: "Software de gestión para restaurantes y catering: guía práctica",
      lede: "En un restaurante, el dinero no se pierde en la caja: se pierde en la cocina. Esta guía explica qué controla un software de gestión para restaurantes y servicios de catering, y cómo le ayuda a saber su costo real.",
      body: `
      <h2>El problema real de un restaurante sin sistema</h2>
      <p>Un restaurante o una empresa de catering puede facturar mucho y ganar poco. El motivo casi siempre es el mismo: el <strong>food cost</strong> —lo que cuestan los insumos de cada plato o de cada evento— se lleva a ojo. Se compra de más y se vence; se compra de menos y falta en el peor momento; los insumos se van en mermas, en porciones mal medidas o en robo, y nadie lo ve porque no hay contra qué comparar. Al cierre del mes el dueño mira el banco y no entiende por qué no cuadra.</p>

      <h2>Qué controla un buen software para restaurantes</h2>
      <ul>
        <li><strong>Compras a proveedores:</strong> cada compra de insumos con su costo, que actualiza el inventario.</li>
        <li><strong>Recetas y escandallo:</strong> la lista de insumos de cada plato y su costo calculado.</li>
        <li><strong>Producción:</strong> cuando cocina un lote (una salsa, un pan, una masa), descuenta los ingredientes y suma el producto terminado.</li>
        <li><strong>Inventario de insumos:</strong> stock real de cada ingrediente, en tiempo real.</li>
        <li><strong>Ventas y caja:</strong> lo que sale por el salón, por el evento de catering o por delivery, y el movimiento de caja del turno.</li>
        <li><strong>Cierre de día:</strong> el conteo físico contra el teórico, para ver la merma real.</li>
        <li><strong>Combustible y reparto</strong>, si hace delivery propio o lleva la comida a los eventos con vehículos.</li>
      </ul>

      <h2>Recetas y food cost: el corazón del sistema</h2>
      <p>La clave de un software de restaurante es la receta. Carga una vez qué lleva cada plato —200 g de carne, 50 g de queso, un pan— y el sistema calcula su costo con los precios de compra actuales. Cuando vende ese plato, descuenta esos insumos del inventario. Así, sin contar a mano, sabe:</p>
      <ul>
        <li>Cuánto le cuesta cada plato y qué margen le deja.</li>
        <li>Qué platos le hacen ganar y cuáles vende casi sin ganancia.</li>
        <li>Cuánto insumo deberías tener según lo que vendió (el "teórico").</li>
        <li>El costo por cubierto de un menú de catering antes de pasar el presupuesto.</li>
      </ul>

      <h2>El cierre de día: dónde aparece la merma</h2>
      <p>Al final del turno hace un conteo físico rápido de los insumos críticos. El sistema ya sabe cuánto deberías tener (lo que compró menos lo que vendió). La diferencia entre el conteo real y el teórico es su <strong>merma</strong>: rotura, porciones mal servidas, regalos no registrados o robo. Verlo todos los días, aunque sea de tres o cuatro insumos, cambia la operación.</p>

      <h2>Varios locales</h2>
      <p>Si tiene más de un local, una franquicia o varias líneas (salón + catering), el sistema debería dejarte ver cada uno por separado y también consolidado, sin tener que sumar Excel a mano.</p>

      <h2>Cómo lo hace Ledyvas</h2>
      <p>Ledyvas para restaurantes y catering cubre compras, proveedores, recetas, producción, inventario de insumos, ventas, caja, control de combustible y cierre diario, con usuarios y permisos. Se instala en Windows, funciona sin depender de internet permanente y se paga una sola vez. Exporta a QuickBooks, Alegra, Zoho Books, Odoo y Xero, así el contador recibe todo ordenado.</p>
      <p>Tiene además un modo para operadores de excursiones —donde la comida y la bebida se calculan por PAX del día— que se puede activar o dejar apagado. <a href="descargas.html">Descargue la prueba gratis</a> y pruébelo con la carta y los proveedores reales de su restaurante o servicio de catering.</p>
    `
    },

    excursiones: {
      eyebrow: "Software para excursiones turísticas",
      title: "Software para excursiones y operadores turísticos: control de PAX, insumos y flotas | Ledyvas",
      description: "Software para operadores de excursiones: cálculo de compras por PAX y por destino, catering a bordo, inventario de embarcaciones, control de combustible por unidad y margen por excursión.",
      h1: "Software para operadores de excursiones turísticas",
      lede: "Un operador de excursiones no gestiona como una tienda: todo se mueve por los PAX del día. Esta guía explica qué necesita un software pensado para ese negocio, incluido el catering a bordo.",
      body: `
      <h2>Por qué un operador de excursiones necesita otro tipo de software</h2>
      <p>En una excursión, la comida, la bebida, los desechables y hasta el combustible de las lanchas y los buses se calculan <strong>por pasajero y por destino</strong>. Si mañana salen 120 PAX repartidos entre cuatro playas, cada playa necesita una cantidad distinta de cada insumo, y comprarla bien es la diferencia entre ganar y regalar el margen. Un software de tienda común no sabe hacer ese cálculo, y menos si además sirve catering a bordo.</p>

      <h2>Qué tiene que resolver</h2>
      <ul>
        <li><strong>Fórmula por PAX y por destino:</strong> definir cuánto de cada insumo lleva cada persona en cada destino, y que el sistema calcule la compra del día con solo cargar los PAX.</li>
        <li><strong>Compra asistida:</strong> a partir de esa fórmula, una propuesta de compra que puede ajustar antes de confirmar.</li>
        <li><strong>Catering a bordo:</strong> recetas de los menús que sirve en la excursión, con su costo por cubierto.</li>
        <li><strong>Inventario del centro logístico y de las embarcaciones:</strong> lo que sale hacia cada destino y lo que vuelve.</li>
        <li><strong>Control de combustible por unidad:</strong> despacho a cada lancha o bus, devolución de lo que no se usó y consumo real por equipo.</li>
        <li><strong>Devoluciones:</strong> lo que un destino no consumió y vuelve, para comprar menos al día siguiente.</li>
        <li><strong>Margen por destino y consolidado de flotas:</strong> saber qué excursión y qué unidad dejan ganancia.</li>
      </ul>

      <h2>El cálculo por PAX, explicado</h2>
      <p>Carga una vez la "fórmula": por ejemplo, 0,3 litros de bebida y 1 sándwich por persona en la Playa A, y valores distintos en la Playa B. Cada mañana ingresa los PAX de cada destino y el sistema le dice exactamente cuánto comprar de cada cosa, restando lo que ya tiene en inventario y lo que quedó de devoluciones. Compra lo justo.</p>

      <h2>Combustible y flotas</h2>
      <p>El combustible de una flota de lanchas o buses es uno de los costos que más se escapa. El sistema registra el despacho a cada unidad, la devolución de lo que sobró y el consumo neto, y lo consolida por semana y por empresa. Sirve también para auditar y hasta para vender combustible a terceros con trazabilidad.</p>

      <h2>Margen por destino</h2>
      <p>Al cruzar lo que se despachó a cada destino con lo que se vendió allí, sabe el costo, la venta y el margen de cada excursión —y el costo por PAX—, no un promedio general.</p>

      <h2>Cómo lo hace Ledyvas</h2>
      <p>Ledyvas tiene un <strong>modo turismo</strong> con todo esto: fórmula por PAX y por destino, compra asistida, recetas para el catering a bordo, centro logístico, control de combustible por vehículo o embarcación, devoluciones, margen por destino y consolidado de flotas. Se activa desde la configuración; si además tiene un restaurante o una tienda, esas funciones conviven en el mismo sistema.</p>
      <p>Se instala en Windows, se paga una sola vez y exporta a QuickBooks, Alegra, Zoho Books, Odoo y Xero. <a href="descargas.html">Descargue la prueba gratis</a> y arme la fórmula de sus destinos reales.</p>
    `
    }
  },

  // ======================= ENGLISH =======================
  en: {
    _sectores: "Ledyvas by sector: Food Service, Retail, Beauty and more",

    establecimientos: {
      eyebrow: "Business management software",
      title: "Business management software: how to choose the right system for your venue | Ledyvas",
      description: "What business management software is, when you need it and how to choose it: purchasing, inventory, sales, cash and reports for restaurants, catering and shops.",
      h1: "Business management software: what it is and how to choose it",
      lede: "Management software brings the purchasing, inventory, sales, cash and reports of your venue into one place. This guide helps you understand what it must do and how to choose without regrets.",
      body: `
      <h2>What business management software is</h2>
      <p>It's the system that centralises the daily operation of a business —a restaurant, a shop, a salon, a minimarket, a catering company, a tour excursion— in a single platform. Instead of stock in a notebook, purchases in the supplier's WhatsApp and sales in the owner's head, everything is recorded and connected: a purchase raises the inventory, a sale lowers it, and at the end of the day you know what you bought, what you sold and what you kept.</p>

      <h2>Signs your venue already needs it</h2>
      <ul>
        <li>The inventory spreadsheet never matches what's on the shelf.</li>
        <li>You buy "by eye": sometimes stock expires unsold, sometimes you run out of your best-seller.</li>
        <li>At close of day you don't know whether you made or lost money.</li>
        <li>You suspect internal shrinkage but can't prove it.</li>
        <li>Whenever your trusted employee is off sick, the operation stalls because "only they know".</li>
        <li>Your accountant asks for the numbers and it takes you days to put them together.</li>
      </ul>

      <h2>What good management software must do</h2>
      <p>Before you look at prices, check the system covers these points:</p>
      <ul>
        <li><strong>Purchasing and suppliers:</strong> record each purchase with its supplier, date and cost, and have that update stock automatically.</li>
        <li><strong>Real-time inventory:</strong> know at any moment how much of each product you have, with low-stock alerts.</li>
        <li><strong>Sales and cash:</strong> record what goes out and track the day's cash movement.</li>
        <li><strong>Costs and margin:</strong> see the real cost of what you sell and the margin it leaves, not just revenue.</li>
        <li><strong>Daily close:</strong> a report for each day with what was bought, sold, left over and the physical-count differences.</li>
        <li><strong>Multi-user with permissions:</strong> each employee sees only their part, and every action is logged.</li>
        <li><strong>Works without a permanent internet connection:</strong> if the connection drops, the till can't stop.</li>
        <li><strong>You can export your data:</strong> to Excel and to your accounting software whenever you want.</li>
      </ul>

      <h2>Common mistakes when choosing</h2>
      <ol>
        <li><strong>Choosing on price alone.</strong> The cheapest is usually the one that costs you the most time to set up.</li>
        <li><strong>Systems that need a consultant to start.</strong> If you can't get it running with your real operation in a week, something is wrong.</li>
        <li><strong>A monthly fee that grows.</strong> You start cheap and six months later the plan you actually need costs three times as much.</li>
        <li><strong>No data export.</strong> If tomorrow you want to switch systems and can't take your data, you're locked in.</li>
      </ol>

      <h2>How Ledyvas solves it</h2>
      <p>Ledyvas is business management software that installs on your Windows PC and works without a permanent connection. It covers purchasing, suppliers, products, inventory, sales, cash, production and reports, with users and permissions. The database is yours and encrypted.</p>
      <p>You pay <strong>once</strong> —no monthly fee— and it exports clean data to <strong>QuickBooks, Alegra, Zoho Books, Odoo and Xero</strong>, so your accountant gets everything tidy. It works for restaurants, bars, cafés, catering, shops and salons, and has an optional mode for tour operators (per-PAX calculation, fleet fuel, margin by destination) that can be turned off.</p>
      <p>You can <a href="download.html">download the free trial</a> and use it with no time limit on your real data before deciding.</p>
    `
    },

    restaurantes: {
      eyebrow: "Restaurant software",
      title: "Restaurant and catering management software: purchasing, inventory and costs | Ledyvas",
      description: "Practical guide to software for restaurants, bars, cafés and catering companies: recipes and food cost, ingredient inventory, daily close, shrinkage and margin per dish.",
      h1: "Restaurant and catering management software: a practical guide",
      lede: "In a restaurant, money isn't lost at the till: it's lost in the kitchen. This guide explains what restaurant and catering management software controls, and how it helps you know your real cost.",
      body: `
      <h2>The real problem of a restaurant with no system</h2>
      <p>A restaurant or a catering company can have high revenue and low profit. The reason is almost always the same: the <strong>food cost</strong> —what the ingredients of each dish or each event cost— is estimated by eye. You over-buy and it expires; you under-buy and run out at the worst moment; ingredients disappear in waste, mis-portioning or theft, and nobody sees it because there's nothing to compare against. At month end the owner looks at the bank and can't understand why it doesn't add up.</p>

      <h2>What good restaurant software controls</h2>
      <ul>
        <li><strong>Purchasing from suppliers:</strong> each ingredient purchase with its cost, updating inventory.</li>
        <li><strong>Recipes and costing:</strong> the ingredient list of each dish and its calculated cost.</li>
        <li><strong>Production:</strong> when you cook a batch (a sauce, bread, dough) it deducts the ingredients and adds the finished product.</li>
        <li><strong>Ingredient inventory:</strong> real stock of each ingredient, in real time.</li>
        <li><strong>Sales and cash:</strong> what goes out through the floor, the catering event or delivery, and the shift's cash movement.</li>
        <li><strong>Daily close:</strong> physical count against theoretical, to see real shrinkage.</li>
        <li><strong>Fuel and delivery</strong>, if you run your own delivery or take the food to events by vehicle.</li>
      </ul>

      <h2>Recipes and food cost: the heart of the system</h2>
      <p>The key to restaurant software is the recipe. You enter once what each dish contains —200 g of meat, 50 g of cheese, one bun— and the system calculates its cost from current purchase prices. When you sell that dish, it deducts those ingredients from inventory. So, without counting by hand, you know:</p>
      <ul>
        <li>How much each dish costs you and what margin it leaves.</li>
        <li>Which dishes make you money and which you sell at almost no profit.</li>
        <li>How much ingredient you should have based on what you sold (the "theoretical").</li>
        <li>The cost per cover of a catering menu before you send the quote.</li>
      </ul>

      <h2>The daily close: where shrinkage shows up</h2>
      <p>At the end of the shift you do a quick physical count of the critical ingredients. The system already knows how much you should have (bought minus sold). The gap between the real count and the theoretical is your <strong>shrinkage</strong>: breakage, mis-portioning, unrecorded comps or theft. Seeing it every day, even for three or four ingredients, changes the operation.</p>

      <h2>Multiple sites</h2>
      <p>If you have more than one site, a franchise or several lines (dining room + catering), the system should let you see each one separately and also consolidated, without adding up spreadsheets by hand.</p>

      <h2>How Ledyvas does it</h2>
      <p>Ledyvas for restaurants and catering covers purchasing, suppliers, recipes, production, ingredient inventory, sales, cash, fuel control and daily close, with users and permissions. It installs on Windows, works without a permanent connection and is paid once. It exports to QuickBooks, Alegra, Zoho Books, Odoo and Xero, so your accountant gets everything tidy.</p>
      <p>It also has a mode for tour operators —where food and drink are calculated per PAX of the day— that can be turned on or off. <a href="download.html">Download the free trial</a> and try it with the real menu and suppliers of your restaurant or catering service.</p>
    `
    },

    excursiones: {
      eyebrow: "Tour operator software",
      title: "Software for excursions and tour operators: PAX control, supplies and fleets | Ledyvas",
      description: "Software for tour operators: purchasing calculated per PAX and per destination, onboard catering, boat inventory, per-unit fuel control and margin by excursion.",
      h1: "Software for tour operators and excursions",
      lede: "A tour operator doesn't run like a shop: everything moves with the day's PAX. This guide explains what software built for that business needs, including onboard catering.",
      body: `
      <h2>Why a tour operator needs a different kind of software</h2>
      <p>On an excursion, the food, the drink, the disposables and even the fuel for the boats and buses are calculated <strong>per passenger and per destination</strong>. If 120 PAX go out tomorrow split across four beaches, each beach needs a different amount of each supply, and buying it right is the difference between making a margin and giving it away. Ordinary shop software can't do that calculation —let alone if you also serve catering onboard.</p>

      <h2>What it has to solve</h2>
      <ul>
        <li><strong>Formula per PAX and per destination:</strong> define how much of each supply each person needs at each destination, and have the system calculate the day's purchase from the PAX alone.</li>
        <li><strong>Assisted purchasing:</strong> from that formula, a purchase proposal you can adjust before confirming.</li>
        <li><strong>Onboard catering:</strong> recipes for the menus you serve on the excursion, with their cost per cover.</li>
        <li><strong>Logistics-hub and boat inventory:</strong> what goes out to each destination and what comes back.</li>
        <li><strong>Per-unit fuel control:</strong> dispatch to each boat or bus, return of what wasn't used and real consumption per unit.</li>
        <li><strong>Returns:</strong> what a destination didn't consume and sends back, to buy less the next day.</li>
        <li><strong>Margin by destination and fleet consolidation:</strong> know which excursion and which unit make money.</li>
      </ul>

      <h2>The per-PAX calculation, explained</h2>
      <p>You enter the "formula" once: for example, 0.3 litres of drink and 1 sandwich per person at Beach A, and different values at Beach B. Each morning you enter the PAX for each destination and the system tells you exactly how much to buy of each item, subtracting what you already have in inventory and what came back as returns. You buy just enough.</p>

      <h2>Fuel and fleets</h2>
      <p>Fuel for a fleet of boats or buses is one of the costs that leaks the most. The system records dispatch to each unit, the return of what was left and net consumption, and consolidates it by week and by company. It also serves for auditing and even for selling fuel to third parties with traceability.</p>

      <h2>Margin by destination</h2>
      <p>By cross-checking what was dispatched to each destination against what was sold there, you know the cost, the sale and the margin of each excursion —and the cost per PAX— not a general average.</p>

      <h2>How Ledyvas does it</h2>
      <p>Ledyvas has a <strong>tourism mode</strong> with all of this: formula per PAX and per destination, assisted purchasing, recipes for onboard catering, logistics hub, per-vehicle and per-boat fuel control, returns, margin by destination and fleet consolidation. It's enabled from settings; if you also have a restaurant or a shop, those functions live in the same system.</p>
      <p>It installs on Windows, is paid once and exports to QuickBooks, Alegra, Zoho Books, Odoo and Xero. <a href="download.html">Download the free trial</a> and build the formula for your real destinations.</p>
    `
    }
  },

  // ======================= ITALIANO =======================
  it: {
    _sectores: "Ledyvas per settore: Food Service, Retail, Beauty e altro",

    establecimientos: {
      eyebrow: "Software gestionale per attività",
      title: "Software gestionale per attività: come scegliere il sistema giusto per il tuo locale | Ledyvas",
      description: "Cos'è un software gestionale, quando serve e come sceglierlo: acquisti, magazzino, vendite, cassa e report per ristoranti, catering e negozi.",
      h1: "Software gestionale per attività: cos'è e come sceglierlo",
      lede: "Un software gestionale riunisce acquisti, magazzino, vendite, cassa e report del tuo locale in un unico posto. Questa guida ti aiuta a capire cosa deve fare e a non sbagliare la scelta.",
      body: `
      <h2>Cos'è un software gestionale per attività</h2>
      <p>È il sistema che centralizza l'operatività quotidiana di un'attività —un ristorante, un negozio, un salone, un minimarket, un'azienda di catering, un'escursione turistica— in un'unica piattaforma. Invece del magazzino su un quaderno, gli acquisti nel WhatsApp del fornitore e le vendite nella testa del titolare, tutto è registrato e collegato: un acquisto aumenta il magazzino, una vendita lo diminuisce, e a fine giornata sai quanto hai comprato, quanto hai venduto e quanto ti è rimasto.</p>

      <h2>Segnali che al tuo locale serve già</h2>
      <ul>
        <li>Il foglio di calcolo del magazzino non coincide mai con ciò che c'è sullo scaffale.</li>
        <li>Compri "a occhio": a volte la merce scade invenduta, a volte manca proprio il prodotto più venduto.</li>
        <li>A fine giornata non sai se hai guadagnato o perso.</li>
        <li>Sospetti ammanchi interni ma non puoi dimostrarlo.</li>
        <li>Ogni volta che la persona di fiducia si ammala, l'operatività si blocca perché "sa solo lei".</li>
        <li>Il commercialista ti chiede i numeri e ci metti giorni a prepararli.</li>
      </ul>

      <h2>Cosa deve fare un buon software gestionale</h2>
      <p>Prima di guardare i prezzi, verifica che il sistema copra questi punti:</p>
      <ul>
        <li><strong>Acquisti e fornitori:</strong> registrare ogni acquisto con fornitore, data e costo, aggiornando automaticamente il magazzino.</li>
        <li><strong>Magazzino in tempo reale:</strong> sapere in ogni momento quanto c'è di ogni prodotto, con avvisi di scorta bassa.</li>
        <li><strong>Vendite e cassa:</strong> registrare ciò che esce e seguire il movimento di cassa della giornata.</li>
        <li><strong>Costi e margine:</strong> vedere il costo reale di ciò che vendi e il margine che lascia, non solo il fatturato.</li>
        <li><strong>Chiusura giornaliera:</strong> un report per ogni giorno con acquistato, venduto, rimanenze e differenze dell'inventario fisico.</li>
        <li><strong>Multiutente con permessi:</strong> ogni dipendente vede solo la sua parte e ogni azione è tracciata.</li>
        <li><strong>Funziona senza internet permanente:</strong> se salta la connessione, la cassa non può fermarsi.</li>
        <li><strong>Puoi esportare i tuoi dati:</strong> in Excel e nel tuo software di contabilità quando vuoi.</li>
      </ul>

      <h2>Errori comuni nella scelta</h2>
      <ol>
        <li><strong>Scegliere solo in base al prezzo.</strong> Il più economico è di solito quello che ti fa perdere più tempo a configurarlo.</li>
        <li><strong>Sistemi che richiedono un consulente per partire.</strong> Se non riesci ad avviarlo con l'operatività reale in una settimana, qualcosa non va.</li>
        <li><strong>Canone mensile che cresce.</strong> Inizi pagando poco e dopo sei mesi il piano che ti serve costa il triplo.</li>
        <li><strong>Nessuna esportazione dei dati.</strong> Se domani vuoi cambiare sistema e non puoi portarti i dati, sei bloccato.</li>
      </ol>

      <h2>Come lo risolve Ledyvas</h2>
      <p>Ledyvas è un software gestionale che si installa sul tuo PC Windows e funziona senza connessione permanente. Copre acquisti, fornitori, prodotti, magazzino, vendite, cassa, produzione e report, con utenti e permessi. Il database è tuo ed è cifrato.</p>
      <p>Si paga <strong>una sola volta</strong> —niente canone— ed esporta i dati ordinati in <strong>QuickBooks, Alegra, Zoho Books, Odoo e Xero</strong>, così il commercialista riceve tutto pulito. Va bene per ristoranti, bar, caffetterie, catering, negozi e saloni, e ha una modalità opzionale per tour operator (calcolo per PAX, carburante delle flotte, margine per destinazione) che si può disattivare.</p>
      <p>Puoi <a href="download.html">scaricare la prova gratuita</a> e usarla senza limiti di tempo con i tuoi dati reali prima di decidere.</p>
    `
    },

    restaurantes: {
      eyebrow: "Software per ristoranti",
      title: "Software gestionale per ristoranti e catering: acquisti, magazzino e costi | Ledyvas",
      description: "Guida pratica al software per ristoranti, bar, caffetterie e aziende di catering: ricette e food cost, magazzino ingredienti, chiusura di giornata, cali e margine per piatto.",
      h1: "Software gestionale per ristoranti e catering: guida pratica",
      lede: "In un ristorante i soldi non si perdono in cassa: si perdono in cucina. Questa guida spiega cosa controlla un software per ristoranti e servizi di catering e come ti aiuta a sapere il costo reale.",
      body: `
      <h2>Il vero problema di un ristorante senza sistema</h2>
      <p>Un ristorante o un'azienda di catering può avere un fatturato alto e un utile basso. Il motivo è quasi sempre lo stesso: il <strong>food cost</strong> —quanto costano gli ingredienti di ogni piatto o di ogni evento— si stima a occhio. Compri troppo e scade; compri poco e manca nel momento peggiore; gli ingredienti se ne vanno in scarti, porzioni sbagliate o furti, e nessuno se ne accorge perché non c'è nulla con cui confrontare. A fine mese il titolare guarda la banca e non capisce perché non torna.</p>

      <h2>Cosa controlla un buon software per ristoranti</h2>
      <ul>
        <li><strong>Acquisti dai fornitori:</strong> ogni acquisto di ingredienti con il suo costo, che aggiorna il magazzino.</li>
        <li><strong>Ricette e distinta base:</strong> l'elenco degli ingredienti di ogni piatto e il suo costo calcolato.</li>
        <li><strong>Produzione:</strong> quando cucini un lotto (una salsa, un pane, un impasto) scala gli ingredienti e aggiunge il prodotto finito.</li>
        <li><strong>Magazzino ingredienti:</strong> scorta reale di ogni ingrediente, in tempo reale.</li>
        <li><strong>Vendite e cassa:</strong> ciò che esce dalla sala, dall'evento di catering o dal delivery, e il movimento di cassa del turno.</li>
        <li><strong>Chiusura di giornata:</strong> il conteggio fisico contro il teorico, per vedere il calo reale.</li>
        <li><strong>Carburante e consegne</strong>, se fai delivery proprio o porti il cibo agli eventi con dei mezzi.</li>
      </ul>

      <h2>Ricette e food cost: il cuore del sistema</h2>
      <p>La chiave di un software per ristoranti è la ricetta. Inserisci una volta cosa contiene ogni piatto —200 g di carne, 50 g di formaggio, un panino— e il sistema calcola il costo con i prezzi di acquisto attuali. Quando vendi quel piatto, scala quegli ingredienti dal magazzino. Così, senza contare a mano, sai:</p>
      <ul>
        <li>Quanto ti costa ogni piatto e che margine lascia.</li>
        <li>Quali piatti ti fanno guadagnare e quali vendi quasi senza utile.</li>
        <li>Quanti ingredienti dovresti avere in base a ciò che hai venduto (il "teorico").</li>
        <li>Il costo per coperto di un menù catering prima di mandare il preventivo.</li>
      </ul>

      <h2>La chiusura di giornata: dove appare il calo</h2>
      <p>A fine turno fai un conteggio fisico rapido degli ingredienti critici. Il sistema sa già quanto dovresti avere (acquistato meno venduto). La differenza tra il conteggio reale e il teorico è il tuo <strong>calo</strong>: rotture, porzioni sbagliate, omaggi non registrati o furti. Vederlo ogni giorno, anche solo per tre o quattro ingredienti, cambia l'operatività.</p>

      <h2>Più locali</h2>
      <p>Se hai più di un locale, un franchising o più linee (sala + catering), il sistema dovrebbe farti vedere ciascuno separatamente e anche consolidato, senza sommare fogli di calcolo a mano.</p>

      <h2>Come lo fa Ledyvas</h2>
      <p>Ledyvas per ristoranti e catering copre acquisti, fornitori, ricette, produzione, magazzino ingredienti, vendite, cassa, controllo del carburante e chiusura giornaliera, con utenti e permessi. Si installa su Windows, funziona senza connessione permanente e si paga una sola volta. Esporta in QuickBooks, Alegra, Zoho Books, Odoo e Xero.</p>
      <p>Ha anche una modalità per tour operator —dove cibo e bevande si calcolano per PAX del giorno— che si può attivare o lasciare spenta. <a href="download.html">Scarica la prova gratuita</a> e provala con il menù e i fornitori reali del tuo ristorante o servizio di catering.</p>
    `
    },

    excursiones: {
      eyebrow: "Software per tour operator",
      title: "Software per escursioni e tour operator: controllo PAX, forniture e flotte | Ledyvas",
      description: "Software per tour operator: acquisti calcolati per PAX e per destinazione, catering a bordo, magazzino delle imbarcazioni, controllo del carburante per unità e margine per escursione.",
      h1: "Software per tour operator ed escursioni",
      lede: "Un tour operator non gestisce come un negozio: tutto si muove con i PAX del giorno. Questa guida spiega cosa serve a un software pensato per quel business, catering a bordo compreso.",
      body: `
      <h2>Perché un tour operator ha bisogno di un software diverso</h2>
      <p>In un'escursione, il cibo, le bevande, il monouso e persino il carburante di barche e bus si calcolano <strong>per passeggero e per destinazione</strong>. Se domani partono 120 PAX divisi tra quattro spiagge, ogni spiaggia ha bisogno di una quantità diversa di ogni fornitura, e comprarla bene è la differenza tra guadagnare e regalare il margine. Un software da negozio non sa fare quel calcolo, tanto meno se servi anche catering a bordo.</p>

      <h2>Cosa deve risolvere</h2>
      <ul>
        <li><strong>Formula per PAX e per destinazione:</strong> definire quanto di ogni fornitura serve a ogni persona in ogni destinazione, e far calcolare al sistema l'acquisto del giorno dai soli PAX.</li>
        <li><strong>Acquisto assistito:</strong> da quella formula, una proposta d'acquisto da rivedere prima di confermare.</li>
        <li><strong>Catering a bordo:</strong> ricette dei menù serviti in escursione, con il costo per coperto.</li>
        <li><strong>Magazzino del centro logistico e delle imbarcazioni:</strong> ciò che esce verso ogni destinazione e ciò che torna.</li>
        <li><strong>Controllo del carburante per unità:</strong> erogazione a ogni barca o bus, reso di ciò che non è stato usato e consumo reale per unità.</li>
        <li><strong>Resi:</strong> ciò che una destinazione non ha consumato e rimanda indietro, per comprare meno il giorno dopo.</li>
        <li><strong>Margine per destinazione e consolidato delle flotte:</strong> sapere quale escursione e quale unità rendono.</li>
      </ul>

      <h2>Il calcolo per PAX, spiegato</h2>
      <p>Inserisci la "formula" una volta: per esempio 0,3 litri di bevanda e 1 panino a persona alla Spiaggia A, e valori diversi alla Spiaggia B. Ogni mattina inserisci i PAX di ogni destinazione e il sistema ti dice esattamente quanto comprare di ogni cosa, sottraendo ciò che hai già in magazzino e ciò che è tornato come reso. Compri il giusto.</p>

      <h2>Carburante e flotte</h2>
      <p>Il carburante di una flotta di barche o bus è uno dei costi che sfugge di più. Il sistema registra l'erogazione a ogni unità, il reso di ciò che è avanzato e il consumo netto, e lo consolida per settimana e per azienda. Serve anche per l'audit e persino per vendere carburante a terzi con tracciabilità.</p>

      <h2>Margine per destinazione</h2>
      <p>Incrociando ciò che è stato erogato a ogni destinazione con ciò che è stato venduto lì, sai il costo, la vendita e il margine di ogni escursione —e il costo per PAX— non una media generale.</p>

      <h2>Come lo fa Ledyvas</h2>
      <p>Ledyvas ha una <strong>modalità turismo</strong> con tutto questo: formula per PAX e per destinazione, acquisto assistito, ricette per il catering a bordo, centro logistico, controllo del carburante per veicolo e imbarcazione, resi, margine per destinazione e consolidato delle flotte. Si attiva dalle impostazioni; se hai anche un ristorante o un negozio, quelle funzioni convivono nello stesso sistema.</p>
      <p>Si installa su Windows, si paga una sola volta ed esporta in QuickBooks, Alegra, Zoho Books, Odoo e Xero. <a href="download.html">Scarica la prova gratuita</a> e costruisci la formula delle tue destinazioni reali.</p>
    `
    }
  },

  // ======================= FRANÇAIS =======================
  fr: {
    _sectores: "Ledyvas par secteur : Food Service, Retail, Beauty et plus",

    establecimientos: {
      eyebrow: "Logiciel de gestion d'entreprise",
      title: "Logiciel de gestion : comment choisir le bon système pour votre établissement | Ledyvas",
      description: "Ce qu'est un logiciel de gestion, quand il devient nécessaire et comment le choisir : achats, stock, ventes, caisse et rapports pour restaurants, traiteurs et commerces.",
      h1: "Logiciel de gestion : ce que c'est et comment le choisir",
      lede: "Un logiciel de gestion réunit les achats, le stock, les ventes, la caisse et les rapports de votre établissement au même endroit. Ce guide vous aide à comprendre ce qu'il doit faire et à choisir sans regret.",
      body: `
      <h2>Ce qu'est un logiciel de gestion d'entreprise</h2>
      <p>C'est le système qui centralise l'activité quotidienne d'un établissement —un restaurant, un commerce, un salon, une supérette, un traiteur, une excursion touristique— sur une seule plateforme. Au lieu du stock dans un cahier, des achats dans le WhatsApp du fournisseur et des ventes dans la tête du gérant, tout est enregistré et relié : un achat augmente le stock, une vente le diminue, et en fin de journée vous savez ce que vous avez acheté, vendu et gardé.</p>

      <h2>Les signes que votre établissement en a déjà besoin</h2>
      <ul>
        <li>Le tableur de stock ne correspond jamais à ce qu'il y a en rayon.</li>
        <li>Vous achetez "à l'œil" : parfois la marchandise périme invendue, parfois il manque justement le produit qui se vend le mieux.</li>
        <li>À la clôture, vous ne savez pas si vous avez gagné ou perdu de l'argent.</li>
        <li>Vous soupçonnez de la démarque interne mais vous ne pouvez pas le prouver.</li>
        <li>Dès que la personne de confiance est malade, l'activité se bloque parce que "elle seule sait".</li>
        <li>Votre comptable vous demande les chiffres et il vous faut des jours pour les rassembler.</li>
      </ul>

      <h2>Ce que doit faire un bon logiciel de gestion</h2>
      <p>Avant de regarder les prix, vérifiez que le système couvre ces points :</p>
      <ul>
        <li><strong>Achats et fournisseurs :</strong> enregistrer chaque achat avec son fournisseur, sa date et son coût, et que cela mette à jour le stock automatiquement.</li>
        <li><strong>Stock en temps réel :</strong> savoir à tout moment combien il y a de chaque produit, avec des alertes de stock bas.</li>
        <li><strong>Ventes et caisse :</strong> enregistrer ce qui sort et suivre le mouvement de caisse de la journée.</li>
        <li><strong>Coûts et marge :</strong> voir le coût réel de ce que vous vendez et la marge qu'il laisse, pas seulement le chiffre d'affaires.</li>
        <li><strong>Clôture quotidienne :</strong> un rapport par jour avec l'acheté, le vendu, le restant et les écarts de l'inventaire physique.</li>
        <li><strong>Multi-utilisateur avec permissions :</strong> chaque employé ne voit que sa partie et chaque action est tracée.</li>
        <li><strong>Fonctionne sans connexion internet permanente :</strong> si la connexion tombe, la caisse ne peut pas s'arrêter.</li>
        <li><strong>Vous pouvez exporter vos données :</strong> vers Excel et vers votre logiciel comptable quand vous voulez.</li>
      </ul>

      <h2>Erreurs fréquentes au moment de choisir</h2>
      <ol>
        <li><strong>Choisir uniquement sur le prix.</strong> Le moins cher est souvent celui qui vous coûte le plus de temps à paramétrer.</li>
        <li><strong>Des systèmes qui exigent un consultant pour démarrer.</strong> Si vous ne pouvez pas le lancer avec votre activité réelle en une semaine, quelque chose ne va pas.</li>
        <li><strong>Un abonnement qui grimpe.</strong> Vous commencez à bas prix et six mois plus tard le forfait dont vous avez besoin coûte trois fois plus.</li>
        <li><strong>Pas d'export de données.</strong> Si demain vous voulez changer de système et ne pouvez pas emporter vos données, vous êtes prisonnier.</li>
      </ol>

      <h2>Comment Ledyvas le résout</h2>
      <p>Ledyvas est un logiciel de gestion qui s'installe sur votre PC Windows et fonctionne sans connexion permanente. Il couvre les achats, les fournisseurs, les produits, le stock, les ventes, la caisse, la production et les rapports, avec utilisateurs et permissions. La base de données vous appartient et est chiffrée.</p>
      <p>Il se paie <strong>une seule fois</strong> —pas d'abonnement— et exporte des données propres vers <strong>QuickBooks, Alegra, Zoho Books, Odoo et Xero</strong>, pour que votre comptable reçoive tout en ordre. Il convient aux restaurants, bars, cafés, traiteurs, commerces et salons, et dispose d'un mode optionnel pour les organisateurs d'excursions (calcul par PAX, carburant des flottes, marge par destination) que l'on peut désactiver.</p>
      <p>Vous pouvez <a href="telechargements.html">télécharger l'essai gratuit</a> et l'utiliser sans limite de temps avec vos données réelles avant de décider.</p>
    `
    },

    restaurantes: {
      eyebrow: "Logiciel pour restaurants",
      title: "Logiciel de gestion pour restaurants et traiteurs : achats, stock et coûts | Ledyvas",
      description: "Guide pratique du logiciel pour restaurants, bars, cafés et traiteurs : recettes et food cost, stock d'ingrédients, clôture de journée, pertes et marge par plat.",
      h1: "Logiciel de gestion pour restaurants et traiteurs : guide pratique",
      lede: "Dans un restaurant, l'argent ne se perd pas à la caisse : il se perd en cuisine. Ce guide explique ce que contrôle un logiciel pour restaurants et traiteurs et comment il vous aide à connaître votre coût réel.",
      body: `
      <h2>Le vrai problème d'un restaurant sans système</h2>
      <p>Un restaurant ou un traiteur peut avoir un gros chiffre d'affaires et peu de bénéfice. La raison est presque toujours la même : le <strong>food cost</strong> —ce que coûtent les ingrédients de chaque plat ou de chaque événement— est estimé à l'œil. Vous achetez trop et cela périme ; vous achetez trop peu et il manque au pire moment ; les ingrédients partent en pertes, en portions mal calibrées ou en vol, et personne ne le voit car il n'y a rien à quoi comparer. En fin de mois, le gérant regarde la banque et ne comprend pas pourquoi ça ne tombe pas juste.</p>

      <h2>Ce que contrôle un bon logiciel pour restaurants</h2>
      <ul>
        <li><strong>Achats auprès des fournisseurs :</strong> chaque achat d'ingrédients avec son coût, qui met à jour le stock.</li>
        <li><strong>Recettes et fiches techniques :</strong> la liste des ingrédients de chaque plat et son coût calculé.</li>
        <li><strong>Production :</strong> quand vous cuisinez un lot (une sauce, du pain, une pâte), il déduit les ingrédients et ajoute le produit fini.</li>
        <li><strong>Stock d'ingrédients :</strong> le stock réel de chaque ingrédient, en temps réel.</li>
        <li><strong>Ventes et caisse :</strong> ce qui sort en salle, à l'événement traiteur ou en livraison, et le mouvement de caisse du service.</li>
        <li><strong>Clôture de journée :</strong> le comptage physique contre le théorique, pour voir la perte réelle.</li>
        <li><strong>Carburant et livraison</strong>, si vous faites votre propre livraison ou portez les plats aux événements en véhicule.</li>
      </ul>

      <h2>Recettes et food cost : le cœur du système</h2>
      <p>La clé d'un logiciel pour restaurant, c'est la recette. Vous saisissez une fois ce que contient chaque plat —200 g de viande, 50 g de fromage, un pain— et le système calcule son coût avec les prix d'achat actuels. Quand vous vendez ce plat, il déduit ces ingrédients du stock. Ainsi, sans compter à la main, vous savez :</p>
      <ul>
        <li>Combien vous coûte chaque plat et quelle marge il laisse.</li>
        <li>Quels plats vous font gagner et lesquels vous vendez presque sans bénéfice.</li>
        <li>Combien d'ingrédients vous devriez avoir d'après ce que vous avez vendu (le "théorique").</li>
        <li>Le coût par couvert d'un menu traiteur avant d'envoyer le devis.</li>
      </ul>

      <h2>La clôture de journée : là où la perte apparaît</h2>
      <p>En fin de service, vous faites un comptage physique rapide des ingrédients critiques. Le système sait déjà combien vous devriez avoir (acheté moins vendu). L'écart entre le comptage réel et le théorique est votre <strong>perte</strong> : casse, portions mal calibrées, offerts non enregistrés ou vol. Le voir tous les jours, ne serait-ce que sur trois ou quatre ingrédients, change l'exploitation.</p>

      <h2>Plusieurs établissements</h2>
      <p>Si vous avez plusieurs établissements, une franchise ou plusieurs activités (salle + traiteur), le système doit vous laisser voir chacun séparément et aussi consolidé, sans additionner des tableurs à la main.</p>

      <h2>Comment Ledyvas le fait</h2>
      <p>Ledyvas pour restaurants et traiteurs couvre les achats, les fournisseurs, les recettes, la production, le stock d'ingrédients, les ventes, la caisse, le contrôle du carburant et la clôture de journée, avec utilisateurs et permissions. Il s'installe sous Windows, fonctionne sans connexion permanente et se paie une seule fois. Il exporte vers QuickBooks, Alegra, Zoho Books, Odoo et Xero.</p>
      <p>Il dispose aussi d'un mode pour organisateurs d'excursions —où la nourriture et les boissons se calculent par PAX du jour— que l'on peut activer ou laisser désactivé. <a href="telechargements.html">Téléchargez l'essai gratuit</a> et testez-le avec la carte et les fournisseurs réels de votre restaurant ou service traiteur.</p>
    `
    },

    excursiones: {
      eyebrow: "Logiciel pour organisateurs d'excursions",
      title: "Logiciel pour excursions et organisateurs de circuits : contrôle des PAX, des fournitures et des flottes | Ledyvas",
      description: "Logiciel pour organisateurs d'excursions : achats calculés par PAX et par destination, traiteur à bord, stock des embarcations, contrôle du carburant par unité et marge par excursion.",
      h1: "Logiciel pour organisateurs d'excursions touristiques",
      lede: "Un organisateur d'excursions ne gère pas comme un commerce : tout bouge avec les PAX du jour. Ce guide explique ce dont a besoin un logiciel pensé pour ce métier, traiteur à bord compris.",
      body: `
      <h2>Pourquoi un organisateur d'excursions a besoin d'un autre type de logiciel</h2>
      <p>Sur une excursion, la nourriture, les boissons, le jetable et même le carburant des bateaux et des bus se calculent <strong>par passager et par destination</strong>. Si 120 PAX partent demain répartis sur quatre plages, chaque plage a besoin d'une quantité différente de chaque fourniture, et bien l'acheter fait la différence entre gagner et donner la marge. Un logiciel de commerce ne sait pas faire ce calcul — encore moins si vous servez aussi un traiteur à bord.</p>

      <h2>Ce qu'il doit résoudre</h2>
      <ul>
        <li><strong>Formule par PAX et par destination :</strong> définir la quantité de chaque fourniture par personne et par destination, et laisser le système calculer l'achat du jour à partir des seuls PAX.</li>
        <li><strong>Achat assisté :</strong> à partir de cette formule, une proposition d'achat que vous ajustez avant de confirmer.</li>
        <li><strong>Traiteur à bord :</strong> les recettes des menus servis pendant l'excursion, avec leur coût par couvert.</li>
        <li><strong>Stock du centre logistique et des embarcations :</strong> ce qui part vers chaque destination et ce qui revient.</li>
        <li><strong>Contrôle du carburant par unité :</strong> distribution à chaque bateau ou bus, retour de ce qui n'a pas été utilisé et consommation réelle par unité.</li>
        <li><strong>Retours :</strong> ce qu'une destination n'a pas consommé et renvoie, pour acheter moins le lendemain.</li>
        <li><strong>Marge par destination et consolidation des flottes :</strong> savoir quelle excursion et quelle unité rapportent.</li>
      </ul>

      <h2>Le calcul par PAX, expliqué</h2>
      <p>Vous saisissez la "formule" une fois : par exemple 0,3 litre de boisson et 1 sandwich par personne à la Plage A, et des valeurs différentes à la Plage B. Chaque matin vous saisissez les PAX de chaque destination et le système vous dit exactement combien acheter de chaque article, en soustrayant ce que vous avez déjà en stock et ce qui est revenu en retour. Vous achetez juste ce qu'il faut.</p>

      <h2>Carburant et flottes</h2>
      <p>Le carburant d'une flotte de bateaux ou de bus est l'un des coûts qui fuit le plus. Le système enregistre la distribution à chaque unité, le retour de ce qui restait et la consommation nette, et le consolide par semaine et par entreprise. Il sert aussi à l'audit et même à vendre du carburant à des tiers avec traçabilité.</p>

      <h2>Marge par destination</h2>
      <p>En croisant ce qui a été distribué à chaque destination avec ce qui y a été vendu, vous connaissez le coût, la vente et la marge de chaque excursion —et le coût par PAX— pas une moyenne générale.</p>

      <h2>Comment Ledyvas le fait</h2>
      <p>Ledyvas dispose d'un <strong>mode tourisme</strong> avec tout cela : formule par PAX et par destination, achat assisté, recettes pour le traiteur à bord, centre logistique, contrôle du carburant par véhicule et par bateau, retours, marge par destination et consolidation des flottes. Il s'active dans les réglages ; si vous avez aussi un restaurant ou un commerce, ces fonctions cohabitent dans le même système.</p>
      <p>Il s'installe sous Windows, se paie une seule fois et exporte vers QuickBooks, Alegra, Zoho Books, Odoo et Xero. <a href="telechargements.html">Téléchargez l'essai gratuit</a> et construisez la formule de vos destinations réelles.</p>
    `
    }
  },

  // ======================= PORTUGUÊS =======================
  pt: {
    _sectores: "Ledyvas por setor: Food Service, Retail, Beauty e mais",

    establecimientos: {
      eyebrow: "Software de gestão para estabelecimentos",
      title: "Software de gestão: como escolher o sistema certo para o seu estabelecimento | Ledyvas",
      description: "O que é um software de gestão, quando é preciso e como escolher: compras, stock, vendas, caixa e relatórios para restaurantes, catering e comércios.",
      h1: "Software de gestão: o que é e como escolher",
      lede: "Um software de gestão reúne as compras, o stock, as vendas, a caixa e os relatórios do seu estabelecimento num só lugar. Este guia ajuda-o a perceber o que ele deve fazer e a escolher sem arrependimentos.",
      body: `
      <h2>O que é um software de gestão para estabelecimentos</h2>
      <p>É o sistema que centraliza a operação diária de um estabelecimento —um restaurante, uma loja, um salão, um minimercado, uma empresa de catering, uma excursão turística— numa única plataforma. Em vez de ter o stock num caderno, as compras no WhatsApp do fornecedor e as vendas na cabeça do dono, tudo fica registado e ligado: uma compra sobe o stock, uma venda desce, e no fim do dia sabe quanto comprou, quanto vendeu e quanto ficou.</p>

      <h2>Sinais de que o seu estabelecimento já precisa</h2>
      <ul>
        <li>A folha de stock nunca coincide com o que está na prateleira.</li>
        <li>Compra "a olho": às vezes a mercadoria vence sem vender, às vezes falta justamente o que mais sai.</li>
        <li>No fecho do dia não sabe se ganhou ou perdeu dinheiro.</li>
        <li>Suspeita de furto interno mas não consegue provar.</li>
        <li>Sempre que a pessoa de confiança adoece, a operação para porque "só ela sabe".</li>
        <li>O contabilista pede os números e leva dias a prepará-los.</li>
      </ul>

      <h2>O que um bom software de gestão deve fazer</h2>
      <p>Antes de olhar preços, confirme que o sistema cobre estes pontos:</p>
      <ul>
        <li><strong>Compras e fornecedores:</strong> registar cada compra com fornecedor, data e custo, atualizando o stock automaticamente.</li>
        <li><strong>Stock em tempo real:</strong> saber a qualquer momento quanto há de cada produto, com alertas de stock baixo.</li>
        <li><strong>Vendas e caixa:</strong> registar o que sai e acompanhar o movimento de caixa do dia.</li>
        <li><strong>Custos e margem:</strong> ver o custo real do que vende e a margem que deixa, não só a faturação.</li>
        <li><strong>Fecho diário:</strong> um relatório de cada dia com o comprado, o vendido, o que sobrou e as diferenças do inventário físico.</li>
        <li><strong>Multiutilizador com permissões:</strong> cada funcionário vê apenas a sua parte e cada ação fica registada.</li>
        <li><strong>Funciona sem internet permanente:</strong> se a ligação cai, a caixa não pode parar.</li>
        <li><strong>Pode exportar os seus dados:</strong> para Excel e para o seu software de contabilidade quando quiser.</li>
      </ul>

      <h2>Erros comuns ao escolher</h2>
      <ol>
        <li><strong>Escolher só pelo preço.</strong> O mais barato costuma ser o que mais tempo lhe faz perder a configurar.</li>
        <li><strong>Sistemas que precisam de um consultor para arrancar.</strong> Se não consegue pô-lo a funcionar com a operação real numa semana, algo está mal.</li>
        <li><strong>Mensalidade que cresce.</strong> Começa a pagar pouco e seis meses depois o plano de que precisa custa o triplo.</li>
        <li><strong>Não exportar os dados.</strong> Se amanhã quiser mudar de sistema e não puder levar a informação, fica preso.</li>
      </ol>

      <h2>Como a Ledyvas resolve</h2>
      <p>A Ledyvas é um software de gestão que se instala no seu PC com Windows e funciona sem ligação permanente. Cobre compras, fornecedores, produtos, stock, vendas, caixa, produção e relatórios, com utilizadores e permissões. A base de dados é sua e está cifrada.</p>
      <p>Paga-se <strong>uma única vez</strong> —sem mensalidade— e exporta os dados organizados para <strong>QuickBooks, Alegra, Zoho Books, Odoo e Xero</strong>, para o seu contabilista receber tudo limpo. Serve para restaurantes, bares, cafés, catering, lojas e salões, e tem um modo opcional para operadores de excursões (cálculo por PAX, combustível das frotas, margem por destino) que se pode desligar.</p>
      <p>Pode <a href="downloads.html">descarregar o teste grátis</a> e usá-lo sem limite de tempo com os seus dados reais antes de decidir.</p>
    `
    },

    restaurantes: {
      eyebrow: "Software para restaurantes",
      title: "Software de gestão para restaurantes e catering: compras, stock e custos | Ledyvas",
      description: "Guia prático de software para restaurantes, bares, cafés e empresas de catering: receitas e food cost, stock de ingredientes, fecho de dia, quebras e margem por prato.",
      h1: "Software de gestão para restaurantes e catering: guia prático",
      lede: "Num restaurante, o dinheiro não se perde na caixa: perde-se na cozinha. Este guia explica o que controla um software para restaurantes e serviços de catering e como o ajuda a saber o custo real.",
      body: `
      <h2>O verdadeiro problema de um restaurante sem sistema</h2>
      <p>Um restaurante ou uma empresa de catering pode ter faturação alta e lucro baixo. O motivo é quase sempre o mesmo: o <strong>food cost</strong> —quanto custam os ingredientes de cada prato ou de cada evento— é estimado a olho. Compra a mais e vence; compra a menos e falta no pior momento; os ingredientes vão-se em quebras, doses mal medidas ou furto, e ninguém vê porque não há com que comparar. No fecho do mês o dono olha para o banco e não percebe porque não bate certo.</p>

      <h2>O que um bom software para restaurantes controla</h2>
      <ul>
        <li><strong>Compras a fornecedores:</strong> cada compra de ingredientes com o seu custo, que atualiza o stock.</li>
        <li><strong>Receitas e ficha técnica:</strong> a lista de ingredientes de cada prato e o seu custo calculado.</li>
        <li><strong>Produção:</strong> quando cozinha um lote (um molho, um pão, uma massa) desconta os ingredientes e soma o produto acabado.</li>
        <li><strong>Stock de ingredientes:</strong> stock real de cada ingrediente, em tempo real.</li>
        <li><strong>Vendas e caixa:</strong> o que sai pela sala, pelo evento de catering ou por entrega, e o movimento de caixa do turno.</li>
        <li><strong>Fecho de dia:</strong> a contagem física contra a teórica, para ver a quebra real.</li>
        <li><strong>Combustível e entregas</strong>, se faz entrega própria ou leva a comida aos eventos com viaturas.</li>
      </ul>

      <h2>Receitas e food cost: o coração do sistema</h2>
      <p>A chave de um software para restaurante é a receita. Introduz uma vez o que cada prato leva —200 g de carne, 50 g de queijo, um pão— e o sistema calcula o seu custo com os preços de compra atuais. Quando vende esse prato, desconta esses ingredientes do stock. Assim, sem contar à mão, sabe:</p>
      <ul>
        <li>Quanto lhe custa cada prato e que margem deixa.</li>
        <li>Que pratos o fazem ganhar e quais vende quase sem lucro.</li>
        <li>Quanto ingrediente deveria ter com base no que vendeu (o "teórico").</li>
        <li>O custo por pessoa de um menu de catering antes de enviar o orçamento.</li>
      </ul>

      <h2>O fecho de dia: onde aparece a quebra</h2>
      <p>No fim do turno faz uma contagem física rápida dos ingredientes críticos. O sistema já sabe quanto deveria ter (comprado menos vendido). A diferença entre a contagem real e a teórica é a sua <strong>quebra</strong>: partido, doses mal servidas, ofertas não registadas ou furto. Vê-la todos os dias, mesmo que só de três ou quatro ingredientes, muda a operação.</p>

      <h2>Vários estabelecimentos</h2>
      <p>Se tem mais do que um estabelecimento, uma franquia ou várias linhas (sala + catering), o sistema deve deixá-lo ver cada um em separado e também consolidado, sem somar folhas de cálculo à mão.</p>

      <h2>Como a Ledyvas faz</h2>
      <p>A Ledyvas para restaurantes e catering cobre compras, fornecedores, receitas, produção, stock de ingredientes, vendas, caixa, controlo de combustível e fecho diário, com utilizadores e permissões. Instala-se em Windows, funciona sem ligação permanente e paga-se uma única vez. Exporta para QuickBooks, Alegra, Zoho Books, Odoo e Xero.</p>
      <p>Tem ainda um modo para operadores de excursões —onde a comida e a bebida se calculam por PAX do dia— que se pode ativar ou deixar desligado. <a href="downloads.html">Descarregue o teste grátis</a> e experimente com a carta e os fornecedores reais do seu restaurante ou serviço de catering.</p>
    `
    },

    excursiones: {
      eyebrow: "Software para operadores de excursões",
      title: "Software para excursões e operadores turísticos: controlo de PAX, insumos e frotas | Ledyvas",
      description: "Software para operadores de excursões: compras calculadas por PAX e por destino, catering a bordo, stock das embarcações, controlo de combustível por unidade e margem por excursão.",
      h1: "Software para operadores de excursões turísticas",
      lede: "Um operador de excursões não gere como uma loja: tudo se move com os PAX do dia. Este guia explica o que precisa um software pensado para esse negócio, incluindo o catering a bordo.",
      body: `
      <h2>Porque é que um operador de excursões precisa de outro tipo de software</h2>
      <p>Numa excursão, a comida, a bebida, os descartáveis e até o combustível dos barcos e autocarros calculam-se <strong>por passageiro e por destino</strong>. Se amanhã saem 120 PAX divididos por quatro praias, cada praia precisa de uma quantidade diferente de cada insumo, e comprá-la bem é a diferença entre ganhar e oferecer a margem. Um software de loja não sabe fazer esse cálculo, e muito menos se também servir catering a bordo.</p>

      <h2>O que tem de resolver</h2>
      <ul>
        <li><strong>Fórmula por PAX e por destino:</strong> definir quanto de cada insumo leva cada pessoa em cada destino, e deixar o sistema calcular a compra do dia só a partir dos PAX.</li>
        <li><strong>Compra assistida:</strong> a partir dessa fórmula, uma proposta de compra que ajusta antes de confirmar.</li>
        <li><strong>Catering a bordo:</strong> receitas dos menus servidos na excursão, com o custo por pessoa.</li>
        <li><strong>Stock do centro logístico e das embarcações:</strong> o que sai para cada destino e o que volta.</li>
        <li><strong>Controlo de combustível por unidade:</strong> despacho a cada barco ou autocarro, devolução do que não foi usado e consumo real por unidade.</li>
        <li><strong>Devoluções:</strong> o que um destino não consumiu e devolve, para comprar menos no dia seguinte.</li>
        <li><strong>Margem por destino e consolidado de frotas:</strong> saber que excursão e que unidade dão lucro.</li>
      </ul>

      <h2>O cálculo por PAX, explicado</h2>
      <p>Introduz a "fórmula" uma vez: por exemplo, 0,3 litros de bebida e 1 sanduíche por pessoa na Praia A, e valores diferentes na Praia B. Todas as manhãs introduz os PAX de cada destino e o sistema diz-lhe exatamente quanto comprar de cada coisa, subtraindo o que já tem em stock e o que voltou como devolução. Compra o suficiente.</p>

      <h2>Combustível e frotas</h2>
      <p>O combustível de uma frota de barcos ou autocarros é um dos custos que mais foge. O sistema regista o despacho a cada unidade, a devolução do que sobrou e o consumo líquido, e consolida-o por semana e por empresa. Serve também para auditar e até para vender combustível a terceiros com rastreabilidade.</p>

      <h2>Margem por destino</h2>
      <p>Ao cruzar o que foi despachado para cada destino com o que foi vendido lá, sabe o custo, a venda e a margem de cada excursão —e o custo por PAX— não uma média geral.</p>

      <h2>Como a Ledyvas faz</h2>
      <p>A Ledyvas tem um <strong>modo turismo</strong> com tudo isto: fórmula por PAX e por destino, compra assistida, receitas para o catering a bordo, centro logístico, controlo de combustível por viatura e embarcação, devoluções, margem por destino e consolidado de frotas. Ativa-se nas definições; se também tiver um restaurante ou uma loja, essas funções convivem no mesmo sistema.</p>
      <p>Instala-se em Windows, paga-se uma única vez e exporta para QuickBooks, Alegra, Zoho Books, Odoo e Xero. <a href="downloads.html">Descarregue o teste grátis</a> e monte a fórmula dos seus destinos reais.</p>
    `
    }
  }
};
