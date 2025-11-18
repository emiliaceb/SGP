import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

export default function ModalProveedor({ show, onHide, proveedor }) {
  if (!proveedor) return null;

  const {
    cuit,
    razon_social,
    telefono,
    email,
    rubros,
    direcciones,
    alta,
    baja
  } = proveedor;

  const formatDate = (d) => {
    if (!d) return '-';
    try {
      return new Date(d).toLocaleDateString('es-AR');
    } catch (e) {
      return String(d);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Proveedor: {razon_social || cuit}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table bordered size="sm">
          <tbody>
            <tr>
              <th style={{width: '30%'}}>CUIT</th>
              <td>{cuit}</td>
            </tr>
            <tr>
              <th>Razón social</th>
              <td>{razon_social || '-'}</td>
            </tr>
            <tr>
              <th>Teléfono</th>
              <td>{telefono || '-'}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{email || '-'}</td>
            </tr>
            <tr>
              <th>Rubros</th>
              <td>{rubros || 'Sin rubros'}</td>
            </tr>
            <tr>
              <th>Direcciones</th>
              <td style={{whiteSpace: 'pre-wrap'}}>{direcciones || 'Sin direcciones'}</td>
            </tr>
            <tr>
              <th>Fecha alta</th>
              <td>{formatDate(alta)}</td>
            </tr>
            <tr>
              <th>Fecha baja</th>
              <td>{formatDate(baja)}</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}
