import { useEffect, useState, useCallback, useRef } from 'react';
import { usePageStore } from './store/pageStore';
import { PageRenderer } from '../renderer/PageRenderer';
import { ContentPanel } from './panels/ContentPanel';
import { StylePanel } from './panels/StylePanel';
import { AdvancedPanel } from './panels/AdvancedPanel';
import { pbSignIn, loadPage, savePage, listPages } from '../lib/pocketbaseClient';
import { VITE_POCKETBASE_ADMIN_EMAIL, VITE_POCKETBASE_ADMIN_PASSWORD } from '../lib/pocketbaseEnv';

type PanelTab = 'contenido' | 'estilo' | 'avanzado';

export function Canvas() {
  const page = usePageStore((s) => s.page);
  const setPage = usePageStore((s) => s.setPage);
  const selectNode = usePageStore((s) => s.selectNode);
  const selectedNodeId = usePageStore((s) => s.selectedNodeId);
  const undo = usePageStore((s) => s.undo);
  const redo = usePageStore((s) => s.redo);
  const canUndo = usePageStore((s) => s.canUndo);
  const canRedo = usePageStore((s) => s.canRedo);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pages, setPages] = useState<Array<{ id: string; slug: string; title: string }>>([]);
  const [currentSlug, setCurrentSlug] = useState<string>('/inicio');
  const [activeTab, setActiveTab] = useState<PanelTab>('contenido');
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-guardar debounced cada vez que cambia la página en el store
  const scheduleSave = useCallback(() => {
    if (!page) return;
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(async () => {
      try {
        await savePage(page);
      } catch (err) {
        console.error('Error guardando página:', err);
      }
    }, 800);
  }, [page]);

  useEffect(() => {
    scheduleSave();
  }, [page, scheduleSave]);

  // Inicializar: autenticar, cargar páginas y cargar la página actual
  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const email = VITE_POCKETBASE_ADMIN_EMAIL || 'admin@cafeelregio.local';
        const password = VITE_POCKETBASE_ADMIN_PASSWORD || 'admin12345';
        await pbSignIn(email, password);

        const pageList = await listPages();
        setPages(pageList);

        if (!cancelled) {
          await loadCurrentPage(currentSlug);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Error inicializando el editor');
          setLoading(false);
        }
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function loadCurrentPage(slug: string) {
    setLoading(true);
    setError(null);
    try {
      const doc = await loadPage(slug);
      if (doc) {
        setPage(doc);
        selectNode(null);
      } else {
        setError(`No se encontró la página "${slug}"`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando la página');
    } finally {
      setLoading(false);
    }
  }

  async function handlePageChange(slug: string) {
    setCurrentSlug(slug);
    await loadCurrentPage(slug);
  }

  if (loading) {
    return (
      <div
        style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}
      >
        Cargando editor visual...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#dc2626',
        }}
      >
        {error}
      </div>
    );
  }

  if (!page) {
    return (
      <div
        style={{
          display: 'flex',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6b7280',
        }}
      >
        No hay página cargada.
      </div>
    );
  }

  const tabLabel: Record<PanelTab, string> = {
    contenido: 'Contenido',
    estilo: 'Estilo',
    avanzado: 'Avanzado',
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Barra superior del editor */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '48px',
          background: '#1f2937',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1rem',
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={undo}
              disabled={!canUndo()}
              title="Deshacer"
              style={{
                padding: '4px 8px',
                fontSize: '0.875rem',
                background: '#374151',
                color: canUndo() ? '#fff' : '#9ca3af',
                border: 'none',
                borderRadius: '4px',
                cursor: canUndo() ? 'pointer' : 'default',
                opacity: canUndo() ? 1 : 0.5,
              }}
            >
              ↩
            </button>
            <button
              onClick={redo}
              disabled={!canRedo()}
              title="Rehacer"
              style={{
                padding: '4px 8px',
                fontSize: '0.875rem',
                background: '#374151',
                color: canRedo() ? '#fff' : '#9ca3af',
                border: 'none',
                borderRadius: '4px',
                cursor: canRedo() ? 'pointer' : 'default',
                opacity: canRedo() ? 1 : 0.5,
              }}
            >
              ↪
            </button>
            <span style={{ fontWeight: 600, marginLeft: '0.5rem' }}>
              Café El Regio — Editor Visual
            </span>
          </div>
          <select
            value={currentSlug}
            onChange={(e) => handlePageChange(e.target.value)}
            style={{
              background: '#374151',
              color: '#fff',
              border: '1px solid #4b5563',
              padding: '4px 8px',
              borderRadius: '4px',
            }}
          >
            {pages.map((p) => (
              <option key={p.id} value={p.slug}>
                {p.title} ({p.slug})
              </option>
            ))}
          </select>
        </div>
        <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
          Página: {page.title} · Estado: {page.status}
        </div>
      </div>

      <div style={{ display: 'flex', height: '100vh', paddingTop: '48px' }}>
        <div
          style={{
            flex: 1,
            position: 'relative',
            background: '#f3f4f6',
            overflow: 'auto',
          }}
          data-canvas
        >
          <PageRenderer node={page.root} onSelect={selectNode} />
        </div>

        <div
          style={{
            width: '340px',
            background: '#fff',
            borderLeft: '1px solid #e5e7eb',
            padding: '1rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Editor Visual</h3>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#6b7280' }}>
            Página: {page.title} ({page.slug})
          </p>
          <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: '#6b7280' }}>
            Estado: {page.status}
          </p>

          {/* Pestañas de paneles */}
          <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.75rem' }}>
            {(['contenido', 'estilo', 'avanzado'] as PanelTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  padding: '6px 10px',
                  fontSize: '0.75rem',
                  background: activeTab === tab ? '#2563eb' : '#f3f4f6',
                  color: activeTab === tab ? '#fff' : '#4b5563',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                {tabLabel[tab]}
              </button>
            ))}
          </div>

          {selectedNodeId ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                Nodo seleccionado: {selectedNodeId}
              </p>
              {activeTab === 'contenido' && <ContentPanel />}
              {activeTab === 'estilo' && <StylePanel />}
              {activeTab === 'avanzado' && <AdvancedPanel />}
            </div>
          ) : (
            <div style={{ padding: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
              Selecciona un elemento en el lienzo para editar sus propiedades.
            </div>
          )}

          <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#9ca3af' }}>
            Cambios se guardan automáticamente en PocketBase
          </div>
        </div>
      </div>
    </div>
  );
}
