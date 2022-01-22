import axios from 'axios';
import Cookies from 'universal-cookie';


const signature_exp = 'Signature has expired';


axios.defaults.baseURL = process.env.REACT_APP_API
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true


axios.interceptors.request.use((config) => {
	const cookies = new Cookies()
	config.headers!['X-CSRF-Token'] = cookies.get('csrf_access_token')

	return config;
});

axios.interceptors.response.use(response => {
	return response;
}, async error => {
	const { data, status, config } = error.response;
	const cookies = new Cookies()
	const csrf_refresh_token = cookies.get('csrf_refresh_token')

	if (status === 422 && data.detail === signature_exp && csrf_refresh_token) {
		await axios.get('/auth/refresh')
			.then(() => {
				return axios(config)
			})
	}

	return Promise.reject(error);
})

export default axios;
