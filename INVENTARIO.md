# INVENTARIO DE RECURSOS — Café El Regio / KMuffis

**Borrador v0.1 — 2026-10-25.** Estado: solo inspección. **No se modificó, movió ni eliminó ningún archivo de `Recursos`.**

Fuente escaneada: `F:\mi seguridad\Pictures\cafe\CafeElRegioWeb\Recursos` (~418 archivos, ~1,17 GB, incluidas subcarpetas).
Carpeta de destino de la web: `F:\mi seguridad\Pictures\cafe\CafeElRegioWeb\web` (existe, vacía).

> ⚠️ Regla vigente: `Recursos/` es solo lectura (copias de originales). Este documento es un inventario de trabajo, no una fuente de verdad.

---

## 1. Resumen general

| Tipo                              | Cantidad aprox.             | Observaciones                                                               |
| --------------------------------- | --------------------------- | --------------------------------------------------------------------------- |
| Imágenes (jpg/jpeg/png/jfif/webp) | ~294                        | Menús, logos, QR, ferias, fotos de producto e imágenes de WhatsApp          |
| Videos (mp4/webm/avi)             | ~44                         | Promos, sifón, ferias, videos generados con IA (Gemini/Kling) y de WhatsApp |
| PDF                               | 22                          | Marcas/legal, planos del carrito, presupuesto, Lean Canvas                  |
| ZIP                               | 13                          | Varios duplican carpetas existentes (ver §3)                                |
| Audio (mp3/ogg/rpp/peaks)         | ~13                         | Grabaciones de voz y proyectos REAPER                                       |
| 3D (glb) + proyectos              | 9 glb, 2 osp, addons Python | Mockups 3D del carrito de café (Blender/addons)                             |
| Documentos (docx/pptx/xls/txt)    | 7                           | Plan de negocio, storyboard, presentación SIC, transcripts                  |

---

## 2. Recursos por marca y uso potencial

### 2.1 Café El Regio (marca principal)

**Logos e identidad**

- `Regio5-1.png` / `Regio5-1.svg` / `Regio5-1_lapiz.png` / `Regio5-1_relieve.png` — logo "vaquero" (sombrero + gafas + bigote): **mejor candidato para la web** (el SVG es escalable).
- `Regio.jfif` – `Regio10.jfif` — variantes antiguas (dic 2024) del logo; útiles para historia de marca.
- `Logo para registro.png`, `Registro/Logo para registro.jpg` — versión depurada para el trámite ante la SIC.
- `Regio-pendon.png`, `poster.png`, `poster-mejorado.png`, `logo3-tiza.jpg` — material promocional impreso.
- `regio-lapiz.pdf`, `regio-relieve.pdf` — variantes gráficas del logo.

**Menús con precios (pizarras tipo chalkboard, estilo negro/amarillo tiza)**

- `menu2.jpg` — carta principal de bebidas y food: Americano 5k; Cappuccino/Latte 6k (con dedito 12k, con torta 11k, con galleta 10k); Shots: Expreso/Macciato/Macca 5k; Frappe iced 12k; Orange Coffee 10k; Lime 10k; dedito 16k, torta 15k, galleta 14k.
- `menu3.png` — "Experiencia de Café Artesanal Santandereano": Clásicos (Americano 5k, **Capuchino 7k**); Especialidades Regio (Frappe Regio 12k, Orange Coffee 10k, Lime Coffee 10k); Acompañamientos (galleta 8k, dedito 10k, torta 11k); Combos (café+galleta 10k, capuchino+torta 15k, frappe+galleta 18k).
- `menu4-galgerias.png` — pastelería y salados: porción de torta $4.000–5.000 (amapola, red velvet, vainilla, veteada de chocolate); brownie $6.000; alfajor tradicional $4.000 y decorado $5.000; galleta estilo NY $6.000; dedito de queso $3.000; pasteles de pollo $4.500; muffins $4.000 (avena-banano) y $6.000 (vainilla chips).
- `menu5-limo+san.png` — limonadas $10.000 (coco, cereza, hierbabuena, tradicional); sandwich $10.000 (pollo, Regio, mixto); combo especial $18.000.
- `menu1(-fixed).jpeg` — borradores previos (bebidas sin food).
- ⚠️ Inconsistencia detectada: Capuchino aparece a **6k en menu2 y 7k en menu3**; galleta a **8k vs 10k/14k** según tarjeta. Requiere confirmar la lista vigente.

