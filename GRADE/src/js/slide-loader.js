/**
 * SLIDE LOADER - Carrega slides dinamicamente de arquivos separados
 * 
 * Este módulo:
 * 1. Carrega cada slide de GRADE/src/slides/
 * 2. Insere no #viewport
 * 3. Re-inicializa o sistema de slides após carregar tudo
 */

(function() {
    'use strict';
    
    // Lista de slides na ordem correta
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
        'S21.html',
        'S22.html',
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
        'S33.html',
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
    
    /**
     * Carrega todos os slides e insere no viewport
     */
    async function loadSlides() {
        const viewport = document.getElementById('viewport');
        
        if (!viewport) {
            console.error('❌ #viewport não encontrado!');
            return;
        }
        
        console.log(`📚 Carregando ${slideFiles.length} slides...`);
        
        try {
            // Detectar path correto baseado no contexto
            // Se estamos em src: ./slides/
            // Se estamos em dist: ../src/slides/
            // Tentar primeiro ./slides/, se falhar, tentar ../src/slides/
            async function loadSlideFile(file) {
                const paths = ['./slides/', '../src/slides/'];
                
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
                throw new Error(`Erro ao carregar ${file}: não encontrado em nenhum path`);
            }
            
            // Carregar todos os slides em paralelo
            const promises = slideFiles.map(file => loadSlideFile(file));
            
            const slideContents = await Promise.all(promises);
            
            // Inserir slides no viewport na ordem correta
            slideContents.forEach((html, index) => {
                viewport.insertAdjacentHTML('beforeend', html);
                console.log(`  ✓ ${slideFiles[index]} carregado`);
            });
            
            console.log('✅ Todos os slides carregados!');
            
            // Aguardar um frame para garantir que o DOM foi atualizado
            requestAnimationFrame(() => {
                // Disparar evento customizado para que init.js saiba que slides foram carregados
                window.dispatchEvent(new CustomEvent('slidesloaded'));
                
                // Tentar inicializar imediatamente se os módulos já estiverem disponíveis
                initializeSlideSystem();
            });
            
        } catch (error) {
            console.error('❌ Erro ao carregar slides:', error);
            viewport.innerHTML = `
                <div style="padding: 5vw; text-align: center; color: #d32f2f;">
                    <h2>Erro ao carregar slides</h2>
                    <p>${error.message}</p>
                    <p style="font-size: 0.9em; color: #666; margin-top: 2vw;">
                        Verifique se os arquivos estão em ./slides/
                    </p>
                </div>
            `;
        }
    }
    
    /**
     * Inicializar sistema de slides após slides serem carregados
     */
    function initializeSlideSystem() {
        if (window.SlideCore && typeof window.SlideCore.init === 'function') {
            if (window.SlideCore.init()) {
                // Se já tiver navegação e viewport, re-inicializar também
                if (window.SlideNavigation) {
                    window.SlideNavigation.init();
                }
                if (window.SlideViewport) {
                    window.SlideViewport.init();
                }
                
                // Mostrar slide ativo (primeiro slide com .active ou slide 0)
                const state = window.SlideCore.getState();
                if (state) {
                    window.SlideCore.showSlide(state.currentIndex);
                    if (window.SlideCore.animateBars) {
                        window.SlideCore.animateBars();
                    }
                }
                
                console.log('✅ Sistema de slides inicializado');
            } else {
                console.warn('⚠️ Falha ao inicializar slides');
            }
        } else {
            // Se os scripts ainda não carregaram, aguardar um pouco mais
            setTimeout(initializeSlideSystem, 50);
        }
    }
    
    /**
     * Inicializar quando DOM estiver pronto
     */
    function init() {
        // Aguardar módulos de slides carregarem antes de inicializar
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadSlides);
        } else {
            // DOM já está pronto, carregar imediatamente
            loadSlides();
        }
        
        // Também escutar evento de slides carregados (caso init.js precise)
        window.addEventListener('slidesloaded', initializeSlideSystem);
    }
    
    // Executar
    init();
    
})();
