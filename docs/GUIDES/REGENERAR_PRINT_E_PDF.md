# Regenerar print.html e gerar PDF fallback (OSTEOPOROSE)

Guia mínimo para ter o `print.html` atualizado e um PDF de fallback.

---

## Pré-requisitos

- Node.js instalado
- Dependências instaladas na **raiz do projeto**: `npm install`
- Playwright Chromium instalado: `npx playwright install chromium`
- `OSTEOPOROSE/src/slides/_list.txt` e `_meta.json` em sync (mesma ordem e quantidade)

Se `_meta.json` estiver desatualizado em relação à `_list.txt`, rode primeiro:

```powershell
node scripts/rename-osteoporose-slides-by-order.js
```

(Isso atualiza `_meta.json` a partir dos arquivos em `slides/`.)

---

## Passo 1 — Regenerar print.html

Na **raiz do projeto** (`C:\Dev\Projetos\Aulas2`):

```powershell
node scripts/build-osteoporose-print-html.js
```

**Resultado esperado:** mensagem `OK: ...\OSTEOPOROSE\src\print.html | 72 slides`

**Se der erro:** o script valida `_list.txt` vs `_meta.json` e arquivos em disco. Corrija a lista ou rode `rename-osteoporose-slides-by-order.js` e tente de novo.

---

## Passo 2 — Gerar o PDF

Ainda na raiz do projeto:

```powershell
npm run export:osteoporose
```

ou:

```powershell
node scripts/export-osteoporose-pdf.js
```

**Comportamento:**

- O script tenta primeiro abrir uma URL (ex.: `http://127.0.0.1:5500/OSTEOPOROSE/src/print.html`) se você tiver um servidor na porta 5500.
- Se **nenhuma** URL responder, ele usa **fallback**: lê o arquivo `OSTEOPOROSE/src/print.html` do disco e gera o PDF sem precisar de servidor.

**Resultado:** PDF em `OSTEOPOROSE/exports/OSTEOPOROSE-slides.pdf`

---

## Resumo (2 comandos)

```powershell
# 1. Regenerar print a partir dos slides
node scripts/build-osteoporose-print-html.js

# 2. Gerar PDF (usa print.html do disco se não houver servidor)
npm run export:osteoporose
```

PDF final: `OSTEOPOROSE/exports/OSTEOPOROSE-slides.pdf`

---

## Formato 16:9 e “um slide por página”

- **index.html?print=1** e **print.html** usam `print.css`: cada slide é uma caixa 16:9 (1600×900px na tela; 16.667×9.375in no PDF) com `overflow: hidden`.
- Se um slide tiver **muito conteúdo** (ex.: S03 Objetivos), a parte que passar de 900px é cortada. Para “todo conteúdo dentro” sem corte: reduzir texto/padding no slide ou usar escala (requer JS; fora do escopo do CSS atual).
- **Recomendação:** Para PDF fallback, use `print.html` (gerado pelo build). Para pré-visualizar no navegador, use `index.html?print=1` — cada slide deve aparecer como uma “página” 16:9 no scroll.

## Referências

- Pipeline canônico: editar slides em `OSTEOPOROSE/src/slides/` → build print → **nunca** editar `print.html` à mão.
- Ajustes de PDF (margens, fit, etc.): só em `scripts/export-osteoporose-pdf.js` (HARD_CONSTRAINTS / AI-RESTRICTIONS).
- `@media print` com `overflow:hidden` em html/body: **não remover** (Erro 9 no CLAUDE.md).
