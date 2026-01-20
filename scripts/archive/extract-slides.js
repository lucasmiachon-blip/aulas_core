/**
 * Script para extrair slides de GRADE/src/index.html
 * Cria arquivos individuais em GRADE/src/slides/
 */

const fs = require('fs');
const path = require('path');

const srcHtmlPath = path.join(__dirname, '..', 'GRADE', 'src', 'index.html');
const slidesDir = path.join(__dirname, '..', 'GRADE', 'src', 'slides');

// Criar pasta slides se não existir
if (!fs.existsSync(slidesDir)) {
    fs.mkdirSync(slidesDir, { recursive: true });
    console.log('📁 Pasta slides/ criada');
}

// Ler HTML
console.log('📖 Lendo GRADE/src/index.html...');
const html = fs.readFileSync(srcHtmlPath, 'utf8');

// Regex para encontrar cada <section class="slide">...</section>
// Usa regex não-guloso para capturar até o próximo </section>
const slideRegex = /<section\s+class="slide[^"]*"[^>]*>[\s\S]*?<\/section>/gi;

const matches = html.match(slideRegex);

if (!matches || matches.length === 0) {
    console.error('❌ Nenhum slide encontrado!');
    process.exit(1);
}

console.log(`✅ Encontrados ${matches.length} slides`);

// Extrair cada slide
const slideFiles = [];
matches.forEach((slideHtml, index) => {
    const slideNumber = index + 1;
    const fileName = `S${String(slideNumber).padStart(2, '0')}.html`;
    const filePath = path.join(slidesDir, fileName);
    
    // Salvar slide (preservar todo o conteúdo)
    fs.writeFileSync(filePath, slideHtml.trim(), 'utf8');
    slideFiles.push(fileName);
    
    console.log(`  ✓ ${fileName} criado`);
});

// Criar lista de slides para o loader
const loaderList = slideFiles.map(file => `    '${file}'`).join(',\n');

console.log('\n✅ Extração concluída!');
console.log(`📊 Total: ${slideFiles.length} slides extraídos`);
console.log(`📁 Pasta: ${slidesDir}`);

// Salvar lista de slides para referência
const listPath = path.join(slidesDir, '_list.txt');
fs.writeFileSync(listPath, slideFiles.join('\n'), 'utf8');
console.log(`📝 Lista salva em: ${listPath}`);

// Mostrar preview da lista para o loader
console.log('\n📋 Lista para slide-loader.js:');
console.log('[');
console.log(loaderList);
console.log(']');