**Contenido y negocio**

- `Plan_El_Regio.docx` — plan de negocio: concepto (café premium móvil), modelo (50–80 bebidas/día, 4+ eventos/mes, café empacado), ticket promedio $7.000–10.000, ingresos estimados $14M–18M/mes, inversión $10M–20M COP, equipamiento (espresso, molino, métodos manuales V60/Chemex/Aeropress/sifón, energía portátil EcoFlow) y lineamientos de branding (chalkboard; negro, blanco, amarillo tiza, tipografías artesanales). Incluye análisis de facturación electrónica DIAN (RUT, firma, Alegra/Siigo, resolución). **Documento clave.**
- `Lean Canvas3 (1).pdf`, `Fase ideación 2026 (3).pdf` — documentos de modelo de negocio (PDFs aún sin extraer texto).
- `SIC-Presentacion-El Regio.pptx`, `SIC-diapositivas(.png)`, `clave-sic.png` — trámite de registro de marca.
- `PRESUPUESTO.pdf`, `plan-inversion-diapositivas.png`, `115907_CREAR_ESP_PROYECTO.xls` — costos e inversión.
- `STORYBOARD — COMERCIAL DE TV.docx` — guion completo del comercial "Cuando el café y el ponqué se encuentran" (Kari + Don Regio, 60 s, ambas marcas). Útil como guion de hero/video para la web.
- `transcript sesiones.txt` / `transcript sesiones2.txt` — transcripciones de sesiones de estrategia.

**Fotografía / eventos / video**

- Ferias: `Feria-Bucaramanga-*.jpeg/jpg` (con poster final), `GironCC.jpeg`, `disposicion para feria.png`, `Kelly-feria*.jpeg`, `planos-carrito*.jpeg`.
- Carrito: `Plano Técnico y Despiece - Carro de Café El Regio(.pdf/.png)`, `Plano_fabricacion_carro_cafe_El_Regio.pdf`, `Plano_tecnico_carro_cafe_El_Regio_v2.pdf`, `PLANOS.pdf`, `mockup1..3*.glb` (mockups 3D del carrito, ~43 MB c/u), `cafe_car_model-*.glb`, `carrito1-lopoly.glb`, y addons Blender en `CoffeeCartBuilder/` y `CoffeeCartReverse/` (Python — **no ejecutar**).
- Videos de marca/producto: `Don-Regio-Sifon.mp4`, `tomando-pedidos.mp4`, `promo sabado.mp4`, `victoria1-2.mp4`, `cafe-argentina.mp4`, `cafe-zfranca.mp4`, `Vuelo DRONE Bucaramanga Zona Franca...mp4`, `gemini_generated_video_*.mp4` (IA, 13 clips), `kling_*.mp4` (IA), `checho1-2.mp4`, `kmuffis+Regio.mp4`, `Happy-Coffee-Day.mp4`.
- Personal/certificaciones: `kelly-diploma1..4.jpeg` (certificaciones UTS), `Kelly-posando(.jpg/-rostro)`, `Don-Regio-experto.jpg`, `El Regio viejo.jpeg` — buenos para página "Nosotros".
- Personajes de marca: `3 clientas y el viejo*.png`, `trump and pug delcy.png`, `cont temp lean.png` — ilustraciones/IA a revisar ante uso comercial.

**Contacto y cobro**

