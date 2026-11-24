import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StudioProvider } from './context/StudioContext';
import { ToastProvider } from './components/ui/Toast';
import './styles/tokens.css';
import './styles/components.css';
import './styles/studio.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StudioProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </StudioProvider>
  </React.StrictMode>
);
