# chatgpt.md — Auditoria + Playbook (OSTEOPOROSE / decks HTML→PDF/PPTX)

Este arquivo é o **contrato de trabalho** entre você (time) e eu (assistente) para evoluir este repositório com segurança.

> Importante: eu não “aprendo sozinho” entre sessões. Eu evoluo este arquivo **quando você me envia feedback** e eu aplico mudanças. Pense nele como um *log vivo* + *styleguide*.

## 1) Meu papel neste repo

- **Auditor visual + implementador pragmático**: melhorar legibilidade, hierarquia de atenção, consistência e export (PDF/PPTX) **sem refatoração grande**.
- **Prioridade**: resolver problemas que aparecem em **projeção** (ppt) e **export** (print/pdf).
- **Escopo típico**: ajustes de layout/spacing/typografia via *inline styles* nos slides, pequenos hotfixes de CSS/JS quando estritamente necessário e permitido pelas constraints.

## 2) Hard constraints do projeto (nunca violar)

Fonte de verdade: `scripts/AI-RESTRICTIONS.md`.

Checklist obrigatório a cada mudança:
- [ ] Atualizar `CHANGELOG.md` (o que mudou, por quê)
- [ ] **Não** adicionar `!important` em CSS novo
- [ ] Preferir mudanças **por slide** (inline) a CSS global
- [ ] Testar **viewer** (index), **print mode** (`?print=1`) e **PDF export**

## 3) Definição de “bom” (métricas práticas)

### 3.1 Hierarquia (regra de 3 segundos)
Em 3 segundos, a pessoa deve conseguir dizer:
1) Qual é o assunto do slide (H1)
2) Qual é a tese/insight (subtítulo/callout)
3) Qual é a ação/implicação (take-home)

### 3.2 Densidade
- Evitar blocos longos. Preferir **3–5 bullets** curtos.
- Linhas muito longas reduzem compreensão em projeção. Preferir quebras naturais.

### 3.3 Grid e respiro
- Safe-area padrão: **48px** (já usado em vários slides).
- Distâncias consistentes (8/12/16/20/24px).
- “Vazio” é ok quando **parece intencional** (centrado e equilibrado), não quando parece bug (conteúdo grudado no topo + rodapé “solto”).

### 3.4 Contraste
- Texto normal deve ter contraste confortável.
- Dourado é **acento**, não fundo dominante.

## 4) Padrões de componentes (para reutilizar)

### 4.1 Header
- H1: 36–44px (slides densos: 34–38)
- Subtítulo: 16–18px, `rgba(var(--navy-rgb), 0.65–0.75)`

### 4.2 Cards
- Bordas suaves, `border: 1px solid rgba(var(--navy-rgb), 0.10–0.16)`
- `border-radius`: 12–18px
- `padding`: 18–24px

### 4.3 Take-home bar
- Fundo navy, texto white; dourado só em palavras-chave
- Quando houver grande “vazio”, preferir **centralizar (cards + take-home)** no miolo do slide.

## 5) Processo de auditoria (como você pode me pedir)

Formato ideal de pedido:
1) “Audite slides X–Y”
2) “Problemas observados: … (ex.: espaço vazio, bordas cortadas, cores fortes)”
3) “Saída: patch ZIP + PDF 16:9 + (opcional) PPTX”

O que eu entrego:
- Lista de problemas por slide
- Hotfixes implementados (com trade-offs)
- Atualização no `CHANGELOG.md`

## 6) Diagnóstico rápido: divergência index vs print vs PDF

Quando existir diferença visual entre:
- **index** (viewer)
- **print** (`?print=1`)
- **PDF export**

Checklist:
1) Confirmar se `dist/index.html` aponta para `src/*` (evitar builds divergentes)
2) Confirmar se o PDF foi gerado pelo script `scripts/export-osteoporose-pdf.js`
3) Verificar se algum slide depende de comportamento de `display:flex` no root (pode quebrar no print)
4) Evitar `backdrop-filter` e efeitos que somem no print (já há regras para desabilitar)

## 7) Log de aprendizado (atualizar a cada rodada)

### 2026-02-04
- Slides com “header no topo + rodapé no fundo” podem parecer bugados por criar um vazio enorme no meio; **centralizar o bloco principal** resolve sem esticar cards.
- Pills/labels com números precisam de `&nbsp;` em pontos críticos para não “colar” no PDF (ex.: `utilidade&nbsp;<strong>0,39</strong>`).

