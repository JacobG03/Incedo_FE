import { Dispatch } from '@reduxjs/toolkit'
import axios from '../../services/index'
import { INote } from '../../types'
import {
  fetchNotesStart, fetchNotesSuccess, fetchNotesFailure,
  addNoteStart, addNoteSuccess, addNoteFailure, 
  removeNoteStart, removeNoteSuccess, removeNoteFailure,
  updateNoteStart, updateNoteSuccess, updateNoteFailure
} from '../slices/notesSlice'


export const fetchNotes = (dispatch: Dispatch) => {
  dispatch(fetchNotesStart())
  axios.get('/notes')
    .then(res => {
      dispatch(fetchNotesSuccess(res.data))
    })
    .catch(() => dispatch(fetchNotesFailure()))
}

interface CreateNote {
  title: string
}

export const createNote = (dispatch: Dispatch, data: CreateNote) => {
  dispatch(addNoteStart())
  axios.post('/notes', data)
  .then(res => {
      dispatch(addNoteSuccess(res.data))
    })
    .catch(error => dispatch(addNoteFailure(error.response.data.detail)))
}

export const removeNote = (dispatch: Dispatch, id: number) => {
  dispatch(removeNoteStart())
  axios.delete(`/notes/${id}`)
    .then(() => {
      dispatch(removeNoteSuccess({id}))
    })
    .catch(error => dispatch(removeNoteFailure(error.response.data.detail)))
}

export const updateNote = (dispatch: Dispatch, note: INote) => {
  dispatch(updateNoteStart())
  axios.put(`/notes/${note.id}`, note)
  .then(res => {
    dispatch(updateNoteSuccess({...note, ...res.data}))
  })
  .catch(error => updateNoteFailure(error.response.data.detail))
}
