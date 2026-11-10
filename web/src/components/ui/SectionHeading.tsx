import styles from './SectionHeading.module.css';

type SectionHeadingProps = {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
};

/**
 * Encabezado de sección accesible: el h2 recibe el id que referencia la sección.
 */
export default function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  tone = 'light',
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div
      className={`${styles.wrap} ${styles[tone]} ${align === 'center' ? styles.center : ''}`}
    >
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {intro ? <p className={styles.intro}>{intro}</p> : null}
    </div>
  );
}
