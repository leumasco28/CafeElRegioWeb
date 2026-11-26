/**
 * Utilidad para la temporada navideña
 * Determina si el sitio debe mostrar el tema navideño
 */

const CHRISTMAS_PREVIEW = true; // Cambiar a false para producción
const CHRISTMAS_START = new Date(new Date().getFullYear(), 11, 1); // 1 de diciembre
const CHRISTMAS_END = new Date(new Date().getFullYear() + 1, 0, 6); // 6 de enero (fin del 5 de enero)

/**
 * Retorna true si estamos en temporada navideña (1 dic - 5 ene)
 * o si CHRISTMAS_PREVIEW está activo para testing
 */
export function isChristmasSeason(): boolean {
  if (CHRISTMAS_PREVIEW) return true;
  const now = new Date();
  return now >= CHRISTMAS_START && now < CHRISTMAS_END;
}

/**
 * Clase CSS para aplicar tema navideño global
 */
export const CHRISTMAS_CLASS = 'christmas-theme';
