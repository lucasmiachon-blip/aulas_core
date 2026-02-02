# 📚 DOCUMENTAÇÃO DO PROJETO AULAS

**Última atualização:** 2026-02-02  
**Projetos ativos:** OSTEOPOROSE (72 slides) + GRADE (61 slides)

---

## 🔴 LEIA PRIMEIRO

Se você é uma IA (Claude/ChatGPT/Cursor), **antes de qualquer ação**:

1. **`../HARD_CONSTRAINTS.md`** ← 10 regras INVIOLÁVEIS
2. **`../scripts/AI-RESTRICTIONS.md`** ← Restrições técnicas CSS/JS
3. **`AI/GUARDRAILS.md`** ← Guardrails completos

**Confirme que leu antes de começar.**

---

## 📂 ESTRUTURA ATUAL DO PROJETO

```
Aulas2/
├── OSTEOPOROSE/          # Apresentação Osteoporose (72 slides)
│   ├── src/slides/       # Slides HTML
│   ├── src/css/          # Estilos
│   ├── src/js/           # JavaScript
│   └── exports/          # PDFs gerados
│
├── GRADE/                # Apresentação GRADE (61 slides)
│   ├── src/slides/       # Slides HTML
│   ├── src/css/          # Estilos
│   ├── src/js/           # JavaScript
│   └── exports/          # PDFs gerados
│
├── scripts/              # Scripts compartilhados (ÚNICO local)
├── docs/                 # Documentação
├── archive/              # Arquivos obsoletos
│
├── HARD_CONSTRAINTS.md   # 🔴 REGRAS INVIOLÁVEIS
├── CHANGELOG.md          # Histórico de mudanças
└── README.md             # README principal
```

---

## 📖 DOCUMENTOS POR CATEGORIA

### 🔴 OBRIGATÓRIOS (ler primeiro)

| Documento | Local | Propósito |
|-----------|-------|-----------|
| **HARD_CONSTRAINTS.md** | Raiz | 10 regras invioláveis (HC1-HC10) |
| **AI-RESTRICTIONS.md** | scripts/ | Restrições CSS/JS/Export |
| **GUARDRAILS.md** | docs/AI/ | Guardrails completos |

### 🎨 DESIGN & VISUAL

| Documento | Local | Propósito |
|-----------|-------|-----------|
| **QUICK_PALETTE_REFERENCE.md** | docs/ | Referência rápida de cores |
| **VISUAL_DESIGN_GUIDE.md** | docs/ESSENTIAL/ | Guia visual completo |
| **STYLEGUIDE.md** | docs/ESSENTIAL/ | Regras de estilo |

### 📐 TÉCNICO

| Documento | Local | Propósito |
|-----------|-------|-----------|
| **TECHNICAL_QUALITY.md** | docs/ESSENTIAL/ | Qualidade técnica |
| **PRESENTATION_TECH.md** | docs/ESSENTIAL/ | Aspectos técnicos |
| **FUTURO_STACK_MODERNO.md** | docs/ | Plano para projetos futuros |

### 📚 GUIAS

| Documento | Local | Propósito |
|-----------|-------|-----------|
| **README-SERVIDOR.md** | docs/GUIDES/ | Como iniciar servidor local |
| **WORKFLOW.md** | docs/GUIDES/ | Git workflow |

---

## 🚦 HARD CONSTRAINTS (Resumo)

| HC | Regra |
|----|-------|
| **HC1** | Sempre atualizar CHANGELOG/README |
| **HC2** | CSS mínimo (5-10 linhas max) |
| **HC3** | Zero `!important` novo |
| **HC4** | Verificar !important count |
| **HC5** | Zero dependências novas |
| **HC6** | Git checkpoint antes de mudança grande |
| **HC7** | Não refatorar sem pedir |
| **HC8** | Paths relativos sempre |
| **HC9** | Inline styles proibido |
| **HC10** | Testar viewer + print + export |

**Detalhes completos:** `../HARD_CONSTRAINTS.md`

---

## 🎨 PALETA DE CORES (Referência Rápida)

```css
/* OSTEOPOROSE */
--navy: #152432;    /* Títulos */
--gold: #DDB944;    /* Destaques */
--teal: #1F766E;    /* Clínico */
--bg: #F9F8F4;      /* Fundo */

/* GRADE */
--navy: #0b1320;    /* Títulos */
--gold: #d2b55b;    /* Destaques */
--teal: #0f766e;    /* Clínico */
--bg: #f8fafc;      /* Fundo */
```

**NUNCA usar cores hardcoded. Sempre `var(--nome)`.**

---

## ⚡ COMANDOS ÚTEIS

```bash
# Servidor local
npm run serve
# ou: python -m http.server 5500

# Lint
npm run lint          # Ver problemas
npm run lint:fix      # Corrigir automaticamente

# Export PDF
npm run export:osteoporose
npm run export:grade
```

---

## 📝 CHECKLIST ANTES DE COMMITAR

- [ ] CHANGELOG.md atualizado?
- [ ] Sem novos `!important`?
- [ ] Testou no viewer?
- [ ] Testou print mode (Ctrl+P)?
- [ ] Export PDF funciona?

---

## 🔗 LINKS

- **Repo:** https://github.com/lucasmiachon-blip/aulas_core
- **OSTEOPOROSE local:** http://127.0.0.1:5500/OSTEOPOROSE/src/index.html
- **GRADE local:** http://127.0.0.1:5500/GRADE/src/index.html

---

*Última atualização: 2026-02-02*
