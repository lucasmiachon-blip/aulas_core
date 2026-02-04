const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

// Build a 16:9 PPTX where each slide is a full-bleed image.
// Source images are expected to be 1920x1080 JPGs.

const IMG_DIR = process.env.IMG_DIR || path.join(__dirname, '..', 'pptx_imgs');
const OUT_PATH = process.env.OUT_PATH || path.join(__dirname, 'OSTEOPOROSE-slides_16x9.pptx');

function main() {
  if (!fs.existsSync(IMG_DIR)) {
    throw new Error(`IMG_DIR not found: ${IMG_DIR}`);
  }

  const files = fs.readdirSync(IMG_DIR)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

  if (files.length === 0) {
    throw new Error(`No images found in ${IMG_DIR}`);
  }

  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'OSTEOPOROSE (HTML export)';

  // Wide: 13.333 x 7.5 inches
  const W = 13.333;
  const H = 7.5;

  for (const f of files) {
    const slide = pptx.addSlide();
    const p = path.join(IMG_DIR, f);
    slide.addImage({ path: p, x: 0, y: 0, w: W, h: H });
  }

  pptx.writeFile({ fileName: OUT_PATH });
  console.log(`✅ PPTX written: ${OUT_PATH} (${files.length} slides)`);
}

main();
