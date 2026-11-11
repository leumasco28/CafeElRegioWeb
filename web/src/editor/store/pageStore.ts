import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { PageDocument, PageNode } from '../../types/page';

interface PageState {
  page: PageDocument | null;
  selectedNodeId: string | null;
  setPage: (page: PageDocument) => void;
  selectNode: (id: string | null) => void;
  updateNode: (id: string, patch: Partial<PageNode>) => void;
  addNode: (parentId: string | null, node: PageNode) => void;
  removeNode: (id: string) => void;
}

export const usePageStore = create<PageState>()(
  devtools((set) => ({
    page: null,
    selectedNodeId: null,

    setPage: (page) => set({ page }),

    selectNode: (id) => set({ selectedNodeId: id }),

    updateNode: (id, patch) =>
      set((state) => {
        if (!state.page) return state;
        const walk = (node: PageNode): PageNode => {
          if (node.id === id) return { ...node, ...patch, children: node.children };
          return { ...node, children: node.children.map(walk) };
        };
        return { page: { ...state.page, root: walk(state.page.root) } };
      }),

    addNode: (parentId, node) =>
      set((state) => {
        if (!state.page) return state;
        const insert = (n: PageNode): PageNode => {
          if (n.id === parentId) {
            return { ...n, children: [...n.children, node] };
          }
          return { ...n, children: n.children.map(insert) };
        };
        return {
          page: {
            ...state.page,
            root: parentId ? insert(state.page.root) : node,
          },
        };
      }),

    removeNode: (id) =>
      set((state) => {
        if (!state.page) return state;
        const prune = (n: PageNode): PageNode | null => {
          if (n.id === id) return null;
          const children = n.children.map(prune).filter((c): c is PageNode => c !== null);
          return { ...n, children };
        };
        return { page: { ...state.page, root: prune(state.page.root)! } };
      }),
  }))
);
