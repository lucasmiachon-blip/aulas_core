# 🚧 GUARDRAILS ARQUITETURAIS
## Regras para Evitar Colcha de Retalhos

> **Princípio:** Código coeso > Código rápido. Consistência > Criatividade.

---

# PARTE 1: REGRAS INVIOLÁVEIS PARA CLAUDE CODE

## 🔴 ANTES DE QUALQUER MUDANÇA

```
CHECKLIST OBRIGATÓRIO:
□ Li os arquivos existentes relacionados?
□ Entendi o padrão já estabelecido?
□ Minha mudança segue esse padrão?
□ Estou reutilizando código existente?
□ Não estou duplicando funcionalidade?
```

## 🔴 NUNCA FAZER

| Proibido | Por quê | Fazer em vez disso |
|----------|---------|-------------------|
| Criar novo arquivo CSS para "testar" | Fragmenta estilos | Editar o arquivo CSS existente |
| Adicionar inline styles | Impossível manter | Usar classes do design system |
| Criar função JS que já existe | Duplicação | Importar a existente |
| Mudar convenção de nomenclatura | Inconsistência | Seguir o padrão do projeto |
| Adicionar nova dependência | Complexidade | Usar vanilla JS/CSS |
| Sobrescrever arquivo sem backup | Perda de trabalho | Git commit antes |
| Copiar/colar código entre arquivos | Duplicação | Extrair para componente |

---

# PARTE 2: CONVENÇÕES DO PROJETO OSTEOPOROSE

## Estrutura de Arquivos (RESPEITAR)

```
OSTEOPOROSE/
├── index.html           # Viewer principal - NÃO FRAGMENTAR
├── print.html           # Versão PDF - GERAR VIA SCRIPT
├── index-legacy.html    # Backup - NÃO TOCAR
│
├── src/
│   ├── slides/          # Um arquivo por slide
│   │   ├── slide-01.html
│   │   ├── slide-02.html
│   │   └── ...
│   │
│   ├── css/
│   │   ├── base.css     # Reset + variáveis (FONTE DA VERDADE)
│   │   ├── slides.css   # Layouts de slide
│   │   ├── components.css # Componentes reutilizáveis
│   │   ├── viewer.css   # Estilos do viewer
│   │   └── print.css    # Estilos de impressão
│   │
│   ├── js/
│   │   ├── main.js      # Entry point
│   │   ├── navigation.js # Navegação
│   │   ├── slide-loader.js # Carrega slides
│   │   └── utils.js     # Funções utilitárias
│   │
│   ├── blocks/          # Componentes HTML reutilizáveis
│   └── partials/        # Partes do layout
│
├── assets/              # Imagens, fontes
├── dist/                # Build de produção
├── scripts/             # Scripts de build/export
└── refs/                # Referências e fontes
```

## Regra de Ouro: Um Lugar para Cada Coisa

| Tipo de Código | Onde Fica | NUNCA em |
|----------------|-----------|----------|
| Variáveis CSS | `base.css :root` | Qualquer outro lugar |
| Layout de slide | `slides.css` | Inline ou outro CSS |
| Componente visual | `components.css` | Slide individual |
| Lógica de navegação | `navigation.js` | main.js ou inline |
| Utilitários | `utils.js` | Espalhado |
| Conteúdo de slide | `src/slides/slide-XX.html` | index.html |

---

# PARTE 3: PADRÕES DE CÓDIGO

## CSS: Naming Convention (BEM)

```css
/* BLOCO */
.slide { }
.card { }
.nav { }

/* ELEMENTO (dentro do bloco) */
.slide__title { }
.slide__content { }
.slide__footer { }

/* MODIFICADOR (variação) */
.slide--dark { }
.slide--data { }
.card--highlight { }
```

## CSS: Uso de Variáveis (OBRIGATÓRIO)

```css
/* ✅ CORRETO */
.slide__title {
  color: var(--color-primary);
  font-size: var(--text-3xl);
  margin-bottom: var(--space-4);
}

/* ❌ ERRADO */
.slide__title {
  color: #1a2744;        /* Hardcoded! */
  font-size: 39px;       /* Magic number! */
  margin-bottom: 16px;   /* Não usa sistema! */
}
```

