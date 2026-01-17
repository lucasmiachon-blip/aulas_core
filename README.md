# aulas

Este repositório contém **duas aulas**:
- **GRADE**
- **OSTEOPOROSE**

## Como o repositório está organizado

Cada aula tem duas pastas principais:
- `src/` → **edição** (onde você trabalha e altera conteúdo)
- `dist/` → **entrega** (o que será apresentado/compartilhado quando estiver estável)

> Política: `dist/` só recebe conteúdo estável vindo de `src/`.

## Como abrir a aula no navegador

Você pode abrir diretamente o arquivo `dist/index.html` no navegador:
- `GRADE/dist/index.html`
- `OSTEOPOROSE/dist/index.html`

## Servidor local (opcional, recomendado)

Para evitar problemas de caminhos relativos e facilitar testes, rode um servidor local na raiz do repositório:

```bash
cd aulas
python -m http.server 8000
```

Depois abra no navegador:
- `http://localhost:8000/GRADE/dist/`
- `http://localhost:8000/OSTEOPOROSE/dist/`
