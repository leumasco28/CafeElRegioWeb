import type { PageNode } from '../../types/page';

export interface TextProps {
  node: PageNode;
}

export function Text({ node }: TextProps) {
  const style = node.styles?.desktop ?? {};
  const tag = (node.props.tag as string) || 'p';
  const content = node.props.content || '';
  switch (tag) {
    case 'h1':
      return (
        <h1
          data-node-id={node.id}
          data-node-type={node.type}
          style={style as React.CSSProperties}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    case 'h2':
      return (
        <h2
          data-node-id={node.id}
          data-node-type={node.type}
          style={style as React.CSSProperties}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    case 'h3':
      return (
        <h3
          data-node-id={node.id}
          data-node-type={node.type}
          style={style as React.CSSProperties}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    default:
      return (
        <p
          data-node-id={node.id}
          data-node-type={node.type}
          style={style as React.CSSProperties}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
  }
}
