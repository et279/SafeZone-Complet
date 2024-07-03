// LayerControl.jsx
import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './ControlMap.css';

const MapVisualControl = () => {
  const [protectedSitesActive, setProtectedSitesActive] = useState(true);
  const [protectedZonesActive, setProtectedZonesActive] = useState(true);
  const [allowedZonesActive, setAllowedZonesActive] = useState(false);

  return (
    <Container className='container'>
      <h4 className='title'>Capas</h4>
      <div className='layer'>
        <Row>
          <Col> 
            <span className='label'>Sitios protegidos</span>
          </Col>
          <Col>
            <Button 
              variant={protectedSitesActive ? 'success' : 'secondary'} 
              onClick={() => setProtectedSitesActive(!protectedSitesActive)}
            >
              {protectedSitesActive ? 'activo' : 'apagado'}
            </Button>
          </Col>
          <Col style={{textAlign: 'right'}}>
            <div style={{backgroundColor: 'red'}} className='colorBox'></div>
          </Col>
        </Row>
      </div>
      <div className='layer'>
        <Row>
          <Col> 
            <span className='label'>Zonas protegidas</span>
          </Col>
          <Col>
            <Button 
              variant={protectedZonesActive ? 'success' : 'secondary'} 
              onClick={() => setProtectedZonesActive(!protectedZonesActive)}
            >
              {protectedZonesActive ? 'activo' : 'apagado'}
            </Button>
          </Col>
          <Col style={{textAlign: 'right'}}>
            <div style={{backgroundColor: 'brown'}} className='colorBox'></div>
          </Col>
        </Row>
      </div>
      <div className='layer'>
        <Row>
          <Col> 
            <span className='label'>Zonas permitidas</span>
          </Col>
          <Col>
            <Button 
              variant={allowedZonesActive ? 'success' : 'secondary'} 
              onClick={() => setAllowedZonesActive(!allowedZonesActive)}
            >
              {allowedZonesActive ? 'activo' : 'apagado'}
            </Button>
          </Col>
          <Col style={{textAlign: 'right'}}>
            <div style={{backgroundColor: 'green'} } className='colorBox'></div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default MapVisualControl;
