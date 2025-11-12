import React, { useEffect, useState } from "react";
import { Table, Button, InputGroup, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { borrarProveedorAPI, LeerProveedoresAPI } from "../../helpers/qeries";
import Swal from 'sweetalert2';

const sampleProviders = [
  {
    id: 1,
    razonSocial: "Distribuciones SA",
    cuit: "30-12345678-9",
    telefono: "+54 11 1234-5678",
    email: "ventas@distribuciones.com",
    rubro: "Alimentos",
    rating: 4,
  },
  {
    id: 2,
    razonSocial: "Suministros SRL",
    cuit: "33-87654321-0",
    telefono: "+54 11 8765-4321",
    email: "info@suministros.com",
    rubro: "Limpieza",
    rating: 3,
  },
  {
    id: 3,
    razonSocial: "TecnoParts",
    cuit: "27-11223344-5",
    telefono: "+54 11 1122-3344",
    email: "contacto@tecnoparts.com",
    rubro: "Electrónica",
    rating: 5,
  },
];

export default function Proveedores() {
  const [listaProveedores, setListaProveedores] = useState([]);
  useEffect(() => {
    obtenerProveedores();
  }, []);

  // Inicializo con datos de ejemplo para que algo se vea antes de la API
  useEffect(() => {
    if (!listaProveedores || listaProveedores.length === 0) {
      setListaProveedores(sampleProviders);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const obtenerProveedores = async () => {
    try {
      const respuesta = await LeerProveedoresAPI();
      if (respuesta && respuesta.status === 200) {
        const datos = await respuesta.json();
        setListaProveedores(datos);
      }
    } catch (err) {
      console.error("Error al leer proveedores:", err);
    }
  };
  const borrarProveedor = async (id) => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro de eliminar el proveedor?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar'
    });

    if (!confirm.isConfirmed) return;

    try {
      const respuesta = await borrarProveedorAPI(id);
      if (respuesta && (respuesta.status === 200 || respuesta.status === 204)) {
        // actualizar lista local
        setListaProveedores((prev) => (prev || []).filter((x) => x.id !== id));
        Swal.fire('¡Eliminado!', 'El proveedor ha sido eliminado.', 'success');
      } else {
        console.error('Respuesta inesperada al borrar:', respuesta);
        Swal.fire('Error', 'No se pudo eliminar el proveedor.', 'error');
      }
    } catch (err) {
      console.error('Error al borrar proveedor:', err);
      Swal.fire('Error', 'Ocurrió un problema al eliminar el proveedor.', 'error');
    }
  };

  const [q, setQ] = useState("");

  const renderStars = (n) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          style={{ color: i <= n ? "#ffc107" : "#e9ecef", marginRight: 2 }}
        >
          {i <= n ? "★" : "☆"}
        </span>
      );
    }
    return <span aria-label={`calificacion-${n}`}>{stars}</span>;
  };

  const qLower = q.trim().toLowerCase();
  const filtered = (listaProveedores || []).filter((p) => {
    if (!qLower) return true;
    return (
      String(p.id).includes(qLower) ||
      (p.razonSocial || "").toLowerCase().includes(qLower) ||
      (p.cuit || "").toLowerCase().includes(qLower) ||
      (p.telefono || "").toLowerCase().includes(qLower) ||
      (p.email || "").toLowerCase().includes(qLower) ||
      (p.rubro || "").toLowerCase().includes(qLower)
    );
  });

  

  return (
    <div className="p-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="mb-0">Proveedores</h2>
        <InputGroup style={{ width: "50%", maxWidth: 900 }}>
          <Form.Control
            placeholder="Buscar por id, razón social, CUIT, teléfono, email o rubro..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Button variant="outline-secondary" onClick={() => setQ("")}>
            Limpiar
          </Button>
        </InputGroup>
      </div>

      <div className="mb-3">
        <div className="d-flex justify-content-end">
          <Link
            to="/proveedores/formularionuevoproveedor"
            className="btn btn-primary"
          >
            Agregar proveedor
          </Link>
        </div>
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
                <div
                  className="d-flex gap-2 flex-nowrap"
                  style={{ whiteSpace: "nowrap" }}
                >
                  <Button
                    size="sm"
                    variant="outline-primary"
                    title="Ver"
                    aria-label={`ver-${p.id}`}
                  >
                    👁️
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    title="Editar"
                    aria-label={`editar-${p.id}`}
                  >
                    ✏️
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    title="Eliminar"
                    aria-label={`eliminar-${p.id}`}
                    onClick={() => borrarProveedor(p.id)}
                  >
                    🗑️
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
