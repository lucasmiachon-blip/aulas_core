# OVERFLOW FIX - LOG DE TENTATIVAS

**Data:** 2026-01-28
**Problema:** Slides com conteúdo cortado na margem inferior

---

## DIAGNÓSTICO INICIAL

- Slide 20: `clientHeight: 719` vs `scrollHeight: 1028` = **309px cortados**
- `overflow: hidden` no `.slide` corta o excesso
- Função `fitSlideOverflow()` estava **desabilitada** (return vazio na linha 248)

---

## TENTATIVA 1 - scrollHeight (FALHOU)

**Lógica:** Usar `scrollHeight > clientHeight` para detectar overflow

**Resultado:** 
- TODOS os slides mostravam `scrollHeight: 1199` (valor inflado/errado)
- Scale aplicado em slides que não precisavam
- Slides ficaram pequenos com espaço vazio

**Causa:** Algo no CSS infla o scrollHeight artificialmente

---

## TENTATIVA 2 - getBoundingClientRect dos filhos (FALHOU)

**Lógica:** Medir `maxBottom` dos elementos filhos em vez de scrollHeight

**Resultado:**
- Medição real: `maxBottom: 991` (correto)
- MAS slides ocultos (clientH: 0) ainda recebiam scale
- Slides 2, 3, 4, 7, 12, 13, 14, 15 com `clientH: 0` tinham scale aplicado

**Causa:** Função rodava em slides não-visíveis

---

## TENTATIVA 3 - Verificação de visibilidade (ATUAL)

**Lógica:** 
- Só processar se `slideHeight >= 100` (ignora ocultos)
- Só processar se `maxBottom >= 100` (ignora medições inválidas)
- Tolerância 50px
- Scale mínimo 0.70

**Status:** Aguardando teste

---

## PARÂMETROS ATUAIS

| Param | Valor | Motivo |
|-------|-------|--------|
| Tolerância | 50px | Não reduzir slides com overflow pequeno |
| Scale mín | 0.70 | Não reduzir mais que 30% |
| Height mín | 100px | Ignorar slides ocultos |

---

## SLIDES PROBLEMÁTICOS CONHECIDOS

| Slide | ID | Overflow Real | Status |
|-------|-----|---------------|--------|
| 9 | slide-6 | 272px | Precisa scale ~0.73 |
| 20 | slide-17 | 309px | Precisa scale ~0.70 |

---

## PRÓXIMOS PASSOS SE FALHAR

1. **Opção A:** Verificar se slide tem classe `.active` ou `display: block`
2. **Opção B:** Rodar fit apenas no evento de navegação (não no load)
3. **Opção C:** Abandonar auto-fit, ajustar CSS de cada slide manualmente
4. **Opção D:** Mudar arquitetura - usar `overflow: visible` no slide + `overflow: hidden` no container

---

## ARQUIVOS RELEVANTES

- `OSTEOPOROSE/src/js/viewer.js` - função fitSlideOverflow()
- `OSTEOPOROSE/src/css/viewer.css` - .slide { overflow: hidden }
- `OSTEOPOROSE/src/slides/S20_slide-17.html` - slide com mais overflow
