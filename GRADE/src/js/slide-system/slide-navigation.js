/**
 * SLIDE NAVIGATION - Controles de teclado e botões
 */
(function() {
    'use strict';
    
    function next() {
        const state = window.SlideCore.getState();
        const nextIndex = (state.currentIndex + 1) % state.slides.length;
        window.SlideCore.showSlide(nextIndex);
    }
    
    function prev() {
        const state = window.SlideCore.getState();
        const prevIndex = (state.currentIndex - 1 + state.slides.length) % state.slides.length;
        window.SlideCore.showSlide(prevIndex);
    }
    
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
    
    function setupButtons() {
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        
        if (nextBtn) nextBtn.onclick = next;
        if (prevBtn) prevBtn.onclick = prev;
    }
    
    function init() {
        setupKeyboard();
        setupButtons();
    }
    
    window.SlideNavigation = {
        init,
        next,
        prev
    };
})();
