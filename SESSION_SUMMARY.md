# Sesión de Desarrollo - Café El Regio Web

**Fecha:** 2025-11-25 a 2025-11-26  
**Proyecto:** CafeElRegioWeb  
**URL Producción:** https://cafeelregio.netlify.app  
**Repositorio:** Git + Netlify

---

## Resumen de Cambios Completados

### 1. Hero Section - Versión Navideña
- **Video con audio**: Removido `muted` de ambos videos (desktop y móvil)
- **Grid full-width**: `.grid { grid-template-columns: minmax(0, 1fr) }`
- **Botón duplicado removido**: Eliminado `.videoCtaBottom` y botón al pie del video
- **kcard removido**: Ya no bloquea controles del video
- **Logos removidos**: Eliminados del video
- **CTA único**: Solo "Ver cajas navideñas" en el overlay
- **Activación automática**: `CHRISTMAS_PREVIEW = true` (cambiar a `false` para producción - activa 1 dic a 5 ene)

### 2. Header - Nueva Sección en Menú
- Agregado enlace **"Cajas navideñas"** (`#carta-navidenas`)

### 3. ChristmasCardSection.tsx - Nueva Sección Completa
**Archivos creados:**
- `web/src/components/home/ChristmasCardSection.tsx` - Componente React completo
- `web/src/components/home/ChristmasCardSection.module.css` - Estilos CSS

**Contenido de la sección (antes de la Carta):**
- **Header decorativo**: Logo SVG estilo "El Regio", lema artesanal, título "CARTA NAVIDEÑA", subtítulo centrado "— PERSONALIZA TU KIT —", texto emocional actualizado
- **Paso 1 - Elige tu Empaque**: 4 opciones con imágenes reales
  - Bolsa Kraft ($13.500) - *Económica y elegante*
  - Caja Blanca ($18.000) - *Clásica*
  - Caja Blanca Sticker ($18.000) - *Minimalista*
  - Kraft Baúl ($18.000) - ⭐ *Favorita*
- **Paso 2 - Carta de Productos**: 4 productos artesanales con imágenes reales
  - Vela Taza Café ($12.000) - *Aroma a Café*
  - Vela Bebida Fría ($15.000) - *Edición Especial*
  - Jabón de Café ($13.000) - *100% Natural*
  - Pocillo Cerámica ($7.000) - *Clásico Regio*
- **Cotizador/Resumen**: Nota personalizada, total en tiempo real, botones Copiar/WA

### 4. CatalogPreview.tsx - Limpieza
- **Eliminada** sección `#cajas-navidenas` con placeholders antiguos
- **Eliminado** array `christmasPlaceholders`

### 5. Assets Reales Agregados
Imágenes copiadas a `web/public/assets/christmas/`:
```
01_bolsa_kraft_corbata_verde.png
02_caja_opcion_1_blanca.png
03_caja_opcion_2_blanca_sticker.png
04_caja_opcion_3_kraft_baul.png
05_vela_taza_cafe.png
06_vela_bebida_fria.png
07_jabon_de_cafe.png
08_pocillo_ceramica.png
```

---

## Archivos Modificados/Creados

### Nuevos Archivos
| Archivo | Descripción |
|---------|-------------|
| `web/src/components/home/ChristmasCardSection.tsx` | Componente principal Carta Navideña |
| `web/src/components/home/ChristmasCardSection.module.css` | Estilos CSS adaptados |

### Archivos Modificados
| Archivo | Cambios |
|---------|---------|
| `web/src/components/home/Hero.tsx` | Video con audio, kcard removido, grid full-width |
| `web/src/components/home/Hero.module.css` | Estilos actualizados |
| `web/src/components/layout/Header.tsx` | Agregado link "Cajas navideñas" |
| `web/src/components/home/CatalogPreview.tsx` | Placeholders removidos, array eliminado |
| `web/src/components/home/CatalogPreview.module.css` | Estilos placeholders eliminados |
| `web/src/App.tsx` | Agregado `<ChristmasCardSection />` antes de CatalogPreview |
| `web/src/components/home/ChristmasCardSection.tsx` | **Nuevo** - Componente completo |
| `web/src/components/home/ChristmasCardSection.module.css` | **Nuevo** - Estilos |

