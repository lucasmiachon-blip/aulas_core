# 💻 Trabalho em 2 Computadores com OneDrive

## 🎯 Configuração Inicial (Fazer em AMBOS os computadores)

### 1. Tornar arquivos sempre disponíveis offline

**IMPORTANTE:** Faça isso em **AMBOS** os computadores!

1. Abra o **Explorador de Arquivos** do Windows
2. Navegue até: `C:\Users\prece\OneDrive\Documentos\AssistantStack\OneDrive\LM\Documentos\Dev\Projetos\Aulas`
3. Clique com o botão direito na pasta `Aulas`
4. Selecione **"Sempre manter neste dispositivo"** ou **"Always keep on this device"**
5. Aguarde a sincronização completa (ícone do OneDrive na bandeja do sistema fica verde)

### 2. Configurar Cursor em ambos os computadores

1. Abra o Cursor no computador atual
2. Abra o arquivo `aulas.code-workspace` (duplo clique)
3. Aguarde o Cursor carregar todos os arquivos
4. Repita no segundo computador

### 3. Sincronizar configurações do Cursor (opcional)

Se quiser que as configurações do Cursor sejam sincronizadas entre os computadores:

1. No Cursor: `Ctrl+Shift+P` → "Preferences: Open Settings (UI)"
2. Ative a sincronização de configurações (Settings Sync)
3. Isso sincronizará extensões, configurações, etc.

## 🔄 Workflow de Trabalho

### Ao começar a trabalhar em um computador:

1. **Verificar sincronização do OneDrive**
   - Clique no ícone do OneDrive na bandeja do sistema
   - Verifique se está sincronizado (ícone verde)
   - Se houver arquivos pendentes, aguarde sincronizar

2. **Abrir o Cursor**
   - Abra o arquivo `aulas.code-workspace`
   - Aguarde o Cursor carregar todos os arquivos
   - Se os arquivos não aparecerem, recarregue: `Ctrl+Shift+P` → "Developer: Reload Window"

3. **Verificar status do Git**
   - Abra o terminal no Cursor: `` Ctrl+` ``
   - Execute: `git status`
   - Verifique se há mudanças não commitadas

### Ao terminar de trabalhar em um computador:

1. **Salvar tudo**
   - `Ctrl+S` em todos os arquivos abertos
   - Ou `Ctrl+K S` para salvar tudo

2. **Fazer commit (se necessário)**
   - Commit apenas quando terminar uma tarefa completa
   - Use mensagens descritivas

3. **Aguardar sincronização do OneDrive**
   - Verifique o ícone do OneDrive
   - Aguarde até sincronizar completamente antes de fechar

4. **Fechar o Cursor normalmente**
   - O OneDrive continuará sincronizando em segundo plano

### Ao mudar para o outro computador:

1. **Aguardar sincronização completa**
   - Verifique o ícone do OneDrive (deve estar verde)
   - Aguarde alguns minutos após a última mudança no outro computador

2. **Abrir o Cursor**
   - Abra `aulas.code-workspace`
   - Recarregue se necessário: `Ctrl+Shift+P` → "Developer: Reload Window"

3. **Verificar mudanças**
   - `git status` para ver se há mudanças do outro computador
   - `git pull` se necessário (mas geralmente o OneDrive já sincronizou)

## ⚠️ Problemas Comuns e Soluções

### Arquivos não aparecem no Cursor

**Solução:**
1. Verifique se o OneDrive sincronizou completamente
2. Recarregue o Cursor: `Ctrl+Shift+P` → "Developer: Reload Window"
3. Se ainda não aparecer, feche e abra o Cursor novamente
4. Verifique se a pasta está marcada como "Sempre manter neste dispositivo"

### Conflitos de sincronização

**Solução:**
1. O OneDrive cria arquivos `.cloud` quando há conflitos
2. Verifique se há arquivos com extensão `.cloud`
3. Resolva manualmente ou use a versão mais recente
4. Os arquivos `.cloud` estão no `.gitignore` (não serão commitados)

### Arquivos aparecem como "online-only"

**Solução:**
1. Clique com botão direito na pasta `Aulas`
2. Selecione "Sempre manter neste dispositivo"
3. Aguarde a sincronização completa

### Cursor não reconhece mudanças do outro computador

**Solução:**
1. Recarregue o Cursor: `Ctrl+Shift+P` → "Developer: Reload Window"
2. Ou feche e abra o Cursor novamente
3. Verifique se o OneDrive sincronizou completamente

## 📋 Checklist Rápido

### Ao iniciar trabalho:
- [ ] OneDrive sincronizado (ícone verde)
- [ ] Cursor aberto com `aulas.code-workspace`
- [ ] Arquivos visíveis no explorador
- [ ] `git status` verificado

### Ao terminar trabalho:
- [ ] Todos os arquivos salvos
- [ ] Commits feitos (se necessário)
- [ ] OneDrive sincronizando
- [ ] Cursor fechado normalmente

### Ao mudar de computador:
- [ ] Aguardou sincronização completa
- [ ] Cursor recarregado
- [ ] Arquivos visíveis
- [ ] Mudanças do outro computador verificadas

## 🔧 Configurações Recomendadas

### OneDrive:
- ✅ "Sempre manter neste dispositivo" para a pasta `Aulas`
- ✅ Sincronização automática ativada
- ✅ Notificações de sincronização ativadas

### Cursor:
- ✅ Workspace: `aulas.code-workspace`
- ✅ Auto-save ativado
- ✅ Settings Sync (opcional, para sincronizar configurações)

## 📝 Notas Importantes

1. **Nunca trabalhe simultaneamente nos 2 computadores** - sempre termine em um antes de começar no outro
2. **Sempre aguarde sincronização** antes de mudar de computador
3. **Commits frequentes** ajudam a manter histórico mesmo se houver problemas de sincronização
4. **Git é o backup principal** - OneDrive é para conveniência, Git é para versionamento

## 🆘 Se algo der errado

1. Verifique o status do Git: `git status`
2. Verifique o status do OneDrive (ícone na bandeja)
3. Recarregue o Cursor
4. Se persistir, feche e abra o Cursor novamente
5. Como último recurso, reinicie o computador

---

**Última atualização:** 2026-01-19
