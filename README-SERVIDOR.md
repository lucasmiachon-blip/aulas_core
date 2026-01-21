# 🚀 Como Iniciar o Servidor Local

## ⚡ Método MAIS SIMPLES (RECOMENDADO)

### Passo 1: Clique duas vezes no arquivo:

**Windows Explorer:**
- Procure por: `INICIAR-SERVIDOR.bat`
- **Clique duas vezes** nele

OU

**PowerShell:**
- Procure por: `INICIAR-SERVIDOR.ps1`
- **Clique com botão direito** → **Executar com PowerShell**

### Passo 2: Abra no navegador:

Quando aparecer a mensagem "Servidor iniciando...", abra:

```
http://localhost:8000/index.html
```

### Passo 3: Para PARAR o servidor:

Pressione **Ctrl+C** no terminal/PowerShell

---

## 🔧 Se der erro no PowerShell

### Erro: "Execução de scripts está desabilitada"

Execute este comando no PowerShell (como Administrador):

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Depois execute o script novamente.

---

## 🐍 Se Python não estiver instalado

1. Baixe Python: https://www.python.org/downloads/
2. **IMPORTANTE:** Durante instalação, marque ✅ "Add Python to PATH"
3. Reinicie o terminal
4. Execute o script novamente

---

## ✅ Verificar se funcionou

Quando abrir `http://localhost:8000/index.html`, você deve ver:

- ✅ Slide 1 (capa "CORE GRADE")
- ✅ Contador "1 / 46" no canto
- ✅ Setas de navegação funcionando
- ✅ Sem erros no Console (F12)

---

## 🆘 Problemas?

### Porta 8000 já em uso?

O script tentará usar a porta 8000. Se estiver ocupada:

1. Feche outros programas que usam a porta
2. Ou use outra porta manualmente:

```powershell
cd GRADE\src
python -m http.server 8001
```

Depois abra: `http://localhost:8001/index.html`

---

## 📁 Onde estão os arquivos?

- **index.html:** `GRADE/src/index.html`
- **Slides:** `GRADE/src/slides/`
- **CSS:** `GRADE/src/css/`
- **JavaScript:** `GRADE/src/js/`

---

**Última atualização:** 2026-01-21
