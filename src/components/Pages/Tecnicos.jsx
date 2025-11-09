import React, { useState, useMemo } from 'react';
import { Table, Button, InputGroup, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const sample = [
  { id: 1, proveedor: 'Proveedor A', rubro: 'Electrónica', tecnico: 'Juan Pérez', nombre: 'Juan Pérez', telefono: '+54 9 11 5555-0001' },
  { id: 2, proveedor: 'Proveedor B', rubro: 'Oficina', tecnico: 'María López', nombre: 'María López', telefono: '+54 9 11 5555-0002' },
  { id: 3, proveedor: 'Proveedor C', rubro: 'Suministros', tecnico: 'Carlos Gómez', nombre: 'Carlos Gómez', telefono: '+54 9 11 5555-0003' },
];

export default function Tecnicos() {
  const [items, setItems] = useState(sample);
  const [q, setQ] = useState('');

  const qLower = q.trim().toLowerCase();
  const filtered = useMemo(() => items.filter((it) => {
    if (!qLower) return true;
    return (
      (it.proveedor || '').toLowerCase().includes(qLower) ||
      (it.rubro || '').toLowerCase().includes(qLower) ||
      (it.tecnico || '').toLowerCase().includes(qLower)
    );
  }), [items, qLower]);

  const handleEdit = (id) => {
    // placeholder: abrir modal o navegar a formulario
    alert('Editar técnico ' + id);
  };

  const handleDelete = (id) => {
    if (!window.confirm('¿Eliminar técnico?')) return;
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="mb-0">Técnicos</h2>
        <InputGroup style={{ width: '50%', maxWidth: 900 }}>
          <Form.Control placeholder="Buscar por proveedor, rubro o técnico..." value={q} onChange={(e) => setQ(e.target.value)} />
          <Button variant="outline-secondary" onClick={() => setQ('')}>Limpiar</Button>
        </InputGroup>
      </div>

      <div className="mb-3">
        <div className="d-flex justify-content-end">
          <Link to="/tecnicos/nuevo" className="btn btn-primary">Agregar técnico</Link>
        </div>
      </div>

      <div className="table-responsive">
        <Table responsive hover striped bordered className="bg-white shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Proveedor</th>
              <th>Rubro</th>
              <th>Técnico</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((it) => (
              <tr key={it.id}>
                <td>{it.id}</td>
                <td>{it.proveedor}</td>
                <td>{it.rubro}</td>
                <td>{it.tecnico}</td>
                <td>{it.nombre}</td>
                <td>{it.telefono}</td>
                <td>
                  <div className="d-flex gap-2 flex-nowrap">
                    <Button size="sm" variant="outline-secondary" onClick={() => handleEdit(it.id)} aria-label={`editar-${it.id}`}>Editar</Button>
                    <Button size="sm" variant="outline-danger" onClick={() => handleDelete(it.id)} aria-label={`eliminar-${it.id}`}>Eliminar</Button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center">No se encontraron técnicos.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
