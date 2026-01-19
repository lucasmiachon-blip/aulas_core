# aulas_core

---

# 🚨 ATENÇÃO CLAUDE / CHATGPT (IA ASSISTANTS)

## ⚠️ PROTOCOLO OBRIGATÓRIO DE ENTRADA

**ANTES DE FAZER QUALQUER COISA, LEIA PRIMEIRO:**

### 📖 ORDEM OBRIGATÓRIA:
1. **Esta seção completa** ← **VOCÊ ESTÁ AQUI!**
2. Identifique seu PAPEL (Claude Técnico / Claude Conteúdo / ChatGPT Auditor)
3. Leia os documentos do SEU papel
4. Só então comece a trabalhar

---

## 🎭 TRÊS PAPÉIS, TRÊS RESPONSABILIDADES

Este projeto tem **DIVISÃO CLARA** de trabalho entre 3 assistentes:

### 🔧 1. CLAUDE TÉCNICO (chat estrutura)

**Você é Claude Técnico se:**
- Está no chat sobre estrutura HTML/CSS/JS
- Foi chamado para resolver problemas de código
- Trabalha com Git, paleta CSS, performance

**SUA RESPONSABILIDADE:**
- ✅ Estrutura técnica (HTML/CSS/JS)
- ✅ Paleta profissional (`var(--navy)`, `var(--gold)`, etc)
- ✅ Controle de qualidade TÉCNICO (acessibilidade, performance, compatibilidade)
- ✅ Git, commits, CHANGELOG
- ✅ Encoding UTF-8
- ✅ Exportação PDF, modo apresentador
- ❌ **NÃO** cria conteúdo médico

**LEIA OBRIGATORIAMENTE:**
1. `docs/CLAUDE_ROLE.md` ← Seu papel completo
2. `docs/CLAUDE_SLIDES_CHECKLIST.md` ← Checklist ANTES de criar slides
3. `docs/PROMPT_PALETA_OFICIAL.md` ← Paleta completa
4. `docs/TECHNICAL_QUALITY.md` ← Qualidade técnica
5. `docs/PRESENTATION_TECH.md` ← Aspectos técnicos de apresentação
6. `docs/AI_RULES.md` ← Regras rígidas
7. `docs/CHANGELOG.md` ← Histórico (para contexto)

---

### 📚 2. CLAUDE CONTEÚDO (outro projeto)

**Você é Claude Conteúdo se:**
- Está no projeto sobre conteúdo educacional
- Foi chamado para criar/revisar slides MÉDICOS
- Trabalha com andragogia, design educacional

**SUA RESPONSABILIDADE:**
- ✅ Conteúdo médico (GRADE, evidências, guidelines)
- ✅ Andragogia (educação de adultos)
- ✅ Design educacional (ink ratio, cognitive load)
- ✅ Estrutura de aula (timing, blocos, pausas)
- ✅ Casos clínicos, exercícios
- ✅ **USA a paleta oficial** (var(--navy), var(--gold), etc)
- ❌ **NÃO** mexe em código HTML/CSS/JS diretamente

**LEIA OBRIGATORIAMENTE:**
1. `docs/PROMPT_PALETA_OFICIAL.md` ← **PALETA OFICIAL** (você DEVE usar)
2. `docs/QUALITY.md` ← EBM, educação de adultos
3. `docs/STYLEGUIDE.md` ← Design visual, hierarquia
4. `GRADE/refs/sources.md` ← Fontes bibliográficas
5. Este README (seção "Aula GRADE - Status Atual")

**IMPORTANTE:** Você cria CONTEÚDO, mas usa a PALETA oficial!

---

### 🎯 3. CHATGPT AUDITOR (terceiro)

**Você é ChatGPT Auditor se:**
- Foi chamado para VALIDAR trabalho pronto
- Está revisando qualidade final
- Verifica SE outros seguiram protocolos

