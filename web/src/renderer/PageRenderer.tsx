import type { PageNode } from '../types/page';
import { Section } from './components/Section';
import { Row } from './components/Row';
import { Column } from './components/Column';
import { Text } from './components/Text';
import { Image } from './components/Image';
import { Button } from './components/Button';

const components: Record<
  string,
  React.ComponentType<{ node: PageNode; onSelect: (id: string) => void }>
> = {
  Section,
  Row,
  Column,
  Text,
  Image,
  Button,
};

export function PageRenderer({
  node,
  onSelect,
}: {
  node: PageNode;
  onSelect: (id: string) => void;
}) {
  const Component = components[node.type];
  if (!Component) {
    return (
      <div
        data-node-id={node.id}
        data-node-type={node.type}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node.id);
        }}
      >
        [Componente no registrado: {node.type}]
      </div>
    );
  }
  return <Component node={node} onSelect={onSelect} />;
}
