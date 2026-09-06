/* ==========================================================================
   LEDYVAS — Estructura de los formularios de solicitud (vendedor / distribuidor)
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

  var VENDEDOR = [
    { sec: "f.sec.identity", fields: [
      { n: "fullName", k: "f.fullName", type: "text", req: true },
      { n: "birth",    k: "f.birth",    type: "date", req: true },
      { n: "country",  k: "f.country",  type: "text", req: true },
      { n: "address",  k: "f.address",  type: "text", req: true },
      { n: "idType",   k: "f.idType",   type: "select", opts: ["f.idType.passport", "f.idType.national", "f.idType.license"], req: true },
      { n: "idNumber", k: "f.idNumber", type: "text", req: true },
      { n: "idFile",   k: "f.idFile",   type: "file", hint: "f.idFile.hint", req: true }
    ]},
    { sec: "f.sec.fiscal", fields: [
      { n: "taxId", k: "f.taxIdPersonal", type: "text", hint: "f.taxIdPersonal.hint" }
    ]},
    { sec: "f.sec.contact", fields: [
      { n: "email",    k: "f.email",    type: "email", req: true },
      { n: "phone",    k: "f.phone",    type: "tel",   req: true },
      { n: "linkedin", k: "f.linkedin", type: "url" }
    ]},
    { sec: "f.sec.profile", fields: [
      { n: "profileType", k: "f.profileType", type: "select", opts: ["f.profile.accountant", "f.profile.consultant", "f.profile.sales", "f.profile.student", "f.profile.other"], req: true },
      { n: "company",     k: "f.companyOptional", type: "text" },
      { n: "region",      k: "f.region",   type: "text", req: true },
      { n: "platform",    k: "f.platform", type: "select", opts: ["f.plat.alegra", "f.plat.zoho", "f.plat.qbo", "f.plat.qbd", "f.plat.odoo", "f.plat.xero", "f.plat.none"], req: true },
      { n: "experience",  k: "f.experience", type: "textarea" }
    ]},
    { sec: "f.sec.payment", fields: [
      { n: "payMethod",  k: "f.payMethod",  type: "select", opts: ["f.pay.paypal", "f.pay.wise", "f.pay.bank"], req: true },
      { n: "payDetails", k: "f.payDetails", type: "text", hint: "f.payDetails.hint", req: true }
    ]},
    { sec: "f.sec.refs", fields: [
      { n: "refs", k: "f.refs", type: "textarea", hint: "f.refs.hint" }
    ]}
  ];

  var DISTRIBUIDOR = [
    { sec: "f.sec.company", fields: [
      { n: "companyName",    k: "f.companyName",    type: "text", req: true },
      { n: "entityType",     k: "f.entityType",     type: "select", opts: ["f.entity.srl", "f.entity.sa", "f.entity.autonomo", "f.entity.accountingFirm", "f.entity.reseller", "f.entity.other"], req: true },
      { n: "companyAddress", k: "f.companyAddress", type: "text", req: true },
      { n: "country",        k: "f.country",        type: "text", req: true },
      { n: "website",        k: "f.website",        type: "url",  req: true }
    ]},
    { sec: "f.sec.fiscal", fields: [
      { n: "regNumber",   k: "f.regNumber",   type: "text", hint: "f.regNumber.hint", req: true },
      { n: "companyTaxId", k: "f.companyTaxId", type: "text", req: true },
      { n: "incorpFile",  k: "f.incorpFile",  type: "file", hint: "f.incorpFile.hint", req: true }
    ]},
    { sec: "f.sec.rep", fields: [
      { n: "repName", k: "f.repName", type: "text", req: true },
      { n: "repRole", k: "f.repRole", type: "text", req: true },
      { n: "repId",   k: "f.repId",   type: "text", req: true }
    ]},
    { sec: "f.sec.contact", fields: [
      { n: "contactPerson", k: "f.contactPerson", type: "text" },
      { n: "email",         k: "f.email",         type: "email", req: true },
      { n: "phone",         k: "f.phone",         type: "tel",   req: true }
    ]},
    { sec: "f.sec.business", fields: [
      { n: "yearsOperating", k: "f.yearsOperating", type: "number", req: true },
      { n: "clientCount",    k: "f.clientCount",    type: "text",   req: true },
      { n: "sectors",        k: "f.sectors",        type: "text" },
      { n: "region",         k: "f.regionDist",     type: "text",   req: true },
      { n: "platform",       k: "f.platformsDist",  type: "text",   req: true },
      { n: "expectedVolume", k: "f.expectedVolume", type: "text" }
    ]},
    { sec: "f.sec.payment", fields: [
      { n: "payMethod",  k: "f.payMethodCompany", type: "select", opts: ["f.pay.bank", "f.pay.wise", "f.pay.paypal"], req: true },
      { n: "payDetails", k: "f.payDetailsCompany", type: "text", req: true }
    ]},
    { sec: "f.sec.refs", fields: [
      { n: "refs", k: "f.refsCommercial", type: "textarea", hint: "f.refsCommercial.hint", req: true }
    ]}
  ];

  // Preguntas de pre-evaluación (las responde el candidato en texto libre;
  // la IA del Worker las evalúa). Claves i18n de la pregunta.
  var SCREEN_VENDEDOR = ["q.v.1", "q.v.2", "q.v.3", "q.v.4", "q.v.5"];
  var SCREEN_DISTRIBUIDOR = ["q.d.1", "q.d.2", "q.d.3", "q.d.4", "q.d.5"];

  window.SolicitudForm = {
    get: function (role) { return role === "distribuidor" ? DISTRIBUIDOR : VENDEDOR; },
    screening: function (role) { return role === "distribuidor" ? SCREEN_DISTRIBUIDOR : SCREEN_VENDEDOR; }
  };
})();
