// ============================================
// SISTEMA DE SLIDES SIMPLES - VERSÃO FINAL
// ============================================
(function() {
    'use strict';
    
    // Guard absoluto
    if (window.__SLIDES_LOADED) return;
    window.__SLIDES_LOADED = true;
    
    let slides = [];
    let current = 0;
    
    // Lista dos 41 slides
    const slideFiles = [
        'S01','S02','S03','S04','S05','S06','S07','S08','S09','S10',
        'S11','S12','S13','S14','S15','S16','S17','S18','S19','S20',
        'S22','S23','S24','S25','S26','S27','S28','S29','S30',
        'S31','S32','S33','S34','S35','S36','S37','S38','S39','S40',
        'S41','S42'
    ];
    
    // Atualizar contador
    function updateUI() {
        const curr = document.getElementById('currentSlide');
        const total = document.getElementById('totalSlides');
        if (curr) curr.textContent = current + 1;
        if (total) total.textContent = slides.length;
    }
    
    // Trocar slide
    function show(index) {
        if (index < 0 || index >= slides.length) return;
        slides.forEach(s => s.classList.remove('active'));
        slides[index].classList.add('active');
        current = index;
        updateUI();
    }
    
    // Navegação
    function next() { show((current + 1) % slides.length); }
    function prev() { show((current - 1 + slides.length) % slides.length); }
    
    // Teclado (handler nomeado para poder remover)
    function handleKey(e) {
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
            e.preventDefault();
            next();
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
            e.preventDefault();
            prev();
        }
    }
    
    // Carregar slides
    async function load() {
        const viewport = document.getElementById('viewport');
        if (!viewport) return console.error('❌ #viewport não encontrado');
        
        console.log('📚 Carregando 41 slides...');
        
        // Detectar path correto baseado no contexto
        // GitHub Pages: ./src/slides/ (a partir de /grade/index.html)
        // Desenvolvimento local: ./slides/ (a partir de /src/index.html)
        const paths = ['./src/slides/', './slides/'];
        
        for (const file of slideFiles) {
            let loaded = false;
            for (const basePath of paths) {
                try {
                    const res = await fetch(`${basePath}${file}.html`);
                    if (res.ok) {
                        const html = await res.text();
                        viewport.insertAdjacentHTML('beforeend', html);
                        loaded = true;
                        break;
                    }
                } catch (e) {
                    // Continuar para próximo path
                }
            }
            if (!loaded) {
                console.error(`❌ Erro ao carregar ${file}.html`);
            }
        }
        
        slides = Array.from(document.querySelectorAll('.slide'));
        console.log(`✅ ${slides.length} slides carregados`);
        
        // Ativar primeiro slide
        if (slides[0]) slides[0].classList.add('active');
        
        // Configurar teclado UMA VEZ
        window.removeEventListener('keydown', handleKey);
        window.addEventListener('keydown', handleKey);
        
        // Botões
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        if (nextBtn) nextBtn.onclick = next;
        if (prevBtn) prevBtn.onclick = prev;
        
        updateUI();
        console.log('✅ Sistema pronto!');
    }
    
    // Iniciar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', load);
    } else {
        load();
    }
    
})();
