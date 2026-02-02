/*
  print-fit.js
  Aplica um "fit" leve para evitar cortes no PDF (print.html).

  Por quê:
  - Alguns slides têm muito conteúdo (ou layout muda após carregar fontes)
    e podem encostar/cortar no rodapé quando impressos em 16:9.

  Estratégia:
  - Reaproveita a mesma lógica do viewer (bounding box visual + tolerância)
  - Roda em:
    - DOMContentLoaded (frame seguinte)
    - window.load (assets)
    - document.fonts.ready
    - beforeprint
*/

(function () {
  'use strict';

  function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
  }

  function fitSlideOverflow(slide) {
    if (!slide) return;

    slide.style.transform = '';
    slide.style.transformOrigin = '';

    const ch = slide.clientHeight;
    const cw = slide.clientWidth;
    if (!ch || !cw) return;

    const SAFE_PX = 8;
    const sh = slide.scrollHeight;
    const sw = slide.scrollWidth;

    const rect = slide.getBoundingClientRect();
    let left = Infinity, top = Infinity, right = -Infinity, bottom = -Infinity;
    const nodes = slide.querySelectorAll('*');

    for (let i = 0; i < nodes.length; i++) {
      const el = nodes[i];
      const cs = window.getComputedStyle(el);
      if (!cs || cs.display === 'none' || cs.visibility === 'hidden') continue;

      const r = el.getBoundingClientRect();
      if (!r || (r.width === 0 && r.height === 0)) continue;

      left = Math.min(left, r.left);
      top = Math.min(top, r.top);
      right = Math.max(right, r.right);
      bottom = Math.max(bottom, r.bottom);
    }

    let scale = 1;
    if (isFinite(left)) {
      const contentW = right - left;
      const contentH = bottom - top;

      const availW = Math.max(0, rect.width - SAFE_PX * 2);
      const availH = Math.max(0, rect.height - SAFE_PX * 2);

      if (contentW > 0 && contentH > 0) {
        scale = Math.min(availH / contentH, availW / contentW, 1);
      } else if (sh && sw) {
        scale = Math.min(ch / sh, cw / sw, 1);
      }
    } else if (sh && sw) {
      scale = Math.min(ch / sh, cw / sw, 1);
    }

    if (scale < 0.995) {
      scale = clamp(scale, 0.55, 1);
      slide.style.transformOrigin = 'top center';
      slide.style.transform = 'scale(' + scale.toFixed(4) + ')';
      slide.dataset.fitScale = scale.toFixed(4);
    } else {
      delete slide.dataset.fitScale;
    }
  }

  function fitAll() {
    const slides = document.querySelectorAll('.slide');
    for (let i = 0; i < slides.length; i++) fitSlideOverflow(slides[i]);
  }

  function schedule() {
    window.requestAnimationFrame(fitAll);
    window.setTimeout(fitAll, 120);
    window.setTimeout(fitAll, 420);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        fitAll();
      });
    }
  }

  document.addEventListener('DOMContentLoaded', schedule);
  window.addEventListener('load', schedule);
  window.addEventListener('beforeprint', fitAll);
})();
