import axios from 'axios';
import API_BASE_URL from './config';

const API_URL = `${API_BASE_URL}/api/equipos`;

// Obtener todos los equipos
export const obtenerEquipos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener equipos:', error);
    throw error;
  }
};

// Obtener equipo por ID
export const obtenerEquipoPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener equipo ${id}:`, error);
    throw error;
  }
};

// Crear nuevo equipo
export const crearEquipo = async (datos) => {
  try {
    const response = await axios.post(API_URL, datos);
    return response.data;
  } catch (error) {
    console.error('Error al crear equipo:', error);
    throw error;
  }
};

// Actualizar equipo
export const actualizarEquipo = async (id, datos) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, datos);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar equipo ${id}:`, error);
    throw error;
  }
};

// Eliminar equipo
export const eliminarEquipo = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar equipo ${id}:`, error);
    throw error;
  }
};
