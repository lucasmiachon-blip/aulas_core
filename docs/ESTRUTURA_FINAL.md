# 📁 ESTRUTURA FINAL DO PROJETO

**Data:** 2024-12-28  
**Status:** Proposta de organização

---

## 📂 VISUALIZAÇÃO COMPLETA

```
aulas_core/
│
├── 📄 README.md                          # README principal (raiz)
├── 📄 DEV_CONCEPTS_AND_SESSION.md        # Conceitos de desenvolvimento
│
├── 📁 config/
│   └── github-token.txt                  # Token (ignorado por Git)
│
├── 📁 archive/
│   └── snapshots/                        # Backups de HTML antigos
│       ├── grade_dist_placeholder.html
│       ├── osteoporose_dist_placeholder.html
│       └── ... (outros backups)
│
├── 📁 exports/
│   └── GRADE-slides.pdf                  # PDF exportado
│
├── 📁 GRADE/
│   ├── 📄 AUDITORIA-SLIDES.md            # Relatório de auditoria
│   │
│   ├── 📁 assets/
│   │   ├── img/                          # Imagens do projeto
│   │   └── pdf/                          # PDFs de referência
│   │
│   ├── 📁 audit/                         # Documentação de auditoria
│   │   ├── AUDIT_PROMPT.md
│   │   ├── AUDIT_SLIDES.md
│   │   ├── COMO_VER_SLIDES.md
│   │   ├── INSTRUCOES.md
│   │   ├── README.md
│   │   ├── REFERENCIAS_GRADE.md
│   │   ├── RESUMO_FINAL.md
│   │   └── VISUALIZACAO_SLIDES.md
│   │
│   ├── 📁 dist/
│   │   └── index.html                    # Versão para GitHub Pages
│   │
│   ├── 📁 notes/                         # Notas do projeto
│   │   ├── decisions.md
│   │   ├── outline.md
│   │   ├── ATUALIZ_CLAUDE_ROLE.md
│   │   ├── PROMPT_PARA_CURSOR.md
│   │   └── archive/
│   │       ├── HANDOFF_ATUALIZADO_LIMITACOES.md
│   │       ├── HANDOFF_PROXIMO_CHAT.md
│   │       └── HANDOFF_SAMS_BEMPEDOICO.md
│   │
│   ├── 📁 refs/                          # Referências e fontes
│   │   ├── sources.md
│   │   ├── PESQUISA_PREVENT_GRADE_COMPLETA.md
│   │   └── RECURSOS_GRADE_PREVENT.md
│   │
│   └── 📁 src/                           # Código fonte
│       ├── 📄 index.html                 # HTML principal
│       ├── 📄 index-original-backup.html → MOVER para archive/
│       │
│       ├── 📁 css/
│       │   ├── base.css                  # CSS base
│       │   ├── blocks.css                # Componentes reutilizáveis
│       │   ├── print.css                 # Estilos para PDF
│       │   └── responsive-fix.css        # Ajustes responsivos
│       │
│       ├── 📁 js/
│       │   └── slides-simple.js          # ✅ Sistema atual (ÚNICO)
│       │
│       │   # ❌ REMOVER (sistema antigo):
│       │   # ├── slide-loader.js
│       │   # └── slide-system/
│       │   #     ├── init.js
│       │   #     ├── slide-core.js
│       │   #     ├── slide-navigation.js
│       │   #     └── slide-viewport.js
│       │
│       └── 📁 slides/                    # Slides individuais (41 arquivos)
│           ├── _list.txt
│           ├── S01.html
│           ├── S02.html
│           ├── ...
│           └── S42.html
│
├── 📁 OSTEOPOROSE/                       # 🔒 LOCK (não modificar)
│   └── ... (estrutura similar a GRADE)
│
├── 📁 scripts/                           # Scripts utilitários
│   ├── 📄 package.json
│   ├── 📄 README.md
│   │
│   ├── ✅ MANTER (úteis):
│   │   ├── export-grade-pdf.js           # Gerar PDF
│   │   ├── sync-grade-dist.js            # Sincronizar dist/
│   │   ├── add-slide-ids.js              # Adicionar IDs aos slides
│   │   ├── update-slide-list.js          # Atualizar lista de slides
│   │   └── validate-slides.js            # Validar slides
│   │
│   └── 📁 archive/                       # Scripts temporários
│       ├── debug-slides.js
│       ├── extract-slides.js
│       └── validate-navigation.js
│
└── 📁 docs/                              # 📚 DOCUMENTAÇÃO ORGANIZADA
    │
    ├── 📄 README.md                      # Índice navegável da documentação
    ├── 📄 CHANGELOG.md                   # Histórico completo de mudanças
    │
    ├── 📁 ESSENTIAL/                     # 🎯 Documentos essenciais
    │   ├── AI_RULES.md                   # Regras obrigatórias para IAs
    │   ├── CLAUDE_ROLE.md                # Papéis e responsabilidades
    │   ├── CLAUDE_SLIDES_CHECKLIST.md    # Checklist pré-criação
    │   ├── PROMPT_PALETA_OFICIAL.md      # Paleta oficial completa
    │   ├── TECHNICAL_QUALITY.md          # Padrões técnicos
    │   ├── STYLEGUIDE.md                 # Regras de slide
    │   └── PRESENTATION_TECH.md          # Setup de apresentação
    │
    ├── 📁 GUIDES/                        # 📖 Guias de uso
    │   ├── COMO_ABRIR_LOCAL.md           # Como abrir localmente
    │   ├── COMO_SINCRONIZAR.md           # Como sincronizar
    │   ├── GUIA_BLOCKS_CSS.md            # Guia de componentes CSS
    │   ├── WORKFLOW.md                   # Fluxo de trabalho
    │   └── PROTOCOL_MAP.md               # Mapa de protocolos
    │
    ├── 📁 PROCESS/                       # 🔄 Processos e templates
    │   ├── PROCESSO_AUDITORIA_AUTO.md    # Processo de auditoria
    │   ├── AUDITORIA_TEMPLATE.md         # Template de auditoria
    │   └── ESTRUTURA_PATHS.md            # Estrutura de caminhos
    │
    ├── 📁 SECURITY/                      # 🔐 Segurança
    │   └── GITHUB_TOKEN.md               # Segurança de tokens
    │
    ├── 📁 HISTORY/                       # 📜 Histórico e planos
    │   ├── MODULARIZACAO_SLIDES.md       # Histórico da modularização
    │   └── MODULARIZACAO_CI_CD_PLAN.md   # Plano futuro CI/CD
    │
    └── 📁 archive/                       # 📦 Histórico arquivado
        ├── TROUBLESHOOTING_HISTORICO.md  # (consolidado de 5 arquivos)
        ├── ANALISES_TECNICAS_HISTORICO.md # (consolidado de 4 arquivos)
        ├── HANDOFF.md                    # Handoffs antigos
        ├── STATUS_SYNC.md                # Status temporários
        ├── VERIFICACAO_ALINHAMENTO.md    # Verificações temporárias
        └── QUALITY.md                    # (se duplicado)
```