### Assets Agregados
```
web/public/assets/christmas/
├── 01_bolsa_kraft_corbata_verde.png
├── 02_caja_opcion_1_blanca.png
├── 03_caja_opcion_2_blanca_sticker.png
├── 04_caja_opcion_3_kraft_baul.png
├── 05_vela_taza_cafe.png
├── 06_vela_bebida_fria.png
├── 07_jabon_de_cafe.png
├── 08_pocillo_ceramica.png
├── CAjitasXmas-ya.mp4
├── promo4-2.jpg
└── vertical/CAjitasXmas-vertical.mp4
```

---

## Estado del Build
```bash
cd web && npm run build
# ✅ Build exitoso - 57.96 kB CSS, 439 kB JS
```

---

## Deploy a Netlify
```bash
cd web
git add .
git commit -m "feat: Christmas full-width layout, real images, centered subtitle, updated text, removed old placeholders"
netlify deploy --prod
```
**URL Producción:** https://cafeelregio.netlify.app

---

## Pendiente para Producción
- [ ] Cambiar `CHRISTMAS_PREVIEW = false` en `ChristmasCardSection.tsx` (línea ~33) para activar solo 1 dic - 5 ene
- [ ] Verificar en producción que el video móvil tiene audio y el botón aparece
- [ ] Probar flujo completo: Hero → ChristmasCardSection → CatalogPreview

---

## Próximos Pasos Sugeridos
1. Probar en `npm run dev` que todo se ve correctamente
2. Verificar responsive en móvil/desktop
3. Confirmar que las imágenes cargan correctamente
4. Deploy a producción cuando estés listo

---

# Sesión de Desarrollo - Café El Regio Web

**Fecha:** 2025-11-25 a 2025-11-26  
**Proyecto:** CafeElRegioWeb  
**URL Producción:** https://cafeelregio.netlify.app  
**Repositorio:** Git + Netlify

---

## Resumen de Cambios Completados

### 1. Hero Section - Versión Navideña
- **Video con audio**: Removido `muted` de ambos videos (desktop y móvil)
- **Grid full-width**: `.grid { grid-template-columns: minmax(0, 1fr) }`
- **Botón duplicado removido**: Eliminado `.videoCtaBottom` y botón al pie del video
- **kcard removido**: Ya no bloquea controles del video
- **Logos removidos**: Eliminados del video
- **CTA único**: Solo "Ver cajas navideñas" en el overlay
- **Activación automática**: `CHRISTMAS_PREVIEW = true` (cambiar a `false` para producción - activa 1 dic a 5 ene)

### 2. Header - Nueva Sección en Menú
- Agregado enlace **"Cajas navideñas"** (`#carta-navidenas`)

### 3. ChristmasCardSection.tsx - Nueva Sección Completa
**Archivos creados:**
- `web/src/components/home/ChristmasCardSection.tsx` - Componente React completo
- `web/src/components/home/ChristmasCardSection.module.css` - Estilos CSS

**Contenido de la sección (antes de la Carta):**
- **Header decorativo**: Logo SVG estilo "El Regio", lema artesanal, título "CARTA NAVIDEÑA", subtítulo centrado "— PERSONALIZA TU KIT —", texto emocional actualizado
- **Paso 1 - Elige tu Empaque**: 4 opciones con imágenes reales
  - Bolsa Kraft ($13.500) - *Económica y elegante*
  - Caja Blanca ($18.000) - *Clásica*
  - Caja Blanca Sticker ($18.000) - *Minimalista*
  - Kraft Baúl ($18.000) - ⭐ *Favorita*
- **Paso 2 - Carta de Productos**: 4 productos artesanales con imágenes reales
  - Vela Taza Café ($12.000) - *Aroma a Café*
  - Vela Bebida Fría ($15.000) - *Edición Especial*
  - Jabón de Café ($13.000) - *100% Natural*
  - Pocillo Cerámica ($7.000) - *Clásico Regio*
- **Cotizador/Resumen**: Nota personalizada, total en tiempo real, botones Copiar/WA

### 4. CatalogPreview.tsx - Limpieza
- **Eliminada** sección `#cajas-navidenas` con placeholders antiguos
- **Eliminado** array `christmasPlaceholders`

