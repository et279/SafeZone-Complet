import React from 'react';
import './Profile.css';

interface ProfileProps {
  closeOverlay: () => void;
}

const Profile: React.FC<ProfileProps> = ({ closeOverlay }) => {
  return (
    <div className="profile-overlay">
      <div className="profile-content">
        <h2>Perfil de Usuario</h2>
        {/* Aquí va el contenido del perfil */}
        <button onClick={closeOverlay}>Cerrar</button>
      </div>
    </div>
  );
};

export default Profile;
