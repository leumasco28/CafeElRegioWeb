import { useEffect, useRef, useState } from 'react';
import type { PointerEvent, KeyboardEvent } from 'react';
import { site } from '../../content/site.ts';
import { isChristmasSeason } from '../../content/christmas.ts';
import { AI_CONTENT_NOTICE } from '../../content/legal.ts';
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
  const desktopVideoRef = useRef<HTMLVideoElement | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);
  const [desktopVideoLoaded, setDesktopVideoLoaded] = useState(false);
  const [mobileVideoLoaded, setMobileVideoLoaded] = useState(false);
  const christmasActive = isChristmasSeason();

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

  const openOnHover = (event: PointerEvent) => {
    if (event.pointerType === 'mouse') setChannelsOpen(true);
  };

  const closeOnLeave = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    if (channelsRef.current?.contains(document.activeElement)) return;
    setChannelsOpen(false);
  };

  const handleDesktopVideoLoad = () => {
    setDesktopVideoLoaded(true);
    desktopVideoRef.current?.play().catch(() => {
      // Autoplay may be blocked, user can tap to play
    });
  };

  const handleMobileVideoLoad = () => {
    setMobileVideoLoaded(true);
    mobileVideoRef.current?.play().catch(() => {
      // Autoplay may be blocked, user can tap to play
    });
  };

  // Helper to render title with <em> as actual HTML
  const renderTitle = (christmas: boolean) => {
    if (christmas) {
      return (
        <>
          Cajas navideñas listas para
          <em> regalar momentos</em>.
        </>
      );
    }
    return (
      <>
        Café hecho con alma,
        <em> Servido con Carácter.</em>
      </>
    );
  };

  return (
    <section
      id="inicio"
      className={`${styles.hero} ${christmasActive ? styles.christmas : ''}`}
      aria-labelledby="hero-title"
    >
      <div className={styles.glowClip} aria-hidden="true">
        <div className={styles.glow} />
      </div>

      <div className={`container ${styles.grid}`}>
        {!christmasActive && (
          <div className={styles.copy}>
            <p className={styles.kicker}>Bucaramanga · Café colombiano</p>

            <h1 id="hero-title" className={styles.title}>
              {renderTitle(christmasActive)}
            </h1>

            <p className={styles.lead}>
              {christmasActive
                ? 'Lleva la magia de Café El Regio y KMuffis a tu mesa esta Navidad. Cajas con café empacado, galletas navideñas y repostería artesanal.'
                : 'Conoce Café El Regio, una propuesta de café colombiano que combina preparaciones cuidadosas, bebidas para disfrutar y una personalidad que no pasa desapercibida.'}
            </p>
            <p className={styles.leadSecondary}>
              {christmasActive
                ? 'Disponibles por tiempo limitado. Pide la tuya antes del 5 de enero.'
                : 'Descubre nuestro café empacado, encuentra tu próxima bebida favorita o lleva la experiencia de El Regio a tu próximo evento.'}
            </p>

            <div className={styles.actions}>
              <a className={styles.primary} href={HERO_ACTIONS[0].href}>
                {christmasActive ? 'Ver cajas navideñas' : HERO_ACTIONS[0].label}
              </a>
              <a className={styles.secondary} href={HERO_ACTIONS[1].href}>
                {HERO_ACTIONS[1].label}
              </a>
              <a className={styles.outline} href={HERO_ACTIONS[2].href}>
                {HERO_ACTIONS[2].label}
              </a>
            </div>

            <ul className={styles.highlights} aria-label="Lo que ofrece la marca">
              {(christmasActive
                ? [
                    'Cajas navideñas 🎄',
                    'Café empacado 250g / 500g',
                    'Galletas navideñas KMuffis',
                    'Repostería artesanal',
                  ]
                : HIGHLIGHTS
              ).map((item) => (
                <li key={item}>
                  <Pill tone="neutral">{item}</Pill>
                </li>
              ))}
            </ul>

            <p className={styles.notice}>
              <span className={styles.dot} aria-hidden="true" />
              {site.status}:{' '}
              {christmasActive ? 'Temporada navideña activa' : 'catálogo y precios en preparación'}.
            </p>
          </div>
        )}

        <div className={styles.stage}>
          {christmasActive ? (
            <>
              {/* Christmas video wrapper - full width on desktop, full screen on mobile */}
              <div className={styles.christmasVideoWrapper} aria-hidden="true">
                {/* Desktop video: original with audio + controls */}
                <video
                  ref={desktopVideoRef}
                  className={styles.christmasVideoDesktop}
                  src="/assets/christmas/CAjitasXmas-ya.mp4"
                  poster="/assets/christmas/promo4-2.jpg"
                  autoPlay
                  loop
                  playsInline
                  controls
                  controlsList="nodownload"
                  onLoadedData={handleDesktopVideoLoad}
                  aria-label="Video promocional de cajas navideñas Café El Regio y KMuffis"
                />
                {!desktopVideoLoaded && (
                  <div
                    className={styles.videoPoster}
                    style={{ backgroundImage: 'url(/assets/christmas/promo4-2.jpg)' }}
                    aria-hidden="true"
                  />
                )}

                {/* Mobile video: vertical 9:16 + controls */}
                <video
                  ref={mobileVideoRef}
                  className={styles.christmasVideoMobile}
                  src="/assets/christmas/vertical/CAjitasXmas-vertical.mp4"
                  poster="/assets/christmas/promo4-2.jpg"
                  autoPlay
                  loop
                  playsInline
                  controls
                  controlsList="nodownload"
                  onLoadedData={handleMobileVideoLoad}
                  aria-label="Video promocional de cajas navideñas Café El Regio y KMuffis"
                />
                {!mobileVideoLoaded && (
                  <div
                    className={styles.videoPoster}
                    style={{ backgroundImage: 'url(/assets/christmas/promo4-2.jpg)' }}
                    aria-hidden="true"
                  />
                )}

                {/* Mobile-only CTA button below video */}
                <div className={styles.mobileCTA}>
                  <a
                    href="#cajas-navidenas"
                    className={styles.mobileCTAButton}
                    aria-label="Ver cajas navideñas"
                  >
                    Ver cajas navideñas
                  </a>
                </div>

                {/* Christmas decorations overlay */}
                <div className={styles.christmasDecorations} aria-hidden="true">
                  <span
                    className={styles.snowflake}
                    style={{ top: '10%', left: '5%', animationDelay: '0s' }}
                  >
                    ❄
                  </span>
                  <span
                    className={styles.snowflake}
                    style={{ top: '20%', right: '8%', animationDelay: '1s' }}
                  >
                    ❅
                  </span>
                  <span
                    className={styles.snowflake}
                    style={{ top: '60%', left: '3%', animationDelay: '2s' }}
                  >
                    ❆
                  </span>
                  <span
                    className={styles.snowflake}
                    style={{ top: '70%', right: '5%', animationDelay: '3s' }}
                  >
                    ❄
                  </span>
                  <span
                    className={styles.snowflake}
                    style={{ top: '40%', left: '50%', animationDelay: '1.5s' }}
                  >
                    ✦
                  </span>
                  <span
                    className={styles.sparkle}
                    style={{ top: '15%', right: '15%', animationDelay: '0.5s' }}
                  >
                    ✧
                  </span>
                  <span
                    className={styles.sparkle}
                    style={{ top: '80%', left: '20%', animationDelay: '2.5s' }}
                  >
                    ✧
                  </span>
                  <span
                    className={styles.sparkle}
                    style={{ top: '30%', right: '25%', animationDelay: '3.5s' }}
                  >
                    ✧
                  </span>
                </div>
              </div>

              {/* Copy overlay on video - transparent background */}
              <div className={styles.copyOverlay}>
                <div className={styles.copyContent}>
                  <p className={styles.kicker}>Bucaramanga · Café colombiano</p>

                  <h1 id="hero-title" className={styles.title}>
                    {renderTitle(christmasActive)}
                  </h1>

                  <p className={styles.lead}>
                    {christmasActive
                      ? 'Lleva la magia de Café El Regio y KMuffis a tu mesa esta Navidad. Cajas con café empacado, galletas navideñas y repostería artesanal.'
                      : 'Conoce Café El Regio, una propuesta de café colombiano que combina preparaciones cuidadosas, bebidas para disfrutar y una personalidad que no pasa desapercibida.'}
                  </p>
                  <p className={styles.leadSecondary}>
                    {christmasActive
                      ? 'Disponibles por tiempo limitado. Pide la tuya antes del 5 de enero.'
                      : 'Descubre nuestro café empacado, encuentra tu próxima bebida favorita o lleva la experiencia de El Regio a tu próximo evento.'}
                  </p>

                  <div className={styles.actions}>
                    <a className={styles.primary} href={HERO_ACTIONS[0].href}>
                      {christmasActive ? 'Ver cajas navideñas' : HERO_ACTIONS[0].label}
                    </a>
                    <a className={styles.secondary} href={HERO_ACTIONS[1].href}>
                      {HERO_ACTIONS[1].label}
                    </a>
                    <a className={styles.outline} href={HERO_ACTIONS[2].href}>
                      {HERO_ACTIONS[2].label}
                    </a>
                  </div>

                  <ul className={styles.highlights} aria-label="Lo que ofrece la marca">
                    {(christmasActive
                      ? [
                          'Cajas navideñas 🎄',
                          'Café empacado 250g / 500g',
                          'Galletas navideñas KMuffis',
                          'Repostería artesanal',
                        ]
                      : HIGHLIGHTS
                    ).map((item) => (
                      <li key={item}>
                        <Pill tone="neutral">{item}</Pill>
                      </li>
                    ))}
                  </ul>

                  <p className={styles.notice}>
                    <span className={styles.dot} aria-hidden="true" />
                    {site.status}:{' '}
                    {christmasActive
                      ? 'Temporada navideña activa'
                      : 'catálogo y precios en preparación'}
                    .
                  </p>
                  <p className={styles.notice}>{AI_CONTENT_NOTICE}</p>
                </div>
              </div>

              {/* KMuffis kcard removed from Christmas layout to avoid blocking video controls */}
            </>
          ) : (
            <>
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

                  <div
                    className={styles.kcardPanel}
                    id={PANEL_ID}
                    data-open={channelsOpen || undefined}
                  >
                    <div className={styles.kcardPanelInner}>
                      <BrandChannels brandId="kmuffis" variant="panel" />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.ring} aria-hidden="true" />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
