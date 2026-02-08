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
    
    // Lista padrão (fallback) — usada apenas se ./slides/_list.txt não puder ser carregada.
    // Mantenha em sincronia com src/slides/_list.txt para evitar surpresas em ambientes com cache/
    // paths diferentes.
    const defaultSlideIds = [
        'S01',
        'S02',
        'S03',
        'S05',
        'S06',
        'S60',
        'S04',
        'S09',
        'S36',
        'S08',
        'S11',
        'S10',
        'S07',
        'S13',
        'S61',
        'S14',
        'S43',
        'S46',
        'S44',
        'S45',
        'S47',
        'S17',
        'S18',
        'S19',
        'S20',
        'S48',
        'S49',
        'S50',
        'S51',
        'S52',
        'S53',
        'S54',
        'S55',
        'S56',
        'S57',
        'S59',
        'S58',
        'S22',
        'S23',
        'S24',
        'S25',
        'S26',
        'S27',
        'S28',
        'S29',
        'S30',
        'S31',
        'S32',
        'S33',
        'S34',
        'S35',
        'S37',
        'S38',
        'S12',
        'S39',
        'S40',
        'S41',
        'S42'
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
            try {
                // Counter-friendly hash (matches the slide number shown in the UI).
                history.replaceState(null, '', `#${index + 1}`);
            } catch (_) {
                /* ignore */
            }
        }
    }
    
    // Navegação
    function next() {
        show(Math.min(current + 1, slides.length - 1));
    }
    function prev() {
        show(Math.max(current - 1, 0));
    }
    
    // Fullscreen toggle
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        } else {
            document.exitFullscreen().catch(() => {});
        }
    }

    // Hide/show controls
    function toggleControls() {
        const ctrl = document.querySelector('.controls');
        if (ctrl) ctrl.style.display = ctrl.style.display === 'none' ? '' : 'none';
    }

    // Auto-hide controls in fullscreen
    document.addEventListener('fullscreenchange', () => {
        const ctrl = document.querySelector('.controls');
        if (!ctrl) return;
        ctrl.style.display = document.fullscreenElement ? 'none' : '';
    });

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
        } else if (e.key === 'f' || e.key === 'F') {
            e.preventDefault();
            toggleFullscreen();
        } else if (e.key === 'h' || e.key === 'H') {
            e.preventDefault();
            toggleControls();
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
                // _list.txt vem como "S01","S02"...; fallback já traz "S01.html"
                const name = (file || '').trim();
                const path = /\.html?$/i.test(name) ? name : name + '.html';
                const res = await fetch(`${basePath}${path}`, { cache: 'no-store' });
                if (!res.ok) {
                    console.error(`❌ Falha ao carregar: ${basePath}${path}`);
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
