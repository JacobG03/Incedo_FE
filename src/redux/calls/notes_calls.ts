import { Dispatch } from '@reduxjs/toolkit'
import axios from '../../services/index'
import { INote } from '../../types'
import { addAlert } from '../slices/alertsSlice'
import {
	fetchNotesStart, fetchNotesSuccess, fetchNotesFailure,
	getNoteStart, getNoteSuccess, getNoteFailure,
	addNoteStart, addNoteSuccess, addNoteFailure,
	removeNoteStart, removeNoteSuccess, removeNoteFailure,
	updateNoteStart, updateNoteSuccess, updateNoteFailure,
	removeNoteReset, addNoteReset, updateNoteReset
} from '../slices/notesSlice'


const expired = 'Signature has expired'


export const fetchNotes = (dispatch: Dispatch) => {
	dispatch(fetchNotesStart())
	axios.get('/notes')
		.then(res => {
			dispatch(fetchNotesSuccess(res.data))
		})
		.catch(() => dispatch(fetchNotesFailure()))
}

export const getNote = (dispatch: Dispatch, id: string) => {
	dispatch(getNoteStart())
	axios.get(`/notes/${id}`)
	.then(res => {
		dispatch(getNoteSuccess(res.data))
	})
	.catch(() => dispatch(getNoteFailure()))
}

interface CreateNote {
	title: string,
	parent_id: number | null
}

export const createNote = (dispatch: Dispatch, data: CreateNote) => {
	dispatch(addNoteStart())
	axios.post('/notes', data)
		.then(res => {
			dispatch(addNoteSuccess(res.data))
			dispatch(addNoteReset())
			dispatch(addAlert({ message: 'Note created.' }))
		})
		.catch(error => {
			dispatch(addNoteFailure(error.response.data.detail))
			// necessary to fetch new notes if error was caused by session expiration
			if (error.response.data.detail === expired) {
				fetchNotes(dispatch)
			}
		})
}

export const removeNote = (dispatch: Dispatch, id: number) => {
	dispatch(removeNoteStart())
	axios.delete(`/notes/${id}`)
		.then(() => {
			dispatch(removeNoteSuccess({ id }))
			dispatch(removeNoteReset())
			dispatch(addAlert({ message: 'Note removed.' }))
		})
		.catch(error => {
			dispatch(removeNoteFailure(error.response.data.detail))
			if (error.response.data.detail === expired) {
				fetchNotes(dispatch)
			}
		})
}

export const updateNote = (dispatch: Dispatch, note: INote) => {
	dispatch(updateNoteStart())
	axios.put(`/notes/${note.id}`, note)
		.then(res => {
			dispatch(updateNoteSuccess({ ...note, ...res.data }))
			dispatch(updateNoteReset())
		})
		.catch(error => {
			updateNoteFailure(error.response.data.detail)
			if (error.response.data.detail === expired) {
				fetchNotes(dispatch)
			}
		})
}
