export type Breakpoint = 'desktop' | 'tablet' | 'mobile';

export interface NodeStyles {
  desktop?: Record<string, string | number>;
  tablet?: Record<string, string | number>;
  mobile?: Record<string, string | number>;
}

export interface PageNode {
  id: string;
  type: string;
  parentId?: string;
  props: Record<string, unknown>;
  styles: NodeStyles;
  children: PageNode[];
  order: number;
}

export interface PageTheme {
  primaryColor?: string;
  secondaryColor?: string;
  fontHeading?: string;
  fontBody?: string;
}

export interface PageDocument {
  id: string;
  slug: string;
  title: string;
  status: 'draft' | 'published';
  theme: PageTheme;
  root: PageNode;
  createdAt: string;
  updatedAt: string;
}

export interface PageNodeRecord {
  id: string;
  pageId: string;
  parentId?: string;
  type: string;
  props: Record<string, unknown>;
  styles: NodeStyles;
  order: number;
}
