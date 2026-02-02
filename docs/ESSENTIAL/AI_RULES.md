# 🔴 AI Rules — Regras Obrigatórias

**Última atualização:** 2026-02-02

> **IMPORTANTE:** Este documento é um RESUMO. As regras completas estão em:
> - `../../HARD_CONSTRAINTS.md` (10 Hard Constraints)
> - `../../scripts/AI-RESTRICTIONS.md` (Restrições técnicas)

---

## REGRAS INVIOLÁVEIS

### 1. Documentação Obrigatória (HC1)
- **Toda mudança** atualiza `CHANGELOG.md`
- Mudanças estruturais atualizam `README.md`

### 2. CSS Mínimo (HC2, HC3)
- Máximo 5-10 linhas de CSS por tarefa
- **ZERO `!important` novo** (exceto print.css existente)
- Se precisar de mais CSS → PARE e pergunte

### 3. Sem Invenção de Dados
- **NÃO inventar** números, NNT/NNH, datas, citações
- Se faltar informação → usar `[TBD]`

### 4. Sem Refatoração Não Autorizada (HC7)
- **NÃO reescrever** arquivos inteiros
- **NÃO renomear** classes/funções em uso
- **NÃO reorganizar** pastas sem permissão

### 5. Git Safety (HC6)
- **Commit checkpoint** antes de mudanças grandes (3+ arquivos)
- Trabalhar apenas em `main`
- **NÃO fazer** push sem permissão

### 6. Testar Antes de "Pronto" (HC10)
- [ ] Viewer funciona no browser?
- [ ] Print mode funciona (Ctrl+P)?
- [ ] Export PDF funciona?
- [ ] Sem erros no console?

---

## RESTRIÇÕES ESPECÍFICAS

### CSS (ver `scripts/AI-RESTRICTIONS.md`)
- **NÃO alterar** tokens `:root` sem permissão
- **NÃO remover** regras de print.css marcadas como críticas
- **NÃO usar** inline styles (`style="..."`)

### JavaScript
- **NÃO alterar** viewer.js sem permissão
- **NÃO alterar** slide-loader.js sem permissão
- **NÃO adicionar** dependências npm sem permissão

### Arquivos Protegidos
- `OSTEOPOROSE/src/css/print.css` → Crítico para PDF
- `OSTEOPOROSE/src/js/viewer.js` → Crítico para apresentação
- `GRADE/src/css/print.css` → Crítico para PDF

---

## CHECKLIST RÁPIDO

Antes de qualquer mudança:

```
□ Li HARD_CONSTRAINTS.md?
□ Li scripts/AI-RESTRICTIONS.md?
□ Sei qual projeto estou modificando (OSTEOPOROSE ou GRADE)?
□ A mudança é mínima e reversível?
□ Vou atualizar CHANGELOG.md?
```

---

## VIOLAÇÃO = PARE

Se qualquer regra parece necessitar violação:
1. **PARE**
2. Explique ao usuário
3. Peça permissão explícita
4. Documente a exceção

---

*Referência completa: `../../HARD_CONSTRAINTS.md`*
