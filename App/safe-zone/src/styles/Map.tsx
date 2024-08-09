import L from 'leaflet';
import iconUrl from '../assets/Person.svg'; // Importa la imagen directamente

const iconPerson = new L.Icon({
    iconUrl,
    iconRetinaUrl: iconUrl,
    iconAnchor: undefined,
    popupAnchor: undefined,
    shadowUrl: undefined,
    shadowSize: undefined,
    shadowAnchor: undefined,
    iconSize: new L.Point(35, 75),
    className: 'markerme'
});

export { iconPerson, iconUrl};