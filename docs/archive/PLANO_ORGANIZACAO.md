# 📋 PLANO DE ORGANIZAÇÃO E LIMPEZA DO PROJETO

**Data:** 2024-12-28  
**Objetivo:** Revisar estrutura, remover redundâncias, organizar documentação

---

## 🔍 ANÁLISE ATUAL

### Documentos na pasta `docs/` (35 arquivos)

#### ✅ MANTER (Documentos essenciais):
1. `README.md` - Índice navegável
2. `CHANGELOG.md` - Histórico completo
3. `AI_RULES.md` - Regras obrigatórias
4. `CLAUDE_ROLE.md` - Papéis e responsabilidades
5. `CLAUDE_SLIDES_CHECKLIST.md` - Checklist para criação de slides
6. `PROMPT_PALETA_OFICIAL.md` - Paleta oficial (fonte única)
7. `TECHNICAL_QUALITY.md` - Padrões técnicos
8. `PRESENTATION_TECH.md` - Setup de apresentação
9. `WORKFLOW.md` - Fluxo de trabalho
10. `PROTOCOL_MAP.md` - Mapa de protocolos
11. `PROCESSO_AUDITORIA_AUTO.md` - Processo de auditoria
12. `AUDITORIA_TEMPLATE.md` - Template de auditoria
13. `ESTRUTURA_PATHS.md` - Estrutura de caminhos
14. `GITHUB_TOKEN.md` - Segurança de tokens
15. `COMO_ABRIR_LOCAL.md` - Guia de desenvolvimento local
16. `COMO_SINCRONIZAR.md` - Guia de sincronização

#### 🔄 CONSOLIDAR (Múltiplos arquivos sobre mesmo tema):

**Grupo 1: Debug/Navegação (5 arquivos → 1 arquivo)**
- `DEBUG_NAVEGACAO.md`
- `DIAGNOSTICO_NAVEGACAO.md`
- `RELATORIO_DEBUG_NAVEGACAO.md`
- `INVESTIGACAO_LISTENERS.md`
- `P0_CORRECOES.md`
- **→ Consolidar em:** `docs/archive/TROUBLESHOOTING_HISTORICO.md`

**Grupo 2: Análises Técnicas (4 arquivos → 1 arquivo)**
- `ANALISE_BLOCKS_CSS.md`
- `ANALISE_JAVASCRIPT.md`
- `ANALISE_REDUNDANCIAS.md`
- `AUDIT_CAMINHOS_E_REDUNDANCIAS.md`
- **→ Consolidar em:** `docs/archive/ANALISES_TECNICAS_HISTORICO.md`

**Grupo 3: Guias de Paleta (3 arquivos → 1 arquivo)**
- `GUIA_BLOCKS_CSS.md` → Manter (guia de uso)
- `QUICK_PALETTE_REFERENCE.md` → Consolidar em `PROMPT_PALETA_OFICIAL.md`
- `PROMPT_PALETA_OFICIAL.md` → Manter (fonte única)

**Grupo 4: Status/Verificação Temporários (2 arquivos → archive)**
- `STATUS_SYNC.md` → `docs/archive/`
- `VERIFICACAO_ALINHAMENTO.md` → `docs/archive/`

**Grupo 5: Modularização (2 arquivos → 1 arquivo)**
- `MODULARIZACAO_SLIDES.md` → Manter (histórico importante)
- `MODULARIZACAO_CI_CD_PLAN.md` → Manter (plano futuro)

**Grupo 6: Handoff (1 arquivo → archive)**
- `HANDOFF.md` → `docs/archive/` (histórico de sessões)

**Grupo 7: Quality/Standards (2 arquivos → verificar redundância)**
- `QUALITY.md` → Verificar se é diferente de `TECHNICAL_QUALITY.md`
- `TECHNICAL_QUALITY.md` → Manter
- `STYLEGUIDE.md` → Manter (se diferente)

---

### Código JavaScript Obsoleto

#### ❌ REMOVER (Sistema antigo substituído):
- `GRADE/src/js/slide-loader.js` (substituído por `slides-simple.js`)
- `GRADE/src/js/slide-system/` (pasta inteira substituída)
  - `init.js`
  - `slide-core.js`
  - `slide-navigation.js`
  - `slide-viewport.js`

