export const LEGAL_VERSION = '2026-11-27';
export const LEGAL_UPDATED_AT = '27 de noviembre de 2026';
export const COOKIE_PREFERENCES_KEY = 'cafe_el_regio_cookie_preferences';

export const AI_CONTENT_NOTICE =
  'Algunos textos, imágenes o videos pueden incluir contenido creado o editado con inteligencia artificial.';

export const PROVIDERS = [
  {
    name: 'Netlify',
    purpose: 'Alojamiento del sitio y recepción de formularios de aceptación, baja y reclamos.',
    data: 'Datos que envías en cada formulario, dirección IP y registros técnicos de entrega.',
    trigger: 'Al cargar el sitio y al enviar un formulario.',
  },
  {
    name: 'Meta / WhatsApp',
    purpose: 'Coordinación de pedidos, eventos y consultas que decides enviar.',
    data: 'El contenido del mensaje y los datos de contacto que incluyas.',
    trigger: 'Solo cuando abres WhatsApp y decides enviar el mensaje.',
  },
  {
    name: 'Instagram, TikTok, Facebook, wa.link y atom.bio',
    purpose: 'Enlaces externos a perfiles y canales de las marcas.',
    data: 'Este sitio no les envía datos; el destino puede aplicar sus propias políticas al abrirlo.',
    trigger: 'Solo cuando haces clic en el enlace correspondiente.',
  },
] as const;

export const CONTACT = {
  whatsappDisplay: '+57 318 713 3439',
  whatsappHref:
    'https://wa.me/573187133439?text=Hola%20Caf%C3%A9%20El%20Regio%2C%20quiero%20hacer%20una%20solicitud%20sobre%20privacidad%20o%20contenido%20del%20sitio.',
  location: 'Bucaramanga, Santander, Colombia',
} as const;
