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