**SUA RESPONSABILIDADE:**
- ✅ Auditar conteúdo médico (precisão, fontes)
- ✅ Auditar design (paleta, hierarquia, ink ratio)
- ✅ Auditar acessibilidade (contraste, daltonismo)
- ✅ Auditar andragogia (10-second rule, cognitive load)
- ✅ Aprovar ou REPROVAR com feedback específico

**LEIA OBRIGATORIAMENTE:**
1. `docs/PROMPT_PALETA_OFICIAL.md` ← Paleta oficial
2. `docs/QUALITY.md` ← Benchmarks de qualidade
3. `docs/STYLEGUIDE.md` ← Regras de design
4. `docs/TECHNICAL_QUALITY.md` ← Critérios técnicos
5. `docs/CLAUDE_SLIDES_CHECKLIST.md` ← O que Claude Técnico deveria ter seguido

**CHECKLIST DE AUDITORIA:**
- [ ] Paleta correta? (var(--) usado, sem #XXXXXX hardcoded?)
- [ ] Contraste WCAG AA/AAA? (≥ 4.5:1)
- [ ] Conteúdo médico preciso? (fontes auditáveis?)
- [ ] 10-second rule aplicado? (mensagem clara?)
- [ ] Hierarquia visual clara?
- [ ] Ink ratio adequado? (sem chartjunk?)
- [ ] NNT/NNH incluídos quando aplicável?

---

## 🔴 REGRAS CRÍTICAS (TODOS OS PAPÉIS):

- ❌ **NUNCA EXPOR TOKENS/CHAVES/SENHAS DE API**
- ❌ **NÃO criar arquivos sem aprovação**
- ❌ **NÃO fazer commits sem aprovação** (só Claude Técnico faz commits)
- ❌ **NÃO modificar código sem plano aprovado**
- ❌ **NUNCA inventar números, dados, citações**
- ✅ **SEMPRE apresentar PLANO primeiro**
- ✅ **SEMPRE esperar aprovação explícita do Professor**
- ✅ **SEMPRE usar paleta oficial** (`var(--navy)`, `var(--gold)`, etc)

---

# 📚 Estrutura do Repositório

Este repositório contém **duas aulas**:

* **GRADE** (em desenvolvimento ativo)
* **OSTEOPOROSE** (estável - **READ-ONLY**, não modificar sem permissão)

---

## 🗂️ Organização

Cada aula tem **duas pastas principais**:

* **`src/`** → Edição (onde trabalhamos e modificamos)
* **`dist/`** → Entrega (versão estável para apresentação)

> **Política:** `dist/` só recebe conteúdo estável vindo de `src/`

---

## 📋 Aula GRADE - Status Atual

### Objetivo
Criar apresentação completa sobre **metodologia GRADE** aplicada à Diretriz Brasileira de Dislipidemia 2025.

### Estratégia de Desenvolvimento
1. **Fase Atual:** Construir conteúdo em HTML/CSS
   - Mais fácil para editar e visualizar
   - Permite iteração rápida
   - Design responsivo e modular

2. **Fase Futura:** Converter para PowerPoint (.pptx)
   - Exportação final para apresentação
   - Compatível com ferramentas corporativas

### Temas Principais (4 THREADS)
- **CAC** (Escore de Cálcio Coronariano)
- **PREVENT** (Calculadora de Risco AHA)
- **SAMS & Bempedoic Acid** (Intolerância a estatinas)
- **LDL-C Targets** (Metas agressivas e segurança)

### Estrutura GRADE
- ✅ **Core GRADE:** 8 domínios fundamentais
- ⏳ **GRADEs Adicionais:** Modelos preditivos, diretrizes
- ⏳ **Exemplos SBC 2025:** Casos práticos brasileiros

### Score de Qualidade
**Meta:** ≥ 25/30  
**Atual:** 26/30 ✅

---

## 🎨 PALETA PROFISSIONAL OBRIGATÓRIA

### ✅ CORES OFICIAIS (use APENAS estas):

```css
:root {
    --bg: #F9F8F4;      /* Off-white - fundo padrão */
    --navy: #0B1320;    /* Navy - títulos/base escura */
    --gold: #DDB944;    /* Gold - destaques/ênfase */
    --text: #222;       /* Cinza escuro - texto principal */
    --muted: #666;      /* Cinza médio - legendas */
    --border: #E9ECEF;  /* Cinza claro - bordas */
    --teal: #1F766E;    /* Teal - clínico/dados */
    --blue: #2563EB;    /* Azul - suporte */
    --white: #FFFFFF;   /* Branco - cards */
}
```

### 🎯 TIPOGRAFIA:
- **Títulos:** Georgia (serif)
- **Corpo:** Lato (sans-serif)

### ❌ CORES PROIBIDAS:
```
#333333, #000000, #666 (hardcoded)
#FF0000, #00FF00 (cores primárias puras)
#2C5F2D, #D32F2F, #F57C00, #7E57C2
Qualquer cor fora da lista oficial
```

**REGRA DE OURO:** Se você digitar `#` seguido de hex no HTML, VOCÊ ESTÁ ERRANDO!

---

## 🗂️ Estrutura de Arquivos GRADE

```
GRADE/
├── src/                    ← ÁREA DE TRABALHO
│   ├── css/
│   │   ├── base.css       ← Definição das var(--cores) OFICIAIS
│   │   └── responsive-fix.css
│   ├── js/
│   │   └── slide-system/
│   │       ├── slide-core.js
│   │       ├── slide-navigation.js
│   │       ├── slide-viewport.js
│   │       └── init.js
│   └── index.html         ← Arquivo principal
│
├── dist/                   ← VERSÃO FINAL
│   └── index.html         ← (gerado de src/)
│
├── assets/                ← Imagens, QR codes, gráficos
├── notes/                 ← Anotações de desenvolvimento
│   └── archive/           ← Handoffs antigos
└── refs/                  ← Referências bibliográficas
    └── sources.md

docs/                      ← PROTOCOLOS E GUIAS
├── CLAUDE_ROLE.md         ← Papel do Claude Técnico
├── CLAUDE_SLIDES_CHECKLIST.md ← Checklist obrigatório
├── PROMPT_PALETA_OFICIAL.md   ← Paleta completa
├── QUICK_PALETTE_REFERENCE.md ← Versão curta
├── TECHNICAL_QUALITY.md       ← Qualidade técnica
├── PRESENTATION_TECH.md       ← Aspectos de apresentação
├── QUALITY.md                 ← EBM + educação adultos
├── STYLEGUIDE.md              ← Design visual
├── PROTOCOL_MAP.md            ← Mapa de responsabilidades
├── AI_RULES.md                ← Regras rígidas
├── WORKFLOW.md                ← Git, commits
└── CHANGELOG.md               ← Histórico completo
```

---

## 🚀 Como Usar

### Visualizar a Aula Localmente

**Opção 1 - Servidor Local (RECOMENDADO):**
```bash
cd aulas_core
python -m http.server 8000
```
Depois abra: `http://localhost:8000/GRADE/src/`

**Opção 2 - Arquivo Direto:**
Abra diretamente: `GRADE/src/index.html` no navegador

**Opção 3 - GitHub Pages (Produção):**
https://lucasmiachon-blip.github.io/aulas_core/grade/

---

## 👨‍💻 Desenvolvimento com IAs

### Claude Técnico (estrutura)
- **Metodologia:**
  - Explicação completa antes de qualquer ação
  - Commits profissionais e organizados
  - Sem branches desnecessários
  - Código limpo e documentado
  - **SEMPRE** atualiza `docs/CHANGELOG.md`

### Claude Conteúdo (outro projeto)
- **Metodologia:**
  - Cria conteúdo médico baseado em evidências
  - Aplica andragogia e design educacional
  - **USA paleta oficial** (var(--navy), var(--gold), etc)
  - NÃO mexe em código HTML/CSS/JS

### ChatGPT (auditor)
- **Metodologia:**
  - Valida se protocolos foram seguidos
  - Verifica paleta, design, conteúdo
  - Aprova ou reprova com feedback específico

---

## ⚠️ Regras Importantes

### ✅ PODE:
- Modificar qualquer arquivo em `GRADE/src/`
- Criar novos slides
- Atualizar CSS e JavaScript
- Adicionar referências e notas

### ❌ NÃO PODE:
- **Tocar em OSTEOPOROSE** (pasta completa bloqueada)
- Criar branches sem explicação
- Fazer commits sem documentação
- Alterar estrutura sem aprovação
- **Usar cores hardcoded** (#333, #666, etc)
- Inventar dados, números, citações

---

## 📅 Timeline

**Prazo:** 20 dias para conclusão do MVP

**Foco atual:**
- Finalizar slides técnicos (estrutura)
- Validar paleta e qualidade
- Preparar para apresentação

---

## 📖 Recursos

- [Diretriz SBC Dislipidemia 2025](https://abc.cardiol.br/)
- [GRADE Working Group](https://www.gradeworkinggroup.org/)
- Documentação local em `GRADE/refs/`

---

## 📝 WORKFLOW RECOMENDADO

### Para criar um novo slide:

**PASSO 1 - Claude Conteúdo (outro projeto):**
1. Define conteúdo médico
2. Aplica andragogia
3. Calcula cognitive load
4. Estrutura hierarquia
5. **USA paleta oficial** (var(--navy), var(--gold), etc)
6. Entrega HTML com `var(--nome)` correto

**PASSO 2 - Claude Técnico (aqui):**
1. Recebe HTML do Claude Conteúdo
2. Valida paleta (`var(--nome)` usado?)
3. Valida tipografia (Georgia + Lato?)
4. Valida acessibilidade (contraste?)
5. Faz commit + atualiza CHANGELOG
6. Entrega para auditoria

**PASSO 3 - ChatGPT (auditor):**
1. Recebe slide pronto
2. Valida TUDO (paleta, conteúdo, design)
3. Aprova ✅ ou reprova ❌ com feedback

---

## 🎯 VALIDAÇÃO RÁPIDA

### Claude Técnico seguiu paleta?
```bash
# Buscar cores hardcoded (deve retornar VAZIO)
grep -o '#[0-9A-Fa-f]\{6\}' GRADE/src/index.html

# Se vazio: ✅ Seguiu protocolo
# Se retornar algo: ❌ Quebrou regra
```

### Claude Conteúdo usou paleta correta?
- Código tem `var(--navy)`, `var(--gold)`, etc? ✅
- Código tem `#333`, `#666`, `#2C2C2C`? ❌

### ChatGPT pode aprovar?
- Paleta correta? ✅
- Conteúdo médico preciso? ✅
- Design educacional aplicado? ✅
- Contraste WCAG AA? ✅
- 10-second rule? ✅

---

## 🚨 EXECUTOR POLICY (Claude Técnico)

**HARD RULES:**
1. Work ONLY on branch `main` (never create branches)
2. **Never request, print, store, or leak tokens/credentials**
3. `OSTEOPOROSE/` is **LOCK (read-only)**
4. Changes must be small and auditable
5. Every commit MUST update `docs/CHANGELOG.md`
6. Never invent numbers or citations (use **[TBD]** if missing)
7. **ALWAYS use `var(--nome)` for colors** (never hardcoded #XXXXXX)

**Allowed operations:**
- Technical fixes (GRADE only)
- Bonus slides (append-only at the end)
- Git commits with proper messages

---

**Última atualização:** Janeiro 2026  
**Versão da aula GRADE:** v0.2 (MVP em desenvolvimento)  
**Score de qualidade:** 26/30 ✅
