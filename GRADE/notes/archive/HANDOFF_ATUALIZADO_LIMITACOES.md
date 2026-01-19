# 🔄 HANDOFF COMPLETO - PREVENT + GRADE + LIMITAÇÕES
**Data:** 18 Janeiro 2026, 02:30 AM  
**Sessão:** Pesquisa tier-1 completa + Limitações PREVENT

---

## ✅ O QUE FOI FEITO NESTA SESSÃO

### 1️⃣ Pesquisa PREVENT + GRADE (COMPLETA)
- Diretriz SBC 2025 (recomendação PREVENT)
- GRADE para modelos prognósticos (Papers 2, 8, 28)
- Comparativo calculadoras (5 ferramentas)
- PROBAST (checklist viés)
- TRIPOD+AI (padrão reporte 2024)

### 2️⃣ Pesquisa LIMITAÇÕES PREVENT (NOVA - COMPLETA)
- **Performance por subgrupos** (idade, sexo, raça/etnia)
- **Comorbidades** (diabetes, DRC, obesidade)
- **Variáveis ausentes** (CAC, Lp(a), PCR-us, história familiar, ApoB, ITB, DHGNA)
- **Situações de subestimação** (HIV, AR, LES, história obstétrica, radioterapia)
- **Situações de superestimação** (asiáticos, terapias preventivas extensivas)
- **Recomendações de reclassificadores** (quando usar CAC, biomarcadores)

---

## 📂 ARQUIVOS COMMITADOS NO GITHUB

### Estrutura completa:
```
/GRADE/
├── ATUALIZ_CLAUDE_ROLE.md                    # Protocolo ZERO INVENÇÃO
├── RECURSOS_GRADE_PREVENT.md                 # Recursos iniciais
├── PROMPT_PARA_CURSOR.md                     # Instruções Cursor
├── PESQUISA_PREVENT_GRADE_COMPLETA.md        # Pesquisa básica PREVENT + GRADE
└── HANDOFF_ATUALIZADO_LIMITACOES.md          # ← ESTE ARQUIVO (NOVO)
```

### Links diretos:
- Repo: https://github.com/lucasmiachon-blip/aulas_core
- Pesquisa básica: https://github.com/lucasmiachon-blip/aulas_core/blob/main/GRADE/PESQUISA_PREVENT_GRADE_COMPLETA.md
- Token: `/mnt/project/pacote.txt` (primeira linha)

---

## 🎯 ACHADOS CRÍTICOS - LIMITAÇÕES PREVENT

### 🚨 SUBGRUPOS DE BAIXA PERFORMANCE

#### 1. Por IDADE (dados empíricos tier-1):

| Faixa Etária | C-statistic | Calibração | Status |
|--------------|-------------|------------|--------|
| **30-39 anos** | NR | **Subestima** | ❌ Cuidado |
| 40-59 anos | 0.70-0.79 | Adequada | ✅ OK |
| 65-79 anos | **0.793** | Excelente | ✅ Ótimo |
| **≥80 anos** | **0.854** | Excelente | ✅ Melhor grupo |

**Fonte:** ASPREE (n=15.510, 65-79 anos) e JACC 2025 (multicêntrico)

#### 2. Por SEXO:

| Sexo | C-statistic | Calibração | Nota |
|------|-------------|------------|------|
| **Mulheres** | 0.728-0.904 | +3,3% | ✅ Performance superior |
| **Homens** | 0.687-0.873 | **-11,6%** subestima | ⚠️ Especialmente fumantes (-37%) |

**Fontes:** UK Biobank, NHANES, MESA, Emirados Árabes

#### 3. Por RAÇA/ETNIA:

| Raça/Etnia | PCE | PREVENT | Melhor |
|------------|-----|---------|--------|
| Negros | +81% | -8,1% | ✅ PREVENT |
| Brancos | +72% | -12,3% | ✅ PREVENT |
| Hispânicos | +54% | -13,0% | ✅ PREVENT |
| **Asiáticos** | **+212%** | **+72%** | ❌ AMBOS FALHAM |

**⚠️ ACHADO CRÍTICO:** Asiáticos orientais (chineses, japoneses, coreanos) = usar calculadoras regionais (SCORE2 Asia-Pacific, CHINA-PAR)

**EXCEÇÃO:** Sul-asiáticos têm risco 2x MAIOR (subestimado por todas calculadoras)

