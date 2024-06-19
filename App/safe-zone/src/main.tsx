import React from 'react';
import ReactDOM from 'react-dom/client'; // Importar createRoot
import './index.css';
import App from './App';
import 'leaflet/dist/leaflet.css';

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container); // Usar createRoot
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}