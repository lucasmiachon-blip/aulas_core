# 📋 MAPA DOS PROTOCOLOS - AULAS_CORE

## 🎯 DIVISÃO DE RESPONSABILIDADES

### 🔧 AQUI (Claude) - ESTRUTURA TÉCNICA

**Responsabilidade:** Garantir paleta, estrutura de código, organização
**NÃO cuida:** Conteúdo educacional profundo, andragogia detalhada

**Arquivos que EU sigo:**
- `docs/CLAUDE_SLIDES_CHECKLIST.md` ← Checklist obrigatório antes de criar slides
- `docs/CLAUDE_ROLE.md` ← Minhas responsabilidades e limites
- `docs/PROMPT_PALETA_OFICIAL.md` ← Paleta completa com exemplos
- `docs/AI_RULES.md` ← Regras rígidas (tokens, branches, etc)

**O que EU garanto:**
- ✅ Cores corretas (`var(--navy)`, `var(--gold)`, etc)
- ✅ Tipografia (Georgia + Lato)
- ✅ Estrutura de arquivos organizada
- ✅ UTF-8, encoding correto
- ✅ Commits limpos com CHANGELOG atualizado

---

### 🎨 OUTRO CHAT (ChatGPT?) - CONTEÚDO + DESIGN

**Responsabilidade:** Conteúdo educacional, design visual, andragogia
**NÃO cuida:** Cores técnicas CSS, estrutura de arquivos

**Protocolos que DEVEM seguir:**

#### 1. Design Visual
- **Ink ratio** (Tufte - minimizar tinta desnecessária)
- **Chartjunk** (evitar ornamentos que não agregam)
- **Hierarquia visual:** título > mensagem > evidência > nota
- **Acessibilidade:** funcionar em escala de cinza
- **Teoria das cores:** contraste, legibilidade

**Fonte:** `docs/STYLEGUIDE.md`

#### 2. Conteúdo Educacional
- **10-second rule:** público entende mensagem principal em ~10s
- **1 mensagem por slide:** uma ideia principal
- **Carga cognitiva:** reduzir texto, usar exemplos
- **Segmentação:** blocos curtos, objetivos claros
- **Recuperação:** perguntas rápidas, mini-resumos

**Fonte:** `docs/QUALITY.md` + `docs/STYLEGUIDE.md`

#### 3. Evidence-Based Medicine
- Separar **certeza da evidência** vs **força da recomendação**
- Incluir **NNT/NNH** com horizonte temporal
- Fonte auditável em `refs/sources.md`

**Fonte:** `docs/QUALITY.md`

#### 4. Andragogia (Educação de Adultos)
- Aplicação prática imediata
- Experiências prévias como base
- Autonomia do aprendiz
- Resolução de problemas reais

**Fonte:** Conceitual em `docs/QUALITY.md` (checklist básico)
**Nota:** Protocolo completo de andragogia parece estar no outro chat

---

## 📊 STATUS ATUAL DOS PROTOCOLOS

### ✅ COMPLETOS E DOCUMENTADOS:

#### Estrutura Técnica (Claude):
- ✅ `CLAUDE_SLIDES_CHECKLIST.md` - Checklist obrigatório
- ✅ `CLAUDE_ROLE.md` - Papel e responsabilidades
- ✅ `PROMPT_PALETA_OFICIAL.md` - Paleta completa
- ✅ `QUICK_PALETTE_REFERENCE.md` - Referência rápida
- ✅ `AI_RULES.md` - Regras rígidas
- ✅ `WORKFLOW.md` - Git, commits, convenções
- ✅ `README.md` - Atualizado com todas as regras

#### Design + Qualidade:
- ✅ `STYLEGUIDE.md` - Paleta, tipografia, regras de slide
- ✅ `QUALITY.md` - Benchmarks, EBM, educação de adultos (básico)

---

### ⚠️ PARCIALMENTE DOCUMENTADOS:

#### Protocolos de Design Avançado:
- ⚠️ **Ink ratio** - Mencionado, mas sem métricas específicas
- ⚠️ **Número de caracteres por slide** - Não documentado
- ⚠️ **Cognitive load específico** - Conceitual, sem métricas
- ⚠️ **Teoria das cores** (contraste, saturação) - Básico no STYLEGUIDE

