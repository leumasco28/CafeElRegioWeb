import { useState } from 'react';
import { brandsById } from '../../content/brands.ts';
import type { Brand } from '../../content/brands.ts';
import {
  catalogNote,
  categoriesById,
  type Category,
  products,
  type Product,
} from '../../content/catalog.ts';
import { useCart } from '../../context/CartContext.tsx';
import SectionHeading from '../ui/SectionHeading.tsx';
import styles from './CatalogPreview.module.css';

type FilterOption = {
  id: string;
  label: string;
};

const BRAND_FILTERS: FilterOption[] = [
  { id: 'all', label: 'Toda la carta' },
  { id: 'regio', label: 'Café El Regio' },
  { id: 'kmuffis', label: 'KMuffis' },
];

const CATEGORY_FILTERS: FilterOption[] = [
  { id: 'all', label: 'Todas las categorías' },
  { id: 'calientes', label: 'Café caliente' },
  { id: 'frias', label: 'Bebidas frías' },
  { id: 'metodos', label: 'Métodos manuales' },
  { id: 'salados', label: 'Para acompañar' },
  { id: 'empacado', label: 'Café empacado' },
  { id: 'reposteria', label: 'Repostería' },
];

const priceFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

type ProductCardProps = {
  item: Product;
};

function ProductCard({ item }: ProductCardProps) {
  const category: Category | undefined = categoriesById[item.categoryId];
  const brand: Brand | undefined = brandsById[item.brandId];
  const { addItem } = useCart();
  const isFeatured = item.featured === true;

  return (
    <li className={`${styles.card} ${isFeatured ? styles.featured : ''}`} data-brand={item.brandId}>
      {isFeatured && (
        <span className={styles.featuredBadge} aria-label="Destacado">
          {item.featuredLabel || 'Destacado'}
        </span>
      )}
      <div className={styles.cardHead}>
        <span className={styles.category}>{category?.label}</span>
        <span className={styles.brand}>{brand?.shortName}</span>
      </div>

      <h3 className={styles.name}>{item.name}</h3>
      <p className={styles.description}>{item.description}</p>

      <p className={styles.price}>
        <span className={styles.priceDot} aria-hidden="true" />
        {typeof item.price === 'number'
          ? priceFormatter.format(item.price)
          : 'Precio por confirmar'}
      </p>

      <button
        type="button"
        className={styles.addButton}
        onClick={() => addItem(item.id)}
        aria-label={`Agregar ${item.name} al carrito`}
      >
        Agregar
      </button>
    </li>
  );
}

export default function CatalogPreview() {
  const [brandFilter, setBrandFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const { itemCount } = useCart();

  const visibleProducts = products.filter((item: Product) => {
    const matchBrand = brandFilter === 'all' || item.brandId === brandFilter;
    const matchCategory = categoryFilter === 'all' || item.categoryId === categoryFilter;
    return matchBrand && matchCategory;
  });

  return (
    <section id="carta" className={`section ${styles.section}`} aria-labelledby="carta-title">
      <div className="container">
        <div className={styles.head}>
          <SectionHeading
            id="carta-title"
            eyebrow="La carta"
            title="Un adelanto de lo que se sirve"
            intro="Bebidas de café, especialidades frías, métodos manuales y repostería artesanal. Esta es una muestra: la carta definitiva se está organizando."
          />
          <p className={styles.note}>{catalogNote}</p>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.filters} role="group" aria-label="Filtrar la carta por marca">
            {BRAND_FILTERS.map((option) => (
              <button
                key={option.id}
                type="button"
                className={brandFilter === option.id ? styles.filterActive : styles.filter}
                aria-pressed={brandFilter === option.id}
                onClick={() => setBrandFilter(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className={styles.filters} role="group" aria-label="Filtrar la carta por categoría">
            {CATEGORY_FILTERS.map((option) => (
              <button
                key={option.id}
                type="button"
                className={categoryFilter === option.id ? styles.filterActive : styles.filter}
                aria-pressed={categoryFilter === option.id}
                onClick={() => setCategoryFilter(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>

          <p className={styles.counter}>
            {visibleProducts.length} productos de muestra
            {itemCount > 0 ? ` · ${itemCount} en el carrito` : ''}
          </p>
        </div>

        <p className="visually-hidden" aria-live="polite">
          {visibleProducts.length} productos en la selección actual.
        </p>

        <ul className={styles.grid}>
          {visibleProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
}
