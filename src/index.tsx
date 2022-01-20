import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import store from './redux/store';
import App from './App';
import axios from 'axios';
import Cookies from 'universal-cookie';


axios.defaults.baseURL = process.env.REACT_APP_API
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true

axios.interceptors.request.use(function (config) {
	const cookies = new Cookies()
	config.headers!['X-CSRF-Token'] = cookies.get('csrf_access_token')

	return config;
});

// Session sliding
// https://github.com/IndominusByte/fastapi-jwt-auth/issues/38


ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);