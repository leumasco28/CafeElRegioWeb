import { usePageStore } from './store/pageStore';
import { PageRenderer } from '../renderer/PageRenderer';

export function Canvas() {
  const page = usePageStore((s) => s.page);

  if (!page) return <div>Cargando página...</div>;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, position: 'relative', background: '#f3f4f6' }} data-canvas>
        <PageRenderer node={page.root} />
      </div>

      <div
        style={{
          width: '320px',
          background: '#fff',
          borderLeft: '1px solid #e5e7eb',
          padding: '1rem',
        }}
      >
        <h3>Editor Visual</h3>
        <p>
          Página: {page.title} ({page.slug})
        </p>
        <p>Estado: {page.status}</p>
      </div>
    </div>
  );
}
