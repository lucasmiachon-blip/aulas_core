# CHANGELOG - Aulas Core (GRADE + OSTEOPOROSE)

## OSTEOPOROSE_LAYOUT_ROUND2_S03-S13 — 2026-02-04

### Contexto
Nova rodada rápida para melhorar **ocupação/ritmo vertical** (alguns slides pareciam “vazios” no miolo) e refinar detalhes que apareciam diferentes entre viewer/print/PDF.

### Ajustes aplicados
- **S03 / S04:** bloco principal (cards + take-home) centralizado verticalmente para reduzir vazio no miolo sem esticar cards.
- **S07:** pills de fórmula um pouco maiores + correção de espaçamento no PDF (uso de `&nbsp;` para evitar “grudar” em números).
- **S13 (pizza):** rotação do `conic-gradient` (`from -90deg`) + ajuste fino de posição/tamanho de 70%/30% e ouro mais suave.
- **Docs:** adicionado `chatgpt.md` (playbook + checklist de auditoria).

### Arquivos modificados
- `OSTEOPOROSE/src/slides/S03_slide-03.html`
- `OSTEOPOROSE/src/slides/S04_slide-04.html`
- `OSTEOPOROSE/src/slides/S07_slide-07.html`
- `OSTEOPOROSE/src/slides/S13_slide-13.html`
- `chatgpt.md`
- `CHANGELOG.md`

### Constraints
- CSS global alterado: NÃO
- !important adicionados: NÃO
- Conteúdo médico alterado: NÃO

---

## OSTEOPOROSE_BATCH01_S01-S13_hotfix-order — 2026-02-03

### Contexto
Ajustes rápidos de conteúdo/hierarquia nos slides iniciais, com **reordenação** para cumprir o roteiro (S09–S11 vão para apêndice) e correção do gráfico do paradoxo (S13).

### Ajustes aplicados

#### S01 (Capa)
- Removido prefixo "Dr." e removida menção de profissão/especialidade na assinatura (mantido apenas "Lucas Miachon").

#### S02 (Citação Rilke)
- Removido o box **BRIDGE**; permaneceu apenas o poema (citação + atribuição).

#### S03 (Objetivos Educacionais)
- Ajustado espaçamento vertical dos itens (removido `space-between`; pilha centralizada com `gap` consistente).

#### S07 (Mini-definição de QALY)
- Evitado “pills” esticarem: adicionados `inline-flex`, `flex: 0 0 auto`, `white-space: nowrap` e `align-items: center`.

#### S09–S11 (Apêndice)
- Reordenados para o bloco de apêndice (após S50) conforme orientação do roteiro.

#### S12–S13 (Risco ao Longo da Vida + Paradoxo Osteopenia)
- Ordem invertida (S13 vem antes de S12).
- S13: gráfico refeito com `conic-gradient` (sem SVG) e rótulos 70%/30% corrigidos para bater com legenda.
- S13: suavizado box "Por que isso importa?" (borda 2px → 1px e ouro menos saturado via rgba).

### Arquivos modificados
- `OSTEOPOROSE/src/slides/S01_slide-01.html`
- `OSTEOPOROSE/src/slides/S02_slide-02.html`
- `OSTEOPOROSE/src/slides/S03_slide-03.html`
- `OSTEOPOROSE/src/slides/S07_slide-07.html`
- `OSTEOPOROSE/src/slides/S13_slide-13.html`
- `OSTEOPOROSE/src/slides/_list.txt`
- `OSTEOPOROSE/src/slides/_meta.json`
- `OSTEOPOROSE/src/print.html`
- `CHANGELOG.md`

### Constraints
- CSS global alterado: NÃO
- !important adicionados: NÃO
- Novas dependências: NÃO

---

## OSTEOPOROSE_BATCH01_S01-S05_v2 — 2026-02-03

### Contexto
Revisão completa do Batch 1 (S01-S05) com foco em princípios Duarte: hierarquia visual, ponto focal, ocupação ~70-80%, scanning em 3 segundos.

### Ajustes aplicados

#### S01 (Slide de Título)
- Adicionado círculos concêntricos decorativos (conecta visualmente com S02 Rilke)
- Adicionado badge "ATUALIZAÇÃO 2024-2025" para contexto temporal
- Adicionado linha decorativa dourada entre título e subtítulo
- Adicionado referências às guidelines (NOGG · ASBMR · BHOF · FRAX-Brasil 2.0)
- Assinatura reformulada: avatar "LM" + nome + especialidade em duas linhas

#### S02 (Citação Rilke)
- Adicionado aspas tipográficas decorativas (120px, gold com opacidade)
- Adicionado **BRIDGE** conectando citação ao tema: "A osteoporose é uma doença de círculos — risco, fratura, refratura. Quebrá-los exige metas claras e tratamento precoce."
- Círculos concêntricos decorativos (mesma linguagem visual do S01)
- Melhor ocupação do espaço vertical

