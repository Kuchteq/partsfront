import axios from 'axios';

export const BACKEND_URL = 'https://system.altis.net.pl/api';

const back = axios.create({
	baseURL: BACKEND_URL
});

back.interceptors.request.use((config) => {
	config.withCredentials = true;
	return config;
});
export default back;
