import { createSlice } from "@reduxjs/toolkit"
import { ISections } from "../../types"


const get_status = {
  pending: false,
  finished: false
}

const cru_status = {
  pending: false,
  success: false,
  errors: []
}

const initialState: ISections = {
  sections: [],
  fetchSections: get_status,
  createSection: cru_status,
  updateSection: cru_status,
  removeSection: cru_status,
}

export const sectionsSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    fetchSectionsStart: (state) => {
      state.fetchSections.pending = true
    },
    fetchSectionsSuccess: (state, action) => {
      state.sections = action.payload
      state.fetchSections.pending = false
      state.fetchSections.finished = true
    },
    fetchSectionsFailure: (state) => {
      state.fetchSections.pending = false
      state.fetchSections.finished = true
    },
    fetchSectionsReset: (state) => {
      state.fetchSections = get_status
    },
    addSectionStart: (state) => {
      state.createSection.pending = true
    },
    addSectionSuccess: (state, action) => {
      state.createSection.pending = false
      state.createSection.success = true
      state.sections = [...state.sections, action.payload]
    },
    addSectionFailure: (state, action) => {
      state.createSection.pending = false
      state.createSection.errors = action.payload
    },
    addSectionReset: (state) => {
      state.createSection.pending = false
      state.createSection.errors = []
      state.createSection.success = false
    },
    removeSectionStart: (state) => {
      state.removeSection.pending = true
    },
    removeSectionSuccess: (state, action) => {
      state.sections = state.sections.filter(section => section.id !== action.payload.id)
      state.removeSection.pending = false
      state.removeSection.success = true
    },
    removeSectionFailure: (state, action) => {
      state.removeSection.pending = false
      state.removeSection.success = false
      state.removeSection.errors = action.payload
    },
    removeSectionReset: (state) => {
      state.removeSection = cru_status
    },
    updateSectionStart: (state) => {
      state.updateSection.pending = true
    },
    updateSectionSuccess: (state, action) => {
      state.sections = state.sections.map(section => section.id === action.payload.id
        ? { ...section, ...action.payload }
        : section)
      state.updateSection.pending = false
      state.updateSection.success = true
    },
    updateSectionFailure: (state, action) => {
      state.updateSection.pending = false
      state.updateSection.success = false
      state.updateSection.errors = action.payload
    },
    updateSectionReset: (state) => {
      state.updateSection = cru_status
    },
  }
})

export const {
  fetchSectionsStart, fetchSectionsSuccess, fetchSectionsFailure, fetchSectionsReset,
  addSectionStart, addSectionSuccess, addSectionFailure, addSectionReset,
  updateSectionStart, updateSectionSuccess, updateSectionFailure, updateSectionReset,
  removeSectionStart, removeSectionSuccess, removeSectionFailure, removeSectionReset
} = sectionsSlice.actions;

export default sectionsSlice.reducer;
