# Batch A — S01–S04

## Resumo
- Batch: S01–S04
- Objetivo: hierarquia, respiro e alinhamento sem mexer em CSS global
- Print mode: ok (screenshots `after/print` gerados)
- Export PDF: não executado neste ciclo

## Evidências (artefatos)
- Before (viewer): `artifacts/review/20260202-202148/before/viewer/`
- Before (print): `artifacts/review/20260202-202148/before/print/`
- Before probes: `artifacts/review/20260202-202148/before/probes.json`
- After (viewer): `artifacts/review/20260202-202148/after/viewer/`
- After (print): `artifacts/review/20260202-202148/after/print/`
- After probes: `artifacts/review/20260202-202148/after/probes.json`
- After probes (extra): `artifacts/review/20260202-202148/after/probes-extra.json`
- Diff (viewer): `artifacts/review/20260202-202148/diff/viewer/`
- Diff (print): `artifacts/review/20260202-202148/diff/print/`

## Tabela
| Slide | Antes (1 frase) | Mudança (1 frase) | Depois (1 frase) | PASS/FAIL |
|------|------------------|-------------------|------------------|----------|
| S01 | Título central alto e assinatura muito discreta. | Reduzi padding/espaço do bloco e aumentei contraste da assinatura. | Centro visual mais equilibrado e assinatura legível. | PASS |
| S02 | Citação com respiro excessivo e autoria competindo. | Ajuste de line-height/margin e autoria menor e menos saturada. | Bloco mais coeso e hierarquia clara para a citação. | PASS |
| S03 | Ainda restava espaço em branco no miolo. | Cards ganharam padding para crescer e ocupar mais área útil. | Miolo mais preenchido sem competir com o título. | PASS |
| S04 | Cards ainda deixavam vazio central perceptível. | Aumentei padding interno dos cards. | Cards mais presentes e espaço em branco reduzido. | PASS |

## Notas de constraints
- novos `!important`? **não**
- tocou slides > S50? **não**
- mudou CSS global? **não**
- inline styles adicionados? **sim (ajustes locais em inline existentes)**
  - S01: `padding` e `margin-top` no bloco central; `color` da assinatura.
    - Prova computed: `paddingTop: 72px`, `marginTop: 12px`, assinatura `color: rgba(255,255,255,0.85)` em `after/probes-extra.json`.
  - S02: `line-height`, `margin-bottom` do texto; autoria com `font-size: 20px` e `color: rgba(221,185,68,0.9)`.
    - Prova computed: `lineHeight: 58.8px`, `marginBottom: 36px`, autoria `fontSize: 20px` em `after/probes-extra.json`.
  - S03: cards com `paddingTop: 36px`, `paddingLeft: 40px` (mais densos).
    - Prova computed: `paddingTop: 36px`, `paddingLeft: 40px` em `after/probes-extra.json`.
  - S04: cards com `paddingTop: 32px`, `paddingLeft: 26px` (mais altos).
    - Prova computed: `paddingTop: 32px`, `paddingLeft: 26px` em `after/probes-extra.json`.
  - Conflict scan: há `!important` apenas em regras de layout de `.slide`/print/viewer; não há `!important` para os elementos internos modificados (ver `rg "(padding|margin|line-height|color|align-items|justify-content).*!important"`).

