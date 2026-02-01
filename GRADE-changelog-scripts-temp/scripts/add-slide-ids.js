/**
 * Script para adicionar data-slide-id em todos os slides
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Adicionando data-slide-id em todos os slides...\n');

const slidesDir = path.join(__dirname, '..', 'GRADE', 'src', 'slides');
const files = fs.readdirSync(slidesDir)
    .filter(f => f.match(/^S\d{2}\.html$/))
    .sort();

let fixed = 0;
let skipped = 0;

files.forEach((file, index) => {
    const filepath = path.join(slidesDir, file);
    let content = fs.readFileSync(filepath, 'utf8');
    
    const slideNum = String(index + 1).padStart(2, '0');
    const expectedId = `S${slideNum}`;
    
    // Verificar se já tem data-slide-id
    if (/data-slide-id="([^"]+)"/.test(content)) {
        const match = content.match(/data-slide-id="([^"]+)"/);
        if (match[1] === expectedId) {
            console.log(`⏭️  ${file}: já tem data-slide-id correto (${expectedId})`);
            skipped++;
            return;
        } else {
            // Substituir ID errado
            content = content.replace(/data-slide-id="[^"]+"/, `data-slide-id="${expectedId}"`);
            console.log(`🔄 ${file}: corrigido ID para ${expectedId}`);
        }
    } else {
        // Adicionar data-slide-id na tag <section>
        // Procurar por <section class="slide" ou <section class="slide active"
        if (content.includes('<section class="slide')) {
            content = content.replace(
                /(<section\s+class="slide[^"]*")([^>]*>)/,
                `$1 data-slide-id="${expectedId}"$2`
            );
            console.log(`✅ ${file}: adicionado data-slide-id="${expectedId}"`);
            fixed++;
        } else {
            console.error(`❌ ${file}: não encontrou <section class="slide"`);
            return;
        }
    }
    
    // Salvar arquivo modificado
    fs.writeFileSync(filepath, content, 'utf8');
});

console.log('\n═══════════════════════════════════════════════════════════');
console.log('📊 RESUMO');
console.log('═══════════════════════════════════════════════════════════');
console.log(`Total de arquivos: ${files.length}`);
console.log(`✅ Corrigidos: ${fixed}`);
console.log(`⏭️  Já corretos: ${skipped}`);
console.log(`\n🎉 Processo concluído!`);
