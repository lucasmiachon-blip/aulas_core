# HANDOFF — Sessão 2026-02-08 (janela que travou)

## Estado atual

- **Branch:** `main` (1 commit ahead of origin — não pushado)
- **Último commit:** `a774a8b` — "redesign(GRADE): S14 palette coherence + S17/S19/S45/S62/S64 aesthetic overhaul"
- **Uncommitted:** `GRADE/src/slides/S14.html` (polish pass — formatting cleanup, font bumps ~2-5%, text refinements)
- **Deck GRADE:** 56 slides (via `_list.txt`)
- **Live-server:** `npx live-server src --port=5501`

## O que foi feito na sessão que travou

### Commit `a774a8b` — Overhaul massivo (23 arquivos, +5363/-840 linhas)

#### GRADE slides redesenhados/polidos:

| Slide          | O que mudou                                                 | Destaque                                                                                                              |
| -------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **S14**        | 3-column cross-guideline (SBC/ESC/AACE) com unified palette | Color hierarchy fix: AACE = protagonista navy+gold (padrão ouro GRADE), SBC = teal, ESC = gold outline. Score 8.95/10 |
| **S17**        | Ruler with MID (Minimally Important Difference)             | Régua visual para decisão clínica                                                                                     |
| **S19**        | RoB compact redesign                                        | Versão condensada do Risk of Bias                                                                                     |
| **S43**        | Polish significativo (+267/-)                               | —                                                                                                                     |
| **S44**        | Polish significativo (+241/-)                               | —                                                                                                                     |
| **S45**        | Merged EtD (Evidence to Decision)                           | Consolidação de evidence framework                                                                                    |
| **S47**        | Polish (+254/-)                                             | —                                                                                                                     |
| **S48**        | Minor adjustments                                           | —                                                                                                                     |
| **S61**        | Expansion (+193/-)                                          | —                                                                                                                     |
| **S62**        | GRADE synthesis (reescrito, +396)                           | Síntese visual dos 5 domínios                                                                                         |
| **S63**        | New/expanded (+298)                                         | —                                                                                                                     |
| **S64**        | AACE SoF (Summary of Findings) (+101)                       | Tabela SoF com imagem cropada                                                                                         |
| **S18**        | Minor (2 lines)                                             | —                                                                                                                     |
| **S20**        | Minor (18 lines)                                            | —                                                                                                                     |
| **\_list.txt** | Reordenação (+10/-)                                         | —                                                                                                                     |

#### Novos assets:

- `GRADE/assets/figures/aace_table8_crop.png` — Crop da Table 8 do AACE 2025

#### OSTEOPOROSE slides no mesmo commit:

- S22, S24, S25, S26 — redesigns (parte do audit slide-a-slide)
- `_list.txt` OSTEOPOROSE atualizado

### Mudança uncommitted: S14 polish pass

O diff mostra um polish pass no S14 (88 inserções, 442 remoções — maioria é compactação de formatting):

- **Font bumps:** chips 1.35→1.4vw, body 0.78→0.8vw, labels 0.48→0.5vw, method label 0.52→0.55vw, take-home 0.85→0.88vw, hero 1.05→1.1vw
- **Padding/gap bumps:** callout padding 0.6→0.65vw, gap 0.25→0.3vw, lead 0.82→0.85vw
- **SBC callout quotes:** Trocados de "paráfrase explicativa" para citações ipsis litteris da diretriz SBC 2025, em itálico com border-left interno
- **AACE callout title:** "Rebaixa por imprecisão" refinado → "Recomendação condicional" explícito
- **Formatting:** Multiline styles → single-line (compactação sem mudança visual)
- **Grid columns:** 1.05fr/0.85fr/1.1fr → 1.1fr/0.85fr/1.05fr (AACE coluna ligeiramente wider)

## Insights-chave desta sessão (documentados no CLAUDE.md)

### Insight 27: Hierarquia de cores deve mapear a narrativa

A pergunta do S14 é "Qual o GRADE sustenta?". A resposta é AACE (único com SoF formal). Portanto:

