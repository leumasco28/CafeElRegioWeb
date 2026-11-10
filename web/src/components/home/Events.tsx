import { useState } from 'react';
import SectionHeading from '../ui/SectionHeading.tsx';
import EventModal from '../ui/EventModal.tsx';
import styles from './Events.module.css';

type EventType = {
  number: string;
  title: string;
  text: string;
};

const EVENT_TYPES: EventType[] = [
  {
    number: '01',
    title: 'Ferias y mercados',
    text: 'La barra de café se suma a ferias gastronómicas y mercados artesanales.',
  },
  {
    number: '02',
    title: 'Eventos privados',
    text: 'Cumpleaños, reuniones y celebraciones con café y repostería para compartir.',
  },
  {
    number: '03',
    title: 'Empresas y activaciones',
    text: 'Café para equipos, lanzamientos y jornadas que necesitan una pausa distinta.',
  },
];

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
    // El formulario está preparado para recibir los datos. Cuando exista un
    // backend o servicio de recepción, aquí se debería hacer el fetch/POST.
    console.log('Datos del evento:', formData);
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
          {EVENT_TYPES.map((event) => (
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
