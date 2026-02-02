# ⚠️ CLAUDE AUTO-CHECKLIST - LEIA ANTES DE CRIAR SLIDES

## 🚨 PROTOCOLO OBRIGATÓRIO PARA CRIAÇÃO DE SLIDES

**ATENÇÃO CLAUDE:** Este arquivo é para **VOCÊ**. Antes de criar/modificar qualquer slide, você **DEVE** verificar cada item desta lista.

---

## ✅ CHECKLIST PRÉ-CRIAÇÃO (OBRIGATÓRIO)

Antes de escrever qualquer código HTML para slides, verifique:

### 1. PALETA DE CORES

- [ ] Leu o arquivo `docs/PROMPT_PALETA_OFICIAL.md`?
- [ ] Conhece as 9 cores oficiais?
- [ ] Sabe quais cores são PROIBIDAS?

**Se NÃO:** PARE. Leia `docs/PROMPT_PALETA_OFICIAL.md` AGORA.

---

### 2. CORES - REGRAS ABSOLUTAS

#### ✅ PERMITIDO:
```html
<!-- Use APENAS var(--nome) -->
<div style="background: var(--navy);">
<h2 style="color: var(--gold);">
<p style="color: var(--text);">
<span style="background: var(--teal); color: var(--white);">
```

#### ❌ PROIBIDO:
```html
<!-- NUNCA use cores hardcoded -->
<div style="background: #2C2C2C;">  ❌
<h2 style="color: #333;">  ❌
<p style="color: #666;">  ❌
<span style="background: #888;">  ❌
```

**REGRA DE OURO:** Se você digitar `#` seguido de código hex no HTML, VOCÊ ESTÁ ERRANDO!

---

### 3. TIPOGRAFIA - REGRAS ABSOLUTAS

#### ✅ TÍTULOS (H1, H2):
```html
<h1 style="font-family: 'Georgia', serif;">
<h2 style="font-family: 'Georgia', serif;">
```

#### ✅ TEXTO (P, SPAN, LI):
```html
<p style="font-family: 'Lato', sans-serif;">
<span style="font-family: 'Lato', sans-serif;">
```

#### ❌ NUNCA USE:
- Arial
- Helvetica
- Times New Roman
- Sans-serif genérico sem especificar Lato

---

### 4. ESTRUTURA PADRÃO DE SLIDE

**SEMPRE comece com este template:**

```html
<section class="slide">
    <!-- Título -->
    <h2 style="color: var(--navy); font-size: 3.5vw; margin-bottom: 2vw;">
        Título do Slide
    </h2>
    
    <!-- Conteúdo (grid 2 colunas exemplo) -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2vw;">
        
        <!-- Card 1 -->
        <div style="background: var(--white); 
                    border: 1px solid var(--border); 
                    border-radius: 0.8vw; 
                    padding: 2vw;">
            <p style="color: var(--teal); 
                      font-weight: 700; 
                      font-size: 1vw; 
                      text-transform: uppercase;">
                Label
            </p>
            <p style="color: var(--text); 
                      font-size: 1.3vw; 
                      line-height: 1.6;">
                Conteúdo
            </p>
        </div>
        
        <!-- Card 2 -->
        <div style="background: var(--white); 
                    border: 1px solid var(--border); 
                    border-radius: 0.8vw; 
                    padding: 2vw;">
            <p style="color: var(--text); font-size: 1.3vw;">
                Outro conteúdo
            </p>
        </div>
        
    </div>
    
    <!-- Rodapé com fonte -->
    <div style="position: absolute; 
                bottom: 2vw; 
                left: 6%; 
                right: 6%; 
                font-size: 0.75vw; 
                color: var(--muted); 
                font-family: 'Lato', sans-serif;">
        Fonte: [Referência bibliográfica completa]
    </div>
</section>
```

---

### 5. BADGES/TAGS PADRÃO

