# 🔄 HANDOFF PARA PRÓXIMO CHAT
**Data:** 18 Janeiro 2026, 02:00 AM  
**Sessão anterior:** Pesquisa completa PREVENT + GRADE

---

## 📍 ONDE ESTAMOS

### ✅ CONCLUÍDO

1. **Pesquisa tier-1 completa** sobre:
   - Diretriz SBC 2025 (recomendação PREVENT)
   - GRADE para modelos prognósticos (Papers 2, 8, 28)
   - Comparativo calculadoras (PREVENT, PCE, SCORE2, QRISK3, Globorisk-LAC)
   - PROBAST (checklist risco de viés)
   - TRIPOD+AI (novo padrão reporte 2024)

2. **Arquivo commitado no GitHub:**
   - 📄 `PESQUISA_PREVENT_GRADE_COMPLETA.md`
   - Link: https://github.com/lucasmiachon-blip/aulas_core/blob/main/GRADE/PESQUISA_PREVENT_GRADE_COMPLETA.md

3. **Achado CRÍTICO identificado:**
   - ⚠️ **ZERO validação do PREVENT em população latino-americana/brasileira**
   - Evidência de superestimação de modelos US em LATAM (PURE-Colômbia: 46-71%)
   - Alternativa: Globorisk-LAC (calibrado para região)

---

## 🎯 O QUE FAZER AGORA

### Objetivo do Professor Lucas
> "Criar apresentação sobre metodologia GRADE (Core GRADE + GRADEs adicionais)"

### 4 THREADS prioritários (30 dias):
1. **CAC** (escore de cálcio coronariano) como modificador risco
2. **PREVENT** vs calculadoras antigas + impacto clínico
3. **SAMS** + ácido bempedóico
4. **Metas LDL-C agressivas** + segurança de LDL muito baixo

### Status dos slides:
- ✅ **Slide de Recomendações:** PERFEITO (Professor disse para não mexer)
- ⏳ **Demais slides:** Precisam ser criados/ajustados com dados da pesquisa

---

## 📂 ARQUIVOS IMPORTANTES NO GITHUB

### Estrutura atual:
```
/GRADE/
├── ATUALIZ_CLAUDE_ROLE.md          # Protocolo ZERO INVENÇÃO para congressos
├── RECURSOS_GRADE_PREVENT.md       # Recursos iniciais (agora supersedido)
├── PROMPT_PARA_CURSOR.md           # Instruções para Cursor committar
├── PESQUISA_PREVENT_GRADE_COMPLETA.md  # ← ARQUIVO PRINCIPAL (NOVO)
└── HANDOFF_PROXIMO_CHAT.md         # Este arquivo
```

### Repositório:
```
https://github.com/lucasmiachon-blip/aulas_core
```

### Token GitHub:
Disponível em `/mnt/project/pacote.txt` (primeira linha)

### Método de commit (git não funciona via proxy):
```bash
TOKEN="[ver pacote.txt]"
CONTENT=$(base64 -w 0 arquivo.md)
curl -X PUT \
  -H "Authorization: token $TOKEN" \
  https://api.github.com/repos/lucasmiachon-blip/aulas_core/contents/GRADE/arquivo.md \
  -d '{"message":"mensagem commit","content":"'$CONTENT'"}'
```

---

## 🔍 DADOS-CHAVE PARA SLIDES

### 1. Recomendação SBC 2025 (textual)
> "A diretriz recomenda o escore PREVENT como ferramenta preferencial para estimar o risco de eventos cardiovasculares ateroscleróticos em 10 anos e até 30 anos, para indivíduos entre 30-79 anos, em prevenção primária."

**NOTA:** Não achamos o grau EXATO (forte/fraca) e certeza (alta/moderada/baixa). Professor disse que é FORTE com ALTA certeza, mas precisaria confirmar no PDF completo da diretriz.

### 2. GRADE para prognósticos - DIFERENÇA CRÍTICA
> "Evidência observacional para questões prognósticas INICIA como ALTA certeza (diferente de intervenções que começam BAIXA)"

### 3. Papers GRADE essenciais:
- **Paper #28 (2020):** Fatores prognósticos - 5 domínios
- **Paper #2 (2022):** Calibração - O/E ratio, 4 conceitos inovadores
- **Paper #8 (2024):** Discriminação - C-statistic, 3 limiares

### 4. Tabela comparativa calculadoras
| Calculadora | N derivação | C-stat | Validação LATAM |
|-------------|-------------|--------|-----------------|
| PREVENT | 6,6M | 0.73-0.89 | ❌ Inexistente |
| PCE | 48k | 0.73-0.78 | Superestima 46-71% |
| Globorisk-LAC | 21k | 0.70-0.74 | ✅ Desenvolvido para LATAM |

### 5. PROBAST
- 4 domínios, 20 perguntas
- Julgamento: Baixo/Alto/Incerto

