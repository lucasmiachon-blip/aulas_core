# Árvore do projeto (simplificada)

```
Aulas2/
├── .github/
│   └── workflows/
│       └── pages.yml
├── archive/
│   ├── js-obsolete/
│   │   └── (slide-loader, slide-system: init, slide-core, slide-navigation, slide-viewport)
│   ├── snapshots/
│   └── index-original-backup.html
├── docs/
│   ├── archive/
│   ├── ESSENTIAL/
│   ├── GUIDES/
│   ├── HISTORY/
│   ├── PROCESS/
│   ├── SECURITY/
│   └── … (BUGS, HANDOFF*.md, STATUS, WORKFLOW, etc.)
├── exports/          # PDF e ZIP gerados (gitignore)
├── GRADE/
│   ├── assets/
│   │   ├── img/
│   │   └── pdf/
│   ├── audit/
│   ├── dist/
│   │   └── index.html
│   ├── notes/
│   │   └── archive/
│   ├── refs/
│   └── src/
│       ├── assets/
│       │   └── figures/
│       ├── css/
│       │   └── (base, blocks, print, responsive-fix)
│       ├── js/
│       │   └── slides-simple.js
│       ├── slides/       # _list.txt, S01.html .. S59.html
│       └── index.html
├── OSTEOPOROSE/
│   ├── assets/
│   │   ├── img/
│   │   └── pdf/
│   ├── notes/
│   ├── refs/
│   └── src/
│       ├── blocks/
│       ├── css/
│       │   └── (base, blocks, print, viewer)
│       ├── js/
│       │   └── (blocks, navigation, slide-loader, viewer)
│       ├── partials/
│       ├── slides/       # _list.txt, _meta.json, S01_* .. S72_*
│       ├── index.html
│       ├── index-legacy.html
│       └── print.html
├── scripts/
│   ├── archive/
│   ├── export-grade-pdf.js
│   ├── export-osteoporose-pdf.js
│   ├── sync-grade-dist.js
│   ├── validate-slides.js
│   └── … (add-slide-ids, normalize-colors, sync_dashboard, etc.)
├── .cursorignore
├── .gitignore
├── CHANGELOG.md
├── DASHBOARD.xlsx
├── exportar-pdf-e-zip.ps1
├── ver-local.ps1
├── ver-local.bat
├── INICIAR-SERVIDOR.ps1
├── README.md
├── TREE.md
└── … (COMO_VER_ARQUIVOS, ISSUES, mvp-tracker, forcar-*, baixar-*, etc.)
```

## Pastas principais

| Pasta          | Conteúdo                                                                 |
|----------------|---------------------------------------------------------------------------|
| **GRADE/**     | Slides CORE GRADE: `src/slides` (S01..S59), `dist`, viewer, `audit`       |
| **OSTEOPOROSE/** | Slides Osteoporose: `src/slides` (S01..S72), viewer, `print.html`        |
| **docs/**      | Documentação, ESSENTIAL, GUIDES, handoffs, PROCESS, SECURITY             |
| **scripts/**   | `export-grade-pdf`, `export-osteoporose-pdf`, sync, validate, etc.        |
| **exports/**   | PDF e ZIP gerados (não versionado)                                        |
| **archive/**   | Backups e código obsoleto (js-obsolete, snapshots)                        |
