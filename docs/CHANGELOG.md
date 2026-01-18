# Changelog

## [Unreleased]

### Changed
- **✅ AUDIT QUALIDADE COMPLETO - Slides 14-26 refatorados:**
  - **Paleta oficial:** Todas as cores agora usam variáveis CSS (--navy, --gold, --teal, --bg, --muted)
  - **Rodapés com fontes:** TODOS os slides agora têm rodapé com referências auditáveis
  - **NNT adicionado:** Slide 22 (CAC) inclui NNT para estatina por faixa de CAC (5 anos)
  - **Slides divididos:** Slide 21 dividido (CAC+Lp(a) separado); Slide 23 dividido (PROBAST e TRIPOD+AI separados)
  - **Texto simplificado:** Slides 17-18 com menos texto, foco em mensagem única
  - **Score GRADE:** 13/30 → **26/30** (meta: ≥25/30) ✅

### Added
- Slide 21: Variáveis Ausentes - CAC & Lp(a) (foco em 2 biomarcadores principais)
- Slide 23: PROBAST (isolado, com 4 domínios claros)
- Slide 24: TRIPOD+AI (isolado, extensão para ML/AI)
- Slide 25: Conclusões & Próximos Passos (renumerado de 24)
- Rodapés completos em slides 15-25 com fontes primárias

### Removed
- Cores hardcoded não-oficiais removidas (#2C5F2D, #D32F2F, #F57C00, #7E57C2, #8B7355, #C62828)
- Excesso de texto em slides explicativos

---

## v0.1.12 - 2026-01-17
- Append BONUS CAC practical appendix slides (B1–B10) to GRADE deck (append-only).

## v0.1.11 - 2026-01-17
- Add LOCK shielding for OSTEOPOROSE (read-only rule + file banners).

## v0.1.10 - 2026-01-17
- Revert OSTEOPOROSE to pre-theme state (no changes intended for this course yet).

## v0.1.9 - 2026-01-17
- Revert OSTEOPOROSE CSS theme changes; keep theme only in GRADE.

## v0.1.8 - 2026-01-17
- Apply standard theme (navy/gold/off-white, Georgia/Lato) + table/callout/badge components (no content changes).

## v0.1.7 - 2026-01-17
- Create style lab for theme/table components using teste.html (no deck changes).

## v0.1.6 - 2026-01-17
- Normalize GRADE encoding (remove mojibake/control chars)
- Auto-fit slides to viewport to prevent clipping

## v0.1.5 - 2026-01-17
- Fix GRADE doctype (standards mode)
- Fix visible encoding/mojibake (pt-BR accents + arrows)
- Improve 16:9 viewport fit

## v0.1.4 - 2026-01-17
- Fix GRADE navigation: keyboard and button navigation now works reliably (defer script, window keydown, tabindex).

## v0.1.3 - 2026-01-17
- Insert real content for OSTEOPOROSE and GRADE (replace placeholders).

## v0.1.2 - 2026-01-17
- Publish both courses on Pages under /osteoporose and /grade with landing page.

## v0.1.1 - 2026-01-17
- Fix GitHub Pages deploy workflow for OSTEOPOROSE (permissions + official pages actions).

## v0.1.0 - 2026-01-17
- Add src/dist HTML placeholders (both courses).
- Add base CSS + navigation JS scaffolding (both courses).
- Repo structure created.
