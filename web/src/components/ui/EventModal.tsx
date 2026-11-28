import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { EVENT_TYPE_OPTIONS, EVENT_TYPE_OTRO } from '../../content/eventTypes.ts';
import { recordTermsAcceptance, type AcceptanceRecord } from '../../lib/acceptance.ts';
import styles from './EventModal.module.css';

type FormData = {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  attendees: string;
  message: string;
  terms: boolean;
  marketing: boolean;
};

export type EventSubmission = Omit<FormData, 'terms' | 'marketing'>;
type ValidationErrors = Partial<Record<keyof FormData, string>>;

type EventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: EventSubmission, acceptance: AcceptanceRecord) => void;
};

const EMPTY_FORM: FormData = {
  name: '',
  phone: '',
  email: '',
  eventType: '',
  eventDate: '',
  attendees: '',
  message: '',
  terms: false,
  marketing: false,
};

function validate(formData: FormData): ValidationErrors {
  const errors: ValidationErrors = {};
  const name = formData.name.trim();
  if (!name) errors.name = 'El nombre completo es obligatorio.';
  else if (name.length < 2) errors.name = 'El nombre es muy corto.';

  const phone = formData.phone.trim();
  if (!phone) errors.phone = 'El WhatsApp o teléfono es obligatorio.';
  else if (phone.replace(/\D/g, '').length < 7) {
    errors.phone = 'El número de teléfono está incompleto.';
  }

  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = 'El correo electrónico no es válido.';
  }
  if (formData.marketing && !formData.email.trim()) {
    errors.email = 'Indica el correo al que autorizas enviar marketing.';
  }
  if (!formData.eventType) errors.eventType = 'Selecciona el tipo de evento.';
  if (!formData.terms) errors.terms = 'Debes aceptar los términos y la política de privacidad.';
  return errors;
}

export default function EventModal({ isOpen, onClose, onSubmit }: EventModalProps) {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstFocusableRef = useRef<HTMLInputElement | null>(null);
  const submittingRef = useRef(submitting);
  useEffect(() => {
    submittingRef.current = submitting;
  }, [submitting]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstFocusableRef.current?.focus();

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape' && !submittingRef.current) {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]'
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [isOpen, onClose]);

  const handleChange =
    (key: keyof FormData) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const target = event.target;
      const value =
        target instanceof HTMLInputElement && target.type === 'checkbox'
          ? target.checked
          : target.value;
      setFormData((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => {
        if (!prev[key]) return prev;
        const next = { ...prev };
        delete next[key];
        return next;
      });
    };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.requestAnimationFrame(() => {
        panelRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      });
      return;
    }

    setErrors({});
    setSubmitting(true);
    setSubmitMessage('');
    try {
      const acceptance = await recordTermsAcceptance({
        context: 'evento',
        name: formData.name,
        contact: formData.email.trim() || formData.phone,
        marketingAccepted: formData.marketing,
      });
      const { terms: _terms, marketing: _marketing, ...submission } = formData;
      onSubmit(submission, acceptance);
    } catch {
      setSubmitMessage(
        'No pudimos registrar tu aceptación. Revisa la conexión e inténtalo de nuevo; no se abrió WhatsApp.'
      );
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !submitting) onClose();
      }}
    >
      <div
        className={styles.panel}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-modal-title"
        aria-describedby="event-modal-description"
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Cerrar formulario"
          disabled={submitting}
        >
          ×
        </button>
        <h2 id="event-modal-title" className={styles.title}>
          Hablemos de tu evento
        </h2>
        <p id="event-modal-description" className={styles.subtitle}>
          Cuéntanos lo necesario para coordinar tu solicitud por WhatsApp. Si participan menores, no
          incluyas sus datos: un padre, madre o tutor debe continuar la conversación.
        </p>

        <form onSubmit={handleSubmit} className={styles.form} data-testid="event-form" noValidate>
          <div className={styles.field}>
            <label htmlFor="event-name">
              Nombre completo <span className={styles.required}>*</span>
            </label>
            <input
              id="event-name"
              name="name"
              type="text"
              autoComplete="name"
              ref={firstFocusableRef}
              value={formData.name}
              onChange={handleChange('name')}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'error-name' : undefined}
              required
            />
            {errors.name && (
              <span id="error-name" className={styles.errorText}>
                {errors.name}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="event-phone">
              WhatsApp o teléfono <span className={styles.required}>*</span>
            </label>
            <input
              id="event-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange('phone')}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'error-phone' : undefined}
              required
            />
            {errors.phone && (
              <span id="error-phone" className={styles.errorText}>
                {errors.phone}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="event-email">Correo electrónico (opcional)</label>
            <input
              id="event-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              spellCheck={false}
              value={formData.email}
              onChange={handleChange('email')}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'error-email' : undefined}
            />
            {errors.email && (
              <span id="error-email" className={styles.errorText}>
                {errors.email}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="event-type">
              Tipo de evento <span className={styles.required}>*</span>
            </label>
            <select
              id="event-type"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange('eventType')}
              aria-invalid={!!errors.eventType}
              aria-describedby={errors.eventType ? 'error-event-type' : undefined}
              required
            >
              <option value="">Selecciona una opción</option>
              {[...EVENT_TYPE_OPTIONS, EVENT_TYPE_OTRO].map((item) => (
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
            <label htmlFor="event-date">Fecha estimada del evento (opcional)</label>
            <input
              id="event-date"
              name="eventDate"
              type="date"
              value={formData.eventDate}
              onChange={handleChange('eventDate')}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="event-attendees">Número aproximado de asistentes (opcional)</label>
            <input
              id="event-attendees"
              name="attendees"
              type="number"
              inputMode="numeric"
              min="1"
              value={formData.attendees}
              onChange={handleChange('attendees')}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="event-message">Mensaje o comentarios adicionales (opcional)</label>
            <textarea
              id="event-message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange('message')}
            />
          </div>

          <div className={styles.consentGroup}>
            <label className={styles.consent} htmlFor="event-terms">
              <input
                id="event-terms"
                name="terms"
                type="checkbox"
                checked={formData.terms}
                onChange={handleChange('terms')}
                aria-invalid={!!errors.terms}
                aria-describedby={errors.terms ? 'error-terms' : undefined}
                required
              />
              <span>
                Acepto los{' '}
                <Link to="/terminos" target="_blank">
                  términos y condiciones
                </Link>{' '}
                y la{' '}
                <Link to="/privacidad" target="_blank">
                  política de privacidad
                </Link>
                . Autorizo el uso de estos datos para gestionar el evento y su registro de
                aceptación.
              </span>
            </label>
            {errors.terms && (
              <span id="error-terms" className={styles.errorText}>
                {errors.terms}
              </span>
            )}

            <label className={styles.consent} htmlFor="event-marketing">
              <input
                id="event-marketing"
                name="marketing"
                type="checkbox"
                checked={formData.marketing}
                onChange={handleChange('marketing')}
              />
              <span>
                <strong>Opcional:</strong> autorizo correos de marketing al correo indicado. Sé que
                puedo{' '}
                <Link to="/baja" target="_blank">
                  darme de baja
                </Link>{' '}
                en cualquier momento.
              </span>
            </label>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancel} onClick={onClose} disabled={submitting}>
              Cancelar
            </button>
            <button type="submit" className={styles.submit} disabled={submitting}>
              {submitting ? 'Registrando aceptación…' : 'Continuar a WhatsApp'}
            </button>
          </div>
          <div aria-live="polite">
            {submitMessage && (
              <p className={`${styles.status} ${styles.statusReady}`}>{submitMessage}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
