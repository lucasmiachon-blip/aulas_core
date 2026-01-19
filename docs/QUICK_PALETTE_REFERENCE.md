# 🎨 PALETA OFICIAL - COLE ISTO NO CHATGPT

## ⚠️ ANTES DE CRIAR SLIDES, COLE ISTO:

```
🎨 PALETA PROFISSIONAL OBRIGATÓRIA (aulas_core):

CORES (use APENAS estas via var(--)):
--bg: #F9F8F4        (fundo)
--navy: #0B1320      (títulos/base escura)
--gold: #DDB944      (destaques)
--teal: #1F766E      (clínico)
--blue: #2563EB      (suporte)
--text: #222         (texto principal)
--muted: #666        (legendas)
--white: #FFFFFF     (cards)
--border: #E9ECEF    (bordas)

TIPOGRAFIA:
- Títulos: Georgia (serif)
- Corpo: Lato (sans-serif)

REGRAS:
✅ SEMPRE use var(--nome) no HTML inline
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
Navy #0B1320 | Gold #DDB944 | Teal #1F766E | Blue #2563EB
Bg #F9F8F4 | Text #222 | Muted #666 | White #FFF | Border #E9ECEF

USE: var(--navy) var(--gold) etc
NUNCA: #333 #000 ou cores aleatórias

Fontes: Georgia (títulos) | Lato (corpo)
```

## 🚀 COMO USAR:

1. **Abra ChatGPT/outro assistente**
2. **Cole a paleta acima PRIMEIRO**
3. **Depois peça:** "Crie slide sobre X usando a paleta oficial"
4. **Valide:** Confira se usou var(--nome) corretamente
5. **Se errar:** Mostre este documento e peça correção

---

**Link completo:** `docs/PROMPT_PALETA_OFICIAL.md`
