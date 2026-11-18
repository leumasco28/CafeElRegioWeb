# Café El Regio · KMuffis — Tienda web

Andamiaje de la tienda web de **Café El Regio** y **KMuffis**, construido con React + Vite + TypeScript.
Esta es la **Fase 2**: catálogo con los precios confirmados, carrito local y pedidos por WhatsApp.

> El sitio sigue **en construcción**: varios precios están pendientes de confirmación, pero el
> carrito y el envío del pedido por WhatsApp ya funcionan. La web no procesa pagos.

---

## Requisitos

- Node.js 20.19 o superior (probado con Node 24).
- npm 10 o superior.

## Cómo iniciarlo en local

```bash
# 1. Instalar dependencias (solo la primera vez)
npm install

# 2. Servidor de desarrollo con recarga automática
npm run dev
```

Abre la dirección que imprime la consola (por defecto `http://localhost:5173`).

### Compilar y previsualizar la versión de producción

```bash
npm run build     # genera la carpeta dist/
npm run preview   # sirve dist/ en local para revisarlo
```

`dist/`, `node_modules/` y `Recursos/` están excluidos de Git; no se versionan.

---

## Repositorio

El proyecto está versionado con Git en la raíz `CafeElRegioWeb/`.
La carpeta `Recursos/` (imágenes, videos, PDF, documentos legales y datos sensibles)
**no se rastrea** ni se publica: permanece como solo lectura fuera del repositorio.

## Migración a TypeScript

Todo el código fuente de `web/src/` está en TypeScript (`.tsx` para componentes React,
`.ts` para datos y utilidades). Se incluye:

- `tsconfig.json` con modo `strict` habilitado.
- Declaraciones de tipos para CSS Modules (`src/types/css-modules.d.ts`).
- `@types/react` y `@types/react-dom` como dependencias de desarrollo.

Para verificar los tipos sin generar salida:

```bash
npx tsc --noEmit
```

---

## Calidad de código (ESLint + Prettier + Husky)

Se agregó tooling de linting, formato y hooks de pre-commit:

- **ESLint** (`eslint.config.js`, flat config): reglas recomendadas de TypeScript, React Hooks y React Refresh (Fast Refresh).
- **Prettier** (`.prettierrc`): `printWidth: 100`, comillas simples, 2 espacios, punto y coma.
- **Husky** + **lint-staged**: pre-commit que ejecuta ESLint `--fix` y Prettier `--write` sobre los archivos staged antes de cada commit.

Comandos disponibles (ejecutar desde `web/`):

```bash
npm run lint          # revisa código con ESLint
npm run lint:fix      # autocorrección con ESLint
npm run format        # aplica formato Prettier
npm run format:check  # verifica formato sin modificar archivos
```

Para verificar todo junto antes de commitear:

```bash
npx tsc --noEmit      # tipos (TypeScript)
npm run lint          # lint (ESLint)
npm run format:check  # formato (Prettier)
npm run build         # build de producción (Vite)
```

---

## Pruebas automatizadas (Vitest + Testing Library)

Vitest con entorno `jsdom`, `@testing-library/react` y `@testing-library/jest-dom` (vía matchers de `vitest`). Cinco suites cubren las piezas críticas del sitio:

- **`Header.test.tsx`**: renderiza el nombre del sitio y los 5 enlaces de navegación; abre y cierra el menú móvil con el botón de hamburguesa (y lo cierra al seleccionar un enlace); muestra el botón del carrito.
- **`CatalogPreview.test.tsx`**: renderiza el contador de productos de muestra, muestra "Precio por confirmar" en productos sin precio y filtra la carta por marca.
- **`EventModal.test.tsx`**: valida campos obligatorios (nombre ≥ 2, teléfono ≥ 7 dígitos, email válido, tipo de evento, casilla de privacidad), verifica que no se envíe con errores y que el envío válido llame a `onSubmit` sin incluir el campo `privacy`; y verifica que el botón Cerrar llame a `onClose`.
- **`CartContext.test.tsx`**: agrega productos y acumula cantidades, calcula el total con precios del catálogo, cambia cantidades, elimina ítems, vacía el carrito, persiste en `localStorage` (`cafe_el_regio_cart`) y descarta datos corruptos o entradas inválidas guardadas.
- **`CartDrawer.test.tsx`**: estado cerrado y estado vacío, listado de ítems con total, controles de cantidad y borrado, cierre del cajón y generación del deep-link `wa.me/573015150059?text=...` con el pedido (que además vacía el carrito).

