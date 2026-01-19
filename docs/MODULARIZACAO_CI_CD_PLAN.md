# 🏗️ PLANO DE MODULARIZAÇÃO + CI/CD

**Data:** 2026-01-19  
**Status:** 📋 PLANEJAMENTO  
**Executor futuro:** Claude Técnico  
**Prioridade:** MÉDIA (após auditoria ChatGPT Pro + correções)

---

## 🎯 OBJETIVO

Transformar o projeto de **arquivo único monolítico** (420 KB) em **sistema modular** com build automatizado e CI/CD.

### Problemas Atuais
- ❌ Arquivo único gigante (`index.html` ~420 KB)
- ❌ Janela de contexto saturando (>80K tokens)
- ❌ Difícil rastrear mudanças no Git
- ❌ Risco de conflitos e perda de dados
- ❌ Commits grandes e difíceis de auditar
- ❌ Impossível trabalhar em slides específicos sem tocar o resto

### Benefícios da Modularização
- ✅ **Commits atômicos:** 1 slide = 1 arquivo = 1 commit
- ✅ **Manutenção focada:** editar slide 15 sem tocar nos outros 40
- ✅ **Git tracking preciso:** ver exatamente o que mudou
- ✅ **Janela de contexto otimizada:** carregar apenas o necessário
- ✅ **Colaboração paralela:** múltiplas pessoas/IAs trabalhando ao mesmo tempo
- ✅ **Deploy automatizado:** build + validação + deploy via GitHub Actions
- ✅ **Qualidade garantida:** testes automáticos de paleta, acessibilidade, etc.

---

## 📁 ESTRUTURA MODULAR PROPOSTA

```
GRADE/
├── src/
│   ├── slides/                     ← 1 arquivo por slide
│   │   ├── 01-capa.html
│   │   ├── 02-introducao.html
│   │   ├── 03-objetivos.html
│   │   ├── ...
│   │   ├── 40-conclusoes.html
│   │   └── 41-referencias.html
│   │
│   ├── components/                 ← Componentes reutilizáveis
│   │   ├── card.html               (template de card)
│   │   ├── table.html              (template de tabela GRADE)
│   │   ├── footer.html             (rodapé com fonte)
│   │   └── header.html             (cabeçalho de slide)
│   │
│   ├── css/
│   │   ├── variables.css           ← Paleta oficial (9 cores)
│   │   ├── base.css                ← Reset + base styles
│   │   ├── layout.css              ← Grid, containers, spacing
│   │   ├── typography.css          ← Fontes, tamanhos, hierarquia
│   │   ├── components.css          ← Estilos de componentes
│   │   └── animations.css          ← Transições, animações
│   │
│   ├── js/
│   │   ├── slide-system/
│   │   │   ├── core.js             ← Sistema central de slides
│   │   │   ├── navigation.js       ← Navegação (setas, touch)
│   │   │   ├── viewport.js         ← Gerenciamento de viewport
│   │   │   └── keyboard.js         ← Atalhos de teclado
│   │   └── utils/
│   │       ├── analytics.js        ← Tracking (opcional)
│   │       └── presenter-mode.js   ← Modo apresentador
│   │
│   ├── partials/
│   │   ├── head.html               ← <head> comum
│   │   └── scripts.html            ← Scripts comuns
│   │
│   └── build-config.json           ← Configuração de build
│
├── scripts/                        ← Scripts de build e validação
│   ├── build.js                    ← Build principal (monta index.html)
│   ├── validate.js                 ← Validação de qualidade
│   ├── deploy.js                   ← Deploy automatizado
│   └── dev-server.js               ← Servidor de desenvolvimento
│
├── tests/                          ← Testes automatizados
│   ├── palette-check.js            ← Valida uso da paleta oficial
│   ├── accessibility.js            ← WCAG compliance
│   ├── density.js                  ← Densidade de caracteres/slide
│   └── structure.js                ← Estrutura HTML válida
│
├── dist/                           ← Saída de build (gerado)
│   ├── index.html                  ← Arquivo final compilado
│   ├── index.min.html              ← Versão minificada
│   └── metadata.json               ← Metadados (data, versão, hash)
│
├── .github/
│   └── workflows/
│       ├── build-and-test.yml      ← CI: build + testes
│       ├── deploy.yml              ← CD: deploy para GitHub Pages
│       └── audit.yml               ← Auditoria automática semanal
│
└── package.json                    ← Dependências e scripts npm
```

---

## 🛠️ FERRAMENTAS & TECNOLOGIAS

### Build System
- **Node.js 18+** (JavaScript runtime)
- **npm** (gerenciador de pacotes)
- **Pacotes principais:**
  - `cheerio` - Manipulação HTML (como jQuery para Node)
  - `autoprefixer` - Prefixos CSS automáticos
  - `cssnano` - Minificação CSS
  - `terser` - Minificação JS
  - `html-minifier` - Minificação HTML

