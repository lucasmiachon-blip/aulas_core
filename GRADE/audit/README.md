# AUDITORIA AULA GRADE - ChatGPT Pro

## 📋 Visão Geral

Este diretório contém todos os documentos necessários para a **auditoria completa** da Aula GRADE por parte do ChatGPT Pro.

**Data:** 2026-01-18  
**Projeto:** aulas_core  
**Aula:** GRADE (Classificação de Evidências)  
**Total de slides:** 41  
**Foco principal:** Slides 15-20 (recém ajustados)

---

## 📁 Arquivos Incluídos

### 1. `AUDIT_PROMPT.md`
**O QUE É:** Prompt completo com todas as instruções para o ChatGPT Pro  
**USO:** Copie e cole este arquivo INTEIRO no ChatGPT Pro como primeira mensagem  
**CONTEÚDO:**
- Definição do papel do auditor
- Tarefas específicas (5 tarefas principais)
- Formato de resposta esperado
- Checklist de qualidade
- Próximos passos

### 2. `AUDIT_SLIDES.md`
**O QUE É:** Análise detalhada de TODOS os 41 slides  
**USO:** Documento de referência para análise slide por slide  
**CONTEÚDO:**
- Resumo executivo com métricas
- Detalhamento completo de cada slide:
  - Número de caracteres
  - Itens de lista
  - Imagens
  - Conteúdo textual
  - Estilos CSS
- Templates para preenchimento de análise

### 3. `REFERENCIAS_GRADE.md`
**O QUE É:** Todas as referências bibliográficas oficiais do GRADE  
**USO:** Base para validação de conteúdo médico  
**CONTEÚDO:**
- 4 artigos fundamentais (obrigatórios)
- Série completa de guidelines GRADE
- Links para documentação oficial
- Estratégias de busca para atualizações
- Checklist de validação

### 4. `README.md` (este arquivo)
**O QUE É:** Instruções de uso  
**USO:** Guia para o processo de auditoria

---

## 🚀 Como Usar (Passo a Passo)

### PASSO 1: Preparar ChatGPT Pro

1. Abra uma nova conversa no ChatGPT Pro
2. Cole o conteúdo COMPLETO de `AUDIT_PROMPT.md`
3. Anexe os seguintes arquivos:
   - `AUDIT_SLIDES.md`
   - `REFERENCIAS_GRADE.md`

### PASSO 2: ChatGPT Pro Executa Tarefas

O ChatGPT Pro deve executar **nesta ordem**:

#### TAREFA 1: Buscar Atualizações (jan/2026)
- Usar **web_search** para verificar:
  - Mudanças na metodologia GRADE (2024-2026)
  - Novos guidelines oficiais
  - Atualizações em critérios
  - Novos símbolos/nomenclatura

#### TAREFA 2: Validar Contra Referências
- Comparar conteúdo dos slides com artigos fundamentais
- Verificar alinhamento conceitual
- Identificar erros ou desatualizações

#### TAREFA 3: Auditar Visual + Conteúdo
Para cada slide (foco em 15-20):
- **Densidade:** Número de caracteres adequado?
- **Distribuição:** Layout equilibrado?
- **Tipografia:** Legível e hierárquico?
- **Legibilidade:** Listas, parágrafos, espaçamento OK?
- **Conteúdo médico:** Preciso e atualizado?

#### TAREFA 4: Acessar Repositório
- URL: https://github.com/lucasmiachon-blip/aulas_core
- Visualizar: `GRADE/src/index.html`
- Usar GitHub viewer ou baixar para análise local

#### TAREFA 5: Gerar Relatório
Usar o formato especificado em `AUDIT_PROMPT.md`:
```markdown
## SLIDE [número]: [título]
### ✅ APROVAÇÕES
### ⚠️ PROBLEMAS IDENTIFICADOS
### 💡 SUGESTÕES ESPECÍFICAS
### 🎯 STATUS
```

### PASSO 3: Receber Resultado

O ChatGPT Pro deve retornar:

1. **Relatório por slide** (especialmente slides 15-20)
2. **Checklist final** preenchido
3. **Status geral:**
   - ✅ APROVADO
   - ⚠️ APROVADO COM RESSALVAS
   - ❌ REPROVADO

### PASSO 4: Ações Baseadas no Resultado

#### SE APROVADO ✅
- Claude Técnico faz deploy final
- Projeto vai para produção

#### SE APROVADO COM RESSALVAS ⚠️
- Claude Técnico faz ajustes técnicos
- ChatGPT Pro valida novamente (rápido)

#### SE REPROVADO ❌
- Claude Conteúdo corrige conteúdo médico
- Claude Técnico corrige layout/estrutura
- Nova auditoria completa

