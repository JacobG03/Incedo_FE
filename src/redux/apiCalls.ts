import { Dispatch } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'universal-cookie';
import {getCurrentUserStart, getCurrentUserSuccess, getCurrentUserFailure } from './userSlice'


axios.interceptors.request.use(function (config) {
	const cookies = new Cookies()
	config.headers!['X-CSRF-Token'] = cookies.get('csrf_access_token')

	return config;
});


export const getCurrentUser = async (dispatch: Dispatch) => {
	dispatch(getCurrentUserStart())
	axios.get('/user')
		.then(res => dispatch(getCurrentUserSuccess(res.data)))
		.catch(err => dispatch(getCurrentUserFailure(err.response.data)))
}
