import { createSlice } from '@reduxjs/toolkit'
import { IMe } from '../../types'


const initialState: IMe = {
	meInfo: null,
	pending: false,
	finished: false,
	errors: null
}

export const meSlice = createSlice({
	name: 'me',
	initialState,
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
		},
		setUsername: (state, action) => {
			state.meInfo!.username = action.payload.username
		},
		setEmail: (state, action) => {
			state.meInfo!.email = action.payload.email
		},
		setAvatar: (state, action) => {
			state.meInfo!.avatar_url = action.payload.avatar_url
		}
	}
})

export const {
	fetchUser, setUser, nullUser,
	setUsername, setEmail, setAvatar
} = meSlice.actions;

export default meSlice.reducer;
