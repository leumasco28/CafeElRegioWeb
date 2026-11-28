import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { StrictMode, useState as reactUseState, useEffect as reactUseEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/home/Hero';
import BrandSplit from './components/home/BrandSplit';
import CatalogPreview from './components/home/CatalogPreview';
import ChristmasCardSection from './components/home/ChristmasCardSection';
import Events from './components/home/Events';
import HowToOrder from './components/home/HowToOrder';
import CartDrawer from './components/ui/CartDrawer';
import Snowfall from './components/ui/Snowfall.tsx';
import CookieBanner from './components/ui/CookieBanner.tsx';
import { CartProvider } from './context/CartContext.tsx';
import { CookieConsentProvider } from './context/CookieConsentContext.tsx';
import { Canvas } from './editor/canvas.tsx';
import { isChristmasSeason, CHRISTMAS_CLASS } from './content/christmas.ts';
import { CopyrightClaimsPage, UnsubscribePage } from './pages/LegalForms.tsx';
import {
  CookiesPage,
  LicensesPage,
  NotFoundPage,
  PrivacyPage,
  RefundsPage,
  TermsPage,
} from './pages/LegalPages.tsx';

function NavigationEffects() {
  const location = useLocation();

  reactUseEffect(() => {
    if (location.pathname === '/') {
      document.title = 'Caf? El Regio ? Caf? colombiano y reposter?a artesanal';
    }

    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      window.requestAnimationFrame(() => {
        const target = document.getElementById(id);
        target?.scrollIntoView({ block: 'start' });
        if (target instanceof HTMLElement) {
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash]);

  return null;
}

function HomeContent() {
  const christmasActive = isChristmasSeason();

  return (
    <>
      <Hero />
      <BrandSplit />
      {christmasActive && <ChristmasCardSection />}
      <CatalogPreview />
      <Events />
      <HowToOrder />
    </>
  );
}

export default function App() {
  const [isCartOpen, setIsCartOpen] = reactUseState(false);
  const christmasActive = isChristmasSeason();

  reactUseEffect(() => {
    if (christmasActive) {
      document.documentElement.classList.add(CHRISTMAS_CLASS);
      document.body.classList.add(CHRISTMAS_CLASS);
    } else {
      document.documentElement.classList.remove(CHRISTMAS_CLASS);
      document.body.classList.remove(CHRISTMAS_CLASS);
    }
  }, [christmasActive]);

  return (
    <CartProvider>
      <CookieConsentProvider>
        <BrowserRouter>
          <a className="skip-link" href="#contenido">
            Saltar al contenido
          </a>
          <NavigationEffects />
          <Header onToggleCart={() => setIsCartOpen((open: boolean) => !open)} />
          <main id="contenido" tabIndex={-1}>
            <Routes>
              {/* /home wrapped in StrictMode */}
              <Route
                path="/"
                element={
                  <StrictMode>
                    <HomeContent />
                  </StrictMode>
                }
              />
              <Route
                path="editor/:slug"
                element={
                  <StrictMode>
                    <Canvas />
                  </StrictMode>
                }
              />
              <Route
                path="privacidad"
                element={
                  <StrictMode>
                    <PrivacyPage />
                  </StrictMode>
                }
              />
              <Route
                path="terminos"
                element={
                  <StrictMode>
                    <TermsPage />
                  </StrictMode>
                }
              />
              <Route
                path="reembolsos"
                element={
                  <StrictMode>
                    <RefundsPage />
                  </StrictMode>
                }
              />
              <Route
                path="cookies"
                element={
                  <StrictMode>
                    <CookiesPage />
                  </StrictMode>
                }
              />
              <Route
                path="licencias"
                element={
                  <StrictMode>
                    <LicensesPage />
                  </StrictMode>
                }
              />
              <Route
                path="baja"
                element={
                  <StrictMode>
                    <UnsubscribePage />
                  </StrictMode>
                }
              />
              <Route
                path="reclamos-derechos-autor"
                element={
                  <StrictMode>
                    <CopyrightClaimsPage />
                  </StrictMode>
                }
              />
              <Route
                path="*"
                element={
                  <StrictMode>
                    <NotFoundPage />
                  </StrictMode>
                }
              />
            </Routes>
          </main>
          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          <Footer />
          <CookieBanner />
          {christmasActive && <Snowfall />}
        </BrowserRouter>
      </CookieConsentProvider>
    </CartProvider>
  );
}
