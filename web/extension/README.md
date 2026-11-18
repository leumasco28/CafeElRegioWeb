# Extensión de Navegador — Café El Regio Editor Web

Extensión de navegador (Chrome / Edge / Firefox Manifest V3) para crear y editar páginas web del sitio Café El Regio / KMuffis. Funciona como una herramienta de "editor visual en cualquier página" similar a la extensión de navegador de Opencode, adaptada a este proyecto.

## ¿Qué hace?

1. **Botón flotante en cualquier página**: Al instalar la extensión, aparece un botón "✎ Editar página" en la esquina superior derecha de cada sitio web que visites.
2. **Selección visual de elementos**: Haz clic en cualquier elemento de la página para seleccionarlo y ver su tipo, contenido y estilos computados.
3. **Generación de JSON**: Cada elemento seleccionado se convierte en un nodo JSON compatible con el editor visual del proyecto (`PageNode`: `Section`, `Row`, `Column`, `Text`, `Image`, `Button`).
4. **Guardar página**: Los nodos generados se guardan en el almacenamiento de la extensión (`chrome.storage.local`) y pueden abrirse en el editor visual del proyecto en `http://localhost:5173/editor/:slug`.
5. **Popup de gestión**: Desde el icono de la extensión en la barra de herramientas del navegador puedes crear páginas nuevas, listar las guardadas, abrirlas en el editor o eliminarlas.

## Estructura de archivos

```
web/extension/
├── manifest.json          # Manifest V3 de la extensión
├── background.js          # Service worker (gestión de páginas, comunicación)
├── popup.html             # Interfaz del popup (crear/listar páginas)
├── popup.js               # Lógica del popup
├── popup.css              # Estilos del popup
├── content.js             # Content script (inyecta botón de edición en páginas)
├── content.css            # Estilos adicionales del content script
├── icons/
│   ├── icon16.svg
│   ├── icon48.svg
│   └── icon128.svg
└── README.md              # Este archivo
```

## Cómo instalar (desarrollo)

1. Abre el navegador (Chrome, Edge o Firefox con soporte Manifest V3).
2. Ve a `chrome://extensions/` (o `edge://extensions/`).
3. Activa el **Modo de desarrollador** (interruptor superior derecho).
4. Haz clic en **"Cargar descomprimida"** (Load unpacked).
5. Selecciona la carpeta: `web/extension/` dentro de este proyecto.
6. La extensión aparecerá en la barra de herramientas. Fíjala para tenerla a mano.

## Cómo usar

### Editar una página externa

1. Navega a cualquier página web.
2. Haz clic en el botón flotante **"✎ Editar página"** (esquina superior derecha).
3. Haz clic en cualquier elemento de la página para seleccionarlo.
4. En el panel derecho, ajusta el tipo de nodo, contenido y propiedades.
5. Copia el JSON generado o guarda la página desde el botón "Guardar página".

### Crear una página nueva desde el popup

1. Haz clic en el icono de la extensión en la barra de herramientas.
2. En la pestaña **Editor**, llena Título, Slug (ej. `/inicio`) y Estado.
3. Haz clic en **Crear página** para guardarla en el almacenamiento local.
4. Haz clic en **Abrir en editor visual** para abrirla en `http://localhost:5173/editor/inicio` (requiere el servidor de Vite en ejecución).

### Gestionar páginas guardadas

1. Abre el popup de la extensión.
2. Ve a la pestaña **Páginas**.
3. Verás la lista de páginas guardadas con su slug y estado.
4. Puedes editar, abrir en el editor visual o eliminar cada una.

## Integración con el proyecto Café El Regio

La extensión genera nodos con el mismo esquema que `src/types/page.ts`:

```ts
interface PageNode {
  id: string;
  type: string;           // 'Section' | 'Row' | 'Column' | 'Text' | 'Image' | 'Button'
  parentId?: string;
  props: Record<string, unknown>;
  styles: { desktop?: Record<string, string | number>; ... };
  children: PageNode[];
  order: number;
}
```

El JSON generado se puede importar al editor visual del proyecto (`/editor/:slug`) para continuar editando con todas las herramientas de Craft.js + Zustand.

## Requisitos

- Navegador con soporte para extensiones Manifest V3 (Chrome 102+, Edge, Firefox 109+).
- Para abrir páginas en el editor visual: el servidor de Vite ejecutándose en `http://localhost:5173` (`npm run dev` en `web/`).

## Limitaciones

- La extensión guarda páginas en `chrome.storage.local` del navegador, no en el backend del proyecto.
- Para publicar cambios en el sitio real, exporta el JSON y úsalo en el editor visual o en `src/content/pages.json`.
- El content script se ejecuta en `document_idle`; en páginas muy dinámicas puede que el botón flotante aparezca con un ligero retraso.
