# Script para forçar download de todos os arquivos do OneDrive
# Execute este script para baixar arquivos que estão apenas online

Write-Host "=== FORÇAR DOWNLOAD DE ARQUIVOS ONEDRIVE ===" -ForegroundColor Cyan
Write-Host ""

$caminho = Get-Location

Write-Host "Caminho: $caminho" -ForegroundColor Yellow
Write-Host ""

# Contar arquivos online
Write-Host "1. Verificando arquivos apenas online..." -ForegroundColor Yellow
$arquivosOnline = Get-ChildItem -Path $caminho -Recurse -File -ErrorAction SilentlyContinue | Where-Object { $_.Attributes -match "ReparsePoint" }
$totalOnline = ($arquivosOnline | Measure-Object).Count

Write-Host "   Arquivos apenas online encontrados: $totalOnline" -ForegroundColor $(if ($totalOnline -eq 0) { "Green" } else { "Yellow" })
Write-Host ""

if ($totalOnline -eq 0) {
    Write-Host "✅ Todos os arquivos já estão baixados localmente!" -ForegroundColor Green
    exit 0
}

Write-Host "2. Forçando download de arquivos..." -ForegroundColor Yellow
Write-Host "   Isso pode demorar alguns minutos..." -ForegroundColor Gray
Write-Host ""

$contador = 0
$total = $totalOnline

foreach ($arquivo in $arquivosOnline) {
    $contador++
    $percentual = [math]::Round(($contador / $total) * 100, 1)
    
    # Tentar acessar o arquivo para forçar download
    try {
        $conteudo = Get-Content -Path $arquivo.FullName -ErrorAction SilentlyContinue -TotalCount 1
        Write-Progress -Activity "Baixando arquivos" -Status "$contador de $total ($percentual%)" -PercentComplete $percentual -CurrentOperation $arquivo.Name
    } catch {
        # Ignorar erros
    }
}

Write-Progress -Activity "Baixando arquivos" -Completed

Write-Host ""
Write-Host "3. Verificando resultado..." -ForegroundColor Yellow

# Verificar novamente
$arquivosAindaOnline = Get-ChildItem -Path $caminho -Recurse -File -ErrorAction SilentlyContinue | Where-Object { $_.Attributes -match "ReparsePoint" }
$totalAindaOnline = ($arquivosAindaOnline | Measure-Object).Count

Write-Host "   Arquivos ainda online: $totalAindaOnline" -ForegroundColor $(if ($totalAindaOnline -eq 0) { "Green" } else { "Yellow" })
Write-Host ""

if ($totalAindaOnline -eq 0) {
    Write-Host "✅ SUCESSO! Todos os arquivos foram baixados!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Agora:" -ForegroundColor Cyan
    Write-Host "1. Recarregue o Cursor: Ctrl+Shift+P → 'Developer: Reload Window'" -ForegroundColor White
    Write-Host "2. Ou feche e reabra o Cursor" -ForegroundColor White
} else {
    Write-Host "⚠️  Alguns arquivos ainda estão online." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "SOLUÇÃO ALTERNATIVA:" -ForegroundColor Cyan
    Write-Host "1. Abra o Explorador de Arquivos" -ForegroundColor White
    Write-Host "2. Navegue até: $caminho" -ForegroundColor White
    Write-Host "3. Clique com botão direito na pasta 'Aulas'" -ForegroundColor White
    Write-Host "4. Selecione 'Sempre manter neste dispositivo'" -ForegroundColor White
    Write-Host "5. Aguarde a sincronização completa" -ForegroundColor White
}

Write-Host ""
Write-Host "=== FIM ===" -ForegroundColor Cyan
