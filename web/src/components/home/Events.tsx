import { useState } from 'react';
import { EVENT_TYPE_CARDS } from '../../content/eventTypes.ts';
import { site } from '../../content/site.ts';
import { buildWhatsAppUrl } from '../../lib/order.ts';
import SectionHeading from '../ui/SectionHeading.tsx';
import EventModal from '../ui/EventModal.tsx';
import styles from './Events.module.css';

type EventFormData = {
  name: string;
  phone: string;
  email?: string;
  eventType: string;
  eventDate: string;
  attendees: string;
  message: string;
};

export default function Events() {
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const handleEventSubmit = (formData: EventFormData) => {
    const lines = [
      `Solicitud de evento - ${site.name}`,
      `Nombre: ${formData.name}`,
      `Teléfono: ${formData.phone}`,
      formData.email ? `Correo: ${formData.email}` : null,
      `Tipo de evento: ${formData.eventType}`,
      formData.eventDate ? `Fecha: ${formData.eventDate}` : null,
      formData.attendees ? `Asistentes (aprox.): ${formData.attendees}` : null,
      formData.message ? `Mensaje: ${formData.message}` : null,
    ].filter(Boolean);

    const message = lines.join('\n');
    const url = buildWhatsAppUrl(message);

    if (url) {
      const win = window.open(url, '_blank', 'noopener,noreferrer');
      if (!win) {
        window.location.href = url;
      }
    } else {
      console.log('Datos del evento (WhatsApp no disponible):', formData);
    }

    setIsEventModalOpen(false);
  };

  return (
    <section id="eventos" className={`section ${styles.section}`} aria-labelledby="eventos-title">
      <div className={styles.texture} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.head}>
          <SectionHeading
            id="eventos-title"
            eyebrow="Café que se traslada"
            title="Llevamos la barra a tu evento"
            intro="Ferias, celebraciones y activaciones: El Regio se monta con café recién preparado y la repostería de KMuffis."
            tone="dark"
          />
          <button className={styles.cta} type="button" onClick={() => setIsEventModalOpen(true)}>
            Hablemos de tu evento
          </button>
        </div>

        <ul className={styles.grid}>
          {EVENT_TYPE_CARDS.map((event) => (
            <li key={event.number} className={styles.card}>
              <span className={styles.number} aria-hidden="true">
                {event.number}
              </span>
              <h3 className={styles.title}>{event.title}</h3>
              <p className={styles.text}>{event.text}</p>
            </li>
          ))}
        </ul>

        <p className={styles.note}>
          Paquetes, cobertura y disponibilidad pendientes de confirmación.
        </p>
      </div>

      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onSubmit={handleEventSubmit}
      />
    </section>
  );
}
