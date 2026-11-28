import { useMemo } from 'react';
import styles from './Snowfall.module.css';

const FLAKE_SYMBOLS = ['❄', '❅', '❆', '✦', '✧'] as const;

export default function Snowfall() {
  const flakes = useMemo(
    () =>
      Array.from({ length: 56 }, (_, index) => {
        const size = 0.55 + (index % 6) * 0.18;
        return {
          id: index,
          symbol: FLAKE_SYMBOLS[index % FLAKE_SYMBOLS.length],
          left: `${(index * 17 + 7) % 100}%`,
          delay: `${(index * 0.63) % 11}s`,
          duration: `${9 + (index % 7) * 1.35}s`,
          size: `${size}rem`,
          opacity: 0.28 + (index % 5) * 0.11,
          drift: `${-28 + (index % 7) * 8}px`,
          blur: index % 4 === 0 ? '0.5px' : '0px',
        };
      }),
    []
  );

  return (
    <div className={styles.overlay} aria-hidden="true">
      {flakes.map((flake) => (
        <span
          key={flake.id}
          className={styles.flake}
          style={{
            left: flake.left,
            animationDelay: flake.delay,
            animationDuration: flake.duration,
            fontSize: flake.size,
            opacity: flake.opacity,
            ['--snow-drift' as string]: flake.drift,
            filter: `blur(${flake.blur})`,
          }}
        >
          {flake.symbol}
        </span>
      ))}
    </div>
  );
}
