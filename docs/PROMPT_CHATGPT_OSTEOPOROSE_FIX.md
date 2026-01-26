# Prompt para ChatGPT: Correção de Cortes na Margem Inferior - OSTEOPOROSE

> **Data:** 2026-01-23  
> **Contexto:** Viewer OSTEOPOROSE com 72 slides em formato 16:9 (1280×720px)  
> **Problema:** Alguns slides ainda têm conteúdo cortado na margem inferior após implementação de solução conservadora

---

## 🎯 Objetivo

Analisar slides individuais do projeto OSTEOPOROSE que ainda apresentam corte na margem inferior e sugerir ajustes CSS ou HTML específicos que:
1. Resolvam o corte na margem inferior
2. Preservem a hierarquia visual
3. Mantenham legibilidade
4. Não afetem outros slides

---

## 📋 Contexto Técnico

### Estrutura do Projeto
```
OSTEOPOROSE/
├── src/
│   ├── index.html          # Viewer principal (http://127.0.0.1:5500/OSTEOPOROSE/src/index.html)
│   ├── print.html          # Versão para PDF
│   ├── css/
│   │   ├── base.css        # Tokens CSS (--navy, --gold, --bg, etc)
│   │   ├── viewer.css      # Estilos do viewer
│   │   └── print.css       # Estilos para PDF/print (já tem ajustes conservadores)
│   └── js/
│       └── viewer.js       # Lógica do viewer (fitSlideOverflow desabilitado)
└── slides/
    ├── _list.txt           # Lista de 72 slides
    └── S*.html             # Slides individuais
```

### Solução Atual Implementada

**`OSTEOPOROSE/src/css/print.css`:**
```css
/* FIX: Ajustes mínimos - apenas reduz padding-bottom extremo */
.slide[style*="padding-bottom: 100px"] {
  padding-bottom: 75px !important;
}

.slide[style*="padding-bottom: 80px"] {
  padding-bottom: 65px !important;
}
```

**`OSTEOPOROSE/src/js/viewer.js`:**
```javascript
function fitSlideOverflow(slide) {
  if (!slide) return;
  
  // RESET - remove qualquer scale anterior
  slide.style.transform = '';
  slide.style.transformOrigin = '';
  delete slide.dataset.fitScale;
  
  // POR ENQUANTO: não faz auto-scale
  // Os slides que cortam serão ajustados individualmente via CSS
  return;
}
```

### Paleta de Cores (OBRIGATÓRIA)
```css
var(--navy)    /* #0B1320 - Títulos/base escura */
var(--gold)    /* #DDB944 - Destaques/ênfase */
var(--text)    /* #222 - Texto principal */
var(--muted)   /* #666 - Texto secundário */
var(--bg)      /* #F9F8F4 - Fundo padrão */
var(--white)   /* #FFFFFF - Cards */
var(--teal)    /* #1F766E - Clínico/dados */
var(--border)  /* #E9ECEF - Bordas */
var(--blue)    /* #2563EB - Suporte/informação */
```

**⚠️ REGRA ABSOLUTA:** NUNCA usar cores hardcoded (`#XXXXXX`). SEMPRE usar `var(--nome)`.

---

## ❌ Tentativas Anteriores que NÃO Funcionaram

### Tentativa 1: JavaScript Auto-Scale Robusto
- **Abordagem:** Cálculo dinâmico de scale com margens assimétricas
- **Resultado:** ❌ Slides comprimidos demais, inconsistente entre resoluções

### Tentativa 2: CSS Agressivo Global
- **Abordagem:** Regras CSS globais com `!important` sobrescrevendo estilos inline
- **Resultado:** ❌ Slides que não cortavam passaram a cortar, layouts quebrados

**📖 Documentação completa:** `docs/OSTEOPOROSE_VIEWER_FIX_ATTEMPTS.md`

---

## ✅ Estratégia Recomendada

### 1. Análise Individual por Slide
Para cada slide que ainda corta:
1. Ler o arquivo HTML do slide (`OSTEOPOROSE/src/slides/[ARQUIVO].html`)
2. Identificar elementos que excedem altura disponível
3. Sugerir ajustes técnicos (CSS, JavaScript, HTML, posicionamento, estilo, tipografia)

### 2. Tipos de Ajustes Permitidos

**✅ VOCÊ PODE MODIFICAR:**
- **CSS:** Qualquer ajuste CSS (global ou específico) em `print.css`, `viewer.css`, `base.css`
- **JavaScript:** Melhorar `fitSlideOverflow` ou outras funções em `viewer.js`
- **HTML:** Modificar estilos inline, estrutura de containers, posicionamento
- **Posicionamento:** Ajustar `position`, `top`, `bottom`, `left`, `right`, `transform`
- **Estilo:** Padding, margin, gap, width, height, max-height, etc.
- **Tipografia:** Font-size, line-height, font-weight, letter-spacing
- **Cores:** Usar `var(--nome)` da paleta oficial (nunca hardcoded `#XXXXXX`)

**❌ VOCÊ NÃO PODE MODIFICAR:**
- **Conteúdo médico:** Texto, números, claims, referências bibliográficas são READ-ONLY
- **Cores hardcoded:** Nunca usar `#XXXXXX`, sempre `var(--nome)`