- `QR-ElRegio.jpg` — hoja con QR de cobro **Bre-B / Nequi Negocios** (a nombre de "Elregio — Kelly Betancourt") + QR Instagram `@cafeelregiobucaramanga` + QR TikTok `elregiobucaramanga`.
- `BREB-QR.jpeg`, `QR-ElRegio(.jpeg/.jpg/.pdn)`, `QR-ElRegio-Instagram.jpeg`, `QR-ElRegio-Tiktok.jpeg` — QR individuales.
- WhatsApp: **301 515 0059** (visible en `Regio+kmuffis.png`: "Pide tu café para llevar o a domicilio").

### 2.2 KMuffis (repostería aliada, liderada por Kari)

- `Regio-kmfs/logo-kmuffis.jpeg` — logo badge oscuro con cupcake rosa ("KMuffis"): candidato principal.
- `kmuffis.webp` — variante acuarela lavanda "Kmuffis" (estilo distinto,待 coordinar con Kari cuál usar).
- `Regio-kmfs/logo-kmuffis-old.jpeg` — logo antiguo. `Regio-kmfs/logos.png` — composición de ambos logos.
- `Regio+kmuffis.png` — poster conjunto "Dos marcas, una pasión" con contacto (WhatsApp 301 515 0059, Instagram).
- `Regio+KAri.jpeg`, `Nazly-cumple.jpg` — fotos con el equipo.
- `kmuffis+Regio.mp4`, `Regio-kmfs/WhatsApp Video 2026-09-28*.mp4`, `pavo-*.mp4` — videos de marca.
- La repostería de los menús (`menu4`, sección de muffins/alfajores) aparenta ser de KMuffis, pero **no está marcado en el menú — confirmar**.
- Carpeta `Regio-kmfs/` — organizada por evento (ver §2.3) + ZIPs que duplican cada subcarpeta.

### 2.3 Material de eventos (uso compartido)

| Carpeta / nombre                         | Evento                      | Contenido                        |
| ---------------------------------------- | --------------------------- | -------------------------------- |
| `Regio-kmfs/22-23 abril campusland`      | Campusland, 22–23 abr 2026  | 3 fotos WhatsApp                 |
| `Regio-kmfs/Barrio el porvenir...jpeg`   | Barrio El Porvenir, 2–3 may | 1 foto                           |
| `Regio-kmfs/16-17 mayo La victoria`      | La Victoria, 16–17 may      | 2 fotos                          |
| `Regio-kmfs/4 al 9 mayo giron colonial`  | Girón Colonial, 4–9 may     | 3 fotos                          |
| `Regio-kmfs/Concha acústica 30-361 mayo` | Concha Acústica, 30–31 may  | 3 fotos                          |
| `Regio-kmfs/cigarras 1 agosto`           | Las Cigarras, 1 ago         | 2 fotos                          |
| `Regio-kmfs/12 al 20 SEP las cigarrad`   | Las Cigarras, 12–20 sep     | 5 imgs + 1 video                 |
| `Regio-kmfs/26 -27 SEP concha acústica`  | Concha Acústica, 26–27 sep  | 3 fotos                          |
| `Regio-kmfs/zona franca 6-9 octubre`     | Zona Franca, 6–9 oct        | fotos + video drone              |
| `Mercadillo/` (26 fotos)                 | Mercadillo, 27 sep 2026     | Fotos del puesto (dup. con raíz) |

---

## 3. Duplicados confirmados (MD5) — sin tocar archivos

**Archivos idénticos (mismo hash):**

