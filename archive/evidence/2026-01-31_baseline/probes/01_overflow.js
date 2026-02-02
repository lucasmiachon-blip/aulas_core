(() => {
  const vw = innerWidth;
  let worst = null;

  document.querySelectorAll('*').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width && r.height && r.right > vw + 2) {
      if (!worst || r.right > worst.r.right) worst = { el, r };
    }
  });

  console.log({ vw, scrollW: document.documentElement.scrollWidth });
  if (worst) console.log('worst overflow:', worst.el, worst.r);
  else console.log('no overflow culprits found');
})();
