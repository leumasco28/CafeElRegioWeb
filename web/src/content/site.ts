/**
 * Configuracion publica del sitio.
 * No contiene credenciales ni secretos.
 * Los pedidos permanecen deshabilitados durante la Fase 1.
 */

export type SocialProfile = {
  id: string;
  name: string;
  handle?: string;
  href: string;
};

export type Contact = {
  whatsappDisplay: string;
  whatsappNumber: string;
  social: SocialProfile[];
};

export type OrdersConfig = {
  enabled: boolean;
  channel: string;
  note: string;
};

export type SiteConfig = {
  name: string;
  city: string;
  tagline: string;
  description: string;
  contact: Contact;
  orders: OrdersConfig;
  status: string;
};

export const site: SiteConfig = {
  name: 'Café El Regio',
  city: 'Bucaramanga, Santander',
  tagline: 'Café colombiano · Repostería artesanal',
  description:
    'Conoce Café El Regio, una propuesta de café colombiano que combina preparaciones cuidadosas, bebidas para disfrutar y una personalidad que no pasa desapercibida. Descubre nuestro café empacado, encuentra tu próxima bebida favorita o lleva la experiencia de El Regio a tu próximo evento.',
  contact: {
    // Numero publico visible en el material de marca (poster Regio + KMuffis).
    whatsappDisplay: '301 515 0059',
    whatsappNumber: '573015150059',
    // Perfiles tomados de los QR de marca de Recursos/:
    // Instagram (QR-ElRegio-Instagram.jpeg) y TikTok (QR-ElRegio-Tiktok.jpeg).
    social: [
      {
        id: 'instagram',
        name: 'Instagram',
        handle: '@cafeelregiobucaramanga',
        href: 'https://www.instagram.com/cafeelregiobucaramanga',
      },
      {
        id: 'tiktok',
        name: 'TikTok',
        handle: '@elregiobucaramanga',
        href: 'https://www.tiktok.com/@elregiobucaramanga',
      },
    ],
  },
  orders: {
    // Interruptor de seguridad: la UI no habilita compra ni pago.
    enabled: false,
    channel: 'WhatsApp',
    note: 'Pedidos y pagos se habilitan en una fase posterior.',
  },
  status: 'Sitio en construcción',
};
