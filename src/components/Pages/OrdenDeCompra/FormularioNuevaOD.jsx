import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import FormularioItem from './FormularioItem';
import { LeerProveedoresAPI } from '../../../helpers/qeries';

const emptyItem = () => ({ descripcion: '', cantidad: '', precioUnitario: '' });

export default function FormularioNuevaOD() {
  const navigate = useNavigate();
  const [items, setItems] = useState([emptyItem()]);
  const [orden, setOrden] = useState({ proveedor: '', fecha: '', observaciones: '' });
  const [proveedores, setProveedores] = useState([]);

  const total = useMemo(() => {
    return items.reduce((sum, it) => sum + (Number(it.cantidad || 0) * Number(it.precioUnitario || 0)), 0);
  }, [items]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await LeerProveedoresAPI();
        if (res && res.status === 200) {
          const datos = await res.json();
          // Accept either an array or an object { proveedores: [...] }
          const list = Array.isArray(datos) ? datos : (Array.isArray(datos.proveedores) ? datos.proveedores : []);
          console.debug('Proveedores cargados:', list);
          if (mounted) setProveedores(list);
        }
        // si no vinieron proveedores desde la API, intentar leer ./db.json como fallback
        if (mounted) {
          // small delay avoided; check current proveedores state after attempt
          if ((!Array.isArray(proveedores) || proveedores.length === 0)) {
            try {
              const fallbackRes = await fetch('/db.json');
              if (fallbackRes && fallbackRes.ok) {
                const fallbackData = await fallbackRes.json();
                const fallbackList = Array.isArray(fallbackData) ? fallbackData : (Array.isArray(fallbackData.proveedores) ? fallbackData.proveedores : []);
                if (fallbackList.length > 0) {
                  console.debug('Proveedores cargados desde db.json fallback:', fallbackList);
                  setProveedores(fallbackList);
                }
              }
            } catch (e) {
              // no hacer nada, solo mostrar en consola
              console.debug('Fallback db.json no disponible o error:', e);
            }
          }
        }
      } catch (err) {
        console.error('Error cargando proveedores:', err);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const handleItemChange = (index, newItem) => {
    setItems((prev) => prev.map((it, i) => (i === index ? newItem : it)));
  };

  const handleAddItem = () => setItems((prev) => [...prev, emptyItem()]);
  const handleRemoveItem = (index) => setItems((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    // validar básicos
    if (!orden.proveedor) return alert('Seleccioná un proveedor');
    if (items.length === 0) return alert('Agregá al menos un item');

    const proveedorSeleccionado = proveedores.find(p => String(p.id) === String(orden.proveedor));

    const payload = {
      ...orden,
      proveedor: proveedorSeleccionado ? { id: proveedorSeleccionado.id, razonSocial: proveedorSeleccionado.razonSocial } : { id: orden.proveedor },
      items,
      total: Number(total.toFixed(2)),
      fechaCreacion: new Date().toISOString(),
    };

    console.log('Enviar orden de compra:', payload);
    alert('Orden de compra creada (simulación). Revisa consola.');

    // reset
    setOrden({ proveedor: '', fecha: '', observaciones: '' });
    setItems([emptyItem()]);
  };

  return (
    <div className="p-4">
      <div className="position-relative">
        <h2>Formulario - Orden de Compra</h2>
        <Button
          variant="danger"
          size="sm"
          onClick={() => navigate('/ordenes')}
          aria-label="Cerrar formulario"
          className="position-absolute top-0 end-0 m-3 text-white"
          style={{ lineHeight: 1 }}
        >
          ✕
        </Button>
      </div>
      <Form onSubmit={handleSubmit}>
        <Card className="p-3 mb-3">
          <Row>
            <Col md={6} className="mb-2">
              <Form.Group controlId="proveedor">
                <Form.Label>Proveedor</Form.Label>
                <Form.Select
                  value={orden.proveedor}
                  onChange={(e) => setOrden((o) => ({ ...o, proveedor: e.target.value }))}
                >
                  <option value="">-- Seleccione proveedor --</option>
                  {proveedores.map((p) => (
                    <option key={p.id} value={p.id}>{p.razonSocial}</option>
                  ))}
                </Form.Select>
                {proveedores.length === 0 && (
                  <div className="form-text text-muted">No hay proveedores cargados.</div>
                )}
              </Form.Group>
            </Col>

            <Col md={3} className="mb-2">
              <Form.Group controlId="fecha">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="date"
                  value={orden.fecha}
                  onChange={(e) => setOrden((o) => ({ ...o, fecha: e.target.value }))}
                />
              </Form.Group>
            </Col>

            <Col md={3} className="mb-2">
              <Form.Group controlId="observaciones">
                <Form.Label>Observaciones</Form.Label>
                <Form.Control
                  type="text"
                  value={orden.observaciones}
                  onChange={(e) => setOrden((o) => ({ ...o, observaciones: e.target.value }))}
                />
              </Form.Group>
            </Col>
          </Row>
        </Card>

        <div className="mb-3">
          {items.map((item, idx) => (
            <FormularioItem key={idx} index={idx} item={item} onChange={handleItemChange} onRemove={handleRemoveItem} />
          ))}
          <div className="d-flex justify-content-between align-items-center">
            <Button variant="outline-primary" onClick={handleAddItem}>Agregar ítem</Button>
            <div>
              <strong>Total: </strong> ${total.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="mt-3">
          <Button type="submit" variant="primary" className="me-2">Crear orden</Button>
          <Button type="button" variant="secondary" onClick={() => { setOrden({ proveedor: '', fecha: '', observaciones: '' }); setItems([emptyItem()]); navigate('/ordenes'); }}>Cancelar</Button>
        </div>
      </Form>
    </div>
  );
}

