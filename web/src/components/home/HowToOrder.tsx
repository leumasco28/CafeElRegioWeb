import SectionHeading from '../ui/SectionHeading.tsx';
import styles from './HowToOrder.module.css';

type Step = {
  title: string;
  text: string;
};

const STEPS: Step[] = [
  {
    title: 'Armas tu pedido',
    text: 'Eliges tus bebidas y repostería desde el catálogo, con cantidades y notas.',
  },
  {
    title: 'Confirmas por WhatsApp',
    text: 'El detalle del pedido se envía como mensaje, listo para coordinar con el equipo.',
  },
  {
    title: 'Coordinas la entrega',
    text: 'Acuerdas punto de encuentro, horario y forma de pago directamente con El Regio.',
  },
];

export default function HowToOrder() {
  return (
    <section id="pedidos" className={`section ${styles.section}`} aria-labelledby="pedidos-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <SectionHeading
            id="pedidos-title"
            eyebrow="Cómo funcionará"
            title="Del catálogo al WhatsApp, sin pasos de más"
            intro="La idea es simple: armas tu pedido en la web y lo cierras por WhatsApp. Todavía estamos preparando esa ruta."
          />

          <div className={styles.status}>
            <span className={styles.statusDot} aria-hidden="true" />
            <div>
              <strong>Pedidos por WhatsApp: próxima fase</strong>
              <p>Este sitio aún no procesa pagos, no confirma compras y no envía pedidos.</p>
            </div>
          </div>
        </div>

        <ol className={styles.steps}>
          {STEPS.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.text}>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
