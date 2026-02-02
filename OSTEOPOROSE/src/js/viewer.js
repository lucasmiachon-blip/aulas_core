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

  const STAGE_W = 1600;
  const STAGE_H = 900;

  const state = {
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

    for (let i = 0; i < state.slides.length; i++) {
      const s = state.slides[i];
      const active = i === state.idx;
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
      const key = state.slides[state.idx].getAttribute('data-key');
      if (key) window.location.hash = key;
    }
  }


  function updateCounter() {
    const el = qs('[data-counter]');
    if (el) el.textContent = String(state.idx + 1) + '/' + String(state.slides.length);

    const prev = qs('[data-nav="prev"]');
    const next = qs('[data-nav="next"]');
    if (prev) prev.disabled = state.idx <= 0;
    if (next) next.disabled = state.idx >= state.slides.length - 1;
  }

  function buildSelect() {
    const select = qs('[data-select]');
    if (!select) return;

    // Limpa mantendo o primeiro option
    select.querySelectorAll('option:not(:first-child)').forEach(function (o) {
      o.remove();
    });

    state.slides.forEach(function (s, i) {
      const key = s.getAttribute('data-key') || String(i + 1);
      let title = s.getAttribute('data-title');
      if (!title) {
        const h = s.querySelector('h1,h2');
        title = h ? h.textContent.trim() : 'Slide ' + (i + 1);
      }

      const opt = document.createElement('option');
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
    const key = String(hashOrId).replace(/^#/, '');

    // 1) Sxx
    let idx = state.slides.findIndex(function (s) {
      return s.getAttribute('data-key') === key;
    });

    // 2) id legado
    if (idx === -1) {
      const el = document.getElementById(key);
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
    // PDF em formato de apresentação: mesmo viewer, modo print (?print=1).
    // Um slide = uma página no PDF; teclado no leitor (setas) = próximo/anterior slide.
    // Mudanças no viewer refletem no PDF quando for gerado. print.html é fallback opcional.
    try {
      const url = new URL(window.location.href);
      url.hash = '';
      url.searchParams.set('print', '1');

      const p = url.pathname || '';
      if (p.endsWith('/index-legacy.html')) {
        url.pathname = p.replace(/index-legacy\.html$/, 'index.html');
      } else if (p.endsWith('/') || (p.includes('/src') || p.includes('/dist')) && !p.endsWith('.html')) {
        const base = p.replace(/\/$/, '');
        url.pathname = base ? base + '/index.html' : '/OSTEOPOROSE/src/index.html';
      }
      window.open(url.toString(), '_blank', 'noopener,noreferrer');
    } catch (e) {
      const fallback = new URL(window.location.href);
      fallback.searchParams.set('print', '1');
      window.open(fallback.toString(), '_blank', 'noopener,noreferrer');
    }
  }


  function toggleFullscreen() {
    const doc = document;
    const el = document.documentElement;

    if (!doc.fullscreenElement) {
      if (el.requestFullscreen) el.requestFullscreen();
      fitAllSlidesOverflowForPrint();
      return;
    }
    if (doc.exitFullscreen) doc.exitFullscreen();
  }

  function getPaddingPx(el) {
    const cs = window.getComputedStyle(el);
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

    const active = state.slides[state.idx];
    if (!active) return;

    // Imagens e outros assets podem carregar depois do 1Âº fit,
    // aumentando a altura e causando corte inferior.
    const assets = active.querySelectorAll('img, video, iframe');
    for (let i = 0; i < assets.length; i++) {
      (function (el) {
        // img já carregada não precisa listener
        if (el.tagName === 'IMG' && el.complete) return;

        const handler = function () {
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

  const fitTimers = { raf: 0, t1: 0, t2: 0, t3: 0 };
  let _fitToScreenCallCount = 0;
  
  // Preserva dimensões máximas para não encolher quando DevTools abre
  let _maxViewportW = 0;
  let _maxViewportH = 0;

  function scheduleFit(reason) {
    if (isPrintMode()) return;

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/f8bcf885-06e8-4a1f-a1c9-b4011068c7dc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'viewer.js:scheduleFit',message:'scheduleFit called',data:{reason:reason},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H1'})}).catch(function(){});
    // #endregion

    if (fitTimers.raf) window.cancelAnimationFrame(fitTimers.raf);
    if (fitTimers.t1) window.clearTimeout(fitTimers.t1);
    if (fitTimers.t2) window.clearTimeout(fitTimers.t2);
    if (fitTimers.t3) window.clearTimeout(fitTimers.t3);

    // FIX: Uma única execução após layout estável (evita race: 1707→1151 e scale 1→0.899)
    fitTimers.t1 = window.setTimeout(function () {
      window.requestAnimationFrame(function () {
        fitToScreen();
        fitTimers.t2 = window.setTimeout(fitActiveSlideOverflow, 80);
      });
    }, 120);

    // Fontes web: podem alterar métricas
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        window.requestAnimationFrame(fitToScreen);
      });
    }
  }

  function fitToScreen() {
    if (isPrintMode()) return;
    _fitToScreenCallCount += 1;
    const callNum = _fitToScreenCallCount;

    const stage = document.getElementById('stage');
    const inner = qs('[data-stage-inner]');
    const zoom = qs('[data-zoom]');
    if (!stage || !inner) return;

    const pad = getPaddingPx(stage);

    // Em modo palco (barra overlay), a UI ocupa espaço enquanto visível.
    const viewer = qs('[data-viewer]');
    if (viewer && viewer.classList.contains('is-present') && !viewer.classList.contains('is-ui-hidden')) {
      pad.y += 4;
    }
    let w = Math.max(0, stage.clientWidth - pad.x);
    let h = Math.max(0, stage.clientHeight - pad.y);
    // Em fullscreen não limitar pelo viewer para o slide ocupar mais a tela (evita 50–60%)
    const isFullscreen = viewer && viewer.classList.contains('is-fullscreen');
    if (!isFullscreen && viewer) {
      if (viewer.clientWidth) w = Math.min(w, Math.max(0, viewer.clientWidth - pad.x));
      if (viewer.clientHeight) h = Math.min(h, Math.max(0, viewer.clientHeight - pad.y));
    }
    
    // ANTI-SHRINK: Preserva dimensões máximas para não encolher quando DevTools abre
    // Só em modo normal (não fullscreen) - fullscreen sempre recalcula
    if (!isFullscreen) {
      // Atualiza máximo apenas se viewport cresceu (DevTools fechou, janela aumentou)
      if (w > _maxViewportW) _maxViewportW = w;
      if (h > _maxViewportH) _maxViewportH = h;
      // Usa o máximo para calcular scale (não encolhe)
      w = _maxViewportW;
      h = _maxViewportH;
    }

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/f8bcf885-06e8-4a1f-a1c9-b4011068c7dc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'viewer.js:fitToScreen:entry',message:'dims before scale',data:{callNum:callNum,stageW:stage.clientWidth,stageH:stage.clientHeight,padX:pad.x,padY:pad.y,w:w,h:h},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H3',runId:'post-fix'})}).catch(function(){});
    // #endregion

    // Scale até preencher o stage (formato apresentação: ocupa a borda toda); teto 3x em ambos os modos
    const maxScale = 3;
    let scale = Math.min(w / STAGE_W, h / STAGE_H, maxScale);
    const scaleBeforeClamp = scale;
    scale = Math.max(0.1, Math.min(scale, 3));

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/f8bcf885-06e8-4a1f-a1c9-b4011068c7dc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'viewer.js:fitToScreen:scale',message:'scale calc',data:{callNum:callNum,scaleBeforeClamp:scaleBeforeClamp,scaleAfterClamp:scale,wOverW:(w/STAGE_W),hOverH:(h/STAGE_H)},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H1',runId:'post-fix'})}).catch(function(){});
    // #endregion
    // DEBUG VISUAL - mostra valores reais
    console.log('%c[fitToScreen #' + callNum + ']', 'background:#0B1320;color:#DDB944;padding:4px 8px;border-radius:4px;font-weight:bold;');
    console.log('  STAGE_W/H (JS):', STAGE_W, 'x', STAGE_H);
    console.log('  stage.client:', stage.clientWidth, 'x', stage.clientHeight);
    console.log('  padding:', pad.x, 'x', pad.y);
    console.log('  w,h usado (com anti-shrink):', w, 'x', h);
    console.log('  _maxViewport:', _maxViewportW, 'x', _maxViewportH);
    console.log('  isFullscreen:', isFullscreen);
    console.log('  w/STAGE_W:', (w/STAGE_W).toFixed(4), '| h/STAGE_H:', (h/STAGE_H).toFixed(4));
    console.log('  scale calculado:', scaleBeforeClamp.toFixed(4), '-> aplicado:', scale.toFixed(4));
    console.log('  inner real (scaled):', Math.round(STAGE_W * scale), 'x', Math.round(STAGE_H * scale));

    inner.style.setProperty('--scale', String(scale));

    // #region agent log
    const readback = inner && window.getComputedStyle(inner).getPropertyValue('--scale');
    fetch('http://127.0.0.1:7242/ingest/f8bcf885-06e8-4a1f-a1c9-b4011068c7dc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'viewer.js:fitToScreen:set',message:'setProperty and readback',data:{callNum:callNum,scaleSet:scale,readback:readback,innerId:inner.id,innerClass:inner.className},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H2',runId:'post-fix'})}).catch(function(){});
    // #endregion
    
    // Log das dimensões reais após aplicar scale
    const deck = qs('[data-deck]');
    const slides = qs('[data-slides]');
    console.log('  -> inner.getBoundingClientRect:', Math.round(inner.getBoundingClientRect().width), 'x', Math.round(inner.getBoundingClientRect().height));
    if (deck) console.log('  -> deck.getBoundingClientRect:', Math.round(deck.getBoundingClientRect().width), 'x', Math.round(deck.getBoundingClientRect().height));
    if (slides) console.log('  -> slides.getBoundingClientRect:', Math.round(slides.getBoundingClientRect().width), 'x', Math.round(slides.getBoundingClientRect().height));
    console.log('  -> window.innerWidth x innerHeight:', window.innerWidth, 'x', window.innerHeight);

    if (zoom) zoom.textContent = String(Math.round(scale * 100)) + '%';

    fitActiveSlideOverflow();
  }

  // Se algum slide "estourar" a altura/largura útil (conteúdo maior que 1280×720),
  // reduzimos levemente via transform para evitar cortes (P0: margem inferior).
  // PATCH 0.9: Tolerância alta + só considera altura (documento de análise)
  function fitSlideOverflow(slide) {
    if (!slide) return;

    // Reset anterior
    slide.style.transform = '';
    slide.style.transformOrigin = '';
    delete slide.dataset.fitScale;

    const sh = slide.scrollHeight;
    
    // DESABILITADO - autofit individual causa margens brancas em fullscreen
    // var sw = slide.scrollWidth;
    // var TOLERANCE = 50;
    // if (sh <= STAGE_H + TOLERANCE) {
    //   return;  // 720 + 50 = 770px de tolerância
    // }
    // var SAFE_PX = 4;
    // var scale = (STAGE_H - SAFE_PX) / sh;
    // scale = Math.max(0.82, scale);
    // if (scale < 0.99) {
    //   slide.style.transformOrigin = 'top center';
    //   slide.style.transform = 'scale(' + scale.toFixed(4) + ')';
    //   slide.dataset.fitScale = scale.toFixed(4);
    // }
  }


  function fitActiveSlideOverflow() {
    if (isPrintMode()) return;
    const active = state.slides[state.idx];
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

  /**
   * Auditoria: identifica slides cujo conteúdo viola a borda inferior (scrollHeight > altura útil).
   * Chamar no console: __auditSlideOverflow()
   * Resultado em __auditSlideOverflowResult e envio para debug.log.
   */
  function auditSlideOverflow() {
    if (isPrintMode() || !state.slides.length) return;
    const origIdx = state.idx;
    const overflow = [];
    let okCount = 0;
    let i = 0;

    function next() {
      if (i >= state.slides.length) {
        setActive(origIdx, { pushHash: false });
        const msg = overflow.length
          ? 'Slides que violam borda inferior: ' + overflow.map(function (o) { return o.key || '#' + (o.idx + 1); }).join(', ')
          : 'Nenhum slide viola a borda inferior.';
        console.log('%c[audit] ' + msg, 'background:#1F766E;color:#fff;padding:6px 10px;border-radius:6px;');
        if (overflow.length) console.table(overflow);
        fetch('http://127.0.0.1:7242/ingest/f8bcf885-06e8-4a1f-a1c9-b4011068c7dc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'viewer.js:auditSlideOverflow',message:'audit result',data:{overflow:overflow,ok:okCount,total:state.slides.length},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'overflow-audit'})}).catch(function(){});
        if (typeof window.__auditSlideOverflowResult !== 'undefined') window.__auditSlideOverflowResult = { overflow: overflow, ok: okCount };
        return;
      }
      setActive(i, { pushHash: false });
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          const s = state.slides[i];
          const sh = s.scrollHeight;
          const ch = s.clientHeight;
          const key = s.getAttribute('data-key') || ('#' + (i + 1));
          if (sh > ch) {
            overflow.push({ idx: i, key: key, scrollHeight: sh, clientHeight: ch, diff: sh - ch });
          } else {
            okCount += 1;
          }
          i += 1;
          setTimeout(next, 60);
        });
      });
    }
    next();
  }

  function syncFullscreenClass() {
    const viewer = qs('[data-viewer]');
    if (!viewer) return;
    const wasFullscreen = viewer.classList.contains('is-fullscreen');
    const isNowFullscreen = !!document.fullscreenElement;
    viewer.classList.toggle('is-fullscreen', isNowFullscreen);
    
    // Ao sair de fullscreen, reset os máximos para recalcular com base no viewport atual
    if (wasFullscreen && !isNowFullscreen) {
      _maxViewportW = 0;
      _maxViewportH = 0;
      console.log('%c[fullscreen] Saiu de fullscreen, resetando _maxViewport', 'color:#1F766E;');
    }
  }


  function setUiHidden(hidden) {
    const viewer = qs('[data-viewer]');

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
    const viewer = qs('[data-viewer]');
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
    const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

    const key = e.key;

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

    const stage = document.getElementById('stage');
    if (!stage) return;

    const r = stage.getBoundingClientRect();
    const x = e.clientX - r.left;
    if (x < r.width * 0.45) move(-1);
    else if (x > r.width * 0.55) move(1);
  }

  function wireUI() {
    const prev = qs('[data-nav="prev"]');
    const next = qs('[data-nav="next"]');
    const btnFs = qs('[data-action="toggleFullscreen"]');
    const btnPrint = qs('[data-action="openPrint"]');
    const btnPresent = qs('[data-action="togglePresent"]');

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
      const stage = document.getElementById('stage');
      if (stage) {
        const ro = new ResizeObserver(function () { scheduleFit('resizeObserver'); });
        ro.observe(stage);
      }
    }
  }

  function initDeck() {
    console.log('[viewer] initDeck chamado');
    setHtmlPrintMode();
    window.__auditSlideOverflow = auditSlideOverflow;

    state.slides = qsa('[data-slide]');
    console.log('[viewer] Slides encontrados no DOM:', state.slides.length);
    if (!state.slides.length) {
      console.warn('[viewer] Nenhum slide encontrado com [data-slide]. Verificando container...');
      const container = document.querySelector('[data-slides]');
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
      let _printPreviewRaf = 0;
      function updatePrintPreviewZoom() {
        if (window.matchMedia && window.matchMedia('print').matches) return;
        const CANVAS_W = 1600;
        const gutter = 24;
        const vw = Math.max(320, window.innerWidth - gutter);
        const z = Math.min(1, vw / CANVAS_W);
        document.documentElement.style.setProperty('--print-preview-zoom', z.toFixed(4));

        window.requestAnimationFrame(function () {
          const de = document.documentElement;
          const scrollW = de.scrollWidth;
          const innerW = window.innerWidth;
          console.log('[print-preview] zoom aplicado:', z.toFixed(4));
          console.log('[print-preview] scrollWidth/innerWidth:', scrollW, '/', innerW);

          const total = state.slides.length;
          const sampleCount = Math.min(20, total);
          const idxs = [];
          for (let i = 0; i < total; i++) idxs.push(i);
          for (let j = total - 1; j > 0; j--) {
            const k = Math.floor(Math.random() * (j + 1));
            const tmp = idxs[j];
            idxs[j] = idxs[k];
            idxs[k] = tmp;
          }
          const sample = idxs.slice(0, sampleCount).map(function (idx) {
            const s = state.slides[idx];
            const rect = s.getBoundingClientRect();
            return {
              idx: idx,
              id: s.id || s.getAttribute('data-key') || '',
              right: Math.round(rect.right),
              ok: rect.right <= innerW
            };
          });
          console.log('[print-preview] sample(20):', sample);

          if (scrollW > innerW + 2) {
            const first = state.slides[0];
            let worst = null;
            let worstRight = -Infinity;
            if (first) {
              const elements = [first].concat(Array.prototype.slice.call(first.querySelectorAll('*')));
              elements.forEach(function (el) {
                const r = el.getBoundingClientRect();
                if (r.right > worstRight) {
                  worstRight = r.right;
                  worst = el;
                }
              });
            }
            let label = '';
            if (worst) {
              label = (worst.tagName || 'EL') + (worst.id ? '#' + worst.id : '') + (worst.className ? '.' + String(worst.className).trim().split(/\s+/).join('.') : '');
            }
            console.warn('[print-preview] overflow-x detectado', {
              scrollW: scrollW,
              innerW: innerW,
              worst: label,
              worstRight: Math.round(worstRight)
            });
          }
        });
      }
      updatePrintPreviewZoom();
      window.addEventListener('resize', function () {
        if (_printPreviewRaf) window.cancelAnimationFrame(_printPreviewRaf);
        _printPreviewRaf = window.requestAnimationFrame(updatePrintPreviewZoom);
      });
      return;
    }

    // Preenche o dropdown com o deck carregado
    buildSelect();

    // Inicial: hash ou primeiro
    if (window.location.hash) jumpTo(window.location.hash);

    // Fallback: se jumpTo não ativou nada, ativa o primeiro
    const activeIdx = state.slides.findIndex(function (s) { return s.classList.contains('is-active'); });
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

    const stage = document.getElementById('stage');
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
      const slides = qsa('[data-slide]');
      if (slides.length > 0) {
        console.log('[viewer] Fallback: encontrados', slides.length, 'slides, inicializando...');
        initDeck();
      }
    }
  }, 2000);
})();
