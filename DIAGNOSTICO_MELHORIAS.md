# 🔍 DIAGNÓSTICO DE MELHORIAS FUTURAS

> Gerado em: 2026-02-02
> Escopo: OSTEOPOROSE + GRADE

---

## 📊 RESUMO EXECUTIVO

| Categoria | OSTEOPOROSE | GRADE | Recomendação |
|-----------|-------------|-------|--------------|
| !important no CSS | 159 | 61 | 🔴 Refatorar gradualmente |
| Inline styles | 2.416 | 1.882 | 🟡 Migrar para classes |
| Acessibilidade (aria/role) | 18 | 2 | 🔴 Crítico |
| Cores hardcoded | 0 | 37 | 🟡 Usar CSS vars |
| console.log | ~300 | ~50 | 🟡 Limpar para produção |
| TODOs pendentes | 0 | 1 | 🟢 Resolver |

---

## 🔴 PRIORIDADE ALTA (P0)

### 1. Debug Code em Produção

**Problema:** `viewer.js` contém chamadas fetch para `127.0.0.1:7242` (servidor de debug que não existe)

```javascript
// OSTEOPOROSE/src/js/viewer.js - 5 ocorrências
fetch('http://127.0.0.1:7242/ingest/...')
```

**Impacto:** Requests falhos silenciosos em cada interação
**Ação:** Remover ou wrappear com flag `DEBUG=true`

---

### 2. Acessibilidade Crítica

**Problema:** Quase zero atributos de acessibilidade

| Projeto | aria-* / role= | Slides |
|---------|----------------|--------|
| OSTEOPOROSE | 18 | 72 |
| GRADE | 2 | 61 |

**Impacto:** Inacessível para leitores de tela
**Ação futura:**
- Adicionar `role="region"` em cada slide
- Adicionar `aria-label` com título do slide
- Adicionar `aria-current="true"` no slide ativo

---

### 3. Gap no GRADE - S21 Faltando

**Problema:** Slides vão de S20 → S22 (S21 não existe)

```
S19.html ✓
S20.html ✓
S21.html ✗ FALTANDO
S22.html ✓
```

**Ação:** Verificar se é intencional ou se perdeu durante edição

---

## 🟡 PRIORIDADE MÉDIA (P1)

### 4. Inline Styles em Massa

**Problema:** 4.298 ocorrências de `style="..."` nos slides

| Projeto | Inline styles |
|---------|---------------|
| OSTEOPOROSE | 2.416 |
| GRADE | 1.882 |

**Impacto:**
- Difícil manutenção
- Impossível tema/skin
- Viola HC9

**Ação futura:** Criar classes utilitárias e migrar gradualmente

---

### 5. !important em Excesso

**Problema:** 220 ocorrências de `!important` no CSS

| Arquivo | Count |
|---------|-------|
| OSTEOPOROSE/print.css | 121 |
| OSTEOPOROSE/viewer.css | 21 |
| GRADE/base.css | 30 |
| GRADE/print.css | 28 |

**Impacto:** Guerra de especificidade
**Ação futura:** Refatorar seletores para eliminar necessidade

---

### 6. Cores Hardcoded no GRADE

**Problema:** 37 cores hexadecimais diretamente nos slides

```html
<!-- Exemplo em GRADE/src/slides/S53.html -->
<span style="color: #dc2626;">
```

**Ação:** Substituir por `var(--danger)` ou tokens do design system

---

### 7. Arquivos de Backup Esquecidos

**Problema:** `GRADE/src/slides/S51.html.orig` não deveria estar no repo

**Ação:** Remover arquivo .orig

---

## 🟢 PRIORIDADE BAIXA (P2)

### 8. Console.log para Limpar

**Problema:** ~350 console.log/warn/error no código

| Tipo | Count |
|------|-------|
| console.log | 450+ |
| console.warn | 60+ |
| console.error | 40+ |

**Nota:** Muitos são úteis para debug. Considerar:
- Flag `DEBUG` para ativar/desativar
- Ou remover apenas os verbosos (ex: viewer.js tem ~30 só de fitToScreen)

---

### 9. Inconsistência de Nomenclatura

| Aspecto | OSTEOPOROSE | GRADE |
|---------|-------------|-------|
| Nome do slide | `S01_slide-01.html` | `S01.html` |
| JS principal | `viewer.js` + múltiplos | `slides-simple.js` |
| CSS files | 5 arquivos | 4 arquivos |

**Nota:** Não é bloqueante, mas dificulta scripts genéricos

---

### 10. TODO Pendente

```html
<!-- GRADE/src/slides/S12.html:11 -->
<!-- TODO: inserir figura (Kaplan–Meier) + citação completa do paper 10y -->
```

---

### 11. package.json Confuso

**Problema:** `scripts/package.json` é na verdade o manifest do `playwright-core`, não um package.json do projeto

**Ação:** Renomear para algo mais claro ou criar package.json real do projeto

---

## 📋 PLANO DE AÇÃO SUGERIDO

### Sprint 1: Higiene (sem risco)
- [ ] Remover `S51.html.orig`
- [ ] Resolver TODO em S12.html (GRADE)
- [ ] Verificar se S21 faltando é intencional

### Sprint 2: Debug Code
- [ ] Remover/comentar fetch para 7242 em viewer.js
- [ ] Reduzir console.log verbosos (ou flag DEBUG)

### Sprint 3: Acessibilidade Básica
- [ ] Adicionar `role="region"` nos slides
- [ ] Adicionar `aria-label` com título
- [ ] Testar com leitor de tela

### Sprint 4: CSS Cleanup (gradual)
- [ ] Criar classes utilitárias para padrões repetidos
- [ ] Migrar 10% dos inline styles por vez
- [ ] Revisar !important e refatorar seletores

### Sprint 5: Consistência
- [ ] Padronizar nomenclatura de arquivos
- [ ] Considerar extrair CSS/JS comum para shared/

---

## ✅ O QUE JÁ ESTÁ BOM

1. **Estrutura de pastas** - Clara e organizada
2. **Separação de slides** - Um arquivo por slide
3. **Scripts de export** - Funcionais e configuráveis
4. **Hard Constraints** - Documentados e claros
5. **Git workflow** - Commits frequentes
6. **CSS vars** - Bem usadas em OSTEOPOROSE

---

*Diagnóstico gerado automaticamente. Revisar antes de executar ações.*
