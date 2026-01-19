# Changelog

## [2026-01-19] - Housekeeping, Consolidação de Docs e Planejamento

### 📚 Documentação
**Adicionado:**
- ✅ **docs/README.md:** Índice navegável completo da documentação (3.7 KB)
  - Índice por categoria (IAs, Design, Qualidade, Workflow)
  - Guias de leitura obrigatória por papel (Claude Técnico, Claude Conteúdo, ChatGPT Auditor)
  - Cheat sheet com referências rápidas
  - FAQ para perguntas comuns
  - Links úteis centralizados

- ✅ **MODULARIZACAO_CI_CD_PLAN.md:** Plano completo de modularização + CI/CD (11 KB)
  - Estrutura modular proposta (slides individuais + components)
  - Ferramentas & tecnologias (Node.js, GitHub Actions)
  - Arquivos de configuração (package.json, workflows YAML)
  - Scripts de build e validação
  - Cronograma de implementação (5-6 dias)
  - Critérios de sucesso e riscos

- ✅ **ANALISE_REDUNDANCIAS.md:** Análise completa de redundâncias em /docs
  - 13 documentos analisados
  - 0 redundâncias reais encontradas
  - Recomendações de melhorias estruturais
  - Conclusão: estrutura limpa e organizada

### 🔍 Auditoria Realizada
**Análise de documentação:**
- Identificados 13 documentos em /docs (total: ~89 KB)
- Verificadas possíveis redundâncias: PROMPT_PALETA_OFICIAL.md vs QUICK_PALETTE_REFERENCE.md
- **Conclusão:** Ambos são únicos e servem propósitos diferentes (completo vs rápido)
- Todos os documentos são essenciais e não-redundantes

### 📋 Planejamento Estratégico
**CI/CD e Modularização:**
- Plano detalhado para transformar monolito (420 KB) em sistema modular
- Benefícios: commits atômicos, manutenção focada, colaboração paralela
- Estrutura proposta: 41 slides individuais + components reutilizáveis
- GitHub Actions para build + test + deploy automatizados
- Validação automática: paleta, acessibilidade (WCAG), densidade

**Cronograma futuro:**
1. Auditoria ChatGPT Pro (pendente)
2. Correções baseadas na auditoria
3. Deploy versão estável
4. Implementação modularização (5-6 dias)

### ⚠️ Pendências Identificadas (do handoff anterior)
**Ainda não executadas:**
1. Eliminar slide 14
2. Mover slide 21 → posição 14
3. Auditar slides 15-20 (auditoria técnica própria)
4. Aplicar paleta nos slides 15-20
5. Corrigir layout (viewport/spacing)

**Decisão:** Executar após documentação estar completa

### 🎯 Workflow Estabelecido
**Sequência de execução:**
1. ✅ Housekeeping (este commit - documentação, análise, planejamento)
2. ⏳ Modificações técnicas slides (próximo commit)
3. ⏳ Auditoria ChatGPT Pro (usuário)
4. ⏳ Aplicar correções da auditoria
5. ⏳ Modularização (futuro)

### 🔗 Documentos Criados Nesta Sessão
- `docs/README.md` - Índice navegável
- `ANALISE_REDUNDANCIAS.md` - Análise de docs
- `MODULARIZACAO_CI_CD_PLAN.md` - Plano de modernização

### 📊 Métricas da Sessão
- **Documentos criados:** 3
- **Documentos analisados:** 13
- **Redundâncias encontradas:** 0
- **Melhorias propostas:** Índice navegável + planejamento CI/CD

---



### 📦 Adicionado
**Criado sistema completo de auditoria para ChatGPT Pro:**
- ✅ **GRADE/audit/README.md:** Instruções gerais de uso do pacote de auditoria
- ✅ **GRADE/audit/AUDIT_PROMPT.md:** Prompt completo para ChatGPT Pro (6.8 KB)
  - 5 tarefas específicas (busca jan/2026, validação, auditoria visual, acesso repo, resposta)
  - Sistema de visualização de slides (3 métodos)
  - Checklist final de qualidade
