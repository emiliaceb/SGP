import React from 'react';
import { ListGroup, Nav, Badge, Button, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../../App.css';

// Componente simple para simular un icono (usando un simple 📦)
const IconPlaceholder = ({ symbol }) => <span className="me-3">{symbol}</span>;
const LogoIcon = () => <span className="me-2 fs-4">🛒</span>;

export default function Sidebar() {


  return (
    <div className="app-sidebar bg-dark text-white p-4 d-none d-md-flex flex-column">
      {/* --- Encabezado / Logo --- */}
      <div className="mb-4">
        <h1 className="fs-5 fw-bold d-flex align-items-center">
          <LogoIcon />
          SupplyHub
        </h1>
      </div>

      {/* --- Navegación --- */}
      <Nav className="flex-column flex-grow-1" as="nav">
        <NavLink end className="nav-link" to={"/proveedores"}>Proveedores</NavLink>
        <NavLink end className="nav-link" to={"/equipos"}>Equipos</NavLink>
        <NavLink end className="nav-link" to={"/ordenes"}>Ordenes de compra</NavLink>
        
      </Nav>

      {/* --- Sección de Usuario y Logout --- */}
      <div className="mt-auto pt-3 border-top border-secondary sidebar-user-info">
        <div className="d-flex align-items-center bg-secondary p-3 rounded mb-3">
          <div className="rounded-circle bg-info text-white d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', fontSize: '14px', fontWeight: 'bold' }}>
            AD
          </div>
          <div className="flex-grow-1 overflow-hidden">
            <p className="mb-0 text-truncate fw-medium" style={{ fontSize: '0.9rem' }}>Admin User</p>
            <p className="mb-0 text-muted text-truncate" style={{ fontSize: '0.75rem' }}>admin@supply.com</p>
          </div>
        </div>
        <Button 
          variant="outline-secondary" 
          className="w-100 d-flex align-items-center justify-content-start text-light"
        >
          <IconPlaceholder symbol="🚪" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
}
