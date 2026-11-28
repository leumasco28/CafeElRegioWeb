export type FormFields = Record<string, string | boolean | undefined>;

/**
 * Envía un formulario declarado también en index.html para que Netlify Forms
 * pueda detectarlo durante el despliegue. No añade SDKs ni rastreadores.
 */
export async function submitNetlifyForm(formName: string, fields: FormFields): Promise<void> {
  const body = new URLSearchParams();
  body.set('form-name', formName);
  body.set('bot-field', '');

  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined) body.set(key, String(value));
  });

  const response = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(`No se pudo registrar el formulario (${response.status}).`);
  }
}
