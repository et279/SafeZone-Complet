import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PolygonMap from '../poligonmap/PoligonMap';
import {DEFAULT_MAP_ZOOM, DEFAULT_MAP_CENTER } from '../../types/Variables';
import './MapView.css';
import MapVisualControl from './funtionsmap/ControlMap'
import { useState } from 'react';
import { Container } from 'react-bootstrap';

interface Button {
  icon: string;
  onClick: () => void;
  title: string;
}

const MapView: React.FC = () => {
  const [buttons, setButtons] = useState<Button[]>([]);

  const addButton = (icon: string, title: string, onClick: () => void) => {
    setButtons([...buttons, { icon, title, onClick }]);
  };

  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'component1':
        return <MapVisualControl />;
      default:
        return null;
    }
  };

  return (
    <Container className='p-0 m-0 mw-100'>
      <div className="leaflet-control-extra-buttons">
        {buttons.map((button, index) => (
          <a key={index} href="#" onClick={button.onClick} title={button.title}>
            <i className={`bi ${button.icon}`}></i>
          </a>
        ))}
      </div>
      <div className={`sidebar-container p-3 active ${activeComponent ? 'active' : ''}`}>
          <MapVisualControl />
      </div>
      <MapContainer center={DEFAULT_MAP_CENTER} zoom={DEFAULT_MAP_ZOOM} style={{ height: "100vh", width: "100%", zIndex:0 }} >
        
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
          {/*llamamos el mapeo de poligonos*/}
          <PolygonMap />
      </MapContainer>
    </Container>
    
  );
};

export default MapView;
