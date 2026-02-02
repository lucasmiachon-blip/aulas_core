# 🔍 DIAGNÓSTICO DO PROJETO OSTEOPOROSE
## Cole este prompt no Cursor para analisar o estado atual

---

## PROMPT 1: Análise Completa (COLAR PRIMEIRO)

```
Você é um engenheiro frontend sênior fazendo auditoria de um projeto existente.

TAREFA: Analisar o projeto OSTEOPOROSE e gerar relatório de estado.

⚠️ REGRAS:
- NÃO modifique NADA
- Apenas LEIA e REPORTE
- Seja específico sobre o que existe

EXECUTAR NA ORDEM:

1. ESTRUTURA
   Liste todos os arquivos em OSTEOPOROSE/ (recursivo, apenas nomes)

2. CSS - VARIÁVEIS
   Mostre o conteúdo de :root em base.css (ou arquivo equivalente de variáveis)

3. CSS - COMPONENTES
   Liste todas as classes CSS definidas (apenas os nomes, agrupados por arquivo)

4. SLIDES
   - Quantos slides existem em src/slides/?
   - Liste os arquivos com seus tamanhos
   - Mostre a estrutura HTML do slide-01 como exemplo

5. JAVASCRIPT
   - Liste os arquivos JS e suas funções exportadas
   - O navigation.js está funcional?

6. DEPENDÊNCIAS
   - Existe package.json? Mostre as dependências
   - Quais scripts de build existem?

7. ESTADO DO INDEX.HTML
   - Quantas linhas tem?
   - Os slides estão inline ou carregados via JS?
   - Tem erros de sintaxe HTML?

8. PROBLEMAS IDENTIFICADOS
   Liste qualquer problema que encontrar:
   - Código duplicado
   - Variáveis hardcoded
   - Arquivos órfãos
   - Inconsistências

FORMATO DO RELATÓRIO:
Gere um relatório estruturado com cada seção acima.
Use ✅ para ok, ⚠️ para atenção, ❌ para problema.
```

---

## PROMPT 2: Estado dos Slides (COLAR DEPOIS)

```
TAREFA: Mapear o conteúdo atual de todos os slides.

Para cada slide existente em src/slides/, extraia:
1. Número do slide
2. Título (se houver)
3. Tipo de layout (title/content/data/etc)
4. Tem referência/fonte? (Sim/Não)
5. Tem dados numéricos? (Sim/Não)
6. Estado visual (completo/incompleto/placeholder)

FORMATO:
Gere uma tabela markdown com essas colunas.

Exemplo:
| # | Título | Tipo | Fonte | Dados | Estado |
|---|--------|------|-------|-------|--------|
| 1 | Capa | title | N/A | Não | ✅ Completo |
| 2 | Epidemiologia | data | ⚠️ Falta | Sim | ⚠️ Refinar |
```

---

## PROMPT 3: Auditoria de Consistência (COLAR DEPOIS)

```
TAREFA: Verificar consistência do código.

CHECKLIST:

1. CORES
   □ Todas as cores usam variáveis CSS?
   □ Buscar por cores hardcoded: grep -r "#[0-9a-fA-F]" src/css/
   □ Listar cores encontradas fora de :root

2. TIPOGRAFIA
   □ Fontes definidas em variáveis?
   □ Tamanhos usam escala definida?
   □ Buscar por font-size hardcoded

3. ESPAÇAMENTO
   □ Usa sistema de spacing (space-1, space-2...)?
   □ Buscar por margin/padding hardcoded

4. NOMENCLATURA
   □ Classes seguem BEM?
   □ Identificar classes fora do padrão

5. DUPLICAÇÃO
   □ Código CSS repetido entre arquivos?
   □ Classes com mesmo propósito mas nomes diferentes?

RELATÓRIO:
Para cada item, reporte:
- Status (✅/⚠️/❌)
- Exemplos específicos de problemas
- Sugestão de correção
```

---

## PROMPT 4: Verificar Fontes/Referências Médicas

```
TAREFA: Auditar referências médicas nos slides.

Para cada slide:
1. Há afirmações factuais/dados?
2. Tem citação de fonte?
3. A fonte está completa (autor, ano, journal)?

GERAR:
Lista de slides que precisam de fonte
Lista de fontes já citadas no projeto

FORMATO:
## Slides SEM fonte (precisam adicionar)
- Slide X: "[afirmação que precisa de fonte]"

## Fontes já citadas
- [Lista de referências encontradas]

## Recomendação
- Quais slides são prioridade para adicionar referência?
```

---

## DEPOIS DE RODAR OS PROMPTS

Me envie:
1. O relatório do Prompt 1 (estrutura geral)
2. A tabela do Prompt 2 (estado dos slides)
3. Principais problemas encontrados

Com isso, vou criar prompts ESPECÍFICOS para refinar o que já existe, sem quebrar nada.

---

*Use estes prompts no Cursor (Ctrl+L)*
*Aguarde cada um completar antes do próximo*
