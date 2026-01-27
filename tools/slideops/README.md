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

**⚠️ OBRIGATÓRIO - Quando criares novos slides HTML:**

1. ✅ **SEMPRE adiciona comentário invisível** no início do ficheiro HTML:
   ```html
   <!-- SlideOps: title="Título descritivo do slide" anchor="Referência EBM (opcional)" aiTips="Comentários/boas práticas (opcional)" -->
   ```
   **Sem este comentário (pelo menos o título), o slide aparece sem título no SlideOps!**

2. ✅ Adiciona o slide ao `_list.txt` na posição correta
3. ✅ Garante que o primeiro slide no `_list.txt` é a capa (slide 1)

**Por quê é obrigatório?**
- O SlideOps lê automaticamente esses comentários
- O título aparece automaticamente na tabela
- Sem comentário, o slide fica sem título (vazio)
- Metadados básicos ficam junto com o código (fácil de manter)

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
   - **Lê metadados de comentários HTML invisíveis** (se existirem)
   - Slides existentes são preservados (não perde metadados)

#### Comentários invisíveis nos slides HTML

Podes adicionar comentários HTML nos slides para preencher automaticamente metadados:

**Formato 1 (recomendado - tudo em um comentário):**
```html
<!-- SlideOps: title="Título do Slide" anchor="Referência EBM" aiTips="Comentários/boas práticas da IA sobre este slide" -->
```

**Formato 2 (comentários individuais):**
```html
<!-- title: Título do Slide -->
<!-- anchor: Referência EBM -->
<!-- aiTips: Comentários/boas práticas da IA sobre este slide -->
```

**Campos suportados nos comentários HTML (metadados que vêm do código):**
- `title` - Título curto do slide (aparece automaticamente na tabela)
- `anchor` - Anchor/Referência EBM
- `aiTips` - Comentários/boas práticas da IA sobre o slide

**Metadados editados por VOCÊ no SlideOps (NÃO vêm dos comentários HTML):**
- `p` - **Prioridade** (P0, P1, P2, P3, P4, P5) - você edita no SlideOps
- `state` - Estado (Critical, NeedsFix, Done) - você edita no SlideOps
- `plan` - **Se é hoje/semana** (Today, Tomorrow, ThisWeek, Later) - você edita no SlideOps
- `difficulty` - **Dificuldade** (1-5) - você edita no SlideOps
- `confidence` - **Confiança** (Low, Moderate, High) - você edita no SlideOps
- `checked` - **Checado** (Yes/No) - você edita no SlideOps
- `appraisal` - **Appraisal** (Yes/No) - você edita no SlideOps
- `cogLoad` - Carga cognitiva (Low, Moderate, High) - você edita no SlideOps
- `objective` - Objetivo do slide - você edita no SlideOps
- `narrative` - Narrativa/contexto - você edita no SlideOps
- `myNotes` - Notas pessoais - você edita no SlideOps
- `aiNotes` - Notas para IA - você edita no SlideOps

**Resumo:**
- **Comentários HTML** = apenas `title`, `anchor`, e `aiTips` (comentários/boas práticas)
- **SlideOps (editado por VOCÊ)** = Prioridade, Estado, Plano (hoje/semana), Dificuldade, Confiança, Checado, Appraisal, e todos os outros metadados são editados por você no SlideOps
- Os metadados do SlideOps **não vêm** dos comentários HTML - são criados/editados por você durante a revisão

**Exemplo prático:**
```html
<!-- SlideOps: title="NNT por droga (primária vs secundária)" anchor="NNT=25 (Cochrane 2023)" aiTips="Considerar adicionar gráfico comparativo. Verificar se os dados primários vs secundários estão claros." -->
<section class="slide" data-slide-id="S05">
  <!-- conteúdo do slide -->
</section>
```

Quando importares os slides, o SlideOps vai ler automaticamente esses comentários e preencher os campos!

### 2. Editar metadados

**Metadados que vêm dos comentários HTML (lidos automaticamente):**
- **Título:** Principal identificador do slide (vem do comentário HTML)
- **Anchor:** Referência EBM (vem do comentário HTML)
- **Comentários/Boas práticas:** Dicas e comentários da IA sobre o slide (vem do comentário HTML `aiTips`)

**Metadados criados/editados por VOCÊ no SlideOps (NÃO vêm dos comentários HTML):**
- **P-level (Prioridade):** P0-P5 - você edita no SlideOps
- **Estado:** Critical, NeedsFix, Done - você edita no SlideOps
- **Plano (Se é hoje/semana):** Today, Tomorrow, ThisWeek, Later - você edita no SlideOps
- **Dificuldade:** 1-5 - você edita no SlideOps
- **Confiança:** Low, Moderate, High - você edita no SlideOps
- **Checado:** Yes/No - você edita no SlideOps
- **Appraisal:** Yes/No - você edita no SlideOps
- **Cognitive Load:** Low, Moderate, High - você edita no SlideOps
- **Objective:** Objetivo do slide - você edita no SlideOps
- **Narrative:** Narrativa/contexto - você edita no SlideOps
- **My Notes:** Notas pessoais - você edita no SlideOps
- **AI Notes:** Notas para IA - você edita no SlideOps

**Resumo:** 
- **Comentários HTML** = apenas `title`, `anchor`, e `aiTips` (comentários/boas práticas)
- **SlideOps (editado por VOCÊ)** = Prioridade, Estado, Plano (hoje/semana), Dificuldade, Confiança, Checado, Appraisal, e todos os outros metadados são editados por você no SlideOps durante o processo de revisão