#### ✅ MANTER:
- `GRADE/src/js/slides-simple.js` (sistema atual)

---

### Scripts de Validação

#### 🔄 CONSOLIDAR ou ARCHIVE:
- `scripts/add-slide-ids.js` → Manter (útil)
- `scripts/debug-slides.js` → Archive (debug temporário)
- `scripts/extract-slides.js` → Archive (já executado)
- `scripts/update-slide-list.js` → Manter (útil)
- `scripts/validate-navigation.js` → Archive (debug temporário)
- `scripts/validate-slides.js` → Manter (útil)

---

### Arquivos de Backup

#### 🔄 MOVER para archive:
- `GRADE/src/index-original-backup.html` → `archive/`
- `GRADE/src/js/slide-loader.js` → `archive/` (se quiser manter histórico)
- `GRADE/src/js/slide-system/` → `archive/` (se quiser manter histórico)

---

## 📁 NOVA ESTRUTURA PROPOSTA

```
docs/
├── README.md                    # Índice navegável (ATUALIZAR)
├── CHANGELOG.md                 # Histórico completo
│
├── ESSENTIAL/                   # Documentos essenciais
│   ├── AI_RULES.md
│   ├── CLAUDE_ROLE.md
│   ├── CLAUDE_SLIDES_CHECKLIST.md
│   ├── PROMPT_PALETA_OFICIAL.md
│   ├── TECHNICAL_QUALITY.md
│   ├── STYLEGUIDE.md
│   └── PRESENTATION_TECH.md
│
├── GUIDES/                      # Guias de uso
│   ├── COMO_ABRIR_LOCAL.md
│   ├── COMO_SINCRONIZAR.md
│   ├── GUIA_BLOCKS_CSS.md
│   ├── WORKFLOW.md
│   └── PROTOCOL_MAP.md
│
├── PROCESS/                      # Processos e templates
│   ├── PROCESSO_AUDITORIA_AUTO.md
│   ├── AUDITORIA_TEMPLATE.md
│   └── ESTRUTURA_PATHS.md
│
├── SECURITY/                     # Segurança
│   └── GITHUB_TOKEN.md
│
├── HISTORY/                      # Histórico e planos
│   ├── MODULARIZACAO_SLIDES.md
│   └── MODULARIZACAO_CI_CD_PLAN.md
│
└── archive/                      # Arquivos históricos
    ├── TROUBLESHOOTING_HISTORICO.md
    ├── ANALISES_TECNICAS_HISTORICO.md
    ├── HANDOFF.md
    ├── STATUS_SYNC.md
    └── VERIFICACAO_ALINHAMENTO.md
```

---

## 🎯 AÇÕES PROPOSTAS

### Fase 1: Criar estrutura de pastas
- [ ] Criar `docs/ESSENTIAL/`
- [ ] Criar `docs/GUIDES/`
- [ ] Criar `docs/PROCESS/`
- [ ] Criar `docs/SECURITY/`
- [ ] Criar `docs/HISTORY/`
- [ ] Criar `docs/archive/`

### Fase 2: Consolidar documentos
- [ ] Consolidar 5 arquivos de debug em 1
- [ ] Consolidar 4 arquivos de análise em 1
- [ ] Consolidar `QUICK_PALETTE_REFERENCE.md` em `PROMPT_PALETA_OFICIAL.md`
- [ ] Mover arquivos temporários para archive

### Fase 3: Remover código obsoleto
- [ ] Remover `GRADE/src/js/slide-loader.js`
- [ ] Remover `GRADE/src/js/slide-system/` (pasta inteira)
- [ ] Mover backups para `archive/`

### Fase 4: Organizar scripts
- [ ] Mover scripts de debug para `scripts/archive/`
- [ ] Manter apenas scripts úteis

### Fase 5: Atualizar referências
- [ ] Atualizar `docs/README.md` com nova estrutura
- [ ] Atualizar links em outros documentos
- [ ] Verificar se há referências quebradas

---

## ⚠️ AVISOS

1. **Backup antes de remover:** Fazer commit antes de deletar arquivos
2. **Verificar dependências:** Alguns documentos podem ser referenciados
3. **Manter histórico:** Mover para archive ao invés de deletar
4. **Testar após mudanças:** Verificar se nada quebrou

---

**Status:** 📋 Plano criado - Aguardando aprovação para executar
