# QR Code para el Menú de Café El Regio

## URL del Menú
```
http://localhost:5173/
```

## Código QR Generado

### Opción 1: Usar servicio en línea (recomendado)
Visita cualquiera de estos enlaces para generar y descargar el QR code:

**Google Charts API (300x300):**
https://chart.googleapis.com/chart?cht=qr&chl=http%3A%2F%2Flocalhost%3A5173%2F&chs=300x300&choe=UTF-8

**QRServer API (300x300):**
https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=http%3A%2F%2Flocalhost%3A5173%2F

**QRServer API (500x500 - mejor calidad para impresión):**
https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=http%3A%2F%2Flocalhost%3A5173%2F

### Opción 2: Archivos generados localmente
Los siguientes archivos fueron generados y deberían estar disponibles:

- `qr-code-menu.png` - Versión PNG (300x300)
- `qr-code-menu-final.png` - Versión PNG de alta calidad
- `qr-code-menu-final.svg` - Versión vectorial (escalable)

### Opción 3: Generar manualmente
Si los archivos no están disponibles, puedes generar el QR code manualmente:

1. Abre el archivo `generate-qr-v2.html` en tu navegador
2. Haz clic en "📥 Descargar QR (PNG)" o "📥 Descargar QR (SVG)"
3. Guarda el archivo en la carpeta del proyecto

## Uso del QR Code

### Para desarrollo local:
- El QR apunta a `http://localhost:5173/`
- Solo funcionará cuando el servidor de desarrollo esté corriendo (`npm run dev`)

### Para producción:
Cuando despliegues el sitio, actualiza la URL en el QR code a tu dominio de producción:
- Ejemplo: `https://cafeelregio.com/`

## Instrucciones para el negocio

1. **Imprime el QR code** en:
   - Manteles individuales
   - Carteles en la pared
   - Tarjetas de mesa
   - Recibos/facturas
   - Redes sociales

2. **Tamaño recomendado para impresión**: Mínimo 3x3 cm (usar versión 500x500 o SVG)

3. **Prueba siempre** escaneando con tu teléfono antes de imprimir en masa

## Archivos HTML de utilidad

- `generate-qr.html` - Generador simple con QRCode.js
- `generate-qr-v2.html` - Generador mejorado con descarga PNG/SVG
- `qr-generator.html` - Generador automático

## Notas técnicas

- El QR code usa corrección de errores nivel H (máxima)
- Tamaño: 300x300 píxeles (web) / 500x500 píxeles (impresión)
- Formato: PNG con fondo blanco, SVG vectorial
- URL codificada: `http://localhost:5173/`