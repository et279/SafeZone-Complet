
import React, { useEffect, useState } from 'react';
import MapView from './components/mapview/MapView';
import NavigationBar from './components/navbar/NavBar';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';


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
      <Container fluid className='p-0'>
        <Button variant="secondary" onClick={toggleTheme} className="theme-toggle-button b-w-button">
          {theme === 'light' ? <i className="bi bi-lightbulb on"></i> : <i className="bi bi-lightbulb-fill off"></i>}
        </Button>
        <Routes>
          <Route path="/" element={<MapView />} />
          {/* Agrega más rutas aquí para otras funcionalidades administrativas */}
        </Routes>
      </Container>
    </Router>
  );
}

export default App
