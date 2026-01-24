# Exporta PDF do index (GRADE) e ZIP com GRADE + CHANGELOG + DASHBOARD
# Execução: .\exportar-pdf-e-zip.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

$exportsDir = Join-Path $root "exports"
if (-not (Test-Path $exportsDir)) { New-Item -ItemType Directory -Path $exportsDir | Out-Null }

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PDF do INDEX + ZIP (GRADE, CHANGELOG, DASHBOARD)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1) Servidor HTTP na raiz (porta 8000) para o Playwright carregar o index
Write-Host "[1/4] Iniciando servidor HTTP (porta 8000)..." -ForegroundColor Yellow
$job = Start-Job -ScriptBlock {
    Set-Location $using:root
    python -m http.server 8000 2>&1
}
Start-Sleep -Seconds 3
Write-Host "      Servidor em execução." -ForegroundColor Green
Write-Host ""

# 2) PDF do index
Write-Host "[2/4] Gerando PDF do index (GRADE)..." -ForegroundColor Yellow
Push-Location (Join-Path $root "scripts")
try {
    if (-not (Test-Path "node_modules")) {
        Write-Host "      Instalando dependências (npm install)..." -ForegroundColor Gray
        npm install 2>&1 | Out-Null
    }
    npx playwright install chromium 2>$null
    node export-grade-pdf.js
    if ($LASTEXITCODE -ne 0) { throw "export-grade-pdf.js falhou." }
} finally {
    Pop-Location
}
Write-Host "      PDF salvo em exports\GRADE-slides.pdf" -ForegroundColor Green
Write-Host ""

# 3) Parar servidor
Write-Host "[3/4] Parando servidor..." -ForegroundColor Yellow
Stop-Job $job -ErrorAction SilentlyContinue
Remove-Job $job -Force -ErrorAction SilentlyContinue
Write-Host "      Servidor encerrado." -ForegroundColor Green
Write-Host ""

# 4) ZIP: GRADE + CHANGELOG + DASHBOARD
Write-Host "[4/4] Criando ZIP (GRADE, CHANGELOG, DASHBOARD)..." -ForegroundColor Yellow
$zipName = "GRADE-changelog-dashboard.zip"
$zipPath = Join-Path $exportsDir $zipName
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }

$tempZipDir = Join-Path $env:TEMP "grade-zip-$(Get-Random)"
New-Item -ItemType Directory -Path $tempZipDir -Force | Out-Null

Copy-Item -Path (Join-Path $root "GRADE") -Destination (Join-Path $tempZipDir "GRADE") -Recurse -Force
Copy-Item -Path (Join-Path $root "CHANGELOG.md") -Destination (Join-Path $tempZipDir "CHANGELOG.md") -Force -ErrorAction SilentlyContinue
Copy-Item -Path (Join-Path $root "DASHBOARD.xlsx") -Destination (Join-Path $tempZipDir "DASHBOARD.xlsx") -Force -ErrorAction SilentlyContinue

Compress-Archive -Path (Join-Path $tempZipDir "*") -DestinationPath $zipPath -Force
Remove-Item -Path $tempZipDir -Recurse -Force

Write-Host "      ZIP salvo em exports\$zipName" -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Concluído." -ForegroundColor Green
Write-Host "  - PDF: exports\GRADE-slides.pdf" -ForegroundColor White
Write-Host "  - ZIP: exports\$zipName" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
