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
**Status:** ✅ RESOLVIDO  
**Prioridade:** P1 (Alto)

**Problema reportado:**
- PDF gerado parece ter voltado para trás (regressão visual?)

**Causa identificada:**
- Conflito de especificidade CSS: `base.css` tem regras para `h2` e `p` que sobrescrevem classes do sistema
- Classes `.title-section`, `.body-large`, `.caption` não tinham `!important` para sobrescrever estilos base

**Solução aplicada:**
- Adicionado `!important` nas classes de tipografia do sistema (`system.css`)
- Garante que classes do sistema sobrescrevem estilos base do `base.css`
- Mantém compatibilidade com estilos inline existentes

**Commit:** `[próximo commit]`

---

### [2026-01-22] - Regressão visual: !important excessivo + cores não oficiais
**Status:** ✅ RESOLVIDO  
**Prioridade:** P0 (Crítico)

**Problema reportado:**
- Commit atual muito pior que anterior
- Estilos quebrados, cores incorretas

**Problemas encontrados:**
1. **S45.html usava `var(--accent-primary)`** - Não é paleta oficial, deveria ser `var(--teal)`
2. **S28.html tinha cores hardcoded `#DDD`** - Deveria usar `var(--border)`
3. **`!important` excessivo no system.css** - Quebrava estilos inline necessários

**Solução aplicada:**
- ✅ Substituído `var(--accent-primary)` por `var(--teal)` no S45.html (3 ocorrências)
- ✅ Substituído `#DDD` por `var(--border)` no S28.html (2 ocorrências)
- ✅ Removido `!important` excessivo, usando especificidade CSS adequada
- ✅ Classes agora usam seletores mais específicos (`h2.title-section`, `p.body-large`) ao invés de `!important`

**Commit:** `[próximo commit]`

---

**Última atualização:** 2026-01-22
