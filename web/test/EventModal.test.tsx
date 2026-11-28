import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EventModal from '../src/components/ui/EventModal.tsx';

vi.mock('../src/lib/netlifyForms.ts', () => ({
  submitNetlifyForm: vi.fn().mockResolvedValue(undefined),
}));

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  onSubmit: vi.fn(),
};

describe('EventModal', () => {
  it('no envia y muestra errores cuando faltan campos obligatorios', () => {
    render(
      <MemoryRouter>
        <EventModal {...defaultProps} />
      </MemoryRouter>
    );

    fireEvent.submit(screen.getByTestId('event-form'));

    expect(defaultProps.onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText(/El nombre completo es obligatorio./)).toBeInTheDocument();
    expect(screen.getByText(/El WhatsApp o teléfono es obligatorio./)).toBeInTheDocument();
    expect(screen.getByText(/Selecciona el tipo de evento./)).toBeInTheDocument();
    expect(
      screen.getByText(/Debes aceptar los términos y la política de privacidad./)
    ).toBeInTheDocument();
  });

  it('valida telefono minimo 7 digitos y email invalido', () => {
    render(
      <MemoryRouter>
        <EventModal {...defaultProps} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/nombre completo/i), {
      target: { value: 'Ana' },
    });
    fireEvent.change(screen.getByLabelText(/whatsapp o teléfono/i), {
      target: { value: '123' },
    });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'no-es-un-email' },
    });

    fireEvent.submit(screen.getByTestId('event-form'));

    expect(defaultProps.onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText(/El número de teléfono está incompleto./)).toBeInTheDocument();
    expect(screen.getByText(/El correo electrónico no es válido./)).toBeInTheDocument();
  });

  it('requiere marcar la casilla de privacidad antes de enviar', () => {
    render(
      <MemoryRouter>
        <EventModal {...defaultProps} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/nombre completo/i), {
      target: { value: 'Ana' },
    });
    fireEvent.change(screen.getByLabelText(/whatsapp o teléfono/i), {
      target: { value: '3015150059' },
    });
    fireEvent.change(screen.getByLabelText(/tipo de evento/i), {
      target: { value: 'feria' },
    });

    fireEvent.submit(screen.getByTestId('event-form'));

    expect(defaultProps.onSubmit).not.toHaveBeenCalled();
    expect(
      screen.getByText(/Debes aceptar los términos y la política de privacidad./)
    ).toBeInTheDocument();
  });

  it('envia los datos sin el campo privacidad cuando todo es valido', async () => {
    render(
      <MemoryRouter>
        <EventModal {...defaultProps} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/nombre completo/i), {
      target: { value: 'Ana Gomez' },
    });
    fireEvent.change(screen.getByLabelText(/whatsapp o teléfono/i), {
      target: { value: '3015150059' },
    });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'ana@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/tipo de evento/i), {
      target: { value: 'feria' },
    });
    fireEvent.change(screen.getByLabelText(/fecha estimada del evento/i), {
      target: { value: '2026-12-01' },
    });
    fireEvent.change(screen.getByLabelText(/número aproximado de asistentes/i), {
      target: { value: '20' },
    });
    fireEvent.change(screen.getByLabelText(/mensaje o comentarios adicionales/i), {
      target: { value: 'Hola' },
    });

    fireEvent.click(screen.getByLabelText(/acepto los términos/i));
    fireEvent.submit(screen.getByTestId('event-form'));

    await waitFor(() => expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1));
    const data = defaultProps.onSubmit.mock.calls[0][0];
    expect(data.name).toBe('Ana Gomez');
    expect(data.phone).toBe('3015150059');
    expect(data.eventType).toBe('feria');
    expect(data.privacy).toBeUndefined();
  });

  it('cierra el modal al hacer clic en cerrar', () => {
    render(
      <MemoryRouter>
        <EventModal {...defaultProps} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /cerrar formulario/i }));

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });
});
