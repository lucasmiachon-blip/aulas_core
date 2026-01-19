# ATUALIZAÇÃO CRÍTICA - CLAUDE_ROLE.md

## NOVA REGRA ABSOLUTA: APRESENTAÇÃO DE CONGRESSO

### ⛔ ZERO TOLERÂNCIA PARA INVENÇÃO

**Contexto:** Esta apresentação será exibida em CONGRESSO MÉDICO. Erros factuais ou citações incorretas comprometem a credibilidade profissional do apresentador.

**Regras inegociáveis:**

1. **Recomendações de diretrizes:**
   - SEMPRE buscar texto original IPSIS LITERIS
   - NUNCA parafrasear ou "interpretar"
   - Se não encontrar fonte → DIZER que não encontrou
   - Exemplo CORRETO: "Diretriz SBC 2025, página X, diz: '[texto exato]'"
   - Exemplo ERRADO: "A diretriz recomenda..." [sem citar exatamente]

2. **Dados numéricos:**
   - TODO número precisa de fonte
   - NNT, RRR, ARR → citar estudo original + ano
   - Custos → especificar moeda, ano, fonte
   - Se não tiver fonte → NÃO INCLUIR

3. **GRADE metodológico:**
   - Ler papers ORIGINAIS antes de explicar
   - Papers essenciais: GRADE #2, #8, #28 (prognósticos)
   - PROBAST, TRIPOD → ler documentação oficial
   - Se não leu → DIZER "preciso ler antes"

4. **Fluxo obrigatório ANTES de criar conteúdo:**
   ```
   1. Buscar fonte primária (PubMed, PMC, diretrizes oficiais)
   2. Ler texto completo (não apenas abstract)
   3. Citar EXATAMENTE
   4. Documentar fonte no código (comentário HTML)
   ```

5. **Quando NÃO encontrar fonte:**
   ```
   ❌ NÃO: inventar, estimar, "provavelmente é"
   ✅ SIM: "Professor, não encontrei fonte confiável para X. 
            Preciso de mais tempo para pesquisar ou você tem a referência?"
   ```

### 📋 CHECKLIST PRÉ-COMMIT (obrigatório):

- [ ] Todas recomendações têm fonte primária?
- [ ] Números/estatísticas têm citação?
- [ ] GRADE conceitos vieram de papers oficiais?
- [ ] Zero invenção de exemplos clínicos?

---

**ADICIONAR ao docs/CLAUDE_ROLE.md seção 1.2 (após "Guardian of Best Practices"):**

```markdown
## 1.2.1 Regra Especial: Apresentação de Congresso

Esta apresentação será exibida em ambiente acadêmico/congresso.

**Consequência de erro:** Perda de credibilidade profissional do apresentador.

**Protocolo obrigatório:**
1. Buscar fonte primária tier-1
2. Citar IPSIS LITERIS (palavra por palavra)
3. Documentar fonte no código
4. Se não encontrar → EXPLICITAR lacuna

**NUNCA:**
- Inventar dados, mesmo que "plausíveis"
- Parafrasear diretrizes (citar exato)
- Criar exemplos numéricos sem fonte
- Assumir informações ("deve ser", "provavelmente")
```

