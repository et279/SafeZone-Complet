import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MapComponent from './components/mapComponent/MapComponent';
import SitesComponent from './components/sitesComponent/sitesComponent';
import Menu from './components/menu/Menu';
import './App.css';
import 'react-icons/fa';
import { FaCog, FaUserCircle } from 'react-icons/fa';

const App: React.FC = () => {
  // Estado del tema (claro/oscuro)
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // Estado para controlar qué componente está en fullscreen
  const [fullScreenComponent, setFullScreenComponent] = useState<string | null>(null);

  // Estado para mostrar la cuadrícula completa
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  // Estado para controlar la apertura de configuración y perfil
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Función para alternar el tema claro/oscuro
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Función para alternar entre fullscreen para cualquier componente
  const toggleFullScreen = (componentName: string) => {
    if (fullScreenComponent === componentName) {
      setFullScreenComponent(null); // Salir de fullscreen si ya está activado
    } else {
      setFullScreenComponent(componentName); // Establecer el componente en fullscreen
    }
  };

  // Función para manejar los botones del menú
  const handleMenuClick = (componentName: string) => {
    if (componentName === 'settings') {
      setShowSettings(true);
      setShowProfile(false);
      return;
    } else if (componentName === 'profile') {
      setShowProfile(true);
      setShowSettings(false);
      return;
    }

    if (activeComponent === componentName) {
      return; // No hacer nada si ya está activo (no ocultar)
    } else {
      setFullScreenComponent(componentName); // Pasa al modo fullscreen
      setActiveComponent(componentName); // Muestra el componente seleccionado
    }
  };

  return (
    <Router>
      <div className='app-container'>
        {/* Menú a la izquierda */}
        <div className='menu-container'>
          <Menu onMenuClick={handleMenuClick} activeComponent={activeComponent} />
        </div>

        {/* Contenedor derecho dinámico */}
        <div className={`right-container ${fullScreenComponent ? 'fullscreen' : ''}`}>
          <div className="main-content">
            {/* Cuadrícula de componentes */}
            <div className={`component-container ${fullScreenComponent === 'map' ? 'expanded' : ''} ${!activeComponent || activeComponent === 'map' ? '' : 'hidden'}`}>
              <MapComponent 
                toggleFullScreen={() => toggleFullScreen('map')} 
                isFullScreen={fullScreenComponent === 'map'}
              />
            </div>

            <div className={`component-container ${fullScreenComponent === 'info' ? 'expanded' : ''} ${!activeComponent || activeComponent === 'info' ? '' : 'hidden'}`}>
              <SitesComponent />
            </div>

            {/* Puedes agregar más componentes aquí siguiendo el mismo patrón */}
          </div>
        </div>

        {/* Ventanas modales de configuración y perfil */}
        {showSettings && (
          <div className="modal">
            <div className="modal-content">
              <h2>Configuración</h2>
              <button onClick={() => setShowSettings(false)}>Cerrar</button>
              {/* Aquí puedes agregar más contenido de configuración */}
            </div>
          </div>
        )}

        {showProfile && (
          <div className="modal">
            <div className="modal-content">
              <h2>Perfil de usuario</h2>
              <button onClick={() => setShowProfile(false)}>Cerrar</button>
              {/* Aquí puedes agregar más contenido de perfil */}
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
