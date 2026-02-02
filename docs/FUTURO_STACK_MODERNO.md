# 📋 Plano de Migração para Stack Moderno

> **Status:** Plano para PROJETOS FUTUROS (não para migrar OSTEOPOROSE/GRADE atuais)
> **Autor:** Gerado em 2026-02-02
> **Público:** Dev novato querendo evoluir

---

## ⚠️ DECISÃO: NÃO MIGRAR O PROJETO ATUAL

### Por quê?
1. **Funciona bem** — 133 slides funcionando, PDF exportando
2. **Custo altíssimo** — Semanas de trabalho, risco de bugs novos
3. **Benefício marginal** — Resultado final seria similar
4. **Aprendizado simultâneo** — Aprender Vite + TS + Reveal + Tailwind ao mesmo tempo é receita para frustração

### Quando faz sentido migrar?
- ✅ Projeto NOVO do zero
- ✅ Precisa de features que não consegue implementar (ex: speaker notes, mobile touch)
- ✅ Equipe já domina as tecnologias
- ❌ Sistema legado funcionando bem

---

## 🎯 Stack Sugerido para Projeto Futuro

```
┌─────────────────────────────────────────────┐
│  Reveal.js     →  Framework de apresentação │
│  Vite          →  Build tool + dev server   │
│  TypeScript    →  JavaScript tipado         │
│  Tailwind CSS  →  Utility-first CSS         │
│  Playwright    →  PDF export (manter)       │
└─────────────────────────────────────────────┘
```

### Por que cada um?

| Tech | Benefício | Curva de aprendizado |
|------|-----------|---------------------|
| **Reveal.js** | Navegação, fullscreen, PDF nativo, mobile, speaker notes | Média |
| **Vite** | Hot reload instantâneo, build rápido | Baixa |
| **TypeScript** | Erros pegos antes de rodar | Média-Alta |
| **Tailwind** | Menos CSS custom, classes utilitárias | Média |

---

## 📚 Ordem de Aprendizado (para novato)

**NÃO aprenda tudo de uma vez.** Siga esta ordem:

### Fase 1: Fundamentos (2-4 semanas)
```
1. Vite puro (sem TS, sem Tailwind)
   → npm create vite@latest meu-teste -- --template vanilla
   → Entender: dev server, build, import/export
   
2. Tailwind básico
   → Adicionar ao projeto Vite
   → Entender: classes utilitárias, responsivo
```

### Fase 2: Apresentações (2-3 semanas)
```
3. Reveal.js standalone
   → Criar apresentação simples SEM Vite
   → Entender: slides, fragmentos, temas, PDF
   
4. Reveal.js + Vite
   → Integrar os dois
   → Entender: plugins, configuração
```

### Fase 3: TypeScript (2-4 semanas)
```
5. TypeScript básico
   → Converter projeto Vite para TS
   → Entender: tipos, interfaces, erros
   
6. Reveal.js + Vite + TS
   → Projeto completo tipado
```

### Fase 4: Produção
```
7. PDF export com Playwright
   → Adaptar scripts existentes
   
8. CI/CD (opcional)
   → GitHub Actions para build automático
```

**Tempo total estimado: 2-3 meses** (estudando 1-2h/dia)

---

## 🏗️ Estrutura de Projeto Moderno

```
minha-apresentacao/
├── src/
│   ├── slides/
│   │   ├── 01-intro.html      # Cada slide separado
│   │   ├── 02-metodologia.html
│   │   └── ...
│   ├── styles/
│   │   ├── theme.css          # Tema Reveal customizado
│   │   └── components.css     # Classes extras
│   ├── main.ts                # Entry point
│   └── config.ts              # Config do Reveal
├── public/
│   └── assets/                # Imagens, fontes
├── scripts/
│   └── export-pdf.ts          # Script Playwright
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🔧 Setup Inicial (quando for criar)

```bash
# 1. Criar projeto Vite + TS
npm create vite@latest minha-aula -- --template vanilla-ts

# 2. Instalar dependências
cd minha-aula
npm install reveal.js
npm install -D tailwindcss postcss autoprefixer
npm install -D playwright

# 3. Configurar Tailwind
npx tailwindcss init -p

