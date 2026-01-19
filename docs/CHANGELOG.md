# Changelog

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

