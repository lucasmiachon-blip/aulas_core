const fs = require('fs');
const path = require('path');

const listFile = 'OSTEOPOROSE/src/slides/_list.txt';
const cssFile = 'OSTEOPOROSE/src/css/base.css';
const outFile = 'OSTEOPOROSE/src/print-clean.html';

const files = fs.readFileSync(listFile, 'utf8')
  .split(/\r?\n/)
  .map(l => l.trim())
  .filter(l => l && !l.startsWith('#'));

const css = fs.readFileSync(cssFile, 'utf8');

let html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Osteoporose - ${files.length} slides</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
${css}
/* Minimal print styles - NO !important */
body { margin: 0; padding: 20px; background: #ccc; }
.slide { 
  width: 1600px; 
  height: 900px; 
  margin: 0 auto 20px;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
</head>
<body>
`;

for (const file of files) {
  const content = fs.readFileSync(path.join('OSTEOPOROSE/src/slides', file), 'utf8');
  html += content + '\n';
}

html += '</body></html>';
fs.writeFileSync(outFile, html);
console.log('OK:', outFile, '|', files.length, 'slides');
