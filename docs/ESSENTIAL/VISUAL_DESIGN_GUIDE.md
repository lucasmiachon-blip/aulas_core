# 🎨 GUIA DE DESIGN VISUAL ELITE
## Técnicas de Tufte, Mayer e Apresentações Médicas Modernas

---

# PRINCÍPIOS FUNDAMENTAIS

## 1. Assertion-Evidence (Michael Alley)

**❌ Tradicional (tópico + bullets):**
```
┌────────────────────────────────────────┐
│  Benefícios das Estatinas              │  ← Tópico vago
│                                        │
│  • Reduzem colesterol LDL              │  ← Bullets genéricos
│  • Diminuem eventos cardiovasculares   │
│  • São bem toleradas                   │
│  • Custo acessível                     │
└────────────────────────────────────────┘
```

**✅ Assertion-Evidence (afirmação + evidência visual):**
```
┌────────────────────────────────────────┐
│  Estatinas reduzem eventos CV em 22%   │  ← Afirmação específica
│  por cada mmol/L de redução do LDL     │    e verificável
│                                        │
│  ┌──────────────────────────────────┐  │
│  │                                  │  │
│  │     [GRÁFICO DO CTT META-       │  │  ← Evidência visual
│  │      ANALYSIS MOSTRANDO         │  │
│  │      A RELAÇÃO LINEAR]          │  │
│  │                                  │  │
│  └──────────────────────────────────┘  │
│                                        │
│  CTT Collaboration, Lancet 2010        │  ← Fonte clara
└────────────────────────────────────────┘
```

---

## 2. Data-Ink Ratio (Edward Tufte)

**Fórmula:** Data-ink / Total ink = Maximize

**Antes (baixo data-ink):**
```
┌────────────────────────────────────────┐
│  ╔══════════════════════════════════╗  │
│  ║  🏥  DADOS IMPORTANTES  🏥       ║  │  ← Bordas decorativas
│  ╠══════════════════════════════════╣  │
│  ║                                  ║  │
│  ║    ████████████  75%            ║  │  ← Gradiente 3D
│  ║    ████████████                 ║  │
│  ║                                  ║  │
│  ╚══════════════════════════════════╝  │
│  ★★★ IMPORTANTE ★★★                    │  ← Chartjunk
└────────────────────────────────────────┘
```

**Depois (alto data-ink):**
```
┌────────────────────────────────────────┐
│                                        │
│  Adesão ao tratamento                  │
│                                        │
│  ■■■■■■■■■■■■■■■■■■■■░░░░░░  75%       │  ← Só dados
│                                        │
│  n = 12,000 pacientes                  │  ← Contexto essencial
│                                        │
└────────────────────────────────────────┘
```

---

## 3. Princípios de Mayer (Multimedia Learning)

### Coherence (Coerência)
**Remover tudo que não contribui para o objetivo de aprendizagem**

```
❌ Ruim:                          ✅ Bom:
┌──────────────────────┐         ┌──────────────────────┐
│ 🏥💊💉🩺             │         │                      │
│                      │         │  NNT = 39            │
│ O NNT para           │         │                      │
│ prevenção primária   │         │  Prevenção primária  │
│ com estatinas é de   │         │  com estatinas       │
│ aproximadamente 39   │         │                      │
│ pacientes tratados   │         │  39 pacientes        │
│ por 5 anos para      │         │  tratados por 5 anos │
│ prevenir 1 evento    │         │  = 1 evento evitado  │
│ cardiovascular       │         │                      │
│ maior 💔➡️💚        │         │  WOSCOPS, 1995       │
└──────────────────────┘         └──────────────────────┘
```

### Signaling (Sinalização)
**Destacar informação crítica**

```css
/* Use --color-highlight (gold) para: */
- Números-chave (NNT, ARR, HR)
- A conclusão principal
- Termos sendo definidos

/* Use --color-accent (teal) para: */
- Ênfase secundária
- Links e referências
- Bordas de destaque
```

### Spatial Contiguity (Contiguidade Espacial)
**Texto perto do visual que descreve**

