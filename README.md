# aulas_core

---

# 🚨 ATENÇÃO CLAUDE (IA ASSISTANT)

## ⚠️ PROTOCOLO OBRIGATÓRIO DE ENTRADA

**ANTES DE FAZER QUALQUER COISA, LEIA PRIMEIRO:**

### 📖 ORDEM OBRIGATÓRIA:
1. **`docs/CLAUDE_ROLE.md`** ← **LEIA ISTO PRIMEIRO!** 
2. Este README.md (você está aqui)
3. `docs/CHANGELOG.md`
4. `docs/AI_RULES.md` (se existir)

**❌ NUNCA PULE O PASSO 1.**

### 🔴 REGRAS CRÍTICAS:
- ❌ **NÃO criar arquivos sem aprovação**
- ❌ **NÃO fazer commits sem aprovação**  
- ❌ **NÃO modificar código sem plano aprovado**
- ❌ **NUNCA EXPOR TOKENS/CHAVES/SENHAS DE API**
- ✅ **SEMPRE apresentar PLANO primeiro**
- ✅ **SEMPRE esperar aprovação explícita do Professor**

---

Este repositório contém **duas aulas**:

* **GRADE** (em desenvolvimento com Claude)
* **OSTEOPOROSE** (estável - não modificar)

---

## 🤖 DESENVOLVEDOR: Claude (AI Assistant)

**⚠️ IMPORTANTE:** Este projeto é desenvolvido em colaboração com Claude, que atua como:

- **Guardião de Boas Práticas** → Impede erros de iniciante
- **Tutor de Git/Programação** → Ensina conceitos antes de executar  
- **QA Automático** → Audita código frequentemente
- **Desenvolvedor Senior** → Escreve código profissional

### 📚 Documentação do Papel de Claude
**LEIA ANTES DE COMEÇAR:** [`docs/CLAUDE_ROLE.md`](docs/CLAUDE_ROLE.md)

Este documento explica:
- ✅ O que Claude PODE fazer
- ❌ O que Claude DEVE BLOQUEAR
- 📋 Workflow padrão de trabalho
- 🔄 Plano de modularização futura
- ⚠️ Red flags que Claude sempre alerta

### 🚨 Regra de Ouro
**Claude tem autoridade para BLOQUEAR ações que violem boas práticas**, mesmo que solicitadas pelo Professor. Isso inclui:
- Criar branches desnecessárias
- Commits sem mensagem clara
- Criar pastas sem justificativa
- Duplicar código ao invés de modularizar
- Hardcodar valores que deveriam ser variáveis

**Quando Claude bloqueia** → sempre explica o porquê + oferece alternativa melhor.

---

---

## 📚 Aula GRADE - Status Atual

### Objetivo
Criar apresentação completa sobre **metodologia GRADE** aplicada à Diretriz Brasileira de Dislipidemia 2025.

### Estratégia de Desenvolvimento
1. **Fase 1 (ATUAL):** Construir conteúdo em HTML/CSS
   - Mais fácil para editar e visualizar
   - Permite iteração rápida
   - Design responsivo e modular

2. **Fase 2 (FUTURA):** Converter para PowerPoint (.pptx)
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

---

## 🗂️ Organização do Repositório

Cada aula tem **duas pastas principais**:

* **`src/`** → Edição (onde trabalhamos e modificamos)
* **`dist/`** → Entrega (versão estável para apresentação)

> **Política:** `dist/` só recebe conteúdo estável vindo de `src/`

### Estrutura da Aula GRADE

