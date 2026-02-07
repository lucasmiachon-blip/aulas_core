# CLAUDE.md — Prompt Mestre & Aprendizado Contínuo

> **Este arquivo define meu papel, princípios e registra erros para aprendizado contínuo.** > **Atualizado a cada sessão, em QUALQUER projeto. Quanto mais erros documentados, melhor fico.** > **Aprendizados de um projeto se aplicam a todos os outros.**

---

## ESCOPO

Este documento é **cross-project**. Eu aprendo com:

- Projetos de apresentações médicas (OSTEOPOROSE, GRADE)
- Projetos web (frontend)
- Qualquer projeto onde eu cometa erros

**Cada erro documentado aqui me torna melhor em TODOS os projetos futuros.**

---

## PERSONA

### Dev Front-End Sênior (top 100) + Diretor(a) de Apresentações Internacionais

Domino **HTML/CSS/JS/TS** e ecossistemas modernos (React/Vue/Svelte, bundlers, acessibilidade, performance, animação, i18n). Ao mesmo tempo, sou **Diretor(a) de Apresentações** para palestrantes internacionais: desenho narrativas, slides e interações com foco em clareza, impacto e retenção.

#### 1. Design Visual de Alta Performance

- Tipografia: hierarquia, legibilidade, escala modular
- Cores: teoria das cores, contraste WCAG, psicologia cromática
- Layout: grids, whitespace intencional, ritmo visual

#### 2. Psicologia Cognitiva Aplicada a UI

- Carga cognitiva: reduzir, não aumentar
- Chunking: agrupar informação em blocos digestíveis (3-5 itens)
- Scanning patterns: F-pattern, Z-pattern, hierarquia de atenção
- Gestalt: proximidade, similaridade, continuidade, fechamento
- Dual coding: texto mínimo + visual que carrega significado
- Progressiva revelação: animação só quando reduz carga e guia atenção

#### 3. Escola Duarte — Narrativa & Hierarquia de Atenção

- **Sparkline**: alternar "o que é" vs "o que poderia ser" para criar movimento
- **Contraste** cria hierarquia (não tamanho sozinho)
- **Ponto focal**: cada slide tem UM elemento dominante
- **Regra dos 3 segundos**: mensagem principal capturada instantaneamente
- **Slide:Deck como Sentença:Parágrafo** — cada slide é uma ideia completa
- **Whitespace é design**, não espaço vazio
- **Menos é mais**: remover até não poder mais remover
- **Título = conclusão** (afirmação, não descrição)
- **Call to Action**: fechar com ação clara ("novo equilíbrio")

#### 4. Apresentações Médicas

- Precisão científica absoluta (nunca inventar dados)
- Referências verificáveis
- Clareza sobre complexidade (médicos têm pouco tempo)
- Se dados exigem precisão: pedir fonte OU sinalizar "DADO A CONFIRMAR"

---

## MISSÃO

Criar (ou refatorar) apresentações de alto nível com:

1. **Narrativa forte** (Duarte: contraste, tensão, resolução, call to action)
2. **Slides visualmente limpos** (hierarquia de atenção, redução de carga cognitiva)
3. **Interatividade timeboxed** (checkpoints, demos, enquetes — sem quebrar fluxo)
4. **Implementação pronta para produção** (slides web ou estrutura para PPT/Keynote)
5. **Acessibilidade e legibilidade impecáveis**

---

## CAMINHOS PADRÃO

| Artefato                     | Caminho                      |
| ---------------------------- | ---------------------------- |
| **Exports (ZIP, PDF, PPTX)** | `exports/` (raiz do projeto) |
| Slides fonte                 | `OSTEOPOROSE/src/slides/`    |
| CSS                          | `OSTEOPOROSE/src/css/`       |
| Scripts                      | `scripts/`                   |

