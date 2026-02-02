#!/usr/bin/env python3
"""
Script para normalizar cores hardcoded nos slides HTML
Substitui cores hex por variáveis CSS da paleta oficial
"""

import os
import re
from pathlib import Path

# Mapeamento de cores hex → variáveis CSS
COLOR_MAP = {
    # Texto
    '#222': 'var(--text)',
    '#2C2C2C': 'var(--text)',
    '#333': 'var(--text)',
    '#444': 'var(--muted)',
    '#666': 'var(--muted)',
    '#888': 'var(--muted)',
    '#999': 'var(--muted)',
    '#AAA': 'var(--muted)',
    
    # Fundos
    '#F8F8F8': 'var(--bg)',
    '#F8F9FA': 'var(--bg)',
    '#FAFAFA': 'var(--white)',
    '#F5F5F5': 'var(--bg)',
    '#F0F0F0': 'var(--border)',
    '#FFFBF0': 'rgba(var(--gold), 0.1)',  # Especial: fundo amarelado
    
    # Cores da paleta
    '#0B1320': 'var(--navy)',
    '#1F766E': 'var(--teal)',
    '#DDB944': 'var(--gold)',
    '#B8860B': 'var(--gold)',
    '#B91C1C': 'var(--danger)',  # Vermelho para downgrade
    '#FFFFFF': 'var(--white)',
    
    # Cores semânticas (preparação)
    '#10B981': 'var(--success)',
    '#F59E0B': 'var(--warning)',
    '#EF4444': 'var(--danger)',
    
    # Especiais que aparecem com frequência
    '#E0E0E0': 'var(--muted)',  # Cinza claro texto
    '#D0D0D0': 'var(--muted)',
    '#155724': '#155724',  # Verde escuro (manter por enquanto)
    '#D4EDDA': '#D4EDDA',  # Verde claro (manter por enquanto)
    '#E2F0E8': 'rgba(var(--teal), 0.1)',  # Teal claro
    
    # Cores específicas encontradas
    '#5B6774': 'var(--muted)',  # Cinza médio
    '#D4AF37': 'var(--gold)',  # Gold alternativo
    '#152432': 'var(--navy)',  # Navy escuro
    '#7B8794': 'var(--muted)',  # Cinza médio
    '#50C878': 'var(--success)',  # Verde sucesso
    '#856404': 'var(--warning)',  # Amber escuro
    '#78350f': 'var(--warning)',  # Amber escuro
    '#fef3c7': 'rgba(var(--warning), 0.15)',  # Amber claro
    '#C9A735': 'var(--gold)',  # Gold alternativo
    '#FFE5E5': 'rgba(var(--danger), 0.1)',  # Vermelho claro
    '#E8F5E9': 'rgba(var(--success), 0.1)',  # Verde claro
}

def normalize_colors_in_file(file_path):
    """Substitui cores hardcoded por variáveis CSS"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    changes = 0
    
    # Substituir cada cor do mapeamento
    for hex_color, css_var in COLOR_MAP.items():
        # Regex para encontrar cores hex (case insensitive)
        pattern = re.compile(re.escape(hex_color), re.IGNORECASE)
        matches = pattern.findall(content)
        if matches:
            content = pattern.sub(css_var, content)
            changes += len(matches)
    
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
        changes = normalize_colors_in_file(html_file)
        if changes > 0:
            files_changed += 1
            total_changes += changes
            print(f"[OK] {html_file.name}: {changes} substituicoes")
    
    print(f"\n[RESUMO]")
    print(f"   Arquivos modificados: {files_changed}")
    print(f"   Total de substituicoes: {total_changes}")

if __name__ == '__main__':
    main()
