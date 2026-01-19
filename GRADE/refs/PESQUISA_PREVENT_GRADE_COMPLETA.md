# PESQUISA COMPLETA: PREVENT & GRADE - Janeiro 2026

**Data da pesquisa:** 18 Janeiro 2026  
**Método:** Extended search task com fontes tier-1  
**Status:** ✅ CONCLUÍDA

---

## 🎯 ACHADOS PRINCIPAIS

### 1. DIRETRIZ SBC 2025 - RECOMENDAÇÃO PREVENT

**Fonte oficial:** Arq Bras Cardiol. 2025;122(9):e20250640  
**PMC:** PMC12674852  
**Metodologia:** GRADE aplicado

**Recomendação textual:**
> "A diretriz recomenda o escore PREVENT como ferramenta preferencial para estimar o risco de eventos cardiovasculares ateroscleróticos em 10 anos e até 30 anos, para indivíduos entre 30-79 anos, em prevenção primária."

**Categorização de risco com PREVENT:**
- **Baixo:** <5% em 10 anos
- **Intermediário:** 5-20% em 10 anos  
- **Alto:** ≥20% em 10 anos
- **Muito Alto/Extremo:** DCVA estabelecida ou múltiplos fatores

**Inovações 2025:**
- Lp(a) ≥50 mg/dL como fator agravante
- CAC como reclassificador em zona cinza
- 5 categorias de risco (novo: "extremo")

---

## 📚 GRADE PARA MODELOS PROGNÓSTICOS

### GRADE Guidelines #28 (2020)
**Citação:** Foroutan et al. J Clin Epidemiol. 2020;121:62-70  
**DOI:** 10.1016/j.jclinepi.2019.12.023

**Conceito-chave:**
> "Evidência observacional para questões prognósticas inicia como ALTA certeza (diferente de intervenções)"

**Domínios para downgrade:**
1. Risco de viés (via PROBAST/QUIPS)
2. Inconsistência (inspeção visual > I²)
3. Imprecisão (contextualizada)
4. Indireticidade (PICO comparison)
5. Viés de publicação

### GRADE Concept Paper #2 (2022)
**Citação:** Foroutan et al. J Clin Epidemiol. 2022;143:202-211  
**DOI:** 10.1016/j.jclinepi.2021.11.024

**Calibração - 4 conceitos inovadores:**

1. **Definição do alvo:** Certeza de desempenho satisfatório vs insatisfatório
2. **Papel crítico da inconsistência:** Domínio determinante (único para prognósticos)
3. **Padrões de inconsistência:** Diferentes padrões → classificações distintas
4. **Distribuição O/E ratio:** Informa pesquisas futuras

**Métricas:**
- O/E ratio: 1.0 = perfeito; >1.0 = subestimação; <1.0 = superestimação
- Calibration slope: 1.0 = ideal
- Calibration plots (visual)

### GRADE Concept Paper #8 (2024)
**Citação:** Foroutan et al. J Clin Epidemiol. 2024;170:111344  
**DOI:** 10.1016/j.jclinepi.2024.111344

**Discriminação - 3 limiares:**

| Limiar | C-statistic | Aplicação |
|--------|-------------|-----------|
| Vs aleatório | 0.50 | Mínimo aceitável |
| Vs gestalt clínico | 0.58-0.70 | Valor agregado |
| Vs outro modelo | C comparador | Escolha entre modelos |

**Mensagem-chave:**
> "Discriminação sozinha é insuficiente. Favorecer modelos com melhor calibração mesmo com C-statistic inferior é comum."

---

## 🔬 CALCULADORAS - COMPARAÇÃO COMPLETA

### PREVENT (2023-2024)

**Publicação:** Khan SS et al. Circulation. 2024;149:430-449  
**Derivação:** 6,6 milhões adultos, 46 datasets (1992-2017)  
**Idade:** 30-79 anos  
**Horizontes:** 10 e 30 anos

**Diferenciais:**
- ✓ Inclusão de eGFR (obrigatório)
- ✓ Predição de IC (além ASCVD)
- ✓ Horizonte 30 anos
- ✓ SDI (índice privação social)
- ✗ Excluiu raça como variável