- `victoria2.mp4` = `victoria2 - copia.mp4` = `victoria2 - copia - copia.mp4` (×3)
- `menu3.png` = `menu3 - copia.png`
- `menu5-limo+san.png` y sus 3 "copias" (×4 idénticos)
- `IMG_20251123_150744.jpg` y sus 3 "copias" (×4)
- `IMG_20261014_132754661~2.jpg` = `...~2 (1).jpg` (×2)
- `mockup1_*.glb` ×3 idénticos (~43,6 MB c/u) y `mockup3_*_trim_*.glb` ×3 idénticos (~42,8 MB c/u)
- `Record (online-voice-recorder.com)2.mp3` duplicado en raíz y en `Media/`
- `promo sabado-no audio.mp4` duplicado en raíz y en `Media/`
- `IMG_20260927_*.jpg` en raíz = en `Mercadillo/` (verificados 2 de 26; los demás probablemente también)

**Duplicados como ZIP** (duplican contenido de carpetas):

- `Regio-kmfs/*.zip` (8 archivos) → duplican cada subcarpeta de evento; `Regio-kmfs.zip` duplica toda la carpeta.
- `PLANOS-ilovepdf_pages-to-jpg.zip`, `ImageToStl.com_mockup1_...zip`, `CoffeeCartBuilder.zip`, `CoffeeCartReverse.zip`.

**Ahorro estimado si se depurara (en el futuro, con autorización):** ~130 MB (glb) + ~130 MB (Mercadillo duplicado) + ~40 MB restantes. Total muy similar a 1 copia completa.

---

## 4. Formatos que convendría optimizar (futuro, sin acción ahora)

| Formato                                                                          | Cantidad          | Problema                                                          | Sugerencia (cuando haya autorización)                           |
| -------------------------------------------------------------------------------- | ----------------- | ----------------------------------------------------------------- | --------------------------------------------------------------- |
| `.glb`                                                                           | 9 (~390 MB)       | Pesados y triplicados                                             | Para la web usar imágenes estáticas; 1 sola copia de referencia |
| `.psd`                                                                           | 3 (~33 MB)        | Fuera del flujo web                                               | Re-exportar desde el original si se re-editan                   |
| `.png` de menús                                                                  | ~12 (~2–3 MB c/u) | Muy pesados para web                                              | Convertir a WebP/AVIF con `srcset` responsive                   |
| `.jfif`                                                                          | 10                | Compatibilidad limitada                                           | Convertir a WebP                                                |
| `.mp4` de IA (gemini/kling)                                                      | 15                | Peso, procedencia IA                                              | Seleccionar solo 2–3, comprimir H.264; revisar licencia         |
| `.pdn`, `.osp`, `.rpp`, `.rpp-bak`, `.blen_tc`, `.avi`, `.reapeaks`, peak `.mp3` | ~15               | Archivos de proyecto de edición (Paint.NET, REAPER, OBS, Blender) | Excluir de la web; quedan como archivo                          |
| `(Audio) *.webm`                                                                 | 2                 | Duplican videos gemini                                            | Verificar y depurar más adelante                                |

---

## 5. Datos comerciales faltantes o a confirmar ⚠️

1. **Lista de precios vigente** — `menu2` (Capuchino 6k) vs `menu3` (7k) y galleta 8k vs 10k. Confirmar qué versión está vigente y unificar.
2. **Productos KMuffis** — falta confirmar qué ítems de pastelería/muffins corresponden a KMuffis y su precio de venta.
3. **Café empacado** — se menciona en el plan y aparece en fotos (`CAFE_EL_REGIO_SIC_PIe_450x450.jpg`, bolsa en poster), pero no hay precios ni presentaciones.
4. **Datos legales** — nombre legal/NIT/régimen. En `Registro/` hay documentos de identidad y de trámite; **no se abrieron** (datos personales sensibles). Pendiente obtener del titular por fuera.
5. **Redes oficiales** — Instagram: `@cafeelregiobucaramanga` en la hoja Bre-B y `@elregiobucaramanga` en TikTok. Confirmar cuál es el handle definitivo.
6. **Estado del registro de marca en la SIC** — hay requerimiento de examen de forma, clasificación de Niza y acta "Niega sin oposición" (`TM5`, `TM9`, `Derrotero en Marcas.pdf`, `PDF_Report_TM.pdf`). Confirmar el estado actual antes de exhibir el logo en un dominio comercial.
7. **Pedidos para eventos** — populares en el plan pero faltan: paquetes, precios, cobertura y plazo de reserva.
8. **Domicilios** — el poster dice "a domicilio" pero no hay cobertura/horarios.
9. **Horarios y ubicación base del carrito** — sin fuente.
10. **Cobro Bre-B/Nequi** — QR disponible; confirmar que se puede publicar la llave y definir el texto de confirmación de pago en el flujo de WhatsApp.
11. **Relación con Zona Franca Santander** — patrocinador, cliente o ubicación fija? Sin confirmar.
12. **Datos de Kari y de KMuffis** — rol legal de la marca aliada, si tendrá pedidos propios en la web y a quién se le notifican los pedidos de repostería.

