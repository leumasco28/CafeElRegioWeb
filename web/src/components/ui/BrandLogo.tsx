import { brandsById } from '../../content/brands.ts';
import type { Brand } from '../../content/brands.ts';
import styles from './BrandLogo.module.css';

type BrandLogoProps = {
  brandId: Brand['id'];
  className?: string;
  eager?: boolean;
  decorative?: boolean;
};

/**
 * Logo de marca con dimensiones explicitas para evitar saltos de layout.
 */
export default function BrandLogo({
  brandId,
  className = '',
  eager = false,
  decorative = false,
}: BrandLogoProps) {
  const brand = brandsById[brandId];
  if (!brand) return null;

  return (
    <img
      src={brand.logo.src}
      alt={decorative ? '' : brand.logo.alt}
      width={brand.logo.width}
      height={brand.logo.height}
      className={`${styles.logo} ${className}`.trim()}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      aria-hidden={decorative ? 'true' : undefined}
    />
  );
}
