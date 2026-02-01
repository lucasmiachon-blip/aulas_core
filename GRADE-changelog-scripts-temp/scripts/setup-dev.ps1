# Script de Setup Automático - Projeto Fora do OneDrive
# Execute este script para configurar o ambiente de desenvolvimento

Write-Host "=== SETUP DO PROJETO AULAS_CORE ===" -ForegroundColor Cyan
Write-Host ""

# 1. Criar pasta C:\Dev
Write-Host "1. Verificando pasta C:\Dev..." -ForegroundColor Yellow
if (-not (Test-Path "C:\Dev")) {
    New-Item -ItemType Directory -Path "C:\Dev" | Out-Null
    Write-Host "   ✅ Pasta C:\Dev criada" -ForegroundColor Green
} else {
    Write-Host "   ✅ Pasta C:\Dev já existe" -ForegroundColor Green
}

# 2. Verificar se já está clonado
Write-Host ""
Write-Host "2. Verificando repositório..." -ForegroundColor Yellow
$repoPath = "C:\Dev\aulas_core"

if (Test-Path $repoPath) {
    Write-Host "   ⚠️  Repositório já existe em $repoPath" -ForegroundColor Yellow
    $resposta = Read-Host "   Deseja atualizar (pull) ou clonar novamente? (p/c/n)"
    
    if ($resposta -eq "p" -or $resposta -eq "P") {
        Write-Host "   Atualizando repositório..." -ForegroundColor Cyan
        Set-Location $repoPath
        git pull origin main
        Write-Host "   ✅ Repositório atualizado" -ForegroundColor Green
    } elseif ($resposta -eq "c" -or $resposta -eq "C") {
        Write-Host "   Removendo repositório antigo..." -ForegroundColor Yellow
        Remove-Item -Path $repoPath -Recurse -Force
        Write-Host "   Clonando repositório..." -ForegroundColor Cyan
        Set-Location "C:\Dev"
        git clone https://github.com/lucasmiachon-blip/aulas_core.git
        Write-Host "   ✅ Repositório clonado" -ForegroundColor Green
    } else {
        Write-Host "   ⏭️  Pulando clonagem" -ForegroundColor Gray
    }
} else {
    Write-Host "   Clonando repositório..." -ForegroundColor Cyan
    Set-Location "C:\Dev"
    git clone https://github.com/lucasmiachon-blip/aulas_core.git
    Write-Host "   ✅ Repositório clonado" -ForegroundColor Green
}

# 3. Verificar Node.js
Write-Host ""
Write-Host "3. Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "   ✅ Node.js instalado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Node.js não encontrado!" -ForegroundColor Red
    Write-Host "   📥 Instale em: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# 4. Verificar npm
Write-Host ""
Write-Host "4. Verificando npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "   ✅ npm instalado: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "   ❌ npm não encontrado!" -ForegroundColor Red
    exit 1
}

# 5. Instalar dependências
Write-Host ""
Write-Host "5. Instalando dependências..." -ForegroundColor Yellow
Set-Location $repoPath

if (Test-Path "scripts\package.json") {
    Write-Host "   Instalando dependências dos scripts..." -ForegroundColor Cyan
    Set-Location "scripts"
    npm install
    Write-Host "   ✅ Dependências instaladas" -ForegroundColor Green
    Set-Location $repoPath
} else {
    Write-Host "   ⚠️  package.json não encontrado em scripts/" -ForegroundColor Yellow
}

# 6. Instalar Playwright
Write-Host ""
Write-Host "6. Instalando Playwright (Chromium)..." -ForegroundColor Yellow
Write-Host "   Isso pode demorar alguns minutos (~150MB)..." -ForegroundColor Gray
Set-Location "scripts"
npx playwright install chromium
Write-Host "   ✅ Playwright instalado" -ForegroundColor Green
Set-Location $repoPath

# 7. Resumo
Write-Host ""
Write-Host "=== SETUP CONCLUÍDO ===" -ForegroundColor Green
Write-Host ""
Write-Host "📁 Projeto localizado em: $repoPath" -ForegroundColor Cyan
Write-Host ""
Write-Host "Próximos passos:" -ForegroundColor Yellow
Write-Host "1. Abra o Cursor" -ForegroundColor White
Write-Host "2. File → Open Folder → $repoPath" -ForegroundColor White
Write-Host "3. Edite os slides em GRADE/src/slides/" -ForegroundColor White
Write-Host "4. Gere PDF: cd GRADE && node ..\scripts\export-grade-pdf.js" -ForegroundColor White
Write-Host ""
Write-Host "Documentação completa: SETUP_FORA_ONEDRIVE.md" -ForegroundColor Gray
Write-Host ""
