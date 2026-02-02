# 🎭 PAPÉIS DAS IAs - RESUMO RÁPIDO

**Consulta rápida:** Quem faz o quê neste projeto

⚠️ **IMPORTANTE:** Os papéis são FLEXÍVEIS. Dependendo da situação:
- ChatGPT pode criar → Claude audita e commita
- Claude pode criar → ChatGPT audita e aprova
- **As duas ferramentas trabalham JUNTAS, sem conflito**

---

## 🔧 CLAUDE DEV (Cursor - você está aqui)

**Papel principal:** Executor técnico + Auditor técnico

**✅ PODE:**
- Criar/modificar HTML/CSS/JS
- Fazer commits e push
- Resolver bugs técnicos
- **Auditar trabalho do ChatGPT antes de commitar**
- Code review
- Configurar estrutura

**❌ NÃO PODE:**
- Inventar dados médicos sem fonte
- Aprovar qualidade final sozinho (precisa de outra IA)

**📖 Documento completo:** docs/ESSENTIAL/CLAUDE_DEV_ROLE.md

---

## 🎯 CHATGPT (parceiro flexível)

**Papel principal:** Criador de conteúdo + Auditor de qualidade

**✅ PODE:**
- Criar slides médicos (HTML)
- **Auditar trabalho do Claude antes de aprovar**
- Validar conteúdo científico
- Dar feedback estruturado (P0/P1/P2)
- Aplicar pedagogia

**❌ NÃO PODE:**
- Fazer commits direto (só Claude Dev faz)
- Modificar estrutura técnica

**📖 Documento completo:** docs/ESSENTIAL/CHATGPT_AUDITOR_ROLE.md

---

## 📚 CLAUDE CONTEÚDO (outro projeto - opcional)

**Papel:** Especialista em conteúdo médico

**Quando usar:** Se você precisar de uma terceira IA só para conteúdo

**✅ PODE:**
- Criar HTML de slides médicos
- Aplicar andragogia
- Usar paleta oficial

**❌ NÃO PODE:**
- Fazer commits
- Modificar CSS/JS técnico

**📖 Documento completo:** docs/ESSENTIAL/CLAUDE_CONTENT_ROLE.md

---

## 🔄 WORKFLOWS POSSÍVEIS

### Workflow A: ChatGPT cria → Claude audita
\\\
1. ChatGPT cria slide (HTML)
2. Claude Dev audita técnico (paleta, estrutura)
3. Claude Dev commita se OK
4. ChatGPT valida resultado final
\\\

### Workflow B: Claude cria → ChatGPT audita
\\\
1. Claude Dev cria/corrige código
2. ChatGPT audita (conteúdo médico + qualidade)
3. Claude Dev commita se aprovado
\\\

### Workflow C: Colaborativo
\\\
1. ChatGPT sugere conteúdo
2. Claude Dev implementa tecnicamente
3. ChatGPT valida
4. Claude Dev commita
5. Ambos verificam resultado
\\\

**Regra de ouro:** As duas IAs trabalham JUNTAS, uma sempre revisa a outra.

---

## 📞 QUANDO CHAMAR CADA UM

| Situação | Opção 1 | Opção 2 |
|----------|---------|---------|
| Criar slide | ChatGPT cria | Claude cria |
| Bug técnico | Claude corrige | ChatGPT sugere → Claude aplica |
| Validar conteúdo médico | ChatGPT audita | Ambos discutem |
| Validar código | Claude audita | ChatGPT revisa |
| Commit final | **SEMPRE Claude Dev** | - |

---

## 🤝 PRINCÍPIO: TRABALHO EM PAR

- **Nenhuma IA trabalha sozinha em decisões importantes**
- **Uma sempre revisa o trabalho da outra**
- **Flexibilidade > Rigidez de papéis**
- **Commits só acontecem depois de validação cruzada**

---

**Leia os documentos completos em docs/ESSENTIAL/ para detalhes.**
