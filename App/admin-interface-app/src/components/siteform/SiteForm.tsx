import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { DATABASE_URL } from '../../types/variables';
import { Site, SiteType } from '../../types/types';

const parseCoordinates = (coords: string): { lat: number, lng: number }[] => {
  // Eliminar todas las comas y reducir espacios múltiples a uno solo
  const cleanedString = coords.replace(/,/g, '').replace(/\s+/g, ' ').trim();
  console.log(cleanedString);
  
  // Dividir el string en números
  const numbers = cleanedString.split(' ').map(Number);

  // Convertir los números en pares de coordenadas { lat, lng }
  const parsedCoordinates = [];
  for (let i = 0; i < numbers.length; i += 2) {
    if (i + 1 < numbers.length) {
      parsedCoordinates.push({ lat: numbers[i], lng: numbers[i + 1] });
    }
  }

  return parsedCoordinates;
};


// Función para convertir coordenadas de array de objetos a string
const stringifyCoordinates = (coords: { lat: number, lng: number }[]): string => {
  return coords.map(coord => `${coord.lat},${coord.lng}`).join('\n');
};

const SiteForm: React.FC = () => {
  // Estado para manejar el contenido de coordenadas
  const [coordinatesString, setCoordinatesString] = useState<string>('');
  // Estado para almacenar las zonas
  const [zones, setZones] = useState<Site[]>([]);
  // Estado para almacenar los tipos de sitio
  const [siteTypes, setSiteTypes] = useState<SiteType[]>([]);
  // Estado para almacenar la zona seleccionada
  const [selectedZone, setSelectedZone] = useState<Site | null>(null);
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState<Site>({
    _id: '',
    name: '',
    coordinates: [],
    type: { name: '', radius: 0, restriction: { days: [], startHour: '', endHour: '' }},
    coordinatesrestriction: [],
  });
  // Estado para manejar las coordenadas individuales
  const [coordinates, setCoordinates] = useState<{ lat: string, lng: string }[]>([]);
  // Estado para manejar la visibilidad del popup
  const [showPopup, setShowPopup] = useState(false);
  // Estado para manejar si se está editando una zona existente
  const [isEditing, setIsEditing] = useState(false);
  // Estado para manejar la visibilidad del modal de confirmación
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Efecto para obtener las zonas y los tipos de sitio al cargar el componente
  useEffect(() => {
    fetchZones();
    fetchSiteTypes();
  }, []);

  // Función para obtener las zonas desde la base de datos
  const fetchZones = async () => {
    try {
      const response = await axios.get(`${DATABASE_URL}zones`);
      if (Array.isArray(response.data)) {
        setZones(response.data);
      } else {
        setZones([]);
      }
    } catch (error) {
      console.error('Error fetching zones:', error);
      setZones([]);
    }
  };

  // Función para obtener los tipos de sitio desde la base de datos
  const fetchSiteTypes = async () => {
    addCoordinateField()
    addCoordinateField()
    try {
      const response = await axios.get(`${DATABASE_URL}site-types`);
      if (Array.isArray(response.data)) {
        setSiteTypes(response.data);
      } else {
        setSiteTypes([]);
      }
    } catch (error) {
      console.error('Error fetching site types:', error);
      setSiteTypes([]);
    }
  };

  // Función para manejar la selección de una zona
  const handleSelectZone = (zoneId: string) => {
    const zone = zones.find((z) => z._id === zoneId);
    if (zone) {
      setFormData({ ...zone, coordinates: zone.coordinates });
      setCoordinatesString(stringifyCoordinates(zone.coordinates));
      setSelectedZone(zone);
      setIsEditing(true);
      setShowPopup(false);
    }
  };

  // Función para manejar los cambios en los campos del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'type') {
      const typeData = siteTypes.find((type) => type.name === value);
      if (typeData) {
        setFormData({
          ...formData,
          type: typeData,
          coordinatesrestriction: formData.coordinates, // Actualizar coordenadas de restricción
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Función para manejar los cambios del textarea de coordinadas
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCoordinatesString(e.target.value);
  };

  // Función para agregar un nuevo campo de coordenadas
  const addCoordinateField = () => {
    setCoordinates([...coordinates, { lat: '', lng: '' }]);
  };

  const handleSave = async () => {
    try {
      const parsedCoordinates = parseCoordinates(coordinatesString);
      if (parsedCoordinates.some(coord => isNaN(coord.lat) || isNaN(coord.lng))) {
        alert('Las coordenadas ingresadas no son válidas. Asegúrate de usar el formato correcto.');
        return;
      }
  
      const saveData = {
        ...formData,
        coordinates: parsedCoordinates,
        coordinatesrestriction: parsedCoordinates,
      };
  
      if (parsedCoordinates.length > 0 &&
          (parsedCoordinates[0].lat !== parsedCoordinates[parsedCoordinates.length - 1].lat ||
           parsedCoordinates[0].lng !== parsedCoordinates[parsedCoordinates.length - 1].lng)) {
        parsedCoordinates.push(parsedCoordinates[0]);
        saveData.coordinatesrestriction.push(parsedCoordinates[0]);
      }
  
      if (isEditing && selectedZone && selectedZone._id) {
        await axios.put(`${DATABASE_URL}zones/${selectedZone._id}`, saveData);
      } else {
        await axios.post(`${DATABASE_URL}zones`, saveData);
      }
  
      setShowConfirmation(true);
      fetchZones();
      handleNew();
    } catch (error) {
      console.error('Error saving zone:', error);
      if (axios.isAxiosError(error)) {
        console.error('Error data:', error.response?.data);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };
  
  // Función para limpiar el formulario y preparar para una nueva entrada
  const handleNew = () => {
    setFormData({
      _id: '',
      name: '',
      coordinates: [],
      type: { name: '', radius: 0, restriction: { days: [], startHour: '', endHour: '' }},
      coordinatesrestriction: [],
    });
    setCoordinatesString(''); // Limpiar el textarea de coordenadas
    setIsEditing(false);
    setSelectedZone(null);
  };

  return (
    <Container>
      <h1>Gestión de Zonas</h1>
      <p>Utiliza las opciones a continuación para agregar o editar zonas.</p>
      <Row>
        <Col>
          <Button onClick={() => setShowPopup(true)} variant="primary" className="mb-3">Editar</Button>
        </Col>
        <Col>
          <Button onClick={handleNew} variant="primary" className="mb-3">Nuevo</Button>
        </Col>
      </Row>

      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formCoordinates">
          <Form.Label>Coordenadas</Form.Label>
          <Form.Control
            as="textarea"
            name="coordinates"
            value={coordinatesString}
            onChange={handleTextAreaChange}
            rows={5}
          />
        </Form.Group>
        <Form.Group controlId="formType">
          <Form.Label>Tipo</Form.Label>
          <Form.Control
            as="select"
            name="type"
            value={formData.type.name}
            onChange={handleInputChange}
          >
            <option value="">Selecciona un tipo</option>
            {siteTypes.map((type) => (
              <option key={type.name} value={type.name}>
                {type.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button onClick={handleSave} variant="primary" className="mt-3">{isEditing ? 'Editar' : 'Guardar Nuevo'}</Button>
      </Form>

      <Modal show={showPopup} onHide={() => setShowPopup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Zona</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="selectZone">
            <Form.Label>Selecciona una zona</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => handleSelectZone(e.target.value)}
            >
              <option value="">Selecciona una zona</option>
              {zones.map((zone) => (
                <option key={zone._id} value={zone._id}>
                  {zone.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPopup(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Datos Guardados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Los datos han sido guardados exitosamente:</p>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmation(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SiteForm;