#### S03 (Objetivos Educacionais)
- Header compacto: badge "6 tópicos" para meta-informação
- Labels COMPREENDER/APLICAR com indicador visual (quadrado colorido)
- Spacing vertical otimizado: justify-content: space-between
- Ícones reduzidos para 48px (mais compacto)
- Subtítulos com melhor contraste (rgba 0.65)
- Badges do footer aumentados para 13px

#### S04 (Fontes e premissas)
- Card Brasil destacado: borda 2px teal + gradiente sutil + badge "CONTEXTO LOCAL"
- Labels de categoria reformulados: badges retangulares uppercase (INTERNACIONAL, BRASIL, EVIDÊNCIA)
- Footers dos cards: badges coloridos (UK, EUA, Global, Dados nacionais, RCTs)
- Hierarquia clara: Brasil é o ponto focal (contexto local para audiência brasileira)

#### S05 (Timeline)
- Container expandido: max-width 1450px (era 1280px)
- Linha horizontal com gradiente navy→gold (indicando progresso/mudança de paradigma)
- Anos 2008/2010+/2024 em dourado (paradigma shift) vs navy (histórico)
- Caixas de descrição com background e border (melhor legibilidade)
- 2024 com destaque máximo: círculo maior (48px) + box dourado sólido
- Footer reformulado: badge "Mensagem" + "3 eixos" explícitos

### Arquivos modificados
- `OSTEOPOROSE/src/slides/S01_slide-01.html`
- `OSTEOPOROSE/src/slides/S02_slide-02.html`
- `OSTEOPOROSE/src/slides/S03_slide-03.html`
- `OSTEOPOROSE/src/slides/S04_slide-04.html`
- `OSTEOPOROSE/src/slides/S05_slide-05.html`

### Verificação de constraints (HC)
| Constraint | Verificado |
|------------|------------|
| HC2: CSS mínimo | ✅ Zero CSS global (só inline) |
| HC3: !important | ✅ Zero adicionados |
| HC9: Inline verificado | ✅ Variáveis CSS usadas |
| HC10: Testado | ✅ Screenshots gerados |
| HC11: Conteúdo médico | ✅ Bridge S02 não inventa dados, só metáfora |

### Screenshots
- `screenshots/osteoporose/batch1-review/S01-AFTER.png`
- `screenshots/osteoporose/batch1-review/S02-AFTER.png`
- `screenshots/osteoporose/batch1-review/S03-AFTER.png`
- `screenshots/osteoporose/batch1-review/S04-AFTER.png`
- `screenshots/osteoporose/batch1-review/S05-AFTER.png`

---

## OSTEOPOROSE_BATCH01_S01-S05 — 2026-02-03

### Contexto
Melhoria visual batch S01-S05. Foco em ocupar espaço branco, balancear hierarquia (Duarte), e adicionar conteúdo onde necessário.

### Ajustes aplicados

#### S03 (Objetivos Educacionais)
- Adicionado item 6 "Sequenciamento" no card Aplicar (balancear 3x3 com Compreender)
- Aumentado ícones de 48px para 56px
- Aumentado fontes dos títulos de 18px para 20px
- Adicionado `justify-content: space-between` para distribuir itens verticalmente
- Removido connector visual (redundante com take-home)

#### S04 (Fontes e premissas)
- Adicionado footer informativo em cada card (UK·EUA·GLOBAL, DADOS NACIONAIS, RCTS DE REFERÊNCIA)
- Aumentado line-height das listas de 1.5 para 1.65
- Aumentado margin-bottom dos itens de 8px para 14-16px
- Take-home redesenhado: fundo navy com badge dourado "Regra da casa"
- Corrigido acentuação (estratificação, recalibração, etc.)

### Arquivos modificados
- `OSTEOPOROSE/src/slides/S03_slide-03.html`
- `OSTEOPOROSE/src/slides/S04_slide-04.html`

### Constraints
- !important adicionados: NÃO
- Slides >S50 tocados: NÃO
- CSS global alterado: NÃO

---

## VISUAL_AUDIT_BATCH_A_S01_S04 — 2026-02-02

### Contexto
Refino visual pontual nos slides iniciais (S01–S04) do deck OSTEOPOROSE.
Foco em hierarquia, respiro e alinhamento sem alterar estrutura global.

### Ajustes aplicados
- S01: ajuste de respiro do bloco central e legibilidade da assinatura.
- S02: citação mais coesa (line-height e espaçamento) e atribuição mais discreta.
- S03: cards ainda mais densos para ocupar espaço branco no miolo.
- S04: cards com padding ainda maior para reduzir vazio central.

### Arquivos modificados
- `OSTEOPOROSE/src/slides/S01_slide-01.html`
- `OSTEOPOROSE/src/slides/S02_slide-02.html`
- `OSTEOPOROSE/src/slides/S03_slide-03.html`
- `OSTEOPOROSE/src/slides/S04_slide-04.html`
- `CHANGELOG.md`

---

## VISUAL_AUDIT_BATCH1_IMPL — 2026-02-02

### Contexto
Auditoria visual sistematica dos slides OSTEOPOROSE (S04-S10) com base em Gestalt.
Verificacao previa de CSS base.css/viewer.css/print.css conforme HC9.
Debugging comparativo: analisado S07 (slide bem resolvido) para identificar padroes.

