# Script de verificação rápida ao iniciar trabalho
Write-Host "=== VERIFICAÇÃO DE SETUP ===" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar OneDrive
Write-Host "1. Verificando OneDrive..." -ForegroundColor Yellow
$onedrive = Get-Process -Name "OneDrive" -ErrorAction SilentlyContinue
if ($onedrive) {
    Write-Host "   ✓ OneDrive está rodando" -ForegroundColor Green
} else {
    Write-Host "   ⚠ OneDrive não está rodando" -ForegroundColor Yellow
}

# 2. Verificar arquivos
Write-Host "2. Verificando arquivos..." -ForegroundColor Yellow
$total = (Get-ChildItem -Path . -Recurse -File -ErrorAction SilentlyContinue | Measure-Object).Count
Write-Host "   ✓ $total arquivos encontrados" -ForegroundColor Green

# 3. Verificar Git
Write-Host "3. Verificando Git..." -ForegroundColor Yellow
$gitStatus = git status --short 2>&1
if ($LASTEXITCODE -eq 0) {
    $mudancas = ($gitStatus | Measure-Object -Line).Lines
    Write-Host "   ✓ Git funcionando ($mudancas mudanças detectadas)" -ForegroundColor Green
} else {
    Write-Host "   ⚠ Problema com Git" -ForegroundColor Yellow
}

# 4. Verificar workspace
Write-Host "4. Verificando workspace..." -ForegroundColor Yellow
if (Test-Path "aulas.code-workspace") {
    Write-Host "   ✓ Arquivo de workspace encontrado" -ForegroundColor Green
    Write-Host "   → Abra este arquivo no Cursor: aulas.code-workspace" -ForegroundColor Cyan
} else {
    Write-Host "   ⚠ Arquivo de workspace não encontrado" -ForegroundColor Yellow
}

# 5. Verificar estrutura principal
Write-Host "5. Verificando estrutura..." -ForegroundColor Yellow
$pastas = @("GRADE", "docs", "scripts")
foreach ($pasta in $pastas) {
    if (Test-Path $pasta) {
        Write-Host "   ✓ $pasta/ encontrado" -ForegroundColor Green
    } else {
        Write-Host "   ⚠ $pasta/ não encontrado" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "=== PRÓXIMOS PASSOS ===" -ForegroundColor Cyan
Write-Host "1. Abra o Cursor" -ForegroundColor White
Write-Host "2. Abra o arquivo: aulas.code-workspace" -ForegroundColor White
Write-Host "3. Se os arquivos não aparecerem, recarregue: Ctrl+Shift+P → 'Reload Window'" -ForegroundColor White
Write-Host "4. Verifique o status do Git no terminal do Cursor" -ForegroundColor White
