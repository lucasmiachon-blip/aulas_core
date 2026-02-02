/**
 * Script de debug para verificar slides no DOM
 * Execute no console do navegador
 */

console.log('🔍 DEBUG: Análise de Slides no DOM\n');

// Contar todos os slides
const allSlides = document.querySelectorAll('.slide');
console.log(`📊 Total de slides encontrados: ${allSlides.length}\n`);

// Verificar duplicatas por data-slide-id
const slideIds = {};
allSlides.forEach((slide, index) => {
    const id = slide.dataset.slideId || `SEM-ID-${index}`;
    if (!slideIds[id]) {
        slideIds[id] = [];
    }
    slideIds[id].push(index);
});

// Encontrar duplicatas
const duplicates = Object.entries(slideIds).filter(([id, indices]) => indices.length > 1);

if (duplicates.length > 0) {
    console.log('❌ SLIDES DUPLICADOS ENCONTRADOS:');
    duplicates.forEach(([id, indices]) => {
        console.log(`   ${id}: aparece nos índices ${indices.join(', ')}`);
    });
} else {
    console.log('✅ Nenhuma duplicata encontrada por data-slide-id');
}

// Verificar ordem dos slides
console.log('\n📋 Ordem dos slides no DOM:');
allSlides.forEach((slide, index) => {
    const id = slide.dataset.slideId || 'SEM-ID';
    const isActive = slide.classList.contains('active') ? ' (ATIVO)' : '';
    console.log(`   ${(index + 1).toString().padStart(2, ' ')}. [índice ${index}] ${id}${isActive}`);
});

// Verificar se o SlideCore tem a mesma contagem
if (window.SlideCore) {
    const state = window.SlideCore.getState();
    console.log(`\n📊 SlideCore tem ${state.slides.length} slides`);
    console.log(`   Slide atual: índice ${state.currentIndex} (${state.currentIndex + 1}º slide)`);
    
    if (state.slides.length !== allSlides.length) {
        console.warn(`⚠️ INCONSISTÊNCIA: DOM tem ${allSlides.length} slides, mas SlideCore tem ${state.slides.length}`);
        
        // Comparar arrays
        const domIds = Array.from(allSlides).map(s => s.dataset.slideId || 'SEM-ID');
        const coreIds = state.slides.map(s => s.dataset.slideId || 'SEM-ID');
        
        console.log('\n🔍 Comparando IDs:');
        console.log('   DOM:', domIds.slice(0, 10).join(', '), '...');
        console.log('   Core:', coreIds.slice(0, 10).join(', '), '...');
        
        // Encontrar diferenças
        const missingInCore = domIds.filter(id => !coreIds.includes(id));
        const extraInCore = coreIds.filter(id => !domIds.includes(id));
        
        if (missingInCore.length > 0) {
            console.warn(`\n   ❌ Slides no DOM mas não no Core: ${missingInCore.join(', ')}`);
        }
        if (extraInCore.length > 0) {
            console.warn(`\n   ❌ Slides no Core mas não no DOM: ${extraInCore.join(', ')}`);
        }
    }
}

// Teste de navegação
console.log('\n🧪 TESTE: Navegação manual');
if (window.SlideCore) {
    const state = window.SlideCore.getState();
    console.log(`   Slide atual: ${state.currentIndex + 1} de ${state.slides.length}`);
    console.log(`   Próximo: ${((state.currentIndex + 1) % state.slides.length) + 1}`);
    console.log(`   Anterior: ${((state.currentIndex - 1 + state.slides.length) % state.slides.length) + 1}`);
}

console.log('\n✅ Debug completo!');