| Peso visual | Estilo                  | Sociedade               |
| ----------- | ----------------------- | ----------------------- |
| Máximo      | Solid navy + gold text  | **AACE** (protagonista) |
| Alto        | Solid teal + white text | SBC (referência)        |
| Médio       | Outline gold            | ESC (sem GRADE formal)  |

**Regra:** O protagonista narrativo recebe a cor de MAIOR peso visual.

### Erro 28: space-between com 5+ items

≤3 children para space-between. Se >3 items, agrupar em 3 seções: Hero / Content / Footer.

### Insight 24-26: Small multiples + chips grandes + 3-group pattern

- 3 colunas paralelas (small multiples à la Tufte) para comparação cross-guideline
- Chips 1.4-1.5vw como focal point em slides de comparação
- 3-group space-between: Hero → Content wrapper → Footer

## Tarefas pendentes

### A) Commitar/descartar o polish pass do S14

- O diff está limpo (só refinamento tipográfico + quotes ipsis litteris)
- **Recomendação:** Commitar como `polish(GRADE): S14 font bumps + SBC ipsis litteris quotes`

### B) Push para origin

- Branch está 1 commit ahead. Usuário pode querer pushar.

### C) Paralelismo cross-slide (restante do deck)

- S14, S17, S19, S45, S62, S64 seguem padrão visual unificado
- S43, S44, S47 foram polidos mas podem estar ligeiramente atrás
- Slides posição 14+ não foram auditados sistematicamente

### D) Chip `.chip--gold` em bg-navy (herdado)

- Fix proposto mas NÃO aplicado: `.bg-navy .chip--gold { background: rgba(var(--gold-rgb), 0.22); color: var(--gold); border-color: rgba(var(--gold-rgb), 0.4); }`
- Afeta: S05, S06, S03 (take-home bars navy)

## Mapa de posições atualizado (56 slides)

| Posição | Arquivo | Status                          |
| ------- | ------- | ------------------------------- |
| 1       | S01     | —                               |
| 2       | S02     | —                               |
| 3       | S05     | —                               |
| 4       | S06     | Downgrades GRADE                |
| 5       | S03     | Objetivos                       |
| 6       | S09     | CAC leitura GRADE               |
| 7       | S36     | —                               |
| 8       | S08     | Benchmark (rate up)             |
| 9       | S11     | Polido (NNT/NNH)                |
| 10      | S10     | Polido (CAC staging)            |
| 11      | S07     | Polido (Indireção)              |
| 12      | S61     | Polido nesta sessão             |
| **13**  | **S14** | **Polido + uncommitted polish** |
| 14      | S17     | Polido (ruler MID)              |
| 15      | S19     | Polido (RoB compact)            |
| 16+     | ...     | Verificar                       |

## Arquivos-chave

| Arquivo                         | Função                                       |
| ------------------------------- | -------------------------------------------- |
| `GRADE/src/slides/_list.txt`    | Ordem dos slides (56 entradas)               |
| `GRADE/src/slides/S14.html`     | Cross-guideline (UNCOMMITTED)                |
| `GRADE/src/css/base.css`        | Variáveis CSS / design tokens                |
| `GRADE/src/css/blocks.css`      | Componentes (cards, chips, notes)            |
| `GRADE/src/js/slides-simple.js` | Viewer / navegação                           |
| `GRADE/assets/figures/`         | Assets visuais (inclui aace_table8_crop.png) |
| `CLAUDE.md` (raiz)              | Persona + regras + erros + insights          |

## Regras críticas (relembrete)

1. **Color hierarchy = narrative hierarchy** — protagonista recebe navy+gold (máximo peso visual)
2. **Citações ipsis litteris** em itálico com border-left interno para diferenciar de paráfrase
3. **Legibilidade projetor** — body ≥ 0.8vw, chips ≥ 1.4vw, labels ≥ 0.5vw
4. **≤3 children para space-between** — agrupar em Hero/Content/Footer
5. **Zero redundância** — cada elemento carrega informação NOVA
6. **Ciclo obrigatório** — Screenshot → crítica → fix → re-screenshot
7. **Paralelismo cross-slide** — mesmos tokens em todos os content slides
8. **Zero AI markers** — sem linhas de acento, gradientes genéricos
