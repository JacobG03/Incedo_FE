import { Dispatch } from '@reduxjs/toolkit'
import axios from '../../services/index'
import {
  setSections
} from '../slices/sectionsSlice'


export const fetchSections = (dispatch: Dispatch) => {
  axios.get('/sections')
    .then(res => dispatch(setSections(res.data)))
    .catch(error => console.log(error.response.data.detail))
}
