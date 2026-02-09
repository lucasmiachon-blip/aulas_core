# Changelog

## 2026-02-09 — GRADE: S65 Take-Home Messages (novo slide, posição 33)

- **CRIADO** `GRADE/src/slides/S65.html` — slide Take-Home Messages com 5 conceitos-chave
  - 1. Incerteza é a regra (42% LOE C)
  - 2. Certeza ≠ Força (construtos separados)
  - 3. Benefício absoluto (NNT depende da população e risco basal)
  - 4. EtD: evidência encontra o paciente
  - 5. Divergência entre diretrizes é racional
  - Síntese navy bar: "Leia a diretriz pelo que ela diz — e pelo que o GRADE mostra que ela não diz."
- **EDITADO** `GRADE/src/slides/_list.txt` — S65 inserido na posição 33 (antes de S59/Camões)
- Layout: numbered circles (teal/gold alternados) + navy synthesis bar (padrão S45/S62)
- Score auditoria visual: 8.5/10

## 2026-02-09 — OSTEO: Bloco GIOP reordenamento narrativo + redesign visual (6 slides)

### Reordenamento — Arco "Hook → Teach → Payoff"

**Problema:** Caso clínico Maria (S44) aparecia ANTES das diretrizes serem ensinadas. Audiência era perguntada "O que você faria?" sem ter ferramentas.

**Nova ordem (pos 38-45 na `_list.txt`):**

| Pos | Slide | Papel | Antes |
|-----|-------|-------|-------|
| 38 | S42 | Título GIOP | mantém |
| 39 | S43 | Dose-resposta | mantém |
| 40 | S44 | Caso Maria (HOOK) | mantém |
| 41 | S47 | Classificação ACR 2022 | era pos 43 |
| 42 | S46 | Evidências ACR 2022 | era pos 42 |
| 43 | S48 | ECTS 2024 | era pos 44 |
| 44 | S50 | JSBMR 2023 | era pos 45 |
| 45 | S45 | Comparação guidelines (PAYOFF) | era pos 41 |

### Redesign visual (6 slides)

**Mudanças comuns a todos:**
- Removido `font-family: Inter, sans-serif` hardcoded (CSS global já define)
- Title padronizado: 38px/800/-0.01em
- Padding: 36px 48px
- Borders: 3px → 1.5px
- Gaps reduzidos (30-50px → 10-14px)

| Slide | Mudanças específicas |
|-------|---------------------|
| S44 | Redesign completo: 2-col grid, patient data como key-value grid, MCQ cards com border-left accent |
| S47 | Tier cards modernizados, border-left por tier no tratamento, badge EUA compacto |
| S46 | 3-col grid com headers navy, sequência terapêutica 4-step compacta |
| S48 | Cards 3-col uniformes, diferenças vs ACR em 4-grid com summary |
| S50 | `var(--blue)` → `var(--teal)` e `var(--navy)` (8 ocorrências), hero SCORE serif |
| S45 | Emojis removidos (📋 💡), letras 42→32px, RESPOSTA horizontal, citação Angeli 2006 adicionada |

### Correções de dados médicos (verificados via PubMed)

| Slide | Correção | Fonte |
|-------|----------|-------|
| S47 | Adicionado FRAX Hip &ge;4,5% em "Muito Alto" e &ge;3% em "Alto" | Humphrey 2023 |
| S47 | Adicionada correção FRAX hip baixa dose: ×0,65 | Humphrey 2023 |
| S48 | "TERI →90% fx vertebral" → "TERI > ALN: fx vertebral" (90% válido apenas 18m, 78% em 36m) | Saag NEJM 2007 / A&R 2009 |
| S45 | "30-50% fraturas assintomáticas" agora citado: Angeli Bone 2006 | Angeli 2006 / Tanaka 2024 |
| S50 | Score points 7/4/4/4/2/1 — todos verificados corretos | Tanaka JBMM 2024 |

### Fontes Tier 1

- Humphrey MB et al. Arthritis Rheumatol. 2023;75(12):2088-2102 (ACR 2022 GIOP guideline)
- Paccou J et al. Eur J Endocrinol. 2024;191(6):G1-G17 (ECTS 2024)
- Tanaka Y et al. J Bone Miner Metab. 2024;42:143-154 (JSBMR 2023)
- Saag KG et al. NEJM 2007;357(20):2028-39 (TERI vs ALN 18m)
- Saag KG et al. Arthritis Rheum. 2009;60(11):3346-55 (TERI vs ALN 36m extension)
- Angeli A et al. Bone 2006;39(2):253-9 (asymptomatic VFs in GC users)

