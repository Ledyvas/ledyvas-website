/*
 * Ledyvas — botón de compra con PayPro Global (ventana de pago sobre la misma página).
 * Para activar un producto: poner su ID de PayPro en PRODUCTS. Mientras esté vacío,
 * el botón sigue como "muy pronto" (desactivado).
 * SECRET_KEY: parámetro de seguridad que da PayPro para abrir el pago dentro de la página.
 * Si está vacío, el pago se abre en una pestaña nueva (funciona igual).
 */
(function () {
  var PRODUCTS = {
    metrica: '138565', // Ledyvas Analytics Métrica, US$ 599
    pro: '138564',     // Ledyvas Professional, venta directa US$ 749
    bundle: '138566'   // Paquete Ledyvas Pro + Métrica, US$ 1,199
  };
  var SUPPORT_ID = '138589'; // Soporte anual de Métrica (US$ 99/año; 12 meses gratis, luego se cobra solo). Va junto a Métrica y al paquete.
  var WITH_SUPPORT = { '138565': 1, '138566': 1 };
  var SECRET_KEY = 'exfo=742'; // parámetro de PayPro (Nika, 29/9/2026) para abrir el pago en ventana sobre la página
  var CHECKOUT = 'https://store.payproglobal.com/checkout';
  var NOT_PARTNER = ['PH30'];

  var lang = (document.documentElement.lang || 'es').slice(0, 2).toLowerCase();
  var TXT = {
    es: { buy: 'Comprar ahora', local: 'y los métodos de pago locales de tu país', close: 'Cerrar' },
    en: { buy: 'Buy now', local: 'and the local payment methods of your country', close: 'Close' },
    it: { buy: 'Acquista ora', local: 'e i metodi di pagamento locali del tuo paese', close: 'Chiudi' },
    fr: { buy: 'Acheter maintenant', local: 'et les moyens de paiement locaux de votre pays', close: 'Fermer' },
    pt: { buy: 'Comprar agora', local: 'e os métodos de pagamento locais do seu país', close: 'Fechar' },
    ar: { buy: 'اشترِ الآن', local: 'وطرق الدفع المحلية في بلدك', close: 'إغلاق' }
  };
  var t = TXT[lang] || TXT.en;

  // Código de Partner: llega en el enlace (?ref=ELE0710) y se recuerda 60 días.
  var KEY = 'ledyvas-ref';
  try {
    var q = new URLSearchParams(location.search);
    var ref = (q.get('ref') || q.get('partner') || q.get('codigo') || '').replace(/[^A-Za-z0-9_-]/g, '').slice(0, 32);
    if (ref) localStorage.setItem(KEY, JSON.stringify({ c: ref.toUpperCase(), until: Date.now() + 60 * 864e5 }));
  } catch (e) {}
  function partnerCode() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (v && v.until > Date.now() && NOT_PARTNER.indexOf(v.c) < 0) return v.c;
    } catch (e) {}
    return '';
  }

  function checkoutUrl(id) {
    var p = ['products[1][id]=' + encodeURIComponent(id), 'language=' + encodeURIComponent(lang), 'currency=USD'];
    if (WITH_SUPPORT[id]) p.push('products[2][id]=' + encodeURIComponent(SUPPORT_ID));
    var code = partnerCode();
    if (code) p.push('coupon-code-to-add=' + encodeURIComponent(code), 'x-partner=' + encodeURIComponent(code));
    if (SECRET_KEY) p.push(SECRET_KEY);
    return CHECKOUT + '?' + p.join('&');
  }

  function injectStyle() {
    if (document.getElementById('pp-style')) return;
    var s = document.createElement('style');
    s.id = 'pp-style';
    s.textContent = '.pp-modal{position:fixed;inset:0;z-index:9999;background:rgba(15,23,42,.72);display:flex;align-items:center;justify-content:center;padding:16px}' +
      '.pp-box{position:relative;width:100%;max-width:980px;height:min(92vh,860px);background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.35)}' +
      '.pp-box iframe{width:100%;height:100%;border:0;display:block}' +
      '.pp-close{position:absolute;top:8px;inset-inline-end:8px;z-index:2;width:36px;height:36px;border-radius:50%;border:0;background:#0f172a;color:#fff;font-size:20px;line-height:36px;cursor:pointer}' +
      '.pp-load{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}' +
      '.pp-load:after{content:"";width:40px;height:40px;border:4px solid #e4e7ec;border-top-color:#C89B3C;border-radius:50%;animation:ppspin 1s linear infinite}' +
      '@keyframes ppspin{to{transform:rotate(360deg)}}' +
      '.pay-methods-local{font-size:12px;color:var(--gray-500,#667085);text-align:center}';
    document.head.appendChild(s);
  }

  function openModal(url) {
    injectStyle();
    var m = document.createElement('div');
    m.className = 'pp-modal';
    m.innerHTML = '<div class="pp-box"><div class="pp-load"></div><button type="button" class="pp-close" aria-label="' + t.close + '">×</button><iframe allow="payment" title="PayPro Global"></iframe></div>';
    var f = m.querySelector('iframe');
    f.addEventListener('load', function () { var l = m.querySelector('.pp-load'); if (l) l.remove(); });
    f.src = url;
    function close() { m.remove(); document.removeEventListener('keydown', esc); document.body.style.overflow = ''; }
    function esc(e) { if (e.key === 'Escape') close(); }
    m.querySelector('.pp-close').addEventListener('click', close);
    m.addEventListener('click', function (e) { if (e.target === m) close(); });
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    document.body.appendChild(m);
  }

  function init() {
    injectStyle();
    [].forEach.call(document.querySelectorAll('.pay-methods-logos'), function (el) {
      if (el.nextElementSibling && el.nextElementSibling.classList.contains('pay-methods-local')) return;
      var n = document.createElement('div');
      n.className = 'pay-methods-local';
      n.textContent = t.local;
      el.parentNode.insertBefore(n, el.nextSibling);
    });
    [].forEach.call(document.querySelectorAll('[data-paypro-product]'), function (btn) {
      var id = PRODUCTS[btn.getAttribute('data-paypro-product')] || '';
      if (!id) return; // sigue "muy pronto"
      btn.disabled = false;
      btn.removeAttribute('disabled');
      if (btn.getAttribute('data-buy-label') !== 'keep') btn.textContent = t.buy + (btn.getAttribute('data-price') ? ' — ' + btn.getAttribute('data-price') : '');
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var url = checkoutUrl(id);
        if (SECRET_KEY) openModal(url);
        else window.open(url, '_blank', 'noopener');
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
