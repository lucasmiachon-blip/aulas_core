# Release Notes — PATCH0_6

**Data:** 29/01/2026  
**Autor:** ChatGPT  
**Revisão:** Lucas + Dr. Voxel

## Resumo
Correção de overflow em slides críticos do módulo **Osteoporose**, sem alterar conteúdo médico (claims, números e referências preservados).  
Também foi feita verificação de encoding UTF-8 (sem padrões de mojibake detectados).

## Estratégias Aplicadas

| Slide | Arquivo | Overflow (antes) | Estratégia | Resultado |
|------:|---------|-----------------:|-----------|-----------|
| 20 | S35_slide-32.html | 720px | **Dividir em 2 slides** + compactação | OK |
| 20b | S35b_slide-32b.html | — | **Novo slide** (Parte 2/2) | OK |
| 44 | S45_slide-42.html | 282px | Compactar | OK |
| 12 | S09_slide-11.html | 272px | Compactar | OK |
| 59 | S50_slide-47.html | 250px | Compactar | OK |
| 72 | S49_slide-46.html | 219px | Compactar | OK |
| 48 | S69_slide-66.html | 184px | Compactar | OK |
| 26 | S38_slide-35.html | 173px | Compactar | OK |
| 47 | S48_slide-45.html | 77px | Compactar | OK |

## Observações
- **viewer.js não foi alterado** (conforme regra do patch).
- Ajustes feitos apenas em **HTML inline styles** dos slides (padding, gaps, tamanhos de fonte, margens).
- **Sem cores hardcoded em hex**: mantidos tokens (`var(--...)` / `rgba(var(--...-rgb), ...)`).
- **_list.txt atualizado** para inserir o novo slide `S35b_slide-32b.html` logo após `S35_slide-32.html`.
- Verificação de mojibake: busca por padrões `Ã¡`, `Ã©`, `Ã£`, `Ã§`, `â€“` (sem ocorrências).

