# Auditoria — Slides 01–36 (MVP)

## Como eu revisei

- Base: **GRADE-slides.pdf** renderizado em **220 dpi** (slides 01–36) + **440 dpi** para os slides mais densos.
- Critério: legibilidade em 5–8s, 1 ideia por slide, coerência GRADE (certeza ≠ força), tom adulto.
- Prints: `audit/pdf_screens/220dpi/` e `audit/pdf_screens/440dpi_focus/`.

**Importante:** as imagens refletem o PDF recebido. As correções foram feitas nos arquivos HTML/CSS; para ter “antes/depois” em imagem, é necessário reexportar o PDF a partir do viewer.

## Resumo executivo (problemas “carregadores”)

1) **Tipografia pequena em projetor**: especialmente rodapés/chips e blocos densos.
2) **Bempedóico/SAMS**: redundância (EtD reaparece com o mesmo papel) + “texto de fala” misturado ao slide.
3) **CAC=0**: janela estava aparecendo como regra fixa; precisa ser **função do risco basal**.

> Nota: as correções aplicadas estão descritas no `CHANGELOG.md` (2026-02-04 — P2).

---

## Slide a slide (01–36)

### 01 — S01 (Capa)
- Print: `audit/pdf_screens/220dpi/slide-01.png`
- Status: PASS
- Observação: capa simples; sem risco de carga cognitiva.

### 02 — S02 — “A zona cinzenta é a regra.”
- Print: `audit/pdf_screens/220dpi/slide-02.png`
- Status: PASS
- Observação: boa abertura (andragogia: o problema vem antes do método).

### 03 — S03 — “CAC para decidir sob incerteza: a lente GRADE”
- Print: `audit/pdf_screens/220dpi/slide-03.png`
- Status: PASS
- Observação: ancoragem forte; mantém CAC como caso‑âncora.

### 04 — S04 — “Calibragem rápida: como você decide?”
- Print: `audit/pdf_screens/220dpi/slide-04.png`
- Status: PASS
- Observação: interação curta e adulta (sem quiz). Boa.

### 05 — S05 — “O grande divisor: certeza ≠ força”
- Print: `audit/pdf_screens/220dpi/slide-05.png`
- Status: PASS
- Observação: slide‑âncora conceitual; mantém a separação (domínios vs EtD).

### 06 — S06 — “O motor do GRADE”
- Print: `audit/pdf_screens/220dpi/slide-06.png`
- Status: PASS
- Observação: mapa de método; sem excesso.

### 07 — S60 — “Como eu uso CAC no plantão: predição ≠ prescrição”
- Print: `audit/pdf_screens/220dpi/slide-07.png`
- Status: PASS
- Observação: fechamento do bloco CAC está limpo e coerente.

### 08 — S09 — “Aplicação GRADE: Escore de Cálcio Coronariano (CAC)”
- Print: `audit/pdf_screens/220dpi/slide-08.png`
- Status: PASS
- Observação: ipsis litteris + leitura GRADE bem separadas.

### 09 — S36 — “SBC 2025: CAC reclassifica risco → meta LDL‑c”
- Print: `audit/pdf_screens/220dpi/slide-09.png`
- Status: PASS
- Observação: bom “pivô” CAC → metas.

### 10 — S10 — “CAC=0: por quanto tempo rebaixa risco?”
- Prints: `audit/pdf_screens/220dpi/slide-10.png` + `audit/pdf_screens/440dpi_focus/slide-10.png`
- Status: PASS (após ajuste)
- Correção aplicada: janela agora aparece como **função do risco basal** (faixas como referência; não regra fixa).

### 11 — S07 — “Indireção: a evidência serve para este paciente?”
- Print: `audit/pdf_screens/220dpi/slide-11.png`
- Status: PASS
- Observação: domínio bem definido; prepara o bloco bempedóico.

### 12 — S08 — “Dose–resposta…”
- Print: `audit/pdf_screens/220dpi/slide-12.png`
- Status: PASS
- Observação: mantém a “gramática” do upgrade.

### 13 — S11 — “CAC muda o benefício absoluto da estatina”
- Print: `audit/pdf_screens/220dpi/slide-13.png`
- Status: PASS
- Observação: bom ensino de absoluto (NNT) com CAC como modulador.

### 14 — S13 — “AAS na prevenção primária: NNT vs NNH…”
- Print: `audit/pdf_screens/220dpi/slide-14.png`
- Status: PASS
- Observação: útil como contraste (benefício vs dano depende de risco basal).

### 15 — S61 — “Ácido bempedóico: de LDL para MACE”
- Print: `audit/pdf_screens/220dpi/slide-15.png` + `audit/pdf_screens/440dpi_focus/slide-15.png`
- Status: PASS
- Observação: introdução correta (exemplo → GRADE). Sem desviar para fármaco.

