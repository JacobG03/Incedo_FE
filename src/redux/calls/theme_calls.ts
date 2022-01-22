import { Dispatch } from '@reduxjs/toolkit'
import axios from '../../services/index'
import { fetchTheme, setTheme } from '../slices/themeSlice'


export const getTheme = async (dispatch: Dispatch) => {
	dispatch(fetchTheme())
	axios.get('/me/theme')
		.then(res => dispatch(setTheme(res.data)))
		.catch(err => console.log(err.response))
}
