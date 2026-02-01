# Instruções Detalhadas - Exportar GRADE para PDF

## Passo 1: Instalar Node.js

1. Acesse: https://nodejs.org/
2. Clique no botão verde "Download Node.js (LTS)"
3. Execute o arquivo baixado
4. Clique em "Next" até terminar a instalação
5. Reinicie o terminal

## Passo 2: Verificar instalação

Abra o terminal (CMD) e digite:

```bash
node --version
```

Se aparecer algo como `v20.11.0`, está instalado corretamente!

## Passo 3: Ir para a pasta do projeto

```bash
cd C:\Users\lucas\OneDrive\LM\Documentos\Dev\Projetos\Aulas\scripts
```

## Passo 4: Instalar dependências

```bash
npm install
```

Aguarde alguns minutos. Isso vai baixar o Playwright.

## Passo 5: Instalar o navegador

```bash
npx playwright install chromium
```

Aguarde 5-10 minutos. Isso vai baixar o Chromium (cerca de 150MB).

## Passo 6: Gerar o PDF

```bash
npm run export-grade
```

Pronto! O PDF será gerado em:

```
C:\Users\lucas\OneDrive\LM\Documentos\Dev\Projetos\Aulas\exports\GRADE-slides.pdf
```

## Problemas?

### Erro "npm não reconhecido"
- Você precisa instalar o Node.js primeiro (Passo 1)
- Depois reinicie o terminal

### Erro "scripts is disabled"
- Use o CMD ao invés do PowerShell
- Ou execute: `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`

### PDF não gerou
- Verifique sua internet
- Execute novamente o comando
- Veja se apareceu alguma mensagem de erro

### Pasta exports não existe
- O script cria automaticamente
- Se não criar, crie manualmente

## Comandos úteis

Instalar tudo de uma vez (após instalar Node.js):

```bash
cd C:\Users\lucas\OneDrive\LM\Documentos\Dev\Projetos\Aulas\scripts
npm install
npx playwright install chromium
npm run export-grade
```

## Informações técnicas

- **Formato**: A4 Paisagem
- **Qualidade**: Alta (print-background ativado)
- **Tempo**: ~30 segundos a 2 minutos
- **Tamanho**: Depende do número de slides