```html
<!-- Badge Navy (FORTE, etc) -->
<span style="background: var(--navy); 
             color: var(--white); 
             padding: 0.4vw 0.8vw; 
             border-radius: 0.3vw; 
             font-size: 0.85vw; 
             font-weight: 700; 
             font-family: 'Lato', sans-serif;">
    FORTE
</span>

<!-- Badge Teal (ALTA, certeza) -->
<span style="background: var(--teal); 
             color: var(--white); 
             padding: 0.4vw 0.8vw; 
             border-radius: 0.3vw; 
             font-size: 0.85vw; 
             font-weight: 700; 
             font-family: 'Lato', sans-serif;">
    ⊕⊕⊕⊕ ALTA
</span>

<!-- Badge Gold (ênfase especial) -->
<span style="background: var(--gold); 
             color: var(--navy); 
             padding: 0.4vw 0.8vw; 
             border-radius: 0.3vw; 
             font-size: 0.85vw; 
             font-weight: 700; 
             font-family: 'Lato', sans-serif;">
    MODERADA
</span>
```

---

### 6. EMOJIS - POLÍTICA

#### ❌ NUNCA use emojis em:
- Código HTML dos slides
- Conteúdo visível na apresentação
- Títulos de slides
- Texto corpo

#### ✅ Emojis SÃO permitidos em:
- Mensagens de commit (🔧, 📋, ✅)
- Comunicação com o usuário (chat)
- Documentação interna (este arquivo)

**Mas prefira minimalismo!**

---

### 7. RODAPÉ OBRIGATÓRIO

**TODO slide com dados/números/afirmações verificáveis DEVE ter rodapé:**

```html
<div style="position: absolute; 
            bottom: 2vw; 
            left: 6%; 
            right: 6%; 
            font-size: 0.75vw; 
            color: var(--muted); 
            font-family: 'Lato', sans-serif;">
    Fonte: Autor et al. Journal YYYY; DOI ou URL
</div>
```

**Exemplos CORRETOS:**
```
Fonte: Rached FH et al. Arq Bras Cardiol. 2025;122(1):e20240321
Fonte: Guyatt GH et al. BMJ 2008;336:924-6
Fonte: Khan SS et al. JAMA 2024;331(12):1034-44
```

---

### 8. VALIDAÇÃO FINAL (ANTES DE ENTREGAR)

Depois de criar o slide, VERIFIQUE:

- [ ] Todas as cores usam `var(--nome)`
- [ ] Zero ocorrências de `#XXXXXX` (hex hardcoded)
- [ ] Títulos usam Georgia
- [ ] Texto corpo usa Lato
- [ ] Tem rodapé com fonte (se houver dados)
- [ ] Sem emojis no HTML do slide
- [ ] Background dos cards: `var(--white)`
- [ ] Bordas dos cards: `var(--border)`
- [ ] Labels/destaques: `var(--teal)` ou `var(--gold)`

---

## 🚨 SE VOCÊ QUEBRAR ESTAS REGRAS

**Consequências:**
1. O usuário terá que CORRIGIR seu trabalho
2. Tempo desperdiçado
3. Score de qualidade cai
4. Identidade visual quebrada
5. Profissionalismo comprometido

**Solução:**
- **ANTES de criar:** Leia este arquivo
- **DURANTE criação:** Use o template acima
- **DEPOIS de criar:** Valide cada item

---

## 📋 QUICK REFERENCE - CORES

```
var(--bg)      #F9F8F4   Fundo padrão
var(--navy)    #0B1320   Títulos, base escura
var(--gold)    #DDB944   Destaques importantes
var(--teal)    #1F766E   Clínico, dados
var(--blue)    #2563EB   Suporte
var(--text)    #222222   Texto principal
var(--muted)   #666666   Legendas, rodapé
var(--white)   #FFFFFF   Cards, boxes
var(--border)  #E9ECEF   Bordas sutis
```

---

## ⚡ COMANDO MENTAL (REPITA ANTES DE CRIAR):

```
"Vou criar um slide profissional.
Vou usar APENAS var(--nome).
Vou usar Georgia para títulos.
Vou usar Lato para texto.
Vou incluir rodapé com fonte.
Vou validar antes de entregar."
```

---

**VOCÊ (Claude) É RESPONSÁVEL por seguir este protocolo.**
**NÃO há desculpa para quebrar estas regras.**
**O usuário confia em você para fazer certo.**

---

**Versão:** 1.0  
**Última atualização:** 2026-01-19  
**Criado para:** Claude (AI Assistant)
