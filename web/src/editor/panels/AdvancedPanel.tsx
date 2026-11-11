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

export function AdvancedPanel() {
  const selectedNodeId = usePageStore((s) => s.selectedNodeId);
  const page = usePageStore((s) => s.page);
  const updateNode = usePageStore((s) => s.updateNode);

  const node = page?.root ? findNode(page.root, selectedNodeId ?? '') : null;
  if (!node) {
    return (
      <div style={{ padding: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
        Selecciona un elemento en el lienzo para editar opciones avanzadas.
      </div>
    );
  }

  const className = (node.props.className as string) || '';

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
        Avanzado
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.75rem', color: '#6b7280' }}>Clase CSS</label>
        <input
          value={className}
          onChange={(e) => {
            updateNode(node.id, {
              props: { ...node.props, className: e.target.value },
            });
          }}
          style={{
            padding: '6px 8px',
            fontSize: '0.875rem',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
          }}
        />
      </div>
    </div>
  );
}
