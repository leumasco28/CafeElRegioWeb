import styles from './Pill.module.css';
import type { ReactNode } from 'react';

type PillProps = {
  children: ReactNode;
  tone?: 'neutral' | 'accent' | 'muted' | 'dark';
  className?: string;
};

/**
 * Etiqueta corta. No transmite estado de compra.
 */
export default function Pill({ children, tone = 'neutral', className = '' }: PillProps) {
  return (
    <span className={`${styles.pill} ${styles[tone]} ${className}`.trim()}>{children}</span>
  );
}
