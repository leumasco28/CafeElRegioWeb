import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/home/Hero';
import BrandSplit from './components/home/BrandSplit';
import CatalogPreview from './components/home/CatalogPreview';
import ChristmasCardSection from './components/home/ChristmasCardSection';
import Events from './components/home/Events';
import HowToOrder from './components/home/HowToOrder';
import CartDrawer from './components/ui/CartDrawer';
import { CartProvider } from './context/CartContext.tsx';
import { Canvas } from './editor/canvas.tsx';
import { isChristmasSeason, CHRISTMAS_CLASS } from './content/christmas.ts';

/**
 * Página del editor visual. Extrae el slug de la URL y lo pasa a Canvas.
 * Ejemplo: /editor/inicio  -> carga la página con slug "/inicio" desde JSON local + localStorage.
 */
function EditorPage() {
  const params = useParams<{ slug: string }>();
  const slug = `/${params.slug ?? 'inicio'}`;

  return <Canvas initialSlug={slug} />;
}

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Aplicar tema navideño global cuando la temporada está activa
  useEffect(() => {
    if (isChristmasSeason()) {
      document.documentElement.classList.add(CHRISTMAS_CLASS);
      document.body.classList.add(CHRISTMAS_CLASS);
    } else {
      document.documentElement.classList.remove(CHRISTMAS_CLASS);
      document.body.classList.remove(CHRISTMAS_CLASS);
    }
  }, []);

  return (
    <CartProvider>
      <BrowserRouter>
        <>
          <a className="skip-link" href="#contenido">
            Saltar al contenido
          </a>
          <Header onToggleCart={() => setIsCartOpen((open: boolean) => !open)} />
          <main id="contenido">
            <Routes>
              {/* Sitio estático (página de inicio pública) */}
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <BrandSplit />
                    <ChristmasCardSection />
                    <CatalogPreview />
                    <Events />
                    <HowToOrder />
                  </>
                }
              />
              {/* Editor visual: /editor/inicio, /editor/carta, etc. */}
              <Route path="editor/:slug" element={<EditorPage />} />
            </Routes>
          </main>
          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          <Footer />
        </>
      </BrowserRouter>
    </CartProvider>
  );
}
