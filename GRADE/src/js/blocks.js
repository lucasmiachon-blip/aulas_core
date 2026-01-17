(function() {
    'use strict';
    
    const slides = document.querySelectorAll('.slide');
    if (!slides.length) return;
    
    let current = 0;
    
    // Update counter safely
    const totalSlidesEl = document.getElementById('totalSlides');
    if (totalSlidesEl) totalSlidesEl.textContent = slides.length;
    
    function show(index) { 
        slides.forEach(s => s.classList.remove('active')); 
        slides[index].classList.add('active'); 
        current = index;
        
        const currentSlideEl = document.getElementById('currentSlide');
        if (currentSlideEl) currentSlideEl.textContent = current + 1;
        
        // Animar barras quando entrar no Slide 4 (Interativo)
        if(index === 3) {
            setTimeout(() => {
                const barCac = document.getElementById('bar-cac');
                const barGrade = document.getElementById('bar-grade');
                if (barCac) barCac.style.width = '65%';
                if (barGrade) barGrade.style.width = '35%';
            }, 300);
        }
    }
    
    function moveNext() {
        current = (current + 1) % slides.length; 
        show(current); 
    }
    
    function movePrev() {
        current = (current - 1 + slides.length) % slides.length; 
        show(current); 
    }
    
    // Wire buttons safely
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    if (nextBtn) {
        nextBtn.onclick = moveNext;
    }
    if (prevBtn) {
        prevBtn.onclick = movePrev;
    }
    
    // Keyboard navigation
    window.addEventListener('keydown', (e) => { 
        if(e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
            e.preventDefault();
            moveNext();
        }
        if(e.key === 'ArrowLeft' || e.key === 'PageUp') {
            e.preventDefault();
            movePrev();
        }
    });
    
    // Initialize
    show(0);
})();