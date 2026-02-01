# aulas_core

## Osteoporose — PATCH0_6 (29/01/2026)

Este repositório inclui o módulo **OSTEOPOROSE/**. No PATCH0_6 foram aplicadas correções de **overflow** em slides com altura fixa no viewer (719px), além de validação de **encoding UTF-8**.

- Correções concentradas em `OSTEOPOROSE/src/slides/` (ajustes de padding/gaps/font-size).
- Slide `S35_slide-32.html` foi **dividido** e ganhou o novo `S35b_slide-32b.html` (ver `src/slides/_list.txt`).
- Viewer (`src/js/viewer.js`) **não foi alterado** neste patch.

Repositório de aulas médicas em HTML/CSS. Projeto ativo: **GRADE** (Diretriz Brasileira de Dislipidemias 2025).

**Deadline MVP:** 10 Fevereiro 2026  
**Viewer:** https://lucasmiachon-blip.github.io/aulas_core/grade/


## GRADE — Diagnóstico + P1 pass (2026-01-28)

Diagnóstico feito no **viewer PDF** (58 páginas; ordem baseada em `GRADE/src/slides/_list.txt`).

### P0 (resolver antes de apresentar)
- **S04 (p.4)** — *slide de interação*: placeholders `[QR CODE]` e sliders → **deixar para o final** (combinado).
- **S26 (p.41)** — *Comparativo de calculadoras*: nota interna (“este slide fica como apêndice…”) + excesso de espaço em branco → precisa conteúdo/estrutura.

### P1 aplicado nesta sessão (já feito)
- **S10/S11**: PT-BR + consistência: “Reassess” → **“Reavaliar”**; padronizado **“warranty period”**; ranges com **en-dash** (`&ndash;`).
- **S29/S41**: ranges numéricos com **en-dash** (ex.: `5–20%`, `5–10 anos`).
- **S47**: badge “Publication Bias” padronizado (**ALERTA**) + cor via token (`rgba(var(--navy-rgb), …)`).

**P1 v2 (2026-01-28):**
- **Ordem (viewer):** S51 logo após S09; S07/S08 após S10; S59 (poesia) após S57.
- **S18 (Imprecisão):** régua refeita como forest plot (escala linear + MID + RR 1,0).
- **S19/S20:** RoB 2.0 e EtD redesenhados para formato talk-ready (cards + síntese).
- **S49:** compactação de tipografia/espaçamento para caber com folga.
- **PDF safety:** rodapés sem `position:absolute` (flex + `margin-top:auto`) nos slides até o viewer 40.


### P1 pendente (backlog)
- **S02 (p.2)**: revisar/confirmar % de recomendações por **LOE C vs LOE A** (JAMA 2019) e alinhar texto.
- **S32 (p.47)**: “Validação brasileira já existe.” → **incluir referência** ou ajustar wording.
- **S53 (p.31)**: VESALIUS‑CV (data/NEJM) → checar e/ou reescrever como “atualização/living evidence” sem data fixa.

---

# 🤖 PARA ASSISTENTES DE IA (Claude, ChatGPT, Auto)

## ⚠️ LEIA PRIMEIRO - PROTOCOLO OBRIGATÓRIO

**Você está entrando neste projeto. ANTES de fazer QUALQUER coisa:**

1. **Identifique seu papel** (veja seção "Papéis e Responsabilidades" abaixo)
2. **Leia os documentos do seu papel** (lista está abaixo) ← **CRÍTICO: Evita "alucinações"**
3. **Entenda a estrutura** (veja seção "Estrutura do Projeto")
4. **Só então comece a trabalhar**

**⏱️ Tempo estimado:** 15-20 minutos (vale MUITO a pena!)

**NUNCA:**
- ❌ Criar arquivos sem aprovação
- ❌ Fazer commits sem aprovação (só Auto/Claude Técnico faz commits)
- ❌ Modificar código sem plano aprovado
- ❌ Inventar números, dados ou citações (use `[TBD]` se faltar)
- ❌ Usar cores hardcoded (`#333`, `#666`) - SEMPRE use `var(--nome)`
- ❌ Tocar em `OSTEOPOROSE/` sem demanda explícita (PATCH0_6 foi uma exceção aprovada para correção de overflow)

**SEMPRE:**
- ✅ Apresentar PLANO antes de executar
- ✅ Esperar aprovação explícita do usuário
- ✅ Usar paleta oficial (`var(--navy)`, `var(--gold)`, etc)
- ✅ **ATUALIZAR `CHANGELOG.md` em CADA commit** ← **OBRIGATÓRIO!**

---

## 📝 REGRA ABSOLUTA: CHANGELOG

**⚠️ CRÍTICO:** **TODA mudança DEVE ser documentada no `CHANGELOG.md` ANTES do commit.**

**Você (assistente) DEVE:**
1. **SEMPRE** atualizar `CHANGELOG.md` quando fizer QUALQUER mudança
2. **SEMPRE** ler a última entrada do CHANGELOG antes de começar a trabalhar
3. **SEMPRE** documentar o que foi feito, por quê, e o que NÃO foi feito (para evitar alucinações)

**Formato da entrada no CHANGELOG:**
- Data da sessão
- Objetivo da sessão
- O que foi feito (com detalhes técnicos)
- O que NÃO foi feito (se relevante)
- Arquivos modificados
- Commits relacionados

**📖 Exemplo:** Veja `CHANGELOG.md` - Seção `[2026-01-22] - Batch 1` como referência.

**NUNCA commite sem atualizar o CHANGELOG primeiro!**

---

## 📋 MUDANÇAS RECENTES (2026-01-22)

**⚠️ IMPORTANTE:** Antes de trabalhar, leia a última entrada do `CHANGELOG.md` para entender o contexto atual.

**Última sessão (Batch 1 - Slides 1-5):**
- ✅ **PDF Safety:** `print-color-adjust: exact` adicionado (NUNCA remover!)
- ✅ **Classe `.cardHeader`:** Criada para headers navy reutilizáveis (use em novos slides)
- ✅ **Correções de conteúdo:** S02 (números), S03 (layout vertical), S04 (gramática)
- ✅ **O que NÃO foi feito:** Documentado no CHANGELOG para evitar alucinações

**📖 Leia:** `CHANGELOG.md` - Seção `[2026-01-22] - Batch 1: Header Contrast + PDF Safety + Content Fixes`

---

## 🚨 PALETA OFICIAL - REGRA ABSOLUTA

**⚠️ CRÍTICO: Este projeto usa APENAS uma paleta profissional definida. NUNCA invente cores!**

### ✅ CORES PERMITIDAS (USE APENAS ESTAS):

```css
var(--navy)    /* #0B1320 - Títulos/base escura */
var(--gold)    /* #DDB944 - Destaques/ênfase */
var(--text)    /* #222 - Texto principal */
var(--muted)   /* #666 - Texto secundário */
var(--bg)      /* #F9F8F4 - Fundo padrão */
var(--white)   /* #FFFFFF - Cards */
var(--teal)    /* #1F766E - Clínico/dados */
var(--border)  /* #E9ECEF - Bordas */
var(--blue)    /* #2563EB - Suporte/informação */
```

### ❌ CORES PROIBIDAS (NUNCA USAR):

**Variáveis CSS problemáticas (NÃO EXISTEM mais):**
- ❌ `var(--success)` → Use `var(--teal)` ou `var(--gold)`
- ❌ `var(--warning)` → Use `var(--gold)`
- ❌ `var(--danger)` → Use `var(--navy)` ou `var(--text)`

**Cores hardcoded problemáticas (NUNCA usar):**
- ❌ `#10B981` (verde) → Use `var(--teal)`
- ❌ `#F59E0B` (laranja) → Use `var(--gold)`
- ❌ `#EF4444` (vermelho) → Use `var(--navy)`
- ❌ `#F97316` (laranja escuro) → Use `var(--gold)`
- ❌ `#2C5F2D` (verde escuro) → Use `var(--navy)` ou `var(--teal)`
- ❌ `#ECFDF5`, `#FEF3C7` (verde/amarelo claro) → Use `rgba()` com cores oficiais
- ❌ Qualquer `#XXXXXX` hardcoded → Use `var(--nome)`

