# Script para forçar atualização do Cursor/VS Code
# Execute este script e depois recarregue o Cursor

Write-Host "=== FORÇAR ATUALIZAÇÃO DO CURSOR ===" -ForegroundColor Cyan
Write-Host ""

$caminho = "C:\Users\prece\OneDrive\Documentos\AssistantStack\OneDrive\LM\Documentos\Dev\Projetos\Aulas"

Write-Host "1. Verificando estrutura de pastas..." -ForegroundColor Yellow

$pastas = @(
    "docs\ESSENTIAL",
    "docs\GUIDES",
    "docs\HISTORY",
    "docs\PROCESS",
    "docs\SECURITY",
    "docs\archive"
)

foreach ($pasta in $pastas) {
    $caminhoCompleto = Join-Path $caminho $pasta
    if (Test-Path $caminhoCompleto) {
        $arquivos = (Get-ChildItem -Path $caminhoCompleto -File -ErrorAction SilentlyContinue).Count
        Write-Host "  ✓ $pasta - $arquivos arquivos" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $pasta - NÃO ENCONTRADO" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "2. Verificando arquivos principais..." -ForegroundColor Yellow

$arquivosPrincipais = @(
    "docs\ESSENTIAL\AI_RULES.md",
    "docs\ESSENTIAL\CLAUDE_ROLE.md",
    "docs\GUIDES\WORKFLOW.md",
    "docs\README.md"
)

foreach ($arquivo in $arquivosPrincipais) {
    $caminhoCompleto = Join-Path $caminho $arquivo
    if (Test-Path $caminhoCompleto) {
        Write-Host "  ✓ $arquivo" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $arquivo - NÃO ENCONTRADO" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "3. SOLUÇÕES PARA O CURSOR:" -ForegroundColor Cyan
Write-Host ""
Write-Host "   A) Recarregar janela:" -ForegroundColor White
Write-Host "      Ctrl+Shift+P → 'Developer: Reload Window'" -ForegroundColor Gray
Write-Host ""
Write-Host "   B) Fechar e reabrir:" -ForegroundColor White
Write-Host "      1. Feche o Cursor completamente" -ForegroundColor Gray
Write-Host "      2. Abra: aulas.code-workspace" -ForegroundColor Gray
Write-Host ""
Write-Host "   C) Limpar cache (se necessário):" -ForegroundColor White
Write-Host "      1. Feche o Cursor" -ForegroundColor Gray
Write-Host "      2. Delete: %APPDATA%\Cursor\User\workspaceStorage" -ForegroundColor Gray
Write-Host "      3. Reabra o Cursor" -ForegroundColor Gray
Write-Host ""
Write-Host "   D) Verificar OneDrive:" -ForegroundColor White
Write-Host "      1. Clique no ícone OneDrive (bandeja)" -ForegroundColor Gray
Write-Host "      2. Verifique se está sincronizado (verde)" -ForegroundColor Gray
Write-Host "      3. Se necessário: botão direito na pasta → 'Sempre manter neste dispositivo'" -ForegroundColor Gray
Write-Host ""

Write-Host "=== FIM ===" -ForegroundColor Cyan
