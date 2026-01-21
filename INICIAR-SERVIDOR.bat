@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   SERVIDOR LOCAL - SLIDES GRADE
echo ========================================
echo.

REM Verificar se Python está instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo ERRO: Python não encontrado!
    echo Instale Python em: https://www.python.org/downloads/
    pause
    exit /b 1
)

echo Python encontrado!
echo.

REM Ir para a pasta correta
cd /d "%~dp0GRADE\src"
if errorlevel 1 (
    echo ERRO: Pasta GRADE\src não encontrada!
    pause
    exit /b 1
)

echo Servidor iniciando na porta 8000...
echo.
echo ========================================
echo ABRA NO NAVEGADOR:
echo   http://localhost:8000/index.html
echo.
echo Pressione Ctrl+C para PARAR o servidor
echo ========================================
echo.

python -m http.server 8000