**REGRA DE OURO:** Se você digitar `#` seguido de hex no HTML, VOCÊ ESTÁ ERRANDO!

**📖 Leia a paleta completa:** `docs/ESSENTIAL/PROMPT_PALETA_OFICIAL.md` ← **OBRIGATÓRIO ANTES DE CRIAR/MODIFICAR SLIDES**

---

---

## 🎭 PAPÉIS E RESPONSABILIDADES

Este projeto usa **3 assistentes diferentes** com responsabilidades distintas:

### 1. 🔧 CLAUDE DEV ⬅️ **Desenvolvedor Sênior + UI/UX Profissional + Professor**

**Você é Claude Dev se:**
- Está no Cursor (este chat)
- Foi chamado para resolver problemas técnicos
- Trabalha com HTML/CSS/JS, Git, estrutura
- É **desenvolvedor sênior + UI/UX profissional + professor paciente**

**⚠️ IMPORTANTE - LEIA ANTES DE COMEÇAR:**
**📖 `docs/ESSENTIAL/CLAUDE_DEV_ROLE.md`** ← **DOCUMENTO COMPLETO DO SEU PAPEL**

Este documento contém:
- ✅ Seu papel como parceiro técnico (não apenas executor)
- ✅ Protocolo de comunicação e ensino
- ✅ Foco em UI/UX profissional (design impecável obrigatório)
- ✅ Code review e validação de decisões

