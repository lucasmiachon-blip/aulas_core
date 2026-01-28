/*
  viewer.js
  Navegação + fullscreen + fit-to-screen + modo print.

  Atalhos:
  - â†/â†’ | PageUp/PageDown | Espaço
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
    activeAssetHandlers: [],
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
    console.log('[viewer] setActive chamado, índice:', state.idx, 'de', state.slides.length);

    for (var i = 0; i < state.slides.length; i++) {
      var s = state.slides[i];
      var active = i === state.idx;
      s.classList.toggle('is-active', active);
      s.hidden = !active;
      s.setAttribute('aria-hidden', active ? 'false' : 'true');
      if (active) {
        console.log('[viewer] Slide', i, 'ativado:', s.id || s.getAttribute('data-key') || 'sem ID');
      }
    }

    updateCounter();
    syncSelect();

    // (P0) Evita cortes por load tardio (fonts/imagens) e por arredondamento.
    watchActiveSlideAssets();
    scheduleFit('setActive');

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
      opt.textContent = key + ' Â· ' + title;
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
    // Preferir print.html (estático) para exportar PDF sem depender de fetch/async.
    // Fallback: ?print=1 (modo antigo).
    try {
      var url = new URL(window.location.href);
      url.hash = '';

      var p = url.pathname || '';
      // casos comuns:
      // /dist/index.html -> /dist/print.html
      // /src/index.html  -> /src/print.html
      if (p.endsWith('/index.html')) {
        url.pathname = p.replace(/index\.html$/, 'print.html');
        url.search = '';
        window.open(url.toString(), '_blank', 'noopener,noreferrer');
        return;
      }

      if (p.endsWith('/index-legacy.html')) {
        url.pathname = p.replace(/index-legacy\.html$/, 'print.html');
        url.search = '';
        window.open(url.toString(), '_blank', 'noopener,noreferrer');
        return;
      }

      // Se estiver em /dist/ ou /src/ sem nome de arquivo
      if (p.endsWith('/dist/') || p.endsWith('/src/')) {
        url.pathname = p + 'print.html';
        url.search = '';
        window.open(url.toString(), '_blank', 'noopener,noreferrer');
        return;
      }

      // fallback legacy
      url.searchParams.set('print', '1');
      window.open(url.toString(), '_blank', 'noopener,noreferrer');
    } catch (e) {
      var fallback = new URL(window.location.href);
      fallback.searchParams.set('print', '1');
      window.open(fallback.toString(), '_blank', 'noopener,noreferrer');
    }
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

  function cleanupActiveAssetHandlers() {
    if (!state.activeAssetHandlers || !state.activeAssetHandlers.length) return;
    state.activeAssetHandlers.forEach(function (off) {
      try { off(); } catch (e) {}
    });
    state.activeAssetHandlers = [];
  }

  function watchActiveSlideAssets() {
    if (isPrintMode()) return;
    cleanupActiveAssetHandlers();

    var active = state.slides[state.idx];
    if (!active) return;

    // Imagens e outros assets podem carregar depois do 1Âº fit,
    // aumentando a altura e causando corte inferior.
    var assets = active.querySelectorAll('img, video, iframe');
    for (var i = 0; i < assets.length; i++) {
      (function (el) {
        // img já carregada não precisa listener
        if (el.tagName === 'IMG' && el.complete) return;

        var handler = function () {
          scheduleFit('asset');
        };

        el.addEventListener('load', handler, { once: true });
        el.addEventListener('error', handler, { once: true });

        state.activeAssetHandlers.push(function () {
          try { el.removeEventListener('load', handler); } catch (e) {}
          try { el.removeEventListener('error', handler); } catch (e) {}
        });
      })(assets[i]);
    }
  }

  var fitTimers = { raf: 0, t1: 0, t2: 0, t3: 0 };

  function scheduleFit(reason) {
    if (isPrintMode()) return;

    if (fitTimers.raf) window.cancelAnimationFrame(fitTimers.raf);
    if (fitTimers.t1) window.clearTimeout(fitTimers.t1);
    if (fitTimers.t2) window.clearTimeout(fitTimers.t2);
    if (fitTimers.t3) window.clearTimeout(fitTimers.t3);

    // 1) Próximo frame (reflow do slide ativo)
    fitTimers.raf = window.requestAnimationFrame(function () {
      fitToScreen();
    });

    // 2) Re-rodar após fontes/ícones carregarem e o layout estabilizar
    fitTimers.t1 = window.setTimeout(fitToScreen, 90);
    fitTimers.t2 = window.setTimeout(fitToScreen, 260);
    fitTimers.t3 = window.setTimeout(fitActiveSlideOverflow, 420);

    // 3) Fontes web: podem alterar métricas (linha/altura)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        fitToScreen();
      });
    }
  }

  function fitToScreen() {
    if (isPrintMode()) return;

    var stage = document.getElementById('stage');
    var inner = qs('[data-stage-inner]');
    var zoom = qs('[data-zoom]');
    if (!stage || !inner) return;

    var pad = getPaddingPx(stage);

    // Em modo palco (barra overlay), a UI ocupa espaço enquanto visível.
    // CSS já ajusta padding-top quando necessário, mas aqui mantemos um guard extra.
    var viewer = qs('[data-viewer]');
    if (viewer && viewer.classList.contains('is-present') && !viewer.classList.contains('is-ui-hidden')) {
      pad.y += 4;
    }
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
  // PATCH 0.7: Tolerância maior para evitar compressão desnecessária
  function fitSlideOverflow(slide) {
    if (!slide) return;

    // Reset anterior
    slide.style.transform = '';
    slide.style.transformOrigin = '';
    delete slide.dataset.fitScale;

    // Tolerância: só aplica scale se exceder por mais de 20px
    var TOLERANCE = 20;
    var SAFE_PX = 8;

    var sh = slide.scrollHeight;
    var sw = slide.scrollWidth;
    
    // Se conteúdo cabe com folga, não faz nada
    if (sh <= STAGE_H + TOLERANCE && sw <= STAGE_W + TOLERANCE) {
      return;
    }

    // Calcular scale necessário
    var scaleH = (STAGE_H - SAFE_PX) / sh;
    var scaleW = (STAGE_W - SAFE_PX) / sw;
    var scale = Math.min(scaleH, scaleW, 1);

    // Limite mínimo: 0.72
    scale = Math.max(0.72, scale);

    if (scale < 0.995) {
      slide.style.transformOrigin = 'top center';
      slide.style.transform = 'scale(' + scale.toFixed(4) + ')';
      slide.dataset.fitScale = scale.toFixed(4);
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

    // UI muda o padding/topo em modo palco -> refit
    scheduleFit('uiHidden');
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
      scheduleFit('present:off');
      return;
    }

    armAutoHide();
    scheduleFit('present:on');
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

    // Refit quando o palco muda de tamanho (layout, zoom, sidebars)
    if (window.ResizeObserver) {
      var stage = document.getElementById('stage');
      if (stage) {
        var ro = new ResizeObserver(function () { scheduleFit('resizeObserver'); });
        ro.observe(stage);
      }
    }
  }

  function initDeck() {
    console.log('[viewer] initDeck chamado');
    setHtmlPrintMode();

    state.slides = qsa('[data-slide]');
    console.log('[viewer] Slides encontrados no DOM:', state.slides.length);
    if (!state.slides.length) {
      console.warn('[viewer] Nenhum slide encontrado com [data-slide]. Verificando container...');
      var container = document.querySelector('[data-slides]');
      if (container) {
        console.log('[viewer] Container [data-slides] encontrado, filhos:', container.children.length);
      }
      return;
    }


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
    console.log('[viewer] Ãndice do slide ativo encontrado:', activeIdx);
    if (activeIdx === -1) {
      console.log('[viewer] Nenhum slide ativo, ativando o primeiro (índice 0)');
      setActive(0, { pushHash: false });
    } else {
      console.log('[viewer] Slide ativo encontrado no índice', activeIdx, ', mantendo ativo');
      setActive(activeIdx, { pushHash: false });
    }

    wireUI();
    updateCounter();

    syncFullscreenClass();
    scheduleFit('init');
    window.addEventListener('resize', function () { scheduleFit('resize'); });

    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('hashchange', onHashChange);

    var stage = document.getElementById('stage');
    if (stage) stage.addEventListener('click', onStageClick);
  }

  document.addEventListener('deck:loaded', function(e) {
    console.log('[viewer] Evento deck:loaded recebido', e.detail);
    initDeck();
  });
  
  // Fallback: se o evento não disparar, tentar inicializar após um delay
  setTimeout(function() {
    if (state.slides.length === 0) {
      console.log('[viewer] Fallback: tentando inicializar após delay');
      var slides = qsa('[data-slide]');
      if (slides.length > 0) {
        console.log('[viewer] Fallback: encontrados', slides.length, 'slides, inicializando...');
        initDeck();
      }
    }
  }, 2000);
})();