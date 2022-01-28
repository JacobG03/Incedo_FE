import { Dispatch } from '@reduxjs/toolkit'
import axios from '../../services/index'
import { setNotes } from '../slices/notesSlice'


export const fetchNotes = (dispatch: Dispatch) => {
  axios.get('/notes')
  .then(res => dispatch(setNotes(res.data)))
  .catch(error => console.log(error.response.data.detail))
}