**LEITURA OBRIGATÓRIA (15-20 min):**
1. **`docs/ESSENTIAL/CLAUDE_DEV_ROLE.md`** ← **SEU DOCUMENTO PRINCIPAL**
2. `docs/ESSENTIAL/PROMPT_PALETA_OFICIAL.md` - Paleta de cores
3. `docs/ESSENTIAL/TECHNICAL_QUALITY.md` - Critérios técnicos
4. `docs/ESSENTIAL/AI_RULES.md` - Regras rígidas
5. `CHANGELOG.md` - Histórico (para contexto)

**RESUMO RÁPIDO:**
- ✅ Você resolve problemas técnicos
- ✅ Você **ENSINA** (explica POR QUÊ antes de COMO)
- ✅ Você faz code review profissional
- ✅ Você valida decisões técnicas
- ✅ Você NÃO cria conteúdo médico

**COMUNICAÇÃO COM OUTRAS IAs:**
- Se receber HTML de outra IA, valide paleta antes de commitar
- Se encontrar problema técnico, documente para outras IAs
- Use `docs/HANDOFF.md` para passar contexto entre sessões

---

### 2. 📚 CLAUDE CONTEÚDO ⬅️ **LEIA ESTE DOCUMENTO PRIMEIRO**

**Você é Claude Conteúdo se:**
- Está em outro chat/projeto (não no Cursor)
- Foi chamado para criar slides MÉDICOS
- Trabalha com conteúdo educacional

**⚠️ IMPORTANTE - LEIA ANTES DE COMEÇAR:**
**📖 `docs/ESSENTIAL/CLAUDE_CONTENT_ROLE.md`** ← **DOCUMENTO COMPLETO DO SEU PAPEL**

Este documento contém:
- ✅ O que você PODE e NÃO pode fazer
- ✅ Protocolo passo-a-passo para criar slides
- ✅ Exemplos de código correto e incorreto
- ✅ Checklist completo antes de entregar

