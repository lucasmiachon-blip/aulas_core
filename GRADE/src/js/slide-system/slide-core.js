/**
 * SLIDE CORE - Gerencia estado e operações básicas
 */
(function() {
    'use strict';
    
    const state = {
        slides: [],
        currentIndex: 0
    };
    
    function init() {
        state.slides = Array.from(document.querySelectorAll('.slide'));
        
        if (!state.slides.length) {
            console.warn('Nenhum slide encontrado');
            return false;
        }
        
        const activeSlide = document.querySelector('.slide.active');
        if (activeSlide) {
            state.currentIndex = state.slides.indexOf(activeSlide);
            if (state.currentIndex === -1) state.currentIndex = 0;
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
            console.warn(`Índice inválido: ${index}`);
            return false;
        }
        
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
