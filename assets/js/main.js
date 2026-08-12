// LEDYVAS — interacciones del sitio

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

  // Selector de idioma (visual — el sitio es solo español por ahora)
  document.querySelectorAll('.lang-switch button').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lang-switch button').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Selector de idioma — escritorio (dropdown en el header)
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

  // Formulario de contacto (sin backend todavía — feedback visual)
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = document.querySelector('.form-success');
      form.style.display = 'none';
      if (success) success.classList.add('show');
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
