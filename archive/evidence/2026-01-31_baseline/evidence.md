### Contexto
- data: 31/01/2026
- commit: 3265801
- navegador: Chromium (Playwright, headless) | SO: win32 10.0.26200
- viewport (WxH): 1440x900
- total de slides (DOM): 72 (medido com `document.querySelectorAll('.slide').length`)

## B1 — Viewer normal (PASS/FAIL)
- 1 slide ativo por vez? PASS evidência: activeCount=1, hiddenCount=71
- scroll global vertical? PASS | scrollY=0 (scrollH=900, clientH=900)
- scroll global horizontal? PASS | scrollW=1440 clientW=1440
- layout shift ao navegar? não medido

### Probes (viewer)
- Probe overflow (8.1): [{"type":"log","args":[{"vw":1440,"scrollW":1440}]},{"type":"log","args":["no overflow culprits found"]}]
- Probe stacking (8.2): [{"type":"log","args":[{"tops":[46,0,0,0,0,0,0,0,0,0],"lefts":[73,0,0,0,0,0,0,0,0,0],"scrollW":1440,"vw":1440}]}]
- Amostra 20 slides (8.3): [{"type":"table","args":[[{"i":3,"w":0,"left":0,"right":0,"vw":1440,"fitsWidth":true},{"i":4,"w":0,"left":0,"right":0,"vw":1440,"fitsWidth":true},{"i":10,"w":0,"left":0,"right":0,"vw":1440,"fitsWidth":true},{"i":12,"w":0,"left":0,"right":0,"vw":1440,"fitsWidth":true},{"i":16,"w":0,"left":0,"right":0,"vw":1440,"fitsWidth":true},{"i":25,"w":0,"left":0,"right":0,"vw":1440,"fitsWidth":true},{"i":27,"w":0,"left":0,"right":0,"vw":1440,"fitsWidth":true},{"i":32,"w":0,"left":0,"right":0,"vw":1440,"fitsWidth":true},{"i":33,"w":0,"left":0,"right":0,"vw":1440,"fitsWidth":true},{"i":36,"w":0,"left":0,"right":0,"vw":1440,"fitsWidth":true},{"i":37,"w":0,"left":0,"right":0,"vw":1440,"fitsWidth":true},{"i":43,"w":0,"left":0,"right":0,"vw":1440,"fitsWidth":true},{"i":45,"w":0,"left":0,"right":0,"vw":1440,"fitsWidth":true},{"i":48,"w":0,"left":0,"right":0,"vw":1440,"fitsWidth":true},{"i":49,"w":0,"left":0,"right":0,"vw":1440,"fitsWidth":true},{"i":56,"w":0,"left":0,"right":0,"vw":1440,"fitsWidth":true},{"i":57,"w":0,"left":0,"right":0,"vw":1440,"fitsWidth":true},{"i":61,"w":0,"left":0,"right":0,"vw":1440,"fitsWidth":true},{"i":63,"w":0,"left":0,"right":0,"vw":1440,"fitsWidth":true},{"i":69,"w":0,"left":0,"right":0,"vw":1440,"fitsWidth":true}]]}]

## B2 — Print preview (?print=1 em tela) (PASS/FAIL)
- scroll horizontal? PASS scrollW=1440 innerW=1440
- scroll vertical permitido? PASS (scrollH=40545, body overflow-y=auto)

