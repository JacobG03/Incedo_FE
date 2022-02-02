import { createSlice } from "@reduxjs/toolkit"
import { ISections } from "../../types"


const initialState: ISections = {
  sections: []
}

export const sectionsSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setSections: (state, action) => {
      state.sections = action.payload
    },
    addSection: (state, action) => {
      state.sections = [...state.sections, action.payload]
    },
    removeSection: (state, action) => {
      state.sections = state.sections.filter(section => section.id !== action.payload.id)
    },
    setSection: (state, action) => {
      state.sections = state.sections.filter(section =>
        section.id === action.payload.id
          ? { ...section, ...action.payload }
          : null)
    }
  }
})

export const {
  setSections, addSection, removeSection, setSection
} = sectionsSlice.actions;

export default sectionsSlice.reducer;