#### 4. COMORBIDADES:

**Diabetes:**
- PREVENT tem **pior discriminação** em diabéticos
- Adição de HbA1c: ΔC-statistic de apenas +0.004
- Considerar: UKPDS Risk Engine ou SCORE2-Diabetes

**DRC:**
- ✅ PREVENT é ÚNICO com eGFR no modelo base
- Calibração excelente em eGFR <60 e <45
- Adição de UACR melhora em albuminúria >300 mg/g (O/E: 1.39 → 1.05)

**Obesidade:**
- Performance similar em IMC <18.5 e ≥40
- Sem validação estratificada por categorias IMC

---

## 🔬 VARIÁVEIS AUSENTES COM IMPACTO DEMONSTRADO

### Ranking por evidência e impacto:

| Variável | HR/Risco | NRI | Evidência |
|----------|----------|-----|-----------|
| **1. CAC** | HR 2.5-3.0 por 100 UA | **0.25-0.55** | ⭐⭐⭐⭐⭐ |
| **2. Lp(a) >50 mg/dL** | HR 1.38-1.90 | **0.21** (21%) | ⭐⭐⭐⭐⭐ |
| **3. História familiar** | RR 1.6-1.9 | Modesta | ⭐⭐⭐⭐⭐ |
| **4. PCR-us >3 mg/L** | HR 2.87 vs <1 | 7.9-11.7% | ⭐⭐⭐⭐ |
| **5. ApoB** | Superior LDL-c em 9/9 estudos | Variável | ⭐⭐⭐⭐⭐ |
| **6. ITB ≤0.90** | HR 3.5-4.2 mortalidade CV | Significativa | ⭐⭐⭐⭐ |
| **7. DHGNA (FIB-4 ≥2.67)** | HR 1.80 para MACE | Emergente | ⭐⭐⭐ |

### CAC - IMPACTO MÁXIMO

**Evidência tier-1:**
- Meta-análise: NRI pooled **0.200** (IC95% 0.140-0.258)
- MESA: NRI **0.25** (IC95% 0.16-0.34, p<0.001)
- Risco intermediário: NRI **0.55** (IC95% 0.41-0.69)
- C-index: 0.676 → **0.711** ao adicionar CAC

**Ação clínica por CAC:**
- **CAC = 0:** Considerar adiar estatina (exceto DM, tabagismo, HF forte); reavaliar 5-10 anos
- **CAC 1-99:** Favorece estatina (especialmente ≥55 anos)
- **CAC ≥100:** Iniciar estatina qualquer idade
- **CAC ≥300:** Risco muito alto; terapia agressiva

### Lp(a) - FATOR CAUSAL

- ~20% adultos têm Lp(a) >100 nmol/L
- HR por 50 nmol/L: **1.11** (IC95% 1.10-1.12)
- Lp(a) ≥75 mg/dL: HR **1.88** (IC95% 1.30-2.70)
- Com LDL-C ótimo <77 mg/dL + Lp(a) >50: HR **1.38** (IC95% 1.06-1.79)

---

## ⚠️ SITUAÇÕES CLÍNICAS DE SUBESTIMAÇÃO

### 1. HIV POSITIVO
- IAM: **1.5-2x maior**
- IC: +140%
- AVC: +60%
- DAC ocorre **10 anos antes**
- ACC/AHA: "fator de risco intensificador"

### 2. DOENÇAS INFLAMATÓRIAS CRÔNICAS

**Artrite reumatoide:**
- DAC **1.5-2x maior** (= magnitude do diabetes)
- **EULAR 2017:** Aplicar **multiplicador 1.5x** para TODOS com AR

**Lúpus (LES):**
- IAM/AVC **2-3x mais prevalentes**
- Mulheres jovens com LES grave: até **50x maior**
- HR para IC: ~2.9x

### 3. HISTÓRIA OBSTÉTRICA ADVERSA
- **Pré-eclâmpsia:** 2x risco futuro DM; DCV em idades mais jovens
- **Diabetes gestacional:** 7-10x risco DM2
- **Menopausa precoce (<40 anos):** Perda proteção estrogênica
- ACC/AHA: fatores intensificadores

### 4. OUTRAS CONDIÇÕES

