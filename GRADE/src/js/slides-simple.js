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
    
    // Lista padrão (fallback) — preferimos carregar de ./slides/_list.txt
    // (S21 removido como duplicata)
    const defaultSlideIds = [
        'S01','S02','S03','S04','S05','S06','S07','S08','S09','S10',
        'S11','S12','S13','S14','S15','S16','S17','S18','S19','S20',
        'S22','S23','S24','S25','S26','S27','S28','S29','S30',
        'S31','S32','S33','S34','S35','S36','S37','S38','S39','S40',
        'S41','S42','S43','S44','S45','S46','S47','S48','S49'
    ];

    // Compatível com:
    // - GRADE/src/index.html  -> ./slides/
    // - GRADE/dist/index.html -> ../src/slides/
    // - raiz (legacy)         -> ./src/slides/
    const basePathCandidates = ['../src/slides/', './slides/', './src/slides/'];

    function normalizeHash(value) {
        return (value || '').replace('#', '').trim().toUpperCase();
    }

    function findIndexFromHash() {
        const h = normalizeHash(window.location.hash);
        if (!h) return 0;

        // #12
        if (/^\d+$/.test(h)) {
            const n = parseInt(h, 10);
            if (!Number.isFinite(n)) return 0;
            return Math.max(0, Math.min(slides.length - 1, n - 1));
        }

        // #S05
        if (/^S\d{2}$/.test(h)) {
            const idx = slides.findIndex(s => (s.getAttribute('data-slide-id') || '').toUpperCase() === h);
            return idx >= 0 ? idx : 0;
        }

        return 0;
    }
    
    // Atualizar contador
    function updateUI() {
        const curr = document.getElementById('currentSlide');
        const total = document.getElementById('totalSlides');
        if (curr) curr.textContent = current + 1;
        if (total) total.textContent = slides.length;
    }
    
    // Trocar slide
    function show(index, opts = {}) {
        if (index < 0 || index >= slides.length) return;
        slides.forEach(s => s.classList.remove('active'));
        slides[index].classList.add('active');
        current = index;
        updateUI();

        // Persist slide in URL (no history spam)
        if (!opts.silent) {
            const id = slides[index].getAttribute('data-slide-id');
            if (id) {
                try {
                    history.replaceState(null, '', `#${id}`);
                } catch (_) {
                    // ignore
                }
            }
        }
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
        } else if (e.key === 'Home') {
            e.preventDefault();
            show(0);
        } else if (e.key === 'End') {
            e.preventDefault();
            show(slides.length - 1);
        }
    }

    async function tryLoadList(basePath) {
        try {
            const res = await fetch(`${basePath}_list.txt`, { cache: 'no-store' });
            if (!res.ok) return null;
            const txt = await res.text();
            const files = txt
                .split(/\r?\n/)
                .map(l => l.trim())
                .filter(Boolean)
                .filter(l => !l.startsWith('#'));
            return files.length ? files : null;
        } catch (_) {
            return null;
        }
    }

    async function resolveDeck() {
        // Prefer _list.txt, so adding/removing slides doesn’t require JS edits.
        for (const basePath of basePathCandidates) {
            const list = await tryLoadList(basePath);
            if (list) return { basePath, files: list };
        }

        // Fallback: detect basePath by trying to fetch the first slide.
        for (const basePath of basePathCandidates) {
            try {
                const res = await fetch(`${basePath}${defaultSlideIds[0]}.html`, { cache: 'no-store' });
                if (res.ok) {
                    return { basePath, files: defaultSlideIds.map(id => `${id}.html`) };
                }
            } catch (_) {
                // continue
            }
        }

        // Worst-case fallback
        return { basePath: basePathCandidates[0], files: defaultSlideIds.map(id => `${id}.html`) };
    }
    
    // Carregar slides
    async function load() {
        const viewport = document.getElementById('viewport');
        if (!viewport) return console.error('❌ #viewport não encontrado');
        
        const { basePath, files } = await resolveDeck();
        console.log(`📚 Carregando slides de: ${basePath}`);

        for (const file of files) {
            try {
                const res = await fetch(`${basePath}${file}`, { cache: 'no-store' });
                if (!res.ok) {
                    console.error(`❌ Falha ao carregar: ${basePath}${file}`);
                    continue;
                }
                const html = await res.text();
                viewport.insertAdjacentHTML('beforeend', html);
            } catch (e) {
                console.error(`❌ Erro ao carregar ${file}:`, e);
            }
        }
        
        slides = Array.from(document.querySelectorAll('.slide'));
        console.log(`✅ ${slides.length} slides carregados`);
        
        // Slide inicial (hash)
        const initial = findIndexFromHash();
        if (slides[initial]) {
            show(initial, { silent: true });
        } else if (slides[0]) {
            show(0, { silent: true });
        }
        
        // Configurar teclado UMA VEZ
        window.removeEventListener('keydown', handleKey);
        window.addEventListener('keydown', handleKey);
        
        // Botões
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        if (nextBtn) nextBtn.onclick = next;
        if (prevBtn) prevBtn.onclick = prev;

        // Click-to-advance (TED-like). Left 45% = prev, right 55% = next.
        let pointerStart = null;
        viewport.addEventListener('click', (e) => {
            // Ignore clicks on interactive elements
            if (e.target && e.target.closest && e.target.closest('a,button,input,textarea,select')) return;
            const rect = viewport.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const ratio = x / rect.width;
            if (ratio < 0.45) prev();
            else next();
        });

        // Touch / pointer swipe support
        viewport.addEventListener('pointerdown', (e) => {
            pointerStart = { x: e.clientX, y: e.clientY, t: Date.now() };
        });
        viewport.addEventListener('pointerup', (e) => {
            if (!pointerStart) return;
            const dx = e.clientX - pointerStart.x;
            const dy = e.clientY - pointerStart.y;
            const dt = Date.now() - pointerStart.t;
            pointerStart = null;
            // horizontal swipe
            if (dt < 600 && Math.abs(dx) > 60 && Math.abs(dy) < 60) {
                if (dx < 0) next();
                else prev();
            }
        });

        // Hash changes (deep links)
        window.addEventListener('hashchange', () => {
            const idx = findIndexFromHash();
            show(idx, { silent: true });
        });
        
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
