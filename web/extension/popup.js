/**
 * Lógica del popup de la extensión "Café El Regio — Editor Web".
 * Se comunica con el service worker (background.js) mediante chrome.runtime.sendMessage.
 */

const STORAGE_KEY = 'cafe_el_regio_pages';
const EDITOR_BASE_URL = 'http://localhost:5173/editor';

// Referencias del DOM
const tabEditor = document.querySelector('[data-tab="editor"]');
const tabPages = document.querySelector('[data-tab="pages"]');
const panelEditor = document.getElementById('panel-editor');
const panelPages = document.getElementById('panel-pages');
const msgEditor = document.getElementById('msg-editor');
const msgPages = document.getElementById('msg-pages');

const inputTitle = document.getElementById('page-title');
const inputSlug = document.getElementById('page-slug');
const inputStatus = document.getElementById('page-status');
const btnOpenEditor = document.getElementById('btn-open-editor');
const btnCreatePage = document.getElementById('btn-create-page');
const btnRefreshPages = document.getElementById('btn-refresh-pages');
const pagesList = document.getElementById('pages-list');

// Estado
let pages = [];

// --- Navegación entre pestañas ---

function showPanel(panelName) {
  tabEditor.classList.toggle('active', panelName === 'editor');
  tabPages.classList.toggle('active', panelName === 'pages');
  panelEditor.classList.toggle('hidden', panelName !== 'editor');
  panelPages.classList.toggle('hidden', panelName !== 'pages');
  clearMessages();
}

tabEditor.addEventListener('click', () => showPanel('editor'));
tabPages.addEventListener('click', () => showPanel('pages'));

function clearMessages() {
  msgEditor.textContent = '';
  msgEditor.className = 'msg';
  msgPages.textContent = '';
  msgPages.className = 'msg';
}

function setMsg(element, text, type = 'ok') {
  element.textContent = text;
  element.className = `msg ${type}`;
}

// --- Comunicación con background ---

async function sendMessage(message) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve(response);
      }
    });
  });
}

// --- Páginas ---

async function loadPages() {
  try {
    const res = await sendMessage({ type: 'GET_PAGES' });
    if (res.ok) {
      pages = res.pages;
      renderPages();
    } else {
      setMsg(msgPages, `Error cargando páginas: ${res.error}`, 'error');
    }
  } catch (err) {
    setMsg(msgPages, `Error de conexión: ${err.message}`, 'error');
  }
}

function renderPages() {
  pagesList.innerHTML = '';
  if (pages.length === 0) {
    pagesList.innerHTML = '<li class="empty-state">No hay páginas guardadas aún.</li>';
    return;
  }

  pages.forEach((page) => {
    const li = document.createElement('li');
    li.className = 'page-item';
    li.innerHTML = `
      <div class="page-item-info">
        <div class="page-item-title">${escapeHtml(page.title)}</div>
        <div class="page-item-slug">${escapeHtml(page.slug)}</div>
      </div>
      <span class="page-item-status ${page.status}">${page.status}</span>
      <div class="page-item-actions">
        <button class="icon-btn" title="Editar" data-action="edit" data-id="${page.id}">✎</button>
        <button class="icon-btn" title="Abrir en editor" data-action="open" data-id="${page.id}">▶</button>
        <button class="icon-btn" title="Eliminar" data-action="delete" data-id="${page.id}">🗑</button>
      </div>
    `;
    pagesList.appendChild(li);
  });

  // Eventos de acciones
  pagesList.querySelectorAll('[data-action]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const action = e.currentTarget.dataset.action;
      const id = e.currentTarget.dataset.id;
      handlePageAction(action, id);
    });
  });
}

async function handlePageAction(action, id) {
  const page = pages.find((p) => p.id === id);
  if (!page) return;

  switch (action) {
    case 'edit': {
      inputTitle.value = page.title;
      inputSlug.value = page.slug;
      inputStatus.value = page.status;
      showPanel('editor');
      break;
    }
    case 'open': {
      try {
        const res = await sendMessage({
          type: 'OPEN_EDITOR',
          payload: { slug: page.slug },
        });
        if (res.ok) {
          window.close();
        } else {
          setMsg(msgPages, `No se pudo abrir el editor: ${res.error}`, 'error');
        }
      } catch (err) {
        setMsg(msgPages, `Error: ${err.message}`, 'error');
      }
      break;
    }
    case 'delete': {
      if (!confirm(`¿Eliminar la página "${page.title}"?`)) return;
      try {
        const res = await sendMessage({ type: 'DELETE_PAGE', payload: { pageId: id } });
        if (res.ok) {
          pages = res.pages;
          renderPages();
          setMsg(msgPages, 'Página eliminada.', 'ok');
        } else {
          setMsg(msgPages, `Error eliminando: ${res.error}`, 'error');
        }
      } catch (err) {
        setMsg(msgPages, `Error: ${err.message}`, 'error');
      }
      break;
    }
  }
}

// --- Crear página ---

btnCreatePage.addEventListener('click', async () => {
  const title = inputTitle.value.trim();
  const slug = inputSlug.value.trim() || '/inicio';
  const status = inputStatus.value;

  if (!title) {
    setMsg(msgEditor, 'Ingresa un título para la página.', 'error');
    inputTitle.focus();
    return;
  }
  if (!slug.startsWith('/')) {
    setMsg(msgEditor, 'El slug debe comenzar con "/".', 'error');
    inputSlug.focus();
    return;
  }

  clearMessages();

  const page = {
    id: `page_${Date.now()}`,
    title,
    slug,
    status,
    theme: {
      primaryColor: '#4A2C2A',
      secondaryColor: '#D4A373',
      fontHeading: 'Iowan',
      fontBody: 'system-ui',
    },
    root: {
      id: 'root',
      type: 'Section',
      parentId: null,
      props: {},
      styles: {},
      children: [],
      order: 0,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    const res = await sendMessage({ type: 'SAVE_PAGE', payload: { page } });
    if (res.ok) {
      pages = res.pages;
      setMsg(msgEditor, `Página "${title}" creada.`, 'ok');
      inputTitle.value = '';
      inputSlug.value = '/inicio';
      if (panelPages.classList.contains('hidden') === false) {
        renderPages();
      }
    } else {
      setMsg(msgEditor, `Error guardando: ${res.error}`, 'error');
    }
  } catch (err) {
    setMsg(msgEditor, `Error: ${err.message}`, 'error');
  }
});

// --- Abrir editor visual ---

btnOpenEditor.addEventListener('click', async () => {
  const slug = inputSlug.value.trim() || '/inicio';
  if (!slug.startsWith('/')) {
    setMsg(msgEditor, 'El slug debe comenzar con "/".', 'error');
    inputSlug.focus();
    return;
  }

  clearMessages();

  try {
    const res = await sendMessage({ type: 'OPEN_EDITOR', payload: { slug } });
    if (res.ok) {
      window.close();
    } else {
      setMsg(msgEditor, `No se pudo abrir el editor: ${res.error}`, 'error');
    }
  } catch (err) {
    setMsg(msgEditor, `Error: ${err.message}`, 'error');
  }
});

// --- Refrescar páginas ---

btnRefreshPages.addEventListener('click', loadPages);

// --- Inicialización ---

document.addEventListener('DOMContentLoaded', () => {
  loadPages();
});

// Utilidad: escapar HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
