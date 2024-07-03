// src/components/Navbar.tsx

import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import logo from '../../assets/Logo-Red.png'; // Asegúrate de que la ruta sea correcta
import { Link } from 'react-router-dom';
import './NavBar.css'

const NavigationBar: React.FC = () => {
  return (
    <Navbar expand="lg" className='col-11 custom-navbar  p-3' fixed='top'>
      <div className='row'>
        <Navbar.Brand as={Link} to="/" className='col'>
          <div className='col'>
            <img
              alt="Logo"
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            SafeZone
          </div>
        </Navbar.Brand>
        <div className='col'>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              {/* Añade más enlaces según sea necesario */}
            </Nav>
          </Navbar.Collapse>
        </div>
      </div>
    </Navbar>
  );
};

export default NavigationBar;