**LEITURA OBRIGATÓRIA (15 min):**
1. **`docs/ESSENTIAL/CLAUDE_CONTENT_ROLE.md`** ← **SEU DOCUMENTO PRINCIPAL**
2. `docs/PROMPT_PALETA_OFICIAL.md` - **PALETA OFICIAL** (obrigatório!)
3. `docs/QUALITY.md` - EBM, educação de adultos
4. `docs/STYLEGUIDE.md` - Design visual
5. `GRADE/refs/sources.md` - Fontes bibliográficas

**RESUMO RÁPIDO:**
- ✅ Você cria CONTEÚDO médico em HTML
- ✅ Você USA paleta oficial (`var(--navy)`, `var(--gold)`, etc)
- ✅ Você NÃO faz commits (Claude Técnico faz)
- ✅ Você NÃO mexe em CSS/JS técnico

**Workflow:**
```
Você cria HTML → Claude Técnico valida → ChatGPT Auditor aprova → Claude Técnico commita
```

---

### 3. 🎯 CHATGPT AUDITOR ⬅️ **Guardião da Qualidade**

**Você é ChatGPT Auditor se:**
- Foi chamado para VALIDAR trabalho pronto
- Está revisando qualidade final
- Verifica se protocolos foram seguidos
- **NÃO cria nada**, apenas valida e aprova/reprova

**⚠️ IMPORTANTE - LEIA ANTES DE COMEÇAR:**
**📖 `docs/ESSENTIAL/CHATGPT_AUDITOR_ROLE.md`** ← **DOCUMENTO COMPLETO DO SEU PAPEL**

Este documento contém:
- ✅ Checklist completo de auditoria (paleta, acessibilidade, conteúdo, design, técnico)
- ✅ Modelo de feedback estruturado (aprovado/reprovado)
- ✅ Priorização de problemas (P0/P1/P2)
- ✅ Exemplos práticos de auditoria

**LEITURA OBRIGATÓRIA (15-20 min):**
1. **`docs/ESSENTIAL/CHATGPT_AUDITOR_ROLE.md`** ← **SEU DOCUMENTO PRINCIPAL**
2. `docs/ESSENTIAL/PROMPT_PALETA_OFICIAL.md` - Paleta oficial
3. `docs/ESSENTIAL/QUALITY.md` - Benchmarks de qualidade
4. `docs/ESSENTIAL/STYLEGUIDE.md` - Regras de design
5. `docs/ESSENTIAL/TECHNICAL_QUALITY.md` - Critérios técnicos

**RESUMO RÁPIDO:**
- ✅ Você audita TUDO (conteúdo + design + técnico)
- ✅ Você aprova ✅ ou reprova ❌ com feedback específico
- ✅ Você NÃO cria nem modifica arquivos
- ✅ Você é o guardião final da qualidade

---

## 💬 COMO AS IAs SE COMUNICAM

### Handoff entre sessões:
- Use `docs/HANDOFF.md` para passar contexto
- Documente o que foi feito e o que falta fazer
- Mencione problemas encontrados e soluções

### Validação de trabalho:
1. **Claude Conteúdo** cria HTML → entrega para **Claude Dev**
2. **Claude Dev** valida aspectos técnicos → entrega para **ChatGPT Auditor**
3. **ChatGPT Auditor** valida TUDO → aprova ✅ ou reprova ❌ com feedback
4. **Claude Dev** commita se aprovado (ou corrige se reprovado)

### Se encontrar problema:
- Documente em `docs/HANDOFF.md`
- Mencione qual IA deve resolver
- Seja específico sobre o problema

---

## 📁 ESTRUTURA DO PROJETO

