# Restrições para assistentes de IA — CSS, JS e scripts de export

**Público:** ChatGPT, Claude, Cursor e outros assistentes que possam editar este repositório.  
**Objetivo:** Evitar que mudanças em CSS, JS ou scripts de export desfaçam o trabalho já estabilizado (viewer, PDF 16:9, slide 8 “Utilidade em Saúde”, overflow, capa/contracapa).

**Regra PDF vs index/print:** Ajustes de fit, proporção, delay ou margens que afetem o **resultado do PDF** devem ser feitos **somente** em `scripts/export-osteoporose-pdf.js`. **Não alterar** `OSTEOPOROSE/src/index.html`, `OSTEOPOROSE/src/print.html`, nem o CSS/JS do viewer (viewer.css, viewer.js, print.css, base.css) para corrigir comportamento do PDF.

---

## Regra geral

**NÃO altere** os arquivos listados abaixo a menos que o usuário peça explicitamente e haja plano aprovado. Se for autorizado a alterar, **não remova nem altere** os blocos e regras indicados.

---

## 1. CSS — OSTEOPOROSE

### 1.1 `OSTEOPOROSE/src/css/base.css`

- **Não remover nem alterar:**
  - Tokens `:root` (--navy, --gold, --bg, --muted, etc.).
  - Bloco `#utilidade-grid, .utilidade-grid` (display: grid; grid-template-columns: 300px 1fr; gap; align-items: start; width: 100%).
  - Regras que afetem `.slide`, `.stage`, `.deck` de forma a quebrar 16:9 ou overflow.

### 1.2 `OSTEOPOROSE/src/css/print.css`

- **Não remover nem alterar:**
  - `@page { size: 16.667in 9.375in; margin: 0; }` (ou equivalente).
  - Bloco `html.is-print #utilidade-grid, html.is-print .utilidade-grid` (display: grid; grid-template-columns: 300px 1fr; etc.).
  - `html.is-print`, `html.is-print body` (overflow: hidden / overflow-x / overflow-y).
  - Regras de `.slide` em print (dimensões 16.667in × 9.375in, page-break-after: always, overflow: hidden, print-color-adjust: exact).
  - Regras de capa e contracapa (primeiro e segundo slide: fundo navy, display flex, centralização).
  - `backdrop-filter: none` em `.slide *` no print.
  - Regras de `.stage`, `.deck`, `.slides` em print (width, height: auto, overflow).

### 1.3 `OSTEOPOROSE/src/css/viewer.css` e `blocks.css`

- Não remover regras que definam stage/deck 16:9, overflow do viewer ou estilos de blocos já usados nos slides.

---

## 2. JavaScript — OSTEOPOROSE

### 2.1 `OSTEOPOROSE/src/js/viewer.js`

- **Formato apresentação:** Não reduzir `maxScale` em `fitToScreen()` (deve permitir até 3x em qualquer modo). Limitar a 1.2x em janela normal voltava a criar margens pretas em monitores grandes.
- Não remover nem alterar: dimensões do stage (16:9), navegação por teclado/setas, integração com slide-loader, lógica de overflow/scale (fitSlideOverflow ou equivalente).

### 2.2 `OSTEOPOROSE/src/js/slide-loader.js`

- Não remover nem alterar: leitura de `slides/_list.txt`, injeção de `<section class="slide">` no container `[data-slides]`, uso de `elementFromHTML` para os arquivos listados.

### 2.3 `OSTEOPOROSE/src/js/navigation.js` e `print-fit.js`

- Não remover lógica de navegação nem ajustes de escala/overflow para impressão/PDF.

---

## 3. Scripts de export e build

### 3.1 `scripts/export-osteoporose-pdf.js`

- **Não remover nem alterar:**
  - Viewport 1600×900 e uso de `preferCSSPageSize: true` em `page.pdf()`.
  - Bloco de estilos injetados (`playwright-print-fix`) que inclui: @page 16.667in 9.375in margin 0; html/body overflow hidden; .stage, .stage__inner, .deck, .slides, .slide com width/height/overflow/page-break corretos; **e o bloco #utilidade-grid, .utilidade-grid (display: grid; grid-template-columns: 300px 1fr; etc.)**.
  - Margem 0 em `page.pdf({ margin: { top: 0, right: 0, bottom: 0, left: 0 } })`.
  - Lógica que aplica estilos de print nos slides (incluindo primeiro e segundo slide para capa/contracapa).

### 3.2 `scripts/build-osteoporose-print-html.js`

- Não remover a geração de `print.html` a partir dos mesmos arquivos em `slides/` que o index usa; manter UTF-8 e configuração 16:9.

---

## 4. Slide 8 (Utilidade em Saúde) — HTML

- O slide está em `OSTEOPOROSE/src/slides/S08_slide-10.html`.
- O container do grid deve manter `id="utilidade-grid"` e `class="utilidade-grid"` e os dois filhos diretos (coluna da régua e coluna das 4 caixas). Não trocar a estrutura para um único bloco vertical; o layout desejado é **régua à esquerda, 4 caixas à direita**.

---

## 5. Ao fazer qualquer alteração permitida

1. Ler a última entrada do `CHANGELOG.md`.
2. Documentar no CHANGELOG o que foi alterado e o que foi preservado.
3. Não remover os blocos listados neste arquivo; apenas acrescentar ou ajustar dentro desses limites, se combinado com o usuário.

---

## 🔴 HARD CONSTRAINTS (INVIOLÁVEIS)

### HC1: DOCUMENTAÇÃO OBRIGATÓRIA
Toda mudança em código (CSS, JS, HTML de slides, scripts) **DEVE** ser acompanhada de:
- [ ] Atualização do `CHANGELOG.md` na raiz (o que mudou, por quê)
- [ ] Se estrutura/arquitetura mudar: atualizar `README.md`
- [ ] Se for GRADE: atualizar `GRADE/CHANGELOG.md`

**NUNCA** finalizar uma tarefa de código sem atualizar a documentação.

### HC2: CSS MÍNIMO
- **Preferir** usar classes existentes a criar novas
- **Preferir** ajustar valores em `:root` a criar novos tokens
- **Máximo 5-10 linhas de CSS** por tarefa, a menos que explicitamente autorizado
- Se precisar de mais CSS, **PARE e pergunte** antes de continuar

### HC3: !important PROIBIDO
- **NUNCA** usar `!important` em CSS novo
- **Exceções únicas:** `print.css` para forçar regras de impressão (já existentes)
- Se parecer necessário `!important`, significa que a especificidade está errada → **refatorar seletores**
- Cada `!important` novo requer **aprovação explícita** do usuário

### HC4: VERIFICAÇÃO PÓS-MUDANÇA
Após qualquer mudança em CSS:
1. Contar quantos `!important` existem: `grep -c "!important" OSTEOPOROSE/src/css/*.css`
2. Se aumentou → **reverter e refazer**
3. Testar visualmente no viewer E no print mode

---

*Atualizado: 2026-02-02*
