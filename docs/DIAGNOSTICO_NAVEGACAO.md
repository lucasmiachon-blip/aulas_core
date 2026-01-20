# 🔍 DIAGNÓSTICO: Navegação pulando de 3 em 3 slides

**Data:** 2024-12-28  
**Problema:** Navegação pula slides (1 → 4 → 7 → 10, incremento de +3)  
**Contador:** X / 41 slides  

---

## ✅ TAREFA 1: ORDEM DE CARREGAMENTO DOS SCRIPTS

**Status:** ✅ VERIFICADO

### Scripts no `index.html` (ordem exata):
```html
32: <script src="./js/slide-loader.js"></script>
35: <script defer src="./js/slide-system/slide-core.js"></script>
36: <script defer src="./js/slide-system/slide-navigation.js"></script>
37: <script defer src="./js/slide-system/slide-viewport.js"></script>
38: <script defer src="./js/slide-system/init.js"></script>
```

**Análise:**
- ✅ `slide-loader.js` carrega SEM `defer` → executa imediatamente
- ✅ Outros scripts têm `defer` → executam após DOM estar pronto
- ⚠️ **PROBLEMA POTENCIAL:** `slide-loader.js` não tem `defer`, mas já tem proteção interna

**Conclusão:** Ordem parece correta, mas pode haver race condition.

---

## ✅ TAREFA 2: MULTIPLICAÇÕES POR 3

**Status:** ✅ VERIFICADO - NENHUMA ENCONTRADA

### Busca realizada:
```bash
grep -r "\* 3|\*3|index \* 3|currentIndex \* 3" GRADE/src/js
```

**Resultados:**
- ❌ Nenhuma multiplicação por 3 encontrada
- ❌ Nenhum incremento de +3 encontrado
- ✅ Apenas incrementos normais: `+ 1`, `++`

**Código relevante encontrado:**
- `slide-navigation.js:13`: `nextIndex = (currentIndex + 1) % state.slides.length`
- `slide-navigation.js:21`: `prevIndex = (currentIndex - 1 + state.slides.length) % state.slides.length`

**Conclusão:** Não há código explícito que multiplique por 3.

---

## ✅ TAREFA 3: FLUXO DE INICIALIZAÇÃO

**Status:** ✅ ANALISADO

### Fluxo identificado:

```
1. index.html carrega
   ↓
2. slide-loader.js executa (SEM defer)
   → init() verifica window.__slideLoaderInitialized
   → loadSlides() dispara
   → Carrega 42 slides (S01-S42) via fetch
   → Dispara evento 'slidesloaded'
   ↓
3. Scripts com defer executam (após DOM pronto)
   ↓
4. init.js escuta 'slidesloaded'
   → initSlideSystem() executa
   → Verifica window.__slideSystemInitialized
   → Chama SlideCore.init()
   → Chama SlideNavigation.init()
   → Chama SlideViewport.init()
```

**Proteções encontradas:**
- ✅ `window.__slideLoaderInitialized` em slide-loader.js
- ✅ `window.__slideSystemInitialized` em init.js
- ✅ `window.__slideCoreInitialized` em slide-core.js
- ✅ `initialized` (local) em slide-navigation.js

**Análise:**
- ⚠️ **POSSÍVEL PROBLEMA:** Se `init()` for chamado múltiplas vezes (mesmo com flags), pode criar listeners duplicados

**Conclusão:** Fluxo parece correto, mas flags podem não estar funcionando.

---

## ✅ TAREFA 4: ARRAY DE SLIDES

**Status:** ✅ ANALISADO

### Código em `slide-core.js:32-33`:
```javascript
const allSlidesInDOM = document.querySelectorAll('.slide');
state.slides = Array.from(allSlidesInDOM);
```

**Análise:**
- ✅ Usa `querySelectorAll('.slide')` → busca TODOS os slides no DOM
- ✅ Converte para array com `Array.from()`
- ✅ Não há filtros aplicados

**Proteção contra duplicatas:**
- ✅ Linhas 49-66: Remove slides duplicados baseado em `data-slide-id`
- ✅ Linhas 41-47: Adiciona `data-slide-id` se ausente

**Conclusão:** Array deve conter todos os slides em ordem. Não há evidência de índices vazios.

---

## ✅ TAREFA 5: EVENT LISTENERS

**Status:** ✅ VERIFICADO

### Listeners encontrados:

