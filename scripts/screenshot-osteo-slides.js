/**
 * screenshot-osteo-slides.js
 * Screenshot specific OSTEOPOROSE slides for QA.
 * Usage: node scripts/screenshot-osteo-slides.js S03 S04
 */
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OSTEO_SRC = path.join(__dirname, '..', 'OSTEOPOROSE', 'src');
const CSS_DIR = path.join(OSTEO_SRC, 'css');
const SLIDES_DIR = path.join(OSTEO_SRC, 'slides');
const OUT_DIR = path.join(__dirname, '..', 'screenshots', 'OSTEOPOROSE');

const slideIds = process.argv.slice(2);
if (!slideIds.length) {
  console.error('Usage: node scripts/screenshot-osteo-slides.js S03 S04');
  process.exit(1);
}

function readFile(p) {
  return fs.readFileSync(p, 'utf-8');
}

function toDataURI(filePath) {
  const ext = path.extname(filePath).toLowerCase().replace('.', '');
  const mime =
    {
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      svg: 'image/svg+xml',
      gif: 'image/gif',
      webp: 'image/webp',
    }[ext] || 'application/octet-stream';
  return `data:${mime};base64,${fs.readFileSync(filePath).toString('base64')}`;
}

function embedImages(html) {
  return html.replace(/src=["'](\.\.\/(assets\/[^"']+))["']/g, (m, rel, asset) => {
    const abs = path.join(OSTEO_SRC, asset);
    return fs.existsSync(abs) ? `src="${toDataURI(abs)}"` : m;
  });
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  // Read CSS
  const cssFiles = ['base.css', 'viewer.css', 'blocks.css', 'polish.css', 'print.css'].filter((f) =>
    fs.existsSync(path.join(CSS_DIR, f))
  );
  let css = cssFiles.map((f) => readFile(path.join(CSS_DIR, f))).join('\n');

  const browser = await chromium.launch({ headless: true });
  // Match viewer dimensions: --stage-w: 1600, --stage-h: 900
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 900 } });

  for (const id of slideIds) {
    // Find file (pattern: S03_slide-03.html or S03.html)
    const candidates = fs.readdirSync(SLIDES_DIR).filter((f) => f.startsWith(id) && f.endsWith('.html'));
    if (!candidates.length) {
      console.warn(`  Skip ${id}: not found`);
      continue;
    }

    let html = readFile(path.join(SLIDES_DIR, candidates[0]));
    html = embedImages(html);

    const fullHTML = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0;}
html,body{width:1600px;height:900px;overflow:hidden;background:#F9F8F4;}
${css}
.slide{position:relative!important;width:1600px!important;height:900px!important;overflow:hidden!important;display:block!important;}
.slide.slide--center{display:flex!important;align-items:center!important;justify-content:center!important;}
</style></head><body>${html}</body></html>`;

    const page = await ctx.newPage();
    await page.setContent(fullHTML, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    const shotPath = path.join(OUT_DIR, `${id}.png`);
    await page.screenshot({ path: shotPath, fullPage: false });
    await page.close();
    console.log(`  ${id} -> ${shotPath}`);
  }

  await browser.close();
  console.log('Done!');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
