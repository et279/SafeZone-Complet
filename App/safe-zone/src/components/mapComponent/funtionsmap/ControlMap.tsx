// LayerControl.jsx
import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './ControlMap.css';
import {iconUrl} from '../../../styles/Map';

const MapVisualControl = () => {
    // Estado para controlar la activación de las diferentes capas
  const [protectedSitesActive, setProtectedSitesActive] = useState(true);
  const [miUbicacion, setmiUbicacion] = useState(true);
  const [protectedZonesInactive, setProtectedZonesInactive] = useState(true);
  const [protectedZonesActive, setProtectedZonesActive] = useState(true);
  const [allowedZonesActive, setAllowedZonesActive] = useState(false);
  const [departaments, setDepartments ] = useState (true);

    // Función para alternar la clase en los elementos y el estado del botón
  const toggleClass = (targetClass: string, setState: React.Dispatch<React.SetStateAction<boolean>>) => {
    // Seleccionar todos los elementos con la clase 'targetClass'
    const elements = document.querySelectorAll(`.${targetClass}`);

    // Alternar la clase 'off-layer' en cada uno de los elementos
    elements.forEach(element => {
      element.classList.toggle('off-layer');
    });

    // Alternar el estado del botón
    setState(prevState => !prevState);
  };
  return (
    <Container className='container control-layer'>
      <h4 className='title'>Capas</h4>
       {/* Control para Sitios Protegidos */}
      <div className='layer'>
        <Row>
          <Col> 
            <span className='label'>Sitios protegidos</span>
          </Col>
          <Col className='col-control-layer'>
            <Button 
              id='sitesprotect'
              className={`toggle-btn ${protectedSitesActive ? "toggled" : ""}`}
              onClick={() => toggleClass('site-protect', setProtectedSitesActive)}
            >
              <div className='thumb'></div>
            </Button>
          </Col>
          <Col style={{textAlign: 'right'}}>
            <div style={{backgroundColor: 'red'}} className='colorBox'></div>
          </Col>
        </Row>
      </div>
      {/* Control para Ubicacion Usuario*/}
      <div className='layer'>
        <Row>
          <Col> 
            <span className='label'>Mi ubicacion</span>
          </Col>
          <Col className='col-control-layer'>
            <Button 
              id='miubicacion'
              className={`toggle-btn ${miUbicacion ? "toggled" : ""}`}
              onClick={() => toggleClass('markerme', setmiUbicacion)}
            >
              <div className='thumb'></div>
            </Button>
          </Col>
          <Col style={{textAlign: 'right'}}>
            <div className='colorBox markerme-icon'>
              <img src={iconUrl} alt="" />
            </div>
          </Col>
        </Row>
      </div>
       {/* Control para Zonas Protegidas */}
      <div className='layer'>
        <Row>
          <Col> 
            <span className='label'>Zonas protegidas</span>
          </Col>
          <Col>
            <Button 
              onClick={() => toggleClass('zone-protect', setProtectedZonesActive)}
              className={`toggle-btn ${protectedZonesActive ? "toggled" : ""}`}
            >
              <div className='thumb'></div>
            </Button>
          </Col>
          <Col style={{textAlign: 'right'}}>
            <div style={{backgroundColor: 'brown'}} className='colorBox'></div>
          </Col>
        </Row>
      </div>
      {/* Control para Zonas Protegidas Inactivas*/}
      <div className='layer'>
        <Row>
          <Col> 
            <span className='label'>Zonas protegidas inactivas</span>
          </Col>
          <Col>
            <Button 
              onClick={() => toggleClass('zone-inactive', setProtectedZonesInactive)}
              className={`toggle-btn ${protectedZonesInactive ? "toggled" : ""}`}
            >
              <div className='thumb'></div>
            </Button>
          </Col>
          <Col style={{textAlign: 'right'}}>
            <div style={{backgroundColor: 'gray'}} className='colorBox'></div>
          </Col>
        </Row>
      </div>
       {/* Control para Zonas Permitidas */}
      <div className='layer'>
        <Row>
          <Col> 
            <span className='label'>Zonas permitidas</span>
          </Col>
          <Col>
            <Button 
              className={`toggle-btn ${allowedZonesActive ? "toggled" : ""}`}
              onClick={() => toggleClass('allowed-areas', setAllowedZonesActive)}
            >
              <div className='thumb'></div>
            </Button>
          </Col>
          <Col style={{textAlign: 'right'}}>
            <div style={{backgroundColor: 'green'} } className='colorBox'></div>
          </Col>
        </Row>
      </div>
      {/* Control para Limite departamentos */}
      <div className='layer'>
        <Row>
          <Col> 
            <span className='label'>Limite departamento</span>
          </Col>
          <Col>
            <Button 
              className={`toggle-btn ${departaments ? "toggled" : ""}`}
              onClick={() => toggleClass('city-limit', setDepartments)}
            >
              <div className='thumb'></div>
            </Button>
          </Col>
          <Col style={{textAlign: 'right'}}>
            <div style={{backgroundColor: 'transparent'} } className='colorBox'></div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default MapVisualControl;
