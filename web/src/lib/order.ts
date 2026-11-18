/**
 * Utilidades de pedido (Fase 2).
 *
 * Se usan desde el carrito (CartDrawer) y el formulario de eventos:
 * - armado del mensaje de pedido,
 * - deep-link a WhatsApp (wa.me).
 *
 * No se procesa ningun pago ni envio real: todo se coordina por WhatsApp.
 */
import { site } from '../content/site.ts';

export const PEDIDOS_HABILITADOS = site.orders.enabled;

export type OrderItem = {
  name: string;
  quantity: number;
  price: number | null;
};

export type OrderCustomer = {
  name?: string;
  phone?: string;
  address?: string;
};

export type OrderInput = {
  items?: OrderItem[];
  customer?: OrderCustomer;
  notes?: string;
};

export function formatCOP(value: number | null | undefined): string | null {
  if (typeof value !== 'number' || Number.isNaN(value)) return null;
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);
}

export function buildOrderMessage({ items = [], customer = {}, notes = '' }: OrderInput = {}):
  string | null {
  if (!PEDIDOS_HABILITADOS) return null;

  const lines = [`Pedido ${site.name}`];

  items.forEach((item) => {
    const price = formatCOP(item.price);
    lines.push(`- ${item.quantity} x ${item.name}${price ? ` (${price})` : ''}`);
  });

  const total = items.reduce(
    (sum, item) => sum + (typeof item.price === 'number' ? item.price * item.quantity : 0),
    0
  );
  const totalLabel = formatCOP(total);
  if (totalLabel) lines.push(`Total: ${totalLabel}`);

  if (customer.name) lines.push(`Nombre: ${customer.name}`);
  if (customer.phone) lines.push(`Teléfono: ${customer.phone}`);
  if (customer.address) lines.push(`Dirección: ${customer.address}`);
  if (notes) lines.push(`Notas: ${notes}`);

  return lines.join('\n');
}

export function buildWhatsAppUrl(message: string): string | null {
  if (!PEDIDOS_HABILITADOS || !message) return null;
  return `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
