import type { PageNode } from '../../types/page';
import { PageRenderer } from '../PageRenderer';

export interface ColumnProps {
  node: PageNode;
  onSelect: (id: string) => void;
}

export function Column({ node, onSelect }: ColumnProps) {
  const style = node.styles?.desktop ?? {};
  return (
    <div
      data-node-id={node.id}
      data-node-type={node.type}
      style={{ ...(style as React.CSSProperties) }}
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
