import React, { useState } from 'react';
import { Table, Button, InputGroup, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const sampleProviders = [
	{ id: 1, razonSocial: 'Distribuciones SA', cuit: '30-12345678-9', telefono: '+54 11 1234-5678', email: 'ventas@distribuciones.com', rubro: 'Alimentos', rating: 4 },
	{ id: 2, razonSocial: 'Suministros SRL', cuit: '33-87654321-0', telefono: '+54 11 8765-4321', email: 'info@suministros.com', rubro: 'Limpieza', rating: 3 },
	{ id: 3, razonSocial: 'TecnoParts', cuit: '27-11223344-5', telefono: '+54 11 1122-3344', email: 'contacto@tecnoparts.com', rubro: 'Electrónica', rating: 5 },
];

export default function Proveedores() {
	const [providers, setProviders] = useState(sampleProviders);
	const [q, setQ] = useState('');

	const renderStars = (n) => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			stars.push(
				<span key={i} style={{ color: i <= n ? '#ffc107' : '#e9ecef', marginRight: 2 }}>
					{i <= n ? '★' : '☆'}
				</span>
			);
		}
		return <span aria-label={`calificacion-${n}`}>{stars}</span>;
	};

	const qLower = q.trim().toLowerCase();
	const filtered = providers.filter((p) => {
		if (!qLower) return true;
		return (
			String(p.id).includes(qLower) ||
			(p.razonSocial || '').toLowerCase().includes(qLower) ||
			(p.cuit || '').toLowerCase().includes(qLower) ||
			(p.telefono || '').toLowerCase().includes(qLower) ||
			(p.email || '').toLowerCase().includes(qLower) ||
			(p.rubro || '').toLowerCase().includes(qLower)
		);
	});

	const handleDelete = (id) => {
		if (!window.confirm('¿Confirma eliminar el proveedor ' + id + '?')) return;
		setProviders((prev) => prev.filter((x) => x.id !== id));
	};

	return (
		<div className="p-4">
			<div className="d-flex align-items-center justify-content-between mb-3">
				<h2 className="mb-0">Proveedores</h2>
				<div>
					<Link to="/proveedores/formularionuevoproveedor" className="btn btn-primary">Agregar proveedor</Link>
				</div>
			</div>

			<div className="mb-3">
				<InputGroup>
					<Form.Control placeholder="Buscar por id, razón social, CUIT, teléfono, email o rubro..." value={q} onChange={(e) => setQ(e.target.value)} />
					<Button variant="outline-secondary" onClick={() => setQ('')}>Limpiar</Button>
				</InputGroup>
			</div>

			<Table responsive hover striped bordered className="bg-white shadow-sm">
				<thead className="table-dark">
					<tr>
						<th>ID</th>
						<th>Razón Social</th>
						<th>CUIT</th>
						<th>Teléfono</th>
						<th>Email</th>
						<th>Rubro</th>
						<th>Calificación</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{filtered.map((p) => (
						<tr key={p.id}>
							<td>{p.id}</td>
							<td>{p.razonSocial}</td>
							<td>{p.cuit}</td>
							<td>{p.telefono}</td>
							<td>{p.email}</td>
							<td>{p.rubro}</td>
							<td>{renderStars(p.rating || 0)}</td>
							<td>
								<div className="d-flex gap-2 flex-nowrap" style={{ whiteSpace: 'nowrap' }}>
									<Button size="sm" variant="outline-primary" title="Ver" aria-label={`ver-${p.id}`}>👁️</Button>
									<Button size="sm" variant="outline-secondary" title="Editar" aria-label={`editar-${p.id}`}>✏️</Button>
									<Button size="sm" variant="outline-danger" title="Eliminar" aria-label={`eliminar-${p.id}`} onClick={() => handleDelete(p.id)}>🗑️</Button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