### Probes (print=1)
- Probe overflow (8.1): [{"type":"log","args":[{"vw":1440,"scrollW":1440}]},{"type":"log","args":["no overflow culprits found"]}]
- Probe stacking (8.2): [{"type":"log","args":[{"tops":[1,305,691,1115,1765,2165,2533,3120,3568,4059],"lefts":[12,12,12,12,12,12,12,12,12,12],"scrollW":1440,"vw":1440}]}]
- Amostra 20 slides (8.3): [{"type":"table","args":[[{"i":5,"w":1416,"left":12,"right":1428,"vw":1440,"fitsWidth":true},{"i":16,"w":1416,"left":12,"right":1428,"vw":1440,"fitsWidth":true},{"i":17,"w":1416,"left":12,"right":1428,"vw":1440,"fitsWidth":true},{"i":19,"w":1416,"left":12,"right":1428,"vw":1440,"fitsWidth":true},{"i":23,"w":1416,"left":12,"right":1428,"vw":1440,"fitsWidth":true},{"i":25,"w":1416,"left":12,"right":1428,"vw":1440,"fitsWidth":true},{"i":26,"w":1416,"left":12,"right":1428,"vw":1440,"fitsWidth":true},{"i":30,"w":1416,"left":12,"right":1428,"vw":1440,"fitsWidth":true},{"i":32,"w":1416,"left":12,"right":1428,"vw":1440,"fitsWidth":true},{"i":37,"w":1416,"left":12,"right":1428,"vw":1440,"fitsWidth":true},{"i":39,"w":1416,"left":12,"right":1428,"vw":1440,"fitsWidth":true},{"i":45,"w":1416,"left":12,"right":1428,"vw":1440,"fitsWidth":true},{"i":46,"w":1416,"left":12,"right":1428,"vw":1440,"fitsWidth":true},{"i":47,"w":1416,"left":12,"right":1428,"vw":1440,"fitsWidth":true},{"i":49,"w":1416,"left":12,"right":1428,"vw":1440,"fitsWidth":true},{"i":52,"w":1416,"left":12,"right":1428,"vw":1440,"fitsWidth":true},{"i":54,"w":1416,"left":12,"right":1428,"vw":1440,"fitsWidth":true},{"i":60,"w":1416,"left":12,"right":1428,"vw":1440,"fitsWidth":true},{"i":61,"w":1416,"left":12,"right":1428,"vw":1440,"fitsWidth":true},{"i":69,"w":1416,"left":12,"right":1428,"vw":1440,"fitsWidth":true}]]}]

## B3 — Export PDF (PASS/FAIL)
- script/comando: `node scripts/export-osteoporose-pdf.js`
- PDF gerado: `exports/OSTEOPOROSE-slides.pdf`
- slideCount=0 (medido pelo próprio script: "✅ 0 slides no DOM")
- pageCount=1 (PyPDF2)
- páginas == slides? FAIL
- margens indesejadas? não verificado
- transform no palco em print/export? PASS
  - computed style (transform): none
  - winner (seletor @ arquivo:linha): `html.is-print .stage, html.is-print .stage__inner, html.is-print .deck, html.is-print .slides` @ `css/print.css:86`

## Matriz de conflitos (winners)
> Para cada modo, trazer o seletor vencedor + arquivo:linha (DevTools).

### Viewer normal
- html/body: overflow-x=hidden, overflow-y=hidden (winner: `html, body` @ `css/viewer.css:44`); height=100% (winner: `html, body` @ `css/viewer.css:44`); margin/padding=0 (winner: `html, body` @ `css/base.css:54`)
- .viewer: display=flex (winner: `.viewer` @ `css/viewer.css:24`); height=100dvh (winner: `.viewer` @ `css/viewer.css:24`)
- .stage__inner: display=flex (winner: `.stage__inner` @ `css/viewer.css:227`); overflow-x/y=hidden (winner: `.stage__inner` @ `css/viewer.css:227`); transform=scale(var(--scale, 1)) → computed matrix(0.9,0,0,0.9,0,0) (winner: `.stage__inner` @ `css/viewer.css:227`); width/height=calc(var(--stage-w/h) * 1px) (winner: `.stage__inner` @ `css/viewer.css:227`); margin=auto 0 (winner: `.stage > *` @ `css/viewer.css:212`)
- .deck: display=flex (winner: `.deck` @ `css/base.css:77`); overflow-x/y=hidden (winner: `.deck--fixed` @ `css/viewer.css:241`); width/height=calc(var(--stage-w/h) * 1px) (winner: `.deck--fixed` @ `css/viewer.css:241`); margin=0 auto (winner: `.deck` @ `css/base.css:77`)
- container slides ([data-slides]): display=flex, position=relative, overflow-x/y=hidden (winner: `.slides` @ `css/viewer.css:250`); width/height=100% (winner: `.slides` @ `css/viewer.css:250`)
- .slide: display=flex (winner: `.slide.is-active` @ `css/viewer.css:273`); position=relative, overflow-x/y=hidden, width/height=100% (winner: `.slide` @ `css/viewer.css:262`); margin=0 (winner: `.slide` @ `css/viewer.css:262`); padding=32px 48px (winner: `.slide` @ `css/base.css:115`)

