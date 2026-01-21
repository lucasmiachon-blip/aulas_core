# 🐛 ISSUES - Problemas Encontrados e Resolvidos

## Issues Encontrados por Assistente (Auto)

### [2026-01-22] - Batch 2: Classes grid sem container grid pai
**Status:** ✅ RESOLVIDO  
**Prioridade:** P0 (Crítico)

**Problema:**
- S03.html usava `class="col-12"` mas `.slide` tem `display: flex`, não `display: grid`
- Classes `.col-*` só funcionam dentro de containers com `display: grid`
- Isso fazia as classes não funcionarem corretamente

**Solução:**
- Removidas classes `col-12` do S03
- Mantido sistema de design (variáveis CSS, componentes funcionam)
- Layout preservado (flex funciona corretamente)

**Commit:** `23aa1d5`

**Nota para próximos slides:**
- Para usar grid 12-column, criar wrapper com `class="slide-grid"` dentro do slide
- Ou usar `display: grid` diretamente no container interno
- Classes `.col-*` só funcionam dentro de containers com grid

---

## Issues Trazidos pelo Usuário

### [2026-01-22] - PDF parece ter voltado para trás
**Status:** 🔍 INVESTIGANDO  
**Prioridade:** P1 (Alto)

**Problema reportado:**
- PDF gerado parece ter voltado para trás (regressão visual?)

**Investigação:**
- ✅ Sistema de design aplicado (system.css + components.css)
- ✅ Classes CSS definidas corretamente
- ✅ PDF gerado com sucesso (45 slides)
- ⚠️ Possível conflito: classes usam `rem` mas slides usam `vw` em inline styles
- ⚠️ Estilos inline podem estar sobrescrevendo classes do sistema

**Próximos passos:**
- Verificar se estilos inline estão sobrescrevendo classes
- Considerar ajustar classes para usar `vw` ao invés de `rem` para compatibilidade
- Validar visualmente no viewer e PDF

---

**Última atualização:** 2026-01-22
