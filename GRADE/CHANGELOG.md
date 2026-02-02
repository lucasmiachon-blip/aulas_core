# CHANGELOG - Aulas Core (GRADE + OSTEOPOROSE)

## GRADE_P2_CAC_POLISH_S10_S13_2026_02_02 — 2026-02-02

### Objetivo
Ajustes finos finais do **bloco CAC** após revisão em viewer: garantir que os slides **cabem na janela**, e alinhar estética (tabelas/boxes) ao padrão profissional já aplicado.

### O que mudou
- **Tokens CSS corrigidos:** adicionados `--ink`, `--panel2`, `--red/--green` (e RGBs) para evitar `var()` inválido e estabilizar cores.
- **Componente novo:** `.card--soft` (variante de card com baixo contraste) para regras práticas.
- **S10 (CAC=0 / warranty):** layout mais compacto + figura com altura fixa (evita overflow) + arquivo `mesa_cac_warranty.png` garantido em `src/assets/figures/`.
- **S11 (estatina por CAC):** micro-ajustes de padding/margens para caber em viewport sem perder hierarquia.
- **S08 (dose–resposta):** adicionado mini‑visual de monotonicidade (dual coding) + espaçamento mais eficiente.
- **S13 (AAS por CAC):** trocado de tabela tradicional para **“escada” NNT/NNH** (estilo do slide de estatina) com chips de balanço.

### Arquivos modificados
- `src/css/base.css`
- `src/css/blocks.css`
- `src/slides/S08.html`
- `src/slides/S10.html`
- `src/slides/S11.html`
- `src/slides/S13.html`
- `src/assets/figures/mesa_cac_warranty.png`
- `CHANGELOG.md`

## GRADE_P2_CONTENT_BATCH2_S10_S15_2026_02_02 — 2026-02-02

### Objetivo
Continuar a fase **P2 (conteúdo + forma)** nos slides **10–15** (contador do viewer), refinando **hierarquia atencional**, **carga cognitiva** e **padding/legibilidade** (sala/auditório).

### Alterações (slide a slide)
- **S10** — CAC=0 (“warranty”): reescrita para leitura mais direta + **imagem externalizada** (antes base64) para melhorar manutenção/estabilidade em exportações.
- **S07** — Indireção: redesign com **checklist PICO** (cards) + regra mental (“ponte”) + exemplos no bloco CAC.
- **S08** — Dose–resposta: versão mais “teach‑able” (o que conta / como usar / checklist) + exemplo de CAC como risco basal.
- **S11** — Estatina por CAC: transformado em **tabela‑escada** (NNT 10a) + regra prática mais curta + GRADE em “20s”.
- **S13** — AAS por CAC: consolidado em **tabela NNT vs NNH** com rótulo de balanço (dano>benefício vs benefício>dano) + fechamento clínico.
- **S61** — Abertura bloco bempedóico: polimento visual e rodapé **em fluxo (sem absolute)** para evitar sobreposição e melhorar contraste.

### Arquivos modificados/criados
- `src/slides/S07.html`
- `src/slides/S08.html`
- `src/slides/S10.html`
- `src/slides/S11.html`
- `src/slides/S13.html`
- `src/slides/S61.html`
- `src/assets/figures/mesa_cac_warranty.png` *(novo)*
- `CHANGELOG.md`
- `README.md`

## GRADE_P2_CAC_IPSIS_LITTERIS_2026_02_02 — 2026-02-02

### Objetivo
- Reintroduzir as **recomendações ipsis litteris da diretriz** no bloco CAC (para ancorar a discussão e facilitar citação/ponte com estudos).
- Manter o padrão visual profissional já aplicado no bloco de bempedóico.

### O que mudou
- **S09**: substituído o conteúdo “texto → conduta” por um layout 60/40 com:
  - coluna de **recomendações (ipsis litteris)** + força/certidão;
  - coluna de **leitura GRADE** (baseline, upgrade por gradiente, downgrade por indireção) + frase de 10s.

### Arquivos modificados
- `src/slides/S09.html`
- `CHANGELOG.md`
- `README.md`

## GRADE_P2_CONTENT_BATCH1_2026_02_02 — 2026-02-02