# 4. Estruturar pastas
mkdir -p src/slides src/styles scripts public/assets
```

---

## 📖 Recursos para Estudar

### Vite
- Docs oficiais: https://vitejs.dev/guide/
- Tutorial: "Vite in 100 Seconds" (Fireship, YouTube)

### Reveal.js
- Docs oficiais: https://revealjs.com/
- Demo interativa: https://revealjs.com/demo/

### TypeScript
- Handbook oficial: https://www.typescriptlang.org/docs/handbook/
- Tutorial: "TypeScript for Beginners" (freeCodeCamp)

### Tailwind
- Docs oficiais: https://tailwindcss.com/docs/
- Playground: https://play.tailwindcss.com/

---

## ⚡ Comandos Úteis (futuro)

```bash
# Desenvolvimento
npm run dev              # Servidor com hot reload

# Build
npm run build            # Gera dist/

# Preview build
npm run preview          # Testa o build localmente

# Export PDF
npm run export:pdf       # Playwright gera PDF

# Type check
npm run typecheck        # Verifica erros TS
```

---

## 🚫 Armadilhas Comuns

1. **Reveal.js + PDF nativo** — O PDF nativo do Reveal é básico. Para controle total, manter Playwright.

2. **Tailwind em slides** — Cuidado com classes longas demais. Extrair componentes.

3. **TypeScript strict** — Começar com `strict: false`, ativar gradualmente.

4. **Vite + caminhos** — Usar aliases (`@/slides/`) para imports limpos.

5. **Hot reload em Reveal** — Pode precisar de plugin específico.

---

## ✅ Checklist: Quando Estiver Pronto

Antes de migrar um projeto real, confirme:

- [ ] Fiz pelo menos 2 projetos teste com Vite
- [ ] Criei uma apresentação Reveal.js do zero
- [ ] Entendo o básico de TypeScript (tipos, interfaces)
- [ ] Consigo usar Tailwind sem consultar docs a cada classe
- [ ] Testei export PDF com Playwright no novo setup

---

## 💡 Alternativa Mais Simples

Se quiser modernizar SEM migração completa:

1. **Manter HTML/CSS/JS atual**
2. **Adicionar apenas Vite** como dev server (hot reload)
3. **Não mexer no resto**

```bash
# Na raiz do projeto atual
npm init -y
npm install -D vite
# Criar vite.config.js apontando para OSTEOPOROSE/src ou GRADE/src
```

Isso dá hot reload sem quebrar nada.

---

---

## 🛡️ Hard Constraints para Projeto Novo (Template)

Copie e adapte para o novo projeto:

```markdown
# HARD_CONSTRAINTS.md — [Nome do Projeto]

## HC1: Documentação obrigatória
- Toda mudança atualiza CHANGELOG.md
- README sempre atualizado

## HC2: Commits atômicos
- Um commit = uma mudança lógica
- Mensagens descritivas (não "fix", "update")

## HC3: TypeScript strict
- Não usar `any` sem justificativa
- Não usar `// @ts-ignore` sem comentário explicando

## HC4: Tailwind disciplinado
- Máximo 6-8 classes por elemento
- Classes repetidas → extrair @apply ou componente

## HC5: Testes antes de merge
- Rodar `npm run typecheck` antes de commit
- Rodar `npm run lint` antes de commit

## HC6: Sem dependências desnecessárias
- Justificar cada npm install
- Preferir stdlib/vanilla quando possível

## HC7: Acessibilidade desde o início
- Todo slide com aria-label
- Contraste mínimo 4.5:1

## HC8: Git workflow
- Branch para cada feature
- PR com descrição do que mudou
- Não commitar direto na main

## HC9: Performance
- Bundle < 500KB (sem assets)
- Lighthouse Performance > 90

## HC10: Code review
- Revisar próprio código antes de PR
- Outro olho se possível
```

---

## 🧰 Ferramentas de Qualidade (Senior Dev Essentials)

### Linting & Formatting

```bash
# Instalar
npm install -D eslint prettier eslint-config-prettier

# Arquivos de config
# .eslintrc.cjs → regras de código
# .prettierrc   → formatação (tabs, quotes, etc)
```

**Por que:** Código consistente, erros pegos cedo.

### Pre-commit Hooks (Husky)

```bash
# Instalar
npm install -D husky lint-staged

# Setup
npx husky init
echo "npx lint-staged" > .husky/pre-commit
```

**Por que:** Impede commit de código quebrado.

### Type Checking Contínuo

```json
// package.json scripts
{
  "scripts": {
    "typecheck": "tsc --noEmit",
    "lint": "eslint src/",
    "format": "prettier --write src/",
    "check-all": "npm run typecheck && npm run lint"
  }
}
```

---

## 🧪 Testes (Quando Adicionar)

### Ordem de prioridade:

| Tipo | Quando | Ferramenta |
|------|--------|------------|
| **Type checking** | Desde o início | TypeScript |
| **Linting** | Desde o início | ESLint |
| **E2E (PDF export)** | Quando tiver export | Playwright |
| **Visual regression** | Opcional | Playwright screenshots |
| **Unit tests** | Se tiver lógica complexa | Vitest |

### Teste E2E simples para apresentação:

```typescript
// tests/presentation.spec.ts
import { test, expect } from '@playwright/test';