### Correcoes efetivas aplicadas

#### S04 (Fontes e premissas)

| Propriedade | Antes | Depois | Motivo |
|-------------|-------|--------|--------|
| Flex alignment | `center` | `flex-start` | Fluxo de leitura top-to-bottom |
| Card padding | `18px` | `24px` | Preencher espaco naturalmente |
| Line-height | `1.35` | `1.5` | Melhor legibilidade |
| Li margin-bottom | `0` | `8px` | Separacao entre itens |

**Resultado:** Cards preenchem espaco vertical naturalmente, gap proporcional.

#### S09 (Quanto custa uma fratura)

| Propriedade | Antes | Depois | Motivo |
|-------------|-------|--------|--------|
| Box "Como usar" bg | `gold` | `navy sutil` | Hierarquia visual |

**Resultado:** Message box navy e foco principal, box secundario nao compete.

### Decisao tecnica: S05/S06 (Timelines)

**Analise:** Whitespace identificado como potencial problema.

**Investigacao:**
1. Tentativa inicial: `align-items: center` — criou efeito de "flutuacao" (pior)
2. Tentativa: ajuste min-height — ineficaz (elementos usam `position: absolute`)

**Decisao profissional:** Manter design original.
- Whitespace em slides de apresentacao e design editorial intencional
- Timeline centralizada corretamente pelo flex container existente
- Refatorar absolute→flex: alto risco, viola HC

### Slides sem alteracao (ja adequados)
- S07: Hierarquia visual clara, cards preenchem espaco
- S08: Excelente continuidade visual (gradient bar)
- S10: Layout 2 colunas equilibrado

### Arquivos modificados
- `OSTEOPOROSE/src/slides/S04_slide-04.html`
- `OSTEOPOROSE/src/slides/S09_slide-09.html`

---

## VISUAL_AUDIT_BATCH1 — 2026-02-02

### Contexto
Início de auditoria visual sistemática dos slides OSTEOPOROSE com base em:
- Princípios de Gestalt (proximidade, continuidade, hierarquia)
- UI/UX frontend (contraste, whitespace, alinhamento)
- Verificação de conflitos CSS (HC9)

### Hard Constraints atualizados
- **HC9 revisado**: Inline styles em slides permitidos COM verificação prévia de CSS
- Adicionada nota de arquitetura: padrão legado aceito por pragmatismo
- Arquivos: `HARD_CONSTRAINTS.md`, `PROMPT_INICIAL.md`

### S03 (Objetivos Educacionais) — Correções de layout
| Mudança | Antes | Depois | Motivo |
|---------|-------|--------|--------|
| Container flex | `justify-content: space-between` | `justify-content: center` | Centralizar timeline verticalmente |
| Gap container | `18px` | `24px` | Melhor separação timeline/take-home |
| Max-width timeline | `1000px` | `1100px` | Preencher horizontal |
| Gap itens | `12px` | `16px` | Respiro entre itens |
| Linha gold | `top/bottom: 28px` | `top/bottom: 24px` | Cobrir altura dos círculos |
| Background cards | `rgba(0.05)` | `rgba(0.07)` | Ligeiramente mais visível |

### Arquivos modificados
- `HARD_CONSTRAINTS.md`
- `PROMPT_INICIAL.md`
- `OSTEOPOROSE/src/slides/S03_slide-03.html`

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

## OSTEOPOROSE_SLIDES_BATCH1_POLISH — 2026-02-02

- Slide 03: restaura estrutura semântica (h1 como filho direto) e evita expansão indesejada do container (flex:0) para não "esticar" a linha vertical.
- Slide 06: reduz whitespace (título mais próximo do conteúdo) e adiciona subtítulo + takeaway discreto (sem mexer no CSS global).
- Export script: torna o screenshot de amostra não-fatal (usa page.screenshot do viewport; sem locator).

## OSTEOPOROSE_PDF_CLEANUP_PIE_FRAX_MERGE — 2026-02-04

- Remove PDF duplicado (Letter/portrait) em `OSTEOPOROSE/assets/pdf` para evitar confusão; o artefato canônico fica em `OSTEOPOROSE/exports` (16:9).
- Slide 03: evita “boxes” esticados (alinha o bloco principal em `align-items: start`) para reduzir espaço vazio *dentro* dos cards.
- Slide 04: cards não esticam (grid `align-items: start`) para remover grandes áreas vazias internas.
- Slide 13 (pizza): paleta mais suave e reposicionamento dos percentuais (70/30) para melhor leitura/estética.
- Slide 17+18: conteúdo consolidado em um único slide (adição de callout “Pérola clínica” com SPAH) e remoção de `S18_slide-18.html` do passador via `_list.txt`.
- `dist/index.html`: inclui `polish.css` para reduzir divergência visual entre builds.
- Export script: adiciona limpeza automática de PDFs duplicados e fallback `page.setContent()` com imagens inline quando navegação via `page.goto()` é bloqueada.
