import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LeerProveedoresAPI } from '../../../helpers/qeries';
import Swal from 'sweetalert2';

export default function FormularioNuevoContrato() {
  const navigate = useNavigate();
  const [proveedores, setProveedores] = useState([]);
  const [contrato, setContrato] = useState({
    proveedor: '',
    fechaInicio: '',
    fechaVencimiento: '',
    descripcion: '',
    archivo: '',
    tiempoRespuesta: '',
    disponibilidad: '',
  });

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await LeerProveedoresAPI();
        if (res && res.status === 200) {
          const datos = await res.json();
          const list = Array.isArray(datos) ? datos : (Array.isArray(datos.proveedores) ? datos.proveedores : []);
          if (mounted) setProveedores(list);
        } else {
          // Fallback: intentar db.json
          const fallbackRes = await fetch('/db.json');
          if (fallbackRes && fallbackRes.ok) {
            const fallbackData = await fallbackRes.json();
            const fallbackList = Array.isArray(fallbackData.proveedores) ? fallbackData.proveedores : [];
            if (mounted) setProveedores(fallbackList);
          }
        }
      } catch (err) {
        console.error('Error cargando proveedores:', err);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContrato((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!contrato.proveedor) {
      Swal.fire('Error', 'Seleccioná un proveedor', 'error');
      return;
    }

    const payload = {
      ...contrato,
      id: Math.floor(Math.random() * 10000),
      fechaCreacion: new Date().toISOString(),
    };

    console.log('Nuevo contrato:', payload);
    Swal.fire('Éxito', 'Contrato creado exitosamente (simulación)', 'success');

    // Reset
    setContrato({
      proveedor: '',
      fechaInicio: '',
      fechaVencimiento: '',
      descripcion: '',
      archivo: '',
      tiempoRespuesta: '',
      disponibilidad: '',
    });
  };

  const handleCancel = () => {
    navigate('/contratos');
  };

  return (
    <div className="p-4">
      <div className="position-relative">
        <h2>Nuevo Contrato</h2>
        <Button
          variant="danger"
          size="sm"
          onClick={handleCancel}
          aria-label="Cerrar formulario"
          className="position-absolute top-0 end-0 m-3 text-white"
          style={{ lineHeight: 1 }}
        >
          ✕
        </Button>
      </div>

      <Card className="p-4 mt-3">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="proveedor">
                <Form.Label>Proveedor</Form.Label>
                <Form.Select
                  name="proveedor"
                  value={contrato.proveedor}
                  onChange={handleChange}
                >
                  <option value="">-- Seleccione proveedor --</option>
                  {proveedores.map((p) => (
                    <option key={p.id} value={p.id}>{p.razonSocial}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group controlId="fechaInicio">
                <Form.Label>Fecha de inicio</Form.Label>
                <Form.Control
                  type="date"
                  name="fechaInicio"
                  value={contrato.fechaInicio}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group controlId="fechaVencimiento">
                <Form.Label>Fecha de vencimiento</Form.Label>
                <Form.Control
                  type="date"
                  name="fechaVencimiento"
                  value={contrato.fechaVencimiento}
                  onChange={handleChange}
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
                  rows={3}
                  name="descripcion"
                  value={contrato.descripcion}
                  onChange={handleChange}
                  placeholder="Descripción del contrato"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="archivo">
                <Form.Label>Ruta del archivo</Form.Label>
                <Form.Control
                  type="text"
                  name="archivo"
                  value={contrato.archivo}
                  onChange={handleChange}
                  placeholder="ej: contrato_a.pdf"
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group controlId="tiempoRespuesta">
                <Form.Label>Tiempo de respuesta</Form.Label>
                <Form.Control
                  type="text"
                  name="tiempoRespuesta"
                  value={contrato.tiempoRespuesta}
                  onChange={handleChange}
                  placeholder="ej: 24h"
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group controlId="disponibilidad">
                <Form.Label>Disponibilidad</Form.Label>
                <Form.Control
                  type="text"
                  name="disponibilidad"
                  value={contrato.disponibilidad}
                  onChange={handleChange}
                  placeholder="ej: 99%"
                />
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
