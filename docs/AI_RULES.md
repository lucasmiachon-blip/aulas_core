# AI Rules

## CLAUDE / EXECUTOR HARD RULES (Repo Safety)

- **NO TOKENS IN COMMITS/FILES**: never request/print/store credentials (PAT, cookies, headers, auth URLs) in commits, files, or handoffs. Tokens in private sessions are OK. If auth appears in permanent docs, STOP.
- **NO BRANCHES**: work only on `main`.
- **OSTEOPOROSE LOCK**: do not touch anything under `OSTEOPOROSE/` until user says "UNLOCK OSTEOPOROSE".
- **NO INVENTED DATA**: no invented numbers, thresholds, effects, NNT/NNH, dates, or citations. If missing: **[TBD]**.
- **NO LARGE REFACTOR**: avoid big rewrites. Use small commits, one objective each.
- **CHANGELOG REQUIRED**: every commit updates `docs/CHANGELOG.md`.
- **APPEND-ONLY SLIDES**: when adding "bonus slides", only append at the end; never edit existing slides.
- **ASSET POLICY**: PDFs/figures must go into `assets/` and be registered in `refs/sources.md`.

---

# Regras de IA (obrigatórias)

- **OSTEOPOROSE/ is read-only until explicitly unlocked.**
- **Any changes to OSTEOPOROSE require explicit user permission in the chat.**
- **Não inventar números.**
- **Não inventar citações.**
- Se faltar informação, usar **`[TBD]`**.
- **Não refatorar blocos marcados como `LOCK`.**
- **Não criar branches.** Trabalhar apenas em `main`.
- **Não alterar tokens globais** (CSS `:root`) **sem permissão.**
- **Toda mudança precisa atualizar `docs/CHANGELOG.md`.**
- Sempre salvar **PDFs/figuras** em `assets/` e **registrar em `refs/sources.md`**.
