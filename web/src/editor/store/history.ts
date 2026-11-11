import type { PageDocument } from '../../types/page';

interface HistoryEntry {
  page: PageDocument;
  timestamp: number;
}

export class PageHistory {
  private stack: HistoryEntry[] = [];
  private pointer = -1;
  private maxSize = 50;

  push(page: PageDocument): void {
    this.stack = this.stack.slice(0, this.pointer + 1);
    this.stack.push({ page: JSON.parse(JSON.stringify(page)), timestamp: Date.now() });
    if (this.stack.length > this.maxSize) this.stack.shift();
    else this.pointer++;
  }

  undo(): PageDocument | null {
    if (this.pointer <= 0) return null;
    this.pointer--;
    return this.stack[this.pointer].page;
  }

  redo(): PageDocument | null {
    if (this.pointer >= this.stack.length - 1) return null;
    this.pointer++;
    return this.stack[this.pointer].page;
  }

  canUndo(): boolean {
    return this.pointer > 0;
  }

  canRedo(): boolean {
    return this.pointer < this.stack.length - 1;
  }
}

export const pageHistory = new PageHistory();
