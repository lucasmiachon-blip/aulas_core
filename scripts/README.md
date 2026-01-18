# GRADE PDF Export

Script automatizado para exportar os slides do GRADE em formato PDF usando Playwright.

## Requisitos

- Node.js (versão 18 ou superior)
- npm (vem junto com Node.js)

## Instalação

1. Instale o Node.js em https://nodejs.org/

2. Abra o terminal na pasta `scripts/` e execute:

```bash
npm install
```

3. Instale o navegador Chromium:

```bash
npx playwright install chromium
```

## Como usar

Execute o comando:

```bash
npm run export-grade
```

O PDF será gerado em:
```
exports/GRADE-slides.pdf
```

## O que o script faz

1. Abre o site do GRADE no GitHub Pages
2. Aguarda todos os recursos carregarem (fontes, imagens, etc.)
3. Prepara os slides para impressão
4. Gera um PDF em formato A4 paisagem
5. Salva o arquivo na pasta `exports/`

## Tecnologias

- **Playwright**: Automação de navegador
- **Chromium**: Navegador usado para renderização
- **Node.js**: Ambiente de execução JavaScript

## Problemas comuns

### `npm: command not found`
- Você precisa instalar o Node.js primeiro

### `Error: browserType.launch: Executable doesn't exist`
- Execute: `npx playwright install chromium`

### PDF em branco ou incompleto
- Aguarde mais tempo antes de gerar (aumente o timeout no código)
- Verifique sua conexão com a internet

## Licença

MIT
