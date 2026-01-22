# Status do Projeto - aulas_core/GRADE

**Última atualização:** 2026-01-22

## ✅ Completo (P0 / MVP base)

- Paleta e tipografia consolidadas (look “Tier-1” + tokens RGB)
- Viewer estável: navegação por teclado, clique (TED-like), swipe e deep-link por hash
- Print/PDF em estilo PPT (16:9, 1 slide/página) via `GRADE/src/css/print.css`
- Patch de contraste: chips de certeza (`⊕⊕○○ BAIXA`) legíveis em headers navy (`.cardHeader`)
- Batch 06–15 revisado visualmente (S06–S15 marcados READY no dashboard)

## ⏳ Em Andamento (P1)

- [ ] Padronizar referências (rodapé/citações) em todo o deck
- [ ] Revisão de conteúdo/números (NNT/NNH/HR) + checagem de fontes
- [ ] Slide SCOT-HEART: atualizar para follow-up 10 anos (figura + citação)

## 🎯 Próximos Passos (próximos 1–2 dias)

1. **Fix SCOT-HEART 10y**: substituir placeholder (HR + seguimento) e inserir figura com citação completa
2. **Uniformizar sidebar GRADE**: header consistente + posição fixa do badge
3. Rodar exportação de PDF (node) e validar no projetor (contraste real)

## 📊 Métricas

- Total de slides no deck: **45** (S01–S46, com S21 removido)
- Status (dashboard): S06–S15 = READY (PDF_OK=Yes)
- Última sessão: patch de contraste (chips em header) + ajuste do exportador PDF para respeitar 16:9

---

**Para detalhes técnicos:** ver `GRADE/CHANGELOG.md` e `ISSUES.md`
