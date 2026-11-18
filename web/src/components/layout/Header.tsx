import { useEffect, useState } from 'react';
import { site } from '../../content/site.ts';
import { useCart } from '../../context/CartContext.tsx';
import BrandLogo from '../ui/BrandLogo.tsx';
import styles from './Header.module.css';

type NavLink = {
  href: string;
  label: string;
};

const NAV_LINKS: NavLink[] = [
  { href: '#marcas', label: 'Marcas' },
  { href: '#carta', label: 'Carta' },
  { href: '#eventos', label: 'Eventos' },
  { href: '#pedidos', label: 'Pedidos' },
  { href: '#contacto', label: 'Contacto' },
];

type HeaderProps = {
  onToggleCart: () => void;
};

export default function Header({ onToggleCart }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

  // Cierra el menú móvil con Escape y al volver al escritorio.
  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 721px)');
    const onDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onDesktop);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onDesktop);
    };
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#inicio" className={styles.brand} aria-label={`${site.name}, inicio`}>
          <span className={styles.logoBadge}>
            <BrandLogo brandId="regio" eager decorative className={styles.logo} />
          </span>
          <span className={styles.brandText}>
            <span className={styles.brandName}>{site.name}</span>
            <span className={styles.brandTag}>Café colombiano</span>
          </span>
        </a>

        <button
          type="button"
          className={styles.cartButton}
          aria-label={itemCount > 0 ? `Carrito (${itemCount} items)` : 'Carrito'}
          aria-haspopup="dialog"
          onClick={onToggleCart}
        >
          <span className={styles.cartIcon} aria-hidden="true">
            🛒
          </span>
          {itemCount > 0 && (
            <span className={styles.cartBadge} aria-hidden="true">
              {itemCount}
            </span>
          )}
        </button>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls="menu-principal"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={styles.menuIcon} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav
          id="menu-principal"
          className={`${styles.navWrap} ${menuOpen ? styles.navOpen : ''}`}
          aria-label="Navegación principal"
        >
          <ul className={styles.nav}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
