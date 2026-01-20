(function() {
    'use strict';
    
    // Referência global do handler para evitar duplicação
    let keyHandler = null;
    
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
        // CRÍTICO: Remover listener antigo se existir (idempotência)
        if (keyHandler) {
            window.removeEventListener('keydown', keyHandler);
        }
        
        // Criar novo handler (referência persistente)
        keyHandler = function(e) {
            if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
                e.preventDefault();
                next();
            }
            
            if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                e.preventDefault();
                prev();
            }
        };
        
        // Adicionar listener (idempotente: remove antigo antes de adicionar)
        window.addEventListener('keydown', keyHandler);
    }
    
    function setupButtons() {
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        
        // onclick pode ser reatribuído sem problemas (não acumula)
        if (nextBtn) nextBtn.onclick = next;
        if (prevBtn) prevBtn.onclick = prev;
    }
    
    function init() {
        // Idempotente: pode ser chamado múltiplas vezes sem duplicar listeners
        setupKeyboard();
        setupButtons();
    }
    
    window.SlideNavigation = {
        init,
        next,
        prev
    };
})();