```
aulas_core/
├── GRADE/                    ← PROJETO ATIVO (você trabalha aqui)
│   ├── src/                  ← ÁREA DE TRABALHO
│   │   ├── index.html        ← Template principal (40 linhas, carrega slides dinamicamente)
│   │   ├── slides/           ← SLIDES MODULARES (42 arquivos)
│   │   │   ├── S01.html      ← Slide 1 (Capa)
│   │   │   ├── S02.html      ← Slide 2
│   │   │   ├── ...           ← Slides 3-41
│   │   │   └── S42.html      ← Slide 42
│   │   ├── css/
│   │   │   ├── base.css      ← Paleta oficial (var(--cores))
│   │   │   ├── blocks.css    ← Estilos para tabelas/callouts (opcional)
│   │   │   └── responsive-fix.css
│   │   └── js/
│   │       ├── slide-loader.js ← Carregador dinâmico de slides (NOVO)
│   │       └── slide-system/  ← Sistema de slides modular
│   │           ├── slide-core.js
│   │           ├── slide-navigation.js
│   │           ├── slide-viewport.js
│   │           └── init.js
│   ├── dist/                 ← VERSÃO FINAL (gerado de src/)
│   │   └── index.html        ← Sincronizado automaticamente
│   ├── assets/               ← Imagens, QR codes, gráficos
│   ├── notes/                ← Anotações de desenvolvimento
│   └── refs/                 ← Referências bibliográficas
│       └── sources.md
│
├── OSTEOPOROSE/              ← READ-ONLY (não tocar sem permissão)
│
├── docs/                     ← PROTOCOLOS E GUIAS
│   ├── CLAUDE_ROLE.md        ← Papel do Claude Técnico
│   ├── PROMPT_PALETA_OFICIAL.md ← Paleta completa (OBRIGATÓRIO)
│   ├── QUALITY.md            ← EBM, educação de adultos
│   ├── STYLEGUIDE.md         ← Design visual
│   ├── TECHNICAL_QUALITY.md  ← Qualidade técnica
│   ├── AI_RULES.md           ← Regras rígidas
│   ├── WORKFLOW.md           ← Git, commits
│   ├── HANDOFF.md            ← Contexto entre sessões
│   └── CHANGELOG.md          ← Histórico completo
│
└── scripts/                  ← Scripts de automação
    ├── export-grade-pdf.js    ← Gera PDF das slides
    └── sync-grade-dist.js     ← Sincroniza src/ → dist/
```

---

## 🎨 PALETA OFICIAL (OBRIGATÓRIA) - DETALHES COMPLETOS

**⚠️ ATENÇÃO: Esta seção é um resumo. Leia `docs/ESSENTIAL/PROMPT_PALETA_OFICIAL.md` para detalhes completos!**

### ✅ USE APENAS ESTAS CORES (ATUAL):

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

**📋 Nova paleta preparada (pós-MVP):**  
Paleta "Swiss Neutral Professional" já está no CSS base (`GRADE/src/css/base.css`) como preparação.  
Migração completa será feita após MVP (10 Fevereiro).  
**Para detalhes:** Ver `docs/ESSENTIAL/PALETA_MIGRATION_PLAN.md`

### ❌ NUNCA USE:
- `#333333`, `#000000`, `#666` (hardcoded)
- `#FF0000`, `#00FF00` (cores primárias puras)
- `#10B981`, `#F59E0B`, `#EF4444` (cores problemáticas que foram removidas)
- `var(--success)`, `var(--warning)`, `var(--danger)` (variáveis que NÃO EXISTEM mais)
- Qualquer cor fora da lista oficial

**REGRA DE OURO:** Se você digitar `#` seguido de hex no HTML, VOCÊ ESTÁ ERRANDO!

**SEMPRE use:** `var(--navy)`, `var(--gold)`, `var(--text)`, etc.

### 📖 TIPOGRAFIA:
- **Títulos:** Georgia (serif) — autoridade acadêmica
- **Corpo:** Lato (sans-serif) — legibilidade premium

---

## 🚀 COMO USAR

### Visualizar Localmente:
```bash
# Opção 1: Servidor local
cd aulas_core
python -m http.server 8000
# Abra: http://localhost:8000/GRADE/src/

# Opção 2: Arquivo direto
# Abra: GRADE/src/index.html no navegador

# Opção 3: GitHub Pages (produção)
# https://lucasmiachon-blip.github.io/aulas_core/grade/
```

