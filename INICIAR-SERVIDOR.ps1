# Script para iniciar servidor local
# Clique com botão direito e selecione "Executar com PowerShell"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   SERVIDOR LOCAL - SLIDES GRADE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se Python está instalado
try {
    $pythonVersion = python --version 2>&1
    Write-Host "Python encontrado: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "ERRO: Python não encontrado!" -ForegroundColor Red
    Write-Host "Instale Python em: https://www.python.org/downloads/" -ForegroundColor Yellow
    Write-Host "Pressione qualquer tecla para sair..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

# Ir para a pasta correta
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$srcPath = Join-Path $scriptPath "GRADE\src"

if (Test-Path $srcPath) {
    Write-Host "Entrando na pasta: $srcPath" -ForegroundColor Yellow
    Set-Location $srcPath
} else {
    Write-Host "ERRO: Pasta GRADE\src não encontrada!" -ForegroundColor Red
    Write-Host "Pressione qualquer tecla para sair..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Servidor iniciando na porta 8000..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "ABRA NO NAVEGADOR:" -ForegroundColor Yellow
Write-Host "  http://localhost:8000/index.html" -ForegroundColor White
Write-Host ""
Write-Host "Pressione Ctrl+C para PARAR o servidor" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Iniciar servidor
python -m http.server 8000
