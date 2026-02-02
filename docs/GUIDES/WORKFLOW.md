# 🔄 Workflow

**Última atualização:** 2026-02-02

---

## Git

### Branch Strategy
- Trabalhar apenas em `main`
- Commits pequenos e frequentes
- **Checkpoint antes de mudanças grandes** (HC6)

### Convenção de Commits

```
add:      novo feature/arquivo
fix:      correção de bug
update:   melhoria em algo existente
refactor: mudança sem alterar comportamento
docs:     só documentação
style:    formatação de código
chore:    manutenção/estrutura
```

### Exemplo

```bash
git add -A
git commit -m "add: slide 73 sobre tratamento"
```

---

## Antes de Commitar

### Checklist (HC1, HC10)

```
□ CHANGELOG.md atualizado?
□ Testei no viewer?
□ Testei print mode?
□ npm run lint sem erros?
```

### Comandos

```bash
# Ver status
git status

# Ver o que mudou
git diff

# Commitar
git add -A
git commit -m "tipo: descrição curta"

# Ver histórico
git log --oneline -5
```

---

## Ferramentas de Qualidade

### ESLint

```bash
npm run lint        # Ver problemas
npm run lint:fix    # Corrigir automaticamente (CUIDADO)
```

### Prettier

- **Format on Save** está ativado
- Ou: `Shift+Alt+F` para formatar manualmente

---

## Export PDF

```bash
# OSTEOPOROSE
npm run export:osteoporose

# GRADE
npm run export:grade
```

**Requer servidor rodando** em `http://127.0.0.1:5500`

---

## Servidor Local

```bash
# Opção 1: npm
npm run serve

# Opção 2: Python
python -m http.server 5500

# Opção 3: PowerShell
.\INICIAR-SERVIDOR.ps1
```

**URLs:**
- OSTEOPOROSE: http://127.0.0.1:5500/OSTEOPOROSE/src/index.html
- GRADE: http://127.0.0.1:5500/GRADE/src/index.html

---

## Reverter Mudanças

```bash
# Reverter arquivo específico
git checkout -- caminho/arquivo.html

# Reverter TUDO (não commitado)
git checkout -- .

# Ver último commit que funcionava
git log --oneline -5

# Voltar para commit específico
git checkout <hash> -- caminho/arquivo
```

---

*Referência: `../../HARD_CONSTRAINTS.md` (HC6, HC10)*
