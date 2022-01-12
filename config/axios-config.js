import axios from 'axios';

export const BACKEND_URL = 'http://system.altis.net.pl';

const back = axios.create({
	baseURL: BACKEND_URL
});

back.interceptors.request.use((config) => {
	config.withCredentials = true;
	return config;
});
export default back;
