
import logo from '../../assets/Logo-Red.png'; // Asegúrate de que la ruta sea correcta
import { Link } from 'react-router-dom';
import './Menu.css';
import React from 'react';
import { FaHome, FaMapMarkerAlt, FaChartBar, FaCog, FaUser } from 'react-icons/fa'; // Usa íconos de react-icons

const Menu = () => {
  return (
    <div className="menu">
      <div className="menu-logo">
        <img src={logo} alt="Logo" className="logo" /> {/* Logo de la app */}
      </div>
      <ul className="menu-items">
        <li className="menu-item">
          <FaHome className="menu-icon" />
        </li>
        <li className="menu-item">
          <FaMapMarkerAlt className="menu-icon" />
        </li>
        <li className="menu-item">
          <FaChartBar className="menu-icon" />
        </li>
      </ul>
      <ul className="menu-items">
        <li className="menu-item">
          <FaCog className="menu-icon" />
        </li>
        <li className="menu-item">
          <FaUser className="menu-icon" />
        </li>
        
      </ul>
    </div>
  );
};

export default Menu;
