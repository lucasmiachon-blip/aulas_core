# Exporta PDF do index (GRADE)
# Execução: .\exportar-pdf-e-zip.ps1
# ZIP: pedir separadamente quando precisar

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

$exportsDir = Join-Path $root "exports"
if (-not (Test-Path $exportsDir)) { New-Item -ItemType Directory -Path $exportsDir | Out-Null }

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PDF do INDEX (GRADE)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1) Servidor HTTP na raiz (porta 8000) para fallback (Live Server 5500 tem prioridade)
Write-Host "[1/3] Iniciando servidor HTTP (porta 8000)..." -ForegroundColor Yellow
$job = Start-Job -ScriptBlock {
    Set-Location $using:root
    python -m http.server 8000 2>&1
}
Start-Sleep -Seconds 3
Write-Host "      Servidor em execução." -ForegroundColor Green
Write-Host ""

# 2) PDF do index
Write-Host "[2/3] Gerando PDF do index (GRADE)..." -ForegroundColor Yellow
Push-Location (Join-Path $root "scripts")
try {
    if (-not (Test-Path "node_modules")) {
        Write-Host "      Instalando dependências (npm install)..." -ForegroundColor Gray
        npm install 2>&1 | Out-Null
    }
    npx playwright install chromium 2>$null
    node export-grade-pdf.js 2>&1
    if ($LASTEXITCODE -ne 0) { throw "export-grade-pdf.js falhou." }
} finally {
    Pop-Location
}
Write-Host "      PDF salvo em exports\GRADE-slides.pdf" -ForegroundColor Green
Write-Host ""

# 3) Parar servidor
Write-Host "[3/3] Parando servidor..." -ForegroundColor Yellow
Stop-Job $job -ErrorAction SilentlyContinue
Remove-Job $job -Force -ErrorAction SilentlyContinue
Write-Host "      Servidor encerrado." -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Concluído: exports\GRADE-slides.pdf" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
