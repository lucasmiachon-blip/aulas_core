/**
 * SLIDE VIEWPORT - Ajusta slides ao tamanho da tela
 */
(function() {
    'use strict';
    
    // Flag de controle para evitar múltiplas inicializações
    let initialized = false;
    
    function fitActiveSlide() {
        const viewport = document.getElementById('viewport');
        const activeSlide = document.querySelector('.slide.active');
        
        if (!viewport || !activeSlide) return;
        
        activeSlide.style.transform = '';
        activeSlide.style.transformOrigin = 'top left';
        
        const vw = viewport.clientWidth;
        const vh = viewport.clientHeight;
        const sw = activeSlide.scrollWidth;
        const sh = activeSlide.scrollHeight;
        
        const scale = Math.min(1, vw / sw, vh / sh);
        
        if (scale < 1) {
            const offsetX = (vw - sw * scale) / 2;
            const offsetY = (vh - sh * scale) / 2;
            
            activeSlide.style.transform = 
                `translate(${offsetX / scale}px, ${offsetY / scale}px) scale(${scale})`;
        }
    }
    
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    }
    
    function init() {
        // Evitar múltiplas inicializações
        if (initialized) {
            return;
        }
        
        // Remover listeners antigos se existirem (evitar duplicatas)
        if (window._slideChangeHandler) {
            window.removeEventListener('slidechange', window._slideChangeHandler);
        }
        if (window._viewportResizeHandler) {
            window.removeEventListener('resize', window._viewportResizeHandler);
        }
        if (window._viewportLoadHandler) {
            window.removeEventListener('load', window._viewportLoadHandler);
        }
        
        // Criar handlers e armazenar em window para poder remover depois
        window._slideChangeHandler = () => {
            requestAnimationFrame(() => {
                requestAnimationFrame(fitActiveSlide);
            });
        };
        
        const debouncedFit = debounce(fitActiveSlide, 250);
        window._viewportResizeHandler = debouncedFit;
        window._viewportLoadHandler = fitActiveSlide;
        
        // Adicionar listeners uma única vez
        window.addEventListener('slidechange', window._slideChangeHandler);
        window.addEventListener('resize', window._viewportResizeHandler);
        
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(fitActiveSlide).catch(() => {});
        }
        
        window.addEventListener('load', window._viewportLoadHandler);
        
        fitActiveSlide();
        
        initialized = true;
    }
    
    window.SlideViewport = {
        init,
        fitActiveSlide
    };
})();
