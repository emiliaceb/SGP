import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { crearProveedorAPI } from "../../../helpers/qeries";
import Swal from "sweetalert2";

export default function FormularioNuevoProveedor({ onCreate }) {
  const navigate = useNavigate();
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

  const onSubmit = async (data) => {
    // pedirle a la api crear el proveedor
    const respuesta = await crearProveedorAPI(data);
    if (respuesta.status === 201) {
      Swal.fire({
        title: "Proveedor creado correctamente!",
        icon: "success",
        draggable: true,
      });
      // notificar al padre si provee callback para actualizar lista en UI
      if (typeof onCreate === 'function') {
        try {
          // si la API devolviera el recurso creado, podríamos pasarlo; por ahora pasamos los datos
          onCreate(data);
        } catch (e) {
          console.warn('onCreate callback falló', e);
        }
      }
      reset();
    } else {
      Swal.fire({
        icon: "error",
        title: "Ocurrio un error",
        text: "No se pudo crear el proveedor, intente nuevamente.",
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="position-relative">
      <div className="position-relative">
        <h2 className="text-center">Nuevo Proveedor</h2>
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
          <Button type="submit" variant="primary" className="me-2">
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
