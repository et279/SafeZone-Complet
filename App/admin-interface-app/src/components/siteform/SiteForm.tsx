import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

// Definiciones de tipos
type Site = {
  _id?: string;
  name: string;
  coordinates: { lat: number; lng: number }[];
  radius: number;
  type: string;
  restriction: Restriction;
};

type Restriction = {
  days: string[];
  startHour: string;
  endHour: string;
};

const defaultData: { [key: string]: Site } = {
  'Centro Educativo': {
    name: '',
    coordinates: [{ lat: 0, lng: 0 }],
    radius: 100,
    type: 'Centro Educativo',
    restriction: {
      days: ['Todos los días'],
      startHour: '05:00',
      endHour: '22:00'
    }
  },
  'Ludoteca': {
    name: '',
    coordinates: [{ lat: 0, lng: 0 }],
    radius: 50,
    type: 'Ludoteca',
    restriction: {
      days: ['Lunes', 'Miércoles', 'Viernes'],
      startHour: '09:00',
      endHour: '17:00'
    }
  },
  'Centro Deportivo': {
    name: '',
    coordinates: [{ lat: 0, lng: 0 }],
    radius: 80,
    type: 'Centro Deportivo',
    restriction: {
      days: ['Todos los días'],
      startHour: '05:00',
      endHour: '22:00'
    }
  },
  'Zona Histórica': {
    name: '',
    coordinates: [{ lat: 0, lng: 0 }],
    radius: 80,
    type: 'Zona Histórica',
    restriction: {
      days: ['Todos los días'],
      startHour: '00:00',
      endHour: '23:59'
    }
  },
  'Espacio Público': {
    name: '',
    coordinates: [{ lat: 0, lng: 0 }],
    radius: 80,
    type: 'Espacio Público',
    restriction: {
      days: ['Todos los días'],
      startHour: '00:00',
      endHour: '23:59'
    }
  },
  'Evento Público': {
    name: '',
    coordinates: [{ lat: 0, lng: 0 }],
    radius: 80,
    type: 'Evento Público',
    restriction: {
      days: ['Durante el evento'],
      startHour: '00:00',
      endHour: '23:59'
    }
  },
  'Evento Privado': {
    name: '',
    coordinates: [{ lat: 0, lng: 0 }],
    radius: 80,
    type: 'Evento Privado',
    restriction: {
      days: ['Durante el evento'],
      startHour: '2 horas antes',
      endHour: '2 horas después'
    }
  },
  'Hospital': {
    name: '',
    coordinates: [{ lat: 0, lng: 0 }],
    radius: 80,
    type: 'Hospital',
    restriction: {
      days: ['Todos los días'],
      startHour: '00:00',
      endHour: '23:59'
    }
  }
};


const parseCoordinates = (coords: string): { lat: number, lng: number }[] => {
  return coords.split(' ').map(coord => {
    const [lng, lat] = coord.split(',').map(Number);
    return { lat, lng };
  });
};

const stringifyCoordinates = (coords: { lat: number, lng: number }[]): string => {
  return coords.map(coord => `${coord.lng},${coord.lat}`).join(' ');
};

const SiteForm: React.FC = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [formData, setFormData] = useState<Site>({
    name: '',
    coordinates: [],
    radius: 100,
    type: '',
    restriction: {
      days: [],
      startHour: '',
      endHour: ''
    }
  });
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const response = await axios.get('http://localhost:3000/zones');
      if (Array.isArray(response.data)) {
        setSites(response.data);
      } else {
        setSites([]);
      }
    } catch (error) {
      console.error('Error fetching sites:', error);
      setSites([]);
    }
  };

  const handleSelectSite = (siteId: string) => {
    const site = sites.find((s) => s._id === siteId);
    if (site) {
      setFormData({ ...site, coordinates: parseCoordinates(stringifyCoordinates(site.coordinates)) });
      setSelectedSite(site);
      setIsEditing(true);
      setShowPopup(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'type') {
      const typeData = defaultData[value as keyof typeof defaultData];
      setFormData({
        ...formData,
        [name]: value,
        radius: typeData.radius,
        restriction: typeData.restriction
      });
    } else if (name === 'coordinates') {
      setFormData({
        ...formData,
        coordinates: parseCoordinates(value)
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  // actualizar sitio
  const handleSave = async () => {
    try {
      const saveData = { ...formData, coordinates: parseCoordinates(stringifyCoordinates(formData.coordinates)) };
  
      if (isEditing && selectedSite && selectedSite._id) {
        await axios.put(`http://localhost:3000/zones/${selectedSite._id}`, saveData);
        console.log(`Actualizando sitio con ID: ${selectedSite._id}`);
      } else {
        console.log(`Datos para crear:`, saveData);
        await axios.post('http://localhost:3000/zones', saveData);
      }
      setShowConfirmation(true);
      fetchSites();
      handleNew();
    } catch (error) {
      console.error('Error saving site:', error);
      if (axios.isAxiosError(error)) {
        console.error('Error data:', error.response?.data);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };
  // limpia el formulario y lo deja listo para guardar un nuevo sitio
  const handleNew = () => {
    setFormData({
      name: '',
      coordinates: [],
      radius: 100,
      type: '',
      restriction: {
        days: [],
        startHour: '',
        endHour: ''
      }
    });
    setIsEditing(false);
    setSelectedSite(null);
  };

  return (
    <Container>
      <h1>Gestión de Sitios</h1>
      <p>Utiliza las opciones a continuación para agregar o editar sitios.</p>
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
            rows={3}
            name="coordinates"
            value={stringifyCoordinates(formData.coordinates)}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formType">
          <Form.Label>Tipo</Form.Label>
          <Form.Control
            as="select"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          >
            <option value="">Selecciona un tipo</option>
            {Object.keys(defaultData).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formRadius">
          <Form.Label>Radio</Form.Label>
          <Form.Control
            type="number"
            name="radius"
            value={formData.radius}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formDays">
          <Form.Label>Días de Restricción</Form.Label>
          <Form.Control
            type="text"
            name="days"
            value={formData.restriction.days.join(', ')}
            onChange={(e) => setFormData({ ...formData, restriction: { ...formData.restriction, days: e.target.value.split(', ') } })}
          />
        </Form.Group>
        <Form.Group controlId="formStartHour">
          <Form.Label>Hora de Inicio</Form.Label>
          <Form.Control
            type="time"
            name="startHour"
            value={formData.restriction.startHour}
            onChange={(e) => setFormData({ ...formData, restriction: { ...formData.restriction, startHour: e.target.value } })}
          />
        </Form.Group>
        <Form.Group controlId="formEndHour">
          <Form.Label>Hora de Fin</Form.Label>
          <Form.Control
            type="time"
            name="endHour"
            value={formData.restriction.endHour}
            onChange={(e) => setFormData({ ...formData, restriction: { ...formData.restriction, endHour: e.target.value } })}
          />
        </Form.Group>
        <Button onClick={handleSave} variant="primary" className="mt-3">{isEditing ? 'Editar' : 'Guardar Nuevo'}</Button>
      </Form>

      <Modal show={showPopup} onHide={() => setShowPopup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Sitio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="selectSite">
            <Form.Label>Selecciona un sitio</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => handleSelectSite(e.target.value)}
            >
              <option value="">Selecciona un sitio</option>
              {Array.isArray(sites) && sites.map((site) => (
                <option key={site._id} value={site._id}>
                  {site.name}
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
