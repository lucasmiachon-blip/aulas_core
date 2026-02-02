(() => {
  const slides = [...document.querySelectorAll('.slide')].slice(0, 10);
  const tops = slides.map(s => Math.round(s.getBoundingClientRect().top));
  const lefts = slides.map(s => Math.round(s.getBoundingClientRect().left));
  console.log({ tops, lefts, scrollW: document.documentElement.scrollWidth, vw: innerWidth });
})();
