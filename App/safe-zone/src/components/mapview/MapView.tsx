import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PolygonMap from '../poligonmap/PoligonMap';



const MapView: React.FC = () => {
  
  return (
    <MapContainer center={[6.167016821486245, -75.5803951265431]} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
        {/*llamamos el mapeo de poligonos*/}
        <PolygonMap />
    </MapContainer>
  );
};

export default MapView;
