
import React from 'react';
import MapView from './components/mapview/MapView';
import Header from './components/header/Header';
import './App.css';


const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <div className="map-cont"> 
        <MapView />
      </div>
    </div>
  );
}

export default App
