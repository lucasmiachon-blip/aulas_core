# Canal para ver os slides GRADE no navegador (local)
# Execução: .\ver-local.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$srcPath = Join-Path $root "GRADE\src"
$port = 8000
$url = "http://localhost:$port/index.html"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Ver slides GRADE no local" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar Python
try {
    $v = python --version 2>&1
    Write-Host "  Python: $v" -ForegroundColor Gray
} catch {
    Write-Host "  ERRO: Python nao encontrado." -ForegroundColor Red
    Write-Host "  Instale: https://www.python.org/downloads/" -ForegroundColor Yellow
    exit 1
}

if (-not (Test-Path $srcPath)) {
    Write-Host "  ERRO: Pasta GRADE\src nao encontrada." -ForegroundColor Red
    exit 1
}

Set-Location $srcPath
Write-Host "  Pasta: $srcPath" -ForegroundColor Gray
Write-Host ""
Write-Host "  Abrindo navegador em ~3 s: $url" -ForegroundColor Green
Write-Host "  Para parar: Ctrl+C" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Abrir o navegador depois do servidor subir (em paralelo)
Start-Job -ScriptBlock {
    Start-Sleep -Seconds 3
    Start-Process $using:url
} | Out-Null

python -m http.server $port
