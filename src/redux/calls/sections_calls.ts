import { Dispatch } from '@reduxjs/toolkit'
import axios from '../../services/index'
import {
  fetchSectionsStart, fetchSectionsSuccess, fetchSectionsFailure
} from '../slices/sectionsSlice'


export const fetchSections = (dispatch: Dispatch) => {
  dispatch(fetchSectionsStart())
  axios.get('/sections')
    .then(res => dispatch(fetchSectionsSuccess(res.data)))
    .catch(error => dispatch(fetchSectionsFailure()))
}
