# 🔍 PROCESSO DE AUDITORIA - AUTO (Cursor AI)

**Para:** Auto (Cursor AI)  
**Objetivo:** Manter organização e qualidade antes de commitar mudanças  
**Status:** ✅ OBRIGATÓRIO antes de cada commit

---

## ⚠️ REGRA DE OURO

**NUNCA commite mudanças sem auditar primeiro!**

Todas as mudanças devem passar por este checklist antes de `git commit`.

---

## 📋 CHECKLIST DE AUDITORIA OBRIGATÓRIA

### 1. ✅ ESTRUTURA E ORGANIZAÇÃO

- [ ] **Caminhos corretos?**
  - Arquivos estão nos lugares certos?
  - Não há arquivos perdidos ou duplicados?
  - Diretórios vazios foram removidos?

- [ ] **Referências quebradas?**
  - Todos os `href=` e `src=` apontam para arquivos existentes?
  - CSS/JS importados estão corretos?
  - Imagens e assets existem?

- [ ] **Case sensitivity?**
  - URLs usam `grade/` (minúsculo) e não `GRADE/`?
  - Caminhos são consistentes?

---

### 2. 🎨 PALETA E ESTILO

- [ ] **Cores hardcoded?**
  ```bash
  # Executar e verificar se retorna VAZIO
  grep -o '#[0-9A-Fa-f]\{6\}' GRADE/src/index.html
  ```
  - Se retornar algo: ❌ **BLOQUEAR COMMIT**
  - Se vazio: ✅ OK

- [ ] **Uso de `var(--nome)`?**
  - Todas as cores usam `var(--navy)`, `var(--gold)`, etc?
  - Nenhum `#333`, `#666`, `#000` hardcoded?

- [ ] **Tipografia correta?**
  - Títulos: Georgia (serif)
  - Corpo: Lato (sans-serif)

- [ ] **Classes do blocks.css?**
  - Tabelas usam `table-small`, `table-medium`, etc?
  - Callouts usam `callout` ou variantes?
  - Badges usam `badge` ou variantes?
  - CSS inline mínimo (apenas quando necessário)?

---

### 3. 📁 ARQUIVOS E ESTRUTURA

- [ ] **Arquivos não utilizados?**
  - Não há arquivos órfãos?
  - Diretórios vazios foram removidos?
  - Snapshots antigos estão em `archive/`?

- [ ] **Sincronização src/ → dist/?**
  - Se mudou `GRADE/src/index.html`, executou `npm run sync-grade`?
  - `GRADE/dist/index.html` está atualizado?

- [ ] **Git ignore correto?**
  - `GRADE/dist/index.html` está sendo rastreado?
  - Arquivos temporários não estão sendo commitados?

---

### 4. 🔧 QUALIDADE TÉCNICA

- [ ] **Acessibilidade?**
  - Contraste WCAG AA (≥ 4.5:1)?
  - Textos alternativos em imagens?
  - Estrutura semântica correta?

- [ ] **Performance?**
  - Imagens otimizadas?
  - CSS/JS não duplicados?
  - Sem recursos desnecessários?

- [ ] **Compatibilidade?**
  - HTML válido?
  - CSS sem erros?
  - JavaScript funcional?

---

### 5. 📝 DOCUMENTAÇÃO

- [ ] **CHANGELOG atualizado?**
  - `docs/CHANGELOG.md` foi atualizado?
  - Descrição clara do que mudou?

- [ ] **Documentação necessária?**
  - Mudanças complexas foram documentadas?
  - Guias atualizados se necessário?

---

### 6. 🚫 REGRAS RÍGIDAS

- [ ] **OSTEOPOROSE bloqueado?**
  - Nenhuma mudança em `OSTEOPOROSE/`?

- [ ] **Sem tokens/senhas?**
  - Nenhum token, API key, ou senha no código?

- [ ] **Sem dados inventados?**
  - Números, citações, dados são reais?
  - Se faltar, usa `[TBD]`?

- [ ] **Branch correto?**
  - Trabalhando em `main`?
  - Sem branches desnecessários?

---

## 🔄 PROCESSO COMPLETO

### ANTES DE COMMITAR:

1. **Executar validações:**
   ```bash
   # Verificar cores hardcoded
   grep -o '#[0-9A-Fa-f]\{6\}' GRADE/src/index.html
   
   # Verificar estrutura
   git status
   git diff
   
   # Sincronizar se necessário
   cd scripts && npm run sync-grade
   ```

2. **Revisar checklist acima**
   - Marcar cada item
   - Se algum item falhar: **NÃO COMMITAR**
   - Corrigir problemas primeiro

3. **Se tudo OK:**
   - Fazer commit com mensagem clara
   - Atualizar CHANGELOG
   - Push para GitHub

---

## 🚨 BLOQUEIOS AUTOMÁTICOS

**NÃO COMMITAR se:**
- ❌ Cores hardcoded encontradas (`#XXXXXX`)
- ❌ Referências quebradas
- ❌ Arquivos em `OSTEOPOROSE/` modificados
- ❌ Tokens/senhas no código
- ❌ CHANGELOG não atualizado
- ❌ `src/` mudou mas `dist/` não foi sincronizado

---

## 📊 RELATÓRIO DE AUDITORIA

Após cada auditoria, documentar:

```markdown
## Auditoria - [DATA]

### Mudanças revisadas:
- [Lista de arquivos modificados]

### Problemas encontrados:
- [Lista de problemas]

### Ações tomadas:
- [O que foi corrigido]

### Status:
- ✅ APROVADO para commit
- ❌ BLOQUEADO - precisa correção
```

---

## 💬 COMUNICAÇÃO COM USUÁRIO

**Se encontrar problemas:**

1. **Listar problemas encontrados**
2. **Explicar impacto**
3. **Sugerir correções**
4. **Aguardar aprovação antes de corrigir**

**Exemplo:**
```
🔍 AUDITORIA: Encontrei 3 problemas:

1. ❌ Cores hardcoded (#666) na linha 3200
2. ⚠️ Tabela sem classe do blocks.css (linha 1812)
3. ✅ Resto está OK

Posso corrigir agora ou prefere revisar primeiro?
```

---

## 📚 REFERÊNCIAS

- **Paleta oficial:** `docs/PROMPT_PALETA_OFICIAL.md`
- **Guia blocks.css:** `docs/GUIA_BLOCKS_CSS.md`
- **Regras rígidas:** `docs/AI_RULES.md`
- **Qualidade técnica:** `docs/TECHNICAL_QUALITY.md`

---

**Última atualização:** Janeiro 2026  
**Status:** ✅ OBRIGATÓRIO antes de cada commit
