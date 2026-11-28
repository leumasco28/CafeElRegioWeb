import { hasOptionalConsent } from '../context/CookieConsentContext.tsx';

/**
 * Puerta para integraciones futuras. Ningún proveedor está registrado actualmente.
 * Antes de añadir uno: audítalo, declara sus datos, firma el DPA aplicable y permite
 * retirar el consentimiento. La CSP de Netlify también debe limitarse al origen necesario.
 */
export function loadOptionalScript(
  src: string,
  category: 'analytics' | 'marketing'
): Promise<HTMLScriptElement> {
  if (!hasOptionalConsent(category)) {
    return Promise.reject(
      new Error(`Falta consentimiento para ${category}; el script no se cargó.`)
    );
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.dataset.consentCategory = category;
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`No se pudo cargar ${src}`));
    document.head.appendChild(script);
  });
}
