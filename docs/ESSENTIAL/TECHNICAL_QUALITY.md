# Technical Quality Checklist

## 🎯 Responsável: Claude (chat técnico)

Este documento define critérios TÉCNICOS de qualidade que Claude deve validar/garantir.

**NÃO cobre:** Conteúdo educacional, andragogia (outro Claude) ou auditoria final (ChatGPT)

---

## ♿ ACESSIBILIDADE (WCAG 2.1)

### Contraste de Cores

**Mínimos obrigatórios:**
- Texto normal (< 18pt): **4.5:1**
- Texto grande (≥ 18pt): **3:1**
- UI components: **3:1**

**Validação da paleta oficial:**

| Combinação | Contraste | Status |
|------------|-----------|--------|
| `--text` (#222) em `--bg` (#F9F8F4) | **13.7:1** | ✅ AAA |
| `--navy` (#0B1320) em `--bg` (#F9F8F4) | **17.2:1** | ✅ AAA |
| `--gold` (#DDB944) em `--navy` (#0B1320) | **8.1:1** | ✅ AAA |
| `--teal` (#1F766E) em `--white` (#FFFFFF) | **5.2:1** | ✅ AA |
| `--muted` (#666) em `--bg` (#F9F8F4) | **5.4:1** | ✅ AA |

**Ferramenta:** https://webaim.org/resources/contrastchecker/

---

### Daltonismo

**Teste obrigatório para:**
- Protanopia (red-blind)
- Deuteranopia (green-blind)
- Tritanopia (blue-blind)

**Regras:**
- ✅ Usar formas/ícones junto com cores (não só cor)
- ✅ Evitar verde/vermelho como única distinção
- ✅ Usar padrões/texturas quando necessário

**Nossa paleta:**
- Navy + Gold = Alto contraste mesmo em daltonismo ✅
- Teal = Distinguível de Navy e Gold ✅
- Evitar: múltiplos tons de verde/vermelho ✅

**Ferramenta:** Chrome DevTools > Rendering > Emulate vision deficiencies

---

### Escala de Cinza

**Requisito:** Toda informação deve ser compreensível em escala de cinza

**Teste:**
```css
/* Aplicar temporariamente: */
* {
  filter: grayscale(100%);
}
```

**Validação:**
- Hierarquia visual mantida? ✅
- Badges distinguíveis? ✅
- Destaques perceptíveis? ✅

---

### Leitores de Tela (Opcional para MVP)

**Para versão final:**
- Alt text em imagens
- ARIA labels em elementos interativos
- Heading hierarchy (H1 > H2 > H3)
- Skip links

**MVP:** Não obrigatório, mas estrutura HTML semântica ajuda

---

## ⚡ PERFORMANCE

### Tempo de Carregamento

**Meta:**
- First Contentful Paint (FCP): **< 1.5s**
- Largest Contentful Paint (LCP): **< 2.5s**
- Time to Interactive (TTI): **< 3.5s**

**Teste:** Chrome DevTools > Lighthouse

---

### Otimização de Assets

**Imagens:**
- Formato: WebP (fallback PNG/JPG)
- Compressão: 80-85% quality
- Max width: 1920px (16:9 @ 1080p)
- Lazy loading: Não necessário (slides carregam tudo)

**CSS:**
- Desenvolvimento: `base.css` legível
- Produção: Minificado (futuro)

**JavaScript:**
- Módulos separados (já feito ✅)
- Defer loading (já feito ✅)

---

### Fontes

**Google Fonts atual:**
```html
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Georgia&display=swap">
```

**Otimização futura:**
- Self-host fonts (eliminar request externo)
- Subset apenas caracteres PT-BR
- Font-display: swap

---

## 🌐 COMPATIBILIDADE

### Navegadores Obrigatórios

**Desktop:**
- ✅ Chrome 90+ (engine: Blink)
- ✅ Firefox 88+ (engine: Gecko)
- ✅ Safari 14+ (engine: WebKit)
- ✅ Edge 90+ (engine: Blink)

**Mobile (Opcional para MVP):**
- Safari iOS 14+
- Chrome Android 90+

**Teste:** BrowserStack ou dispositivos reais

---

### Features CSS Modernas

**Safe to use:**
- CSS Grid ✅ (97% support)
- CSS Variables ✅ (95% support)
- Flexbox ✅ (99% support)
- `clamp()` ✅ (94% support)

**Evitar:**
- CSS Container Queries (87% support)
- CSS Cascade Layers (90% support)

---

### Viewport 16:9

**Resolução-alvo:**
- 1920x1080 (Full HD) - primária
- 1366x768 (laptops antigos) - secundária
- 2560x1440 (QHD) - bonus

**Teste:**
```css
/* Já implementado em base.css */
#viewport {
    aspect-ratio: 16 / 9;
    width: min(100vw, calc(100vh * 16 / 9));
    height: min(100vh, calc(100vw * 9 / 16));
}
```

---

## 🎬 TRANSIÇÕES E ANIMAÇÕES

### Política Padrão

**Entre slides:**
- ❌ **SEM transições** (padrão)
- Motivo: Apresentador controla ritmo manualmente

**Exceção permitida:**
- Fade suave (200ms) SE solicitado explicitamente
- Nunca: Slide, zoom, rotate

**Dentro do slide:**
- ❌ Evitar animações automáticas
- ❌ Evitar elementos piscando
- ✅ Hover states suaves (botões)

**Acessibilidade:**
```css
/* Respeitar preferência do usuário */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## 📊 CHECKLIST DE VALIDAÇÃO

Antes de considerar slide "tecnicamente pronto":

### Cores e Visual
- [ ] Todas as cores usam `var(--nome)`
- [ ] Contraste ≥ 4.5:1 (texto normal)
- [ ] Funciona em escala de cinza
- [ ] Testado em daltonismo (Chrome DevTools)

### Performance
- [ ] Imagens otimizadas (< 200KB cada)
- [ ] FCP < 1.5s (Lighthouse)
- [ ] Sem requests desnecessários

### Compatibilidade
- [ ] Testado em Chrome
- [ ] Testado em Firefox
- [ ] Aspect ratio 16:9 mantido
- [ ] Sem CSS experimental

### Código
- [ ] HTML válido (W3C validator)
- [ ] UTF-8 encoding verificado
- [ ] Sem console errors
- [ ] Navegação funciona (setas + botões)

### Estrutura
- [ ] Rodapé com fonte (se houver dados)
- [ ] Typography: Georgia + Lato
- [ ] Grid responsivo (não quebra em 1366x768)

---

## 🛠️ FERRAMENTAS RECOMENDADAS

**Contraste:**
- https://webaim.org/resources/contrastchecker/
- Chrome DevTools > Accessibility

**Daltonismo:**
- Chrome DevTools > Rendering > Emulate vision deficiencies

**Performance:**
- Chrome DevTools > Lighthouse
- PageSpeed Insights

**Validação HTML:**
- https://validator.w3.org/

**Cross-browser:**
- BrowserStack (pago)
- Dispositivos reais (melhor)

---

## ⚠️ ERROS COMUNS A EVITAR

1. **Contraste insuficiente** - `--muted` em backgrounds claros
2. **Animações excessivas** - Distraem e quebram foco
3. **Fontes não carregam** - Verificar Google Fonts ativo
4. **Quebra em Firefox** - Testar CSS Grid/Flexbox
5. **Imagens não otimizadas** - PNG de 2MB+
6. **Cores hardcoded** - #333, #666 (usar var(--))
7. **Aspect ratio quebrado** - Testar em resoluções diferentes

---

## 📈 NÍVEIS DE QUALIDADE

**MVP (mínimo viável):**
- ✅ Paleta correta
- ✅ Contraste WCAG AA
- ✅ Funciona em Chrome/Firefox
- ✅ 16:9 aspect ratio

**Produção (recomendado):**
- ✅ Tudo do MVP
- ✅ Contraste WCAG AAA
- ✅ Testado em Safari/Edge
- ✅ Lighthouse score > 90
- ✅ Daltonismo validado

**Excelência (ideal):**
- ✅ Tudo de Produção
- ✅ Self-hosted fonts
- ✅ ARIA labels completos
- ✅ Mobile otimizado
- ✅ Lighthouse score > 95

---

**Versão:** 1.0  
**Última atualização:** 2026-01-19  
**Responsável:** Claude (chat técnico)
