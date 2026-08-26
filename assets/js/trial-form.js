// LEDYVAS — formulario de "Solicitar prueba gratis" (descargas.html y sus
// 4 traducciones). Llama al Cloudflare Worker del servidor de licencias,
// que emite el código de activación y lo manda por correo (Zoho Mail SMTP).

(function () {
  const WORKER_URL = "https://ledyvas-license-server.ledyvas.workers.dev/trial/request";

  const TEXT = {
    es: {
      invalid_email: "Ese email no parece válido — revisalo e intentá de nuevo.",
      email_not_configured: "El envío de correos todavía no está activo. Escribinos a info@ledyvas.com y te mandamos el código a mano.",
      email_send_failed: "No pudimos enviar el correo. Probá de nuevo en un momento, o escribinos a info@ledyvas.com.",
      generic: "Algo salió mal. Probá de nuevo en un momento.",
      downloadNow: "Descargar ahora"
    },
    it: {
      invalid_email: "Quell'email non sembra valida — controllala e riprova.",
      email_not_configured: "L'invio di email non è ancora attivo. Scrivici a info@ledyvas.com e ti mandiamo il codice a mano.",
      email_send_failed: "Non siamo riusciti a inviare l'email. Riprova tra un momento, oppure scrivici a info@ledyvas.com.",
      generic: "Qualcosa è andato storto. Riprova tra un momento.",
      downloadNow: "Scarica ora"
    },
    en: {
      invalid_email: "That email doesn't look valid — check it and try again.",
      email_not_configured: "Sending emails isn't active yet. Write to us at info@ledyvas.com and we'll send you the code by hand.",
      email_send_failed: "We couldn't send the email. Try again in a moment, or write to info@ledyvas.com.",
      generic: "Something went wrong. Try again in a moment.",
      downloadNow: "Download now"
    },
    fr: {
      invalid_email: "Cet email ne semble pas valide — vérifiez-le et réessayez.",
      email_not_configured: "L'envoi d'emails n'est pas encore actif. Écrivez-nous à info@ledyvas.com et on vous envoie le code à la main.",
      email_send_failed: "Nous n'avons pas pu envoyer l'email. Réessayez dans un instant, ou écrivez-nous à info@ledyvas.com.",
      generic: "Quelque chose s'est mal passé. Réessayez dans un instant.",
      downloadNow: "Télécharger maintenant"
    },
    pt: {
      invalid_email: "Esse email não parece válido — confira e tente de novo.",
      email_not_configured: "O envio de emails ainda não está ativo. Escreva para info@ledyvas.com e mandamos o código manualmente.",
      email_send_failed: "Não conseguimos enviar o email. Tente de novo em instantes, ou escreva para info@ledyvas.com.",
      generic: "Algo deu errado. Tente de novo em instantes.",
      downloadNow: "Baixar agora"
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("trial-modal-overlay");
    if (!overlay) return;

    const modal = overlay.querySelector(".trial-modal");
    const form = document.getElementById("trial-form");
    const errorBox = document.getElementById("trial-form-error");
    const successBox = document.getElementById("trial-form-success");
    const successDownloadLink = document.getElementById("trial-form-download-link");
    const submitButton = form.querySelector('button[type="submit"]');

    const lang = (document.documentElement.getAttribute("lang") || "es").slice(0, 2).toLowerCase();
    const t = TEXT[lang] || TEXT.es;

    function openModal() {
      overlay.classList.add("show");
      form.classList.remove("hide");
      successBox.classList.remove("show");
      errorBox.classList.remove("show");
      document.body.style.overflow = "hidden";
      const firstField = form.querySelector("input");
      if (firstField) firstField.focus();
    }

    function closeModal() {
      overlay.classList.remove("show");
      document.body.style.overflow = "";
    }

    document.querySelectorAll("[data-open-trial-form]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openModal();
      });
    });

    overlay.querySelectorAll(".trial-modal-close").forEach((btn) => {
      btn.addEventListener("click", closeModal);
    });

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("show")) closeModal();
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      errorBox.classList.remove("show");
      errorBox.textContent = "";

      const name = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const company = form.querySelector('[name="company"]').value.trim();

      submitButton.disabled = true;
      submitButton.dataset.originalText = submitButton.dataset.originalText || submitButton.textContent;
      submitButton.textContent = "...";

      try {
        const response = await fetch(WORKER_URL, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ name, email, company, lang })
        });
        const data = await response.json().catch(() => ({ ok: false, error: "generic" }));

        if (data.ok) {
          form.classList.add("hide");
          successBox.classList.add("show");
          if (data.downloadUrl && successDownloadLink) {
            successDownloadLink.href = data.downloadUrl;
            successDownloadLink.textContent = t.downloadNow;
            successDownloadLink.style.display = "";
          } else if (successDownloadLink) {
            successDownloadLink.style.display = "none";
          }
        } else {
          errorBox.textContent = t[data.error] || t.generic;
          errorBox.classList.add("show");
        }
      } catch (err) {
        errorBox.textContent = t.generic;
        errorBox.classList.add("show");
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = submitButton.dataset.originalText;
      }
    });
  });
})();