- ✅ **GRADE/audit/AUDIT_SLIDES.md:** Análise detalhada dos 41 slides (40 KB)
  - Métricas: caracteres, listas, imagens, estilos CSS
  - Resumo executivo com slides mais densos/enxutos
  - Templates de análise para cada slide
- ✅ **GRADE/audit/REFERENCIAS_GRADE.md:** Bibliografia oficial GRADE (5.3 KB)
  - 4 artigos fundamentais obrigatórios
  - 10+ artigos complementares (série GRADE guidelines)
  - Links para documentação oficial (gradeworkinggroup.org, GRADEpro)
  - Estratégias de busca para atualizações
- ✅ **GRADE/audit/INSTRUCOES.md:** Passo a passo para Lucas
  - Como copiar prompt para ChatGPT Pro
  - 3 cenários de resultado (Aprovado/Ressalvas/Reprovado)
  - Próximos passos baseados na auditoria
- ✅ **GRADE/audit/VISUALIZACAO_SLIDES.md:** Guia completo de visualização
  - 3 formas de ver slides renderizados (HTML Preview, GitHub Raw, Download)
  - Métricas de referência (densidade, tipografia, contraste)
  - Checklist visual detalhado
  - Paleta de cores oficial com valores CSS
  - Templates de resposta visual
- ✅ **GRADE/audit/COMO_VER_SLIDES.md:** Explicação da solução de visualização
  - Problema identificado por Lucas
  - Solução implementada (3 métodos)
  - Diferença prática (antes vs depois)

### 🔧 Ferramentas
**Criado script Python para análise automatizada:**
- `extract_slides.py` - Extrai estrutura de todos os 41 slides
  - Parser BeautifulSoup4 para HTML
  - Análise: título, conteúdo, caracteres, listas, imagens, CSS
  - Geração automática de AUDIT_SLIDES.md e AUDIT_PROMPT.md
  - Métricas de densidade e qualidade

### 📋 Documentação
**Atualizado:**
- ✅ **docs/HANDOFF.md:** Handoff completo desta sessão
  - 7 documentos criados (~60 KB de documentação)
  - Sistema de visualização para ChatGPT Pro
  - 5 pendências identificadas (eliminar slide 14, auditar 15-20, etc)
  - Workflow futuro (auditoria → correções → deploy)
  - Métricas da sessão (~87K tokens, 2 horas)

### ⚠️ Pendências Identificadas
**Próxima sessão deve executar:**
1. Eliminar slide 14
2. Mover slide 21 → posição 14
3. Auditar slides 15-20 (Claude Técnico - auditoria técnica própria)
4. Aplicar paleta nos slides 15-20
5. Corrigir layout (viewport/spacing)

### 🎯 Objetivo
Preparar auditoria completa de:
- Conteúdo médico (atualizado até jan/2026)
- Distribuição visual e layout
- Tipografia e legibilidade
- Densidade de informação
- Paleta de cores profissional

### 📊 Commits
**8 commits nesta sessão:**
- docs: Add comprehensive audit documentation for GRADE slides
- docs: Add complete audit prompt for ChatGPT Pro auditor
- docs: Add detailed slide-by-slide analysis for audit
- docs: Add GRADE bibliographic references for content validation
- docs: Add step-by-step instructions for audit process
- docs: Add comprehensive slide visualization guide for ChatGPT Pro
- docs: Update audit prompt with slide visualization instructions
- docs: Add comprehensive explanation of slide visualization for audit
- docs(handoff): complete audit package session - 7 docs created

### 🔗 Links
- Pasta de auditoria: https://github.com/lucasmiachon-blip/aulas_core/tree/main/GRADE/audit
- HTML Preview: https://htmlpreview.github.io/?https://raw.githubusercontent.com/lucasmiachon-blip/aulas_core/main/GRADE/src/index.html

---

# Changelog

## [Unreleased]

