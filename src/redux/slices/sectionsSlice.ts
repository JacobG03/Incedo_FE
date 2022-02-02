import { createSlice } from "@reduxjs/toolkit"
import { ISections } from "../../types"


const get_status = {
  pending: false,
  finished: false
}

const initialState: ISections = {
  sections: [],
  fetchSections: get_status
}

export const sectionsSlice = createSlice({
  name: 'notes',
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
  }
})

export const {
  fetchSectionsStart, fetchSectionsSuccess, fetchSectionsFailure, fetchSectionsReset
} = sectionsSlice.actions;

export default sectionsSlice.reducer;
