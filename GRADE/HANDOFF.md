# HANDOFF — Sessão 2026-02-08

## Estado atual

- **Branch:** `main` (2 commits ahead of origin — não pushado)
- **Último commit:** `a774a8b` — "redesign(GRADE): S14 palette coherence + S17/S19/S45/S62/S64 aesthetic overhaul"
- **Uncommitted:** `GRADE/src/slides/S14.html` (rodada final: palette unificada, callouts maiores, texto ipsis literis SBC)
- **Deck GRADE:** 56 slides (via `_list.txt`)
- **Server:** `npx http-server` na porta 8000

## Resumo da sessão

### Foco: S14 — coerência de paleta + qualidade milimétrica

Múltiplas rodadas iterativas (screenshot → avaliação → fix → re-screenshot) no slide 13 (S14.html):

1. **Paleta unificada com o deck:** Identificado que S14 usava 3 cores de cardHeader (teal, gold-dark, navy) enquanto o deck inteiro usa apenas navy. Corrigido.
2. **Uma cor de accent por card:**
   - SBC = teal (border-left + chips + badges)
   - ESC = gold-dark (border-left + chips + badges)
   - AACE = navy (border-left + navy method box + navy+gold hero chips)
3. **Callouts aumentados:** padding 0.5→0.65vw, title 0.82→0.9vw, body 0.72→0.8vw
4. **Texto ipsis literis SBC 2025:** Citação direta em itálico com border-left para "Intolerância a estatinas" e "Meta não atingida"
5. **Chips e take-home maiores:** SBC 1.4vw, AACE 1.75vw, take-home 1.1vw
6. **Nota final:** 8.8/10

### Texto SBC 2025 usado (fonte: Afya + diretriz)

> Callout 1: "Para os intolerantes a estatina que não atingem o alvo com ezetimiba, recomenda-se intensificar a terapia com ácido bempedóico."

> Callout 2: "Em pacientes que não atingem a meta com estatina em dose máxima tolerada + ezetimiba, considerar adição de ácido bempedóico." *(reconstrução fiel — confirmar wording exato na tabela da diretriz)*

## Tarefas pendentes

### A) Commitar o polish do S14

O diff contém: palette fix, callouts maiores, texto ipsis literis, grid ajustado.

### B) Push para origin

Branch 2 commits ahead. Usuário pode querer pushar.

### C) Verificar wording exato SBC

O callout 2 (meta não atingida) é reconstrução baseada no Afya/contexto. Ideal: cruzar com o quadro de recomendações da diretriz completa (PDF ~180 páginas, seção de tratamento farmacológico).

### D) Restante do deck

- Slides 14+ (posição no viewer) não foram auditados nesta sessão
- S43, S44, S47 foram polidos no commit anterior mas podem estar atrás do padrão S14

## Mapa de posições (slides auditados)

| Posição | Arquivo | Status |
|---------|---------|--------|
| 1-6 | S01-S09 | Benchmark de paleta (usados como referência) |
| 13 | **S14** | Polido nesta sessão (uncommitted) |
| 14 | S17 | Polido (ruler MID) |
| 15 | S19 | Polido (RoB compact) |
| 16+ | ... | Não auditados |

## Arquivos-chave

| Arquivo | Função |
|---------|--------|
| `GRADE/src/slides/S14.html` | Cross-guideline (UNCOMMITTED) |
| `GRADE/src/slides/_list.txt` | Ordem dos 56 slides |
| `GRADE/src/css/blocks.css` | Componentes (cards, chips) |
| `CLAUDE.md` (raiz) | Persona + regras + insights |
| `scripts/_screenshot-batch.js` | Script de QA screenshots |

## Regras críticas

1. **Palette:** Todos os cardHeaders = navy. Diferenciação por border-left accent + chip color
2. **Uma cor por card:** SBC=teal, ESC=gold-dark, AACE=navy
3. **Citações:** Texto ipsis literis em itálico com border-left interno
4. **Callout mínimo:** padding ≥0.65vw, title ≥0.9vw, body ≥0.8vw
5. **Ciclo:** Screenshot 3x → crítica → fix → re-screenshot
