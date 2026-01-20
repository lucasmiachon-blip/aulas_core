# 🔧 Node.js não está sendo reconhecido

## ✅ Node.js foi instalado, mas o PowerShell não reconhece

Isso acontece porque o PowerShell precisa ser **reiniciado** para reconhecer o Node.js.

## 🚀 Solução Rápida

### Opção 1: Reiniciar o PowerShell (RECOMENDADO)

1. **Feche o Cursor completamente**
2. **Abra o Cursor novamente**
3. **Abra um novo terminal** no Cursor (`Ctrl+``)
4. Execute: `node --version`

Se aparecer algo como `v20.11.0`, está funcionando! ✅

### Opção 2: Atualizar PATH no PowerShell atual

Execute no PowerShell:

```powershell
# Adicionar Node.js ao PATH da sessão atual
$env:PATH += ";C:\Program Files\nodejs"
node --version
```

**Nota:** Isso só funciona na sessão atual. Para permanente, reinicie o PowerShell.

### Opção 3: Verificar instalação

Se o Node.js foi instalado, ele deve estar em um destes locais:

- `C:\Program Files\nodejs\`
- `C:\Program Files (x86)\nodejs\`
- `%LOCALAPPDATA%\Programs\nodejs\`

## ✅ Depois que funcionar

Quando `node --version` funcionar, avise e eu continuo com:

1. Instalar dependências (`npm install`)
2. Instalar Playwright (`npx playwright install chromium`)
3. Testar o setup completo

## 🆘 Ainda não funciona?

### Verificar se Node.js está instalado:

1. Abra o **Explorador de Arquivos**
2. Navegue até: `C:\Program Files\nodejs\`
3. Se a pasta existir, o Node.js está instalado
4. O problema é apenas o PATH não atualizado

### Reinstalar Node.js:

1. Desinstale o Node.js atual (Painel de Controle → Programas)
2. Baixe novamente: https://nodejs.org/
3. **Durante a instalação**, certifique-se de marcar:
   - ✅ "Add to PATH" (adicionar ao PATH)
4. Reinicie o computador (para garantir)

---

**Última atualização:** 2026-01-20
