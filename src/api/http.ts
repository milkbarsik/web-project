import axios from 'axios';

export const API_URL = 'http://194.58.114.209:8000/';

const $api = axios.create({
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : token;
  return config;
});

export default $api;
