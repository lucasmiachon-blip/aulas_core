/**
 * Script para atualizar lista de slides no slide-loader.js
 * Detecta automaticamente quais slides existem e atualiza o array
 */

const fs = require('fs');
const path = require('path');

const slidesDir = path.join(__dirname, '..', 'GRADE', 'src', 'slides');
const loaderPath = path.join(__dirname, '..', 'GRADE', 'src', 'js', 'slide-loader.js');

console.log('🔍 Detectando slides existentes...\n');

// Ler arquivos de slides
const existingSlides = fs.readdirSync(slidesDir)
    .filter(f => f.match(/^S\d{2}\.html$/))
    .sort();

console.log(`📊 Slides encontrados: ${existingSlides.length}`);
console.log(`   ${existingSlides.join(', ')}\n`);

// Ler slide-loader.js
let loaderContent = fs.readFileSync(loaderPath, 'utf8');

// Extrair array de slides atual
const arrayMatch = loaderContent.match(/const slideFiles = \[([\s\S]*?)\];/);
if (!arrayMatch) {
    console.error('❌ Não encontrou array slideFiles no slide-loader.js');
    process.exit(1);
}

// Criar novo array com slides existentes
const newArray = existingSlides.map(file => `        '${file}'`).join(',\n');
const newSlideFilesArray = `const slideFiles = [\n${newArray}\n    ];`;

// Substituir array no arquivo
loaderContent = loaderContent.replace(
    /const slideFiles = \[[\s\S]*?\];/,
    newSlideFilesArray
);

// Salvar arquivo
fs.writeFileSync(loaderPath, loaderContent, 'utf8');

console.log(`✅ slide-loader.js atualizado com ${existingSlides.length} slides\n`);

// Atualizar contador no index.html
const indexPath = path.join(__dirname, '..', 'GRADE', 'src', 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Atualizar totalSlides
indexContent = indexContent.replace(
    /<span id="totalSlides">\d+<\/span>/,
    `<span id="totalSlides">${existingSlides.length}</span>`
);

fs.writeFileSync(indexPath, indexContent, 'utf8');

console.log(`✅ index.html atualizado: totalSlides = ${existingSlides.length}\n`);

// Validar
if (existingSlides.length !== 42) {
    console.warn(`⚠️  ATENÇÃO: Esperava 42 slides, encontrou ${existingSlides.length}`);
    console.warn(`   Se você deletou um slide, isso está correto.`);
    console.warn(`   Se não deletou, verifique qual slide está faltando.\n`);
}

console.log('🎉 Processo concluído!');
