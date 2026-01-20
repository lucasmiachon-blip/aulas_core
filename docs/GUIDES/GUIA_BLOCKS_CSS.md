# 📖 GUIA: Como Usar blocks.css

**Para:** Claude Conteúdo e outras IAs que criam conteúdo  
**Arquivo:** `GRADE/src/css/blocks.css`  
**Status:** ✅ Integrado e pronto para uso

---

## 🎯 OBJETIVO

O `blocks.css` fornece **classes prontas** para criar elementos visuais consistentes sem precisar escrever CSS inline complexo.

**Vantagens:**
- ✅ Código mais limpo
- ✅ Estilo consistente em todo o projeto
- ✅ Fácil manutenção (mudar em um lugar só)
- ✅ Usa paleta oficial automaticamente

---

## 📊 TABELAS

### Uso Básico

```html
<table class="table-medium">
    <thead>
        <tr>
            <th>Coluna 1</th>
            <th>Coluna 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Dado 1</td>
            <td>Dado 2</td>
        </tr>
    </tbody>
</table>
```

### Tamanhos Disponíveis

- `table-small` - Fonte: 0.85vw, Padding: 0.8vw
- `table-medium` - Fonte: 1vw, Padding: 1.2vw (padrão)
- `table-large` - Fonte: 1.5vw, Padding: 1.5vw
- `table-xlarge` - Fonte: 1.6vw, Padding: 1.8vw

**Exemplo:**
```html
<table class="table-small">  <!-- Tabela compacta -->
<table class="table-large">  <!-- Tabela grande -->
```

### Estilo Automático

Todas as tabelas com essas classes recebem automaticamente:
- ✅ Fundo branco
- ✅ Cabeçalho com `var(--navy)` e texto branco
- ✅ Borda dourada (`var(--gold)`) no cabeçalho
- ✅ Linhas alternadas (zebra)
- ✅ Bordas arredondadas
- ✅ Sombra sutil
- ✅ Tipografia Lato

### Ajustes Específicos

Se precisar de ajustes específicos (alinhamento, cores especiais), use `style` inline apenas para o que precisa:

```html
<th style="text-align: center;">Centrado</th>
<td style="color: var(--teal); font-weight: bold;">Destaque</td>
```

---

## 💬 CALLOUTS (Caixas de Destaque)

### Uso Básico

```html
<div class="callout">
    <p>Mensagem importante aqui</p>
</div>
```

### Variantes

- `callout` - Padrão (borda azul escuro)
- `callout-warning` - Aviso (borda dourada)
- `callout-info` - Informação (borda azul)
- `callout-success` - Sucesso (borda teal)

**Exemplo:**
```html
<div class="callout callout-warning">
    <p>Atenção: Este é um aviso importante</p>
</div>
```

### Estilo Automático

- ✅ Fundo sutil
- ✅ Borda esquerda colorida
- ✅ Padding adequado
- ✅ Texto em negrito
- ✅ Usa paleta oficial

---

## 🏷️ BADGES (Tags/Labels)

### Uso Básico

```html
<span class="badge">FORTE</span>
<span class="badge">MODERADA</span>
```

### Variantes

- `badge` - Padrão (fundo navy)
- `badge-gold` - Dourado (fundo gold, texto navy)
- `badge-teal` - Teal (fundo teal)
- `badge-blue` - Azul (fundo blue)
- `badge-muted` - Cinza (fundo muted)

**Exemplo:**
```html
<span class="badge badge-gold">FORTE</span>
<span class="badge badge-teal">ALTA</span>
```

### Badge Row (Múltiplos Badges)

```html
<div class="badge-row">
    <span class="badge badge-gold">FORTE</span>
    <span class="badge badge-teal">ALTA</span>
</div>
```

### Estilo Automático

- ✅ Texto em maiúsculas
- ✅ Padding adequado
- ✅ Bordas arredondadas
- ✅ Tipografia Lato bold
- ✅ Usa paleta oficial

---

## 📦 BLOCKS (Blocos de Conteúdo)

### Uso Básico

```html
<div class="block">
    <div class="block__title">Título do Bloco</div>
    <div class="block__body">Conteúdo do bloco aqui</div>
</div>
```

### Estrutura

- `.block` - Container principal
- `.block__title` - Título (Georgia serif)
- `.block__body` - Corpo (Lato sans-serif)

**Exemplo:**
```html
<div class="block">
    <div class="block__title">Recomendação</div>
    <div class="block__body">
        Texto da recomendação aqui...
    </div>
</div>
```

---

## ✅ CHECKLIST PARA OUTRAS IAs

Ao criar conteúdo, verifique:

- [ ] Usei classes do `blocks.css` ao invés de CSS inline?
- [ ] Tabelas usam `table-small`, `table-medium`, `table-large` ou `table-xlarge`?
- [ ] Callouts usam `callout` ou variantes (`callout-warning`, etc)?
- [ ] Badges usam `badge` ou variantes (`badge-gold`, etc)?
- [ ] Mantive apenas estilos inline necessários (alinhamento, cores especiais)?
- [ ] Usei `var(--nome)` para cores ao invés de `#XXXXXX`?

---

## 🚫 O QUE NÃO FAZER

❌ **NÃO crie CSS inline complexo** se existe classe no `blocks.css`:
```html
<!-- ❌ ERRADO -->
<table style="width: 100%; border-collapse: collapse; background: white; border-radius: 0.8vw; ...">

<!-- ✅ CORRETO -->
<table class="table-medium">
```

❌ **NÃO use cores hardcoded**:
```html
<!-- ❌ ERRADO -->
<div style="background: #F0F0F0; border-left: 4px solid #0B1320;">

<!-- ✅ CORRETO -->
<div class="callout">
```

---

## 📝 EXEMPLOS COMPLETOS

### Tabela com Badges

```html
<table class="table-medium">
    <thead>
        <tr>
            <th>Recomendação</th>
            <th>Força</th>
            <th>Certeza</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Recomendação 1</td>
            <td><span class="badge badge-gold">FORTE</span></td>
            <td><span class="badge badge-teal">ALTA</span></td>
        </tr>
    </tbody>
</table>
```

### Callout com Tabela

```html
<div class="callout callout-info">
    <p>Informação importante sobre a tabela abaixo:</p>
</div>

<table class="table-small">
    <!-- conteúdo da tabela -->
</table>
```

### Block com Badges

```html
<div class="block">
    <div class="block__title">Recomendação GRADE</div>
    <div class="block__body">
        <p>Texto da recomendação...</p>
        <div class="badge-row">
            <span class="badge badge-gold">FORTE</span>
            <span class="badge badge-teal">ALTA</span>
        </div>
    </div>
</div>
```

---

## 🔗 REFERÊNCIAS

- **Arquivo CSS:** `GRADE/src/css/blocks.css`
- **Paleta oficial:** `docs/PROMPT_PALETA_OFICIAL.md`
- **Exemplos no código:** Ver `GRADE/src/index.html` (tabelas já ajustadas)

---

**Última atualização:** Janeiro 2026  
**Status:** ✅ Integrado e pronto para uso
