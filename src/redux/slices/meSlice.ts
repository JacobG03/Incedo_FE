import { createSlice } from '@reduxjs/toolkit'


export const meSlice = createSlice({
	name: 'me',
	initialState: {
		meInfo: null,
		pending: false,
		finished: false
	},
	reducers: {
		// Get current user reducers
		fetchUser: (state) => {
			state.pending = true
		},
		setUser: (state, action) => {
			state.meInfo = action.payload
			state.pending = false
			state.finished = true
		},
		nullUser: (state) => {
			state.meInfo = null
			state.pending = false
			state.finished = true
		}
	}
})

export const {
	fetchUser, setUser, nullUser
} = meSlice.actions;

export default meSlice.reducer;
