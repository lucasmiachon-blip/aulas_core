# Changelog

## 2026-02-08 — GRADE S07 Indireção redesign + S11 polish

### Conteúdo

- **S07 redesign completo (posição 11):** "Indireção: a evidência serve para este paciente?"

  - CardHeader navy + 4 PICO rows com `.badge` gold circles (P/I/C/O)
  - Right column: callouts semânticos stacked (gold=downgrade −1/−2, navy=CAC context, teal=upgrade +1, navy=essência)
  - Nota "Desfecho substituto" (LDL vs MACE, cadeia causal por classe)
  - Bullet "populações americanas (MESA)" aplicadas a contexto local
  - "Na prática" callout com pergunta clínica memorável
  - Bottom strip "Regra mental" — takeaway ancorado
  - 4 iterações (v1→v4) com screenshots de QA entre cada
  - Fill ratio final ~90%, fonts generosas para projetor (body 0.92vw)

- **S11 (posição 9):** Ajustes pontuais
  - Removido "francamente" de "Balanço francamente favorável" (NNT 100/5a ≠ maravilha)
  - **ASPREE**, **ARRIVE**, **ASCEND** em negrito nos 3 landmark trials

### Arquivos tocados

- `GRADE/src/slides/S07.html` (reescrito — redesign completo)
- `GRADE/src/slides/S11.html` (polish — negrito trials + texto)
- `CLAUDE.md` (insights 11-12: ciclo iterativo + border-left rhythm)
- `CHANGELOG.md`
- `GRADE/HANDOFF.md` (atualizado)

---

## 2026-02-07 — Round 12 (S33 merge + S35 GRADE redesign)

### Conteúdo

- **S33 redesign (merge S33+S34):** Slides redundantes sobre zoledronato e mortalidade mesclados em um único slide

  - KM real do HORIZON-RFT (Lyles NEJM 2007, Fig. 2E) — recortada de PMC2324066
  - HR 0.72, RRR 28%, NNT 27, população n=2.127
  - Callout comparativo com estatinas (4S) — storytelling hook para S35
  - S34 removido de `_list.txt` (69 slides total)

- **S35 redesign (lente GRADE):** Slide "Esse Achado Foi Replicado?" completamente refeito
  - **Forest plot real** extraído de Cummings et al. JAMA Intern Med 2019;179:1491-1500 (Figure 3)
    - PDF fornecido pelo usuário → renderizado via pdfjs-dist → recortado com sharp
  - **Painel GRADE:** ⊕⊕⊕⊕ Alta Certeza, 5 domínios com checklist visual
  - **Hero number:** RR 0.95 (IC95% 0.86–1.04), I²=0%
  - **Lan 2025 referenciado:** Confirmação com 47 RCTs, n=59.437
  - **Conclusão removida** (caixa gold "não prescreva pela mortalidade") — conforme solicitação
  - HTML forest plot anterior substituído por imagem real do journal

### Sparkline Narrative (Duarte)

- S33 (HORIZON): "o que poderia ser" — HR 0.72, comparação com estatinas = esperança
- S35 (GRADE): "o que é" — RR 0.95, GRADE Alta = realidade definitiva
- Tensão narrativa entre os dois slides maximizada

### Assets adicionados

- `OSTEOPOROSE/assets/horizon-km-death.jpg` — KM mortalidade HORIZON (crop de PMC)
- `OSTEOPOROSE/assets/cummings2019-fig3-forest.jpg` — Forest plot JAMA Intern Med 2019
- `OSTEOPOROSE/assets/lan2025-original-ref.jpeg` — Forest plot Lan CORR 2025 (full)
- `OSTEOPOROSE/assets/pdf/jamainternal_cummings_2019.pdf` — PDF fonte

### Arquivos tocados

- `OSTEOPOROSE/src/slides/S33_slide-33.html` (reescrito — merge S33+S34)
- `OSTEOPOROSE/src/slides/S35_slide-35.html` (reescrito — GRADE + imagem real)
- `OSTEOPOROSE/src/slides/_list.txt` (S34 removido, 70→69 slides)
- `screenshots/S35_AFTER.png`
- `CHANGELOG.md` (esta entrada)

### Handoff para próxima sessão

- **S33:** Validar no viewer real (Live Server) — verificar se KM do HORIZON está renderizando
- **S35:** Verificar legibilidade do forest plot na projeção (auditório)
- **print.html:** Precisa rebuild para refletir remoção do S34
- **Considerar:** Extrair Figure 4 (zoledronato) do JAMA 2019 para slide futuro?
- **Limpeza:** Remover assets temporários (lan2025-fig0.png, jama2019-p5.png, etc.)

---

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
