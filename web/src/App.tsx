import Header from './components/layout/Header.tsx';
import Footer from './components/layout/Footer.tsx';
import Hero from './components/home/Hero.tsx';
import BrandSplit from './components/home/BrandSplit.tsx';
import CatalogPreview from './components/home/CatalogPreview.tsx';
import Events from './components/home/Events.tsx';
import HowToOrder from './components/home/HowToOrder.tsx';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Hero />
        <BrandSplit />
        <CatalogPreview />
        <Events />
        <HowToOrder />
      </main>
      <Footer />
    </>
  );
}
