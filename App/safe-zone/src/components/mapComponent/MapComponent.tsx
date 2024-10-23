import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PolygonMap from '../poligonmap/PoligonMap';
import {DEFAULT_MAP_ZOOM, DEFAULT_MAP_CENTER } from '../../types/Variables';
import './MapComponent.css';
import { useEffect, useState } from 'react';
import { iconPerson } from '../../styles/Map';
import { useTheme } from '../../context/ThemeContext';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZ2FsYTIwMjQiLCJhIjoiY20ybGNlc3djMGFwZTJqbjRvbDM2b2k0aSJ9.mdeV4dffFRh4hL9L3kG2qA'; // Coloca tu token de Mapbox aquí
const LIGHT_MAP_STYLE = 'mapbox/light-v10'; // Reemplaza con el ID de tu estilo light
const DARK_MAP_STYLE = 'mapbox/dark-v10'; // Reemplaza con el ID de tu estilo dark

const MapComponent: React.FC=() => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } >(DEFAULT_MAP_CENTER);
  const [error, setError] = useState<string | null>(null);
  const [isUserLocation, setIsUserLocation] = useState<boolean>(false);
  const { theme } = useTheme();

  const mapStyle = theme === 'dark' ? DARK_MAP_STYLE : LIGHT_MAP_STYLE;


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
      {/* Contenido normal */}
      <MapContainer center={[location.latitude, location.longitude]} zoom={DEFAULT_MAP_ZOOM} style={{ height: "100%", width: "100%", zIndex:0 }} >
        <TileLayer url={`https://api.mapbox.com/styles/v1/${mapStyle}/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`} attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'/>
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
        <div className="extra-content">
          <p>Información adicional del mapa en modo fullscreen</p>
        </div>
    </div>

    
  );
};

export default MapComponent;
