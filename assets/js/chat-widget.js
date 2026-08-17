// Widget de chat con IA de soporte de Ledyvas.
// Llama al backend en Cloudflare Workers (ver ledyvas-ai-backend/README.md).
// La URL de abajo se completa recién cuando el backend esté publicado --
// hasta entonces este archivo no se incluye en ninguna página real.
(function () {
  const CHAT_API_URL = "https://carnival-series-modules-poker.trycloudflare.com/chat";

  if (!CHAT_API_URL || CHAT_API_URL.indexOf("REEMPLAZAR") === 0) {
    console.warn("Ledyvas chat widget: falta configurar CHAT_API_URL en chat-widget.js");
  }

  const history = [];

  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach((key) => {
        if (key === "class") node.className = attrs[key];
        else if (key === "text") node.textContent = attrs[key];
        else node.setAttribute(key, attrs[key]);
      });
    }
    (children || []).forEach((child) => node.appendChild(child));
    return node;
  }

  function buildWidget() {
    const bubble = el("button", { class: "ledyvas-chat-bubble", type: "button", "aria-label": "Abrir chat de soporte" });
    bubble.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>';

    const panel = el("div", { class: "ledyvas-chat-panel" });
    panel.style.display = "none";

    const headerTitle = el("div", { class: "ledyvas-chat-title" });
    headerTitle.innerHTML = '<strong>Soporte Ledyvas</strong><span>Respuesta al instante · IA</span>';
    const closeBtn = el("button", { class: "ledyvas-chat-close", type: "button", "aria-label": "Cerrar chat", text: "×" });
    const header = el("div", { class: "ledyvas-chat-header" }, [headerTitle, closeBtn]);

    const messagesBox = el("div", { class: "ledyvas-chat-messages" });
    appendMessage(messagesBox, "assistant", "Hola, soy el asistente de Ledyvas. Preguntame sobre el software, precios o cómo funciona — si no sé algo, te derivo directo a soporte humano.");

    const form = el("form", { class: "ledyvas-chat-form" });
    const input = el("input", { type: "text", placeholder: "Escribí tu pregunta...", "aria-label": "Mensaje" });
    const sendBtn = el("button", { type: "submit", text: "Enviar" });
    form.appendChild(input);
    form.appendChild(sendBtn);

    panel.appendChild(header);
    panel.appendChild(messagesBox);
    panel.appendChild(form);

    document.body.appendChild(bubble);
    document.body.appendChild(panel);

    bubble.addEventListener("click", () => {
      panel.style.display = panel.style.display === "none" ? "flex" : "none";
      if (panel.style.display === "flex") input.focus();
    });
    closeBtn.addEventListener("click", () => {
      panel.style.display = "none";
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      appendMessage(messagesBox, "user", text);
      input.value = "";
      input.disabled = true;
      sendBtn.disabled = true;
      const typingNode = appendMessage(messagesBox, "assistant", "Escribiendo...");
      typingNode.classList.add("ledyvas-chat-typing");

      try {
        const reply = await sendMessage(text);
        typingNode.remove();
        appendMessage(messagesBox, "assistant", reply);
        history.push({ role: "user", content: text });
        history.push({ role: "assistant", content: reply });
      } catch (err) {
        typingNode.remove();
        appendMessage(messagesBox, "assistant", "No pude conectarme en este momento. Escribinos directo a info@ledyvas.com.");
      } finally {
        input.disabled = false;
        sendBtn.disabled = false;
        input.focus();
      }
    });
  }

  function appendMessage(container, role, text) {
    const node = el("div", { class: "ledyvas-chat-msg ledyvas-chat-msg-" + role, text });
    container.appendChild(node);
    container.scrollTop = container.scrollHeight;
    return node;
  }

  async function sendMessage(message) {
    const response = await fetch(CHAT_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
    });
    if (!response.ok) throw new Error("HTTP " + response.status);
    const data = await response.json();
    return data.reply || "No pude generar una respuesta. Escribinos a info@ledyvas.com.";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildWidget);
  } else {
    buildWidget();
  }
})();
