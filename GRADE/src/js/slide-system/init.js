/**
 * INIT - Inicializa todo o sistema de slides
 */
(function() {
    'use strict';
    
    function initSlideSystem() {
        if (!window.SlideCore.init()) {
            console.error('Falha ao inicializar slides');
            return;
        }
        
        window.SlideNavigation.init();
        window.SlideViewport.init();
        
        const state = window.SlideCore.getState();
        window.SlideCore.showSlide(state.currentIndex);
        window.SlideCore.animateBars();
        
        console.log('✅ Sistema de slides inicializado');
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSlideSystem);
    } else {
        initSlideSystem();
    }
})();
