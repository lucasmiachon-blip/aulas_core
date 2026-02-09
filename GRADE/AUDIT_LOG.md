# GRADE Audit Log

> Registro de auditoria visual slide-by-slide | Scores e notas

---

## S14 — Cross-guideline comparison (posição 13)

**Versão final:** v8 | **Score:** 9.2/10 | **Data:** 2026-02-08

### Mudanças aplicadas
| Aspecto | Antes | Depois |
|---------|-------|--------|
| Alinhamento | Desalinhado | Grid 4.5vw/1fr/auto |
| Border-radius | 0.25vw | 0.6vw |
| Fonte título | 0.8vw | 0.95vw |
| Fonte corpo | 0.68vw | 0.88vw |
| Contraste texto | var(--muted) | var(--text) |
| Min-height callouts | — | 4vw |

### Conteúdo
- Texto SBC ipsis literis (diretriz 2025)
- 3 colunas: SBC / ESC / AACE
- Paleta diferenciada: teal / gold-dark / navy

### Notas para melhoria futura
1. Espaço vazio entre callouts e método (~25%)
2. Callouts ESC/AACE com espaço interno (menos texto)
3. Border-left poderia ser 0.2vw (como S03)
4. Quote marks estilizadas nas citações
5. Chips hero ligeiramente maiores (1.6-1.8vw)
6. Take-home bar com mais padding vertical
7. Ícone visual por diretriz (bandeira/logo)

### Screenshots
- `screenshots/S14_before.png` — estado inicial
- `screenshots/S14_v8.png` — versão final

---

## S43 — SAMS: qualificando o P do PICO (posição 14)

**Versão final:** v11 | **Score:** 8.3/10 | **Data:** 2026-02-08

### Mudanças aplicadas
| Aspecto | Antes | Depois |
|---------|-------|--------|
| Fonte steps | 0.82vw | 0.85vw |
| Contraste body | var(--muted) | var(--text) |
| Step 2 | Normal | **Hero** (teal border + shadow) |
| Quebra linha Step 1 | "segurança primeiro." | "segurança." |
| Coluna esquerda | space-between | gap fixo 0.7vw |
| Texto Step 3 | Longo | Compacto "(EtD)" |

### Notas
- Layout 2-colunas funcional
- Step 2 (Teste de causalidade) como hero visual
- 3 passos numerados = chunking eficiente (Tufte)
- PICO box reforça conexão curricular
- Dados SAMSON/StatinWISE preservados

### Screenshots
- `screenshots/S43_before.png` — estado inicial
- `screenshots/S43_v11.png` — versão final

---

## S44 — CLEAR Outcomes: relativo vs absoluto (posição 15)

**Versão final:** v2 | **Score:** 8.8/10 | **Data:** 2026-02-08

### Mudanças aplicadas
| Aspecto | Antes | Depois |
|---------|-------|--------|
| NNT destaque | Cinza neutro | **Teal border + bg** (hero) |
| NNT tamanho | 3.2vw | **3.4vw** |
| NNT IC | Ausente | **IC 95%: ~40-150** |
| HR tamanho | 3.6vw | 3.2vw (menos dominante) |
| ARR box | Neutro | Borda navy 1.5px |
| Contraste labels | muted/opacity | var(--text) |

### Notas
- Hierarquia: **NNT > ARR > HR** (prática clínica)
- NNT agora é o hero visual (teal)
- IC do NNT obrigatório para transparência
- Layout 3-col bem balanceado

### Screenshots
- `screenshots/S44_before.png` — estado inicial
- `screenshots/S44_v2.png` — versão final

---

## S63 — Nustendi, NNT e regra CTT (posição 16)

**Versão final:** v4 | **Score:** 8.9/10 | **Data:** 2026-02-08

### Mudanças aplicadas
| Aspecto | Antes | Depois |
|---------|-------|--------|
| Hero "-38%" | Navy 3.2vw | **Teal 3.4vw** |
| Header NNT 5a* | Navy | **Teal** |
| Valores NNT | Navy bold | **Teal bold** |
| Row Bempedóico | Gold leve | **Gold forte + border 2px + bold** |
| "LDL VS PLACEBO" | muted | text |
| Post-hoc cards | 0.85vw | 0.8-0.82vw (compactos) |
| Take-home | Texto corrido | Estruturado 2 linhas |
| Gap grid | 1.4vw | 1.6vw (respiro) |

### Correções de dados (verificados via web search)
| Campo | Antes | Depois | Fonte |
|-------|-------|--------|-------|
| Prev. primária | MACE-3 | **MACE-4** (IC 0,55-0,89) | JAMA 2023 |
| Obesidade IC | 0,66-0,91 | **0,67-0,89** | JAHA 2025 |
| Ano | 2024 | **2025** | JAHA 2025 |

### Notas
- Hierarquia: -38% teal → NNTs teal → post-hoc
- Dados verificados contra fontes primárias
- Slide denso (data-heavy) — fill ratio ~80%

### Screenshots
- `screenshots/S63_before.png` — estado inicial
- `screenshots/S63_v3.png` — versão final

---

## S19 — RoB 2.0 no CLEAR Outcomes (posição 17)

**Versão final:** v1 | **Score:** 8.3/10 | **Data:** 2026-02-08

### Mudanças aplicadas
| Aspecto | Antes | Depois |
|---------|-------|--------|
| Domínios detail | 0.75vw + muted | 0.82vw + text |

### Notas
- Slide referência do design system
- Hero "Baixo" em teal = ponto focal
- 5 domínios RoB bem estruturados

### Screenshots
- `screenshots/S19_before2.png` — estado inicial
- `screenshots/S19_v1.png` — versão final

---

## Próximos slides a auditar

| Posição | Arquivo | Status |
|---------|---------|--------|
| 17 | S19 | ✅ Auditado (8.3) |
| 18 | S47 | Pendente |
| 19 | S17 | Pendente |
| 20+ | ... | Pendente |

---

*Última atualização: 2026-02-08 (sessão 2)*
