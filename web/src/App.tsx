import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Header from './components/layout/Header.tsx';
import Footer from './components/layout/Footer.tsx';
import Hero from './components/home/Hero.tsx';
import BrandSplit from './components/home/BrandSplit.tsx';
import CatalogPreview from './components/home/CatalogPreview.tsx';
import Events from './components/home/Events.tsx';
import HowToOrder from './components/home/HowToOrder.tsx';
import { Canvas } from './editor/canvas';

/**
 * Página del editor visual. Extrae el slug de la URL y lo pasa a Canvas.
 * Ejemplo: /editor/inicio  -> carga la página con slug "/inicio" desde PocketBase.
 */
function EditorPage() {
  const params = useParams<{ slug: string }>();
  const slug = `/${params.slug ?? 'inicio'}`;

  return <Canvas initialSlug={slug} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">
          <Routes>
            {/* Sitio estático (página de inicio pública) */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <BrandSplit />
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
        <Footer />
      </>
    </BrowserRouter>
  );
}