Comandos (ejecutar desde `web/`):

```bash
npm run test       # modo vigilante de Vitest
npm run test:run   # ejecutar pruebas una sola vez (CI)
```

Para verificar todo junto antes de commitear:

```bash
npx tsc --noEmit      # tipos (TypeScript)
npm run lint          # lint (ESLint)
npm run format:check  # formato (Prettier)
npm run test:run      # pruebas (Vitest)
npm run build         # build de producción (Vite)
```

---

## Estructura

```
web/
├─ public/
│  ├─ favicon.ico                # 16, 32 y 48 px
│  ├─ favicon-16x16.png
│  ├─ favicon-32x32.png
│  ├─ apple-touch-icon.png       # 180 px
│  ├─ icon-192.png
│  ├─ icon-512.png
│  ├─ site.webmanifest
│  └─ assets/brand/
│     ├─ regio-logo.webp         # emblema de Café El Regio
│     └─ kmuffis-logo.jpeg       # logo aprobado de KMuffis
├─ src/
│  ├─ components/
│  │  ├─ layout/                 # Header (con menú móvil) y Footer
│  │  ├─ ui/                     # BrandLogo, Pill, SectionHeading, BrandChannels, ChannelIcon, EventModal, CartDrawer
│  │  └─ home/                   # Hero, BrandSplit, CatalogPreview, Events, HowToOrder
│  ├─ content/                   # Datos separados de la interfaz
│  │  ├─ site.ts                 # Nombre, ciudad, contacto, estado de pedidos
│  │  ├─ brands.ts               # Metadatos y logos de cada marca
│  │  ├─ catalog.ts              # Categorías y productos de muestra
│  │  ├─ pages.json              # Datos de páginas para el editor visual (JSON local)
│  │  ├─ eventTypes.ts           # Tipos de evento compartidos (Events y EventModal)
│  ├─ context/
│  │  └─ CartContext.tsx         # Carrito (React Context + localStorage)
│  ├─ editor/                    # Editor visual propio (Puck a medida con JSON local)
│  │  ├─ CraftEditor.tsx         # Wrapper de Craft.js: Editor, Frame, Element, useNode (drag-and-drop)
│  │  ├─ canvas.tsx              # Lienzo, carga/guardado, auto-guardar, botón Agregar elemento
│  │  ├─ panels/                 # ContentPanel, StylePanel, AdvancedPanel
│  │  └─ store/                  # pageStore (Zustand + undo/redo), history (pila de estados)
│  ├─ lib/
│  │  ├─ order.ts                # Pedido: mensaje y deep-link de WhatsApp (activo)
│  │  └─ pagesClient.ts          # Cliente local: loadPage, savePage, listPages (JSON + localStorage)
│  ├─ renderer/                  # Renderizador ligero (solo lee JSON y dibuja)
│  │  ├─ PageRenderer.tsx        # Renderizador recursivo con selección de nodos
│  │  ├─ resolveComponent.tsx    # Mapea tipo JSON → componente React
│  │  ├─ components/             # Section, Row, Column, Text, Image, Button
│  │  └─ blocks/                 # (pendiente) Hero, Catalog, EventForm, Navbar
│  ├─ styles/
│  │  ├─ tokens.css              # Colores, tipografía, espacios, bordes, tamaños
│  │  └─ base.css                # Reset, contenedor, accesibilidad
│  ├─ types/
│  │  ├─ css-modules.d.ts        # Declaraciones de tipos para CSS Modules
│  │  └─ page.ts                 # PageDocument, PageNode, PageTheme, NodeStyles, Breakpoint
│  ├─ test/                      # Pruebas automatizadas (Vitest + Testing Library)
│  │  ├─ setup.ts                # matchMedia stub, cleanup y jest-dom matchers
│  │  ├─ Header.test.tsx
│  │  ├─ CatalogPreview.test.tsx
│  │  ├─ EventModal.test.tsx
│  │  ├─ CartContext.test.tsx
│  │  └─ CartDrawer.test.tsx
│  ├─ App.tsx
│  └─ main.tsx
├─ index.html
├─ vite.config.js
├─ tsconfig.json
└─ package.json
```

### Principios de la estructura

- **Contenido separado de la presentación.** Los productos, precios y datos de contacto
  viven en `src/content/`. Los componentes solo reciben y muestran esos datos.
