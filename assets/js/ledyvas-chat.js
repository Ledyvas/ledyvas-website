/* ==========================================================================
   LEDYVAS — Asistente web (paginas Software y Metrica, 6 idiomas)
   Widget flotante autocontenido: inyecta su propio CSS y su propio texto en
   6 idiomas (toma el idioma de <html lang="...">). Llama al Worker POST /web-chat
   (handleWebChat en ledyvas-license-server/worker.js).
   ========================================================================== */
(function () {
  "use strict";
  var WORKER = "https://ledyvas-license-server.ledyvas.workers.dev";

  var LANG = (document.documentElement.lang || "es").slice(0, 2).toLowerCase();
  var S = {
    es: { button: "Preguntar a Ledyvas", title: "Asistente de Ledyvas", close: "Cerrar",
      placeholder: "Escriba su pregunta...", send: "Enviar",
      greeting: "Hola. Le puedo explicar cómo funciona Ledyvas Professional y Ledyvas Métrica, para quién es cada uno, cómo probarlos y cuánto cuestan. ¿Qué necesita saber?",
      error: "No se pudo responder en este momento. Escríbanos a info@ledyvas.com.",
      disclaimer: "Asistente de IA. Puede equivocarse; para dudas puntuales escriba a info@ledyvas.com." },
    en: { button: "Ask Ledyvas", title: "Ledyvas assistant", close: "Close",
      placeholder: "Type your question...", send: "Send",
      greeting: "Hi. I can explain how Ledyvas Professional and Ledyvas Métrica work, who each one is for, how to try them and what they cost. What would you like to know?",
      error: "I couldn't answer right now. Please write to info@ledyvas.com.",
      disclaimer: "AI assistant. It can make mistakes; for specific questions write to info@ledyvas.com." },
    it: { button: "Chiedi a Ledyvas", title: "Assistente Ledyvas", close: "Chiudi",
      placeholder: "Scriva la sua domanda...", send: "Invia",
      greeting: "Buongiorno. Posso spiegarle come funzionano Ledyvas Professional e Ledyvas Métrica, per chi sono, come provarli e quanto costano. Cosa desidera sapere?",
      error: "Al momento non è stato possibile rispondere. Ci scriva a info@ledyvas.com.",
      disclaimer: "Assistente IA. Può sbagliare; per dubbi specifici scriva a info@ledyvas.com." },
    fr: { button: "Poser une question", title: "Assistant Ledyvas", close: "Fermer",
      placeholder: "Écrivez votre question...", send: "Envoyer",
      greeting: "Bonjour. Je peux vous expliquer le fonctionnement de Ledyvas Professional et de Ledyvas Métrica, à qui ils s'adressent, comment les essayer et leur prix. Que souhaitez-vous savoir ?",
      error: "Impossible de répondre pour le moment. Écrivez-nous à info@ledyvas.com.",
      disclaimer: "Assistant IA. Il peut se tromper ; pour une question précise, écrivez à info@ledyvas.com." },
    pt: { button: "Perguntar ao Ledyvas", title: "Assistente Ledyvas", close: "Fechar",
      placeholder: "Escreva a sua pergunta...", send: "Enviar",
      greeting: "Olá. Posso explicar como funcionam o Ledyvas Professional e o Ledyvas Métrica, para quem é cada um, como testá-los e quanto custam. O que gostaria de saber?",
      error: "Não foi possível responder agora. Escreva para info@ledyvas.com.",
      disclaimer: "Assistente de IA. Pode errar; para dúvidas específicas escreva para info@ledyvas.com." },
    ar: { button: "اسأل Ledyvas", title: "مساعد Ledyvas", close: "إغلاق",
      placeholder: "اكتب سؤالك...", send: "إرسال",
      greeting: "مرحبًا. يمكنني أن أشرح لك كيف يعمل Ledyvas Professional وLedyvas Métrica، ولمن يناسب كل منهما، وكيفية تجربتهما وسعرهما. ماذا تود أن تعرف؟",
      error: "تعذّر الرد الآن. راسلنا على info@ledyvas.com.",
      disclaimer: "مساعد بالذكاء الاصطناعي. قد يخطئ؛ للاستفسارات المحددة راسل info@ledyvas.com." }
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

    fetch(WORKER + "/web-chat", {
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
