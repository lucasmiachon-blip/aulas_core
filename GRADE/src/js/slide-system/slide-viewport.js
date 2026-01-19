/**
 * VIEWPORT: Ajusta slides ao tamanho da tela
 */
(function() {
    'use strict';
    
    /**
     * Ajusta slide ativo ao viewport
     */
    function fitActiveSlide() {
        const viewport = document.getElementById('viewport');
        const activeSlide = document.querySelector('.slide.active');
        
        if (!viewport || !activeSlide) return;
        
        // Reset transform para medir corretamente
        activeSlide.style.transform = '';
        activeSlide.style.transformOrigin = 'top left';
        
        // Dimensões
        const vw = viewport.clientWidth;
        const vh = viewport.clientHeight;
        const sw = activeSlide.scrollWidth;
        const sh = activeSlide.scrollHeight;
        
        // Calcular escala
        const scale = Math.min(1, vw / sw, vh / sh);
        
        if (scale < 1) {
            const offsetX = (vw - sw * scale) / 2;
            const offsetY = (vh - sh * scale) / 2;
            
            activeSlide.style.transform = 
                `translate(${offsetX / scale}px, ${offsetY / scale}px) scale(${scale})`;
        }
    }
    
    /**
     * Debounce helper
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    }
    
    /**
     * Inicializa ajuste de viewport
     */
    function init() {
        // Ajustar quando slide mudar
        window.addEventListener('slidechange', () => {
            requestAnimationFrame(() => {
                requestAnimationFrame(fitActiveSlide);
            });
        });
        
        // Ajustar no resize (com debounce)
        window.addEventListener('resize', debounce(fitActiveSlide, 250));
        
        // Ajustar quando fontes carregarem
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(fitActiveSlide).catch(() => {});
        }
        
        // Ajustar no load
        window.addEventListener('load', fitActiveSlide);
        
        // Ajuste inicial
        fitActiveSlide();
    }
    
    // API pública
    window.SlideViewport = {
        init,
        fitActiveSlide
    };
})();
