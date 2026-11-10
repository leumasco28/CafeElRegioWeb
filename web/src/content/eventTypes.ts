/**
 * Tipos de evento compartidos entre la seccion de eventos (Events) y el
 * formulario de solicitud (EventModal).
 *
 * Antes vivian definidos dos veces (una en cada componente) con labels
 * similares pero no identicos. Ahora se mantienen en un solo lugar.
 *
 * - EVENT_TYPE_VALUES: valores canonicos (feria, privado, empresarial).
 * - EVENT_TYPE_CARDS: tarjetas que muestra la seccion Events (con numero/title/text).
 * - EVENT_TYPE_OPTIONS: opciones del select del modal (con value/label).
 * - EVENT_TYPE_OTRO: opcion adicional que solo usa el modal del formulario.
 */

export type EventType = 'feria' | 'privado' | 'empresarial';

export type EventTypeCard = {
  number: string;
  title: string;
  text: string;
};

export type EventTypeOption = {
  value: EventType | 'otro';
  label: string;
};

export const EVENT_TYPE_VALUES: EventType[] = ['feria', 'privado', 'empresarial'];

export const EVENT_TYPE_CARDS: EventTypeCard[] = [
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

export const EVENT_TYPE_OPTIONS: EventTypeOption[] = [
  { value: 'feria', label: 'Feria o mercado de emprendimientos' },
  { value: 'privado', label: 'Evento privado' },
  { value: 'empresarial', label: 'Evento empresarial o activación de marca' },
];

export const EVENT_TYPE_OTRO: EventTypeOption = {
  value: 'otro',
  label: 'Otro',
};
