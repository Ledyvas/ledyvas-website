/* ==========================================================================
   LEDYVAS LUXURY — Chat de la pagina luxury.html
   Widget flotante autocontenido: inyecta su propio CSS y su propio texto en
   5 idiomas (toma el idioma de <html lang="...">). Llama al Worker
   POST /luxury-chat (chat abierto, con limite diario por IP y global).
   ========================================================================== */
(function () {
  "use strict";
  var WORKER = "https://ledyvas-license-server.ledyvas.workers.dev";

  var LANG = (document.documentElement.lang || "es").slice(0, 2).toLowerCase();
  var S = {
    es: { button: "Preguntar sobre Luxury", title: "Asistente de Ledyvas Luxury", close: "Cerrar",
      placeholder: "Escriba su pregunta...", send: "Enviar",
      greeting: "Hola. Le puedo explicar qué hace Ledyvas Luxury, la integración con Zoho Books, los formatos DGII 606/607/608 y cómo probarlo. ¿Qué necesita saber?",
      error: "No se pudo responder en este momento. Escríbanos a info@ledyvas.com.",
      disclaimer: "Asistente de IA. No da precios ni asesoramiento fiscal — para eso, info@ledyvas.com." },
    en: { button: "Ask about Luxury", title: "Ledyvas Luxury assistant", close: "Close",
      placeholder: "Type your question...", send: "Send",
      greeting: "Hi. I can explain what Ledyvas Luxury does, the Zoho Books integration, the DGII 606/607/608 formats, and how to try it. What would you like to know?",
      error: "Couldn't answer right now. Write to us at info@ledyvas.com.",
      disclaimer: "AI assistant. No pricing or tax advice — for that, info@ledyvas.com." },
    it: { button: "Chiedi su Luxury", title: "Assistente Ledyvas Luxury", close: "Chiudi",
      placeholder: "Scrivi la tua domanda...", send: "Invia",
      greeting: "Ciao. Posso spiegarti cosa fa Ledyvas Luxury, l'integrazione con Zoho Books, i formati DGII 606/607/608 e come provarlo. Cosa vuoi sapere?",
      error: "Non è stato possibile rispondere ora. Scrivici a info@ledyvas.com.",
      disclaimer: "Assistente IA. Nessun prezzo né consulenza fiscale — per questo, info@ledyvas.com." },
    fr: { button: "Questions sur Luxury", title: "Assistant Ledyvas Luxury", close: "Fermer",
      placeholder: "Écrivez votre question...", send: "Envoyer",
      greeting: "Bonjour. Je peux expliquer ce que fait Ledyvas Luxury, l'intégration avec Zoho Books, les formats DGII 606/607/608 et comment l'essayer. Que souhaitez-vous savoir ?",
      error: "Impossible de répondre pour le moment. Écrivez-nous à info@ledyvas.com.",
      disclaimer: "Assistant IA. Pas de prix ni de conseil fiscal — pour cela, info@ledyvas.com." },
    pt: { button: "Perguntar sobre Luxury", title: "Assistente Ledyvas Luxury", close: "Fechar",
      placeholder: "Escreva a sua pergunta...", send: "Enviar",
      greeting: "Olá. Posso explicar o que o Ledyvas Luxury faz, a integração com o Zoho Books, os formatos DGII 606/607/608 e como testá-lo. O que gostaria de saber?",
      error: "Não foi possível responder agora. Escreva para info@ledyvas.com.",
      disclaimer: "Assistente de IA. Sem preços nem aconselhamento fiscal — para isso, info@ledyvas.com." }
  };
  var T = S[LANG] || S.es;

  // --- CSS propio ---
  var css = document.createElement("style");
  css.textContent = [
    ".lxc-root{position:fixed;right:18px;bottom:18px;z-index:80;font-family:var(--font-sans,system-ui,sans-serif)}",
    ".lxc-fab{display:inline-flex;align-items:center;gap:8px;background:var(--royal,#1e4faf);color:#fff;border:none;cursor:pointer;font:inherit;font-size:13.5px;font-weight:600;padding:11px 16px;border-radius:999px;box-shadow:0 6px 24px rgba(15,31,58,.18)}",
    ".lxc-fab:hover{background:var(--navy,#0b1f3a)}",
    ".lxc-panel{position:absolute;right:0;bottom:54px;width:min(370px,calc(100vw - 36px));background:#fff;border:1px solid var(--gray-200,#e5e7eb);border-radius:14px;box-shadow:0 12px 40px rgba(15,31,58,.22);display:none;flex-direction:column;overflow:hidden}",
    ".lxc-root.lxc-open .lxc-panel{display:flex}",
    ".lxc-head{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;background:var(--navy,#0b1f3a);color:#fff}",
    ".lxc-title{font-size:13.5px;font-weight:600}",
    ".lxc-close{background:none;border:none;color:rgba(255,255,255,.8);font-size:22px;line-height:1;cursor:pointer;padding:0 4px}",
    ".lxc-close:hover{color:#fff}",
    ".lxc-log{padding:14px;display:flex;flex-direction:column;gap:10px;height:350px;overflow-y:auto;background:var(--gray-50,#f9fafb)}",
    ".lxc-msg{font-size:13.5px;line-height:1.55;padding:9px 12px;border-radius:12px;max-width:88%;white-space:pre-wrap;word-wrap:break-word}",
    ".lxc-user{align-self:flex-end;background:var(--royal,#1e4faf);color:#fff;border-bottom-right-radius:4px}",
    ".lxc-bot{align-self:flex-start;background:#fff;border:1px solid var(--gray-200,#e5e7eb);color:var(--gray-900,#111827);border-bottom-left-radius:4px}",
    ".lxc-form{display:flex;gap:8px;padding:10px;border-top:1px solid var(--gray-200,#e5e7eb)}",
    ".lxc-input{flex:1;font:inherit;font-size:13.5px;padding:9px 11px;border:1px solid var(--gray-300,#d1d5db);border-radius:8px}",
    ".lxc-input:focus{outline:2px solid rgba(30,79,175,.4);border-color:var(--royal,#1e4faf)}",
    ".lxc-send{font:inherit;font-size:13px;font-weight:600;padding:8px 14px;border-radius:8px;border:none;background:var(--royal,#1e4faf);color:#fff;cursor:pointer}",
    ".lxc-send:hover{background:var(--navy,#0b1f3a)}",
    ".lxc-send:disabled{opacity:.5;cursor:default}",
    ".lxc-disclaimer{margin:0;padding:0 12px 12px;font-size:11px;color:var(--gray-500,#6b7280);background:#fff}",
    "@media (max-width:640px){.lxc-root{right:12px;bottom:12px}.lxc-fab-label{display:none}.lxc-fab{padding:12px}}"
  ].join("");
  document.head.appendChild(css);

  var history = [];
  var busy = false;

  var root = document.createElement("div");
  root.className = "lxc-root";
  root.innerHTML =
    '<button class="lxc-fab" type="button" aria-expanded="false">' +
      '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 3C6.5 3 2 6.6 2 11c0 2.5 1.4 4.7 3.6 6.2L5 21l4.2-2.1c.9.2 1.8.3 2.8.3 5.5 0 10-3.6 10-8s-4.5-8-10-8z"/></svg>' +
      '<span class="lxc-fab-label"></span>' +
    '</button>' +
    '<div class="lxc-panel">' +
      '<div class="lxc-head"><span class="lxc-title"></span><button class="lxc-close" type="button" aria-label="">&times;</button></div>' +
      '<div class="lxc-log" role="log" aria-live="polite"></div>' +
      '<form class="lxc-form"><input class="lxc-input" type="text" autocomplete="off"><button class="lxc-send" type="submit"></button></form>' +
      '<p class="lxc-disclaimer"></p>' +
    '</div>';
  document.body.appendChild(root);

  var fab = root.querySelector(".lxc-fab");
  var panel = root.querySelector(".lxc-panel");
  var log = root.querySelector(".lxc-log");
  var form = root.querySelector(".lxc-form");
  var input = root.querySelector(".lxc-input");
  var sendBtn = root.querySelector(".lxc-send");

  root.querySelector(".lxc-fab-label").textContent = T.button;
  root.querySelector(".lxc-title").textContent = T.title;
  root.querySelector(".lxc-close").setAttribute("aria-label", T.close);
  input.placeholder = T.placeholder;
  sendBtn.textContent = T.send;
  root.querySelector(".lxc-disclaimer").textContent = T.disclaimer;

  function addMsg(role, text) {
    var el = document.createElement("div");
    el.className = "lxc-msg lxc-" + role;
    el.textContent = text;
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return el;
  }

  var opened = false;
  function openPanel() {
    root.classList.add("lxc-open");
    fab.setAttribute("aria-expanded", "true");
    if (!opened) { opened = true; addMsg("bot", T.greeting); }
    setTimeout(function () { input.focus(); }, 50);
  }
  function closePanel() {
    root.classList.remove("lxc-open");
    fab.setAttribute("aria-expanded", "false");
  }

  fab.addEventListener("click", function () {
    root.classList.contains("lxc-open") ? closePanel() : openPanel();
  });
  root.querySelector(".lxc-close").addEventListener("click", closePanel);

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event("submit", { cancelable: true }));
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (busy) return;
    var q = input.value.trim();
    if (!q) return;
    input.value = "";
    addMsg("user", q);
    history.push({ role: "user", text: q });

    busy = true;
    sendBtn.disabled = true;
    var typing = addMsg("bot", "…");

    fetch(WORKER + "/luxury-chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: q, history: history.slice(0, -1) })
    })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        var reply = (j && j.ok && j.reply) ? j.reply : T.error;
        typing.textContent = reply;
        log.scrollTop = log.scrollHeight;
        if (j && j.ok && j.reply) history.push({ role: "assistant", text: j.reply });
      })
      .catch(function () { typing.textContent = T.error; })
      .then(function () { busy = false; sendBtn.disabled = false; input.focus(); });
  });
})();
