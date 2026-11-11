import { usePageStore } from '../store/pageStore';
import type { PageNode } from '../../types/page';

function findNode(node: PageNode | null, id: string): PageNode | null {
  if (!node) return null;
  if (node.id === id) return node;
  for (const child of node.children) {
    const found = findNode(child, id);
    if (found) return found;
  }
  return null;
}

export function ContentPanel() {
  const selectedNodeId = usePageStore((s) => s.selectedNodeId);
  const page = usePageStore((s) => s.page);
  const updateNode = usePageStore((s) => s.updateNode);

  const node = page?.root ? findNode(page.root, selectedNodeId ?? '') : null;
  if (!node) {
    return (
      <div style={{ padding: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
        Selecciona un elemento en el lienzo para editar su contenido.
      </div>
    );
  }

  const tag = (node.props.tag as string) || 'p';
  const content = (node.props.content as string) || '';
  const text = (node.props.text as string) || '';
  const href = (node.props.href as string) || '#';
  const src = (node.props.src as string) || '';
  const alt = (node.props.alt as string) || '';

  const setProp = (key: string, value: unknown) => {
    updateNode(node.id, {
      props: { ...node.props, [key]: value },
    });
  };

  return (
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <h4
        style={{
          margin: 0,
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: '#4b5563',
        }}
      >
        Contenido
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {node.type === 'Text' && (
          <>
            <label style={{ fontSize: '0.75rem', color: '#6b7280' }}>Etiqueta HTML</label>
            <select
              value={tag}
              onChange={(e) => setProp('tag', e.target.value)}
              style={{
                padding: '6px 8px',
                fontSize: '0.875rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
              }}
            >
              <option value="p">Párrafo</option>
              <option value="h1">Título 1</option>
              <option value="h2">Título 2</option>
              <option value="h3">Título 3</option>
            </select>
            <label style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
              Contenido
            </label>
            <textarea
              value={content}
              onChange={(e) => setProp('content', e.target.value)}
              rows={3}
              style={{
                padding: '6px 8px',
                fontSize: '0.875rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
              }}
            />
          </>
        )}
        {node.type === 'Button' && (
          <>
            <label style={{ fontSize: '0.75rem', color: '#6b7280' }}>Texto del botón</label>
            <input
              value={text}
              onChange={(e) => setProp('text', e.target.value)}
              style={{
                padding: '6px 8px',
                fontSize: '0.875rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
              }}
            />
            <label style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
              Enlace (href)
            </label>
            <input
              value={href}
              onChange={(e) => setProp('href', e.target.value)}
              style={{
                padding: '6px 8px',
                fontSize: '0.875rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
              }}
            />
          </>
        )}
        {node.type === 'Image' && (
          <>
            <label style={{ fontSize: '0.75rem', color: '#6b7280' }}>URL de imagen</label>
            <input
              value={src}
              onChange={(e) => setProp('src', e.target.value)}
              style={{
                padding: '6px 8px',
                fontSize: '0.875rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
              }}
            />
            <label style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
              Texto alternativo
            </label>
            <input
              value={alt}
              onChange={(e) => setProp('alt', e.target.value)}
              style={{
                padding: '6px 8px',
                fontSize: '0.875rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
