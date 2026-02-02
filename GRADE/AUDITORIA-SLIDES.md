# Auditoria de Slides — GRADE

**Data:** 2026-01-22  
**Escopo:** Passo **P0 (MVP)** — paleta, tipografia, consistência de tokens, viewer e exportação PDF 16:9.

## Diagnóstico mais gritante (antes do P0)
- **Inconsistência de cor**: mistura de RGB hardcoded + tentativas de `rgba(var(--gold), …)` (CSS inválido) → fundos/tints quebravam e a paleta “parecia amadora”.
- **Tipografia sem regra**: Inter + Lato + Georgia usados de forma ad-hoc → hierarquia visual inconsistente.
- **Print/PDF não-PPT**: exportação em A4 e “normalização” agressiva de layout → deformava slides e comprometia uso em congresso.
- **Viewer com UX de palco incompleta**: sem deep link por slide, sem clique/swipe (útil em ensaio e revisão).

## Correções aplicadas (P0)
- Tokens revisados + **RGB helpers** para transparências (`rgba(var(--gold-rgb), 0.x)`).
- **Fonte principal Inter** (Georgia fica opcional para quotes/ênfase).
- **Exportação PDF em 16:9** (1 slide/página), preservando layout do slide.
- Viewer com: `_list.txt` (menos manutenção), hash por contador `#n` (mantém suporte a `#Sxx`), clique, swipe, Home/End.

## Checklist P0 (MVP)
- [x] Nenhum slide com **cores hex hardcoded** em `style=""` (cores → tokens).
- [x] Nenhuma ocorrência de `rgba(var(--gold), …)` inválido.
- [x] Tipografia consistente (Inter via `--font-sans`).
- [x] Print/PDF: 16:9 + 1 slide por página + background preservado.
- [x] Viewer: teclado, clique, swipe, deep-link.