test('apresentação carrega todos os slides', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  // Espera slides carregarem
  await page.waitForSelector('.slide');
  
  // Conta slides
  const slides = await page.locator('.slide').count();
  expect(slides).toBeGreaterThan(0);
  
  // Navega até o último
  for (let i = 0; i < slides - 1; i++) {
    await page.keyboard.press('ArrowRight');
  }
  
  // Verifica que chegou ao fim
  const lastSlide = await page.locator('.slide:last-child');
  await expect(lastSlide).toBeVisible();
});

test('PDF é gerado com páginas corretas', async ({ page }) => {
  // ... teste de export
});
```

---

## 📐 Architecture Decision Records (ADRs)

Documente decisões importantes em `docs/adr/`:

```markdown
# ADR-001: Escolha do Reveal.js

## Status
Aceito

## Contexto
Precisamos de um framework de apresentação que suporte PDF export e seja customizável.

## Decisão
Usar Reveal.js porque:
- PDF export nativo (ou via Playwright)
- Grande comunidade
- Plugins extensíveis
- Mobile-friendly

## Consequências
- Precisamos aprender a API do Reveal
- Customização de tema requer conhecer a estrutura interna
- Algumas features (speaker notes) precisam de servidor
```

**Por que:** Quando você voltar em 6 meses, vai lembrar POR QUE escolheu cada coisa.

---

## 📊 Métricas de Qualidade

### Lighthouse (Performance)

```bash
# Instalar
npm install -D lighthouse

# Rodar
npx lighthouse http://localhost:5173 --view
```

**Metas:**
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90

### Bundle Analysis

```bash
# Vite tem built-in
npm run build -- --report

# Ou usar rollup-plugin-visualizer
npm install -D rollup-plugin-visualizer
```

**Meta:** Bundle total < 500KB (sem imagens)

---

## 🔄 Git Workflow Simples

```
main ────●────●────●────●──── (sempre funciona)
          \        /
feature    ●──●──●  (desenvolve aqui)
```

### Comandos:

```bash
# Criar branch para feature
git checkout -b feature/novo-slide

# Desenvolver, commitar
git add .
git commit -m "add: slide sobre metodologia GRADE"

# Voltar para main e mergear
git checkout main
git merge feature/novo-slide

# Deletar branch
git branch -d feature/novo-slide
```

### Convenção de commits:

```
add:    → novo feature/arquivo
fix:    → correção de bug
update: → melhoria em algo existente
refactor: → mudança sem alterar comportamento
docs:   → só documentação
style:  → formatação (não CSS, código)
```

---

## 🎓 Checklist de Maturidade do Projeto

### Nível 1: Básico (fazer desde o início)
- [ ] Git inicializado
- [ ] .gitignore configurado
- [ ] README com instruções de setup
- [ ] HARD_CONSTRAINTS.md criado
- [ ] package.json com scripts úteis

### Nível 2: Qualidade (adicionar cedo)
- [ ] ESLint configurado
- [ ] Prettier configurado
- [ ] TypeScript strict mode
- [ ] Husky pre-commit hooks

### Nível 3: Profissional (adicionar quando estável)
- [ ] Testes E2E básicos
- [ ] CI/CD (GitHub Actions)
- [ ] ADRs para decisões importantes
- [ ] CHANGELOG mantido

### Nível 4: Produção (se for compartilhar/publicar)
- [ ] Lighthouse > 90 em tudo
- [ ] Acessibilidade auditada
- [ ] Bundle otimizado
- [ ] Documentação completa

---

## 🚀 GitHub Actions (CI Básico)

```yaml
# .github/workflows/check.yml
name: Check

on: [push, pull_request]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      
      - name: Install
        run: npm ci
      
      - name: Type Check
        run: npm run typecheck
      
      - name: Lint
        run: npm run lint
      
      - name: Build
        run: npm run build
```

**Por que:** Pega erros automaticamente antes de mergear.

---

*"Premature optimization is the root of all evil" — Donald Knuth*

*Tradução: Não conserte o que não está quebrado.*

---

*Mas quando for construir algo novo, construa direito desde o início.*