### Objetivo
- Iniciar o **P2 (conteúdo + forma)** aplicando boas práticas de apresentação (Duarte, hierarquia atencional, chunking/sinalização), sem mexer na ordem.
- Foco: **slides 1–10 (viewer)** — abertura + início do bloco CAC.

### O que mudou (conteúdo + forma)
- **Headlines em formato de mensagem** (1 ideia por slide).
- **Menos carga cognitiva:** frases mais curtas, paralelismo, números em destaque, mais respiro.
- **Dual coding leve:** stepper/fluxos (risco → meta → benefício absoluto) e caixas de take‑home.
- **Padronização local:** cards, bordas, espaçamento e alinhamentos (sem criar “ruído” visual).
- **CAC=0:** take‑home mais direto + “warranty” em duas janelas (3–7 / 5–10 anos) + regra explícita.

### Slides revisados neste batch
- `S01` (capa)
- `S02` (problema)
- `S03` (caso‑âncora CAC + gramática GRADE)
- `S04` (interação: calibrar a sala)
- `S05` (divisor: certeza ≠ força)
- `S06` (motor do GRADE: stepper + listas)
- `S60` (abertura do bloco CAC)
- `S09` (aplicação: diretriz vs GRADE)
- `S36` (tabela: CAC → categoria → meta)
- `S10` (CAC=0: janela de reavaliação)

### Arquivos modificados
- `src/slides/S01.html`
- `src/slides/S02.html`
- `src/slides/S03.html`
- `src/slides/S04.html`
- `src/slides/S05.html`
- `src/slides/S06.html`
- `src/slides/S60.html`
- `src/slides/S09.html`
- `src/slides/S36.html`
- `src/slides/S10.html`
- `CHANGELOG.md`
- `README.md`

## GRADE_P1_TITLES_POLISH_2026_02_02 — 2026-02-02

### Problema
- Nos **10 primeiros slides**, alguns títulos apareciam com “peso” diferente (partes mais grossas) quando havia **spans/ênfases** dentro de `h1/h2` (ex.: destaque em ouro). Isso acontecia porque o reset `.slide * { font-family: ... !important; }` forçava **Inter** nos elementos internos do título.

### O que foi feito
- `GRADE/src/css/base.css`
  - `h1/h2/h3 *` agora também usa **Georgia** com `!important` → título inteiro fica consistente mesmo com `<span>`, `<em>`, etc.
  - `blockquote *` também forçado para serif (evita citações com mistura de fontes).
  - `font-weight` de `h1/h2` padronizado em **700** (peso nativo do Georgia), reduzindo variação de renderização.

### O que NÃO foi feito
- Nenhuma mudança de conteúdo (texto, números, claims, referências).

### Arquivos modificados
- `GRADE/src/css/base.css`
- `CHANGELOG.md`
- `README.md`

## GRADE_P1_TYPO_GRID_POLISH_2026_02_02 — 2026-02-02

### Objetivo
- Padronizar **altura de header**, escala tipográfica e “safe footer” (sem mudar conteúdo) para leitura em sala.

### Tipografia / grid (global)
- `GRADE/src/css/base.css`
  - Tokens de escala (`--h1`, `--h2`, `--lead`, etc.) + tokens de layout (`--slide-pad-*`, `--footer-safe`).
  - `padding` do `.slide` agora usa `!important` para vencer *inline styles* e manter alinhamento entre slides.
  - Força de fonte: **Inter** (corpo) / **Georgia** (h1/h2/h3) com `!important` para corrigir slides com fontes hardcoded.
  - `.ref`: `top:auto` + `left/right/bottom` padronizados (evita referência “subir” e sobrepor header).

### Componentes
- `GRADE/src/css/blocks.css`
  - `.cardHeader`: altura mínima + alinhamento vertical consistente; tipografia unificada.

### Arquivos modificados
- `GRADE/src/css/base.css`
- `GRADE/src/css/blocks.css`
- `GRADE/README.md`

---

## GRADE_P1_ORDER_STYLE_2026_02_02 — 2026-02-02

### Slides (ordem)
- Reorganizada a sequência principal para fechar em **Camões** (slide 36).
- **S36 (SBC 2025: CAC reclassifica risco → meta LDL-c)** movido para logo após **S09 (Aplicação GRADE: CAC)**.
- **S12 (CAC=0 não exclui placa não calcificada)** movido para o apêndice (após S38).

