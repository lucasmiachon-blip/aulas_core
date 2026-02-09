# Aulas2

Repositório de aulas médicas em HTML/CSS. Slides modulares com viewer interativo, export PDF/PPTX via Playwright.

## Projetos

| Projeto | Tema | Slides (main) | Status |
|---------|------|---------------|--------|
| **GRADE** | Metodologia GRADE + Dislipidemia SBC 2025 | 34 (+ FAQ/appendix) | Ativo |
| **OSTEOPOROSE** | Osteoporose + GIOP | 46 (+ 25 appendix) | Ativo |

## Estrutura

```
Aulas2/
├── GRADE/src/              ← Slides GRADE
│   ├── slides/             ← Arquivos HTML modulares
│   ├── css/                ← base.css, blocks.css, print.css
│   ├── js/                 ← slides-simple.js (viewer)
│   └── index.html          ← Viewer principal
├── OSTEOPOROSE/src/        ← Slides Osteoporose
│   ├── slides/             ← Arquivos HTML modulares
│   ├── css/                ← base.css, blocks.css, print.css
│   ├── js/                 ← viewer.js, slide-loader.js
│   └── index.html          ← Viewer principal
├── scripts/                ← Export PDF, screenshots, automação
├── exports/                ← PDFs e ZIPs gerados
├── docs/                   ← Guias e referências (legacy)
├── CLAUDE.md               ← Prompt compacto + hard constraints
├── chatgpt.md              ← Playbook ChatGPT
└── CHANGELOG.md            ← Histórico de mudanças
```

## Quick Start

```bash
# Visualizar localmente
python -m http.server 8000
# GRADE: http://localhost:8000/GRADE/src/
# OSTEO: http://localhost:8000/OSTEOPOROSE/src/

# Ou no Windows:
powershell -File INICIAR-SERVIDOR.ps1

# Gerar PDF (requer Node.js + Playwright)
cd scripts && npm install && npx playwright install chromium
npm run export-grade
npm run export-osteo
```

## Tech Stack

- **Slides:** HTML/CSS vanilla com inline styles + CSS variables
- **Viewer:** JS custom (hash navigation, dynamic slide loading)
- **Export:** Playwright (PDF, screenshots), PptxGenJS (PPTX)
- **Paleta:** `--navy`, `--gold`, `--teal`, `--cream` (ver CLAUDE.md)

## Para Assistentes de IA

Leia `CLAUDE.md` antes de qualquer ação. Contém:
- Hard constraints (HC1-HC11)
- Anti-padrões fatais
- Design tokens
- Checklists obrigatórios
- Registro de erros

Restrições técnicas de CSS/JS: `scripts/AI-RESTRICTIONS.md`

---

*Atualizado: Fevereiro 2026*