### Sincronizar src/ → dist/:
```bash
cd scripts
npm run sync-grade
```

### Gerar PDF:
```bash
cd scripts
npm run export-grade
```

---

## 📋 STATUS ATUAL

### Aula GRADE:
- **Objetivo:** Metodologia GRADE aplicada à Diretriz Brasileira de Dislipidemia 2025
- **Status:** MVP em desenvolvimento
- **Score de qualidade:** 26/30 ✅
- **Temas:** CAC, PREVENT, SAMS & Bempedoic Acid, LDL-C Targets

### Estrutura GRADE:
- ✅ Core GRADE: 8 domínios fundamentais
- ✅ **Modularização completa:** 42 slides em arquivos separados (2026-01-19)
- ⏳ GRADEs Adicionais: Modelos preditivos, diretrizes
- ⏳ Exemplos SBC 2025: Casos práticos brasileiros

### 🆕 Modularização de Slides:
- **Status:** ✅ Completo (2026-01-19)
- **Slides:** 42 arquivos em `GRADE/src/slides/` (S01.html a S42.html)
- **Carregamento:** Dinâmico via `slide-loader.js`
- **Benefícios:** Manutenibilidade, versionamento individual, colaboração paralela

---

## ⚙️ WORKFLOW RECOMENDADO

### Para criar um novo slide:

**1. Claude Conteúdo (outro projeto):**
- Define conteúdo médico
- Aplica andragogia
- **USA paleta oficial** (`var(--navy)`, `var(--gold)`, etc)
- Entrega HTML com `var(--nome)` correto

**2. Auto/Claude Técnico (aqui):**
- Recebe HTML do Claude Conteúdo
- Valida paleta (`var(--nome)` usado?)
- Valida tipografia (Georgia + Lato?)
- Valida acessibilidade (contraste?)
- Faz commit + atualiza CHANGELOG
- Entrega para auditoria

**3. ChatGPT Auditor:**
- Recebe slide pronto
- Valida TUDO (paleta, conteúdo, design)
- Aprova ✅ ou reprova ❌ com feedback

---

## ✅ VALIDAÇÃO RÁPIDA

### Paleta correta?
```bash
# Buscar cores hardcoded (deve retornar VAZIO)
grep -o '#[0-9A-Fa-f]\{6\}' GRADE/src/index.html

# Se vazio: ✅ Seguiu protocolo
# Se retornar algo: ❌ Quebrou regra
```

### Checklist rápido:
- [ ] Usa `var(--nome)` ao invés de `#XXXXXX`? ✅
- [ ] Tipografia: Georgia (títulos) + Lato (corpo)? ✅
- [ ] Contraste WCAG AA (≥ 4.5:1)? ✅
- [ ] 10-second rule aplicado? ✅

---

## 🔒 REGRAS RÍGIDAS (HARD RULES)

1. **Work ONLY on branch `main`** (never create branches)
2. **Never request, print, store, or leak tokens/credentials**
3. **`OSTEOPOROSE/` is LOCK (read-only)** - não tocar sem permissão
4. **Changes must be small and auditable**
5. **🚨 EVERY commit MUST update `CHANGELOG.md` FIRST** ← **LEIA A SEÇÃO "REGRA ABSOLUTA: CHANGELOG" ACIMA**
6. **Never invent numbers or citations** (use `[TBD]` if missing)
7. **ALWAYS use `var(--nome)` for colors** (never hardcoded `#XXXXXX`)

**Allowed operations:**
- Technical fixes (GRADE only)
- Bonus slides (append-only at the end)
- Git commits with proper messages

---

## 🔍 PROCESSO DE AUDITORIA (AUTO/Cursor AI)

**⚠️ OBRIGATÓRIO:** Auto (Cursor AI) deve auditar TODAS as mudanças antes de commitar.

### Checklist Rápido:

