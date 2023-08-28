import axios from 'axios';

const API_URL = 'https://64ec6840f9b2b70f2bfa41d8.mockapi.io/';

const api = axios.create({
  baseURL: API_URL,
});

export default api;
