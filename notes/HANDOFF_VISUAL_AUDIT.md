# HANDOFF - Auditoria Visual OSTEOPOROSE
> Gerado: 31/01/2026 | Deadline: 12/02/2026 (12 dias)

## CONTEXTO
- 73 slides analisados visualmente (screenshots)
- Problema principal: distribuição espacial, não código
- 2500 inline styles - NÃO REFATORAR

## SLIDES MODELO (usar como referência)
- **S35** - Zoledronato Mortalidade - PERFEITO
- **S47** - ACR 2022 Evidências - EXCELENTE
- **S48** - Classificação Risco - BOM

## CRÍTICOS (precisam correção)
| Slide | Problema | Ação |
|-------|----------|------|
| S08 | 70% espaço vazio, conteúdo no canto | Redistribuir/centralizar |
| S09 | 4 conceitos em 1 slide | Aceitar como denso OU dividir |
| S18 | Placeholder "ARRUMAR AQUI" | Completar texto |
| S26 | Barras cinzas sem valores | Adicionar % |
| S69-72 | [PLACEHOLDER] imagens DXA | Adicionar ou remover |

## MODERADOS (ajuste se der tempo)
| Slide | Problema |
|-------|----------|
| S10 | Desequilíbrio L/R, fonte flutuando |
| S11 | Box vazio embaixo |
| S12 | Fonte pequena/apertada |
| S36 | Espaço vazio embaixo |

## PADRÕES SISTÊMICOS
1. **Espaço morto** - conteúdo em cima, vazio embaixo
2. **Desequilíbrio L/R** - uma coluna mais pesada
3. **Fontes flutuando** - desconectadas do conteúdo
4. **Densidade inconsistente** - alguns vazios, outros lotados

## ESTRATÉGIA RECOMENDADA
1. **P0**: Corrigir S08, S18, S26 (conteúdo incompleto)
2. **P1**: CSS global para redistribuição vertical
3. **P2**: Ajustes pontuais em slides moderados
4. **NÃO FAZER**: Refatorar inline styles

## ARQUIVOS DE CONFIGURAÇÃO JÁ CRIADOS
- CLAUDE_v2.md (regras do projeto)
- PROMPTS_v2.md (prompts prontos)
- GUARDRAILS.md (anti-patchwork)
- ANTI_HALLUCINATION_SYSTEM.md
- VISUAL_DESIGN_GUIDE.md
- DIAGNOSTIC_PROMPTS.md

## PRÓXIMO PASSO
Prompt para criar CSS de correção global:
```
TASK: Criar src/css/polish.css

Corrigir via CSS global (sem mexer nos slides):
1. Redistribuição vertical - conteúdo mais centralizado
2. Espaço mínimo embaixo dos slides
3. Fontes/referências com posição fixa no footer

Usar !important apenas onde necessário para override inline.
Não quebrar o que já funciona.
```

## SCREENSHOTS
Pasta: screenshots/osteoporose/normal/ (73 arquivos)

## CHANGELOG
- 31/01/2026: S03 refeito (lista vertical com 5 objetivos) e S08 refeito (régua 320px + 4 boxes, sem !important/max-height).
- 31/01/2026: S09 "O que é QALY?" removido e deck reordenado para 72 slides; _list.txt e _meta.json sincronizados.
- 31/01/2026: Slide fantasma S35b_slide-32b.html removido.
- 31/01/2026: Preview de print em tela ajustado (zoom responsivo e overflow-x hidden) via print.css + viewer.js.
- 31/01/2026: PDF export validado com 72 páginas (exports/OSTEOPOROSE-slides.pdf).
