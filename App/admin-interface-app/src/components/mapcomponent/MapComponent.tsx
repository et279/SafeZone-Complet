// src/components/MapComponent.tsx

import React from 'react';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import L from 'leaflet';

interface Coordinate {
  lat: number;
  lng: number;
}

interface MapComponentProps {
  originalCoordinates: Coordinate[];
  bufferedCoordinates: Coordinate[];
}

const MapComponent: React.FC<MapComponentProps> = ({ originalCoordinates, bufferedCoordinates }) => {
  return (
    <MapContainer center={[originalCoordinates[0].lat, originalCoordinates[0].lng]} zoom={16} style={{ height: "400px", width: "100%", zIndex: 80}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {originalCoordinates.length > 0 && (
        <Polygon positions={originalCoordinates.map(coord => [coord.lat, coord.lng] as [number, number])} color="blue" />
      )}
      {bufferedCoordinates.length > 0 && (
        <Polygon positions={bufferedCoordinates.map(coord => [coord.lat, coord.lng] as [number, number])} color="red" />
      )}
    </MapContainer>
  );
};

export default MapComponent;
