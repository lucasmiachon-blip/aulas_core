/**
 * INIT: Inicializa todo o sistema de slides na ordem correta
 */
(function() {
    'use strict';
    
    function initSlideSystem() {
        // 1. Inicializar core
        if (!window.SlideCore.init()) {
            console.error('Falha ao inicializar slides');
            return;
        }
        
        // 2. Inicializar navegação
        window.SlideNavigation.init();
        
        // 3. Inicializar viewport
        window.SlideViewport.init();
        
        // 4. Mostrar slide inicial
        const state = window.SlideCore.getState();
        window.SlideCore.showSlide(state.currentIndex);
        
        // 5. Animações específicas
        window.SlideCore.animateBars();
        
        console.log('✅ Sistema de slides inicializado');
    }
    
    // Inicializar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSlideSystem);
    } else {
        initSlideSystem();
    }
})();
