import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function FormularioNuevoReclamo() {
  const navigate = useNavigate();
  const [reclamo, setReclamo] = useState({
    fecha: '',
    empleado: '',
    idOrdenCompra: '',
    equipo: '',
    nombreEquipo: '',
    descripcion: '',
    prioridad: 'MEDIA',
    estado: 'ABIERTO',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReclamo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!reclamo.fecha) {
      Swal.fire('Error', 'Ingresá la fecha', 'error');
      return;
    }

    if (!reclamo.empleado) {
      Swal.fire('Error', 'Ingresá el empleado que realiza el reclamo', 'error');
      return;
    }

    if (!reclamo.nombreEquipo) {
      Swal.fire('Error', 'Ingresá el nombre del equipo', 'error');
      return;
    }

    if (!reclamo.descripcion) {
      Swal.fire('Error', 'Ingresá una descripción', 'error');
      return;
    }

    if (!reclamo.idOrdenCompra && !reclamo.equipo) {
      Swal.fire('Error', 'Debes completar al menos uno de los campos opcionales (ID Orden de compra o Equipo)', 'error');
      return;
    }

    const payload = {
      ...reclamo,
      id: Math.floor(Math.random() * 10000),
      fechaCreacion: new Date().toISOString(),
    };

    console.log('Nuevo reclamo:', payload);
    Swal.fire('Éxito', 'Reclamo creado exitosamente (simulación)', 'success');

    // Reset
    setReclamo({
      fecha: '',
      empleado: '',
      idOrdenCompra: '',
      equipo: '',
      nombreEquipo: '',
      descripcion: '',
      prioridad: 'MEDIA',
      estado: 'ABIERTO',
    });
  };

  const handleCancel = () => {
    navigate('/reclamos');
  };

  return (
    <div className="p-4">
      <div className="position-relative">
        <h2>Nuevo Reclamo</h2>
        <Button
          variant="danger"
          size="sm"
          onClick={handleCancel}
          aria-label="Cerrar formulario"
          className="position-absolute top-0 end-0 m-3 text-white"
          style={{ lineHeight: 1 }}
        >
          X
        </Button>
      </div>

      <Card className="p-4 mt-3">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="fecha">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="date"
                  name="fecha"
                  value={reclamo.fecha}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="empleado">
                <Form.Label>Empleado que realiza el reclamo</Form.Label>
                <Form.Control
                  type="text"
                  name="empleado"
                  value={reclamo.empleado}
                  onChange={handleChange}
                  placeholder="Nombre del empleado"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="idOrdenCompra">
                <Form.Label>ID Orden de compra (opcional)</Form.Label>
                <Form.Control
                  type="text"
                  name="idOrdenCompra"
                  value={reclamo.idOrdenCompra}
                  onChange={handleChange}
                  placeholder="ID de la orden"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="equipo">
                <Form.Label>Equipo (opcional)</Form.Label>
                <Form.Control
                  type="text"
                  name="equipo"
                  value={reclamo.equipo}
                  onChange={handleChange}
                  placeholder="ID o código del equipo"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="nombreEquipo">
                <Form.Label>Nombre equipo</Form.Label>
                <Form.Control
                  type="text"
                  name="nombreEquipo"
                  value={reclamo.nombreEquipo}
                  onChange={handleChange}
                  placeholder="Nombre del equipo"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="descripcion">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="descripcion"
                  value={reclamo.descripcion}
                  onChange={handleChange}
                  placeholder="Descripción detallada del reclamo"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="prioridad">
                <Form.Label>Prioridad</Form.Label>
                <Form.Select
                  name="prioridad"
                  value={reclamo.prioridad}
                  onChange={handleChange}
                >
                  <option value="BAJA">BAJA</option>
                  <option value="MEDIA">MEDIA</option>
                  <option value="ALTA">ALTA</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="estado">
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  name="estado"
                  value={reclamo.estado}
                  onChange={handleChange}
                >
                  <option value="ABIERTO">ABIERTO</option>
                  <option value="EN PROCESO">EN PROCESO</option>
                  <option value="CERRADO">CERRADO</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button type="submit" variant="primary" className="me-2">Guardar</Button>
              <Button type="button" variant="secondary" onClick={handleCancel}>Cancelar</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}
