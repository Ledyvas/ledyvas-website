// LEDYVAS — interacciones del sitio

document.addEventListener('DOMContentLoaded', () => {
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
