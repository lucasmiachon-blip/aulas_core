/*
  navigation.js
  Navegação básica para decks HTML.
  - Setas (←/→), PageUp/PageDown e Espaço
  - Botões com data-nav="prev" e data-nav="next"
  - Sem dependências externas
  - Sem contagem fixa de slides (descobre no DOM)
*/

(function () {
  'use strict';

  function getSlides() {
    return Array.from(document.querySelectorAll('[data-slide]'));
  }

  function getActiveIndex(slides) {
    return slides.findIndex(function (s) {
      return s.classList.contains('is-active');
    });
  }

  function setCounter(current, total) {
    var el = document.querySelector('[data-counter]');
    if (!el) return;
    el.textContent = String(current) + '/' + String(total);
  }

  function showSlide(slides, index) {
    slides.forEach(function (s, i) {
      s.classList.toggle('is-active', i === index);
      s.setAttribute('aria-hidden', i === index ? 'false' : 'true');
    });
    setCounter(index + 1, slides.length);
  }

  function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
  }

  function move(delta) {
    var slides = getSlides();
    if (!slides.length) return;

    var current = getActiveIndex(slides);
    if (current === -1) current = 0;

    var next = clamp(current + delta, 0, slides.length - 1);
    if (next === current) return;

    showSlide(slides, next);
  }

  function onKeyDown(e) {
    var key = e.key;

    if (key === 'ArrowRight' || key === 'PageDown' || key === ' ') {
      e.preventDefault();
      move(1);
      return;
    }

    if (key === 'ArrowLeft' || key === 'PageUp') {
      e.preventDefault();
      move(-1);
      return;
    }
  }

  function wireButtons() {
    var prev = document.querySelector('[data-nav="prev"]');
    var next = document.querySelector('[data-nav="next"]');

    if (prev) prev.addEventListener('click', function () { move(-1); });
    if (next) next.addEventListener('click', function () { move(1); });
  }

  function init() {
    var slides = getSlides();
    if (!slides.length) return;

    var active = getActiveIndex(slides);
    if (active === -1) {
      slides[0].classList.add('is-active');
      active = 0;
    }

    // Acessibilidade básica
    slides.forEach(function (s) {
      s.setAttribute('role', 'group');
    });

    showSlide(slides, active);
    wireButtons();
    window.addEventListener('keydown', onKeyDown);
  }

  // Use defer or DOMContentLoaded for safety
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
