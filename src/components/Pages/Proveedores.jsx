import React, { useEffect, useState } from "react";
import { Table, Button, InputGroup, Form } from "react-bootstrap";
import ModalProveedor from "./Proveedor/ModalProveedor";
import { Link, useLocation } from "react-router-dom";
import {
  obtenerProveedores as obtenerProveedoresAPI,
  eliminarProveedor,
} from "../../api/proveedoresApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Proveedores() {
  const [listaProveedores, setListaProveedores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerProveedores();
  }, []);

  const obtenerProveedores = async () => {
    try {
      setCargando(true);
      setError(null);
      console.log('🔍 Intentando obtener proveedores...');
      console.log('API URL configurada:', import.meta.env.VITE_API_URL);
      const datos = await obtenerProveedoresAPI();
      console.log('✅ Datos recibidos:', datos);
      console.log('🔍 Primer proveedor (estructura):', datos[0]);
      setListaProveedores(datos || []);
    } catch (err) {
      console.error("❌ Error al leer proveedores:", err);
      setError(
        `Error al cargar los proveedores: ${err.message}. Verifica que el backend esté corriendo en http://localhost:5001`
      );
      setListaProveedores([]);
    } finally {
      setCargando(false);
    }
  };

  const borrarProveedor = async (cuit) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro de eliminar el proveedor?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      await eliminarProveedor(cuit);
      // actualizar lista local
      setListaProveedores((prev) =>
        (prev || []).filter((x) => x.cuit !== cuit)
      );
      Swal.fire("¡Eliminado!", "El proveedor ha sido eliminado.", "success");
    } catch (err) {
      console.error("Error al borrar proveedor:", err);
      Swal.fire(
        "Error",
        "Ocurrió un problema al eliminar el proveedor.",
        "error"
      );
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState(null);

  const abrirModal = (proveedor) => {
    setSelectedProveedor(proveedor);
    setShowModal(true);
  };

  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Si venimos del formulario con un proveedor actualizado, aplicarlo a la lista local
  useEffect(() => {
    const updated = location?.state?.updatedProveedor;
    if (updated) {
      setListaProveedores((prev = []) => {
        const idx = prev.findIndex((x) => x.cuit === updated.cuit);
        if (idx >= 0) {
          const copy = [...prev];
          copy[idx] = { ...copy[idx], ...updated };
          return copy;
        }
        // si no estaba en la lista, añadir al principio
        return [updated, ...prev];
      });
      try {
        // limpiar el state de la historia para que no se vuelva a aplicar al recargar
        window.history.replaceState({}, document.title);
      } catch (e) {
        // no crítico
      }
    }
  }, [location]);

  const qLower = q.trim().toLowerCase();
  const filtered = (listaProveedores || []).filter((p) => {
    if (!qLower) return true;
    return (
      String(p.cuit || "").includes(qLower) ||
      (p.razon_social || "").toLowerCase().includes(qLower) ||
      (p.rubros || "").toLowerCase().includes(qLower)
    );
  });

  return (
    <div className="p-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="mb-0">Proveedores</h2>
        <InputGroup style={{ width: "50%", maxWidth: 900 }}>
          <Form.Control
            placeholder="Buscar por CUIT, razón social o rubros..."
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

      {cargando && (
        <div className="alert alert-info">Cargando proveedores...</div>
      )}

      {error && (
        <div className="alert alert-danger">
          {error}
          <button
            className="btn btn-sm btn-outline-danger ms-3"
            onClick={obtenerProveedores}
          >
            Reintentar
          </button>
        </div>
      )}

      {!cargando && !error && listaProveedores.length === 0 && (
        <div className="alert alert-warning">
          No hay proveedores registrados
        </div>
      )}

      {!cargando && !error && listaProveedores.length > 0 && (
        <Table responsive hover striped bordered className="bg-white shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>CUIT</th>
              <th>Razón Social</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Rubros</th>
              <th>Direcciones</th>
              <th>Fecha Alta</th>
              <th style={{ width: 140 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, index) => (
              <tr key={p.cuit || `proveedor-${index}`}>
                <td>{p.cuit || p.CUIT || '-'}</td>
                <td>{p.razon_social || p['Razón Social'] || '-'}</td>
                <td>{p.telefono || p['Teléfono'] || '-'}</td>
                <td>{p.email || p.Email || "-"}</td>
                <td>
                  <small>{p.rubros || p.Rubros || "Sin rubros"}</small>
                </td>
                <td>
                  <small>{p.direcciones || p.Direcciones || "Sin direcciones"}</small>
                </td>
                <td>
                  {(p.alta || p['Fecha Alta']) ? new Date(p.alta || p['Fecha Alta']).toLocaleDateString("es-AR") : "-"}
                </td>
                <td>
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ gap: 8, whiteSpace: "nowrap" }}
                  >
                    <Button
                      size="sm"
                      variant="outline-primary"
                      title="Ver"
                      aria-label={`ver-${p.cuit || index}`}
                      onClick={() => abrirModal(p)}
                    >
                      👁️
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      title="Editar"
                      aria-label={`editar-${p.cuit || index}`}
                      onClick={() =>
                        navigate("/proveedores/formularioEditarProveedores", {
                          state: { proveedor: p, edit: true },
                        })
                      }
                    >
                      ✏️
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      title="Eliminar"
                      aria-label={`eliminar-${p.cuit || index}`}
                      onClick={() => borrarProveedor(p.cuit || p.CUIT)}
                    >
                      🗑️
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <ModalProveedor
        show={showModal}
        onHide={() => setShowModal(false)}
        proveedor={selectedProveedor}
      />
    </div>
  );
}
