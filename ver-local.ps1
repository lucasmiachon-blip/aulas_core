Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Servidor Local - Slides GRADE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Iniciando servidor na pasta GRADE/src..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Abra no navegador:" -ForegroundColor Green
Write-Host "  http://localhost:8000/index.html" -ForegroundColor White
Write-Host ""
Write-Host "Pressione Ctrl+C para parar o servidor" -ForegroundColor Yellow
Write-Host ""
Set-Location "GRADE\src"
python -m http.server 8000