---

## 📊 COMPARAÇÃO: ANTES vs DEPOIS

### ANTES (Desorganizado):
```
docs/
├── 35 arquivos misturados
├── Múltiplos documentos sobre mesmo tema
├── Arquivos temporários misturados com permanentes
├── Código obsoleto no src/
└── Sem estrutura clara
```

### DEPOIS (Organizado):
```
docs/
├── ESSENTIAL/      (7 arquivos essenciais)
├── GUIDES/         (5 guias de uso)
├── PROCESS/        (3 processos)
├── SECURITY/       (1 arquivo de segurança)
├── HISTORY/        (2 planos históricos)
└── archive/        (histórico consolidado)
```

**Total:** ~18 arquivos principais organizados + histórico em archive

---

## 🎯 BENEFÍCIOS DA NOVA ESTRUTURA

### ✅ Organização clara
- Documentos essenciais separados de históricos
- Guias agrupados por propósito
- Histórico consolidado em archive

### ✅ Redução de redundâncias
- **-9 arquivos** consolidados (5 debug + 4 análises)
- **-5 arquivos JS** obsoletos removidos
- **-2 arquivos** temporários arquivados

### ✅ Navegação mais fácil
- Estrutura de pastas intuitiva
- README.md atualizado com índice
- Fácil encontrar documentos por categoria

### ✅ Manutenção simplificada
- Código obsoleto removido
- Histórico preservado mas separado
- Scripts organizados por utilidade

---

## 📋 RESUMO DE AÇÕES

### ✅ MANTER (Documentos ativos):
- **7 documentos essenciais** → `docs/ESSENTIAL/`
- **5 guias** → `docs/GUIDES/`
- **3 processos** → `docs/PROCESS/`
- **1 segurança** → `docs/SECURITY/`
- **2 históricos** → `docs/HISTORY/`

### 🔄 CONSOLIDAR (Redundâncias):
- **5 arquivos de debug** → 1 arquivo em `archive/`
- **4 arquivos de análise** → 1 arquivo em `archive/`

### ❌ REMOVER (Obsoleto):
- `GRADE/src/js/slide-loader.js`
- `GRADE/src/js/slide-system/` (pasta inteira)

### 📦 ARQUIVAR (Histórico):
- **2 arquivos temporários** → `docs/archive/`
- **Scripts de debug** → `scripts/archive/`
- **Backups** → `archive/`

---

## 🚀 PRÓXIMOS PASSOS

1. ✅ Criar estrutura de pastas
2. ✅ Mover e consolidar documentos
3. ✅ Remover código obsoleto
4. ✅ Atualizar README.md
5. ✅ Atualizar links quebrados
6. ✅ Fazer commit

---

**Status:** 📋 Estrutura proposta - Aguardando aprovação para executar