**Onde deve estar:** No outro chat (ChatGPT) com protocolo mais detalhado

#### Andragogia Detalhada:
- ⚠️ **Princípios básicos** - Mencionados em QUALITY.md
- ⚠️ **Aplicação prática** - Não documentado em detalhes
- ⚠️ **Técnicas específicas** - Não documentado

**Onde deve estar:** No outro chat (ChatGPT) aplicando na criação de conteúdo

---

## 🔄 WORKFLOW RECOMENDADO

### Para criar um novo slide:

#### PASSO 1 - Conteúdo (ChatGPT):
1. Aplicar protocolo de design avançado
2. Aplicar andragogia
3. Definir mensagem principal (10-second rule)
4. Calcular carga cognitiva
5. Estruturar hierarquia visual
6. **Usar paleta oficial** (`var(--navy)`, etc)

#### PASSO 2 - Validação Técnica (Claude):
1. Verificar se usou `var(--nome)` corretamente
2. Verificar tipografia (Georgia + Lato)
3. Verificar rodapé com fonte
4. Fazer commit + atualizar CHANGELOG

---

## 📁 ONDE ESTÁ CADA COISA

```
aulas_core/
├── docs/
│   ├── CLAUDE_SLIDES_CHECKLIST.md    ← Claude lê SEMPRE antes de criar
│   ├── CLAUDE_ROLE.md                ← Responsabilidades do Claude
│   ├── PROMPT_PALETA_OFICIAL.md      ← Paleta completa
│   ├── QUICK_PALETTE_REFERENCE.md    ← Versão curta para ChatGPT
│   ├── STYLEGUIDE.md                 ← Design: paleta, tipografia, regras
│   ├── QUALITY.md                    ← EBM + educação adultos (básico)
│   ├── WORKFLOW.md                   ← Git, commits
│   ├── AI_RULES.md                   ← Regras rígidas
│   └── CHANGELOG.md                  ← Histórico de mudanças
│
├── GRADE/
│   ├── src/
│   │   ├── css/base.css             ← Definição das var(--cores)
│   │   ├── index.html               ← Slides (onde aplicar protocolo)
│   │   └── js/                      ← Sistema de navegação
│   └── refs/
│       └── sources.md               ← Fontes bibliográficas
│
└── README.md                         ← Overview geral + links

```

---

## ✅ VALIDAÇÃO RÁPIDA

### Claude está seguindo?
```bash
# Buscar cores hardcoded (deve retornar VAZIO)
grep -o '#[0-9A-Fa-f]\{6\}' GRADE/src/index.html | grep -v "var(--"

# Se retornar algo: ❌ Claude errou
# Se retornar vazio: ✅ Claude seguiu protocolo
```

### ChatGPT está seguindo?
- 10-second rule aplicado? (mensagem principal clara)
- 1 mensagem por slide?
- Carga cognitiva baixa? (texto mínimo)
- Fonte auditável no rodapé?
- Usou `var(--nome)` para cores?

---

## 🎯 CONCLUSÃO

### Divisão clara:
- **Claude (aqui):** Estrutura técnica, paleta, código limpo
- **ChatGPT (outro chat):** Conteúdo, design avançado, andragogia

### Documentação:
- **Completa:** Aspectos técnicos (paleta, git, estrutura)
- **Básica:** Design e educação (princípios gerais)
- **Avançada:** No workflow do outro chat (ink ratio detalhado, andragogia aplicada)

### Próximo passo para completar docs:
Se quiser documentar o protocolo completo de design/andragogia usado no outro chat:
1. Criar `docs/DESIGN_AVANCADO.md` (ink ratio, caracteres, cognitive load)
2. Criar `docs/ANDRAGOGIA.md` (técnicas específicas de educação de adultos)
3. Atualizar QUALITY.md com métricas específicas

Mas isso é **opcional** - o workflow atual (Claude técnica + ChatGPT conteúdo) já funciona!

---

**Última atualização:** 2026-01-19
