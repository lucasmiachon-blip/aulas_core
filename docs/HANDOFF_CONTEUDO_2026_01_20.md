# 📚 HANDOFF - Claude de Conteúdo: Status Atual dos Slides (2026-01-20)

**Data:** 2026-01-20  
**Tipo:** Status de conteúdo médico e próximas ações  
**Para:** Claude de Conteúdo / ChatGPT Auditor  
**Status:** 📋 Aguardando correções de conteúdo

---

## 🎯 SEU PAPEL

Você é **Claude de Conteúdo** (ou **ChatGPT Auditor**). Sua responsabilidade é:

**✅ POSSO fazer:**
- ✅ Conteúdo médico (GRADE, evidências, guidelines)
- ✅ Andragogia (educação de adultos)
- ✅ Design educacional (ink ratio, cognitive load)
- ✅ Estrutura de aula (timing, blocos, pausas)
- ✅ Casos clínicos, exercícios
- ✅ **Preencher [TBD]** com conteúdo real
- ✅ Corrigir inconsistências metodológicas
- ✅ Validar fontes e citações
- ✅ **USAR paleta oficial** (`var(--navy)`, `var(--gold)`, etc)

**❌ NÃO faço:**
- ❌ Mexer em código HTML/CSS/JS diretamente (Claude Técnico faz)
- ❌ Fazer commits no Git (Claude Técnico faz)
- ❌ Decisões técnicas (performance, encoding)

**📖 Protocolo de Entrada:**
1. `README.md` ← Visão geral
2. `docs/ESSENTIAL/PROMPT_PALETA_OFICIAL.md` ← **PALETA OFICIAL** (você DEVE usar!)
3. `docs/ESSENTIAL/QUALITY.md` ← EBM, educação de adultos
4. `docs/ESSENTIAL/STYLEGUIDE.md` ← Design visual, hierarquia
5. `GRADE/refs/sources.md` ← Fontes bibliográficas

---

## 📊 STATUS ATUAL DO CONTEÚDO

### Números

- **Total de slides:** 45 (S01-S46, sem S21 que foi deletado como duplicata)
- **Slides criados recentemente:** S43-S46 (SAMS + Ácido Bempedóico)
- **Slides com problemas de conteúdo identificados:** ~5-10 slides (veja abaixo)

### Estrutura da Apresentação

**Thread 1: Fundamentos GRADE (S01-S11)**
- S01: Capa
- S02-S11: Core GRADE (8 domínios, PICO, etc)

**Thread 2: Aplicação CAC + PREVENT (S12-S34)**
- S12-S13: CAC (Contexto, recomendações)
- S14-S20: PREVENT (validação, limitações, aplicação)
- S21: ~~DELETADO~~ (duplicata de S14)
- S22-S34: CAC prático (NNT, warranty, etc)

**Thread 3: SAMS + Ácido Bempedóico (S35-S46)** ⭐ **NOVO**
- S35-S42: Apêndice CAC (slides práticos)
- **S43:** Contexto clínico SAMS (⭐ NOVO - 2026-01-20)
- **S44:** CLEAR Outcomes + Risk/Publication Bias (⭐ NOVO - 2026-01-20)
- **S45:** Tensão metodológica (ASCII box + Indirectness) (⭐ NOVO - 2026-01-20)
- **S46:** GRADE final + contexto Brasil (⭐ NOVO - 2026-01-20)

---

## ✅ O QUE FOI FEITO RECENTEMENTE (Commits)

### Slides S43-S46 Adicionados (2026-01-20)

**Commits:**
- `4bac1f6` - feat(SAMS): adiciona S43 - contexto clínico SAMS
- `3ffac38` - feat(SAMS): adiciona S44 - CLEAR Outcomes + Risk/Publication Bias
- `7b8f896` - feat(SAMS): adiciona S45 - tensão metodológica (ASCII box + Indirectness)
- `989020a` - feat(SAMS): adiciona S46 - GRADE final + contexto Brasil
- `515b3e9` - feat: adiciona slides S43-S46 ao carregador - atualiza de 41 para 45 slides

**Conteúdo dos novos slides:**

**S43 - Contexto Clínico SAMS:**
- Definição operacional de SAMS
- Prevalência 10-25%
- Escala SMRE (Statin Muscle Related Events)
- Impacto clínico (descontinuação de estatina)
- Conexão com risco cardiovascular

