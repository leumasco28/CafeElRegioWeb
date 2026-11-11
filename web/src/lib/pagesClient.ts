import type { PageDocument, PageNode, PageTheme } from '../types/page';

interface RawPage {
  id: string;
  slug: string;
  title: string;
  status?: string;
  theme?: Record<string, unknown>;
  root?: PageNode;
  createdAt?: string;
  updatedAt?: string;
}

const PAGES_KEY = 'cafe_el_regio_pages';

function normalizeNode(node: Partial<PageNode>, order = 0): PageNode {
  return {
    id: String(node.id ?? `node_${order}`),
    type: String(node.type ?? 'Section'),
    parentId: node.parentId ?? undefined,
    props: (node.props as Record<string, unknown> | undefined) ?? {},
    styles: (node.styles as Record<string, unknown> | undefined) ?? {},
    children: (node.children ?? []).map((child, i) => normalizeNode(child as Partial<PageNode>, i)),
    order: node.order ?? order,
  };
}

function parseStoredPages(stored: string): RawPage[] {
  try {
    return JSON.parse(stored).pages as RawPage[];
  } catch {
    return [];
  }
}

/**
 * Datos iniciales importados del archivo JSON estático.
 * Se carga una sola vez al iniciar la aplicación.
 */
const initialData = import('../content/pages.json', {
  assert: { type: 'json' },
});

/**
 * Obtiene todas las páginas. Primero intenta localStorage, si no hay, usa el JSON estático.
 */
export async function listPages(): Promise<Array<{ id: string; slug: string; title: string }>> {
  const stored = localStorage.getItem(PAGES_KEY);
  if (stored) {
    const pages = parseStoredPages(stored);
    return pages.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
    }));
  }

  const data = await initialData;
  return (data.default as unknown as { pages: RawPage[] }).pages.map((p: RawPage) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
  }));
}

/**
 * Carga una página por slug, incluyendo su árbol de nodos.
 * Devuelve null si no existe.
 */
export async function loadPage(slug: string): Promise<PageDocument | null> {
  const stored = localStorage.getItem(PAGES_KEY);
  let pages: RawPage[];

  if (stored) {
    pages = parseStoredPages(stored);
  } else {
    const data = await initialData;
    pages = (data.default as unknown as { pages: RawPage[] }).pages;
  }

  const pageData = pages.find((p) => p.slug === slug);
  if (!pageData) return null;

  return {
    id: pageData.id,
    slug: pageData.slug,
    title: pageData.title,
    status: (pageData.status ?? 'draft') as PageDocument['status'],
    theme: (pageData.theme ?? {}) as PageTheme,
    root: pageData.root
      ? normalizeNode(pageData.root)
      : {
          id: 'root',
          type: 'Section',
          parentId: undefined,
          props: {},
          styles: {},
          children: [],
          order: 0,
        },
    createdAt: pageData.createdAt ?? new Date().toISOString(),
    updatedAt: pageData.updatedAt ?? new Date().toISOString(),
  };
}

/**
 * Guarda una página completa en localStorage.
 * En un entorno de producción con backend, aquí se haría el fetch a la API.
 */
export async function savePage(document: PageDocument): Promise<void> {
  const stored = localStorage.getItem(PAGES_KEY);
  let pages: RawPage[] = [];

  if (stored) {
    pages = parseStoredPages(stored);
  }

  const existingIndex = pages.findIndex((p) => p.id === document.id);
  const pageEntry: RawPage = {
    id: document.id,
    slug: document.slug,
    title: document.title,
    status: document.status,
    theme: document.theme as Record<string, unknown>,
    root: document.root,
    createdAt: document.createdAt,
    updatedAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    pages[existingIndex] = pageEntry;
  } else {
    pages.push(pageEntry);
  }

  localStorage.setItem(PAGES_KEY, JSON.stringify({ pages }, null, 2));
}
