import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import { MapContainer, TileLayer, Polygon, useMap } from 'react-leaflet';
import * as turf from '@turf/turf';
import 'leaflet/dist/leaflet.css';
import './PerimeterInterface.css';
import { Site, PolygonData, SiteType } from '../../types/types';
import { DEFAULT_MAP_ZOOM, DEFAULT_MAP_CENTER } from '../../types/variables';
import api from '../../services/api';

const PerimeterInterface: React.FC = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [selectedSitesList, setSelectedSitesList] = useState<Site[]>([]);
  const [polygons, setPolygons] = useState<PolygonData[]>([]);
  const [generatedBuffers, setGeneratedBuffers] = useState<boolean>(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>(DEFAULT_MAP_CENTER);
  const [mapZoom, setMapZoom] = useState<number>(DEFAULT_MAP_ZOOM);
  const [siteTypes, setSiteTypes] = useState<SiteType[]>([]);


  useEffect(() => {
    const fetchZonesAndSiteTypes = async () => {
      try {
        const [zonesResponse, siteTypesResponse] = await Promise.all([
          api.get<Site[]>('zones'),
          api.get<SiteType[]>('site-types')
        ]);
        setSites(zonesResponse.data);
        setSiteTypes(siteTypesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchZonesAndSiteTypes();
  }, []);

  
  // agregar todos los sitios a la lista
  const handleAddAllSites = () => {
    const allSites = sites.filter(site => !selectedSitesList.some(selectedSite => selectedSite._id === site._id));
    setSelectedSitesList([...selectedSitesList, ...allSites]);
  
    const newPolygons = allSites.map(site => ({
      coordinates: site.coordinates.map(coord => [coord.lat, coord.lng] as [number, number]),
      color: 'blue',
      siteId: site._id
    }));
  
    const restrictedPolygons = allSites
      .filter(site => site.coordinatesrestriction.length > 0)
      .map(site => ({
        coordinates: site.coordinatesrestriction.map(coord => [coord.lat, coord.lng] as [number, number]),
        color: 'orange',
        siteId: site._id
      }));
  
    setPolygons([...polygons, ...newPolygons, ...restrictedPolygons]);
  
    if (allSites.length > 0 && allSites[0].coordinates.length > 0) {
      const firstCoordinate = allSites[0].coordinates[0];
      setMapCenter([firstCoordinate.lat, firstCoordinate.lng]);
      setMapZoom(DEFAULT_MAP_ZOOM);
    }
  };
  
  // eliminar todos los sitios de la lista
  const handleRemoveAllSites = () => {
    setSelectedSitesList([]);
    setPolygons([]);
    setMapCenter(DEFAULT_MAP_CENTER);
    setMapZoom(DEFAULT_MAP_ZOOM);
    setGeneratedBuffers(false);
  };
  
  // agregar sitios a la lista
  const handleAddSite = () => {
    if (selectedSite && !selectedSitesList.some(site => site._id === selectedSite)) {
      const siteToAdd = sites.find(site => site._id === selectedSite);
      if (siteToAdd) {
        setSelectedSitesList([...selectedSitesList, siteToAdd]);

        const newPolygon: PolygonData = {
          coordinates: siteToAdd.coordinates.map(coord => [coord.lat, coord.lng]),
          color: 'blue',
          siteId: siteToAdd._id
        };

        if (siteToAdd.coordinatesrestriction.length > 0) {
          const restrictedPolygon: PolygonData = {
            coordinates: siteToAdd.coordinatesrestriction.map(coord => [coord.lat, coord.lng]),
            color: 'orange',
            siteId: siteToAdd._id
          };
          setPolygons([...polygons, newPolygon, restrictedPolygon]);
        } else {
          setPolygons([...polygons, newPolygon]);
        }

        // Centrar el mapa en el primer punto del polígono agregado
        if (siteToAdd.coordinates.length > 0) {
          const firstCoordinate = siteToAdd.coordinates[0];
          setMapCenter([firstCoordinate.lat, firstCoordinate.lng]);
          setMapZoom(DEFAULT_MAP_ZOOM); // Ajusta el zoom al agregar un sitio
        }
      }
    }
  };
  //eliminar sitios de la lista
  const handleRemoveSite = (siteToRemove: Site) => {
    setSelectedSitesList(selectedSitesList.filter(site => site._id !== siteToRemove._id));
    setPolygons(polygons.filter(polygon => polygon.siteId !== siteToRemove._id));
    
    // Centrar el mapa en el primer punto del polígono eliminado
    if (siteToRemove.coordinates.length > 0) {
      const firstCoordinate = siteToRemove.coordinates[0];
      setMapCenter([firstCoordinate.lat, firstCoordinate.lng]);
      setMapZoom(16); // Ajusta el zoom al eliminar un sitio
    } else {
      setMapCenter([6.175, -75.591]); // Ubicación por defecto si no hay coordenadas
      setMapZoom(16); // Zoom por defecto
    }
    
    // Actualizar el estado de generatedBuffers
    const hasBuffers = polygons.some(polygon => polygon.color === 'red' && polygon.siteId === siteToRemove._id);
    setGeneratedBuffers(hasBuffers);
  };
  // Generar los buffers
  const handleGenerateBuffer = () => {
    const newPolygons = selectedSitesList.map(site => {
      const coordinates = site.coordinates.map(coord => [coord.lng, coord.lat]);

      // Verificar si el polígono está cerrado y cerrarlo si es necesario
      if (coordinates.length > 0 && (coordinates[coordinates.length - 1][0] !== coordinates[0][0] || coordinates[coordinates.length - 1][1] !== coordinates[0][1])) {
        coordinates.push(coordinates[0]);
      }
      // Buscar el tipo de sitio por su ID
      const siteType = siteTypes.find(type => type._id === site.type);
      if (!siteType || typeof siteType.radius !== 'number') {
        console.error('Site type or radius is missing for site:', site.name);
        return null;
      }

      const polygon = turf.polygon([coordinates]);
      const buffered = turf.buffer(polygon, siteType.radius, { units: 'meters' });

      if (buffered) {
        return {
          coordinates: buffered.geometry.coordinates[0].map(coord => [coord[1], coord[0]]),
          color: 'red',
          siteId: site._id
        };
      } else {
        console.error('Error generating buffer for site:', site.name);
        return null;
      }
    }).filter(polygon => polygon !== null) as PolygonData[];

    setPolygons([...polygons, ...newPolygons]);
    setGeneratedBuffers(true);
  };

  // Guardar buffer
  const handleSaveBuffers = () => {
    selectedSitesList.forEach(site => {
        const bufferedPolygon = polygons.find(polygon => polygon.siteId === site._id && polygon.color === 'red');
        if (bufferedPolygon) {
          api.post(`zone/save-restriction-coordinates/${site._id}`, {
                restrictionCoordinates: bufferedPolygon.coordinates.map(coord => ({
                    lat: coord[0],
                    lng: coord[1]
                }))
            })
            .then(response => console.log('Buffer saved for site:', site.name))
            .catch(error => console.error('Error saving buffer:', error));
        }
    });
};


  const MapEffect: React.FC<{ center: [number, number], zoom: number }> = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, zoom);
    }, [center, zoom, map]);

    return null;
  };

  return (
    <Container fluid className="h-80">
      
      <Row className="h-100">
        <Col md={5} className="border-right">
          <h1 className='text-center'>Interfaz de Perímetro</h1>
          <p className='text-center pb-4'>Gestiona los perímetros de los sitios protegidos.</p>
          <p>Seleccione un Sitio</p>
          <Form>
            <Row className="align-items-center">
              <Col md={9}>
                <Form.Group controlId="siteSelect" style={{ maxWidth: '100%' }}>
                  <Form.Control 
                    as="select"
                    onChange={(e) => setSelectedSite(e.target.value)}
                  >
                    <option value="">Selecciona un sitio</option>
                    {sites.map((site) => (
                      <option key={site._id} value={site._id}>
                        {site.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Button variant="primary" onClick={handleAddSite} style={{ maxWidth: '100%' }}>
                  <i className="bi bi-plus-circle"></i> Agregar Sitio
                </Button>
              </Col>
            </Row>
            <Row className="align-items-center mt-3">
              <Col md={6}>
                <Button variant="primary" onClick={handleAddAllSites} style={{ maxWidth: '100%' }}>
                  <i className="bi bi-plus-circle"></i> Agregar Todas las Zonas
                </Button>
              </Col>
              <Col md={6}>
                <Button variant="danger" onClick={handleRemoveAllSites} style={{ maxWidth: '100%' }}>
                  <i className="bi bi-trash"></i> Eliminar Todas las Zonas
                </Button>
              </Col>
            </Row>
          </Form>
          <h2>Sitios Seleccionados</h2>
          <ListGroup  >
            {selectedSitesList.map((site) => (
              <ListGroup.Item key={site._id} onClick={() => setSelectedSite(site._id)}>
                {site.name}
                <Button variant="danger" onClick={() => handleRemoveSite(site)}>
                  <i className="bi bi-trash"></i> Eliminar
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Row className='flex-row-reverse pt-4'>
            <Col md={3}  >
              <Button
                variant="secondary"
                onClick={handleGenerateBuffer}
                disabled={selectedSitesList.length === 0}
              >
                <i className="bi bi-geo-fill"></i> Generar Buffers
              </Button>
            </Col>
            <Col md={3} className='justify-content-center'>
              <Button
                variant="success"
                onClick={handleSaveBuffers}
                disabled={!generatedBuffers}
              >
                <i className="bi bi-save"></i> Guardar Buffers
              </Button>
            </Col>
          </Row>
        </Col>
        <Col md={7} className="p-0">
          <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: 'calc(80vh - 56px)', width: '100%' }}>
            <MapEffect center={mapCenter} zoom={mapZoom} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {polygons.map((polygon, index) => (
              <Polygon key={index} positions={polygon.coordinates} color={polygon.color} />
            ))}
          </MapContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default PerimeterInterface;
