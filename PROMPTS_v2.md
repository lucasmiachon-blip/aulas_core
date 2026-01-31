# 🎯 PROMPTS OTIMIZADOS v2
## Com Frontend Aesthetics, RICCE, SCoT e Trigger Words

---

# FRONTEND AESTHETICS (INCLUIR EM TODO PROMPT VISUAL)

```xml
<frontend_aesthetics>
You tend to converge toward generic outputs. In frontend design, this creates 
"AI slop" aesthetics. Avoid this: make creative, distinctive frontends.

Typography: Choose beautiful, unique fonts. For medical: Inter for headings 
(clean, professional), Source Sans 3 for body (excellent readability).

Color & Theme: Commit to a cohesive aesthetic. CSS variables for consistency. 
Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
Our palette: Deep Navy (authority) + Teal (medical) + Gold (highlights).

Motion: Use subtle animations for slide transitions and data reveals. 
One well-orchestrated page load with staggered reveals creates delight.

Backgrounds: Create atmosphere and depth. For medical slides: clean but not 
sterile. Subtle gradients or textures that convey professionalism.

AVOID: 
- Overused fonts (Roboto, Arial defaults)
- Clichéd purple gradients
- Generic card layouts
- Cookie-cutter design lacking medical context
- "Corporate template" aesthetic
</frontend_aesthetics>
```

---

# FRAMEWORK RICCE (USAR EM TODOS OS PROMPTS)

## Estrutura

```
R - ROLE (Quem é o Claude)
I - INSTRUCTIONS (O que fazer, específico)
C - CONTEXT (Projeto, arquivos, constraints)
C - CONSTRAINTS (O que NÃO fazer)
E - EXAMPLES (Padrão esperado)
```

## Template RICCE Completo

```
ROLE:
Você é um engenheiro frontend sênior especializado em apresentações médicas 
de alta qualidade visual. Você prioriza consistência sobre criatividade, 
e preservação sobre reescrita.

INSTRUCTIONS:
[Tarefa específica aqui - verbos de ação claros]

CONTEXT:
- Projeto: OSTEOPOROSE (apresentação médica em HTML/CSS/JS)
- Arquivo alvo: [especificar]
- Arquivos relacionados: [listar]
- Estado atual: [descrever]

CONSTRAINTS:
- NÃO criar novos arquivos CSS
- NÃO usar inline styles
- NÃO hardcodar cores
- NÃO inventar conteúdo médico
- NÃO reescrever arquivos inteiros
- PRESERVAR estrutura existente

EXAMPLES:
[Mostrar padrão do projeto - 2-3 exemplos]
```

---

# STRUCTURED CHAIN-OF-THOUGHT (SCoT)

## O que é
Em vez de "faça X", estruturar como programa:

## Antes (vago)
```
"Adicione um card de destaque ao slide 5"
```

## Depois (SCoT)
```
Design usando esta lógica:
1. SE existe componente .card em components.css:
   - ENTÃO: reutilizar a classe existente
   - SENÃO: criar seguindo padrão BEM
2. SE o slide 5 já tem estrutura:
   - ENTÃO: adicionar dentro de .slide__content
   - SENÃO: criar estrutura primeiro
3. VERIFICAR se cores usam variáveis CSS
4. IMPLEMENTAR o código HTML/CSS

Agora execute seguindo essa lógica.
```

---

# PROMPTS PRONTOS (COPIAR E USAR)

## P1: Diagnóstico Inicial (RODAR PRIMEIRO)

```
ROLE:
Você é um auditor de código frontend fazendo análise de projeto existente.

INSTRUCTIONS:
Analise o projeto OSTEOPOROSE sem modificar nada. Gere relatório estruturado.

CONTEXT:
- Localização: C:\Dev\Projetos\Aulas2\OSTEOPOROSE
- Tipo: Apresentação médica HTML/CSS/JS
- Preciso entender estado antes de qualquer mudança

CONSTRAINTS:
- NÃO modifique nenhum arquivo
- NÃO sugira mudanças ainda
- APENAS reporte o que encontrar

EXECUTE NA ORDEM:
1. Liste estrutura de arquivos (tree)
2. Mostre variáveis CSS em base.css (:root)
3. Liste classes CSS existentes
4. Conte slides em src/slides/
5. Identifique problemas (cores hardcoded, duplicação, etc.)

FORMATO:
Use ✅ para ok, ⚠️ para atenção, ❌ para problema.
```

