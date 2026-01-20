/**
 * INIT - Inicializa todo o sistema de slides
 * 
 * Aguarda slides serem carregados dinamicamente (via slide-loader.js)
 * antes de inicializar o sistema.
 */
(function() {
    'use strict';
    
    // Namespace para evitar conflito com outros projetos (ex: OSTEOPOROSE)
    if (!window.GRADE) {
        window.GRADE = { initDone: false };
    }
    
    function initSlideSystem(event) {
        // VERIFICAÇÃO CRÍTICA - PRIMEIRA COISA (guard contra reentrância com namespacing)
        if (window.GRADE.initDone || window.__slideSystemInitialized === true) {
            // Sistema já inicializado - NÃO FAZER NADA
            return;
        }
        
        // Verificar se há slides no DOM
        const slides = document.querySelectorAll('.slide');
        
        if (slides.length === 0) {
            // Slides ainda não foram carregados, aguardar evento
            return;
        }
        
        // MARCAR COMO INICIALIZADO IMEDIATAMENTE (antes de qualquer coisa)
        window.__slideSystemInitialized = true;
        window.GRADE.initDone = true;
        
        // Verificar se módulos estão disponíveis
        if (!window.SlideCore || !window.SlideCore.init) {
            window.__slideSystemInitialized = false;
            return;
        }
        
        // Inicializar SlideCore
        if (!window.SlideCore.init()) {
            window.__slideSystemInitialized = false;
            return;
        }
        
        // Obter estado
        const state = window.SlideCore.getState();
        
        // Inicializar outros módulos
        if (window.SlideNavigation) window.SlideNavigation.init();
        if (window.SlideViewport) window.SlideViewport.init();
        
        // Mostrar slide inicial
        window.SlideCore.showSlide(state.currentIndex);
        if (window.SlideCore.animateBars) {
            window.SlideCore.animateBars();
        }
        
        // Forçar foco no viewport para permitir navegação imediata por teclado
        const viewport = document.getElementById('viewport');
        if (viewport && viewport.tabIndex === -1) {
            viewport.setAttribute('tabindex', '0');
        }
        if (viewport) {
            viewport.focus();
        }
        
        console.log(`✅ Sistema inicializado: ${state.slides.length} slides`);
    }
    
    // Escutar evento de slides carregados - APENAS UMA VEZ
    // Remover listeners anteriores se existirem
    if (window.__slidesLoadedHandler) {
        window.removeEventListener('slidesloaded', window.__slidesLoadedHandler);
    }
    
    window.__slidesLoadedHandler = initSlideSystem;
    window.addEventListener('slidesloaded', window.__slidesLoadedHandler, { once: true });
    
    // Fallback: se slides já estiverem no DOM quando o script carregar
    // Usar uma flag para garantir que só roda uma vez
    if (document.readyState !== 'loading' && !window.__fallbackChecked) {
        window.__fallbackChecked = true;
        setTimeout(() => {
            // Verificar flag ANTES de chamar
            if (!window.__slideSystemInitialized) {
                const slides = document.querySelectorAll('.slide');
                if (slides.length > 0) {
                    initSlideSystem();
                }
            }
        }, 1000); // Timeout maior para garantir que loader terminou
    }
})();