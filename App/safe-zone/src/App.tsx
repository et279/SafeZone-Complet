
import React, { useEffect, useState } from 'react';
import MapComponent from './components/mapComponent/MapComponent';
import Menu from './components/menu/Menu';
import SitesComponent from './components/sitesComponent/sitesComponent';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';


const App: React.FC = () => {
 
  //tema de la App
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    if (navigator.geolocation) { 
      navigator.permissions.query({ name: "geolocation" }).then(function (result) { 
        console.log(result); 
      }); } else { 
        console.log("Geolocation is not supported by this browser.");
      }
      if (navigator.geolocation) { navigator.permissions .query({ name: "geolocation" }) .then(function (result) { console.log(result); }); } else { console.log("Geolocation is not supported by this browser."); }

    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  //contenido
  const [fullScreenComponent, setFullScreenComponent] = useState<string | null>(null); // Estado para controlar qué componente está en fullscreen

  // Función para alternar entre fullscreen para cualquier componente
  const toggleFullScreen = (componentName: string) => {
    if (fullScreenComponent === componentName) {
      setFullScreenComponent(null); // Salir de fullscreen si ya está activado
    } else {
      setFullScreenComponent(componentName); // Establecer el componente en fullscreen
    }
  };


  // const toggleTheme = () => {
  //   setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  // };
  return (
    <Router>
      
        <div className='app-container'>
          {/* Menú en la izquierda */}
          <div className='menu-container'>
            <Menu />

          </div>
          {/* Contenedor derecho dinámico */}
          <div className={`right-container ${fullScreenComponent ? 'fullscreen' : ''}`}>
            <div className="main-content">
              {/* Componente del mapa */}
              <div className={`component-container ${fullScreenComponent === 'map' ? 'expanded' : ''}`}>
                <MapComponent 
                  toggleFullScreen={() => toggleFullScreen('map')} 
                  isFullScreen={fullScreenComponent === 'map'}
                />
              </div>
              {/* Componente de información */}
              <div className={`component-container ${fullScreenComponent === 'info' ? 'expanded' : ''}`}>
                <SitesComponent />
              </div>

              {/* Puedes agregar más componentes aquí, siguiendo el mismo patrón */}
            </div>
          </div>  
        </div>
    </Router>
  );
}

export default App
