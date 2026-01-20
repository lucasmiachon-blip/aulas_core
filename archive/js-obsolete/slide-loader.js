/**
 * SLIDE LOADER - Carrega slides dinamicamente do diretório /slides/
 * 
 * Lê os arquivos S01.html, S02.html, ... S42.html (41 slides principais, S33 é BONUS)
 * e insere cada um dentro do #viewport como <section class="slide">
 */
(function() {
    'use strict';
    
    // Lista de slides na ordem correta (41 slides - S21 removido como duplicata, S33 é BONUS)
    const slideFiles = [
        'S01.html',
        'S02.html',
        'S03.html',
        'S04.html',
        'S05.html',
        'S06.html',
        'S07.html',
        'S08.html',
        'S09.html',
        'S10.html',
        'S11.html',
        'S12.html',
        'S13.html',
        'S14.html',
        'S15.html',
        'S16.html',
        'S17.html',
        'S18.html',
        'S19.html',
        'S20.html',
        'S22.html',  // S21 removido (duplicata de S14)
        'S23.html',
        'S24.html',
        'S25.html',
        'S26.html',
        'S27.html',
        'S28.html',
        'S29.html',
        'S30.html',
        'S31.html',
        'S32.html',
        // S33.html removido: slide BONUS não conta no total principal
        'S34.html',
        'S35.html',
        'S36.html',
        'S37.html',
        'S38.html',
        'S39.html',
        'S40.html',
        'S41.html',
        'S42.html'
    ];
    
    async function loadSlides() {
        // Prevenir múltiplas execuções
        if (window.__slidesLoading) {
            return;
        }
        window.__slidesLoading = true;
        
        const viewport = document.getElementById('viewport');
        if (!viewport) {
            console.error('❌ #viewport não encontrado!');
            window.__slidesLoading = false;
            return;
        }
        
        // Limpar viewport antes de carregar (evitar duplicatas)
        viewport.innerHTML = '';
        
        try {
            // Detectar path correto baseado no contexto
            // GitHub Pages: ./src/slides/ (a partir de /grade/index.html)
            // Desenvolvimento local: ./slides/ (a partir de /src/index.html)
            async function loadSlideFile(file) {
                const paths = ['./src/slides/', './slides/'];
                
                for (const basePath of paths) {
                    try {
                        const response = await fetch(`${basePath}${file}`);
                        if (response.ok) {
                            return await response.text();
                        }
                    } catch (e) {
                        // Continuar para próximo path
                    }
                }
                return ''; // Retornar string vazia se não encontrado
            }
            
            const promises = slideFiles.map(file => loadSlideFile(file));
            const results = await Promise.allSettled(promises);
            const slideContents = results.map(result => 
                result.status === 'fulfilled' ? result.value : ''
            );
            
            let loadedCount = 0;
            let failedCount = 0;
            
            // CRÍTICO: Promise.allSettled() mantém ordem do array original
            // Inserir slides sequencialmente (ordem garantida pelo array)
            slideContents.forEach((html, index) => {
                if (html && html.trim().length > 0) {
                    // Inserir HTML no DOM na ordem do array (não ordem de carregamento)
                    viewport.insertAdjacentHTML('beforeend', html);
                    
                    // Garantir que o slide inserido tem data-slide-id correto
                    const insertedSlide = viewport.lastElementChild;
                    if (insertedSlide && insertedSlide.classList.contains('slide')) {
                        // Se não tem data-slide-id, adicionar baseado no nome do arquivo
                        if (!insertedSlide.dataset.slideId && !insertedSlide.getAttribute('data-slide-id')) {
                            const expectedId = slideFiles[index].replace('.html', '').toUpperCase();
                            insertedSlide.setAttribute('data-slide-id', expectedId);
                        }
                    }
                    
                    loadedCount++;
                } else {
                    failedCount++;
                }
            });
            
            console.log(`✅ ${loadedCount} slides carregados${failedCount > 0 ? `, ${failedCount} falhas` : ''}`);
            
            requestAnimationFrame(() => {
                const slidesInDOM = document.querySelectorAll('.slide').length;
                
                if (slidesInDOM !== slideFiles.length) {
                    console.warn(`⚠️ ${slideFiles.length - slidesInDOM} slide(s) não foram carregados`);
                }
                
                // Disparar evento UMA VEZ
                window.dispatchEvent(new CustomEvent('slidesloaded', { 
                    detail: { count: slidesInDOM } 
                }));
                
                window.__slidesLoading = false;
            });
            
        } catch (error) {
            console.error('❌ Erro ao carregar slides:', error);
            viewport.innerHTML = `
                <div style="padding: 5vw; text-align: center; color: #d32f2f;">
                    <h2>Erro ao carregar slides</h2>
                    <p>${error.message}</p>
                    <p style="font-size: 0.9em; color: #666; margin-top: 2vw;">
                        Verifique se os arquivos estão em ./src/slides/ ou ./slides/
                    </p>
                </div>
            `;
            window.__slidesLoading = false;
        }
    }
    
    /**
     * Inicializar quando DOM estiver pronto
     */
    function init() {
        // Prevenir múltiplas inicializações
        if (window.__slideLoaderInitialized) {
            return;
        }
        window.__slideLoaderInitialized = true;
        
        // Limpar viewport antes de carregar (evitar duplicatas)
        const viewport = document.getElementById('viewport');
        if (viewport) {
            viewport.innerHTML = '';
        }
        
        // Aguardar módulos de slides carregarem antes de inicializar
        if (document.readyState === 'loading') {
            // Adicionar listener apenas uma vez
            if (!window.__domContentLoadedListener) {
                window.__domContentLoadedListener = loadSlides;
                document.addEventListener('DOMContentLoaded', window.__domContentLoadedListener, { once: true });
            }
        } else {
            // DOM já está pronto, carregar imediatamente
            loadSlides();
        }
    }
    
    // Executar apenas se ainda não foi executado
    if (!window.__slideLoaderInitialized) {
        init();
    }
})();