// src/services/api.ts

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/visual/',
});

export default api;
