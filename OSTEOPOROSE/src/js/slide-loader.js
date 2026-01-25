/*
  slide-loader.js
  Carrega slides modulares de /slides/.

  Estratégia:
  - Lê slides/_list.txt (1 linha por arquivo).
  - Injeta os <section class="slide" data-slide> no container.
  - Funciona tanto em /src quanto em /dist (dist aponta para ../src).
*/

(function () {
  'use strict';

  function computeBase() {
    // Se estamos em .../dist/, as assets vivem em ../src/
    return window.location.pathname.includes('/dist/') ? '../src/' : './';
  }

  async function fetchText(url) {
    var res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('Falha ao carregar: ' + url);
    return await res.text();
  }

  function parseList(txt) {
    return txt
      .split(/\r?\n/)
      .map(function (l) { return l.trim(); })
      .filter(Boolean)
      .filter(function (l) { return !l.startsWith('#'); });
  }

  function elementFromHTML(html) {
    var tpl = document.createElement('template');
    tpl.innerHTML = html.trim();
    return tpl.content.firstElementChild;
  }

  async function loadSlides() {
    var container = document.querySelector('[data-slides]');
    if (!container) return;

    var base = computeBase();
    var listUrl = base + 'slides/_list.txt';
    var listTxt = await fetchText(listUrl);
    var files = parseList(listTxt);

    // Expor para outras partes do sistema
    window.__OSTEOPOROSE_DECK = window.__OSTEOPOROSE_DECK || {};
    window.__OSTEOPOROSE_DECK.base = base;
    window.__OSTEOPOROSE_DECK.files = files;

    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var html = await fetchText(base + 'slides/' + file);
      var el = elementFromHTML(html);
      if (!el) continue;

      // Derivar chave Sxx_ a partir do nome do arquivo
      var m = file.match(/^(S\d{2})_/);
      if (m) el.setAttribute('data-key', m[1]);

      // Estado inicial: oculto (respeita display inline do slide)
      el.hidden = true;
      el.setAttribute('aria-hidden', 'true');
      container.appendChild(el);
    }

    document.dispatchEvent(
      new CustomEvent('deck:loaded', {
        detail: { count: files.length },
      })
    );
  }

  document.addEventListener('DOMContentLoaded', function () {
    loadSlides().catch(function (err) {
      console.error(err);
      var container = document.querySelector('[data-slides]');
      if (!container) return;
      container.innerHTML =
        '<div style="padding:24px;font-family:Inter,system-ui;color:var(--navy);">' +
        '<h2 style="margin:0 0 8px 0;">Erro ao carregar slides</h2>' +
        '<p style="margin:0;opacity:.8;">Verifique se os arquivos em <code>slides/</code> estão disponíveis e se você está servindo via HTTP (não file://).</p>' +
        '</div>';
    });
  });
})();
