# ✅ Setup Parcialmente Concluído

## ✅ O que já foi feito:

1. ✅ Pasta `C:\Dev` criada
2. ✅ Repositório clonado em `C:\Dev\aulas_core`

## ⚠️ Próximos Passos Necessários:

### 1. Instalar Node.js

**Node.js não está instalado no sistema!**

1. Acesse: https://nodejs.org/
2. Baixe a versão **LTS** (Long Term Support)
3. Execute o instalador
4. **Reinicie o terminal/PowerShell** após instalar

### 2. Verificar instalação

Após instalar Node.js, abra um **novo** PowerShell e execute:

```powershell
node --version
npm --version
```

Se aparecerem números de versão, está instalado corretamente!

### 3. Instalar dependências do projeto

```powershell
# Ir para o projeto
cd C:\Dev\aulas_core\scripts

# Instalar dependências
npm install

# Instalar Playwright (navegador para gerar PDF)
npx playwright install chromium
```

### 4. Pronto para trabalhar!

```powershell
# Abrir projeto no Cursor
# File → Open Folder → C:\Dev\aulas_core
```

---

## 📝 Resumo

- ✅ **Repositório clonado:** `C:\Dev\aulas_core`
- ❌ **Node.js:** Precisa instalar (https://nodejs.org/)
- ⏳ **Dependências:** Aguardando instalação do Node.js

---

## 🆘 Problemas?

### "node não reconhecido"
- Instale Node.js: https://nodejs.org/
- **Reinicie o terminal** após instalar
- Verifique se o Node.js foi adicionado ao PATH

### "npm não reconhecido"
- npm vem junto com Node.js
- Se instalou Node.js mas npm não funciona, reinstale Node.js

### "Erro ao clonar"
- Verifique sua conexão com internet
- Verifique se tem acesso ao repositório GitHub

---

**Última atualização:** 2026-01-20
