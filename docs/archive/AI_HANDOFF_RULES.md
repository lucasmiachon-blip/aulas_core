# Regras de Handoff para IAs

**Objetivo:** Economizar tokens e manter contexto eficiente.

## ✅ SEMPRE faça:

1. **Leia STATUS.md primeiro** (200 tokens)
   - Não leia CHANGELOG completo
   - Só veja última entrada se necessário

2. **Handoffs curtos** (máx 1000 palavras)
   - Use template em HANDOFF-TEMPLATE.md
   - Detalhes técnicos → CHANGELOG.md

3. **Atualize STATUS.md ao final**
   - ✅ Completo → [nova tarefa]
   - ⏳ Em Andamento → [atualizar]

## ❌ NUNCA faça:

1. Reescrever histórico completo
2. Repetir comandos já documentados
3. Listar todos os arquivos modificados

## 📏 Limites:

- Handoff: 1000 palavras
- Output em conversa: 50 linhas (resto vai para arquivo)
- Análises: Só top 5 itens críticos

## 🔄 Fluxo de sessão:

1. **Início:** Ler `STATUS.md` + último handoff
2. **Durante:** Trabalhar nas tarefas
3. **Fim:** Criar handoff curto usando template
4. **Atualizar:** `STATUS.md` com novo status

## 📋 SlideOps - Regras Importantes:

**⚠️ CRÍTICO - OBRIGATÓRIO:** Quando criares novos slides HTML:

1. ✅ **SEMPRE adiciona comentário invisível** com metadados no início do ficheiro HTML:
   ```html
   <!-- SlideOps: title="Título do Slide" anchor="Referência EBM (opcional)" aiTips="Comentários/boas práticas (opcional)" -->
   <section class="slide" data-slide-id="S05">
     <!-- conteúdo -->
   </section>
   ```
   **Formato completo recomendado:**
   ```html
   <!-- SlideOps: title="Título descritivo do slide" anchor="NNT=25 (Cochrane 2023)" aiTips="Considerar adicionar gráfico. Verificar clareza dos dados." -->
   ```

2. ✅ Adiciona o slide ao `_list.txt` na posição correta
3. ✅ Garante que o primeiro slide no `_list.txt` é a capa (slide 1)

**Por quê comentários invisíveis são OBRIGATÓRIOS?**
- O SlideOps lê automaticamente esses comentários ao importar/sincronizar
- O **título** aparece automaticamente na tabela do SlideOps (sem isso, fica vazio)
- Não precisa preencher manualmente metadados básicos
- Metadados ficam junto com o código do slide (fácil de manter)
- **Sem comentários, o slide aparece sem título no SlideOps**

**Campos dos comentários HTML vs Metadados do SlideOps:**
- **Comentários HTML:** `title`, `anchor`, `aiTips` (comentários/boas práticas) - apenas estes 3 campos vêm do HTML
- **SlideOps (editado manualmente):** `p`, `state`, `plan`, `difficulty`, `objective`, `narrative`, `myNotes`, `aiNotes`, `confidence`, `cogLoad`, `checked`, `appraisal` - todos os outros são editados no SlideOps

**Quando fizeres mudanças nos slides (apagar, reordenar, renomear):**
1. ✅ Atualiza os ficheiros HTML
2. ✅ **SEMPRE atualiza o `_list.txt`** (GRADE/src/slides/_list.txt ou OSTEOPOROSE/src/slides/_list.txt)
3. ✅ Para apagar: move o slide para `archive/` na apresentação (pode ser restaurado depois)
4. ✅ O **título** é o principal identificador para matching de metadados no SlideOps
5. ✅ A ordem dos slides é controlada pelo `_list.txt`, não pelo SlideOps

**Ver:** `tools/slideops/README.md` para detalhes completos sobre comentários invisíveis e numeração.
