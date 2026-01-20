# 🔐 GitHub Token - Documentação

## 📍 Localização

O token do GitHub está armazenado em:
- **Arquivo:** `config/github-token.txt`
- **Status:** Não rastreado pelo Git (está no `.gitignore`)
- **Acesso:** Disponível para Auto (Cursor AI) quando necessário

## 🔑 Token

O token está disponível para uso em:
- GitHub Actions workflows
- Scripts de autenticação Git
- Operações que requerem autenticação GitHub

## ⚠️ Segurança

- ✅ Arquivo `.env.local` está no `.gitignore`
- ✅ NÃO será commitado no repositório
- ✅ Apenas disponível localmente
- ⚠️ **NUNCA** commitar o token diretamente no código

## 📝 Como Usar

### Em Scripts Node.js:
```javascript
require('dotenv').config({ path: '.env.local' });
const token = process.env.GITHUB_TOKEN;
```

### Em GitHub Actions:
O token deve ser configurado como Secret no repositório GitHub:
1. Settings → Secrets and variables → Actions
2. New repository secret
3. Nome: `GITHUB_TOKEN`
4. Valor: (token)

### Em Comandos Git:
```bash
git config --local credential.helper store
echo "https://USERNAME:${GITHUB_TOKEN}@github.com" > ~/.git-credentials
```

## 🔄 Atualização

Se o token precisar ser atualizado:
1. Editar `.env.local`
2. Atualizar secret no GitHub (se necessário)
3. Não commitar mudanças

## 📌 Nota para Auto (Cursor AI)

Este arquivo está disponível para leitura quando necessário para:
- Autenticação em operações Git
- Configuração de workflows
- Scripts de automação

**Última atualização:** 2026-01-19