### 2026-02-04 (export vs apresentação)
- **PDF no Chrome sempre “rola”** (o viewer é contínuo). Isso não é (necessariamente) bug de CSS.
  - Para apresentar sem scroll: use `dist/index.html` (viewer com ←/→, Space, F) **ou** o `*.pptx`.
  - PDF fica como artefato de distribuição/backup.

### 2026-02-04 (rodada: slides 1–15)
- **Capa/contracapa consistentes**: alinhar o gradiente inline do slide com o gradiente do `print.css` evita a sensação de “3 versões” (index/print/PDF).
- **Slides 3–4 com muito vazio**: quando o conteúdo principal ocupa só o terço superior, o vazio parece bug.
  - Fix preferido (mais “intencional”): **subir os cards** e ancorar o take-home com `margin-top: auto` (evita centro “morto” e mantém rodapé consistente).
- **Gráficos (pizza → donut)**:
  - Preferir **SVG donut** a `conic-gradient` quando o objetivo é export/print consistente.
  - Hierarquia: colocar o número-chave (ex.: **70%**) no centro e mover o outro número para legenda/tag evita “número perdido na fatia”.
- **Interatividade (caso clínico)**: separar **pergunta** e **resposta** em slides diferentes.
  - Slide 1: só caso + pergunta + opções (A/B/C/D), sem “pistas” de resposta.
  - Slide 2: resposta + racional (comparação FRAX, take-home) com espaço para respirar.
- **Ordem narrativa**: depois do caso, mostrar **modelos (FRAX/FRAXplus/FRAX-Brasil)** e só então revelar a resposta (aumenta tensão e ajuda a fixar o modelo mental).
- **DM2 (sem obesidade)**: manter foco em DM2 e evitar redundância.
  - Slide “DM2 subestima” → mecanismo + red flags + preview curto de ajuste.
  - Slide seguinte → detalhes de diretrizes e métodos.
- **Slide de NNT**: manter “ordem de grandeza” explícita para baixo risco (quando não há NNT único) e ancorar o restante com:
  - NNT alto risco (meta-análise) +
  - um NNT real de trial grande (ex.: HORIZON-PFT) +
  - RRR por classe (trials pivotais) para dar contexto.

### 2026-02-04 (higiene de arquivos / export)
- Sempre que mexer em ordem/quantidade de slides: manter **`slides/_list.txt`**, **`slides/_meta.json`** e **`print.html`** em sync.
  - Regra prática: após editar `_list.txt`, regenerar `_meta.json` (por parser simples do `data-title`/`id`) e rodar `node scripts/build-osteoporose-print-html.js`.
- Ajustes de “bordas cortadas” em print/PDF geralmente são resolvidos com:
  - `padding` assimétrico (ex.: mais `right/bottom`), e
  - reduzir `max-width` do grid (evita conteúdo beijando a borda em DPI/zoom diferentes).

### 2026-02-04 (rodada: interatividade + consistência)
- **Interatividade (caso clínico)**: separar *pergunta* e *resposta* em slides distintos aumenta atenção e evita “spoiler”.
  - Pergunta: só caso + prompt A/B/C/D.
  - Resposta: comparação + racional + referência.
- **Evitar “borramento”** (cansaço visual): quando um slide “embaça a vista”, geralmente é excesso de contornos/sombras e informação competindo.
  - Reduzir bordas 3px→1–2px, diminuir sombras e remover caixas redundantes.
  - Manter no máximo **2 cores de acento** por slide (ouro + 1 cor funcional, ex.: teal/blue).
- **Ao mexer em ordem/quantidade de slides**:
  - Manter `slides/_list.txt` e `slides/_meta.json` em sync.
  - Rodar `node scripts/build-osteoporose-print-html.js` para regenerar `print.html` (título/contagem corretos).
  - Reexportar PDF via `node scripts/export-osteoporose-pdf.js`.

### 2026-02-05 (rodada: blur + narrativa + margens)
- **Borramento no viewer**: `transform: scale()` pode deixar texto “lavado/embaçado” em escalas fracionárias.
  - Hotfix: aplicar `zoom` (quando suportado) no `stage__inner` e manter `transform` como fallback.
- **Gráfico donut**: quando borda/sombra “encosta” na beirada em alguns zooms, é quase sempre **safe-area**.
  - Hotfix: aumentar `padding-right` e `padding-bottom` no slide do donut.
- **Caso clínico (pergunta vs resposta)**:
  - Pergunta: remover "dica"/pistas (mantém o momento de interação limpo).
  - Resposta: colocar badge "Resposta: B" e mover dica de dinâmica para o slide de resposta.
- **Ordem didática** (solicitado): mover bloco **NNT + NOGG + classificação** para antes do bloco DM2/ajustes do FRAX.
