# Workflow

## Git (sem branches por enquanto)
- Trabalhar apenas na branch **`main`**.
- Commits pequenos, frequentes e com mensagens claras.

## Convenção de commits
- `chore:` tarefas de manutenção/estrutura
- `feat:` adição de funcionalidade
- `fix:` correções
- `docs:` alterações de documentação

## Versões e tags
- Usar tags semânticas simples: `v0.1`, `v0.2`, ...

## Política de `dist/`
- `src/` é a área de edição.
- `dist/` recebe apenas conteúdo **estável** derivado de `src/`.
- Em fase de placeholder, `dist/index.html` pode espelhar `src/index.html`.
