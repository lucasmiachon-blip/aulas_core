#!/usr/bin/env python3
"""
MVP TRACKER - Gera métricas automaticamente escaneando slides
Uso: python3 mvp-tracker.py
"""

import os
import re
from datetime import datetime, timedelta
from pathlib import Path

# Configuração
SLIDES_DIR = "GRADE/src/slides"
DEADLINE = datetime(2026, 2, 10)
OUTPUT_FILE = "METRICAS_MVP.txt"

def scan_slide(filepath):
    """Escaneia um slide e detecta status MVP"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    issues = []
    
    # Detectar problemas críticos MVP
    # 1. Texto invisível (mesma cor bg e texto)
    if re.search(r'color:\s*#0B1320.*background.*#0B1320', content, re.IGNORECASE):
        issues.append("P0: Texto invisível (navy/navy)")
    if re.search(r'color:\s*var\(--navy\).*background.*var\(--navy\)', content, re.IGNORECASE):
        issues.append("P0: Texto invisível (var navy)")
    
    # 2. Símbolos inconsistentes
    if '⊙' in content:
        issues.append("P1: Símbolo errado (⊙ em vez de ⊕)")
    
    # 3. Inline styles faltando
    has_inline = 'style=' in content
    has_external = '<link' in content or 'href=' in content
    
    if not has_inline and has_external:
        issues.append("P1: Sem inline styles")
    
    # Status MVP: READY se não tiver P0
    p0_count = len([i for i in issues if i.startswith('P0')])
    status = "READY" if p0_count == 0 else "DRAFT"
    
    return {
        'status': status,
        'issues': issues,
        'has_inline': has_inline
    }

def generate_metrics():
    """Gera métricas MVP automaticamente"""
    
    print("📊 Escaneando slides para métricas MVP...")
    print()
    
    # Verificar se diretório existe
    if not os.path.exists(SLIDES_DIR):
        print(f"❌ Diretório não encontrado: {SLIDES_DIR}")
        print("   Execute este script no diretório aulas_core/")
        return
    
    # Escanear todos slides
    slides = {}
    for i in range(1, 46):
        slide_id = f"S{i:02d}"
        filepath = os.path.join(SLIDES_DIR, f"{slide_id}.html")
        
        if os.path.exists(filepath):
            slides[slide_id] = scan_slide(filepath)
        else:
            slides[slide_id] = {
                'status': 'MISSING',
                'issues': ['P0: Arquivo não existe'],
                'has_inline': False
            }
    
    # Calcular métricas
    total_slides = len(slides)
    ready_count = sum(1 for s in slides.values() if s['status'] == 'READY')
    draft_count = sum(1 for s in slides.values() if s['status'] == 'DRAFT')
    missing_count = sum(1 for s in slides.values() if s['status'] == 'MISSING')
    
    # P0 críticos (impedem apresentar)
    p0_issues = []
    for slide_id, data in slides.items():
        for issue in data['issues']:
            if issue.startswith('P0'):
                p0_issues.append(f"{slide_id}: {issue}")
    
    # Calcular dias restantes
    today = datetime.now()
    days_remaining = (DEADLINE - today).days
    
    # Calcular ritmo necessário
    slides_remaining = total_slides - ready_count
    daily_pace = slides_remaining / max(days_remaining, 1)
    
    # Gerar arquivo de métricas
    output = f"""# MÉTRICAS MVP - GRADE
# Atualizado: {today.strftime('%d/%m/%Y %H:%M')}
# Gerado automaticamente por mvp-tracker.py

## 🎯 OBJETIVO MVP
Deadline: 10 Fevereiro 2026
Dias restantes: {days_remaining} dias

## 📊 PROGRESSO SLIDES
READY (apresentáveis): {ready_count}/45 ({ready_count/45*100:.0f}%)
DRAFT (com problemas): {draft_count}/45
MISSING (não existem): {missing_count}/45

Completion MVP: {'█' * int(ready_count/45*10)}{'░' * (10-int(ready_count/45*10))} {ready_count/45*100:.0f}%

## ⚡ RITMO NECESSÁRIO
Slides restantes: {slides_remaining}
Ritmo: {daily_pace:.1f} slides READY/dia

## 🔴 BLOQUEADORES P0 (Críticos)
Total P0: {len(p0_issues)}
"""
    
    if p0_issues:
        for issue in p0_issues[:10]:  # Top 10
            output += f"- {issue}\n"
        if len(p0_issues) > 10:
            output += f"... e mais {len(p0_issues) - 10} P0s\n"
    else:
        output += "✅ Nenhum bloqueador P0!\n"
    
    output += f"""
## 📋 PRÓXIMOS 3 PASSOS
1. {'✅' if len(p0_issues) == 0 else '[ ]'} Eliminar todos P0 ({len(p0_issues)} restantes)
2. {'✅' if ready_count == 45 else '[ ]'} Todos slides READY ({ready_count}/45)
3. [ ] Teste final com colegas

## 📈 HISTÓRICO (últimos 7 dias)
"""
    
    # Tentar ler histórico anterior
    history = []
    if os.path.exists(OUTPUT_FILE):
        try:
            with open(OUTPUT_FILE, 'r', encoding='utf-8') as f:
                content = f.read()
                # Extrair linha do histórico anterior
                if match := re.search(r'(\d{2}/\d{2}) \| (\d+)/45', content):
                    history.append(f"{match.group(1)} | {match.group(2)}/45")
        except:
            pass
    
    # Adicionar hoje
    history.append(f"{today.strftime('%d/%m')} | {ready_count}/45")
    
    # Manter só últimos 7 dias
    for line in history[-7:]:
        output += f"{line}\n"
    
    output += f"""
---
ATUALIZAÇÃO AUTOMÁTICA
Para atualizar métricas: python3 mvp-tracker.py
Para detalhes: ver DASHBOARD.xlsx
"""
    
    # Salvar arquivo
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(output)
    
    print(f"✅ Métricas salvas em: {OUTPUT_FILE}")
    print()
    print("📊 RESUMO:")
    print(f"   READY: {ready_count}/45 ({ready_count/45*100:.0f}%)")
    print(f"   P0 críticos: {len(p0_issues)}")
    print(f"   Dias restantes: {days_remaining}")
    print(f"   Ritmo necessário: {daily_pace:.1f} slides/dia")
    print()
    
    if len(p0_issues) > 0:
        print("🔴 BLOQUEADORES P0 (top 5):")
        for issue in p0_issues[:5]:
            print(f"   - {issue}")
        print()
    
    # Detalhes por slide (opcional, para debug)
    if os.getenv('DEBUG'):
        print("\n📋 DETALHES POR SLIDE:")
        for slide_id, data in sorted(slides.items()):
            status_icon = "✅" if data['status'] == "READY" else "⚠️" if data['status'] == "DRAFT" else "❌"
            print(f"{status_icon} {slide_id}: {data['status']}")
            for issue in data['issues']:
                print(f"      - {issue}")

if __name__ == '__main__':
    generate_metrics()
