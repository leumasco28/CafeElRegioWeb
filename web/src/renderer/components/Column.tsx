import type { PageNode } from '../../types/page';
import { PageRenderer } from '../PageRenderer';

export interface ColumnProps {
  node: PageNode;
}

export function Column({ node }: ColumnProps) {
  const style = node.styles?.desktop ?? {};
  return (
    <div
      data-node-id={node.id}
      data-node-type={node.type}
      style={{ ...(style as React.CSSProperties) }}
    >
      {node.children.map((child) => (
        <PageRenderer key={child.id} node={child} />
      ))}
    </div>
  );
}
