import axios from 'axios';
import { Zone } from './Zone';


export const fetchZones = async (): Promise<Zone[]> => {
  try {
    const response = await axios.get('http://localhost:3000/zones');
    return response.data;
  } catch (error) {
    console.error('Error fetching zones:', error);
    return [];
  }
};

export const generatePolygons = (zones: Zone[]) => {
  return zones.map(zone => {
    const perimeterCoordinates = zone.coordinatesrestriction.map(coord => [coord.lat, coord.lng] as [number, number]);
    const siteCoordinates = zone.coordinates.map(coord => [coord.lat, coord.lng] as [number, number]);
    return {
      name: zone.name,
      coordinates: siteCoordinates,
      restriction: zone.restriction,
      coordinatesrestriction: perimeterCoordinates

    };
  });
};