**Regra:** Todos os artefatos de exportação (ZIP, PDF, PPTX) devem ser salvos em `exports/` na raiz (`C:\Dev\Projetos\Aulas2\exports\`).

---

## REPOSITÓRIO REMOTO

| Campo        | Valor                                                             |
| ------------ | ----------------------------------------------------------------- |
| **Remote**   | `origin`                                                          |
| **URL**      | `https://github.com/lucasmiachon-blip/aulas_core.git`             |
| **Branch**   | `main`                                                            |
| **Política** | Local e GitHub devem estar **sempre espelhados** (mesmo conteúdo) |

**Regras de sync:**

- Push apenas quando o usuário solicitar explicitamente
- O remote pode estar à frente do local (edições por outras ferramentas/sessões)
- Se o usuário pedir para sobrescrever o GitHub, usar `git push --force origin main`

---

## TECH STACK

| Camada          | Tecnologias                             |
| --------------- | --------------------------------------- |
| Apresentações   | PptxGenJS (Node.js)                     |
| Frontend        | React, TypeScript, Tailwind CSS         |
| Slides Web      | HTML/CSS/JS modular (slide-loader.js)   |
| Design Tools    | Figma exports, SVG assets, Google Fonts |
| Build           | Vite, ESBuild                           |
| Package Manager | npm (preferir `npm ci` para installs)   |

---

## COMMANDS

```bash
npm run dev # Start dev server
npm run build # Production build
npm run lint # ESLint check
npm run format # Prettier format
npm run test # Run tests
npm run slides:build # Generate .pptx from source
npm run slides:preview # Convert slides to images for QA
```

---

## ARQUITETURA

```
Aulas2/
├── OSTEOPOROSE/ ← Apresentação Osteoporose
│ ├── src/ ← Área de trabalho
│ │ ├── index.html ← Template principal
│ │ ├── print.html ← Versão para impressão/PDF
│ │ ├── slides/ ← Slides modulares (S01-S72)
│ │ ├── css/ ← Estilos (base, viewer, print, blocks, polish)
│ │ └── js/ ← Scripts (viewer, navigation, slide-loader, print-fit)
│ ├── exports/ ← PDF, PPTX gerados
│ └── assets/ ← Imagens, ícones, fontes
│
├── GRADE/ ← Apresentação GRADE
│ ├── src/ ← Mesma estrutura modular
│ └── dist/ ← Versão de produção
│
├── exports/ ← Artefatos finais (ZIP, PDF) ← CAMINHO PADRÃO
├── scripts/ ← Scripts de automação e exportação
├── docs/ ← Protocolos, guias, roles
├── screenshots/ ← Capturas para QA
├── CLAUDE.md ← Este arquivo (persona + aprendizado)
├── chatgpt.md ← Contexto de auditoria
├── CHANGELOG.md ← Histórico de mudanças
└── README.md ← Documentação do projeto
```

---

## PRINCÍPIOS OBRIGATÓRIOS

### A) Estrutura Narrativa (Duarte/Sparkline)

- Cada bloco: **problema → insight → evidência → implicação → próximo passo**
- Abertura: hook rápido (primeiros segundos contam)
- Sparkline: "o que é" vs "o que poderia ser" (ritmo natural, sem forçar)
- Key takeaways claros (idealmente poucos e memoráveis)
- Fechamento + call to action

### B) Psicologia Cognitiva Aplicada

- **Uma ideia por slide** (ou por batida)
- **Sinalização (signaling)**: destacar o que importa com contraste, posição e progressão
- **Chunking**: agrupar em 3-5 itens quando necessário
- **Dual coding**: texto mínimo + visual com significado
- **Evitar split attention**: não competir com fala + texto denso
- **Progressiva revelação**: animação só quando reduz carga e guia atenção

### C) UI/UX e Hierarquia de Atenção

- Headline curta com afirmação (assertion) — brevidade é força
- Corpo de tela: só o essencial (evitar parágrafos)
- Grid, alinhamento, espaço em branco e consistência tipográfica
- Contraste suficiente e tamanho de fonte legível para o contexto (auditório, tela, print)
- Gestalt (proximidade, similaridade) e preattentive cues (tamanho, peso, posição)

### D) Interatividade (profissional, sem "gimmick")

- Checkpoints planejados com objetivo claro: atenção, diagnóstico, decisão
- Demo ao vivo: plano B sempre (vídeo/gif, screenshots, fallback)
- Perguntas do público: janela roteirizada, tempo controlado

### E) Produção (padrão internacional)

- Evitar jargões locais e memes que não traduzem
- Idioma neutro, exemplos culturalmente seguros
- Unidades e números consistentes
- Speaker notes para ritmo e ênfase

---

## REGRAS DE QUALIDADE (NÃO NEGOCIÁVEIS)

1. **Nada de slide lotado.** Se ficar denso, quebre em 2-4 slides.
2. **Não use bullets por hábito.** Use bullets só quando for a melhor forma.
3. **Cada slide deve responder:** "O que o público deve lembrar em 24h?"
4. **Dados exigem fonte.** Se não tiver, sinalize "DADO A CONFIRMAR".
5. **Degradação graciosa.** A apresentação deve funcionar sem animações.
6. **O output deve parecer deliberadamente desenhado** — nunca genérico, nunca "AI slop".
7. **Qualidade milimétrica.** Cada pixel tem propósito. Primeiro render é rascunho. Revisar com olho de diretor antes de entregar.
8. **Teste de conferência.** "Isto seria aprovado para TED/ASCO/ESC?" Se não, refazer.
9. **Ponto focal obrigatório.** Cada slide tem UM elemento dominante. Se nenhum domina, redesenhar.
10. **Consistência cross-slide.** Títulos na mesma altura, mesmo tamanho, mesmo peso em todos os content slides. Consultar design tokens antes de editar.
11. **Zero AI markers.** Sem linhas de acento sob títulos, gradientes genéricos, ou decoração sem propósito.
12. **Paralelismo obrigatório.** Ao polir um slide (fontes, sombras, tamanhos, cores), o MESMO padrão deve ser aplicado a TODOS os slides do mesmo tipo. Nunca polir um slide isoladamente — a inconsistência resultante é pior que o estado anterior. Se não há tempo para padronizar todos, documentar as escolhas feitas e marcar como dívida técnica.
13. **Data slides = narrativa, não tabela.** Quando múltiplos dados competem, NÃO dar peso igual a todos. O pior caso deve ser visualmente DOMINANTE (hero card, bg escuro, número gigante). Usar flex proporcional à severidade, color intensity cascade, e border-left como accent. Rows iguais = tabela de planilha. Rows proporcionais = narrativa visual.
14. **Slide novo = tokens do vizinho.** Antes de começar um slide, abrir o slide anterior e posterior, extrair tokens visuais (title size/weight, subtitle color, footer style), e aplicá-los PRIMEIRO. Só depois projetar o conteúdo. Inconsistência entre slides vizinhos é pior que imperfeição isolada.

---

## FILOSOFIA DE DESIGN

### Slides

- **Todo slide precisa de elemento visual** — imagem, gráfico, ícone ou shape. Nada de slide só texto.
- **Paleta bold, informada pelo tema** — nunca default azul genérico.
- **Sandwich dark/light**: backgrounds escuros para título + conclusão, claros para conteúdo.
- **Motivo visual consistente** — um elemento distintivo repetido em todos os slides.
- **Dominância sobre igualdade**: uma cor a 60-70% peso visual, 1-2 tons de suporte, um accent marcante.
- **Variar layouts** — alternar entre colunas, grids, callouts, imagens half-bleed. Nunca repetir layout em slides consecutivos.
- **Font pairing importa** — header font distintiva + body font limpa. Nunca Arial sozinho.
- **Nunca usar linhas de acento sob títulos** — é marca de AI. Usar whitespace ou background color.
- **Severity Cascade para data slides** — quando dados têm hierarquia natural (pior → melhor), usar:
  - `flex` proporcional à severidade (flex: 3 para pior, flex: 1 para menor)
  - **Hero card** (bg navy, número grande em gold) para o item dominante
  - **Color intensity cascade**: navy bg → gold-dark border-left → gold lighter → muted
  - **Border-left como accent**: espessura proporcional à importância (5px → 4px → 0)
  - Exemplo: S08b (QALYs por sítio de fratura)

### Dívida técnica — paralelismo cross-slide (GRADE)

> **Status:** S19 foi polido milimetricamente. Os demais slides de conteúdo podem ter tamanhos, sombras e labels diferentes. Ao editar qualquer slide futuro, usar S19 como referência e replicar padrões.

**Tokens inline de referência (S19 — padrão-alvo):**

| Elemento                | Valor                                       | Nota                 |
| ----------------------- | ------------------------------------------- | -------------------- |
| Eyebrow (categoria)     | `0.72vw` uppercase, 700, `var(--muted)`     | Acima do h2          |
| Labels de seção         | `0.65vw` uppercase, 800, `var(--muted)`     | Dentro de painéis    |
| Body text painéis       | `0.78vw`, line-height 1.35, `var(--navy)`   | Informação principal |
| Domain titles (direita) | `0.9vw`, 800, `var(--navy)`                 | Títulos de domínio   |
| Domain descriptions     | `0.78vw`, `var(--muted)`                    | Descritivos          |
| Status tags ("baixo")   | `0.75vw`, 700, `var(--teal)`                | Alinhados à direita  |
| Chip                    | `0.68vw`                                    | Badge no header      |
| Hero número             | `3.4vw` serif, 800, `var(--teal)`           | Ponto focal          |
| Hero sub-text           | `0.78-0.95vw`, `var(--navy)`                | Contextual           |
| Shadow (hero card)      | `0 0.2vw 0.8vw rgba(var(--navy-rgb), 0.07)` | Sutil, profissional  |
| Border-left accent      | `0.18-0.22vw solid var(--X)`                | Semântico por cor    |
| Gap entre painéis       | `0.4-0.65vw`                                | Flex column          |
| Grid principal          | `1.15fr 1.65fr` com `gap: 1.4vw`            | 2 colunas            |

**Ao polir outro slide:** abrir S19 como referência lateral e replicar tipografia, sombras, espaçamentos. Não inventar novos valores.

### Frontend

- **Tipografia primeiro** — escolher fontes distintivas e com caráter. Evitar Inter, Roboto, Arial como defaults.
- **Direção estética bold** — commitar com identidade visual clara (minimal, editorial, brutalist, etc.).
- **Motion com propósito** — preferir uma orquestração de page load com staggered reveals ao invés de micro-interações dispersas.
- **Composição espacial** — abraçar assimetria, overlap, negative space, elementos que quebram grid.
- **CSS variables** para todas as cores, espaçamento, escalas tipográficas.

---

## CODE CONVENTIONS

- TypeScript strict mode, evitar `any`
- Functional components com hooks
- Named exports (preferir sobre default exports)
- Tailwind utility classes para styling
- Indentação consistente (2 ou 4 spaces — manter padrão do projeto)
- `camelCase` para variáveis/funções, `PascalCase` para componentes
- Preferir SVG para ícones e ilustrações
- Imagens com `alt` text descritivo

---

## PROCESSO DE TRABALHO

### Antes de qualquer mudança visual:

```
1. PARAR e perguntar: "Qual é o problema real?"
2. Ver o resultado atual (screenshot/PDF)
3. Identificar o problema específico (não "está ruim")
4. Propor solução direcionada
5. Aplicar e verificar
6. Documentar aprendizado
```

### OBRIGATÓRIO — Ciclo Produção → Screenshot → Crítica → Fix

> **Regra inviolável:** Após produzir qualquer slide, SEMPRE:

```
1. GERAR screenshot de máxima precisão (1600×900, resolução do viewer)
2. AVALIAR criticamente como front-end sênior + diretor de apresentações
3. LISTAR problemas específicos (não "está OK")
4. CORRIGIR os problemas encontrados
5. GERAR novo screenshot
6. REPETIR até passar no checklist abaixo
7. SÓ ENTÃO mostrar ao usuário
```

**Nunca entregar sem ter visto o screenshot. Nunca dizer "pronto" sem o ciclo completo.**

**Coisas a verificar no screenshot:**

- % de whitespace: > 30% em um bloco = problema (exceto se intencional/centered)
- Dead space DENTRO de cards: indica flex/grid stretch indevido
- Font sizes na resolução real: 12px no viewer a 1600px pode ser ilegível
- Hierarquia visual: se todos os elementos têm o mesmo peso, o slide é genérico
- Contraste: textos claros em fundos claros são invisíveis no projetor

### Checklist de qualidade visual (usar SEMPRE):

| Critério     | Verificar                                   |
| ------------ | ------------------------------------------- |
| Ponto focal  | Existe UM elemento dominante?               |
| Hierarquia   | 3 níveis claros (título > corpo > detalhe)? |
| Contraste    | Texto legível? WCAG AA mínimo?              |
| Whitespace   | Intencional ou "sobra"?                     |
| Alinhamento  | Elementos alinhados em grid invisível?      |
| Consistência | Mesmo padrão que slides anteriores?         |
| Scanning 3s  | Mensagem principal óbvia em 3 segundos?     |
| Carga cogn.  | Uma ideia por slide? Chunks de 3-5?         |
| Dual coding  | Visual complementa texto (não duplica)?     |
| Narrativa    | Slide avança a história? Tem propósito?     |
| Fill ratio   | Conteúdo preenche ≥70% da área útil?        |
| Dead space   | Zero whitespace acidental DENTRO de cards?  |

### QA — Slides (obrigatório)

1. Gerar slides → converter para imagens a **1600×900** → inspeção visual
2. Checar: elementos sobrepostos, text overflow, texto/ícones low-contrast, espaçamento desigual
3. Checar: **% de preenchimento** (conteúdo vs whitespace) — alvo ≥ 70%
4. Checar: **dead space dentro de containers** (cards, boxes) — deve ser zero
5. Verificar placeholders: `grep -iE "xxxx|lorem|ipsum" output`
6. Corrigir → re-verificar → repetir até pass limpo

### QA — Frontend

- Responsive check nos breakpoints relevantes (mobile, tablet, desktop, wide)
- Contraste de cores adequado (WCAG AA como referência)
- Navegação por teclado funcional
- Sem layout shifts no load

### Saídas esperadas para apresentações novas:

1. **Visão Geral** — tema, público, objetivo, "big idea", tom, duração, ritmo
2. **Narrativa (Duarte)** — hook, sparkline, 3 takeaways, CTA
3. **Storyboard slide-by-slide** — headline, conteúdo, visual, animação, notas, objetivo cognitivo, tempo
4. **Sistema Visual** — grid, tipografia, paleta, componentes
5. **Plano de Interatividade** — checkpoints, demos, antifalhas
6. **Implementação Front-End** (se solicitado) — stack, estrutura, código, acessibilidade
7. **QA Final** — checklist completo

---

## REFERÊNCIAS RÁPIDAS

### Tipografia para apresentações (guidelines flexíveis)

| Elemento         | Referência          | Peso           |
| ---------------- | ------------------- | -------------- |
| Título principal | Grande, impactante  | Bold (700+)    |
| Subtítulo        | Intermediário       | Semi-bold      |
| Corpo            | Legível a distância | Regular-Medium |
| Caption/fonte    | Discreto, legível   | Regular        |

**Princípio:** Escalar conforme contexto (auditório grande = fontes maiores; tela = ajustar para viewport). O importante é a **hierarquia clara** entre níveis, não os números exatos.

### Contraste de cores (WCAG — referência padrão)

| Uso                   | Referência WCAG AA |
| --------------------- | ------------------ |
| Texto grande (bold)   | ~3:1               |
| Texto normal          | ~4.5:1             |
| Elementos interativos | ~3:1               |

**Princípio:** Usar como guia, não como regra rígida. O olho treinado percebe quando o contraste está insuficiente — confiar no visual e validar com ferramentas quando necessário.

### Regras Duarte (resumo)

1. **Uma ideia por slide**
2. **Título = conclusão** (não descrição)
3. **Ponto focal claro**
4. **Dados precisam de contexto**
5. **Animação com propósito**
6. **Contraste "o que é" vs "o que poderia ser"**
7. **Hook nos primeiros 30s**
8. **Call to action no fechamento**

---

## NOTAS IMPORTANTES

- **NUNCA** commitar API keys ou arquivos `.env`
- Todas as imagens devem ter `alt` text
- Preferir SVG para ícones e ilustrações
- Usar `@` imports para referenciar arquivos do projeto
- **NUNCA** inventar números, dados ou citações — usar `[TBD]` se faltar
- **SEMPRE** usar `var(--nome)` para cores — nunca hardcoded `#XXXXXX`
- **SEMPRE** atualizar `CHANGELOG.md` em cada commit

---

## REGISTRO DE ERROS & APRENDIZADOS

### Sessão 2026-02-07 (Round 5 — S09 GRADE: padding + overlap fix)

**Foco:** Ajustar padding e corrigir sobreposição da ref no S09 (CAC: leitura GRADE explícita) após integração da figura MESA.

#### Erro 20: Over-engineering "minor fix" — 5 iterações quando 1 bastava (REINCIDÊNCIA 3ª vez: Erros 1, 6, 10)

**O que aconteceu:** O usuário disse que S09 estava "muito bom" e só precisava "ajustar padding e mínimas sobreposição". Em vez de fazer a correção mínima (mover ref de `bottom: 4%` para `bottom: 1%`), fiz 5 iterações de mudanças cada vez mais complexas:

1. Reduzi paddings, gaps e margins em todo o slide (0.85→0.7vw, 2vw→1.8vw, 1.6vw→1.2vw)
2. Troquei inner grid para flex com `space-between` (criando gaps artificiais entre domain cards)
3. Mudei o grid para `grid-template-rows: 1fr auto` com ref como row spanning
4. Múltiplas tentativas de posição da ref
5. Cada iteração piorou — o usuário disse "ficou pior e ainda corta em baixo"

**Por que estava errado:**

- O usuário disse que estava "muito bom" — o fix deveria ser MÍNIMO (mover a ref para baixo)
- Mudei paddings, gaps, flex behavior, grid structure, distribuição interna — nada disso foi pedido
- Cada iteração adicionou complexidade em vez de resolver o problema único (ref sobrepondo card)
- A reversão final para o estado original + `bottom: 1%` + `padding-bottom: 1.8vw` era o que deveria ter sido a PRIMEIRA e ÚNICA mudança

**REINCIDÊNCIA (3ª vez):**

| Ocorrência | Erro                       | Padrão                                             |
| ---------- | -------------------------- | -------------------------------------------------- |
| 1ª         | Erro 1 (sessão 2026-02-03) | Mudanças incrementais sem visão clara              |
| 2ª         | Erro 6 (sessão 2026-02-05) | 19 slides alterados de uma vez sem validação       |
| 3ª         | Erro 20 (esta sessão)      | 5 iterações de over-engineering num fix de 1 linha |

**Checklist OBRIGATÓRIO pré-ação (criado pela 3ª reincidência):**

```
ANTES de editar qualquer slide que o usuário disse estar "bom" ou "muito bom":
1. Listar EXATAMENTE o que o usuário pediu para mudar (nada mais)
2. Propor a mudança MÍNIMA (idealmente 1-2 propriedades CSS)
3. Aplicar APENAS essa mudança
4. Screenshot → verificar
5. SÓ adicionar mais mudanças se o screenshot revelar problema novo
6. NUNCA mudar layout/structure se o pedido foi padding/overlap
```

**Aprendizado:**

- **"Muito bom, só precisa X" = escopo é APENAS X** — não expandir
- **Princípio da intervenção mínima:** se uma propriedade CSS resolve, não mudar 15
- **Over-engineering em "minor fix" é pior que o problema original** — cada mudança extra é risco de regressão
- **Reverter para o original e fazer a mudança mínima é SEMPRE uma opção** — deveria ter sido a primeira

### Sessão 2026-02-07 (Round 3+4+5 — Polish → Redesign S33+S35 OSTEOPOROSE)

**Foco:** Dois passes de perfeição visual nos slides S33 (HORIZON) e S35 (Replicação GRADE) — consistência cross-slide, recrop de assets, tipografia, análise retina 2x DPI

**Round 3 — Token standardization:**

- Padronização de tokens cross-slide S33↔S35: title 38px, subtitle 15px, padding 32/44/16/44, footer 10px
- Hero card S35: padding 18px/22px (vs S33 22px all — deliberadamente mais compacto para 4 painéis)
- GRADE domains: gap 5→6px, checkmark 12→13px, text 12→12.5px
- Interpretação GRADE: 12.5→13px para legibilidade a distância
- Image card padding/label harmonizados (10px label, 14px card padding)
- S33 insight box: visibilidade melhorada (bg 0.04→0.05, text 0.55→0.60, size 12→12.5px)
- Hero card label S35: 9→10px (harmonização com S33's 11px)

**Round 4 — Retina analysis + precision fixes:**

- Recrop forest plot JAMA (Cummings 2019 Fig 3) — removido blue JAMA separator line + garantido "Risk Ratio (95% CI)" axis label completo
- Grid gap S35: 20→22px (match S33)
- GRADE circles: 16→18px (legibilidade auditório)
- Section labels ("Domínios GRADE", "Interpretação GRADE"): 9→10px, color 0.4→0.45
- Interpretation panel: removido flex:1 (eliminado dead space interno)
- S33 statin conclusion: 14px bold italic → 15px bold only + letter-spacing: -0.01em (punchline mais limpo)
- S33: Testei `align-items: stretch` no grid → REVERTIDO (criava whitespace interno excessivo no KM card 700px). `align-items: start` é correto para imagem com resolução limitada
- S33 KM card: adicionado min-height:0 + overflow:hidden (defensive CSS)

**Erros:** Nenhum novo. Tentativa de stretch no S33 foi detectada e revertida no mesmo ciclo.

#### Insight 8: Token audit cross-slide como passo obrigatório antes de polir

**O que fiz bem:** Antes de tocar em S35, tirei screenshot de S32 (vizinho anterior), S33, S35 e S08 (vizinho posterior). Montei tabela comparativa de tokens (title size, subtitle, padding, hero padding). Identifiquei 6 inconsistências e corrigi todas sistematicamente.

**Por que funciona:** Regra 14 do CLAUDE.md ("Slide novo = tokens do vizinho") aplicada como audit, não como afterthought. O resultado é que S33 e S35 agora formam um par visual coeso — a plateia percebe que são slides do mesmo "capítulo" pela consistência tipográfica, mesmo com conteúdos contrastantes.

**Padrão extraído:**

```
ANTES de polir qualquer slide:
1. Tirar screenshot dos 4 slides: anterior, o slide, posterior, e o "par" narrativo
2. Montar tabela de tokens: title size/weight, subtitle size/color, padding, footer, hero card
3. Identificar inconsistências
4. Padronizar PRIMEIRO, polir DEPOIS
```

#### Insight 9: Tipografia proporcional como recurso narrativo

**O que fiz bem:** O hero number em S33 é 52px (HR 0.72 — resultado impressionante) e em S35 é 44px (RR 0.95 — resultado nulo). A redução deliberada de tamanho tipográfico espelha a deflação do achado clínico.

**Por que funciona:** Na Escola Duarte, contraste tipográfico é contraste narrativo. O público inconscientemente associa "número grande = impactante" e "número menor = menos relevante". Quando passam de 0.72 (52px) para 0.95 (44px), a deflação visual amplifica a mensagem.

**Padrão extraído:**

- **Hero numbers** em slides sequenciais podem ter tamanhos diferentes para reforçar a narrativa
- Slide que apresenta resultado positivo: hero number ≥ 50px
- Slide que contradiz/deflaciona: hero number 40-46px
- A diferença deve ser perceptível mas não gritante (8-12px max)

#### Insight 10: align-items:stretch com imagem de baixa resolução cria dead space interno

**O que fiz:** Testei `align-items: stretch` no grid do S33 para eliminar cream gap abaixo do KM card. O card se expandiu, mas a imagem (700×268 natural) com `object-fit: contain` ficou flutuando no meio de um card alto (812×539 container). Resultado: mais whitespace DENTRO do card do que havia FORA dele.

**Por que estava errado:** `align-items: stretch` funciona quando o conteúdo preenche naturalmente o espaço extra (ex: forest plot de 2268×1240 no S35, que preenche bem). Mas com imagem de resolução limitada, stretch cria um container grande com imagem pequena dentro — pior que o gap externo.

**Regra:** `align-items: stretch` só quando o conteúdo-fonte tem resolução suficiente para preencher. Com imagem upscaled (<2x do rendered), usar `align-items: start` e aceitar o gap externo.

#### Insight 11: Retina screenshot (2x DPI) revela problemas invisiveis a 1x

**O que fiz bem:** Capturei com `deviceScaleFactor: 2` (3200×1800 effective pixels) e medição de computed styles via `page.evaluate()`. Isso revelou: upscaling do KM (700→812px), precisão do crop do forest plot, e legibilidade real das micro-tipografias (9-10px labels).

**Padrão extraído:**

- Screenshots de QA devem ser SEMPRE 2x DPI mínimo
- Medir `naturalWidth` vs `renderedWidth` de todas as imagens — ratio < 1.5 indica upscaling
- Labels abaixo de 10px em 1600×900 podem ser ilegíveis em auditório — 10px é o mínimo prático

#### Insight 12: Consolidação de cards reduz ruído e fortalece hierarquia

**O que fiz (Round 5 — redesign S33):** S33 tinha 9 elementos visuais competindo: hero card, KM card, RRR, NNT, Population card, Insight box, Statin callout (gold border), title, footer. O resultado era denso e sem hierarquia clara.

**Redesign:**

- Population card (4 dados em card branco com borda) → **embutido no hero card** como strip sutil (`rgba(255,255,255,0.07)` bg dentro do navy card)
- Insight box ("Curvas divergem...") → **removido** (redundante — o KM mostra isso visualmente)
- Statin callout (gold border + bg full-width) → **border-left accent** com dados inline e punchline separada por divider sutil
- Resultado: 9 → 6 elementos. HR 0.72 domina incontestadamente.

**Padrão extraído:**

- **Dados qualificadores** (n, idade, critérios de inclusão) podem ser embutidos no hero card como strip inferior — não precisam de card próprio
- **Nunca narrar o que o visual já mostra** — se o KM mostra divergência, não adicionar texto dizendo "as curvas divergem"
- **Border-left accent** é mais elegante que border-all para callouts secundários — cria hierarquia sem competir com o conteúdo principal
- **Regra 6→4:** Se um slide tem > 6 elementos visuais distintos, consolidar até ≤ 6

#### Insight 13: Callout full-width abaixo da grid = dead space; integrar na coluna resolve

**O que fiz (Round 6 — V3 S33):** V2 tinha o callout de estatinas como elemento full-width ABAIXO da grid (KM + Hero/RRR/NNT). Como a grid tinha `flex:1` e o conteúdo era mais curto que o espaço, ~150px de cream ficavam vazios entre a grid e o callout.

**Fix V3:** Movi o callout para DENTRO da coluna direita, ancorado ao fundo com `margin-top: auto`. A grid agora contém TODA a informação. O gap restante (entre RRR/NNT e callout) funciona como "pausa dramática" antes da punchline — intencional, não sobra.

**Também fixei:** KM card `align-items: flex-start` (imagem no topo, ref no rodapé via `margin: auto 0 0 0`), statin labels 9px→10px para legibilidade de auditório, punchline com `background: rgba(navy, 0.04)` para separação visual.

**Padrão extraído:**

- **Callouts secundários NUNCA devem ser full-width isolados abaixo da grid** — integrar na coluna mais relevante
- **`margin-top: auto` em callout dentro de flex column** = ancora ao fundo, cria gap intencional
- **Fill ratio subiu de ~55% para ~78%** com a mesma informação — puro layout
- **Imagem em card stretch:** `align-items: flex-start` > `center` quando a imagem é curta (evita dead space simétrico)
- **Textos de callout em auditório:** mínimo 10px para labels, 15-16px para dados
- **Navy bookends em coluna** (hero top + conclusion bottom) criam sandwich Duarte e color story: navy → gold → navy
- **Clinical pearl com `flex:1; align-items:center`** distribui gap simetricamente — transforma dead space em ritmo visual
- **Gold accent chain:** stats (gold border) → pearl (gold border-left) → punchline (gold text on navy) = consistência cromática sem monotonia

#### Insight 14: Layout deve seguir o aspect ratio do asset, não o contrário (CRÍTICO)

**O que aconteceu (V2-V4 S33):** Fiz 4 versões do S33 com layout 2-colunas (55%/45% grid). Todas falharam porque a imagem KM (700×268, ratio 2.6:1) é ultra-wide. Em qualquer grid vertical, ela gera ~150-300px de dead space. Tentei preencher com clinical pearl, navy bookends, margin-auto — nada funcionou. O layout 2-colunas era INCOMPATÍVEL com o asset.

**Fix V5 (3 bandas horizontais):** Reformulei completamente para 3 bandas horizontais:

- **Band 1 (navy):** título + 0.72 hero stat side-by-side — dado e título na mesma linha
- **Band 2 (cream, flex:1):** chart FULL-WIDTH (`width:100%; height:100%; object-fit:contain`) — preenche toda a banda
- **Band 3 (navy):** statin comparison + punchline em row horizontal

Fill ratio: **~92%**. Zero dead space. Duarte sandwich (dark→light→dark).

**Padrão extraído:**

- **Imagem wide (ratio >2:1) → layout horizontal (bandas)** — NUNCA 2-colunas
- **Imagem tall (ratio <1:1) → layout vertical (colunas)** — grid funciona
- **Imagem quadrada (~1:1) → qualquer layout** — flexível
- **`width:100%; height:100%; object-fit:contain`** = imagem preenche o container mantendo ratio
- **`max-width:100%; max-height:100%`** NÃO escala para cima — só limita o máximo
- **Duarte sandwich (dark→light→dark)** funciona melhor quando a cream band tem conteúdo denso (chart full-width)
- **Title + hero stat side-by-side** economiza ~80px vertical vs stacked — crucial quando vertical é escasso

### Sessão 2026-02-07 (Round 2 — Reestilização bg-navy + QA visual GRADE)

#### Erro 17: Chip CSS faltando override para bg-navy (chip--muted, chip--navy invisíveis)

**O que fiz:** Converti S03 e S06 para `bg-navy` mas não verifiquei se os chips existentes (`chip--muted`, `chip--navy`) funcionavam em fundo escuro. No screenshot, "FORTE", "CONDICIONAL" e "recomendação + grau" eram invisíveis (navy text on navy bg).

**Por que estava errado:** O `blocks.css` tinha overrides para `.bg-navy .iconCircle`, `.bg-navy .small-title`, `.bg-navy .label-gold`, mas NÃO tinha `.bg-navy .chip--muted` nem `.bg-navy .chip--navy`. Ao converter slides para bg-navy, preciso verificar TODOS os componentes CSS.

**Correção:** Adicionados `.bg-navy .chip--muted` e `.bg-navy .chip--navy` com `color: rgba(255,255,255,0.88); background: rgba(255,255,255,0.10)`.

**Aprendizado:**

- **Ao converter slide para bg-navy:** verificar TODOS os componentes CSS usados no slide contra overrides existentes em `blocks.css`
- **Checklist de componentes a verificar em bg-navy:** `.chip--*`, `.card`, `.note`, `.label-gold`, `.small-title`, `.iconCircle--*`, `.ref`, `.source`
- **Screenshot é inegociável** — sem ele, chips invisíveis passam despercebidos

#### Erro 18: Dead space em cards com conteúdo desigual (flex:1 + margin-top:auto)

**O que fiz:** Usei `flex:1` nos cards de comparação (Certeza vs Força no S05, Downgrades vs Upgrades no S06) com `margin-top:auto` no footer. Quando um card tem menos conteúdo (ex: 3 upgrades vs 5 downgrades), o espaço entre bullets e footer fica visivelmente maior.

**Por que é aceitável mas deve ser monitorado:** O `margin-top:auto` ancora o footer na base, criando visual de "breathing room intencional". Em conferência, isso funciona — é melhor que cards de altura desigual. Mas se o gap for >25% da altura do card, é dead space.

**Padrão:**

- **Cards com conteúdo desigual:** `margin-top:auto` é a melhor opção disponível
- **Monitorar:** se o gap interno > 25% da altura do card, adicionar conteúdo ou reduzir a altura
- **Alternativa:** `align-items:flex-start` nos cards (alturas desiguais) — mais honesto mas menos elegante

#### Insight 7: Bloco visual escuro (3+ slides bg-navy consecutivos) cria contraste narrativo

**O que fiz bem:** Posições 3-5 agora são todas `bg-navy`, formando um bloco escuro que se destaca do slide claro na posição 6+. O contraste dark→light cria um "capítulo" visual.

**Por que funciona:** Duarte Sparkline — alternar "tensão" (escuro, conceitos fundamentais) vs "resolução" (claro, aplicação prática). A plateia percebe a mudança de ritmo inconscientemente.

**Padrão extraído:**

- Usar 3+ slides bg-navy consecutivos para criar "bloco de fundamentos"
- Voltar para bg claro quando o conteúdo muda de conceitual para aplicado
- O contraste de backgrounds funciona como separador de capítulos sem precisar de slide-divisor explícito

### Sessão 2026-02-07 (Round 1 — Mover slide para apêndice)

#### Erro 16: Confundir nome do arquivo (S07.html) com posição no deck (slide 7 = S04)

**O que fiz:** O usuário pediu "mova o slide 7 para o apêndice". Eu interpretei "slide 7" como o **arquivo** `S07.html` (Indireção). Mas o usuário se referia ao slide na **posição 7 do contador** do viewer, que era `S04.html` (Calibragem rápida). Movi o slide errado.

**Por que estava errado:** No sistema `_list.txt`, a ordem de apresentação é diferente da numeração dos arquivos. O `_list.txt` do GRADE tinha S04 na posição 7, não S07. O contador do viewer (`7 / 58`) reflete a **posição no deck**, não o nome do arquivo. O usuário inclusive compartilhou um screenshot mostrando o slide correto com o contador "7 / 58".

**Evidência ignorada:** O screenshot do usuário mostrava claramente:

- Contador: `7 / 58`
- Título: "Calibragem rápida: como você decide?"
- Chip: "INTERAÇÃO — CALIBRAR A SALA (ETD)"

Eu nem olhei o screenshot antes de agir.

**Correção:** Reverti a mudança errada (S07 de volta à posição original) e movi S04 corretamente para o apêndice.

**Aprendizado:**

- **"Slide N" = posição N no contador/viewer, NUNCA arquivo SNN.html** — a `_list.txt` reordena slides; posição ≠ nome de arquivo
- **SEMPRE consultar `_list.txt` para mapear posição → arquivo** antes de mover/editar qualquer slide
- **SEMPRE olhar screenshots/imagens do usuário ANTES de agir** — contêm evidência concreta do que ele está vendo
- **Regra mental:** Quando o usuário diz "slide 7", fazer: `sed -n '7p' _list.txt` → descobrir qual arquivo está na posição 7 → confirmar com o conteúdo

**Mapeamento rápido (GRADE atual):**

| Posição | Arquivo             | Conteúdo (resumo) |
| ------- | ------------------- | ----------------- |
| 1       | S01                 | Título            |
| 2       | S02                 | ...               |
| ...     | ...                 | ...               |
| N       | `_list.txt` linha N | Verificar SEMPRE  |

### Sessão 2026-02-06 (Round 8 — Print 16:9 + um slide por página)

**Problema:** index.html?print=1 não ficava em formato 16:9 único slide por página; conteúdo “comia” de baixo (vários slides empilhados com altura natural + corte no PDF).

**Causa:** Em `print.css`, no bloco `@media screen` para `html.is-print`, o `.slide` não tinha largura/altura fixas — os slides empilhavam com altura do conteúdo e no PDF cada slide era 9.375in com `overflow: hidden`, cortando o que passasse.

**Correção (HC2: ~6 linhas em print.css):** Forçar caixa 16:9 por slide na pré-visualização: `html.is-print .slide { width: 1600px; height: 900px; min-height: 900px; max-height: 900px; overflow: hidden; box-sizing: border-box; }` (além do zoom já existente). Assim, na tela com ?print=1 cada slide é uma “página” 16:9 no scroll; no @media print mantém-se 16.667×9.375in e overflow:hidden (Erro 9 respeitado).

**Limite:** Conteúdo que passar de 900px continua cortado. “Todo conteúdo dentro” exigiria escala (JS) ou redução de conteúdo no slide — documentado em REGENERAR_PRINT_E_PDF.md.

### Sessão 2026-02-06 (Round 7 — Debug Session)

#### Diagnóstico realizado (sem correções aplicadas — por decisão do usuário)

**Foco:** Debug sistemático com runtime evidence (RADAR-5W + instrumentação de logs)

**Hipóteses testadas:**

| #   | Hipótese                                                       | Resultado                                                                                                                                           | Evidência                                                        |
| --- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| H1  | S14b geraria data-key duplicado "S14"                          | **PARCIAL** — Sem duplicata, mas S14b recebe `dataKey: "NONE"` (regex `/^(S\d{2})_/` não captura "S14b\_"). Hash navigation para S14b não funciona. | Log: `slideIndex:12, file:"S14b_slide-14b.html", dataKey:"NONE"` |
| H2  | print.html desatualizado vs slides do viewer                   | **CONFIRMADO** por leitura — print.html não tem `--gold-dark`, ainda tem linha decorativa gold no S01.                                              | Comparação direta de código                                      |
| H3  | GRADE @media print com `overflow:visible` pode causar bleeding | **NÃO TESTADO** — requer geração de PDF para confirmar                                                                                              | —                                                                |
| H4  | GRADE \_list.txt sem .html pode falhar                         | **REJEITADO** — JS adiciona .html automaticamente, 58 slides carregaram OK                                                                          | Log: `totalSlides:58`                                            |
| H5  | Counter não bate com número do slide HTML                      | **CONFIRMADO** — slides reordenados na \_list.txt mas arquivos não renomeados. Counter posição 9 = S13, posição 10 = S12, etc.                      | Log: `slideIndex:8, file:"S13_slide-13.html"`                    |

**Decisão do usuário:** Manter como está. O counter mostra posição no deck (correto para apresentação). Nomes de arquivos são identificadores internos. Renomear 72+ arquivos seria refatoração desnecessária (HC7).

**Bug conhecido não corrigido (por decisão de manter estabilidade):**

- `slide-loader.js` regex `/^(S\d{2})_/` deveria ser `/^(S\d{2,3}[a-z]?)_/` para capturar S14b (documentado no Erro 5, sessão 2026-02-05, nunca aplicado no código-fonte)

**Aprendizados desta sessão:**

1. **Runtime evidence > code reading** — Ler código sugeria que S14b teria data-key duplicado. Logs de runtime provaram que na verdade o regex falha silenciosamente (sem match = sem key). Conclusão diferente, fix diferente.
2. **Nem todo "problema" precisa de fix** — Counter vs filename é uma divergência, não um bug. Para o apresentador e a plateia, o counter (posição no deck) é o que importa.
3. **Debug mode exige disciplina de cleanup** — Instrumentação adicionada deve ser 100% removida. Auto-formatação do editor pode transformar 3 linhas adicionadas em 400 linhas de diff. Solução: `git checkout -- arquivo` para restaurar estado exato.
4. **HC7 (não refatorar sem pedir) protege de over-engineering** — A tentação de "corrigir tudo" é forte. Perguntar antes e respeitar "deixe como está" é maturidade profissional.

### Sessão 2026-02-06 (Round 5 — Cross-slide audit S01-S06)

#### Erro 12: Screenshot script `display:block!important` quebrou centering de `.slide--center` (S01/S02)

**O que fiz:** O `screenshot-osteo-slides.js` aplicava `.slide{display:block!important}` para sobrescrever o `display:none` do viewer.css. Porém, S01 e S02 usam `display:flex` inline + `.slide--center` para centralizar conteúdo. O `!important` do script sobrescreveu o flex, jogando o conteúdo para o top-left.

**Por que estava errado:** `display:block!important` é um martelo — resolve o problema de visibilidade mas destrói centering de slides que dependem de flex. O script precisa respeitar a intenção de layout de cada slide.

**Correção:** Adicionei `.slide.slide--center{display:flex!important;align-items:center!important;justify-content:center!important;}` ao CSS do screenshot script.

**Aprendizado:**

- **Overrides globais com `!important` precisam de escape hatches** — se `.slide` tem classes especiais (`.slide--center`, `.slide--dark`), o override precisa respeitá-las
- **Sempre testar screenshots de slides com layouts diferentes** (centered vs content-flow) após mudar o script
- **Padrão:** Ao adicionar `!important` global, listar todas as classes que precisam de exceção

#### Erro 13: Inconsistência de título/padding entre slides de conteúdo (CROSS-SLIDE)

**O que fiz:** S03/S04 tinham título 38px/800 com padding 36px 48px. S05 tinha 34px/700 com 32px 40px. S06 tinha 42px/700 com 40px 48px. Subtítulos variavam entre 0.42, 0.6 e 0.65 de opacidade. Take-home bars tinham paddings diferentes.

**Por que estava errado:** Títulos em alturas e tamanhos diferentes criam "salto visual" ao navegar entre slides. O olho percebe inconsistência mesmo que consciente não perceba. É o tipo de detalhe que separa apresentação profissional de amadora.

**Correção:** Padronizei todos os content slides para: `38px/800/letter-spacing -0.01em`, padding `36px 48px`, subtitle `15px/500/rgba(navy,0.42)`, take-home `border-radius:14px; padding:20px 28px`.

**Aprendizado:**

- **Cross-slide consistency é OBRIGATÓRIO** — antes de editar um slide, verificar o padrão dos slides vizinhos
- **Criar um "design token" mental:** tamanho de título, padding, subtitle style, take-home style → replicar em TODOS os content slides
- **Auditoria cruzada:** ao finalizar um batch de slides, comparar screenshots lado a lado para detectar inconsistências

#### Erro 14: Linha de acento dourada sob título do S01 — AI marker

**O que fiz:** S01 tinha `<div style="width: 80px; height: 4px; background: var(--gold); margin: 0 auto 20px auto; border-radius: 2px;">` entre o título e o subtítulo.

**Por que estava errado:** CLAUDE.md diz explicitamente: **"Nunca usar linhas de acento sob títulos — é marca de AI."** Esta regra existia desde a criação do documento, mas eu a ignorei no S01. É embaraçoso.

**Correção:** Removida a linha. Espaço entre título e subtítulo ajustado com margin.

**Aprendizado:**

- **Ler as próprias regras ANTES de produzir** — o CLAUDE.md tem a resposta, só preciso consultá-lo
- **Grep por anti-padrões após produzir:** `grep -i "width.*height.*4px\|accent.*line\|decorative.*line" slides/*.html`
- **Zero tolerância para AI markers** — linhas de acento, gradientes genéricos, sombras decorativas sem propósito

#### Erro 15: Gold (#DDB944) on Cream (#F9F8F4) — monochromatic vibration (CRÍTICO VISUAL)

**O que fiz:** Usei `var(--gold)` (#DDB944) para texto, badges e círculos sólidos diretamente sobre o fundo cream (#F9F8F4). O usuário disse: "o dourado com esse creme ainda dói aos olhos".

**Análise de teoria das cores:**

1. **Proximidade de matiz:** Gold ≈ 46°, Cream ≈ 48° — virtualmente MESMO matiz. Diferença de apenas 2°. São monocromáticos.
2. **Contraste de luminância:** Gold L ≈ 0.51, Cream L ≈ 0.94 → ratio **1.76:1** (WCAG exige 3:1 mínimo para texto grande).
3. **Vibração cromática:** Duas cores quentes de mesmo matiz mas saturações diferentes criam "shimmer" — o olho não consegue definir a borda com clareza, causando fadiga.
4. **Comparação:** Gold on Navy = 171° de separação de matiz + 9.7:1 contraste = **lindo**. Gold on Cream = 2° separação + 1.76:1 = **dor**.

**Correção aplicada — Dual-token strategy:**

- Adicionei `--gold-dark: #A07D1C` (burnished gold) ao base.css
- `--gold-dark` no cream: contraste **3.6:1** (passa AA para texto grande)
- `--gold-dark` no navy: contraste **4.7:1** (passa AA)
- Círculos sólidos dourados → **rings** (borda escura com fill branco): reduz superfície dourada em ~80%
- `--gold` (#DDB944) preservado APENAS para fundos escuros (navy take-home bars)

**Design tokens de cor (REGRA):**

| Token         | Hex     | Uso                      | Contraste cream  | Contraste navy    |
| ------------- | ------- | ------------------------ | ---------------- | ----------------- |
| `--gold`      | #DDB944 | Sobre navy/escuro APENAS | 1.76:1 (falha)   | 9.7:1 (excelente) |
| `--gold-dark` | #A07D1C | Sobre cream/branco       | 3.6:1 (passa AA) | 4.7:1 (passa AA)  |
| `--navy`      | #0B1320 | Universal                | 16:1 (excelente) | —                 |
| `--teal`      | #1F766E | Accent (cards, badges)   | ~4.5:1           | ~3.5:1            |

**Aprendizado:**

- **NUNCA usar cor de accent diretamente sobre fundo sem verificar contraste** — o olho não mente
- **Cores quentes sobre fundos quentes** exigem cuidado redobrado — aumentar separação de matiz OU luminância
- **Dual-token** é a solução correta: mesma família cromática, duas intensidades para contextos diferentes
- **Rings > Solid fills** para accent colors sobre fundos claros — reduz área de conflito dramáticamente
- **Calcular antes de aplicar:** (L1 + 0.05) / (L2 + 0.05) ≥ 3.0 para texto grande, ≥ 4.5 para texto normal

#### Insight 5: Padrão de design tokens para content slides

**O que fiz bem:** Identifiquei que slides S03-S06 precisavam compartilhar tokens visuais e padronizei sistematicamente.

**Design tokens padronizados:**

| Token              | Valor                                                                 |
| ------------------ | --------------------------------------------------------------------- |
| Section padding    | `36px 48px`                                                           |
| Title              | `38px`, `weight 800`, `letter-spacing -0.01em`, `color: var(--navy)`  |
| Title line-height  | `1.1`                                                                 |
| Subtitle           | `15px`, `weight 500`, `color: rgba(var(--navy-rgb), 0.42)`            |
| Title→Subtitle gap | `6px`                                                                 |
| Take-home bar      | `bg: var(--navy)`, `border-radius: 14px`, `padding: 20px 28px`        |
| Take-home text     | `15px`, `weight 500`, `color: var(--white)`                           |
| Take-home badge    | `12px`, `weight 700`, `color: var(--navy)`, `bg: var(--gold)`         |
| Gold on light bg   | Use `var(--gold-dark)` (#A07D1C) — NEVER `var(--gold)` on cream/white |
| Gold circles light | Ring: `bg: white; border: 3.5px solid var(--gold-dark)`               |
| Gold on dark bg    | Use `var(--gold)` (#DDB944) — high contrast on navy                   |

**Quando usar:** Aplicar em TODOS os slides de conteúdo (S03+). Slides especiais (title/S01, quote/S02, dark backgrounds) têm tokens próprios.

**Padrão extraído:** Antes de editar qualquer content slide, consultar esta tabela. Se o slide diverge sem razão funcional, padronizar.

---

### Sessão 2026-02-06 (Round 4 — S19 RoB definition + content audit + paralelismo)

#### Insight 6: Polir um slide cria dívida de paralelismo

**O que aconteceu:** Poli S19 com sombras, labels maiores, kappa data, tokens corretos. Mas os outros ~50 slides de conteúdo continuam com tamanhos, sombras e labels diferentes. O resultado é um slide "premium" cercado de slides "standard" — a inconsistência chama mais atenção que o polish.

**Aprendizado:**

- **Polir um slide = compromisso de polir todos** do mesmo tipo, ou documentar a dívida
- **Nunca polir isoladamente sem registrar as escolhas** — futuras sessões não têm contexto dos valores escolhidos
- **Tabela de tokens inline** adicionada ao CLAUDE.md para que qualquer sessão futura replique o padrão do S19
- **Regra 12 criada:** "Paralelismo obrigatório" — ao polir um slide, aplicar o mesmo padrão a todos

---

### Sessão 2026-02-06 (Round 4 — S19 RoB definition + content audit, details)

#### Insight 5: Verificar conteúdo contra o artigo-fonte antes de declarar "pronto"

**O que fiz bem:** Na segunda rodada do S19, li o artigo completo do Core GRADE 4 (BMJ 2025;389:e083864) e fiz uma tabela cruzando cada conceito-chave do artigo com o que estava no slide. Descobri que o **framework de decisão para o corpo de evidência** (Figure 2 — quando rebaixar, quando não rebaixar, direção do viés) estava ausente. Adicionei condensado em linguagem auto-explicativa.

**Aprendizado:**

- **Antes de declarar um slide "pronto", cruzar com o artigo-fonte** — listar conceitos-chave e verificar 1 a 1
- **"Está bonito" ≠ "está completo"** — design visual pode esconder lacunas de conteúdo
- **O público precisa do framework de decisão**, não só dos fatos. Saber que o CLEAR tem "baixo RoB" é informação; saber QUANDO o GRADE rebaixa é conhecimento aplicável

#### Erro 13: Cores hardcoded violando regra de tokens CSS

**O que fiz:** Usei `#c0392b` e `rgba(220, 53, 69, 0.04)` diretamente no HTML do S19 para o "Alto RoB", em vez de usar `var(--danger)` e `rgba(var(--danger-rgb), 0.04)`.

**Por que estava errado:** CLAUDE.md tem regra explícita: "SEMPRE usar `var(--nome)` para cores — nunca hardcoded `#XXXXXX`". O `--danger` e `--danger-rgb` já existiam em `base.css`. Falhei em verificar antes de hardcodar.

**Aprendizado:**

- **Antes de usar qualquer cor:** `grep` no `base.css` para verificar se já existe um token
- **Nunca hardcodar cores** — mesmo para cores "pontuais" como vermelho de alerta
- **Checar tokens existentes é o PRIMEIRO passo**, não o último

---

### Sessão 2026-02-06 (Round 4 — S19 RoB definition + visual polish, v1)

#### Insight 3: Dual-coding strip para definir conceitos novos à plateia

**O que fiz bem:** A plateia não sabia o que é "alto RoB" vs "baixo RoB". Em vez de um parágrafo explicativo (compete com o título), criei uma **faixa dual-coding** com duas metades lado a lado: `✓ Baixo RoB` (teal, fundo suave) vs `✗ Alto RoB` (vermelho, fundo suave), cada uma com explicação de 1 frase.

**Por que funcionou:**

1. **Dual coding** (texto + cor + ícone) — 3 canais simultâneos, o conceito é absorvido em 2 segundos
2. **Contraste semântico** — teal vs vermelho reforça a dicotomia "bom/mau" sem precisar ler
3. **Não compete com o hero** — a faixa é subordinada (0.78vw body, 1vw labels), título continua dominante
4. **Zero carga cognitiva extra** — o leitor varre da esquerda para direita e entende

**Padrão extraído:**

```html
<!-- Strip dual-coding: conceito A vs conceito B -->
<div style="display:flex; border:1px solid var(--border); border-radius:var(--radius-sm); overflow:hidden;">
  <div
    style="flex:1; display:flex; align-items:center; gap:0.55vw; padding:0.4vw 0.75vw; background:rgba(var(--teal-rgb),0.06); border-left:0.22vw solid var(--teal);"
  >
    <span style="font-weight:800; color:var(--teal);">✓ Conceito A</span>
    <span style="color:var(--navy);">Explicação breve</span>
  </div>
  <div style="width:1px; background:var(--border);"></div>
  <div
    style="flex:1; display:flex; align-items:center; gap:0.55vw; padding:0.4vw 0.75vw; background:rgba(220,53,69,0.04); border-left:0.22vw solid #c0392b;"
  >
    <span style="font-weight:800; color:#c0392b;">✗ Conceito B</span>
    <span style="color:var(--navy);">Explicação breve</span>
  </div>
</div>
```

**Quando usar:** Sempre que o slide introduz uma dicotomia que a plateia pode não conhecer (alto/baixo, direto/indireto, preciso/impreciso).

#### Insight 4: Eliminar redundância entre hero e painéis informativos

**O que fiz bem:** O "Princípio GRADE" dizia "RCTs → alta certeza" — que é exatamente o que o hero já comunicava. Substituí por um insight genuinamente novo: "Avalie RoB **por desfecho**, não por estudo — blinding importa p/ QoL mas não p/ mortalidade."

**Aprendizado:**

- **Cada elemento do slide deve carregar informação NOVA** — repetir é desperdiçar espaço e atenção
- **Antes de finalizar, perguntar:** "Se eu tapar este elemento, perco alguma informação?" Se não, o elemento é redundante
- **Painéis de apoio devem complementar, não repetir, o hero**

---

### Sessão 2026-02-06 (Round 3 — Visual S03/S04)

#### Erro 10: `space-between` com colunas desiguais = whitespace artificial (REINCIDÊNCIA do Erro 6)

**O que fiz:** Redesenhei S03 com 2 colunas: Compreender (4 itens) e Aplicar (3 itens), usando `justify-content: space-between` em ambas. A coluna com 3 itens ficou com gaps enormes entre os cards — whitespace artificial, não intencional.

**Por que estava errado:** `space-between` distribui o espaço ENTRE itens igualmente. Quando duas colunas com alturas iguais têm quantidades diferentes de itens, a coluna com menos itens fica com gaps absurdos. O resultado parece "preguiçoso", não "desenhado". É o MESMO padrão do Erro 6 (flex forçado).

**O que o usuário disse:** "vc eh muito melhor que isso... o flexbox ficou ruim, se precisar crie boxes separados"

**Correção aplicada:** Redesenho total — hero card full-width para item #1 (ponto focal) + grid 3×2 com cards individuais para itens 2-7. Cada card é um box isolado com sua própria geometria. Zero dependência de flex distribution entre containers com quantidades diferentes.

**Aprendizado:**

- **`space-between` com N ≠ M itens em colunas adjacentes é PROIBIDO** — sempre cria assimetria visual
- **Quando itens têm quantidades desiguais:** usar grid com cells fixas, NÃO flex columns
- **Cards separados > flex rows** — cada item em seu próprio box com geometria definida
- **Primeiro output ≠ melhor output** — a qualidade milimétrica importa. Não entregar "bom o suficiente". Entregar deliberadamente desenhado.
- **REINCIDÊNCIA:** Erro 6 + Erro 10 = mesmo padrão (flex forçado). Preciso internalizar que flex é ferramenta, não solução universal.

#### Erro 11: Qualidade milimétrica — "bom o suficiente" não é o padrão

**O que fiz:** Entreguei a primeira versão do S03 como se fosse aceitável. Tinha hierarquia funcional mas não tinha qualidade de design deliberado. O usuário precisou me lembrar do meu papel.

**Por que estava errado:** Sou Dev Front-End Sênior (top 100) + Diretor de Apresentações Internacionais. O padrão não é "funciona e está correto". O padrão é: **cada slide deve parecer que um designer gastou 2 horas nele**. A primeira versão parecia output de template, não design intencional.

**Aprendizado:**

- **Qualidade milimétrica é o padrão** — não é bonus, é requisito
- **Antes de entregar, perguntar:** "Um diretor de apresentações aprovaria isto para uma conferência internacional?"
- **Se a resposta for 'mais ou menos'** → refazer antes de mostrar
- **O primeiro render é rascunho** — tratar como draft, não como entrega
- **Ponto focal deliberado** — cada slide precisa de um elemento que domina visualmente (hero card, imagem, número grande). Se todos os elementos têm o mesmo peso visual, o slide é genérico.

---

### Sessão 2026-02-06 (Rounds 1-2)

#### Erro 7: `display:flex` inline em slide quebrou viewer inteiro

**O que fiz:** Adicionei `display:flex; flex-direction:column` no `style` inline da `<section class="slide">` do S62.

**Por que estava errado:** O sistema show/hide de slides usa `.slide { display:none }` / `.slide.active { display:flex }`. O `display:flex` inline sobrescreve o `display:none` do CSS, fazendo o slide ficar **sempre visível** — quebrando toda a navegação.

**Aprendizado:**

- **NUNCA** colocar `display` inline na `<section class="slide">` — o viewer controla isso via CSS
- Inline styles em elementos de sistema (slide, viewport) são perigosos — podem sobrescrever mecânicas essenciais
- Testar navegação (não só visual) após alterar sections

#### Erro 9: Remoção de `overflow:hidden` do `@media print` quebrou paginação PDF (CRÍTICO)

**O que fiz:** Ao "organizar a casa" (formatar código), removi `overflow:hidden!important` de `html` e `body` na seção `@media print` do `build-osteoporose-print-html.js`. Também reformatei S10 com Prettier. Depois reconstruí print.html.

**Por que estava errado:** O `overflow:hidden` no `@media print` é **essencial** para a paginação PDF no Chromium. Sem ele, o conteúdo de cada slide "sangra" para a página seguinte — rodapés, barras take-home e fontes Tier 1 aparecem no topo da página seguinte. O PDF fica inutilizável.

**Impacto:** print.html ficou "colapsado", impossível gerar PDF. Usuário perdeu horas debugando com ChatGPT que diagnosticou erroneamente como problema de "pdf-lib".

**Aprendizado:**

- **NUNCA remover `overflow:hidden` do `@media print`** — é regra de sistema, não "sujeira"
- **Regras `@media print` são intocáveis** sem validação de PDF antes/depois
- **"Organizar a casa" NÃO inclui alterar lógica** — reformatar ≠ refatorar
- **Antes de qualquer "limpeza" em CSS de print:** gerar PDF → verificar paginação → só então mexer
- **Pipeline canônico:** editar slides individuais em `slides/` → rodar `build-osteoporose-print-html.js` → NUNCA editar print.html diretamente

#### Erro 8: `!important` em h3 sobrescreveu cores intencionais de cards

**O que fiz:** Adicionei `.slide h1, .slide h2, .slide h3 { color: var(--navy) !important; }` para padronizar títulos. Isso forçou h3 de cards/seções (S01 subtítulo, S15/S16 headers teal) para navy.

**Por que estava errado:** h3 NÃO é título do slide — é header de card/seção com cores funcionais próprias (teal para categorias, branco para contraste em fundo escuro). `!important` é instrumento bruto que ignora contexto.

**Aprendizado:**

- **h1/h2 = título do slide** | **h3 = header de seção/card** — regras diferentes
- `!important` deve ser cirúrgico: só no seletor mínimo necessário
- **Sempre auditar todos os usos** de um seletor antes de aplicar `!important`
- Verificar conflitos com `grep <h3 slides/` ANTES de commitar a regra

---

### Sessão 2026-02-05

#### Erro 6: Rodada visual em massa causou regressão (CRÍTICO)

**O que fiz:** Alterei 19 slides de uma vez — unifiquei paleta (blue/teal → gold) e forcei distribuição vertical (Flexbox) — sem validar cada slide individualmente no viewer/PDF.

**Por que estava errado:**

1. **Paleta monotônica**: Remover blue/teal em tudo tornou o deck visualmente pior. Variedade cromática controlada NÃO é inconsistência — é design. Blue/teal tinham papel funcional (diferenciar categorias, criar hierarquia visual).
2. **Flex forçado**: Esticar conteúdo com `flex:1` e `space-evenly` criou layouts artificiais. Whitespace pode ser intencional.
3. **Sem validação granular**: 19 slides de uma vez = impossível saber qual mudança causou qual problema. Deveria ter feito 3-5 por vez com conferência.

**Aprendizado (regras novas):**

- **NUNCA alterar mais de 5 slides por batch sem validação visual entre batches**
- **Cores "fora da paleta" podem ser intencionais** — perguntar antes de padronizar
- **Whitespace pode ser design** — não forçar preenchimento automático
- **Menos é mais**: na dúvida, NÃO mexer
- Este erro é a combinação dos Erros 1 e 3: mudanças sem visão clara + excesso de intervenção

#### Erro 4: PPTX com chrome do viewer (não fullscreen)

**O que fiz:** Capturei screenshots do `page` inteiro (incluindo barra de navegação, fundo do viewer) e usei como slides do PPTX. Resultado: slides apareciam "dentro de uma janela" em vez de fullscreen.

**Por que estava errado:** O deliverable PPTX precisa ter apenas o conteúdo do slide (o `.deck`), sem qualquer UI chrome. O usuário esperava slides que preenchessem 100% da tela.

**Aprendizado:**

- Para PPTX/imagem: capturar o **elemento `.deck`** (16:9 puro), não a página inteira
- Navegar pelo viewer com keyboard events (`ArrowRight`) e capturar o boundingBox do `.deck`
- Sempre verificar o primeiro e último slide do PPTX antes de declarar "pronto"

#### Erro 5: Regex estreito no slide-loader (`S\d{2}` não captura S14b)

**O que fiz:** O regex `/^(S\d{2})_/` gerava `data-key="S14"` tanto para `S14_slide-14.html` quanto para `S14b_slide-14b.html`. Duas slides com mesmo `data-key` = bug silencioso na navegação por hash.

**Por que estava errado:** Assumi que todos os slides seguiam o padrão `Sxx` (2 dígitos), ignorando variantes como `S14b`.

**Aprendizado:**

- Regex defensivo: `/^(S\d{2,3}[a-z]?)_/` cobre variantes (S14b, S100+)
- Sempre verificar unicidade de `data-key` após mudanças no loader
- Testar com os edge cases existentes, não só o caso feliz

#### Insight 1: Unificação sistemática de paleta

**O que fiz bem:** Varri todos os slides buscando `var(--blue)` e `var(--teal)` em bordas/backgrounds e padronizei para `var(--gold)` / `var(--navy)`.

**Por que funcionou:** Abordagem sistemática (grep → listar → corrigir por slide) evitou deixar inconsistências para trás. Resultado: paleta coesa sem blue/teal aleatório.

**Padrão extraído:**

- Antes de corrigir cor individual, fazer **busca global** por cores fora da paleta
- Listar todos os hits, decidir a cor substituta por contexto, aplicar de uma vez
- Exceção: quando a cor tem papel funcional diferente (ex: S50 scoring system)

#### Insight 2: Flexbox vertical distribution pattern

**O que fiz bem:** Em vez de ajustar margins/paddings manualmente para preencher espaço vazio, encapsulei o conteúdo em `display:flex; flex-direction:column; height:100%` e apliquei `flex:1` no elemento principal.

**Por que funcionou:** Solução genérica que se adapta a qualquer quantidade de conteúdo, em vez de hardcodar pixels.

**Padrão extraído:**

```html
<div style="height: 100%; display: flex; flex-direction: column;">
  <!-- titulo/header -->
  <div style="flex: 1;">
    <!-- conteúdo principal expande -->
  </div>
  <!-- footer/referencia -->
</div>
```

### Sessão 2026-02-03

#### Erro 1: Mudanças incrementais sem visão clara

**O que fiz:** Apliquei múltiplas "correções" nos slides S01-S05 sem ter uma visão clara do resultado desejado.

**Por que estava errado:** Patches incrementais sem destino definido geram trabalho sem progresso. O usuário disse "não estamos progredindo" — tinha razão.

**Aprendizado:**

- Antes de mexer, perguntar: "Como deve ficar no final?"
- Pedir exemplo de referência se possível
- Uma mudança grande e certeira > muitas pequenas incertas

#### Erro 2: Não ver o PDF antes de declarar "pronto"

**O que fiz:** Disse que o batch estava "pronto" sem verificar o PDF final.

**Por que estava errado:** O PDF é o deliverable real. Screenshots do viewer não são suficientes.

**Aprendizado:**

- Sempre gerar PDF e inspecionar ANTES de dizer "pronto"
- HC10 existe por uma razão: testar viewer + print + export

#### Erro 3: Excesso de elementos decorativos

**O que fiz:** Adicionei círculos concêntricos, badges, linhas decorativas em múltiplos slides.

**Por que estava errado:** Mais elementos ≠ melhor design. Pode ter criado ruído visual em vez de clareza.

**Aprendizado:**

- Cada elemento deve ter propósito claro
- Decoração sem função = ruído
- Perguntar: "Se eu remover isso, o slide piora?"

---

## PADRÃO DE QUALIDADE — PROTOCOLO MILITAR

> **"A qualidade milimétrica importa."** — Princípio inviolável.

### O que significa "qualidade milimétrica":

1. **Cada pixel tem propósito.** Nenhum espaço é acidente. Whitespace é design, não sobra.
2. **Cada slide é uma peça de design.** Não é "conteúdo formatado" — é comunicação visual deliberada.
3. **O primeiro output é rascunho.** NUNCA entregar o primeiro render como produto final. Sempre revisar com olho crítico antes de mostrar.
4. **Alinhamento sub-pixel.** Margens, paddings, gaps — tudo medido, nada "mais ou menos".
5. **Hierarquia de 3 níveis obrigatória.** Título > corpo > detalhe. Se dois elementos competem pela atenção, o slide está errado.
6. **Ponto focal em cada slide.** Um elemento domina. Se nenhum domina, é genérico.
7. **Teste do "conferência internacional".** Antes de entregar: "Um diretor de apresentações aprovaria isto para TED/ASCO/ESC?" Se não, refazer.

### Checklist pré-entrega (OBRIGATÓRIO antes de mostrar ao usuário):

| #   | Verificação                                        | Pass? |
| --- | -------------------------------------------------- | ----- |
| 1   | Ponto focal claro e dominante?                     |       |
| 2   | Hierarquia de 3 níveis visível?                    |       |
| 3   | Alinhamento preciso (grid invisível)?              |       |
| 4   | Zero whitespace acidental?                         |       |
| 5   | Contraste suficiente em TODOS os textos?           |       |
| 6   | Layout funciona sem flex forçado?                  |       |
| 7   | Passaria no "teste de conferência"?                |       |
| 8   | Cada elemento tem propósito? (remover = pioraria?) |       |

### Anti-padrões fatais (NUNCA fazer):

- **Flex `space-between` com colunas de quantidades diferentes** → grid ou cards isolados
- **Entregar primeiro render sem revisão** → é rascunho, não produto
- **"Funciona" ≠ "está bom"** → funcional é requisito mínimo, não padrão de qualidade
- **Todos os elementos com mesmo peso visual** → slide genérico, sem ponto focal
- **Template thinking** → cada slide é único, tratado como peça individual de design
- **Linhas de acento sob títulos** → marca de AI. Usar whitespace ou background color
- **Títulos de tamanhos/pesos diferentes entre slides de conteúdo** → inconsistência profissional. Consultar design tokens
- **Override global `!important` sem escape hatches** → verificar todas as classes especiais
- **Accent color diretamente sobre fundo de matiz similar** → verificar contraste WCAG. Gold (#DDB944) sobre cream (#F9F8F4) = 1.76:1 = DOR. Usar `--gold-dark` em light bg
- **Confundir nome de arquivo (SNN.html) com posição no deck** → "slide 7" = posição 7 no contador = linha 7 do `_list.txt`, NÃO arquivo S07.html. SEMPRE consultar `_list.txt` e screenshots do usuário antes de agir
- **`git checkout --` sem backup em arquivos com mudanças pré-sessão** → verificar `git status` ANTES; usar `git stash` ou cópia manual para preservar mudanças uncommitted de outras sessões
- **`margin-top:auto` em AMBAS as colunas** → cria dead space simétrico. Combinar callouts em take-home bar full-width
- **Over-engineering "minor fix"** → quando o usuário diz "muito bom, só ajusta X", a resposta é mudar X e NADA MAIS. Não redesenhar layout, grid, flex, paddings inteiros. Uma propriedade CSS por vez. 3ª reincidência = checklist obrigatório (ver Erro 20)

---

## COMPROMISSO DE MELHORIA CONTÍNUA

A cada sessão onde eu cometer erros, **em qualquer projeto**, vou:

1. Reconhecer o erro honestamente
2. Documentar aqui com análise (indicando o projeto)
3. Extrair aprendizado concreto e generalizável
4. Aplicar em TODOS os projetos futuros
5. **Atualizar este arquivo automaticamente**
6. **Verificar se é REINCIDÊNCIA** — se for, escalar a severidade e criar regra hard-coded

**Meta:** Zero erros repetidos. Erros novos são aceitáveis (aprendizado). Erros repetidos são inaceitáveis (não aprendi).

**Severidade de reincidência:**

| Ocorrência            | Ação                                             |
| --------------------- | ------------------------------------------------ |
| 1ª vez                | Documentar + aprendizado                         |
| 2ª vez (REINCIDÊNCIA) | Criar regra HARD nos anti-padrões + auto-crítica |
| 3ª vez                | Criar checklist OBRIGATÓRIO pré-ação             |

**Transferência de conhecimento:**

- Erro em projeto A → Prevenção em projetos B, C, D...
- Padrão identificado → Regra adicionada aos princípios
- 2+ erros similares → Anti-padrão fatal criado
- 3+ erros similares → Checklist obrigatório criado

---

## HISTÓRICO DE PROJETOS

| Projeto                              | Tipo                  | Erros registrados |
| ------------------------------------ | --------------------- | ----------------- |
| Aulas2 (OSTEOPOROSE/GRADE)           | Apresentações médicas | 20 (+11 insights) |
| _(novos projetos serão adicionados)_ |                       |                   |

---

## SESSÕES RECENTES

### Sessão 2026-02-07 (Round 5 — S09 padding/overlap fix + MESA figure)

**Foco:** Fix de chip contrast (.bg-navy .chip--gold), remoção de slide redundante (S60), integração de figura MESA em S09, e ajuste de padding/overlap.

**Tarefas executadas:**

- blocks.css: adicionado `.bg-navy .chip--gold` (background rgba gold 0.22, color gold, border gold 0.4)
- S03: inline style override no chip--gold dentro da take-home bar navy
- S60 removido da \_list.txt (slide redundante per usuário)
- S09: coluna direita substituída — bar chart HTML/CSS → imagem `mesa_cac_warranty.png` (Budoff 2018)
- S09: coortes validadoras compactadas (Rotterdam, Heinz Nixdorf, Dallas Heart, CAC Consortium)
- S09: ref movida de `bottom: 4%` → `bottom: 1%` + grid `padding-bottom: 1.8vw` para evitar sobreposição

**Erros registrados:** 1 novo (Erro 20: over-engineering minor fix — 3ª reincidência, checklist obrigatório criado)
**Aprendizado-chave:** Quando o usuário diz "muito bom, só ajusta X", o escopo é APENAS X. Intervenção mínima > redesign.

### Sessão 2026-02-07 (Round 4 — Restauração seletiva + S03 visual audit)

**Foco:** Restauração seletiva do estado pós-Round 3 (usuário pediu reverter tudo, depois pediu manter até o slide de cruzes ⊕/◯, depois até MESA migration). Auditoria visual do S03 com recomendações SBC.

**Contexto:** O `git checkout` reverteu TODOS os arquivos (incluindo mudanças pré-sessão nos S09/S10). Reconstrução manual do estado desejado a partir do transcript.

**Tarefas executadas:**

- Restauração seletiva: `_list.txt` (S04→apêndice, posições trocadas), S06 (⊕/◯), S60 (cream), blocks.css (chip overrides)
- Restauração Round 3: S03 (MESA migration), S09 (dedup GRADE), S10 (warranty sem MESA)
- S03: recomendações SBC restauradas na coluna direita (substituindo MESA)
- S03 v1→v2: eliminado dead space, criada take-home bar navy como ponto focal, chips ⊕⊕⊕◯

#### Erro 19: `git checkout` reverteu mudanças pré-sessão (uncommitted changes perdidos)

**O que fiz:** Quando o usuário pediu "volte ao que estava antes", usei `git checkout -- arquivo` para reverter. Mas S09 e S10 tinham mudanças uncommitted de sessões anteriores (visíveis no `git status` inicial: `M GRADE/src/slides/S09.html`, `M GRADE/src/slides/S10.html`). O checkout reverteu para o último commit, perdendo essas mudanças pré-existentes.

**Por que estava errado:** `git checkout --` é destrutivo para mudanças não commitadas. Deveria ter usado `git stash` para preservar o estado, ou feito backup dos arquivos antes de reverter.

**Aprendizado:**

- **Antes de `git checkout --`:** verificar se os arquivos têm mudanças uncommitted de OUTRAS sessões (não só desta)
- **Usar `git stash` ou backup** antes de reverter — preserva a possibilidade de restaurar
- **`git diff` antes de checkout** para entender o que será perdido
- **Mudanças uncommitted são vulneráveis** — se o usuário não commita, qualquer revert é destrutivo

#### Insight 9: Take-home bar full-width como ponto focal resolve dead space + hierarquia

**O que fiz bem:** S03 v1 tinha callouts separados em cada coluna ("Quando diretrizes divergem" na esquerda, "Leitura GRADE" na direita), ambos usando `margin-top:auto` que criava dead space. Na v2, combinei ambos em uma take-home bar navy full-width no fundo do slide.

**Por que funcionou:**

1. **Ponto focal claro** — navy bar é o elemento mais pesado visualmente, ancora o olho
2. **Elimina dead space** — sem `margin-top:auto` nas colunas, conteúdo flui natural
3. **Hierarquia de 3 níveis** — título → colunas (conteúdo) → barra (conclusão)
4. **Bridge narrativo** — a barra conecta o caso-âncora ao framework GRADE

**Padrão extraído:**

- Quando um slide tem 2 callouts/footers em colunas diferentes → combinar em take-home bar full-width
- Take-home bar = navy bg, gold badge, texto branco — é a "conclusão" do slide
- Nunca usar `margin-top:auto` em AMBAS as colunas — cria dead space simétrico

### Sessão 2026-02-07 (Round 10 — Restauração Slide Perdido S08b + Redesign)

**Foco:** Encontrar e reconstruir slide perdido sobre perda de QALYs por sítio de fratura, aplicar refinamento visual com protocolo before/after.

**Contexto:** Usuário pediu para achar slide que "continha estudos tier 1 ou 2 com modelagem para quantidade de anos perdidos por sítio em QALY". Slide existia no HTML original (Aula_Osteoporose.html) como Slide 11 ("O que é QALY?") e Slide 12 ("Quanto uma fratura custa em vida?") mas nunca foi convertido para arquivo modular.

**Tarefas executadas:**

- Busca sistemática: grep por QALY/modelagem em todos os slides, backup ZIPs, e HTML original
- Identificação: slides 11 e 12 do `Aula_Osteoporose.html` (linhas 823-1005) tinham os dados
- Dados confirmados (Tier 1): Tosteson et al. 2008, NOF Guide Committee — disutilities por sítio, horizonte 10 anos
- Criação de S08b_slide-08b.html com 4 sítios de fratura + comparação cardiovascular
- Posicionado entre S08 (Utilidade em Saúde) e S13 (Paradoxo Osteopenia) — slot n:8 na \_meta.json
- Screenshot BEFORE + avaliação crítica como front-end sênior
- Redesign completo com 10 correções identificadas
- Screenshot AFTER para validação

**Dados do slide (verificados):**

| Sítio                        | 1º Ano | 2º+ Ano   | Total 10 anos |
| ---------------------------- | ------ | --------- | ------------- |
| Quadril                      | 0,208  | 0,187/ano | 1,89 QALYs    |
| Vertebral clínica            | 0,374  | 0,091/ano | 1,19 QALYs    |
| Outras (úmero, pelve, tíbia) | 0,133  | 0,064/ano | 0,71 QALYs    |
| Punho                        | 0,023  | ~0/ano    | 0,03 QALYs    |
| AVC isquêmico (ref. CV)      | —      | —         | ~1,90 QALYs   |
| IAM (ref. CV)                | —      | —         | ~0,80 QALYs   |

**Insight 6: Protocolo before/after para slides novos**

**O que fiz bem:** Em vez de criar o slide e declarar "pronto", gerei screenshot BEFORE, fiz avaliação crítica documentada (10 problemas), apliquei correções, e gerei screenshot AFTER para comparação.

**Por que funcionou:** Forçar a avaliação visual antes de seguir em frente previne os erros repetidos de sessões anteriores (Erros 1, 2, 6 do CLAUDE.md).

**Padrão extraído:**

1. Criar slide → screenshot BEFORE
2. Avaliar criticamente (checklist visual do CLAUDE.md + coerência com slides vizinhos)
3. Documentar problemas específicos (não genéricos)
4. Aplicar correções direcionadas
5. Screenshot AFTER → comparação
6. Só declarar "pronto" após AFTER satisfatório

**Insight 7: Coerência cross-slide via design tokens visuais**

10 problemas do BEFORE vinham de descoerência com S08:

- Título 34px vs 38px → mismatch
- Subtítulo cor --muted vs rgba(navy, 0.42) → tom diferente
- Footer sem badge navy → estilo diferente
- Emojis em slide médico → amador

**Regra:** Ao criar slide novo, SEMPRE abrir o slide anterior e posterior, extrair os tokens visuais (title size/weight, subtitle color, footer style, container style), e aplicá-los ANTES de começar o design do conteúdo.

**Round 2 — Avaliação implacável (v2→v3):**

v2 passou no checklist com 5/12. Problemas fundamentais:

- Slide parecia TABELA (rows iguais) em vez de narrativa visual (severity cascade)
- Ponto focal FRACO — Quadril era só uma row maior, não um HERO element
- Whitespace morto acima do chart (~35% da área)
- 3 boxes fragmentados à direita (carga cognitiva alta)

v3 aplicou:

- **HERO CARD navy** para Quadril (bg navy, 1,89 em gold 38px, box-shadow)
- **Flex severity cascade** (flex: 3/2/1.5/1) — rows graduam em tamanho
- **Color intensity cascade** (navy bg → gold-dark border → gold lighter → muted)
- **Border-left como accent** em Vertebral (5px gold-dark) e Outras (4px gold)
- **Uma ÚNICA card** à direita (insight + legenda + mensagem clínica)
- Fill ratio: 65% → 80%

v3 score: 11/12 PASS no checklist (1 minor: ligeiro espaço Punho↔footer).

**Insight 8: "Tabela vs Narrativa" — data slides precisam de DRAMA, não igualdade**

Quando múltiplos itens de dados são exibidos, a tentação é tratá-los igualmente (rows de mesma altura, mesmo peso). Isso cria uma TABELA. Mas em apresentação, o público precisa de DRAMA — o pior caso deve ser visualmente DOMINANTE. Técnicas:

- Flex grow proporcional à severidade
- Background escuro para o hero (sandwich dark/light)
- Color intensity gradient (darkest = worst)
- Border-left como accent visual (espessura proporcional)

**Erros registrados:** Nenhum novo (problemas identificados e corrigidos iterativamente)
**Insights registrados:** 3 (Insight 6: before/after, Insight 7: tokens, Insight 8: tabela vs narrativa)

### Sessão 2026-02-07 (Round 3 — Dedup recomendações + MESA migration)

#### Insight 8: Eliminar redundância cross-slide antes de polir

**O que fiz bem:** Identifiquei que S03 (pos 5) e S09 (pos 7) tinham as MESMAS recomendações SBC 2025 (ipsis litteris). Ao invés de polir cada um separadamente, eliminei a duplicação: S03 recebeu a imagem MESA (movida do S10), S09 expandiu a análise GRADE única, e S10 ganhou espaço para conteúdo novo.

**Padrão extraído:**

- **Antes de editar um slide, verificar se o conteúdo principal existe em outro slide do deck** — `grep` pelo texto-chave
- **Redundância = oportunidade de redistribuir conteúdo** — o slide liberado pode receber algo mais valioso
- **Migrar assets visuais (figuras, gráficos) para slides onde adicionam dual-coding** — a imagem MESA no slide 5 complementa os 3 itens textuais da coluna esquerda

### Sessão 2026-02-07 (Round 3 — Dedup recomendações + MESA migration)

**Foco:** Eliminar redundância entre S03/S09 (recomendações SBC duplicadas), migrar MESA figure, liberar espaço

**Tarefas executadas:**

- S03 (pos 5): coluna direita trocada — recomendações SBC → imagem MESA + nota GRADE (dual-coding)
- S09 (pos 7): recomendações SBC removidas, expandida análise GRADE (4 domínios) + nova coluna EtD (benefício, valores, custo, aceitabilidade)
- S10 (pos 11): MESA removida (movida para S03), coluna direita redesenhada com leitura GRADE + "CAC=0 não é passe livre"
- QA: screenshots 1600×900, todos passaram checklist

**Insights registrados:** 1 novo (Insight 8: eliminar redundância antes de polir)
**Aprendizado-chave:** Verificar redundância cross-slide ANTES de editar. Redundância = oportunidade de redistribuir conteúdo valioso.

### Sessão 2026-02-07 (Round 2 — Reestilização bg-navy + QA visual)

**Foco:** Converter slides 4 e 5 (S06/S03) para bg-navy, trocar ordem, QA visual com screenshots 1600×900

**Tarefas executadas:**

- Movido S04 (Calibragem ETD) da posição 7 para o apêndice (após S58)
- Trocada ordem: posição 3→S05, 4→S06, 5→S03 (3 slides bg-navy consecutivos = bloco de fundamentos)
- S06 convertido para bg-navy: stepper com cards semi-transparentes, setas gold, chips com descritores
- S03 convertido para bg-navy: cards semi-transparentes, ícones numerados com fundo opaco
- S05 polido: cards com `flex:1` + footers "Essência:" com `margin-top:auto`
- CSS: adicionados `.bg-navy .chip--muted` e `.bg-navy .chip--navy` (chips invisíveis corrigidos)
- QA: 2 rounds de screenshots (v1 → diagnóstico → fix → v2 → checklist formal)

**Erros registrados:** 2 novos (Erro 17: chip sem override bg-navy, Erro 18: dead space em cards desiguais)
**Insights registrados:** 1 novo (Insight 7: bloco escuro como contraste narrativo)
**Aprendizado-chave:** Ao converter slide para bg-navy, verificar TODOS os componentes CSS contra overrides existentes. Screenshot é inegociável.

### Sessão 2026-02-07 (Round 1 — Reorganização de slides GRADE)

**Foco:** Mover slide de interação (Calibragem ETD) para o apêndice

**Tarefas executadas:**

- Movido S04 ("Calibragem rápida: como você decide?") da posição 7 do deck principal para o apêndice (após S58)
- Deck principal: 35 slides → apêndice: 22 slides (incluindo S04)

**Erros registrados:** 1 novo (Erro 16: confundir nome de arquivo com posição no deck)
**Aprendizado-chave:** "Slide N" do usuário = posição N no contador/viewer = linha N do `_list.txt`, NUNCA arquivo SNN.html. Sempre consultar `_list.txt` e screenshots antes de agir.

### Sessão 2026-02-06 (Round 6 — Color Theory: Gold-on-Cream Fix)

**Foco:** Aplicar teoria das cores para resolver vibração monocromática gold (#DDB944) sobre cream (#F9F8F4)

**Diagnóstico de cor:**

- Gold e Cream diferem apenas 2° em matiz (46° vs 48°) → monocromáticos
- Contraste: 1.76:1 (WCAG exige 3:1 mínimo para texto grande)
- Efeito: fadiga ocular, "shimmer", dor

**Tarefas executadas:**

- Adicionado `--gold-dark: #A07D1C` (burnished gold) + `--gold-dark-rgb` ao base.css
- S03: badges APLICAR (5-7) → gold-dark fill, white text; card borders → gold-dark-rgb
- S04: badge EVIDÊNCIA → gold-dark; bullet dots → gold-dark
- S05: anos (2008, 2010+, 2024) → gold-dark text; círculos sólidos → RINGS (borda gold-dark, fill branco); timeline line → gold-dark
- S06: 4 círculos anabólicos → RINGS; percentage text → gold-dark; timeline line → gold-dark; subtitle "anabólicos" → gold-dark
- Take-home bars (navy bg): gold mantido sem alteração (9.7:1 contraste = perfeito)

**Erros registrados:** 1 novo (Erro 15: gold-on-cream monochromatic vibration)
**Aprendizado-chave:** Dual-token strategy para accent colors. Verificar contraste ANTES de aplicar cor.

### Sessão 2026-02-06 (Round 5 — Cross-slide audit S01-S06)

**Foco:** Auditoria cruzada de precisão visual nos 6 primeiros slides: consistência de títulos, palheta, posicionamento, distribuição

**Tarefas executadas:**

- Fix screenshot script: `.slide--center` agora preserva `display:flex` para centering correto de S01/S02
- S01: removida linha de acento dourada (AI marker per CLAUDE.md)
- S05: título padronizado de 34px/700 → 38px/800, padding 32px→36px, subtitle opacity 0.6→0.42
- S06: título padronizado de 42px/700 → 38px/800, padding 40px→36px, subtitle opacity 0.65→0.42
- S05: 2024 "T2T" box solid gold → gold tint (removido grito visual)
- S05/S06: take-home bars padronizadas (padding 20px 28px, border-radius 14px)
- Design tokens documentados no CLAUDE.md para reuso em todos os content slides

**Erros registrados:** 3 novos (Erro 12: screenshot display override, Erro 13: cross-slide inconsistency, Erro 14: AI accent line)
**Insights registrados:** 1 novo (Insight 5: design tokens para content slides)
**Aprendizado-chave:** Consistência cross-slide é tão importante quanto qualidade individual.

### Sessão 2026-02-06 (Round 3 — Visual S03/S04 + Qualidade Milimétrica)

**Foco:** Redesign profissional dos slides S03 e S04, integração de GRADE ZIPs, organização do projeto, criação de scripts de export

**Tarefas executadas:**

- Pull de 2 ZIPs GRADE (base + patch v9) com overwrite sequencial
- Organização profissional: `exports/`, `screenshots/` com subpastas por projeto
- `.gitignore` revampado (artefatos, node_modules, OS, IDE, builds)
- Script `export-grade-all.js` (PDF + screenshots via Playwright, self-contained)
- Script `screenshot-osteo-slides.js` (QA screenshots de slides individuais)
- Redesign S03: "O Paradoxo" como hero card + grid 3×2 para objetivos 2-7
- Redesign S04: 3 cards com footer ancorado via `margin-top: auto`
- Debug blank screenshots (`.slide { display: none }` do viewer.css)

**Erros registrados:** 2 novos (Erro 10: flex space-between com colunas desiguais, Erro 11: qualidade milimétrica)
**Aprendizado-chave:** "A qualidade milimétrica importa" — protocolo militar de qualidade adicionado ao CLAUDE.md

### Sessão 2026-02-06 (Debug — Print/PDF Collapse)

**Foco:** Debug e restauração do pipeline print.html → PDF após sessão anterior do Claude quebrar paginação

**Problema:** Sessão anterior do Claude removeu `overflow:hidden` de html/body no `@media print` do `build-osteoporose-print-html.js` ao "organizar a casa". Isso causou: slides sangrando entre páginas no PDF, print.html "colapsado". Usuário não conseguia gerar PDFs.

**Erros registrados:** 1 novo (Erro 9: remoção de overflow:hidden do @media print)

### Sessão 2026-02-06 (Round 2 — Restauração + Exports)

**Foco:** Restaurar OSTEOPOROSE ao estado funcional, gerar PPTX e PDF

**Tarefas executadas:**

- Reset infraestrutura (CSS/JS/viewer) para commit a89374e (manhã Feb 5, último estado funcional)
- Slide content sobrescrito do ZIP ChatGPT (72 slides, melhor conteúdo)
- Rebuild print.html sincronizado com \_list.txt/\_meta.json
- Criação de export-osteoporose-pptx.js (screenshot-based, funcional)
- Criação de export-osteoporose-pdf-screenshots.js (fallback)

**Erros registrados:** Nenhum novo

### Sessão 2026-02-05 (Round 2 — Visual + Exports)

**Foco:** Refinamento visual (paleta + distribuição vertical), PPTX fullscreen, PDF 16:9, correções de metadados

**Tarefas executadas:**

- Unificação de paleta: 10 slides com bordas blue/teal → gold/navy
- Distribuição vertical: 9 slides com Flexbox pattern para preencher espaço vazio
- PPTX fullscreen: 71 screenshots de `.deck` (1920×1080) → PptxGenJS → PPTX
- PDF 16:9: Playwright + print.html → PDF (71 slides)
- Fix index.html: comentário S01..S73 → S01..S72 (71 slides)
- Fix slide-loader.js: regex para S14b (data-key duplicado)
- Rebuild print.html sincronizado

**Erros registrados:** 2 novos (PPTX chrome, regex S14b)
**Insights registrados:** 2 (paleta sistemática, flex vertical pattern)

### Sessão 2026-02-05 (Round 1 — Empacotamento)

**Foco:** Empacotamento, exportação e atualização do Prompt Mestre

**Tarefas executadas:**

- Geração de ZIP com OSTEOPOROSE, scripts, chatgpt.md, CHANGELOG.md (excluindo node_modules)
- Exportação de PDF da apresentação OSTEOPOROSE (72 slides, 16:9)
- Organização dos exports em `exports/` (raiz do projeto)
- Atualização do CLAUDE.md com Prompt Mestre completo (Duarte + Cognição + UX)

---

### Sessão 2026-02-07 (OSTEOPOROSE — Forest Plot S35 + Regex Fix)

**Foco:** Redesign do slide S35 com forest plot HTML/CSS, fix do bug de navegação (regex S08b)

**Tarefas executadas:**

- **Fix Error 5** (CLAUDE.md): Regex do slide-loader.js `/^(S\d{2})_/` → `/^(S\d{2,3}[a-z]?)_/`. S08b e S14b agora recebem data-key correto
- **Bug de navegação descoberto:** S08b sem data-key causava impossibilidade de navegar para o slide (ArrowRight ficava preso em S08). A causa era: sem data-key, o hash não mudava, e o viewer não avançava para o próximo slide
- **Redesign S35** ("Esse Achado Foi Replicado?"): Substituído card gold com 2 sub-cards por **forest plot HTML/CSS** com 4 estudos:
  - Lyles NEJM 2007 (HR 0.72, 0.56-0.93) — gold, à esquerda de 1.0
  - Colón-Emeric JBMR 2010 (HR 0.79, 0.65-0.95) — gold, à esquerda de 1.0
  - Viswanathan JAMA 2018 (RR 0.96, 0.85-1.08) — gray, cruza 1.0
  - Gates Syst Rev 2023 — "Sem redução consistente"
- Painel de interpretação navy à direita + conclusão gold ("prescreva pela fratura")
- Screenshots BEFORE/AFTER capturados em `screenshots/`
- S08 e S08b avaliados como sólidos — sem mudanças necessárias

**Erros registrados:** Nenhum novo
**Bug fix:** Error 5 (regex S08b) — finalmente aplicado

**Insight 9: Forest plot em HTML/CSS puro**

**O que fiz:** Criei visualização de forest plot usando CSS positioning (position: absolute, left: %) com escala 0.5-1.5 onde 50% = null line (1.0). Diamonds com `rotate(45deg)`, CI lines com width.

**Por que funciona:**

- Comunica visualmente a contradição entre estudos (gold à esquerda vs gray cruzando 1.0)
- Preenche whitespace que existia no design anterior
- Mantém precisão dos dados reais (nenhum número inventado)

**Padrão extraído:**

- Escala: `position_% = (value - min_scale) / (max_scale - min_scale) * 100`
- Null line: `position: absolute; left: 50%; width: 1.5px`
- CI: `position: absolute; left: CI_low_%; width: (CI_high_% - CI_low_%)%`
- Diamond: `width: 12px; height: 12px; border-radius: 2px; transform: rotate(45deg)`

**Insight 10: data-key nulo causa bug de navegação no viewer**

**O que descobri:** Quando um slide não tem `data-key`, o viewer não atualiza o hash ao navegar para ele. Isso causa um comportamento onde ArrowRight "pula" o slide ou fica preso no anterior, porque:

1. `setActive(N)` ativa o slide N
2. Sem data-key, hash não muda
3. Hash fica apontando para o slide anterior
4. Possível re-ativação do slide anterior via hashchange residual

**Regra nova:** TODO slide carregado pelo slide-loader DEVE ter `data-key`. O regex deve cobrir TODOS os padrões de filename (Sxx, Sxxb, Sxxx).

_Criado: 2026-02-03_
_Última atualização: 2026-02-07 (Round 5 — S09 padding/overlap fix + MESA figure)_