1. **Cores hardcoded?**
   ```bash
   grep -o '#[0-9A-Fa-f]\{6\}' GRADE/src/index.html
   # Deve retornar VAZIO
   ```

2. **Estrutura OK?**
   - Caminhos corretos?
   - Referências não quebradas?
   - Arquivos não utilizados removidos?

3. **Sincronização?**
   - Se mudou `src/`, executou `npm run sync-grade`?

4. **CHANGELOG atualizado?**
   - `CHANGELOG.md` foi atualizado?

5. **Regras rígidas?**
   - Sem tokens/senhas?
   - Sem dados inventados?
   - OSTEOPOROSE não tocado?

### 📖 Documento Completo:
**Leia:** `docs/PROCESSO_AUDITORIA_AUTO.md` ← **OBRIGATÓRIO antes de cada commit**

### 💬 Comunicação:
Se encontrar problemas durante auditoria:
1. Listar problemas encontrados
2. Explicar impacto
3. Sugerir correções
4. **Aguardar aprovação do usuário antes de corrigir**

**NUNCA commite sem auditar primeiro!**

---

## 📋 HANDOFF ENTRE SESSÕES

**Para IAs iniciando nova sessão, ler PRIMEIRO:**

**🔧 Claude Técnico (este projeto - estrutura):**
- `docs/HANDOFF_SESSAO_2026_01_20.md` ← Último handoff técnico completo
- `CHANGELOG.md` ← Histórico completo de mudanças

**📚 Claude de Conteúdo (outro projeto - conteúdo médico):**
- `docs/HANDOFF_CONTEUDO_2026_01_20.md` ← **Último handoff de conteúdo** (status atualizado)
- `CHANGELOG.md` ← Histórico completo de mudanças
- `GRADE/refs/sources.md` ← Fontes bibliográficas

**O handoff técnico contém:**
- Contexto do que foi feito na última sessão técnica
- Status atual do projeto (número de slides, estrutura)
- Protocolo de trabalho reafirmado (o que posso/não posso fazer)
- Próximas tarefas estruturais potenciais

**O handoff de conteúdo contém:**
- Status atual do conteúdo médico (45 slides)
- Slides criados recentemente (S43-S46 sobre SAMS/Bempedóico)
- Problemas de conteúdo identificados ([TBD], inconsistências)
- Próximas ações para correção de conteúdo
- Análise de auditoria referenciada

---

## 📚 RECURSOS

- [Diretriz SBC Dislipidemia 2025](https://abc.cardiol.br/)
- [GRADE Working Group](https://www.gradeworkinggroup.org/)
- Documentação local em `GRADE/refs/`
- Paleta oficial em `docs/PROMPT_PALETA_OFICIAL.md`

---

**Última atualização:** Janeiro 2026  
**Versão da aula GRADE:** v0.2 (MVP em desenvolvimento)  
**Score de qualidade:** 26/30 ✅

## GRADE — PATCH 2.8 (28/01/2026)

Ajustes do **P1** (revisão visual/narrativa) nos slides 1–36:

- **Ordem:** S07 e S08 movidos para depois do S09 (fluxo do bloco CAC).
- **Slides 21–23:** CLEAR Outcomes + MID + Imprecisão com melhor contraste e símbolos mais “clean”.
- **Slide 27:** fechamento SAMS com menos texto, mais respiro e dourado menos agressivo.
- **Docs:** CHANGELOG e README atualizados.


## GRADE — PATCH 2.10 (2026-01-31)

Batch de **refino visual** nos slides **26–36 (viewer)**, mantendo o texto: hierarquia tipográfica, espaçamentos, contraste, paleta e consistência dos cards/tabelas.

Também fiz um ajuste pequeno no CSS global: removi `!important` do tamanho de `h2` para permitir controle por slide, e removi um token inválido em `blocks.css` para evitar comportamento imprevisível do parser.

Slides mexidos neste batch: S20, S48, S49, S50, S52, S53, S54, S55, S56, S57, S59.