---

## 2026-02-09 — OSTEO: S43 GIOP dose-response + fix dado não verificado

### S43 — "Dose alta de GC: risco vertebral até 5× em < 6 meses" (pos 37)

| Mudança | Detalhe |
|---------|---------|
| **7,2× REMOVIDO** | Dado não verificável — Koh 2020 (n=1,9M) reporta max 2,43× (all fractures, não vertebral). Nenhum paper Tier 1 suporta 7,2× para uso prolongado |
| **4º card → "TRATAR"** | Substituído por gatilho clínico: "≥3 meses, qualquer dose ≥2,5 mg/d → TRATAR" (ACR 2022) |
| **Card 3 reformulado** | "GC destrói microarquitetura antes de baixar DMO" — texto não trunca mais |
| **Whitespace topo** | Removido `justify-content: center` do container |
| **Footnote** | Koh 2020 removido, fontes atualizadas: Van Staa 2000/2003, Amiche 2016, ACR 2022 |

**Score:** 7.5 → 8.2/10

---

## 2026-02-09 — OSTEO: S40 glossário EBM enriquecido + Competing Risk expandido

### S40 — "Conceitos de EBM usados nesta aula" (pos 34)

**Enriquecimento dos 4 cards** — cada conceito ganhou 3 camadas: definição + exemplo + implicação clínica:

| Card | Principal mudança |
|------|------------------|
| HR | Adicionada distinção HR vs RR ("mede o quanto e o quando") + guia de interpretação |
| TTB | Adicionado TTB quadril 18-24m + implicação "sobrevida < TTB → reconsiderar" |
| AUC | Escala completa (0,5/0,7/1,0) + "julgamento clínico insubstituível" |
| **CR** | **Expansão significativa:** superestimação 16-56% (Leslie 2013), subgrupos (>80a, homens, diabéticos), FRAX desconta por pop mas não por comorbidade individual |

**FRAX e Competing Mortality (verificado):**
- FRAX original já incorpora CR (calibrado por mortalidade do país)
- FRAXplus NÃO adiciona ajuste extra de CR — novidades são: recência fx, dose GC, DM2, TBS, quedas, HAL, DMO lombar

**Layout:** Dead space eliminado (align-content: center, cards compactos)

**Score:** ~5.0 (antes, dead space + conteúdo raso) → 8.0/10

### Fontes Tier 1

- Leslie WD et al. Osteoporos Int 2013;24(2):681-8 · PMID 22736068 — CR superestima 16-56%
- Tran TS et al. Osteoporos Int 2024;35(11):1989-98 · PMID 39145778 — multistate model
- Tan THA et al. Gac Med Mex 2024;160(4):363-73 · PMID 39832324 — FRAXplus review
- Lyles KW et al. NEJM 2007 — HORIZON-RFT (HR 0,72 mortalidade)

---

## 2026-02-09 — OSTEO: S38 conteúdo enriquecido + S39 reescrita 4 mensagens

### S38 — "Meta é o T-score — não o laudo" (pos 32)

**Enriquecimento de conteúdo** sem mudança de layout:

| Coluna | Mudança |
|--------|---------|
| Col 2 (Tratar) | Doses concretas: Zol 5mg IV/ano, Deno 60mg SC/6m, Romo 210mg SC/mês |
| Col 2 (Tratar) | Alerta denosumabe: nunca suspender sem transição (rebound vertebral) |
| Col 2 (Tratar) | Sequência anabólica: "janela anabólica não volta — ordem importa" |
| Col 3 (Acompanhar) | LSC adicionado: >3-5% coluna, >4-6% fêmur (ISCD 2019) |
| Col 3 (Acompanhar) | Alerta denosumabe: NUNCA suspender sem transição — fraturas em cascata |
| Footnote | Fontes atualizadas: ISCD 2019, Cummings NEJM 2018, PCDT/SECTICS 2024 |

- **Score:** 7.5 → 8.2/10

### S39 — "Leve para casa" (pos 33)

