import { Dispatch } from '@reduxjs/toolkit'
import axios from '../../services/index'
import { addAlert } from '../slices/alertsSlice'
import {
  addNoteStart, addNoteSuccess, addNoteFailure,
  setNotes, setSections, addNoteReset
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
      dispatch(addAlert({ message: 'Note created.' }))
      dispatch(addNoteReset())
    })
    .catch(error => dispatch(addNoteFailure(error.response.data.detail)))
}

export const fetchSections = (dispatch: Dispatch) => {
  axios.get('/sections')
    .then(res => dispatch(setSections(res.data)))
    .catch(error => console.log(error.response.data.detail))
}
