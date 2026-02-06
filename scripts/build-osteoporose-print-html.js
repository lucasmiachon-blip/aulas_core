#!/usr/bin/env node
/**
 * Regenera OSTEOPOROSE/src/print.html a partir dos slides em slides/
 * - Mesma fonte que o index (slide-loader): sempre em sync, UTF-8, sem mojibakes
 * - Configuração alinhada ao viewer: 1600×900 (16.667in × 9.375in)
 * Uso: node scripts/build-osteoporose-print-html.js
 *
 * ASSISTENTES DE IA: Antes de modificar, leia scripts/AI-RESTRICTIONS.md.
 * Não remova a geração a partir de _list.txt nem a configuração 16:9.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SLIDES_DIR = path.join(ROOT, 'OSTEOPOROSE', 'src', 'slides');
const LIST_FILE = path.join(SLIDES_DIR, '_list.txt');
const META_FILE = path.join(SLIDES_DIR, '_meta.json');
const OUT_FILE = path.join(ROOT, 'OSTEOPOROSE', 'src', 'print.html');

/** Valida _list.txt vs _meta.json e arquivos em disco. Sai com código 1 se inconsistente. */
function validateListMetaAndFiles(files) {
  let meta = [];
  try {
    meta = JSON.parse(fs.readFileSync(META_FILE, 'utf8'));
  } catch (e) {
    console.error('ERRO: _meta.json não encontrado ou inválido.', e.message);
    process.exit(1);
  }
  if (meta.length !== files.length) {
    console.error(
      'ERRO: _list.txt tem',
      files.length,
      'itens; _meta.json tem',
      meta.length,
      '. Mantenha em sync (rename-osteoporose-slides-by-order.js).'
    );
    process.exit(1);
  }
  for (let i = 0; i < files.length; i++) {
    if (meta[i].file !== files[i]) {
      console.error('ERRO: Ordem divergente em índice', i + 1, '- list:', files[i], 'meta:', meta[i].file);
      process.exit(1);
    }
  }
  for (const file of files) {
    const filePath = path.join(SLIDES_DIR, file);
    if (!fs.existsSync(filePath)) {
      console.error('ERRO: Arquivo da lista não encontrado:', file);
      process.exit(1);
    }
  }
}

const printHead = (count) => `<!DOCTYPE html>
<!--
  print.html: gerado por build-osteoporose-print-html.js a partir dos slides.
  Mesma fonte que o index (sync, UTF-8). Para PDF: index.html?print=1 é preferido.
-->
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Osteoporose - ${count} slides</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>:root {
  --bg: #F9F8F4; --white: #FFFFFF; --navy: #0B1320; --gold: #DDB944; --gold-dark: #A07D1C;
  --teal: #1F766E; --blue: #2563EB; --text: #222222; --muted: #666666;
  --border: #E9ECEF;
  --text-rgb: 34,34,34; --muted-rgb: 102,102,102; --border-rgb: 233,236,239;
  --bg-rgb: 249,248,244; --navy-rgb: 11,19,32; --gold-rgb: 221,185,68; --gold-dark-rgb: 160,125,28;
  --teal-rgb: 31,118,110; --blue-rgb: 37,99,235;
  --stage-w: 1600; --stage-h: 900;
  --font-sans: "Inter", system-ui, sans-serif;
  --font-serif: Georgia, "Times New Roman", Times, serif;
}
*,*::before,*::after{box-sizing:border-box}
html,body{margin:0;padding:0}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:var(--font-sans);color:var(--text);background:#E5E5E5;line-height:1.4}
h1,h2,h3{font-family:var(--font-sans);color:var(--navy);margin:0 0 .6rem}
p{margin:0 0 .8rem}
.slides-container{max-width:100%;margin:0 auto;padding:20px 0}
.slide{
  display:block!important;
  width:1600px!important;height:900px!important;
  min-height:900px!important;max-height:900px!important;
  margin:0 auto 24px!important;
  overflow:hidden!important;position:relative!important;
  border:none!important;border-radius:0!important;
  box-shadow:none!important;
  page-break-after:always!important;break-after:page!important;
  page-break-inside:avoid!important;break-inside:avoid!important;
}
/* Capa (1º) e contracapa (2º = Rilke): navy. Demais slides: fundo padrão. */
.slide:not(:first-child):not(:nth-child(2)){background:var(--bg)!important}
.slide:first-child,.slide:nth-child(2){
  background:linear-gradient(135deg, var(--navy) 0%, rgba(var(--navy-rgb), 0.88) 50%, rgba(var(--navy-rgb), 0.78) 100%)!important;
  display:flex!important;align-items:center!important;justify-content:center!important;padding:0!important;
}
.slide:last-child{page-break-after:auto!important;break-after:auto!important;margin-bottom:0!important}
.slide[hidden]{display:block!important}
/* Slide 8 (Utilidade): forçar grid 2 colunas para régua + 4 caixas lado a lado no print */
#utilidade-grid,.utilidade-grid{display:grid!important;grid-template-columns:300px minmax(0,1fr)!important;gap:24px!important;align-items:start!important;width:100%!important}
/* polish.css sync: fonte/referência footer fixo */
.slide__source,.slide .source,.slide [data-role="source"]{position:absolute!important;bottom:20px!important;left:48px!important;right:48px!important;margin:0!important}
.slide>p:last-of-type[style*="font-style: italic"]{position:absolute!important;bottom:20px!important;left:48px!important;right:48px!important;margin:0!important}
/* polish.css sync: proteção texto longo */
.slide p,.slide h1,.slide h2,.slide h3,.slide span{word-wrap:break-word;overflow-wrap:break-word}
@media print{
  @page{size:16.667in 9.375in;margin:0}
  body{background:white!important;overflow:hidden!important}
  html{overflow:hidden!important}
  .slides-container{padding:0!important;margin:0!important;max-width:none!important;overflow:hidden!important}
  .slide{width:16.667in!important;height:9.375in!important;min-height:9.375in!important;max-height:9.375in!important;overflow:hidden!important;margin:0!important;padding:0!important;border:none!important;box-shadow:none!important;page-break-after:always!important;break-after:page!important;page-break-inside:avoid!important;break-inside:avoid!important;box-sizing:border-box!important;isolation:isolate!important;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}
  .slide:first-child{page-break-before:auto!important;break-before:auto!important}
  .slide:last-child{page-break-after:auto!important;break-after:auto!important}
}</style>
</head>
<body>
<div class="slides-container">
`;

const PRINT_TAIL = `
</div>
</body>
</html>
`;

function main() {
  const listRaw = fs.readFileSync(LIST_FILE, 'utf8');
  const files = listRaw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#') && l.endsWith('.html'));

  validateListMetaAndFiles(files);

  const sections = [];
  for (const file of files) {
    const filePath = path.join(SLIDES_DIR, file);
    const html = fs.readFileSync(filePath, 'utf8');
    sections.push(html.trim());
  }

  const out = printHead(sections.length) + sections.join('\n\n') + PRINT_TAIL;
  fs.writeFileSync(OUT_FILE, out, 'utf8');
  console.log('OK:', OUT_FILE, '|', sections.length, 'slides');
}

main();
