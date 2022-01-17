import { createSlice } from '@reduxjs/toolkit'


export const themeSlice = createSlice({
	name: 'theme',
	initialState: {
		theme: null,
		pending: false,
	},
	reducers: {
		// Get current user reducers
		fetchTheme: (state) => {
			state.pending = true
		},
		setTheme: (state, action) => {
			state.theme = action.payload
			state.pending = false
		}
	},
})

export const {
	fetchTheme, setTheme
} = themeSlice.actions;

export default themeSlice.reducer;
