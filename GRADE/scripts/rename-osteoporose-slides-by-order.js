#!/usr/bin/env node
/**
 * Renomeia os slides da pasta OSTEOPOROSE/src/slides segundo a ordem (1-73):
 *   - Nome: S01_slide-01.html ... S73_slide-73.html
 *   - Adiciona no início de cada arquivo um comentário invisível: <!-- N. Título -->
 * Atualiza _list.txt e _meta.json. Não altera id/data-title dentro do <section> (evita quebrar viewer).
 * Uso: node scripts/rename-osteoporose-slides-by-order.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SLIDES_DIR = path.join(ROOT, 'OSTEOPOROSE', 'src', 'slides');
const LIST_FILE = path.join(SLIDES_DIR, '_list.txt');
const META_FILE = path.join(SLIDES_DIR, '_meta.json');

function pad(n) {
  return n < 10 ? '0' + n : String(n);
}

/** Escapa título para uso dentro de comentário HTML (evitar -- no meio). */
function commentSafeTitle(title) {
  return (title || '').replace(/--/g, ' - ');
}

/** Extrai data-title do primeiro <section> do HTML. */
function getTitleFromHtml(html) {
  const m = html.match(/data-title="([^"]*)"/);
  return m ? m[1] : '';
}

function main() {
  const listRaw = fs.readFileSync(LIST_FILE, 'utf8');
  const files = listRaw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#') && l.endsWith('.html'));

  let meta = [];
  try {
    meta = JSON.parse(fs.readFileSync(META_FILE, 'utf8'));
  } catch (e) {
    console.warn('_meta.json não encontrado ou inválido, usando títulos do HTML');
  }
  const fileToMeta = {};
  meta.forEach((entry) => {
    if (entry.file) fileToMeta[entry.file] = entry;
  });

  const commentPrefix = '<!-- ';
  const commentSuffix = ' -->';

  for (let i = 0; i < files.length; i++) {
    const order = i + 1;
    const oldFile = files[i];
    const nn = order <= 73 ? pad(order) : String(order);
    const newFile = 'S' + pad(order) + '_slide-' + nn + '.html';
    const filePath = path.join(SLIDES_DIR, oldFile);

    if (!fs.existsSync(filePath)) {
      console.warn('Skip (not found):', oldFile);
      continue;
    }

    let html = fs.readFileSync(filePath, 'utf8');
    const entry = fileToMeta[oldFile];
    let title = entry ? entry.title : getTitleFromHtml(html);
    if (!title) title = 'Slide ' + order;

    const commentLine = commentPrefix + order + '. ' + commentSafeTitle(title) + commentSuffix + '\n';
    if (!html.trimStart().startsWith(commentPrefix)) {
      html = commentLine + html;
    }

    const newPath = path.join(SLIDES_DIR, newFile);
    fs.writeFileSync(newPath, html, 'utf8');
    if (oldFile !== newFile) {
      fs.unlinkSync(filePath);
    }
    files[i] = newFile;

    if (entry) {
      entry.file = newFile;
      entry.id = 'slide-' + nn;
    } else {
      meta.push({ n: order, id: 'slide-' + nn, title: title, file: newFile });
    }
  }

  const listHeader = `# Lista de slides - Osteoporose
# 73 slides total (ordem 1-73, nomes S01_slide-01.html ... S73_slide-73.html)
# Gerado por rename-osteoporose-slides-by-order.js
`;
  fs.writeFileSync(LIST_FILE, listHeader + files.join('\n') + '\n', 'utf8');

  fs.writeFileSync(META_FILE, JSON.stringify(meta, null, 2) + '\n', 'utf8');

  // Validação pós-escrita: evita propagar erro (build e index dependem de _list + _meta em sync)
  const listRaw2 = fs.readFileSync(LIST_FILE, 'utf8');
  const files2 = listRaw2
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#') && l.endsWith('.html'));
  const meta2 = JSON.parse(fs.readFileSync(META_FILE, 'utf8'));
  if (meta2.length !== files2.length) {
    console.error('ERRO: após escrita, _list tem', files2.length, 'itens e _meta', meta2.length);
    process.exit(1);
  }
  for (let i = 0; i < files2.length; i++) {
    if (meta2[i].file !== files2[i]) {
      console.error('ERRO: após escrita, ordem divergente em índice', i + 1);
      process.exit(1);
    }
    const fp = path.join(SLIDES_DIR, files2[i]);
    if (!fs.existsSync(fp)) {
      console.error('ERRO: arquivo da lista não existe:', files2[i]);
      process.exit(1);
    }
  }

  console.log('OK: renomeados', files.length, 'slides; _list.txt e _meta.json atualizados e validados.');
  console.log('Execute: node scripts/build-osteoporose-print-html.js');
}

main();
