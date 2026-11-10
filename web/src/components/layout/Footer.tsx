import { site } from '../../content/site.ts';
import BrandChannels from '../ui/BrandChannels.tsx';
import BrandLogo from '../ui/BrandLogo.tsx';
import ChannelIcon, { type ChannelName } from '../ui/ChannelIcon.tsx';
import styles from './Footer.module.css';

type FooterLink = {
  href: string;
  label: string;
};

const FOOTER_LINKS: FooterLink[] = [
  { href: '#marcas', label: 'Las marcas' },
  { href: '#carta', label: 'La carta' },
  { href: '#eventos', label: 'Eventos' },
  { href: '#pedidos', label: 'Pedidos' },
];

export default function Footer() {
  return (
    <footer id="contacto" className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brandCol}>
          <div className={styles.logos}>
            <span className={styles.regioBadge}>
              <BrandLogo brandId="regio" decorative className={styles.logoRegio} />
            </span>
            <span className={styles.times} aria-hidden="true">
              ×
            </span>
            <span className={styles.kmBadge}>
              <BrandLogo brandId="kmuffis" decorative className={styles.logoKmuffis} />
            </span>
          </div>
          <p className={styles.summary}>
            Café colombiano y repostería artesanal, juntos en una misma pausa.
          </p>
          <p className={styles.status}>
            {site.status}. Catálogo y precios pendientes de confirmación.
          </p>
        </div>

        <nav className={styles.col} aria-label="Enlaces del pie de página">
          <h2 className={styles.colTitle}>Explorar</h2>
          <ul className={styles.linkList}>
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className={styles.colTitle}>KMuffis</h2>
          <BrandChannels brandId="kmuffis" variant="footer" />
        </div>

        <div className={styles.col}>
          <h2 className={styles.colTitle}>Contacto</h2>
          <dl className={styles.contactList}>
            <div>
              <dt>WhatsApp</dt>
              <dd>{site.contact.whatsappDisplay}</dd>
            </div>
            <div>
              <dt>Ciudad</dt>
              <dd>{site.city}</dd>
            </div>
            {site.contact.social?.length ? (
              <div>
                <dt>Redes</dt>
                <dd>
                  <ul className={styles.socialList}>
                    {site.contact.social.map((item) => (
                      <li key={item.id}>
                        <a href={item.href} target="_blank" rel="noopener noreferrer">
                          <ChannelIcon
                            name={item.id as ChannelName}
                            className={styles.socialIcon}
                          />
                          <span>{item.name}</span>
                          <span className="visually-hidden">
                            {' '}
                            de {site.name} (abre en una pestaña nueva)
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ) : null}
          </dl>
          <p className={styles.note}>
            Pedidos por WhatsApp: próxima fase. No hay pagos habilitados en este sitio.
          </p>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© 2026 Café El Regio · KMuffis. Sitio en construcción.</p>
        <p>Café colombiano y repostería artesanal.</p>
      </div>
    </footer>
  );
}
