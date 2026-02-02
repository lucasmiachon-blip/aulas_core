# 📁 Estrutura Proposta vs Estrutura Atual

## 🎯 Análise da Proposta

### Estrutura Proposta (Monorepo Organizado):
```
aulas_core/
├── .github/workflows/
├── GRADE/
│   ├── dist/
│   ├── src/
│   ├── docs/          ← NOVO: documentação projeto-específica
│   └── assets/
├── OSTEOPOROSE/
│   ├── dist/
│   ├── src/
│   └── docs/
├── shared/            ← NOVO: componentes reutilizáveis
├── learning/          ← NOVO: material de estudo
├── docs/              ← Documentação geral (mantém)
└── README.md
```

### Estrutura Atual (Simples):
```
aulas_core/
├── .github/workflows/
├── GRADE/
│   ├── dist/
│   ├── src/
│   ├── assets/
│   ├── notes/
│   └── refs/
├── OSTEOPOROSE/
├── docs/              ← Documentação geral
└── scripts/
```

---

## ✅ RECOMENDAÇÃO: Abordagem Híbrida (MVP + Futuro)

### FASE 1: MVP (Até 10 Fevereiro) - **MANTER SIMPLES**

**Não mudar nada agora:**
- ✅ Estrutura atual está funcional
- ✅ Foco em entregar conteúdo
- ✅ Não adicionar complexidade desnecessária

**Regra:** "Done > Perfect" - MVP primeiro, estrutura depois

---

### FASE 2: Pós-MVP (Depois de 10 Fevereiro) - **EXPANDIR GRADUALMENTE**

#### Mudanças Recomendadas (em ordem de prioridade):

**1. GRADE/docs/ (Alta Prioridade)**
```
GRADE/
├── docs/
│   ├── ROADMAP.md        ← Roadmap específico do projeto
│   ├── DESIGN_SYSTEM.md  ← Sistema de design (cores, tipografia)
│   └── ARCHITECTURE.md   ← Arquitetura técnica
```

**Benefício:** Documentação projeto-específica isolada

**Quando fazer:** Após MVP, quando houver tempo para documentar

---

**2. shared/ (Média Prioridade)**
```
shared/
├── components/
│   └── slide-template.html
├── utils/
│   └── color-utils.js
└── styles/
    └── common.css
```

**Benefício:** Reutilização entre projetos (GRADE + OSTEOPOROSE)

**Quando fazer:** Quando identificar padrões repetidos entre projetos

**Cuidado:** Não criar prematuramente (YAGNI - You Aren't Gonna Need It)

---

**3. learning/ (Baixa Prioridade - Futuro)**
```
learning/
├── javascript/
├── react/
├── design/
└── projects/
```

**Benefício:** Material de estudo organizado

**Quando fazer:** Quando usuário começar a estudar sistematicamente

**Nota:** Pode ser repo separado (`learning-notes`)

---

## 🎯 PLANO DE MIGRAÇÃO (SE QUISER FAZER DEPOIS DO MVP)

### Passo 1: Criar GRADE/docs/ (1-2 horas)
```bash
mkdir GRADE/docs
# Mover documentação específica de GRADE para lá
# Manter docs/ geral para repo-wide
```

**Migrar:**
- `GRADE/notes/` → `GRADE/docs/`
- Criar `GRADE/docs/ROADMAP.md`
- Criar `GRADE/docs/DESIGN_SYSTEM.md`

### Passo 2: Identificar Componentes Compartilhados (2-4 horas)
- Analisar GRADE e OSTEOPOROSE
- Identificar padrões repetidos
- Mover para `shared/` apenas se houver 3+ usos

### Passo 3: learning/ (opcional, repo separado)
- Criar repo `learning-notes` separado
- Mais simples de manter
- Não polui repo de produção

---

## ⚠️ REGRAS DE OURO

**1. YAGNI (You Aren't Gonna Need It)**
- Não criar estrutura "para o futuro"
- Criar quando precisar, não antes

**2. MVP First**
- Foco em entregar conteúdo até 10 Fevereiro
- Estrutura é secundária

**3. Evolução Gradual**
- Mudar pouco por vez
- Validar cada mudança antes de continuar

**4. Documentar Decisões**
- Se criar pasta nova: documentar POR QUÊ
- Atualizar este arquivo quando mudar estrutura

---

## 📊 DECISÃO FINAL

**AGORA (MVP):**
- ✅ **MANTER estrutura atual**
- ✅ Foco total em conteúdo
- ✅ Não adicionar complexidade

**DEPOIS DO MVP:**
- 📋 Revisar este documento
- 📋 Priorizar mudanças conforme necessidade real
- 📋 Migrar gradualmente

---

**Última atualização:** 2026-01-20  
**Status:** Proposta analisada, implementação pós-MVP