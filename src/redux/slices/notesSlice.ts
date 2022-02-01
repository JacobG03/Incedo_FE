import { createSlice } from "@reduxjs/toolkit";
import { INotes } from "../../types";


const initialState: INotes = {
  notes: [],
  sections: [],
  createNote: {
    pending: false,
    success: false,
    errors: [],
  }
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNoteStart: (state) => {
      state.createNote.pending = true
    },
    addNoteSuccess: (state, action) => {
      state.createNote.pending = false
      state.createNote.success = true
      state.notes = [...state.notes, action.payload]
    },
    addNoteFailure: (state, action) => {
      state.createNote.pending = false
      state.createNote.errors = action.payload
    },
    addNoteReset: (state) => {
      state.createNote.pending = false
      state.createNote.errors = []
      state.createNote.success = false
    },
    setNotes: (state, action) => {
      state.notes = action.payload
    },
    removeNote: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload.id)
    },
    setNote: (state, action) => {
      state.notes = state.notes.filter(note =>
        note.id === action.payload.id
          ? { ...note, ...action.payload }
          : null)
    },
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
    },
  }
})

export const {
  addNoteStart, addNoteSuccess, addNoteFailure, addNoteReset,
  removeNote, setNotes, setNote,
  setSections, addSection, removeSection, setSection
} = notesSlice.actions;

export default notesSlice.reducer;
