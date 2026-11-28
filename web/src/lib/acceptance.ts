import { LEGAL_VERSION } from '../content/legal.ts';
import { submitNetlifyForm } from './netlifyForms.ts';

const STORAGE_KEY = 'cafe_el_regio_terms_acceptance';

export type AcceptanceContext = 'pedido' | 'evento' | 'kit-navideno';

export type AcceptanceInput = {
  context: AcceptanceContext;
  name?: string;
  contact?: string;
  marketingAccepted?: boolean;
};

export type AcceptanceRecord = {
  acceptanceId: string;
  acceptedAt: string;
  termsVersion: string;
  context: AcceptanceContext;
  marketingAccepted: boolean;
};

function createAcceptanceId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `regio-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function saveLocalCopy(record: AcceptanceRecord): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Netlify conserva el registro principal; el navegador puede bloquear almacenamiento.
  }
}

/** Registra quién aceptó, cuándo, la versión y el permiso de marketing independiente. */
export async function recordTermsAcceptance(input: AcceptanceInput): Promise<AcceptanceRecord> {
  const record: AcceptanceRecord = {
    acceptanceId: createAcceptanceId(),
    acceptedAt: new Date().toISOString(),
    termsVersion: LEGAL_VERSION,
    context: input.context,
    marketingAccepted: input.marketingAccepted === true,
  };

  await submitNetlifyForm('terms-acceptance', {
    acceptanceId: record.acceptanceId,
    acceptedAt: record.acceptedAt,
    termsVersion: record.termsVersion,
    context: record.context,
    name: input.name?.trim() || 'Cliente identificado en la conversación de WhatsApp',
    contact: input.contact?.trim(),
    termsAccepted: true,
    privacyAccepted: true,
    marketingAccepted: record.marketingAccepted,
  });

  saveLocalCopy(record);
  return record;
}

export function formatAcceptanceForMessage(record: AcceptanceRecord): string {
  return [
    `Aceptación de términos y privacidad: sí (versión ${record.termsVersion})`,
    `Fecha UTC: ${record.acceptedAt}`,
    `ID de aceptación: ${record.acceptanceId}`,
    `Permiso de marketing: ${record.marketingAccepted ? 'sí' : 'no'}`,
  ].join('\n');
}
