/**
 * CORE: Gerencia estado e operações básicas dos slides
 */
(function() {
    'use strict';
    
    // Estado global dos slides
    const state = {
        slides: [],
        currentIndex: 0
    };
    
    /**
     * Inicializa o sistema de slides
     */
    function init() {
        state.slides = Array.from(document.querySelectorAll('.slide'));
        
        if (!state.slides.length) {
            console.warn('Nenhum slide encontrado');
            return false;
        }
        
        // Respeitar slide ativo existente
        const activeSlide = document.querySelector('.slide.active');
        if (activeSlide) {
            state.currentIndex = state.slides.indexOf(activeSlide);
        }
        
        // Inicializar contador
        updateCounter();
        
        return true;
    }
    
    /**
     * Atualiza contador de slides
     */
    function updateCounter() {
        const currentEl = document.getElementById('currentSlide');
        const totalEl = document.getElementById('totalSlides');
        
        if (currentEl) currentEl.textContent = state.currentIndex + 1;
        if (totalEl) totalEl.textContent = state.slides.length;
    }
    
    /**
     * Ativa um slide específico
     */
    function showSlide(index) {
        // Validação de índice
        if (index < 0 || index >= state.slides.length) {
            console.warn(`Índice inválido: ${index}`);
            return false;
        }
        
        // Remover active de todos
        state.slides.forEach(s => s.classList.remove('active'));
        
        // Adicionar active no novo
        state.slides[index].classList.add('active');
        state.currentIndex = index;
        
        // Atualizar UI
        updateCounter();
        
        // Disparar evento customizado para viewport
        window.dispatchEvent(new CustomEvent('slidechange', { 
            detail: { index } 
        }));
        
        return true;
    }
    
    /**
     * Animação de barras (específica do projeto)
     */
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
    
    // API pública
    window.SlideCore = {
        init,
        showSlide,
        getState: () => ({ ...state }),
        animateBars
    };
})();
