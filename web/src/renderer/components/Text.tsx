import type { PageNode } from '../../types/page';

export interface TextProps {
  node: PageNode;
  onSelect: (id: string) => void;
}

export function Text({ node, onSelect }: TextProps) {
  const style = node.styles?.desktop ?? {};
  const tag = (node.props.tag as string) || 'p';
  const content = node.props.content || '';
  const elementProps: Record<string, unknown> = {
    dataNodeId: node.id,
    dataNodeType: node.type,
    style: style as React.CSSProperties,
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      onSelect(node.id);
    },
    dangerouslySetInnerHTML: { __html: content },
  };

  switch (tag) {
    case 'h1':
      return <h1 {...elementProps} />;
    case 'h2':
      return <h2 {...elementProps} />;
    case 'h3':
      return <h3 {...elementProps} />;
    default:
      return <p {...elementProps} />;
  }
}