### 6. TRIPOD+AI (2024)
- Supersede TRIPOD 2015
- 27 itens (52 subitens)
- Novos: equidade, fairness, ciência aberta

---

## ⚠️ PROTOCOLO CRÍTICO

### ZERO INVENÇÃO para congressos
Do arquivo `ATUALIZ_CLAUDE_ROLE.md`:

**REGRAS:**
- ✅ SEMPRE citar guidelines IPSIS LITERIS
- ❌ NUNCA parafrasear recomendações
- ✅ TODOS números com fonte primária
- ❌ ZERO exemplos clínicos inventados
- ✅ Se fonte não encontrada → EXPLICITAR

### Checklist pré-commit:
- [ ] Recomendações têm fonte tier-1?
- [ ] Números citados com estudo + ano?
- [ ] GRADE concepts dos papers oficiais?
- [ ] Zero invenção de exemplos?

---

## 💡 PRÓXIMOS PASSOS SUGERIDOS

### Opção A: Criar estrutura dos slides
Usando a pesquisa completa, montar:
1. Slide GRADE para prognósticos (conceitos dos 3 papers)
2. Slide comparativo calculadoras (com lacuna LATAM destacada)
3. Slide PROBAST + TRIPOD+AI
4. Slide limitações PREVENT para Brasil

### Opção B: Buscar grau exato SBC 2025
Tentar acessar PDF completo da diretriz para encontrar:
- Grau de recomendação exato (forte/fraca)
- Certeza da evidência exata (alta/moderada/baixa)
- Seção/página específica

### Opção C: Expandir threads prioritários
Pesquisar especificamente:
- CAC + reclassificação de risco
- SAMS + bempedóico (evidência CLEAR Outcomes)
- Metas LDL <40 mg/dL (segurança)

---

## 📊 REFERÊNCIAS TIER-1 PRONTAS

Todas no arquivo `PESQUISA_PREVENT_GRADE_COMPLETA.md`:

1. Khan SS et al. Circulation. 2024 (PREVENT)
2. Foroutan et al. JCE 2020;121:62-70 (GRADE #28)
3. Foroutan et al. JCE 2022;143:202-211 (GRADE #2)
4. Foroutan et al. JCE 2024;170:111344 (GRADE #8)
5. Wolff et al. Ann Intern Med. 2019 (PROBAST)
6. Collins et al. BMJ. 2024 (TRIPOD+AI)
7. Rached FH et al. ABC 2025 (Diretriz SBC)
8-10. Validações externas

---

## 🎓 CONTEXTO DO PROFESSOR

### Perfil:
- Cardiologista brasileiro
- Comitê SBC 2025 (dislipidemia)
- Educador clínico (residentes)
- Foco: GRADE + MBE + contexto brasileiro
- Ênfase: Transparência de incerteza

### Estilo preferido:
- ✅ Dados numéricos concretos
- ✅ Português brasileiro
- ✅ Citações exatas (não paráfrase)
- ✅ Comparações quantitativas
- ✅ Limitações explícitas
- ❌ Overpromise de certeza
- ❌ Paternalismo médico
- ❌ Esconder incertezas

### Contexto clínico:
- Sistema: SUS + privado
- Disponível: CAC, ácido bempedóico
- Indisponível: PCSK9i no SUS
- População: Brasileira (miscigenada, ≠ categorias raciais US)

---

## 🔗 LINKS ÚTEIS

- Repo GitHub: https://github.com/lucasmiachon-blip/aulas_core
- Pesquisa completa: https://github.com/lucasmiachon-blip/aulas_core/blob/main/GRADE/PESQUISA_PREVENT_GRADE_COMPLETA.md
- Protocolo zero-invenção: https://github.com/lucasmiachon-blip/aulas_core/blob/main/GRADE/ATUALIZ_CLAUDE_ROLE.md

---

## ✅ RESUMO EXECUTIVO

**O que temos:**
- ✅ Pesquisa tier-1 completa (até jan 2026)
- ✅ 3 papers GRADE prognósticos lidos
- ✅ Comparativo 5 calculadoras
- ✅ PROBAST e TRIPOD+AI documentados
- ✅ Achado crítico: ausência validação LATAM

**O que falta:**
- ⏳ Grau exato recomendação SBC (forte/fraca + certeza)
- ⏳ Criar slides com dados da pesquisa
- ⏳ Desenvolver threads 1, 3, 4 (CAC, SAMS, metas LDL)

**Prioridade imediata:**
Aguardar direção do Professor Lucas sobre:
1. Começar slides com dados atuais?
2. Buscar grau exato SBC antes?
3. Expandir para threads específicos?

---

**Última atualização:** 18 Jan 2026, 02:00 AM  
**Status:** ✅ PRONTO PARA CONTINUAR
