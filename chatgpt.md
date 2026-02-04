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
