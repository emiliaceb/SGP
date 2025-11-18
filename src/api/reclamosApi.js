import axios from 'axios';
import API_BASE_URL from './config';

const API_URL = `${API_BASE_URL}/api/reclamos`;

// Obtener todos los reclamos
export const obtenerReclamos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener reclamos:', error);
    throw error;
  }
};

// Obtener reclamo por ID
export const obtenerReclamoPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener reclamo ${id}:`, error);
    throw error;
  }
};

// Crear nuevo reclamo
export const crearReclamo = async (datos) => {
  try {
    const response = await axios.post(API_URL, datos);
    return response.data;
  } catch (error) {
    console.error('Error al crear reclamo:', error);
    throw error;
  }
};

// Actualizar reclamo
export const actualizarReclamo = async (id, datos) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, datos);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar reclamo ${id}:`, error);
    throw error;
  }
};

// Eliminar reclamo
export const eliminarReclamo = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar reclamo ${id}:`, error);
    throw error;
  }
};
