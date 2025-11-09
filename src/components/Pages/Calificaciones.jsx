import React, { useState, useMemo } from 'react';
import { Table, Button, InputGroup, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const sample = [
  { id: 1, proveedor: 'Proveedor A', plazosEntrega: 8, calidad: 9, tiempoRespuesta: 7, disponibilidad: 9, comentarios: 'Entrega puntual, buena calidad', final: 9 },
  { id: 2, proveedor: 'Proveedor B', plazosEntrega: 6, calidad: 7, tiempoRespuesta: 8, disponibilidad: 6, comentarios: 'A veces demoras en stock', final: 7 },
  { id: 3, proveedor: 'Proveedor C', plazosEntrega: 9, calidad: 8, tiempoRespuesta: 9, disponibilidad: 10, comentarios: 'Excelente soporte', final: 9 },
];

function renderStars(n) {
  const stars = [];
  const full = Math.round(n);
  for (let i = 1; i <= 5; i++) {
    stars.push(<span key={i} style={{ color: i <= full ? '#ffc107' : '#e9ecef', marginRight: 2 }}>{i <= full ? '★' : '☆'}</span>);
  }
  return <span aria-hidden>{stars}</span>;
}

export default function Calificaciones() {
  const [items, setItems] = useState(sample);
  const [q, setQ] = useState('');

  const qLower = q.trim().toLowerCase();
  const filtered = useMemo(() => items.filter((it) => (!qLower) || (it.proveedor || '').toLowerCase().includes(qLower)), [items, qLower]);

  const handleView = (it) => {
    alert(`Proveedor: ${it.proveedor}\nComentarios: ${it.comentarios}\nCalificación final: ${it.final}`);
  };

  const handleEdit = (id) => {
    // placeholder: se puede abrir modal de edición
    alert('Editar calificación ' + id);
  };

  const handleDelete = (id) => {
    if (!window.confirm('¿Eliminar calificación?')) return;
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="mb-0">Calificaciones</h2>
        <InputGroup style={{ width: '50%', maxWidth: 900 }}>
          <Form.Control placeholder="Buscar por proveedor..." value={q} onChange={(e) => setQ(e.target.value)} />
          <Button variant="outline-secondary" onClick={() => setQ('')}>Limpiar</Button>
        </InputGroup>
      </div>

      <div className="mb-3">
        <div className="d-flex justify-content-end">
          <Link to="/calificaciones/nueva" className="btn btn-primary">Agregar calificación</Link>
        </div>
      </div>

      <div className="table-responsive">
        <Table responsive hover striped bordered className="bg-white shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Proveedor</th>
              <th>Plazos de entrega</th>
              <th>Calidad</th>
              <th>Tiempo de respuesta </th>
              <th>Disponibilidad</th>
              <th>Comentarios</th>
              <th>Calificación final</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((it) => (
              <tr key={it.id}>
                <td>{it.id}</td>
                <td>{it.proveedor}</td>
                <td>{it.plazosEntrega}</td>
                <td>{it.calidad}</td>
                <td>{it.tiempoRespuesta}</td>
                <td>{it.disponibilidad}</td>
                <td style={{ maxWidth: 300 }}>{it.comentarios}</td>
                <td>{renderStars((it.final / 2) || 0)} <small style={{ marginLeft: 6 }}>{it.final}/10</small></td>
                <td>
                  <div className="d-flex gap-2 flex-nowrap">
                    <Button size="sm" variant="outline-primary" onClick={() => handleView(it)} aria-label={`Ver ${it.id}`}>Ver</Button>
                    <Button size="sm" variant="outline-secondary" onClick={() => handleEdit(it.id)} aria-label={`Editar ${it.id}`}>Editar</Button>
                    <Button size="sm" variant="outline-danger" onClick={() => handleDelete(it.id)} aria-label={`Eliminar ${it.id}`}>Eliminar</Button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center">No se encontraron resultados.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
