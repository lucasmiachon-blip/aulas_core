# ISSUES & PROBLEMAS CONHECIDOS

Documentação de problemas encontrados e soluções aplicadas.

---

## 🚨 [CRÍTICO] CSS Global Quebrado (21/01/2026) - **RESOLVIDO**

### Descrição do Problema

**O que aconteceu:**
- Claude (IA) sugeriu criar "sistema de design profissional"
- Cursor criou `system.css` e `components.css`
- Paleta profissional original foi destruída
- Preto carvão (#2C2C2C) substituiu navy elegante (#0B1320)
- Visual ficou agressivo: "doía aos olhos"

**Impacto:**
- ❌ GitPages quebrado
- ❌ Paleta visual ruim
- ❌ UTF-8 encoding issues
- ❌ Layout problems
- ❌ PDF regression

### Causa Raiz

1. **Sugestão inadequada de IA**
   - Claude recomendou mudanças desnecessárias
   - Paleta já estava profissional

2. **CSS conflicts**
   - `system.css` conflitou com `base.css`
   - Necessário usar `!important` (anti-pattern)

3. **Falta de teste incremental**
   - Refatorou 8 slides de uma vez
   - Não validou antes de continuar

### Solução Aplicada

**Commits de correção:**
1. `2d4f9ae` - Restaurou Batch 1 + deletou CSS problemático
2. `37b6bf0` - Restaurou estrutura do S03
3. `27f648f` - Corrigiu paleta do S03
4. `a19eb86` - **Restaurou base.css com paleta profissional** ⭐

**Arquivos restaurados:**
- ✅ `base.css` → commit 79e1cb5 (paleta profissional)
- ✅ `S02-S10` → commit aa28dfc (Batch 1 limpo)
- ❌ `system.css` → DELETADO
- ❌ `components.css` → DELETADO

### Como Evitar no Futuro

#### REGRA #1: NÃO mexer em CSS global sem forte justificativa
```
❌ NUNCA fazer:
- Criar novos arquivos CSS sem necessidade
- Mudar paleta de cores "porque ficaria melhor"
- Refatorar CSS sem testar antes

✅ SEMPRE fazer:
- Questionar: "É realmente necessário?"
- Testar em 1 slide antes de aplicar globalmente
- Usar commits pequenos e frequentes
- Validar no viewer ANTES de continuar
```

#### REGRA #2: Questionar sugestões de IA
```
❌ NUNCA aceitar cegamente:
- "Vamos criar um sistema de design"
- "Vamos normalizar a paleta"
- "Vamos adicionar mais arquivos CSS"

✅ SEMPRE perguntar:
- "Por que preciso disso?"
- "O que melhora especificamente?"
- "Qual o risco de quebrar?"
- "Posso testar em escopo pequeno primeiro?"
```

#### REGRA #3: Documentar estados bons (golden commits)
```
✅ Golden commits identificados:
- 79e1cb5: base.css com paleta profissional
- aa28dfc: Batch 1 limpo e funcionando
- 822b27d: S03 estrutura original

Se algo quebrar: voltar para esses commits.
```

### Status
**Resolvido:** ✅  
**Data resolução:** 21/01/2026 23:30  
**Responsável:** Claude AI (causou) + Lucas (validou correção)

---

## ⚠️ [MENOR] S03 Layout Quebrado no Batch 1 - **RESOLVIDO**

### Descrição
S03 tinha layout quebrado na refatoração Batch 1.

### Solução
Restaurado para versão original (commit 822b27d) + ajuste manual de paleta.

### Status
**Resolvido:** ✅  
**Commit:** 37b6bf0 + 27f648f

---

## 📋 PROBLEMAS CONHECIDOS (Não críticos)

### 1. UTF-8 Encoding Ocasional
**Descrição:** Símbolos ⊕ às vezes aparecem como ⊙  
**Workaround:** Validar encoding ao editar  
**Prioridade:** Baixa  
**Status:** Monitorando

### 2. GitHub Pages Delay
**Descrição:** Rebuild leva 2-3 minutos  
**Workaround:** Aguardar antes de validar  
**Prioridade:** Informativa  
**Status:** Esperado (GitHub Pages limitation)

---

## 🔄 PROCESSO DE REPORTE DE ISSUES

### Quando reportar
- ❌ Visual quebrado no viewer
- ❌ PDF não exportando corretamente
- ❌ Navegação não funcionando
- ❌ Encoding corrupto
- ⚠️ Performance lenta

### Como reportar
1. **Screenshot** do problema
2. **Descrição clara:** O que esperava vs o que aconteceu
3. **Contexto:** Qual slide, qual ação causou
4. **Reprodução:** Como reproduzir o problema

### Template
```
## [Título do problema]

### Descrição
[O que está errado]

### Reprodução
1. Abrir [URL/arquivo]
2. Fazer [ação]
3. Observar [problema]

### Esperado
[O que deveria acontecer]

### Screenshots
[Se aplicável]

### Contexto
- Browser: [Chrome/Firefox/etc]
- Device: [Desktop/Mobile]
- Commit: [sha se conhecido]
```

---

## 🎯 PRIORIZAÇÃO DE ISSUES

### P0 (Crítico - Corrigir IMEDIATAMENTE)
- GitPages quebrado
- Navegação não funciona
- PDF não exporta
- Visual completamente quebrado

### P1 (Importante - Corrigir esta semana)
- Layout problems em 1-2 slides
- Paleta inconsistente
- Encoding issues

### P2 (Desejável - Corrigir quando possível)
- Melhorias visuais menores
- Otimizações de performance
- Refactoring não urgente

### P3 (Nice-to-have - Backlog)
- Features novas
- Ideias de melhoria
- Experimentações

---

## 📚 RECURSOS ÚTEIS

### Para debug
- **GitHub Pages status:** https://www.githubstatus.com/
- **Viewer:** https://lucasmiachon-blip.github.io/aulas_core/GRADE/dist/
- **Repo:** https://github.com/lucasmiachon-blip/aulas_core

### Para rollback
```bash
# Ver histórico de um arquivo
git log --follow GRADE/src/css/base.css

# Ver diff com commit bom
git diff 79e1cb5 HEAD -- GRADE/src/css/base.css

# Restaurar arquivo específico
git checkout 79e1cb5 -- GRADE/src/css/base.css
```

---

**Última atualização:** 21/01/2026 23:30  
**Issues abertas:** 0  
**Issues resolvidas:** 2
