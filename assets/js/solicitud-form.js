/* ==========================================================================
   LEDYVAS — Estructura del formulario de solicitud de Partner
   Solo la ESTRUCTURA (qué campos, en qué orden, de qué tipo). Los textos de
   las etiquetas están en distribuidores-i18n.js con las claves "f.*".
   Usado por distribuidores.html.
   ========================================================================== */
(function () {
  "use strict";

  // n  = name del campo   k = clave i18n de la etiqueta
  // type = text | email | tel | date | url | number | select | file | textarea
  // opts = claves i18n de las opciones (para select)
  // hint = clave i18n de la ayuda   req = obligatorio

  // Simplificado (2026-09-15, a pedido de Leo: "hacerlo mas simple y directo").
  // Antes tenia 24 campos, 21 obligatorios, incluyendo datos fiscales/legales
  // (RNC, numero de registro, acta de constitucion, documento del representante)
  // y datos bancarios de cobro -- todo eso solo hace falta para FIRMAR el
  // contrato, no para evaluar si el candidato encaja. Leo revisa cada
  // solicitud a mano en el panel de admin de todas formas, asi que esos datos
  // se piden despues, al avanzar hacia el contrato (ver "f.laterNote" abajo).
  // Campos que se sacaron del todo: companyAddress, fiscalCountry, regNumber,
  // companyTaxId, incorpFile, repRole, repId, contactPerson (se fusiono con
  // repName), payMethod, payDetails.
  var DISTRIBUIDOR = [
    { sec: "f.sec.company", fields: [
      { n: "companyName", k: "f.companyName", type: "text", req: true },
      { n: "entityType",  k: "f.entityType",  type: "select", opts: ["f.entity.srl", "f.entity.sa", "f.entity.autonomo", "f.entity.accountingFirm", "f.entity.reseller", "f.entity.other"], req: true },
      { n: "country",     k: "f.country",     type: "text", req: true },
      { n: "website",     k: "f.website",     type: "url",  req: true }
    ]},
    { sec: "f.sec.contact", fields: [
      { n: "repName", k: "f.repName", type: "text",  req: true },
      { n: "email",   k: "f.email",   type: "email", req: true },
      { n: "phone",   k: "f.phone",   type: "tel",   req: true }
    ]},
    { sec: "f.sec.business", fields: [
      { n: "region",         k: "f.regionDist",     type: "text", req: true },
      { n: "platform",       k: "f.platformsDist",  type: "text" },
      { n: "yearsOperating", k: "f.yearsOperating", type: "number" },
      { n: "clientCount",    k: "f.clientCount",    type: "text" },
      { n: "sectors",        k: "f.sectors",        type: "text" },
      { n: "expectedVolume", k: "f.expectedVolume", type: "text" },
      { n: "refs",           k: "f.refsCommercial", type: "textarea", hint: "f.refsCommercial.hint" }
    ]}
  ];

  // Preguntas de pre-evaluación (las responde el candidato en texto libre;
  // la IA del Worker las evalúa). Claves i18n de la pregunta.
  var SCREEN_DISTRIBUIDOR = ["q.d.1", "q.d.2", "q.d.3", "q.d.4", "q.d.5"];

  window.SolicitudForm = {
    get: function () { return DISTRIBUIDOR; },
    screening: function () { return SCREEN_DISTRIBUIDOR; }
  };
})();
