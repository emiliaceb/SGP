import React, { useState } from 'react';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';

const sampleOrders = [
    {
        id: 1,
        fechaPedido: '2025-09-01',
        fechaRecepcion: '2025-09-05',
        estado: 'Completado',
        idItem: 'IT-1001',
        descripcion: 'Papel A4 80gsm - paquete',
        cantidad: 50,
        precioUnitario: 1200.0,
        contrato: 'CT-2023-01',
    },
    {
        id: 2,
        fechaPedido: '2025-10-12',
        fechaRecepcion: '',
        estado: 'Pendiente',
        idItem: 'EQ-204',
        descripcion: 'Monitor 27" 4K',
        cantidad: 5,
        precioUnitario: 45000.5,
        contrato: 'CT-2024-05',
    },
    {
        id: 3,
        fechaPedido: '2025-08-20',
        fechaRecepcion: '2025-08-28',
        estado: 'Recepcionado',
        idItem: 'CS-78',
        descripcion: 'Silla ergonómica',
        cantidad: 10,
        precioUnitario: 18500,
        contrato: 'CT-2022-11',
    },
];

function formatCurrency(n) {
    return n == null ? '-' : n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
}

const Ordenes = () => {
    const [orders, setOrders] = useState(sampleOrders);
    const [q, setQ] = useState('');

    const handleDelete = (id) => {
        const ok = window.confirm('¿Confirma eliminar la orden ' + id + '?');
        if (!ok) return;
        setOrders((prev) => prev.filter((o) => o.id !== id));
    };

    const handleView = (o) => {
        // mostrar detalle simple
        alert('Detalle orden:\n' + JSON.stringify(o, null, 2));
    };

    const handleEdit = (id) => {
        const newEstado = window.prompt('Nuevo estado (ej: Pendiente, Completado, Recepcionado):');
        if (!newEstado) return;
        setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, estado: newEstado } : o)));
    };

    const qLower = q.trim().toLowerCase();
    const filtered = orders.filter((o) => {
        if (!qLower) return true;
        return (
            String(o.id).includes(qLower) ||
            (o.descripcion || '').toLowerCase().includes(qLower) ||
            (o.idItem || '').toLowerCase().includes(qLower) ||
            (o.contrato || '').toLowerCase().includes(qLower) ||
            (o.estado || '').toLowerCase().includes(qLower)
        );
    });

    return (
        <div className="p-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h2 className="mb-0">Órdenes</h2>
                <InputGroup style={{ width: '50%', maxWidth: 900 }}>
                    <Form.Control placeholder="Buscar por id, descripción, item, contrato o estado..." value={q} onChange={(e) => setQ(e.target.value)} />
                    <Button variant="outline-secondary" onClick={() => setQ('')}>Limpiar</Button>
                </InputGroup>
            </div>

            <div className="mb-3">
                <div className="d-flex justify-content-end">
                    <Button variant="primary" onClick={() => alert('Acción: realizar orden de compra')}>Realizar orden de compra</Button>
                </div>
            </div>

            <Table responsive hover striped bordered className="bg-white shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Fecha de pedido</th>
                        <th>Fecha de recepción</th>
                        <th>Estado</th>
                        <th>ID Item</th>
                        <th>Descripción</th>
                        <th>Cantidad</th>
                        <th>Precio unitario</th>
                        <th>Precio total</th>
                        <th>Contrato</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((o) => (
                        <tr key={o.id}>
                            <td>{o.id}</td>
                            <td>{o.fechaPedido}</td>
                            <td>{o.fechaRecepcion || '-'}</td>
                            <td>{o.estado}</td>
                            <td>{o.idItem}</td>
                            <td>{o.descripcion}</td>
                            <td>{o.cantidad}</td>
                            <td>{formatCurrency(o.precioUnitario)}</td>
                            <td>{formatCurrency(o.cantidad * o.precioUnitario)}</td>
                            <td>{o.contrato}</td>
                            <td>
                                <Button size="sm" variant="outline-primary" className="me-2" title="Ver" onClick={() => handleView(o)}>👁️</Button>
                                <Button size="sm" variant="outline-secondary" className="me-2" title="Editar" onClick={() => handleEdit(o.id)}>✏️</Button>
                                <Button size="sm" variant="outline-danger" title="Eliminar" onClick={() => handleDelete(o.id)}>🗑️</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Ordenes;