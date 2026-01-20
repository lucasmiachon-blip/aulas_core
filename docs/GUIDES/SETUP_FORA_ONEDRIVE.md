# 🚀 Setup do Projeto Fora do OneDrive

## 🎯 Objetivo
Trabalhar com o projeto em uma pasta simples (`C:\Dev`) sem problemas de sincronização do OneDrive.

---

## 📋 Passo a Passo Completo

### 1️⃣ Criar pasta de desenvolvimento

```powershell
# Criar pasta se não existir
if (-not (Test-Path "C:\Dev")) {
    New-Item -ItemType Directory -Path "C:\Dev"
    Write-Host "✅ Pasta C:\Dev criada" -ForegroundColor Green
} else {
    Write-Host "✅ Pasta C:\Dev já existe" -ForegroundColor Green
}

# Entrar na pasta
cd C:\Dev
```

### 2️⃣ Clonar repositório

```powershell
# Clonar repositório
git clone https://github.com/lucasmiachon-blip/aulas_core.git

# Entrar no projeto
cd aulas_core
```

### 3️⃣ Instalar dependências

```powershell
# Ir para pasta GRADE
cd GRADE

# Instalar dependências do projeto
npm install

# Instalar navegador do Playwright (para gerar PDF)
npx playwright install chromium
```

### 4️⃣ Verificar instalação

```powershell
# Verificar Node.js
node --version

# Verificar npm
npm --version

# Verificar Git
git --version
```

---

## 🔧 Scripts Disponíveis

### Gerar PDF dos slides

```powershell
cd C:\Dev\aulas_core\GRADE
node ..\scripts\export-grade-pdf.js
```

**Output:** `GRADE/exports/GRADE-slides.pdf`

### Sincronizar dist com src

```powershell
cd C:\Dev\aulas_core
node scripts\sync-grade-dist.js
```

### Validar slides

```powershell
cd C:\Dev\aulas_core
node scripts\validate-slides.js
```

---

## 📁 Estrutura do Projeto

```
C:\Dev\aulas_core\
├── GRADE\
│   ├── src\          # Código fonte (slides individuais)
│   ├── dist\          # HTML compilado (para GitHub Pages)
│   └── exports\       # PDFs gerados
├── scripts\           # Scripts de build e export
└── docs\              # Documentação
```

---

## 🎨 Workflow de Trabalho

### Ao começar a trabalhar:

```powershell
# 1. Ir para o projeto
cd C:\Dev\aulas_core

# 2. Verificar status
git status

# 3. Atualizar do GitHub (se necessário)
git pull origin main
```

### Ao terminar de trabalhar:

```powershell
# 1. Verificar mudanças
git status

# 2. Adicionar arquivos
git add .

# 3. Fazer commit
git commit -m "descrição das mudanças"

# 4. Enviar para GitHub
git push origin main
```

---

## 🔄 Sincronização com OneDrive (Opcional)

Se você quiser manter uma cópia no OneDrive também:

```powershell
# Criar link simbólico (opcional)
# Isso mantém o projeto em C:\Dev mas acessível via OneDrive
New-Item -ItemType SymbolicLink -Path "C:\Users\prece\OneDrive\...\aulas_core" -Target "C:\Dev\aulas_core"
```

**⚠️ Não recomendado:** Pode causar problemas de sincronização.

---

## ✅ Vantagens de Trabalhar em C:\Dev

- ✅ **Sem problemas de sincronização** do OneDrive
- ✅ **Arquivos sempre disponíveis** offline
- ✅ **Performance melhor** (sem overhead do OneDrive)
- ✅ **Cursor/VS Code funciona perfeitamente**
- ✅ **Git funciona normalmente**

---

## 🆘 Problemas Comuns

### "npm não reconhecido"
- Instale Node.js: https://nodejs.org/
- Reinicie o terminal após instalar

### "git não reconhecido"
- Instale Git: https://git-scm.com/
- Reinicie o terminal após instalar

### "Erro ao clonar"
- Verifique sua conexão com internet
- Verifique se tem acesso ao repositório GitHub

### "Playwright não instala"
- Execute: `npx playwright install chromium --force`
- Verifique sua conexão (baixa ~150MB)

---

## 📝 Próximos Passos

Após o setup inicial:

1. ✅ Abrir projeto no Cursor: `File` → `Open Folder` → `C:\Dev\aulas_core`
2. ✅ Editar slides em `GRADE/src/slides/`
3. ✅ Gerar PDF quando necessário
4. ✅ Fazer commit e push das mudanças

---

**Última atualização:** 2026-01-20
