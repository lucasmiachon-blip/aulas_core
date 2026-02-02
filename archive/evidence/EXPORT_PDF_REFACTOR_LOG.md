# Export PDF Refactor Log

## Resumo da Sessão

A partir da modificação dos parâmetros `page.pdf` para garantir `preferCSSPageSize: true`.

---

## 1. Primeira Edição: Adicionar `preferCSSPageSize: true`

**Objetivo**: Automatizar detecção de "clipping" no export PDF.

**Alterações em `scripts/export-osteoporose-pdf.js`**:
- Removido `width` e `height` hardcoded do `page.pdf()`
- Adicionado `preferCSSPageSize: true`
- Adicionado screenshot `exports/export-sample.png` após gerar PDF
- Adicionado logs parseáveis: `slideCount`, `pdfPath`, `EXPECTED_PAGE_IN`
- Adicionado comando Python para contar páginas via PyPDF2

---

## 2. Diagnóstico D0.1–D0.3 (READ-ONLY)

**D0.1 @page encontrado**:
- Arquivo: `OSTEOPOROSE/src/css/print.css` linhas 134–137
- Regra:
```css
@page {
  size: 16.667in 9.375in;
  margin: 0;
}
```

**D0.2 @media print**:
- Bloco em `print.css` linhas 114–257
- Seletores relevantes:
  - `html, body`: width 100%, height auto, margin 0, padding 0, overflow hidden
  - `.stage__inner`: width 16.667in, transform none
  - `.deck`: width 16.667in, height auto
  - `.slides`: height auto, overflow visible
  - `.slide`: width 16.667in, height 9.375in, overflow hidden, page-break rules

**D0.3 Dimensão real**:
- `@page size`: **16.667in × 9.375in** = 1600px × 900px
- `.slide` em `@media print`: **16.667in × 9.375in** = 1600px × 900px
- Aspect ratio: **16:9**

---

## 3. Refatoração Completa do Script

**Constraints aplicados**:
1. Alterar SOMENTE `scripts/export-osteoporose-pdf.js`
2. PROIBIDO: injeção de `<style>`, `setProperty(..., 'important')`, workarounds de layout via JS
3. Sem dependências novas
4. Screenshot `fullPage:true` proibido em sucesso
5. Mudança mínima e reversível

**Alterações implementadas**:

### A) Remoção de Workarounds Proibidos
- Removido bloco que injetava `<style id="playwright-print-fix">`
- Removido código que aplicava `setProperty(..., 'important')` em massa
- Removido ajustes de width/height/overflow via JS para deck/slides/html/body

### B) Correção do waitForFunction
- Substituído `waitForFunction` por `waitForSelector`:
```javascript
await page.waitForSelector('.slide', { timeout: 60000 });
```

### C) Contagem Estabilizada de Slides
- Algoritmo: poll a cada 200ms, estável após 3 leituras iguais consecutivas
- Timeout total: 30s
- Variáveis finais: `SLIDES_FINAL`, `SLIDES_HIDDEN_ATTR`

### D) PDF sem override de dimensões
```javascript
await page.pdf({
  path: outputPath,
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
  displayHeaderFooter: false,
  preferCSSPageSize: true  // Respeita @page do CSS
});
```

### E) Screenshot apenas do primeiro slide
```javascript
await page.locator('.slide').first().screenshot({ path: samplePath });
```

### F) Debug artifacts apenas em falha
- Se `SLIDES_FINAL === 0`: salva `export-debug.png` e `export-debug.html`

### G) Logs parseáveis (CHAVE=valor)
```
EXPORT_URL_USED=http://127.0.0.1:5500/index.html?print=1
HTTP_STATUS=200
SLIDES_FINAL=72
SLIDES_HIDDEN_ATTR=0
FIRST_SLIDE_RECT=1600x900
FIRST_SLIDE_COMPUTED=1600.03pxx900px
FIRST_SLIDE_RATIO=1.7778
PDF_PATH_ABS=C:\Dev\Projetos\Aulas2\exports\OSTEOPOROSE-slides.pdf
```

### H) Robustez com try/finally
```javascript
const browser = await chromium.launch({ headless: true });
try {
  // ... todo o código
} finally {
  await browser.close();
}
```

---

## 4. Geração Final do PDF

**Comando executado**:
```powershell
$env:EXPORT_URL="http://127.0.0.1:5500/index.html?print=1"; node scripts/export-osteoporose-pdf.js
```

**Resultado**:
```
🚀 Iniciando exportação PDF Osteoporose...
📄 try URL: http://127.0.0.1:5500/index.html?print=1
📄 status: 200 OK
⏳ Aguardando slides...
⏳ Estabilizando contagem de slides...
✅ SLIDES_FINAL=72, SLIDES_HIDDEN_ATTR=0
EXPORT_URL_USED=http://127.0.0.1:5500/index.html?print=1
HTTP_STATUS=200
SLIDES_FINAL=72
SLIDES_HIDDEN_ATTR=0
FIRST_SLIDE_RECT=1600x900
FIRST_SLIDE_COMPUTED=1600.03pxx900px
FIRST_SLIDE_RATIO=1.7778
PDF_PATH_ABS=C:\Dev\Projetos\Aulas2\exports\OSTEOPOROSE-slides.pdf
✅ PDF gerado com sucesso.
```

**Verificação de páginas**:
```powershell
python -c "from PyPDF2 import PdfReader; print('PAGES:', len(PdfReader(r'exports\OSTEOPOROSE-slides.pdf').pages))"
# Output: PAGES: 72
```

---

## 5. Arquivos Gerados

| Arquivo | Descrição |
|---------|-----------|
| `exports/OSTEOPOROSE-slides.pdf` | PDF final com 72 páginas (16.667in × 9.375in) |
| `exports/export-sample.png` | Screenshot do primeiro slide (auditoria) |

---

## 6. Git Diff Final

O diff completo removeu ~120 linhas de workarounds e adicionou ~95 linhas de código limpo e auditável.

Principais mudanças:
- `-280 linhas` (código antigo com workarounds)
- `+182 linhas` (código novo limpo)
- URL configurável via `EXPORT_URL` / `EXPORT_BASE_URL`
- Contagem estabilizada de slides
- Logs parseáveis CHAVE=valor
- Sem injeção de CSS/JS em runtime

---

## Conclusão

O export agora:
1. Respeita 100% o CSS do projeto (`@page` e `@media print`)
2. Não usa workarounds de layout via JS
3. Produz logs parseáveis para automação/CI
4. Gera debug artifacts apenas em falha
5. É reprodutível e auditável