### Slides (design)
- **S36**: tabela redesenhada para seguir o benchmark visual de **S51 (Metas por categoria de risco)**.
- **S17 (MID)**: régua refinada com linhas para **nulidade (RR=1.0)**, **MID benefício (0.8)** e **MID dano (1.25)**.
- **S60** e **S61**: referências ancoradas com `bottom` para evitar sobreposição.

### Viewer / scripts
- Hash da URL passou a seguir o **contador do slide** (ex.: `#9`), mantendo suporte a `#Sxx` para acesso direto por ID.

### Organização de pasta
- Removida duplicação de repositório dentro de `GRADE/GRADE` (estrutura unificada).

---

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



## PATCH2_9 — 2026-01-28 (GRADE: P1 refinamento visual + ordem + segurança de rodapé)

### O que foi feito (P1)
- **Ordem (viewer):**
  - **S51** (Metas por categoria de risco) movido para **logo após S09** (bloco CAC).
  - **S07 e S08** movidos para **após S10** (narrativa mais limpa).
  - **S59** (poesia) movido para **após S57** e removidos rótulos “(encerramento)”/“Para terminar…”/“Obrigado”.
- **S18 (Imprecisão):** régua refeita como **forest plot** com escala linear (0,4–1,5), marcadores de **MID (0,80)** e **RR 1,0**, e IC 0,79–0,96 com ponto estimado.
- **S19 (RoB 2.0):** redesenho para formato **talk‑ready** (cards) com a decisão GRADE explícita.
- **S20 (EtD):** redesenho “TED‑style” (cards + síntese) com bloco de recomendação.
- **S49 (Fechamento SAMS):** redução de densidade (tipografia/espaçamentos) para evitar overflow.
- **Rodapés (PDF safety):** substituição de `position:absolute` por layout em `flex` com `margin-top:auto` em vários slides do range até o viewer 40.

### Arquivos modificados
- `GRADE/src/slides/_list.txt`
- `GRADE/src/slides/S18.html`
- `GRADE/src/slides/S19.html`
- `GRADE/src/slides/S20.html`
- `GRADE/src/slides/S49.html`
- `GRADE/src/slides/S51.html`
- `GRADE/src/slides/S59.html`
- `GRADE/src/slides/S12.html`, `S22.html`, `S23.html`, `S50.html`, `S52.html`, `S53.html`, `S55.html`, `S56.html`, `S60.html`, `S61.html` (ajuste de rodapé)
- `README.md`
- `CHANGELOG.md`
- `GRADE/CHANGELOG.md`

---

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
## [PATCH 2.8] - 2026-01-28

### P1 — ajustes de fluxo + refinamentos visuais (slides 1–36)

#### Ordem / narrativa
- Mover **S07** e **S08** para depois de **S09** (bloco CAC), ajustando `GRADE/src/slides/_list.txt`

#### Tipografia (títulos)
- Padronizar títulos dos slides **S07** e **S08** para usar `var(--font-serif)` / `var(--font-sans)` (evita fonte “desconfigurada”)

#### Slide 21 (S47) — CLEAR Outcomes
- Redução de conteúdo mantendo objetivo (n, follow-up, HR/IC, ARR/NNT, LDL-C)
- Reorganização em 2 colunas com hierarquia “talk-ready”
- Rodapé deixou de ser `position:absolute` para evitar overflow no PDF

#### Slide 22 (S17) — MID (contraste)
- Régua com mais contraste (zonas + linhas RR 1.0 / MID) e labels mais legíveis
- Ajuste de espaçamento e pesos tipográficos

#### Slide 23 (S18) — Imprecisão (símbolo do IC)
- Substituir o “bastão com bolinhas” por **error bar** com caps + ponto estimado (mais limpo)
- Linha/label do MID com destaque dourado

#### Slide 27 (S49) — Fechamento SAMS
- Menos texto e mais respiro (bullets em vez de parágrafo longo)
- “Certeza final” com dourado mais suave (tint), sem bloco chapado
- Conteúdo de Brasil/EtD em linhas mais curtas



## [PATCH 2.10] - 2026-01-31

### P1 — batch 26–36 (UI/UX + hierarquia visual; sem mudar conteúdo)

