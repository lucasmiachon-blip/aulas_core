# 🔴 HARD CONSTRAINTS — LEIA ANTES DE QUALQUER MUDANÇA

> **Este arquivo contém regras INVIOLÁVEIS para qualquer assistente de IA.**
> **Referência completa:** `docs/AI/GUARDRAILS.md` e `scripts/AI-RESTRICTIONS.md`

---

## PROJETOS ATIVOS

| Projeto | Pasta | CSS | Export Script |
|---------|-------|-----|---------------|
| **OSTEOPOROSE** | `OSTEOPOROSE/src/` | `OSTEOPOROSE/src/css/` | `scripts/export-osteoporose-pdf.js` |
| **GRADE** | `GRADE/src/` | `GRADE/src/css/` | `scripts/export-grade-pdf.js` |

**Ambos projetos seguem as mesmas regras. Não focar em um só.**

---

## HC1: DOCUMENTAÇÃO OBRIGATÓRIA

**Toda mudança em código DEVE ser documentada:**

| Mudança | Atualizar |
|---------|-----------|
| Qualquer código | `CHANGELOG.md` (raiz) |
| Estrutura/arquitetura | `README.md` |
| Específico do GRADE | `GRADE/CHANGELOG.md` |
| Específico do OSTEOPOROSE | Documentar na raiz |

**Tarefa sem documentação = Tarefa incompleta**

---

## HC2: CSS MÍNIMO

- **Máximo 5-10 linhas de CSS** por tarefa
- **Preferir** classes existentes a criar novas
- **Não criar** novos arquivos CSS
- Se precisar de mais → **PARE e pergunte**
- **Aplicável a ambos:** `OSTEOPOROSE/src/css/` e `GRADE/src/css/`

---

## HC3: !important PROIBIDO

```css
/* ❌ NUNCA */
.classe { display: flex !important; }

/* ✅ CORRETO */
.slide .classe { display: flex; }
```

- **Zero** novos `!important`
- Exceção única: `print.css` (já existentes)
- Se parecer necessário → especificidade está errada → refatorar

---

## HC4: VERIFICAÇÃO PÓS-MUDANÇA

```bash
# Contar !important ANTES e DEPOIS de mexer em CSS:

# Para OSTEOPOROSE:
grep -c "!important" OSTEOPOROSE/src/css/*.css

# Para GRADE:
grep -c "!important" GRADE/src/css/*.css

# Se aumentou em QUALQUER projeto → REVERTER
```

---

---

## HC5: SEM DEPENDÊNCIAS NOVAS

- **NUNCA** adicionar pacotes npm/pip sem aprovação
- Projeto usa vanilla JS/CSS propositalmente
- Se parecer necessária biblioteca → **PARE e pergunte**
- Exceções existentes: `playwright` (export), `puppeteer` (screenshots)

---

## HC6: GIT ANTES DE MUDANÇA GRANDE

```bash
# SEMPRE antes de refatorar ou mexer em múltiplos arquivos:
git status
git add -A && git commit -m "checkpoint antes de [mudança]"
```

- Mudança em 3+ arquivos = commit de checkpoint primeiro
- Mudança em CSS sistêmico = commit primeiro
- Se der errado → `git checkout -- .` volta tudo

---

## HC7: NÃO REFATORAR SEM PEDIR

- **NUNCA** reescrever arquivo inteiro "para melhorar"
- **NUNCA** mudar nomes de classes/funções em uso
- **NUNCA** reorganizar estrutura de pastas sem aprovação
- Mudanças cosméticas (formatação, ordenação) = **PROIBIDO** sem pedir

---

## HC8: PATHS RELATIVOS SEMPRE

```javascript
// ✅ CORRETO
const outputDir = path.join(__dirname, '..', 'OSTEOPOROSE', 'exports');

// ❌ ERRADO
const outputDir = 'c:\\Dev\\Projetos\\Aulas2\\exports';
```

- Zero paths absolutos hardcoded
- Sempre usar `__dirname` + `path.join()`
- Testar que funciona de qualquer diretório

---

## HC9: INLINE STYLES PROIBIDO

```html
<!-- ❌ NUNCA -->
<div style="display: flex; margin: 20px;">

<!-- ✅ CORRETO -->
<div class="card">
```

- Zero `style="..."` em HTML
- Se precisar de estilo único → criar classe em CSS existente
- Exceção: geração dinâmica de posição (JS calculado)

---

## HC10: TESTAR ANTES DE DIZER "PRONTO"

Checklist obrigatório antes de finalizar:

**Para o projeto modificado (OSTEOPOROSE ou GRADE):**
- [ ] Viewer funciona? (abrir no browser)
- [ ] Print mode funciona? (Ctrl+P ou `?print=1`)
- [ ] Export PDF funciona? (rodar script correspondente)
- [ ] Sem erros no console do browser?
- [ ] Sem erros de lint no editor?

**URLs de teste:**
```
OSTEOPOROSE: http://127.0.0.1:5500/OSTEOPOROSE/src/index.html
GRADE:       http://127.0.0.1:5500/GRADE/src/index.html
```

**"Funciona na minha cabeça" ≠ "Pronto"**

---

## RESUMO

| Constraint | Regra |
|------------|-------|
| **HC1** | Sempre atualizar CHANGELOG/README |
| **HC2** | CSS mínimo (5-10 linhas max) |
| **HC3** | Zero `!important` novo |
| **HC4** | Verificar !important count |
| **HC5** | Zero dependências novas sem aprovação |
| **HC6** | Git commit checkpoint antes de mudança grande |
| **HC7** | Não refatorar/renomear sem pedir |
| **HC8** | Paths relativos sempre (nunca hardcoded) |
| **HC9** | Inline styles proibido |
| **HC10** | Testar viewer + print + export antes de "pronto" |

**Violação de qualquer HC = PARE e pergunte ao usuário**

---

*Criado: 2026-02-02*
