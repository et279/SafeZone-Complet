
import logo from '../../assets/Logo-Red.png'; // Asegúrate de que la ruta sea correcta
import './Menu.css';
import React from 'react';
import { FaHome, FaMapMarkerAlt, FaChartBar, FaCog, FaUser } from 'react-icons/fa'; // Usa íconos de react-icons

interface MenuProps {
  onMenuClick: (componentName: string) => void;
  activeComponent: string | null;
}

const Menu: React.FC<MenuProps> = ({ onMenuClick, activeComponent }) => {
  return (
    <div className="menu">
      <div className="menu-logo">
        <img src={logo} alt="Logo" className="logo" /> {/* Logo de la app */}
      </div>
      <div className='menu-items'>
        <button  className={`menu-item ${activeComponent === 'home' ? 'inactive' : ''}`} onClick={() => onMenuClick('home')}>
            <FaHome className="menu-icon" />
        </button >
        <button className={`menu-item ${activeComponent === 'map' ? 'inactive' : ''}`}  onClick={() => onMenuClick('map')}>
            <FaMapMarkerAlt className="menu-icon" />
        </button>
        <button className="menu-item">
          <FaChartBar className="menu-icon" />
        </button>
      </div>
      <ul className="menu-items">
        <li className="menu-item" onClick={() => onMenuClick('settings')}>
          <FaCog className="menu-icon" />
        </li>
        <li className="menu-item" onClick={() => onMenuClick('profile')}>
          <FaUser className="menu-icon" />
        </li>
        
      </ul>
    </div>
  );
};

export default Menu;
