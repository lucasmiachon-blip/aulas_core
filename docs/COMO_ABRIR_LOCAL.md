# 🌐 Como Abrir o Projeto Localmente

## 🚀 Método 1: Servidor Python (Recomendado)

### Passo 1: Abrir Terminal/PowerShell

### Passo 2: Ir para a pasta do projeto
```bash
cd C:\Users\lucas\OneDrive\LM\Documentos\Dev\Projetos\Aulas
```

### Passo 3: Iniciar servidor
```bash
python -m http.server 8000
```

### Passo 4: Abrir no navegador
```
http://localhost:8000/GRADE/src/index.html
```

**Ou:**
```
http://127.0.0.1:8000/GRADE/src/index.html
```

---

## 🚀 Método 2: Servidor na pasta src (Mais simples)

### Passo 1: Abrir Terminal/PowerShell

### Passo 2: Ir para a pasta src
```bash
cd C:\Users\lucas\OneDrive\LM\Documentos\Dev\Projetos\Aulas\GRADE\src
```

### Passo 3: Iniciar servidor
```bash
python -m http.server 8000
```

### Passo 4: Abrir no navegador
```
http://localhost:8000/index.html
```

---

## 🚀 Método 3: Abrir arquivo direto (Pode ter problemas com CORS)

⚠️ **ATENÇÃO:** Este método pode não funcionar devido a restrições CORS do navegador para carregar arquivos via `fetch()`.

### Passo 1: Abrir Windows Explorer

### Passo 2: Navegar até:
```
C:\Users\lucas\OneDrive\LM\Documentos\Dev\Projetos\Aulas\GRADE\src
```

### Passo 3: Clicar duas vezes em `index.html`

⚠️ Se aparecer erro de CORS, use o Método 1 ou 2.

---

## ✅ Verificar se está funcionando

Após abrir `http://localhost:8000/index.html`, você deve ver:
- ✅ Slide 1 (capa "CORE GRADE")
- ✅ Contador "1 / 41" (ou 42) no canto
- ✅ Setas de navegação funcionando
- ✅ Sem erros no Console (F12)

---

## 🔧 Problemas Comuns

### Erro: "python não reconhecido"
**Solução:**
1. Instale Python: https://www.python.org/downloads/
2. Durante instalação, marque "Add Python to PATH"
3. Reinicie o terminal
4. Execute novamente: `python -m http.server 8000`

### Erro: "Porta 8000 já em uso"
**Solução:**
Use outra porta:
```bash
python -m http.server 8001
```
Depois abra: `http://localhost:8001/index.html`

### Erro: CORS ou "Failed to fetch"
**Solução:**
Não abra o arquivo direto. Use sempre um servidor HTTP (Método 1 ou 2).

### Página em branco
**Solução:**
1. Abra o Console (F12)
2. Veja quais erros aparecem
3. Verifique se todos os arquivos JS/CSS estão na pasta correta

---

## 🎯 Método Rápido (Copiar e Colar)

```bash
cd C:\Users\lucas\OneDrive\LM\Documentos\Dev\Projetos\Aulas\GRADE\src
python -m http.server 8000
```

Depois abra no navegador:
```
http://localhost:8000/index.html
```

---

**Última atualização:** 2024-12-28
