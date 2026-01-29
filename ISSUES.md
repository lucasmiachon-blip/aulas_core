# ISSUES (P0/P1) — GRADE Slides

## OSTEOPOROSE — Pendências (2026-01-23)

- **PDF:** Ajustes finos (margens/scroll no PDF) se necessário; multi-página e 16:9 já funcionam.
- **Slide 8 (Utilidade em Saúde):** Caixas à direita da régua no viewer/PDF; grid já existe, layout pode precisar de revisão em outra sessão.
- **Não reverter:** Viewer formato apresentação (`.stage { padding: 0 }`, `maxScale = 3` em viewer.js) — ver `scripts/AI-RESTRICTIONS.md`.

---

## P0 (MVP)
- **Bloco “Metas / Recomendações (SBC 2025)”**: criar após **SAMS** (após S49), mantendo paralelismo do P0:
  - recomendações (idealmente ipsis litteris → checar licença/uso; senão, **paráfrase + referência**),
  - trials “anteriores/ulteriores” e racional (GRADE),
  - fechar domínios que faltam: **Inconsistência** e **Viés de publicação** (ensino por meio de exemplos).
  - (Opcional) inserir **rate up por confounding que reduz efeito** em ponto didático adequado.
- **S12 (SCOT-HEART 10y)**: inserir **figura** (Kaplan–Meier/endpoint) e confirmar números/rodapé com citação completa (DOI/ano/volume/páginas).
- **S43–S49 (SAMS)**: revisão rápida de números “headline” (prevalência, taxas) para evitar valores frágeis; padronizar referências completas (DOI/PMID) nos rodapés.
- **Export PDF**: garantir `printBackground: true`, `preferCSSPageSize: true` e `@page 13.333in × 7.5in` (16:9 real).

## P1 (próximo batch)
- **PREVENT**: por enquanto permanece como **apêndice** — decidir depois se entra no corpo principal.
- **Calculadoras**: manter como apêndice; refinar/expandir só após fechar “Metas/Recomendações”.
- **Refatoração CSS**: reduzir inline styles em slides-chave (migrar para componentes `.card`, `.note`, `.chip`) quando estabilizar o MVP.
- **Contexto BR (S48/S49)**: checar status SUS/CONITEC e disponibilidade (PCSK9i/bempedoic) para não ficar datado.

## SLIDEOPS - Pendentes (2026-01-23)

### P0 (Crítico - Bloqueia funcionalidade)
- ⚠️ **Erro de importação**: "Cannot access 'renderAll' before initialization" ainda ocorre
  - Verificar ordem de inicialização das funções
  - Garantir que todas as dependências estejam definidas antes de uso
  - Testar com diferentes cenários de importação

- ⚠️ **Sort não funciona**: Botão de ordenação não está respondendo
  - Verificar se event listeners estão sendo anexados corretamente
  - Verificar se elemento `fSort` está sendo encontrado no DOM
  - Testar lógica de ordenação para cada opção (prioridade, triagem, data, plano, número)

### P1 (Melhorias de UX)
- 🎨 **Hierarquia de cores da prioridade**: Inverter esquema de cores
  - **Problema atual**: P0 usa vermelho (rgba(255,107,107,...)) que gera alarme/urgência visual
  - **Proposta**: P0 deve usar cores mais tranquilas que não geram alarme, mas mantendo hierarquia visual clara
  - **Sugestão**: 
    - P0: Verde suave ou azul (alta prioridade, mas não alarmante)
    - P1: Amarelo/dourado (atenção moderada)
    - P2-P5: Gradiente de cores neutras (menos urgente)
  - **Localização**: `tools/slideops/SlideOps.html` linhas ~127-132 (classes `.p0` a `.p5`)
  - **Manter**: Hierarquia visual clara (P0 mais visível que P5) sem usar vermelho como "alerta"