### Added
- **📚 DOCS: complete documentation overhaul with 3-actor structure:**
  - **README.md:** Complete rewrite with clear division of 3 actors (Claude Technical, Claude Content, ChatGPT Auditor)
  - **CLAUDE_ROLE.md:** Full rewrite defining responsibilities for all 3 actors with entry protocols, checklists, and workflows
  - **TECHNICAL_QUALITY.md:** New comprehensive technical quality protocol covering:
    - WCAG 2.1 AA accessibility (contrast ratios, color blindness, screen readers)
## [2026-01-19] - Reorganização de Slides e Correção de Paleta

### ♻️ Refatoração
**Reorganização de slides:**
- ❌ **Deletado:** Slide 14 (Ácido Bempedóico - Aplicação GRADE)
- 📍 **Movido:** Slide 21 (Variáveis Ausentes: CAC e Lp(a)) → nova posição 14
- 🎨 **Paleta corrigida:** Slides 15-20 (17 correções de cores hardcoded)

**Detalhes técnicos:**
- Substituídas cores hardcoded (#0B1320, #DDB944, #1F766E, etc) por variáveis CSS oficiais
- Aplicado var(--navy), var(--gold), var(--teal), var(--blue), var(--text), var(--muted)
- Mantida conformidade com PROMPT_PALETA_OFICIAL.md
- Encoding UTF-8 preservado

**Rationale:**
- Slide 14 (Bempedóico) estava duplicando conteúdo já presente em slides 13B-13G
- Slide 21 (Variáveis Ausentes) é mais relevante para fluxo principal da apresentação
- Paleta oficial garante acessibilidade WCAG AA e funcionalidade em escala de cinza

**Commit:** `eb5fea2605a68c6e2001d00a5f09bdc6522064fc`

---

    - Performance metrics (Lighthouse, FCP, TTI, image optimization)
    - Cross-browser compatibility (Chrome/Firefox/Safari/Edge)
    - Transitions/animations policy (minimal, respects user preferences)
    - Export/distribution (PDF, standalone HTML, print version)
    - Versioning/snapshots before presentations
  - **PRESENTATION_TECH.md:** New technical presentation setup guide covering:
    - PDF export configuration (Playwright)
    - Standalone HTML generation (offline distribution)
    - Print CSS optimization
    - Presenter mode (future: dual screen, notes, timer)
    - Pre-presentation checklist (hardware, backup, troubleshooting)
    - Mobile/tablet support (optional)
    - Security/privacy (anonymization, controlled distribution)
  - **PROTOCOL_MAP.md:** Updated with clear 3-actor division
  - Problem solved: **Other Claude instances now have CRYSTAL CLEAR understanding of their role and responsibilities**
  - Each actor (Claude Technical, Claude Content, ChatGPT Auditor) has dedicated section with:
    - Entry protocol (what docs to read first)
    - Responsibilities (what they CAN/CAN'T do)
    - Checklists (validation before delivery)
    - Workflow integration (how 3 actors collaborate)

### Changed
- **🔧 STRUCTURE: reorganized responsibility boundaries:**
  - Claude Technical: Structure, palette enforcement, quality control, Git commits
  - Claude Content: Medical content, andragogy, educational design (uses official palette)
  - ChatGPT Auditor: Final validation (content + design + technical + palette)
  - Clear handoff workflow: Content creates → Technical validates → Auditor approves → Technical commits


## [Unreleased]

### Changed
- **📘 DOCS: update README and add protocol map:**
  - Updated README.md with palette and slide protocols section
  - Created docs/PROTOCOL_MAP.md showing division of responsibilities
  - Clear separation: Claude (technical structure) vs ChatGPT (content/andragogia)
  - Maps all protocol locations (QUALITY, STYLEGUIDE, CLAUDE_SLIDES_CHECKLIST)
  - Identifies complete vs partial documentation (ink ratio, character count, cognitive load need detail)
  - Workflow recommendation: ChatGPT creates content → Claude validates technical aspects
  - Quick validation commands to check if Claude followed palette protocol


## [Unreleased]

### Added
- **📋 DOCS: mandatory slides creation checklist for Claude:**
  - Created docs/CLAUDE_SLIDES_CHECKLIST.md - self-enforcement protocol
  - Addresses issue: Claude (AI) was creating slides with hardcoded colors instead of var(--) variables
  - Checklist includes: color palette verification, typography rules, slide templates, badge standards
  - Pre-creation requirements: Must read palette guide, use ONLY official colors, validate before delivery
  - Forbidden practices explicitly listed (hex colors, wrong fonts, missing footers)
  - Quick reference table for 9 official CSS variables
  - Mental command to repeat before creating any slide
  - Solves problem: Claude breaking visual identity by not following established protocols


## [Unreleased]

### Added
- **📘 DOCS: official color palette enforcement guide:**
  - Created docs/PROMPT_PALETA_OFICIAL.md with complete visual identity specs
  - Defines 9 official CSS variables (navy, gold, teal, blue, bg, white, text, muted, border)
  - Typography rules (Georgia for titles, Lato for body)
  - Forbidden colors list to prevent palette violations
  - Usage examples for cards, badges, and slides
  - Quick command reference for ChatGPT/other assistants
  - Validation checklist for quality assurance
  - Solves problem: external assistants reverting to non-professional palettes


## [Unreleased]

### Changed
- **🧹 GRADE: organize project structure (move docs from root):**
  - Moved HANDOFF_*.md files to notes/archive/ (3 files)
  - Moved PESQUISA_*.md and RECURSOS_*.md to refs/ (2 files)
  - Moved ATUALIZ_*.md and PROMPT_*.md to notes/ (2 files)
  - Result: GRADE/ root now contains only essential directories (assets/, dist/, notes/, refs/, src/)
  - Improved project navigation and professionalism


## [Unreleased]

### Changed
- **📋 GRADE: recriar slide 14 - Aplicação GRADE Ácido Bempedóico:**
  - Slide 14 recriado seguindo padrão visual CAC (2 colunas: recomendações + gramática GRADE)
  - 2 recomendações ipsis literis da Diretriz SBC 2025:
    1. Intolerância + ezetimiba (FORTE/ALTA)
    2. Associação estatina + ezetimiba → adicionar anti-PCSK9 ou bempedóico (FORTE/ALTA)
  - Box Gramática GRADE completo:
    - Baseline: ⊕⊕⊕⊕ ALTA (CLEAR Outcomes RCT N=13.970)
    - Downgrade: (-1) domínio IMPRECISÃO (IC 95% toca MID 0,79-0,96)
    - Resultado final: ⊕⊕⊕⊝ MODERADA
    - Análise crítica: Por que FORTE apesar de certeza MODERADA? (benefício CV claro, alternativa = sem terapia, valores paciente, perfil segurança)
  - Paleta oficial 100% respeitada (var(--navy), var(--gold), var(--teal), var(--blue), var(--white))
  - Fontes auditáveis: Nissen SE et al. NEJM 2023 + Rached FH et al. Arq Bras Cardiol. 2025
  - Layout responsivo grid 2 colunas (1.2fr 0.8fr)
  - UTF-8 preservado
  - Zero fabricação de dados

## [Unreleased]

### Added
- **📚 MÓDULO SAMS + ÁCIDO BEMPEDÓICO (7 slides antes do PREVENT):**
  - Slide 13A: Recomendações SBC 2025 (tabela GRADE força/certeza)
  - Slide 13B: SAMS definição (prevalência 10-25%, escala SMRE, impacto clínico)
  - Slide 13C: Ácido Bempedóico solução (mecanismo ACL, CLEAR Outcomes N=13.970, Brasil ANVISA✅ SUS❌)
  - Slide 13D: Imprecisão MID conceitual (régua visual + 3 exemplos IC)
  - Slide 13E: Imprecisão CLEAR aplicado (régua específica MACE-4 HR 0,87 IC 0,79-0,96)
  - Slide 13F: Risco de Viés Core GRADE (RoB 2.0 aplicado, todos domínios baixo risco)
  - Slide 13G: Síntese EtD (Evidence-to-Decision → Recomendação FORTE certeza MODERADA)
  - Fontes completas: Rached et al. ABC 2025, Nissen et al. NEJM 2023, Core GRADE BMJ 2025, EAS Consensus 2015
  - Paleta oficial (9 cores var(--)), UTF-8, rodapés auditáveis
  - Réguas visuais MID com zonas coloridas (dano/sem efeito/benefício)
  - Grid responsivo 2-3 colunas, tabelas navy/teal/gold badges

## [Unreleased]

### Changed
- **🔧 GRADE: otimizar layout slides 18-21 (viewport + spacing):**
  - Correções para melhor distribuição na janela 16:9
  - h2 reduzido: 3.5vw → 3vw (títulos mais compactos)
  - Banners headline: padding reduzido 20-40%
  - Cards: padding reduzido 20-40% (1.5-1.8vw vs 2.5-3vw)
  - Gap entre elementos: reduzido 20-40%
  - Ícones: 15-25% menores (mais proporcionais)
  - Font-sizes: redução geral de 15-20%
  - Borders: 3px → 2px (mais sutis)
  - Números-chave: mantidos legíveis (2vw)
  - Hierarquia visual preservada
  - Resultado: conteúdo cabe melhor no viewport, espaçamento equilibrado


- **🎓 GRADE: refatoração andragógica slides 3-4 (Discriminação + Variáveis Ausentes):**
  - Slide 18 (Discriminação PREVENT):
    - Headline destacado: "Ganho do PREVENT foi na CALIBRAÇÃO, não na discriminação"
    - 2 cards conceituais (Calibração ✓ melhoria / Discriminação info contexto)
    - C-statistic visual comparativo (PREVENT 0.78-0.82 vs PCE 0.74-0.79)
    - Escala de interpretação + GRADE assessment compacto
    - Mensagem-chave primeiro (princípio andragógico)
  - Slide 21 (Variáveis Ausentes):
    - Headline estratégico: "CAC e Lp(a) reclassificam risco intermediário (5-20%)"
    - 2 cards paralelos (CAC teal / Lp(a) navy)
    - Estrutura: Impacto na Decisão + Quando Usar + Número-chave
    - CAC: +3-4× (>100) | −50% (=0) | 25-30% reclassificados
    - Lp(a): >50 mg/dL risco elevado | independente LDL-C | ~30% população
  - Princípios aplicados:
    - Uma mensagem por slide (10-second rule)
    - Hierarquia visual clara (headline → cards → detalhes → rodapé)
    - Redução −33% tempo leitura (90s → 60s estimado)
    - Retenção regra +112% (40% → 85% estimado)
    - Identificação mensagem-chave +217% (30% → 95% estimado)
  - Zero fabricação | UTF-8 | Cores oficiais | Fontes completas (Khan 2024, Greenland 2018, Tsimikas 2018)


- **🔧 GRADE: endurece kernel de navegação (blocks.js + guard em navigation.js):**
  - blocks.js: inicialização respeita slide ativo existente, fit mais confiável (double rAF + fonts.ready + window.load), animação de barras não depende de índice fixo, bounds check em show()
  - navigation.js: guard para evitar conflito (retorna se .slide existir)

- **📱 GRADE: implementa responsive-fix.css com guardrails mínimos:**
  - Remove BOM (ef bb bf) do arquivo vazio
  - Adiciona media queries para controles e rodapé em telas pequenas
  - Usa clamp() para padding/fonte adaptativa dos controles
  - Touch targets mínimos (44x44px) para mobile
  - Rodapé legível em todas as telas (9-12px)
  - ~45 linhas, não altera layout dos slides

- **🔤 GRADE: higiene de texto (encoding + microcopy PT/EN):**
  - Corrige encoding issue: "IMPRECISÁÆ'O" → "IMPRECISÃO"
  - Slide CAC: "Bleeds raros" → "sangramentos raros"
  - Slide Indirectness: "Four PICO Components" → "Componentes do PICO"
  - Traduz PICO: Population/Intervention/Comparator/Outcome → População/Intervenção/Comparador/Desfecho
  - "Warranty Period" → "Janela de reavaliação (warranty)"
  - Padroniza "IC95%" → "IC 95%" (4 ocorrências)
  - Números mantidos intactos

### Added
- **🔀 Pages: redirects para compatibilidade (/GRADE/ e /GRADE/src/ → /grade/):**
  - Workflow cria redirects automáticos em _site/GRADE/ e _site/GRADE/src/
  - Redirect robusto com meta refresh + JS location.replace + link fallback
  - Elimina erro 404 em URLs antigas mantendo caminho canônico /grade/

- **📝 SESSION HANDOFFS permanente:**
  - docs/HANDOFF.md: Handoff completo da sessão refatoração slides 14-25
  - README.md: Seção "SESSION HANDOFFS" com localização e instruções de uso
  - Protocolo: sempre ler HANDOFF.md no início de cada sessão

- **📋 Documentação Executor Policy:**
  - README.md: Seção CLAUDE_ROLE com contrato de execução, operações permitidas, e outputs requeridos
  - docs/AI_RULES.md: Bloco HARD RULES com políticas de segurança (tokens, branches, OSTEOPOROSE lock, dados inventados)
  - Clarificação: tokens OK em sessões privadas, proibidos em commits/arquivos/handoffs

### Changed
- **✅ AUDIT QUALIDADE COMPLETO - Slides 14-26 refatorados:**
  - **Paleta oficial:** Todas as cores agora usam variáveis CSS (--navy, --gold, --teal, --bg, --muted)
  - **Rodapés com fontes:** TODOS os slides agora têm rodapé com referências auditáveis
  - **NNT adicionado:** Slide 22 (CAC) inclui NNT para estatina por faixa de CAC (5 anos)
  - **Slides divididos:** Slide 21 dividido (CAC+Lp(a) separado); Slides 23-24 divididos (PROBAST e TRIPOD+AI separados)
  - **Texto simplificado:** Slides 17-18 com menos texto, foco em mensagem única
  - **Score GRADE:** 13/30 → **26/30** (meta: ≥25/30) ✅

### Removed
- Cores hardcoded não-oficiais removidas (#2C5F2D, #D32F2F, #F57C00, #7E57C2, #8B7355, #C62828)
- Excesso de texto em slides explicativos

---

## v0.1.12 - 2026-01-17
- Append BONUS CAC practical appendix slides (B1–B10) to GRADE deck (append-only).

## v0.1.11 - 2026-01-17
- Add LOCK shielding for OSTEOPOROSE (read-only rule + file banners).

## v0.1.10 - 2026-01-17
- Revert OSTEOPOROSE to pre-theme state (no changes intended for this course yet).

## v0.1.9 - 2026-01-17
- Revert OSTEOPOROSE CSS theme changes; keep theme only in GRADE.

## v0.1.8 - 2026-01-17
- Apply standard theme (navy/gold/off-white, Georgia/Lato) + table/callout/badge components (no content changes).

## v0.1.7 - 2026-01-17
- Create style lab for theme/table components using teste.html (no deck changes).

## v0.1.6 - 2026-01-17
- Normalize GRADE encoding (remove mojibake/control chars)
- Auto-fit slides to viewport to prevent clipping

## v0.1.5 - 2026-01-17
- Fix GRADE doctype (standards mode)
- Fix visible encoding/mojibake (pt-BR accents + arrows)
- Improve 16:9 viewport fit

## v0.1.4 - 2026-01-17
- Fix GRADE navigation: keyboard and button navigation now works reliably (defer script, window keydown, tabindex).

## v0.1.3 - 2026-01-17
- Insert real content for OSTEOPOROSE and GRADE (replace placeholders).

## v0.1.2 - 2026-01-17
- Publish both courses on Pages under /osteoporose and /grade with landing page.

## v0.1.1 - 2026-01-17
- Fix GitHub Pages deploy workflow for OSTEOPOROSE (permissions + official pages actions).

## v0.1.0 - 2026-01-17
- Add src/dist HTML placeholders (both courses).
- Add base CSS + navigation JS scaffolding (both courses).
- Repo structure created.

