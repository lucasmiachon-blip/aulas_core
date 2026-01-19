/**
 * SLIDE VIEWPORT - Ajusta slides ao tamanho da tela
 */
(function() {
    'use strict';
    
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
        window.addEventListener('slidechange', () => {
            requestAnimationFrame(() => {
                requestAnimationFrame(fitActiveSlide);
            });
        });
        
        window.addEventListener('resize', debounce(fitActiveSlide, 250));
        
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(fitActiveSlide).catch(() => {});
        }
        
        window.addEventListener('load', fitActiveSlide);
        
        fitActiveSlide();
    }
    
    window.SlideViewport = {
        init,
        fitActiveSlide
    };
})();