## HTML: Estrutura de Slide (TEMPLATE FIXO)

```html
<!-- ESTRUTURA OBRIGATÓRIA - NÃO MODIFICAR -->
<section class="slide slide--[tipo]" 
         data-slide="[N]" 
         id="slide-[N]"
         aria-label="Slide [N]: [Título]">
  
  <div class="slide__container">
    <!-- Conteúdo aqui -->
  </div>
  
  <footer class="slide__footer">
    <span class="slide__number">[N]</span>
    <cite class="slide__source">[Fonte]</cite>
  </footer>
  
</section>
```

## JavaScript: Padrões

```javascript
// MÓDULOS ES6 (obrigatório)
import { functionName } from './utils.js';
export function myFunction() { }

// NOMES DESCRITIVOS
// ✅ Correto
function navigateToSlide(slideIndex) { }
function calculateProgress() { }

// ❌ Errado
function nav(i) { }
function calc() { }

// CONSTANTES NO TOPO
const ANIMATION_DURATION = 300;
const MAX_SLIDES = 45;

// EARLY RETURN
function getSlide(index) {
  if (index < 0) return null;
  if (index >= slides.length) return null;
  return slides[index];
}
```

---

# PARTE 4: FLUXO DE TRABALHO SEGURO

## Antes de Editar Qualquer Arquivo

```
1. EXPLORAR
   "Liste os arquivos em src/css e mostre as primeiras 50 linhas de cada"

2. ENTENDER
   "Qual é o padrão de nomenclatura usado neste projeto?"

3. PLANEJAR
   "Onde devo adicionar este novo componente seguindo a arquitetura?"

4. EXECUTAR
   "Adicione o componente em components.css seguindo o padrão BEM"

5. VERIFICAR
   "O código adicionado segue o padrão dos componentes existentes?"
```

## Checklist Pré-Commit

```
ANTES DE CONSIDERAR PRONTO:
□ Código segue convenções do projeto?
□ Sem duplicação de código?
□ Variáveis CSS usadas (não hardcoded)?
□ Classes seguem BEM?
□ Funciona no browser? (testar)
□ Print mode funciona? (Ctrl+P)
□ Sem erros no console?
□ Acessibilidade ok? (contraste, aria)
```

---

# PARTE 5: PROMPTS DE SEGURANÇA

## Prompt: Antes de Começar Sessão

```
Antes de fazer qualquer mudança no projeto OSTEOPOROSE, execute:

1. Liste a estrutura de arquivos em src/
2. Mostre as variáveis CSS em base.css (:root)
3. Mostre os componentes existentes em components.css
4. Liste as funções exportadas em cada arquivo JS

NÃO faça mudanças até entender o projeto.
Reporte o que encontrou.
```

## Prompt: Adicionar Novo Componente

```
TAREFA: Adicionar componente [NOME] ao projeto.

REGRAS DE CONSISTÊNCIA:
1. Verificar se componente similar já existe
2. Adicionar em components.css (não criar novo arquivo)
3. Seguir nomenclatura BEM do projeto
4. Usar variáveis CSS existentes
5. Documentar com comentário

ANTES DE CRIAR:
- Mostre os componentes existentes em components.css
- Identifique se já existe algo parecido
- Proponha onde adicionar

APÓS CRIAR:
- Mostre o código adicionado
- Confirme que segue o padrão
```

## Prompt: Modificar Slide Existente

```
TAREFA: Modificar slide [N] do projeto OSTEOPOROSE.

⚠️ REGRAS DE PRESERVAÇÃO:
1. NÃO alterar estrutura HTML base do slide
2. NÃO adicionar inline styles
3. NÃO criar classes que não existem no CSS
4. PRESERVAR atributos data-* e aria-*
5. PRESERVAR referências/fontes existentes

ANTES:
- Mostre o conteúdo atual do slide
- Identifique o que será modificado

MODIFICAÇÃO:
- [Descrever a mudança específica]

APÓS:
- Mostre o antes e depois
- Confirme que estrutura foi preservada
```

## Prompt: Refatorar CSS

