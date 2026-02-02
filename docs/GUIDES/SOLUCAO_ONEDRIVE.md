# Solução: Arquivos não aparecem no Cursor (OneDrive)

## Problema
O OneDrive está sincronizando os arquivos e alguns podem estar apenas na nuvem (online-only), fazendo com que o Cursor não consiga vê-los.

## Soluções

### Opção 1: Tornar arquivos sempre disponíveis offline (RECOMENDADO)

1. Abra o **Explorador de Arquivos** do Windows
2. Navegue até: `C:\Users\prece\OneDrive\Documentos\AssistantStack\OneDrive\LM\Documentos\Dev\Projetos\Aulas`
3. Clique com o botão direito na pasta `Aulas`
4. Selecione **"Sempre manter neste dispositivo"** ou **"Always keep on this device"**
5. Aguarde a sincronização completa (ícone do OneDrive na bandeja do sistema)

### Opção 2: Aguardar sincronização completa

1. Verifique o ícone do OneDrive na bandeja do sistema (canto inferior direito)
2. Clique nele e verifique se há arquivos pendentes de sincronização
3. Aguarde até que todos os arquivos estejam sincronizados (ícone verde)
4. Depois, recarregue o Cursor: `Ctrl+Shift+P` → "Developer: Reload Window"

### Opção 3: Mover projeto para fora do OneDrive (MELHOR SOLUÇÃO A LONGO PRAZO)

1. Mova o projeto para um local fora do OneDrive, por exemplo:
   - `C:\Dev\Projetos\Aulas`
   - `D:\Projetos\Aulas`
2. Abra o novo local no Cursor
3. Isso evita problemas de sincronização

### Opção 4: Verificar status de sincronização

No PowerShell, execute:
```powershell
# Verificar se há arquivos apenas online
Get-ChildItem -Path "C:\Users\prece\OneDrive\Documentos\AssistantStack\OneDrive\LM\Documentos\Dev\Projetos\Aulas" -Recurse -File | Where-Object { $_.Attributes -match "ReparsePoint" } | Measure-Object
```

## Após resolver

1. Recarregue o Cursor: `Ctrl+Shift+P` → "Developer: Reload Window"
2. Ou feche e abra o Cursor novamente
3. Os arquivos devem aparecer no explorador

## Nota sobre o caminho

O caminho atual tem "OneDrive" duplicado:
- `OneDrive\Documentos\AssistantStack\OneDrive\...`

Isso pode causar problemas. Considere reorganizar a estrutura de pastas.
