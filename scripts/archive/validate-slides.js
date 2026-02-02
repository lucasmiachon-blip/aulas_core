/**
 * Script para validar slides extraídos
 * Verifica quantidade, tamanhos e conteúdo
 */

const fs = require('fs');
const path = require('path');

const slidesDir = path.join(__dirname, '..', 'GRADE', 'src', 'slides');
const originalBackup = path.join(__dirname, '..', 'GRADE', 'src', 'index-original-backup.html');

console.log('🔍 Validando slides extraídos...\n');

// Contar arquivos de slides
const slideFiles = fs.readdirSync(slidesDir)
    .filter(f => f.match(/^S\d{2}\.html$/))
    .sort();

console.log(`📊 Total de slides encontrados: ${slideFiles.length}`);

if (slideFiles.length !== 42) {
    console.error(`❌ ERRO: Esperava 42 slides, encontrou ${slideFiles.length}`);
    process.exit(1);
}

// Analisar tamanhos
const slideSizes = slideFiles.map(file => {
    const filePath = path.join(slidesDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    return {
        file,
        size: content.length,
        lines: content.split('\n').length,
        isEmpty: content.trim().length < 50
    };
});

console.log('\n📏 Top 5 menores slides:');
slideSizes
    .sort((a, b) => a.size - b.size)
    .slice(0, 5)
    .forEach(s => {
        const status = s.isEmpty ? '⚠️ VAZIO!' : '✅';
        console.log(`  ${status} ${s.file}: ${s.size} chars (${s.lines} linhas)`);
    });

console.log('\n📏 Top 5 maiores slides:');
slideSizes
    .sort((a, b) => b.size - a.size)
    .slice(0, 5)
    .forEach(s => {
        console.log(`  ✅ ${s.file}: ${s.size} chars (${s.lines} linhas)`);
    });

// Verificar se há slides vazios ou muito pequenos
const emptySlides = slideSizes.filter(s => s.isEmpty);
if (emptySlides.length > 0) {
    console.error(`\n❌ ERRO: ${emptySlides.length} slides vazios ou muito pequenos:`);
    emptySlides.forEach(s => console.error(`  - ${s.file}`));
    process.exit(1);
}

// Comparar com original
if (fs.existsSync(originalBackup)) {
    console.log('\n📖 Comparando com original...');
    const originalContent = fs.readFileSync(originalBackup, 'utf8');
    const originalSlideCount = (originalContent.match(/<section[^>]*class="[^"]*slide[^"]*"[^>]*>/gi) || []).length;
    console.log(`   Original: ${originalSlideCount} slides`);
    console.log(`   Extraídos: ${slideFiles.length} slides`);
    
    if (originalSlideCount === slideFiles.length) {
        console.log('   ✅ Quantidade compatível!');
    } else {
        console.error(`   ❌ ERRO: Quantidade não confere!`);
        process.exit(1);
    }
    
    // Calcular tamanho total
    const totalExtractedSize = slideSizes.reduce((sum, s) => sum + s.size, 0);
    const originalSize = originalContent.length;
    const ratio = (totalExtractedSize / originalSize * 100).toFixed(1);
    
    console.log(`\n📦 Tamanhos:`);
    console.log(`   Original: ${originalSize.toLocaleString()} chars`);
    console.log(`   Extraídos: ${totalExtractedSize.toLocaleString()} chars`);
    console.log(`   Ratio: ${ratio}% (esperado ~80-90% devido a remoção de <head>, etc)`);
}

console.log('\n✅ Validação concluída! Todos os slides estão OK.');
console.log(`\n📋 Lista completa:`);
slideFiles.forEach((file, i) => {
    const size = slideSizes.find(s => s.file === file);
    console.log(`  ${String(i + 1).padStart(2, ' ')}. ${file} (${size.size.toLocaleString()} chars)`);
});