**Reescrita das 4 mensagens** — eliminada redundância (msgs 3+4 eram ambas sobre anabólico):

| # | Antes | Depois |
|---|-------|--------|
| 1 | "Reconhecer o risco iminente" / janela de ouro | **Fratura = urgência terapêutica** / iniciar ≤2 semanas |
| 2 | "Tratar para um alvo, não para um laudo" | **Trate para um alvo — monitore como PA** / metas T-score por estrato |
| 3 | "Escalar potência conforme necessidade" | **Risco iminente → anabólico primeiro** / T<−3,0 ou ≥2 fx |
| 4 | "Guardar o anabólico para quem mais precisa" (REDUNDANTE) | **Aderência define o desfecho** / 20% persiste, MPR ≥80% |

- **Treatment gap:** "76% de alto risco" (Germany-specific IOF 2024) → "até 80% pós-fratura" (global IOF)
- **Chips de destaque** adicionados em cada card: FLS, metas T-score, ordem anabólica, MPR
- **Score:** 7.0 → 8.2/10

### Fontes Tier 1

- PCDT/SECTICS 2024 (Portaria 40/2024) — doses
- Cummings SR et al. NEJM 2018 — denosumabe rebound (FREEDOM extension)
- ISCD 2019 Official Positions — LSC (Least Significant Change)
- ASBMR/BHOF 2024 — treat-to-target
- IOF 2024 — treatment gap global (até 80%)
- Siris ES et al. Mayo Clin Proc 2006 — aderência, MPR ≥80%, persistência 20%

---

## 2026-02-09 — OSTEO: S36 redesign (3-col grid) + S37 subtitle link

### S36 — "Proteção vertebral em 6 meses — quadril exige 18 a 24"

**Redesign completo:** 2-col hero + 2-col trials → 3-col integrated grid

| Coluna | Conteúdo | Mudança |
|--------|----------|---------|
| Col 1 (Vertebral) | Hero 58px "6-12m" + 4 drogas com RRR% | Teriparatida removida, RRR% adicionado |
| Col 2 (Quadril) | Hero 58px "18-24m" + 4 drogas com RRR% | RRR% adicionado |
| Col 3 (Aderência) | Hero "20-45%" + MPR ≥80% + "apenas 20%" | **Coluna nova** com dados verificados |

- **Drogas mantidas (4):** Romosozumabe, Alendronato, Zoledronato, Denosumabe
- **Teriparatida removida** (não disponível no SUS)
- **Score:** 8.2 → 8.5/10

### S37 — Subtitle narrativo

- **Antes:** "Quando NÃO tratar com anti-osteoporóticos · decisão compartilhada"
- **Depois:** "Se time to benefit > sobrevida esperada · decisão compartilhada"
- Cria link narrativo S36→S37 (teach-then-apply)

### Fontes Tier 1 — dados de aderência (Col 3)

- Siris ES et al. Mayo Clin Proc 2006;81(8):1013-22 · PMID 16901023 — RRR 20-45% com aderência, MPR ≥80%, persistência 20% em 24m
- Alahmari MM et al. Cureus 2023;15(7):e42115 · PMID 37602050 — Systematic review 14 estudos
- FREEDOM (Cummings NEJM 2009) — Denosumabe TTB vertebral 12m, quadril 24m confirmado

### RRR% verificados (drug sub-lines)

- Romosozumabe ARCH: 73% vert (Saag NEJM 2017), 50% quad vs alendronato
- Alendronato FIT-1: 47% vert (Black Lancet 1996), 51% quad
- Zoledronato HORIZON: 70% vert (Black NEJM 2007), 41% quad
- Denosumabe FREEDOM: 68% vert (Cummings NEJM 2009), 40% quad

---

## 2026-02-09 — OSTEO: auditoria visual pos 26-31

### Slides auditados (6)

