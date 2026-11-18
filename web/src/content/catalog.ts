/**
 * Carta de Café El Regio + KMuffis.
 *
 * IMPORTANTE:
 * - `price` puede ser null cuando el negocio aún no confirma el valor.
 * - `priceStatus: 'por-confirmar'` evita que la UI invente precios.
 * - `available` se deriva del precio: sin precio no se puede pedir.
 * - La pertenencia de cada producto a una marca debe validarse con el negocio
 *   (especialmente la repostería de KMuffis).
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
  'Carta con precios confirmados por el negocio. Los productos sin precio están pendientes de confirmación.';

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
    'Café negro de la casa, preparado al momento.',
    5000
  ),
  product(
    'capuchino',
    'regio',
    'calientes',
    'Capuchino',
    'Espresso con leche vaporizada y espuma.',
    7000
  ),
  product('latte', 'regio', 'calientes', 'Latte', 'Espresso con más leche y textura suave.', 6000),
  product('mocca', 'regio', 'calientes', 'Mocca', 'Espresso con chocolate y leche.', 8000),

  product(
    'frappe-regio',
    'regio',
    'frias',
    'Frappé Regio',
    'Café frío batido con hielo y crema.',
    12000
  ),
  product('orange-coffee', 'regio', 'frias', 'Orange Coffee', 'Café frío con naranja.', 10000),
  product('lime-coffee', 'regio', 'frias', 'Lime Coffee', 'Café frío con limón.', 10000),
  product(
    'limonadas',
    'regio',
    'frias',
    'Limonadas de la casa',
    'Coco, cereza, hierbabuena o tradicional.',
    8000
  ),

  product('v60', 'regio', 'metodos', 'V60', 'Filtrado por goteo, preparado a mano.'),
  product('chemex', 'regio', 'metodos', 'Chemex', 'Filtrado limpio y aromático.'),
  product('aeropress', 'regio', 'metodos', 'Aeropress', 'Extracción por presión en poco tiempo.'),
  product('sifon', 'regio', 'metodos', 'Sifón', 'Preparación de laboratorio, servida al momento.'),

  product('sandwich', 'regio', 'salados', 'Sandwich Regio', 'Pollo, Regio o mixto.'),
  product('dedito-queso', 'regio', 'salados', 'Deditos de queso', 'Horneado de queso.', 4000),

  // KMuffis
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
  product(
    'muffin-vino',
    'kmuffis',
    'reposteria',
    'Muffin de vino',
    'Muffin individual de vino.',
    9000
  ),
  product(
    'torta-vino',
    'kmuffis',
    'reposteria',
    'Torta individual de vino',
    'Porción individual de torta de vino.',
    9000
  ),
  product(
    'brownie',
    'kmuffis',
    'reposteria',
    'Brownie',
    'Porción de chocolate, textura densa.',
    6000
  ),
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
    'Galleta grande 200 g',
    'Galleta grande de 200 g con centro de chocolate.',
    8000
  ),
  product(
    'galletas-navidenas',
    'kmuffis',
    'reposteria',
    'Galletas navideñas · 3 unidades',
    'Tres galletas en empaque individual con motivo navideño.',
    7000
  ),
  product(
    'mini-alfajores-5',
    'kmuffis',
    'reposteria',
    'Mini alfajores · 5 unidades',
    'Empaque con cinco mini alfajores.',
    7000
  ),
  product(
    'empaque-mixto',
    'kmuffis',
    'reposteria',
    'Empaque mixto',
    'Dos alfajores, tres galletas navideñas y una galleta básica de avena.',
    9000
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
