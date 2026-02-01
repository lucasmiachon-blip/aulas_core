/**
 * Diagnóstico de integridade dos arquivos de slides
 */
const fs = require('fs');
const path = require('path');

const SLIDES_DIR = path.join(__dirname, '..', 'OSTEOPOROSE', 'src', 'slides');

// List all S*.html files
const files = fs.readdirSync(SLIDES_DIR)
  .filter(f => f.startsWith('S') && f.endsWith('.html'))
  .sort((a, b) => {
    const numA = parseInt(a.match(/^S(\d+)/)?.[1] || '0');
    const numB = parseInt(b.match(/^S(\d+)/)?.[1] || '0');
    return numA - numB;
  });

console.log('=== DIAGNÓSTICO DE SLIDES ===');
console.log('Total de arquivos encontrados:', files.length);
console.log('');

// Extract numbers from filenames
const numbersFound = new Set();
const fileMap = {};
for (const f of files) {
  const match = f.match(/^S(\d+)/);
  if (match) {
    const num = parseInt(match[1]);
    numbersFound.add(num);
    if (!fileMap[num]) fileMap[num] = [];
    fileMap[num].push(f);
  }
}

// Check for gaps
const maxNum = Math.max(...numbersFound);
const gaps = [];
for (let i = 1; i <= maxNum; i++) {
  if (!numbersFound.has(i)) {
    gaps.push(i);
  }
}

console.log('Números presentes:', [...numbersFound].sort((a, b) => a - b).join(', '));
console.log('Número máximo:', maxNum);
console.log('GAPS (números faltando):', gaps.length > 0 ? gaps.join(', ') : 'NENHUM');
console.log('Arquivos extras (mesmo número):', Object.entries(fileMap).filter(([k, v]) => v.length > 1).map(([k, v]) => `S${k}: ${v.join(', ')}`).join('; ') || 'NENHUM');
console.log('');

// Extract IDs and data-title from each file
console.log('| # | Arquivo | id="" | data-title | Status |');
console.log('|---|---------|-------|------------|--------|');

for (const file of files) {
  const filePath = path.join(SLIDES_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract id from <section
  const idMatch = content.match(/<section[^>]*\s+id="([^"]+)"/);
  const id = idMatch ? idMatch[1] : 'N/A';
  
  // Extract data-title
  const titleMatch = content.match(/data-title="([^"]+)"/);
  const title = titleMatch ? titleMatch[1].substring(0, 40) + (titleMatch[1].length > 40 ? '...' : '') : 'N/A';
  
  // Extract file number
  const fileNumMatch = file.match(/^S(\d+)/);
  const fileNum = fileNumMatch ? parseInt(fileNumMatch[1]) : null;
  
  // Extract id number
  const idNumMatch = id.match(/slide-(\d+)/);
  const idNum = idNumMatch ? parseInt(idNumMatch[1]) : null;
  
  // Check status
  let status = '✅ OK';
  if (id === 'N/A') {
    status = '❌ SEM ID';
  } else if (fileNum !== null && idNum !== null && fileNum !== idNum) {
    status = `⚠️ MISMATCH (arquivo S${fileNum}, id slide-${idNum})`;
  } else if (fileNum !== null && idNum === null) {
    status = `⚠️ ID NÃO-NUMÉRICO: ${id}`;
  }
  
  console.log(`| ${fileNum || '?'} | ${file} | ${id} | ${title} | ${status} |`);
}

console.log('');
console.log('=== FIM DO DIAGNÓSTICO ===');
