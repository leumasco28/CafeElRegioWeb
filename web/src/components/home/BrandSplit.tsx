import { brands } from '../../content/brands.ts';
import type { Brand } from '../../content/brands.ts';
import BrandChannels from '../ui/BrandChannels.tsx';
import BrandLogo from '../ui/BrandLogo.tsx';
import Pill from '../ui/Pill.tsx';
import SectionHeading from '../ui/SectionHeading.tsx';
import styles from './BrandSplit.module.css';

export default function BrandSplit() {
  return (
    <section id="marcas" className={`section ${styles.section}`} aria-labelledby="marcas-title">
      <div className="container">
        <SectionHeading
          id="marcas-title"
          eyebrow="Dos marcas, una pausa"
          title="El café y la repostería, cada uno con su voz"
          intro="Café El Regio y KMuffis comparten mesa, pero conservan identidad propia. Una pone el café; la otra, lo dulce."
        />

        <div className={styles.grid}>
          {brands.map((brand: Brand) => {
            const isRegio = brand.id === 'regio';

            return (
              <article
                key={brand.id}
                className={`${styles.card} ${isRegio ? styles.regio : styles.kmuffis}`}
                data-brand={brand.id}
                aria-labelledby={`marca-${brand.id}`}
              >
                <div className={styles.logoWrap}>
                  <BrandLogo
                    brandId={brand.id}
                    className={isRegio ? styles.logoRegio : styles.logoKmuffis}
                  />
                </div>

                <p className={styles.kind}>{brand.kind}</p>
                <h3 id={`marca-${brand.id}`} className={styles.name}>
                  {brand.name}
                </h3>
                <p className={styles.text}>{brand.summary}</p>

                <ul className={styles.tags} aria-label={`Características de ${brand.name}`}>
                  {brand.highlights.map((highlight) => (
                    <li key={highlight}>
                      <Pill tone="neutral">{highlight}</Pill>
                    </li>
                  ))}
                </ul>

                <a className={styles.link} href={brand.href}>
                  Ver en la carta <span aria-hidden="true">→</span>
                </a>

                {brand.contact ? <BrandChannels brandId={brand.id} /> : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