### 3. Abordagens Possíveis

**CSS Global (se necessário):**
```css
/* Se uma regra global resolver o problema, pode usar */
.slide {
  padding: 35px 50px !important;
}
```

**CSS Específico por Slide:**
```css
/* Ou ajustes específicos por slide */
.slide[data-key="S03"] {
  padding-bottom: 50px !important;
}
```

**JavaScript (pode tentar melhorar):**
```javascript
// Pode tentar melhorar fitSlideOverflow ou criar nova abordagem
function fitSlideOverflow(slide) {
  // Sua solução aqui
}
```

**HTML (estilos inline, estrutura):**
- Modificar padding, margin, font-size inline
- Ajustar estrutura de containers (divs, flex, grid)
- Reposicionar elementos

### 4. Regras de Ouro

✅ **FAZER:**
- Tentar qualquer solução técnica (CSS, JS, HTML, posicionamento, estilo, tipografia)
- Usar apenas `var(--nome)` para cores (paleta oficial)
- Testar em 1280×720px (formato do viewer)
- Documentar mudanças feitas

❌ **NÃO FAZER:**
- Modificar conteúdo médico (texto, números, claims, referências)
- Usar cores hardcoded (`#XXXXXX`)

**⚠️ IMPORTANTE:** 
- O código será commitado e está salvo
- Se as correções não derem certo, pode fazer `git pull` para reverter
- Sinta-se livre para experimentar soluções técnicas

---

## 📝 Template de Análise

Para cada slide problemático, forneça:

### 1. Identificação
- **Arquivo:** `OSTEOPOROSE/src/slides/[NOME].html`
- **Data-key:** `S##` (se disponível)
- **Problema:** Descrição específica do que está cortado

### 2. Análise
- **Elementos que excedem:** Lista de elementos/containers que ultrapassam margem inferior
- **Causa provável:** Explicação técnica (padding alto, font-size grande, gap excessivo, etc)

### 3. Solução Proposta
- **CSS (preferível):** Código CSS específico para adicionar em `print.css`
- **HTML (se necessário):** Modificações específicas no arquivo HTML do slide
- **Justificativa:** Por que esta solução resolve o problema sem afetar outros slides

### 4. Validação
- **Teste sugerido:** Como verificar se a solução funciona
- **Impacto em outros slides:** Confirmação de que não afeta outros slides

---

## 🎯 Exemplo de Prompt para Slide Específico

```
Analise o slide S03 do projeto OSTEOPOROSE.

Arquivo: OSTEOPOROSE/src/slides/S03_slide-3.html

Problema: Círculo "1" cortado na margem inferior quando renderizado em 1280×720px.

Contexto:
- Viewer: OSTEOPOROSE/src/index.html
- Formato: 16:9 (1280×720px)
- Solução atual: CSS conservador em print.css (ajustes mínimos)
- JavaScript auto-scale: DESABILITADO

Tarefas:
1. Ler o arquivo HTML do slide
2. Identificar elementos que excedem altura disponível
3. Sugerir ajustes técnicos (CSS, JavaScript, HTML, posicionamento, estilo, tipografia) que:
   - Resolvam o corte na margem inferior
   - Preservem a hierarquia visual
   - Mantenham legibilidade

Forneça:
- Análise técnica do problema
- Código completo da solução (CSS, JavaScript, HTML - o que for necessário)
- Justificativa da solução
- Como testar a correção

**Liberdade:** Você pode tentar qualquer abordagem técnica (CSS global, JavaScript melhorado, ajustes de posicionamento, etc). O código será commitado e se não funcionar pode ser revertido.
```

---

## 📚 Referências

- **CHANGELOG:** `docs/CHANGELOG.md` - Seção `[2026-01-23] - OSTEOPOROSE Viewer: Correção de Cortes`
- **Histórico de Tentativas:** `docs/OSTEOPOROSE_VIEWER_FIX_ATTEMPTS.md`
- **README:** `README.md` - Seção sobre OSTEOPOROSE
- **Paleta Oficial:** `docs/ESSENTIAL/PROMPT_PALETA_OFICIAL.md`

---

## ⚠️ Regras Rígidas

1. **NÃO modificar conteúdo médico:** Texto, números, claims, referências são READ-ONLY
2. **NÃO usar cores hardcoded:** Apenas `var(--nome)` da paleta oficial
3. **PODE modificar:** CSS (qualquer tipo), JavaScript, HTML, posicionamento, estilo, tipografia
4. **PODE experimentar:** Soluções globais ou específicas, melhorias em JavaScript, qualquer abordagem técnica
5. **SEMPRE testar:** Verificar que ajuste funciona no viewer (1280×720px)

**💡 Liberdade Técnica:**
- Você tem liberdade para tentar qualquer solução técnica
- Se não funcionar, o código está salvo e pode ser revertido com `git pull`
- Foque em resolver o problema de corte na margem inferior

---

**Última atualização:** 2026-01-23  
**Status:** ✅ Solução conservadora implementada - ajustes individuais necessários para slides específicos
