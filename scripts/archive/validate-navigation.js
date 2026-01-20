/**
 * Script para validar navegação dos slides
 * Verifica data-slide-id, atributos hidden/skip, e estrutura
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validando navegação dos slides...\n');

const slidesDir = path.join(__dirname, '..', 'GRADE', 'src', 'slides');
const files = fs.readdirSync(slidesDir)
    .filter(f => f.match(/^S\d{2}\.html$/))
    .sort();

console.log(`📊 Total de arquivos: ${files.length}\n`);

const issues = [];

files.forEach((file, index) => {
    const filepath = path.join(slidesDir, file);
    const content = fs.readFileSync(filepath, 'utf8');
    
    const expectedNum = String(index + 1).padStart(2, '0');
    const expectedId = `S${expectedNum}`;
    
    // Verificar data-slide-id
    const hasDataSlideId = /data-slide-id="([^"]+)"/.test(content);
    const dataSlideIdMatch = content.match(/data-slide-id="([^"]+)"/);
    const actualId = dataSlideIdMatch ? dataSlideIdMatch[1] : null;
    
    if (!hasDataSlideId) {
        issues.push({
            file,
            problem: 'FALTA data-slide-id',
            severity: 'CRÍTICO'
        });
        console.log(`❌ ${file}: FALTA data-slide-id`);
    } else if (actualId !== expectedId) {
        issues.push({
            file,
            problem: `ID errado: tem "${actualId}", deveria ser "${expectedId}"`,
            severity: 'ERRO'
        });
        console.log(`⚠️  ${file}: ID errado (${actualId} ≠ ${expectedId})`);
    } else {
        console.log(`✅ ${file}: OK (${actualId})`);
    }
    
    // Verificar se tem hidden/skip
    if (/hidden|data-skip|display:\s*none/.test(content)) {
        issues.push({
            file,
            problem: 'Slide pode estar oculto (hidden/skip/display:none)',
            severity: 'AVISO'
        });
        console.log(`⚠️  ${file}: Pode estar oculto`);
    }
    
    // Verificar estrutura básica
    if (!content.includes('<section') || !content.includes('class="slide')) {
        issues.push({
            file,
            problem: 'Estrutura HTML inválida (falta <section class="slide")',
            severity: 'CRÍTICO'
        });
        console.log(`❌ ${file}: Estrutura HTML inválida`);
    }
});

console.log('\n═══════════════════════════════════════════════════════════');
console.log('📊 RESUMO');
console.log('═══════════════════════════════════════════════════════════');
console.log(`Total de arquivos: ${files.length}`);
console.log(`Problemas críticos: ${issues.filter(i => i.severity === 'CRÍTICO').length}`);
console.log(`Erros: ${issues.filter(i => i.severity === 'ERRO').length}`);
console.log(`Avisos: ${issues.filter(i => i.severity === 'AVISO').length}`);

if (issues.length === 0) {
    console.log('\n✅ TUDO OK! Problema não é nos arquivos de slides.');
    console.log('   → Verificar navigation.js e slide-core.js');
} else {
    console.log('\n❌ PROBLEMAS ENCONTRADOS:');
    issues.forEach(i => {
        console.log(`   [${i.severity}] ${i.file}: ${i.problem}`);
    });
}

// Mostrar estatísticas detalhadas
const criticalIssues = issues.filter(i => i.severity === 'CRÍTICO');
if (criticalIssues.length > 0) {
    console.log('\n🔧 CORREÇÕES NECESSÁRIAS:');
    criticalIssues.forEach(i => {
        if (i.problem.includes('FALTA data-slide-id')) {
            const slideNum = i.file.match(/S(\d{2})\.html/)[1];
            console.log(`   - Adicionar data-slide-id="S${slideNum}" em ${i.file}`);
        }
    });
}