---

## 📊 Critérios de Avaliação

### CONTEÚDO MÉDICO (40%)
- Alinhamento com GRADE oficial
- Precisão conceitual
- Atualização (jan/2026)
- Exemplos apropriados

### DISTRIBUIÇÃO VISUAL (30%)
- Equilíbrio espacial
- Densidade adequada
- Uso eficiente do espaço
- Hierarquia visual

### TIPOGRAFIA (20%)
- Legibilidade
- Contraste
- Tamanhos apropriados
- Hierarquia textual

### PEDAGOGIA (10%)
- Adequação ao público (residentes)
- Progressão lógica
- Clareza didática
- Objetivos de aprendizagem

---

## 🎯 Foco Especial: Slides 15-20

Estes slides foram recentemente ajustados e requerem atenção especial:

### O que verificar:
- ✅ Slide 14 foi eliminado?
- ✅ Slide 21 movido para posição 14?
- ✅ Slides 15-20 com paleta atualizada?
- ✅ Estilos consistentes?
- ✅ Distribuição melhorada vs versão anterior?

---

## 📈 Métricas de Referência

### Densidade de Caracteres (ideal)
- **Slide simples:** 300-500 caracteres
- **Slide médio:** 500-800 caracteres
- **Slide denso:** 800-1200 caracteres
- **ALERTA:** >1500 caracteres (considerar dividir)

### Listas
- **Ideal:** 3-7 itens
- **ALERTA:** >10 itens (considerar dividir)

### Tipografia
- **H1:** Principal (título do slide)
- **H2:** Subtítulos/seções
- **H3:** Sub-seções (se necessário)
- **Texto:** Corpo principal
- **Contraste mínimo:** 4.5:1 (WCAG AA)

---

## 🔗 Links Úteis

### Repositório
- **GitHub:** https://github.com/lucasmiachon-blip/aulas_core
- **Pasta GRADE:** /GRADE/src/

### Referências GRADE
- **GRADE Working Group:** https://www.gradeworkinggroup.org
- **GRADEpro:** https://www.gradepro.org
- **Handbook:** https://gdt.gradepro.org/app/handbook/handbook.html

### Artigos Principais
1. Guyatt 2008: https://www.bmj.com/content/336/7650/924
2. Balshem 2011: PubMed 21208779
3. Andrews 2013: PubMed 23312392

---

## ⚠️ IMPORTANTE

### O QUE o ChatGPT Pro DEVE fazer:
✅ Validar conteúdo médico  
✅ Sugerir melhorias de layout  
✅ Avaliar densidade e legibilidade  
✅ Verificar atualizações (jan/2026)  
✅ Aprovar/reprovar cada slide  

### O QUE o ChatGPT Pro NÃO deve fazer:
❌ Modificar HTML/CSS diretamente  
❌ Criar conteúdo médico novo  
❌ Fazer commits no GitHub  
❌ Alterar arquivos do projeto  

---

## 📞 Fluxo de Trabalho

```
1. Lucas → Solicita auditoria
2. Claude Técnico → Gera documentos (este pacote)
3. Lucas → Entrega para ChatGPT Pro
4. ChatGPT Pro → Executa auditoria completa
5. ChatGPT Pro → Retorna relatório
6. Lucas → Analisa resultado
7a. Se APROVADO → Claude Técnico faz deploy
7b. Se RESSALVAS → Claude Técnico ajusta
7c. Se REPROVADO → Claude Conteúdo + Claude Técnico corrigem
8. (Se necessário) → Nova auditoria
```

---

## 📝 Template de Resposta Esperada

```markdown
# RELATÓRIO DE AUDITORIA - AULA GRADE
## ChatGPT Pro | [Data]

### RESUMO EXECUTIVO
- Total de slides auditados: 41
- Slides com foco especial: 15-20
- Buscas realizadas: [lista]
- Status geral: [APROVADO/RESSALVAS/REPROVADO]

### ATUALIZAÇÕES ENCONTRADAS (jan/2026)
[Resultados das buscas web]

### AUDITORIA POR SLIDE

#### SLIDE 1: [título]
...

#### SLIDE 15: [título]
[Análise detalhada]
...

### CHECKLIST FINAL
[Checklist preenchido]

### RECOMENDAÇÃO FINAL
[Aprovação, ressalvas ou reprovação com justificativa]

### PRÓXIMOS PASSOS
[Ações recomendadas]
```

---

**Boa auditoria! 🎯**

---

**Criado por:** Claude Técnico  
**Data:** 2026-01-18  
**Projeto:** aulas_core  
**Versão:** 1.0
