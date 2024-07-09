import * as turf from '@turf/turf';
import { Feature, GeoJsonProperties, Polygon as GeoJsonPolygon, MultiPolygon as GeoJsonMultiPolygon } from 'geojson';
import { Zone } from './Zone';
import api from '../services/api';
import { POLYGON_ENVIGADO } from '../types/Variables'

// Función para obtener las zonas desde la base de datos
export const fetchZones = async (): Promise<Zone[]> => {
  try {
    const response = await api.get('zones');
    return response.data;
  } catch (error) {
    console.error('Error fetching zones:', error);
    return [];
  }
};
// Función para generar polígonos a partir de las zonas
export const generatePolygons = (zones: Zone[]) => {
  return zones.map(zone => ({
    name: zone.name,
    coordinates: zone.coordinates.map(coord => [coord.lat, coord.lng] as [number, number]),
    restriction: zone.restriction,
    coordinatesrestriction: zone.coordinatesrestriction.map(coord => [coord.lat, coord.lng] as [number, number])
  }));
};


// Función para unir los polígonos superpuestos
export const unifyPolygons = (zones: Zone[]) => {
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