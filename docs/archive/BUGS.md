# 🐛 BUGS CONHECIDOS - GRADE MVP

**Última atualização:** 22 Janeiro 2026  
**Status geral:** 4 bugs ativos

---

## 🔴 P0 (CRÍTICO - corrigir HOJE)

### Bug #1: Capa invisível (S01)
**Arquivo:** GRADE/src/slides/S01.html  
**Problema:** Texto "Diretriz Brasileira..." usa navy sobre navy (invisível)  
**Solução:** Mudar para color: var(--gold) ou ar(--text)  
**Tempo estimado:** 5 min  
**Status:** 🔴 ABERTO

---

## 🟡 P1 (IMPORTANTE - corrigir esta semana)

### Bug #2: Símbolos inconsistentes
**Arquivos:** Vários slides  
**Problema:** Alguns usam ⊙ ao invés de ⊕  
**Solução:** Substituir todos por ⊕ (correto)  
**Tempo estimado:** 15 min  
**Status:** 🟡 ABERTO

### Bug #3: Validação dos 45 slides
**Problema:** Não sabemos se todos abrem no viewer  
**Solução:** Abrir cada slide 1 por 1, anotar problemas  
**Tempo estimado:** 1h  
**Status:** 🟡 ABERTO

---

## 🟢 P2 (NICE TO HAVE - quando sobrar tempo)

### Bug #4: Transições entre slides
**Problema:** Mudança de slide é abrupta  
**Solução:** Adicionar 	ransition: opacity 300ms  
**Tempo estimado:** 30 min  
**Status:** 🟢 BACKLOG

---

## 📊 ESTATÍSTICAS

- **Total de bugs:** 4
- **P0 (crítico):** 1
- **P1 (importante):** 2
- **P2 (backlog):** 1
- **Taxa de resolução:** 0/4 (0%)

---

## 🔧 COMO REPORTAR NOVO BUG

1. Adicione aqui em cima (P0/P1/P2 conforme prioridade)
2. Use o template:
`
   ### Bug #X: Título descritivo
   **Arquivo:** caminho/do/arquivo
   **Problema:** O que está errado
   **Solução:** Como corrigir
   **Tempo estimado:** X min
   **Status:** 🔴 ABERTO
`
3. Commit: docs: adiciona bug #X ao BUGS.md

---

**Deadline MVP:** 10 Fevereiro 2026 (19 dias restantes)
