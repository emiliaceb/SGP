import React, { useState } from 'react';
import { Table, Button, InputGroup, Form } from 'react-bootstrap';

const sampleEquipos = [
    {
        idEquipo: 1,
        descripcion: 'Router principal de la oficina',
        numeroSerie: 'RT-001-XYZ',
        expiracionGarantia: '2026-08-15',
        idModelo: 'M-RT-100',
        nombre: 'Router X100',
        marca: 'NetCore',
        especificaciones: 'Gigabit, 4 puertos LAN, WiFi 6',
        estado: 'Activo',
    },
    {
        idEquipo: 2,
        descripcion: 'Impresora laser color',
        numeroSerie: 'PR-204-ABC',
        expiracionGarantia: '2025-11-30',
        idModelo: 'M-PR-200',
        nombre: 'PrintPro 200',
        marca: 'PrintCorp',
        especificaciones: 'Laser color, dúplex, red',
        estado: 'En mantenimiento',
    },
    {
        idEquipo: 3,
        descripcion: 'Laptop para diseño',
        numeroSerie: 'LP-900-DEF',
        expiracionGarantia: '2027-03-01',
        idModelo: 'M-LP-900',
        nombre: 'DesignBook 900',
        marca: 'CompTek',
        especificaciones: '16GB RAM, 1TB SSD, GPU dedicada',
        estado: 'Activo',
    },
];

export default function Equipos() {
    const [equipos, setEquipos] = useState(sampleEquipos);
    const [q, setQ] = useState('');

    const handleDelete = (id) => {
        const ok = window.confirm('¿Confirma eliminar el equipo ' + id + '?');
        if (!ok) return;
        setEquipos((prev) => prev.filter((it) => it.idEquipo !== id));
    };

    const handleView = (it) => {
        alert('Detalle equipo:\n' + JSON.stringify(it, null, 2));
    };

    const handleEdit = (id) => {
        const newEstado = window.prompt('Nuevo estado (por ejemplo: Activo, En mantenimiento, Fuera de servicio):');
        if (!newEstado) return;
        setEquipos((prev) => prev.map((it) => (it.idEquipo === id ? { ...it, estado: newEstado } : it)));
    };

    const qLower = q.trim().toLowerCase();
    const filtered = equipos.filter((e) => {
        if (!qLower) return true;
        return (
            String(e.idEquipo).includes(qLower) ||
            (e.descripcion || '').toLowerCase().includes(qLower) ||
            (e.numeroSerie || '').toLowerCase().includes(qLower) ||
            (e.idModelo || '').toLowerCase().includes(qLower) ||
            (e.nombre || '').toLowerCase().includes(qLower) ||
            (e.marca || '').toLowerCase().includes(qLower) ||
            (e.estado || '').toLowerCase().includes(qLower)
        );
    });

    return (
        <div className="p-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h2 className="mb-0">Equipos</h2>
                <InputGroup style={{ width: '50%', maxWidth: 900 }}>
                    <Form.Control placeholder="Buscar por id, descripción, serie, modelo, nombre, marca o estado..." value={q} onChange={(e) => setQ(e.target.value)} />
                    <Button variant="outline-secondary" onClick={() => setQ('')}>Limpiar</Button>
                </InputGroup>
            </div>

            <Table responsive hover striped bordered className="bg-white shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>Id Equipo</th>
                        <th>Descripción</th>
                        <th>Número Serie</th>
                        <th>Expiración Garantía</th>
                        <th>Id Modelo</th>
                        <th>Nombre</th>
                        <th>Marca</th>
                        <th>Especificaciones</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((e) => (
                        <tr key={e.idEquipo}>
                            <td>{e.idEquipo}</td>
                            <td>{e.descripcion}</td>
                            <td>{e.numeroSerie}</td>
                            <td>{e.expiracionGarantia}</td>
                            <td>{e.idModelo}</td>
                            <td>{e.nombre}</td>
                            <td>{e.marca}</td>
                            <td>{e.especificaciones}</td>
                            <td>{e.estado}</td>
                                            <td>
                                                <div className="d-flex gap-2 flex-nowrap" style={{ whiteSpace: 'nowrap' }}>
                                                    <Button size="sm" variant="outline-primary" title="Ver" onClick={() => handleView(e)}>👁️</Button>
                                                    <Button size="sm" variant="outline-secondary" title="Editar" onClick={() => handleEdit(e.idEquipo)}>✏️</Button>
                                                    <Button size="sm" variant="outline-danger" title="Eliminar" onClick={() => handleDelete(e.idEquipo)}>🗑️</Button>
                                                </div>
                                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}