### Print=1 (em tela)
- html/body: overflow-x=hidden (winner: `html, body` @ `css/viewer.css:44`); overflow-y=auto (winner: `html.is-print, html.is-print body` @ `css/print.css:78`); height=auto (winner: `html.is-print, html.is-print body` @ `css/print.css:78`); margin/padding=0 (winner: `html, body` @ `css/base.css:54`)
- .stage__inner: display=block (winner: `html.is-print .slides, html.is-print [data-slides], html.is-print .deck, html.is-print .stage__inner` @ `css/print.css:284`); position=static, overflow=visible, transform=none, width/height=auto (winner: `html.is-print .stage, html.is-print .stage__inner, html.is-print .deck, html.is-print .slides` @ `css/print.css:86`)
- .deck: display=block (winner: `html.is-print .slides, html.is-print [data-slides], html.is-print .deck, html.is-print .stage__inner` @ `css/print.css:284`); position=static, overflow=visible, transform=none, width/height=auto (winner: `html.is-print .stage, html.is-print .stage__inner, html.is-print .deck, html.is-print .slides` @ `css/print.css:86`)
- container slides: display=block (winner: `html.is-print .slides, html.is-print [data-slides]` @ `css/print.css:100`); position=static, overflow=visible, transform=none (winner: `html.is-print .stage, html.is-print .stage__inner, html.is-print .deck, html.is-print .slides` @ `css/print.css:86`); width=1600px, margin=0 auto (winner: `html.is-print .slides, html.is-print [data-slides]` @ `css/print.css:265`)
- .slide: display=block, position=relative (winner: `html.is-print .slide` @ `css/print.css:107`); overflow=hidden (winner: `.slide` @ `css/viewer.css:262`); transform=none (winner: `html.is-print .slide` @ `css/print.css:289`); width/height=100% (winner: `.slide` @ `css/viewer.css:262`); padding=32px 48px (winner: `.slide` @ `css/base.css:115`)

### @media print / export (se existir)
- html/body: overflow-x=hidden, overflow=hidden (winner: `html, body` @ `css/print.css:139`); overflow-y=auto (winner: `html.is-print, html.is-print body` @ `css/print.css:78`); height=auto (winner: `html.is-print, html.is-print body` @ `css/print.css:78`); margin/padding=0 (winner: `html, body` @ `css/print.css:139`)
- .stage__inner: display=block (winner: `.stage__inner` @ `css/print.css:169`); position=static, overflow=visible, transform=none, width/height=auto (winner: `html.is-print .stage, html.is-print .stage__inner, html.is-print .deck, html.is-print .slides` @ `css/print.css:86`)
- .deck: display=block (winner: `html.is-print .deck` @ `css/print.css:94`); position=static, overflow=visible, transform=none, width/height=auto (winner: `html.is-print .stage, html.is-print .stage__inner, html.is-print .deck, html.is-print .slides` @ `css/print.css:86`)
- container slides: display=block, overflow=visible (winner: `html.is-print .slides, html.is-print [data-slides]` @ `css/print.css:100`); width/height=auto (winner: `html.is-print .stage, html.is-print .stage__inner, html.is-print .deck, html.is-print .slides` @ `css/print.css:86`)
- .slide: display=block, position=relative (winner: `html.is-print .slide` @ `css/print.css:107`); overflow=hidden (winner: `.slide` @ `css/print.css:196`); width=16.667in, height=9.375in (winner: `.slide` @ `css/print.css:196`); margin=0 (winner: `.slide` @ `css/print.css:196`); padding=0 (winner: `.slide:first-child` @ `css/print.css:221`)

## Screenshots & artefatos (baseline)
> Salve arquivos em `evidence/2026-01-31_baseline/assets/` e liste aqui.

- viewer_slide01.png — não capturado
- print_top.png — não capturado
- print_overflow.png — não capturado
- pdf_p1.png — não capturado
- pdf_p_mid.png — não capturado
- pdf_last.png — não capturado
- export.pdf — não capturado (PDF gerado em `exports/OSTEOPOROSE-slides.pdf`)

## Top 3 problemas reais (impacto + evidência)
1) Export PDF com 0 slides no DOM → PDF 1 página — impacta B3 — evidência: output do script (slideCount=0) + pageCount=1
2) @media print com overflow horizontal (print_media) — impacta B3 — evidência: probe overflow (slide-1 right=1600.03125 > vw=1440) + sample20 com fitsWidth=false
3) Print preview usa width=1600px para container (print.css:265) com viewport 1440px — impacto potencial B2/B3 — evidência: computed width=1600px e scrollH alto (40545px)

## Plano mínimo (sem patch ainda)
- P0: alinhar o servidor local com o caminho esperado pelo export (`/OSTEOPOROSE/src/print.html`) ou ajustar URLs do export para o root atual (`/print.html`) e validar `slides` > 0 no DOM.
- P1: revisar regras de largura no modo print (`print.css` 1600px/16.667in) e alinhar com viewport/zoom do print preview para evitar overflow horizontal.
- Conteúdo que “não cabe” (sem milagre): não avaliado (sem screenshots).

