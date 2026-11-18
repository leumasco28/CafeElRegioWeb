/**
 * Content script de la extensión "Café El Regio — Editor Web".
 * Se inyecta en todas las páginas y añade un botón flotante de "Editar página"
 * que permite capturar la estructura del DOM como JSON compatible con el editor
 * visual del proyecto Café El Regio.
 */

(function () {
  'use strict';

  const BUTTON_ID = 'cer-editor-toggle';
  const PANEL_ID = 'cer-editor-panel';
  const OVERLAY_ID = 'cer-editor-overlay';
  const STORAGE_KEY = 'cafe_el_regio_captured_pages';

  let isEditorActive = false;
  let selectedElement = null;
  let styleElement = null;

  // --- Estilos inyectados ---

  function injectStyles() {
    if (styleElement) return;
    styleElement = document.createElement('style');
    styleElement.textContent = `
      #${BUTTON_ID} {
        position: fixed;
        top: 16px;
        right: 16px;
        z-index: 2147483647;
        background: #e9b949;
        color: #1c1511;
        border: none;
        border-radius: 8px;
        padding: 10px 14px;
        font-weight: 700;
        font-size: 0.85rem;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(28, 21, 17, 0.25);
        display: flex;
        align-items: center;
        gap: 8px;
      }
      #${BUTTON_ID}:hover { background: #f3d488; }
      #${BUTTON_ID}:active { transform: scale(0.97); }

      #${OVERLAY_ID} {
        position: fixed;
        inset: 0;
        z-index: 2147483646;
        pointer-events: none;
        display: none;
      }
      #${OVERLAY_ID}.active { pointer-events: auto; }

      .cer-highlight {
        outline: 2px solid #e9b949 !important;
        outline-offset: 2px !important;
        background: rgba(233, 185, 73, 0.12) !important;
        cursor: pointer !important;
        position: relative !important;
      }
      .cer-highlight::after {
        content: attr(data-cer-tag);
        position: absolute;
        top: -18px;
        left: 4px;
        background: #1c1511;
        color: #fff;
        font-size: 0.65rem;
        padding: 2px 6px;
        border-radius: 3px;
        pointer-events: none;
        white-space: nowrap;
      }

      #${PANEL_ID} {
        position: fixed;
        top: 0;
        right: 0;
        width: 360px;
        height: 100vh;
        background: #fff;
        border-left: 1px solid rgba(28, 21, 17, 0.16);
        box-shadow: -4px 0 16px rgba(28, 21, 17, 0.15);
        z-index: 2147483647;
        display: none;
        flex-direction: column;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      #${PANEL_ID}.open { display: flex; }

      .cer-panel-header {
        background: #1c1511;
        color: #fff;
        padding: 12px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .cer-panel-title { font-weight: 700; font-size: 0.95rem; }
      .cer-panel-close { background: transparent; border: none; color: #e9b949; cursor: pointer; font-size: 1.2rem; line-height: 1; }

      .cer-panel-body { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; }

      .cer-section { display: flex; flex-direction: column; gap: 6px; }
      .cer-section-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: #6e6155; letter-spacing: 0.05em; }
      .cer-section input, .cer-section textarea, .cer-section select {
        width: 100%;
        padding: 8px 10px;
        font-size: 0.85rem;
        border: 1px solid rgba(28, 21, 17, 0.24);
        border-radius: 6px;
        background: #f7f1e2;
        color: #1c1511;
        outline: none;
      }
      .cer-section input:focus, .cer-section select:focus { border-color: #e9b949; }

      .cer-actions { display: flex; gap: 8px; padding: 16px; border-top: 1px solid rgba(28, 21, 17, 0.16); background: #f7f1e2; }

      .cer-btn { flex: 1; padding: 8px 12px; font-size: 0.85rem; font-weight: 600; border: none; border-radius: 6px; cursor: pointer; }
      .cer-btn-primary { background: #e9b949; color: #1c1511; }
      .cer-btn-primary:hover { background: #f3d488; }
      .cer-btn-secondary { background: #3b2d24; color: #fff; }
      .cer-btn-secondary:hover { background: #2a201a; }
      .cer-btn-outline { background: transparent; border: 1px solid rgba(28, 21, 17, 0.24); color: #3b2d24; }
      .cer-btn-outline:hover { background: rgba(28, 21, 17, 0.08); }

      .cer-empty { text-align: center; color: #6e6155; font-size: 0.8rem; padding: 20px; }
      .cer-msg { font-size: 0.75rem; min-height: 1.2em; }
      .cer-msg.ok { color: #3f7d4e; }
      .cer-msg.error { color: #8a5a12; }

      .cer-json { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 0.7rem; background: #f7f1e2; border: 1px solid rgba(28, 21, 17, 0.16); border-radius: 6px; padding: 10px; max-height: 200px; overflow: auto; white-space: pre-wrap; word-break: break-all; color: #1c1511; }
    `;
    document.documentElement.appendChild(styleElement);
  }

  // --- Botón flotante ---

  function createToggleButton() {
    if (document.getElementById(BUTTON_ID)) return;
    const btn = document.createElement('button');
    btn.id = BUTTON_ID;
    btn.title = 'Editar página — Café El Regio';
    btn.innerHTML = '✎ Editar página';
    btn.addEventListener('click', toggleEditor);
    document.body.appendChild(btn);
  }

  function createOverlay() {
    if (document.getElementById(OVERLAY_ID)) return;
    const overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    document.body.appendChild(overlay);
  }

  function createPanel() {
    if (document.getElementById(PANEL_ID)) return;
    const panel = document.createElement('div');
    panel.id = PANEL_ID;
    panel.innerHTML = `
      <div class="cer-panel-header">
        <div class="cer-panel-title">Editor en página</div>
        <button class="cer-panel-close" id="cer-panel-close">✕</button>
      </div>
      <div class="cer-panel-body">
        <div class="cer-section">
          <div class="cer-section-label">Elemento seleccionado</div>
          <input type="text" id="cer-selected-info" readonly placeholder="Haz clic en un elemento de la página" />
        </div>
        <div class="cer-section">
          <div class="cer-section-label">Tipo de nodo</div>
          <select id="cer-node-type">
            <option value="Section">Sección</option>
            <option value="Row">Fila</option>
            <option value="Column">Columna</option>
            <option value="Text">Texto</option>
            <option value="Image">Imagen</option>
            <option value="Button">Botón</option>
          </select>
        </div>
        <div class="cer-section" id="cer-text-props" style="display:none">
          <div class="cer-section-label">Etiqueta HTML</div>
          <select id="cer-tag">
            <option value="p">Párrafo</option>
            <option value="h1">Título 1</option>
            <option value="h2">Título 2</option>
            <option value="h3">Título 3</option>
          </select>
          <div class="cer-section-label" style="margin-top:8px">Contenido</div>
          <textarea id="cer-content" rows="3"></textarea>
        </div>
        <div class="cer-section" id="cer-button-props" style="display:none">
          <div class="cer-section-label">Texto del botón</div>
          <input type="text" id="cer-btn-text" />
          <div class="cer-section-label" style="margin-top:8px">Enlace (href)</div>
          <input type="text" id="cer-btn-href" />
        </div>
        <div class="cer-section" id="cer-image-props" style="display:none">
          <div class="cer-section-label">URL de imagen (src)</div>
          <input type="text" id="cer-img-src" />
          <div class="cer-section-label" style="margin-top:8px">Texto alternativo (alt)</div>
          <input type="text" id="cer-img-alt" />
        </div>
        <div class="cer-section" id="cer-json-section">
          <div class="cer-section-label">JSON generado</div>
          <div class="cer-json" id="cer-json-output"></div>
        </div>
      </div>
      <div class="cer-actions">
        <button class="cer-btn cer-btn-secondary" id="cer-btn-clear">Limpiar selección</button>
        <button class="cer-btn cer-btn-outline" id="cer-btn-copy">Copiar JSON</button>
        <button class="cer-btn cer-btn-primary" id="cer-btn-save">Guardar página</button>
      </div>
    `;
    document.body.appendChild(panel);

    document.getElementById('cer-panel-close').addEventListener('click', closeEditor);
    document.getElementById('cer-btn-clear').addEventListener('click', clearSelection);
    document.getElementById('cer-btn-copy').addEventListener('click', copyJson);
    document.getElementById('cer-btn-save').addEventListener('click', savePage);

    // Cambiar propiedades según tipo
    const typeSelect = document.getElementById('cer-node-type');
    typeSelect.addEventListener('change', (e) => {
      const type = e.target.value;
      document.getElementById('cer-text-props').style.display = type === 'Text' ? 'block' : 'none';
      document.getElementById('cer-button-props').style.display = type === 'Button' ? 'block' : 'none';
      document.getElementById('cer-image-props').style.display = type === 'Image' ? 'block' : 'none';
      updateJson();
    });

    // Actualizar JSON al cambiar inputs
    ['cer-tag', 'cer-content', 'cer-btn-text', 'cer-btn-href', 'cer-img-src', 'cer-img-alt'].forEach((id) => {
      document.getElementById(id).addEventListener('input', updateJson);
    });
  }

  // --- Editor toggle ---

  function toggleEditor() {
    isEditorActive = !isEditorActive;
    const btn = document.getElementById(BUTTON_ID);
    const overlay = document.getElementById(OVERLAY_ID);
    const panel = document.getElementById(PANEL_ID);

    if (isEditorActive) {
      btn.textContent = '✕ Salir modo edición';
      btn.style.background = '#7a5238';
      overlay.classList.add('active');
      panel.classList.add('open');
      enableHighlighting();
    } else {
      closeEditor();
    }
  }

  function closeEditor() {
    isEditorActive = false;
    const btn = document.getElementById(BUTTON_ID);
    const overlay = document.getElementById(OVERLAY_ID);
    const panel = document.getElementById(PANEL_ID);

    btn.textContent = '✎ Editar página';
    btn.style.background = '#e9b949';
    overlay.classList.remove('active');
    panel.classList.remove('open');
    disableHighlighting();
    clearSelection();
  }

  // --- Highlighting y selección ---

  function enableHighlighting() {
    const overlay = document.getElementById(OVERLAY_ID);
    overlay.addEventListener('mouseover', handleMouseOver, true);
    overlay.addEventListener('mouseout', handleMouseOut, true);
    overlay.addEventListener('click', handleClick, true);
  }

  function disableHighlighting() {
    const overlay = document.getElementById(OVERLAY_ID);
    overlay.removeEventListener('mouseover', handleMouseOver, true);
    overlay.removeEventListener('mouseout', handleMouseOut, true);
    overlay.removeEventListener('click', handleClick, true);
    document.querySelectorAll('.cer-highlight').forEach((el) => el.classList.remove('cer-highlight'));
    selectedElement = null;
    updateSelectedInfo(null);
  }

  function handleMouseOver(e) {
    if (e.target === document.body || e.target === document.documentElement) return;
    e.target.classList.add('cer-highlight');
    const tag = e.target.tagName.toLowerCase();
    e.target.dataset.cerTag = tag.toUpperCase();
  }

  function handleMouseOut(e) {
    e.target.classList.remove('cer-highlight');
    delete e.target.dataset.cerTag;
  }

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    // Quitar highlight anterior
    document.querySelectorAll('.cer-highlight').forEach((el) => el.classList.remove('cer-highlight'));

    selectedElement = e.target;
    selectedElement.classList.add('cer-highlight');

    const info = document.getElementById('cer-selected-info');
    info.value = `${selectedElement.tagName.toLowerCase()}#${selectedElement.id || 'sin-id'}.${Array.from(selectedElement.classList).join('.') || 'sin-clase'}`;

    // Rellenar props según tipo
    const typeSelect = document.getElementById('cer-node-type');
    const tag = selectedElement.tagName.toLowerCase();
    if (tag === 'a' || selectedElement.role === 'button' || selectedElement.tagName === 'BUTTON') {
      typeSelect.value = 'Button';
      document.getElementById('cer-btn-text').value = selectedElement.textContent.trim();
      document.getElementById('cer-btn-href').value = selectedElement.getAttribute('href') || '#';
    } else if (tag === 'img') {
      typeSelect.value = 'Image';
      document.getElementById('cer-img-src').value = selectedElement.getAttribute('src') || '';
      document.getElementById('cer-img-alt').value = selectedElement.getAttribute('alt') || '';
    } else if (['h1', 'h2', 'h3', 'p', 'div', 'span'].includes(tag)) {
      typeSelect.value = 'Text';
      document.getElementById('cer-tag').value = tag;
      document.getElementById('cer-content').value = selectedElement.textContent.trim();
    } else {
      typeSelect.value = 'Section';
    }

    // Disparar change para actualizar JSON
    typeSelect.dispatchEvent(new Event('change'));
  }

  function clearSelection() {
    document.querySelectorAll('.cer-highlight').forEach((el) => el.classList.remove('cer-highlight'));
    selectedElement = null;
    updateSelectedInfo(null);
    document.getElementById('cer-json-output').textContent = '';
  }

  function updateSelectedInfo(element) {
    const info = document.getElementById('cer-selected-info');
    if (element) {
      info.value = `${element.tagName.toLowerCase()}#${element.id || 'sin-id'}.${Array.from(element.classList).join('.') || 'sin-clase'}`;
    } else {
      info.value = '';
    }
  }

  // --- Generar JSON del nodo ---

  function updateJson() {
    if (!selectedElement) return;
    const type = document.getElementById('cer-node-type').value;
    const node = {
      id: `node_${Date.now()}`,
      type,
      parentId: undefined,
      props: {},
      styles: {},
      children: [],
      order: 0,
    };

    if (type === 'Text') {
      node.props = {
        tag: document.getElementById('cer-tag').value || 'p',
        content: document.getElementById('cer-content').value || '',
      };
    } else if (type === 'Button') {
      node.props = {
        text: document.getElementById('cer-btn-text').value || 'Botón',
        href: document.getElementById('cer-btn-href').value || '#',
      };
    } else if (type === 'Image') {
      node.props = {
        src: document.getElementById('cer-img-src').value || '',
        alt: document.getElementById('cer-img-alt').value || 'Imagen',
      };
    }

    // Estilos inline del elemento actual
    const computed = window.getComputedStyle(selectedElement);
    node.styles.desktop = {
      width: computed.width,
      height: computed.height,
      marginTop: computed.marginTop,
      marginRight: computed.marginRight,
      marginBottom: computed.marginBottom,
      marginLeft: computed.marginLeft,
      paddingTop: computed.paddingTop,
      paddingRight: computed.paddingRight,
      paddingBottom: computed.paddingBottom,
      paddingLeft: computed.paddingLeft,
      backgroundColor: computed.backgroundColor,
      color: computed.color,
      fontSize: computed.fontSize,
      textAlign: computed.textAlign,
    };

    document.getElementById('cer-json-output').textContent = JSON.stringify(node, null, 2);
  }

  function copyJson() {
    const json = document.getElementById('cer-json-output').textContent;
    if (!json) return;
    navigator.clipboard.writeText(json).then(() => {
      const btn = document.getElementById('cer-btn-copy');
      const original = btn.textContent;
      btn.textContent = '¡Copiado!';
      setTimeout(() => { btn.textContent = original; }, 1200);
    });
  }

  async function savePage() {
    if (!selectedElement) {
      setMsg('Selecciona un elemento antes de guardar.', 'error');
      return;
    }

    const json = document.getElementById('cer-json-output').textContent;
    if (!json) {
      setMsg('No hay JSON que guardar.', 'error');
      return;
    }

    try {
      const parsed = JSON.parse(json);

      // Obtener páginas existentes del storage del service worker
      const res = await new Promise((resolve) => {
        chrome.runtime.sendMessage({ type: 'GET_PAGES' }, resolve);
      });

      const pages = res.ok ? res.pages : [];
      const page = {
        id: `page_${Date.now()}`,
        title: 'Página capturada',
        slug: `/capturada-${Date.now()}`,
        status: 'draft',
        theme: { primaryColor: '#4A2C2A', secondaryColor: '#D4A373', fontHeading: 'Iowan', fontBody: 'system-ui' },
        root: parsed,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const saveRes = await new Promise((resolve) => {
        chrome.runtime.sendMessage({ type: 'SAVE_PAGE', payload: { page } }, resolve);
      });

      if (saveRes.ok) {
        setMsg('Página guardada en el almacenamiento de la extensión.', 'ok');
      } else {
        setMsg(`Error guardando: ${saveRes.error}`, 'error');
      }
    } catch (err) {
      setMsg(`JSON inválido: ${err.message}`, 'error');
    }
  }

  function setMsg(text, type = 'ok') {
    const el = document.getElementById('cer-msg') || createMsgEl();
    el.textContent = text;
    el.className = `cer-msg ${type}`;
  }

  function createMsgEl() {
    const el = document.createElement('div');
    el.id = 'cer-msg';
    el.className = 'cer-msg';
    const actions = document.getElementById('cer-actions') || document.querySelector('.cer-actions');
    if (actions) actions.parentNode.insertBefore(el, actions);
    return el;
  }

  // --- Inicialización ---

  document.addEventListener('DOMContentLoaded', () => {
    injectStyles();
    createToggleButton();
    createOverlay();
    createPanel();
  });

  // Si el DOM ya está listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      injectStyles();
      createToggleButton();
      createOverlay();
      createPanel();
    });
  } else {
    injectStyles();
    createToggleButton();
    createOverlay();
    createPanel();
  }

})();
