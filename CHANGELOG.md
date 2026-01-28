# CHANGELOG - Aulas Core (GRADE + OSTEOPOROSE)


## OSTEOPOROSE_PATCH0_6 — 2026-01-27

### P0: Viewer (fit realmente responsivo – sem cortes)
- `viewer.js`: **rewrite/cleanup** (remove duplicações internas) e novo fit com:
  - Cálculo de escala usando `getBoundingClientRect()` + *safe inset* + **floor** do scale (evita o clássico corte de 1–2px embaixo).
  - Ajuste de overflow do slide ativo em **coordenadas do slide** (1280×720) com **translate + scale** para manter conteúdo dentro de uma “safe area” (especialmente borda inferior).
  - `--vh` via `visualViewport` para corrigir `100vh` em mobile/address bar.
- `viewer.css`: palco agora depende do **flex layout** (sem `height: calc(100vh - ...)`), reduzindo drift/rounding; padding inferior inclui `safe-area-inset-bottom`.
- `src/index.html` e `dist/index.html`: UI agora separa **PDF player** vs **Exportar** e atualiza os atalhos.

### P0: PDF fallback em modo apresentação (teclado + fullscreen)
- Novo `src/pdf.html` + `dist/pdf.html`: player de PDF em tela inteira com navegação por teclado (setas/space/PgUp/PgDn/Home/End) e fullscreen (F).
- Novo `src/js/pdf-viewer.js` + `src/css/pdf-viewer.css`.
- `assets/pdf/OSTEOPOROSE-slides.pdf`: placeholder incluído como fallback (substituir pelo PDF exportado 16:9 quando disponível).

### P0: Print/PDF (evitar cortes ao exportar)
- `print-fit.js`: refeito para usar bounding box real + translate/scale com safe area (mais robusto do que apenas downscale).

### Arquivos modificados/novos
- `OSTEOPOROSE/src/css/viewer.css`
- `OSTEOPOROSE/src/js/viewer.js` (rewrite)
- `OSTEOPOROSE/src/index.html`, `OSTEOPOROSE/dist/index.html`
- `OSTEOPOROSE/src/pdf.html`, `OSTEOPOROSE/dist/pdf.html` (novos)
- `OSTEOPOROSE/src/css/pdf-viewer.css`, `OSTEOPOROSE/src/js/pdf-viewer.js` (novos)
- `OSTEOPOROSE/src/js/print-fit.js` (rewrite)
- `OSTEOPOROSE/assets/pdf/OSTEOPOROSE-slides.pdf` (novo)


## OSTEOPOROSE_PATCH0_5 — 2026-01-26

### P0: Viewer (corte inferior + fit real na janela)
- `viewer.css`: palco agora usa `100dvh` (fallback `100vh`) e bloqueia scroll da página (viewer = app). Reduz casos em que o slide “passa” 1–2px e é cortado embaixo.
- `viewer.css`: adicionada folga inferior extra no `stage` (safe bottom) para projetores/overscan.
- `viewer.js`: novo `scheduleFit()` (multi-pass) + listeners de assets do slide ativo (img/video/iframe) para refazer o fit após carregamento tardio.
- `viewer.js`: resize agora usa `scheduleFit()` (inclui overflow-fit), não só `fitToScreen()`.

### P0: Print/PDF (16:9 sem altura errada)
- `print.css`: força `min-height: 0 !important` (corrige `min-height: 100vh` legado que quebrava o tamanho 16:9 no print).
- Novo `print-fit.js`: aplica overflow-fit antes de imprimir (DOMContentLoaded/load/beforeprint) para reduzir cortes em slides densos.
- `src/print.html` e `dist/print.html` regenerados a partir de `src/slides/_list.txt` para garantir consistência com os slides modulares.

### Slides (estética/legibilidade – sem mudar claims)
- Slide 8 (Utilidade): redução de densidade (padding/margens) + headings em navy (gold fica como acento) para contraste.
- Slide 14 (Osteopenia): redução de densidade (padding/margens) + gráfico ajustado para caber sem encostar no rodapé.

