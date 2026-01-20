# 📦 Modularização de Slides - Documentação Técnica

## 📋 Visão Geral

O arquivo `GRADE/src/index.html` foi **modularizado** em **42 slides separados** para melhorar manutenibilidade, versionamento e colaboração.

**Data:** 2026-01-19  
**Status:** ✅ Completo

---

## 🏗️ Estrutura Atual

### Antes (Monolítico):
- `GRADE/src/index.html` → ~3400 linhas com 42 slides embutidos

### Depois (Modular):
- `GRADE/src/index.html` → 40 linhas (template limpo)
- `GRADE/src/slides/` → 42 arquivos individuais:
  - `S01.html` - Slide 1 (Capa)
  - `S02.html` - Slide 2
  - ...
  - `S42.html` - Slide 42

---

## 🔄 Como Funciona

### 1. Carregamento Dinâmico

O arquivo `GRADE/src/js/slide-loader.js` carrega os slides dinamicamente:

```javascript
// Lista de slides na ordem correta
const slideFiles = ['S01.html', 'S02.html', ..., 'S42.html'];

// Carrega todos os slides via fetch() e insere no #viewport
async function loadSlides() {
    // Carrega cada slide
    // Insere no DOM
    // Dispara evento 'slidesloaded'
}
```

### 2. Inicialização do Sistema

O `init.js` aguarda o evento `slidesloaded` antes de inicializar:

```javascript
// Aguarda slides serem carregados
window.addEventListener('slidesloaded', initSlideSystem);
```

### 3. Detecção Automática de Path

O slide-loader detecta automaticamente o contexto (src vs dist):

- **Em `src/`:** Usa `./slides/`
- **Em `dist/`:** Usa `../src/slides/` (GitHub Pages transforma em `./src/slides/`)

---

## 📝 Para Editores de Slides (Claude Conteúdo, ChatGPT)

### ✅ COMO TRABALHAR:

1. **Editar slide específico:**
   - Abra `GRADE/src/slides/S{número}.html`
   - Edite o conteúdo do slide
   - Salve o arquivo

2. **Criar novo slide:**
   - Crie `S{número}.html` em `GRADE/src/slides/`
   - Adicione o nome do arquivo em `slide-loader.js` (array `slideFiles`)
   - Atualize `index.html` se necessário (totalSlides)

3. **Reordenar slides:**
   - Reordene os arquivos em `slide-loader.js` (array `slideFiles`)
   - Mantenha a ordem numérica (S01, S02, ..., S42)

### ⚠️ IMPORTANTE:

- **Preserve estrutura:** Cada slide deve ser uma `<section class="slide">...</section>`
- **Mantenha atributos:** `class`, `id`, `style` devem ser preservados
- **Primeiro slide:** S01.html deve ter `class="slide active"` (outros apenas `class="slide"`)
- **Paleta oficial:** Use `var(--navy)`, `var(--gold)`, etc (nunca cores hardcoded)

---

## 🛠️ Para Desenvolvedores Técnicos (Auto/Claude Técnico)

### Scripts Disponíveis:

1. **`scripts/extract-slides.js`**
   - Extrai slides de `GRADE/src/index.html`
   - Cria arquivos individuais em `GRADE/src/slides/`
   - **Uso:** `node scripts/extract-slides.js`

2. **`scripts/sync-grade-dist.js`**
   - Sincroniza `src/index.html` → `dist/index.html`
   - Ajusta paths relativos
   - **Uso:** `npm run sync-grade` ou `node scripts/sync-grade-dist.js`

### Workflow GitHub Pages:

O workflow `.github/workflows/pages.yml`:
1. Copia `GRADE/dist/*` para `_site/grade/`
2. Copia `GRADE/src/css` para `_site/grade/src/css/`
3. Copia `GRADE/src/js` para `_site/grade/src/js/`
4. **Copia `GRADE/src/slides` para `_site/grade/src/slides/`** ← NOVO

---

## ✅ Validação

### Checklist:

- [ ] 42 arquivos em `GRADE/src/slides/` (S01.html a S42.html)
- [ ] `index.html` tem ~40 linhas (template limpo)
- [ ] `slide-loader.js` existe e tem lista completa de slides
- [ ] `init.js` aguarda evento `slidesloaded`
- [ ] Slides carregam corretamente no navegador
- [ ] Navegação funciona (anterior/próximo)
- [ ] Contador de slides atualiza corretamente

### Testes:

1. **Teste local:**
   ```bash
   # Servidor local
   cd GRADE/src
   python -m http.server 8000
   # Abra: http://localhost:8000/index.html
   ```

2. **Verificar console:**
   - Deve mostrar: `📚 Carregando 42 slides...`
   - Deve mostrar: `✅ Todos os slides carregados!`
   - Deve mostrar: `✅ Sistema de slides inicializado`

---

## 📚 Referências

- **CHANGELOG:** `docs/CHANGELOG.md` (entrada 2026-01-19)
- **README:** `README.md` (seção "Estrutura do Projeto")
- **Script de extração:** `scripts/extract-slides.js`
- **Loader:** `GRADE/src/js/slide-loader.js`

---

## 🔄 Atualizações Futuras

### Melhorias Planejadas:

- [ ] Suporte a lazy loading (carregar slides sob demanda)
- [ ] Cache de slides no localStorage
- [ ] Hot-reload durante desenvolvimento
- [ ] Validação automática de estrutura de slides
- [ ] Script de validação de paleta em todos os slides

---

**Última atualização:** 2026-01-19  
**Versão:** 1.0  
**Status:** ✅ Estável
