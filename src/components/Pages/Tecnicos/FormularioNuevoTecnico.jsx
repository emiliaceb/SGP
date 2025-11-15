import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LeerProveedoresAPI } from '../../../helpers/qeries';
import Swal from 'sweetalert2';

export default function FormularioNuevoTecnico() {
  const navigate = useNavigate();
  const [proveedores, setProveedores] = useState([]);
  const [tecnico, setTecnico] = useState({
    proveedor: '',
    nombre: '',
    telefono: '',
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
    setTecnico((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tecnico.proveedor) {
      Swal.fire('Error', 'Seleccioná un proveedor', 'error');
      return;
    }

    if (!tecnico.nombre) {
      Swal.fire('Error', 'Ingresá el nombre del técnico', 'error');
      return;
    }

    if (!tecnico.telefono) {
      Swal.fire('Error', 'Ingresá el teléfono', 'error');
      return;
    }

    const payload = {
      ...tecnico,
      id: Math.floor(Math.random() * 10000),
      fechaCreacion: new Date().toISOString(),
    };

    console.log('Nuevo técnico:', payload);
    Swal.fire('Éxito', 'Técnico creado exitosamente (simulación)', 'success');

    // Reset
    setTecnico({
      proveedor: '',
      nombre: '',
      telefono: '',
    });
  };

  const handleCancel = () => {
    navigate('/tecnicos');
  };

  return (
    <div className="p-4">
      <div className="position-relative">
        <h2>Nuevo Técnico</h2>
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
                  value={tecnico.proveedor}
                  onChange={handleChange}
                >
                  <option value="">-- Seleccione proveedor --</option>
                  {proveedores.map((p) => (
                    <option key={p.id} value={p.id}>{p.razonSocial}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={tecnico.nombre}
                  onChange={handleChange}
                  placeholder="Nombre del técnico"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="telefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="tel"
                  name="telefono"
                  value={tecnico.telefono}
                  onChange={handleChange}
                  placeholder="Teléfono"
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
