# Estrutura de Caminhos e Case Sensitivity

## Problema Identificado

Há inconsistências entre:
- O que está commitado no repositório
- O que é publicado no GitHub Pages
- Case sensitivity (maiúsculas/minúsculas)

## Estrutura Atual

### No Repositório Local:
```
GRADE/
  ├── src/
  │   ├── index.html          (NÃO é usado pelo GitHub Pages)
  │   ├── css/
  │   └── js/
  │       └── slide-system/
  └── dist/
      └── index.html          (ESTE é usado pelo GitHub Pages)
```

### No GitHub Pages (após deploy):
```
_site/
  └── grade/                  (minúsculo!)
      ├── index.html          (vem de GRADE/dist/index.html)
      └── src/
          ├── css/            (vem de GRADE/src/css/)
          └── js/              (vem de GRADE/src/js/)
```

## Workflow do GitHub Pages

O arquivo `.github/workflows/pages.yml` faz:

1. **Copia `GRADE/dist/*`** → `_site/grade/` (minúsculo)
2. **Copia `GRADE/src/css`** → `_site/grade/src/css/`
3. **Copia `GRADE/src/js`** → `_site/grade/src/js/`
4. **Substitui caminhos** no `index.html`:
   - `href="../src/` → `href="./src/`
   - `src="../src/` → `src="./src/`

## Problemas Identificados

### 1. Case Sensitivity
- **Workflow usa**: `_site/grade/` (minúsculo)
- **URL correta**: `https://lucasmiachon-blip.github.io/aulas_core/grade/`
- **Problema**: Se houver referências a `GRADE` (maiúsculo), dará 404

### 2. Arquivos Desatualizados
- `GRADE/src/index.html` referencia `blocks.js` (não existe mais)
- `GRADE/dist/index.html` está correto (usa `slide-system/*.js`)

### 3. Inconsistência src vs dist
- O workflow usa `GRADE/dist/index.html` como base
- Mas copia `GRADE/src/css` e `GRADE/src/js` separadamente
- Se `dist/index.html` não estiver sincronizado com `src/`, pode dar erro

## Soluções

### 1. Sincronizar dist/index.html com src/index.html
O arquivo `dist/index.html` deve ser uma cópia atualizada de `src/index.html` com os caminhos corrigidos.

### 2. Verificar Case Sensitivity
- Sempre usar `grade/` (minúsculo) nas URLs
- O workflow já cria redirects de `GRADE/` para `grade/`

### 3. Processo de Build
Sempre que modificar `src/index.html`:
1. Copiar para `dist/index.html`
2. Ajustar caminhos se necessário
3. Commit e push

## Comandos Úteis

```bash
# Verificar diferenças entre src e dist
diff GRADE/src/index.html GRADE/dist/index.html

# Copiar src para dist (após ajustar caminhos)
cp GRADE/src/index.html GRADE/dist/index.html
```

## URLs Corretas

- **GitHub Pages**: `https://lucasmiachon-blip.github.io/aulas_core/grade/`
- **Local**: `file:///caminho/para/GRADE/dist/index.html`

## Notas Importantes

1. **O arquivo `GRADE/src/index.html` NÃO é usado pelo GitHub Pages**
2. **Apenas `GRADE/dist/index.html` é publicado**
3. **Os arquivos CSS/JS vêm de `GRADE/src/` mas são copiados para `_site/grade/src/`**
4. **Sempre usar minúsculas (`grade/`) nas URLs do GitHub Pages**
