# Presentation Technical Setup

## 🎯 Responsável: Claude (chat técnico)

Aspectos TÉCNICOS da entrega/apresentação dos slides.

**NÃO cobre:** Conteúdo, timing pedagógico, estrutura de aula (outro Claude)

---

## 📤 EXPORTAÇÃO E DISTRIBUIÇÃO

### PDF Export

**Já implementado:** `scripts/export-pdf.js` (Node.js + Playwright)

**Configuração padrão:**
```javascript
{
  format: 'A4',
  landscape: true,
  printBackground: true,
  preferCSSPageSize: false
}
```

**Problemas conhecidos:**
- ✅ Resolvido: CSS page breaks
- ✅ Resolvido: Timeout issues
- ⚠️ Pendente: Fonts embarcadas no PDF

**Uso:**
```bash
cd GRADE
npm install
node ../scripts/export-pdf.js
# Output: GRADE/GRADE-slides.pdf
```

**Quando gerar:**
- Antes de apresentar (backup)
- Após finalizar versão estável
- Para distribuição aos alunos

---

### HTML Standalone

**Objetivo:** Arquivo único portátil (sem dependências externas)

**Requisitos:**
- [ ] Inline CSS (base.css dentro do HTML)
- [ ] Inline JS (slide-system/* dentro do HTML)
- [ ] Fonts embarcadas (Base64 ou system fonts)
- [ ] Sem requests externos

**Script futuro:** `scripts/build-standalone.js`

**Uso:**
```bash
# Gerar GRADE-standalone.html
npm run build:standalone
```

---

### Print Version

**Para impressão em papel:**
```css
@media print {
  /* Remover backgrounds escuros */
  .bg-navy {
    background: white !important;
    color: black !important;
  }
  
  /* Garantir quebras de página */
  .slide {
    page-break-after: always;
  }
  
  /* Ocultar controles */
  .controls,
  .slide-counter {
    display: none;
  }
}
```

**Quando usar:**
- Handouts para alunos
- Material de estudo impresso
- Backup físico

---

## 🎤 MODO APRESENTADOR

### Funcionalidades Desejadas

**Tela do apresentador:**
- [ ] Slide atual
- [ ] Preview do próximo slide
- [ ] Timer/cronômetro
- [ ] Notas do apresentador
- [ ] Indicador de tempo restante

**Tela do público:**
- [ ] Slide atual (sem notas)
- [ ] Fullscreen automático

### Implementação (Futuro)

**Opção A - Reveal.js Speaker View:**
- Usar framework Reveal.js
- Built-in speaker notes
- Dual-screen support

**Opção B - Custom (mais controle):**
```javascript
// Abrir janela secundária
const presenterWindow = window.open('presenter.html', 'presenter');

// Sincronizar slides
window.addEventListener('slidechange', (e) => {
  presenterWindow.postMessage({
    current: e.currentSlide,
    next: e.nextSlide
  });
});
```

**Notas no HTML:**
```html
<section class="slide">
  <!-- Conteúdo visível -->
  <h2>Título</h2>
  
  <!-- Notas (só apresentador) -->
  <aside class="notes">
    Enfatizar que isso é controverso.
    Pausar aqui para perguntas.
  </aside>
</section>
```

---

## 💾 VERSIONAMENTO E BACKUP

### Snapshots Antes de Apresentar

**Política:**
1. Criar snapshot antes de cada apresentação
2. Nomear com data: `YYYY-MM-DD-evento`
3. Armazenar em `archive/snapshots/`

**Processo:**
```bash
# 1. Garantir que está tudo commitado
git status

# 2. Criar tag com data
git tag -a v1.0-2026-01-19 -m "Versão apresentada em SBC 2026"

# 3. Fazer backup do HTML
cp GRADE/src/index.html archive/snapshots/2026-01-19-SBC.html

# 4. Gerar PDF da versão
node scripts/export-pdf.js
mv GRADE-slides.pdf archive/snapshots/2026-01-19-SBC.pdf
```

---

### Rollback

**Se precisar voltar:**
```bash
# Listar tags
git tag

# Voltar para versão específica
git checkout v1.0-2026-01-19

