import type { PageNode } from '../../types/page';
import { PageRenderer } from '../PageRenderer';

export interface RowProps {
  node: PageNode;
  onSelect: (id: string) => void;
}

export function Row({ node, onSelect }: RowProps) {
  const style = node.styles?.desktop ?? {};
  return (
    <div
      data-node-id={node.id}
      data-node-type={node.type}
      style={{ display: 'flex', gap: '1rem', ...(style as React.CSSProperties) }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(node.id);
      }}
    >
      {node.children.map((child) => (
        <PageRenderer key={child.id} node={child} onSelect={onSelect} />
      ))}
    </div>
  );
}
