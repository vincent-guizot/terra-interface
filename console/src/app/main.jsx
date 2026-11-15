import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import AppProviders from './providers/AppProviders.jsx';
import '../styles/globals.css';

/**
 * React DOM Entry Point
 * Mounts the root application wrapped in AppProviders
 */
const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>
  );
} else {
  console.error('Terra Interface: Root DOM container (#root) not found.');
}
