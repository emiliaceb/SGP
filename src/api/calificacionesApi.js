import axios from 'axios';
import API_BASE_URL from './config';

const API_URL = `${API_BASE_URL}/api/calificaciones`;

// Obtener todas las calificaciones
export const obtenerCalificaciones = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener calificaciones:', error);
    throw error;
  }
};

// Obtener calificación por ID
export const obtenerCalificacionPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener calificación ${id}:`, error);
    throw error;
  }
};

// Crear nueva calificación
export const crearCalificacion = async (datos) => {
  try {
    const response = await axios.post(API_URL, datos);
    return response.data;
  } catch (error) {
    console.error('Error al crear calificación:', error);
    throw error;
  }
};

// Actualizar calificación
export const actualizarCalificacion = async (id, datos) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, datos);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar calificación ${id}:`, error);
    throw error;
  }
};

// Eliminar calificación
export const eliminarCalificacion = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar calificación ${id}:`, error);
    throw error;
  }
};
