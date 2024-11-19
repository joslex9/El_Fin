import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Cambiar al URL del backend
});

export default api;


