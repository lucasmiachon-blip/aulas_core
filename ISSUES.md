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

_(Nenhum ainda - este arquivo será atualizado conforme issues forem reportados)_

---

**Última atualização:** 2026-01-22
