import { Dispatch } from '@reduxjs/toolkit'
import axios from '../../services/index'
import { addAlert } from '../slices/alertsSlice'
import { fetchTheme, setTheme } from '../slices/themeSlice'


export const getTheme = async (dispatch: Dispatch) => {
	dispatch(fetchTheme())
	axios.get('/me/theme')
		.then(res => dispatch(setTheme(res.data)))
		.catch(err => console.log(err.response))
}

export const updateTheme = async (dispatch: Dispatch, data: { id: number }) => {
	dispatch(fetchTheme())
	axios.put('/settings/theme', data)
		.then(res => {
			dispatch(setTheme(res.data))
			dispatch(addAlert({ message: 'Theme updated.' }))
		})
		.catch()
}
