/**
 * INIT - Inicializa todo o sistema de slides
 * 
 * Aguarda slides serem carregados dinamicamente (via slide-loader.js)
 * antes de inicializar o sistema.
 */
(function() {
    'use strict';
    
    function initSlideSystem() {
        // Verificar se há slides no DOM
        const slides = document.querySelectorAll('.slide');
        if (slides.length === 0) {
            // Slides ainda não foram carregados, aguardar evento
            console.log('⏳ Aguardando slides serem carregados...');
            window.addEventListener('slidesloaded', initSlideSystem, { once: true });
            return;
        }
        
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
    
    // Aguardar DOM e módulos estarem prontos
    function waitForReady() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                // Aguardar um pouco para garantir que módulos carregaram
                setTimeout(initSlideSystem, 10);
            });
        } else {
            setTimeout(initSlideSystem, 10);
        }
    }
    
    waitForReady();
})();
