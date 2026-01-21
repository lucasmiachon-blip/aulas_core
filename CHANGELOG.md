# CHANGELOG - MVP GRADE

Todas as mudanças importantes do projeto estão documentadas aqui.

---

## [RESTAURAÇÃO] - 2026-01-21 (NOITE)

### 🚨 PROBLEMA CRÍTICO IDENTIFICADO

**GitPages quebrado após refatoração Batch 2 (sistema de design)**

#### Causa Raiz:
- Claude (IA) sugeriu criar "sistema de design profissional"
- Instruiu Cursor a criar `system.css` e `components.css`
- CSS conflicts com `base.css` (necessário usar `!important`)
- Paleta profissional original foi destruída
- Preto carvão (#2C2C2C) substituiu navy elegante (#0B1320)

#### Impacto:
- ❌ Visual "doía aos olhos" (preto + branco muito agressivo)
- ❌ UTF-8 encoding inconsistente
- ❌ Layout quebrado em múltiplos slides
- ❌ PDF com regressão visual

### ✅ SOLUÇÃO APLICADA

#### Commit 1: `2d4f9ae` - Restaurar Batch 1
```
- Restaurou: S02, S04-S10 para versão Batch 1 limpa (aa28dfc)
- Deletou: system.css e components.css (causaram conflitos)
- Status: Batch 1 funcionando, S03 ainda ruim
```

#### Commit 2: `37b6bf0` - Restaurar S03 estrutura
```
- Restaurou: S03 para versão original modularizada (822b27d)
- Problema: S03 ainda tinha paleta ruim (preto #2C2C2C)
- Status: Estrutura OK, cores ruins
```

#### Commit 3: `27f648f` - Corrigir paleta S03
```
- Substituiu: background #2C2C2C → #0B1320 (navy)
- Substituiu: color #2C2C2C → #1A1A1A (texto mais suave)
- Status: S03 com paleta melhor, mas outros slides ainda ruins
```

#### Commit 4: `a19eb86` - **RESTAURAR PALETA PROFISSIONAL** ⭐
```
- Restaurou: base.css do commit 79e1cb5
- Paleta profissional original:
  --navy: #0B1320    (Navy escuro elegante)
  --gold: #DDB944    (Dourado para destaques)
  --teal: #1F766E    (Verde-azulado clínico)
  --bg: #F9F8F4      (Off-white suave)

- Status: TODOS os slides com paleta profissional restaurada
```

### 📊 ESTADO FINAL

**Arquivos corrigidos:**
- ✅ `GRADE/src/css/base.css` → Paleta profissional (79e1cb5)
- ✅ `GRADE/src/slides/S02-S10.html` → Batch 1 limpo (aa28dfc)
- ❌ `GRADE/src/css/system.css` → DELETADO (causou conflitos)
- ❌ `GRADE/src/css/components.css` → DELETADO (desnecessário)

**Slides validados:**
```
S02: ✅ Batch 1 limpo
S03: ✅ Estrutura original + paleta corrigida
S04: ✅ Batch 1 limpo
S05: ✅ Batch 1 limpo
S06: ✅ Batch 1 limpo
S07: ✅ Batch 1 limpo
S08: ✅ Batch 1 limpo
S09: ✅ Batch 1 limpo
S10: ✅ Batch 1 limpo
```

### 🎓 LIÇÕES APRENDIDAS

#### ❌ O QUE DEU ERRADO:
1. **Claude sugeriu mudanças desnecessárias no CSS**
   - Paleta estava profissionalíssima
   - Não havia necessidade de "sistema de design"
   
2. **Criação de arquivos CSS extras causou conflitos**
   - `system.css` e `components.css` interferiram com `base.css`
   - Necessário usar `!important` (anti-pattern)

3. **Mudanças globais sem teste incremental**
   - Refatorou 8 slides de uma vez
   - Quebrou tudo antes de perceber o problema

#### ✅ REGRAS PARA O FUTURO:

1. **NÃO mexer em `base.css` sem FORTE justificativa**
   - A paleta original é profissional
   - Se precisar ajustar, testar em 1 slide primeiro

2. **NÃO criar arquivos CSS extras**
   - `base.css` + `blocks.css` são suficientes
   - Novos CSS causam conflitos e especificidade problems

3. **Testar mudanças incrementalmente**
   - 1 slide por vez
   - Validar no viewer antes de próximo
   - Commit pequeno e frequente

4. **Questionar sugestões de IA**
   - Claude pode errar (como errou aqui)
   - Validar antes de executar
   - Se algo funciona bem, não mexer

5. **Documentar estado bom (golden commits)**
   - `79e1cb5` = base.css com paleta profissional ⭐
   - `aa28dfc` = Batch 1 limpo e funcionando ⭐
   - `822b27d` = S03 estrutura original ⭐

---

## [BATCH 1] - 2026-01-21 (MANHÃ)

### ✅ Simplificação para auditoria P0

**Slides refatorados:** S02, S03, S05, S06  
**Objetivo:** Remover complexidade desnecessária  
**Resultado:** 4 slides aprovados e funcionando

#### Mudanças:
- Remove quote Guy Bourdin (S02)
- Simplifica layout (S02-S06)
- Ajusta espaçamentos para 16:9
- PDF exportando corretamente

**Commit principal:** `aa28dfc` - "docs: reforcar regra CHANGELOG" ⭐

---

## [BATCH 0] - 2026-01-19/20

### Modularização inicial
- Separou monolito em 42 slides individuais
- Setup inicial de navegação
- Criou base.css e blocks.css

**Commit principal:** `822b27d` - "feat: modularizar GRADE/src/index.html" ⭐

---

## 📌 GOLDEN COMMITS (Sempre seguros para restaurar)

| Commit | Data | Descrição | Uso |
|--------|------|-----------|-----|
| `79e1cb5` | 21/01 | base.css com paleta profissional | Restaurar CSS global |
| `aa28dfc` | 21/01 | Batch 1 limpo e funcionando | Restaurar S02, S04-S10 |
| `822b27d` | 19/01 | Modularização original | Restaurar estrutura S03 |

---

## 🔄 PROCESSO DE RESTAURAÇÃO (Se quebrar de novo)

### Passo 1: Identificar o problema
```bash
# Comparar com último commit bom
git diff <commit_bom> <commit_atual> -- GRADE/src/css/
git diff <commit_bom> <commit_atual> -- GRADE/src/slides/
```

### Passo 2: Restaurar arquivos específicos
```bash
# Restaurar CSS
git checkout 79e1cb5 -- GRADE/src/css/base.css

# Restaurar slides específicos
git checkout aa28dfc -- GRADE/src/slides/S02.html
git checkout aa28dfc -- GRADE/src/slides/S04.html
# ... etc
```

### Passo 3: Commit e teste
```bash
git add GRADE/src/
git commit -m "revert: restaurar [arquivo] para versão boa [commit]"
git push
```

### Passo 4: Aguardar GitHub Pages (2-3min)
```bash
# Testar no viewer
open https://lucasmiachon-blip.github.io/aulas_core/GRADE/dist/
```

---

## 📝 TEMPLATE DE COMMIT

### Para correções:
```
fix(escopo): descrição curta do problema

- problema: [o que estava errado]
- solução: [o que foi feito]
- impacto: [o que melhora]

Refs: #issue (se houver)
```

### Para restaurações:
```
revert: restaurar [arquivo] para versão [commit]

PROBLEMA:
- [descrição do que quebrou]

SOLUÇÃO:
- Restaurar [arquivo] do commit [sha]
- Motivo: [por que esse commit é bom]
```

---

**Última atualização:** 21/01/2026 23:30  
**Status do projeto:** ✅ Restaurado e funcional  
**Próximo passo:** Aguardar validação visual no viewer
