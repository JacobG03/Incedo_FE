import { Dispatch } from '@reduxjs/toolkit'
import axios from 'axios'
import { fetchUser, setUser, nullUser } from '../slices/meSlice'


export const getMe = async (dispatch: Dispatch) => {
	dispatch(fetchUser())
	axios.get('/me', {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
		.then(res => dispatch(setUser(res.data)))
		.catch(err => dispatch(nullUser()))
}
