import { Link } from 'react-router-dom';
import { AI_CONTENT_NOTICE } from '../../content/legal.ts';
import { site } from '../../content/site.ts';
import BrandChannels from '../ui/BrandChannels.tsx';
import BrandLogo from '../ui/BrandLogo.tsx';
import ChannelIcon, { type ChannelName } from '../ui/ChannelIcon.tsx';
import styles from './Footer.module.css';

const FOOTER_LINKS = [
  { href: '/#marcas', label: 'Las marcas' },
  { href: '/#carta', label: 'La carta' },
  { href: '/#eventos', label: 'Eventos' },
  { href: '/#pedidos', label: 'Pedidos' },
];

const LEGAL_LINKS = [
  { href: '/privacidad', label: 'Privacidad' },
  { href: '/terminos', label: 'Términos y condiciones' },
  { href: '/reembolsos', label: 'Reembolsos' },
  { href: '/cookies', label: 'Cookies' },
  { href: '/licencias', label: 'Licencias' },
  { href: '/baja', label: 'Baja de correos' },
  { href: '/reclamos-derechos-autor', label: 'Derechos de autor' },
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
            {site.status}. Algunos productos y precios están por confirmar.
          </p>
          <p className={styles.aiNotice}>{AI_CONTENT_NOTICE}</p>
        </div>

        <nav className={styles.col} aria-label="Enlaces del pie de página">
          <h2 className={styles.colTitle}>Explorar</h2>
          <ul className={styles.linkList}>
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link to={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className={styles.colTitle}>KMuffis</h2>
          <BrandChannels brandId="kmuffis" variant="footer" />
          <h2 className={`${styles.colTitle} ${styles.legalTitle}`}>Legal</h2>
          <ul className={styles.linkList}>
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link to={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h2 className={styles.colTitle}>Contacto</h2>
          <dl className={styles.contactList}>
            <div>
              <dt>WhatsApp</dt>
              <dd>
                <a href={`https://wa.me/${site.contact.whatsappNumber}`}>
                  {site.contact.whatsappDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt>Ciudad</dt>
              <dd>{site.city}, Colombia</dd>
            </div>
            {site.contact.social.length > 0 && (
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
            )}
          </dl>
          <p className={styles.note}>
            Pedidos por WhatsApp disponibles. El sitio no procesa pagos. El total final y cualquier
            domicilio se confirman antes de pagar.
          </p>
          <button
            type="button"
            className={styles.cookieButton}
            onClick={() => window.dispatchEvent(new Event('regio:open-cookie-settings'))}
          >
            Preferencias de cookies
          </button>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© 2026 Café El Regio · KMuffis. Sitio en construcción.</p>
        <p>Sin analítica ni rastreadores publicitarios.</p>
      </div>
    </footer>
  );
}
