import React, { useEffect, useState } from 'react';
import { Polygon, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchZones, generatePolygons } from '../../types/polygonLogic';
import { Restriction, Zone, } from '../../types/Zone';

const PolygonMap: React.FC = () => {
  const [polygons, setPolygons] = useState<{ name: string; coordinates: number[][];    restriction: Restriction;  coordinatesrestriction: number[][] }[]>([]);

  useEffect(() => {
    const loadPolygons = async () => {
      const zones: Zone[] = await fetchZones();
      const generatedPolygons = generatePolygons(zones);
      setPolygons(generatedPolygons);
      console.log(zones);
    };

    loadPolygons();
  }, []);
//   console.log('poligons',polygons);
  
  return (
          polygons.map((polygon, index) => (
            <React.Fragment key={index}>
                <Polygon positions={polygon.coordinatesrestriction} pathOptions={{ color: 'blue' }} />
                <Polygon key={index} positions={polygon.coordinates} pathOptions={{ color: 'red' }}>
                    <Popup>{polygon.name}
                    <br>
                    </br></Popup>   
                </Polygon>
            </React.Fragment>
          ))
      
  );
};

export default PolygonMap;
