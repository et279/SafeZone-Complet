import * as turf from '@turf/turf';
import { Feature, GeoJsonProperties, Polygon as GeoJsonPolygon, MultiPolygon as GeoJsonMultiPolygon } from 'geojson';
import { Restriction, Site } from './Site';
import api from '../services/api';
import { POLYGON_ENVIGADO } from '../types/Variables'

// Funcion para verificar si una zona esta activa
export const isZoneActive = (restriction: Restriction): boolean =>{
  if (!restriction ) return false; //Verificar si la restriccion esta definida
  const currentTime = new  Date();
  const currentDay = currentTime.toLocaleDateString('en-Us',{weekday: 'long'}).toLowerCase();

  const { days, startHour, endHour }= restriction;

  // verificamos si hoy es un dia restringido
  if(!days.includes(currentDay)){
    return false;
  }
  const [startHourInt, startMinutesInt] = startHour.split(':').map(Number);
  const [endHourInt, endMinutesInt] = endHour.split(':').map(Number);

  const startTime = new Date();
  startTime.setHours(startHourInt, startMinutesInt, 0);

  const endTime = new Date();
  endTime.setHours(endHourInt, endMinutesInt, 0);

  return currentTime >= startTime && currentTime <= endTime;


}

// Función para obtener las zonas desde la base de datos
export const fetchZones = async (): Promise<Site[]> => {
  try {
    const response = await api.get('sites/active');
    return response.data;
  } catch (error) {
    console.error('Error fetching zones:', error);
    return [];
  }
};
// Función para generar polígonos a partir de las zonas
export const generatePolygons = (zones: Site[]) => {
  
  return zones.map(zone => ({
    name: zone.name,
    coordinates: zone.coordinates.map(coord => [coord.lat, coord.lng] as [number, number]),
    restriction: zone.restriction,
    coordinatesrestriction: zone.coordinatesrestriction.map(coord => [coord.lat, coord.lng] as [number, number]),
    isActive: isZoneActive(zone.restriction)
  }));
};


// Función para unir los polígonos superpuestos
export const unifyPolygons = (zones: Site[]) => {
  const turfPolygons = zones.map(zone =>
    turf.polygon([zone.coordinatesrestriction.map(coord => [coord.lng, coord.lat])])
  );
  // Convertir POLYGON_ENVIGADO a Feature<GeoJsonPolygon>
  const containerPolygon: Feature<GeoJsonPolygon, GeoJsonProperties> = turf.polygon([POLYGON_ENVIGADO]);

  // Convertir turfPolygons a Features<GeoJsonPolygon>
  const turfPolyFeatures: Feature<GeoJsonPolygon, GeoJsonProperties>[] = turfPolygons.map(polygon =>
    turf.polygon(polygon.geometry.coordinates)
  );
let x = turfPolyFeatures[0]
  // console.log(  turfPolyFeatures  );
  // Crear un MultiPolygon con el contenedor y los polígonos adicionales
  const allPolygons: Feature<GeoJsonMultiPolygon, GeoJsonProperties> = turf.multiPolygon([
    containerPolygon.geometry.coordinates,
    x.geometry.coordinates
  ]); 
  // console.log(  allPolygons.geometry.coordinates );
  
  let unifiedPolygon;

  // Si es MultiPolygon, obtener las coordenadas del primer polígono
  if (allPolygons.geometry.type === 'MultiPolygon') {
    unifiedPolygon = allPolygons.geometry.coordinates;
  }

  // console.log(unifiedPolygon);
  
  return unifiedPolygon;
};