import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/tokens.css';
import './styles/base.css';

// TEMPORARY: <StrictMode> removed from the root so the /edit route renders
// without it while we test whether React 19 StrictMode triggers the
// <ForwardRef(Layer2)> crash. Re-add it once the cause is identified.
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('No se encontr� el elemento #root en el DOM.');
}

createRoot(rootElement).render(<App />);
