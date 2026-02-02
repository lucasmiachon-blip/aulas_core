# 🛡️ SISTEMA ANTI-ALUCINAÇÃO
## Controle de Conteúdo Médico para Apresentações

> **Regra de Ouro:** Claude Code FORMATA. Lucas FORNECE conteúdo. ChatGPT VALIDA.

---

# PARTE 1: ARQUITETURA DE SEPARAÇÃO

## 🔴 O QUE CLAUDE CODE NUNCA FAZ

| Proibido | Por quê |
|----------|---------|
| Inventar dados médicos | Risco de desinformação |
| Criar estatísticas (NNT, ARR, HR) | Deve vir de fonte primária |
| Sugerir dosagens | Informação crítica |
| Afirmar eficácia de tratamentos | Requer evidência |
| Citar estudos sem fonte fornecida | Pode alucinar referência |
| Interpretar guidelines | Você é o especialista |

## 🟢 O QUE CLAUDE CODE FAZ

| Permitido | Exemplo |
|-----------|---------|
| Criar HTML/CSS/JS | Estrutura, estilos, animações |
| Formatar conteúdo fornecido | Transformar texto em slide |
| Aplicar design system | Cores, tipografia, espaçamento |
| Otimizar layout | Grid, hierarquia visual |
| Criar componentes | Cards, tabelas, gráficos |
| Debugging | Corrigir erros de código |

---

# PARTE 2: FLUXO DE TRABALHO

```
┌─────────────────────────────────────────────────────────────────┐
│                     FLUXO ANTI-ALUCINAÇÃO                       │
└─────────────────────────────────────────────────────────────────┘

   FONTES                VOCÊ               CLAUDE CODE          CHATGPT PRO
     │                    │                      │                    │
     │  Papers/           │                      │                    │
     │  Guidelines        │                      │                    │
     │  Diretrizes SBC    │                      │                    │
     ▼                    │                      │                    │
┌─────────┐              │                      │                    │
│ PubMed  │──────────────▶│                      │                    │
│ JACC    │   Extrai      │                      │                    │
│ CTT     │   conteúdo    │                      │                    │
└─────────┘              │                      │                    │
                         ▼                      │                    │
                   ┌───────────┐                │                    │
                   │ CONTEÚDO  │                │                    │
                   │ VERIFICADO│                │                    │
                   │ (texto +  │                │                    │
                   │ números + │                │                    │
                   │ fonte)    │                │                    │
                   └─────┬─────┘                │                    │
                         │                      │                    │
                         │  Fornece via         │                    │
                         │  prompt              │                    │
                         ▼                      ▼                    │
                   ┌─────────────────────────────────┐              │
                   │      PROMPT COM CONTEÚDO        │              │
                   │  "Formate este conteúdo como    │              │
                   │   slide HTML usando o design    │              │
                   │   system..."                    │              │
                   │                                 │              │
                   │  CONTEÚDO:                      │              │
                   │  - Título: [...]                │              │
                   │  - Dado: NNT=XX (FONTE)         │              │
                   │  - Referência: [...]            │              │
                   └─────────────┬───────────────────┘              │
                                 │                                   │
                                 │  Cria código                      │
                                 ▼                                   │
                   ┌─────────────────────────────────┐              │
                   │         SLIDE HTML              │              │
                   │  (só formatação, conteúdo       │              │
                   │   idêntico ao fornecido)        │              │
                   └─────────────┬───────────────────┘              │
                                 │                                   │
                                 │  Revisar                          │
                                 ▼                                   ▼
                   ┌─────────────────────────────────────────────────────┐
                   │              VALIDAÇÃO CHATGPT PRO                  │
                   │  "Verifique se este slide está factualmente        │
                   │   correto. Compare com a fonte original..."        │
                   └─────────────────────────────────────────────────────┘
                                 │
                                 ▼
                   ┌─────────────────────────────────┐
                   │         ✅ APROVADO             │
                   │    Marcar no SlideOps:          │
                   │    - Conteúdo checado: Yes      │
                   │    - Critical appraisal: Yes    │
                   └─────────────────────────────────┘
```

---

# PARTE 3: TEMPLATE DE PROMPT ANTI-ALUCINAÇÃO

## Template para Criar Slides (usar este formato SEMPRE)

