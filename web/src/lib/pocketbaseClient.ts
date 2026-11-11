import PocketBase from 'pocketbase';
import type { PageDocument, PageNode, PageTheme, NodeStyles } from '../types/page';

export const pb = new PocketBase(
  (import.meta as { env?: { VITE_POCKETBASE_URL?: string } }).env?.VITE_POCKETBASE_URL ||
    'http://127.0.0.1:8090'
);

/**
 * Autentica al administrador para poder operar sobre las colecciones.
 * Se llama una vez al iniciar el editor.
 */
export async function pbSignIn(email: string, password: string): Promise<void> {
  await pb.admins.authWithPassword(email, password);
}

/** Formato de nodo tal como se guarda en la colección `page_nodes` de PocketBase. */
export type PageNodeDB = {
  id: string;
  collectionId: string;
  collectionName: string;
  page: string;
  parent?: string;
  type: string;
  props: Record<string, unknown>;
  styles: Record<string, unknown>;
  order: number;
  created: string;
  updated: string;
};

/** Formato de página tal como se guarda en la colección `pages` de PocketBase. */
export type PageDB = {
  id: string;
  collectionId: string;
  collectionName: string;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  theme: Record<string, unknown>;
  created: string;
  updated: string;
};

/**
 * Convierte un PageNodeDB de PocketBase al PageNode interno del editor.
 */
export function dbNodeToNode(db: PageNodeDB): PageNode {
  return {
    id: db.id,
    type: db.type,
    parentId: db.parent ?? undefined,
    props: db.props ?? {},
    styles: ((db.styles as Record<string, unknown> | undefined) ?? {}) as NodeStyles,
    children: [],
    order: db.order,
  };
}

/**
 * Convierte un PageNode interno al payload para crear/actualizar en PocketBase.
 */
export function nodeToDbPayload(
  node: PageNode,
  pageId: string,
  parentId?: string | null
): {
  page: string;
  parent: string | null;
  type: string;
  props: Record<string, unknown>;
  styles: Record<string, unknown>;
  order: number;
} {
  return {
    page: pageId,
    parent: parentId ?? null,
    type: node.type,
    props: node.props,
    styles: node.styles as unknown as Record<string, unknown>,
    order: node.order,
  };
}

/**
 * Convierte un PageDB de PocketBase al PageDocument interno del editor.
 * `nodes` es la lista plana de PageNodeDB traída de la colección page_nodes.
 */
export function dbPageToDocument(db: PageDB, nodes: PageNodeDB[]): PageDocument {
  // Construir el árbol de nodos a partir de la lista plana
  const nodeMap = new Map<string, PageNode>();
  const roots: PageNode[] = [];

  nodes.forEach((dbNode) => {
    const node = dbNodeToNode(dbNode);
    nodeMap.set(node.id, node);
  });

  nodes.forEach((dbNode) => {
    const node = nodeMap.get(dbNode.id)!;
    if (dbNode.parent && nodeMap.has(dbNode.parent)) {
      const parent = nodeMap.get(dbNode.parent)!;
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  });

  // Ordenar hijos por `order`
  const sortChildren = (n: PageNode) => {
    n.children.sort((a, b) => a.order - b.order);
    n.children.forEach(sortChildren);
  };
  roots.forEach(sortChildren);

  const root = roots[0] ?? {
    id: 'root',
    type: 'Section',
    parentId: undefined,
    props: {},
    styles: {},
    children: [],
    order: 0,
  };

  return {
    id: db.id,
    slug: db.slug,
    title: db.title,
    status: db.status,
    theme: (db.theme as PageTheme) ?? {},
    root,
    createdAt: db.created,
    updatedAt: db.updated,
  };
}

/**
 * Carga una página por slug desde PocketBase, incluyendo sus nodos.
 * Devuelve null si no existe.
 */
export async function loadPage(slug: string): Promise<PageDocument | null> {
  let pageDb: PageDB;
  try {
    pageDb = await pb.collection('pages').getFirstListItem<PageDB>(`slug = "${slug}"`);
  } catch {
    return null;
  }

  // Traer nodos relacionados ordenados
  const nodesResult = await pb.collection('page_nodes').getList<PageNodeDB>(1, 500, {
    filter: `page = "${pageDb.id}"`,
    sort: 'order',
  });

  return dbPageToDocument(pageDb, nodesResult.items);
}

/**
 * Guarda (o actualiza) una página completa con todos sus nodos en PocketBase.
 * Guarda recursivamente: primero la página, luego nodos nivel por nivel
 * para garantizar que el ID de padre exista antes de crear hijos.
 */
export async function savePage(document: PageDocument): Promise<void> {
  // 1. Guardar o actualizar el registro de página
  let pageDb: PageDB;
  try {
    pageDb = await pb.collection('pages').update(document.id, {
      title: document.title,
      slug: document.slug,
      status: document.status,
      theme: document.theme,
    });
  } catch {
    pageDb = await pb.collection('pages').create({
      title: document.title,
      slug: document.slug,
      status: document.status,
      theme: document.theme,
    });
  }

  // 2. Recopilar todos los nodos del árbol por niveles
  const levels: PageNode[][] = [[document.root]];
  let levelIdx = 0;
  while (levelIdx < levels.length) {
    const nextLevel: PageNode[] = [];
    for (const node of levels[levelIdx]) {
      nextLevel.push(...node.children);
    }
    if (nextLevel.length > 0) levels.push(nextLevel);
    levelIdx++;
  }

  // 3. Mapear id local -> id de PocketBase para asignar parentId correctamente
  const pbIdMap = new Map<string, string>(); // local id -> pb id

  // Eliminar nodos existentes que ya no están en el árbol
  const existing = await pb.collection('page_nodes').getList<PageNodeDB>(1, 500, {
    filter: `page = "${pageDb.id}"`,
  });
  const currentIds = new Set(
    levels
      .flat()
      .map((n) => n.id)
      .filter((id) => id !== 'root')
  );
  await Promise.all(
    existing.items
      .filter((n) => !currentIds.has(n.id))
      .map((n) => pb.collection('page_nodes').delete(n.id))
  );

  // 4. Guardar nodo por nodo, nivel por nivel
  for (const level of levels) {
    await Promise.all(
      level.map(async (node) => {
        const parentId = node.parentId ? (pbIdMap.get(node.parentId) ?? null) : null;

        const payload = nodeToDbPayload(node, pageDb.id, parentId);

        // Si el nodo ya tiene un ID de PocketBase (no es local), actualizar
        const isLocalId = node.id === 'root' || node.id.startsWith('local_');
        if (!isLocalId) {
          try {
            await pb.collection('page_nodes').update(node.id, payload);
            pbIdMap.set(node.id, node.id);
            return;
          } catch {
            // Si falla, crear nuevo
          }
        }

        const created = await pb.collection('page_nodes').create(payload);
        pbIdMap.set(node.id, created.id);
      })
    );
  }
}

/**
 * Obtiene una lista de páginas disponibles (slugs y títulos).
 */
export async function listPages(): Promise<Array<{ id: string; slug: string; title: string }>> {
  const pages = await pb.collection('pages').getList<PageDB>(1, 100, {
    sort: '-created',
  });
  return pages.items.map((p) => ({ id: p.id, slug: p.slug, title: p.title }));
}
