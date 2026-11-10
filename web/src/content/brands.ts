/**
 * Marcas del proyecto.
 * La identidad visual (colores) vive en src/styles/tokens.css con [data-brand].
 *
 * Logos aprobados:
 * - El Regio: emblema vaquero presente en los menus y posters de 2026.
 * - KMuffis: archivo indicado por el cliente (logo-kmuffis-old.jpeg).
 */

export type BrandLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Channel = {
  name: string;
  handle?: string;
  href: string;
};

export type BrandContact = {
  primary: Array<'instagram' | 'whatsapp' | 'facebook' | 'links'>;
  secondary: Array<'instagram' | 'whatsapp' | 'facebook' | 'links'>;
  channels: Record<string, Channel>;
};

export type Brand = {
  id: string;
  name: string;
  shortName: string;
  kind: string;
  claim: string;
  summary: string;
  description: string;
  highlights: string[];
  logo: BrandLogo;
  href: string;
  contact?: BrandContact;
};

export const brands: Brand[] = [
  {
    id: 'regio',
    name: 'Café El Regio',
    shortName: 'El Regio',
    kind: 'Café colombiano',
    claim: 'Café premium · Excelso',
    summary:
      'Café colombiano servido con carácter: bebidas calientes y frías, métodos manuales y una barra que se monta donde la necesites.',
    description:
      'Don Regio es la cara de la marca: sombrero, gafas y bigote. Detrás hay café colombiano, preparación artesanal y una idea simple: que la pausa se disfrute.',
    highlights: [
      'Café colombiano',
      'Bebidas calientes y frías',
      'Métodos manuales',
      'Eventos y ferias',
    ],
    logo: {
      src: '/assets/brand/regio-logo.webp',
      alt: 'Emblema de Café El Regio: Don Regio con sombrero, gafas y bigote, sobre el texto EL REGIO CAFE',
      width: 640,
      height: 640,
    },
    href: '#carta',
  },
  {
    id: 'kmuffis',
    name: 'KMuffis',
    shortName: 'KMuffis',
    kind: 'Repostería artesanal',
    claim: 'Pastelería artesanal',
    summary:
      'La marca aliada de repostería artesanal liderada por Kari: muffins, tortas, galletas y alfajores para acompañar el café.',
    description:
      'Repostería hecha a mano, con recetas de casa y presentación cuidada. KMuffis conserva su identidad propia dentro de la alianza.',
    highlights: [
      'Liderada por Kari',
      'Repostería artesanal',
      'Muffins y tortas',
      'Selección por confirmar',
    ],
    logo: {
      src: '/assets/brand/kmuffis-logo.jpeg',
      alt: 'Logo de KMuffis: letras moradas KMuffis con una rama de lavanda y la leyenda Pastelería Artesanal',
      width: 640,
      height: 640,
    },
    /**
     * Canales oficiales de KMuffis.
     * `primary` define el orden y el peso visual (Instagram y WhatsApp primero).
     * Los enlaces de Café El Regio viven en site.contact y no se mezclan aquí.
     */
    contact: {
      primary: ['instagram', 'whatsapp'],
      secondary: ['facebook', 'links'],
      channels: {
        instagram: {
          name: 'Instagram',
          handle: '@Kmuffis_pasteleria',
          href: 'https://www.instagram.com/Kmuffis_pasteleria',
        },
        whatsapp: {
          name: 'WhatsApp',
          handle: 'Pedidos y consultas',
          href: 'https://wa.link/wbcfz6',
        },
        facebook: {
          name: 'Facebook',
          href: 'https://www.facebook.com/share/19X1yCwZHW/?mibextid=wwXIfr',
        },
        links: {
          name: 'Todos los enlaces',
          href: 'https://www.atom.bio/kmuffis',
        },
      },
    },
    href: '#carta',
  },
];

export const brandsById = Object.fromEntries(brands.map((brand) => [brand.id, brand]));
