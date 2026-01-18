(function() {
    'use strict';
    
    const slides = document.querySelectorAll('.slide');
    if (!slides.length) return;
    
    // Inicialização: respeitar slide ativo existente
    let current = 0;
    const activeSlide = document.querySelector('.slide.active');
    if (activeSlide) {
        current = Array.from(slides).indexOf(activeSlide);
        if (current === -1) current = 0;
    }
    
    // Update counter safely
    const totalSlidesEl = document.getElementById('totalSlides');
    if (totalSlidesEl) {
        totalSlidesEl.textContent = slides.length;
    }
    
    /**
     * Fit active slide to viewport with reliable timing
     */
    function fitActiveSlide() {
        const viewport = document.getElementById('viewport');
        const activeSlide = document.querySelector('.slide.active');
        
        if (!viewport || !activeSlide) return;
        
        // Reset transform before measuring
        activeSlide.style.transform = '';
        activeSlide.style.transformOrigin = 'top left';
        
        // Get viewport dimensions
        const vw = viewport.clientWidth;
        const vh = viewport.clientHeight;
        
        // Get slide dimensions
        const sw = activeSlide.scrollWidth;
        const sh = activeSlide.scrollHeight;
        
        // Calculate scale to fit
        const scale = Math.min(1, vw / sw, vh / sh);
        
        if (scale < 1) {
            // Calculate offsets to center
            const offsetX = (vw - sw * scale) / 2;
            const offsetY = (vh - sh * scale) / 2;
            
            // Apply transform
            activeSlide.style.transform = 
                `translate(${offsetX / scale}px, ${offsetY / scale}px) scale(${scale})`;
        }
    }
    
    /**
     * Show slide at given index with bounds checking
     */
    function show(index) {
        // Bounds check
        if (index < 0 || index >= slides.length) {
            console.warn(`Invalid slide index: ${index}. Total slides: ${slides.length}`);
            return;
        }
        
        // Update active class
        slides.forEach(s => s.classList.remove('active'));
        slides[index].classList.add('active');
        current = index;
        
        // Update counter
        const currentSlideEl = document.getElementById('currentSlide');
        if (currentSlideEl) {
            currentSlideEl.textContent = current + 1;
        }
        
        // Fit slide to viewport using double rAF for reliability
        requestAnimationFrame(() => {
            requestAnimationFrame(fitActiveSlide);
        });
        
        // Animate bars if they exist in the active slide
        setTimeout(() => {
            const barCac = document.getElementById('bar-cac');
            const barGrade = document.getElementById('bar-grade');
            
            if (barCac && barGrade) {
                barCac.style.width = '65%';
                barGrade.style.width = '35%';
            }
        }, 300);
    }
    
    /**
     * Move to next slide
     */
    function moveNext() {
        current = (current + 1) % slides.length;
        show(current);
    }
    
    /**
     * Move to previous slide
     */
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
        if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
            e.preventDefault();
            moveNext();
        }
        if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
            e.preventDefault();
            movePrev();
        }
    });
    
    // Initialize with current slide (respecting active)
    show(current);
    
    // Fit on window resize
    window.addEventListener('resize', () => {
        fitActiveSlide();
    });
    
    // Fit after fonts load (if available)
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready
            .then(fitActiveSlide)
            .catch(() => {
                // Silently ignore font loading errors
            });
    }
    
    // Fit after window load (for images, etc)
    window.addEventListener('load', fitActiveSlide);
})();
