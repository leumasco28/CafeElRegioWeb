import type { PageNode } from '../../types/page';
import { PageRenderer } from '../PageRenderer';

export interface SectionProps {
  node: PageNode;
  className?: string;
  onSelect: (id: string) => void;
}

export function Section({ node, className, onSelect }: SectionProps) {
  const style = node.styles?.desktop ?? {};
  return (
    <section
      data-node-id={node.id}
      data-node-type={node.type}
      className={className}
      style={{ ...(style as React.CSSProperties) }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(node.id);
      }}
    >
      {node.children.map((child) => (
        <PageRenderer key={child.id} node={child} onSelect={onSelect} />
      ))}
    </section>
  );
}