- **Tokens de diseño centralizados.** Todo color, tamaño y espacio sale de
  `src/styles/tokens.css`. La identidad de cada marca se aplica con `data-brand="regio"` o
  `data-brand="kmuffis"`, que reasigna variables (`--brand-*`) sin duplicar componentes.
- **CSS Modules.** Cada componente tiene su propio `.module.css`; no hay frameworks de UI.
- **Sin servicios externos.** No hay fuentes remotas, analítica, CDN ni llamadas de red.

---

## Identidad y logos

| Marca         | Archivo en el sitio                     | Origen en `Recursos/`              | Nota                                                                                                                                                                  |
| ------------- | --------------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Café El Regio | `public/assets/brand/regio-logo.webp`   | `Logo para registro.png`           | Emblema aprobado. Se redujo de 1254 × 1254 px a 640 × 640 px y se convirtió a WebP (calidad 95) para aligerar la carga: de 1,49 MB a 85 KB. El dibujo no se modificó. |
| KMuffis       | `public/assets/brand/kmuffis-logo.jpeg` | `Regio-kmfs/logo-kmuffis-old.jpeg` | Archivo indicado por el cliente como logo aprobado (640 × 640).                                                                                                       |

Los logos tienen fondo blanco. En la interfaz se colocan sobre un fondo crema con
`mix-blend-mode: multiply`, de modo que el blanco se funde con el fondo y el emblema se ve
limpio sin recortes.

El resto de `Recursos/` (menús, fotos, modelos 3D, documentos legales, registros) **no** se
copia al proyecto. La carpeta es de solo lectura y queda fuera de este repositorio.

### Favicon

El icono del sitio usa el rostro de Don Regio que el cliente entregó como
`Recursos/favicon2.jpg` (500 × 500). No se redibujó nada: se escaló el original y se
generaron los formatos necesarios.

| Archivo                       | Tamaño         | Uso                              |
| ----------------------------- | -------------- | -------------------------------- |
| `public/favicon.ico`          | 16, 32 y 48 px | Pestaña del navegador (respaldo) |
| `public/favicon-16x16.png`    | 16 px          | Pestañas de baja densidad        |
| `public/favicon-32x32.png`    | 32 px          | Pestañas estándares              |
| `public/apple-touch-icon.png` | 180 px         | iOS / iPadOS                     |
| `public/icon-192.png`         | 192 px         | Android / manifiesto             |
| `public/icon-512.png`         | 512 px         | Android / manifiesto             |

El fondo es blanco (el del archivo original), de modo que el dibujo conserva sus claros
internos. El manifiesto `site.webmanifest` solo declara los iconos y los colores de marca.

---

## Redes de Café El Regio

Los perfiles viven en `src/content/site.ts` → `contact.social` y se muestran en la columna
**Contacto** del pie de página:

| Red       | Perfil                    | Origen                               |
| --------- | ------------------------- | ------------------------------------ |
| Instagram | `@cafeelregiobucaramanga` | `Recursos/QR-ElRegio-Instagram.jpeg` |
| TikTok    | `@elregiobucaramanga`     | `Recursos/QR-ElRegio-Tiktok.jpeg`    |

Se abren en una pestaña nueva. Los canales de KMuffis siguen separados en
`brands.js` (ver abajo).

---

## Canales de KMuffis

Los enlaces oficiales de KMuffis viven en `src/content/brands.ts`, dentro de
`brandsById.kmuffis.contact`:

| Canal             | Enlace                                                       | Peso       |
| ----------------- | ------------------------------------------------------------ | ---------- |
| Instagram         | `https://www.instagram.com/Kmuffis_pasteleria`               | Principal  |
| WhatsApp          | `https://wa.link/wbcfz6`                                     | Principal  |
| Facebook          | `https://www.facebook.com/share/19X1yCwZHW/?mibextid=wwXIfr` | Secundario |
| Página de enlaces | `https://www.atom.bio/kmuffis`                               | Secundario |

`primary` y `secondary` definen el orden y el peso visual; `channels` guarda nombre,
usuario y URL. Los enlaces de Café El Regio siguen en `site.contact` y no se mezclan con
estos.

Se muestran en tres lugares, con el componente compartido `ui/BrandChannels.tsx`:

