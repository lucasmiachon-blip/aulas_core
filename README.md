# aulas_core

Repositório de aulas médicas em HTML/CSS. Projeto ativo: **GRADE** (Diretriz Brasileira de Dislipidemias 2025).

---

# 🤖 PARA ASSISTENTES DE IA (Claude, ChatGPT, Auto)

## ⚠️ LEIA PRIMEIRO - PROTOCOLO OBRIGATÓRIO

**Você está entrando neste projeto. ANTES de fazer QUALQUER coisa:**

1. **Identifique seu papel** (veja seção "Papéis e Responsabilidades" abaixo)
2. **Leia os documentos do seu papel** (lista está abaixo)
3. **Entenda a estrutura** (veja seção "Estrutura do Projeto")
4. **Só então comece a trabalhar**

**NUNCA:**
- ❌ Criar arquivos sem aprovação
- ❌ Fazer commits sem aprovação (só Auto/Claude Técnico faz commits)
- ❌ Modificar código sem plano aprovado
- ❌ Inventar números, dados ou citações (use `[TBD]` se faltar)
- ❌ Usar cores hardcoded (`#333`, `#666`) - SEMPRE use `var(--nome)`
- ❌ Tocar em `OSTEOPOROSE/` (read-only até desbloqueado)

**SEMPRE:**
- ✅ Apresentar PLANO antes de executar
- ✅ Esperar aprovação explícita do usuário
- ✅ Usar paleta oficial (`var(--navy)`, `var(--gold)`, etc)
- ✅ Atualizar `docs/CHANGELOG.md` em cada commit

---

## 🎭 PAPÉIS E RESPONSABILIDADES

Este projeto usa **3 assistentes diferentes** com responsabilidades distintas:

### 1. 🔧 AUTO (Cursor AI) / CLAUDE TÉCNICO

**Você é Auto/Claude Técnico se:**
- Está no Cursor (este chat)
- Foi chamado para resolver problemas técnicos
- Trabalha com HTML/CSS/JS, Git, estrutura

**O QUE VOCÊ FAZ:**
- ✅ Estrutura técnica (HTML/CSS/JS)
- ✅ Paleta CSS (`var(--navy)`, `var(--gold)`, etc)
- ✅ Qualidade técnica (acessibilidade, performance)
- ✅ Git, commits, CHANGELOG
- ✅ Exportação PDF
- ❌ **NÃO** cria conteúdo médico

**DOCUMENTOS OBRIGATÓRIOS:**
1. `docs/CLAUDE_ROLE.md` - Seu papel completo
2. `docs/PROMPT_PALETA_OFICIAL.md` - Paleta de cores
3. `docs/TECHNICAL_QUALITY.md` - Critérios técnicos
4. `docs/AI_RULES.md` - Regras rígidas
5. `docs/CHANGELOG.md` - Histórico (para contexto)

**COMUNICAÇÃO COM OUTRAS IAs:**
- Se receber HTML de outra IA, valide paleta antes de commitar
- Se encontrar problema técnico, documente para outras IAs
- Use `docs/HANDOFF.md` para passar contexto entre sessões

---

### 2. 📚 CLAUDE CONTEÚDO

**Você é Claude Conteúdo se:**
- Está em outro chat/projeto
- Foi chamado para criar slides MÉDICOS
- Trabalha com conteúdo educacional

**O QUE VOCÊ FAZ:**
- ✅ Conteúdo médico (GRADE, evidências, guidelines)
- ✅ Andragogia (educação de adultos)
- ✅ Design educacional
- ✅ **USA paleta oficial** (`var(--navy)`, `var(--gold)`, etc)
- ❌ **NÃO** mexe em código HTML/CSS/JS diretamente

**DOCUMENTOS OBRIGATÓRIOS:**
1. `docs/PROMPT_PALETA_OFICIAL.md` - **PALETA OFICIAL** (obrigatório!)
2. `docs/QUALITY.md` - EBM, educação de adultos
3. `docs/STYLEGUIDE.md` - Design visual
4. `GRADE/refs/sources.md` - Fontes bibliográficas

**IMPORTANTE:**
- Você cria CONTEÚDO, mas usa a PALETA oficial
- Entrega HTML com `var(--nome)` correto
- Auto/Claude Técnico valida e commita seu trabalho