### 16 — S14 — Diretriz (ipsis litteris)
- Print: `audit/pdf_screens/220dpi/slide-16.png` + `audit/pdf_screens/440dpi_focus/slide-16.png`
- Status: PASS
- Observação: mantém a diretriz como protagonista; chips ajudam leitura.

### 17 — S43 — SAMS (pano de fundo)
- Prints: `audit/pdf_screens/220dpi/slide-17.png` + `audit/pdf_screens/440dpi_focus/slide-17.png`
- Status: PASS (após corte)
- Correção aplicada: removido texto de “fala” e números desnecessários; ficou só o mínimo para proteger o PICO.

### 18 — S46 — Checklist SAMS (30s)
- Prints: `audit/pdf_screens/220dpi/slide-18.png` + `audit/pdf_screens/440dpi_focus/slide-18.png`
- Status: PASS
- Observação: útil e contido; não vira protagonista.

### 19 — S44 — CLEAR Outcomes (efeito)
- Prints: `audit/pdf_screens/220dpi/slide-19.png` + `audit/pdf_screens/440dpi_focus/slide-19.png`
- Status: PASS
- Observação: bom contraste relativo vs absoluto.

### 20 — S45 — EtD do bempedóico
- Prints: `audit/pdf_screens/220dpi/slide-20.png` + `audit/pdf_screens/440dpi_focus/slide-20.png`
- Status: PASS
- Observação: EtD aparece em um slide com papel claro.

### 21 — S47 — Limites (indireção/imprecisão/subgrupos)
- Print: `audit/pdf_screens/220dpi/slide-21.png`
- Status: PASS (após corte)
- Correção aplicada: removido “objetivo do slide” e card‑script; síntese curta.

### 22 — S17 — MID (conceito)
- Print: `audit/pdf_screens/220dpi/slide-22.png`
- Status: PASS
- Observação: visual é bom; atenção só para não alongar fala.

### 23 — S18 — Imprecisão aplicada ao CLEAR
- Prints: `audit/pdf_screens/220dpi/slide-23.png` + `audit/pdf_screens/440dpi_focus/slide-23.png`
- Status: PASS (após simplificação)
- Correção aplicada: removida tabela longa; ficou régua + decisão “IC toca MID → −1”.

### 24 — S19 — RoB2
- Print: `audit/pdf_screens/220dpi/slide-24.png`
- Status: OK
- Observação: risco de virar detalhe; se faltar tempo, é candidato a pular.

### 25 — S20 — Síntese (domínios → certeza; EtD → força)
- Print: `audit/pdf_screens/220dpi/slide-25.png`
- Status: PASS (após reescrita)
- Correção aplicada: tirada repetição de EtD; entrou “regra de plantão” em uma linha.

### 26 — S48 — Mapa de alternativas
- Print: `audit/pdf_screens/220dpi/slide-26.png`
- Status: PASS (após redesign)
- Correção aplicada: trocado quadro denso por 3 cards (1 número + 1 trade‑off).

### 27 — S49 — Fechamento clínico do bloco
- Print: `audit/pdf_screens/220dpi/slide-27.png`
- Status: PASS (após redesign)
- Correção aplicada: removida contabilidade de domínios no fechamento; ficou regra + escada.

### 28 — S50 — Início do bloco Metas
- Print: `audit/pdf_screens/220dpi/slide-28.png`
- Status: PASS

### 29 — S51 — Metas por categoria (tabela)
- Print: `audit/pdf_screens/220dpi/slide-29.png`
- Status: PASS
- Observação: conferir legibilidade em 1280×720 (tabela sempre é o ponto de risco).

### 30 — S52 — “Da categoria de risco à decisão”
- Print: `audit/pdf_screens/220dpi/slide-30.png`
- Status: PASS

### 31 — S53 — Base de evidência (dose–resposta + trials)
- Print: `audit/pdf_screens/220dpi/slide-31.png` + `audit/pdf_screens/440dpi_focus/slide-31.png`
- Status: PASS
- Correção aplicada: exemplo VESALIUS‑CV rotulado como publicado (Epub 2025; impresso 2026) e referenciado.

### 32 — S54 — Inconsistência
- Print: `audit/pdf_screens/220dpi/slide-32.png`
- Status: PASS

### 33 — S55 — Viés de publicação
- Print: `audit/pdf_screens/220dpi/slide-33.png`
- Status: PASS

### 34 — S56 — Divergência entre diretrizes
- Print: `audit/pdf_screens/220dpi/slide-34.png`
- Status: PASS

### 35 — S57 — Take-home (meta = decisão)
- Print: `audit/pdf_screens/220dpi/slide-35.png`
- Status: PASS

### 36 — S59 (Camões)
- Print: `audit/pdf_screens/220dpi/slide-36.png`
- Status: PASS