| Condição | Multiplicador/Ajuste |
|----------|---------------------|
| Apneia do sono | IC +140%, AVC +60%, DAC +30% |
| Radioterapia torácica | 0.5 Gy já aumenta risco |
| Transplante renal | 40% evento CV em 36 meses |
| **Hipercolesterolemia familiar** | **NÃO usar calculadoras padrão** |
| Doença mental grave | Mortalidade CV 2x |

---

## 📈 SITUAÇÕES DE SUPERESTIMAÇÃO

### 1. Populações asiáticas orientais
- PREVENT superestima **72%** (vs PCE 212%)
- Usar: SCORE2 Asia-Pacific ou calculadoras regionais
- **Exceção:** Sul-asiáticos = risco 2x MAIOR

### 2. Terapias preventivas extensivas
- MESA: superestimação ~100% mulheres, 93% homens SEM estatinas
- Tratamento contemporâneo reduz eventos observados

### 3. Saúde metabólica excelente
- CAC = 0: ~1% eventos 10 anos (independente do risco calculado)
- Dieta mediterrânea/vegetariana + fisicamente ativo

---

## 🎯 QUANDO USAR RECLASSIFICADORES

### Indicação Classe IIa (ACC/AHA 2019):

**CAC recomendado quando:**
- Risco **intermediário (7.5-20%)** + decisão incerta sobre estatinas
- Risco **borderline (5-7.5%)** + fatores intensificadores

### ALGORITMO PRÁTICO - RISCO INTERMEDIÁRIO

```
ETAPA 1: Calcular PREVENT
↓
Borderline (5-7.5%) ou Intermediário (7.5-20%)?
↓ SIM
ETAPA 2: Fatores intensificadores presentes?
↓ SIM ou INCERTO
ETAPA 3: Decisão compartilhada + CAC
├─ CAC = 0 → Considerar adiar estatinas
├─ CAC 1-99 → Favorece estatinas (≥55 anos)
└─ CAC ≥100 → Iniciar estatinas
↓ SE AINDA INCERTO
ETAPA 4: Biomarcadores adicionais
├─ Lp(a): Medir ao menos 1x na vida
├─ PCR-us: Se avaliação inflamatória necessária
└─ ITB: Se suspeita DAP ou diabetes
```

### LISTA COMPLETA - FATORES INTENSIFICADORES

**Lipídicos/Metabólicos:**
- LDL-c ≥160 mg/dL
- Non-HDL-c ≥190 mg/dL
- **Lp(a) ≥50 mg/dL** ou ≥125 nmol/L
- **ApoB ≥130 mg/dL**
- TG ≥175 mg/dL
- Síndrome metabólica

**Condições crônicas:**
- DRC (eGFR <60)
- Doenças inflamatórias (AR, psoríase, LES)
- HIV/AIDS

**Específicos de mulheres:**
- Pré-eclâmpsia
- Menopausa precoce (<40 anos)
- Parto prematuro
- Diabetes gestacional

**Marcadores:**
- PCR-us ≥2 mg/L

---

## 📊 PLANO DE SLIDES PROPOSTO

### ✅ SLIDES JÁ CONFIRMADOS:
1. Título
2. **Recomendações das Diretrizes** (PERFEITO - NÃO MEXER)

### 🆕 SLIDES A CRIAR:

**3. GRADE para Prognósticos ≠ Intervenções**
- Evidência observacional INICIA como ALTA certeza
- 3 Papers essenciais (28, 2, 8)
- Domínios de downgrade

