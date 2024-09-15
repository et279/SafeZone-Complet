import React from 'react';
import './Settings.css';

interface SettingsProps {
  closeOverlay: () => void;
}

const Settings: React.FC<SettingsProps> = ({ closeOverlay }) => {
  return (
    <div className="settings-overlay">
      <div className="settings-content">
        <h2>Configuración</h2>
        {/* Aquí va el contenido de la configuración */}
        <button onClick={closeOverlay}>Cerrar</button>
      </div>
    </div>
  );
};

export default Settings;
