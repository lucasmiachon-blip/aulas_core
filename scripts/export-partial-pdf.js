#!/usr/bin/env node
/**
 * Gera PDF parcial a partir do print.html (sem servidor).
 * Uso: node scripts/export-partial-pdf.js <projeto> <maxSlides>
 * Ex:  node scripts/export-partial-pdf.js OSTEOPOROSE 50
 *      node scripts/export-partial-pdf.js GRADE 36
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const [, , projeto, maxStr] = process.argv;
if (!projeto || !maxStr) {
  console.error('Uso: node scripts/export-partial-pdf.js <OSTEOPOROSE|GRADE> <maxSlides>');
  process.exit(1);
}
const maxSlides = parseInt(maxStr, 10);

function resolveChromiumExecutable() {
  const fromEnv = process.env.CHROMIUM_PATH || process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
  if (fromEnv) return fromEnv;
  try {
    const p = execSync(
      'command -v chromium || command -v chromium-browser || command -v google-chrome || command -v google-chrome-stable',
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    ).trim();
    return p || null;
  } catch {
    return null;
  }
}

async function run() {
  let printHtmlPath;
  if (projeto.toUpperCase() === 'OSTEOPOROSE') {
    printHtmlPath = path.join(__dirname, '..', 'OSTEOPOROSE', 'src', 'print.html');
  } else if (projeto.toUpperCase() === 'GRADE') {
    // GRADE não tem print.html gerado; montar inline a partir dos slides
    printHtmlPath = null;
  } else {
    console.error('Projeto desconhecido:', projeto);
    process.exit(1);
  }

  const outputDir = path.join(__dirname, '..', 'exports');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, `${projeto.toUpperCase()}-slides-1a${maxSlides}.pdf`);

  const executablePath = resolveChromiumExecutable();
  const browser = await chromium.launch({
    headless: true,
    executablePath: executablePath || undefined,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1600, height: 900 });

  let html;
  if (printHtmlPath && fs.existsSync(printHtmlPath)) {
    html = fs.readFileSync(printHtmlPath, 'utf8');
  } else {
    // GRADE: montar HTML inline
    html = buildGradeHtml(maxSlides);
  }

  // Remover slides excedentes (manter só os primeiros N)
  // Contar <section e </section> ou .slide
  const slideRegex = /<section[^>]*class="[^"]*slide[^"]*"[^>]*>/gi;
  let count = 0;
  let cutIndex = -1;
  let match;
  while ((match = slideRegex.exec(html)) !== null) {
    count++;
    if (count === maxSlides + 1) {
      cutIndex = match.index;
      break;
    }
  }

  if (cutIndex > 0) {
    // Cortar do slide N+1 até o fim do body
    const bodyEnd = html.lastIndexOf('</body>');
    if (bodyEnd > cutIndex) {
      // Encontrar o container de fechamento correto
      const beforeCut = html.substring(0, cutIndex);
      const afterBody = html.substring(bodyEnd);
      // Fechar o container (slides-container ou viewport)
      html = beforeCut + '\n</div>\n' + afterBody;
    }
  }

  console.log(`Gerando PDF: ${projeto} slides 1-${Math.min(count, maxSlides)} → ${outputPath}`);

  // Strip external font links (podem travar)
  html = html
    .replace(/<link[^>]+rel=["']preconnect["'][^>]*>\s*/gi, '')
    .replace(/<link[^>]+href=["']https:\/\/fonts\.googleapis\.com[^"']+["'][^>]*>\s*/gi, '');

  await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.emulateMedia({ media: 'print' });

  const slideCount = await page.evaluate(() => document.querySelectorAll('.slide').length);
  console.log(`Slides no HTML: ${slideCount}`);

  await page.pdf({
    path: outputPath,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    displayHeaderFooter: false,
    preferCSSPageSize: true,
  });

  const size = fs.statSync(outputPath).size;
  console.log(`OK: ${outputPath} (${(size / 1024 / 1024).toFixed(2)} MB)`);
  await browser.close();
}

function buildGradeHtml(max) {
  const slidesDir = path.join(__dirname, '..', 'GRADE', 'src', 'slides');
  const listFile = path.join(slidesDir, '_list.txt');
  const cssDir = path.join(__dirname, '..', 'GRADE', 'src', 'css');

  let files = [];
  if (fs.existsSync(listFile)) {
    files = fs
      .readFileSync(listFile, 'utf8')
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith('#'));
  }
  files = files.slice(0, max);

  // Ler CSS
  const cssFiles = ['base.css', 'blocks.css', 'responsive-fix.css', 'print.css'];
  let css = '';
  for (const f of cssFiles) {
    const p = path.join(cssDir, f);
    if (fs.existsSync(p)) css += fs.readFileSync(p, 'utf8') + '\n';
  }

  // Ler slides
  const slides = [];
  for (const file of files) {
    const name = /\.html?$/i.test(file) ? file : file + '.html';
    const p = path.join(slidesDir, name);
    if (fs.existsSync(p)) slides.push(fs.readFileSync(p, 'utf8').trim());
  }

  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8">
<title>GRADE - ${slides.length} slides</title>
<style>${css}</style>
<style>
@media print {
  @page { size: 13.333in 7.5in; margin: 0; }
  html, body { margin:0!important; padding:0!important; overflow:hidden!important; background:white!important; }
  .controls { display:none!important; }
  #viewport { width:13.333in!important; height:auto!important; position:static!important; display:block!important; overflow:visible!important; }
  .slide { position:relative!important; inset:auto!important; display:flex!important; width:13.333in!important; height:7.5in!important; min-height:7.5in!important; max-height:7.5in!important; overflow:hidden!important; page-break-after:always!important; break-after:page!important; page-break-inside:avoid!important; break-inside:avoid!important; box-sizing:border-box!important; -webkit-print-color-adjust:exact!important; print-color-adjust:exact!important; }
  .slide:last-child { page-break-after:auto!important; }
}
</style>
</head><body>
<div id="viewport">
${slides.join('\n\n')}
</div>
</body></html>`;
}

run().catch((e) => {
  console.error('Erro:', e.message);
  process.exit(1);
});
