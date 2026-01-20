(function() {
    'use strict';
    
    // Prevenir múltiplas execuções da IIFE (se script for carregado novamente)
    if (window.SlideNavigation && window.SlideNavigation.init) {
        console.warn('⚠️ SlideNavigation já existe, pulando re-inicialização da IIFE');
        return;
    }
    
    // Namespace para evitar conflito com outros projetos (ex: OSTEOPOROSE)
    if (!window.GRADE) {
        window.GRADE = {};
    }
    
    // AbortController para limpeza moderna de listeners
    let abortController = null;
    
    function next() {
        const state = window.SlideCore.getState();
        // Usar contagem dinâmica do array (não hardcoded)
        const slidesCount = state.slides.length;
        if (slidesCount === 0) return;
        
        const nextIndex = (state.currentIndex + 1) % slidesCount;
        window.SlideCore.showSlide(nextIndex);
    }
    
    function prev() {
        const state = window.SlideCore.getState();
        // Usar contagem dinâmica do array (não hardcoded)
        const slidesCount = state.slides.length;
        if (slidesCount === 0) return;
        
        const prevIndex = (state.currentIndex - 1 + slidesCount) % slidesCount;
        window.SlideCore.showSlide(prevIndex);
    }
    
    function setupKeyboard() {
        // Prevenir múltiplas chamadas (idempotência)
        if (window.GRADE.keyboardSetup) {
            console.warn('⚠️ Teclado já configurado, pulando setupKeyboard()');
            return;
        }
        
        // Usar AbortController para limpeza moderna (remove TODOS os listeners anteriores)
        if (abortController) {
            console.log('🔧 Abortando listener anterior...');
            abortController.abort();
        }
        abortController = new AbortController();
        
        // Criar handler (não precisa armazenar referência com AbortController)
        const keyHandler = function(e) {
            if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
                e.preventDefault();
                next();
            }
            
            if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                e.preventDefault();
                prev();
            }
        };
        
        // Adicionar listener com signal (remove automaticamente ao abortar)
        window.addEventListener('keydown', keyHandler, { signal: abortController.signal });
        console.log('✅ Listener de teclado registrado (AbortController)');
        
        // Marcar como configurado
        window.GRADE.keyboardSetup = true;
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
    
    // Namespace para compatibilidade e debugging
    window.GRADE.SlideNavigation = window.SlideNavigation;
})();