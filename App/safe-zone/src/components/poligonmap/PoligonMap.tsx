import React, { useEffect, useState } from 'react';
import { Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchZones, generatePolygons, unifyPolygons} from '../../types/polygonLogic';
import { Restriction, Zone } from '../../types/Zone';
import './PoligonMap.css';
import { POLYGON_ENVIGADO } from '../../types/Variables'

const PolygonMap: React.FC = () => {
  const [polygons, setPolygons] = useState<{ name: string; coordinates: number[][]; restriction: Restriction; coordinatesrestriction: number[][] }[]>([]);
  const [unifiedPolygon, setUnifiedPolygon] = useState<number[][]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPolygons = async () => {
      try {
        const zones: Zone[] = await fetchZones();
        const generatedPolygons = generatePolygons(zones);
        setPolygons(generatedPolygons);
        console.log('genero poligonos');
      
        
        const unified = unifyPolygons(zones);
        
        setUnifiedPolygon(unified);

        console.log('completo todo');
      } catch (error) {
        console.error('Error loading polygons:', error);
        setError('An error occurred while loading polygons.');
      }
    };

    loadPolygons();
  }, []);
// Definir los puntos del polígono con huecos
const polygonWithHoles = [
  [
    [6.1889, -75.5832474], // Contorno exterior
    [6.1889801, -75.5833107],
    [6.1886445, -75.583491],
    [6.1883309, -75.583671],
    [6.188069, -75.5838719],
    [6.1876799, -75.5842998],
    [6.1871288, -75.5850199],
    [6.1867403, -75.5855474],
    [6.1861331, -75.5863644],
    [6.185522, -75.5872179],
    [6.1853345, -75.5874469],
    [6.1889, -75.5832474], // Cerrar el contorno exterior
  ],
  [
    [6.1885, -75.5840], // Hueco interior
    [6.1886, -75.5841],
    [6.1887, -75.5842],
    [6.1885, -75.5840], // Cerrar el hueco interior
  ],
];
console.log(polygonWithHoles);
console.log(unifiedPolygon);


  return (
    <div>
      {polygons.map((polygon, index) => (
        <React.Fragment key={index}>
          <Polygon positions={polygon.coordinatesrestriction} className='zone-protect' />
          <Polygon positions={polygon.coordinates} className='site-protect'>
            <Popup>{polygon.name}</Popup>
          </Polygon>
        </React.Fragment>
      ))}
      {unifiedPolygon.length > 0 && (
        <Polygon positions={unifiedPolygon} className='unified-zone' />
      )}
      {error && <div className="error-message">{error}</div>}
      <Polygon positions={polygonWithHoles} color="blue" />
      {/* <React.Fragment >
        <Polygon positions={POLYGON_ENVIGADO} className='city-limit'>
        </Polygon>
      </React.Fragment> */}
      
    </div>
  );
};

export default PolygonMap;
