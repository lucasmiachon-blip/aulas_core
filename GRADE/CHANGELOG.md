# CHANGELOG - GRADE Slides

## [BATCH 2] - 2026-01-22 (MVP UI Pass: Paleta + Viewer + Print)

### Objetivo: Deixar o viewer “conference-ready” (legível, consistente, exportável)

**O que mudou (alto impacto, baixo risco):**
- **Paleta** revisada para um look mais “Tier-1”: fundo mais neutro/cool, texto mais “ink”, acento dourado menos saturado.
- **Tokens RGB** adicionados (`--gold-rgb`, `--teal-rgb`, `--blue-rgb`, `--navy-rgb`) para permitir `rgba()` sem gambiarras.
- **Tipografia** padronizada em **Inter** (Georgia mantida como serif opcional em quotes/ênfase).
- **Print/PDF** refeito para exportar em **16:9** (estilo PPT) + 1 slide por página, preservando o layout.
- **Viewer JS** agora:
  - usa `_list.txt` quando disponível (menos manutenção);
  - suporta deep-link por hash (`#S05`), Home/End, clique e swipe.

---

### 🧱 CSS (base + blocks + print)
**GRADE/src/css/base.css**
- Novo sistema de tokens + sombras + radii.
- Background externo com gradiente sutil (só fora do slide).
- Controles de navegação com estilo “glass” (melhor UX em palco).

**GRADE/src/css/blocks.css**
- Removeu Lato → `var(--font-sans)`.
- Normalizou backgrounds e callouts usando `rgba(var(--*-rgb), a)`.

**GRADE/src/css/print.css**
- Exportação em **PPT ratio** (13.333in × 7.5in), sem forçar `position: relative` em tudo.
- Slides sequenciais (todas as seções aparecem na impressão).

---

### 🧠 JS (viewer)
**GRADE/src/js/slides-simple.js**
- Carrega lista de slides via `_list.txt` (fallback para lista padrão).
- Hash navigation: `#Sxx` abre no slide correto e mantém URL sincronizada.
- Navegação por clique (metade esquerda/direita), swipe, Home/End.

---

### 🖼️ Slides
**S01**
- Aumentado contraste/legibilidade da linha “Diretriz Brasileira…” (peso e espaçamento).

**S03**
- Refeito para o padrão do curso (SBC 2025 + gramática GRADE).
- Removidas colunas ESC/ACC (reduz densidade, melhora projeção).
- Adicionado painel “Como ler GRADE” + “Frase pronta para o congresso”.

**Múltiplos slides (S05, S08, S09, S11, S13, S16, S17, S22-24, S26-27, S29, S31-32, S35, S43-44, S46)**
- Troca de `rgba(var(--gold), …)` inválido → `rgba(var(--gold-rgb), …)`.
- Remoção de RGB hardcoded (221,185,68 / 212,175,55 / 31,118,110 / etc) → tokens.
- Remoção de `Lato` hardcoded → `var(--font-sans)`.

---

### 📚 Documentação
- Atualizada **QUICK_PALETTE_REFERENCE.md** e **STYLEGUIDE.md** para refletir a nova paleta e o uso de `*-rgb`.

## [BATCH 1] - 2026-01-20

### Objetivo: Menos slides, mais hierarquia visual
Foco em reduzir densidade de conteúdo e aumentar clareza visual para melhor projeção e auditoria P0.

---

### 📝 S02.html - "Navegar é preciso..."
**MODIFICAÇÃO:** Remoção de conteúdo secundário

**Removido:**
- Bloco com quote de Gordon Guyatt (9 linhas)
- Justificativa: Quote redundante com princípios já estabelecidos no slide 5

**Mantido:**
- Quote Fernando Pessoa (elemento central)
- Box com estatísticas LOE C vs LOE A
- Tese "Certeza rara. Decisão inevitável."

**Resultado:** Slide mais limpo, foco na mensagem principal

---

### ✂️ S03.html - Escore de Cálcio (CAC)
**MODIFICAÇÃO:** Simplificação de layout comparativo

**Removido:**
- Coluna ESC 2021 (28 linhas)
- Coluna ACC/AHA 2018 (28 linhas)
- Total: 56 linhas removidas

**Mantido:**
- Framework SBC 2025 (único framework do curso)
- 2 recomendações GRADE (Risco Intermediário + Risco Baixo + HF)