**4. GRADE - Calibração (Paper #2)**
- 4 conceitos inovadores
- O/E ratio: 1.0 = perfeito
- Papel crítico da inconsistência

**5. GRADE - Discriminação (Paper #8)**
- 3 limiares de C-statistic
- Calibração > discriminação
- Benefício líquido

**6. Comparativo Calculadoras**
- Tabela: PREVENT, PCE, SCORE2, QRISK3, Globorisk-LAC
- Performance e validação LATAM
- ⚠️ Lacuna: ZERO validação brasileira

**7. 🚨 LIMITAÇÕES: Subgrupos de Baixa Performance**
- Jovens 30-39 anos (subestima)
- Homens fumantes (-37%)
- Asiáticos orientais (+72% superestima)
- Diabéticos (discriminação inferior)

**8. 🚨 VARIÁVEIS AUSENTES - IMPACTO DEMONSTRADO**
- CAC (NRI 0.25-0.55) ⭐⭐⭐⭐⭐
- Lp(a) (NRI 21%) ⭐⭐⭐⭐⭐
- PCR-us, História familiar, ApoB, ITB, DHGNA
- Tabela com HR e NRI

**9. 🚨 QUANDO PREVENT SUBESTIMA RISCO**
- HIV (+1.5-2x IAM)
- AR (multiplicador 1.5x)
- LES (até 50x em jovens)
- História obstétrica adversa
- Radioterapia, transplante, HF

**10. QUANDO USAR RECLASSIFICADORES**
- Algoritmo prático 4 etapas
- Ação clínica por CAC (0, 1-99, ≥100, ≥300)
- Lista completa fatores intensificadores

**11. PROBAST + TRIPOD+AI**
- PROBAST: 4 domínios, 20 perguntas
- TRIPOD+AI: 27 itens (supersede 2015)
- Novos: equidade, fairness, ciência aberta

**12. Conclusões & Próximos Passos**
- Validação brasileira urgente
- Recalibração site-específica
- Comparação com Globorisk-LAC

---

## 📚 REFERÊNCIAS TIER-1 ADICIONAIS (LIMITAÇÕES)

### Performance por subgrupos:
1. ASPREE (≥65 anos): JACC Adv. 2025 (C-stat 0.793-0.854)
2. JACC multicêntrico 2025 (subestimação jovens)
3. UK Biobank (368k): melhor mulheres (0.728 vs 0.687)
4. Emirados Árabes (C-index mulheres 0.81-0.82 vs homens 0.70-0.72)

### Variáveis ausentes:
5. CAC meta-análise: NRI 0.200 (JACC 2020)
6. Lp(a): HR 1.88 (Circulation)
7. PCR-us: HR 2.87 (CLEAR-Outcomes)
8. ApoB: Superior LDL-c 9/9 estudos (revisão 2025)

### Condições de subestimação:
9. HIV: ACC review 2018 (1.5-2x IAM)
10. AR: EULAR 2017 (multiplicador 1.5x)
11. LES: PMC review (até 50x risco jovens)
12. Pré-eclâmpsia/DM gestacional: BJOG 2023

### Calculadoras comparativas:
13. QRISK3 vs PREVENT: UK Biobank (C-stat 0.751 vs 0.741)
14. MESA Risk Score com CAC: C-stat 0.80

---

## 🎓 CONTEXTO & PROTOCOLO

### Professor Lucas:
- Cardiologista, Comitê SBC 2025 Dislipidemia
- Foco: GRADE + MBE + contexto brasileiro
- Estilo: dados numéricos, citações exatas, limitações explícitas
- Contexto: SUS + privado; CAC e bempedóico disponíveis

### Protocolo ZERO INVENÇÃO:
- ✅ Citar guidelines IPSIS LITERIS
- ❌ NUNCA parafrasear recomendações
- ✅ Números com fonte primária
- ❌ ZERO exemplos inventados

### 4 THREADS prioritários:
1. CAC como modificador risco ✅ (dados completos)
2. PREVENT vs antigas ✅ (dados completos)
3. SAMS + bempedóico ⏳ (pendente)
4. Metas LDL agressivas ⏳ (pendente)

---

## 🔗 LINKS ÚTEIS

- Repo: https://github.com/lucasmiachon-blip/aulas_core/tree/main/GRADE
- Pesquisa básica PREVENT+GRADE: PESQUISA_PREVENT_GRADE_COMPLETA.md
- Token: /mnt/project/pacote.txt (linha 1)

---

## ✅ STATUS FINAL

**COMPLETO:**
- ✅ Pesquisa tier-1 PREVENT + GRADE
- ✅ Pesquisa tier-1 LIMITAÇÕES (subgrupos, variáveis ausentes, situações clínicas)
- ✅ Comparativo calculadoras
- ✅ PROBAST + TRIPOD+AI
- ✅ Recomendações reclassificadores

**PENDENTE:**
- ⏳ Criar slides HTML com dados
- ⏳ Thread 3: SAMS + bempedóico
- ⏳ Thread 4: Metas LDL agressivas
- ⏳ Grau exato recomendação SBC (forte/fraca + certeza)

**PRONTO PARA:**
- Montar apresentação completa
- Slide de limitações robusto
- Discussão crítica sobre validação brasileira
- Ensino baseado em evidência tier-1

---

**Última atualização:** 18 Jan 2026, 02:30 AM  
**Status:** ✅ RESEARCH COMPLETA - PRONTO PARA SLIDES
