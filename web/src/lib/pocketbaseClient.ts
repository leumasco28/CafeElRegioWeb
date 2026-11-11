import PocketBase from 'pocketbase';

export const pb = new PocketBase(
  (import.meta as { env?: { VITE_POCKETBASE_URL?: string } }).env?.VITE_POCKETBASE_URL ||
    'http://127.0.0.1:8090'
);

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
