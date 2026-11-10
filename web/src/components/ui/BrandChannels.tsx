import { brandsById } from '../../content/brands.ts';
import type { Brand } from '../../content/brands.ts';
import ChannelIcon, { type ChannelName } from './ChannelIcon.tsx';
import styles from './BrandChannels.module.css';

const EXTERNAL = {
  target: '_blank' as const,
  rel: 'noopener noreferrer' as const,
};

function NewTabHint() {
  return <span className="visually-hidden"> (abre en una pestaña nueva)</span>;
}

type BrandChannelsProps = {
  brandId: Brand['id'];
  variant?: 'card' | 'footer' | 'panel';
  title?: string;
  className?: string;
};

/**
 * Canales oficiales de una marca, leídos desde src/content/brands.ts.
 * Variantes:
 * - `card`: bloque discreto dentro de la tarjeta de marca.
 * - `footer`: lista para el pie de página.
 * - `panel`: filas para el panel emergente de la portada.
 */
export default function BrandChannels({
  brandId,
  variant = 'card',
  title,
  className = '',
}: BrandChannelsProps) {
  const brand = brandsById[brandId];
  const contact = brand?.contact;
  if (!brand || !contact) return null;

  const channel = (key: string) => ({ id: key, ...contact.channels[key] });
  const primary = contact.primary.map(channel);
  const secondary = contact.secondary.map(channel);
  const all = [...primary, ...secondary];
  const heading = title ?? `Canales de ${brand.shortName}`;

  if (variant === 'panel') {
    return (
      <div className={`${styles.panel} ${className}`.trim()}>
        <p className={styles.panelTitle}>{heading}</p>
        <ul className={styles.panelList}>
          {primary.map((item) => (
            <li key={item.id}>
              <a href={item.href} className={styles.panelLink} {...EXTERNAL}>
                <ChannelIcon name={item.id as ChannelName} className={styles.panelIcon} />
                <span className={styles.panelText}>
                  <span className={styles.panelName}>{item.name}</span>
                  {item.handle ? <span className={styles.panelHandle}>{item.handle}</span> : null}
                </span>
                <ChannelIcon name="external" className={styles.panelExternal} />
                <NewTabHint />
              </a>
            </li>
          ))}
        </ul>
        <p className={styles.panelSecondary}>
          {secondary.map((item, index) => (
            <span key={item.id} className={styles.secondaryItem}>
              {index > 0 ? (
                <span className={styles.separator} aria-hidden="true">
                  ·
                </span>
              ) : null}
              <a href={item.href} {...EXTERNAL}>
                {item.name}
                <NewTabHint />
              </a>
            </span>
          ))}
        </p>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <ul className={`${styles.footerList} ${className}`.trim()}>
        {all.map((item) => (
          <li key={item.id}>
            <a href={item.href} {...EXTERNAL}>
              <ChannelIcon name={item.id as ChannelName} className={styles.footerIcon} />
              <span>{item.name}</span>
              <NewTabHint />
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={`${styles.card} ${className}`.trim()}>
      <p className={styles.cardLabel}>{heading}</p>

      <ul className={styles.cardPrimary}>
        {primary.map((item) => (
          <li key={item.id}>
            <a href={item.href} className={styles.cardPrimaryLink} {...EXTERNAL}>
              <ChannelIcon name={item.id as ChannelName} className={styles.cardIcon} />
              <span>{item.name}</span>
              <NewTabHint />
            </a>
          </li>
        ))}
      </ul>

      <p className={styles.cardSecondary}>
        {secondary.map((item, index) => (
          <span key={item.id} className={styles.secondaryItem}>
            {index > 0 ? (
              <span className={styles.separator} aria-hidden="true">
                ·
              </span>
            ) : null}
            <a href={item.href} {...EXTERNAL}>
              {item.name}
              <NewTabHint />
            </a>
          </span>
        ))}
      </p>
    </div>
  );
}
