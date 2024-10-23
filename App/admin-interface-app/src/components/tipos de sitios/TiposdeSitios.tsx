import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, FloatingLabel } from 'react-bootstrap';
import { SiteType } from '../../types/types';
import './TiposdeSitios.css';
import api from '../../services/api';

const SiteTypeForm: React.FC = () => {
  const [siteTypes, setSiteTypes] = useState<SiteType[]>([]);
  const [newSiteType, setNewSiteType] = useState<SiteType>({
    name: '',
    radius: 0,
    restriction: {
      days: [],
      startHour: '',
      endHour: '',
    }
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    api.get<SiteType[]>(`site-types`)
      .then(response => setSiteTypes(response.data))
      .catch(error => console.error('Error fetching site types:', error));
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSiteType(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSiteType(prevState => ({
      ...prevState,
      restriction: {
        ...prevState.restriction,
        [name]: value
      }
    }));
  };
  const handleCheckboxChange = (day: string) => {
    setNewSiteType(prevState => {
      const { restriction } = prevState;
      const { days } = restriction;
      const updatedDays = days.includes(day) ? days.filter(d => d !== day) : [...days, day];
      return {
        ...prevState,
        restriction: {
          ...restriction,
          days: updatedDays
        }
      };
    });
  };

  const handleSave = () => {
    if (newSiteType.name && newSiteType.radius > 0) {
      
      if (isEditing) {
        api.put(`site-types/${newSiteType.name}`, newSiteType)
          .then(response => {
            setSiteTypes(siteTypes.map(siteType =>
              siteType.name === newSiteType.name ? response.data : siteType
            ));
            resetForm();
          })
          .catch(error => console.error('Error updating site type:', error));
      } else {
        
        console.log(newSiteType.name+' - '+newSiteType.radius);
        api.post(`site-types`, newSiteType)
          .then(response => {
            setSiteTypes([...siteTypes, response.data]);
            resetForm();
          })
          .catch(error => console.error('Error saving site type:', error));
      }
    }
  };

  const handleEdit = (siteType: SiteType) => {
    setNewSiteType(siteType);
    setIsEditing(true);
  };

  const resetForm = () => {
    setNewSiteType({
      name: '',
      radius: 0,
      restriction: {
        days: [],
        startHour: '',
        endHour: '',
      }
    });
    setIsEditing(false);
  };

  return (
    <Container fluid className="h-80 cont-body d-flex justify-content-around align-items-center">
      <Row>
        <Col>
          <h1>Tipos de Sitios</h1>
          <p>Administre los tipos de sitios y sus restricciones.</p>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <FloatingLabel controlId="floatingTextarea" label="Tipo de Sitio" className="m-5">
                    <Form.Control
                      autoFocus
                      type="text"
                      name="name"
                      value={newSiteType.name}
                      onChange={handleInputChange} />
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <FloatingLabel controlId="floatingTextarea" label="Radio (metros)" className="m-5">
                    <Form.Control
                      type="number"
                      name="radius"
                      value={newSiteType.radius}
                      onChange={handleInputChange} />
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group>
                  <Form.Label className='m-5 mb-0 mt-0'>Restricciones</Form.Label>
                  <div className='m-5 d-flex justify-content-around'>
                    {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(day => (
                      <Form.Check
                        key={day}
                        type="checkbox"
                        label={day}
                        checked={newSiteType.restriction.days.includes(day)}
                        onChange={() => handleCheckboxChange(day)} />
                    ))}
                  </div>
                  <FloatingLabel controlId="floatingTextarea" label="Hora de inicio" className="m-5">
                    <Form.Control
                      type="time"
                      name="startHour"
                      value={newSiteType.restriction.startHour}
                      onChange={handleTimeChange} />
                    </FloatingLabel>
                  <FloatingLabel controlId="floatingTextarea" label="Hora de fin" className="m-5">
                    <Form.Control
                      type="time"
                      name="endHour"
                      onChange={handleTimeChange} />
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
            <Row className='wd-100 d-flex justify-content-center'>
              <Button className='btn-frm' variant="primary" onClick={handleSave}>
                {isEditing ? 'Editar' : 'Guardar nuevo'}
              </Button>
            </Row>
            
          </Form>
        </Col>
        <Col>
          <h2>Lista de Tipos de Sitios</h2>
          <Table striped bordered hover className='rounded-5'>
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Radio (metros)</th>
                  <th>Días</th>
                  <th>Hora de Inicio</th>
                  <th>Hora de Fin</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {siteTypes.map((siteType) => (
                  <tr key={siteType.name}>
                    <td>{siteType.name}</td>
                    <td>{siteType.radius}</td>
                    <td>{siteType.restriction.days.join(', ')}</td>
                    <td>{siteType.restriction.startHour}</td>
                    <td>{siteType.restriction.endHour}</td>
                    <td>
                      <Button variant="warning" onClick={() => handleEdit(siteType)}>Editar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
          </Table>
        </Col>          
      </Row>
    </Container>
  );
};

  export default SiteTypeForm;
