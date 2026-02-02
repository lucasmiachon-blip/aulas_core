#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para corrigir encoding (mojibake) em arquivos OSTEOPOROSE
"""

import os
import re
from pathlib import Path

# Mapeamento de correções
REPLACEMENTS = [
    ('Ã¡', 'á'),
    ('Ã£', 'ã'),
    ('Ã§', 'ç'),
    ('Ã©', 'é'),
    ('Ãª', 'ê'),
    ('Ã­', 'í'),
    ('Ã³', 'ó'),
    ('Ãµ', 'õ'),
    ('Ãº', 'ú'),
    ('Ã ', 'à'),
    ('Ã¢', 'â'),
    ('Ã´', 'ô'),
    ('â€"', '–'),
    ('â€"', '—'),
    ('â€œ', '"'),
    ('â€', '"'),
    ('â€™', "'"),
    ('â—€', '◀'),
    ('â–¶', '▶'),
    ('â†'', '→'),
    ('â†'', '←'),
    ('â€¢', '•'),
    ('â‰¥', '≥'),
    ('â‰¤', '≤'),
    ('Ã—', '×'),
]

def fix_encoding_in_file(filepath):
    """Corrige encoding em um arquivo"""
    try:
        # Ler arquivo com encoding UTF-8
        with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
            content = f.read()
        
        original_content = content
        modified = False
        
        # Aplicar todas as substituições
        for old, new in REPLACEMENTS:
            if old in content:
                content = content.replace(old, new)
                modified = True
        
        # Escrever de volta se houve mudanças
        if modified:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"❌ Erro ao processar {filepath}: {e}")
        return False

def main():
    base_dir = Path(__file__).parent.parent / 'OSTEOPOROSE'
    
    # Extensões a processar
    extensions = ['.html', '.js', '.css', '.md']
    
    files_processed = 0
    files_modified = 0
    
    # Processar todos os arquivos
    for ext in extensions:
        for filepath in base_dir.rglob(f'*{ext}'):
            files_processed += 1
            if fix_encoding_in_file(filepath):
                files_modified += 1
                print(f"✅ Corrigido: {filepath.relative_to(base_dir.parent)}")
    
    print(f"\n📊 Resumo:")
    print(f"   Arquivos processados: {files_processed}")
    print(f"   Arquivos modificados: {files_modified}")

if __name__ == '__main__':
    main()
