// Update api configuration
import axios from 'axios';

const LOCALHOST = 'http://localhost:8080';

export const API_BASE_URL = LOCALHOST;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const jwt = localStorage.getItem('jwt');
if (jwt) {
  api.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
}

export default api;
