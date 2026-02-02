@echo off
echo ========================================
echo   Ver slides GRADE no local
echo ========================================
echo.
echo Canal: http://localhost:8000/index.html
echo.
echo Iniciando servidor... Abra o link acima (ou use ver-local.ps1 para abrir automaticamente).
echo Ctrl+C para parar.
echo.
cd /d "%~dp0"
cd GRADE\src
python -m http.server 8000
