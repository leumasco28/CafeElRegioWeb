import { useEffect, useCallback, useMemo } from 'react';
import { Editor, Frame, Element, useNode, useEditor } from '@craftjs/core';
import type { PageNode } from '../types/page';

function pageToCraftNodes(
  node: PageNode,
  nodes: Record<string, any> = {},
  parentId: string | null = null
): Record<string, any> {
  const craftNode: Record<string, any> = {
    type: node.type,
    isCanvas: node.id === 'root',
    props: {
      ...node.props,
      styles: node.styles,
      parentId: parentId ?? undefined,
    },
    nodes: node.children.map((c) => c.id),
    name: node.type,
    displayName: node.type,
    hidden: false,
    parent: parentId ?? null,
    linkedNodes: {},
  };
  nodes[node.id] = craftNode;

  for (const child of node.children) {
    pageToCraftNodes(child, nodes, node.id);
  }

  return nodes;
}

function craftNodesToPageNode(nodes: Record<string, any>, rootId: string): PageNode | null {
  const data = nodes[rootId];
  if (!data) return null;

  const children: PageNode[] = (data.nodes || [])
    .map((childId: string) => craftNodesToPageNode(nodes, childId))
    .filter(Boolean) as PageNode[];

  return {
    id: rootId,
    type: data.type,
    parentId: data.parent ?? undefined,
    props: data.props ?? {},
    styles: (data.props?.styles as any) ?? {},
    children,
    order: data.props?.order ?? 0,
  };
}

function connectRef(node: any) {
  return (el: HTMLElement | null) => {
    if (el) node.connectors.connect(el);
  };
}

function CraftSection({ id, nodes, props }: any) {
  const node = useNode();
  const style = (props.styles?.desktop || props.style || {}) as React.CSSProperties;

  return (
    <section ref={connectRef(node)} data-node-id={id} data-node-type="Section" style={style}>
      {nodes?.map((childId: string) => (
        <Element key={childId} id={childId} />
      ))}
    </section>
  );
}

function CraftRow({ id, nodes, props }: any) {
  const node = useNode();
  const style = (props.styles?.desktop || props.style || {}) as React.CSSProperties;

  return (
    <div
      ref={connectRef(node)}
      data-node-id={id}
      data-node-type="Row"
      style={{ display: 'flex', gap: '1rem', ...style }}
    >
      {nodes?.map((childId: string) => (
        <Element key={childId} id={childId} />
      ))}
    </div>
  );
}

function CraftColumn({ id, nodes, props }: any) {
  const node = useNode();
  const style = (props.styles?.desktop || props.style || {}) as React.CSSProperties;

  return (
    <div ref={connectRef(node)} data-node-id={id} data-node-type="Column" style={style}>
      {nodes?.map((childId: string) => (
        <Element key={childId} id={childId} />
      ))}
    </div>
  );
}

function CraftText({ id, props }: any) {
  const node = useNode();
  const tag = (props.tag as string) || 'p';
  const content = (props.content as string) || '';
  const style = (props.styles?.desktop || props.style || {}) as React.CSSProperties;

  const elementProps: Record<string, unknown> = {
    ref: connectRef(node),
    'data-node-id': id,
    'data-node-type': 'Text',
    style,
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

function CraftImage({ id, props }: any) {
  const node = useNode();
  const src = (props.src as string) || '';
  const alt = (props.alt as string) || '';
  const style = (props.styles?.desktop || props.style || {}) as React.CSSProperties;

  return (
    <img
      ref={connectRef(node)}
      data-node-id={id}
      data-node-type="Image"
      src={src}
      alt={alt}
      style={{ display: 'block', ...style }}
    />
  );
}

function CraftButton({ id, props }: any) {
  const node = useNode();
  const text = (props.text as string) || 'Boton';
  const href = (props.href as string) || '#';
  const style = (props.styles?.desktop || props.style || {}) as React.CSSProperties;

  return (
    <a
      ref={connectRef(node)}
      data-node-id={id}
      data-node-type="Button"
      href={href}
      style={{
        display: 'inline-block',
        padding: '8px 16px',
        background: '#2563eb',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        ...style,
      }}
    >
      {text}
    </a>
  );
}

const resolver: Record<string, React.ComponentType<any>> = {
  Section: CraftSection,
  Row: CraftRow,
  Column: CraftColumn,
  Text: CraftText,
  Image: CraftImage,
  Button: CraftButton,
};

// Controles de deshacer/rehacer dentro del contexto de <Editor>
function EditorControls({ selectNode }: { selectNode: (id: string | null) => void }) {
  const editor = useEditor();

  const undo = useCallback(() => editor.actions.history.undo(), [editor]);
  const redo = useCallback(() => editor.actions.history.redo(), [editor]);

  const selectedEvent = editor.query.getEvent('selected');
  const selected = selectedEvent ? ((selectedEvent.all() as string[])[0] ?? null) : null;

  useEffect(() => {
    if (selected) {
      selectNode(selected);
    }
  }, [selected, selectNode]);

  return (
    <div
      style={{
        height: '32px',
        background: '#e5e7eb',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1rem',
        gap: '0.75rem',
        fontSize: '0.75rem',
        color: '#6b7280',
        borderTop: '1px solid #d1d5db',
      }}
    >
      <button
        onClick={undo}
        title="Deshacer"
        style={{
          padding: '4px 8px',
          fontSize: '0.875rem',
          background: '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        ↩
      </button>
      <button
        onClick={redo}
        title="Rehacer"
        style={{
          padding: '4px 8px',
          fontSize: '0.875rem',
          background: '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        ↪
      </button>
      <span>Editor visual activo</span>
    </div>
  );
}

export function CraftEditor({ page, setPage, selectNode }: any) {
  const serialized = useMemo(() => {
    if (!page) return {};
    return pageToCraftNodes(page.root);
  }, [page]);

  const onNodesChange = useCallback(
    (query: any) => {
      const craftNodes = query.getNodes();
      const rootData = craftNodes['root'];
      if (!rootData) return;

      const nextRoot = craftNodesToPageNode(craftNodes, 'root');
      if (!nextRoot) return;

      setPage({
        ...page,
        root: nextRoot,
        updatedAt: new Date().toISOString(),
      });
    },
    [setPage, page]
  );

  return (
    <Editor
      resolver={resolver as any}
      enabled
      onNodesChange={onNodesChange}
      onRender={({ render }: { render: React.ReactElement }) => (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div
            style={{
              flex: 1,
              position: 'relative',
              background: '#f3f4f6',
              overflow: 'auto',
              padding: '1rem',
            }}
            data-canvas
          >
            <div style={{ position: 'relative', minHeight: '100vh' }}>{render}</div>
          </div>

          <EditorControls selectNode={selectNode} />
        </div>
      )}
    >
      <div style={{ height: '100%', width: '100%' }}>
        <Frame data={serialized as any}>{serialized.root ? <Element id="root" /> : null}</Frame>
      </div>
    </Editor>
  );
}