- **Portada**: botón _Canales oficiales_ en la parte inferior de la tarjeta de KMuffis.
  Con ratón, el panel aparece al pasar el cursor; en táctil, con un toque. Cierra con
  `Escape`, con un toque fuera o al alejar el cursor.
- **Sección de marcas**: bloque discreto dentro de la tarjeta de KMuffis, con Instagram y
  WhatsApp como accesos principales y Facebook / todos los enlaces como texto secundario.
- **Pie de página**: columna propia de KMuffis, separada de la columna de contacto de
  Café El Regio.

Todos los enlaces abren en una pestaña nueva (`target="_blank"` + `rel="noopener noreferrer"`)
y el texto "Todos los enlaces" apunta al agregador `atom.bio`.

---

## Estado de los datos

Precios confirmados por el negocio el **2026-11-18**:

| Producto             | Precio  |
| -------------------- | ------- |
| Americano            | $5.000  |
| Capuchino            | $7.000  |
| Latte                | $6.000  |
| Mocca                | $8.000  |
| Frappé Regio         | $12.000 |
| Orange Coffee        | $10.000 |
| Lime Coffee          | $10.000 |
| Limonadas de la casa | $8.000  |
| Deditos de queso     | $4.000  |
| Brownie              | $6.000  |
| Muffin de vino       | $9.000  |
| Torta individual     | $9.000  |
| Galleta grande 200 g | $8.000  |
| Galletas navideñas 3 | $7.000  |
| Mini alfajores 5     | $7.000  |
| Empaque mixto        | $9.000  |
| Café empacado 250 g  | $25.000 |
| Café empacado 500 g  | $45.000 |

Cambios de carta aplicados:

- **Expreso** y **Macchiato** se retiraron: no se ofrecerán en la página.
- **Moca** pasa a llamarse **Mocca**.
- **Sandwich** pasa a llamarse **Sandwich Regio**.
- **Galleta estilo Nueva York** pasa a **Galleta grande 200 g** (centro de chocolate).
- Se agregaron a la repostería de KMuffis: muffin de vino, torta individual de vino,
  galletas navideñas (3), mini alfajores (5) y empaque mixto.

Lo que falta confirmar antes de publicar la carta definitiva:

- **Métodos manuales**: V60, Chemex, Aeropress y sifón.
- **Sandwich Regio** y el resto de la repostería de KMuffis (muffins de avena y de
  vainilla/chocolate, alfajores tradicional y decorado, porción de torta).
- **Qué repostería pertenece a KMuffis** y cuál se vende solo en El Regio.
- **Eventos**: paquetes, cobertura, número mínimo de personas y disponibilidad.
- **Domicilios**: zonas, horarios y costo.
- **Datos legales**: razón social, NIT y avisos requeridos.

Mientras no estén confirmados, la interfaz muestra _"Precio por confirmar"_ y el producto no
se puede agregar al carrito. **No se deben inventar precios.**

---

## Pedidos y pagos

Los pedidos por WhatsApp están activos:

- `src/content/site.ts` → `orders.enabled: true`
- `src/lib/order.ts` → `PEDIDOS_HABILITADOS` deriva de esa bandera.

El carrito (`src/context/CartContext.tsx`) guarda producto y cantidad en `localStorage`
(clave `cafe_el_regio_cart`), sin datos personales ni de pago. El botón **Enviar pedido por
WhatsApp** arma el mensaje con `buildOrderMessage()` y abre
`https://wa.me/573015150059?text=...` mediante `buildWhatsAppUrl()`. El formulario de eventos
usa el mismo mecanismo con los datos de la solicitud.

La web **no cobra ni procesa pagos**: el pago se acuerda en el chat. Si la bandera vuelve a
`false`, ambas funciones devuelven `null` y no se muestra ningún enlace.

---

## Accesibilidad y rendimiento

- Enlace "Saltar al contenido", jerarquía de encabezados y textos alternativos.
- Navegación por teclado con foco visible; el menú móvil cierra con `Escape`.
- El panel de canales de KMuffis se abre con hover (ratón) o tap, se recorre con `Tab` y
  cierra con `Escape` devolviendo el foco al botón.
- Objetivos táctiles de 44–48 px en el menú móvil y de 40–44 px en los enlaces de canales.
- Respeta `prefers-reduced-motion`.
- Imágenes con `width`/`height` para evitar saltos de layout y `loading="lazy"` salvo en la
  portada.