```
❌ Ruim:                          ✅ Bom:
┌──────────────────────┐         ┌──────────────────────┐
│ Estatinas reduzem    │         │                      │
│ eventos em 22%       │         │  ┌─────────────────┐ │
│                      │         │  │    Estatinas    │ │
│                      │         │  │                 │ │
│ ┌────────────────┐   │         │  │  ─────────────  │ │
│ │   [GRÁFICO]    │   │         │  │  ↓ 22%         │ │
│ │                │   │         │  │  eventos CV    │ │
│ │                │   │         │  │                 │ │
│ └────────────────┘   │         │  └─────────────────┘ │
│                      │         │                      │
│ Fonte: CTT 2010      │         │    CTT 2010 ←────────│
└──────────────────────┘         └──────────────────────┘
     Texto longe                      Texto integrado
```

---

## 4. Hierarquia Visual (F-Pattern / Z-Pattern)

### F-Pattern (para slides com texto)
```
┌────────────────────────────────────────┐
│  ████████████████████                  │  ← Título (olho começa aqui)
│  ──────────────────────────────────    │
│                                        │
│  ████████████████  ░░░░░░░░░░░░░░░░░  │  ← Primeira linha de conteúdo
│  ████████████      ░░░░░░░░░░░░░░░░░  │
│  ████████          ░░░░░░░░░░░░░░░░░  │  ← Olho desce pelo lado esquerdo
│                                        │
│                          Fonte: XXX    │  ← Rodapé (última coisa vista)
└────────────────────────────────────────┘
```

### Z-Pattern (para slides visuais)
```
┌────────────────────────────────────────┐
│  1 ─────────────────────────────────▶ 2│  ← Começa canto superior esquerdo
│  TÍTULO                        NÚMERO  │    termina superior direito
│                    ╲                   │
│                      ╲                 │
│                        ╲               │  ← Diagonal para baixo
│                          ╲             │
│  3 ◀─────────────────────────────── 4  │  ← Inferior esquerdo → direito
│  CONTEXTO                    CTA/FONTE │
└────────────────────────────────────────┘
```

---

## 5. Teoria das Cores para Medicina

### Psicologia das Cores

