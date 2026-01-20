/**
 * SLIDE CORE - Gerencia estado e operações básicas
 */
(function() {
    'use strict';
    
    const state = {
        slides: [],
        currentIndex: 0
    };
    
    // Flag global CRÍTICA - usar window para persistir
    if (typeof window.__slideCoreInitialized === 'undefined') {
        window.__slideCoreInitialized = false;
    }
    
    function init() {
        // VERIFICAÇÃO CRÍTICA - PRIMEIRA COISA
        if (window.__slideCoreInitialized === true) {
            // Já inicializado - retornar estado atual sem re-fazer nada
            return state.slides.length > 0;
        }
        
        // MARCAR COMO INICIALIZADO IMEDIATAMENTE (antes de qualquer coisa)
        window.__slideCoreInitialized = true;
        
        // LIMPAR array ANTES de recriar (evitar acúmulo)
        state.slides = [];
        state.currentIndex = 0;
        
        // Buscar TODOS os slides (sem filtros)
        const allSlidesInDOM = document.querySelectorAll('.slide');
        state.slides = Array.from(allSlidesInDOM);
        
        if (!state.slides.length) {
            console.warn('⚠️ Nenhum slide encontrado no DOM');
            window.__slideCoreInitialized = false; // Permitir tentar novamente
            return false;
        }
        
        // Verificar e corrigir data-slide-id ausente
        state.slides.forEach((slide, index) => {
            if (!slide.dataset.slideId && !slide.getAttribute('data-slide-id')) {
                const expectedId = `S${String(index + 1).padStart(2, '0')}`;
                slide.setAttribute('data-slide-id', expectedId);
            }
        });
        
        // Verificar duplicatas e remover se houver
        const slideIds = new Set();
        const duplicateIndices = [];
        state.slides.forEach((slide, index) => {
            const id = slide.dataset.slideId || slide.getAttribute('data-slide-id') || `S${String(index + 1).padStart(2, '0')}`;
            if (slideIds.has(id)) {
                duplicateIndices.push(index);
            } else {
                slideIds.add(id);
            }
        });
        
        // Remover duplicatas (em ordem reversa para não afetar índices)
        if (duplicateIndices.length > 0) {
            duplicateIndices.reverse().forEach(idx => {
                state.slides.splice(idx, 1);
            });
        }
        
        const activeSlide = document.querySelector('.slide.active');
        if (activeSlide) {
            state.currentIndex = state.slides.indexOf(activeSlide);
            if (state.currentIndex === -1) {
                state.currentIndex = 0;
            }
        }
        
        updateCounter();
        
        return true;
    }
    
    function updateCounter() {
        const currentEl = document.getElementById('currentSlide');
        const totalEl = document.getElementById('totalSlides');
        
        if (currentEl) currentEl.textContent = state.currentIndex + 1;
        if (totalEl) totalEl.textContent = state.slides.length;
    }
    
    function showSlide(index) {
        if (index < 0 || index >= state.slides.length) {
            console.warn(`⚠️ Índice inválido: ${index} (array tem ${state.slides.length} slides)`);
            return false;
        }
        
        // Log apenas se debug estiver ativo (remover em produção)
        // const slideId = state.slides[index].dataset.slideId || 'NO-ID';
        // console.log(`🔍 SlideCore.showSlide(${index}): ${slideId}`);
        
        state.slides.forEach(s => s.classList.remove('active'));
        state.slides[index].classList.add('active');
        state.currentIndex = index;
        
        updateCounter();
        
        window.dispatchEvent(new CustomEvent('slidechange', { 
            detail: { index } 
        }));
        
        return true;
    }
    
    function animateBars() {
        setTimeout(() => {
            const barCac = document.getElementById('bar-cac');
            const barGrade = document.getElementById('bar-grade');
            
            if (barCac && barGrade) {
                barCac.style.width = '65%';
                barGrade.style.width = '35%';
            }
        }, 300);
    }
    
    window.SlideCore = {
        init,
        showSlide,
        getState: () => ({ ...state }),
        animateBars
    };
})();
