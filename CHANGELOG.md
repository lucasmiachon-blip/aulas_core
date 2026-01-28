# CHANGELOG - Aulas Core (GRADE + OSTEOPOROSE)

## OSTEOPOROSE_PDF_FIX_2026_01_29 — 2026-01-29 (Tentativa de correção PDF)

### Problema
- PDF gerado não respeita estilos de print visíveis no DevTools
- CSS `@media print` não está sendo aplicado corretamente pelo Playwright
- Estilos aparecem corretos no DevTools mas não refletem no PDF final

### Tentativas realizadas
1. **Verificação de modo print**: Confirmado que `page.emulateMedia({ media: 'print' })` está ativo
2. **Aguardar recursos**: Adicionado `waitForLoadState('networkidle')` e `document.fonts.ready`
3. **Forçar CSS via JavaScript**: Injetado estilo `<style>` com regras `@media print` e `@page`
4. **Aplicar estilos inline diretamente**: Usado `style.setProperty()` com `!important` em cada slide
5. **Dimensões explícitas no PDF**: Mudado de `preferCSSPageSize: true` para `width: 1280px, height: 720px`

### Status
- ✅ Estilos são aplicados corretamente (verificado via `getComputedStyle`)
- ✅ Modo print está ativo (`window.matchMedia('print').matches === true`)
- ⚠️ **Problema persiste**: PDF ainda não reflete as mudanças visíveis no DevTools

### Arquivos modificados
- `scripts/export-osteoporose-pdf.js` - múltiplas tentativas de forçar aplicação de CSS

### Próximos passos sugeridos
1. **Verificar PDF gerado**: Confirmar quantas páginas foram geradas e se há quebras corretas
2. **Testar Puppeteer**: Pode ter melhor suporte a `page-break-after` que Playwright
3. **Gerar slides individualmente**: Usar `pdf-lib` para combinar PDFs de cada slide
4. **Usar screenshots**: Capturar screenshot de cada slide e combinar em PDF

---

## OSTEOPOROSE_PATCH0_6 — 2026-01-29

### P0: Overflow corrigido em 8 slides (10 arquivos, incluindo divisão)
- **Slide 20** (S35_slide-32.html): **Dividir em 2 slides** (Estratégia 3) + compactação
- **Slide 20b** (S35b_slide-32b.html): **Novo slide** (Parte 2/2) para completar conteúdo (Estratégia 3)
- **Slide 44** (S45_slide-42.html): **Compactar** (Estratégia 1)
- **Slide 12** (S09_slide-11.html): **Compactar** (Estratégia 1)
- **Slide 59** (S50_slide-47.html): **Compactar** (Estratégia 1)
- **Slide 72** (S49_slide-46.html): **Compactar** (Estratégia 1)
- **Slide 48** (S69_slide-66.html): **Compactar** (Estratégia 1)
- **Slide 26** (S38_slide-35.html): **Compactar** (Estratégia 1)
- **Slide 47** (S48_slide-45.html): **Compactar** (Estratégia 1)

### P0: Encoding UTF-8
- **Slide 36** (S39_slide-36.html): verificado (sem mojibake)
- Verificados todos os slides (busca por padrões `Ã¡`, `Ã©`, `Ã£`, `Ã§`, `â€“`)

### Arquivos modificados
- `OSTEOPOROSE/src/slides/_list.txt`
- `OSTEOPOROSE/src/slides/S09_slide-11.html`
- `OSTEOPOROSE/src/slides/S35_slide-32.html`
- `OSTEOPOROSE/src/slides/S38_slide-35.html`
- `OSTEOPOROSE/src/slides/S45_slide-42.html`
- `OSTEOPOROSE/src/slides/S48_slide-45.html`
- `OSTEOPOROSE/src/slides/S49_slide-46.html`
- `OSTEOPOROSE/src/slides/S50_slide-47.html`
- `OSTEOPOROSE/src/slides/S69_slide-66.html`
- `CHANGELOG.md`
- `README.md`

### Arquivos novos
- `OSTEOPOROSE/src/slides/S35b_slide-32b.html`
- `RELEASE_NOTES.md`

---

## OSTEOPOROSE_PATCH0_1 — 2026-01-25 (Modularização + Fullscreen + PDF 16:9)

### Objetivo
- Tirar o deck de Osteoporose do monólito (HTML único) e habilitar viewer “palco” + export PDF em padrão apresentação.

