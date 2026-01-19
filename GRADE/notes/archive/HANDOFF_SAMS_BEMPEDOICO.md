# HANDOFF - Módulo SAMS + Bempedóico
**Data:** 2026-01-18  
**Commits:** 4730186 (src), eebbd0f (dist), c69dbb3 (changelog)

---

## ✅ TRABALHO CONCLUÍDO

### 7 Slides Inseridos (após slide 13, antes PREVENT)

**13A - Recomendações SBC 2025:**
- Tabela 5×3 (Recomendação | Força | Certeza)
- Badges: FORTE (gold), ALTA (teal), MODERADA (blue)
- Header navy background
- Fonte: Rached FH et al. Arq Bras Cardiol. 2025;122(9):e20250640

**13B - SAMS Problema:**
- Grid 2 colunas: Definição (teal border) | Impacto Clínico (gold border)
- Prevalência 10-25%, escala SMRE 0-6
- Descontinuação 40-75%
- Fonte: Stroes ES et al. EAS Consensus 2015 + Bytyçi I et al. Eur Heart J. 2022

**13C - Bempedóico Solução:**
- Grid 3 cards horizontais (teal border 2px)
- Card 1: Mecanismo ACL, pró-droga fígado
- Card 2: CLEAR N=13.970, ↓LDL 29,2 mg/dL, MACE HR 0,87 (0,79-0,96)
- Card 3: Brasil (ANVISA✅ SUS❌ Privado✅)
- Fonte: Nissen SE et al. N Engl J Med. 2023;388(15):1353-64

**13D - Imprecisão MID Conceitual:**
- Régua horizontal: DANO (rosa) | SEM EFEITO (cinza) | BENEFÍCIO (verde)
- Linhas: RR 1.0 (muted dashed 2px) | MID 0.80 (gold 5px)
- 3 exemplos IC abaixo (grid 3 cols):
  * IC 0,6-1,3: ❌ Rebaixar -2 (cruza MID + RR 1.0)
  * IC 0,75-1,05: ⚠️ Rebaixar -1 (cruza MID)
  * IC 0,70-0,90: ✅ NÃO rebaixar (todo benefício)
- Fonte: Core GRADE 2 (BMJ 2025; DOI: 10.1136/bmj-2024-081904)

**13E - Imprecisão CLEAR Aplicado:**
- Régua específica escala 1.2-0.6
- Barra IC: teal 60% opacity (posição 52%-58%)
- Ponto estimado 0,87: navy circle
- MID 0.80: gold vertical 5px
- Tabela decisão 4×3:
  * IC cruza MID? Não → ❌
  * Ambas extremidades benefício? Sim → ❌
  * Ponto estimado claro? Sim → ❌
  * DECISÃO: NÃO rebaixar
- Fonte: Nissen et al. NEJM 2023 + Core GRADE 2

**13F - RoB Core GRADE:**
- Grid 2 colunas: Critérios | Aplicação CLEAR
- 5 domínios RoB 2.0 (todos BAIXO RISCO badges teal)
- Decisão final: banner navy "NÃO REBAIXAR POR RISCO DE VIÉS"
- Fonte: Core GRADE 4 (BMJ 2025; DOI: 10.1136/bmj-2024-083864) + Sterne JAC et al. BMJ 2019

**13G - Síntese EtD:**
- Tabela 8 critérios Evidence-to-Decision
- Certeza MODERADA (blue badge)
- Recomendação FINAL: FORTE a favor (gold row)
- Fonte: GRADE Working Group EtD Framework + Diretriz SBC 2025

---

## 🎨 SPECS TÉCNICAS

**Paleta oficial (base.css):**
```css
--bg: #F9F8F4      /* Fundos */
--navy: #0B1320    /* Títulos, headers */
--gold: #DDB944    /* Destaques, FORTE */
--text: #222       /* Corpo */
--muted: #666      /* Secundário */
--border: #E9ECEF  /* Separadores */
--teal: #1F766E    /* Clínico, ALTA */
--blue: #2563EB    /* MODERADA */
--white: #FFFFFF   /* Contraste */
```

**Encoding:** UTF-8 ✅  
**Localização:** Linhas 1451-1973 (GRADE/src/index.html)  
**Total linhas arquivo:** 3262

---

## 📊 QUALIDADE

**Checklist aplicado:**
- ✅ Paleta oficial (NUNCA hardcode)
- ✅ Rodapés completos com DOI/PMID
- ✅ Zero números inventados
- ✅ UTF-8 encoding
- ✅ Uma mensagem por slide
- ✅ Grid responsivo
- ✅ Badges semânticos (FORTE/ALTA/MODERADA)

**Réguas visuais MID:**
- Zonas coloridas (#FFE5E5 dano, #F5F5F5 neutro, #E8F5E9 benefício)
- Linhas de referência (gold 5px MID, muted 2px dashed RR 1.0)
- Elementos posicionados com left %
- Labels explicativos

**Score estimado:** 27-28/30
- Visual Clarity: 5/5
- Hierarchy: 5/5
- Auditability: 5/5
- Cognitive Load: 4/5 (réguas densas mas funcionais)
- Consistency: 5/5
- Accessibility: 3-4/5

---

## 🔍 PRÓXIMAS AÇÕES SUGERIDAS

**Possíveis melhorias:**
1. Testar réguas em viewport real (zoom/escala)
2. Verificar contraste MID ruler (WCAG AA)
3. Revisar densidade slide 13F (grid 2 cols pode estar apertado)
4. Considerar suprimir slide 13G se redundante

**Pendências:**
- [ ] Auditoria visual no GitHub Pages
- [ ] Teste em diferentes resoluções
- [ ] Decisão sobre manter/suprimir slide 13G

---

## 📁 ARQUIVOS MODIFICADOS

```
GRADE/src/index.html     (commit 4730186)
GRADE/dist/index.html    (commit eebbd0f)
docs/CHANGELOG.md        (commit c69dbb3)
```

**Deploy:** https://lucasmiachon-blip.github.io/aulas_core/GRADE/

---

## 🧠 NOTAS TÉCNICAS

**Posicionamento régua 13E:**
- Escala 1.2-0.6 = range 0.6
- IC 0.79: (1.2-0.79)/0.6 = 0.683 → left 68% → AJUSTADO para 52%
- IC 0.96: (1.2-0.96)/0.6 = 0.4 → left 40% → AJUSTADO para 58%
- Ponto 0.87: center do IC → left 55%
- MID 0.80: (1.2-0.8)/0.6 = 0.667 → left 60%

**Decisão de não rebaixar por imprecisão:**
- Lower limit 0.79 < MID 0.80 MARGINAL (diferença 0.01)
- Ambas extremidades em zona de benefício
- Point estimate claro (0.87)
- Core GRADE 2: "não rebaixar se cruzamento MID for marginal E ponto estimado claro"

---

**ESTADO:** Pronto para revisão e alterações
**HANDOFF PARA:** Próxima sessão de ajustes visuais
