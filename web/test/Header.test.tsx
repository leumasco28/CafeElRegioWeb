import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../src/components/layout/Header.tsx';

describe('Header', () => {
  it('renderiza el nombre del sitio y los cinco enlaces de navegacion', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: /café el regio — inicio/i })).toBeInTheDocument();

    for (const label of ['Marcas', 'Carta', 'Eventos', 'Pedidos', 'Contacto']) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
    }
  });

  it('abre y cierra el menu movil con el boton de hamburguesa', () => {
    render(<Header />);

    const button = screen.getByRole('button', { name: /abrir menú/i });
    expect(button).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('aria-label', 'Cerrar menú');

    fireEvent.click(screen.getByRole('link', { name: 'Carta' }));
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});
