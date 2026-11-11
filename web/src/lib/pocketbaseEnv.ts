export const VITE_POCKETBASE_ADMIN_EMAIL =
  (import.meta as { env?: { VITE_POCKETBASE_ADMIN_EMAIL?: string } }).env
    ?.VITE_POCKETBASE_ADMIN_EMAIL || 'admin@cafeelregio.local';

export const VITE_POCKETBASE_ADMIN_PASSWORD =
  (import.meta as { env?: { VITE_POCKETBASE_ADMIN_PASSWORD?: string } }).env
    ?.VITE_POCKETBASE_ADMIN_PASSWORD || 'admin12345';
