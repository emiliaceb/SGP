import axios from 'axios';
import API_BASE_URL from './config';

const API_URL = `${API_BASE_URL}/api/tecnicos`;

// Obtener todos los técnicos
export const obtenerTecnicos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener técnicos:', error);
    throw error;
  }
};

// Obtener técnico por ID
export const obtenerTecnicoPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener técnico ${id}:`, error);
    throw error;
  }
};

// Crear nuevo técnico
export const crearTecnico = async (datos) => {
  try {
    const response = await axios.post(API_URL, datos);
    return response.data;
  } catch (error) {
    console.error('Error al crear técnico:', error);
    throw error;
  }
};

// Actualizar técnico
export const actualizarTecnico = async (id, datos) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, datos);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar técnico ${id}:`, error);
    throw error;
  }
};

// Eliminar técnico
export const eliminarTecnico = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar técnico ${id}:`, error);
    throw error;
  }
};
