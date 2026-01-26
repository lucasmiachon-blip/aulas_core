# Script para criar ZIP com arquivos para ChatGPT
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

if (-not (Test-Path "exports")) {
    New-Item -ItemType Directory -Path "exports" | Out-Null
}

if (Test-Path "exports\chatgpt-context.zip") {
    Remove-Item "exports\chatgpt-context.zip" -Force
}

$items = @()
if (Test-Path "OSTEOPOROSE") {
    $items += "OSTEOPOROSE"
    Write-Host "✓ OSTEOPOROSE"
}
if (Test-Path "docs") {
    $items += "docs"
    Write-Host "✓ docs"
}
if (Test-Path "DASHBOARD.xlsx") {
    $items += "DASHBOARD.xlsx"
    Write-Host "✓ DASHBOARD.xlsx"
}
if (Test-Path "CHANGELOG.md") {
    $items += "CHANGELOG.md"
    Write-Host "✓ CHANGELOG.md"
}

if ($items.Count -gt 0) {
    Compress-Archive -Path $items -DestinationPath "exports\chatgpt-context.zip" -Force
    Write-Host "`n✅ ZIP criado: exports\chatgpt-context.zip ($($items.Count) itens)"
} else {
    Write-Host "❌ Nenhum item encontrado"
}
