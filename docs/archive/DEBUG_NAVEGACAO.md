# 🔍 Debug de Navegação - Script para Console

Se a navegação ainda estiver pulando slides, **cole este código no console do navegador** (F12 → Console):

```javascript
// Script de debug completo
console.log('🔍 DEBUG: Análise de Navegação\n');

// 1. Contar slides no DOM
const allSlides = document.querySelectorAll('.slide');
console.log(`📊 Total de slides no DOM: ${allSlides.length}\n`);

// 2. Verificar duplicatas por data-slide-id
const slideIds = {};
allSlides.forEach((slide, index) => {
    const id = slide.dataset.slideId || `SEM-ID-${index}`;
    if (!slideIds[id]) {
        slideIds[id] = [];
    }
    slideIds[id].push(index);
});

const duplicates = Object.entries(slideIds).filter(([id, indices]) => indices.length > 1);
if (duplicates.length > 0) {
    console.log('❌ SLIDES DUPLICADOS:');
    duplicates.forEach(([id, indices]) => {
        console.log(`   ${id}: aparece nos índices ${indices.join(', ')}`);
    });
} else {
    console.log('✅ Nenhuma duplicata encontrada');
}

// 3. Listar todos os slides em ordem
console.log('\n📋 Ordem dos slides no DOM:');
allSlides.forEach((slide, index) => {
    const id = slide.dataset.slideId || 'SEM-ID';
    const isActive = slide.classList.contains('active') ? ' (ATIVO)' : '';
    console.log(`   ${(index + 1).toString().padStart(2, ' ')}. [${index}] ${id}${isActive}`);
});

// 4. Verificar SlideCore
if (window.SlideCore) {
    const state = window.SlideCore.getState();
    console.log(`\n📊 SlideCore:`);
    console.log(`   Slides: ${state.slides.length}`);
    console.log(`   Índice atual: ${state.currentIndex} (slide ${state.currentIndex + 1})`);
    
    if (state.slides.length !== allSlides.length) {
        console.warn(`⚠️ INCONSISTÊNCIA: DOM tem ${allSlides.length}, SlideCore tem ${state.slides.length}`);
        
        // Comparar IDs
        const domIds = Array.from(allSlides).map(s => s.dataset.slideId || 'SEM-ID');
        const coreIds = state.slides.map(s => s.dataset.slideId || 'SEM-ID');
        
        console.log('\n🔍 Comparando IDs (primeiros 10):');
        console.log('   DOM:', domIds.slice(0, 10).join(', '));
        console.log('   Core:', coreIds.slice(0, 10).join(', '));
    }
    
    // 5. Teste de navegação manual
    console.log(`\n🧪 Teste de navegação:`);
    console.log(`   Atual: slide ${state.currentIndex + 1} de ${state.slides.length}`);
    console.log(`   Próximo: slide ${((state.currentIndex + 1) % state.slides.length) + 1}`);
    console.log(`   Anterior: slide ${((state.currentIndex - 1 + state.slides.length) % state.slides.length) + 1}`);
    
    // 6. Verificar se há slides ocultos ou com display:none
    const hiddenSlides = Array.from(allSlides).filter(s => {
        const style = window.getComputedStyle(s);
        return style.display === 'none' || style.visibility === 'hidden' || s.hasAttribute('hidden');
    });
    
    if (hiddenSlides.length > 0) {
        console.warn(`\n⚠️ ${hiddenSlides.length} slides ocultos encontrados:`);
        hiddenSlides.forEach((slide, idx) => {
            const id = slide.dataset.slideId || `NO-ID-${idx}`;
            console.warn(`   - ${id}`);
        });
    }
}

console.log('\n✅ Debug completo!');
```

## 📋 O que procurar:

1. **Duplicatas**: Se houver slides com mesmo `data-slide-id` aparecendo múltiplas vezes
2. **Inconsistência**: Se DOM tem número diferente de slides que SlideCore
3. **Slides ocultos**: Se há slides com `display:none` ou `hidden`
4. **Ordem incorreta**: Se os slides não estão na ordem esperada (S01, S02, S03...)

## 🎯 Enviar resultado:

Copie e cole o output completo do console aqui!
