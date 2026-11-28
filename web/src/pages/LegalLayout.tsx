import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LEGAL_UPDATED_AT } from '../content/legal.ts';
import styles from './LegalLayout.module.css';

type LegalLayoutProps = {
  title: string;
  intro: string;
  children: ReactNode;
};

export default function LegalLayout({ title, intro, children }: LegalLayoutProps) {
  useEffect(() => {
    document.title = `${title} · Café El Regio`;
  }, [title]);

  return (
    <article className={styles.page}>
      <div className={`container ${styles.container}`}>
        <nav aria-label="Migas de pan" className={styles.breadcrumb}>
          <Link to="/">Inicio</Link> <span aria-hidden="true">/</span> <span>{title}</span>
        </nav>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Información legal y de confianza</p>
          <h1>{title}</h1>
          <p className={styles.intro}>{intro}</p>
          <p className={styles.updated}>Última actualización: {LEGAL_UPDATED_AT}.</p>
        </header>
        <div className={styles.content}>{children}</div>
      </div>
    </article>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
