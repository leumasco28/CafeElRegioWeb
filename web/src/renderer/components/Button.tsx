import type { PageNode } from '../../types/page';

export interface ButtonProps {
  node: PageNode;
}

export function Button({ node }: ButtonProps) {
  const style = node.styles?.desktop ?? {};
  const text = (node.props.text as string) || 'Botón';
  return (
    <button data-node-id={node.id} data-node-type={node.type} style={style as React.CSSProperties}>
      {text}
    </button>
  );
}
