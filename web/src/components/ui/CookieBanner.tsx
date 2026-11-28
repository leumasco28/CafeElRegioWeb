import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookieConsent, type CookiePreferences } from '../../context/CookieConsentContext.tsx';
import styles from './CookieBanner.module.css';

function CookieSettingsDialog({
  preferences,
  savePreferences,
  closeSettings,
  setMessage,
}: {
  preferences: CookiePreferences | null;
  savePreferences: (analytics: boolean, marketing: boolean) => void;
  closeSettings: () => void;
  setMessage: (value: string) => void;
}) {
  const [analytics, setAnalytics] = useState(preferences?.analytics ?? false);
  const [marketing, setMarketing] = useState(preferences?.marketing ?? false);
  const settingsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    settingsRef.current?.querySelector<HTMLButtonElement>('button')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSettings();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = settingsRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex="0"]'
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus();
    };
  }, [closeSettings]);

  const save = (nextAnalytics: boolean, nextMarketing: boolean) => {
    savePreferences(nextAnalytics, nextMarketing);
    setMessage('Preferencias de cookies guardadas. No se cargó ningún rastreador.');
  };

  return (
    <div className={styles.overlay}>
      <div
        className={styles.settings}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-settings-title"
        ref={settingsRef}
        onKeyDown={(event) => {
          if (event.key === 'Escape') closeSettings();
        }}
      >
        <button
          type="button"
          className={styles.close}
          onClick={closeSettings}
          aria-label="Cerrar preferencias"
        >
          ×
        </button>
        <h2 id="cookie-settings-title">Configurar cookies</h2>
        <p>
          No hay proveedores opcionales instalados. Estas preferencias dejan listo el control para
          el futuro y nunca activan marketing por correo.
        </p>
        <label className={styles.option}>
          <input type="checkbox" checked disabled />
          <span>
            <strong>Necesarias</strong>
            <small>Carrito, seguridad y preferencia de cookies. Siempre activas.</small>
          </span>
        </label>
        <label className={styles.option}>
          <input
            type="checkbox"
            checked={analytics}
            onChange={(event) => setAnalytics(event.target.checked)}
          />
          <span>
            <strong>Analítica</strong>
            <small>Medición futura, solo tras auditar y publicar el proveedor.</small>
          </span>
        </label>
        <label className={styles.option}>
          <input
            type="checkbox"
            checked={marketing}
            onChange={(event) => setMarketing(event.target.checked)}
          />
          <span>
            <strong>Cookies de marketing</strong>
            <small>Publicidad futura. Es independiente del permiso para enviarte correos.</small>
          </span>
        </label>
        <div className={styles.settingsActions}>
          <button type="button" className={styles.secondary} onClick={() => save(false, false)}>
            Rechazar opcionales
          </button>
          <button
            type="button"
            className={styles.primary}
            onClick={() => save(analytics, marketing)}
          >
            Guardar selección
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CookieBanner() {
  const { preferences, settingsOpen, savePreferences, openSettings, closeSettings } =
    useCookieConsent();
  const [message, setMessage] = useState('');

  if (preferences && !settingsOpen) {
    return (
      <div className="visually-hidden" aria-live="polite">
        {message}
      </div>
    );
  }

  const save = (nextAnalytics: boolean, nextMarketing: boolean) => {
    savePreferences(nextAnalytics, nextMarketing);
    setMessage('Preferencias de cookies guardadas. No se cargó ningún rastreador.');
  };

  return (
    <>
      <div className="visually-hidden" aria-live="polite">
        {message}
      </div>
      <aside className={styles.banner} aria-label="Preferencias de cookies">
        <div className={styles.copy}>
          <strong>Tu privacidad, sin letra pequeña</strong>
          <p>
            Usamos almacenamiento necesario para el carrito y tus preferencias. Actualmente no hay
            analítica ni rastreadores de marketing. Los opcionales permanecen bloqueados si los
            rechazas. Consulta la <Link to="/cookies">política de cookies</Link>.
          </p>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.secondary} onClick={() => save(false, false)}>
            Rechazar opcionales
          </button>
          <button type="button" className={styles.secondary} onClick={openSettings}>
            Configurar
          </button>
          <button type="button" className={styles.primary} onClick={() => save(true, true)}>
            Aceptar opcionales
          </button>
        </div>
      </aside>

      {settingsOpen && (
        <CookieSettingsDialog
          preferences={preferences}
          savePreferences={savePreferences}
          closeSettings={closeSettings}
          setMessage={setMessage}
        />
      )}
    </>
  );
}
