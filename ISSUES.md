# ISSUES (aulas_core)

Este arquivo é o **painel humano** de bugs e riscos. A fonte “auditável” de métricas fica no `DASHBOARD.xlsx`.

## Status geral (2026-01-22)

### ✅ Fechado (P0 / MVP)
- **Paleta inconsistente / tints quebrados**: havia `rgba(var(--gold), …)` (inválido) e RGB hardcoded em múltiplos slides → padronizado para `rgba(var(--gold-rgb), a)`.
- **Tipografia sem regra**: ocorrências de Lato sem carregar fonte → padronizado para `--font-sans` (Inter).
- **Chips no header navy (⊕⊕○○ BAIXA/MODERADA)**: `chip--gold` translúcido perdia contraste em `.cardHeader` → corrigido com fill quase sólido em `blocks.css`.
- **Print/PDF não-PPT**: exportação em A4 + “normalização” agressiva quebrava layout → novo `print.css` 16:9 (1 slide/página).
- **Slide S03 muito denso**: refeito para foco em SBC 2025 + leitura GRADE.

### 🟡 Aberto (P1)
- **Conteúdo / evidência**: revisar números, NNT/NNH, e inserir fontes formais (SBC 2025, CLEAR Outcomes, etc.).
- **Consistência de rodapé**: padronizar fonte/estilo de referência (1–2 linhas) em todo o deck.
- **Ensaios**: testar em projetor (contraste real) e ajustar tamanhos mínimos de fonte onde necessário.

### 🟢 Backlog (P2)
- Modo “overview” (miniaturas) para revisão rápida.
- Template de ícones (SVG) e padronização de gráficos.