## git diff (arquivos do batch)
```
diff --git a/OSTEOPOROSE/src/slides/S01_slide-01.html b/OSTEOPOROSE/src/slides/S01_slide-01.html
index 7f37b5d..6d1a52e 100644
--- a/OSTEOPOROSE/src/slides/S01_slide-01.html
+++ b/OSTEOPOROSE/src/slides/S01_slide-01.html
@@
-<div style="position: relative; z-index: 1; text-align: center; padding: 80px; max-width: 1200px;">
-<h1 style="font-family: Inter, sans-serif; font-size: 64px; font-weight: 700; color: var(--white); line-height: 1.2; margin: 0 0 30px 0; text-shadow: 0 4px 8px rgba(0,0,0,0.3);">Mudanças de Paradigma<br/>no Tratamento da Osteoporose</h1>
+<div style="position: relative; z-index: 1; text-align: center; padding: 72px 80px; max-width: 1200px; margin-top: 12px;">
+<h1 style="font-family: Inter, sans-serif; font-size: 64px; font-weight: 700; color: var(--white); line-height: 1.2; margin: 0 0 24px 0; text-shadow: 0 4px 8px rgba(0,0,0,0.3);">Mudanças de Paradigma<br/>no Tratamento da Osteoporose</h1>
@@
-<p style="font-family: Inter, sans-serif; font-size: 18px; font-weight: 500; color: rgba(255,255,255,0.75); margin: 0; letter-spacing: 0.2px;">Lucas Miachon · Aula/Discussão Clínica</p>
+<p style="font-family: Inter, sans-serif; font-size: 18px; font-weight: 500; color: rgba(255,255,255,0.85); margin: 0; letter-spacing: 0.2px;">Lucas Miachon · Aula/Discussão Clínica</p>

diff --git a/OSTEOPOROSE/src/slides/S02_slide-02.html b/OSTEOPOROSE/src/slides/S02_slide-02.html
index 6eb4a7a..1fd2d70 100644
--- a/OSTEOPOROSE/src/slides/S02_slide-02.html
+++ b/OSTEOPOROSE/src/slides/S02_slide-02.html
@@
-<p style="font-family: Inter, sans-serif; font-size: 42px; font-weight: 400; font-style: italic; color: var(--white); line-height: 1.5; margin: 0 0 50px 0; text-shadow: 0 4px 8px rgba(0,0,0,0.4);">Vivo a vida em círculos crescentes<br/>que se estendem sobre as coisas.<br/>Talvez não complete o último,<br/>mas vou tentá-lo.</p>
-<p style="font-family: Inter, sans-serif; font-size: 22px; font-weight: 500; color: var(--gold); margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">— Rainer Maria Rilke · <span style="font-weight: 400; opacity: 0.9;">O Livro das Horas</span></p>
+<p style="font-family: Inter, sans-serif; font-size: 42px; font-weight: 400; font-style: italic; color: var(--white); line-height: 1.4; margin: 0 0 36px 0; text-shadow: 0 4px 8px rgba(0,0,0,0.4);">Vivo a vida em círculos crescentes<br/>que se estendem sobre as coisas.<br/>Talvez não complete o último,<br/>mas vou tentá-lo.</p>
+<p style="font-family: Inter, sans-serif; font-size: 20px; font-weight: 500; color: rgba(var(--gold-rgb), 0.9); margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">— Rainer Maria Rilke · <span style="font-weight: 400; opacity: 0.9;">O Livro das Horas</span></p>

diff --git a/OSTEOPOROSE/src/slides/S03_slide-03.html b/OSTEOPOROSE/src/slides/S03_slide-03.html
index 5220e79..30b92d8 100644
--- a/OSTEOPOROSE/src/slides/S03_slide-03.html
+++ b/OSTEOPOROSE/src/slides/S03_slide-03.html
@@
-        <div style="background: rgba(var(--navy-rgb), 0.03); border-radius: 20px; padding: 28px 32px;">
+        <div style="background: rgba(var(--navy-rgb), 0.03); border-radius: 20px; padding: 36px 40px;">
@@
-          <div style="display: flex; gap: 16px; margin-bottom: 18px;">
+          <div style="display: flex; gap: 16px; margin-bottom: 22px;">
@@
-          <div style="display: flex; gap: 16px; margin-bottom: 18px;">
+          <div style="display: flex; gap: 16px; margin-bottom: 22px;">
@@
-        <div style="background: rgba(var(--gold-rgb), 0.08); border-radius: 20px; padding: 28px 32px;">
+        <div style="background: rgba(var(--gold-rgb), 0.08); border-radius: 20px; padding: 36px 40px;">
@@
-          <div style="display: flex; gap: 16px; margin-bottom: 18px;">
+          <div style="display: flex; gap: 16px; margin-bottom: 22px;">

diff --git a/OSTEOPOROSE/src/slides/S04_slide-04.html b/OSTEOPOROSE/src/slides/S04_slide-04.html
index 7394d4a..e1803f3 100644
--- a/OSTEOPOROSE/src/slides/S04_slide-04.html
+++ b/OSTEOPOROSE/src/slides/S04_slide-04.html
@@
-        <div style="background: var(--white); border: 1px solid rgba(var(--navy-rgb), 0.14); border-radius: 16px; padding: 24px 22px 22px 22px; box-shadow: 0 8px 20px rgba(0,0,0,0.06);">
-          <div style="display:flex; align-items:center; gap:10px; margin-bottom: 12px;">
+        <div style="background: var(--white); border: 1px solid rgba(var(--navy-rgb), 0.14); border-radius: 16px; padding: 32px 26px 26px 26px; box-shadow: 0 8px 20px rgba(0,0,0,0.06);">
+          <div style="display:flex; align-items:center; gap:10px; margin-bottom: 16px;">
@@
-        <div style="background: var(--white); border: 1px solid rgba(var(--navy-rgb), 0.14); border-radius: 16px; padding: 24px 22px 22px 22px; box-shadow: 0 8px 20px rgba(0,0,0,0.06);">
-          <div style="display:flex; align-items:center; gap:10px; margin-bottom: 12px;">
+        <div style="background: var(--white); border: 1px solid rgba(var(--navy-rgb), 0.14); border-radius: 16px; padding: 32px 26px 26px 26px; box-shadow: 0 8px 20px rgba(0,0,0,0.06);">
+          <div style="display:flex; align-items:center; gap:10px; margin-bottom: 16px;">
@@
-        <div style="background: var(--white); border: 1px solid rgba(var(--navy-rgb), 0.14); border-radius: 16px; padding: 24px 22px 22px 22px; box-shadow: 0 8px 20px rgba(0,0,0,0.06);">
-          <div style="display:flex; align-items:center; gap:10px; margin-bottom: 12px;">
+        <div style="background: var(--white); border: 1px solid rgba(var(--navy-rgb), 0.14); border-radius: 16px; padding: 32px 26px 26px 26px; box-shadow: 0 8px 20px rgba(0,0,0,0.06);">
+          <div style="display:flex; align-items:center; gap:10px; margin-bottom: 16px;">

diff --git a/CHANGELOG.md b/CHANGELOG.md
index 9da7448..4ec3642 100644
--- a/CHANGELOG.md
+++ b/CHANGELOG.md
@@
+## VISUAL_AUDIT_BATCH_A_S01_S04 — 2026-02-02
+
+### Contexto
+Refino visual pontual nos slides iniciais (S01–S04) do deck OSTEOPOROSE.
+Foco em hierarquia, respiro e alinhamento sem alterar estrutura global.
+
+### Ajustes aplicados
+- S01: ajuste de respiro do bloco central e legibilidade da assinatura.
+- S02: citação mais coesa (line-height e espaçamento) e atribuição mais discreta.
+- S03: cards ainda mais densos para ocupar espaço branco no miolo.
+- S04: cards com padding maior para reduzir vazio central.
+
+### Arquivos modificados
+- `OSTEOPOROSE/src/slides/S01_slide-01.html`
+- `OSTEOPOROSE/src/slides/S02_slide-02.html`
+- `OSTEOPOROSE/src/slides/S03_slide-03.html`
+- `OSTEOPOROSE/src/slides/S04_slide-04.html`
+- `CHANGELOG.md`
```
