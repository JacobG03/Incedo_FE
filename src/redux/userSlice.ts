import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../types'


export const userSlice = createSlice({
	name: 'user',
	initialState: {
		userInfo: null,
		getCurrentUser: {
			pending: false,
			finished: false
		}
	},
	reducers: {
		// Get current user reducers
		getCurrentUserStart: (state) => {
			state.getCurrentUser.pending = true
		},
		getCurrentUserSuccess: (state, action) => {
			state.getCurrentUser.pending = false
			state.getCurrentUser.finished = true
			state.userInfo = action.payload
		},
		getCurrentUserFailure: (state, action) => {
			state.getCurrentUser.pending = false
			state.getCurrentUser.finished = true
			console.log(action.payload)
		},
		// Verify email account
		verifyEmail: (state: IUser) => {
			state.userInfo!.verified = true
		}
	}
})

export const {
	getCurrentUserStart, getCurrentUserSuccess, getCurrentUserFailure,
	verifyEmail
} = userSlice.actions;

export default userSlice.reducer;
