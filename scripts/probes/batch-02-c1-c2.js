(() => {
  const tol = 2;
  const slide = document.querySelector('.slide.is-active, .slide.active');
  if (!slide) {
    return null;
  }
  const slideRect = slide.getBoundingClientRect();

  const scrollW = document.documentElement.scrollWidth;
  const innerW = window.innerWidth;
  const c1Pass = scrollW <= innerW + tol;

  const violations = [];
  const isRelevant = (el) => {
    if (!el) return false;
    if (el === slide) return false;
    if (el.classList && el.classList.contains('slide__source')) return false;
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return false;
    return true;
  };

  slide.querySelectorAll('*').forEach(el => {
    if (!isRelevant(el)) return;
    const r = el.getBoundingClientRect();
    const overLeft = r.left < slideRect.left - tol;
    const overTop = r.top < slideRect.top - tol;
    const overRight = r.right > slideRect.right + tol;
    const overBottom = r.bottom > slideRect.bottom + tol;
    if (overLeft || overTop || overRight || overBottom) {
      violations.push({
        tag: el.tagName.toLowerCase(),
        className: el.className || '',
        id: el.id || '',
        rect: {
          left: Math.round(r.left),
          top: Math.round(r.top),
          right: Math.round(r.right),
          bottom: Math.round(r.bottom),
          width: Math.round(r.width),
          height: Math.round(r.height)
        }
      });
    }
  });

  const c2Pass = violations.length === 0;
  return JSON.stringify({
    c1: { pass: c1Pass, scrollW, innerW, tol },
    c2: { pass: c2Pass, tol, violations }
  });
})();
