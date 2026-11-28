import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { submitNetlifyForm } from '../lib/netlifyForms.ts';
import LegalLayout, { LegalSection } from './LegalLayout.tsx';
import styles from './LegalLayout.module.css';

type SubmitState = { kind: 'idle' | 'submitting' | 'success' | 'error'; message?: string };

export function UnsubscribePage() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<SubmitState>({ kind: 'idle' });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({ kind: 'submitting' });
    try {
      await submitNetlifyForm('unsubscribe', {
        email: email.trim(),
        requestedAt: new Date().toISOString(),
        scope: 'Todos los correos de marketing de Café El Regio',
      });
      setState({
        kind: 'success',
        message:
          'Solicitud registrada. El equipo debe incluir este correo en la lista de supresión antes del próximo envío de marketing.',
      });
      setEmail('');
    } catch {
      setState({
        kind: 'error',
        message:
          'No pudimos registrar la baja. Inténtalo de nuevo o escribe por WhatsApp al +57 318 713 3439.',
      });
    }
  };

  return (
    <LegalLayout
      title="Baja de correos"
      intro="Retira tu permiso para recibir comunicaciones de marketing. No necesitas crear una cuenta ni dar más datos que el correo suscrito."
    >
      <LegalSection title="Solicitar la baja">
        <p>
          La baja aplica a marketing. Los mensajes necesarios para gestionar un pedido o reclamo en
          curso pueden continuar. También puedes pedirla por WhatsApp al +57 318 713 3439.
        </p>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="unsubscribe-email">Correo que deseas dar de baja</label>
            <input
              id="unsubscribe-email"
              name="email"
              type="email"
              autoComplete="email"
              spellCheck={false}
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="nombre@ejemplo.com"
            />
          </div>
          <button
            className={styles.submit}
            type="submit"
            disabled={state.kind === 'submitting' || !email.trim()}
          >
            {state.kind === 'submitting' ? 'Registrando baja…' : 'Darme de baja de marketing'}
          </button>
          <div aria-live="polite">
            {state.message && (
              <p className={state.kind === 'success' ? styles.success : styles.error}>
                {state.message}
              </p>
            )}
          </div>
        </form>
        <p>
          Conservaremos el identificador mínimo necesario en la lista de supresión para no volver a
          enviarte marketing. Consulta la <Link to="/privacidad">política de privacidad</Link>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

export function CopyrightClaimsPage() {
  const [state, setState] = useState<SubmitState>({ kind: 'idle' });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get('goodFaith') !== 'on') {
      setState({ kind: 'error', message: 'Confirma la declaración de buena fe para continuar.' });
      return;
    }

    setState({ kind: 'submitting' });
    try {
      await submitNetlifyForm('copyright-claim', {
        name: String(data.get('name') ?? '').trim(),
        email: String(data.get('email') ?? '').trim(),
        work: String(data.get('work') ?? '').trim(),
        location: String(data.get('location') ?? '').trim(),
        claim: String(data.get('claim') ?? '').trim(),
        submittedAt: new Date().toISOString(),
        goodFaith: true,
      });
      form.reset();
      setState({
        kind: 'success',
        message: 'Reclamo registrado. El equipo podrá contactarte para verificar la solicitud.',
      });
    } catch {
      setState({
        kind: 'error',
        message:
          'No pudimos registrar el reclamo. Inténtalo de nuevo o usa el WhatsApp +57 318 713 3439.',
      });
    }
  };

  return (
    <LegalLayout
      title="Reclamos de derechos de autor"
      intro="Canal para titulares o representantes que consideren que un contenido del sitio infringe sus derechos. No presentes datos confidenciales que no sean necesarios."
    >
      <LegalSection title="Presentar un reclamo">
        <p>
          Indica la obra, la ubicación exacta del contenido y por qué tienes derecho a reclamar.
          Revisaremos la solicitud de buena fe; una presentación no implica admisión ni retiro
          automático. Las notificaciones falsas pueden tener consecuencias legales.
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="copyright-name">Nombre del titular o representante</label>
            <input
              id="copyright-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              minLength={2}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="copyright-email">Correo de contacto</label>
            <input
              id="copyright-email"
              name="email"
              type="email"
              autoComplete="email"
              spellCheck={false}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="copyright-work">Obra o material protegido</label>
            <input id="copyright-work" name="work" type="text" required />
          </div>
          <div className={styles.field}>
            <label htmlFor="copyright-location">Enlace o ubicación exacta en este sitio</label>
            <input id="copyright-location" name="location" type="text" required />
          </div>
          <div className={styles.field}>
            <label htmlFor="copyright-claim">Explicación del reclamo y relación con la obra</label>
            <textarea id="copyright-claim" name="claim" required minLength={20} />
          </div>
          <label className={styles.checkbox}>
            <input name="goodFaith" type="checkbox" required />
            <span>
              Declaro de buena fe que la información es exacta y que soy el titular o estoy
              autorizado para actuar en su nombre.
            </span>
          </label>
          <button className={styles.submit} type="submit" disabled={state.kind === 'submitting'}>
            {state.kind === 'submitting' ? 'Registrando reclamo…' : 'Enviar reclamo'}
          </button>
          <div aria-live="polite">
            {state.message && (
              <p className={state.kind === 'success' ? styles.success : styles.error}>
                {state.message}
              </p>
            )}
          </div>
        </form>
        <p>
          Usaremos los datos únicamente para evaluar y responder el reclamo, según la{' '}
          <Link to="/privacidad">política de privacidad</Link>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
