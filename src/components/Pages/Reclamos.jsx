import React, { useState, useMemo } from 'react';
import { Table, Button, InputGroup, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const sample = [
  { id: 1, empleado: 'Ana Ruiz', idOrden: 'OC-1001', equipo: 'EQ-204', nombreEquipo: 'Monitor 27" 4K', fecha: '2025-10-02', descripcion: 'Pantalla con pixels muertos', prioridad: 'Alta', estado: 'Abierto' },
  { id: 2, empleado: 'Jorge Díaz', idOrden: 'OC-1002', equipo: 'IT-1001', nombreEquipo: 'Papel A4', fecha: '2025-09-12', descripcion: 'Entrega incompleta', prioridad: 'Media', estado: 'En proceso' },
  { id: 3, empleado: 'María López', idOrden: 'OC-1003', equipo: 'CS-78', nombreEquipo: 'Silla ergonómica', fecha: '2025-08-21', descripcion: 'Ruedas dañadas', prioridad: 'Baja', estado: 'Cerrado' },
];

export default function Reclamos() {
  const [items, setItems] = useState(sample);
  const [q, setQ] = useState('');

  const qLower = q.trim().toLowerCase();
  const filtered = useMemo(() => items.filter((it) => {
    if (!qLower) return true;
    return (
      (it.empleado || '').toLowerCase().includes(qLower) ||
      String(it.idOrden || '').toLowerCase().includes(qLower) ||
      (it.nombreEquipo || '').toLowerCase().includes(qLower)
    );
  }), [items, qLower]);

  const handleView = (r) => {
    alert(`Reclamo #${r.id} - ${r.empleado}\nOrden: ${r.idOrden}\nEquipo: ${r.nombreEquipo}\nDescripción: ${r.descripcion}`);
  };

  const handleEdit = (id) => {
    alert('Editar reclamo ' + id);
  };

  const handleDelete = (id) => {
    if (!window.confirm('¿Eliminar reclamo?')) return;
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="mb-0">Reclamos</h2>
        <InputGroup style={{ width: '50%', maxWidth: 900 }}>
          <Form.Control placeholder="Buscar por empleado, id de orden o nombre de equipo..." value={q} onChange={(e) => setQ(e.target.value)} />
          <Button variant="outline-secondary" onClick={() => setQ('')}>Limpiar</Button>
        </InputGroup>
      </div>

      <div className="mb-3">
        <div className="d-flex justify-content-end">
          <Link to="/reclamos/nuevo" className="btn btn-primary">Nuevo reclamo</Link>
        </div>
      </div>

      <div className="table-responsive">
        <Table responsive hover striped bordered className="bg-white shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Empleado</th>
              <th>ID Orden de compra</th>
              <th>Equipo</th>
              <th>Nombre equipo</th>
              <th>Fecha</th>
              <th>Descripción</th>
              <th>Prioridad</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.empleado}</td>
                <td>{r.idOrden}</td>
                <td>{r.equipo}</td>
                <td>{r.nombreEquipo}</td>
                <td>{r.fecha}</td>
                <td style={{ maxWidth: 300 }}>{r.descripcion}</td>
                <td>{r.prioridad}</td>
                <td>{r.estado}</td>
                <td>
                  <div className="d-flex gap-2 flex-nowrap">
                    <Button size="sm" variant="outline-primary" onClick={() => handleView(r)}>Ver</Button>
                    <Button size="sm" variant="outline-secondary" onClick={() => handleEdit(r.id)}>Editar</Button>
                    <Button size="sm" variant="outline-danger" onClick={() => handleDelete(r.id)}>Eliminar</Button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={10} className="text-center">No se encontraron reclamos.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
