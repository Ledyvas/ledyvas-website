/* ==========================================================================
   LEDYVAS — Chat del programa de socios (distribuidores.html)
   Widget flotante que responde preguntas sobre el programa vía el Worker
   (POST /socios-chat). 5 idiomas (usa window.DistI18n). Autocontenido.
   ========================================================================== */
(function () {
  "use strict";
  var T = window.DistI18n;
  if (!T) return;
  var WORKER = "https://ledyvas-license-server.ledyvas.workers.dev";

  var history = [];   // {role, text}
  var busy = false;

  var root = document.createElement("div");
  root.className = "sc-root";
  root.innerHTML =
    '<button class="sc-fab" type="button" aria-expanded="false">' +
      '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 3C6.5 3 2 6.6 2 11c0 2.5 1.4 4.7 3.6 6.2L5 21l4.2-2.1c.9.2 1.8.3 2.8.3 5.5 0 10-3.6 10-8s-4.5-8-10-8z"/></svg>' +
      '<span class="sc-fab-label"></span>' +
    '</button>' +
    '<div class="sc-panel">' +
      '<div class="sc-head">' +
        '<span class="sc-title"></span>' +
        '<button class="sc-close" type="button" aria-label="">&times;</button>' +
      '</div>' +
      '<div class="sc-log" role="log" aria-live="polite"></div>' +
      '<form class="sc-form">' +
        '<input class="sc-input" type="text" autocomplete="off">' +
        '<button class="sc-send" type="submit"></button>' +
      '</form>' +
      '<p class="sc-disclaimer"></p>' +
    '</div>';
  document.body.appendChild(root);

  var fab = root.querySelector(".sc-fab");
  var fabLabel = root.querySelector(".sc-fab-label");
  var panel = root.querySelector(".sc-panel");
  var log = root.querySelector(".sc-log");
  var form = root.querySelector(".sc-form");
  var input = root.querySelector(".sc-input");
  var sendBtn = root.querySelector(".sc-send");

  function applyI18n() {
    fabLabel.textContent = T.t("chat.button");
    root.querySelector(".sc-title").textContent = T.t("chat.title");
    root.querySelector(".sc-close").setAttribute("aria-label", T.t("chat.close"));
    input.placeholder = T.t("chat.placeholder");
    sendBtn.textContent = T.t("chat.send");
    root.querySelector(".sc-disclaimer").textContent = T.t("chat.disclaimer");
  }

  function addMsg(role, text) {
    var el = document.createElement("div");
    el.className = "sc-msg sc-" + role;
    el.textContent = text;
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return el;
  }

  var opened = false;
  function openPanel() {
    root.classList.add("sc-open");
    fab.setAttribute("aria-expanded", "true");
    if (!opened) {
      opened = true;
      addMsg("bot", T.t("chat.greeting"));
    }
    setTimeout(function () { input.focus(); }, 50);
  }
  function closePanel() {
    root.classList.remove("sc-open");
    fab.setAttribute("aria-expanded", "false");
  }

  fab.addEventListener("click", function () {
    root.classList.contains("sc-open") ? closePanel() : openPanel();
  });
  root.querySelector(".sc-close").addEventListener("click", closePanel);

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event("submit", { cancelable: true })); }
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

    fetch(WORKER + "/socios-chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: q, history: history.slice(0, -1) })
    })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        var reply = (j && j.ok && j.reply) ? j.reply : T.t("chat.error");
        typing.textContent = reply;
        log.scrollTop = log.scrollHeight;
        if (j && j.ok && j.reply) history.push({ role: "assistant", text: j.reply });
      })
      .catch(function () { typing.textContent = T.t("chat.error"); })
      .then(function () { busy = false; sendBtn.disabled = false; input.focus(); });
  });

  applyI18n();
})();
