# SlideOps

Ferramenta para gestão e auditoria de slides das apresentações (GRADE, OSTEOPOROSE).

## ⚠️ IMPORTANTE: Numeração dos Slides

**A numeração dos slides começa em 1, onde o slide 1 é sempre a CAPA da apresentação.**

### Regra de Numeração:

- **Slide 1 = Capa** (primeiro slide do `_list.txt`)
- **Slide 2 = Segundo slide** (segunda linha do `_list.txt`)
- **Slide 3 = Terceiro slide** (terceira linha do `_list.txt`)
- E assim por diante...

**A ordem é controlada pelo `_list.txt` da apresentação, não pelo SlideOps.**

### Regra de Ouro para Agentes IA:

**Quando fizeres mudanças nos slides (apagar, reordenar, renomear):**
1. ✅ Atualiza os ficheiros HTML dos slides
2. ✅ **SEMPRE atualiza o `_list.txt`** para refletir a nova ordem
3. ✅ Garante que o primeiro slide no `_list.txt` é a capa (slide 1)
4. ✅ Depois, no SlideOps: usa "Sincronizar números" para atualizar os números no SlideOps

### Por quê?

- O SlideOps lê a ordem do `_list.txt` quando importa slides
- A posição no `_list.txt` = número do slide (linha 1 = slide 1 = capa)
- O título do slide é o principal identificador/balizador para os metadados
- Se mudares a ordem nos ficheiros HTML mas não atualizares o `_list.txt`, a sincronização vai dar errado

## Como usar

### 1. Importar slides da apresentação

1. Abre `SlideOps.html` no Chrome/Edge (precisa de servidor HTTP, não `file://`)
2. Seleciona o deck (GRADE ou OSTEOPOROSE)
3. Clica em **"Importar slides da apresentação"**
   - Lê automaticamente o `_list.txt` da apresentação
   - Cria slides no SlideOps com números corretos (1 = capa, 2, 3, 4...)
   - Slides existentes são preservados (não perde metadados)

### 2. Editar metadados

- **Título:** Principal identificador do slide (usado para matching)
- **P-level:** Prioridade (P0-P5)
- **Estado:** Critical, NeedsFix, Done
- **Notas:** Objective, Narrative, My Notes, AI Notes
- **Outros:** Difficulty, Confidence, Cognitive Load, etc.

### 3. Sincronizar números

- Clica em **"Sincronizar números (mantém metadados)"**
- Atualiza apenas os números dos slides existentes baseado no `_list.txt`
- **Preserva todos os metadados** (P, estado, notas, etc.)
- Não cria novos slides
- Garante que a numeração começa em 1 (capa)

### 4. Apagar slides

- **Não há botão de deletar no SlideOps**
- Para apagar: move o slide para a pasta `archive/` na apresentação
- Depois sincroniza: "Sincronizar números" atualiza o SlideOps automaticamente
- Slides em `archive/` podem ser restaurados depois se necessário

## Sincronização com ficheiros HTML

### Quando reordenas/apagas slides nos ficheiros HTML:

1. **Na apresentação:** Move slides para `archive/` se quiseres apagar (podes restaurar depois)
2. **Na apresentação:** Atualiza o `_list.txt` para refletir a nova ordem
   - **IMPORTANTE:** Garante que a primeira linha é a capa (slide 1)
3. **No SlideOps:** Clica em **"Sincronizar números"** para atualizar os números baseado no `_list.txt`
   - Preserva todos os metadados (P, estado, notas, etc.)
   - Apenas atualiza os números dos slides

### Sincronização bidirecional (SlideOps → HTML):

1. **No SlideOps:** Reordena/apaga → renumerar automaticamente
2. **No SlideOps:** Backup → **"Exportar plano de sincronização"** → gera `slideops_sync_plan.json`
3. **No terminal:** `node scripts/sync-slides-from-slideops.js`
   - Renomeia ficheiros HTML para refletir nova ordem (S01.html, S02.html, S03...)
   - Atualiza `_list.txt` com nova ordem

**⚠️ ATENÇÃO:** Se mudares ficheiros HTML diretamente, também atualiza o `_list.txt` manualmente!

## Changelog

A aba **Changelog** registra todas as mudanças feitas nos slides:

- **Por dia:** Agrupa todas as mudanças por data (mais recente primeiro)
- **Por slide:** Histórico sequencial de cada slide (mais antigo → mais recente)

Todas as mudanças são registradas automaticamente quando editas slides.

## Sync entre computadores

### Opção 1: JSON vinculado (recomendado)

1. Backup → **"Abrir JSON existente"** → seleciona ficheiro no OneDrive/Dropbox
2. Marca **"Auto-salvar"**
3. Todas as mudanças são salvas automaticamente no JSON
4. No outro PC: abre o mesmo ficheiro JSON

### Opção 2: Exportar/Importar manual

1. Backup → **"Baixar JSON"** (exporta)
2. No outro PC: Backup → **"Importar"** (importa)

## Estrutura de dados

- **Key:** `{deck}#{num}` (ex: `GRADE#1`, `OSTEO#5`)
- **Número:** Vem da ordem no `_list.txt` (posição na lista = número do slide)
  - Linha 1 do `_list.txt` = slide 1 (capa)
  - Linha 2 do `_list.txt` = slide 2
  - E assim por diante...
- **Título:** Principal identificador para matching de metadados

## Notas para desenvolvimento

- O SlideOps precisa de servidor HTTP (não funciona com `file://`)
- Usa `fetch()` para ler `_list.txt` (tenta múltiplos caminhos)
- Metadados são sempre preservados durante sincronização
- A ordem é sempre controlada pelo `_list.txt`, não pelo SlideOps
- **A numeração sempre começa em 1, onde 1 = capa**