| Slide | Pos | Antes | Depois | Ação |
|-------|-----|-------|--------|------|
| S33 | 26 | 8.5 | 8.8 | Bottom strip legibilidade (fontes +2px) |
| S35 | 27 | 8.4 | 8.6 | GRADE completado (5/5 domínios: +Indireção) |
| S08 | 28 | 8.2 | 8.2 | Subtitle margin 22→16px, grid gap 10→8px |
| S08b | 29 | 8.7 | 8.7 | Sem mudanças necessárias |
| S36 | 30 | 5.0 | 8.2 | **Rewrite completo:** título=conclusão, tokens, trial evidence, bottom bar, Tier 1 |
| S37 | 31 | 5.2 | 7.8 | **Rewrite completo:** removida redundância TTB (S36), 2-col criteria/alternativas |
| S38 | 32 | 6.9 | 8.0 | **Rewrite:** 5-step cards color-coded (gold/teal/navy), título=conclusão, bottom bar |
| S39 | 33 | 6.4 | 8.2 | **Rewrite:** 2×2 cards, hero stat bar, treatment gap, tokens alinhados |
| S35 | 27 | — | 8.6 | GRADE ★★★★ estrelas (era círculos), "Alto Grau de Evidência" (era Alta Certeza) |

---

## 2026-02-09 — OSTEO: 3 novos slides NNT/NNS + reordenação

### Novos slides (3)

- **S73 (pos 22):** NNT por droga — fratura vertebral. 2×2 grid (Zoledrônico NNT 13, Alendronato 14, Denosumabe 20, Romosozumabe 18) + card osteopenia Reid 2018 (NNT 15). IC 95%, ARR, RR, pop e PMID em cada card. | Score: 8.5
- **S74 (pos 23):** NNT por sítio — heatmap 4 drogas × 3 sítios (vertebral/quadril/não-vertebral). Color-coded: teal ≤40, gold 41-100, red >100, dashed borderline. IC 95% do NNT em todas as células. | Score: 8.7
- **S75 (pos 24):** NNS (Number Needed to Screen). Hero "200" navy/gold. SCOOP NNS 111 (Lancet 2018) + USPSTF pooled NNS 200/167 (JAMA 2025). Comparação visual com mamografia (~1.300) e PSA (~1.000). | Score: 8.5

### Reordenação

- **S13** (donut 82%) movido de pos 22 → pos 8 (após "Risco de Fratura ao Longo da Vida")
- **S20** (Magnitude NNT) removido da _list.txt (conteúdo absorvido por S73)

### Ordem final do bloco numérico

```
pos 7:  S12 — Risco de Fratura ao Longo da Vida
pos 8:  S13 — Agora vamos aos números (donut 82%)
...
pos 21: S31 — Romosozumabe
pos 22: S73 — NNT por droga (vertebral)
pos 23: S74 — NNT por sítio (heatmap)
pos 24: S75 — NNS (screening)
pos 25: S32 — Divider Zao Wou-Ki
```

### Fontes Tier 1 utilizadas

- Black NEJM 2007 (HORIZON-PFT) · PMID 17476007
- Black Lancet 1996 (FIT-1) · PMID 8950879
- Cummings NEJM 2009 (FREEDOM) · PMID 19671655
- Saag NEJM 2017 (ARCH) · PMID 28892457
- Reid NEJM 2018 (osteopenia) · PMID 30575489
- Shepstone Lancet 2018 (SCOOP) · PMID 29254858
- USPSTF JAMA 2025 · PMID 39808425

---

## 2026-02-09 — GRADE visual audit S18 font fix, S62, S64

### Polish (3 slides)

- **S18 (pos 20):** Font coherence fix — hero 2.6→2.0vw, régua 7.5→6.5vw, icons 0.85→0.80vw, +2 strips interpretativas | 8.4→8.2 (coerente cross-slide)
- **S62 (pos 21):** GRADE Summary redesign — removido space-evenly/flex:1, rows compact, "possível −1", seta+pill dramática, take-home full-width, +2 bottom strips, "Balanço" summary | 5.7→7.9
- **S64 (pos 22):** SoF image fix — copiado asset para src/, removido card wrapper, crop "Table 8" header via margin-top:-7%, image direta com borda sutil

### Correções técnicas