---

## 6. Arquitectura propuesta — tienda ligera (React + Vite)

```text
web/
├─ index.html
├─ public/
│  └─ assets/            ← solo archivos optimizados, elegidos manualmente
├─ src/
│  ├─ main.tsx
│  ├─ App.tsx
│  ├─ pages/
│  │  ├─ Home.tsx        ← hero con Don Regio / Kari
│  │  ├─ Catalogo.tsx    ← catálogo filtrable (bebidas / repostería / para eventos)
│  │  ├─ Eventos.tsx     ← galería por feria
│  │  ├─ Nosotros.tsx
│  │  └─ Carrito.tsx
│  ├─ components/        ← UI pura, independiente de los datos
│  │  ├─ BrandLogo.tsx   ← logo según marca (regio / kmuffis)
│  │  ├─ ProductCard.tsx
│  │  ├─ CartDrawer.tsx
│  │  ├─ EventoGallery.tsx
│  │  └─ WhatsAppButton.tsx
│  ├─ catalog/
│  │  ├─ tipos.ts        ← tipos: Product, Marca, Categoria
│  │  ├─ productos.ts    ← datos del catálogo (array tipado)
│  │  ├─ marcas.ts       ← colores, textos y logos por marca
│  │  └─ config.ts       ← WhatsApp, Instagram, TikTok, texto de pedidos
│  ├─ hooks/useCart.ts   ← carrito con Context + localStorage
│  └─ lib/whatsapp.ts    ← constructor de deep-link wa.me
└─ scripts/
   └─ optimize-images.mjs (opcional, futuro)
```

**Principios:**

1. **Datos separados de la UI:** el catálogo vive en `src/catalog/` (TypeScript puro, sin dependencias); los componentes reciben los datos por props. Migrable después a JSON o a una base de datos sin tocar componentes.
2. **Marcas como configuración:** `marcas.ts` define colores, textos y assets de El Regio y KMuffis; así la web puede mostrar cada marca o el combo.
3. **Carrito local:** Context + `localStorage`; sin backend.
4. **Pedidos vía WhatsApp:** al confirmar, se compone un mensaje con ítems + total + método y se abre `https://wa.me/573015150059?text=...` con el pedido URL-encoded.
5. **Estilo visual:** pizarras tipo chalkboard (negro + amarillo tiza + tipografía artesanal), inspirado en el logo y la presentación de marca.
6. **Deploy:** build estático en `web/dist/`, subible a Vercel/Netlify sin backend.

---

## 7. Plan por fases

### Fase 0 — Actual (solo recolección) ✅

Inventario terminado; `Recursos/` intacto. Sin git, sin dependencias, sin ejecutar scripts.

### Fase 1 — Fundación ✅ COMPLETADA (2026-11-10)

