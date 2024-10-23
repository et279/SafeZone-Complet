
import logo from '../../assets/Logo-Red.png'; // Asegúrate de que la ruta sea correcta
import './Menu.css';
import React from 'react';
import { FaHome, FaMapMarkerAlt, FaCog, FaUser } from 'react-icons/fa'; // Usa íconos de react-icons


const Menu: React.FC= () => {
  return (
    <div className="menu">
      <div className="menu-logo">
        <img src={logo} alt="Logo" className="logo" /> {/* Logo de la app */}
      </div>
      <div className='menu-items'>
        <button  className={`menu-item `}> <a href="/">
            <FaHome className="menu-icon" /></a>
        </button >
        <button className={`menu-item `}  ><a href="/map">
            <FaMapMarkerAlt className="menu-icon" /></a>
        </button>
      </div>
      <ul className="menu-items">
        <li className="menu-item" ><a href="/config">
          <FaCog className="menu-icon" /></a>
        </li>
        <li className="menu-item" ><a href="/user">
          <FaUser className="menu-icon" /></a>
        </li>
        
      </ul>
    </div>
  );
};

export default Menu;