```
GRADE/
├── src/                    ← ÁREA DE TRABALHO
│   ├── blocks/            ← Blocos modulares de conteúdo
│   ├── css/               ← Estilos (base, blocks, responsive)
│   ├── js/                ← Scripts de navegação
│   ├── partials/          ← Componentes reutilizáveis
│   └── index.html         ← Arquivo principal
│
├── dist/                   ← VERSÃO FINAL
│   └── index.html         ← (será gerado de src/)
│
├── assets/                ← Imagens, QR codes, gráficos
├── notes/                 ← Anotações de desenvolvimento
└── refs/                  ← Referências bibliográficas
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

---

## 👨‍💻 Desenvolvimento com Claude

### Status Atual
- **Desenvolvedor:** Claude (Assistente IA)
- **Orientação:** Prof. Lucas
- **Metodologia:** 
  - Explicação completa antes de qualquer ação
  - Commits profissionais e organizados
  - Sem branches desnecessários
  - Código limpo e documentado

### Próximos Passos
1. Completar 8 domínios do Core GRADE
2. Adicionar exemplos práticos da SBC 2025
3. Integrar os 4 THREADS ao longo do conteúdo
4. Finalizar GRADEs adicionais
5. Converter para PPTX

---

## ⚠️ Regras Importantes

### ✅ PODE:
- Modificar qualquer arquivo em `GRADE/`
- Criar novos blocos em `GRADE/src/blocks/`
- Atualizar CSS e JavaScript
- Adicionar referências e notas

### ❌ NÃO PODE:
- **Tocar em OSTEOPOROSE** (pasta completa bloqueada)
- Criar branches sem explicação
- Fazer commits sem documentação
- Alterar estrutura sem aprovação

---

## 📅 Timeline

**Prazo:** 1 mês para conclusão da aula GRADE

**Semana 1:** Fundamentos + primeiros blocos
**Semana 2:** Core GRADE (8 domínios completos)
**Semana 3:** Exemplos SBC 2025 + THREADS
**Semana 4:** GRADEs adicionais + conversão PPTX

---

## 📖 Recursos

- [Diretriz SBC Dislipidemia 2025](https://abc.cardiol.br/)
- [GRADE Working Group](https://www.gradeworkinggroup.org/)
- Documentação local em `GRADE/refs/`

---

**Última atualização:** Janeiro 2026
**Versão da aula GRADE:** Em desenvolvimento (v0.1-alpha)

---


## 📝 SESSION HANDOFFS

**IMPORTANTE:** Sempre leia o handoff da última sessão antes de iniciar trabalho.

### Localização
**Arquivo:** `docs/HANDOFF.md`

### Quando Ler
- ✅ No início de cada nova sessão
- ✅ Antes de fazer qualquer commit
- ✅ Ao retomar trabalho após pausa

### O Que Contém
- Resumo da última sessão
- Commits realizados
- Mudanças aplicadas
- Score atual
- Próxima tarefa pendente
- Avisos e lembretes

### Como Usar
```bash
# Ler handoff (comando para Claude)
view docs/HANDOFF.md
```

---

## CLAUDE_ROLE (Executor Policy)

### Contract (must follow)
1) Read FIRST: `README.md`, `docs/AI_RULES.md`, `docs/WORKFLOW.md`, `docs/STYLEGUIDE.md`, `docs/QUALITY.md`.
2) Work ONLY on branch `main`. **Never create branches.**
3) **Never request, print, store, or leak tokens/credentials** in commits, files, or handoffs (PAT, cookies, auth URLs, headers, logs with secrets). If prompted for auth in permanent docs, STOP.
4) `OSTEOPOROSE/` is **LOCK (read-only)** until explicitly unlocked by the user. Do not edit anything under `OSTEOPOROSE/`.
5) Changes must be **small and auditable**. **One objective per commit.**
6) Every commit MUST update `docs/CHANGELOG.md`.
7) Never invent numbers or citations. If missing, use **[TBD]**.

### Allowed operations
- **Technical fixes (GRADE only):** encoding cleanup, asset paths, slide fit, navigation robustness.
- **Bonus slides (GRADE only):** append-only slides at the end (no edits above).

### Output required (when asked)
- Commit list (hash + message)
- Diffstat (files changed)
- For slides: **HTML block containing ONLY the new slides**
- Validation checklist (local + Pages)