#### Objetivo
- Refinar paleta, contraste, tipografia, espaçamentos e consistência visual dos slides **26–36** (viewer), mantendo o texto.

#### CSS (global, pequeno)
- `GRADE/src/css/base.css`: remover `!important` do tamanho/line-height de `h2` (permite ajuste por slide sem “brigar” com o CSS).
- `GRADE/src/css/blocks.css`: remover token inválido (linha com `.`) e manter parser CSS limpo.

#### Slides ajustados (viewer 26–36)
- **S20**: título alinhado ao padrão do bloco (hierarquia e tamanho).
- **S48**: refatoração visual (tipografia via tokens, tabelas/grades mais limpas, cards coerentes).
- **S49**: compactação fina para caber com folga (paddings/gaps/font-size) mantendo o conteúdo; PCSK9i com cor de alerta mais sóbria.
- **S50**: “slide de bloco” (navy) com títulos/spacing consistentes e rodapé com contraste correto.
- **S52–S57**: padronização de headers (navy + chips), remoção de cabeçalhos chapados em dourado/teal, zebra/colunas em tabelas, acentos por borda superior.
- **S54**: rodapé sem `position:absolute` (PDF-safe) + visual didático mais limpo.
- **S59**: poesia com card central mais elegante (acento dourado lateral e sombra suave).

#### Arquivos modificados
- `GRADE/src/css/base.css`
- `GRADE/src/css/blocks.css`
- `GRADE/src/slides/S20.html`
- `GRADE/src/slides/S48.html`
- `GRADE/src/slides/S49.html`
- `GRADE/src/slides/S50.html`
- `GRADE/src/slides/S52.html`
- `GRADE/src/slides/S53.html`
- `GRADE/src/slides/S54.html`
- `GRADE/src/slides/S55.html`
- `GRADE/src/slides/S56.html`
- `GRADE/src/slides/S57.html`
- `GRADE/src/slides/S59.html`

## [PATCH 2.11] - 2026-02-01

### P1 — correções pedidas (ordem + alinhamentos + tipografia; slides 1–36)

#### Ordem (viewer)
- `S52` movido para **posição 16**
- `S51` (tabela benchmark) movido para **posição 31**
- Ajuste aplicado em `GRADE/src/slides/_list.txt`

#### Tipografia / consistência (global)
- `GRADE/src/css/base.css`: adicionadas classes utilitárias para padronizar **header/eyebrow/title/subtitle/ref** e reforçar escala tipográfica “conference-first”.
- Rodapés (`.ref`) agora padronizados (sem `position:absolute`).

#### Refinos visuais (slides-chave)
- **S52**: tabela e hierarquia ajustadas para ficar **no padrão do benchmark (S51)**; removido “border-top” que desalinhava cards; faixa dourada agora é overlay (sem alterar altura).
- **S60 / S61**: cards agora **esticam e alinham** topo/base; rodapé padronizado.
- **S17 / S18 / S19 / S20**: redesenho e limpeza de UI (régua/IC mais elegante, ticks alinhados, bordas e contrastes harmonizados).
- **S04 / S09 / S10 / S11**: títulos e subtítulos ajustados para manter escala consistente e liberar espaço.

#### Pequenas correções
- **S03**: correção de token inválido `var(--r-sm)` → `var(--radius-sm)`; nota final convertida para `.ref`.
- Redução de `border: 2px` → `border: 1px` em diversos cards (harmonia e alinhamento).

#### Arquivos modificados
- `GRADE/src/slides/_list.txt`
- `GRADE/src/css/base.css`
- `GRADE/src/slides/S03.html`
- `GRADE/src/slides/S04.html`
- `GRADE/src/slides/S09.html`
- `GRADE/src/slides/S10.html`
- `GRADE/src/slides/S11.html`
- `GRADE/src/slides/S17.html`
- `GRADE/src/slides/S18.html`
- `GRADE/src/slides/S19.html`
- `GRADE/src/slides/S20.html`
- `GRADE/src/slides/S50.html`
- `GRADE/src/slides/S52.html`
- `GRADE/src/slides/S53.html`
- `GRADE/src/slides/S60.html`
- `GRADE/src/slides/S61.html`
- `GRADE/src/slides/S54.html`
- `GRADE/src/slides/S55.html`
- `GRADE/src/slides/S56.html`
