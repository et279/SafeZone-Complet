import React, { useState} from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MapComponent from './components/mapComponent/MapComponent';
import SitesComponent from './components/sitesComponent/sitesComponent';
import Menu from '@components/menu/Menu';
import Header from '@components/header/Header';
import User from '@components/user/User';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import Dashboard from './pages/dashboard/Dashboard';

const App: React.FC = () => {
  

 //AJUSTAR TAMAÑO MENU IZQUIERDO
 const [menu, setMenu] = useState<boolean>(true);
 const toggleMenu = () => {
    setMenu(!menu);
    
 }
  // Estado para controlar la apertura de configuración y perfil
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);


  

  return (
    <ThemeProvider>
      <Router>
        <div className='app-container'>
          {/* Menú a la izquierda */}
          <div className='menu-container'>
            <Menu/>

          </div>

          {/* Contenedor derecho dinámico */}
          <div className={`right-container fullscreen` }>
            {/* Header */}
            <div className="header">
                <Header isOpenMenu={menu} openMenu={toggleMenu} />
              </div>
            <div className={`main-content`}>

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/map" element={<MapComponent />} />
              <Route path='/user' element={<User />}/>
              <Route path="/sites" element={<SitesComponent />} />
            </Routes>
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
    </ThemeProvider>
  );
}

export default App;
