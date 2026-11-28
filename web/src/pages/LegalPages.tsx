import { Link } from 'react-router-dom';
import { AI_CONTENT_NOTICE, CONTACT, LEGAL_VERSION, PROVIDERS } from '../content/legal.ts';
import LegalLayout, { LegalSection } from './LegalLayout.tsx';
import styles from './LegalLayout.module.css';

function ContactBlock() {
  return (
    <p className={styles.notice}>
      Responsable: <strong>Café El Regio</strong> · {CONTACT.location} · Privacidad, legal y
      derechos de autor: <a href={CONTACT.whatsappHref}>WhatsApp {CONTACT.whatsappDisplay}</a>. Las
      solicitudes sobre la marca aliada KMuffis se remitirán al contacto correspondiente cuando sea
      necesario.
    </p>
  );
}

export function PrivacyPage() {
  return (
    <LegalLayout
      title="Política de privacidad"
      intro="Explica qué datos usa Café El Regio, para qué, con qué proveedores y cómo ejercer tus derechos. Recogemos solo la información necesaria para cada gestión."
    >
      <LegalSection title="1. Responsable y alcance">
        <ContactBlock />
        <p>
          Aplica a este sitio, sus formularios y las conversaciones que inicias desde sus enlaces.
          No crea cuentas, no procesa pagos y no solicita documentos de identidad, contraseñas,
          datos financieros ni información sensible para hacer un pedido.
        </p>
      </LegalSection>

      <LegalSection title="2. Datos y finalidades">
        <ul>
          <li>
            <strong>Pedidos y eventos:</strong> productos, notas y, en eventos, nombre, teléfono,
            correo opcional y detalles del evento. Se usan para responder y coordinar la solicitud.
          </li>
          <li>
            <strong>Aceptación legal:</strong> nombre o identificador de la conversación, contacto
            cuando lo suministras, fecha, versión de términos y permiso de marketing independiente.
            Se usa para demostrar el consentimiento.
          </li>
          <li>
            <strong>Baja de marketing:</strong> correo y fecha de solicitud. Se conserva un registro
            mínimo de supresión para respetar tu decisión.
          </li>
          <li>
            <strong>Reclamos de autor:</strong> nombre, correo, obra, ubicación y fundamento del
            reclamo. Se usan para verificarlo y responderlo.
          </li>
          <li>
            <strong>Carrito y preferencias:</strong> se guardan localmente en tu navegador. No salen
            del dispositivo hasta que decides enviar un pedido o formulario.
          </li>
          <li>
            <strong>Datos técnicos:</strong> Netlify puede registrar IP, fecha, navegador y datos de
            seguridad necesarios para entregar y proteger el sitio.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Bases y permisos separados">
        <p>
          Tratamos datos para atender tus solicitudes, cumplir obligaciones legales y, cuando hayas
          aceptado los documentos, dejar constancia de esa aceptación. El envío de marketing exige
          una casilla opcional e independiente; aceptar términos, rechazar cookies o comprar no te
          suscribe a correos promocionales.
        </p>
        <p>
          Puedes retirar el marketing desde la <Link to="/baja">página de baja</Link>. Retirar un
          permiso no afecta la licitud del tratamiento previo ni los mensajes necesarios de un
          pedido en curso.
        </p>
      </LegalSection>

      <LegalSection title="4. Menores">
        <p>
          El sitio no está dirigido a menores de 14 años ni solicita su edad. Un menor no debe
          enviar datos personales: su padre, madre o tutor debe realizar la solicitud en su nombre.
          Si un evento involucra menores, no incluyas sus datos en el formulario; el equipo pedirá
          autorización parental verificable por separado solo si fuera indispensable.
        </p>
      </LegalSection>

      <LegalSection title="5. Proveedores y transferencias">
        <p>
          No vendemos datos ni usamos analítica, píxeles publicitarios o SDKs de seguimiento. Al
          abrir un servicio externo se aplican sus políticas y puede haber tratamiento fuera de
          Colombia. Estos son los destinos actuales:
        </p>
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>Proveedor</th>
                <th>Finalidad y datos</th>
                <th>Cuándo</th>
              </tr>
            </thead>
            <tbody>
              {PROVIDERS.map((provider) => (
                <tr key={provider.name}>
                  <td>{provider.name}</td>
                  <td>
                    {provider.purpose} {provider.data}
                  </td>
                  <td>{provider.trigger}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title="6. Conservación y seguridad">
        <p>
          Conservamos cada registro durante la relación y los plazos necesarios para responder,
          acreditar consentimientos, atender reclamos y cumplir obligaciones legales. La lista de
          supresión se mantiene de forma mínima para evitar nuevos envíos. El carrito y las cookies
          de preferencia permanecen en tu navegador hasta que los elimines o cambies.
        </p>
        <p>
          Aplicamos controles razonables como HTTPS, restricciones de acceso y minimización. Ningún
          sistema es infalible: no prometemos seguridad absoluta ni una disponibilidad
          ininterrumpida.
        </p>
      </LegalSection>

      <LegalSection title="7. Tus derechos">
        <p>
          Puedes solicitar acceso, corrección, actualización, supresión, revocatoria u oposición, y
          presentar quejas ante la autoridad de protección de datos que corresponda. Escríbenos por
          el canal del responsable. Verificaremos la identidad de forma proporcionada, sin pedir
          documentos innecesarios, y responderemos dentro de los plazos legales aplicables.
        </p>
        <p>{AI_CONTENT_NOTICE}</p>
      </LegalSection>
    </LegalLayout>
  );
}

export function TermsPage() {
  return (
    <LegalLayout
      title="Términos y condiciones"
      intro={`Condiciones generales para usar el sitio y coordinar pedidos con Café El Regio. Versión ${LEGAL_VERSION}.`}
    >
      <LegalSection title="1. Aceptación y registro">
        <ContactBlock />
        <p>
          Para enviar un pedido o una solicitud de evento debes marcar la aceptación de estos
          términos y de la <Link to="/privacidad">política de privacidad</Link>. Registramos la
          fecha, versión, contexto e identificador de aceptación. El marketing requiere otro
          permiso, opcional y separado.
        </p>
        <p>
          Si eres menor de 14 años, tu padre, madre o tutor debe gestionar la solicitud. Si eres
          mayor de 14 pero menor de edad, usa el sitio con participación y supervisión de tu tutor.
        </p>
      </LegalSection>

      <LegalSection title="2. Pedidos, precios y disponibilidad">
        <p>
          El catálogo puede incluir productos y precios por confirmar. Enviar el mensaje por
          WhatsApp no confirma existencias, aceptación del pedido ni reserva. El equipo confirmará
          productos, cantidades, disponibilidad, fecha, domicilio y forma de pago antes de cobrar.
        </p>
        <p>
          El total final, incluidos domicilio y cualquier otro costo aplicable, se informa antes del
          pago. No se añadirán cargos ocultos ni cargos no aceptados. No hay pagos dentro del sitio.
          No prometemos entrega inmediata, cobertura nacional ni disponibilidad permanente.
        </p>
      </LegalSection>

      <LegalSection title="3. Cancelaciones, cambios y reembolsos">
        <p>
          La <Link to="/reembolsos">política de reembolsos</Link> regula cancelaciones, productos
          incorrectos o defectuosos y devoluciones. Los derechos irrenunciables del consumidor y las
          normas colombianas aplicables prevalecen sobre cualquier restricción de estos textos.
        </p>
        <p>
          Actualmente no ofrecemos suscripciones ni renovaciones automáticas. Antes de activarlas se
          publicarán precio, periodicidad, renovación y un mecanismo de cancelación accesible.
        </p>
      </LegalSection>

      <LegalSection title="4. Uso permitido y contenido">
        <ul>
          <li>No uses el sitio para fraude, suplantación, vulneración de seguridad o spam.</li>
          <li>No envíes datos de terceros sin autorización ni contenido ilícito.</li>
          <li>No copies marcas, logos, fotografías o videos sin permiso de sus titulares.</li>
          <li>
            No publicamos reseñas falsas, respaldos inventados ni certificaciones no obtenidas.
          </li>
        </ul>
        <p>{AI_CONTENT_NOTICE}</p>
        <p>
          Los reclamos de propiedad intelectual se reciben en{' '}
          <Link to="/reclamos-derechos-autor">este canal</Link>. Las marcas de terceros pertenecen a
          sus titulares; su mención no implica respaldo.
        </p>
      </LegalSection>

      <LegalSection title="5. Responsabilidad y cambios">
        <p>
          Procuramos información clara y un servicio continuo, pero el sitio puede tener errores,
          mantenimiento o interrupciones. No garantizamos disponibilidad ininterrumpida ni
          resultados comerciales. Nada limita derechos o responsabilidades que la ley no permita
          excluir.
        </p>
        <p>
          Publicaremos la fecha y versión de cada cambio. Si una modificación afecta una compra ya
          confirmada, se aplicará la versión aceptada salvo que la ley o un acuerdo posterior digan
          otra cosa.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

export function RefundsPage() {
  return (
    <LegalLayout
      title="Política de reembolsos"
      intro="Reglas generales para cancelar un pedido y solicitar corrección o devolución. Los derechos legales irrenunciables siempre prevalecen."
    >
      <LegalSection title="1. Cancelar antes de la preparación">
        <ContactBlock />
        <p>
          Puedes solicitar la cancelación por WhatsApp con el identificador o la conversación del
          pedido. Si aún no empieza la preparación o personalización, se cancela sin costo y se
          devuelve cualquier pago recibido. Si ya empezó, informaremos de manera previa y
          transparente cualquier costo real e in recuperable que la ley permita descontar; nunca
          habrá cargos sorpresa.
        </p>
      </LegalSection>

      <LegalSection title="2. Productos incorrectos, dañados o defectuosos">
        <p>
          Informa el problema dentro de los 5 días calendario siguientes a la entrega. En alimentos,
          bebidas u otros productos perecederos, repórtalo idealmente dentro de las 24 horas para
          poder evaluar su estado. Indica el pedido, describe el problema y adjunta fotos
          razonables; no envíes documentos ni datos sensibles innecesarios.
        </p>
        <p>
          Si el error es nuestro o el producto presenta un defecto cubierto, podrás elegir entre las
          soluciones legalmente disponibles: corrección, reposición o reembolso. En ese caso
          asumiremos los costos razonables de devolución cuando corresponda.
        </p>
      </LegalSection>

      <LegalSection title="3. Exclusiones proporcionadas">
        <p>
          Por higiene y seguridad no se aceptan devoluciones por cambio de preferencia de alimentos
          o bebidas abiertos, ni de artículos personalizados ya elaborados, salvo defecto, error o
          un derecho legal aplicable. Estas reglas no limitan garantías, retracto, reversión de pago
          ni otros derechos irrenunciables.
        </p>
      </LegalSection>

      <LegalSection title="4. Tiempo y método de devolución">
        <p>
          Confirmaremos la decisión por el mismo canal. Los reembolsos aprobados se ordenarán dentro
          de los 10 días hábiles siguientes, preferiblemente por el mismo método de pago. La entidad
          financiera puede tardar tiempo adicional; informaremos cualquier demora atribuible al
          equipo. No cobraremos una tarifa por tramitar un reembolso aprobado.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

export function CookiesPage() {
  return (
    <LegalLayout
      title="Política de cookies"
      intro="Controla el almacenamiento local y las futuras tecnologías opcionales. Rechazar no bloquea el catálogo, los pedidos ni la navegación."
    >
      <LegalSection title="1. Situación actual">
        <p>
          No hay analítica, píxeles publicitarios, cookies de terceros ni SDKs de seguimiento. La
          política CSP publicada limita scripts, conexiones, imágenes y medios a este mismo origen.
          Ninguna integración opcional puede cargarse sin el permiso correspondiente y una revisión
          previa de privacidad.
        </p>
        <p>
          <button
            type="button"
            className={styles.submit}
            onClick={() => window.dispatchEvent(new Event('regio:open-cookie-settings'))}
          >
            Abrir preferencias de cookies
          </button>
        </p>
      </LegalSection>
      <LegalSection title="2. Almacenamiento utilizado">
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>Identificador</th>
                <th>Finalidad</th>
                <th>Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>cafe_el_regio_cart</td>
                <td>Conservar tu carrito en este navegador.</td>
                <td>Hasta vaciar el carrito o borrar los datos.</td>
              </tr>
              <tr>
                <td>cafe_el_regio_cookie_preferences</td>
                <td>Recordar tu selección de cookies.</td>
                <td>Hasta cambiarla o borrar los datos.</td>
              </tr>
              <tr>
                <td>cafe_el_regio_terms_acceptance</td>
                <td>Mostrar localmente la última aceptación registrada.</td>
                <td>Hasta borrar los datos del sitio.</td>
              </tr>
              <tr>
                <td>Páginas del editor local</td>
                <td>Función de edición local, sin publicidad.</td>
                <td>Hasta borrar los datos del sitio.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalSection>
      <LegalSection title="3. Cambiar o retirar el permiso">
        <p>
          Abre las preferencias y desmarca analítica o marketing. La selección se guarda solo en tu
          navegador y no constituye permiso para enviarte correos promocionales. La baja de correos
          se gestiona por separado en <Link to="/baja">esta página</Link>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

export function LicensesPage() {
  return (
    <LegalLayout
      title="Licencias y contenido"
      intro="Información sobre código abierto, tipografías, marcas y contenido audiovisual utilizado en el sitio."
    >
      <LegalSection title="1. Código y tipografías">
        <p>
          React, React DOM, React Router, Zustand y Craft.js se distribuyen bajo licencia MIT. Las
          herramientas de compilación y sus avisos adicionales se incluyen en{' '}
          <a href="/third-party-notices.txt" target="_blank" rel="noreferrer">
            los avisos de terceros
          </a>
          . El código propio del proyecto no se ofrece bajo una licencia abierta por este aviso.
        </p>
        <p>
          No descargamos fuentes web: se usan pilas tipográficas del sistema. No se cargan fuentes
          de Google, Adobe ni otros CDN.
        </p>
      </LegalSection>
      <LegalSection title="2. Marcas, imágenes y videos">
        <p>
          Café El Regio y KMuffis conservan los derechos de sus respectivas identidades. La
          presencia de una marca aliada no equivale a testimonio de clientes ni respaldo comercial.
          No reuses logos, fotos, videos ni ilustraciones sin autorización del titular.
        </p>
        <p>{AI_CONTENT_NOTICE}</p>
        <p>
          El póster promocional navideño conserva metadatos C2PA de procedencia generativa. No se
          eliminan deliberadamente esas señales. La procedencia y los permisos de cada recurso se
          revisan en el inventario interno antes de nuevas publicaciones.
        </p>
      </LegalSection>
      <LegalSection title="3. Reclamos">
        <p>
          Para pedir revisión o retiro de un contenido por derechos de autor, usa el{' '}
          <Link to="/reclamos-derechos-autor">canal de reclamos</Link>. No prometemos
          certificaciones de seguridad, premios o afiliaciones que no consten documentalmente.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

export function NotFoundPage() {
  return (
    <LegalLayout title="Página no encontrada" intro="La dirección no existe o cambió.">
      <LegalSection title="Volver al inicio">
        <p>
          Revisa la dirección o <Link to="/">regresa a Café El Regio</Link>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