# Ou restaurar arquivo específico
git checkout v1.0-2026-01-19 -- GRADE/src/index.html
```

---

## 🖥️ SETUP TÉCNICO DA APRESENTAÇÃO

### Hardware Recomendado

**Apresentador:**
- Laptop com HDMI ou USB-C
- Adaptadores (HDMI, VGA, DisplayPort)
- Mouse/clicker wireless
- Backup: outro laptop com mesma apresentação

**Projetor/Tela:**
- Resolução mínima: 1280x720 (HD)
- Ideal: 1920x1080 (Full HD)
- Aspect ratio: 16:9

---

### Checklist Pré-Apresentação

**30 min antes:**
- [ ] Testar conexão projetor
- [ ] Verificar aspect ratio (não está esticado?)
- [ ] Testar navegação (setas funcionam?)
- [ ] Abrir slides no navegador (Chrome recomendado)
- [ ] Fechar outras abas/programas
- [ ] Modo "Não Perturbar" ativado
- [ ] PDF backup disponível (pendrive + email)

**5 min antes:**
- [ ] Fullscreen (F11)
- [ ] Verificar áudio (se houver vídeos)
- [ ] Slide 1 visível
- [ ] Água e clicker à mão

---

### Troubleshooting Comum

**Problema:** Slides não aparecem no projetor
- Solução: Win+P (Windows) ou Cmd+F1 (Mac) para espelhar

**Problema:** Navegação não funciona
- Solução: Clicar no viewport, garantir foco

**Problema:** Fonts não carregam
- Solução: Verificar internet ou usar fonts do sistema

**Problema:** Cores diferentes no projetor
- Solução: Calibrar projetor ou usar PDF (cores fixas)

**Problema:** Aspect ratio errado (esticado)
- Solução: Ajustar resolução do projetor para 16:9

---

## 📱 MOBILE/TABLET (Opcional)

### Suporte Básico

**Já implementado:**
- `responsive-fix.css` com media queries
- Touch targets mínimos (44x44px)
- Controles adaptativos

**Limitações:**
- Otimizado para desktop/projetor
- Mobile é secundário (alunos podem abrir)

**Teste:**
```
Chrome DevTools > Device Toolbar
- iPhone 12 Pro (390x844)
- iPad Air (820x1180)
- Galaxy S21 (360x800)
```

---

## 🔒 SEGURANÇA E PRIVACIDADE

### Dados Sensíveis

**Nunca incluir nos slides:**
- Dados de pacientes identificáveis
- Informações institucionais confidenciais
- Emails/contatos pessoais (a menos que público)

**Sempre anonimizar:**
- Casos clínicos (use iniciais ou códigos)
- Screenshots de sistemas (blur dados sensíveis)
- Dados de pesquisas não publicadas

---

### Distribuição Controlada

**Para material interno:**
- Usar GitHub Private Repository
- Compartilhar PDF com watermark
- Adicionar "Uso Interno" no rodapé

**Para material público:**
- GitHub Pages (já configurado ✅)
- URL pública: `https://lucasmiachon-blip.github.io/aulas_core/grade/`

---

## 🎯 CHECKLIST TÉCNICO FINAL

Antes de considerar apresentação "tech-ready":

### Arquivos
- [ ] `src/index.html` atualizado
- [ ] `dist/` sincronizado com `src/`
- [ ] PDF gerado e testado
- [ ] Snapshot criado (`archive/snapshots/`)
- [ ] Git tag criada (`v1.0-YYYY-MM-DD`)

### Funcionalidade
- [ ] Navegação funciona (setas + botões)
- [ ] Contador de slides correto
- [ ] Nenhum console error
- [ ] Fonts carregam corretamente
- [ ] Viewport 16:9 mantido

### Backup
- [ ] PDF no pendrive
- [ ] HTML standalone (se disponível)
- [ ] PDF enviado por email (próprio)
- [ ] Segundo laptop com mesma apresentação (ideal)

### Ambiente
- [ ] Testado no laptop que vai usar
- [ ] Testado com projetor (se possível)
- [ ] Clicker wireless testado
- [ ] Adaptadores disponíveis

---

## 📊 NÍVEIS DE PREPARAÇÃO

**Mínimo (MVP):**
- ✅ Slides funcionam no navegador
- ✅ PDF backup existe
- ✅ Navegação testada

**Recomendado:**
- ✅ Tudo do Mínimo
- ✅ Testado com projetor
- ✅ Snapshot em `archive/`
- ✅ Segundo backup (email/pendrive)

**Profissional:**
- ✅ Tudo do Recomendado
- ✅ Modo apresentador configurado
- ✅ HTML standalone disponível
- ✅ Ensaio completo realizado

---

## 🔮 ROADMAP FUTURO

**Curto prazo (próximas versões):**
- [ ] Script `build-standalone.js`
- [ ] Print CSS otimizado
- [ ] Fonts embarcadas no PDF

**Médio prazo:**
- [ ] Modo apresentador (dual screen)
- [ ] Timer/cronômetro integrado
- [ ] Notas do apresentador

**Longo prazo:**
- [ ] PWA (funciona offline)
- [ ] Sincronização multi-device
- [ ] Analytics de tempo por slide (para otimizar)

---

**Versão:** 1.0  
**Última atualização:** 2026-01-19  
**Responsável:** Claude (chat técnico)
