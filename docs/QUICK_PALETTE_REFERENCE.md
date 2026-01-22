# 🎨 PALETA OFICIAL - COLE ISTO NO CHATGPT

## ⚠️ ANTES DE CRIAR SLIDES, COLE ISTO:

```
🎨 PALETA PROFISSIONAL OBRIGATÓRIA (aulas_core / GRADE):

CORES (use APENAS estas via var(--)):
--bg: #F8FAFC        (fundo)
--navy: #0B1320      (base escura)
--gold: #D2B55B      (acento quente — use com parcimônia)
--teal: #0F766E      (clínico)
--blue: #2563EB      (acento frio)
--text: #0F172A      (texto principal)
--muted: #475569     (legendas)
--white: #FFFFFF     (cards)
--border: #E2E8F0    (bordas)

RGB HELPERS (para transparência):
--gold-rgb: 210,181,91 | --teal-rgb: 15,118,110 | --blue-rgb: 37,99,235 | --navy-rgb: 11,19,32

TIPOGRAFIA:
- Principal (slides): Inter (sans)
- Serif opcional (quotes): Georgia

REGRAS:
✅ SEMPRE use var(--nome) no HTML inline
✅ Para fundos “tint”: use rgba(var(--*-rgb), 0.x) (ex: rgba(var(--gold-rgb),0.12))
✅ Fundo slide: var(--bg) ou var(--navy) (capa)
✅ Títulos H2: var(--navy)
✅ Destaques: var(--gold) ou var(--teal)
✅ Cards: var(--white) com borda var(--border)
❌ NUNCA use cores hardcoded (#333, #000, etc)
❌ NUNCA invente cores fora desta lista

TEMPLATE BÁSICO:
<section class="slide">
    <h2 style="color: var(--navy);">Título</h2>
    <div style="background: var(--white); border: 1px solid var(--border); border-radius: 0.8vw; padding: 2vw;">
        <p style="color: var(--text);">Conteúdo</p>
    </div>
    <div style="position: absolute; bottom: 2vw; left: 6%; font-size: 0.75vw; color: var(--muted);">
        Fonte: [Referência]
    </div>
</section>

SE VOCÊ USAR QUALQUER COR FORA DESTA LISTA, O SLIDE SERÁ REJEITADO.
```

## 📋 VERSÃO AINDA MAIS CURTA:

```
CORES OBRIGATÓRIAS:
Navy #0B1320 | Gold #D2B55B | Teal #0F766E | Blue #2563EB
Bg #F8FAFC | Text #0F172A | Muted #475569 | White #FFF | Border #E2E8F0

USE: var(--navy) var(--gold) etc
NUNCA: #333 #000 ou cores aleatórias

Fonte principal: Inter
```

## 🚀 COMO USAR:

1. **Abra ChatGPT/outro assistente**
2. **Cole a paleta acima PRIMEIRO**
3. **Depois peça:** "Crie slide sobre X usando a paleta oficial"
4. **Valide:** Confira se usou var(--nome) corretamente
5. **Se errar:** Mostre este documento e peça correção

---

**Link completo:** `docs/PROMPT_PALETA_OFICIAL.md`