### 3. Sincronizar números e metadados

- Clica em **"Sincronizar números (mantém metadados)"**
- Atualiza os números dos slides existentes baseado no `_list.txt`
- **Lê comentários HTML invisíveis** e atualiza apenas: título, anchor, e comentários/boas práticas (`aiTips`)
- **Preserva todos os outros metadados** editados no SlideOps (P, estado, plan, difficulty, notas, etc.)
- Não cria novos slides
- Garante que a numeração começa em 1 (capa)

**Quando usar:**
- Depois de adicionar/atualizar comentários HTML nos slides
- Depois de atualizar o `_list.txt`
- Para atualizar títulos, anchor e comentários dos comentários HTML

**Como funciona:**
1. Lê o `_list.txt` para obter a ordem atual
2. Para cada slide existente no SlideOps (na ordem atual), lê o ficheiro HTML correspondente
3. Extrai apenas `title`, `anchor`, e `aiTips` dos comentários HTML invisíveis
4. Atualiza apenas esses campos no SlideOps (preserva P, estado, plan, difficulty, notas, etc.)
5. Renumera os slides para serem sequenciais (1, 2, 3...)

**⚠️ IMPORTANTE:** A sincronização assume que a ordem atual dos slides no SlideOps corresponde à ordem do `_list.txt`. Se não corresponder, usa "Importar slides" primeiro.

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
3. **Na apresentação (opcional):** Adiciona/atualiza comentários HTML invisíveis nos slides com metadados
4. **No SlideOps:** Clica em **"Sincronizar números"** para:
   - Atualizar os números baseado no `_list.txt`
   - Ler e atualizar metadados dos comentários HTML (título, P, estado, etc.)
   - Preservar metadados que não estão nos comentários HTML (notas, etc.)

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

## Procedimento recomendado para novas vezes

### Primeira vez (criar slides do zero):

1. **Criar slides HTML** com comentários invisíveis:
   ```html
   <!-- SlideOps: title="Título do Slide" anchor="Referência EBM (opcional)" aiTips="Comentários/boas práticas (opcional)" -->
   <section class="slide" data-slide-id="S05">
     <!-- conteúdo -->
   </section>
   ```

2. **Adicionar ao `_list.txt`** na posição correta (garantir que linha 1 = capa)

3. **No SlideOps:** Clica em **"Importar slides da apresentação"**
   - Cria todos os slides
   - Lê automaticamente os comentários HTML e preenche títulos/metadados

### Próximas vezes (atualizar slides existentes):

1. **Adicionar/atualizar comentários HTML** nos slides existentes
2. **Atualizar `_list.txt`** se reordenaste/apagaste slides
3. **No SlideOps:** Clica em **"Sincronizar números (mantém metadados)"**
   - Atualiza números baseado no `_list.txt`
   - **Lê comentários HTML e atualiza títulos/metadados**
   - Preserva notas e outros metadados que não estão nos comentários

### Se os títulos não aparecerem:

- Verifica se os comentários HTML estão no formato correto
- Verifica se o `_list.txt` está atualizado
- Usa "Importar slides" novamente (vai preservar slides existentes, mas atualizar metadados)

## Como criar slides com metadados automáticos

Quando criares novos slides HTML, adiciona comentários invisíveis para preencher automaticamente no SlideOps:

### Exemplo completo:

```html
<!-- SlideOps: title="NNT por droga (primária vs secundária)" anchor="NNT=25 (Cochrane 2023)" aiTips="Considerar adicionar gráfico comparativo. Verificar se os dados primários vs secundários estão claros." -->
<section class="slide" data-slide-id="S05">
  <h2>NNT por droga</h2>
  <!-- conteúdo do slide -->
</section>
```

### Boas práticas:

1. **Sempre adiciona o título** - é o principal identificador e aparece automaticamente no SlideOps
2. **Adiciona anchor** - se houver referência EBM importante
3. **Adiciona aiTips** - comentários/boas práticas sobre o slide (opcional, mas recomendado)
4. **Nota importante:** Prioridade (P), Estado, Plano (hoje/semana), Dificuldade, Confiança, Checado e Appraisal são editados por VOCÊ no SlideOps, não vêm dos comentários HTML

### Fluxo recomendado:

1. **Criar slide HTML** → adiciona comentário com metadados
2. **Adicionar ao `_list.txt`** → na posição correta
3. **No SlideOps:** "Importar slides" (primeira vez) ou "Sincronizar números" (atualizações)
4. **Resultado:** Título e metadados aparecem automaticamente no SlideOps

### Onde colocar o comentário:

- **No início do ficheiro HTML**, antes do `<section>`
- **Ou no início do `<section>`**, logo após a tag de abertura
- O SlideOps procura em todo o ficheiro, mas o início é mais claro

### Vantagens:

- ✅ Não precisa preencher manualmente no SlideOps
- ✅ Metadados ficam junto com o código do slide
- ✅ Fácil de manter e atualizar
- ✅ Comentários são invisíveis na apresentação

## Notas para desenvolvimento

- O SlideOps precisa de servidor HTTP (não funciona com `file://`)
- Usa `fetch()` para ler `_list.txt` e ficheiros HTML (tenta múltiplos caminhos)
- Metadados são sempre preservados durante sincronização
- A ordem é sempre controlada pelo `_list.txt`, não pelo SlideOps
- **A numeração sempre começa em 1, onde 1 = capa**
- Comentários HTML são opcionais - se não existirem, usa valores padrão
