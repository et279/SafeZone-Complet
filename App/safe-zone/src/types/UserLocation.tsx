import React, { useState, useEffect } from 'react';

const UserLocation: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener la ubicación del usuario
  const getUserLocation = () => {
    // Verificar si el navegador soporta la geolocalización
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    // Obtener la ubicación
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setError(null); // Resetear el error
      },
      (err) => {
        setError(`Error retrieving location: ${err.message}`);
      }
    );
  };

  useEffect(() => {
    // Llamar a la función cuando el componente se monta
    getUserLocation();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {location ? (
        <p>
          User Location: Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      ) : (
        <p>Getting location...</p>
      )}
    </div>
  );
};

export default UserLocation;