## Slide a slide (status visual)
| ID | Título | P0 Visual | Próximo passo |
|---|---|---|---|
| S01 | CORE GRADE | OK (contraste) | P1: confirmar subtítulo/ano + logos (se necessário) |
| S02 | "Navegar é preciso..." | OK | P1: validar números (LOE A/C) + fonte |
| S03 | CAC para decidir sob incerteza: a lente GRADE | OK (rework) | P1: checar redação exata da recomendação SBC 2025 |
| S04 | Onde a sala está? | OK | P1: decidir pergunta interativa (mentimeter/QR) |
| S05 | O Grande Divisor | OK | P1: reduzir densidade e checar consistência com narrativa |
| S06 | O Motor do GRADE | OK | P1: reduzir densidade e checar consistência com narrativa |
| S07 | GRADE Domain: Indirectness | OK | P1: citar referência do domínio GRADE |
| S08 | GRADE Domain: Dose-Response Gradient | OK | P1: citar referência do domínio GRADE |
| S09 | Aplicação GRADE: Escore de Cálcio Coronariano | OK | P1: adicionar/confirmar referências (CAC, eventos, follow-up) |
| S10 | CAC = 0: por quanto tempo sinaliza risco baixo? | OK | P1: adicionar/confirmar referências (CAC, eventos, follow-up) |
| S11 | CAC = 0: estatina reduz eventos? | OK | P1: adicionar/confirmar referências (CAC, eventos, follow-up) |
| S12 | CAC=0 não exclui placa não calcificada | OK | P1: adicionar/confirmar referências (CAC, eventos, follow-up) |
| S13 | Aspirina na prevenção primária: NNT vs NNH por CAC | OK | P1: revisar NNT/NNH + fonte primária |
| S14 | Aplicação GRADE: Ácido Bempedóico | OK | P1: revisar evidência (bempedoic/SAMS) + rodapé |
| S15 | Sintomas Musculares Associados às Estatinas (SAMS) | OK | P1: revisar evidência (bempedoic/SAMS) + rodapé |
| S16 | Ácido Bempedóico: Por que NÃO causa sintomas musculares? | OK | P1: revisar evidência (bempedoic/SAMS) + rodapé |
| S17 | Imprecisão: Conceito de Diferença Mínima Importante (MID) | OK | P1: revisar MID/imprecisão + CLEAR Outcomes |
| S18 | Aplicação ao CLEAR Outcomes: Análise de Imprecisão (MACE-4) | OK | P1: revisar MID/imprecisão + CLEAR Outcomes |
| S19 | Risco de Viés (RoB): Critérios Core GRADE Aplicados ao CLEAR Outcomes | OK | P1: alinhar com RoB/EtD oficiais + exemplos |
| S20 | Da Evidência à Recomendação: Evidence-to-Decision (EtD) Framework | OK | P1: alinhar com RoB/EtD oficiais + exemplos |
| S22 | Recomendações das Diretrizes | OK | P1: validar métricas PREVENT/prognóstico + fontes |
| S23 | GRADE: Prognósticos ≠ Intervenções | OK | P1: validar métricas PREVENT/prognóstico + fontes |
| S24 | GRADE: Calibração do PREVENT | OK | P1: validar métricas PREVENT/prognóstico + fontes |
| S25 | GRADE: Discriminação do PREVENT | OK | P1: validar métricas PREVENT/prognóstico + fontes |
| S26 | Comparativo de Calculadoras | OK | P1: validar tabelas (calculadoras, PROBAST, TRIPOD+AI) |
| S27 | 🚨 Limitação: Subgrupos de Baixa Performance | OK | P1: validar tabelas (calculadoras, PROBAST, TRIPOD+AI) |
| S28 | Variáveis Ausentes no PREVENT | OK | P1: validar tabelas (calculadoras, PROBAST, TRIPOD+AI) |
| S29 | CAC como Reclassificador | OK | P1: validar tabelas (calculadoras, PROBAST, TRIPOD+AI) |
| S30 | PROBAST : Avaliação de Viés | OK | P1: validar tabelas (calculadoras, PROBAST, TRIPOD+AI) |
| S31 | TRIPOD+AI : Transparência em Modelos | OK | P1: validar tabelas (calculadoras, PROBAST, TRIPOD+AI) |
| S32 | Conclusões & Próximos Passos | OK | P1: validar tabelas (calculadoras, PROBAST, TRIPOD+AI) |
| S33 | BÔNUS — CAC | OK | P2: refino narrativo + Q&A (respostas curtas) |
| S34 | GRADE: Indirectness = PICO mismatch (treino rápido) | OK | P2: refino narrativo + Q&A (respostas curtas) |
| S35 | CAC e Indirectness: mapa do risco ≠ prova de estratégia | OK | P2: refino narrativo + Q&A (respostas curtas) |
| S36 | SBC 2025: CAC reclassifica risco → meta LDL-c | OK | P2: refino narrativo + Q&A (respostas curtas) |
| S37 | Fronteiras: CAC (assintomático) ≠ CCTA (sintomático) | OK | P2: refino narrativo + Q&A (respostas curtas) |
| S38 | SCOT-HEART (CCTA em dor torácica): o que importa | OK | P2: refino narrativo + Q&A (respostas curtas) |
| S39 | Aspirina guiada por CAC: por que é tentador e por que é ‘EtD pesado’ | OK | P2: refino narrativo + Q&A (respostas curtas) |
| S40 | CAC Staging (2024): proposta, não guideline | OK | P2: refino narrativo + Q&A (respostas curtas) |
| S41 | Rescan: só se for mudar conduta | OK | P2: refino narrativo + Q&A (respostas curtas) |
| S42 | Se perguntarem X, responda Y (curto) | OK | P2: refino narrativo + Q&A (respostas curtas) |
| S43 | SAMS: O Problema Clínico que Aumenta Risco Cardiovascular | OK | P1: revisão final de síntese + consistência de termos |
| S44 | Bempedoic Acid para Redução de MACE | OK | P1: revisão final de síntese + consistência de termos |
| S45 | Tensão Metodológica em Recomendações Brasileiras | OK | P1: revisão final de síntese + consistência de termos |
| S46 | Síntese GRADE + Contexto Brasileiro | OK | P1: revisão final de síntese + consistência de termos |

---

## Plano de batches (a partir de amanhã)
Sugestão prática (5 por batch):
- **Batch A:** S01–S05 (capa + introdução)
- **Batch B:** S06–S10 (motor + CAC)
- **Batch C:** S11–S15 (CAC + aspirina + bempedoic)
- **Batch D:** S16–S20 (SAMS + imprecisão + RoB/EtD)
- **Batch E:** S22–S26 (diretrizes + prognóstico + PREVENT + comparativos)
- **Batch F:** S27–S32 (limitações + PROBAST/TRIPOD+AI + conclusões)
- **Batch G:** S33–S38 (bônus CAC + SCOT-HEART)
- **Batch H:** S39–S46 (aspirina por CAC + staging + Q&A + síntese)