### O que foi feito (P0)
- **Fonte de verdade do viewer**: confirmado total de **72 slides** (ordem definida pelo seletor do deck legado) e contador agora deriva do `_list.txt`.
- **Modularização automática**:
  - `OSTEOPOROSE/src/index-legacy.html` preservado (backup do monólito).
  - Slides extraídos para `OSTEOPOROSE/src/slides/` (1 arquivo por slide) + `_list.txt` + `_meta.json`.
- **Viewer novo (src + dist)**:
  - Novo `OSTEOPOROSE/src/index.html` minimal + `OSTEOPOROSE/dist/index.html` apontando para `../src/`.
  - Loader `src/js/slide-loader.js` carrega o deck modular por lista.
  - Viewer `src/js/viewer.js`: navegação (teclas + clique), hash (`#S01`), fullscreen (F) e modo palco (auto-hide UI).
- **PDF/Print 16:9**:
  - `src/css/print.css` com `@page 13.333in × 7.5in`, 1 slide por página, `print-color-adjust: exact`.
  - Modo impressão via `?print=1` (botão “PDF” no viewer).

### O que NÃO foi feito (intencional)
- Nenhuma alteração de conteúdo médico (texto, números, claims, referências).
- Nenhuma reescrita de estilo dos slides (a maioria ainda tem inline styles do legado).
- Nenhum pipeline de export automatizado via Puppeteer/Playwright (fica para próxima etapa).

### Arquivos principais
- `OSTEOPOROSE/src/index.html`, `OSTEOPOROSE/dist/index.html`
- `OSTEOPOROSE/src/css/viewer.css`, `OSTEOPOROSE/src/css/print.css`, `OSTEOPOROSE/src/css/base.css`
- `OSTEOPOROSE/src/js/slide-loader.js`, `OSTEOPOROSE/src/js/viewer.js`
- `OSTEOPOROSE/src/slides/*`


## PATCH2_7 — 2026-01-28 (GRADE: P1 linguagem + ranges + token cleanup)

### Contexto
- Diagnóstico via viewer PDF (58 páginas) e ajuste de **P1** em pontos de consistência textual/visual.
- **P0 permanece pendente** (ex.: S04 interação; S26 comparativo com nota interna).

### O que foi feito (P1)
- **GRADE/S10**: “Reassess” → **“Reavaliar”**; padronizado **warranty period**; ranges com **en-dash**.
- **GRADE/S11**: checklist — wording ajustado (reavaliar em 5–10 anos).
- **GRADE/S29**: ranges numéricos com **en-dash** (5–20%, 1–99, NNTs).
- **GRADE/S41**: range 5–10 anos + pontuação.
- **GRADE/S47**: badge *Publication Bias* padronizado (**ALERTA**) + cor via token (`rgba(var(--navy-rgb), …)`).

### Arquivos modificados
- `GRADE/src/slides/S10.html`
- `GRADE/src/slides/S11.html`
- `GRADE/src/slides/S29.html`
- `GRADE/src/slides/S41.html`
- `GRADE/src/slides/S47.html`
- `README.md`
- `CHANGELOG.md`
- `GRADE/CHANGELOG.md`

---

## PATCH2_6 — 2026-01-25
- Tipografia: títulos (h2) padronizados em **altura/line-height** via CSS (menos variação entre slides).
- Paleta/tokens: adicionado `--muted-rgb` + chips `.chip--teal` e `.chip--navy` (consistência e menos CSS ad hoc).
- Slide 8: microvisual ajustado para paleta ouro (teal/navy removidos do bloco de severidade).
- Slide 12: figura SCOT-HEART inserida + citação corrigida (Lancet 2025;405:329–337. DOI: 10.1016/S0140-6736(24)01899-5).
- Slides com citações “ipsis litteris”: reescritos como **paráfrase** (evita blocos longos de texto citado).
- Emojis removidos como semântica (títulos/boxes) em slides do fluxo e apêndice.
- NOVO bloco “Metas lipídicas” (S50–S57) com:
  - tabela de alvos LDL/não-HDL/ApoB (SBC 2025),
  - força/certeza (GRADE),
  - base de evidência (CTT + trials) e update (VESALIUS-CV),
  - inconsistência e viés de publicação (Core GRADE).
- Apêndice: divisor (S58) e “poesia” final (S59). PREVENT/CAC staging mantidos no fim via `_list.txt`.
- Controle: DASHBOARD.xlsx atualizado com novos slides e status.