### Validação & Testes
- **Pacotes:**
  - `axe-core` - Testes de acessibilidade (WCAG)
  - `jest` - Framework de testes
  - `eslint` - Linter JavaScript
  - `stylelint` - Linter CSS

### CI/CD
- **GitHub Actions** (incluído no GitHub, grátis para repos públicos)
- **Workflows:**
  - Build & Test (a cada push)
  - Deploy (a cada merge na main)
  - Auditoria semanal (todos os domingos)

---

## 📝 ARQUIVOS DE CONFIGURAÇÃO

### 1. `package.json`

```json
{
  "name": "aulas-core-grade",
  "version": "0.3.0",
  "description": "Apresentação GRADE sobre Diretriz SBC Dislipidemia 2025",
  "scripts": {
    "build": "node scripts/build.js",
    "validate": "node scripts/validate.js",
    "deploy": "node scripts/deploy.js",
    "dev": "node scripts/dev-server.js",
    "test": "jest",
    "test:palette": "node tests/palette-check.js",
    "test:accessibility": "node tests/accessibility.js",
    "test:density": "node tests/density.js",
    "lint": "eslint src/js && stylelint src/css"
  },
  "devDependencies": {
    "cheerio": "^1.0.0-rc.12",
    "autoprefixer": "^10.4.16",
    "cssnano": "^6.0.3",
    "terser": "^5.26.0",
    "html-minifier": "^4.0.0",
    "axe-core": "^4.8.3",
    "jest": "^29.7.0",
    "eslint": "^8.56.0",
    "stylelint": "^16.1.0"
  }
}
```

### 2. `build-config.json`

```json
{
  "slides": {
    "order": [
      "01-capa",
      "02-introducao",
      "03-objetivos",
      "..."
    ],
    "exclude": []
  },
  "palette": {
    "validate": true,
    "allowed": ["--bg", "--navy", "--gold", "--teal", "--blue", "--text", "--muted", "--border", "--white"]
  },
  "output": {
    "dist": "dist/index.html",
    "minify": true,
    "sourcemap": false
  },
  "quality": {
    "maxCharsPerSlide": 1200,
    "maxListItems": 7,
    "minContrast": 4.5
  }
}
```

### 3. `.github/workflows/build-and-test.yml`

```yaml
name: Build and Test

on:
  push:
    branches: [ main ]
    paths:
      - 'GRADE/src/**'
      - 'GRADE/scripts/**'
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: |
        cd GRADE
        npm install
    
    - name: Run build
      run: |
        cd GRADE
        npm run build
    
    - name: Validate palette
      run: |
        cd GRADE
        npm run test:palette
    
    - name: Test accessibility
      run: |
        cd GRADE
        npm run test:accessibility
    
    - name: Check density
      run: |
        cd GRADE
        npm run test:density
    
    - name: Upload build artifact
      uses: actions/upload-artifact@v4
      with:
        name: grade-presentation
        path: GRADE/dist/
```

### 4. `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
    paths:
      - 'GRADE/dist/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./GRADE/dist
        publish_branch: gh-pages
        cname: grade.lucasmiachon.dev  # Opcional: domínio customizado
```

---

## 🔨 SCRIPTS DE BUILD

### `scripts/build.js` (Resumido)

```javascript
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Configuração
const config = require('../build-config.json');
const slidesDir = path.join(__dirname, '../src/slides');
const cssDir = path.join(__dirname, '../src/css');
const jsDir = path.join(__dirname, '../src/js');
const distDir = path.join(__dirname, '../dist');

// 1. Ler template base
const template = fs.readFileSync(path.join(__dirname, '../src/partials/head.html'), 'utf8');
const $ = cheerio.load(template);

// 2. Concatenar CSS
const cssFiles = ['variables.css', 'base.css', 'layout.css', 'typography.css'];
let allCSS = '';
cssFiles.forEach(file => {
  allCSS += fs.readFileSync(path.join(cssDir, file), 'utf8') + '\n';
});
$('head').append(`<style>${allCSS}</style>`);

// 3. Concatenar slides na ordem
config.slides.order.forEach(slideName => {
  const slideHTML = fs.readFileSync(path.join(slidesDir, `${slideName}.html`), 'utf8');
  $('body').append(slideHTML);
});

// 4. Concatenar JavaScript
const jsFiles = ['slide-system/core.js', 'slide-system/navigation.js', 'slide-system/viewport.js'];
let allJS = '';
jsFiles.forEach(file => {
  allJS += fs.readFileSync(path.join(jsDir, file), 'utf8') + '\n';
});
$('body').append(`<script>${allJS}</script>`);

// 5. Salvar output
fs.writeFileSync(path.join(distDir, 'index.html'), $.html());

console.log('✅ Build completo!');
```

### `scripts/validate.js` (Resumido)

```javascript
#!/usr/bin/env node
const fs = require('fs');
const config = require('../build-config.json');