- Sin dependencias de UI: React, ReactDOM, Vite y el plugin de React.

---

## Editor visual propio (Puck a medida) con JSON local + localStorage

En lugar de usar un CMS de terceros ni servicios en la nube, se construyó un **editor visual propio** sobre React + TypeScript que permite maquetar páginas, cambiar textos e imágenes y publicar sin tocar código.

### Motor de edición

- **Craft.js**: arrastre y soltar, anidamiento de componentes y selección sobre un árbol de nodos JSON.
- **Zustand**: estado del árbol, historial undo/redo y paneles de propiedades (Contenido / Estilo / Avanzado).
- **Tailwind CSS**: controles visuales de estilo (colores, padding, márgenes, flex/grid).

### Almacenamiento: JSON local + localStorage

Se eligió **JSON local + localStorage** porque no requiere servidor, no tiene dependencias externas y funciona inmediatamente. El editor lee `src/content/pages.json` y persiste cambios en `localStorage` del navegador. En producción con backend, `pagesClient.ts` se reemplaza por un fetch a la API sin tocar el editor.

Estructura del JSON:

- **pages**: arreglo con `id`, `slug` (único), `title`, `status` (`draft` / `published`), `theme` (JSON), `createdAt`, `updatedAt`, `root` (árbol de nodos).
- **Nodos**: `id`, `type`, `parentId` (opcional), `props` (JSON), `styles` (JSON por breakpoint), `order` (número).

### Estructura de carpetas (en src/)

```
src/
  editor/            # Editor visual (solo en /admin)
    canvas.tsx       # Lienzo con Craft.js, selección, edición inline
    panels/          # Contenido, Estilo, Avanzado
    store/           # Zustand: árbol JSON, historial undo/redo
  renderer/          # Renderizador ligero (solo lee JSON y dibuja)
    PageRenderer.tsx
    components/      # Section, Row, Column, Text, Image, Button
    blocks/          # Hero, Catalog, EventForm, Navbar
    resolveComponent.tsx  # Mapea tipo JSON -> componente React
  types/             # page.ts, component.ts, breakpoint.ts, theme.ts
  lib/               # pagesClient.ts
```

El `renderer/` no depende de `editor/`: la página publicada solo importa el renderizador y el JSON, sin paneles ni controles de arrastre.

---

## Estado de la Fase 2

Completado:

1. **Catálogo con precios confirmados**: americano, capuchino, latte, mocca, frappé Regio,
   orange coffee, lime coffee, limonadas, deditos de queso y café empacado (250 g y 500 g).
   Expreso y macchiato se retiraron por decisión del negocio.
2. **Repostería de KMuffis con precio**: brownie $6.000, muffin de vino $9.000, torta
   individual de vino $9.000, galleta grande 200 g $8.000, galletas navideñas x3 $7.000,
   mini alfajores x5 $7.000 y empaque mixto $9.000.
3. **Carrito persistente**: contexto + `localStorage`, con cantidades, total y vaciado.
4. **Pedidos por WhatsApp**: activados desde el carrito y desde el formulario de eventos.
5. **Filtros por marca y categoría** en la sección de la carta.

Pendiente:

- Confirmar precios de V60, Chemex, Aeropress, sifón, Sandwich Regio y la repostería
  restante (muffins de avena y de vainilla/chocolate, alfajores, porción de torta), que
  hoy muestran _"Precio por confirmar"_.
- Confirmar qué productos de repostería son de KMuffis y cuáles de El Regio.
- Imágenes de producto y páginas por producto cuando crezca la carta.

---

## Notas de mantenimiento

- No agregar documentos legales, datos personales, credenciales ni secretos al repositorio.
- No subir este proyecto a GitHub ni publicarlo sin autorización.
- Para cambiar textos generales, editar `src/content/site.ts`; para la identidad de cada
  marca, `src/content/brands.ts` y `tokens.css`.

## Routing y editor visual

El frontend usa `react-router-dom` con dos rutas definidas en `src/App.tsx`:

- **`/`** — sitio estático público (Hero, BrandSplit, CatalogPreview, Events, HowToOrder).
- **`/editor/:slug`** — editor visual propio (Canvas con Craft.js + drag-and-drop) que carga y guarda páginas desde JSON local. Ejemplo: `http://localhost:5173/editor/inicio`.

Para entrar al editor de una página específica, navega a `/editor/<slug>` (por ejemplo `/editor/inicio`).
