(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const n = slides.length, vw = innerWidth;
  const pick = new Set();
  while (pick.size < Math.min(20, n)) pick.add(Math.floor(Math.random() * n));

  const rows = [...pick].sort((a,b)=>a-b).map(i => {
    const r = slides[i].getBoundingClientRect();
    return { i, w: Math.round(r.width), left: Math.round(r.left), right: Math.round(r.right), vw,
      fitsWidth: (r.left >= -1) && (r.right <= vw + 1) };
  });

  console.table(rows);
})();