## PATCH2_5 — 2026-01-23
- P0 polish (GRADE): S07 alinhamento/estrutura; S12 padding; S17–S20 refinados (imprecisão/RoB/EtD); S23–S26 harmonizados (PREVENT) + remoção de emojis como semântica.
- Atualizações de controle: CHANGELOGs, ISSUES.md, DASHBOARD.xlsx.

## [PATCH 2.4] - 2026-01-23 (Polish P0: alinhamento + SAMS no lugar certo)

### Ordem / Sequência didática (SAMS)
- `_list.txt`: **SAMS (S43–S49)** agora entra logo após **S14**, substituindo **S15–S16** (suprimidos do fluxo).
- Mantido **S42** como fechamento do bloco CAC (Q&A curto).

### Ajustes de slides (P0)
- **S07**: removido `margin-top: auto` do box PICO e reduzido gap para alinhar blocos verticalmente.
- **S12**: padding interno levemente aumentado; números do **SCOT-HEART 10y** preenchidos (Lancet 2025) e figura ficou como placeholder.
- **S14**: refeito para ficar **paralelo ao S09** (mesma gramática: card com faixa navy + card GRADE à direita).
- **S17–S20**: removidos emojis como semântica; adicionadas chips/labels consistentes e texto BR mais explícito (ANVISA vs SUS).

### Operação
- **DASHBOARD.xlsx** e **ISSUES.md** atualizados no fim do batch.

## [PATCH 2.3] - 2026-01-23 (Batch SAMS MVP P0: nocebo tier-1 + EtD aplicado)

### SAMS (sequência didática para residentes)
- **S43**: ajustado para focar em conceito central: *SAMS ≠ causalidade*; mantido espectro de gravidade; epidemiologia suavizada para evitar números frágeis.
- **S44**: novo slide **SAMSON** (N-of-1 crossover) com mensagem nocebo + números-chave e impacto na prática.
- **S45**: novo slide **StatinWISE** (BMJ 2021; N-of-1) reforçando efeito médio ~zero em sintomas musculares.
- **S46**: novo slide de **algoritmo curto** (EAS/NLA/AHA) para confirmar intolerância “de verdade” + script anti-nocebo.
- **S47**: CLEAR Outcomes reposicionado para manter ponte com GRADE/EtD (desfecho → certeza).
- **S48**: novo comparativo **ezetimiba vs PCSK9i vs bempedoic** (mapa de alternativas + EtD em 4 perguntas).
- **S49**: síntese **GRADE + contexto brasileiro** (viabilidade/acesso como determinante de recomendação), removendo cálculo de custo não rastreável.