// Validar paleta
const html = fs.readFileSync('./dist/index.html', 'utf8');
const hardcodedColors = html.match(/#[0-9A-Fa-f]{6}/g);

if (hardcodedColors && hardcodedColors.length > 0) {
  console.error('❌ Cores hardcoded encontradas:', hardcodedColors);
  process.exit(1);
}

// Validar densidade
const slides = html.split('<section class="slide"');
slides.forEach((slide, i) => {
  if (i === 0) return; // Skip first (antes do primeiro slide)
  const charCount = slide.length;
  if (charCount > config.quality.maxCharsPerSlide) {
    console.warn(`⚠️ Slide ${i}: ${charCount} chars (max: ${config.quality.maxCharsPerSlide})`);
  }
});

console.log('✅ Validação concluída!');
```

---

## 📅 CRONOGRAMA DE IMPLEMENTAÇÃO

### FASE 1: Preparação (1 dia)
- [ ] Criar estrutura de pastas
- [ ] Configurar package.json
- [ ] Instalar dependências
- [ ] Criar scripts de build básicos

### FASE 2: Migração (2-3 dias)
- [ ] Extrair slides para arquivos individuais (41 arquivos)
- [ ] Separar CSS em módulos
- [ ] Separar JS em módulos
- [ ] Criar build-config.json
- [ ] Testar build manual

### FASE 3: Automação (1 dia)
- [ ] Implementar scripts de validação
- [ ] Criar testes automatizados
- [ ] Setup GitHub Actions (CI)

### FASE 4: Deploy (1 dia)
- [ ] Configurar GitHub Pages
- [ ] Implementar workflow de deploy (CD)
- [ ] Testar pipeline completo

### FASE 5: Documentação (meio dia)
- [ ] Atualizar README.md
- [ ] Criar CONTRIBUTING.md
- [ ] Documentar scripts e workflows

**TOTAL ESTIMADO:** 5-6 dias de trabalho

---

## ⚠️ RISCOS E MITIGAÇÕES

| Risco | Impacto | Probabilidade | Mitigação |
|-------|---------|---------------|-----------|
| Quebra de funcionalidade durante migração | Alto | Média | Testes extensivos pré/pós migração |
| Perda de histórico Git | Alto | Baixa | Commit de migração único e auditável |
| Build falhando em CI | Médio | Média | Testes locais antes de push |
| Incompatibilidade de dependências | Baixo | Baixa | Usar versões LTS (Node 18+) |

---

## 🎯 CRITÉRIOS DE SUCESSO

### Técnicos
- ✅ Build automatizado funciona sem erros
- ✅ Todos os testes passam (paleta, acessibilidade, densidade)
- ✅ Deploy automático para GitHub Pages
- ✅ Tamanho do arquivo final ≤ atual (420 KB)
- ✅ Performance mantida ou melhorada

### Processuais
- ✅ Commits mais granulares e auditáveis
- ✅ Janela de contexto reduzida (trabalhar em 1 slide por vez)
- ✅ Facilidade de colaboração aumentada

### Qualidade
- ✅ Paleta oficial 100% respeitada
- ✅ WCAG AA mantido ou melhorado
- ✅ Densidade por slide controlada automaticamente

---

## 📚 REFERÊNCIAS TÉCNICAS

### Build Systems
- Vite: https://vitejs.dev
- Webpack: https://webpack.js.org
- Parcel: https://parceljs.org

### CI/CD
- GitHub Actions: https://docs.github.com/en/actions
- CircleCI: https://circleci.com
- Travis CI: https://travis-ci.org

### Testes
- Jest: https://jestjs.io
- axe-core: https://github.com/dequelabs/axe-core
- Playwright: https://playwright.dev

---

## 🚨 QUANDO IMPLEMENTAR?

**NÃO AGORA!** Seguir esta sequência:

1. ✅ ChatGPT Pro faz auditoria de conteúdo
2. ✅ Claude Técnico aplica correções da auditoria
3. ✅ Deploy versão atual estável
4. ⏸️ **ENTÃO** implementar modularização (este plano)

**Motivo:** Modularização é uma refatoração grande. Fazer ANTES de estabilizar o conteúdo aumenta o risco de retrabalho.

---

## 📋 CHECKLIST PRÉ-IMPLEMENTAÇÃO

Antes de começar a modularização, confirme:

- [ ] Auditoria ChatGPT Pro concluída
- [ ] Todas as correções da auditoria aplicadas
- [ ] Versão atual estável e deployada
- [ ] Backup completo do repositório
- [ ] Aprovação explícita de Lucas
- [ ] Tempo disponível para implementação (5-6 dias)

---

**STATUS:** 📋 Planejamento completo  
**Próxima ação:** Aguardar aprovação de Lucas após auditoria  
**Responsável futuro:** Claude Técnico

---

**FIM DO PLANO DE MODULARIZAÇÃO + CI/CD**
