import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PolygonMap from '../poligonmap/PoligonMap';
import {DEFAULT_MAP_ZOOM, DEFAULT_MAP_CENTER } from '../../types/Variables';
import './MapComponent.css';
import { useEffect, useState } from 'react';
import { iconPerson } from '../../styles/Map';


const MapComponent: React.FC<{ toggleFullScreen: () => void, isFullScreen: boolean }>=({ toggleFullScreen, isFullScreen}) => {
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

  return (
    <div className="map-container">
      <button onClick={toggleFullScreen}>
        {isFullScreen ? 'Salir de Pantalla Completa' : 'Pantalla Completa'}
      </button>
      
      {/* Contenido normal */}
      <MapContainer center={[location.latitude, location.longitude]} zoom={DEFAULT_MAP_ZOOM} style={{ height: "100%", width: "100%", zIndex:0 }} >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
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

      {/* Contenido adicional que se muestra solo en fullscreen */}
      {isFullScreen && (
        <div className="extra-content">
          <p>Información adicional del mapa en modo fullscreen</p>
        </div>
      )}
    </div>

    
  );
};

export default MapComponent;
