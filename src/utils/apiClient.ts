import axios from 'axios';
import config from '../config';

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
});

export const apiClient = {
  get: async (endpoint: string, params = {}) => {
    const response = await axios.get(`${config.API_DATABASE_URL}${endpoint}`, {
      headers: getAuthHeader(),
      params,
    });
    return response.data;
  },

  post: async (endpoint: string, data = {}) => {
    const response = await axios.post(`${config.API_DATABASE_URL}${endpoint}`, data, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  put: async (endpoint: string, data = {}) => {
    const response = await axios.put(`${config.API_DATABASE_URL}${endpoint}`, data, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  delete: async (endpoint: string, params = {}) => {
    const response = await axios.delete(`${config.API_DATABASE_URL}${endpoint}`, {
      headers: getAuthHeader(),
      data: params
    });
    return response.data;
  },
};

export const todoApi = {
  getTodos: () => apiClient.get('/tasks'),

  createTodo: (todo: any) =>
    apiClient.post('/tasks', todo),

  updateTodo: (id: string, updates: any) =>
    apiClient.put(`/tasks/${id}`, updates),

  deleteTodo: (id: string) =>
    apiClient.delete(`/tasks/${id}`)
};
