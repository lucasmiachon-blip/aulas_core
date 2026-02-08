# HANDOFF — Sessão 2026-02-08 (encerramento)

## Estado atual

- **Branch:** `main` (ahead of origin — não pushado)
- **Deck GRADE:** 56 slides
- **Live-server:** `npx live-server src --port=5501` (pode precisar reiniciar)

## O que foi feito nesta sessão

### 1. S07 (posição 11) — Redesign completo "Indireção"

**Antes:** Layout genérico com 2×2 PICO grid cramped + 4 boxes minúsculas no right side. Sem cardHeader, sem focal point, dead space abaixo, fonts inconsistentes com benchmarks.

**Depois:** Redesign profissional em 4 iterações (v1→v4):

- **CardHeader navy** com chip "Core GRADE 5" (branco sobre navy — fix de contraste)
- **4 PICO rows stacked** com `.badge` gold circles (P/I/C/O) — focal point claro
- **Right column:** 5 callouts semânticos stacked com border-left accent:
  - Gold: Quanto rebaixar (−1 moderada / −2 grave)
  - Navy: Onde aparece no CAC (4 bullets clínicos)
  - Teal: Upgrade possível (+1)
  - Navy: Essência (transferência vs erro)
  - Gold tint: Na prática (pergunta clínica memorável)
- **Conteúdo novo:** Desfecho substituto (LDL cadeia causal), populações MESA, essência expandida
- **Bottom strip:** "Regra mental" ancorada
- **Fill ratio:** ~90%, body text 0.92vw (legível em projetor)

### 2. S11 (posição 9) — Ajustes pontuais

- Removido "francamente" de "Balanço francamente favorável" (NNT 100/5a)
- ASPREE, ARRIVE, ASCEND em negrito

## Tarefa pendente (próxima sessão)

### A) Chip `.chip--gold` em contexto `bg-navy` — contraste insuficiente

(Herdado de sessão anterior — NÃO executado)

- `.bg-navy .chip--gold` no `blocks.css` precisa de override
- Fix proposto: `background: rgba(var(--gold-rgb), 0.22); color: var(--gold); border-color: rgba(var(--gold-rgb), 0.4);`
- Afeta: S05, S06, S03 (take-home bars navy)

### B) Paralelismo cross-slide

Os slides S08/S10/S11/S07 agora seguem o mesmo padrão visual (cardHeader, callouts, fonts generosas). Os demais slides do deck (posições 12+) podem estar com padrão anterior — eventual auditoria recomendada.

## Mapa de posições (56 slides)

| Posição | Arquivo | Título resumido                      | Status      |
| ------- | ------- | ------------------------------------ | ----------- |
| 1       | S01     | Título/abertura                      |             |
| 2       | S02     | (verificar)                          |             |
| 3       | S05     | (verificar)                          |             |
| 4       | S06     | Downgrades GRADE                     |             |
| 5       | S03     | Objetivos                            |             |
| 6       | S09     | CAC leitura GRADE                    |             |
| 7       | S36     | (verificar)                          |             |
| 8       | S08     | Rate up (dose-resposta + magnitude)  | Benchmark   |
| 9       | S11     | NNT/NNH estatina vs aspirina por CAC | Polido      |
| 10      | S10     | CAC staging cardiovascular           | Polido      |
| **11**  | **S07** | **Indireção — REDESENHADO**          | **Polido**  |
| 12      | S61     | (verificar)                          |             |
| 13      | S14     | (verificar)                          |             |
| ...     | ...     | ...                                  |             |

## Arquivos-chave

| Arquivo                         | Função                            |
| ------------------------------- | --------------------------------- |
| `GRADE/src/slides/_list.txt`    | Ordem dos slides (56 entradas)    |
| `GRADE/src/slides/S07.html`     | Indireção (redesenhado)           |
| `GRADE/src/slides/S08.html`     | Benchmark visual (rate up)        |
| `GRADE/src/slides/S10.html`     | Benchmark recente (staging)       |
| `GRADE/src/slides/S11.html`     | Benchmark recente (NNT/NNH)       |
| `GRADE/src/css/base.css`        | Variáveis CSS / design tokens     |
| `GRADE/src/css/blocks.css`      | Componentes (cards, chips, notes) |
| `GRADE/src/js/slides-simple.js` | Viewer / navegação                |
| `CLAUDE.md` (raiz)              | Persona + regras + erros          |

## Regras críticas (relembrete para próxima sessão)

1. **Cores sólidas para texto** — `var(--navy)`, `var(--muted)`, `var(--teal)`. Zero `rgba()` em body text.
2. **Legibilidade projetor** — Sala de aula, projetor pequeno, gente longe. Fontes generosas (body ≥ 0.92vw).
3. **Zero redundância** — Cada elemento carrega informação NOVA.
4. **Ciclo obrigatório** — Screenshot → crítica → fix → novo screenshot → só então mostrar ao usuário.
5. **Paralelismo cross-slide** — Títulos na mesma altura/tamanho/peso em todos os content slides.
6. **Border-left rhythm** — Em stacks de callouts, usar border-left semântico em TODOS os boxes.
7. **Nunca `display` inline na `<section class="slide">`** — o viewer controla isso.
8. **Zero AI markers** — Sem linhas de acento, gradientes genéricos, decoração sem propósito.
