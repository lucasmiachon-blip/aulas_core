# 🎨 PALETA PROFISSIONAL OBRIGATÓRIA - AULAS_CORE

## ⚠️ LEIA ANTES DE CRIAR QUALQUER SLIDE

Este documento define a **identidade visual OFICIAL** do projeto `aulas_core`.
**TODA criação de slides DEVE usar EXCLUSIVAMENTE estas cores e tipografias.**

---

## 🎨 CORES OFICIAIS (CSS VARIABLES)

### ✅ CORES PERMITIDAS (USE APENAS ESTAS):

```css
:root {
    --bg: #F9F8F4;      /* Off-white - FUNDO PADRÃO */
    --navy: #0B1320;    /* Navy - TÍTULOS/BASE ESCURA */
    --gold: #DDB944;    /* Gold - DESTAQUES/ÊNFASE */
    --text: #222;       /* Cinza escuro - TEXTO PRINCIPAL */
    --muted: #666;      /* Cinza médio - TEXTO SECUNDÁRIO */
    --border: #E9ECEF;  /* Cinza claro - BORDAS */
    --teal: #1F766E;    /* Teal - CLÍNICO/DADOS */
    --blue: #2563EB;    /* Azul - SUPORTE/INFORMAÇÃO */
    --white: #FFFFFF;   /* Branco - CARDS/CONTRASTE */
}
```

### 🎯 COMO USAR:

**NO HTML:**
```html
<!-- ✅ CORRETO -->
<div style="background: var(--navy); color: var(--gold);">
<h2 style="color: var(--navy);">Título</h2>
<p style="color: var(--text);">Texto</p>

<!-- ❌ ERRADO - NUNCA FAZER -->
<div style="background: #333333; color: #FFD700;">
<h2 style="color: #000000;">Título</h2>
```

**TABELA DE USO:**

| Elemento | Cor Principal | Cor Secundária |
|----------|---------------|----------------|
| Fundo slide | `var(--bg)` | `var(--navy)` (capa) |
| Título H2 | `var(--navy)` | `var(--gold)` (ênfase) |
| Texto corpo | `var(--text)` | `var(--muted)` (legendas) |
| Cards/boxes | `var(--white)` | bordas `var(--border)` |
| Destaques médicos | `var(--teal)` | - |
| Badges/tags | `var(--navy)` fundo | `var(--gold)` ou `var(--teal)` |

---

## 📝 TIPOGRAFIA OFICIAL

### ✅ FONTES PERMITIDAS:

```css
/* Títulos (H1, H2) */
font-family: 'Georgia', serif;

/* Texto corpo (P, LI, SPAN) */
font-family: 'Lato', sans-serif;
```

### 🎯 HIERARQUIA:

```css
h1 {
    font-family: 'Georgia', serif;
    font-size: 8.5vw;
    color: var(--gold);
}

h2 {
    font-family: 'Georgia', serif;
    font-size: 3.5vw;
    color: var(--navy);
}

p {
    font-family: 'Lato', sans-serif;
    font-size: 1.4vw;
    color: var(--text);
}
```

---

## ❌ CORES PROIBIDAS (NUNCA USAR)

Estas cores **NÃO fazem parte** da paleta oficial:

```
❌ #333333 (cinza genérico)
❌ #000000 (preto puro)
❌ #FFFFFF com opacidade (use var(--white))
❌ #FF0000, #00FF00 (cores primárias puras)
❌ #2C5F2D, #D32F2F (verdes/vermelhos aleatórios)
❌ #F57C00, #7E57C2 (laranjas/roxos aleatórios)
❌ Qualquer cor fora da lista oficial
```

**Se você usar qualquer dessas cores, o slide será REJEITADO.**

---

## 🎯 CHECKLIST DE VALIDAÇÃO

Antes de entregar qualquer slide, verifique:

- [ ] Todas as cores usam `var(--nome)` 
- [ ] Nenhuma cor hardcoded (#XXXXXX) exceto as 9 oficiais
- [ ] Títulos usam Georgia
- [ ] Texto corpo usa Lato
- [ ] Fundo é `var(--bg)` ou `var(--navy)` (capa)
- [ ] Destaques usam `var(--gold)` ou `var(--teal)`
- [ ] Rodapé tem fonte auditável quando houver dados

---

## 📋 PROTOCOLO DE CRIAÇÃO DE SLIDES

### 1. SEMPRE COMECE ASSIM:

```html
<section class="slide">
    <h2 style="color: var(--navy);">Título do Slide</h2>
    
    <div style="display: flex; gap: 2vw;">
        <!-- Seu conteúdo aqui -->
    </div>
    
    <!-- Rodapé com fonte -->
    <div style="position: absolute; bottom: 2vw; left: 6%; right: 6%; font-size: 0.75vw; color: var(--muted);">
        Fonte: [Referência bibliográfica]
    </div>
</section>
```

### 2. CARDS/BOXES PADRÃO:

```html
<div style="background: var(--white); 
            border: 1px solid var(--border); 
            border-radius: 0.8vw; 
            padding: 2vw; 
            box-shadow: 0 0.3vw 1vw rgba(0,0,0,0.04);">
    <p style="color: var(--navy); font-weight: 700;">Título do Card</p>
    <p style="color: var(--text);">Conteúdo</p>
</div>
```

### 3. BADGES/TAGS:

```html
<!-- Badge Navy -->
<span style="background: var(--navy); 
             color: var(--white); 
             padding: 0.4vw 0.8vw; 
             border-radius: 0.3vw; 
             font-size: 0.85vw; 
             font-weight: 700;">
    FORTE
</span>

<!-- Badge Teal -->
<span style="background: var(--teal); 
             color: var(--white); 
             padding: 0.4vw 0.8vw; 
             border-radius: 0.3vw; 
             font-size: 0.85vw; 
             font-weight: 700;">
    ALTA
</span>

<!-- Badge Gold -->
<span style="background: var(--gold); 
             color: var(--navy); 
             padding: 0.4vw 0.8vw; 
             border-radius: 0.3vw; 
             font-size: 0.85vw; 
             font-weight: 700;">
    MODERADA
</span>
```

---

## 🚨 EXEMPLO COMPLETO (CORRETO)

```html
<section class="slide">
    <h2 style="color: var(--navy); margin-bottom: 2vw;">
        Exemplo de Slide Correto
    </h2>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2vw;">
        
        <!-- Card 1 -->
        <div style="background: var(--white); 
                    border: 1px solid var(--border); 
                    border-radius: 0.8vw; 
                    padding: 2vw;">
            <p style="color: var(--teal); 
                      font-weight: 700; 
                      font-size: 1vw; 
                      text-transform: uppercase; 
                      margin-bottom: 1vw;">
                Evidência
            </p>
            <p style="color: var(--text); 
                      font-size: 1.3vw; 
                      line-height: 1.6;">
                Texto do card usando cores oficiais.
            </p>
            
            <!-- Badge -->
            <span style="background: var(--navy); 
                         color: var(--white); 
                         padding: 0.4vw 0.8vw; 
                         border-radius: 0.3vw; 
                         font-size: 0.85vw; 
                         margin-top: 1vw;
                         display: inline-block;">
                ⊕⊕⊕⊕ ALTA
            </span>
        </div>
        
        <!-- Card 2 -->
        <div style="background: var(--white); 
                    border: 1px solid var(--border); 
                    border-radius: 0.8vw; 
                    padding: 2vw;">
            <p style="color: var(--gold); 
                      font-weight: 700; 
                      font-size: 1vw; 
                      text-transform: uppercase; 
                      margin-bottom: 1vw;">
                Recomendação
            </p>
            <p style="color: var(--text); 
                      font-size: 1.3vw; 
                      line-height: 1.6;">
                Outro card com paleta oficial.
            </p>
        </div>
        
    </div>
    
    <!-- Rodapé -->
    <div style="position: absolute; 
                bottom: 2vw; 
                left: 6%; 
                right: 6%; 
                font-size: 0.75vw; 
                color: var(--muted);">
        Fonte: Guyatt et al. BMJ 2008; Rached et al. ABC 2025
    </div>
</section>
```

---

## 🎓 REGRAS DE QUALIDADE

1. **1 mensagem por slide** (10-second rule)
2. **Rodapé com fonte** quando houver dados verificáveis
3. **Sem chartjunk** (ornamentos desnecessários)
4. **Hierarquia visual clara:** título > mensagem > evidência > nota
5. **Funciona em escala de cinza** (acessibilidade)

---

## 💬 QUANDO USAR CADA COR

| Contexto | Cor Principal | Uso |
|----------|---------------|-----|
| **Slide de capa** | `var(--navy)` fundo | Impacto inicial |
| **Títulos gerais** | `var(--navy)` | Hierarquia forte |
| **Destaques importantes** | `var(--gold)` | Chamar atenção |
| **Dados clínicos/médicos** | `var(--teal)` | Credibilidade técnica |
| **Informação suporte** | `var(--blue)` | Contexto adicional |
| **Legendas/notas** | `var(--muted)` | Hierarquia baixa |
| **Cards/boxes** | `var(--white)` | Organização |
| **Bordas sutis** | `var(--border)` | Separação visual |

---

## ⚡ COMANDO RÁPIDO

**Cole isto no chat antes de pedir slides:**

```
🎨 PALETA OBRIGATÓRIA:
- Fundo: var(--bg) #F9F8F4
- Navy: var(--navy) #0B1320
- Gold: var(--gold) #DDB944
- Teal: var(--teal) #1F766E
- Blue: var(--blue) #2563EB
- Texto: var(--text) #222
- Muted: var(--muted) #666
- White: var(--white) #FFFFFF
- Border: var(--border) #E9ECEF

TIPOGRAFIA:
- Títulos: Georgia
- Corpo: Lato

❌ NUNCA use cores fora desta lista!
✅ SEMPRE use var(--nome) no HTML
```

---

**Versão:** 1.0  
**Última atualização:** 2026-01-19  
**Projeto:** aulas_core (GRADE + OSTEOPOROSE)
