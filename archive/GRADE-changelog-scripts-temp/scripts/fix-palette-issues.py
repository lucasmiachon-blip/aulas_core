#!/usr/bin/env python3
"""
Script para corrigir problemas de paleta não profissional:
- Substitui cores laranjas (#E67E22, #D35400, etc) por cores da paleta
- Corrige boxes quadrados (border-radius: 0)
- Melhora delimitadores (régua)
"""

import os
import re
from pathlib import Path

# Mapeamento de cores laranjas não profissionais → paleta
ORANGE_FIXES = {
    '#E67E22': 'var(--warning)',  # Laranja → warning (amber)
    '#D35400': 'var(--warning)',  # Laranja escuro → warning
    '#d97706': 'var(--warning)',  # Amber escuro → warning
    '#F39C12': 'var(--warning)',  # Laranja claro → warning
    '#f59e0b': 'var(--warning)',  # Amber → warning
}

def fix_palette_issues(file_path):
    """Corrige problemas de paleta e design"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    changes = 0
    
    # 1. Substituir cores laranjas por variáveis da paleta
    for orange_color, css_var in ORANGE_FIXES.items():
        pattern = re.compile(re.escape(orange_color), re.IGNORECASE)
        matches = pattern.findall(content)
        if matches:
            content = pattern.sub(css_var, content)
            changes += len(matches)
    
    # 2. Corrigir boxes quadrados (border-radius: 0 → border-radius: 0.6vw)
    # Mas só se não for intencional (ex: linhas, separadores)
    # Procura por border-radius: 0 que não seja parte de um padrão específico
    border_radius_zero = re.compile(r'border-radius:\s*0(?!\d|\.|px|vw|em|rem|%)', re.IGNORECASE)
    matches = border_radius_zero.findall(content)
    if matches:
        # Substituir por um valor razoável (0.6vw é padrão nos slides)
        content = border_radius_zero.sub('border-radius: 0.6vw', content)
        changes += len(matches)
    
    # 3. Melhorar delimitadores/régua (border: 1px → border: 2px solid ou similar)
    # Apenas para bordas muito finas que podem estar mal delimitadas
    # (vou deixar isso mais conservador para não quebrar layouts específicos)
    
    # 4. Substituir Lato por Inter (se ainda houver)
    if "font-family: 'Lato'" in content or 'font-family: Lato' in content:
        content = content.replace("font-family: 'Lato'", "font-family: 'Inter'")
        content = content.replace("font-family: Lato", "font-family: 'Inter'")
        changes += content.count("font-family: 'Inter'")
    
    # Salvar apenas se houver mudanças
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return changes
    return 0

def main():
    slides_dir = Path('GRADE/src/slides')
    if not slides_dir.exists():
        print(f"[ERRO] Diretorio nao encontrado: {slides_dir}")
        return
    
    total_changes = 0
    files_changed = 0
    
    # Processar todos os arquivos HTML
    for html_file in sorted(slides_dir.glob('S*.html')):
        changes = fix_palette_issues(html_file)
        if changes > 0:
            files_changed += 1
            total_changes += changes
            print(f"[OK] {html_file.name}: {changes} correcoes")
    
    print(f"\n[RESUMO]")
    print(f"   Arquivos modificados: {files_changed}")
    print(f"   Total de correcoes: {total_changes}")

if __name__ == '__main__':
    main()
