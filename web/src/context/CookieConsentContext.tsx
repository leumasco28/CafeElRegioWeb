import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { COOKIE_PREFERENCES_KEY } from '../content/legal.ts';

export type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  savedAt: string;
};

type CookieConsentContextValue = {
  preferences: CookiePreferences | null;
  settingsOpen: boolean;
  savePreferences: (analytics: boolean, marketing: boolean) => void;
  openSettings: () => void;
  closeSettings: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

function readPreferences(): CookiePreferences | null {
  try {
    const raw = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as Partial<CookiePreferences>;
    if (typeof value.analytics !== 'boolean' || typeof value.marketing !== 'boolean') return null;
    return {
      necessary: true,
      analytics: value.analytics,
      marketing: value.marketing,
      savedAt: typeof value.savedAt === 'string' ? value.savedAt : '',
    };
  } catch {
    return null;
  }
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(readPreferences);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const savePreferences = useCallback((analytics: boolean, marketing: boolean) => {
    const next: CookiePreferences = {
      necessary: true,
      analytics,
      marketing,
      savedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(next));
    } catch {
      // La preferencia se aplica durante esta sesión aunque el navegador bloquee el almacenamiento.
    }
    setPreferences(next);
    setSettingsOpen(false);
  }, []);

  useEffect(() => {
    const open = () => setSettingsOpen(true);
    window.addEventListener('regio:open-cookie-settings', open);
    return () => window.removeEventListener('regio:open-cookie-settings', open);
  }, []);

  const value = useMemo(
    () => ({
      preferences,
      settingsOpen,
      savePreferences,
      openSettings: () => setSettingsOpen(true),
      closeSettings: () => setSettingsOpen(false),
    }),
    [preferences, settingsOpen, savePreferences]
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent(): CookieConsentContextValue {
  const value = useContext(CookieConsentContext);
  if (!value) throw new Error('useCookieConsent debe usarse dentro de CookieConsentProvider.');
  return value;
}

export function hasOptionalConsent(category: 'analytics' | 'marketing'): boolean {
  return readPreferences()?.[category] === true;
}
