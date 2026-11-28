import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../src/context/CartContext.tsx';
import Header from '../src/components/layout/Header.tsx';

describe('Header', () => {
  it('renderiza el nombre del sitio y los cinco enlaces de navegacion', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <Header onToggleCart={() => {}} />
        </CartProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /caf.*regio.*inicio/i })).toBeInTheDocument();

    for (const label of ['Marcas', 'Carta', 'Eventos', 'Pedidos', 'Contacto']) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
    }
  });

  it('abre y cierra el menu movil con el boton de hamburguesa', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <Header onToggleCart={() => {}} />
        </CartProvider>
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /abrir men/i });
    expect(button).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(screen.getByRole('link', { name: 'Carta' }));
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('renderiza el boton del carrito con contador de items', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <Header onToggleCart={() => {}} />
        </CartProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /carrito/i })).toBeInTheDocument();
  });
});
