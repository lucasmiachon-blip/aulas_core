# Script para forçar sincronização completa do OneDrive
# Execute este script como Administrador se necessário

Write-Host "Verificando arquivos no diretório..." -ForegroundColor Yellow

$caminho = "C:\Users\prece\OneDrive\Documentos\AssistantStack\OneDrive\LM\Documentos\Dev\Projetos\Aulas"

# Verificar se o caminho existe
if (-not (Test-Path $caminho)) {
    Write-Host "Caminho não encontrado: $caminho" -ForegroundColor Red
    exit 1
}

Write-Host "Caminho encontrado: $caminho" -ForegroundColor Green

# Contar arquivos
$totalArquivos = (Get-ChildItem -Path $caminho -Recurse -File -ErrorAction SilentlyContinue | Measure-Object).Count
Write-Host "Total de arquivos encontrados: $totalArquivos" -ForegroundColor Cyan

# Verificar arquivos com ReparsePoint (sincronizando)
$arquivosSincronizando = Get-ChildItem -Path $caminho -Recurse -File -ErrorAction SilentlyContinue | Where-Object { $_.Attributes -match "ReparsePoint" } | Measure-Object
Write-Host "Arquivos com ReparsePoint (sincronizando): $($arquivosSincronizando.Count)" -ForegroundColor Yellow

# Tentar forçar disponibilidade offline (requer OneDrive API ou acesso direto)
Write-Host "`nPara forçar disponibilidade offline:" -ForegroundColor Yellow
Write-Host "1. Abra o Explorador de Arquivos" -ForegroundColor White
Write-Host "2. Navegue até: $caminho" -ForegroundColor White
Write-Host "3. Clique com botão direito na pasta 'Aulas'" -ForegroundColor White
Write-Host "4. Selecione 'Sempre manter neste dispositivo'" -ForegroundColor White
Write-Host "5. Aguarde a sincronização completa" -ForegroundColor White

Write-Host "`nOu aguarde a sincronização automática do OneDrive..." -ForegroundColor Cyan
Write-Host "Verifique o ícone do OneDrive na bandeja do sistema." -ForegroundColor Cyan
