import axios from "axios";

export const API_URL = 'http://91.197.96.178/';

const $api = axios.create({
	baseURL: API_URL
})

$api.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	config.headers.Authorization = token ? `Bearer ${token}` : token;
	return config;
})

export default $api;