- ✅ Repo Git inicializado en `CafeElRegioWeb/` con `Recursos/` excluido vía `.gitignore` (commit `8561687`, incluye migración a TypeScript).
- ✅ Proyecto Vite + React + TypeScript en `web/` (`tsconfig.json`, `strict` habilitado).
- ✅ Todos los archivos fuente migrados de `.jsx`/`.js` a `.tsx`/`.ts` (componentes, datos, utilidades).
- ✅ Declaraciones de tipos para CSS Modules en `src/types/css-modules.d.ts`.
- ✅ `@types/react` y `@types/react-dom` instalados como dependencias de desarrollo.
- ✅ `tsc --noEmit` y `npm run build` pasan sin errores.
- ✅ Checkbox de privacidad en `EventModal.tsx` corregido: ahora es controlado y se puede desmarcar.
- ✅ ESLint + Prettier + husky (completado 2026-11-10): ESLint con flat config en `eslint.config.js` (reglas TS + React Hooks + React Refresh), Prettier (`.prettierrc`: `printWidth: 100`, comillas simples, 2 espacios), Husky con pre-commit ejecutando `lint-staged` sobre `web/`. Scripts: `npm run lint`, `npm run lint:fix`, `npm run format`, `npm run format:check`.
- ✅ Vitest + React Testing Library: 3 suites de pruebas (Header, CatalogPreview, EventModal), 10 pruebas pasando. Configuración en `vite.config.js` (environment jsdom, setupFiles `test/setup.ts`) y scripts `npm run test` / `npm run test:run`. Commit `d1045ad`.
- ✅ Extraer `EVENT_TYPES` a archivo compartido (`src/content/eventTypes.ts`) entre `Events.tsx` y `EventModal.tsx`. Commit `d1045ad`.

Fase 1 al 100% completa. Listo para pasar a la Fase 2 (confirmar precios del catálogo y activar pedidos por WhatsApp).

### Fase 2 — Catálogo real

- Confirmar precios con el negocio (§5) y volcarlos a `catalog/productos.ts`.
- Seleccionar y optimizar 15–25 imágenes (logo SVG, logos KMuffis, fotos de producto y de eventos) como WebP.
- Página de eventos con las 8+ fechas de `Regio-kmfs/`.

### Fase 3 — Contenido y refinamiento

- Home con datos del storyboard y los posters.
- Página "Nosotros" (certificaciones, equipo).
- Contacto con WhatsApp, Instagram, TikTok y QR de cobro Bre-B (una vez autorizado).
- SEO básico + Open Graph.

### Fase 4 — Persistencia y administración (futura)

- Mover el catálogo a un backend ligero (p. ej. Supabase o SQLite/API) para: inventario, stock, pedidos.
- Panel de administración mínimo: CRUD de productos y precios, marcado como "agotado".

### Fase 5 — Comercio formal (futura)

- Pasarela de pagos (Wompi / botón Nequi / MercadoPago) o confirmación manual por WhatsApp.
- Facturación electrónica DIAN vía proveedor (Alegra/Siigo, ya recomendado en el plan de negocio).
- Registro de pedidos, reportes simples y sincronización de inventario.

---

## 8. Notas de seguridad

- `Registro/` contiene documentos de identidad (cédulas de Samuel y Kelly) y cupones bancarios. **Deben quedar excluidos de la web y de cualquier repositorio.**
- `QR-ElRegio.jpg` muestra la llave de cobro Nequi ("Llave Nequi Negocios 0090989734", a nombre de Kelly Betancourt). Es una llave pública de cobro, pero conviene confirmar con la titular antes de publicarla.
- `CoffeeCartBuilder/` y `CoffeeCartReverse/` contienen scripts Python (addons de Blender): **no ejecutar** sin revisión.
- Imágenes y videos generados por IA (ChatGPT, Gemini, Kling) y las ilustraciones "copia - copia" pueden implicar limitaciones de licencia; revisar antes de uso comercial.
- No crear repositorios ni publicar nada hasta tener autorización y confirmar los datos del §5.

**Próximo paso:** autorizar la Fase 1 (o primero responder el §5 para el catálogo real).
