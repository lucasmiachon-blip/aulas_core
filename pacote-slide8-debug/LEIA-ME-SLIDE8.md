# Pacote mínimo — Slide 8 (Utilidade em Saúde) — Viewer / Print / PDF

Use este pacote para consertar o slide 8 no viewer, na prévia de impressão e no PDF (margens, corte, vazamento).

---

## 1. Arquivos que você precisa anexar (não estão no zip)

| Item | Status | Ação |
|------|--------|------|
| **PDF com o problema** | ❌ Não incluído | Anexe o PDF exportado que está ruim (ex.: `OSTEOPOROSE-slides.pdf` ou “backup convencional”). |
| **PDF “bom” antigo** (se tiver) | ❌ Não incluído | Anexe para comparação. |
| **2 screenshots do slide 8** | ❌ Não incluído | 1) Viewer (tela) — onde o 8 está errado (cortando, sumindo, vazando). 2) Print preview (prévia de impressão do navegador). Se puder, marque com setas/círculo o que “sumiu” ou “vazou”. |
| **Versões** | ❌ Preencher | Navegador (Chrome/Edge/Firefox + versão), SO (Windows/Mac/Linux). Ex.: Chrome 120, Windows 11. |

---

## 2. index.html — &lt;head&gt; e estrutura do container

**Ordem dos CSS:**
1. `css/base.css`
2. `css/blocks.css`
3. `css/viewer.css`
4. `css/print.css`

**Ordem dos scripts:**
1. `js/slide-loader.js` (defer)
2. `js/viewer.js` (defer)

**Estrutura do container (hierarquia):**
- `.viewer` (data-viewer) — wrapper principal
  - `header.viewer__bar` — barra de navegação
  - `main.stage` (#stage)
    - `.stage__inner` (data-stage-inner)
      - `.deck.deck--fixed` (data-deck)
        - `.slides` (data-slides) — **aqui são injetados os `<section class="slide">`**

Trecho completo está em: **01-index-head-and-structure.html**

---

## 3. print.css — regras de impressão

- **@page:** `size: 16.667in 9.375in; margin: 0;`
- **@media print:** html/body (overflow: hidden, height: auto), .stage, .stage__inner (width 16.667in, height: auto, overflow: visible), .deck, .slides, .slide (16.667in × 9.375in, overflow: hidden, page-break-after: always).
- **#utilidade-grid, .utilidade-grid:** em print: `display: grid; grid-template-columns: 300px 1fr; gap: 24px; align-items: start; width: 100%`.

Arquivo completo: **02-print.css**

---

## 4. CSS que manda no slide no modo tela (viewer)

- **viewer.css:** `.viewer` (height: 100vh/100dvh), `.stage` (flex:1, overflow: hidden), `.stage__inner` (1600×900px, transform: scale(var(--scale)), overflow: hidden), `.deck--fixed` (1600×900, overflow: hidden), `.slides` (position: relative, height: 100%, overflow: hidden), `.slide` (width/height 100%, overflow: hidden, display: none), `.slide.is-active` (display: block).
- **base.css:** `.slide` (overflow: hidden; padding 32px 48px), `.slide[data-overflow="allow"]` (overflow-y: auto; overflow-x: hidden), **#utilidade-grid, .utilidade-grid** (display: grid; grid-template-columns: 300px 1fr; gap: 24px; align-items: start; width: 100%).

Arquivos: **03-viewer.css**, **04-base-slide-rules.css**

---

## 5. Conteúdo do slide 8 (HTML)

- **Arquivo fonte:** `OSTEOPOROSE/src/slides/S08_slide-08.html` (na ordem atual; antes era S08_slide-10.html).
- **Título:** “O que é Utilidade em Saúde?”
- **Estrutura importante:** `<section class="slide" id="slide-10" data-overflow="allow">` → dentro, `<div id="utilidade-grid" class="utilidade-grid">` com **2 colunas:** (1) régua vertical (height: 280px) com setas/níveis; (2) 4 caixas (boxes) em coluna. Classes: grid de 300px + 1fr, caixas com border-left, border-radius, padding.

Cópia integral: **05-S08_slide-08.html**

---

## 6. README / instruções / restrições

- **Export / Print:** O PDF é gerado por **script Playwright** (`scripts/export-osteoporose-pdf.js`). Ver seção “Como você gera o PDF” abaixo. Instruções de uso em `scripts/INSTRUCOES.md` (foco em GRADE; OSTEOPOROSE usa o mesmo Node/Playwright).
- **Restrições (guardrails):** `scripts/AI-RESTRICTIONS.md` — não remover/aleter: @page 16.667×9.375in, margin 0, #utilidade-grid/.utilidade-grid, regras de .slide em print, overflow, print-color-adjust, capa/contracapa. Não alterar index/print/viewer CSS para “consertar” o PDF; ajustes de PDF devem ser no script de export.

Resumo em: **06-INSTRUCOES-AI-RESTRICTIONS-excerpt.txt**

---

## 7. Changelog / o que foi mudado (commits recentes)

- Slides renomeados por ordem (S01_slide-01 … S73_slide-73), validação _list vs _meta.
- Sync print.html; docs: ajustes PDF somente no script de export.
- Viewer formato apresentação; doc para não reverter.
- Guardrails CSS/JS para IA + PDF OSTEOPOROSE + slides/print.
- PDF em formato apresentação (index?print=1, 73 páginas, 9.35in).
- Overflow zerado em S39, S46, S59, S67, S68; ajustes S35, S48, S53, S64; viewer estável 1600×900, audit overflow, ajuste slides S07–S56.

Lista completa: **08-CHANGELOG-commits.txt**

---

## 8. Como você gera o PDF (muito importante)

- **Método:** Script Node (Playwright) — **não** é Ctrl+P manual.
- **Comando:** Na raiz do projeto: `node scripts/export-osteoporose-pdf.js`.
- **URL usada:** Preferência por `http://127.0.0.1:5500/OSTEOPOROSE/src/index.html?print=1` (Live Server 5500); fallbacks: localhost:800, 8000, e `print.html`.
- **Configurações:**
  - **Tamanho da página:** 16.667in × 9.375in (definido por CSS @page; `preferCSSPageSize: true`).
  - **Margens do print:** `margin: { top: 0, right: 0, bottom: 0, left: 0 }`.
  - **Scale:** 100% (viewport 1600×900; página segue @page).
  - **Print background graphics:** `printBackground: true`.
- O script injeta um bloco de estilos `#playwright-print-fix` com @page, html/body, .stage, .stage__inner, .deck, .slides, .slide e **#utilidade-grid, .utilidade-grid** para garantir layout no PDF.

Detalhes do script: **07-export-pdf-options-and-playwright-fix.txt**

---

## 9. Versões (preencher / anexar)

- **Navegador:** _Ex.: Chrome 120, Edge 119_
- **Sistema operacional:** _Ex.: Windows 11, macOS 14_

*(Preencha e anexe ao enviar o pacote.)*
