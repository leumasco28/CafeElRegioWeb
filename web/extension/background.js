/**
 * Service Worker de la extensión "Café El Regio — Editor Web".
 * Gestiona el estado global, la comunicación entre popup y content script,
 * y el almacenamiento de páginas editadas en chrome.storage.local.
 */

const STORAGE_KEY = 'cafe_el_regio_pages';
const EDITOR_BASE_URL = 'http://localhost:5173/editor';

/**
 * Obtiene todas las páginas guardadas en storage.
 */
async function getStoredPages() {
  const result = await chrome.storage.local.get(STORAGE_KEY);
  return result[STORAGE_KEY] || [];
}

/**
 * Guarda una página en storage.
 */
async function savePageToStorage(page) {
  const pages = await getStoredPages();
  const existingIndex = pages.findIndex((p) => p.id === page.id);
  if (existingIndex >= 0) {
    pages[existingIndex] = { ...page, updatedAt: new Date().toISOString() };
  } else {
    pages.push({ ...page, createdAt: page.createdAt || new Date().toISOString(), updatedAt: new Date().toISOString() });
  }
  await chrome.storage.local.set({ [STORAGE_KEY]: pages });
  return pages;
}

/**
 * Elimina una página del storage.
 */
async function deletePageFromStorage(pageId) {
  const pages = await getStoredPages();
  const filtered = pages.filter((p) => p.id !== pageId);
  await chrome.storage.local.set({ [STORAGE_KEY]: filtered });
  return filtered;
}

/**
 * Mensajes entrantes desde popup o content script.
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { type, payload } = message;

  (async () => {
    try {
      switch (type) {
        case 'GET_PAGES': {
          const pages = await getStoredPages();
          sendResponse({ ok: true, pages });
          break;
        }

        case 'SAVE_PAGE': {
          const pages = await savePageToStorage(payload.page);
          sendResponse({ ok: true, pages });
          break;
        }

        case 'DELETE_PAGE': {
          const pages = await deletePageFromStorage(payload.pageId);
          sendResponse({ ok: true, pages });
          break;
        }

        case 'OPEN_EDITOR': {
          const slug = payload.slug || '/inicio';
          const editorUrl = `${EDITOR_BASE_URL}/${slug.replace(/^\//, '')}`;
          // Abre el editor en una nueva pestaña si está disponible, si no notifica
          try {
            await chrome.tabs.create({ url: editorUrl });
            sendResponse({ ok: true, url: editorUrl });
          } catch (err) {
            sendResponse({ ok: false, error: err.message });
          }
          break;
        }

        case 'GET_ACTIVE_TAB': {
          const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
          sendResponse({ ok: true, tab: { id: tab.id, url: tab.url, title: tab.title } });
          break;
        }

        default: {
          sendResponse({ ok: false, error: `Tipo de mensaje desconocido: ${type}` });
        }
      }
    } catch (err) {
      sendResponse({ ok: false, error: err.message });
    }
  })();

  return true; // Mantiene el canal abierto para respuesta async
});

console.log('[Café El Regio Editor] Service worker iniciado.');
