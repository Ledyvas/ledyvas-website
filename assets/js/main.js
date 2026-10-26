// LEDYVAS, interacciones del sitio

document.addEventListener('DOMContentLoaded', () => {
  // Banner de consentimiento de cookies (GDPR / Consent Mode v2).
  // El default "denied" ya se fija en el <head> de cada página, antes de
  // que gtag.js cargue -- esto solo maneja la UI y el "update" del consent
  // real según lo que elija el visitante.
  const cookieBanner = document.getElementById('cookie-consent-banner');
  const cookieAccept = document.getElementById('cookie-consent-accept');
  const cookieReject = document.getElementById('cookie-consent-reject');
  const COOKIE_CONSENT_KEY = 'ledyvas-cookie-consent';

  if (cookieBanner && cookieAccept && cookieReject) {
    const existingChoice = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (existingChoice !== 'accepted' && existingChoice !== 'rejected') {
      cookieBanner.hidden = false;
    }

    cookieAccept.addEventListener('click', () => {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
      if (typeof gtag === 'function') {
        gtag('consent', 'update', { analytics_storage: 'granted' });
      }
      cookieBanner.hidden = true;
    });

    cookieReject.addEventListener('click', () => {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
      if (typeof gtag === 'function') {
        gtag('consent', 'update', { analytics_storage: 'denied' });
      }
      cookieBanner.hidden = true;
    });
  }

  // Menú hamburguesa (header + overlay)
  const toggles = document.querySelectorAll('[data-nav-toggle]');
  const overlay = document.querySelector('.nav-overlay');

  const closeNav = () => document.body.classList.remove('nav-open');
  const toggleNav = () => document.body.classList.toggle('nav-open');

  toggles.forEach((btn) => btn.addEventListener('click', toggleNav));

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeNav();
    });
  }

  // Marca el enlace activo según la página actual (menú hamburguesa y menú horizontal)
  const current = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a[href], .nav-horizontal a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Selector de idioma (visual, el sitio es solo español por ahora)
  document.querySelectorAll('.lang-switch button').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lang-switch button').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Selector de idioma, escritorio (dropdown en el header)
  document.querySelectorAll('.lang-dropdown').forEach((dropdown) => {
    const toggle = dropdown.querySelector('[data-lang-toggle]');
    if (!toggle) return;
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('open');
      document.querySelectorAll('.lang-dropdown.open').forEach((d) => d.classList.remove('open'));
      if (!isOpen) dropdown.classList.add('open');
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.lang-dropdown.open').forEach((d) => d.classList.remove('open'));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.lang-dropdown.open').forEach((d) => d.classList.remove('open'));
    }
  });

  // Acordeón FAQ
  document.querySelectorAll('.faq-item').forEach((item) => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Formulario de contacto (Web3Forms)
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
      }
      let errorEl = form.querySelector('.form-error');
      if (errorEl) errorEl.remove();

      try {
        const formData = new FormData(form);
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData,
        });
        const result = await response.json();
        if (result.success) {
          const success = document.querySelector('.form-success');
          form.style.display = 'none';
          if (success) success.classList.add('show');
        } else {
          throw new Error(result.message || 'Error desconocido');
        }
      } catch (err) {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
        const note = form.querySelector('.form-note');
        const msg = document.createElement('p');
        msg.className = 'form-error';
        msg.style.color = '#c0392b';
        msg.style.fontSize = '13px';
        msg.style.textAlign = 'center';
        msg.style.marginTop = '10px';
        msg.textContent = 'No se pudo enviar el mensaje. Pruebe de nuevo o escríbanos directo a info@ledyvas.com.';
        if (note) note.insertAdjacentElement('afterend', msg);
        else form.appendChild(msg);
      }
    });
  }

  // Sombra de cabecera al hacer scroll
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 8 ? '0 4px 24px rgba(11,31,58,0.06)' : 'none';
    });
  }
});

// Tema claro / oscuro (26/10/2026): botón en el header. Recuerda la elección
// en localStorage (si el navegador lo permite); sin elección, sigue al sistema.
(function () {
  var KEY = 'ledyvas-theme';
  var root = document.documentElement;
  var LABEL = {
    es: 'Cambiar entre tema claro y oscuro', en: 'Switch between light and dark theme',
    fr: 'Basculer entre thème clair et sombre', it: 'Passa dal tema chiaro a quello scuro e viceversa',
    pt: 'Alternar entre tema claro e escuro', ar: 'التبديل بين المظهر الفاتح والداكن'
  };
  function stored() { try { var v = localStorage.getItem(KEY); return v === 'light' || v === 'dark' ? v : null; } catch (e) { return null; } }
  function system() { try { return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; } catch (e) { return 'light'; } }
  function apply(t) { root.setAttribute('data-theme', t); }
  function init() {
    var holder = document.querySelector('header .header-social-links');
    if (!holder) return;
    if (!root.getAttribute('data-theme')) apply(stored() || system());
    if (holder.querySelector('.theme-toggle')) return;
    var lang = (root.lang || 'es').slice(0, 2).toLowerCase();
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-label', LABEL[lang] || LABEL.en);
    btn.title = LABEL[lang] || LABEL.en;
    btn.innerHTML = '<svg class="ic-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>' +
      '<svg class="ic-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
    });
    holder.insertBefore(btn, holder.firstChild);
    try {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (ev) {
        if (!stored()) apply(ev.matches ? 'dark' : 'light');
      });
    } catch (e) {}
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

// Preguntas sugeridas (botones data-ask): abren el asistente y envían la pregunta.
document.addEventListener('click', function (e) {
  var b = e.target && e.target.closest ? e.target.closest('[data-ask]') : null;
  if (!b) return;
  var chat = document.querySelector('.lxc-root');
  if (!chat) return;
  var input = chat.querySelector('.lxc-input');
  var form = chat.querySelector('.lxc-form');
  var fab = chat.querySelector('.lxc-fab');
  if (!chat.classList.contains('lxc-open') && fab) fab.click();
  if (!input || !form) return;
  input.value = b.getAttribute('data-ask') || '';
  setTimeout(function () {
    if (form.requestSubmit) form.requestSubmit();
    else form.dispatchEvent(new Event('submit', { cancelable: true }));
  }, 80);
});
