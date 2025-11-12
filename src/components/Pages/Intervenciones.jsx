import React, { useState, useMemo } from 'react';
import { Table, Button, InputGroup, Form } from 'react-bootstrap';

const sample = [
  { id: 1, idReclamo: 'R-1001', fecha: '2025-10-05', descripcionProblema: 'Pantalla no enciende', trabajoRealizado: 'Reemplacé fuente de alimentación', estado: 'Cerrado' },
  { id: 2, idReclamo: 'R-1002', fecha: '2025-10-10', descripcionProblema: 'Impresora con atascos', trabajoRealizado: 'Limpieza rodillos y calibración', estado: 'En proceso' },
  { id: 3, idReclamo: 'R-1003', fecha: '2025-11-01', descripcionProblema: 'Silla con rueda rota', trabajoRealizado: 'Reemplacé rueda', estado: 'Cerrado' },
];

export default function Intervenciones() {
  const [items, setItems] = useState(sample);
  const [q, setQ] = useState('');

  const qLower = q.trim().toLowerCase();
  const filtered = useMemo(() => items.filter((it) => {
    if (!qLower) return true;
    return (
      String(it.idReclamo || '').toLowerCase().includes(qLower) ||
      (it.estado || '').toLowerCase().includes(qLower)
    );
  }), [items, qLower]);

  const handleView = (it) => {
    alert(`Intervención #${it.id}\nReclamo: ${it.idReclamo}\nProblema: ${it.descripcionProblema}\nTrabajo: ${it.trabajoRealizado}\nEstado: ${it.estado}`);
  };

  const handleEdit = (id) => {
    alert('Editar intervención ' + id);
  };

  const handleDelete = (id) => {
    if (!window.confirm('¿Eliminar intervención?')) return;
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="mb-0">Intervenciones</h2>
        <InputGroup style={{ width: '50%', maxWidth: 900 }}>
          <Form.Control placeholder="Buscar por id reclamo o estado..." value={q} onChange={(e) => setQ(e.target.value)} />
          <Button variant="outline-secondary" onClick={() => setQ('')}>Limpiar</Button>
        </InputGroup>
      </div>

      <div className="table-responsive">
        <Table responsive hover striped bordered className="bg-white shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>ID Intervención</th>
              <th>ID Reclamo</th>
              <th>Fecha</th>
              <th>Descripción del problema</th>
              <th>Trabajo realizado</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((it) => (
              <tr key={it.id}>
                <td>{it.id}</td>
                <td>{it.idReclamo}</td>
                <td>{it.fecha}</td>
                <td style={{ maxWidth: 300 }}>{it.descripcionProblema}</td>
                <td style={{ maxWidth: 300 }}>{it.trabajoRealizado}</td>
                <td>{it.estado}</td>
                <td>
                  <div className="d-flex gap-2 flex-nowrap">
                    <Button size="sm" variant="outline-primary" onClick={() => handleView(it)}>Ver</Button>
                    <Button size="sm" variant="outline-secondary" onClick={() => handleEdit(it.id)}>Editar</Button>
                    <Button size="sm" variant="outline-danger" onClick={() => handleDelete(it.id)}>Eliminar</Button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center">No se encontraron intervenciones.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
