/**
 * Contexto del carrito de compras (Fase 2).
 *
 * - Estado: items del carrito (productId + cantidad).
 * - Persistencia: localStorage (clave cafe_el_regio_cart).
 * - Derivados: cantidad total de ítems y monto total según precios del catálogo.
 * - No se almacenan datos sensibles ni de pago.
 */

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { products } from '../content/catalog.ts';
import { formatCOP } from '../lib/order.ts';

const STORAGE_KEY = 'cafe_el_regio_cart';

export type CartItem = {
  productId: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  itemCount: number;
  total: number;
  totalLabel: string | null;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (item: CartItem) =>
            item &&
            typeof item.productId === 'string' &&
            typeof item.quantity === 'number' &&
            item.quantity > 0
        );
      }
    }
  } catch {
    // localStorage inaccesible o valor corrupto: iniciar carrito vacío.
  }
  return [];
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Cargar carrito guardado en localStorage usando inicializadora perezosa.
  const [items, setItems] = useState<CartItem[]>(loadCart);

  // Persistir carrito en localStorage en cada cambio.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage inaccesible: no se persiste, pero el carrito funciona en sesión.
    }
  }, [items]);

  const addItem = useCallback((productId: string, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { productId, quantity }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const setQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId);
        return;
      }
      setItems((prev) =>
        prev.map((item) => (item.productId === productId ? { ...item, quantity } : item))
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const total = items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    const price = typeof product?.price === 'number' ? product.price : 0;
    return sum + price * item.quantity;
  }, 0);

  const totalLabel = formatCOP(total > 0 ? total : null);

  const value: CartContextType = {
    items,
    itemCount,
    total,
    totalLabel,
    addItem,
    removeItem,
    setQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart debe usarse dentro de un CartProvider.');
  }
  return ctx;
}
