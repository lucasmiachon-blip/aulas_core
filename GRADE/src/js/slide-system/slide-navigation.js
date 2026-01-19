/**
 * NAVIGATION: Gerencia controles (teclado e botões)
 */
(function() {
    'use strict';
    
    /**
     * Navega para próximo slide
     */
    function next() {
        const state = window.SlideCore.getState();
        const nextIndex = (state.currentIndex + 1) % state.slides.length;
        window.SlideCore.showSlide(nextIndex);
    }
    
    /**
     * Navega para slide anterior
     */
    function prev() {
        const state = window.SlideCore.getState();
        const prevIndex = (state.currentIndex - 1 + state.slides.length) % state.slides.length;
        window.SlideCore.showSlide(prevIndex);
    }
    
    /**
     * Configura eventos de teclado
     */
    function setupKeyboard() {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
                e.preventDefault();
                next();
            }
            
            if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                e.preventDefault();
                prev();
            }
        });
    }
    
    /**
     * Configura botões de navegação
     */
    function setupButtons() {
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        
        if (nextBtn) nextBtn.onclick = next;
        if (prevBtn) prevBtn.onclick = prev;
    }
    
    /**
     * Inicializa navegação
     */
    function init() {
        setupKeyboard();
        setupButtons();
    }
    
    // API pública
    window.SlideNavigation = {
        init,
        next,
        prev
    };
})();
