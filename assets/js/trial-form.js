// LEDYVAS — formulario de "Solicitar prueba gratis". Se usa en descargas.html
// y sus 4 traducciones (en/download.html, it/download.html,
// fr/telechargements.html, pt/downloads.html). Llama al Cloudflare Worker del
// servidor de licencias, que emite el código de activación y lo manda por
// correo. Si la página no trae el modal en el HTML, este script lo inyecta
// (con textos según el idioma del <html lang>).

(function () {
  const WORKER_URL = "https://ledyvas-license-server.ledyvas.workers.dev/trial/request";

  const TEXT = {
    es: {
      invalid_email: "Ese email no parece válido — revisalo e intentá de nuevo.",
      email_not_configured: "El envío de correos todavía no está activo. Escribinos a info@ledyvas.com y te mandamos el código a mano.",
      email_send_failed: "No pudimos enviar el correo. Probá de nuevo en un momento, o escribinos a info@ledyvas.com.",
      generic: "Algo salió mal. Probá de nuevo en un momento.",
      downloadNow: "Descargar ahora",
      modalTitle: "Solicitá tu prueba gratuita",
      modalLede: "Te mandamos el instalador y tu código de activación por correo — sin costo, 14 días de acceso completo.",
      fieldName: "Nombre",
      namePlaceholder: "Tu nombre",
      fieldEmail: "Email",
      submit: "Enviarme el código",
      formNote: "Vas a recibir un email con el link de descarga y el código de activación.",
      successTitle: "¡Listo! Revisá tu correo",
      successText: "Te mandamos el instalador y tu código de activación. Si no lo ves en unos minutos, revisá spam.",
      closeAria: "Cerrar"
    },
    it: {
      invalid_email: "Quell'email non sembra valida — controllala e riprova.",
      email_not_configured: "L'invio di email non è ancora attivo. Scrivici a info@ledyvas.com e ti mandiamo il codice a mano.",
      email_send_failed: "Non siamo riusciti a inviare l'email. Riprova tra un momento, oppure scrivici a info@ledyvas.com.",
      generic: "Qualcosa è andato storto. Riprova tra un momento.",
      downloadNow: "Scarica ora",
      modalTitle: "Richiedi la tua prova gratuita",
      modalLede: "Ti mandiamo l'installer e il tuo codice di attivazione via email — senza costi, 14 giorni di accesso completo.",
      fieldName: "Nome",
      namePlaceholder: "Il tuo nome",
      fieldEmail: "Email",
      submit: "Inviami il codice",
      formNote: "Riceverai un'email con il link di download e il codice di attivazione.",
      successTitle: "Fatto! Controlla la tua email",
      successText: "Ti abbiamo mandato l'installer e il tuo codice di attivazione. Se non lo vedi tra qualche minuto, controlla lo spam.",
      closeAria: "Chiudi"
    },
    en: {
      invalid_email: "That email doesn't look valid — check it and try again.",
      email_not_configured: "Sending emails isn't active yet. Write to us at info@ledyvas.com and we'll send you the code by hand.",
      email_send_failed: "We couldn't send the email. Try again in a moment, or write to info@ledyvas.com.",
      generic: "Something went wrong. Try again in a moment.",
      downloadNow: "Download now",
      modalTitle: "Request your free trial",
      modalLede: "We'll email you the installer and your activation code — free, 14 days of full access.",
      fieldName: "Name",
      namePlaceholder: "Your name",
      fieldEmail: "Email",
      submit: "Send me the code",
      formNote: "You'll get an email with the download link and the activation code.",
      successTitle: "Done! Check your email",
      successText: "We sent you the installer and your activation code. If you don't see it in a few minutes, check your spam folder.",
      closeAria: "Close"
    },
    fr: {
      invalid_email: "Cet email ne semble pas valide — vérifiez-le et réessayez.",
      email_not_configured: "L'envoi d'emails n'est pas encore actif. Écrivez-nous à info@ledyvas.com et on vous envoie le code à la main.",
      email_send_failed: "Nous n'avons pas pu envoyer l'email. Réessayez dans un instant, ou écrivez-nous à info@ledyvas.com.",
      generic: "Quelque chose s'est mal passé. Réessayez dans un instant.",
      downloadNow: "Télécharger maintenant",
      modalTitle: "Demandez votre essai gratuit",
      modalLede: "Nous vous envoyons l'installateur et votre code d'activation par email — gratuit, 14 jours d'accès complet.",
      fieldName: "Nom",
      namePlaceholder: "Votre nom",
      fieldEmail: "Email",
      submit: "Envoyez-moi le code",
      formNote: "Vous recevrez un email avec le lien de téléchargement et le code d'activation.",
      successTitle: "C'est fait ! Vérifiez votre email",
      successText: "Nous vous avons envoyé l'installateur et votre code d'activation. Si vous ne le voyez pas d'ici quelques minutes, vérifiez vos spams.",
      closeAria: "Fermer"
    },
    pt: {
      invalid_email: "Esse email não parece válido — confira e tente de novo.",
      email_not_configured: "O envio de emails ainda não está ativo. Escreva para info@ledyvas.com e mandamos o código manualmente.",
      email_send_failed: "Não conseguimos enviar o email. Tente de novo em instantes, ou escreva para info@ledyvas.com.",
      generic: "Algo deu errado. Tente de novo em instantes.",
      downloadNow: "Baixar agora",
      modalTitle: "Solicite a sua avaliação gratuita",
      modalLede: "Enviamos o instalador e o seu código de ativação por email — sem custo, 14 dias de acesso completo.",
      fieldName: "Nome",
      namePlaceholder: "O seu nome",
      fieldEmail: "Email",
      submit: "Enviar-me o código",
      formNote: "Vai receber um email com o link de download e o código de ativação.",
      successTitle: "Pronto! Verifique o seu email",
      successText: "Enviámos o instalador e o seu código de ativação. Se não o vir em alguns minutos, verifique o spam.",
      closeAria: "Fechar"
    }
  };

  const ENTERPRISE_BANNER = {
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

  const LUXURY_BANNER = {
    es: {
      html: 'Estás por descargar <b>Ledyvas Luxury</b> — la edición con <b>conector nativo a Zoho Books</b> (sincroniza compras y ventas por la API, sin CSV) y la <b>localización fiscal de República Dominicana</b>: NCF, ITBIS por documento y reportes DGII 606 / 607 / 608. Probala 14 días gratis con tus datos. Después de la prueba se contrata por <b>suscripción</b>.',
      link: "Ver Ledyvas Luxury"
    },
    en: {
      html: 'You are about to download <b>Ledyvas Luxury</b> — the edition with the <b>native Zoho Books connector</b> (syncs purchases and sales through the API, no CSV) and the <b>Dominican Republic fiscal localization</b>: NCF, per-document ITBIS and DGII 606 / 607 / 608 reports. Try it free for 14 days with your own data. After the trial it is offered by <b>subscription</b>.',
      link: "See Ledyvas Luxury"
    },
    it: {
      html: 'Stai per scaricare <b>Ledyvas Luxury</b> — l\'edizione con il <b>connettore nativo a Zoho Books</b> (sincronizza acquisti e vendite via API, senza CSV) e la <b>localizzazione fiscale della Repubblica Dominicana</b>: NCF, ITBIS per documento e report DGII 606 / 607 / 608. Provala 14 giorni gratis con i tuoi dati. Dopo la prova si attiva con <b>abbonamento</b>.',
      link: "Vedi Ledyvas Luxury"
    },
    fr: {
      html: 'Vous êtes sur le point de télécharger <b>Ledyvas Luxury</b> — l\'édition avec le <b>connecteur natif Zoho Books</b> (synchronise achats et ventes via l\'API, sans CSV) et la <b>localisation fiscale de la République dominicaine</b> : NCF, ITBIS par document et rapports DGII 606 / 607 / 608. Essayez-la 14 jours gratuitement avec vos données. Après l\'essai, elle est proposée par <b>abonnement</b>.',
      link: "Voir Ledyvas Luxury"
    },
    pt: {
      html: 'Você está prestes a baixar o <b>Ledyvas Luxury</b> — a edição com o <b>conector nativo ao Zoho Books</b> (sincroniza compras e vendas pela API, sem CSV) e a <b>localização fiscal da República Dominicana</b>: NCF, ITBIS por documento e relatórios DGII 606 / 607 / 608. Experimente 14 dias grátis com os seus dados. Depois da avaliação é contratado por <b>subscrição</b>.',
      link: "Ver o Ledyvas Luxury"
    }
  };

  const LUXURY_PAGE = { es: "/luxury.html", en: "/en/luxury.html", it: "/it/luxury.html", fr: "/fr/luxury.html", pt: "/pt/luxury.html" };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function buildOverlay(t) {
    const wrap = document.createElement("div");
    wrap.className = "trial-modal-overlay";
    wrap.id = "trial-modal-overlay";
    wrap.innerHTML =
      '<div class="trial-modal">' +
        '<button type="button" class="trial-modal-close" aria-label="' + esc(t.closeAria) + '">&times;</button>' +
        '<form id="trial-form" class="trial-modal-form">' +
          '<h3>' + esc(t.modalTitle) + '</h3>' +
          '<p class="trial-modal-lede">' + esc(t.modalLede) + '</p>' +
          '<div class="trial-modal-error" id="trial-form-error"></div>' +
          '<div class="field"><label for="trial-name">' + esc(t.fieldName) + '</label>' +
            '<input id="trial-name" name="name" type="text" placeholder="' + esc(t.namePlaceholder) + '" required></div>' +
          '<div class="field"><label for="trial-email">' + esc(t.fieldEmail) + '</label>' +
            '<input id="trial-email" name="email" type="email" placeholder="tu@empresa.com" required></div>' +
          '<div class="honeypot-field" aria-hidden="true"><label for="trial-company">No completar</label>' +
            '<input id="trial-company" name="company" type="text" tabindex="-1" autocomplete="off"></div>' +
          '<button type="submit" class="btn btn-primary btn-lg">' + esc(t.submit) + '</button>' +
          '<p class="form-note">' + esc(t.formNote) + '</p>' +
        '</form>' +
        '<div class="trial-modal-success" id="trial-form-success">' +
          '<div class="icon-circle" style="margin-left:auto;margin-right:auto;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>' +
          '<h3>' + esc(t.successTitle) + '</h3>' +
          '<p>' + esc(t.successText) + '</p>' +
          '<a href="#" id="trial-form-download-link" class="btn btn-gold btn-lg" target="_blank" rel="noopener" style="display:none;"></a>' +
        '</div>' +
      '</div>';
    document.body.appendChild(wrap);
    return wrap;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const lang = (document.documentElement.getAttribute("lang") || "es").slice(0, 2).toLowerCase();
    const t = TEXT[lang] || TEXT.es;

    let overlay = document.getElementById("trial-modal-overlay");
    if (!overlay) overlay = buildOverlay(t);

    const form = document.getElementById("trial-form");
    if (!form) return;
    const errorBox = document.getElementById("trial-form-error");
    const successBox = document.getElementById("trial-form-success");
    const successDownloadLink = document.getElementById("trial-form-download-link");
    const submitButton = form.querySelector('button[type="submit"]');

    // ?edition=enterprise -> build de Ledyvas Enterprise (con "Exportar a Contabilidad").
    // ?edition=luxury     -> build de Ledyvas Luxury (conector Zoho nativo + DGII).
    // Se llega así desde distribuidores.html / luxury.html. Cualquier otra cosa -> "pro".
    const rawEd = new URLSearchParams(location.search).get("edition");
    const edition = (rawEd === "enterprise" || rawEd === "luxury") ? rawEd : "pro";

    // Esta página es la de la versión pública "Pro" y muestra precios de pago
    // único que NO aplican a un trial de Enterprise/Luxury: banner + ocultar tarjetas.
    if (edition === "enterprise" || edition === "luxury") applyEditionUI(edition, lang);

    function applyEditionUI(ed, lg) {
      const isLux = ed === "luxury";
      const c = (isLux ? LUXURY_BANNER : ENTERPRISE_BANNER)[lg] || (isLux ? LUXURY_BANNER : ENTERPRISE_BANNER).es;
      const target = isLux ? ((LUXURY_PAGE[lg] || LUXURY_PAGE.es)) : ("/distribuidores.html?lang=" + lg);
      const main = document.querySelector("main");
      if (main && !document.getElementById("edition-banner")) {
        const box = document.createElement("div");
        box.id = "edition-banner";
        box.style.cssText = "background:#0B1F3A;color:#fff;padding:16px 20px;font-size:14.5px;line-height:1.55;text-align:center;";
        box.innerHTML = '<div style="max-width:820px;margin:0 auto;">' + c.html +
          ' &nbsp;<a href="' + target + '" style="color:#C89B3C;font-weight:600;white-space:nowrap;">' + c.link + ' →</a></div>';
        main.insertBefore(box, main.firstChild);
      }
      document.querySelectorAll("main .card").forEach(function (card) {
        if (/\b(750|1[.\s]?850|1850|749)\b/.test(card.textContent) || /\bUSD\b/.test(card.textContent) || /€\s?749/.test(card.textContent)) {
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
