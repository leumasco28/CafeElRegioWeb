/**
 * Catalogo de muestra.
 *
 * IMPORTANTE:
 * - No hay precios confirmados en esta fase. `price` puede ser null.
 * - `priceStatus: 'por-confirmar'` evita que la UI invente valores.
 * - La pertenencia de cada producto a una marca debe validarse con el negocio
 *   antes de la Fase 2 (especialmente la repostería de KMuffis).
 */

export type Category = {
  id: string;
  brandId: string;
  label: string;
};

export type Product = {
  id: string;
  brandId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number | null;
  priceStatus: 'por-confirmar' | 'confirmado';
  available: boolean;
};

export const categories: Category[] = [
  { id: 'calientes', brandId: 'regio', label: 'Café caliente' },
  { id: 'frias', brandId: 'regio', label: 'Bebidas frías' },
  { id: 'metodos', brandId: 'regio', label: 'Métodos manuales' },
  { id: 'salados', brandId: 'regio', label: 'Para acompañar' },
  { id: 'reposteria', brandId: 'kmuffis', label: 'Repostería' },
  { id: 'empacado', brandId: 'regio', label: 'Café empacado' },
];

export type CategoriesById = Record<string, Category>;

export const categoriesById: CategoriesById = Object.fromEntries(
  categories.map((category) => [category.id, category])
);

export const catalogNote =
  'Muestra de la carta. Los precios, la disponibilidad y la asignación de marca están pendientes de confirmación.';

const product = (
  id: string,
  brandId: string,
  categoryId: string,
  name: string,
  description: string,
  price: number | null = null
): Product => ({
  id,
  brandId,
  categoryId,
  name,
  description,
  price,
  priceStatus: price === null ? 'por-confirmar' : 'confirmado',
  available: price !== null,
});

export const products: Product[] = [
  // Café El Regio
  product(
    'americano',
    'regio',
    'calientes',
    'Americano',
    'Café negro de la casa, preparado al momento.'
  ),
  product(
    'capuchino',
    'regio',
    'calientes',
    'Capuchino',
    'Espresso con leche vaporizada y espuma.'
  ),
  product('latte', 'regio', 'calientes', 'Latte', 'Espresso con más leche y textura suave.'),
  product('expreso', 'regio', 'calientes', 'Expreso', 'Shot concentrado de café.'),
  product('macchiato', 'regio', 'calientes', 'Macchiato', 'Espresso con un toque de leche.'),
  product('moca', 'regio', 'calientes', 'Moca', 'Espresso con chocolate y leche.'),

  product('frappe-regio', 'regio', 'frias', 'Frappé Regio', 'Café frío batido con hielo y crema.'),
  product('orange-coffee', 'regio', 'frias', 'Orange Coffee', 'Café frío con naranja.'),
  product('lime-coffee', 'regio', 'frias', 'Lime Coffee', 'Café frío con limón.'),
  product(
    'limonadas',
    'regio',
    'frias',
    'Limonadas de la casa',
    'Coco, cereza, hierbabuena o tradicional.'
  ),

  product('v60', 'regio', 'metodos', 'V60', 'Filtrado por goteo, preparado a mano.'),
  product('chemex', 'regio', 'metodos', 'Chemex', 'Filtrado limpio y aromático.'),
  product('aeropress', 'regio', 'metodos', 'Aeropress', 'Extracción por presión en poco tiempo.'),
  product('sifon', 'regio', 'metodos', 'Sifón', 'Preparación de laboratorio, servida al momento.'),

  product('sandwich', 'regio', 'salados', 'Sandwich', 'Pollo, Regio o mixto.'),
  product('dedito-queso', 'regio', 'salados', 'Dedito de queso', 'Horneado de queso.'),

  // KMuffis (selección por confirmar)
  product(
    'muffin-avena',
    'kmuffis',
    'reposteria',
    'Muffin de avena y banano',
    'Opción horneada con avena y banano.'
  ),
  product(
    'muffin-chocolate',
    'kmuffis',
    'reposteria',
    'Muffin de vainilla y chocolate',
    'Vainilla con chips y centro de chocolate.'
  ),
  product('brownie', 'kmuffis', 'reposteria', 'Brownie', 'Porción de chocolate, textura densa.'),
  product(
    'alfajor-tradicional',
    'kmuffis',
    'reposteria',
    'Alfajor tradicional',
    'Alfajor de la casa.'
  ),
  product(
    'alfajor-decorado',
    'kmuffis',
    'reposteria',
    'Alfajor decorado',
    'Cubierto de chocolate.'
  ),
  product(
    'porcion-torta',
    'kmuffis',
    'reposteria',
    'Porción de torta',
    'Amapola, red velvet, vainilla o veteada de chocolate.'
  ),
  product(
    'galleta-ny',
    'kmuffis',
    'reposteria',
    'Galleta estilo Nueva York',
    'Galleta de banano rellena de chocolate.'
  ),

  // Café empacado (precios confirmados por el cliente)
  product(
    'cafe-empacado-250-molido',
    'regio',
    'empacado',
    'Café empacado 250 g · Molido',
    'Café colombiano empacado, presentación de 250 g, molido.',
    25000
  ),
  product(
    'cafe-empacado-250-grano',
    'regio',
    'empacado',
    'Café empacado 250 g · En grano',
    'Café colombiano empacado, presentación de 250 g, en grano.',
    25000
  ),
  product(
    'cafe-empacado-500-molido',
    'regio',
    'empacado',
    'Café empacado 500 g · Molido',
    'Café colombiano empacado, presentación de 500 g, molido.',
    45000
  ),
  product(
    'cafe-empacado-500-grano',
    'regio',
    'empacado',
    'Café empacado 500 g · En grano',
    'Café colombiano empacado, presentación de 500 g, en grano.',
    45000
  ),
];