### 5. Assets Reales Agregados
Imágenes copiadas a `web/public/assets/christmas/`:
```
01_bolsa_kraft_corbata_verde.png
02_caja_opcion_1_blanca.png
03_caja_opcion_2_blanca_sticker.png
04_caja_opcion_3_kraft_baul.png
05_vela_taza_cafe.png
06_vela_bebida_fria.png
07_jabon_de_cafe.png
08_pocillo_ceramica.png
```

---

## Archivos Modificados/Creados

### Nuevos Archivos
| Archivo | Descripción |
|---------|-------------|
| `web/src/components/home/ChristmasCardSection.tsx` | Componente principal Carta Navideña |
| `web/src/components/home/ChristmasCardSection.module.css` | Estilos CSS adaptados |

### Archivos Modificados
| Archivo | Cambios |
|---------|---------|
| `web/src/components/home/Hero.tsx` | Video con audio, kcard removido, grid full-width |
| `web/src/components/home/Hero.module.css` | Estilos actualizados |
| `web/src/components/layout/Header.tsx` | Agregado link "Cajas navideñas" |
| `web/src/components/home/CatalogPreview.tsx` | Placeholders removidos, array eliminado |
| `web/src/components/home/CatalogPreview.module.css` | Estilos placeholders eliminados |
| `web/src/App.tsx` | Agregado `<ChristmasCardSection />` antes de CatalogPreview |
| `web/src/components/home/ChristmasCardSection.tsx` | **Nuevo** - Componente completo |
| `web/src/components/home/ChristmasCardSection.module.css` | **Nuevo** - Estilos |

### Assets Agregados
```
web/public/assets/christmas/
├── 01_bolsa_kraft_corbata_verde.png
├── 02_caja_opcion_1_blanca.png
├── 03_caja_opcion_2_blanca_sticker.png
├── 04_caja_opcion_3_kraft_baul.png
├── 05_vela_taza_cafe.png
├── 06_vela_bebida_fria.png
├── 07_jabon_de_cafe.png
├── 08_pocillo_ceramica.png
├── CAjitasXmas-ya.mp4
├── promo4-2.jpg
└── vertical/CAjitasXmas-vertical.mp4
```

---

## Estado del Build
```bash
cd web && npm run build
# ✅ Build exitoso - 57.96 kB CSS, 439 kB JS
```

---

## Deploy a Netlify
```bash
cd web
git add .
git commit -m "feat: Christmas full-width layout, real images, centered subtitle, updated text, removed old placeholders"
netlify deploy --prod
```
**URL Producción:** https://cafeelregio.netlify.app

---

## Pendiente para Producción
- [ ] Cambiar `CHRISTMAS_PREVIEW = false` en `ChristmasCardSection.tsx` (línea ~33) para activar solo 1 dic - 5 ene
- [ ] Verificar en producción que el video móvil tiene audio y el botón aparece
- [ ] Probar flujo completo: Hero → ChristmasCardSection → CatalogPreview

---

## Próximos Pasos Sugeridos
1. Probar en `npm run dev` que todo se ve correctamente
2. Verificar responsive en móvil/desktop
3. Confirmar que las imágenes cargan correctamente
4. Deploy a producción cuando estés listo

---

**Nota:** El código usa `CHRISTMAS_PREVIEW = true` para testing. Cambiar a `false` antes de deploy final para que la versión navideña solo aparezca del 1 dic al 5 ene automáticamente.

## Actualización - 27 noviembre 2026

### Trabajo completado en esta sesión
- Producción verificada: https://cafeelregio.netlify.app
- Formularios Netlify detectados: `terms-acceptance`, `unsubscribe`, `copyright-claim`.
- Se añadieron páginas y rutas legales: privacidad, términos, reembolsos, cookies, licencias, baja de correos y reclamos de derechos de autor.
- Se añadió aceptación obligatoria de términos/privacidad, marketing opcional independiente y registro de aceptación.
- Se mejoró navegación por teclado, foco en modales, etiquetas de IA y textos no sustentados.
- Se actualizó el carrito para conservar aceptación/identificador y no abrir WhatsApp si falla el registro.
- Se actualizó la sección navideña para usar el registro de aceptación y el número centralizado de WhatsApp.
- Se desactivó `CHRISTMAS_PREVIEW` para que la temporada se active automáticamente del 1 de diciembre al 5 de enero.
- Se ajustaron textos de catálogo y claims de marca para no prometer atributos no sustentados.
- Se añadieron formularios estáticos en `index.html` para detección de Netlify Forms.
- Se actualizó `App.tsx`, `Header.tsx`, `Footer.tsx`, `EventModal.tsx`, `CartDrawer.tsx` y `ChristmasCardSection.tsx`.
- Validación local: TypeScript OK, 30/30 tests OK, lint 0 errores, build OK.

