import axios from 'axios';

export const BACKEND_URL = 'http://localhost:5000';

const back = axios.create({
	baseURL: BACKEND_URL
});

back.interceptors.request.use((config) => {
	config.withCredentials = true;
	return config;
});
export default back;
