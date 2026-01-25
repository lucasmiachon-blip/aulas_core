/*
  viewer.js
  Navegação + fullscreen + fit-to-screen + modo print.

  Atalhos:
  - ←/→ | PageUp/PageDown | Espaço
  - Home/End
  - F: fullscreen
  - P: abrir modo PDF (print=1)
*/

(function () {
  'use strict';

  var STAGE_W = 1280;
  var STAGE_H = 720;

  var state = {
    slides: [],
    idx: 0,
    present: false,
    uiHidden: false,
    hideTimer: null,
  };

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function qsa(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
  }

  function isPrintMode() {
    return new URLSearchParams(window.location.search).get('print') === '1';
  }

  function setHtmlPrintMode() {
    if (isPrintMode()) document.documentElement.classList.add('is-print');
  }

  function setActive(index, opts) {
    opts = opts || {};
    state.idx = clamp(index, 0, state.slides.length - 1);

    for (var i = 0; i < state.slides.length; i++) {
      var s = state.slides[i];
      var active = i === state.idx;
      s.classList.toggle('is-active', active);
      s.hidden = !active;
      s.setAttribute('aria-hidden', active ? 'false' : 'true');
    }

    updateCounter();
    syncSelect();

    fitActiveSlideOverflow();

    if (opts.pushHash !== false) {
      var key = state.slides[state.idx].getAttribute('data-key');
      if (key) window.location.hash = key;
    }
  }

  function updateCounter() {
    var el = qs('[data-counter]');
    if (el) el.textContent = String(state.idx + 1) + '/' + String(state.slides.length);

    var prev = qs('[data-nav="prev"]');
    var next = qs('[data-nav="next"]');
    if (prev) prev.disabled = state.idx <= 0;
    if (next) next.disabled = state.idx >= state.slides.length - 1;
  }

  function buildSelect() {
    var select = qs('[data-select]');
    if (!select) return;

    // Limpa mantendo o primeiro option
    select.querySelectorAll('option:not(:first-child)').forEach(function (o) {
      o.remove();
    });

    state.slides.forEach(function (s, i) {
      var key = s.getAttribute('data-key') || String(i + 1);
      var title = s.getAttribute('data-title');
      if (!title) {
        var h = s.querySelector('h1,h2');
        title = h ? h.textContent.trim() : 'Slide ' + (i + 1);
      }

      var opt = document.createElement('option');
      opt.value = key;
      opt.textContent = key + ' · ' + title;
      select.appendChild(opt);
    });

    select.addEventListener('change', function () {
      if (!select.value) return;
      jumpTo(select.value);
      // UX: volta para placeholder
      select.value = '';
    });
  }

  function syncSelect() {
    // Sem seleção persistente (a UX é: dropdown como "jump")
    // Deixamos vazio.
  }

  function jumpTo(hashOrId) {
    if (!hashOrId) return;
    var key = String(hashOrId).replace(/^#/, '');

    // 1) Sxx
    var idx = state.slides.findIndex(function (s) {
      return s.getAttribute('data-key') === key;
    });

    // 2) id legado
    if (idx === -1) {
      var el = document.getElementById(key);
      if (el) {
        idx = state.slides.indexOf(el);
      }
    }

    // 3) número simples
    if (idx === -1 && /^\d+$/.test(key)) {
      idx = clamp(parseInt(key, 10) - 1, 0, state.slides.length - 1);
    }

    if (idx !== -1) setActive(idx, { pushHash: false });
  }

  function onHashChange() {
    if (!window.location.hash) return;
    jumpTo(window.location.hash);
  }

  function move(delta) {
    setActive(state.idx + delta);
  }

  function openPrintMode() {
    var url = new URL(window.location.href);
    url.searchParams.set('print', '1');
    // manter hash ajuda no debug; mas na impressão exibimos todos os slides mesmo
    window.open(url.toString(), '_blank', 'noopener,noreferrer');
  }

  function toggleFullscreen() {
    var doc = document;
    var el = document.documentElement;

    if (!doc.fullscreenElement) {
      if (el.requestFullscreen) el.requestFullscreen();
      fitAllSlidesOverflowForPrint();
      return;
    }
    if (doc.exitFullscreen) doc.exitFullscreen();
  }

  function getPaddingPx(el) {
    var cs = window.getComputedStyle(el);
    return {
      x: parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight),
      y: parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom),
    };
  }

  function fitToScreen() {
    if (isPrintMode()) return;

    var stage = document.getElementById('stage');
    var inner = qs('[data-stage-inner]');
    var zoom = qs('[data-zoom]');
    if (!stage || !inner) return;

    var pad = getPaddingPx(stage);
    var w = Math.max(0, stage.clientWidth - pad.x);
    var h = Math.max(0, stage.clientHeight - pad.y);

    var scale = Math.min(w / STAGE_W, h / STAGE_H);
    scale = Math.max(0.1, Math.min(scale, 3));

    inner.style.setProperty('--scale', String(scale));
    if (zoom) zoom.textContent = String(Math.round(scale * 100)) + '%';

    // Após mudar o scale do palco, revalida overflow do slide ativo
    fitActiveSlideOverflow();
  }

  // Se algum slide "estourar" a altura/largura útil (conteúdo maior que 1280×720),
  // reduzimos levemente via transform para evitar cortes (P0: margem inferior).
  function fitSlideOverflow(slide) {
    if (!slide) return;

    // Reset
    slide.style.transform = '';
    slide.style.transformOrigin = '';

    // Medidas após layout
    var ch = slide.clientHeight;
    var sh = slide.scrollHeight;
    var cw = slide.clientWidth;
    var sw = slide.scrollWidth;

    if (!ch || !cw) return;

    var scale = Math.min(ch / sh, cw / sw, 1);

    // Tolerância: evita micro-jitter
    if (scale < 0.995) {
      scale = Math.max(0.88, scale); // não encolher demais (sinaliza que precisa refatorar o slide)
      slide.style.transformOrigin = 'top center';
      slide.style.transform = 'scale(' + scale.toFixed(4) + ')';
    }
  }

  function fitActiveSlideOverflow() {
    if (isPrintMode()) return;
    var active = state.slides[state.idx];
    if (!active) return;
    // esperar um frame para garantir reflow/paint do slide recém-ativado
    window.requestAnimationFrame(function () {
      fitSlideOverflow(active);
    });
  }

  function fitAllSlidesOverflowForPrint() {
    if (!isPrintMode()) return;
    // Um frame para garantir que todos os slides já estejam no DOM e visíveis
    window.requestAnimationFrame(function () {
      state.slides.forEach(function (s) { fitSlideOverflow(s); });
    });
  }

  function syncFullscreenClass() {
    var viewer = qs('[data-viewer]');
    if (!viewer) return;
    viewer.classList.toggle('is-fullscreen', !!document.fullscreenElement);
  }


  function setUiHidden(hidden) {
    var viewer = qs('[data-viewer]');

    if (!viewer) return;

    state.uiHidden = hidden;
    viewer.classList.toggle('is-ui-hidden', hidden);
  }

  function armAutoHide() {
    if (!state.present) return;

    if (state.hideTimer) window.clearTimeout(state.hideTimer);
    setUiHidden(false);

    state.hideTimer = window.setTimeout(function () {
      setUiHidden(true);
    }, 1800);
  }

  function togglePresentMode() {
    state.present = !state.present;
    var viewer = qs('[data-viewer]');
    if (!viewer) return;

    viewer.classList.toggle('is-present', state.present);

    if (!state.present) {
      if (state.hideTimer) window.clearTimeout(state.hideTimer);
      setUiHidden(false);
      fitAllSlidesOverflowForPrint();
      return;
    }

    armAutoHide();
  }

  function onKeyDown(e) {
    // Evitar capturar quando usuário está em input/select
    var tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

    var key = e.key;

    if (key === 'ArrowRight' || key === 'PageDown' || key === ' ') {
      e.preventDefault();
      move(1);
      fitAllSlidesOverflowForPrint();
      return;
    }

    if (key === 'ArrowLeft' || key === 'PageUp') {
      e.preventDefault();
      move(-1);
      fitAllSlidesOverflowForPrint();
      return;
    }

    if (key === 'Home') {
      e.preventDefault();
      setActive(0);
      fitAllSlidesOverflowForPrint();
      return;
    }

    if (key === 'End') {
      e.preventDefault();
      setActive(state.slides.length - 1);
      fitAllSlidesOverflowForPrint();
      return;
    }

    if (key === 'f' || key === 'F') {
      e.preventDefault();
      toggleFullscreen();
      fitAllSlidesOverflowForPrint();
      return;
    }

    if (key === 'p' || key === 'P') {
      e.preventDefault();
      openPrintMode();
      fitAllSlidesOverflowForPrint();
      return;
    }

    if (key === 'Escape' && state.present) {
      togglePresentMode();
    }
  }

  function onStageClick(e) {
    // Clique para navegar (metade esquerda/direita). Ignora clique no UI.
    if (qs('[data-ui]') && qs('[data-ui]').contains(e.target)) return;

    var stage = document.getElementById('stage');
    if (!stage) return;

    var r = stage.getBoundingClientRect();
    var x = e.clientX - r.left;
    if (x < r.width * 0.45) move(-1);
    else if (x > r.width * 0.55) move(1);
  }

  function wireUI() {
    var prev = qs('[data-nav="prev"]');
    var next = qs('[data-nav="next"]');
    var btnFs = qs('[data-action="toggleFullscreen"]');
    var btnPrint = qs('[data-action="openPrint"]');
    var btnPresent = qs('[data-action="togglePresent"]');

    if (prev) prev.addEventListener('click', function () { move(-1); });
    if (next) next.addEventListener('click', function () { move(1); });
    if (btnFs) btnFs.addEventListener('click', toggleFullscreen);
    if (btnPrint) btnPrint.addEventListener('click', openPrintMode);
    if (btnPresent) btnPresent.addEventListener('click', togglePresentMode);

    // Auto-hide UI em modo palco quando há movimento
    document.addEventListener('mousemove', function () {
      if (state.present) armAutoHide();
    });

    // Fit on fullscreen change
    document.addEventListener('fullscreenchange', function () {
      syncFullscreenClass();
      window.setTimeout(fitToScreen, 50);
    });
  }

  function initDeck() {
    setHtmlPrintMode();

    state.slides = qsa('[data-slide]');
    if (!state.slides.length) return;


    // Em modo print, mostramos todos; sem navegação.
    if (isPrintMode()) {
      state.slides.forEach(function (s) {
        s.hidden = false;
        s.classList.add('is-active');
        s.setAttribute('aria-hidden', 'false');
      });
      fitAllSlidesOverflowForPrint();
      return;
    }

    // Preenche o dropdown com o deck carregado
    buildSelect();

    // Inicial: hash ou primeiro
    if (window.location.hash) jumpTo(window.location.hash);

    // Fallback: se jumpTo não ativou nada, ativa o primeiro
    var activeIdx = state.slides.findIndex(function (s) { return s.classList.contains('is-active'); });
    if (activeIdx === -1) setActive(0, { pushHash: false });
    else setActive(activeIdx, { pushHash: false });

    wireUI();
    updateCounter();

    syncFullscreenClass();
    fitToScreen();
    window.addEventListener('resize', fitToScreen);

    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('hashchange', onHashChange);

    var stage = document.getElementById('stage');
    if (stage) stage.addEventListener('click', onStageClick);
  }

  document.addEventListener('deck:loaded', initDeck);
})();
