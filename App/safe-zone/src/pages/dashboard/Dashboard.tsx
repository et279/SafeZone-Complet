import React from 'react';
import MapComponent from '../../components/mapComponent/MapComponent';
import SitesComponent from '../../components/sitesComponent/sitesComponent';
import User from '@components/user/User';
import './Dashboard.css';

const Dashboard : React.FC = () => {
  return (
    <div className={`main-content`}>
        {/* Cuadrícula de componentes */}
        <div id='map' className={`component-container `}>
        <MapComponent/>
        </div>
        <div id='user' className={`component-container `}>
        <User />
        </div>
        <div id='data' className={`component-container `}>
        <SitesComponent />
        </div>
        <div id='data2' className={`component-container `}>
        <SitesComponent />
        </div>
        {/* Puedes agregar más componentes aquí siguiendo el mismo patrón */}
    </div>
  );
}

export default Dashboard;
