import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { crearProveedorAPI } from "../../../helpers/qeries";
import {
  crearProveedor,
  actualizarProveedor,
  obtenerProveedorPorId,
} from "../../../api/proveedoresApi";
import Swal from "sweetalert2";

export default function FormularioNuevoProveedor({ onCreate }) {
  const navigate = useNavigate();
  const location = useLocation();
  const proveedorEdit = location?.state?.proveedor || null;
  const isEdit = Boolean(location?.state?.edit && proveedorEdit);
  const [loadingProveedor, setLoadingProveedor] = useState(false);
  const [direccionesList, setDireccionesList] = useState([]);
  const [newCalle, setNewCalle] = useState("");
  const [newNumero, setNewNumero] = useState("");
  const [newLocalidad, setNewLocalidad] = useState("");
  const [newProvincia, setNewProvincia] = useState("");
  const [newPais, setNewPais] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      razonSocial: "",
      cuit: "",
      telefono: "",
      email: "",
      rubro: "",
      tipo: "CASA CENTRAL",
      calle: "",
      numero: "",
      localidad: "",
      provincia: "",
      pais: "",
    },
  });

  // precargar datos si venimos a editar
  useEffect(() => {
    if (!(isEdit && proveedorEdit)) return;

    let mounted = true;
    const fetchProveedor = async () => {
      setLoadingProveedor(true);
      try {
        const fresh = await obtenerProveedorPorId(proveedorEdit.cuit);
        if (!mounted) return;
        // mapear campos del proveedor recibido al formulario
        const received = {
          razonSocial: fresh?.razon_social || proveedorEdit.razon_social || "",
          cuit: fresh?.cuit || proveedorEdit.cuit || "",
          telefono: fresh?.telefono || proveedorEdit.telefono || "",
          email: fresh?.email || proveedorEdit.email || "",
          rubro: fresh?.rubros || proveedorEdit.rubros || "",
          tipo: fresh?.tipo || proveedorEdit.tipo || "CASA CENTRAL",
          calle: "",
          numero: "",
          localidad: "",
          provincia: "",
          pais: "",
        };
        reset(received);

        // parsear direcciones a lista (separa por saltos de linea o punto y coma)
        const parseDirecciones = (s) => {
          if (!s) return [];
          return String(s)
            .split(/\r?\n|;/)
            .map((x) => x.trim())
            .filter(Boolean);
        };

        setDireccionesList(parseDirecciones(fresh?.direcciones || proveedorEdit.direcciones));
      } catch (err) {
        console.error('Error cargando proveedor para edición:', err);
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo cargar los datos del proveedor.' });
      } finally {
        if (mounted) setLoadingProveedor(false);
      }
    };

    fetchProveedor();
    return () => { mounted = false; };
  }, [isEdit, proveedorEdit, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEdit && proveedorEdit) {
        // actualizar
        const updated = await actualizarProveedor(proveedorEdit.cuit, {
          razon_social: data.razonSocial,
          telefono: data.telefono,
          email: data.email,
          rubros: data.rubro,
          direcciones: (direccionesList || []).join("; "),
        });
        Swal.fire({ title: "Proveedor actualizado!", icon: "success" });
        // navegar de vuelta pasando el proveedor actualizado para actualizar la lista local
        navigate("/proveedores", { state: { updatedProveedor: updated } });
      } else {
        // crear
        // agregar direcciones al payload de creación
        data.direcciones = (direccionesList || []).join("; ");
        const respuesta = await crearProveedorAPI(data);
        if (respuesta && respuesta.status === 201) {
          Swal.fire({ title: "Proveedor creado correctamente!", icon: "success", draggable: true });
          if (typeof onCreate === 'function') {
            try { onCreate(data); } catch (e) { console.warn('onCreate callback falló', e); }
          }
          reset();
          navigate('/proveedores');
        } else {
          throw new Error('Error al crear proveedor');
        }
      }
    } catch (err) {
      console.error('Error en onSubmit proveedor:', err);
      Swal.fire({ icon: 'error', title: 'Ocurrió un error', text: String(err) });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="position-relative">
      <div className="position-relative">
        <h2 className="text-center">{isEdit ? 'Editar Proveedor' : 'Nuevo Proveedor'}</h2>
        {/* Botón X para cerrar y volver a la lista de proveedores */}
        <Button
          variant="danger"
          size="sm"
          onClick={() => navigate('/proveedores')}
          aria-label="Cerrar formulario"
          className="position-absolute top-0 end-0 m-3 text-white"
          style={{ lineHeight: 1 }}
        >
          ✕
        </Button>
      </div>
      <hr />
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="razonSocial">
            <Form.Label>Razón social</Form.Label>
            <Form.Control
              type="text"
              {...register("razonSocial", {
                required: "Requerido",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
                maxLength: { value: 50, message: "Máximo 50 caracteres" },
              })}
              isInvalid={!!errors.razonSocial}
            />
            <Form.Control.Feedback type="invalid">
              {errors.razonSocial && errors.razonSocial.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="cuit">
            <Form.Label>CUIT</Form.Label>
            <Form.Control
              type="text"
              minLength={11}
              maxLength={11}
              {...register("cuit", {
                required: "Requerido",
                minLength: { value: 11, message: "CUIT inválido" },
                maxLength: { value: 11, message: "CUIT inválido" },
              })}
              isInvalid={!!errors.cuit}
              disabled={isEdit}
            />
            <Form.Control.Feedback type="invalid">
              {errors.cuit && errors.cuit.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="telefono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="tel"
              minLength={6}
              maxLength={20}
              {...register("telefono", {
                required: "Requerido",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
                maxLength: { value: 20, message: "Máximo 20 caracteres" },
              })}
              isInvalid={!!errors.telefono}
            />
            <Form.Control.Feedback type="invalid">
              {errors.telefono && errors.telefono.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="email">
            <Form.Label>Mail</Form.Label>
            <Form.Control
              type="email"
              minLength={5}
              maxLength={100}
              {...register("email", {
                required: "Requerido",
                minLength: { value: 5, message: "Mínimo 5 caracteres" },
                maxLength: { value: 100, message: "Máximo 100 caracteres" },
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: "Email inválido",
                },
              })}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email && errors.email.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="rubro">
            <Form.Label>Rubro</Form.Label>
            <Form.Control
              type="text"
              minLength={2}
              maxLength={50}
              {...register("rubro", {
                required: "Requerido",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
                maxLength: { value: 50, message: "Máximo 50 caracteres" },
              })}
              isInvalid={!!errors.rubro}
            />
            <Form.Control.Feedback type="invalid">
              {errors.rubro && errors.rubro.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="tipo">
            <Form.Label>Tipo</Form.Label>
            <Form.Select
              {...register("tipo", { required: "Requerido" })}
              isInvalid={!!errors.tipo}
            >
              <option>CASA CENTRAL</option>
              <option>SUCURSAL</option>
              <option>ALMACÉN</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.tipo && errors.tipo.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      {/* Direcciones: lista no editable con botón para quitar y campo para agregar */}
      <Row className="mb-3">
        <Col>
          <Form.Label>Direcciones</Form.Label>
          <div className="mb-2">
            {(direccionesList || []).length === 0 && (
              <div className="text-muted">Sin direcciones</div>
            )}
            {(direccionesList || []).map((d, i) => (
              <div key={i} className="d-flex align-items-center mb-1">
                <div className="flex-grow-1 pe-2">
                  <small className="d-block">{d}</small>
                </div>
                <div>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => setDireccionesList((prev) => prev.filter((_, idx) => idx !== i))}
                    aria-label={`borrar-direccion-${i}`}
                  >
                    ✕
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-2 border rounded">
            <Row className="mb-2">
              <Col md={8}>
                <Form.Control
                  placeholder="Calle"
                  value={newCalle}
                  onChange={(e) => setNewCalle(e.target.value)}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  placeholder="Número"
                  value={newNumero}
                  onChange={(e) => setNewNumero(e.target.value)}
                />
              </Col>
            </Row>

            <Row className="mb-2">
              <Col md={4}>
                <Form.Control
                  placeholder="Localidad"
                  value={newLocalidad}
                  onChange={(e) => setNewLocalidad(e.target.value)}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  placeholder="Provincia"
                  value={newProvincia}
                  onChange={(e) => setNewProvincia(e.target.value)}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  placeholder="País"
                  value={newPais}
                  onChange={(e) => setNewPais(e.target.value)}
                />
              </Col>
            </Row>

            <div className="d-flex justify-content-end">
              <Button
                onClick={() => {
                  const parts = [];
                  if (newCalle && newCalle.trim()) parts.push(newCalle.trim());
                  if (newNumero && newNumero.trim()) parts.push(newNumero.trim());
                  const addrRest = [];
                  if (newLocalidad && newLocalidad.trim()) addrRest.push(newLocalidad.trim());
                  if (newProvincia && newProvincia.trim()) addrRest.push(newProvincia.trim());
                  if (newPais && newPais.trim()) addrRest.push(newPais.trim());
                  const full = parts.length ? parts.join(" ") + (addrRest.length ? ", " + addrRest.join(", ") : "") : (addrRest.join(", ") || "");
                  const v = (full || "").trim();
                  if (!v) return;
                  setDireccionesList((prev) => [v, ...(prev || [])]);
                  // limpiar campos
                  setNewCalle("");
                  setNewNumero("");
                  setNewLocalidad("");
                  setNewProvincia("");
                  setNewPais("");
                }}
                disabled={!(newCalle.trim() || newLocalidad.trim() || newProvincia.trim() || newPais.trim() || newNumero.trim())}
              >
                Agregar nueva dirección
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={8}>
          <Form.Group controlId="calle">
            <Form.Label>Calle</Form.Label>
            <Form.Control
              type="text"
              minLength={2}
              maxLength={100}
              {...register("calle", {
                required: "Requerido",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
                maxLength: { value: 100, message: "Máximo 100 caracteres" },
              })}
              isInvalid={!!errors.calle}
            />
            <Form.Control.Feedback type="invalid">
              {errors.calle && errors.calle.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="numero">
            <Form.Label>Número</Form.Label>
            <Form.Control
              type="text"
              minLength={1}
              maxLength={10}
              {...register("numero", {
                required: "Requerido",
                minLength: { value: 1, message: "Ingrese número" },
                maxLength: { value: 10, message: "Máximo 10 caracteres" },
              })}
              isInvalid={!!errors.numero}
            />
            <Form.Control.Feedback type="invalid">
              {errors.numero && errors.numero.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="localidad">
            <Form.Label>Localidad</Form.Label>
            <Form.Control
              type="text"
              minLength={2}
              maxLength={50}
              {...register("localidad", {
                required: "Requerido",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
                maxLength: { value: 50, message: "Máximo 50 caracteres" },
              })}
              isInvalid={!!errors.localidad}
            />
            <Form.Control.Feedback type="invalid">
              {errors.localidad && errors.localidad.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="provincia">
            <Form.Label>Provincia</Form.Label>
            <Form.Control
              type="text"
              minLength={2}
              maxLength={50}
              {...register("provincia", {
                required: "Requerido",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
                maxLength: { value: 50, message: "Máximo 50 caracteres" },
              })}
              isInvalid={!!errors.provincia}
            />
            <Form.Control.Feedback type="invalid">
              {errors.provincia && errors.provincia.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="pais">
            <Form.Label>País</Form.Label>
            <Form.Control
              type="text"
              minLength={2}
              maxLength={50}
              {...register("pais", {
                required: "Requerido",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
                maxLength: { value: 50, message: "Máximo 50 caracteres" },
              })}
              isInvalid={!!errors.pais}
            />
            <Form.Control.Feedback type="invalid">
              {errors.pais && errors.pais.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button type="submit" variant="primary" className="me-2" disabled={loadingProveedor}>
            Guardar
          </Button>
          <Button type="button" variant="secondary" onClick={() => reset()}>
            Cancelar
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