```
TAREFA: Criar HTML para o slide [N] usando o design system estabelecido.

⚠️ REGRAS CRÍTICAS:
- NÃO invente nenhum dado médico
- NÃO modifique números ou estatísticas
- NÃO adicione informações além das fornecidas
- USE exatamente o texto fornecido abaixo
- PRESERVE a referência exatamente como está

═══════════════════════════════════════════════════════
CONTEÚDO FORNECIDO (COPIAR LITERALMENTE):
═══════════════════════════════════════════════════════

SLIDE: [Número]
TIPO: [title/content/data/comparison/quote]

TÍTULO: 
[Título exato do slide - máximo 6 palavras]

MENSAGEM PRINCIPAL:
[A frase-chave que o público deve lembrar]

DADOS (se houver):
- [Dado 1]: [Valor] (Fonte: [Referência])
- [Dado 2]: [Valor] (Fonte: [Referência])

BULLETS (se houver):
1. [Ponto 1]
2. [Ponto 2]
3. [Ponto 3]

REFERÊNCIA COMPLETA:
[Autor et al. Journal Year;Vol:pages. DOI/PMID]

═══════════════════════════════════════════════════════

INSTRUÇÕES DE FORMATAÇÃO:
- Layout: [especificar layout desejado]
- Destaque: [o que deve ter ênfase visual]
- Componentes: [quais componentes usar]

Gere o HTML seguindo o design system em CLAUDE.md.
```

---

# PARTE 4: TEMPLATE DE VALIDAÇÃO CHATGPT PRO

## Prompt para ChatGPT Pro (colar após criar cada slide)

```
Você é um revisor médico especializado em cardiologia e medicina baseada em evidências.

TAREFA: Validar a precisão factual deste slide de apresentação médica.

SLIDE A REVISAR:
[COLAR O CONTEÚDO DO SLIDE AQUI]

FONTE ORIGINAL:
[COLAR O TRECHO DA FONTE AQUI - paper, guideline, etc.]

CHECKLIST DE VALIDAÇÃO:

1. PRECISÃO DOS NÚMEROS
   □ Os valores numéricos (NNT, ARR, HR, etc.) estão corretos?
   □ As unidades estão corretas?
   □ Os intervalos de confiança estão corretos (se citados)?

2. PRECISÃO DAS AFIRMAÇÕES
   □ As afirmações refletem fielmente a fonte?
   □ Há simplificações que distorcem o significado?
   □ O contexto está preservado?

3. REFERÊNCIA
   □ A citação está correta (autor, ano, journal)?
   □ O DOI/PMID está correto?

4. AUSÊNCIA DE INFORMAÇÃO INVENTADA
   □ Todo o conteúdo tem suporte na fonte?
   □ Não há extrapolações indevidas?

RESULTADO:
- ✅ APROVADO: Pode usar
- ⚠️ CORREÇÃO NECESSÁRIA: [especificar o que corrigir]
- ❌ REPROVADO: [explicar o problema grave]

Forneça sua análise detalhada.
```

---

# PARTE 5: INTEGRAÇÃO COM SLIDEOPS

## Campos do SlideOps a Preencher

Para cada slide, após validação:

| Campo | Valor | Significado |
|-------|-------|-------------|
| **Âncora EBM** | [Mensagem + número + fonte] | A afirmação verificável |
| **Conteúdo checado** | Yes/No | Passou pelo ChatGPT? |
| **Critical appraisal** | Yes/No | Fonte primária verificada? |
| **Confiança** | Alta/Moderada/Baixa | Sua confiança no conteúdo |
| **Estado** | Done/NeedsFix/Critical | Status de completude |

## Workflow no SlideOps

1. **Antes de criar slide:**
   - Cadastrar no SlideOps com P-level
   - Preencher "Âncora EBM" com conteúdo planejado
   - Estado: Critical

2. **Após criar slide:**
   - Validar com ChatGPT Pro
   - Se aprovado: Conteúdo checado = Yes
   - Se fonte verificada: Critical appraisal = Yes
   - Estado: Done (ou NeedsFix se precisa ajuste visual)

---

# PARTE 6: FONTES APROVADAS

## Hierarquia de Evidência para Dislipidemia

| Nível | Fonte | Uso |
|-------|-------|-----|
| 1 | CTT Collaboration Meta-analyses | Dados de eficácia de estatinas |
| 2 | Trials originais (4S, HPS, FOURIER, etc.) | Dados específicos de trials |
| 3 | Guidelines ESC/EAS 2019, AHA/ACC 2018 | Recomendações de tratamento |
| 4 | Diretrizes Brasileiras SBC | Contexto nacional |
| 5 | Reviews JACC/Lancet/NEJM | Sínteses recentes |

## Fontes JÁ DISPONÍVEIS no Projeto

1. **Historico_farmacos.pdf** (JACC 2020)
   - Autores: Preiss, Tobert, Hovingh, Reith
   - Conteúdo: Estatinas, Ezetimibe, iPCSK9, Bempedoic acid
   - DOI: 10.1016/j.jacc.2019.11.072
   - PMID: Buscar no PubMed

---