**1. `slide-navigation.js:46`**:
```javascript
window.addEventListener('keydown', window._slideKeyHandler);
```
- ✅ **PROTEÇÃO:** Remove listener antigo antes de adicionar (linha 28-30)
- ✅ **PROTEÇÃO:** Handler armazenado em `window._slideKeyHandler`
- ⚠️ **POSSÍVEL PROBLEMA:** Se `setupKeyboard()` for chamado múltiplas vezes, pode adicionar listeners mesmo removendo os antigos

**2. `slide-viewport.js:41`**:
```javascript
window.addEventListener('slidechange', () => { ... });
```
- ⚠️ **PROBLEMA:** Listener sem proteção contra duplicação!
- ⚠️ **PROBLEMA:** Se `init()` for chamado múltiplas vezes, adiciona listeners duplicados
- ⚠️ **PROBLEMA:** Não há flag para prevenir múltiplas inicializações

**Conclusão:** ⚠️ **ENCONTRADO PROBLEMA:** `slide-viewport.js` não tem proteção contra inicializações múltiplas!

---

## ✅ TAREFA 6: CÓDIGO OCULTO

**Status:** ✅ VERIFICADO

### Arquivos .js encontrados:
```
GRADE/src/js/
├── slide-loader.js ✅
├── slide-system/
│   ├── slide-core.js ✅
│   ├── slide-navigation.js ✅
│   ├── slide-viewport.js ✅
│   └── init.js ✅
```

**Total:** 5 arquivos JavaScript

**Análise:**
- ✅ Nenhum arquivo oculto encontrado
- ✅ Todos os arquivos foram analisados
- ✅ Nenhum `setInterval` ou `setTimeout` com lógica de navegação encontrado

**Conclusão:** Não há código oculto causando o problema.

---

## ✅ TAREFA 7: ANÁLISE DE PATHS

**Status:** ✅ VERIFICADO

### `slide-loader.js` - Array `slideFiles`:
```javascript
const slideFiles = [
    'S01.html', 'S02.html', 'S03.html', 'S04.html', 'S05.html',
    ...
    'S21.html', 'S22.html', ...
    'S41.html', 'S42.html'
];
```

**Total:** 42 slides declarados

### Slides no diretório:
```
GRADE/src/slides/
- S01.html até S42.html (42 arquivos)
- S21.html EXISTE (não foi removido)
```

**Análise:**
- ✅ 42 slides declarados no array
- ✅ 42 arquivos no diretório
- ⚠️ **DIFERENÇA:** Usuário disse que S21 foi removido, mas arquivo existe
- ⚠️ **DIFERENÇA:** Contador mostra 41 slides, mas array tem 42

**Conclusão:** ⚠️ **POSSÍVEL PROBLEMA:** Discrepância entre slides declarados (42) e slides esperados (41).

---

## 🎯 CONCLUSÃO E SUSPEITAS

### Problemas identificados:

1. ⚠️ **`slide-viewport.js` não tem proteção contra inicializações múltiplas**
   - **Impacto:** Pode criar listeners duplicados no evento `slidechange`
   - **Ação:** Adicionar flag de inicialização

2. ⚠️ **Discrepância entre slides declarados (42) e esperados (41)**
   - **Impacto:** Pode causar índices incorretos
   - **Ação:** Verificar se S21 está vazio ou corrompido

3. ⚠️ **Race condition entre `slide-loader.js` (sem defer) e scripts com defer**
   - **Impacto:** Pode causar inicialização prematura
   - **Ação:** Adicionar `defer` em `slide-loader.js` ou garantir sincronização

### Hipótese principal:

**O problema pode estar em:**
- **Hipótese A:** `slide-viewport.js` cria listeners duplicados que disparam `next()` múltiplas vezes
- **Hipótese B:** Algum slide está falhando ao carregar (S21?), causando espaços vazios no array
- **Hipótese C:** Múltiplas inicializações apesar das flags (race condition)

---

## 🛠️ PRÓXIMOS PASSOS

1. ✅ Adicionar proteção de inicialização em `slide-viewport.js`
2. ✅ Verificar conteúdo do S21.html (vazio ou corrompido?)
3. ✅ Adicionar logs de debug para rastrear inicializações
4. ✅ Verificar se há slides vazios no DOM após carregamento

---

**Gerado em:** 2024-12-28  
**Status:** 🔍 INVESTIGAÇÃO EM ANDAMENTO
