# 📚 DOCUMENTAÇÃO DO PROJETO AULAS_CORE

**Última atualização:** 2026-01-19  
**Versão:** 1.0

---

## 🎯 COMEÇAR AQUI

Se você é uma IA (Claude/ChatGPT) trabalhando neste projeto, **leia primeiro**:

1. **`../README.md`** ← README da raiz (protocolo de 3 atores)
2. **Identifique seu papel:**
   - 🔧 Claude Técnico? → Leia `CLAUDE_ROLE.md`
   - 📚 Claude Conteúdo? → Leia `CLAUDE_ROLE.md` + `QUALITY.md`
   - 🎯 ChatGPT Auditor? → Leia `CLAUDE_SLIDES_CHECKLIST.md` + `QUALITY.md`

3. **Depois leia os documentos do SEU papel** (veja abaixo)

---

## 📖 ÍNDICE POR CATEGORIA

### 🤖 INSTRUÇÕES PARA IAs

| Documento | Tamanho | Para quem | Propósito |
|-----------|---------|-----------|-----------|
| **CLAUDE_ROLE.md** | 13 KB | Claude Técnico | Define responsabilidades e workflows |
| **CLAUDE_SLIDES_CHECKLIST.md** | 7 KB | Claude Técnico + ChatGPT | Checklist antes de criar slides |
| **AI_RULES.md** | 1.5 KB | TODOS | Regras rígidas (NUNCA quebrar) |
| **PROTOCOL_MAP.md** | 6.7 KB | TODOS | Mapa de responsabilidades (3 atores) |

### 🎨 DESIGN & VISUAL

| Documento | Tamanho | Para quem | Propósito |
|-----------|---------|-----------|-----------|
| **QUICK_PALETTE_REFERENCE.md** | 2 KB | TODOS | 🔥 **Referência rápida da paleta** |
| **PROMPT_PALETA_OFICIAL.md** | 8.5 KB | TODOS | Paleta completa com explicações |
| **STYLEGUIDE.md** | 635 B | TODOS | Regras de slide (1 mensagem, 10-sec rule) |
| **PRESENTATION_TECH.md** | 8 KB | Claude Técnico | Aspectos técnicos de apresentação |

### 📐 QUALIDADE & PADRÕES

| Documento | Tamanho | Para quem | Propósito |
|-----------|---------|-----------|-----------|
| **QUALITY.md** | 756 B | Claude Conteúdo + ChatGPT | Benchmarks (NEJM, JACC) + EBM |
| **TECHNICAL_QUALITY.md** | 6.7 KB | Claude Técnico + ChatGPT | WCAG, acessibilidade, performance |

### 🔄 WORKFLOW & PROCESSOS

| Documento | Tamanho | Para quem | Propósito |
|-----------|---------|-----------|-----------|
| **WORKFLOW.md** | 588 B | Claude Técnico | Git flow, commits, convenções |
| **CHANGELOG.md** | 18 KB | TODOS | Histórico completo de mudanças |
| **HANDOFF.md** | 17 KB | Claude Técnico | Último handoff (contexto sessão anterior) |

---

## 🚦 LEITURA OBRIGATÓRIA POR PAPEL

### 🔧 Claude Técnico (estrutura HTML/CSS/JS)

**Ordem de leitura:**
1. `CLAUDE_ROLE.md` ← Seu papel completo
2. `QUICK_PALETTE_REFERENCE.md` ← Paleta (SEMPRE use!)
3. `CLAUDE_SLIDES_CHECKLIST.md` ← Checklist ANTES de criar
4. `TECHNICAL_QUALITY.md` ← Qualidade técnica
5. `PRESENTATION_TECH.md` ← Aspectos técnicos
6. `AI_RULES.md` ← Regras rígidas
7. `WORKFLOW.md` ← Git, commits
8. `CHANGELOG.md` ← Histórico (para contexto)
9. `HANDOFF.md` ← Contexto da sessão anterior

**Tempo estimado:** ~20-25 min

---

### 📚 Claude Conteúdo (conteúdo médico/educacional)