**Performance (validação interna):**
- C-statistic: 0.73-0.89 (depende desfecho/população)
- Calibração: Boa em populações norte-americanas

### PCE (2013)

**Pooled Cohort Equations** (ACC/AHA)  
**Derivação:** 48.733 participantes  
**Idade:** 40-79 anos  

**Problema crítico:**
- **Superestimação sistemática ~2x** em populações contemporâneas
- MESA: predito 10.8% vs observado 6.0%
- Era pré-estatinas (dados 1987-1989)

### SCORE2 (2021) - Europa

**ESC Guidelines**  
**Derivação:** 677.684 participantes  
**Diferencial:** Calibração regional (4 níveis risco europeu)

**SCORE2-OP:** Ajuste para risco competitivo em idosos (70-89 anos)

### QRISK3 (2017) - Reino Unido

**Derivação:** 7,89 milhões  
**C-statistic:** 0.86-0.88 (maior da literatura)  
**Diferencial:** Inclui índice Townsend (privação social UK)

---

## ⚠️ LACUNA CRÍTICA: VALIDAÇÃO LATINO-AMERICANA

### ACHADO PRINCIPAL

> **🚨 NÃO EXISTEM estudos de validação do PREVENT em populações latino-americanas, brasileiras ou asiáticas até janeiro 2026**

### Validações disponíveis do PREVENT

| Estudo | População | N | C-stat | O/E | Conclusão |
|--------|-----------|---|--------|-----|-----------|
| NHANES 2024 | EUA | 24.582 | 0.89 | Slope 1.13 | Boa calibração |
| MESA 2025 | EUA multiétnico | 6.098 | 0.73 | MAE 0.001 | Superior a PCE |
| CoLaus 2025 | Suíça | 4.356 | 0.76 | **1.45** | Subestima (Europa) |
| UK Biobank 2025 | Reino Unido | 368.125 | 0.728 | Melhor PCE | Similar discriminação |

**Validação suíça (de La Harpe et al. 2025):**
- O/E = 1.45 (subestimação significativa)
- Performance pior em ≥70 anos (C 0.62 vs 0.71 em <70)

### Evidência de superestimação em Latino-americanos

**PURE-Colômbia (Eur J Prev Cardiol 2025):**
- PCE superestima: 46-71%
- SCORE2 superestima: 22-42%

**Fatores de correção propostos:**
- PCE mulheres: **×0.54**
- PCE homens: **×0.28**

**Globorisk-LAC (Lancet Reg Health Americas 2022):**
- Desenvolvido especificamente para América Latina
- 9 coortes, 21.378 participantes
- Calibração local superior a modelos importados

---

## 🔍 PROBAST - CHECKLIST OFICIAL

**Fonte:** Wolff et al. Ann Intern Med. 2019;170:51-58  
**PDF oficial:** probast.org

### 4 Domínios, 20 Perguntas

**DOMÍNIO 1: Participantes (2 perguntas)**
- 1.1 Fontes de dados apropriadas?
- 1.2 Inclusões/exclusões apropriadas?

**DOMÍNIO 2: Preditores (3 perguntas)**
- 2.1 Definidos/avaliados similarmente?
- 2.2 Avaliação cega para desfecho?
- 2.3 Disponíveis no momento de uso?

**DOMÍNIO 3: Desfecho (6 perguntas)**
- 3.1-3.2 Determinação apropriada e padronizada?
- 3.3 Preditores excluídos da definição?
- 3.4-3.5 Similar para todos e cego?
- 3.6 Intervalo apropriado preditor-desfecho?

**DOMÍNIO 4: Análise (9 perguntas)**
- 4.1 N adequado com desfecho?
- 4.2-4.5 Tratamento contínuos, missing, seleção?
- 4.6-4.9 Censura, performance, overfitting, pesos?

**Julgamento geral:**
- Baixo risco: TODOS domínios baixos
- Alto risco: QUALQUER domínio alto
- Incerto: Algum incerto, nenhum alto

---

## 📋 TRIPOD+AI - NOVO PADRÃO 2024