### Pendientes del negocio
- Revisión legal Colombia-específica y datos registrales reales.
- Acuerdos de datos con proveedores.
- Verificación escrita de permisos sobre logos, imágenes y videos.
- Rotación/eliminación de secretos `VITE_*` de PocketBase si se usan.
- Prueba real de un envío de formulario antes de prometer registro operativo.
- Verificación manual de envío real de formulario Netlify en producción.

---

## Actualización - Editor visual Puck (27 noviembre 2026)

### Problema resuelto: pantalla blanca al instalar "Puck"

El paquete `puck@1.1.9` que estaba instalado **no es Puck el editor visual de React**. Es un motor de I/O de red de Node.js (2015) que expone una clase HTTP `Puck` (`get()`, `post()`), no exporta `usePuck` ni componentes de editor. Por eso la pantalla quedaba en blanco. El editor real se publica como **`@puckeditor/core`** y no estaba instalado.

### Cambios realizados

**Dependencias (`web/package.json`):**
- `npm uninstall puck` — se eliminó el paquete incorrecto.
- `npm install @puckeditor/core@0.24.2` — peer dep `react: ^18 || ^19`, compatible con React 19.3.1 del proyecto.

**Archivos nuevos:**
| Archivo | Descripción |
|---------|-------------|
| `web/src/puck.config.tsx` | Configuración compartida de Puck (`config` y `initialData`) con bloques registrados: `HeadingBlock`, `TextBlock`, `ImageBlock`, `ButtonBlock`. |
| `web/src/pages/EditPage.tsx` | Ruta `/edit`: renderiza `<Puck config={config} data={...} onChange={...} onPublish={...} />`. `onPublish` guarda el JSON en `localStorage` bajo la clave `'puck-data'`. Siempre pasa un objeto de datos válido `{ content: [], root: {} }` (nunca `null`/`undefined`). |

**Archivos modificados:**
| Archivo | Cambios |
|---------|---------|
| `web/src/main.tsx` | Agregado `import '@puckeditor/core/puck.css';`. Se removió temporalmente `<StrictMode>` de la raíz para probar si React 19 StrictMode provoca el crash `<ForwardRef(Layer2)>`. Se reañadirá una vez identificada la causa. |
| `web/src/App.tsx` | Ruta `/edit` renderiza `<EditPage />` (sin StrictMode, intencionalmente, para la prueba). Ruta `/` lee `'puck-data'` de `localStorage`; si existe, renderiza `<Render config={config} data={data} />`, si no, muestra el contenido normal del home. Importa `Render` de `@puckeditor/core` y `config` de `./puck.config`. Todas las demás rutas siguen envueltas en `<StrictMode>`. |
| `web/src/components/ui/PuckDemo.tsx` | Reescrito como editor Puck real (`<Puck config={config} data={data} />`) con bloques registrados y contenido inicial. |
| `web/src/pages/PuckDemoPage.tsx` | Se eliminó la importación rota `usePuck` (portapapeles); solo renderiza el editor Puck. |

### Verificación
- `npx tsc --noEmit` ✅ (solo error preexistente e independiente en `src/content/christmas.ts`).
- `npm run build` ✅ — CSS y JS de Puck se bundlan sin errores.
- Servidor de desarrollo en `http://localhost:5173` ✅.

### Cómo probar
```bash
cd web
npm run dev
```
- `http://localhost:5173/edit` — editar con Puck, publicar, los datos se guardan en `localStorage` bajo `'puck-data'`.
- `http://localhost:5173/` — si existe `puck-data`, se renderiza con `<Render>`; si no, se muestra el home normal.

La ruta `/puck-demo` y el editor Craft.js (`editor/canvas.tsx`, `editor/CraftEditor.tsx`) quedan intactos.

### Próximo paso (pendiente)
- Confirmar si el crash `<ForwardRef(Layer2)>` desaparece con `/edit` fuera de `StrictMode`. Si desaparece, mantener StrictMode desactivado solo para esa ruta o reañadirlo al resto tras identificar la causa.