- S62: `justify-content: space-evenly` → `gap: 0.55vw` (anti-padrão #3)
- S62: `flex: 1` removido de "Certeza Final" (anti-padrão #1)
- S64: Image path fix — asset estava fora do server root (GRADE/assets/ → GRADE/src/assets/)
- S64: `min-height: 0` em cadeia flex para permitir shrink correto da imagem

### Insight

- `min-height: 0` é obrigatório em toda cadeia flex quando imagem precisa encolher (I40)
- Para tabelas-imagem: crop do header redundante via margin-top negativo + overflow:hidden (I41)

---

## 2026-02-09 — GRADE visual audit S19, S47, S17, S18

### Polish (4 slides)

- **S19 (pos 17):** RoB 2.0 — título conclusivo, 5 domínios compact, strips Forças/Limitações | 6.5→8.2
- **S47 (pos 18):** Indireção PICO — PICO completo (C adicionado), badges contrast fix, bottom strips | 7.3→8.2
- **S17 (pos 19):** MID concept-only — removido CLEAR data, régua hero 6.5vw, OIS genérico, 3 exemplos | 6.5→8.1
- **S18 (pos 20):** CLEAR imprecisão redesign — IC forest-plot (diamante+whiskers navy), checklist ✓/⚠, HR hero | 6.0→8.4

### Correções de dados

- **S17:** Removido "897 eventos" (errado) — corrigido para 1 746 (819+927, Nissen NEJM 2023)
- **S47:** PICO "C" (Comparador: placebo) adicionado — completude conceitual

### Padrões aplicados

- Badges com `color: var(--white)` quando bg escuro (I, C, O badges em S47)
- Contraste: `var(--muted)` → `var(--text)` em body text across all slides
- IC visualization: diamante (forest-plot convention) + whiskers navy + labels posicionados
- Separação conceito/aplicação: S17 = teoria MID, S18 = dados CLEAR
- Bottom strips informativos (OIS, Forças/Limitações, Indireção acumulável)

### Insight

- IC forest-plot style (diamond + whiskers) sobre régua de zonas = visualização mais elegante para imprecisão GRADE
- Separar conceito puro de aplicação ao trial melhora carga cognitiva em ambos slides

---

## 2026-02-09 — OSTEOPOROSE visual audit S29-S31

### Polish (3 slides)

- **S29 (pos 20):** "Para T-scores muito baixos, só sequência alcança a meta" — tabela MONOTERAPIA/SEQUÊNCIA ANABÓLICA, Romo→Deno teal highlight | Score 7.8
- **S30 (pos 21):** "A primeira droga depende do T-score" — 2x2 cascade sutil (MODERADO→IMINENTE), T-scores 18px/800, doses em itálico | Score 8.0
- **S31 (pos 22):** "Romosozumabe no SUS: indicação ampliada, alerta CV mantido" — top strip (BLACK BOX + 2024/25), hero numbers 2.8vw, dados verificados PubMed | Score 7.5

### Correções de dados (S31)

- **ARCH comparador:** "vs zoledronato" → "vs alendronato" (Saag et al., NEJM 2017)
- **FRAME +15% coluna** → **+13%** (Cosman et al., NEJM 2016, 12 meses)
- **FRAME +6% quadril** → **+7%** (6.9% arredondado)
- **Sequência pós-romo:** "zoledronato/denosumabe" → "bisfosfonato (PCDT)" per Portaria SECTICS 40/2024
- **"sem limite etário":** CONFIRMADO via Portaria SECTICS 40/2024 (removeu limite ≥70)

### Padrões aplicados

- Top strip layout: compact alert cards inline para conteúdo curto (vs 2x2 grid que cria dead space)
- Verificação sistemática de dados médicos contra PubMed/web antes de aprovar slide
- Hero numbers escalados: 1.8vw→2.8vw para melhor impacto visual
- Footnotes com citações completas (autor, journal, ano)

---

## 2026-02-08 — GRADE visual audit S43, S44, S63

### Polish (3 slides)

- **S43 (pos 14):** SAMS slide - Step 2 hero (teal), contraste corrigido, quebras de linha fixadas | Score 8.3
- **S44 (pos 15):** "Mesmo HR" - NNT como hero (teal 3.4vw), IC 95% adicionado (~40-150), hierarquia NNT > ARR > HR | Score 8.8
- **S63 (pos 16):** Nustendi - hero "-38%" teal, NNTs teal, dados verificados via PubMed/web | Score 8.9

### Correções de dados (S63)

- **Prev. primária:** "MACE-3" → "MACE-4" (IC 0,55-0,89) conforme JAMA 2023
- **Obesidade:** IC corrigido para 0,67-0,89 (não 0,66-0,91)
- **Ano:** JAHA 2024 → JAHA 2025

### Padrões aplicados

- Contraste: `var(--muted)` → `var(--text)` em todos os slides
- Hierarquia numérica: NNT (ação clínica) > ARR (magnitude) > HR (estatística)
- NNT obrigatório com IC 95% e time frame
- Verificação de dados via web search quando PubMed indisponível

---

## 2026-02-08 — OSTEOPOROSE visual audit S24-S28

### Polish (4 slides)

- **S24 (pos 16):** 3 boxes texto + bar chart dominante, dados Tier 1 verificados | Score 7.5
- **S25 (pos 17):** "Anabolic first" título, NNT+IC+tempo, critérios com sublinhas | Score 7.8
- **S26 (pos 18):** Blunting effect protagonista, high contrast cards (21:1), ponte narrativa para S28 | Score 8.3
- **S28 (pos 19):** Treat-to-target 3-card layout clean, números hero 3.5vw | Score 8.2

### Remoções

- **S26:** Teriparatida removida (não disponível no SUS brasileiro)
- **S26:** Bloco "Alvo T-score" redundante com S28

### Aprendizados documentados

- Boundary contrast (bordas) > background contrast para legibilidade
- Navy text sobre white = máximo contraste (~21:1)
- Título em posição padrão mantém coerência cross-slide

### Limpeza

- Removidos 11 scripts temporários de screenshot (`_shot-*.js`)
- Removido `HARD_CONSTRAINTS.md` (absorvido no CLAUDE.md)

---

## 2026-02-08 — OSTEOPOROSE audit session + fixes S25/S26

### Fixes

- **S25, S26:** Removido `display:flex` inline do `<section>` (anti-padrão E07)
- **S24:** Revertido para versão estável (fe80b0c) após tentativa de redesign

### Docs

- **CLAUDE.md HC5:** Esclarecido que inclui reinstalar/atualizar pacotes
- **memory/MEMORY.md:** Adicionado ciclo de auditoria visual obrigatório

### Nota

- Deadline 12/02 — sem refatoração estrutural até lá
- Pós-deadline: refatoração completa planejada

---

## 2026-02-08 — GRADE S14 palette coherence + overhaul massivo (17 slides)

### Conteúdo (commit `a774a8b`)

- **S14 (cross-guideline SBC/ESC/AACE):** 3 colunas com palette hierárquica

  - AACE = protagonista (navy+gold, SoF formal, padrão ouro)
  - SBC = referência (teal, GRADE adaptado)
  - ESC = suporte (gold outline, COR/LOE sem GRADE)
  - Chips grandes (1.4vw), callouts com citações ipsis litteris, método footer
  - Score: 8.95/10

- **S17:** Redesign com ruler MID (Minimally Important Difference)
- **S19:** RoB compact layout
- **S43/S44/S47:** Polish significativo (tipografia, espaçamento, cores)
- **S45:** Merged EtD (Evidence to Decision) consolidated
- **S61:** Expansion
- **S62:** GRADE synthesis visual (5 domínios)
- **S63:** New/expanded content
- **S64:** AACE SoF (Summary of Findings) com crop Table 8

### Assets

- `GRADE/assets/figures/aace_table8_crop.png` (Table 8 AACE 2025)

### Uncommitted

- S14 polish pass: font bumps ~2-5%, SBC quotes ipsis litteris, formatting compactado

### Insights documentados

- Insight 24: Small multiples (3 colunas paralelas à la Tufte)
- Insight 25: Chips grandes como focal point em slides de comparação
- Insight 26: 3-group space-between pattern (Hero/Content/Footer)
- Insight 27: Color hierarchy mapeia narrativa (protagonista = maior peso visual)
- Erro 28: ≤3 children para space-between

---

## 2026-02-08 — OSTEOPOROSE slide-by-slide audit (C15–C16)

### Conteúdo

- **Counter 15 (S22 — Estratificação de risco): header fix v16**

  - Category headers (BAIXO, INTERMEDIÁRIO, ALTO, MUITO ALTO, IMINENTE) → pills com background tint (severity cascade)
  - min-height: 1.6vw para alinhamento cross-card
  - Section labels (CRITÉRIOS, CONDUTA, FOLLOW-UP) bumped 0.52→0.58vw + border-left 2px accent

- **Counter 16 (S24 — Risco iminente: refratura 1º ano): 8 fixes**
  - Hero card: removido flex:1 → auto-height (eliminado dead space navy)
  - 2×2 mini grid expandido (flex:1)
  - Bar chart: opacity bumped nas barras inferiores, gradient+shadow nas top bars
  - Chart title: border-left 3px gold-dark
  - Mini-card 2,7×: removida ref duplicada
  - Take-home: border-radius padronizado 0.55vw
  - Score: 6.75 → 7.6/10

### Arquivos tocados

- `OSTEOPOROSE/src/slides/S22_slide-22.html` (headers v16)
- `OSTEOPOROSE/src/slides/S24_slide-24.html` (8 fixes)
- `scripts/_shot-retina.js` (configurado para C16)
- `CLAUDE.md` (sessão Round 17 + estado do audit)
- `CHANGELOG.md`

### Próximo

- Continuar audit a partir de Counter 17 (S25, posição 19 na `_list.txt`)
- Processo: shot diagnóstico → 12-critérios → fixes → re-shot

---

## 2026-02-08 — GRADE S07 Indireção redesign + S11 polish

### Conteúdo

- **S07 redesign completo (posição 11):** "Indireção: a evidência serve para este paciente?"

  - CardHeader navy + 4 PICO rows com `.badge` gold circles (P/I/C/O)
  - Right column: callouts semânticos stacked (gold=downgrade −1/−2, navy=CAC context, teal=upgrade +1, navy=essência)
  - Nota "Desfecho substituto" (LDL vs MACE, cadeia causal por classe)
  - Bullet "populações americanas (MESA)" aplicadas a contexto local
  - "Na prática" callout com pergunta clínica memorável
  - Bottom strip "Regra mental" — takeaway ancorado
  - 4 iterações (v1→v4) com screenshots de QA entre cada
  - Fill ratio final ~90%, fonts generosas para projetor (body 0.92vw)

- **S11 (posição 9):** Ajustes pontuais
  - Removido "francamente" de "Balanço francamente favorável" (NNT 100/5a ≠ maravilha)
  - **ASPREE**, **ARRIVE**, **ASCEND** em negrito nos 3 landmark trials

### Arquivos tocados

- `GRADE/src/slides/S07.html` (reescrito — redesign completo)
- `GRADE/src/slides/S11.html` (polish — negrito trials + texto)
- `CLAUDE.md` (insights 11-12: ciclo iterativo + border-left rhythm)
- `CHANGELOG.md`
- `GRADE/HANDOFF.md` (atualizado)

---

## 2026-02-07 — Round 12 (S33 merge + S35 GRADE redesign)

### Conteúdo

- **S33 redesign (merge S33+S34):** Slides redundantes sobre zoledronato e mortalidade mesclados em um único slide

  - KM real do HORIZON-RFT (Lyles NEJM 2007, Fig. 2E) — recortada de PMC2324066
  - HR 0.72, RRR 28%, NNT 27, população n=2.127
  - Callout comparativo com estatinas (4S) — storytelling hook para S35
  - S34 removido de `_list.txt` (69 slides total)

- **S35 redesign (lente GRADE):** Slide "Esse Achado Foi Replicado?" completamente refeito
  - **Forest plot real** extraído de Cummings et al. JAMA Intern Med 2019;179:1491-1500 (Figure 3)
    - PDF fornecido pelo usuário → renderizado via pdfjs-dist → recortado com sharp
  - **Painel GRADE:** ⊕⊕⊕⊕ Alta Certeza, 5 domínios com checklist visual
  - **Hero number:** RR 0.95 (IC95% 0.86–1.04), I²=0%
  - **Lan 2025 referenciado:** Confirmação com 47 RCTs, n=59.437
  - **Conclusão removida** (caixa gold "não prescreva pela mortalidade") — conforme solicitação
  - HTML forest plot anterior substituído por imagem real do journal

### Sparkline Narrative (Duarte)

- S33 (HORIZON): "o que poderia ser" — HR 0.72, comparação com estatinas = esperança
- S35 (GRADE): "o que é" — RR 0.95, GRADE Alta = realidade definitiva
- Tensão narrativa entre os dois slides maximizada

### Assets adicionados

- `OSTEOPOROSE/assets/horizon-km-death.jpg` — KM mortalidade HORIZON (crop de PMC)
- `OSTEOPOROSE/assets/cummings2019-fig3-forest.jpg` — Forest plot JAMA Intern Med 2019
- `OSTEOPOROSE/assets/lan2025-original-ref.jpeg` — Forest plot Lan CORR 2025 (full)
- `OSTEOPOROSE/assets/pdf/jamainternal_cummings_2019.pdf` — PDF fonte

### Arquivos tocados

- `OSTEOPOROSE/src/slides/S33_slide-33.html` (reescrito — merge S33+S34)
- `OSTEOPOROSE/src/slides/S35_slide-35.html` (reescrito — GRADE + imagem real)
- `OSTEOPOROSE/src/slides/_list.txt` (S34 removido, 70→69 slides)
- `screenshots/S35_AFTER.png`
- `CHANGELOG.md` (esta entrada)

### Handoff para próxima sessão

- **S33:** Validar no viewer real (Live Server) — verificar se KM do HORIZON está renderizando
- **S35:** Verificar legibilidade do forest plot na projeção (auditório)
- **print.html:** Precisa rebuild para refletir remoção do S34
- **Considerar:** Extrair Figure 4 (zoledronato) do JAMA 2019 para slide futuro?
- **Limpeza:** Remover assets temporários (lan2025-fig0.png, jama2019-p5.png, etc.)

---

## 2026-02-07 — Round 10 (Restauração slide perdido S08b + redesign)

### Conteúdo

- **Slide restaurado:** S08b_slide-08b.html — "Quadril perde ~2 QALYs — tanto quanto AVC"
  - Dados: Tosteson et al. 2008 (NOF, Tier 1) — 4 sítios de fratura + comparação CV
  - Ranking visual unificado: fraturas (barras sólidas) vs CV (barras dashed)
  - Posição: após S08 (Utilidade em Saúde), n:8 na \_meta.json

### UI/UX

- Protocolo before/after aplicado: screenshot → avaliação crítica → correções → re-screenshot
- 10 problemas corrigidos na v2:
  - Título 34→38px (coerência com S08)
  - Subtítulo cor --muted → rgba(navy, 0.42) (match S08)
  - Emojis removidos (profissionalismo)
  - Caixa de fórmula removida (ruído cognitivo)
  - CV barras agora visíveis com dashed style
  - Footer com badge navy (match S08)
  - Ranking unificado substitui layout 2-painéis fragmentado
  - Ponto focal claro: Quadril HERO CARD (navy bg, 1,89 gold 38px)
- v3 redesign (Round 2): severity cascade com flex proporcional (3/2/1.5/1)
  - Hero card navy para Quadril (dominância total)
  - Border-left como accent (5px gold-dark Vertebral, 4px gold Outras)
  - Fill ratio: 65%→80%. Checklist score: 11/12 PASS

### Arquivos tocados

- `OSTEOPOROSE/src/slides/S08b_slide-08b.html` (novo)
- `OSTEOPOROSE/src/slides/_list.txt` (S08b adicionado, 69→70 slides)
- `OSTEOPOROSE/src/slides/_meta.json` (entrada n:8 adicionada)
- `OSTEOPOROSE/src/print.html` (regenerado, 70 slides)
- `screenshots/S08b_BEFORE.png`, `S08b_AFTER.png`, `S08_reference.png`
- `CLAUDE.md` (sessão Round 10, Insights 6-8, v3 severity cascade)

---

## 2026-02-07 — Round 9 (foco: slides 40–50)

### UI/UX

- Ajuste de contraste no slide ACR 2022: header “Adultos < 40 anos” agora segue padrão navy.
- Menos “vazio visual” nos últimos slides (QALY/DM2):
  - Wrappers em flex com reserva de espaço para fonte no rodapé.
  - Colunas e cards esticam melhor em altura (menos áreas vazias).

### Conteúdo/estrutura

- Pequenos ajustes de layout sem alterar o significado clínico (apenas reorganização visual).

### Arquivos tocados

- `OSTEOPOROSE/src/slides/`: S46, S48, S15, S09, S10, S11.
- `OSTEOPOROSE/src/print.html` regenerado a partir de `slides/_list.txt`.
- `chatgpt.md` adicionado (memória de projeto + checklist).

Nota: o export por Playwright não roda neste ambiente; valide o PDF via fluxo local do projeto.