**Adicionado:**
- Nota footer: "Outras gramáticas (ESC 2021, ACC/AHA 2018) também recomendam CAC"

**Melhorias de hierarquia:**
- Cards centralizados (max-width: 60vw)
- Fontes aumentadas: títulos 0.9vw → 1.1vw, texto 1.25vw → 1.5vw
- Padding aumentado: 1.8vw → 2.5vw
- Tags de força: 0.7vw → 0.85vw

**Resultado:** Foco total em GRADE (SBC 2025), sem distrações

---

### 🎨 S05.html - Fundamento: O Grande Divisor
**MODIFICAÇÃO:** Aumento de contraste e legibilidade

**Alterações:**
1. **Box CONDICIONAL:** Background opacity 0.05 → 0.1 (dobrou contraste)
2. **Nota rodapé:** Fonte 0.95vw → 1.1vw, opacity 0.6 → 0.75, texto simplificado

**Resultado:** Melhor legibilidade em projeção

---

### 📊 S06.html - Motor do GRADE
**MODIFICAÇÃO:** Aumento de legibilidade

**Alterações:**
1. **Listas:** Fonte 1.1vw → 1.3vw, line-height 1.8 → 2.0
2. **Nota rodapé:** Texto simplificado e mais direto

**Resultado:** Listas mais legíveis, mensagem concisa

---

### ❌ S09.html - SEM ALTERAÇÕES
**Status:** APROVADO (bem estruturado)

---

## Estatísticas do BATCH 1
- Slides modificados: 4
- Linhas removidas: ~75
- Redução de densidade: ~35%
- Aumento de legibilidade: +15-20%


---

## [BATCH 1.1] - 2026-01-21 (Correção de PDF)

### Objetivo: Corrigir altura excessiva dos cards no PDF

**Problema identificado:** Cards com `flex-grow: 1` e `margin-top: auto` ficavam com altura desproporcional no PDF, criando espaços vazios excessivos.

### Correções aplicadas:

**S05.html - Fundamento GRADE:**
- Removido `margin-top: auto` dos cards de Certeza e Força
- Adicionado `height: fit-content` para altura natural do conteúdo
- Alterado `margin-top: auto` → `margin-top: 1.5vw` (espaçamento fixo)

**S06.html - Motor GRADE:**
- Removido `flex-grow: 1` do card de downgrade
- Adicionado `height: fit-content` nos cards downgrade e upgrade
- Cards agora ocupam apenas o espaço necessário

### Resultado:
- ✅ Altura dos cards proporcional ao conteúdo
- ✅ Sem espaços vazios excessivos
- ✅ PDF 15KB menor (339KB vs 354KB)
- ✅ Layout equilibrado e profissional


---

## [BATCH 1.2] - 2026-01-21 (Correção de Alinhamento Vertical)

### Objetivo: Corrigir desalinhamento vertical das 3 colunas no PDF

**Problema identificado:** Coluna direita (navy) esticada ocupando página inteira, enquanto outras colunas ficavam pequenas. Grid com `flex-grow`, `justify-content: space-between` e `height: 100%` causavam esticamento desproporcional no PDF.

### Correções aplicadas:

**S05.html - Fundamento GRADE:**
- Removido `height: 100%` do grid principal
- Alterado `align-items: stretch` → `align-items: start`
- Cards agora alinham pelo topo sem esticar verticalmente

**S06.html - Motor GRADE:**
- Removido `flex-grow: 1` do grid principal
- Removido `justify-content: space-between` da coluna navy
- Removido `justify-content: center` da coluna esquerda
- Adicionado `align-items: start` no grid
- Adicionado `height: fit-content` + `align-self: start` na coluna navy
- Todas as 3 colunas agora com altura proporcional ao conteúdo

### Resultado:
- ✅ 3 colunas balanceadas verticalmente
- ✅ Sem esticamento desproporcional
- ✅ PDF 18KB menor (321KB vs 339KB)
- ✅ Layout equilibrado e profissional
- ✅ Funciona bem tanto no navegador quanto no PDF

### Lições aprendidas:
- `flex-grow`, `justify-content: space-between`, `height: 100%`, `align-items: stretch` funcionam no navegador mas quebram no PDF com página de altura fixa
- Sempre usar `align-items: start` em grids
- Sempre usar `height: fit-content` em cards
- Testar PDF após cada mudança estrutural

