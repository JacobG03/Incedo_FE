import { Dispatch } from '@reduxjs/toolkit'
import axios from '../../services/index'
import { setNotes, setSections } from '../slices/notesSlice'


export const fetchNotes = (dispatch: Dispatch) => {
  axios.get('/notes')
    .then(res => dispatch(setNotes(res.data)))
    .catch(error => console.log(error.response.data.detail))
}

export const fetchSections = (dispatch: Dispatch) => {
  axios.get('/sections')
    .then(res => dispatch(setSections(res.data)))
    .catch(error => console.log(error.response.data.detail))
}
