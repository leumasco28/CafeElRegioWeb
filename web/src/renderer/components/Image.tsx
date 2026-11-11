import type { PageNode } from '../../types/page';

export interface ImageProps {
  node: PageNode;
  onSelect: (id: string) => void;
}

export function Image({ node, onSelect }: ImageProps) {
  const style = node.styles?.desktop ?? {};
  const src = (node.props.src as string) || '';
  const alt = (node.props.alt as string) || '';
  return (
    <img
      data-node-id={node.id}
      data-node-type={node.type}
      src={src}
      alt={alt}
      style={{ ...(style as React.CSSProperties), display: 'block' }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(node.id);
      }}
    />
  );
}
