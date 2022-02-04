import { Dispatch } from '@reduxjs/toolkit'
import axios from '../../services/index'
import { ISection } from '../../types'
import { addAlert } from '../slices/alertsSlice'
import {
  fetchSectionsStart, fetchSectionsSuccess, fetchSectionsFailure,
  addSectionStart, addSectionSuccess, addSectionFailure,
  removeSectionStart, removeSectionSuccess, removeSectionFailure,
  updateSectionStart, updateSectionSuccess, updateSectionFailure,
  addSectionReset, removeSectionReset, updateSectionReset
} from '../slices/sectionsSlice'


const expired = 'Signature has expired'


export const fetchSections = (dispatch: Dispatch) => {
  dispatch(fetchSectionsStart())
  axios.get('/sections')
    .then(res => dispatch(fetchSectionsSuccess(res.data)))
    .catch(() => dispatch(fetchSectionsFailure()))
}

interface CreateSection {
  name: string,
  parent_id: number | null
}

export const createSection = (dispatch: Dispatch, data: CreateSection) => {
  dispatch(addSectionStart())
  axios.post('/sections', data)
  .then(res => {
      dispatch(addSectionSuccess(res.data))
      dispatch(addSectionReset())
      dispatch(addAlert({message: 'Section created.'}))
    })
    .catch(error => {
      dispatch(addSectionFailure(error.response.data.detail))
      if (error.response.data.detail === expired) {
        fetchSections(dispatch)
      }
    })
}

export const removeSection = (dispatch: Dispatch, id: number) => {
  dispatch(removeSectionStart())
  axios.delete(`/sections/${id}`)
    .then(() => {
      dispatch(removeSectionSuccess({id}))
      dispatch(removeSectionReset())
      dispatch(addAlert({message: 'Section removed.'}))
    })
    .catch(error => {
      dispatch(removeSectionFailure(error.response.data.detail))
      if (error.response.data.detail === expired) {
        fetchSections(dispatch)
      }
    })
}

export const updateSection = (dispatch: Dispatch, section: ISection) => {
  dispatch(updateSectionStart())
  axios.put(`/sections/${section.id}`, section)
  .then(res => {
    dispatch(updateSectionSuccess({...section, ...res.data}))
    dispatch(updateSectionReset())
  })
  .catch(error => {
    updateSectionFailure(error.response.data.detail)
    if (error.response.data.detail === expired) {
      fetchSections(dispatch)
    }
  })
}
