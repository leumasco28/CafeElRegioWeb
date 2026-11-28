# Café El Regio - Web Site

## Descripción
Sitio web de Café El Regio y KMuffis, café colombiano y repostería artesanal. Plataforma para pedidos, eventos y reservas por WhatsApp, con enfoque en la experiencia del cliente y cumplimiento legal.

## Requisitos
- Node.js 24.x >= 24.15 o 26+ con native DatabaseSync.limits
- npm o pnpm
- Acceso a un dispositivo móvil para pruebas en WhatsApp

## Instalación y ejecución
```bash
cd web
npm install
npm run dev
```
El sitio se ejecutará en `http://localhost:5173` (Vite).

## Características clave
- Formularios de Netlify: `terms-acceptance`, `unsubscribe`, `copyright-claim`
- Accesibilidad: navegación por teclado, foco en modales, etiquetas ARIA
- Versión navideña: 1-5 de diciembre con ornamentos y copos de nieve
- Diseño responsive y animaciones suaves
- Editor visual Puck (`@puckeditor/core`) en `/edit`; los datos publicados se guardan en `localStorage` (`puck-data`) y el home (`/`) los renderiza con `<Render>`.

## Requisitos legales (documentados en LEGAL_OPERATIONS.md)
- Revisión legal, DPAs y permisos de marcas
- Retención y prueba de baja de correos
- Gestión de consentimientos de marketing

## Formularios de contacto
- **Términos y condiciones**: aceptación obligatoria con registro de fecha y versión.
- **Privacidad**: registro de datos, derechos del usuario, consentimiento para marketing.
- **Reembolsos**: reglas para cancelaciones, productos defectuosos y devoluciones.
- **Baja de correos**: mecanismo independiente de la aceptación de términos.
- **Derechos de autor**: canal de reclamos para contenido protegido.

## Contacto
- WhatsApp: [+57 318 713 3439](https://wa.me/573187133439)
- Ciudad: [Ciudad], Colombia
- Redes: [Instagram](https://instagram.com/cafeelregio), [Facebook](https://facebook.com/cafeelregio)
- Email: contacto@cafeelregio.com