**S44 - CLEAR Outcomes + Bias:**
- Desenho do estudo CLEAR Outcomes (RCT, N=13.970)
- Risk of Bias (RoB 2.0) aplicado
- Publication Bias (funnel plot)
- Resultados MACE-4 HR 0.87 (IC 95% 0.79-0.96)
- Downgrade por imprecisão (IC cruza MID 0.8)

**S45 - Tensão Metodológica:**
- ASCII box mostrando duas recomendações SBC 2025
- Rec 1: Não atingiu meta → PCSK9i OU bempedóico (FORTE/ALTA)
- Rec 2: Intolerante → bempedóico (FORTE/ALTA)
- **Tensão:** CLEAR testou INTOLERANTES, mas Rec 1 aplica para TODOS
- Domínio Indirectness discutido
- Contexto brasileiro (ANVISA ✅, SUS ❌)

**S46 - Síntese GRADE + Contexto Brasil:**
- Tabela completa de certeza da evidência
- Baseline RCT ⊕⊕⊕⊕ ALTA
- Downgrade: (-1) imprecisão → ⊕⊕⊕⊝ MODERADA
- Análise EtD (Evidence-to-Decision)
- Por que FORTE apesar de MODERADA?
- Contexto Brasil: ANVISA, SUS, acesso

### Correção Metodológica S18 (2026-01-20)

**Commit:** `4639194c` (ou `a001cb0` - ver nota)

**Problema corrigido:**
- Slide S18 tinha erro metodológico grave
- Afirmava que IC 95% 0.79-0.96 NÃO cruza MID 0.8 (❌ INCORRETO!)
- Metodologia GRADE exige rebaixar quando IC cruza threshold

**Correção aplicada:**
- ✅ Tabela corrigida: "IC cruza MID? **SIM** (marginalmente: 0,79 < 0,8 < 0,96)"
- ✅ Decisão atualizada: "REBAIXAR 1 NÍVEL por imprecisão"
- ✅ Justificativa GRADE: Core GRADE 2 (BMJ 2025; DOI: 10.1136/bmj-2024-081904)
- ✅ Badge visual: verde → amarelo/warning
- ✅ Citação metodológica adicionada

**Impacto:**
- Certeza da evidência CLEAR Outcomes permanece **MODERADA** (correto)
- Interpretação GRADE agora metodologicamente correta
- Alinhamento com Core GRADE BMJ 2025

### Correções de Paleta (2026-01-20)

**Commits:** 10 commits individuais (um por slide S35-S44)

