@echo off
echo ========================================
echo   Servidor Local - Slides GRADE
echo ========================================
echo.
echo Iniciando servidor na pasta GRADE/src...
echo.
echo Abra no navegador:
echo   http://localhost:8000/index.html
echo.
echo Pressione Ctrl+C para parar o servidor
echo.
cd GRADE\src
python -m http.server 8000
