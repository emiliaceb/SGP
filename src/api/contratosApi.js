import axios from 'axios';
import API_BASE_URL from './config';

const API_URL = `${API_BASE_URL}/api/contratos`;

// Obtener todos los contratos
export const obtenerContratos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener contratos:', error);
    throw error;
  }
};

// Obtener contrato por ID
export const obtenerContratoPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener contrato ${id}:`, error);
    throw error;
  }
};

// Crear nuevo contrato
export const crearContrato = async (datos) => {
  try {
    const response = await axios.post(API_URL, datos);
    return response.data;
  } catch (error) {
    console.error('Error al crear contrato:', error);
    throw error;
  }
};

// Actualizar contrato
export const actualizarContrato = async (id, datos) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, datos);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar contrato ${id}:`, error);
    throw error;
  }
};

// Eliminar contrato
export const eliminarContrato = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar contrato ${id}:`, error);
    throw error;
  }
};