**Problema:** Cores hardcoded (#222, #FFFBF0, etc) violavam paleta oficial

**Correção:** Substituídas por variáveis CSS (`var(--text)`, `var(--white)`, etc)

**⚠️ IMPORTANTE:** Estas foram correções TÉCNICAS (Claude Técnico). Conteúdo médico NÃO foi alterado.

---

## 🔴 PROBLEMAS DE CONTEÚDO IDENTIFICADOS (P0 - URGENTE)

### 1. Placeholders [TBD] e Figuras Precisam Ser Preenchidos

**🔴 ENCONTRADOS - Precisam ser corrigidos:**

**S38.html - Linha ~12:**
```html
[TBD: efeito absoluto]
```
- **Contexto:** Slide sobre CAC staging
- **Localização:** Após menção a follow-up longo, menos IAM não fatal
- **Ação:** Preencher com valor numérico do efeito absoluto OU remover menção

**S41.html - Linha ~12:**
```html
Exceções [TBD conforme sua política local]
```
- **Contexto:** Slide sobre exceções/prática
- **Ação:** Preencher com exemplos concretos OU reescrever de forma neutra

**S17.html - Linha ~71:**
```html
TODO na zona de benefício
```
- **Contexto:** Slide sobre análise GRADE
- **Ação:** Completar texto ou remover "TODO"

**Outros encontrados (mas podem ser texto normal):**
- S40: "efeito absoluto" mencionado mas sem [TBD] explícito (verificar se precisa de valor)
- Vários slides usam "todo" (palavra normal, não TODO de tarefa)

**⚠️ Status:** **3 placeholders confirmados precisando correção**

---

## 🖼️ **INSTRUÇÕES CRÍTICAS SOBRE FIGURAS E PLACEHOLDERS VISUAIS**

### ⚠️ **REGRA ABSOLUTA PARA FIGURAS:**

**Quando houver placeholders de figuras/gráficos/imagens nos slides:**

1. **FIGURAS DEVEM VIR DOS ARTIGOS ORIGINAIS:**
   - ❌ **NÃO** criar figuras do zero
   - ❌ **NÃO** usar figuras genéricas
   - ❌ **NÃO** deixar placeholders vazios
   - ✅ **SEMPRE** usar figuras dos artigos originais citados no slide

2. **PROCESSO:**
   - Você receberá o artigo PDF/PDF do usuário
   - Localize as figuras relevantes no artigo original
   - Recorte a figura específica necessária
   - Cole/insira no slide HTML no lugar do placeholder

3. **EXEMPLOS DE PLACEHOLDERS QUE PRECISAM DE FIGURAS:**
   - Funnel plots (Publication Bias)
   - Forest plots (meta-análises)
   - Gráficos Kaplan-Meier (sobrevida)
   - Figuras de desenho de estudo (CONSORT)
   - Tabelas GRADE (Evidence Profile)
   - Qualquer referência a "ver figura no artigo original"

4. **QUALIDADE DAS FIGURAS:**
   - Use alta resolução (300 DPI mínimo para impressão)
   - Mantenha legibilidade (texto legível)
   - Preserve cores originais quando relevantes
   - Se necessário redimensionar, mantenha proporção
   - Inclua legenda/notas se fizerem parte da figura

5. **FORMATO:**
   - Salvar em `GRADE/assets/img/`
   - Usar nome descritivo: `clear-outcomes-funnel-plot.png`
   - Incluir no HTML: `<img src="../assets/img/nome-arquivo.png" alt="Descrição">`
   - Se for muito grande, otimizar antes de inserir

**Exemplo de slide S44:**
- Há menção a "Publication Bias (funnel plot)"
- Se houver placeholder vazio, você deve:
  1. Abrir o artigo NEJM 2023 (CLEAR Outcomes)
  2. Localizar o funnel plot no artigo
  3. Recortar a figura
  4. Salvar como `GRADE/assets/img/clear-outcomes-funnel-plot.png`
  5. Inserir no slide onde está o placeholder

**⚠️ IMPORTANTE:**
- Sempre verifique se o artigo original tem a figura mencionada
- Se não tiver, avise o usuário e NÃO invente
- Figuras de artigos são propriedade intelectual - use apenas para fins educacionais

---

### 2. Slides Órfãos/Vazios (Estruturais - Mas Afetam Conteúdo)

**S12 - Praticamente Vazio:**
- Problema: Só tem título, conteúdo está em S13
- Ação sugerida: Fundir título com S13 e deletar S12
- **⚠️ Nota:** Isso é parte estrutural, mas afeta fluxo de conteúdo

**S16 - Só Referência:**
- Problema: Slide inteiro é só uma referência (Cainzos-Achirica)
- Ação sugerida: Mover referência para rodapé do S15 e deletar S16
- **⚠️ Nota:** Referência bibliográfica é conteúdo, mas slide vazio é estrutura

**Decisão:** Claude Técnico pode deletar os slides vazios, mas **você deve garantir** que as referências não se percam.

### 3. Inconsistências Metodológicas Potenciais

**S21 (DELETADO):**
- ~~Problema anterior: IC/MID incorretos~~
- ✅ **Status:** Slide foi deletado como duplicata (mantido S14 com citação)

**S18 (CORRIGIDO):**
- ✅ Problema corrigido: IC cruza MID agora está correto

**Verificar:**
- Há outras inconsistências CLEAR/MID em outros slides?
- Todas as análises de imprecisão estão corretas?

### 4. Conteúdo Desatualizado (P1 - IMPORTANTE)

**PREVENT "Desatualizado":**
- Slides: S26, S29, S34 (menções a PREVENT)
- Problema: Pode haver validação brasileira mais recente
- **Ação:** Verificar se há fonte de validação BR publicada
- **Se SIM:** Atualizar conteúdo
- **Se NÃO:** Adicionar nuance "validação externa limitada"

**⚠️ Decisão necessária:** Você tem fonte de validação brasileira para PREVENT? Se não, deixar como está.

---

## 📝 ANÁLISE DE AUDITORIA (Referência)

### ✅ CONCORDO 100% - P0 (FAZER AGORA)

**Problemas Globais Críticos:**

| Problema | Exemplo | Ação | Status |
|----------|---------|------|--------|
| Slides órfãos | S16 (só Cainzos-Achirica), S12 (só título) | Mover referência para rodapé e DELETAR slide | ⏳ Aguardando |
| Placeholders [TBD] | ~~S40 "efeito absoluto"~~, ~~S43 "política local"~~ | Preencher OU reescrever neutro | ✅ Verificar manual |
| Inconsistência CLEAR/MID | ~~S21 diz "não cruza", mas cruza 0.79-0.96 (MID=0.8)~~ | Usar versão correta (rebaixa 1 nível) | ✅ CORRIGIDO (S18) |

**Slides Específicos P0:**

| Slide | Problema | Ação | Status |
|-------|----------|------|--------|
| S12 | Praticamente vazio (só título) | Fundir com S13 | ⏳ Aguardando |
| S16 | Só referência Cainzos | Mover para notes S15 + deletar | ⏳ Aguardando |
| ~~S21~~ | ~~IC/MID ERRADO~~ | ~~Substituir pela versão correta~~ | ✅ DELETADO (duplicata) |

### ⚠️ CONCORDO PARCIALMENTE - P1 (Depois das redundâncias)

| Sugestão | Minha Opinião | Ação |
|----------|---------------|------|
| PREVENT "desatualizado" | ⚠️ DEPENDE: Você tem fonte de validação BR publicada? Se sim, atualizar. Se não, deixar como está com nuance "validação externa limitada" | ⏳ Decisão necessária |
| Texto "refluxa" no PDF | ✅ Concordo que é problema, mas não é prioridade (PDF é backup, apresentação é online) | ⏳ Baixa prioridade |
| QR placeholders | ✅ Concordo, mas você tem os QR reais? Se não tiver, deixar como está | ⏳ Decisão necessária |

### ❌ DISCORDO - Não Fazer Agora

| Sugestão | Por que discordo |
|----------|------------------|
| Trocar WHI/TRH por exemplo cardio (S8) | ❌ WHI é exemplo clássico de gradiente duração. Manter. |
| "Certeza inicial SEMPRE ALTA" (S25) | ❌ Está tecnicamente correto conforme GRADE prognóstico. Não mexer. |
| Reduzir fontes/DOI no slide | ⚠️ Academicamente importante. Só fazer se você realmente quer slides mais limpos |

---

## 🎯 PRÓXIMAS AÇÕES RECOMENDADAS

### FASE 1: Verificar e Corrigir [TBD] (Se houver)

1. **Buscar manualmente por [TBD]:**
   ```bash
   # No terminal:
   grep -r "TBD\|placeholder\|TODO" GRADE/src/slides/
   ```

2. **Se encontrar:**
   - Preencher com conteúdo real
   - OU reescrever de forma neutra se não houver informação

3. **Slides específicos a verificar:**
   - S40: "efeito absoluto" mencionado?
   - S43: "política local" mencionado?

### FASE 2: Validar Consistência Metodológica

1. **Revisar todas as análises de imprecisão:**
   - Verificar se IC cruza MID corretamente
   - Confirmar que downgrades estão corretos

2. **Revisar todas as análises CLEAR Outcomes:**
   - S18: ✅ Já corrigido
   - S44: Verificar se análise está correta
   - S46: Verificar se síntese está correta

3. **Verificar outras inconsistências:**
   - Há outras menções a IC/MID que podem estar erradas?

### FASE 3: Atualizar Conteúdo Desatualizado (Condicional)

**SE você tiver fonte de validação brasileira para PREVENT:**
- Atualizar S26, S29, S34 com nova informação
- Adicionar citação da validação BR

**SENÃO:**
- Adicionar nuance "validação externa limitada" nos slides mencionados
- Manter como está

### FASE 4: Revisar Fluxo Narrativo

1. **Após Claude Técnico deletar S12 e S16:**
   - Verificar se fluxo narrativo ainda faz sentido
   - Garantir que referências não se perderam

2. **Verificar transições:**
   - Slides de transição (S2, S4, S8, S30, S32, S34) estão adequados?
   - Adicionar mais transições se necessário?

---

## 📚 RECURSOS E REFERÊNCIAS

### Fontes Bibliográficas

**Arquivo:** `GRADE/refs/sources.md`
- Lista completa de fontes usadas
- Atualizar quando adicionar novas referências

### Documentação de Qualidade

**Arquivos:**
- `docs/ESSENTIAL/QUALITY.md` - Benchmarks EBM, educação adultos
- `docs/ESSENTIAL/STYLEGUIDE.md` - Design visual, hierarquia
- `docs/ESSENTIAL/CLAUDE_ROLE.md` - Seu papel completo (seção "Claude Conteúdo")

### Paleta Oficial (OBRIGATÓRIA)

**Arquivo:** `docs/ESSENTIAL/PROMPT_PALETA_OFICIAL.md`

**⚠️ IMPORTANTE:** Quando você criar/modificar conteúdo, **SEMPRE use:**
- `var(--navy)` ao invés de `#0B1320`
- `var(--gold)` ao invés de `#DDB944`
- `var(--text)` ao invés de `#222`
- etc.

**NUNCA use cores hardcoded (#XXXXXX) no HTML dos slides!**

---

## 🔄 WORKFLOW DE TRABALHO

### Quando Você Cria/Corrige Conteúdo:

1. **Criar/modificar slide HTML:**
   - Usar paleta oficial (`var(--nome)`)
   - Incluir rodapé com fonte (se dados verificáveis)
   - Aplicar 10-second rule (mensagem clara)

2. **Entregar para Claude Técnico:**
   - Ele valida paleta e estrutura
   - Ele faz commit no Git
   - Ele atualiza CHANGELOG

3. **Depois:** ChatGPT Auditor pode validar tudo (opcional)

### Exemplo de HTML que Você Cria:

```html
<section class="slide" data-slide-id="SXX">
    <h2 style="color: var(--navy); font-family: Georgia;">
        Título do Slide
    </h2>
    
    <div style="background: var(--white); border: 1px solid var(--border);">
        <p style="color: var(--text); font-family: Lato;">
            Conteúdo médico aqui...
        </p>
    </div>
    
    <div style="position: absolute; bottom: 2vw; color: var(--muted);">
        Fonte: Autor et al. Journal 2025;XX:YY
    </div>
</section>
```

---

## ✅ CHECKLIST PARA VOCÊ

**Antes de trabalhar:**
- [ ] Li `docs/ESSENTIAL/PROMPT_PALETA_OFICIAL.md`
- [ ] Li `docs/ESSENTIAL/QUALITY.md`
- [ ] Li `docs/ESSENTIAL/STYLEGUIDE.md`
- [ ] Li `GRADE/refs/sources.md`

**Ao criar/modificar conteúdo:**
- [ ] Usei `var(--nome)` para todas as cores?
- [ ] Incluí rodapé com fonte auditável?
- [ ] Apliquei 10-second rule (mensagem clara)?
- [ ] Verifiquei que não há [TBD] ou placeholders de texto?
- [ ] **Substituí placeholders de figuras por figuras dos artigos originais?**
- [ ] Figuras salvas em `GRADE/assets/img/` com nomes descritivos?
- [ ] Conferi fontes bibliográficas?

**Após criar/modificar:**
- [ ] Informei Claude Técnico para validar e commitar?
- [ ] Documentei mudanças (se necessário)?

---

## 📊 RESUMO EXECUTIVO

**Status atual:**
- ✅ 45 slides criados (S01-S46, sem S21)
- ✅ Slides S43-S46 adicionados recentemente (SAMS + Bempedóico)
- ✅ S18 corrigido metodologicamente (IC/MID)
- ⏳ S12 e S16 aguardando deleção (estrutural)
- ⏳ Verificar se há [TBD] restantes
- ⏳ Decisão sobre PREVENT (validação BR?)

**Próximas ações prioritárias:**
1. Verificar [TBD] manualmente (S17, S38, S41)
2. **Identificar e substituir placeholders de figuras por figuras dos artigos originais**
3. Validar consistência metodológica (IC/MID em todos os slides)
4. Decidir sobre PREVENT (atualizar ou manter)
5. Revisar fluxo narrativo após deleções estruturais

**⚠️ ATENÇÃO ESPECIAL - Figuras:**
- Quando o usuário fornecer artigos PDF, você deve recortar figuras relevantes
- Substituir todos os placeholders visuais por figuras reais dos artigos
- Verificar especialmente slides S44 (funnel plot), S46 (tabelas GRADE), e outros que mencionam figuras

---

**Última atualização:** 2026-01-20  
**Autor:** Claude Técnico (criado para Claude de Conteúdo)  
**Próxima revisão:** Após correções de conteúdo
