import React from 'react';
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap';

export default function FormularioItem({ index, item, onChange, onRemove }) {
  // item: { descripcion, cantidad, precioUnitario }
  return (
    <div className="border rounded p-3 mb-2">
      <Row className="align-items-end">
        <Col md={5} className="mb-2">
          <Form.Group controlId={`descripcion-${index}`}>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              value={item.descripcion}
              onChange={(e) => onChange(index, { ...item, descripcion: e.target.value })}
            />
          </Form.Group>
        </Col>

        <Col md={2} className="mb-2">
          <Form.Group controlId={`cantidad-${index}`}>
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              min={0}
              value={item.cantidad}
              onChange={(e) => onChange(index, { ...item, cantidad: e.target.value })}
            />
          </Form.Group>
        </Col>

        <Col md={3} className="mb-2">
          <Form.Group controlId={`precio-${index}`}>
            <Form.Label>Precio unitario</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                type="number"
                min={0}
                step="0.01"
                value={item.precioUnitario}
                onChange={(e) => onChange(index, { ...item, precioUnitario: e.target.value })}
              />
            </InputGroup>
          </Form.Group>
        </Col>

        <Col md={1} className="mb-2">
          <Form.Group>
            <Form.Label>Subtotal</Form.Label>
            <div className="form-control-plaintext">${(Number(item.cantidad || 0) * Number(item.precioUnitario || 0)).toFixed(2)}</div>
          </Form.Group>
        </Col>

        <Col md={1} className="mb-2 text-end">
          <Button variant="outline-danger" size="sm" onClick={() => onRemove(index)} aria-label={`remove-item-${index}`}>
            🗑️
          </Button>
        </Col>
      </Row>
    </div>
  );
}
