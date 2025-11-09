import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export default function FormularioNuevoProveedor({ onCreate }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      razonSocial: '',
      cuit: '',
      telefono: '',
      email: '',
      rubro: '',
      tipo: 'CASA CENTRAL',
      calle: '',
      numero: '',
      localidad: '',
      provincia: '',
      pais: '',
    }
  });

  const onSubmit = (data) => {
    if (typeof onCreate === 'function') {
      onCreate(data);
    } else {
      console.log('Nuevo proveedor:', data);
      alert('Proveedor creado (simulado)');
    }
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="razonSocial">
            <Form.Label>Razón social</Form.Label>
            <Form.Control {...register('razonSocial', { required: 'Requerido' })} isInvalid={!!errors.razonSocial} />
            <Form.Control.Feedback type="invalid">{errors.razonSocial && errors.razonSocial.message}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="cuit">
            <Form.Label>CUIT</Form.Label>
            <Form.Control {...register('cuit', { required: 'Requerido' })} isInvalid={!!errors.cuit} />
            <Form.Control.Feedback type="invalid">{errors.cuit && errors.cuit.message}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="telefono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control {...register('telefono', { required: 'Requerido' })} isInvalid={!!errors.telefono} />
            <Form.Control.Feedback type="invalid">{errors.telefono && errors.telefono.message}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="email">
            <Form.Label>Mail</Form.Label>
            <Form.Control type="email" {...register('email', { required: 'Requerido', pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Email inválido' } })} isInvalid={!!errors.email} />
            <Form.Control.Feedback type="invalid">{errors.email && errors.email.message}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="rubro">
            <Form.Label>Rubro</Form.Label>
            <Form.Control {...register('rubro', { required: 'Requerido' })} isInvalid={!!errors.rubro} />
            <Form.Control.Feedback type="invalid">{errors.rubro && errors.rubro.message}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="tipo">
            <Form.Label>Tipo</Form.Label>
            <Form.Select {...register('tipo', { required: 'Requerido' })} isInvalid={!!errors.tipo}>
              <option>CASA CENTRAL</option>
              <option>SUCURSAL</option>
              <option>ALMACÉN</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.tipo && errors.tipo.message}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={8}>
          <Form.Group controlId="calle">
            <Form.Label>Calle</Form.Label>
            <Form.Control {...register('calle', { required: 'Requerido' })} isInvalid={!!errors.calle} />
            <Form.Control.Feedback type="invalid">{errors.calle && errors.calle.message}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="numero">
            <Form.Label>Número</Form.Label>
            <Form.Control {...register('numero', { required: 'Requerido' })} isInvalid={!!errors.numero} />
            <Form.Control.Feedback type="invalid">{errors.numero && errors.numero.message}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="localidad">
            <Form.Label>Localidad</Form.Label>
            <Form.Control {...register('localidad', { required: 'Requerido' })} isInvalid={!!errors.localidad} />
            <Form.Control.Feedback type="invalid">{errors.localidad && errors.localidad.message}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="provincia">
            <Form.Label>Provincia</Form.Label>
            <Form.Control {...register('provincia', { required: 'Requerido' })} isInvalid={!!errors.provincia} />
            <Form.Control.Feedback type="invalid">{errors.provincia && errors.provincia.message}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="pais">
            <Form.Label>País</Form.Label>
            <Form.Control {...register('pais', { required: 'Requerido' })} isInvalid={!!errors.pais} />
            <Form.Control.Feedback type="invalid">{errors.pais && errors.pais.message}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button type="submit" variant="primary" className="me-2">Guardar</Button>
          <Button type="button" variant="secondary" onClick={() => reset()}>Cancelar</Button>
        </Col>
      </Row>
    </Form>
  );
}


