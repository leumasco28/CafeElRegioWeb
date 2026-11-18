import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider } from '../src/context/CartContext.tsx';
import CatalogPreview from '../src/components/home/CatalogPreview.tsx';

describe('CatalogPreview', () => {
  it('renderiza el contador de productos de muestra', () => {
    render(
      <CartProvider>
        <CatalogPreview />
      </CartProvider>
    );
    expect(screen.getByText(/productos de muestra/)).toBeInTheDocument();
  });

  it('muestra precio por confirmar para los productos sin precio', () => {
    render(
      <CartProvider>
        <CatalogPreview />
      </CartProvider>
    );
    expect(screen.getAllByText('Precio por confirmar').length).toBeGreaterThan(0);
  });

  it('filtra la carta por marca al hacer clic en KMuffis', () => {
    render(
      <CartProvider>
        <CatalogPreview />
      </CartProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: 'KMuffis' }));
    const counter = screen.getByText(/productos de muestra/);
    expect(counter).toBeInTheDocument();
  });
});
