# Changelog

## 2026-02-07 — Round 10 (Restauração slide perdido S08b + redesign)

### Conteúdo

- **Slide restaurado:** S08b_slide-08b.html — "Quadril perde ~2 QALYs — tanto quanto AVC"
  - Dados: Tosteson et al. 2008 (NOF, Tier 1) — 4 sítios de fratura + comparação CV
  - Ranking visual unificado: fraturas (barras sólidas) vs CV (barras dashed)
  - Posição: após S08 (Utilidade em Saúde), n:8 na \_meta.json

### UI/UX

- Protocolo before/after aplicado: screenshot → avaliação crítica → correções → re-screenshot
- 10 problemas corrigidos na v2:
  - Título 34→38px (coerência com S08)
  - Subtítulo cor --muted → rgba(navy, 0.42) (match S08)
  - Emojis removidos (profissionalismo)
  - Caixa de fórmula removida (ruído cognitivo)
  - CV barras agora visíveis com dashed style
  - Footer com badge navy (match S08)
  - Ranking unificado substitui layout 2-painéis fragmentado
  - Ponto focal claro: Quadril HERO CARD (navy bg, 1,89 gold 38px)
- v3 redesign (Round 2): severity cascade com flex proporcional (3/2/1.5/1)
  - Hero card navy para Quadril (dominância total)
  - Border-left como accent (5px gold-dark Vertebral, 4px gold Outras)
  - Fill ratio: 65%→80%. Checklist score: 11/12 PASS

### Arquivos tocados

- `OSTEOPOROSE/src/slides/S08b_slide-08b.html` (novo)
- `OSTEOPOROSE/src/slides/_list.txt` (S08b adicionado, 69→70 slides)
- `OSTEOPOROSE/src/slides/_meta.json` (entrada n:8 adicionada)
- `OSTEOPOROSE/src/print.html` (regenerado, 70 slides)
- `screenshots/S08b_BEFORE.png`, `S08b_AFTER.png`, `S08_reference.png`
- `CLAUDE.md` (sessão Round 10, Insights 6-8, v3 severity cascade)

---

## 2026-02-07 — Round 9 (foco: slides 40–50)

### UI/UX

- Ajuste de contraste no slide ACR 2022: header “Adultos < 40 anos” agora segue padrão navy.
- Menos “vazio visual” nos últimos slides (QALY/DM2):
  - Wrappers em flex com reserva de espaço para fonte no rodapé.
  - Colunas e cards esticam melhor em altura (menos áreas vazias).

### Conteúdo/estrutura

- Pequenos ajustes de layout sem alterar o significado clínico (apenas reorganização visual).

### Arquivos tocados

- `OSTEOPOROSE/src/slides/`: S46, S48, S15, S09, S10, S11.
- `OSTEOPOROSE/src/print.html` regenerado a partir de `slides/_list.txt`.
- `chatgpt.md` adicionado (memória de projeto + checklist).

Nota: o export por Playwright não roda neste ambiente; valide o PDF via fluxo local do projeto.
