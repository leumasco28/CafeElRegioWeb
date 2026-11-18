/**
 * Cajón del carrito de compras (Fase 2).
 *
 * Muestra los ítems agregados, permite ajustar cantidades, eliminar ítems y
 * generar el enlace de WhatsApp para enviar el pedido. No almacena ni envía
 * datos de pago.
 */

import { useCallback, useState } from 'react';
import { products } from '../../content/catalog.ts';
import { site } from '../../content/site.ts';
import { buildOrderMessage, buildWhatsAppUrl, formatCOP, type OrderItem } from '../../lib/order.ts';
import { useCart } from '../../context/CartContext.tsx';
import styles from './CartDrawer.module.css';

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

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
  const product = products.find((p) => p.id === productId);
  const name = product?.name ?? productId;
  const price = typeof product?.price === 'number' ? product.price : null;

  return (
    <li className={styles.cartItem}>
      <div className={styles.itemInfo}>
        <strong className={styles.itemName}>{name}</strong>
        {typeof price === 'number' ? (
          <span className={styles.itemPrice}>{formatCOP(price)}</span>
        ) : (
          <span className={styles.itemPrice} style={{ color: 'var(--color-muted)' }}>
            precio por confirmar
          </span>
        )}
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
        <span className={styles.qtyValue}>{quantity}</span>
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

  const handleCheckout = useCallback(() => {
    if (items.length === 0) return;
    setRedirecting(true);

    const orderItems: OrderItem[] = items.map((cartItem) => {
      const product = products.find((p) => p.id === cartItem.productId);
      return {
        name: product?.name ?? cartItem.productId,
        quantity: cartItem.quantity,
        price: typeof product?.price === 'number' ? product.price : null,
      };
    });

    const message = buildOrderMessage({ items: orderItems });
    const url = message ? buildWhatsAppUrl(message) : null;

    if (url) {
      const win = window.open(url, '_blank', 'noopener,noreferrer');
      if (!win) {
        window.location.href = url;
      }
      setRedirecting(false);
      clearCart();
    } else {
      setRedirecting(false);
    }
  }, [items, clearCart]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.panel}>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Cerrar carrito"
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
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalValue}>{totalLabel ?? 'Precio por confirmar'}</span>
            </div>

            <button
              type="button"
              className={styles.checkout}
              disabled={redirecting}
              onClick={handleCheckout}
            >
              {redirecting ? 'Abriendo WhatsApp…' : 'Enviar pedido por WhatsApp'}
            </button>

            <button type="button" className={styles.clear} onClick={clearCart}>
              Vaciar carrito
            </button>
          </>
        )}

        <p className={styles.note}>
          Los pedidos se coordinan por WhatsApp ({site.contact.whatsappDisplay}). Los pagos se
          acuerdan directamente con el equipo de Café El Regio.
        </p>
      </div>
    </div>
  );
}