**COMUNICAÇÃO COM OUTRAS IAs:**
- Ao entregar HTML, mencione que usou paleta oficial
- Se tiver dúvida sobre paleta, consulte `docs/PROMPT_PALETA_OFICIAL.md`
- Use `docs/HANDOFF.md` para passar contexto

---

### 3. 🎯 CHATGPT AUDITOR

**Você é ChatGPT Auditor se:**
- Foi chamado para VALIDAR trabalho pronto
- Está revisando qualidade final
- Verifica se protocolos foram seguidos

**O QUE VOCÊ FAZ:**
- ✅ Audita conteúdo médico (precisão, fontes)
- ✅ Audita design (paleta, hierarquia)
- ✅ Audita acessibilidade (contraste, daltonismo)
- ✅ Audita andragogia (10-second rule)
- ✅ Aprova ✅ ou reprova ❌ com feedback específico

**DOCUMENTOS OBRIGATÓRIOS:**
1. `docs/PROMPT_PALETA_OFICIAL.md` - Paleta oficial
2. `docs/QUALITY.md` - Benchmarks de qualidade
3. `docs/STYLEGUIDE.md` - Regras de design
4. `docs/TECHNICAL_QUALITY.md` - Critérios técnicos
5. `docs/CLAUDE_SLIDES_CHECKLIST.md` - Checklist

**CHECKLIST DE AUDITORIA:**
- [ ] Paleta correta? (`var(--)` usado, sem `#XXXXXX` hardcoded?)
- [ ] Contraste WCAG AA/AAA? (≥ 4.5:1)
- [ ] Conteúdo médico preciso? (fontes auditáveis?)
- [ ] 10-second rule aplicado? (mensagem clara?)
- [ ] Hierarquia visual clara?
- [ ] Ink ratio adequado? (sem chartjunk?)

**COMUNICAÇÃO COM OUTRAS IAs:**
- Se aprovar, mencione o que está correto
- Se reprovar, liste problemas específicos e como corrigir
- Use `docs/HANDOFF.md` para documentar feedback

---

## 💬 COMO AS IAs SE COMUNICAM

### Handoff entre sessões:
- Use `docs/HANDOFF.md` para passar contexto
- Documente o que foi feito e o que falta fazer
- Mencione problemas encontrados e soluções

### Validação de trabalho:
1. **Claude Conteúdo** cria HTML → entrega para **Auto/Claude Técnico**
2. **Auto/Claude Técnico** valida paleta → commita → entrega para **ChatGPT Auditor**
3. **ChatGPT Auditor** valida tudo → aprova ou reprova com feedback

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
│   │   ├── index.html        ← Arquivo principal (edite aqui)
│   │   ├── css/
│   │   │   ├── base.css      ← Paleta oficial (var(--cores))
│   │   │   ├── blocks.css    ← Estilos para tabelas/callouts (opcional)
│   │   │   └── responsive-fix.css
│   │   └── js/
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

## 🎨 PALETA OFICIAL (OBRIGATÓRIA)

### ✅ USE APENAS ESTAS CORES:

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

### ❌ NUNCA USE:
- `#333333`, `#000000`, `#666` (hardcoded)
- `#FF0000`, `#00FF00` (cores primárias puras)
- Qualquer cor fora da lista oficial

**REGRA DE OURO:** Se você digitar `#` seguido de hex no HTML, VOCÊ ESTÁ ERRANDO!

**SEMPRE use:** `var(--navy)`, `var(--gold)`, `var(--text)`, etc.

### 📖 TIPOGRAFIA:
- **Títulos:** Georgia (serif)
- **Corpo:** Lato (sans-serif)

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
- ⏳ GRADEs Adicionais: Modelos preditivos, diretrizes
- ⏳ Exemplos SBC 2025: Casos práticos brasileiros

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
5. **Every commit MUST update `docs/CHANGELOG.md`**
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
   - `docs/CHANGELOG.md` foi atualizado?

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

## 📚 RECURSOS

- [Diretriz SBC Dislipidemia 2025](https://abc.cardiol.br/)
- [GRADE Working Group](https://www.gradeworkinggroup.org/)
- Documentação local em `GRADE/refs/`
- Paleta oficial em `docs/PROMPT_PALETA_OFICIAL.md`

---

**Última atualização:** Janeiro 2026  
**Versão da aula GRADE:** v0.2 (MVP em desenvolvimento)  
**Score de qualidade:** 26/30 ✅
