import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCart } from '../src/context/CartContext.tsx';

const STORAGE_KEY = 'cafe_el_regio_cart';

function Probe() {
  const cart = useCart();

  return (
    <div>
      <span data-testid="count">{cart.itemCount}</span>
      <span data-testid="total">{cart.total}</span>
      <span data-testid="label">{cart.totalLabel ?? 'sin total'}</span>
      <span data-testid="items">{JSON.stringify(cart.items)}</span>

      <button type="button" onClick={() => cart.addItem('americano')}>
        add-americano
      </button>
      <button type="button" onClick={() => cart.addItem('brownie', 2)}>
        add-brownie-2
      </button>
      <button type="button" onClick={() => cart.removeItem('americano')}>
        remove-americano
      </button>
      <button type="button" onClick={() => cart.setQuantity('americano', 3)}>
        set-americano-3
      </button>
      <button type="button" onClick={() => cart.setQuantity('americano', 0)}>
        set-americano-0
      </button>
      <button type="button" onClick={() => cart.clearCart()}>
        clear
      </button>
    </div>
  );
}

function renderCart() {
  return render(
    <CartProvider>
      <Probe />
    </CartProvider>
  );
}

function cartItems() {
  return JSON.parse(screen.getByTestId('items').textContent ?? '[]');
}

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('inicia vacio cuando no hay nada guardado', () => {
    renderCart();

    expect(screen.getByTestId('count')).toHaveTextContent('0');
    expect(screen.getByTestId('total')).toHaveTextContent('0');
    expect(screen.getByTestId('label')).toHaveTextContent('sin total');
    expect(cartItems()).toEqual([]);
  });

  it('agrega un producto y acumula la cantidad al repetirlo', () => {
    renderCart();

    fireEvent.click(screen.getByRole('button', { name: 'add-americano' }));
    expect(cartItems()).toEqual([{ productId: 'americano', quantity: 1 }]);
    expect(screen.getByTestId('count')).toHaveTextContent('1');

    fireEvent.click(screen.getByRole('button', { name: 'add-americano' }));
    expect(cartItems()).toEqual([{ productId: 'americano', quantity: 2 }]);
    expect(screen.getByTestId('count')).toHaveTextContent('2');
    // Americano confirmado en 5.000.
    expect(screen.getByTestId('total')).toHaveTextContent('10000');
  });

  it('suma el total con varios productos y cantidades', () => {
    renderCart();

    fireEvent.click(screen.getByRole('button', { name: 'add-americano' }));
    fireEvent.click(screen.getByRole('button', { name: 'add-brownie-2' }));

    expect(screen.getByTestId('count')).toHaveTextContent('3');
    // 5.000 + (2 x 6.000) = 17.000.
    expect(screen.getByTestId('total')).toHaveTextContent('17000');
  });

  it('cambia la cantidad de un producto', () => {
    renderCart();

    fireEvent.click(screen.getByRole('button', { name: 'add-americano' }));
    fireEvent.click(screen.getByRole('button', { name: 'set-americano-3' }));

    expect(cartItems()).toEqual([{ productId: 'americano', quantity: 3 }]);
    expect(screen.getByTestId('count')).toHaveTextContent('3');
    expect(screen.getByTestId('total')).toHaveTextContent('15000');
  });

  it('quita el producto cuando la cantidad queda en cero', () => {
    renderCart();

    fireEvent.click(screen.getByRole('button', { name: 'add-americano' }));
    fireEvent.click(screen.getByRole('button', { name: 'set-americano-0' }));

    expect(cartItems()).toEqual([]);
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('elimina un producto sin tocar los demas', () => {
    renderCart();

    fireEvent.click(screen.getByRole('button', { name: 'add-americano' }));
    fireEvent.click(screen.getByRole('button', { name: 'add-brownie-2' }));
    fireEvent.click(screen.getByRole('button', { name: 'remove-americano' }));

    expect(cartItems()).toEqual([{ productId: 'brownie', quantity: 2 }]);
    expect(screen.getByTestId('total')).toHaveTextContent('12000');
  });

  it('vacia el carrito por completo', () => {
    renderCart();

    fireEvent.click(screen.getByRole('button', { name: 'add-americano' }));
    fireEvent.click(screen.getByRole('button', { name: 'add-brownie-2' }));
    fireEvent.click(screen.getByRole('button', { name: 'clear' }));

    expect(cartItems()).toEqual([]);
    expect(screen.getByTestId('count')).toHaveTextContent('0');
    expect(screen.getByTestId('label')).toHaveTextContent('sin total');
    expect(localStorage.getItem(STORAGE_KEY)).toBe('[]');
  });

  it('persiste el carrito en localStorage y lo recupera al montar de nuevo', () => {
    const first = renderCart();

    fireEvent.click(screen.getByRole('button', { name: 'add-brownie-2' }));

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    expect(stored).toEqual([{ productId: 'brownie', quantity: 2 }]);

    first.unmount();
    renderCart();

    expect(cartItems()).toEqual([{ productId: 'brownie', quantity: 2 }]);
    expect(screen.getByTestId('count')).toHaveTextContent('2');
    expect(screen.getByTestId('total')).toHaveTextContent('12000');
  });

  it('ignora un carrito guardado con formato invalido', () => {
    localStorage.setItem(STORAGE_KEY, '{ esto no es json');
    renderCart();

    expect(cartItems()).toEqual([]);
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('descarta entradas guardadas sin productId o con cantidad invalida', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        { productId: 'americano', quantity: 2 },
        { quantity: 1 },
        { productId: 'brownie', quantity: 0 },
        { productId: 'latte', quantity: 'dos' },
      ])
    );
    renderCart();

    expect(cartItems()).toEqual([{ productId: 'americano', quantity: 2 }]);
  });
});
