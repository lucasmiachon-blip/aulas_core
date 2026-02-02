# 🎨 PALETA OFICIAL — Referência Rápida

**Última atualização:** 2026-02-02

> **HC3:** Zero `!important` novo  
> **HC9:** Zero inline styles com cores hardcoded

---

## GRADE — Paleta

```css
:root {
  --bg: #f8fafc;        /* Fundo claro */
  --navy: #0b1320;      /* Títulos, base escura */
  --gold: #d2b55b;      /* Acento quente */
  --teal: #0f766e;      /* Clínico */
  --blue: #2563eb;      /* Acento frio */
  --text: #0f172a;      /* Texto principal */
  --muted: #475569;     /* Legendas */
  --white: #ffffff;     /* Cards */
  --border: #e2e8f0;    /* Bordas */
  --amber: #a16207;     /* Alertas (Lp(a)) */
  --danger: #ef4444;    /* Erros */
}
```

### RGB Helpers (para transparência)
```css
rgba(var(--gold-rgb), 0.12)   /* Gold 12% */
rgba(var(--navy-rgb), 0.08)   /* Navy 8% */
```

---

## OSTEOPOROSE — Paleta

```css
:root {
  --bg: #F9F8F4;        /* Off-white */
  --navy: #152432;      /* Títulos */
  --gold: #DDB944;      /* Destaques */
  --teal: #1F766E;      /* Clínico */
  --text: #222220;      /* Texto principal */
  --muted: #666;        /* Legendas */
  --white: #ffffff;     /* Cards */
}
```

---

## ✅ USAR ASSIM

```html
<!-- CORRETO -->
<h2 style="color: var(--navy);">Título</h2>
<div style="background: var(--bg);">Conteúdo</div>
<p style="color: var(--muted);">Legenda</p>
```

## ❌ NUNCA ASSIM

```html
<!-- ERRADO - cor hardcoded -->
<h2 style="color: #0b1320;">Título</h2>
<div style="background: #f8fafc;">Conteúdo</div>
<p style="color: #475569;">Legenda</p>
```

---

## 📋 TEMPLATE BÁSICO

```html
<section class="slide">
  <h2 style="color: var(--navy);">Título do Slide</h2>
  
  <div class="card">
    <p style="color: var(--text);">Conteúdo principal</p>
  </div>
  
  <div class="ref">
    Fonte: [Referência]
  </div>
</section>
```

---

## REGRAS (HC3, HC9)

| ✅ Fazer | ❌ Não Fazer |
|----------|--------------|
| `var(--navy)` | `#0b1320` |
| `var(--gold)` | `#d2b55b` |
| Usar classes CSS | Inline styles novos |
| Consultar base.css | Inventar cores |

---

*Se precisar de cor nova → adicionar em `:root` do base.css (com aprovação)*