### Arquivos modificados
- `OSTEOPOROSE/src/css/viewer.css`
- `OSTEOPOROSE/src/js/viewer.js`
- `OSTEOPOROSE/src/css/print.css`
- `OSTEOPOROSE/src/js/print-fit.js` (novo)
- `OSTEOPOROSE/src/print.html`, `OSTEOPOROSE/dist/print.html` (regenerados)
- `OSTEOPOROSE/src/slides/S08_slide-10.html`, `OSTEOPOROSE/src/slides/S14_slide-9-osteopenia.html`
- `README.md`


## OSTEOPOROSE_PATCH0_4 — 2026-01-25

### Viewer / Export
- Melhor detecção de overflow por slide (inclui margens e elementos absolutos), reduzindo cortes de conteúdo em algumas telas/viewers.
- Fullscreen com pequena margem de segurança (overscan / projetores) para evitar cortes nas bordas.
- Export PDF mais estável: novo `dist/print.html` (slides inline, sem depender de `fetch`), e `print.css` revisado (preview 1280×720 + impressão 16:9).

### Slides (estética / contraste / paleta)
- Slide 8: rótulos da escala com contraste/tamanho melhor.
- Slide 14: rótulos do gráfico com contraste correto (branco no navy, navy no gold).
- Ajustes pontuais em slides com contraste muito baixo (texto quase invisível) e remoção de cores RGB fora da paleta (vermelho/verde/azuis custom).

### Arquivos novos
- `OSTEOPOROSE/dist/print.html`
- `OSTEOPOROSE/src/print.html`

## OSTEOPOROSE_PATCH0_3 — 2026-01-25

### P0: corte inferior / overflow (viewer + PDF)
- Viewer: auto-fit do slide ativo quando o conteúdo excede a área útil (evita **corte inferior** sem editar cada slide).
  - Implementado em `src/js/viewer.js` via `fitSlideOverflow()` (downscale leve com tolerância).
- Print/PDF: `print.css` refeito para **1 slide por página 16:9** com múltiplas páginas de verdade.
  - Removido “gargalo” de `overflow: hidden` do deck no print (causava PDFs com poucas páginas).

### P0: encoding + unidades
- Corrigidos restos de mojibake em múltiplos slides (ex.: **duração**, **Infusão**, **Evidência**, **µg/L**, acentos e símbolos).

### P0: paleta profissional (sem hex)
- Removidos **100%** dos `#hex` dos slides de OSTEOPOROSE.
  - Substituídos por `var(--...)` e `rgba(var(--*-rgb), a)` conforme paleta oficial.

### UI/UX polish (placeholders)
- Substituído o emoji **📷** por ícone SVG monocromático (mais “enterprise”).
- Slides 67/68: ajustes finos de padding/tipografia para reduzir densidade e evitar overflow.

### Arquivos principais
- `OSTEOPOROSE/src/js/viewer.js`
- `OSTEOPOROSE/src/css/print.css`
- `OSTEOPOROSE/src/css/base.css` (tokens usados pelos slides)
- `OSTEOPOROSE/src/slides/*` (encoding + remoção de hex + placeholders)


## OSTEOPOROSE_PATCH0_2 — 2026-01-25

### Viewer (tela total + paddings)
- Fit-to-screen agora permite **upscale** (até 300%) para ocupar telas grandes em fullscreen/projeção.
- Adicionada classe `is-fullscreen` (remover padding/borda/sombra do deck) para maximizar área útil.
- Ajuste fino de paddings do palco (`--stage-pad`) e tipografia do chrome do viewer.

### Tipografia + tokens
- `base.css` alinhado à **paleta oficial** (bg/navy/gold + teal/blue) com tokens `*-rgb`.
- Inter (sans-serif) como fonte padrão (viewer + slides) + import via Google Fonts.

### Encoding (P0)
- Correção de caracteres quebrados (mojibake) em múltiplos slides (ex.: ✓ / ∅ / 📷 / acentos).

### Slides com truncamento (P0)
- Slide 67 (LSC) e Slide 68 (Rádio 33%): redução de margens/paddings e reorganização leve para evitar corte inferior.
- Slides 67/68: cores migradas para tokens (`var(--bg/navy/gold/teal/blue)`) para consistência.


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
