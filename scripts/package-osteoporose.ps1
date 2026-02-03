# package-osteoporose.ps1
# Gera PDF e ZIP separados em OSTEOPOROSE/exports/
# Uso: .\scripts\package-osteoporose.ps1

param(
    [int]$Port = 5555,
    [switch]$SkipPDF
)

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $ProjectRoot

$ExportsDir = Join-Path $ProjectRoot "OSTEOPOROSE\exports"
$Date = Get-Date -Format "yyyyMMdd-HHmmss"

# Criar pasta exports se nao existir
if (!(Test-Path $ExportsDir)) {
    New-Item -ItemType Directory -Path $ExportsDir -Force | Out-Null
}

Write-Host "[PACKAGE] OSTEOPOROSE" -ForegroundColor Cyan
Write-Host "         Destino: $ExportsDir" -ForegroundColor Gray

# --- PDF ---
if (-not $SkipPDF) {
    Write-Host ""
    Write-Host "[PDF] Gerando..." -ForegroundColor Yellow
    
    # Iniciar servidor HTTP
    $ServerJob = Start-Job -ScriptBlock {
        param($root, $port)
        Set-Location (Join-Path $root "OSTEOPOROSE\src")
        python -m http.server $port 2>&1
    } -ArgumentList $ProjectRoot, $Port
    
    Start-Sleep -Seconds 2
    
    # Exportar PDF
    $env:EXPORT_URL = "http://127.0.0.1:$Port/index.html?print=1"
    try {
        node scripts/export-osteoporose-pdf.js
        if ($LASTEXITCODE -ne 0) { throw "Falha ao gerar PDF" }
        Write-Host "[PDF] OK" -ForegroundColor Green
    } finally {
        Stop-Job $ServerJob -ErrorAction SilentlyContinue
        Remove-Job $ServerJob -Force -ErrorAction SilentlyContinue
    }
} else {
    Write-Host ""
    Write-Host "[PDF] Pulado (SkipPDF)" -ForegroundColor Gray
}

# --- ZIP ---
Write-Host ""
Write-Host "[ZIP] Criando..." -ForegroundColor Yellow

$ZipName = "OSTEOPOROSE-package-$Date.zip"
$ZipPath = Join-Path $ExportsDir $ZipName
$TempDir = Join-Path $env:TEMP "osteoporose-package-$Date"

# Criar estrutura temporaria (exclui exports para nao incluir PDF no ZIP)
if (Test-Path $TempDir) { Remove-Item $TempDir -Recurse -Force }
New-Item -ItemType Directory -Path $TempDir -Force | Out-Null

# Copiar arquivos
Copy-Item -Path "OSTEOPOROSE\src" -Destination "$TempDir\OSTEOPOROSE\src" -Recurse
Copy-Item -Path "OSTEOPOROSE\*.md" -Destination "$TempDir\OSTEOPOROSE\" -ErrorAction SilentlyContinue
Copy-Item -Path "scripts" -Destination "$TempDir\scripts" -Recurse
Copy-Item -Path "CHANGELOG.md" -Destination "$TempDir\" -ErrorAction SilentlyContinue
Copy-Item -Path "README.md" -Destination "$TempDir\" -ErrorAction SilentlyContinue

# Criar ZIP
Compress-Archive -Path "$TempDir\*" -DestinationPath $ZipPath -Force

# Limpar temp
Remove-Item $TempDir -Recurse -Force

$ZipSize = [math]::Round((Get-Item $ZipPath).Length / 1MB, 2)
Write-Host "[ZIP] OK: $ZipName ($ZipSize MB)" -ForegroundColor Green

# --- Resumo ---
Write-Host ""
Write-Host "[DONE] Arquivos em: $ExportsDir" -ForegroundColor Green

Get-ChildItem $ExportsDir -Filter "*.pdf" | 
    Sort-Object LastWriteTime -Descending | 
    Select-Object -First 2 |
    ForEach-Object {
        $size = [math]::Round($_.Length / 1MB, 2)
        Write-Host "       - $($_.Name) ($size MB)" -ForegroundColor White
    }

Get-ChildItem $ExportsDir -Filter "*.zip" | 
    Sort-Object LastWriteTime -Descending | 
    Select-Object -First 2 |
    ForEach-Object {
        $size = [math]::Round($_.Length / 1MB, 2)
        Write-Host "       - $($_.Name) ($size MB)" -ForegroundColor White
    }
