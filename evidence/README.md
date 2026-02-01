# Evidence Pack — Template (Slides Osteoporose)

Este pacote serve para **coletar evidência** antes de qualquer patch.
Regra: **métrica primeiro**, screenshot como apoio.

## Como usar (Rodada 0 — Baseline)
1) No repo do projeto, copie a pasta `evidence/` para a raiz do repo (ou mantenha fora e aponte caminhos).
2) Rode o viewer local e colete:
   - Viewer normal
   - Print preview: `?print=1`
   - Export PDF (pipeline do repo)
3) Cole os outputs no arquivo:
   - `evidence/2026-01-31_baseline/evidence.md`
4) Salve screenshots e o PDF gerado em:
   - `evidence/2026-01-31_baseline/assets/`

## O que é obrigatório no Evidence Pack
- B1/B2/B3 com PASS/FAIL e métricas
- Probes (outputs do console)
- Winners de CSS (arquivo:linha) para elementos estruturais
- PDF com contagem de páginas (pageCount) e contagem de slides (slideCount)
- 3–8 screenshots relevantes (não virar álbum)

## Dica rápida (Chrome/Edge)
DevTools → Ctrl+Shift+P:
- "Capture full size screenshot"
- "Capture node screenshot"

## Pastas
- `probes/`: snippets prontos para console
- `assets/`: coloque PNGs e o PDF aqui