**Fonte:** Collins et al. BMJ. 2024;385:e078378  
**Status:** SUPERSEDE TRIPOD 2015

### Estrutura: 27 itens principais (52 subitens)

**Novos itens críticos:**

**Item 3c (Equidade):**
> "Descrever inequidades em saúde conhecidas entre grupos sociodemográficos"

**Item 7 (Pré-processamento):**
> "Verificação qualidade de dados, incluindo entre grupos demográficos"

**Item 13 (Desbalanceamento):**
> "Se métodos de desbalanceamento de classes usados, explicar e recalibrar"

**Item 14 (Fairness):**
> "Descrever abordagens para equidade do modelo com justificativa"

**Item 19 (Envolvimento público):**
> "Participação de pacientes no design, condução e interpretação"

### Ciência Aberta (Itens 18a-18f)
- Financiamento e COI
- Protocolo e registro
- Dados e código disponíveis

---

## 🎯 IMPLICAÇÕES PARA SLIDES

### Slide: Recomendações das Diretrizes

✅ **Já está perfeito** (não mexer)

### Slide: Comparação Calculadoras

**Adicionar coluna:**
- "Validação América Latina": ✗ PREVENT, ✗ PCE, ✗ SCORE2, ✓ Globorisk-LAC

**Nota crítica:**
> "⚠️ PREVENT: ZERO estudos de validação em população brasileira ou latino-americana até janeiro 2026"

### Slide: Limitações PREVENT para Brasil

**Criar bullet principal:**
> "❌ **AUSÊNCIA TOTAL de validação externa em população brasileira**"

**Sub-bullets:**
- Validação suíça mostrou subestimação (O/E 1.45)
- Modelos norte-americanos superestimam risco em latino-americanos (PURE-Colômbia: 46-71%)
- Globorisk-LAC desenvolvido especificamente para região (alternativa?)

### Slide: GRADE para Modelos Prognósticos

**Conceito fundamental:**
> "DIFERENÇA CRÍTICA: Estudos observacionais prognósticos começam com certeza ALTA (≠ intervenções que começam BAIXA)"

**3 Papers essenciais:**
1. GRADE #28 (2020): Fatores prognósticos
2. GRADE #2 (2022): Calibração (O/E ratio)
3. GRADE #8 (2024): Discriminação (C-statistic)

### Slide: PROBAST + TRIPOD

**PROBAST:**
- 4 domínios, 20 perguntas
- Julgamento: Baixo/Alto/Incerto

**TRIPOD+AI (2024):**
- Supersede TRIPOD 2015
- 27 itens (52 subitens)
- Foco em equidade e ciência aberta

---

## 📚 REFERÊNCIAS TIER-1 COMPLETAS

1. Khan SS et al. Circulation. 2024;149:430-449 (PREVENT original)
2. Foroutan et al. J Clin Epidemiol. 2020;121:62-70 (GRADE #28)
3. Foroutan et al. J Clin Epidemiol. 2022;143:202-211 (GRADE #2 calibração)
4. Foroutan et al. J Clin Epidemiol. 2024;170:111344 (GRADE #8 discriminação)
5. Wolff et al. Ann Intern Med. 2019;170:51-58 (PROBAST)
6. Collins et al. BMJ. 2024;385:e078378 (TRIPOD+AI)
7. Rached FH et al. Arq Bras Cardiol. 2025;122(9):e20250640 (Diretriz SBC 2025)
8. de La Harpe et al. Eur J Prev Cardiol. 2025 (Validação suíça)
9. PURE-Colombia. Eur J Prev Cardiol. 2025 (Latino-americanos)
10. Lancet Reg Health Americas. 2022 (Globorisk-LAC)

---

## ✅ STATUS FINAL

**Pesquisa:** COMPLETA  
**Fontes:** Tier-1 (PubMed, PMC, guidelines oficiais)  
**Período:** Até Janeiro 2026  
**Lacuna identificada:** AUSÊNCIA validação PREVENT em Brasil/LATAM  

**Pronto para:**
- Criar slides com citações exatas
- Explicar GRADE prognóstico vs intervenção
- Mostrar PROBAST e TRIPOD+AI
- Destacar limitação crítica (sem validação local)

