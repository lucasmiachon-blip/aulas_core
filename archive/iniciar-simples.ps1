# Script simples para iniciar servidor
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  INICIANDO SERVIDOR..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Ir para a pasta
Set-Location "GRADE\src"

# Verificar se Python funciona
$pythonCheck = Get-Command python -ErrorAction SilentlyContinue
if ($pythonCheck) {
    $pythonVersion = python --version 2>&1
    Write-Host "✓ Python encontrado: $pythonVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Python não encontrado!" -ForegroundColor Red
    Write-Host "Pressione qualquer tecla para sair..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

# Verificar se index.html existe
if (Test-Path "index.html") {
    Write-Host "✓ Arquivos encontrados" -ForegroundColor Green
} else {
    Write-Host "✗ Arquivo index.html não encontrado!" -ForegroundColor Red
    Write-Host "Pressione qualquer tecla para sair..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SERVIDOR RODANDO NA PORTA 8080" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "URL: http://localhost:8080/index.html" -ForegroundColor Yellow
Write-Host ""
Write-Host "Abrindo navegador automaticamente..." -ForegroundColor Green
Write-Host ""
Write-Host "Para PARAR: Pressione Ctrl+C" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Abrir navegador
Start-Sleep -Seconds 2
Start-Process "http://localhost:8080/index.html"

# Iniciar servidor
python -m http.server 8080