**Ordem de leitura:**
1. `CLAUDE_ROLE.md` ← Seu papel (seção "Claude Conteúdo")
2. `QUICK_PALETTE_REFERENCE.md` ← **OBRIGATÓRIO** - você DEVE usar essa paleta
3. `QUALITY.md` ← Benchmarks EBM, educação adultos
4. `STYLEGUIDE.md` ← Design visual, hierarquia
5. `AI_RULES.md` ← Regras rígidas
6. `../GRADE/refs/sources.md` ← Fontes bibliográficas

**Tempo estimado:** ~15 min

**IMPORTANTE:** Você cria CONTEÚDO, mas usa a PALETA oficial (var(--navy), var(--gold), etc)!

---

### 🎯 ChatGPT Auditor (validação final)

**Ordem de leitura:**
1. `PROTOCOL_MAP.md` ← Entenda o workflow de 3 atores
2. `QUICK_PALETTE_REFERENCE.md` ← Paleta que deve ter sido usada
3. `QUALITY.md` ← Benchmarks EBM
4. `STYLEGUIDE.md` ← Regras de design
5. `TECHNICAL_QUALITY.md` ← Critérios técnicos
6. `CLAUDE_SLIDES_CHECKLIST.md` ← O que Claude deveria ter seguido

**Tempo estimado:** ~15 min

---

## 📋 CHEAT SHEET - REFERÊNCIAS RÁPIDAS

### Paleta de Cores
```css
--bg: #F9F8F4      /* Off-white */
--navy: #0B1320    /* Títulos */
--gold: #DDB944    /* Destaques */
--teal: #1F766E    /* Clínico */
--text: #222       /* Texto principal */
--muted: #666      /* Legendas */
```
👉 **Detalhes:** `QUICK_PALETTE_REFERENCE.md`

### Tipografia
- **Títulos:** Georgia (serif)
- **Corpo:** Lato (sans-serif)

👉 **Detalhes:** `STYLEGUIDE.md`

### Regras de Slide
- ✅ 1 mensagem por slide
- ✅ 10-second rule
- ✅ Fontes auditáveis
- ✅ NNT/NNH quando aplicável

👉 **Detalhes:** `QUALITY.md`, `STYLEGUIDE.md`

### Git Workflow
- Branch: `main` (sem branches paralelas)
- Commits: pequenos, frequentes, convenção `feat:`, `fix:`, `docs:`, `chore:`
- SEMPRE atualizar `CHANGELOG.md`

👉 **Detalhes:** `WORKFLOW.md`

---

## ❓ PERGUNTAS FREQUENTES

### "Qual paleta devo usar?"
→ `QUICK_PALETTE_REFERENCE.md` (versão rápida) ou `PROMPT_PALETA_OFICIAL.md` (completa)

### "Como faço commits?"
→ `WORKFLOW.md`

### "Quais são os benchmarks de qualidade?"
→ `QUALITY.md` (EBM + educação) + `TECHNICAL_QUALITY.md` (acessibilidade)

### "Posso criar conteúdo médico?"
→ Depende do seu papel! Veja `CLAUDE_ROLE.md` ou `PROTOCOL_MAP.md`

### "Posso inventar cores?"
→ **NÃO!** Leia `AI_RULES.md` + `QUICK_PALETTE_REFERENCE.md`

---

## 🔄 MANUTENÇÃO DESTE DOCUMENTO

**Atualizar quando:**
- Novos documentos forem adicionados em `/docs`
- Estrutura de responsabilidades mudar
- Novos benchmarks ou padrões forem estabelecidos

**Responsável:** Claude Técnico

---

## 📌 LINKS ÚTEIS

- **Repositório:** https://github.com/lucasmiachon-blip/aulas_core
- **HTML Preview (GRADE):** https://htmlpreview.github.io/?https://raw.githubusercontent.com/lucasmiachon-blip/aulas_core/main/GRADE/src/index.html
- **GRADE Working Group:** https://www.gradeworkinggroup.org
- **Diretriz SBC 2025:** https://abc.cardiol.br/

---

**FIM DO ÍNDICE**
