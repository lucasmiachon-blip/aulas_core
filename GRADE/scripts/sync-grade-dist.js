/**
 * Script para sincronizar GRADE/src/index.html com GRADE/dist/index.html
 * 
 * Este script:
 * 1. Copia src/index.html para dist/index.html
 * 2. Ajusta os caminhos relativos (../src/ -> ./src/)
 * 3. Garante que os scripts JS estejam corretos
 */

const fs = require('fs');
const path = require('path');

// Repo structure is unified: GRADE/ (no nested GRADE/GRADE)
const srcPath = path.join(__dirname, '..', 'src', 'index.html');
const distPath = path.join(__dirname, '..', 'dist', 'index.html');

console.log('🔄 Sincronizando GRADE/src/index.html → GRADE/dist/index.html...');

// Ler arquivo src
let content = fs.readFileSync(srcPath, 'utf8');

// Ajustar caminhos relativos para dist:
// ./css/ -> ../src/css/ (CSS está em GRADE/src/css/, não em GRADE/dist/)
// ./js/ -> ../src/js/ (JS está em GRADE/src/js/, não em GRADE/dist/)
// ./slides/ -> ../src/slides/ (Slides estão em GRADE/src/slides/, não em GRADE/dist/)
content = content.replace(/href="\.\/css\//g, 'href="../src/css/');
content = content.replace(/href="\.\/js\//g, 'href="../src/js/');
content = content.replace(/src="\.\/css\//g, 'src="../src/css/');
content = content.replace(/src="\.\/js\//g, 'src="../src/js/');
content = content.replace(/\.\/slides\//g, '../src/slides/');

// Verificar se o script slides-simple.js está presente
if (!content.includes('slides-simple.js')) {
  console.warn('⚠️  Aviso: slides-simple.js não encontrado no HTML!');
} else {
  console.log('✅ slides-simple.js encontrado');
}

// Ensure dist dir exists
fs.mkdirSync(path.dirname(distPath), { recursive: true });

// Escrever em dist
fs.writeFileSync(distPath, content, 'utf8');

console.log('✅ Sincronização concluída!');
console.log(`📄 Arquivo atualizado: ${distPath}`);
