import axios from 'axios';
import API_BASE_URL from './config';

const API_URL = `${API_BASE_URL}/api/proveedores`;

// Obtener todos los proveedores
export const obtenerProveedores = async () => {
  try {
    console.log('🌐 Haciendo request a:', API_URL);
    const response = await axios.get(API_URL);
    console.log('📦 Response status:', response.status);
    console.log('📦 Response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('💥 Error en obtenerProveedores:', error.message);
    console.error('💥 Error details:', error.response?.status, error.response?.statusText);
    throw error;
  }
};

// Obtener proveedor por CUIT
export const obtenerProveedorPorId = async (cuit) => {
  try {
    const response = await axios.get(`${API_URL}/${cuit}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener proveedor ${cuit}:`, error);
    throw error;
  }
};

// Crear nuevo proveedor
export const crearProveedor = async (datos) => {
  try {
    const response = await axios.post(API_URL, datos);
    return response.data;
  } catch (error) {
    console.error('Error al crear proveedor:', error);
    throw error;
  }
};

// Actualizar proveedor
export const actualizarProveedor = async (cuit, datos) => {
  try {
    const response = await axios.put(`${API_URL}/${cuit}`, datos);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar proveedor ${cuit}:`, error);
    throw error;
  }
};

// Eliminar proveedor
export const eliminarProveedor = async (cuit) => {
  try {
    const response = await axios.delete(`${API_URL}/${cuit}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar proveedor ${cuit}:`, error);
    throw error;
  }
};