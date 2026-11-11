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

export function StylePanel() {
  const selectedNodeId = usePageStore((s) => s.selectedNodeId);
  const page = usePageStore((s) => s.page);
  const updateNode = usePageStore((s) => s.updateNode);

  const node = page?.root ? findNode(page.root, selectedNodeId ?? '') : null;
  if (!node) {
    return (
      <div style={{ padding: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
        Selecciona un elemento en el lienzo para editar sus estilos.
      </div>
    );
  }

  const desktopStyles = node.styles.desktop ?? {};

  const setStyle = (key: string, value: string) => {
    updateNode(node.id, {
      styles: {
        ...node.styles,
        desktop: { ...desktopStyles, [key]: value },
      },
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
        Estilo (Desktop)
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.75rem', color: '#6b7280', minWidth: '80px' }}>
            Color de fondo
          </label>
          <input
            type="color"
            value={desktopStyles.backgroundColor || '#ffffff'}
            onChange={(e) => setStyle('backgroundColor', e.target.value)}
            style={{
              width: '32px',
              height: '32px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.75rem', color: '#6b7280', minWidth: '80px' }}>
            Color del texto
          </label>
          <input
            type="color"
            value={desktopStyles.color || '#000000'}
            onChange={(e) => setStyle('color', e.target.value)}
            style={{
              width: '32px',
              height: '32px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.75rem', color: '#6b7280', minWidth: '80px' }}>
            Tamaño de fuente
          </label>
          <input
            value={desktopStyles.fontSize || ''}
            onChange={(e) => setStyle('fontSize', e.target.value + 'px')}
            style={{
              padding: '4px 8px',
              fontSize: '0.875rem',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              flex: 1,
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.75rem', color: '#6b7280', minWidth: '80px' }}>
            Relleno (padding)
          </label>
          <input
            value={desktopStyles.padding || ''}
            onChange={(e) => setStyle('padding', e.target.value)}
            style={{
              padding: '4px 8px',
              fontSize: '0.875rem',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              flex: 1,
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.75rem', color: '#6b7280', minWidth: '80px' }}>Margen</label>
          <input
            value={desktopStyles.margin || ''}
            onChange={(e) => setStyle('margin', e.target.value)}
            style={{
              padding: '4px 8px',
              fontSize: '0.875rem',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              flex: 1,
            }}
          />
        </div>
      </div>
    </div>
  );
}
