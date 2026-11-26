import { useState, useMemo, useEffect, useRef } from 'react';
import styles from './ChristmasCardSection.module.css';

/**
 * Sección de Carta Navideña - adaptada del diseño HTML original
 * Se inserta antes de la sección de la carta (CartaPreview)
 * Incluye estado interactivo completo para selección de empaque y productos
 */
export default function ChristmasCardSection() {
  // Estado para el empaque seleccionado (solo uno)
  const [selectedPackaging, setSelectedPackaging] = useState<string | null>(null);

  // Estado para cantidades de productos
  const [productQuantities, setProductQuantities] = useState<Record<string, number>>({});

  // Estado para nota de regalo
  const [giftNote, setGiftNote] = useState('');

  // Datos de empaques navideños
  const packagingOptions = useMemo(
    () => [
      {
        id: 'bolsa-kraft',
        name: 'Bolsa Kraft',
        subtitle: 'Con corbata verde navideña',
        price: 13500,
        badge: 'Económica y elegante',
        image: '/assets/christmas/01_bolsa_kraft_corbata_verde.png',
      },
      {
        id: 'caja-blanca',
        name: 'Caja Blanca',
        subtitle: 'Diseño navideño impreso',
        price: 18000,
        badge: 'Clásica',
        image: '/assets/christmas/02_caja_opcion_1_blanca.png',
      },
      {
        id: 'caja-blanca-sticker',
        name: 'Caja Blanca Sticker',
        subtitle: 'Caja blanca con sello central',
        price: 18000,
        badge: 'Minimalista',
        image: '/assets/christmas/03_caja_opcion_2_blanca_sticker.png',
      },
      {
        id: 'caja-kraft-baul',
        name: 'Kraft Baúl',
        subtitle: 'Caja kraft con moño verde',
        price: 18000,
        badge: 'Favorita',
        image: '/assets/christmas/04_caja_opcion_3_kraft_baul.png',
      },
    ],
    []
  );

  const productItems = useMemo(
    () => [
      {
        id: 'vela-taza',
        name: 'Vela Taza Café',
        description:
          'Vela artesanal aromática servida en pocillo blanco con detalle de corazón en relieve.',
        price: 12000,
        tag: 'Aroma a Café',
        image: '/assets/christmas/05_vela_taza_cafe.png',
      },
      {
        id: 'vela-bebida-fria',
        name: 'Vela Bebida Fría',
        description:
          'Vela artesanal en frasco de vidrio estilo iced coffee con etiqueta vintage "Bebida Helada".',
        price: 15000,
        tag: 'Edición Especial',
        image: '/assets/christmas/06_vela_bebida_fria.png',
      },
      {
        id: 'jabon-cafe',
        name: 'Jabón de Café',
        description:
          'Hecho a mano, exfoliante natural con granos de café y sello central de corazón.',
        price: 13000,
        tag: '100% Natural',
        image: '/assets/christmas/07_jabon_de_cafe.png',
      },
      {
        id: 'pocillo-ceramica',
        name: 'Pocillo Cerámica',
        description:
          'Pocillo clásico crema con frase "Coffee - It\'s Coffee Time" e ilustración de taza humeante.',
        price: 7000,
        tag: 'Clásico Regio',
        image: '/assets/christmas/08_pocillo_ceramica.png',
      },
    ],
    []
  );

  // Handlers
  const handlePackagingSelect = (id: string) => {
    setSelectedPackaging(id === selectedPackaging ? null : id);
  };

  const handleQuantityChange = (productId: string, delta: number) => {
    setProductQuantities((prev) => {
      const current = prev[productId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [productId]: next };
    });
  };

  const handleSelectAllProducts = () => {
    const allSelected = productItems.every((p) => (productQuantities[p.id] || 0) > 0);
    if (allSelected) {
      // Deseleccionar todos
      setProductQuantities({});
    } else {
      // Seleccionar 1 de cada uno
      const newQuantities: Record<string, number> = {};
      productItems.forEach((p) => {
        newQuantities[p.id] = 1;
      });
      setProductQuantities(newQuantities);
    }
  };

  const handleReset = () => {
    setSelectedPackaging(null);
    setProductQuantities({});
    setGiftNote('');
  };

  const handleCopyOrder = () => {
    const selectedPkg = packagingOptions.find((p) => p.id === selectedPackaging);
    const selectedProducts = productItems
      .filter((p) => (productQuantities[p.id] || 0) > 0)
      .map((p) => `${p.name} x${productQuantities[p.id]}`);

    let text = '📦 Pedido Navidad - Café El Regio\n\n';
    if (selectedPkg) {
      text += `Empaque: ${selectedPkg.name} (${selectedPkg.subtitle}) - $${selectedPkg.price.toLocaleString('es-CO')}\n`;
    }
    if (selectedProducts.length > 0) {
      text += '\nProductos:\n';
      selectedProducts.forEach((p) => (text += `• ${p}\n`));
    }
    if (giftNote.trim()) {
      text += `\n📝 Nota: ${giftNote}\n`;
    }
    const total = calculateTotal();
    text += `\n💰 Total: $${total.toLocaleString('es-CO')} COP`;

    navigator.clipboard.writeText(text);
    alert('¡Pedido copiado al portapapeles!');
  };

  const handleWhatsAppOrder = () => {
    const selectedPkg = packagingOptions.find((p) => p.id === selectedPackaging);
    const selectedProducts = productItems
      .filter((p) => (productQuantities[p.id] || 0) > 0)
      .map((p) => `${p.name} x${productQuantities[p.id]}`);

    if (!selectedPkg && selectedProducts.length === 0) {
      alert('Por favor selecciona al menos un empaque o producto');
      return;
    }

    let text = 'Hola El Regio Café, quisiera pedir mi Kit Navideño:\n\n';
    if (selectedPkg) {
      text += `📦 Empaque: ${selectedPkg.name} (${selectedPkg.subtitle}) - $${selectedPkg.price.toLocaleString('es-CO')}\n`;
    }
    if (selectedProducts.length > 0) {
      text += '\n🎁 Productos:\n';
      selectedProducts.forEach((p) => (text += `• ${p}\n`));
    }
    if (giftNote.trim()) {
      text += `\n📝 Nota para la tarjeta: ${giftNote}\n`;
    }
    const total = calculateTotal();
    text += `\n💰 Total estimado: $${total.toLocaleString('es-CO')} COP`;

    const url = `https://wa.me/573187133439?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Cálculos memoizados
  const packagingTotal = useMemo(() => {
    if (!selectedPackaging) return 0;
    const pkg = packagingOptions.find((p) => p.id === selectedPackaging);
    return pkg?.price || 0;
  }, [selectedPackaging, packagingOptions]);

  const productsTotal = useMemo(() => {
    return productItems.reduce((sum, p) => {
      const qty = productQuantities[p.id] || 0;
      return sum + p.price * qty;
    }, 0);
  }, [productQuantities, productItems]);

  const totalItems = useMemo(() => {
    return Object.values(productQuantities).reduce((sum, qty) => sum + qty, 0);
  }, [productQuantities]);

  const calculateTotal = () => packagingTotal + productsTotal;

  const isAnyProductSelected = totalItems > 0;
  const allProductsSelected = productItems.every((p) => (productQuantities[p.id] || 0) > 0);

  // Floating summary box state
  const [isFloating, setIsFloating] = useState(false);
  const [showFloating, setShowFloating] = useState(false);
  const sectionRef = useRef<HTMLSectionElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for floating summary
  useEffect(() => {
    const section = sectionRef.current;
    const placeholder = placeholderRef.current;
    if (!section || !placeholder) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When the placeholder (original summary position) goes out of view, show floating
          setShowFloating(!entry.isIntersecting);
        });
      },
      {
        root: null,
        threshold: 0,
        rootMargin: '0px 0px -100px 0px', // Trigger 100px before placeholder leaves viewport
      }
    );

    observer.observe(placeholder);
    return () => observer.disconnect();
  }, [placeholder]);

  // Handle scroll for floating animation
  useEffect(() => {
    if (!showFloating) return;

    const handleScroll = () => {
      const section = sectionRef.current;
      const summary = summaryRef.current;
      if (!section || !summary) return;

      const sectionRect = section.getBoundingClientRect();
      const summaryRect = summary.getBoundingClientRect();
      const sectionBottom = sectionRect.bottom;
      const summaryHeight = summaryRect.height;
      const viewportHeight = window.innerHeight;

      // Stop floating when we reach the bottom of the section
      if (sectionBottom < viewportHeight - summaryHeight + 20) {
        setIsFloating(false);
      } else {
        setIsFloating(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showFloating]);

  return (
    <section id="carta-navidenas" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          {/* Header Section */}
          <header className={styles.header}>
            {/* Decorative Corner Elements */}
            <div className={styles.cornerDecoration} aria-hidden="true">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 5 C35 10, 60 25, 85 5"
                  stroke="#1B4332"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M5 5 C10 35, 25 60, 5 85"
                  stroke="#1B4332"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M18 8 L26 18 M32 10 L38 22 M46 11 L50 22 M60 10 L62 20"
                  stroke="#2D6A4F"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M8 18 L18 26 M10 32 L22 38 M11 46 L22 50 M10 60 L20 62"
                  stroke="#2D6A4F"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="16" cy="16" r="3.5" fill="#9B2226" />
                <circle cx="24" cy="12" r="2.5" fill="#9B2226" />
                <circle cx="12" cy="24" r="2.5" fill="#9B2226" />
                <polygon
                  points="45,32 47,37 52,37 48,40 49,45 45,42 41,45 42,40 38,37 43,37"
                  fill="#D4AF37"
                />
              </svg>
            </div>
            <div className={styles.cornerDecorationRight} aria-hidden="true">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 5 C35 10, 60 25, 85 5"
                  stroke="#1B4332"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M5 5 C10 35, 25 60, 5 85"
                  stroke="#1B4332"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M18 8 L26 18 M32 10 L38 22 M46 11 L50 22 M60 10 L62 20"
                  stroke="#2D6A4F"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M8 18 L18 26 M10 32 L22 38 M11 46 L22 50 M10 60 L20 62"
                  stroke="#2D6A4F"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="16" cy="16" r="3.5" fill="#9B2226" />
                <circle cx="24" cy="12" r="2.5" fill="#9B2226" />
                <circle cx="12" cy="24" r="2.5" fill="#9B2226" />
                <polygon
                  points="45,32 47,37 52,37 48,40 49,45 45,42 41,45 42,40 38,37 43,37"
                  fill="#D4AF37"
                />
              </svg>
            </div>

            {/* Logo/Brand */}
            <div className={styles.logoWrapper}>
              <div className={styles.logoCircle}>
                <svg
                  viewBox="0 0 120 120"
                  className={styles.logoSvg}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="60"
                    cy="40"
                    rx="46"
                    ry="11"
                    fill="#C8B08A"
                    stroke="#261613"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M35 38 C36 16, 84 16, 85 38 Z"
                    fill="#E6D5B8"
                    stroke="#261613"
                    strokeWidth="2.5"
                  />
                  <path d="M36 33 Q60 38 84 33" stroke="#3E2723" strokeWidth="4" fill="none" />
                  <rect
                    x="33"
                    y="45"
                    width="23"
                    height="14"
                    rx="4"
                    fill="#1A1A1A"
                    stroke="#D4AF37"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="64"
                    y="45"
                    width="23"
                    height="14"
                    rx="4"
                    fill="#1A1A1A"
                    stroke="#D4AF37"
                    strokeWidth="1.5"
                  />
                  <line x1="56" y1="49" x2="64" y2="49" stroke="#D4AF37" strokeWidth="2" />
                  <line
                    x1="38"
                    y1="48"
                    x2="43"
                    y2="55"
                    stroke="#FAF6F0"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                  <line
                    x1="69"
                    y1="48"
                    x2="74"
                    y2="55"
                    stroke="#FAF6F0"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                  <path
                    d="M60 66 C52 60, 35 62, 31 73 C39 76, 51 74, 60 69 C69 74, 81 76, 89 73 C85 62, 68 60, 60 66 Z"
                    fill="#FAF6F0"
                    stroke="#261613"
                    strokeWidth="2"
                  />
                  <circle cx="22" cy="58" r="2" fill="#D4AF37" />
                  <circle cx="98" cy="58" r="2" fill="#D4AF37" />
                  <rect
                    x="18"
                    y="81"
                    width="84"
                    height="18"
                    rx="3"
                    fill="#FAF6F0"
                    stroke="#D4AF37"
                    strokeWidth="1.5"
                  />
                  <text
                    x="60"
                    y="93"
                    fontFamily="Georgia, serif"
                    fontWeight="800"
                    fontSize="11.5"
                    fill="#3E2723"
                    textAnchor="middle"
                    letterSpacing="0.5"
                  >
                    EL REGIO
                  </text>
                  <text
                    x="60"
                    y="108"
                    fontFamily="Georgia, serif"
                    fontWeight="700"
                    fontSize="7.5"
                    fill="#D4AF37"
                    textAnchor="middle"
                    letterSpacing="3"
                  >
                    CAFÉ
                  </text>
                </svg>
              </div>
            </div>

            {/* Motto */}
            <div className={styles.mottoWrapper}>
              <span className={styles.divider}></span>
              <p className={styles.motto}>« Hecha a mano, por encargo »</p>
              <span className={styles.divider}></span>
            </div>

            {/* Main Title */}
            <h1 className={styles.mainTitle}>CARTA NAVIDEÑA</h1>
            <p className={styles.subTitleCentered}>— PERSONALIZA TU KIT —</p>

            {/* Emotional Subtitle */}
            <p className={styles.emotionalSubtitle}>
              Un detalle cálido con aroma a café artesanal, pensado para tu equipo o para ese amigo
              cercano o que esta lejos. Selecciona tu empaque favorito y arma tu caja a medida.
            </p>

            {/* CTA Buttons */}
            <div className={styles.headerActions}>
              <a href="#paso-1" className={styles.primaryCTA}>
                Comenzar a armar mi kit
              </a>
              <a
                href="https://wa.me/573187133439?text=Hola%20El%20Regio%20Caf%C3%A9%2C%20quisiera%20informaci%C3%B3n%20sobre%20los%20Kits%20Navide%C3%B1os."
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryCTA}
              >
                Asesoría directa
              </a>
            </div>
          </header>

          {/* Step 1: Elige tu Empaque */}
          <section id="paso-1" className={styles.stepSection}>
            <div className={styles.stepHeader}>
              <span className={styles.stepBadge}>Paso 1 de 2</span>
              <h2 className={styles.stepTitle}>Elige tu Empaque Navideño</h2>
              <p className={styles.stepSubtitle}>
                Haz clic sobre la presentación que más te guste para seleccionarla
              </p>
            </div>

            <div className={styles.packagingGrid}>
              {packagingOptions.map((pkg) => {
                const isSelected = selectedPackaging === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    className={`${styles.packagingCard} ${isSelected ? styles.selected : ''}`}
                    onClick={() => handlePackagingSelect(pkg.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handlePackagingSelect(pkg.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={pkg.name}
                    aria-pressed={isSelected}
                  >
                    <div className={styles.badgeWrapper}>
                      <span className={styles.badge}>{pkg.badge}</span>
                      <div className={`${styles.checkCircle} ${isSelected ? styles.selected : ''}`}>
                        ✓
                      </div>
                    </div>

                    <div className={styles.iconWrapper}>
                      <img src={pkg.image} alt={pkg.name} className={styles.packagingImage} />
                    </div>

                    <div className={styles.infoWrapper}>
                      <h3 className={styles.packagingName}>{pkg.name}</h3>
                      <p className={styles.packagingSubtitle}>{pkg.subtitle}</p>
                      <div
                        className={`${styles.priceWrapper} ${isSelected ? styles.selected : ''}`}
                      >
                        <span className={styles.price}>${pkg.price.toLocaleString('es-CO')}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.noteBox}>
              <span>🎁</span>
              <p>
                Todas las cajas incluyen espacio perfecto y viruta decorativa para armar tu kit de 4
                productos.
              </p>
            </div>
          </section>

          {/* Step 2: Arma tu Kit */}
          <section id="paso-2" className={styles.stepSection}>
            <div className={styles.stepHeader}>
              <span className={styles.stepBadgeGold}>Paso 2 de 2</span>
              <h2 className={styles.stepTitle}>Carta de Productos Artesanales</h2>
              <p className={styles.stepSubtitle}>
                Agrega los productos que deseas incluir dentro de tu regalo navideño
              </p>

              <div className={styles.suggestionButton}>
                <button
                  type="button"
                  className={styles.suggestionButton}
                  onClick={handleSelectAllProducts}
                >
                  <span>✨</span>
                  <span>
                    {allProductsSelected
                      ? 'Quitar kit tradicional'
                      : '¿Quieres el kit tradicional? Haz clic aquí para incluir los 4 productos (1 de cada uno)'}
                  </span>
                </button>
              </div>
            </div>

            <div className={styles.productsList}>
              {productItems.map((prod) => {
                const qty = productQuantities[prod.id] || 0;
                const isSelected = qty > 0;
                return (
                  <div
                    key={prod.id}
                    className={`${styles.productCard} ${isSelected ? styles.selected : ''}`}
                  >
                    <div className={styles.productInfo}>
                      <div className={styles.iconWrapper}>
                        <img src={prod.image} alt={prod.name} className={styles.productImage} />
                      </div>
                      <div>
                        <div className={styles.productHeader}>
                          <h4 className={styles.productName}>{prod.name}</h4>
                          <span className={styles.productTag}>{prod.tag}</span>
                        </div>
                        <p className={styles.productDescription}>{prod.description}</p>
                      </div>
                    </div>

                    <div className={styles.productFooter}>
                      <div className={styles.priceInfo}>
                        <span className={styles.unitPriceLabel}>Valor unitario</span>
                        <span className={styles.unitPrice}>
                          ${prod.price.toLocaleString('es-CO')}
                        </span>
                      </div>

                      <div className={styles.quantityControls}>
                        <button
                          type="button"
                          className={styles.qtyButton}
                          aria-label="Disminuir cantidad"
                          onClick={() => handleQuantityChange(prod.id, -1)}
                          disabled={qty === 0}
                        >
                          −
                        </button>
                        <span className={styles.qtyValue}>{qty}</span>
                        <button
                          type="button"
                          className={styles.qtyButtonPlus}
                          aria-label="Aumentar cantidad"
                          onClick={() => handleQuantityChange(prod.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Resumen / Cotizador - Original position (placeholder for intersection observer) */}
          <section
            id="resumen-cotizador"
            className={styles.summarySection}
            ref={placeholderRef}
            aria-hidden={showFloating}
          >
            <div
              className={`${styles.summaryCard} ${showFloating ? styles.summaryPlaceholder : ''}`}
            >
              <div className={styles.summaryHeader}>
                <div>
                  <h3 className={styles.summaryTitle}>
                    <span>📜</span>
                    <span>Tu Caja Personalizada</span>
                  </h3>
                  <p className={styles.summarySubtitle}>
                    Resumen en tiempo real de tu pedido por encargo
                  </p>
                </div>
                <button type="button" className={styles.resetButton} onClick={handleReset}>
                  <span>↺</span>
                  <span>Reiniciar selección</span>
                </button>
              </div>

              <div className={styles.summaryItems} id="summary-items">
                {selectedPackaging || isAnyProductSelected ? (
                  <>
                    {selectedPackaging && (
                      <div className={styles.summaryItem}>
                        <div className={styles.summaryItemInfo}>
                          <span className={styles.summaryItemIcon}>📦</span>
                          <div>
                            <span className={styles.summaryItemName}>
                              {packagingOptions.find((p) => p.id === selectedPackaging)?.name}
                            </span>
                            <span className={styles.summaryItemSubtitle}>
                              {packagingOptions.find((p) => p.id === selectedPackaging)?.subtitle}
                            </span>
                          </div>
                        </div>
                        <span className={styles.summaryItemPrice}>
                          ${packagingTotal.toLocaleString('es-CO')}
                        </span>
                      </div>
                    )}
                    {productItems
                      .filter((p) => (productQuantities[p.id] || 0) > 0)
                      .map((prod) => (
                        <div key={prod.id} className={styles.summaryItem}>
                          <div className={styles.summaryItemInfo}>
                            <span className={styles.summaryItemIcon}>✨</span>
                            <div>
                              <span className={styles.summaryItemName}>{prod.name}</span>
                              <span className={styles.summaryItemSubtitle}>
                                Cantidad: {productQuantities[prod.id]}
                              </span>
                            </div>
                          </div>
                          <span className={styles.summaryItemPrice}>
                            $
                            {(prod.price * (productQuantities[prod.id] || 0)).toLocaleString(
                              'es-CO'
                            )}
                          </span>
                        </div>
                      ))}
                  </>
                ) : (
                  <div className={styles.emptyState}>
                    Selecciona tu empaque y tus productos favoritos
                  </div>
                )}
              </div>

              <div className={styles.giftNote}>
                <label htmlFor="gift-note" className={styles.giftNoteLabel}>
                  ✏️ Nota o mensaje para la tarjeta (Opcional):
                </label>
                <input
                  type="text"
                  id="gift-note"
                  placeholder="Ej: ¡Feliz Navidad para el mejor equipo! De parte de..."
                  className={styles.giftNoteInput}
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                />
              </div>

              <div className={styles.summaryFooter}>
                <div className={styles.totalWrapper}>
                  <span className={styles.totalLabel}>Total Estimado del Kit</span>
                  <div className={styles.totalAmount}>
                    <span className={styles.totalPrice}>
                      ${calculateTotal().toLocaleString('es-CO')}
                    </span>
                    <span className={styles.currency}>COP</span>
                  </div>
                  <p className={styles.badgeText}>
                    {selectedPackaging || isAnyProductSelected
                      ? `${totalItems} producto${totalItems !== 1 ? 's' : ''} seleccionado${totalItems !== 1 ? 's' : ''}${selectedPackaging ? ' + empaque' : ''}`
                      : 'Selecciona tu empaque y tus productos favoritos'}
                  </p>
                </div>

                <div className={styles.actionButtons}>
                  <button
                    type="button"
                    className={styles.copyButton}
                    onClick={handleCopyOrder}
                    disabled={!selectedPackaging && !isAnyProductSelected}
                  >
                    <span>📋</span>
                    <span>Copiar pedido</span>
                  </button>
                  <button
                    type="button"
                    className={styles.whatsappButton}
                    onClick={handleWhatsAppOrder}
                    disabled={!selectedPackaging && !isAnyProductSelected}
                  >
                    <span>📱</span>
                    <span>Pedir esta caja por WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Floating Summary Box - appears when scrolling past original */}
          {showFloating && isFloating && (
            <div
              ref={summaryRef}
              className={styles.floatingSummary}
              role="complementary"
              aria-label="Resumen del pedido flotante"
            >
              <div className={styles.floatingSummaryCard}>
                <div className={styles.floatingSummaryHeader}>
                  <h3 className={styles.floatingSummaryTitle}>
                    <span>📜</span>
                    <span>Tu Pedido</span>
                  </h3>
                  <button
                    type="button"
                    className={styles.floatingClose}
                    onClick={() => setShowFloating(false)}
                    aria-label="Cerrar resumen flotante"
                  >
                    ×
                  </button>
                </div>

                <div className={styles.floatingSummaryItems}>
                  {selectedPackaging || isAnyProductSelected ? (
                    <>
                      {selectedPackaging && (
                        <div className={styles.floatingSummaryItem}>
                          <div className={styles.floatingSummaryItemInfo}>
                            <span className={styles.floatingSummaryItemIcon}>📦</span>
                            <div>
                              <span className={styles.floatingSummaryItemName}>
                                {packagingOptions.find((p) => p.id === selectedPackaging)?.name}
                              </span>
                              <span className={styles.floatingSummaryItemSubtitle}>
                                {packagingOptions.find((p) => p.id === selectedPackaging)?.subtitle}
                              </span>
                            </div>
                          </div>
                          <span className={styles.floatingSummaryItemPrice}>
                            ${packagingTotal.toLocaleString('es-CO')}
                          </span>
                        </div>
                      )}
                      {productItems
                        .filter((p) => (productQuantities[p.id] || 0) > 0)
                        .map((prod) => (
                          <div key={prod.id} className={styles.floatingSummaryItem}>
                            <div className={styles.floatingSummaryItemInfo}>
                              <span className={styles.floatingSummaryItemIcon}>✨</span>
                              <div>
                                <span className={styles.floatingSummaryItemName}>{prod.name}</span>
                                <span className={styles.floatingSummaryItemSubtitle}>
                                  Cantidad: {productQuantities[prod.id]}
                                </span>
                              </div>
                            </div>
                            <span className={styles.floatingSummaryItemPrice}>
                              $
                              {(prod.price * (productQuantities[prod.id] || 0)).toLocaleString(
                                'es-CO'
                              )}
                            </span>
                          </div>
                        ))}
                    </>
                  ) : (
                    <div className={styles.floatingEmptyState}>
                      Selecciona tu empaque y productos
                    </div>
                  )}
                </div>

                <div className={styles.floatingSummaryFooter}>
                  <div className={styles.floatingTotalWrapper}>
                    <span className={styles.floatingTotalLabel}>Total</span>
                    <span className={styles.floatingTotalPrice}>
                      ${calculateTotal().toLocaleString('es-CO')} COP
                    </span>
                  </div>
                  <div className={styles.floatingActionButtons}>
                    <button
                      type="button"
                      className={styles.floatingCopyButton}
                      onClick={handleCopyOrder}
                      disabled={!selectedPackaging && !isAnyProductSelected}
                    >
                      <span>📋</span>
                    </button>
                    <button
                      type="button"
                      className={styles.floatingWhatsAppButton}
                      onClick={handleWhatsAppOrder}
                      disabled={!selectedPackaging && !isAnyProductSelected}
                    >
                      <span>📱</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