```
TAREFA: Refatorar/melhorar CSS do projeto.

⚠️ REGRAS CRÍTICAS:
1. NÃO quebrar estilos existentes
2. NÃO mudar nomes de classes usadas no HTML
3. NÃO remover código sem verificar uso
4. MANTER variáveis existentes
5. TESTAR após mudança

PROCESSO:
1. Listar todas as classes usadas no HTML
2. Identificar classes órfãs no CSS
3. Propor mudanças específicas
4. Implementar UMA mudança por vez
5. Testar no browser
6. Commitar se funciona
```

---

# PARTE 6: SINAIS DE ALERTA (PARAR IMEDIATAMENTE)

## 🚨 Se Claude Code Sugerir:

| Sugestão | Problema | Ação |
|----------|----------|------|
| "Vou criar um novo arquivo CSS" | Fragmentação | RECUSAR - usar existente |
| "Vou adicionar este style inline" | Inconsistência | RECUSAR - criar classe |
| "Vou copiar este código aqui" | Duplicação | RECUSAR - extrair componente |
| "Vou reescrever todo o arquivo" | Risco | RECUSAR - mudanças incrementais |
| "Vou instalar esta biblioteca" | Complexidade | RECUSAR - vanilla primeiro |
| "Vou mudar a estrutura de pastas" | Quebra tudo | RECUSAR - manter arquitetura |

## 🚨 Código Smell (Cheiro Ruim)

```css
/* 🚨 ALERTA: Cor hardcoded */
color: #1a2744;

/* 🚨 ALERTA: !important */
display: flex !important;

/* 🚨 ALERTA: ID para estilo */
#slide-15 { }

/* 🚨 ALERTA: Seletor muito específico */
div.slide section.content article p span { }
```

```javascript
// 🚨 ALERTA: Variável global
slideIndex = 5;

// 🚨 ALERTA: Query selector repetido
document.querySelector('.slide').style.display = 'none';
document.querySelector('.slide').classList.add('hidden');

// 🚨 ALERTA: Código duplicado
function showSlide1() { /* ... */ }
function showSlide2() { /* ... */ }  // Deveria ser genérico!
```

---

# PARTE 7: RECUPERAÇÃO DE ERROS

## Se Algo Quebrar

```
PASSO 1: PARAR
- Não faça mais mudanças
- Não tente "consertar rápido"

PASSO 2: IDENTIFICAR
- Qual arquivo foi modificado?
- Qual foi a última mudança?
- O que funcionava antes?

PASSO 3: REVERTER
git status                    # Ver mudanças
git diff [arquivo]            # Ver o que mudou
git checkout -- [arquivo]     # Reverter arquivo específico

PASSO 4: ENTENDER
- Por que quebrou?
- O que eu não entendi do sistema?

PASSO 5: RECOMEÇAR
- Abordagem menor/mais segura
- Testar cada passo
```

## Comando de Emergência

```powershell
# Reverter TODAS as mudanças não commitadas
git checkout -- .

# Ver último commit que funcionava
git log --oneline -5

# Voltar para commit específico (CUIDADO)
git checkout [hash] -- [arquivo]
```

---

# PARTE 8: MÉTRICAS DE QUALIDADE

## Código Saudável

| Métrica | Alvo | Como Verificar |
|---------|------|----------------|
| Arquivos CSS | ≤ 6 | `ls src/css/` |
| Linhas por arquivo CSS | ≤ 500 | `wc -l src/css/*.css` |
| Classes duplicadas | 0 | Busca manual |
| Variáveis hardcoded | 0 | `grep -r "#[0-9a-f]" src/css/` |
| !important | 0 (exceto print) | `grep -r "!important" src/css/` |
| Inline styles | 0 | `grep -r "style=" src/` |
| Console errors | 0 | DevTools |

## Revisão Semanal

```
TODO DOMINGO (ou antes de deadline):
□ Rodar todos os checks acima
□ Verificar se CSS cresceu demais
□ Identificar código duplicado
□ Limpar código morto
□ Testar todos os slides
□ Testar PDF export
□ Commit de "limpeza"
```

---

*Guardrails criados em 30/01/2026*
*Versão 1.0*
*"Código consistente é código que sobrevive"*
