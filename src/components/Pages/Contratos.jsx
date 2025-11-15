import React, { useState, useMemo } from 'react';
import { Table, Button, InputGroup, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Contratos() {
  const [query, setQuery] = useState('');
  const [contracts, setContracts] = useState([
    { id: 1, proveedor: 'Proveedor A', fechaInicio: '2024-01-01', fechaVencimiento: '2025-01-01', descripcion: 'Mantenimiento anual de equipos', archivo: 'contrato_a.pdf', tiempoRespuesta: '24h', disponibilidad: '99%' },
    { id: 2, proveedor: 'Proveedor B', fechaInicio: '2023-06-15', fechaVencimiento: '2024-06-14', descripcion: 'Suministro de repuestos', archivo: 'contrato_b.pdf', tiempoRespuesta: '48h', disponibilidad: '95%' },
    { id: 3, proveedor: 'Proveedor C', fechaInicio: '2024-03-01', fechaVencimiento: '2026-02-28', descripcion: 'Servicio de soporte técnico', archivo: 'contrato_c.pdf', tiempoRespuesta: '12h', disponibilidad: '98%' },
  ]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return contracts;
    return contracts.filter((c) => (
      String(c.proveedor).toLowerCase().includes(q) ||
      String(c.descripcion).toLowerCase().includes(q) ||
      String(c.archivo).toLowerCase().includes(q)
    ));
  }, [contracts, query]);

  const handleView = (c) => {
    // placeholder: se puede abrir modal o descargar archivo
    alert(`Ver contrato ${c.id} - ${c.proveedor}\nDescripción: ${c.descripcion}`);
  };

  const handleEdit = (c) => {
    // placeholder: abrir modal de edición
    alert(`Editar contrato ${c.id} - ${c.proveedor}`);
  };

  const handleDelete = (id) => {
    if (!window.confirm('¿Eliminar contrato?')) return;
    setContracts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="mb-0">Contratos</h2>
        <InputGroup style={{ width: '50%', maxWidth: 900 }}>
          <Form.Control placeholder="Buscar proveedor, descripción o archivo" value={query} onChange={(e) => setQuery(e.target.value)} />
          <Button variant="outline-secondary" onClick={() => setQuery('')}>Limpiar</Button>
        </InputGroup>
      </div>

      <div className="mb-3">
        <div className="d-flex justify-content-end">
          <Link to="/contratos/formularionuevocontrato" className="btn btn-primary">Agregar contrato</Link>
        </div>
      </div>

      <div className="table-responsive">
        <Table responsive hover striped bordered className="bg-white shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Proveedor</th>
              <th>Fecha inicio</th>
              <th>Fecha vencimiento</th>
              <th>Descripción</th>
              <th>Archivo</th>
              <th>Tiempo de respuesta</th>
              <th>Disponibilidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.proveedor}</td>
                <td>{c.fechaInicio}</td>
                <td>{c.fechaVencimiento}</td>
                <td style={{ maxWidth: 300 }}>{c.descripcion}</td>
                <td><a href={`/${c.archivo}`} target="_blank" rel="noreferrer">{c.archivo}</a></td>
                <td>{c.tiempoRespuesta}</td>
                <td>{c.disponibilidad}</td>
                <td>
                  <div className="d-flex gap-2 flex-nowrap">
                    <Button size="sm" variant="outline-primary" onClick={() => handleView(c)} aria-label={`Ver contrato ${c.id}`}>Ver</Button>
                    <Button size="sm" variant="outline-secondary" onClick={() => handleEdit(c)} aria-label={`Editar contrato ${c.id}`}>Editar</Button>
                    <Button size="sm" variant="outline-danger" onClick={() => handleDelete(c.id)} aria-label={`Eliminar contrato ${c.id}`}>Eliminar</Button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center">No se encontraron contratos.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
