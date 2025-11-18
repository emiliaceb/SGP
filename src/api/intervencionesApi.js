import axios from 'axios';
import API_BASE_URL from './config';

const API_URL = `${API_BASE_URL}/api/intervenciones`;

// Obtener todas las intervenciones
export const obtenerIntervenciones = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener intervenciones:', error);
    throw error;
  }
};

// Obtener intervención por ID
export const obtenerIntervencionPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener intervención ${id}:`, error);
    throw error;
  }
};

// Crear nueva intervención
export const crearIntervencion = async (datos) => {
  try {
    const response = await axios.post(API_URL, datos);
    return response.data;
  } catch (error) {
    console.error('Error al crear intervención:', error);
    throw error;
  }
};

// Actualizar intervención
export const actualizarIntervencion = async (id, datos) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, datos);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar intervención ${id}:`, error);
    throw error;
  }
};

// Eliminar intervención
export const eliminarIntervencion = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar intervención ${id}:`, error);
    throw error;
  }
};