| Cor | Emoção | Uso em Medicina |
|-----|--------|-----------------|
| **Navy (#1a2744)** | Confiança, autoridade, profissionalismo | Fundo principal, textos de autoridade |
| **Teal (#0d9488)** | Calma, saúde, limpeza, modernidade | Destaques médicos, ícones de saúde |
| **Gold (#f59e0b)** | Excelência, valor, atenção | Números importantes, conclusões |
| **Verde (#10b981)** | Benefício, melhora, vida | Resultados positivos, ↓ risco |
| **Vermelho (#ef4444)** | Alerta, risco, urgência | Efeitos adversos, ↑ risco (usar pouco) |
| **Cinza (#64748b)** | Neutro, secundário | Texto de suporte, metadados |

### Regra 60-30-10

```
┌────────────────────────────────────────┐
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  60% - COR DOMINANTE
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│       (Navy ou Branco)
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░│  30% - COR SECUNDÁRIA
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░│       (Texto, elementos)
│████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  10% - COR DE ACENTO
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│       (Gold highlights)
└────────────────────────────────────────┘
```

---

## 6. Tipografia Médica

### Hierarquia de Tamanhos

```
HERO (61px)     ████████████████████████████████
                Número de destaque (NNT, %)

H1 (49px)       ██████████████████████████
                Título do slide

H2 (39px)       ████████████████████
                Subtítulo importante

H3 (31px)       ██████████████
                Seção

Body (16-20px)  ████████
                Texto principal

Small (14px)    ██████
                Metadados, fontes
```

### Fontes Recomendadas

| Uso | Fonte | Peso | Por quê |
|-----|-------|------|---------|
| Títulos | Inter | 600-700 | Moderna, clara, médica |
| Corpo | Source Sans 3 | 400-600 | Excelente legibilidade |
| Dados | JetBrains Mono | 400 | Alinhamento numérico |
| Alternativa | Söhne | 400-600 | Usada pela OpenAI/Stripe |

---

## 7. Layout de Dados Médicos

### NNT/ARR Display

```
┌────────────────────────────────────────┐
│                                        │
│              ┌─────────┐               │
│              │   39    │  ← Número GRANDE
│              │         │    Gold (#f59e0b)
│              └─────────┘               │
│                                        │
│         Pacientes tratados             │  ← Contexto
│           por 5 anos                   │    menor, muted
│                                        │
│      para evitar 1 evento CV           │  ← Resultado
│                                        │
│  ──────────────────────────────────    │
│  Prevenção primária | WOSCOPS 1995     │  ← Contexto + Fonte
│                                        │
└────────────────────────────────────────┘
```

### Comparação de Tratamentos

```
┌────────────────────────────────────────┐
│  Redução de LDL-C por classe           │
│                                        │
│  Estatina alta    ████████████████ 50% │
│  Estatina + Eze   ██████████████████ 65%│
│  + iPCSK9         ████████████████████ 85%│
│                                        │
│  ───────────────────────────────────   │
│                   0%    50%    100%    │
└────────────────────────────────────────┘

Regras:
- Barras horizontais (não verticais)
- Ordenar por valor
- Incluir valor numérico
- Baseline visual claro
```

### Timeline de Estudos

```
┌────────────────────────────────────────┐
│                                        │
│  1994     2002      2015      2017     │
│   │        │         │         │       │
│   ●────────●─────────●─────────●       │
│   │        │         │         │       │
│  4S       HPS    IMPROVE-IT  FOURIER   │
│  n=4,444  n=20,536  n=18,144  n=27,564 │
│                                        │
└────────────────────────────────────────┘

Regras:
- Esquerda → Direita (temporal)
- Marcos destacados
- Dados relevantes abaixo
```

---

## 8. Componentes Visuais

### Card de Destaque

```css
.highlight-card {
  background: linear-gradient(135deg, 
    var(--color-primary) 0%, 
    var(--color-primary-light) 100%);
  border-left: 4px solid var(--color-highlight);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-lg);
}
```

### Citação de Guideline

```
┌────────────────────────────────────────┐
│  "                                     │
│    Em pacientes com DCV aterosclerótica│
│    estabelecida, recomenda-se LDL-C    │
│    < 55 mg/dL (Classe I, Nível A)      │
│                                     "  │
│                                        │
│  ─── ESC/EAS Guidelines 2019 ─────     │
└────────────────────────────────────────┘
```

### Callout de Atenção

```
┌────────────────────────────────────────┐
│  ⚠️  ATENÇÃO                           │
│  ────────────────────────────────────  │
│  Miopatia grave é rara (<0.1%) mas     │
│  requer suspensão imediata se CPK      │
│  > 10x LSN com sintomas musculares.    │
│                                        │
│  Newman et al. ATVB 2019               │
└────────────────────────────────────────┘
```

---

## 9. Animações Sutis

### Entrada de Slide
```css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide.active {
  animation: slideIn 400ms ease-out;
}
```

### Reveal de Número (JS)
```javascript
function animateNumber(element, target, duration = 1000) {
  const start = 0;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    
    element.textContent = Math.round(start + (target - start) * eased);
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}
```

### Stagger de Elementos
```css
.stagger > * {
  opacity: 0;
  animation: fadeIn 300ms ease-out forwards;
}

.stagger > *:nth-child(1) { animation-delay: 0ms; }
.stagger > *:nth-child(2) { animation-delay: 100ms; }
.stagger > *:nth-child(3) { animation-delay: 200ms; }
```

---

## 10. Checklist de Design Visual

### Para Cada Slide

```
HIERARQUIA
□ Tem uma mensagem principal clara?
□ O elemento mais importante é o mais proeminente?
□ A ordem de leitura faz sentido (F ou Z)?

CORES
□ Usando apenas cores da paleta?
□ Contraste mínimo 4.5:1?
□ Gold apenas para destaques importantes?
□ Não mais que 3 cores por slide?

TIPOGRAFIA
□ Hierarquia de tamanhos clara?
□ Fontes do sistema (Inter, Source Sans)?
□ Texto alinhado à esquerda (não centralizado)?
□ Line-height adequado (1.5 para corpo)?

DADOS
□ Números estão destacados?
□ Contexto suficiente para entender?
□ Fonte citada?
□ Gráficos proporcionais aos dados?

ESPAÇO
□ Respiro adequado (não apertado)?
□ Grid de 8px respeitado?
□ Elementos não encostam nas bordas?
□ Agrupamentos lógicos?

COGNITIVE LOAD
□ Uma ideia por slide?
□ Máximo 3 pontos se tiver lista?
□ Informação não-essencial removida?
□ Pode ser entendido em 3 segundos?
```

---

*Guia criado em 30/01/2026*
*Baseado em: Tufte, Mayer, Alley, Reynolds, Duarte*
*Versão 1.0*
