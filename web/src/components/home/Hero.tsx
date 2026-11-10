import { useEffect, useRef, useState } from 'react';
import type { PointerEvent, KeyboardEvent } from 'react';
import { site } from '../../content/site.ts';
import BrandChannels from '../ui/BrandChannels.tsx';
import BrandLogo from '../ui/BrandLogo.tsx';
import ChannelIcon from '../ui/ChannelIcon.tsx';
import Pill from '../ui/Pill.tsx';
import styles from './Hero.module.css';

type HeroAction = {
  label: string;
  href: string;
  tone: 'primary' | 'secondary' | 'outline';
};

const HIGHLIGHTS: string[] = [
  'Café colombiano',
  'Bebidas calientes y frías',
  'Métodos manuales',
  'Pedidos para eventos',
];

const PANEL_ID = 'kmuffis-canales';

export const HERO_ACTIONS: HeroAction[] = [
  { label: 'Ver el catálogo', href: '#carta', tone: 'primary' },
  { label: 'Conocer la marca', href: '#marcas', tone: 'secondary' },
  { label: 'Consultar eventos', href: '#eventos', tone: 'secondary' },
];

export default function Hero() {
  const [channelsOpen, setChannelsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const channelsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!channelsOpen) return undefined;

    const onPointerDown = (event: PointerEvent) => {
      if (!channelsRef.current?.contains(event.target as Node)) setChannelsOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setChannelsOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener('pointerdown', onPointerDown as unknown as EventListener);
    document.addEventListener('keydown', onKeyDown as unknown as EventListener);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown as unknown as EventListener);
      document.removeEventListener('keydown', onKeyDown as unknown as EventListener);
    };
  }, [channelsOpen]);

  // El hover solo aplica a ratón: en táctil y lápiz el botón funciona con tap.
  const openOnHover = (event: PointerEvent) => {
    if (event.pointerType === 'mouse') setChannelsOpen(true);
  };

  const closeOnLeave = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    if (channelsRef.current?.contains(document.activeElement)) return;
    setChannelsOpen(false);
  };

  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.glowClip} aria-hidden="true">
        <div className={styles.glow} />
      </div>

      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.kicker}>Bucaramanga · Café colombiano</p>

          <h1 id="hero-title" className={styles.title}>
            Café hecho con calma, <em>servido con carácter.</em>
          </h1>

          <p className={styles.lead}>
            Conoce Café El Regio, una propuesta de café colombiano que combina
            preparaciones cuidadosas, bebidas para disfrutar y una personalidad que
            no pasa desapercibida.
          </p>
          <p className={styles.leadSecondary}>
            Descubre nuestro café empacado, encuentra tu próxima bebida favorita o
            lleva la experiencia de El Regio a tu próximo evento.
          </p>

          <div className={styles.actions}>
            <a className={styles.primary} href={HERO_ACTIONS[0].href}>
              {HERO_ACTIONS[0].label}
            </a>
            <a className={styles.secondary} href={HERO_ACTIONS[1].href}>
              {HERO_ACTIONS[1].label}
            </a>
            <a className={styles.outline} href={HERO_ACTIONS[2].href}>
              {HERO_ACTIONS[2].label}
            </a>
          </div>

          <ul className={styles.highlights} aria-label="Lo que ofrece la marca">
            {HIGHLIGHTS.map((item) => (
              <li key={item}>
                <Pill tone="neutral">{item}</Pill>
              </li>
            ))}
          </ul>

          <p className={styles.notice}>
            <span className={styles.dot} aria-hidden="true" />
            {site.status}: catálogo y precios en preparación.
          </p>
        </div>

        <div className={styles.stage}>
          <div className={styles.plate} aria-hidden="true">
            <BrandLogo brandId="regio" eager className={styles.plateLogo} />
          </div>

          <div className={styles.kcard}>
            <div className={styles.kcardHead}>
              <span className={styles.kcardLogoWrap}>
                <BrandLogo brandId="kmuffis" decorative eager className={styles.kcardLogo} />
              </span>
              <span className={styles.kcardText}>
                <strong>KMuffis</strong>
                <small>Repostería artesanal</small>
              </span>
            </div>

            <div
              className={styles.kcardFoot}
              ref={channelsRef}
              onPointerEnter={openOnHover}
              onPointerLeave={closeOnLeave}
            >
              <button
                ref={triggerRef}
                type="button"
                className={styles.kcardToggle}
                aria-expanded={channelsOpen}
                aria-controls={PANEL_ID}
                aria-label="Canales oficiales de KMuffis"
                onClick={() => setChannelsOpen((open) => !open)}
              >
                <span>Canales oficiales</span>
                <ChannelIcon name="chevron" className={styles.kcardChevron} />
              </button>

              <div className={styles.kcardPanel} id={PANEL_ID} data-open={channelsOpen || undefined}>
                <div className={styles.kcardPanelInner}>
                  <BrandChannels brandId="kmuffis" variant="panel" />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.ring} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
