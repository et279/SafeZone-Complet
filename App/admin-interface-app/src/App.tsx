// src/App.tsx

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/navbar/NavBar';
import PerimeterInterface from './components/perimeterinterface/PerimeterInterface';
import SiteForm from './components/siteform/SiteForm';
import { Button, Container } from 'react-bootstrap';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SiteTypeAdmin from './components/tipos de sitios/TiposdeSitios';


const App: React.FC = () => {
  const [theme, setTheme] = useState('dark');
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <NavigationBar />
      <Container fluid>
        <Button variant="secondary" onClick={toggleTheme} className="theme-toggle-button b-w-button">
          {theme === 'light' ? <i className="bi bi-lightbulb on"></i> : <i className="bi bi-lightbulb-fill off"></i>}
        </Button>
        <Routes>
          <Route path="/" element={<PerimeterInterface />} />
          <Route path="/perimeter-interface" element={<PerimeterInterface />} />
          <Route path="/site-form" element={<SiteForm />} />
          <Route path="/site-types" element={<SiteTypeAdmin />} />
          {/* Agrega más rutas aquí para otras funcionalidades administrativas */}
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
