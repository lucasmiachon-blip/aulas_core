#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para substituir padding: 60px por padding: 40px em slides OSTEOPOROSE
"""

import os
import re
from pathlib import Path

def fix_padding_in_file(filepath):
    """Substitui padding: 60px por padding: 40px"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Substituir padding: 60px por padding: 40px
        # Também pode ter padding: 60px 60px ou padding: 60px 80px, etc
        content = re.sub(r'padding:\s*60px', 'padding: 40px', content)
        content = re.sub(r'padding:\s*60px\s+60px', 'padding: 40px 40px', content)
        content = re.sub(r'padding:\s*60px\s+80px', 'padding: 40px 80px', content)
        content = re.sub(r'padding:\s*80px\s+60px', 'padding: 80px 40px', content)
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"ERRO ao processar {filepath}: {e}")
        return False

def main():
    # Usar caminho absoluto baseado no script
    script_dir = Path(__file__).resolve().parent
    project_root = script_dir.parent
    base_dir = project_root / 'OSTEOPOROSE' / 'src' / 'slides'
    
    files_processed = 0
    files_modified = 0
    
    # Processar todos os arquivos .html
    for filepath in base_dir.glob('S*.html'):
        files_processed += 1
        if fix_padding_in_file(filepath):
            files_modified += 1
            print(f"OK Corrigido: {filepath.name}")
    
    print(f"\nResumo:")
    print(f"   Arquivos processados: {files_processed}")
    print(f"   Arquivos modificados: {files_modified}")

if __name__ == '__main__':
    main()
