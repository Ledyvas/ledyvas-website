/* ==========================================================================
   LEDYVAS — Correos de reclutamiento del Programa de Distribución (5 idiomas)
   Uso interno (página privada correos-reclutamiento.html, noindex). Cada idioma
   tiene el primer contacto + el recordatorio; A y B solo cambian el párrafo de
   precios y la línea de comisión del recordatorio. Firma: "Equipo de Alianzas",
   dirección postal + enlace de baja (requisito RGPD/ePrivacy/CASL).
   Placeholders que reemplaza la herramienta de envío: [nombre]/[name],
   [empresa]/[company] y [email] (dirección del destinatario, para el enlace de baja).
   El opt-out es real: https://ledyvas.com/unsubscribe.html?e=[email] -> POST al
   Worker (/unsubscribe) que guarda `unsub:<email>`. Leo baja la lista de supresión
   con GET /admin/unsubscribes (Bearer) antes de cada envío.
   Español rige; en/it/fr/pt traducción de cortesía (2026-09-07).
   ========================================================================== */
(function () {
  "use strict";

  var SIG = {
    es: "Un saludo,\nEquipo de Alianzas · Ledyvas\ninfo@ledyvas.com · https://ledyvas.com\nLedyvas — Leonardo Cosci · Westland Residences, La Romana, República Dominicana",
    en: "Best regards,\nAlliances team · Ledyvas\ninfo@ledyvas.com · https://ledyvas.com\nLedyvas — Leonardo Cosci · Westland Residences, La Romana, Dominican Republic",
    it: "Un saluto,\nTeam Alleanze · Ledyvas\ninfo@ledyvas.com · https://ledyvas.com\nLedyvas — Leonardo Cosci · Westland Residences, La Romana, Repubblica Dominicana",
    fr: "Cordialement,\nÉquipe Alliances · Ledyvas\ninfo@ledyvas.com · https://ledyvas.com\nLedyvas — Leonardo Cosci · Westland Residences, La Romana, République dominicaine",
    pt: "Cumprimentos,\nEquipa de Alianças · Ledyvas\ninfo@ledyvas.com · https://ledyvas.com\nLedyvas — Leonardo Cosci · Westland Residences, La Romana, República Dominicana"
  };
  var SIG_SHORT = {
    es: "Un saludo,\nEquipo de Alianzas · Ledyvas\ninfo@ledyvas.com · https://ledyvas.com · Leonardo Cosci, Westland Residences, La Romana, República Dominicana",
    en: "Best regards,\nAlliances team · Ledyvas\ninfo@ledyvas.com · https://ledyvas.com · Leonardo Cosci, Westland Residences, La Romana, Dominican Republic",
    it: "Un saluto,\nTeam Alleanze · Ledyvas\ninfo@ledyvas.com · https://ledyvas.com · Leonardo Cosci, Westland Residences, La Romana, Repubblica Dominicana",
    fr: "Cordialement,\nÉquipe Alliances · Ledyvas\ninfo@ledyvas.com · https://ledyvas.com · Leonardo Cosci, Westland Residences, La Romana, République dominicaine",
    pt: "Cumprimentos,\nEquipa de Alianças · Ledyvas\ninfo@ledyvas.com · https://ledyvas.com · Leonardo Cosci, Westland Residences, La Romana, República Dominicana"
  };
  // [email] lo reemplaza la herramienta de envío por la dirección del destinatario
  // (igual que [nombre]/[empresa]). El enlace da la baja en un solo clic.
  var OPTOUT = {
    es: "Dar de baja: https://ledyvas.com/unsubscribe.html?e=[email] — un solo clic, efecto inmediato; no volveremos a escribirle.",
    en: "Unsubscribe: https://ledyvas.com/unsubscribe.html?e=[email] — one click, effective immediately; we will not email you again.",
    it: "Annulla iscrizione: https://ledyvas.com/unsubscribe.html?e=[email] — un solo clic, effetto immediato; non ti scriveremo più.",
    fr: "Se désinscrire : https://ledyvas.com/unsubscribe.html?e=[email] — un clic, effet immédiat ; nous ne vous écrirons plus.",
    pt: "Cancelar subscrição: https://ledyvas.com/unsubscribe.html?e=[email] — um clique, efeito imediato; não voltaremos a escrever-lhe."
  };

  var DATA = {
    es: {
      firstSubject: "Ledyvas — programa de partners con comisión recurrente (sin coste de entrada)",
      first:
        "Hola [nombre],\n\n" +
        "Le escribo desde el equipo de Alianzas de Ledyvas, un ERP para pymes, especializado en hostelería y turismo (restaurantes, catering, excursiones) pero también útil para comercio y cualquier negocio con inventario y varios puntos de venta.\n\n" +
        "Ledyvas no compite con su plataforma contable — trabaja por debajo de ella. Su cliente lleva la operación diaria en Ledyvas (compras, inventario, ventas, caja, control de combustible y flotas, recetas y food cost) y al cierre exporta los datos limpios a Zoho Books, QuickBooks, Alegra, Odoo o Xero. La IA integrada le indica cuánto comprar.\n\n" +
        "El programa funciona como el de partners de Zoho: no hay cuota de alta ni coste de entrada. Usted da de alta a su cliente, lo acompaña y cobra el 20% de su cuota mensual todos los meses, mientras siga siendo cliente. Ledyvas le cobra directamente por tarjeta y le paga su comisión cada mes; usted no gestiona el dinero del cliente ni adelanta nada.\n\n" +
        "La diferencia con los gigantes: le asignamos un territorio de exclusividad, su cliente paga una cuota fija (no cobramos por usuario) y el software está pensado para el negocio real de sus clientes — no un ERP genérico.\n\n" +
        "{{PRICE_PARA}}\n\n" +
        "Cuando se apruebe su solicitud, recibirá una licencia de demostración para mostrar Ledyvas a sus clientes, y ellos prueban 14 días gratis, descargable en www.ledyvas.com, antes de suscribirse. Condiciones completas: https://ledyvas.com/distribuidores\n\n" +
        "¿Le interesa? Responda a este correo.\n\n" +
        "{{SIG}}\n\n{{OPTOUT}}",
      reminderSubject: "Re: Ledyvas — programa de partners con comisión recurrente",
      reminder:
        "Hola [nombre],\n\n" +
        "Le dejo el resumen en tres líneas, por si el primer correo quedó enterrado:\n\n" +
        "{{COMM_LINE}}\n" +
        "· Ledyvas le cobra al cliente por tarjeta y le paga su comisión cada mes. Usted da de alta y acompaña; el soporte técnico lo damos nosotros.\n" +
        "· Territorio de exclusividad para [empresa] en su zona.\n\n" +
        "Todo está en https://ledyvas.com/distribuidores — cuando se apruebe su solicitud recibirá su licencia de demostración, y sus clientes prueban 14 días gratis, descargables en www.ledyvas.com, antes de suscribirse.\n\n" +
        "Si no es para usted, dese de baja en un clic: https://ledyvas.com/unsubscribe.html?e=[email]. No volveré a escribirle.\n\n" +
        "{{SIG_SHORT}}",
      A: {
        pricePara: "La cuota mensual del cliente y, con ella, su comisión, dependen del país de residencia fiscal de su empresa. El importe exacto se le comunica junto con el formulario de adhesión, según el documento registrado. Su comisión es siempre el 20% de cada cuota, de forma recurrente.",
        commLine: "· Sin cuota de alta ni coste de entrada. Cobra el 20% de la cuota mensual de cada cliente, de forma recurrente, mientras siga activo."
      },
      B: {
        pricePara: "La cuota mensual del cliente y, con ella, su comisión, dependen del país de residencia fiscal de su empresa. El importe exacto se le comunica junto con el formulario de adhesión, según el documento registrado. Su comisión es siempre el 20% de cada cuota, de forma recurrente.",
        commLine: "· Sin cuota de alta ni coste de entrada. Cobra el 20% de la cuota mensual de cada cliente, de forma recurrente, mientras siga activo."
      }
    },
    en: {
      firstSubject: "Ledyvas — partner program with recurring commission (no entry cost)",
      first:
        "Hi [name],\n\n" +
        "I'm writing from the Ledyvas Alliances team. Ledyvas is an ERP for SMEs, specialised in hospitality and tourism (restaurants, catering, tours) but equally useful for retail and any business with inventory and several points of sale.\n\n" +
        "Ledyvas doesn't compete with your accounting platform — it works underneath it. Your client runs day-to-day operations in Ledyvas (purchases, inventory, sales, cash, fuel and fleet control, recipes and food cost) and at period close exports clean data to Zoho Books, QuickBooks, Alegra, Odoo or Xero. The built-in AI tells them how much to buy.\n\n" +
        "The program works like Zoho's partner program: no membership, no entry cost. You onboard your client, support them, and earn 20% of their monthly fee every month, for as long as they stay a client. Ledyvas charges them directly by card and pays you your commission each month; you never handle the client's money or advance anything.\n\n" +
        "The difference from the giants: we assign you an exclusive territory, your client pays a flat fee (we don't charge per user), and the software is built for your clients' real business — not a generic ERP.\n\n" +
        "{{PRICE_PARA}}\n\n" +
        "On approval, you receive a demo licence to show Ledyvas to your clients, and they try it free for 14 days — downloadable at www.ledyvas.com — before subscribing. Full terms: https://ledyvas.com/distribuidores\n\n" +
        "Interested? Just reply to this email.\n\n" +
        "{{SIG}}\n\n{{OPTOUT}}",
      reminderSubject: "Re: Ledyvas — partner program with recurring commission",
      reminder:
        "Hi [name],\n\n" +
        "Here's the summary in three lines, in case the first email got buried:\n\n" +
        "{{COMM_LINE}}\n" +
        "· Ledyvas charges the client by card and pays you your commission each month. You onboard and support; we handle technical support.\n" +
        "· Exclusive territory for [company] in your area.\n\n" +
        "Everything is at https://ledyvas.com/distribuidores — on approval you receive your demo licence, and your clients try it free for 14 days, downloadable at www.ledyvas.com, before subscribing.\n\n" +
        "If this isn't for you, unsubscribe in one click: https://ledyvas.com/unsubscribe.html?e=[email]. I won't email you again.\n\n" +
        "{{SIG_SHORT}}",
      A: {
        pricePara: "The client's monthly fee — and with it your commission — depend on your company's country of fiscal residence. The exact amount is sent to you with the adhesion form, based on your registered document. Your commission is always 20% of each fee, recurring.",
        commLine: "· No membership, no entry cost. You earn 20% of each client's monthly fee, recurring, for as long as they stay active."
      },
      B: {
        pricePara: "The client's monthly fee — and with it your commission — depend on your company's country of fiscal residence. The exact amount is sent to you with the adhesion form, based on your registered document. Your commission is always 20% of each fee, recurring.",
        commLine: "· No membership, no entry cost. You earn 20% of each client's monthly fee, recurring, for as long as they stay active."
      }
    },
    it: {
      firstSubject: "Ledyvas — programma partner con commissione ricorrente (senza costo d'ingresso)",
      first:
        "Ciao [nome],\n\n" +
        "ti scrivo dal team Alleanze di Ledyvas. Ledyvas è un ERP per PMI, specializzato in ristorazione e turismo (ristoranti, catering, escursioni) ma utile anche per il commercio e qualsiasi attività con magazzino e più punti vendita.\n\n" +
        "Ledyvas non compete con la tua piattaforma contabile — lavora sotto di essa. Il tuo cliente gestisce l'operatività quotidiana in Ledyvas (acquisti, magazzino, vendite, cassa, controllo carburante e flotte, ricette e food cost) e alla chiusura esporta dati puliti verso Zoho Books, QuickBooks, Alegra, Odoo o Xero. L'IA integrata gli indica quanto acquistare.\n\n" +
        "Il programma funziona come quello partner di Zoho: nessuna quota di adesione, nessun costo d'ingresso. Attivi il tuo cliente, lo assisti e incassi il 20% della sua quota mensile ogni mese, finché resta cliente. Ledyvas lo addebita direttamente con carta e ti paga la commissione ogni mese; tu non tocchi il denaro del cliente né anticipi nulla.\n\n" +
        "La differenza rispetto ai giganti: ti assegniamo un territorio in esclusiva, il tuo cliente paga una quota fissa (non addebitiamo per utente) e il software è pensato per l'attività reale dei tuoi clienti — non un ERP generico.\n\n" +
        "{{PRICE_PARA}}\n\n" +
        "All'approvazione ricevi una licenza dimostrativa per mostrare Ledyvas ai tuoi clienti, e loro provano gratis per 14 giorni, scaricabile su www.ledyvas.com, prima di abbonarsi. Condizioni complete: https://ledyvas.com/distribuidores\n\n" +
        "Ti interessa? Rispondi a questa email.\n\n" +
        "{{SIG}}\n\n{{OPTOUT}}",
      reminderSubject: "Re: Ledyvas — programma partner con commissione ricorrente",
      reminder:
        "Ciao [nome],\n\n" +
        "ecco il riassunto in tre righe, nel caso la prima email si fosse persa:\n\n" +
        "{{COMM_LINE}}\n" +
        "· Ledyvas addebita il cliente con carta e ti paga la commissione ogni mese. Tu attivi e assisti; il supporto tecnico lo diamo noi.\n" +
        "· Territorio in esclusiva per [azienda] nella tua zona.\n\n" +
        "Tutto è su https://ledyvas.com/distribuidores — all'approvazione ricevi la tua licenza dimostrativa, e i tuoi clienti provano gratis per 14 giorni, scaricabile su www.ledyvas.com, prima di abbonarsi.\n\n" +
        "Se non fa per te, annulla l'iscrizione con un clic: https://ledyvas.com/unsubscribe.html?e=[email]. Non ti scrivo più.\n\n" +
        "{{SIG_SHORT}}",
      A: {
        pricePara: "La quota mensile del cliente — e con essa la tua commissione — dipendono dal paese di residenza fiscale della tua azienda. L'importo esatto ti viene comunicato insieme al modulo di adesione, in base al documento registrato. La tua commissione è sempre il 20% di ogni quota, in modo ricorrente.",
        commLine: "· Nessuna quota di adesione, nessun costo d'ingresso. Incassi il 20% della quota mensile di ogni cliente, in modo ricorrente, finché resta attivo."
      },
      B: {
        pricePara: "La quota mensile del cliente — e con essa la tua commissione — dipendono dal paese di residenza fiscale della tua azienda. L'importo esatto ti viene comunicato insieme al modulo di adesione, in base al documento registrato. La tua commissione è sempre il 20% di ogni quota, in modo ricorrente.",
        commLine: "· Nessuna quota di adesione, nessun costo d'ingresso. Incassi il 20% della quota mensile di ogni cliente, in modo ricorrente, finché resta attivo."
      }
    },
    fr: {
      firstSubject: "Ledyvas — programme partenaires avec commission récurrente (sans frais d'entrée)",
      first:
        "Bonjour [nom],\n\n" +
        "je vous écris de la part de l'équipe Alliances de Ledyvas. Ledyvas est un ERP pour PME, spécialisé dans l'hôtellerie-restauration et le tourisme (restaurants, traiteurs, excursions) mais tout aussi utile pour le commerce et toute activité avec stock et plusieurs points de vente.\n\n" +
        "Ledyvas ne concurrence pas votre plateforme comptable — il travaille en dessous. Votre client gère l'exploitation quotidienne dans Ledyvas (achats, stock, ventes, caisse, contrôle du carburant et des flottes, recettes et food cost) et, à la clôture, exporte des données propres vers Zoho Books, QuickBooks, Alegra, Odoo ou Xero. L'IA intégrée lui indique combien acheter.\n\n" +
        "Le programme fonctionne comme celui des partenaires de Zoho : pas d'adhésion, pas de frais d'entrée. Vous intégrez votre client, vous l'accompagnez, et vous percevez 20 % de sa redevance mensuelle chaque mois, tant qu'il reste client. Ledyvas le facture directement par carte et vous verse votre commission chaque mois ; vous ne touchez jamais l'argent du client et n'avancez rien.\n\n" +
        "La différence avec les géants : nous vous attribuons un territoire exclusif, votre client paie une redevance fixe (nous ne facturons pas par utilisateur) et le logiciel est conçu pour l'activité réelle de vos clients — pas un ERP générique.\n\n" +
        "{{PRICE_PARA}}\n\n" +
        "Une fois approuvé, vous recevez une licence de démonstration pour présenter Ledyvas à vos clients, et ceux-ci l'essaient gratuitement pendant 14 jours, téléchargeable sur www.ledyvas.com, avant de souscrire. Conditions complètes : https://ledyvas.com/distribuidores\n\n" +
        "Cela vous intéresse ? Répondez simplement à cet e-mail.\n\n" +
        "{{SIG}}\n\n{{OPTOUT}}",
      reminderSubject: "Re : Ledyvas — programme partenaires avec commission récurrente",
      reminder:
        "Bonjour [nom],\n\n" +
        "voici le résumé en trois lignes, au cas où le premier e-mail serait passé inaperçu :\n\n" +
        "{{COMM_LINE}}\n" +
        "· Ledyvas facture le client par carte et vous verse votre commission chaque mois. Vous intégrez et accompagnez ; le support technique, c'est nous.\n" +
        "· Territoire exclusif pour [entreprise] dans votre zone.\n\n" +
        "Tout est sur https://ledyvas.com/distribuidores — une fois approuvé, vous recevez votre licence de démonstration, et vos clients l'essaient gratuitement pendant 14 jours, téléchargeable sur www.ledyvas.com, avant de souscrire.\n\n" +
        "Si ce n'est pas pour vous, désinscrivez-vous en un clic : https://ledyvas.com/unsubscribe.html?e=[email]. Je ne vous écrirai plus.\n\n" +
        "{{SIG_SHORT}}",
      A: {
        pricePara: "La redevance mensuelle du client — et donc votre commission — dépendent du pays de résidence fiscale de votre entreprise. Le montant exact vous est communiqué avec le formulaire d'adhésion, d'après le document enregistré. Votre commission est toujours de 20 % de chaque redevance, de façon récurrente.",
        commLine: "· Pas d'adhésion, pas de frais d'entrée. Vous percevez 20 % de la redevance mensuelle de chaque client, de façon récurrente, tant qu'il reste actif."
      },
      B: {
        pricePara: "La redevance mensuelle du client — et donc votre commission — dépendent du pays de résidence fiscale de votre entreprise. Le montant exact vous est communiqué avec le formulaire d'adhésion, d'après le document enregistré. Votre commission est toujours de 20 % de chaque redevance, de façon récurrente.",
        commLine: "· Pas d'adhésion, pas de frais d'entrée. Vous percevez 20 % de la redevance mensuelle de chaque client, de façon récurrente, tant qu'il reste actif."
      }
    },
    pt: {
      firstSubject: "Ledyvas — programa de parceiros com comissão recorrente (sem custo de entrada)",
      first:
        "Olá [nome],\n\n" +
        "escrevo em nome da equipa de Alianças da Ledyvas. A Ledyvas é um ERP para PME, especializado em hotelaria e turismo (restaurantes, catering, excursões) mas igualmente útil para o comércio e qualquer negócio com inventário e vários pontos de venda.\n\n" +
        "A Ledyvas não compete com a sua plataforma de contabilidade — trabalha por baixo dela. O seu cliente faz a operação diária na Ledyvas (compras, inventário, vendas, caixa, controlo de combustível e frotas, receitas e food cost) e, no fecho, exporta dados limpos para o Zoho Books, QuickBooks, Alegra, Odoo ou Xero. A IA integrada indica-lhe quanto comprar.\n\n" +
        "O programa funciona como o de parceiros da Zoho: sem mensalidade de adesão, sem custo de entrada. Você ativa o seu cliente, acompanha-o e recebe 20% da mensalidade dele todos os meses, enquanto continuar cliente. A Ledyvas cobra-lhe diretamente por cartão e paga-lhe a comissão todos os meses; você nunca toca no dinheiro do cliente nem adianta nada.\n\n" +
        "A diferença face aos gigantes: atribuímos-lhe um território exclusivo, o seu cliente paga uma mensalidade fixa (não cobramos por utilizador) e o software foi pensado para o negócio real dos seus clientes — não um ERP genérico.\n\n" +
        "{{PRICE_PARA}}\n\n" +
        "Ao ser aprovado, recebe uma licença de demonstração para mostrar a Ledyvas aos seus clientes, e eles testam 14 dias grátis, disponível em www.ledyvas.com, antes de subscrever. Condições completas: https://ledyvas.com/distribuidores\n\n" +
        "Tem interesse? Basta responder a este e-mail.\n\n" +
        "{{SIG}}\n\n{{OPTOUT}}",
      reminderSubject: "Re: Ledyvas — programa de parceiros com comissão recorrente",
      reminder:
        "Olá [nome],\n\n" +
        "deixo o resumo em três linhas, caso o primeiro e-mail se tenha perdido:\n\n" +
        "{{COMM_LINE}}\n" +
        "· A Ledyvas cobra ao cliente por cartão e paga-lhe a comissão todos os meses. Você ativa e acompanha; o suporte técnico é connosco.\n" +
        "· Território exclusivo para [empresa] na sua zona.\n\n" +
        "Está tudo em https://ledyvas.com/distribuidores — ao ser aprovado, recebe a sua licença de demonstração, e os seus clientes testam 14 dias grátis, disponível em www.ledyvas.com, antes de subscrever.\n\n" +
        "Se não é para si, cancele a subscrição com um clique: https://ledyvas.com/unsubscribe.html?e=[email]. Não volto a escrever-lhe.\n\n" +
        "{{SIG_SHORT}}",
      A: {
        pricePara: "A mensalidade do cliente — e com ela a sua comissão — dependem do país de residência fiscal da sua empresa. O valor exato é-lhe comunicado com o formulário de adesão, conforme o documento registado. A sua comissão é sempre 20% de cada mensalidade, de forma recorrente.",
        commLine: "· Sem mensalidade de adesão, sem custo de entrada. Recebe 20% da mensalidade de cada cliente, de forma recorrente, enquanto se mantiver ativo."
      },
      B: {
        pricePara: "A mensalidade do cliente — e com ela a sua comissão — dependem do país de residência fiscal da sua empresa. O valor exato é-lhe comunicado com o formulário de adesão, conforme o documento registado. A sua comissão é sempre 20% de cada mensalidade, de forma recorrente.",
        commLine: "· Sem mensalidade de adesão, sem custo de entrada. Recebe 20% da mensalidade de cada cliente, de forma recorrente, enquanto se mantiver ativo."
      }
    }
  };

  function build(lang, tier, which) {
    var L = DATA[lang] || DATA.es;
    var t = L[(tier === "B" || tier === "b" || tier === "resto") ? "B" : "A"];
    if (which === "reminder") {
      return {
        subject: L.reminderSubject,
        body: L.reminder
          .replace("{{COMM_LINE}}", t.commLine)
          .replace("{{SIG_SHORT}}", SIG_SHORT[lang] || SIG_SHORT.es)
      };
    }
    return {
      subject: L.firstSubject,
      body: L.first
        .replace("{{PRICE_PARA}}", t.pricePara)
        .replace("{{SIG}}", SIG[lang] || SIG.es)
        .replace("{{OPTOUT}}", OPTOUT[lang] || OPTOUT.es)
    };
  }

  window.CorreosTexto = {
    langs: ["es", "en", "it", "fr", "pt"],
    tiers: ["A", "B"],
    build: build
  };
})();
