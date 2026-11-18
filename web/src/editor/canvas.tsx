import { useEffect, useState, useCallback, useRef } from 'react';
import { usePageStore } from './store/pageStore';
import { CraftEditor } from './CraftEditor';
import type { PageNode } from '../types/page';
import { loadPage, savePage, listPages } from '../lib/pagesClient';
import { ContentPanel } from './panels/ContentPanel';
import { StylePanel } from './panels/StylePanel';
import { AdvancedPanel } from './panels/AdvancedPanel';

type PanelTab = 'contenido' | 'estilo' | 'avanzado';

type ElementType = 'Section' | 'Row' | 'Column' | 'Text' | 'Image' | 'Button';

const ELEMENT_LABELS: Record<ElementType, string> = {
  Section: 'Sección',
  Row: 'Fila',
  Column: 'Columna',
  Text: 'Texto',
  Image: 'Imagen',
  Button: 'Botón',
};

interface CanvasProps {
  initialSlug?: string;
}

export function Canvas({ initialSlug = '/inicio' }: CanvasProps) {
  const page = usePageStore((s) => s.page);
  const setPage = usePageStore((s) => s.setPage);
  const selectNode = usePageStore((s) => s.selectNode);
  const selectedNodeId = usePageStore((s) => s.selectedNodeId);
  const addNode = usePageStore((s) => s.addNode);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pages, setPages] = useState<Array<{ id: string; slug: string; title: string }>>([]);
  const [currentSlug, setCurrentSlug] = useState<string>(initialSlug);
  const [activeTab, setActiveTab] = useState<PanelTab>('contenido');
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nodeIdCounter = useRef(0);

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

  const loadCurrentPage = useCallback(
    (slug: string) => {
      setLoading(true);
      setError(null);
      void loadPage(slug)
        .then((doc) => {
          if (doc) {
            setPage(doc);
            selectNode(null);
          } else {
            setError(`No se encontró la página "${slug}"`);
          }
          setLoading(false);
        })
        .catch((err) => {
          setError(err instanceof Error ? err.message : 'Error cargando la página');
          setLoading(false);
        });
    },
    [setPage, selectNode]
  );

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const pageList = await listPages();
        setPages(pageList);

        if (!cancelled) {
          const current = pageList.find((p) => p.slug === currentSlug);
          if (current) {
            loadCurrentPage(currentSlug);
          } else if (pageList.length > 0) {
            setCurrentSlug(pageList[0].slug);
            loadCurrentPage(pageList[0].slug);
          }
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
  }, [currentSlug, loadCurrentPage]);

  async function handlePageChange(slug: string) {
    setCurrentSlug(slug);
    loadCurrentPage(slug);
  }

  function handleAddElement(type: ElementType) {
    setAddMenuOpen(false);
    if (!page) return;

    const newId = `node_${(nodeIdCounter.current += 1)}`;
    const newNode: PageNode = {
      id: newId,
      type,
      parentId: selectedNodeId ?? undefined,
      props: {},
      styles: {},
      children: [],
      order: nodeIdCounter.current,
    };

    if (type === 'Text') {
      newNode.props = { tag: 'p', content: 'Nuevo texto' };
    } else if (type === 'Button') {
      newNode.props = { text: 'Botón', href: '#' };
    } else if (type === 'Image') {
      newNode.props = { src: '', alt: 'Imagen' };
    }

    addNode(selectedNodeId ?? null, newNode);
    selectNode(newId);
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
              onClick={() => {
                // Deshacer se maneja dentro de CraftEditor
              }}
              title="Deshacer"
              style={{
                padding: '4px 8px',
                fontSize: '0.875rem',
                background: '#374151',
                color: '#9ca3af',
                border: 'none',
                borderRadius: '4px',
                cursor: 'default',
                opacity: 0.5,
              }}
            >
              ?
            </button>
            <button
              onClick={() => {
                // Rehacer se maneja dentro de CraftEditor
              }}
              title="Rehacer"
              style={{
                padding: '4px 8px',
                fontSize: '0.875rem',
                background: '#374151',
                color: '#9ca3af',
                border: 'none',
                borderRadius: '4px',
                cursor: 'default',
                opacity: 0.5,
              }}
            >
              ?
            </button>
            <span style={{ fontWeight: 600, marginLeft: '0.5rem' }}>
              Café El Regio - Editor Visual
            </span>
          </div>

          {/* Botón Agregar elemento */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => setAddMenuOpen(!addMenuOpen)}
              style={{
                padding: '6px 10px',
                fontSize: '0.875rem',
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              + Agregar elemento
            </button>
            {addMenuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '48px',
                  left: '0',
                  background: '#fff',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  padding: '0.5rem',
                  zIndex: 200,
                }}
              >
                {Object.entries(ELEMENT_LABELS).map(([type, label]) => (
                  <button
                    key={type}
                    onClick={() => handleAddElement(type as ElementType)}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '6px 10px',
                      fontSize: '0.875rem',
                      textAlign: 'left',
                      background: 'transparent',
                      color: '#374151',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
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
          Página: {page.title} ¿ Estado: {page.status}
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
          <CraftEditor page={page} setPage={setPage} selectNode={selectNode} />
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
            Cambios se guardan automáticamente en localStorage
          </div>
        </div>
      </div>
    </div>
  );
}
