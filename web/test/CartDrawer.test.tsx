import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider } from '../src/context/CartContext.tsx';
import CartDrawer from '../src/components/ui/CartDrawer.tsx';
import { formatCOP } from '../src/lib/order.ts';

const STORAGE_KEY = 'cafe_el_regio_cart';
const WHATSAPP_BASE = 'https://wa.me/573015150059?text=';

function seedCart(items: Array<{ productId: string; quantity: number }>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// Intl puede usar espacios duros (NBSP); el DOM los normaliza a espacio simple.
const shown = (value: number) => (formatCOP(value) as string).replace(/\s+/g, ' ');

function renderDrawer(isOpen = true, onClose = () => {}) {
  return render(
    <CartProvider>
      <CartDrawer isOpen={isOpen} onClose={onClose} />
    </CartProvider>
  );
}

describe('CartDrawer', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('no renderiza nada cuando esta cerrado', () => {
    const { container } = renderDrawer(false);

    expect(container).toBeEmptyDOMElement();
  });

  it('muestra el estado vacio y oculta el envio por WhatsApp', () => {
    renderDrawer();

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /whatsapp/i })).not.toBeInTheDocument();
  });

  it('lista los productos guardados con su cantidad y total', () => {
    seedCart([
      { productId: 'americano', quantity: 2 },
      { productId: 'brownie', quantity: 1 },
    ]);
    renderDrawer();

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('Americano')).toBeInTheDocument();
    expect(screen.getByText('Brownie')).toBeInTheDocument();
    // 2 x 5.000 + 1 x 6.000 = 16.000.
    expect(screen.getByText(shown(16000))).toBeInTheDocument();
  });

  it('aumenta la cantidad desde el cajon', () => {
    seedCart([{ productId: 'americano', quantity: 1 }]);
    renderDrawer();

    fireEvent.click(screen.getByRole('button', { name: 'Aumentar Americano' }));

    expect(screen.getByText(shown(10000))).toBeInTheDocument();
  });

  it('reduce la cantidad y quita el producto al llegar a cero', () => {
    seedCart([{ productId: 'americano', quantity: 1 }]);
    renderDrawer();

    fireEvent.click(screen.getByRole('button', { name: 'Reducir Americano' }));

    expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument();
  });

  it('quita un producto del carrito', () => {
    seedCart([
      { productId: 'americano', quantity: 1 },
      { productId: 'brownie', quantity: 1 },
    ]);
    renderDrawer();

    fireEvent.click(screen.getByRole('button', { name: 'Quitar Americano' }));

    expect(screen.queryByText('Americano')).not.toBeInTheDocument();
    expect(screen.getByText('Brownie')).toBeInTheDocument();
  });

  it('vacia el carrito con el boton correspondiente', () => {
    seedCart([{ productId: 'brownie', quantity: 3 }]);
    renderDrawer();

    fireEvent.click(screen.getByRole('button', { name: 'Vaciar carrito' }));

    expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument();
    expect(localStorage.getItem(STORAGE_KEY)).toBe('[]');
  });

  it('cierra el cajon con el boton de cerrar', () => {
    const onClose = vi.fn();
    renderDrawer(true, onClose);

    fireEvent.click(screen.getByRole('button', { name: 'Cerrar carrito' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('genera el deep-link de WhatsApp con los items y limpia el carrito', () => {
    seedCart([
      { productId: 'americano', quantity: 2 },
      { productId: 'brownie', quantity: 1 },
    ]);
    const open = vi.fn().mockReturnValue({} as unknown as Window);
    vi.stubGlobal('open', open);
    renderDrawer();

    fireEvent.click(screen.getByRole('button', { name: /whatsapp/i }));

    expect(open).toHaveBeenCalledTimes(1);
    const url = open.mock.calls[0][0] as string;
    expect(url.startsWith(WHATSAPP_BASE)).toBe(true);

    const message = decodeURIComponent(url.slice(WHATSAPP_BASE.length));
    expect(message).toContain('Pedido Café El Regio');
    expect(message).toContain('2 x Americano');
    expect(message).toContain('1 x Brownie');
    expect(message).toContain(formatCOP(16000) as string);

    expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument();
    expect(localStorage.getItem(STORAGE_KEY)).toBe('[]');
  });
});