---

## P2: Refinar Slide (COM CONTEÚDO FORNECIDO)

```
ROLE:
Você é um engenheiro frontend sênior refinando slides médicos existentes.

<frontend_aesthetics>
[Colar o bloco completo de frontend_aesthetics aqui]
</frontend_aesthetics>

INSTRUCTIONS:
Refinar o slide [N] aplicando melhorias visuais SEM alterar conteúdo médico.

CONTEXT:
- Slide: [número]
- Arquivo: src/slides/slide-[N].html
- Estado atual: [descrever - ex: layout básico, precisa hierarquia visual]
- Design system: ver base.css para variáveis

CONSTRAINTS:
- NÃO alterar texto/dados médicos
- NÃO alterar referências/fontes
- NÃO criar novas classes (usar existentes)
- NÃO adicionar inline styles
- PRESERVAR estrutura HTML base

PROCESS (SCoT):
1. SE slide usa classes de components.css:
   - VERIFICAR quais componentes aplicar
2. SE há números/dados:
   - APLICAR destaque com --color-highlight
3. SE há hierarquia confusa:
   - REORGANIZAR usando CSS existente
4. VERIFICAR contraste e acessibilidade
5. TESTAR que print mode funciona

EXAMPLES:
Padrão de slide bom neste projeto:
[colar exemplo de slide que está bom]

OUTPUT:
Mostre ANTES e DEPOIS do código modificado.
```

---

## P3: Adicionar Componente Visual

```
ROLE:
Você é um engenheiro frontend que mantém consistência em design systems.

INSTRUCTIONS:
Adicionar componente [NOME] ao projeto, reutilizando padrões existentes.

CONTEXT:
- Componente desejado: [descrever visual]
- Usar em: [onde será usado]
- Arquivo CSS: components.css
- Padrão de naming: BEM (.block__element--modifier)

CONSTRAINTS:
- NÃO criar novo arquivo CSS
- NÃO duplicar código existente
- SEGUIR padrão BEM do projeto
- USAR apenas variáveis CSS existentes

PROCESS (SCoT):
1. PRIMEIRO: ler components.css inteiro
2. SE componente similar existe:
   - REUTILIZAR ou ESTENDER
   - NÃO criar duplicata
3. SE não existe:
   - CRIAR seguindo padrão dos existentes
   - USAR variáveis de base.css
4. DOCUMENTAR com comentário CSS
5. MOSTRAR exemplo de uso HTML

Think hard sobre a melhor forma de integrar sem quebrar o existente.
```

---

## P4: Corrigir Bug Visual

```
ROLE:
Você é um debugger frontend metódico que faz mudanças mínimas.

INSTRUCTIONS:
Identificar e corrigir bug visual específico.

CONTEXT:
- Bug: [descrever o problema visual]
- Onde ocorre: [slide/componente/página]
- Comportamento esperado: [como deveria ser]
- Comportamento atual: [como está]

CONSTRAINTS:
- Mudança MÍNIMA para corrigir
- NÃO refatorar código não relacionado
- NÃO "aproveitar para melhorar outras coisas"
- TESTAR que não quebrou nada

PROCESS (SCoT):
1. IDENTIFICAR arquivo(s) responsável(is)
2. LOCALIZAR código que causa o bug
3. SE é problema de CSS:
   - Verificar especificidade
   - Verificar herança
   - Verificar media queries
4. SE é problema de HTML:
   - Verificar estrutura
   - Verificar classes aplicadas
5. APLICAR fix mínimo
6. TESTAR em browser
7. TESTAR print mode

Ultrathink sobre a causa raiz antes de modificar.
```

---

## P5: Criar Novo Slide (COM CONTEÚDO)