# PARTE 7: TÉCNICAS DE DESIGN VISUAL (TUFTE + MAYER)

## Princípios de Edward Tufte Aplicados

| Princípio | Aplicação nos Slides |
|-----------|---------------------|
| **Data-ink ratio** | Minimizar decoração, maximizar informação |
| **Small multiples** | Usar para comparar tratamentos |
| **Sparklines** | Dados inline com texto |
| **Chartjunk = 0** | Sem gradientes 3D, sombras excessivas |
| **Lie factor = 1** | Gráficos proporcionais aos dados |

## Princípios de Richard Mayer (Multimedia Learning)

| Princípio | Aplicação |
|-----------|-----------|
| **Coherence** | Remover informação irrelevante |
| **Signaling** | Destacar informação essencial (gold) |
| **Redundancy** | Não repetir narração no texto |
| **Spatial contiguity** | Texto perto do visual relacionado |
| **Temporal contiguity** | Revelar sincronizado com fala |
| **Segmenting** | Um conceito por slide |
| **Pre-training** | Definir termos antes de usar |

## Assertion-Evidence Approach

**Tradicional (ruim):**
```
Título: Estatinas
• Reduzem LDL
• Diminuem eventos CV
• Bem toleradas
```

**Assertion-Evidence (bom):**
```
Título: Estatinas reduzem eventos CV em 22% por mmol/L de redução do LDL

[Gráfico com dados do CTT]

Fonte: CTT Lancet 2010
```

---

# PARTE 8: CHECKLIST PRÉ-APRESENTAÇÃO

## Verificação Final de Cada Slide

```
SLIDE [N]: [TÍTULO]

CONTEÚDO:
□ Afirmação principal é verificável
□ Números conferidos com fonte
□ Referência completa e correta
□ Sem informação inventada
□ Validado por ChatGPT Pro
□ Registrado no SlideOps

DESIGN:
□ Segue design system (cores, fontes)
□ Hierarquia visual clara
□ Contraste adequado (4.5:1+)
□ Uma ideia principal
□ Máximo 3 bullets (se houver)

TÉCNICO:
□ Renderiza corretamente
□ PDF exporta bem
□ Sem erros no console
```

---

# PARTE 9: PROTOCOLO DE EMERGÊNCIA

## Se Encontrar Possível Erro Médico

1. **PARE** - Não apresente
2. **VERIFIQUE** - Volte à fonte primária
3. **CONSULTE** - Use PubMed para confirmar
4. **CORRIJA** - Atualize slide e SlideOps
5. **DOCUMENTE** - Registre a correção

## Contato PubMed (via Claude)

Posso ajudar a verificar dados usando a ferramenta PubMed integrada.
Exemplo: "Verifique o NNT de estatinas para prevenção primária"

---

# PARTE 10: EXEMPLO COMPLETO

## Exemplo: Criando Slide sobre Estatinas

### Passo 1: Extrair conteúdo da fonte

Do PDF JACC (Historico_farmacos.pdf), página 2:
> "statin therapy proportionally reduces the risk of major atherosclerotic 
> vascular events by about one-fifth per 38.7 mg/dl (1 mmol/l) absolute 
> reduction in LDL cholesterol"

Fonte: CTT Collaboration, Lancet 2010

### Passo 2: Formatar para prompt

```
TAREFA: Criar HTML para slide 15 usando design system.

⚠️ NÃO invente dados. Use EXATAMENTE o conteúdo abaixo.

═══════════════════════════════════════════════════════
CONTEÚDO FORNECIDO (COPIAR LITERALMENTE):
═══════════════════════════════════════════════════════

SLIDE: 15
TIPO: data

TÍTULO: 
Estatinas: 22% menos eventos por mmol/L

MENSAGEM PRINCIPAL:
A redução de eventos CV é proporcional à redução do LDL-C

DADOS:
- Redução de risco: 22% por 38.7 mg/dL (1 mmol/L) de queda do LDL
- Fonte: CTT Collaboration

REFERÊNCIA COMPLETA:
CTT Collaboration. Lancet 2010;376:1670-81.

═══════════════════════════════════════════════════════

INSTRUÇÕES:
- Layout: data (número em destaque)
- Destaque: "22%" em gold, grande
- Componentes: data-card + citation
```

### Passo 3: Validar com ChatGPT Pro

[Colar slide gerado + fonte original]

### Passo 4: Registrar no SlideOps

- Âncora EBM: "Estatinas reduzem 22% eventos/mmol LDL - CTT 2010"
- Conteúdo checado: Yes
- Critical appraisal: Yes
- Confiança: Alta
- Estado: Done

---

*Sistema criado em 30/01/2026*
*Versão 1.0*
*Zero tolerância para alucinação médica*
