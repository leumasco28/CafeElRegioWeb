import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../content/catalog.ts';
import { site } from '../../content/site.ts';
import { formatAcceptanceForMessage, recordTermsAcceptance } from '../../lib/acceptance.ts';
import { buildOrderMessage, buildWhatsAppUrl, formatCOP, type OrderItem } from '../../lib/order.ts';
import { useCart } from '../../context/CartContext.tsx';
import styles from './CartDrawer.module.css';

type CartDrawerProps = { isOpen: boolean; onClose: () => void };

function CartItemRow({
  productId,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: {
  productId: string;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}) {
  const product = products.find((item) => item.id === productId);
  const name = product?.name ?? productId;
  const price = typeof product?.price === 'number' ? product.price : null;
  return (
    <li className={styles.cartItem}>
      <div className={styles.itemInfo}>
        <strong className={styles.itemName}>{name}</strong>
        <span
          className={styles.itemPrice}
          style={price === null ? { color: 'var(--color-muted)' } : undefined}
        >
          {price === null ? 'Precio por confirmar' : formatCOP(price)}
        </span>
      </div>
      <div className={styles.itemControls}>
        <button
          type="button"
          className={styles.qtyButton}
          onClick={onDecrease}
          aria-label={`Reducir ${name}`}
        >
          −
        </button>
        <span className={styles.qtyValue} aria-label={`Cantidad: ${quantity}`}>
          {quantity}
        </span>
        <button
          type="button"
          className={styles.qtyButton}
          onClick={onIncrease}
          aria-label={`Aumentar ${name}`}
        >
          +
        </button>
        <button
          type="button"
          className={styles.removeButton}
          onClick={onRemove}
          aria-label={`Quitar ${name}`}
        >
          ×
        </button>
      </div>
    </li>
  );
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, totalLabel, addItem, removeItem, setQuantity, clearCart } = useCart();
  const [redirecting, setRedirecting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [message, setMessage] = useState('');
  const panelRef = useRef<HTMLDivElement | null>(null);
  const termsRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLButtonElement>('button')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !redirecting) {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
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
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [isOpen, onClose, redirecting]);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    if (!termsAccepted) {
      setMessage('Acepta los términos y la política de privacidad para continuar.');
      termsRef.current?.focus();
      return;
    }

    setRedirecting(true);
    setMessage('');
    try {
      const acceptance = await recordTermsAcceptance({ context: 'pedido' });
      const orderItems: OrderItem[] = items.map((cartItem) => {
        const product = products.find((item) => item.id === cartItem.productId);
        return {
          name: product?.name ?? cartItem.productId,
          quantity: cartItem.quantity,
          price: typeof product?.price === 'number' ? product.price : null,
        };
      });
      const order = buildOrderMessage({ items: orderItems });
      const url = order
        ? buildWhatsAppUrl(`${order}\n${formatAcceptanceForMessage(acceptance)}`)
        : null;
      if (!url) throw new Error('Pedidos no disponibles');
      const win = window.open(url, '_blank', 'noopener,noreferrer');
      if (!win) window.location.href = url;
      clearCart();
      setRedirecting(false);
    } catch {
      setMessage(
        'No pudimos registrar la aceptación. Revisa la conexión e inténtalo de nuevo; tu carrito se conserva.'
      );
      setRedirecting(false);
    }
  };

  const handleClear = () => {
    if (window.confirm('¿Vaciar todos los productos del carrito?')) clearCart();
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !redirecting) onClose();
      }}
    >
      <div
        className={styles.panel}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Cerrar carrito"
          disabled={redirecting}
        >
          ×
        </button>
        <h2 id="cart-title" className={styles.title}>
          Tu carrito
        </h2>
        {items.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyText}>Tu carrito está vacío.</p>
            <p className={styles.emptyHint}>
              Agrega productos desde la carta para armar tu pedido.
            </p>
          </div>
        ) : (
          <>
            <ul className={styles.list}>
              {items.map((cartItem) => (
                <CartItemRow
                  key={cartItem.productId}
                  productId={cartItem.productId}
                  quantity={cartItem.quantity}
                  onIncrease={() => addItem(cartItem.productId, 1)}
                  onDecrease={() => setQuantity(cartItem.productId, cartItem.quantity - 1)}
                  onRemove={() => removeItem(cartItem.productId)}
                />
              ))}
            </ul>
            <div className={styles.total}>
              <span className={styles.totalLabel}>Total estimado</span>
              <span className={styles.totalValue}>{totalLabel ?? 'Precio por confirmar'}</span>
            </div>
            <label className={styles.consent} htmlFor="cart-terms">
              <input
                id="cart-terms"
                ref={termsRef}
                type="checkbox"
                checked={termsAccepted}
                onChange={(event) => {
                  setTermsAccepted(event.target.checked);
                  setMessage('');
                }}
                aria-invalid={!!message && !termsAccepted}
                required
              />
              <span>
                Acepto los{' '}
                <Link to="/terminos" target="_blank">
                  términos
                </Link>{' '}
                y la{' '}
                <Link to="/privacidad" target="_blank">
                  política de privacidad
                </Link>
                . Registraré la fecha y versión de esta aceptación.
              </span>
            </label>
            <button
              type="button"
              className={styles.checkout}
              disabled={redirecting}
              onClick={handleCheckout}
            >
              {redirecting ? 'Registrando aceptación…' : 'Continuar a WhatsApp'}
            </button>
            <button type="button" className={styles.clear} onClick={handleClear}>
              Vaciar carrito
            </button>
          </>
        )}
        <p className={styles.note}>
          El pedido se coordina por WhatsApp ({site.contact.whatsappDisplay}). El total final y
          cualquier domicilio se confirman antes de pagar; no hay cargos ocultos.
        </p>
        <p className={styles.error} aria-live="polite">
          {message}
        </p>
      </div>
    </div>
  );
}