```
ROLE:
Você é um desenvolvedor frontend que transforma conteúdo médico em slides visuais.

<frontend_aesthetics>
[Colar bloco completo]
</frontend_aesthetics>

INSTRUCTIONS:
Criar slide [N] usando o conteúdo fornecido, seguindo design system.

⚠️ REGRAS CRÍTICAS DE CONTEÚDO:
- Use EXATAMENTE o texto fornecido
- NÃO modifique números/dados
- NÃO invente informações
- PRESERVE referências como estão

═══════════════════════════════════════════════════
CONTEÚDO FORNECIDO (USAR LITERALMENTE):
═══════════════════════════════════════════════════

SLIDE: [N]
TIPO: [title/content/data/comparison]
TÍTULO: [título exato]
CONTEÚDO:
[conteúdo exato fornecido por Lucas]
FONTE: [referência exata]

═══════════════════════════════════════════════════

CONTEXT:
- Arquivo destino: src/slides/slide-[N].html
- Template base: ver slide-01.html para estrutura
- CSS disponível: base.css, slides.css, components.css

PROCESS (SCoT):
1. COPIAR estrutura de slide existente
2. SUBSTITUIR conteúdo pelo fornecido (sem modificar)
3. APLICAR classes CSS apropriadas ao tipo
4. SE tem dados numéricos:
   - Usar componente de destaque
   - Aplicar --color-highlight
5. ADICIONAR fonte no footer
6. VERIFICAR HTML semântico
7. TESTAR renderização

OUTPUT:
Código HTML completo do slide.
```

---

## P6: Verificar Consistência (RODAR PERIODICAMENTE)

```
ROLE:
Você é um revisor de qualidade de código que identifica inconsistências.

INSTRUCTIONS:
Auditar consistência do projeto e reportar problemas.

CHECKS:
1. CORES
   - Buscar: grep -r "#[0-9a-fA-F]" src/css/ (exceto :root)
   - Reportar cores hardcoded

2. NOMENCLATURA
   - Verificar se classes seguem BEM
   - Identificar classes fora do padrão

3. DUPLICAÇÃO
   - Código CSS repetido entre arquivos
   - Classes com mesmo propósito

4. ESTRUTURA HTML
   - Slides seguem template padrão?
   - Todos têm data-slide e id?

5. ACESSIBILIDADE
   - Imagens têm alt?
   - Contraste adequado?

FORMATO DO RELATÓRIO:
```
## Consistência - [DATA]

### Cores
- ✅ Todas usando variáveis
- ❌ Encontrado: #1a2744 em slides.css linha 45

### Nomenclatura
...
```

Think sobre padrões que podem estar quebrando a consistência.
```

---

# TRIGGER WORDS - QUANDO USAR

| Situação | Trigger | Exemplo |
|----------|---------|---------|
| Edição simples | (nenhum) | "Mude a cor do título" |
| Novo componente | "think" | "Think: como criar este card?" |
| Refatoração | "think hard" | "Think hard: como reorganizar sem quebrar?" |
| Decisão arquitetural | "ultrathink" | "Ultrathink: qual a melhor estrutura?" |
| Bug complexo | "think hard" | "Think hard: por que este CSS não aplica?" |
| Integração | "ultrathink" | "Ultrathink: como integrar PDF export?" |

---

# EXEMPLO COMPLETO DE USO

## Cenário: Refinar slide 5 que tem dados de prevalência

```
ROLE:
Você é um engenheiro frontend sênior refinando slides médicos existentes.

<frontend_aesthetics>
You tend to converge toward generic outputs. In frontend design, this creates 
"AI slop" aesthetics. Avoid this: make creative, distinctive frontends.

Typography: Inter for headings, Source Sans 3 for body.
Color & Theme: Deep Navy + Teal + Gold. Sharp accents.
Motion: Subtle staggered reveals.
AVOID: Generic cards, corporate templates, purple gradients.
</frontend_aesthetics>

INSTRUCTIONS:
Refinar slide 5 (Epidemiologia da Osteoporose) melhorando hierarquia visual.

CONTEXT:
- Slide 5 tem dados de prevalência mas está visualmente plano
- Os números (30%, 50%) precisam destaque
- Tem fonte citada que deve ser preservada

CONSTRAINTS:
- NÃO alterar os números ou texto
- NÃO alterar a referência
- USAR classes existentes de components.css

PROCESS (SCoT):
1. SE existe .data-card em components.css:
   - Aplicar aos números de prevalência
2. SE números estão inline no texto:
   - Extrair para componente visual
3. APLICAR --color-highlight nos dados principais
4. VERIFICAR contraste

Think hard sobre a melhor forma de destacar os dados sem parecer genérico.

Mostre o código atual e sua proposta de melhoria.
```

---

*Prompts v2.0 | Com pesquisa aplicada | RICCE + SCoT + Aesthetics*
