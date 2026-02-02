# 🔄 WORKFLOW GIT - GUIA PRÁTICO
**Comandos passo-a-passo para trabalhar com Git**

---

## 📊 VER STATUS ATUAL
```powershell


@"
# 🔄 WORKFLOW GIT - GUIA PRÁTICO
**Comandos passo-a-passo para trabalhar com Git**

---

## 📊 VER STATUS ATUAL
```powershell
# Ver o que mudou
git status

# Ver últimos commits
git log --oneline -5
```

---

## ✅ SALVAR MUDANÇAS (COMMIT)

### Passo 1: Ver o que mudou
```powershell
git status
```

### Passo 2: Adicionar arquivos
```powershell
# Adicionar arquivo específico
git add ARQUIVO.md

# Adicionar vários arquivos
git add arquivo1.md arquivo2.html

# Adicionar TODOS os arquivos modificados (use com cuidado!)
git add .
```

### Passo 3: Commit com mensagem
```powershell
git commit -m "feat: adiciona nova funcionalidade"
# ou
git commit -m "fix: corrige bug da capa"
# ou
git commit -m "docs: atualiza documentação"
```

### Passo 4: Enviar para GitHub
```powershell
git push origin main
```

---

## 📝 PADRÃO DE MENSAGENS DE COMMIT
```
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação (sem mudança de código)
refactor: refatoração
test: testes
chore: tarefas gerais
```

**Exemplos:**
- `feat: adiciona slide S47 sobre estatinas`
- `fix: corrige cor invisível na capa`
- `docs: atualiza CHANGELOG com batch 2`
- `style: padroniza espaçamentos em S10-S15`

---

## 🔄 ATUALIZAR DO GITHUB (PULL)
```powershell
# Baixar mudanças do GitHub
git pull origin main
```

---

## 🧹 LIMPAR ARQUIVOS NÃO RASTREADOS

### Ver o que vai deletar (SEM deletar ainda)
```powershell
git clean -n -d
```

### Deletar arquivos não rastreados
```powershell
git clean -f -d
```

### Resetar arquivos modificados
```powershell
git reset --hard HEAD
```

---

## 🚨 SE DEU ERRADO

### Desfazer último commit (mantém mudanças)
```powershell
git reset --soft HEAD~1
```

### Desfazer último commit (PERDE mudanças!)
```powershell
git reset --hard HEAD~1
```

### Voltar arquivo específico
```powershell
git checkout -- ARQUIVO.md
```

---

## 📋 WORKFLOW COMPLETO (DIA-A-DIA)

### Ao começar o dia:
```powershell
# 1. Ver status
git status

# 2. Puxar mudanças do GitHub
git pull origin main
```

### Durante o trabalho:
```powershell
# 3. Fazer mudanças nos arquivos
# 4. Ver o que mudou
git status

# 5. Testar se funciona
# (abrir viewer, testar PDF, etc)
```

### Ao terminar:
```powershell
# 6. Adicionar arquivos
git add .

# 7. Commit
git commit -m "feat: descrição do que fez"

# 8. Enviar
git push origin main

# 9. Atualizar docs/CHANGELOG.md
# (sempre depois de commit!)
```

---

## 🎯 ATALHOS ÚTEIS
```powershell
# Status curto
git status -s

# Ver diferenças
git diff

# Ver diferenças de arquivo específico
git diff ARQUIVO.md

# Ver histórico bonito
git log --oneline --graph --decorate --all -10
```

---

## ⚠️ REGRAS DE OURO

1. **SEMPRE** teste antes de commitar
2. **SEMPRE** atualize CHANGELOG depois do commit
3. **NUNCA** commite senhas ou tokens
4. **NUNCA** use `git add .` sem ver `git status` antes
5. **SEMPRE** escreva mensagens claras de commit

---

## 🔍 CHECKLIST ANTES DE COMMIT

- [ ] Testei e funciona?
- [ ] Li `git status` e sei o que estou commitando?
- [ ] Mensagem de commit está clara?
- [ ] Não tem senhas/tokens?
- [ ] CHANGELOG será atualizado depois?

---

**Se tiver dúvida, pergunte ANTES de commitar!**
