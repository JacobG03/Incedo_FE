import { createSlice } from "@reduxjs/toolkit";
import { INotes } from "../../types";


const status = {
  pending: false,
  success: false,
  errors: [],
} 

const initialState: INotes = {
  notes: [],
  createNote: status,
  removeNote: status,
  updateNote: status
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload
    },
    setNote: (state, action) => {
      state.notes = state.notes.filter(note =>
        note.id === action.payload.id
          ? { ...note, ...action.payload }
          : null)
    },
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
    removeNoteStart: (state) => {
      state.removeNote.pending = true
    },
    removeNoteSuccess: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload.id)
      state.removeNote.pending = false
      state.removeNote.success = true
    },
    removeNoteFailure: (state, action) => {
      state.removeNote.pending = false
      state.removeNote.success = false
      state.removeNote.errors = action.payload
    },
    removeNoteReset: (state) => {
      state.removeNote = status
    },
    updateNoteStart: (state) => {
      state.updateNote.pending = true
    },
    updateNoteSuccess: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload.id)
      state.updateNote.pending = false
      state.updateNote.success = true
    },
    updateNoteFailure: (state, action) => {
      state.updateNote.pending = false
      state.updateNote.success = false
      state.removeNote.errors = action.payload
    },
    updateNoteReset: (state) => {
      state.removeNote = status
    },
  }
})

export const {
  addNoteStart, addNoteSuccess, addNoteFailure, addNoteReset,
  removeNoteStart, removeNoteSuccess, removeNoteFailure, removeNoteReset,
  updateNoteStart, updateNoteSuccess, updateNoteFailure, updateNoteReset,
  setNotes, setNote
} = notesSlice.actions;

export default notesSlice.reducer;
