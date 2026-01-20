# Como Sincronizar GRADE/src com GRADE/dist

## Problema

O GitHub Pages usa `GRADE/dist/index.html` para publicar, mas você pode estar editando `GRADE/src/index.html`. Isso causa inconsistências e erros 404.

## Solução Rápida

Execute o script de sincronização:

```bash
cd scripts
npm run sync-grade
```

Ou diretamente:

```bash
node scripts/sync-grade-dist.js
```

## O que o script faz?

1. Copia `GRADE/src/index.html` → `GRADE/dist/index.html`
2. Ajusta caminhos: `../src/` → `./src/`
3. Verifica se os scripts JS estão corretos

## Workflow Recomendado

1. **Edite sempre** `GRADE/src/index.html`
2. **Execute** `npm run sync-grade` após editar
3. **Commit** ambos os arquivos (`src/` e `dist/`)
4. **Push** para o GitHub

## Estrutura de Arquivos

```
GRADE/
  ├── src/
  │   ├── index.html          ← EDITE AQUI
  │   ├── css/
  │   └── js/
  │       └── slide-system/
  └── dist/
      └── index.html          ← Sincronizado automaticamente
```

## URLs Corretas

- **GitHub Pages**: `https://lucasmiachon-blip.github.io/aulas_core/grade/` (minúsculo!)
- **Local**: `file:///caminho/para/GRADE/dist/index.html`

## Case Sensitivity

⚠️ **IMPORTANTE**: O GitHub Pages publica em `grade/` (minúsculo), não `GRADE/`.

- ✅ Correto: `/grade/`
- ❌ Errado: `/GRADE/`

O workflow já cria redirects de `GRADE/` para `grade/`, mas é melhor usar sempre minúsculas.
