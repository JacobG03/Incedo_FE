import { createSlice } from "@reduxjs/toolkit";
import { INotes } from "../../types";


const initialState: INotes = {
  notes: []
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload
    },
    addNote: (state, action) => {
      state.notes = [...state.notes, action.payload]
    },
    removeNote: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload.id)
    },
    setNote: (state, action) => {
      state.notes = state.notes.filter(note => note.id === action.payload.id ? action.payload: note)
    }
  }
})

export const {
  addNote, removeNote, setNotes,
  setNote
} = notesSlice.actions;

export default notesSlice.reducer;
