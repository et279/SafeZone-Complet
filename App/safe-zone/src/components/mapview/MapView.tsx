import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PolygonMap from '../poligonmap/PoligonMap';
import {DEFAULT_MAP_ZOOM, DEFAULT_MAP_CENTER } from '../../types/Variables';
import './MapView.css';
import MapVisualControl from './funtionsmap/ControlMap'
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { iconPerson } from './../../styles/Map';



interface Button {
  icon: string;
  onClick: () => void;
  title: string;
}

const MapView: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } >(DEFAULT_MAP_CENTER);
  const [error, setError] = useState<string | null>(null);
  const [isUserLocation, setIsUserLocation] = useState<boolean>(false);


  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setIsUserLocation(true);
        setError(null);
      },
      (err) => {
        setError(`Error retrieving location: ${err.message}`);
        setIsUserLocation(false);
        setLocation(DEFAULT_MAP_CENTER);
      }
    );
  };

  useEffect(() => {
    getUserLocation();
  }, []);
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
      <MapContainer center={[location.latitude, location.longitude]} zoom={DEFAULT_MAP_ZOOM} style={{ height: "100vh", width: "100%", zIndex:0 }} >
        
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {isUserLocation && (  
          <Marker position={[location.latitude, location.longitude]} icon={iconPerson}>
            <Popup>
              {error ? "Default Location" : "Mi Ubicacion"}
            </Popup>
          </Marker>
        )}
        {/*llamamos el mapeo de poligonos*/}
        <PolygonMap />
      </MapContainer>
    </Container>
    
  );
};

export default MapView;