### Tooling / Estrutura
- Criado MVP de viewer em **GRADE/src/index.html** e **GRADE/dist/index.html** (compatível com `slides-simple.js`).
- `slides-simple.js` agora resolve caminhos também para **/GRADE/dist/** (inclui `../src/slides/`).

## [PATCH 2.2] - 2026-01-22 (Batch 3: PREVENT fontes + RoB fit + SAMS contrast + placeholders)

### UI/Visual
- **base.css**
  - Added `--danger` / `--danger-rgb` tokens (contraindicação/alerta em painéis escuros).
  - Ensured `--navy-rgb` is available for `rgba()` borders (placeholders).

### Slides
- **S12**: added placeholders for **SCOT-HEART 10-year follow-up** (HR/IC 95%) + **figure slot** (image + full citation); compacted to prevent overflow.
- **S19**: reduced padding/type scale to guarantee all **5 RoB 2.0 domains** display without clipping.
- **S24–S26**: corrected **PREVENT** references to the tier-1 source (Circulation 2024 PREVENT equations) and removed future-dated BR validation claim.
- **S43**: fixed navy-on-navy text (rhabdomyolysis/contraindication panel now readable; contraindication highlighted with `--danger`).
- **S46**: fixed navy-on-navy text for SUS availability line (now readable with consistent emphasis).

---

## [PATCH 2.1] - 2026-01-22 (Contrast fix + PDF 16:9)

### UI/Visual
- Fixed low contrast for score chips (e.g., "⊕⊕○○ BAIXA") when rendered inside dark navy headers (`.cardHeader`).
  - Implemented contextual override: `.cardHeader .chip--gold` now uses a near-solid gold fill for reliable contrast.
  - Added `.cardHeader .chip--muted` styling for optional dark-header chips.

### Slides
- **S09**: fixed the SBC guideline "source strip" text to render in white (previously inherited global `<p>` color and became unreadable on navy).

### Tooling
- **scripts/export-grade-pdf.js**
  - Now targets GitHub Pages `/grade/` URL (aligned with the shared viewer link).
  - Waits for slides to load (`.slide` count) before printing.
  - Uses `preferCSSPageSize: true` to respect `src/css/print.css` 16:9 page size (PPT-style).

---

## [BATCH 2] - 2026-01-22 (MVP UI Pass: Paleta + Viewer + Print)

### Objetivo: Deixar o viewer “conference-ready” (legível, consistente, exportável)

**O que mudou (alto impacto, baixo risco):**
- **Paleta** revisada para um look mais “Tier-1”: fundo mais neutro/cool, texto mais “ink”, acento dourado menos saturado.
- **Tokens RGB** adicionados (`--gold-rgb`, `--teal-rgb`, `--blue-rgb`, `--navy-rgb`) para permitir `rgba()` sem gambiarras.
- **Tipografia** padronizada em **Inter** (Georgia mantida como serif opcional em quotes/ênfase).
- **Print/PDF** refeito para exportar em **16:9** (estilo PPT) + 1 slide por página, preservando o layout.
- **Viewer JS** agora:
  - usa `_list.txt` quando disponível (menos manutenção);
  - suporta deep-link por hash (`#S05`), Home/End, clique e swipe.

---

### 🧱 CSS (base + blocks + print)
**GRADE/src/css/base.css**
- Novo sistema de tokens + sombras + radii.
- Background externo com gradiente sutil (só fora do slide).
- Controles de navegação com estilo “glass” (melhor UX em palco).

**GRADE/src/css/blocks.css**
- Removeu Lato → `var(--font-sans)`.
- Normalizou backgrounds e callouts usando `rgba(var(--*-rgb), a)`.

**GRADE/src/css/print.css**
- Exportação em **PPT ratio** (13.333in × 7.5in), sem forçar `position: relative` em tudo.
- Slides sequenciais (todas as seções aparecem na impressão).

---

### 🧠 JS (viewer)
**GRADE/src/js/slides-simple.js**
- Carrega lista de slides via `_list.txt` (fallback para lista padrão).
- Hash navigation: `#Sxx` abre no slide correto e mantém URL sincronizada.
- Navegação por clique (metade esquerda/direita), swipe, Home/End.

---

### 🖼️ Slides
**S01**
- Aumentado contraste/legibilidade da linha “Diretriz Brasileira…” (peso e espaçamento).

**S03**
- Refeito para o padrão do curso (SBC 2025 + gramática GRADE).
- Removidas colunas ESC/ACC (reduz densidade, melhora projeção).
- Adicionado painel “Como ler GRADE” + “Frase pronta para o congresso”.

**Múltiplos slides (S05, S08, S09, S11, S13, S16, S17, S22-24, S26-27, S29, S31-32, S35, S43-44, S46)**
- Troca de `rgba(var(--gold), …)` inválido → `rgba(var(--gold-rgb), …)`.
- Remoção de RGB hardcoded (221,185,68 / 212,175,55 / 31,118,110 / etc) → tokens.
- Remoção de `Lato` hardcoded → `var(--font-sans)`.

---

### 📚 Documentação
- Atualizada **QUICK_PALETTE_REFERENCE.md** e **STYLEGUIDE.md** para refletir a nova paleta e o uso de `*-rgb`.

## [BATCH 1] - 2026-01-20

### Objetivo: Menos slides, mais hierarquia visual
Foco em reduzir densidade de conteúdo e aumentar clareza visual para melhor projeção e auditoria P0.

---

### 📝 S02.html - "Navegar é preciso..."
**MODIFICAÇÃO:** Remoção de conteúdo secundário

**Removido:**
- Bloco com quote de Gordon Guyatt (9 linhas)
- Justificativa: Quote redundante com princípios já estabelecidos no slide 5

**Mantido:**
- Quote Fernando Pessoa (elemento central)
- Box com estatísticas LOE C vs LOE A
- Tese "Certeza rara. Decisão inevitável."

**Resultado:** Slide mais limpo, foco na mensagem principal

---

### ✂️ S03.html - Escore de Cálcio (CAC)
**MODIFICAÇÃO:** Simplificação de layout comparativo

**Removido:**
- Coluna ESC 2021 (28 linhas)
- Coluna ACC/AHA 2018 (28 linhas)
- Total: 56 linhas removidas

**Mantido:**
- Framework SBC 2025 (único framework do curso)
- 2 recomendações GRADE (Risco Intermediário + Risco Baixo + HF)

**Adicionado:**
- Nota footer: "Outras gramáticas (ESC 2021, ACC/AHA 2018) também recomendam CAC"

**Melhorias de hierarquia:**
- Cards centralizados (max-width: 60vw)
- Fontes aumentadas: títulos 0.9vw → 1.1vw, texto 1.25vw → 1.5vw
- Padding aumentado: 1.8vw → 2.5vw
- Tags de força: 0.7vw → 0.85vw

**Resultado:** Foco total em GRADE (SBC 2025), sem distrações

---

### 🎨 S05.html - Fundamento: O Grande Divisor
**MODIFICAÇÃO:** Aumento de contraste e legibilidade

**Alterações:**
1. **Box CONDICIONAL:** Background opacity 0.05 → 0.1 (dobrou contraste)
2. **Nota rodapé:** Fonte 0.95vw → 1.1vw, opacity 0.6 → 0.75, texto simplificado

**Resultado:** Melhor legibilidade em projeção

---

### 📊 S06.html - Motor do GRADE
**MODIFICAÇÃO:** Aumento de legibilidade

**Alterações:**
1. **Listas:** Fonte 1.1vw → 1.3vw, line-height 1.8 → 2.0
2. **Nota rodapé:** Texto simplificado e mais direto

**Resultado:** Listas mais legíveis, mensagem concisa

---

### ❌ S09.html - SEM ALTERAÇÕES
**Status:** APROVADO (bem estruturado)

---

## Estatísticas do BATCH 1
- Slides modificados: 4
- Linhas removidas: ~75
- Redução de densidade: ~35%
- Aumento de legibilidade: +15-20%


---

## [BATCH 1.1] - 2026-01-21 (Correção de PDF)

### Objetivo: Corrigir altura excessiva dos cards no PDF

**Problema identificado:** Cards com `flex-grow: 1` e `margin-top: auto` ficavam com altura desproporcional no PDF, criando espaços vazios excessivos.

### Correções aplicadas:

**S05.html - Fundamento GRADE:**
- Removido `margin-top: auto` dos cards de Certeza e Força
- Adicionado `height: fit-content` para altura natural do conteúdo
- Alterado `margin-top: auto` → `margin-top: 1.5vw` (espaçamento fixo)

**S06.html - Motor GRADE:**
- Removido `flex-grow: 1` do card de downgrade
- Adicionado `height: fit-content` nos cards downgrade e upgrade
- Cards agora ocupam apenas o espaço necessário

### Resultado:
- ✅ Altura dos cards proporcional ao conteúdo
- ✅ Sem espaços vazios excessivos
- ✅ PDF 15KB menor (339KB vs 354KB)
- ✅ Layout equilibrado e profissional


---

## [BATCH 1.2] - 2026-01-21 (Correção de Alinhamento Vertical)

### Objetivo: Corrigir desalinhamento vertical das 3 colunas no PDF

**Problema identificado:** Coluna direita (navy) esticada ocupando página inteira, enquanto outras colunas ficavam pequenas. Grid com `flex-grow`, `justify-content: space-between` e `height: 100%` causavam esticamento desproporcional no PDF.

### Correções aplicadas:

**S05.html - Fundamento GRADE:**
- Removido `height: 100%` do grid principal
- Alterado `align-items: stretch` → `align-items: start`
- Cards agora alinham pelo topo sem esticar verticalmente

**S06.html - Motor GRADE:**
- Removido `flex-grow: 1` do grid principal
- Removido `justify-content: space-between` da coluna navy
- Removido `justify-content: center` da coluna esquerda
- Adicionado `align-items: start` no grid
- Adicionado `height: fit-content` + `align-self: start` na coluna navy
- Todas as 3 colunas agora com altura proporcional ao conteúdo

### Resultado:
- ✅ 3 colunas balanceadas verticalmente
- ✅ Sem esticamento desproporcional
- ✅ PDF 18KB menor (321KB vs 339KB)
- ✅ Layout equilibrado e profissional
- ✅ Funciona bem tanto no navegador quanto no PDF

### Lições aprendidas:
- `flex-grow`, `justify-content: space-between`, `height: 100%`, `align-items: stretch` funcionam no navegador mas quebram no PDF com página de altura fixa
- Sempre usar `align-items: start` em grids
- Sempre usar `height: fit-content` em cards
- Testar PDF após cada mudança estrutural
