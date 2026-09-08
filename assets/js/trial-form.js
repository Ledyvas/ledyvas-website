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

    // ?edition=enterprise -> el Worker manda el build de Ledyvas Enterprise
    // (con "Exportar a Contabilidad"). Se llega así desde distribuidores.html.
    const edition = new URLSearchParams(location.search).get("edition") === "enterprise" ? "enterprise" : "pro";

    // Cuando se llega como trial de Enterprise, esta página (que es la de la
    // versión pública "Pro") muestra precios de pago único que NO aplican.
    // Ajustamos la copia: banner explicativo + ocultar las tarjetas de precio Pro.
    if (edition === "enterprise") applyEnterpriseUI(lang);

    function applyEnterpriseUI(lg) {
      const B = {
        es: {
          html: 'Estás por descargar <b>Ledyvas Enterprise</b> — la versión con <b>Exportar a Contabilidad</b> (QuickBooks, Alegra, Zoho Books, Odoo, Xero). Probala 14 días gratis con tus datos. Después de la prueba se contrata por <b>suscripción mensual</b>, únicamente a través de un Distribuidor Oficial.',
          link: "Ver el Programa de Distribución"
        },
        en: {
          html: 'You are about to download <b>Ledyvas Enterprise</b> — the version with <b>Export to Accounting</b> (QuickBooks, Alegra, Zoho Books, Odoo, Xero). Try it free for 14 days with your own data. After the trial it is offered by <b>monthly subscription</b>, only through an Official Distributor.',
          link: "See the Distribution Program"
        },
        it: {
          html: 'Stai per scaricare <b>Ledyvas Enterprise</b> — la versione con <b>Esporta in Contabilità</b> (QuickBooks, Alegra, Zoho Books, Odoo, Xero). Provala 14 giorni gratis con i tuoi dati. Dopo la prova si attiva con <b>abbonamento mensile</b>, solo tramite un Distributore Ufficiale.',
          link: "Vedi il Programma di Distribuzione"
        },
        fr: {
          html: 'Vous êtes sur le point de télécharger <b>Ledyvas Enterprise</b> — la version avec <b>Exporter vers la comptabilité</b> (QuickBooks, Alegra, Zoho Books, Odoo, Xero). Essayez-la 14 jours gratuitement avec vos données. Après l\'essai, elle est proposée par <b>abonnement mensuel</b>, uniquement via un Distributeur Officiel.',
          link: "Voir le Programme de Distribution"
        },
        pt: {
          html: 'Você está prestes a baixar o <b>Ledyvas Enterprise</b> — a versão com <b>Exportar para Contabilidade</b> (QuickBooks, Alegra, Zoho Books, Odoo, Xero). Experimente 14 dias grátis com os seus dados. Depois da avaliação é contratado por <b>subscrição mensal</b>, apenas através de um Distribuidor Oficial.',
          link: "Ver o Programa de Distribuição"
        }
      };
      const c = B[lg] || B.es;
      const main = document.querySelector("main");
      if (main && !document.getElementById("edition-enterprise-banner")) {
        const box = document.createElement("div");
        box.id = "edition-enterprise-banner";
        box.style.cssText = "background:#0B1F3A;color:#fff;padding:16px 20px;font-size:14.5px;line-height:1.55;text-align:center;";
        box.innerHTML = '<div style="max-width:820px;margin:0 auto;">' + c.html +
          ' &nbsp;<a href="/distribuidores.html?lang=' + lg + '" style="color:#C89B3C;font-weight:600;white-space:nowrap;">' + c.link + ' →</a></div>';
        main.insertBefore(box, main.firstChild);
      }
      // ocultar las tarjetas que mencionan el precio de pago único de Pro (750 / 1850 USD)
      document.querySelectorAll("main .card").forEach(function (card) {
        if (/\b(750|1[.\s]?850|1850)\b/.test(card.textContent) || /\bUSD\b/.test(card.textContent)) {
          card.style.display = "none";
        }
      });
    }

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
          body: JSON.stringify({ name, email, company, lang, edition })
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
