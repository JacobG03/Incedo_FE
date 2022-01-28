import { Dispatch } from '@reduxjs/toolkit'
import axios from '../../services/index'
import {
	fetchUser, setUser, nullUser
} from '../slices/meSlice'


export const getMe = async (dispatch: Dispatch) => {
	dispatch(fetchUser())
	axios.get('/me')
		.then(res => dispatch(setUser(res.data)))
		.catch(err => {
			// If old signature try again
			axios.get('/me')
				.then(res => dispatch(setUser(res.data)))
				.catch(err => dispatch(nullUser()))
		})
}
