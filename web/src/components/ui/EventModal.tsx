import { useCallback, useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import styles from './EventModal.module.css';

type EventTypeOption = {
  value: string;
  label: string;
};

const EVENT_TYPES: EventTypeOption[] = [
  { value: 'feria', label: 'Feria o mercado de emprendimientos' },
  { value: 'privado', label: 'Evento privado' },
  { value: 'empresarial', label: 'Evento empresarial o activación de marca' },
  { value: 'otro', label: 'Otro' },
];

type FormData = {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  attendees: string;
  message: string;
  privacy: boolean;
};

type ValidationErrors = Partial<Record<keyof FormData, string>>;

type SubmitStatus = 'ready' | 'error' | null;

type EventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: Omit<FormData, 'privacy'>) => void;
};

function validate(formData: FormData): ValidationErrors {
  const errors: ValidationErrors = {};
  const name = formData.name.trim();
  if (!name) {
    errors.name = 'El nombre completo es obligatorio.';
  } else if (name.length < 2) {
    errors.name = 'El nombre es muy corto.';
  }

  const phone = formData.phone.trim();
  if (!phone) {
    errors.phone = 'El WhatsApp o teléfono es obligatorio.';
  } else {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 7) {
      errors.phone = 'El número de teléfono está incompleto.';
    }
  }

  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = 'El correo electrónico no es válido.';
  }

  if (!formData.eventType) {
    errors.eventType = 'Selecciona el tipo de evento.';
  }

  if (!formData.privacy) {
    errors.privacy = 'Debes aceptar el tratamiento de datos personales.';
  }

  return errors;
}

export default function EventModal({ isOpen, onClose, onSubmit }: EventModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    eventDate: '',
    attendees: '',
    message: '',
    privacy: false,
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const [submitMessage, setSubmitMessage] = useState('');

  const modalRef = useRef<HTMLDivElement | null>(null);
  const firstFocusableRef = useRef<HTMLInputElement | null>(null);
  const lastFocusableRef = useRef<HTMLButtonElement | null>(null);

  const closeModal = useCallback(() => {
    onClose();
  }, [onClose]);

  // Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onKeyDown as unknown as EventListener);
    return () => document.removeEventListener('keydown', onKeyDown as unknown as EventListener);
  }, [isOpen, closeModal]);

  // Capturar foco al abrir y evitar clics fuera
  useEffect(() => {
    if (!isOpen) return;
    const overlay = modalRef.current;
    if (!overlay) return undefined;
    const onClick = (event: MouseEvent) => {
      if (event.target === overlay) closeModal();
    };
    overlay.addEventListener('click', onClick);
    if (firstFocusableRef.current) firstFocusableRef.current.focus();
    return () => overlay.removeEventListener('click', onClick);
  }, [isOpen, closeModal]);

  const handleChange = (key: keyof FormData) => (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    setFormData((prev) => ({ ...prev, [key]: target.value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handlePrivacyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, privacy: event.target.checked }));
    if (errors.privacy) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.privacy;
        return next;
      });
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    // Simular red para mostrar estado de carga mientras no hay backend
    setTimeout(() => {
      setSubmitting(false);
      setSubmitStatus('ready');
      setSubmitMessage(
        'Tu solicitud está lista para enviarse. Actualmente no hay un servicio de backend configurado para recibir estos datos. Mientras tanto, puedes escribirnos directamente por WhatsApp al 301 515 0059.',
      );
    }, 800);

    const { privacy, ...dataWithoutPrivacy } = formData;
    onSubmit(dataWithoutPrivacy);
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
      onKeyDown={(event: KeyboardEvent) => {
        if (event.key === 'Escape') closeModal();
      }}
    >
      <div className={styles.panel}>
        <button
          className={styles.close}
          onClick={closeModal}
          aria-label="Cerrar formulario"
        >
          ✕
        </button>

        <h2 id="event-modal-title" className={styles.title}>
          Hablemos de tu evento
        </h2>
        <p className={styles.subtitle}>
          Cuéntanos qué necesitas y nos pondremos en contacto contigo por
          WhatsApp.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="event-name">Nombre completo <span className={styles.required}>*</span></label>
            <input
              id="event-name"
              type="text"
              ref={firstFocusableRef}
              value={formData.name}
              onChange={handleChange('name')}
              aria-invalid={!!errors.name}
              aria-describedby="error-name"
            />
            {errors.name && (
              <span id="error-name" className={styles.errorText}>
                {errors.name}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="event-phone">WhatsApp o teléfono <span className={styles.required}>*</span></label>
            <input
              id="event-phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange('phone')}
              aria-invalid={!!errors.phone}
              aria-describedby="error-phone"
            />
            {errors.phone && (
              <span id="error-phone" className={styles.errorText}>
                {errors.phone}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="event-email">Correo electrónico</label>
            <input
              id="event-email"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              aria-invalid={!!errors.email}
              aria-describedby="error-email"
            />
            {errors.email && (
              <span id="error-email" className={styles.errorText}>
                {errors.email}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="event-type">Tipo de evento <span className={styles.required}>*</span></label>
            <select
              id="event-type"
              value={formData.eventType}
              onChange={(event) =>
                handleChange('eventType')(event as unknown as ChangeEvent<HTMLInputElement>)
              }
              aria-invalid={!!errors.eventType}
              aria-describedby="error-event-type"
            >
              <option value="">Selecciona una opción</option>
              {EVENT_TYPES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            {errors.eventType && (
              <span id="error-event-type" className={styles.errorText}>
                {errors.eventType}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="event-date">Fecha estimada del evento</label>
            <input
              id="event-date"
              type="date"
              value={formData.eventDate}
              onChange={handleChange('eventDate')}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="event-attendees">Número aproximado de asistentes</label>
            <input
              id="event-attendees"
              type="number"
              min="1"
              value={formData.attendees}
              onChange={handleChange('attendees')}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="event-message">Mensaje o comentarios adicionales</label>
            <textarea
              id="event-message"
              rows={3}
              value={formData.message}
              onChange={(event) =>
                handleChange('message')(event as unknown as ChangeEvent<HTMLInputElement>)
              }
            />
          </div>

          <div className={styles.privacy}>
            <input
              id="event-privacy"
              type="checkbox"
              checked={formData.privacy}
              onChange={handlePrivacyChange}
              aria-required="true"
              required
            />
            <label htmlFor="event-privacy" className={styles.privacyText}>
              Al enviar este formulario aceptas que tus datos personales (nombre,
              teléfono, correo y detalles del evento) se utilicen únicamente para
              contactarte y coordinar tu solicitud de evento. No compartiremos tu
              información con terceros. Puedes escribirnos para ejercer tus
              derechos de consulta, corrección o supresión de datos.
            </label>
            {errors.privacy && (
              <span className={styles.errorText}>
                {errors.privacy}
              </span>
            )}
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancel}
              onClick={closeModal}
              ref={lastFocusableRef}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.submit}
              disabled={submitting}
            >
              {submitting ? 'Enviando...' : 'Enviar solicitud'}
            </button>
          </div>

          {submitStatus === 'ready' && (
            <div className={`${styles.status} ${styles.statusReady}`}>
              <span className={styles.statusIcon}>⚠</span>
              <span>{submitMessage}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
