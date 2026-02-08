/*
  slide-loader.js
  Carrega slides modulares de /slides/.

  Estratégia:
  - Lê slides/_list.txt (1 linha por arquivo).
  - Injeta os <section class="slide" data-slide> no container.
  - Funciona tanto em /src quanto em /dist (dist aponta para ../src).
*/

(function () {
  'use strict';

  function computeBase() {
    // Se estamos em .../dist/, as assets vivem em ../src/
    const path = window.location.pathname;
    const base = path.includes('/dist/') ? '../src/' : './';
    console.log('[slide-loader] Pathname:', path);
    console.log('[slide-loader] Base calculado:', base);
    return base;
  }

  async function fetchText(url) {
    console.log('[slide-loader] Fetch:', url);
    try {
      const res = await fetch(url, { cache: 'no-store' });
      console.log('[slide-loader] Response status:', res.status, res.statusText);
      if (!res.ok) {
        throw new Error('Falha ao carregar: ' + url + ' (status: ' + res.status + ')');
      }
      const text = await res.text();
      console.log('[slide-loader] Response size:', text.length, 'bytes');
      return text;
    } catch (err) {
      console.error('[slide-loader] Fetch error:', err);
      throw err;
    }
  }

  function parseList(txt) {
    return txt
      .split(/\r?\n/)
      .map(function (l) {
        return l.trim();
      })
      .filter(function (l) {
        return l !== '' && !l.startsWith('#');
      }); // Filtra vazios e comentários
  }

  function elementFromHTML(html, label) {
    const tpl = document.createElement('template');
    tpl.innerHTML = html.trim();
    if (tpl.content && tpl.content.children && tpl.content.children.length > 1) {
      console.warn('[slide-loader] multi-root ignored extras:' + (label ? ' ' + label : ''));
    }
    if (tpl.content && tpl.content.childNodes) {
      for (let i = 0; i < tpl.content.childNodes.length; i++) {
        const node = tpl.content.childNodes[i];
        if (node && node.nodeType === Node.TEXT_NODE && node.textContent && node.textContent.trim() !== '') {
          console.warn('[slide-loader] top-level text nodes ignored:' + (label ? ' ' + label : ''));
          break;
        }
      }
    }
    return tpl.content.firstElementChild;
  }

  async function loadSlides() {
    const container = document.querySelector('[data-slides]');
    if (!container) {
      console.error('[slide-loader] Container [data-slides] não encontrado');
      return;
    }

    const base = computeBase();
    const listUrl = base + 'slides/_list.txt';
    console.log('[slide-loader] Base path:', base);
    console.log('[slide-loader] Tentando carregar:', listUrl);

    try {
      const listTxt = await fetchText(listUrl);
      console.log('[slide-loader] _list.txt carregado, tamanho:', listTxt.length);
      const files = parseList(listTxt);
      console.log('[slide-loader] Arquivos encontrados:', files.length);

      // Validar _list vs _meta.json para evitar propagação de erro (index e print usam a mesma fonte)
      const metaUrl = base + 'slides/_meta.json';
      try {
        const metaTxt = await fetchText(metaUrl);
        const metaList = JSON.parse(metaTxt);
        if (metaList.length !== files.length) {
          console.warn(
            '[slide-loader] SEGURANÇA: _list.txt tem',
            files.length,
            'itens; _meta.json tem',
            metaList.length,
            '. Mantenha em sync (scripts/rename-osteoporose-slides-by-order.js).'
          );
        } else {
          for (let mi = 0; mi < files.length; mi++) {
            if (metaList[mi].file !== files[mi]) {
              console.warn(
                '[slide-loader] SEGURANÇA: ordem divergente em índice',
                mi + 1,
                '- list:',
                files[mi],
                'meta:',
                metaList[mi].file
              );
              break;
            }
          }
        }
      } catch (metaErr) {
        console.warn('[slide-loader] _meta.json não carregado ou inválido (não bloqueia):', metaErr.message);
      }

      // Expor para outras partes do sistema
      window.__OSTEOPOROSE_DECK = window.__OSTEOPOROSE_DECK || {};
      window.__OSTEOPOROSE_DECK.base = base;
      window.__OSTEOPOROSE_DECK.files = files;

      let loadedCount = 0;
      const failedSlides = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const slideUrl = base + 'slides/' + file;
        console.log('[slide-loader] Carregando slide', i + 1, '/', files.length, ':', file);

        // Pequeno delay para evitar sobrecarregar o servidor (especialmente Live Server)
        if (i > 0 && i % 5 === 0) {
          await new Promise(function (resolve) {
            setTimeout(resolve, 100);
          });
        }

        try {
          const html = await fetchText(slideUrl);
          const el = elementFromHTML(html, slideUrl);
          if (!el) {
            console.warn('[slide-loader] Slide não pôde ser parseado:', file);
            failedSlides.push(file);
            continue;
          }

          // Derivar chave Sxx_ a partir do nome do arquivo
          const m = file.match(/^(S\d{2,3}[a-z]?)_/);
          if (m) el.setAttribute('data-key', m[1]);

          // Estado inicial: oculto (respeita display inline do slide)
          el.hidden = true;
          el.setAttribute('aria-hidden', 'true');
          container.appendChild(el);
          loadedCount++;
        } catch (err) {
          console.error('[slide-loader] Erro ao carregar slide:', file, err);
          failedSlides.push(file);
          // CONTINUA carregando outros slides mesmo se um falhar
          // Não faz throw aqui para não interromper o loop
        }
      }

      if (failedSlides.length > 0) {
        console.warn('[slide-loader] Slides que falharam ao carregar:', failedSlides.length, failedSlides);
      }

      if (loadedCount === 0) {
        throw new Error('Nenhum slide foi carregado com sucesso. Verifique os erros acima.');
      }

      console.log('[slide-loader] Slides carregados com sucesso:', loadedCount, 'de', files.length);
      if (failedSlides.length > 0) {
        console.warn('[slide-loader] ATENÇÃO:', failedSlides.length, 'slide(s) falharam:', failedSlides.join(', '));

        // Mostrar notificação visual discreta
        const notification = document.createElement('div');
        notification.style.cssText =
          'position:fixed;top:60px;right:20px;background:rgba(239,68,68,0.9);color:white;padding:12px 16px;border-radius:8px;font-family:Inter,sans-serif;font-size:13px;z-index:10000;box-shadow:0 4px 12px rgba(0,0,0,0.2);max-width:300px;';
        notification.innerHTML =
          '<strong>⚠️ ' +
          failedSlides.length +
          ' slide(s) não carregaram</strong><br><span style="font-size:11px;opacity:0.9;">' +
          failedSlides.slice(0, 2).join(', ') +
          (failedSlides.length > 2 ? '...' : '') +
          '</span>';
        document.body.appendChild(notification);

        // Remover após 5 segundos
        setTimeout(function () {
          if (notification.parentNode) {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s';
            setTimeout(function () {
              if (notification.parentNode) notification.parentNode.removeChild(notification);
            }, 300);
          }
        }, 5000);
      }

      document.dispatchEvent(
        new CustomEvent('deck:loaded', {
          detail: { count: loadedCount, total: files.length, failed: failedSlides.length },
        })
      );
    } catch (err) {
      console.error('[slide-loader] Erro ao carregar lista:', err);
      throw err;
    }
  }

  // Aguardar DOM + pequeno delay para garantir que tudo está pronto
  function startLoading() {
    console.log('[slide-loader] Iniciando carregamento...');
    console.log('[slide-loader] URL atual:', window.location.href);
    console.log('[slide-loader] Pathname:', window.location.pathname);

    const container = document.querySelector('[data-slides]');
    if (!container) {
      console.error('[slide-loader] Container [data-slides] não encontrado no DOM');
      setTimeout(startLoading, 100); // Retry após 100ms
      return;
    }

    console.log('[slide-loader] Container encontrado:', container);
    loadSlides().catch(function (err) {
      console.error('[slide-loader] Erro capturado:', err);
      console.error('[slide-loader] Stack:', err.stack);
      console.error('[slide-loader] Tipo do erro:', err.constructor.name);

      const container = document.querySelector('[data-slides]');
      if (!container) {
        console.error('[slide-loader] Container não encontrado para exibir erro');
        return;
      }
      container.innerHTML =
        '<div style="padding:24px;font-family:Inter,system-ui;color:var(--navy);">' +
        '<h2 style="margin:0 0 8px 0;">Erro ao carregar slides</h2>' +
        '<p style="margin:0;opacity:.8;">Verifique se os arquivos em <code>slides/</code> estão disponíveis e se você está servindo via HTTP (não file://).</p>' +
        '<p style="margin:8px 0 0 0;font-size:12px;opacity:.6;font-family:monospace;">Erro: ' +
        (err.message || String(err)) +
        '</p>' +
        '<p style="margin:8px 0 0 0;font-size:11px;opacity:.5;">Abra o Console (F12) para mais detalhes.</p>' +
        '</div>';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(startLoading, 50);
    });
  } else {
    // DOM já está pronto
    setTimeout(startLoading, 50);
  }
})();
