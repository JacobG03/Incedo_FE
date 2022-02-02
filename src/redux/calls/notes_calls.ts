import { Dispatch } from '@reduxjs/toolkit'
import axios from '../../services/index'
import { INote } from '../../types'
import {
  setNotes,
  addNoteStart, addNoteSuccess, addNoteFailure, addNoteReset, 
  removeNoteStart, removeNoteSuccess, removeNoteFailure, removeNoteReset,
  updateNoteStart, updateNoteSuccess, updateNoteFailure, updateNoteReset
} from '../slices/notesSlice'


export const fetchNotes = (dispatch: Dispatch) => {
  axios.get('/notes')
    .then(res => dispatch(setNotes(res.data)))
    .catch(error => console.log(error.response.data.detail))
}

interface CreateNote {
  title: string
}

export const createNote = (dispatch: Dispatch, data: CreateNote) => {
  dispatch(addNoteStart())
  axios.post('/notes', data)
  .then(res => {
      dispatch(addNoteSuccess(res.data))
      dispatch(addNoteReset())
    })
    .catch(error => dispatch(addNoteFailure(error.response.data.detail)))
}

export const removeNote = (dispatch: Dispatch, id: number) => {
  dispatch(removeNoteStart())
  axios.delete(`/notes/${id}`)
    .then(() => {
      dispatch(removeNoteSuccess({id}))
      dispatch(removeNoteReset())
    })
    .catch(error => dispatch(removeNoteFailure(error.response.data.detail)))
}

export const updateNote = (dispatch: Dispatch, note: INote) => {
  dispatch(updateNoteStart())
  axios.put(`/notes/${note.id}`)
  .then(res => {
    dispatch(updateNoteSuccess(res.data))
    dispatch(updateNoteReset())
  })
  .catch(error => updateNoteFailure(error.response.data.detail))
}
