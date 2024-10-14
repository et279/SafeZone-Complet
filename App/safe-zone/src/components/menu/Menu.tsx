
import logo from '../../assets/Logo-Red.png'; // Asegúrate de que la ruta sea correcta
import './Menu.css';
import React from 'react';
import { FaHome, FaMapMarkerAlt, FaChartBar, FaCog, FaUser } from 'react-icons/fa'; // Usa íconos de react-icons

interface MenuProps {
  toggleFullScreen: (componentName: string | null) => void;
  isFullScreen: boolean
  activeComponent: string | null;
}

const Menu: React.FC<MenuProps> = ({ toggleFullScreen, isFullScreen, activeComponent }) => {
  return (
    <div className="menu">
      <div className="menu-logo">
        <img src={logo} alt="Logo" className="logo" /> {/* Logo de la app */}
      </div>
      <div className='menu-items'>
        <button  className={`menu-item ${activeComponent === null ? 'active' : ''}`} onClick={() =>toggleFullScreen(null)}>
            <FaHome className="menu-icon" />
        </button >
        <button className={`menu-item ${activeComponent === 'map' ? 'active' : ''}`}  onClick={() => toggleFullScreen('map')}>
            <FaMapMarkerAlt className="menu-icon" />
        </button>
        <button className="menu-item">
          <FaChartBar className="menu-icon" />
        </button>
      </div>
      <ul className="menu-items">
        <li className="menu-item" onClick={() => toggleFullScreen('settings')}>
          <FaCog className="menu-icon" />
        </li>
        <li className="menu-item" onClick={() => toggleFullScreen('profile')}>
          <FaUser className="menu-icon" />
        </li>
        
      </ul>
    </div>
  );
};

export default Menu;
